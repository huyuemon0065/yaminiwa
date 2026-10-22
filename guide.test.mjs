import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
const html=fs.readFileSync(new URL('./index.html',import.meta.url),'utf8'),code=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)][1][1];new vm.Script(code);
const ctx={console};vm.createContext(ctx);const engine=code.slice(code.indexOf('/* BEGIN GUIDE ENGINE'),code.indexOf('/* END GUIDE ENGINE */'));
vm.runInContext(engine+';Object.assign(this,{makeGuide:newGuide,cleanGuide,startGuide,event:guideEvent,complete:completeGuide});',ctx);
for(const raw of [null,{},false,{topic:'__proto__',step:'x'},{topic:'constructor',step:'x'},{topic:'basic',step:'bad'}])assert.equal(ctx.cleanGuide(raw).topic,'');
const g=ctx.makeGuide();assert.equal(ctx.startGuide(g,'__proto__',true),false);assert.equal(ctx.startGuide(g,'basic',false),true);assert.equal(g.step,'gather');
assert.equal(ctx.event(g,'water'),false,'unrelated actions do not advance');ctx.event(g,'gather');assert.equal(g.step,'inventory');ctx.event(g,'inventory',{open:false});assert.equal(g.inventoryViewed,false);ctx.event(g,'inventory',{open:true});assert.equal(g.inventoryViewed,true);
g.step='water';ctx.event(g,'water');assert.equal(g.step,'room');ctx.event(g,'scene',{scene:'garden'});assert.equal(g.step,'room');ctx.event(g,'scene',{scene:'brew'});assert.equal(g.step,'brew');ctx.event(g,'brewOpen',{stock:0});assert.equal(g.step,'brewEmpty','insufficient materials have an exit');
g.step='brew';ctx.event(g,'brewOpen',{stock:2});assert.equal(g.step,'brewPick');ctx.event(g,'brewSelect',{count:1});assert.equal(g.step,'brewPick');ctx.event(g,'brewSelect',{count:2});assert.equal(g.step,'brewConfirm');ctx.event(g,'brewSelect',{count:0});assert.equal(g.step,'brewPick');ctx.event(g,'brewSelect',{count:3});ctx.event(g,'brewStarted');assert.equal(g.step,'brewWait');ctx.event(g,'brewFinished');assert.equal(g.step,'brewResult');ctx.complete(g);assert.ok(g.completed.includes('basic'));assert.equal(g.topic,'');
ctx.startGuide(g,'fire',false);assert.equal(g.step,'night');ctx.event(g,'night',{night:false});assert.equal(g.step,'night');ctx.event(g,'night',{night:true});assert.equal(g.step,'fireOpen');ctx.event(g,'fireOpen',{cooking:false,used:false});assert.equal(g.step,'fireHub');
for(const [view,step] of [['wood','fireWood'],['food','fireFood'],['confirm','fireConfirm'],['cooking','fireCooking']]){ctx.event(g,'fireView',{view});assert.equal(g.step,step);}ctx.event(g,'fireTaken');assert.equal(g.step,'fireResult');ctx.complete(g);assert.ok(g.completed.includes('fire'));
for(const [data,step] of [[{cooking:true,used:true},'fireCooking'],[{cooking:false,used:true},'fireResult']]){ctx.startGuide(g,'fire',true);ctx.event(g,'fireOpen',data);assert.equal(g.step,step);}
g.paused=true;const paused=JSON.stringify(g);ctx.event(g,'fireTaken');assert.equal(JSON.stringify(g),paused);assert.equal(ctx.cleanGuide(g).step,g.step);assert.equal(ctx.cleanGuide(g).paused,true);
// Verify migration through the actual game sanitizer, with no loss of existing state.
const saveCtx={console};vm.createContext(saveCtx);vm.runInContext(code.slice(code.indexOf('const ATTRS='),code.indexOf('let state=fresh()'))+';Object.assign(this,{sanitizeSave:sanitize,newSave:fresh});',saveCtx);
const old={version:2,coins:123,inventory:{m001:4},settings:{bgm:false,bgmVol:.3},garden:{phase:'watered',wateredAt:1000,time:'night'},recipes:{},potions:{},requests:{}};const migrated=saveCtx.sanitizeSave(old);assert.equal(migrated.coins,123);assert.equal(migrated.inventory.m001,4);assert.equal(migrated.settings.bgm,false);assert.equal(migrated.garden.wateredAt,1000);assert.equal(migrated.guide.welcomed,false);
migrated.guide={v:1,welcomed:true,topic:'basic',step:'brewPick',paused:false,completed:[],fireOffered:true};const again=saveCtx.sanitizeSave(JSON.parse(JSON.stringify(migrated)));assert.equal(again.guide.step,'brewPick');assert.equal(again.guide.paused,false);assert.equal(again.fire.night,-1);
// Read the real guide wording for a fresh garden, a growing garden, empty stock and an already-used fire.
const opened=new Set();saveCtx.$=id=>({classList:{contains:()=>opened.has(id)}});saveCtx.stageOf=()=>saveCtx.stage;saveCtx.stage='grown';
vm.runInContext("let state=fresh(),cur='garden',portrait=true,fireStep='hub',brewSel=[];const guideStock=()=>Object.values(state.inventory).reduce((a,n)=>a+n,0);",saveCtx);
vm.runInContext(code.slice(code.indexOf('function guideDescription(){'),code.indexOf('function renderGuide(){'))+';this.desc=guideDescription;',saveCtx);
vm.runInContext('startGuide(state.guide,"basic",false);',saveCtx);assert.equal(saveCtx.desc().target,'#bGather');saveCtx.stage='empty';assert.equal(saveCtx.desc().next,'inventory');
vm.runInContext('state.guide.step="water";state.garden.phase="watered";',saveCtx);assert.equal(saveCtx.desc().next,'room');assert.ok(saveCtx.desc().text.includes('翌日0時'));
vm.runInContext('state.guide.step="brewEmpty";',saveCtx);opened.add('#mBrew');assert.equal(saveCtx.desc().next,'finish');assert.ok(saveCtx.desc().text.includes('2個以上'));
vm.runInContext('state.guide.step="brewConfirm";',saveCtx);assert.ok(saveCtx.desc().text.includes('使います'));assert.equal(saveCtx.desc().target,'#brewGo');
vm.runInContext('startGuide(state.guide,"fire",true);state.guide.step="fireConfirm";',saveCtx);opened.add('#mCampfire');assert.ok(saveCtx.desc().text.includes('朝5時'));assert.ok(saveCtx.desc().text.includes('今夜の1回分'));
vm.runInContext('state.guide.step="fireCooking";',saveCtx);assert.equal(saveCtx.desc().next,'finish','returning without an active cook is explainable');
const imageIds=[...html.replace(/<script>[\s\S]*?<\/script>/g,'').matchAll(/id="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(imageIds).size,imageIds.length);
assert.ok(html.includes('value="guide"'));assert.ok(html.includes('id="guideLibraryFromHelp"'));assert.ok(html.includes('pointer-events:auto'));assert.ok(html.includes('@font-face'));assert.ok(html.includes('klee-one.woff'));assert.ok(html.includes('kaisei-decol.woff'));
for(const f of ['klee-one.woff','kaisei-decol.woff']){const b=fs.readFileSync(new URL('./'+f,import.meta.url));assert.equal(b.toString('ascii',0,4),'wOFF');assert.ok(b.length>50000);}
for(const action of ['gather','inventory','water','scene','brewOpen','brewSelect','brewStarted','brewFinished','night','fireOpen','fireView','fireTaken'])assert.ok(code.includes("guideAction('"+action+"'"),'successful action hook '+action);
console.log('PASS guide: action-driven progress, wrong actions, pause/resume/replay, insufficient materials, growing garden, existing cooking/used fire, daily-limit explanations, migration/import, decorative frame, local fonts and unique IDs');

// The resume chip is itself a .hud: its own hit area must override .hud pointer-events:none.
const resumeCSS=[...html.matchAll(/\.guide-resume\{([^}]+)\}/g)].map(m=>m[1]).join(';');
assert.match(resumeCSS,/pointer-events\s*:\s*auto(?:;|$)/,'resume button accepts pointer/touch input');
const resumeNodes=new Map([['#guideResume',{hidden:false}]]);
const resumeCtx={state:{guide:{topic:'basic',step:'brewPick',paused:true}},guideShown:false,commitCount:0,renderCount:0,$:id=>resumeNodes.get(id)};
vm.createContext(resumeCtx);
vm.runInContext('function commit(){commitCount++}function renderGuide(){renderCount++}',resumeCtx);
const handler=code.match(/\$\('#guideResume'\)\.onclick=\(\)=>\{[^\n]+/)[0];
vm.runInContext(handler,resumeCtx);resumeNodes.get('#guideResume').onclick();
assert.equal(resumeCtx.state.guide.paused,false);assert.equal(resumeCtx.guideShown,true);
assert.equal(resumeCtx.state.guide.step,'brewPick','resume preserves the current step');
assert.equal(resumeCtx.commitCount,1);assert.equal(resumeCtx.renderCount,1);
console.log('PASS resume: tappable HUD button restores the paused guide without restarting progress');
// Execute actual card mounting with dialog/scene transitions. The dialog owns the
// card in normal flow, and unrelated dialogs must not display floating guidance.
function node(id){return {id,hidden:false,style:{},parentElement:null,classes:new Set(),classList:{add(c){this.owner.classes.add(c)},remove(c){this.owner.classes.delete(c)},contains(c){return this.owner.classes.has(c)}},append(child){child.parentElement=this},prepend(child){child.parentElement=this},insertAdjacentElement(_,child){child.parentElement=this.parentElement}}}
const card=node('guideCoach'),game=node('game');for(const n of [card,game])n.classList.owner=n;
let active=[];const panels=new Map();for(const id of ['mRain','mBrew','mCampfire','mHelp']){const modal=node(id),panel=node(id+'Panel'),sub=node(id+'Sub');sub.parentElement=panel;panels.set(modal,{panel,sub});}
const layoutCtx={state:{guide:{topic:'basic',step:'water'}},cleared:0,$:(sel,scope)=>sel==='#guideCoach'?card:sel==='#game'?game:sel==='.dlg'?panels.get(scope)?.panel:sel==='.sub'?Array.from(panels.values()).find(x=>x.panel===scope)?.sub:null,$$:()=>active};
vm.createContext(layoutCtx);vm.runInContext('function clearGuideTarget(){cleared++}',layoutCtx);
vm.runInContext(code.slice(code.indexOf('function mountGuideCard(){'),code.indexOf('function renderGuide(){'))+';this.mount=mountGuideCard;',layoutCtx);
for(const [topic,step,id] of [['basic','water','mRain'],['basic','brewPick','mBrew'],['basic','brewConfirm','mBrew'],['basic','brewResult','mBrew'],['fire','fireWood','mCampfire'],['fire','fireCooking','mCampfire'],['fire','fireResult','mCampfire']]){
 layoutCtx.state.guide={topic,step};active=[...panels.keys()].filter(x=>x.id===id);assert.equal(layoutCtx.mount(),true);assert.equal(card.parentElement,panels.get(active[0]).panel);assert.ok(card.classes.has('guide-inline'));assert.equal(card.style.top,'');
}
active=[...panels.keys()].filter(x=>x.id==='mHelp');assert.equal(layoutCtx.mount(),false);assert.equal(card.hidden,true);
active=[];assert.equal(layoutCtx.mount(),true);assert.equal(card.parentElement,game);assert.equal(card.classes.has('guide-inline'),false);
assert.match(html,/\.modal \.dlg>\.guide-inline\{[^}]*position:relative!important/);
assert.ok(code.includes("if(d.next==='room'){closeModals();}"),'next scene dismisses rain choices');
vm.runInContext('state.guide.topic="basic";state.guide.step="water";state.garden.phase="watered";',saveCtx);opened.add('#mRain');assert.equal(saveCtx.desc().target,'[data-rain]');assert.equal(saveCtx.desc().next,'room');opened.delete('#mRain');
console.log('PASS layout: rain, brewing and campfire guide cards live inside dialog flow; unrelated dialogs hide them; scene return restores HUD; watered-rain explanation and exit remain available');
