import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
const html=fs.readFileSync(new URL('./index.html',import.meta.url),'utf8');const code=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)][1][1];
const a=code.indexOf('function applyWatering('),b=code.indexOf('const RAIN_NAMES=',a),ctx={};vm.createContext(ctx);vm.runInContext(code.slice(a,b)+';this.water=applyWatering;',ctx);
for(const kind of ['milk','lemon','water']){
 const g={phase:'empty',wateredAt:0,careBoost:true};assert.equal(ctx.water(g,kind,10000).watered,true);assert.equal(g.phase,'watered');assert.equal(g.wateredAt,10000);assert.equal(g.rainType,kind);assert.equal(g.careBoost,true);
 assert.equal(ctx.water(g,kind,12000).watered,false);assert.equal(g.wateredAt,10000);assert.equal(g.rainUntil,30000);
 const ready={phase:'ready',wateredAt:42,careBoost:false};assert.equal(ctx.water(ready,kind,20000).watered,false);assert.equal(ready.phase,'ready');assert.equal(ready.wateredAt,42);
}
const g={phase:'empty',wateredAt:0};assert.equal(ctx.water(g,'bad',123),null);assert.equal(ctx.water(g,'milk',NaN),null);assert.equal(g.phase,'empty');
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length);
assert.equal((html.match(/data-rain-art=/g)||[]).length,4);assert.equal((html.match(/class="rain-choice"/g)||[]).length,2);assert(html.includes('prefers-reduced-motion:reduce'));
console.log('PASS: both magical rains + normal rain; first watering, repeated preview, ready plants, invalid input, no timer reset; unique element IDs and wide/tall art.');
