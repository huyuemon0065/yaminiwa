import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
const html=fs.readFileSync(new URL('./index.html',import.meta.url),'utf8');const code=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)][1][1];
const a=code.indexOf('const FIRE_FOODS='),b=code.indexOf('/* END FIRE ENGINE */',a);const x={};vm.createContext(x);vm.runInContext(code.slice(a,b)+';Object.assign(this,{foods:FIRE_FOODS,woods:FIRE_WOODS,fresh:newFire,clean:cleanFire,start:fireStart,take:fireTake,eat:fireEat,night:fireNight});',x);
assert.equal(x.foods.length,16);assert.equal(x.foods.some(f=>f.id===13),false,'owner-only dish is excluded');assert.equal(x.woods.length,3);
let cases=0;const now=Date.UTC(2026,9,22,12);
for(const food of x.foods)for(const wood of x.woods)for(const [offset,q] of [[59999,0],[60000,1],[180000,1],[180001,2]]){
 const f=x.fresh();assert.equal(x.start(f,food.id,wood.id,now,true).ok,true);assert.equal(x.start(f,food.id,wood.id,now,true).ok,false);const r=x.take(f,now+offset);assert.equal(r.q,q);assert.equal(x.take(f,now+offset),null);assert.equal(f.history.length,1);assert.equal(Object.values(f.book)[0],1);assert.equal(x.start(f,food.id,wood.id,now+offset,true).ok,false);assert.equal(x.eat(f),q>0);assert.equal(x.eat(f),false);cases++;
}
let f=x.fresh();const before=JSON.stringify(f);for(const args of [[999,'normal',now,true],[1,'invalid',now,true],[1,'normal',NaN,true],[1,'normal',now,false]])assert.equal(x.start(f,...args).ok,false);assert.equal(JSON.stringify(f),before);
assert.equal(x.night(Date.UTC(2026,9,22,19,59,59)),x.night(Date.UTC(2026,9,22,20))-1,'night resets at JST 05:00');
f=x.fresh();x.start(f,1,'rainbow',now,true);let loaded=x.clean(JSON.parse(JSON.stringify(f)));assert.equal(loaded.cooking.ready,now+60000);assert.equal(x.take(loaded,now+70000).q,1);assert.equal(x.clean(loaded).last.wood,'rainbow');assert.equal(x.clean({cooking:{food:13,wood:'normal',at:now}}).cooking,null);
assert.equal(x.clean({last:{food:1,wood:'normal',at:NaN,q:1}}).last,null);
const data=code.slice(code.indexOf('const ATTRS='),code.indexOf('let state=fresh()'));const saveBox={};vm.createContext(saveBox);vm.runInContext(data+';this.cleanSave=sanitize;',saveBox);
const old={version:2,coins:72,inventory:{m001:4},garden:{phase:'watered',wateredAt:now},settings:{bgm:false,bgmVol:0,sfxVol:0}};
const migrated=saveBox.cleanSave(old);assert.equal(migrated.coins,72);assert.equal(migrated.inventory.m001,4);assert.equal(migrated.settings.bgm,false);assert.equal(migrated.garden.wateredAt,now);assert.equal(migrated.garden.time,'day');assert.equal(migrated.fire.cooking,null);
const nightSave=saveBox.cleanSave({...old,garden:{...old.garden,time:'night'},fire:f});assert.equal(nightSave.garden.time,'night');assert.equal(nightSave.fire.cooking.food,1);
const ids=[...html.replace(/<script>[\s\S]*?<\/script>/g,'').matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length);assert.equal((html.match(/class="night-art"/g)||[]).length,2);
const assets=code.match(/const FIRE_ART=(\{.*?\});/)[1];assert.equal(Object.keys(JSON.parse(assets)).length,64);for(const food of x.foods)for(const mode of ['normal','spicy','rainbow','burnt'])assert.ok(JSON.parse(assets)[String(food.id).padStart(2,'0')+'-'+mode]);
assert.ok(!html.includes('data-fire-wood="13"'));assert.ok(html.includes('id="fireDestination" value="fire"'));
console.log('PASS campfire:',cases,'food/wood/timing cases, duplicate prevention, one per night, 05:00 reset, invalid inputs, reload/import, old save, 64 illustrations, night views and unique IDs');
