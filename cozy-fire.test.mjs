import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
const html=fs.readFileSync(new URL('./index.html',import.meta.url),'utf8'),code=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)][1][1];
const a=code.indexOf('const FIRE_FOODS='),b=code.indexOf('/* END FIRE ENGINE */',a);
const ctx={};vm.createContext(ctx);vm.runInContext(code.slice(a,b)+';Object.assign(this,{make:newFire,start:fireStart,poll:pollFire,take:fireTake,clean:cleanFire});',ctx);
const now=Date.UTC(2026,9,22,12),f=ctx.make();ctx.start(f,1,'normal',now,true);
assert.equal(ctx.poll(f,now+59999).notify,false);assert.equal(ctx.poll(f,now+60000).notify,true);assert.equal(ctx.poll(f,now+61000).notify,false);assert.equal(ctx.clean(f).cooking.notified,true);assert.equal(ctx.poll(ctx.clean(f),now+90000).notify,false,'reload does not repeat ready sound');
assert.equal(ctx.poll(f,now+180000).phase,'ready');assert.equal(ctx.poll(f,now+180001).phase,'burnt');assert.equal(ctx.poll(f,NaN),null);assert.equal(ctx.poll(f,now-1),null);
const missed=ctx.make();ctx.start(missed,2,'rainbow',now,true);assert.equal(ctx.poll(missed,now+180001).phase,'burnt');assert.equal(ctx.poll(missed,now+180002).notify,false);
ctx.take(f,now+70000);assert.equal(ctx.poll(f,now+71000),null);
// Render the real screen function with a minimal DOM. Images are allowed only in completed results/history.
const body={innerHTML:'',insertAdjacentHTML(_p,s){this.innerHTML+=s;}},foot={textContent:''};const nodes={};
ctx.$=s=>{if(s==='#fireBody')return body;if(s==='#fireFootnote')return foot;const id=s.slice(1);if(body.innerHTML.includes('id="'+id+'"'))return nodes[id]??={focus(){},classList:{contains(){return true;}}};return null;};ctx.$$=()=>[];ctx.document={getElementById:id=>ctx.$('#'+id)};ctx.updateFireClock=()=>{};ctx.sfx={};
vm.runInContext('let fireStep="wood",fireWood="normal",fireFood=1;const FIRE_QUALITY=["生焼け…","大成功！","焦げちゃった…"];const FIRE_ART=new Proxy({},{get(){return "data:image/webp;base64,AA==";}});const fireFoodBy=id=>FIRE_FOODS.find(x=>x.id===id);let state={fire:newFire()};',ctx);
vm.runInContext(code.slice(code.indexOf('function fireArt('),code.indexOf('function syncNight()')),ctx);
const helper=code.slice(code.indexOf('function fireImageHTML('),code.indexOf('function takeFire(){'));
vm.runInContext(helper,ctx);
for(const view of ['wood','food','confirm']){vm.runInContext('fireStep='+JSON.stringify(view)+';renderFire();',ctx);assert.ok(!body.innerHTML.includes('<img'),view+' must not reveal cooked artwork');}
vm.runInContext('fireStart(state.fire,1,"normal",100000,true);fireTake(state.fire,170000);fireStep="result";renderFire();',ctx);assert.ok(body.innerHTML.includes('<img'),'completed result shows artwork');
vm.runInContext('fireStep="book";renderFire();',ctx);assert.ok(body.innerHTML.includes('<img'),'past cooked food keeps its artwork');
// Exercise the actual global notification UI with its cooking modal closed.
let tickNow=160000,modalOpen=false,sounds=0,saves=0;const notice={hidden:true,dataset:{}},noticeText={textContent:''};
ctx.$=selector=>selector==='#fireNotice'?notice:selector==='#fireNoticeText'?noticeText:selector==='#mCampfire'?{classList:{contains(){return modalOpen;}}}:null;
ctx.Date={now:()=>tickNow};ctx.started=true;ctx.flushSave=()=>{saves++;};ctx.sfx={sparkle(){sounds++;},soft(){sounds++;}};
vm.runInContext('let fireNoticeDismissed="";state.fire=newFire();fireStart(state.fire,1,"normal",100000,true);fireStep="cooking";',ctx);
vm.runInContext(code.slice(code.indexOf('function updateFireClock(){'),code.indexOf("$('#fireNoticeOpen').addEventListener")),ctx);
vm.runInContext('updateFireClock();',ctx);assert.equal(notice.hidden,false);assert.ok(noticeText.textContent.includes('焼けたよ'));assert.equal(sounds,1);assert.equal(saves,1);
vm.runInContext('updateFireClock();',ctx);assert.equal(sounds,1);
modalOpen=true;vm.runInContext('updateFireClock();',ctx);assert.equal(notice.hidden,true,'modal already displays readiness');
modalOpen=false;vm.runInContext('fireTake(state.fire,170000);updateFireClock();',ctx);assert.equal(notice.hidden,true,'taking food removes the notification');
const update=code.slice(code.indexOf('function updateFireClock(){'),code.indexOf("$('#fireMenu').addEventListener"));assert.ok(!update.includes("if(!c||!$('#mCampfire')"),'notification is not gated by the open cooking modal');assert.ok(update.includes('info=started?pollFire'));assert.ok(update.includes('notice.hidden=!show'));
assert.equal((html.match(/class="fire-fx"/g)||[]).length,2);assert.ok(html.includes('drawCampfireFX(now)'));assert.ok(html.includes('if(!reduced){'));assert.ok(html.includes('now-lastFireFX<33'));assert.ok(html.includes('id="fireNotice" role="status" aria-live="polite" hidden'));
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length);
console.log('PASS cozy fire: no pre-cook artwork, cooked/history artwork retained, global readiness, one-time sound/reload, late return, safe boundaries, wide/phone effects, reduced motion, frame cap and unique IDs');
