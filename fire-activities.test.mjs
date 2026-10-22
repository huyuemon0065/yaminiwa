import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
const html=fs.readFileSync(new URL('./index.html',import.meta.url),'utf8'),code=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)][1][1];
new vm.Script(code);
const engine=code.slice(code.indexOf('const FIRE_FOODS='),code.indexOf('/* END FIRE ENGINE */'));
const ctx={guideAction(){}};vm.createContext(ctx);vm.runInContext(engine+';Object.assign(this,{make:newFire,act:fireActivity,clean:cleanFire,start:fireStart,poll:pollFire,take:fireTake,night:fireNight,drinks:FIRE_DRINKS,stories:FIRE_STORIES,instruments:FIRE_INSTRUMENTS});',ctx);
assert.equal(ctx.drinks.b.length,13);assert.equal(ctx.drinks.m.length,3);assert.equal(ctx.drinks.t.length,6);assert.equal(ctx.stories.length,6);assert.equal(ctx.instruments.length,6);
const now=Date.UTC(2026,9,22,13),f=ctx.make(),recipe={base:12,method:2,topping:5};
assert.equal(ctx.act(f,'drink',recipe,now,false).ok,false);assert.equal(f.activities.drink.last,null);
for(const choice of [{base:-1,method:0,topping:0},{base:13,method:0,topping:0},{base:0,method:NaN,topping:0},{base:0,method:0,topping:6}])assert.equal(ctx.act(f,'drink',choice,now,true).ok,false);
assert.equal(ctx.start(f,1,'normal',now,true).ok,true);const cooking=JSON.stringify(f.cooking);
assert.equal(ctx.act(f,'drink',recipe,now,true).ok,true);assert.equal(ctx.act(f,'drink',recipe,now+1,true).ok,false);
assert.equal(ctx.act(f,'story','ss',now,true,()=>.1).ok,true);assert.equal(ctx.act(f,'story','sj',now,true).ok,false);
assert.equal(ctx.act(f,'music',5,now,true).ok,true);assert.equal(ctx.act(f,'music',0,now,true).ok,false);assert.equal(JSON.stringify(f.cooking),cooking,'other activities preserve the cooking timer');
assert.equal(ctx.clean(f).activities.drink.last.base,12);assert.equal(ctx.clean(f).activities.story.last.id,f.activities.story.last.id);assert.equal(ctx.clean(f).activities.music.last.instrument,5);
assert.equal(ctx.poll(f,now+60000).notify,true,'ready notification continues during activities');assert.equal(ctx.take(f,now+61000).q,1);
const boundary=Date.UTC(2026,9,22,20);assert.notEqual(ctx.night(boundary-1),ctx.night(boundary),'JST 05:00 reset');
const g=ctx.make();assert.equal(ctx.act(g,'drink',recipe,boundary-1,true).ok,true);assert.equal(ctx.act(g,'drink',recipe,boundary,true).ok,true);
assert.equal(ctx.act(ctx.make(),'story','invalid',now,true).ok,false);assert.equal(ctx.act(ctx.make(),'story','random',now,true,()=>1).ok,false);assert.equal(ctx.act(ctx.make(),'music',6,now,true).ok,false);
assert.equal(ctx.clean({}).activities.drink.night,-1,'old saves receive independent activity slots');assert.equal(ctx.clean({activities:{drink:{night:1,last:{base:99,method:0,topping:0,at:1}}}}).activities.drink.last,null);
// Exercise the real renderer for all branches, including cooking in parallel.
const body={innerHTML:'',insertAdjacentHTML(_p,s){this.innerHTML=s+this.innerHTML;}},foot={textContent:''},nodes={};
ctx.$=s=>s==='#fireBody'?body:s==='#fireFootnote'?foot:body.innerHTML.includes('id="'+s.slice(1)+'"')?(nodes[s]??={focus(){}}):null;
ctx.$$=()=>[];ctx.document={getElementById:id=>ctx.$('#'+id)};ctx.updateFireClock=()=>{};ctx.takeFire=()=>{};ctx.flushSave=()=>{};ctx.sfx={soft(){},sparkle(){},perform(){}};
vm.runInContext('let fireStep="hub",fireWood="normal",fireFood=1;const FIRE_QUALITY=["生焼け…","大成功！","焦げちゃった…"];const FIRE_ART={};const fireFoodBy=id=>FIRE_FOODS.find(x=>x.id===id);let state={garden:{time:"night"},fire:newFire()};',ctx);
vm.runInContext(code.slice(code.indexOf('let drinkChoice='),code.indexOf('function takeFire(){')),ctx);
const render=s=>{vm.runInContext('fireStep='+JSON.stringify(s)+';renderFire();',ctx);const ids=[...body.innerHTML.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length,'unique rendered ids '+s);};
for(const s of ['hub','drink','drinkMethod','drinkTopping','drinkConfirm','story','music','wood','food','confirm']){render(s);assert.ok(!body.innerHTML.includes('<img'),'no result art during selection '+s);}
vm.runInContext('fireStart(state.fire,1,"normal",Date.now(),true);',ctx);
for(const s of ['hub','drink','story','music']){render(s);assert.ok(body.innerHTML.includes('fireReturnCooking'),'can return to cooking from '+s);assert.ok(body.innerHTML.includes('fireCompactClock'));}
render('cooking');assert.ok(body.innerHTML.includes('fireTakeButton'));
vm.runInContext('fireActivity(state.fire,"drink",{base:0,method:1,topping:3},Date.now(),true);fireActivity(state.fire,"story","sm",Date.now(),true);fireActivity(state.fire,"music",1,Date.now(),true);',ctx);
render('drink');assert.ok(body.innerHTML.includes('<img'));assert.ok(body.innerHTML.includes('マシュマロ'));assert.ok(body.innerHTML.includes('ベースのイメージ'));
render('story');assert.ok(!body.innerHTML.includes('〔P〕'));render('music');assert.ok(body.innerHTML.includes('オカリナ'));
assert.ok(!code.includes("if(state.fire.cooking){fireStep='cooking';}else fireStep=v"));assert.ok(html.includes('value="drink"'));assert.ok(html.includes('value="story"'));assert.ok(html.includes('value="music"'));assert.ok(code.includes('sfx.perform(choice)'));
console.log('PASS activities: 13 drinks / 3 methods / 6 toppings, original 6 stories / 6 instruments, independent night limits, JST boundary, save migration, validation, parallel cooking, all renderer branches, result-only illustrations, unique rendered IDs and menu navigation');
