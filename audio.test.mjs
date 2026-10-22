import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const html=fs.readFileSync(new URL('./index.html',import.meta.url),'utf8');
const code=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)][1][1];
let events=0,nodes=0;
function param(){return {value:0,setValueAtTime(v,t){assert(Number.isFinite(v)&&Number.isFinite(t)&&t>=0);events++;},linearRampToValueAtTime(v,t){this.setValueAtTime(v,t);},exponentialRampToValueAtTime(v,t){assert(v>0);this.setValueAtTime(v,t);},setTargetAtTime(v,t,d){assert(d>0);this.setValueAtTime(v,t);}};}
function node(){nodes++;return {gain:param(),frequency:param(),Q:param(),connect(){},disconnect(){},start(t=0){assert(t>=0);},stop(t){assert(Number.isFinite(t)&&t>=0);}};}
const c={sampleRate:22050,currentTime:0,createGain:node,createOscillator:node,createBiquadFilter:node,createConvolver:node,createBufferSource:node,createBuffer(ch,n){assert(n>0);return {getChannelData(){return new Float32Array(n);}};}};
const sandbox={Math,Number,console,c,out:node()};vm.createContext(sandbox);
const start=code.indexOf('const mtof=');const end=code.indexOf('function createMusicPlayer(');
vm.runInContext(code.slice(start,end)+'\nthis.kit=makeSfxKit(c,out);this.bgm=makeBgm(c,out);',sandbox);
for(const name of ['click','toggle','sparkle','soft','water','harvest','brew','discover','fail','coin'])sandbox.kit[name]();
sandbox.bgm.resync(0);sandbox.bgm.run(130); // Several complete sections, including the echo variation.
assert(events>1000);assert(nodes<10000);
// Existing save imports preserve inventory, coins and BGM/SFX volume while adding optional defaults.
const dataStart=code.indexOf('const ATTRS=');const dataEnd=code.indexOf('let state=fresh()');
assert(dataEnd>dataStart);
vm.runInContext(code.slice(dataStart,dataEnd)+'\nthis.sanitizeSave=sanitize;this.newSave=fresh;',sandbox);
const before={version:2,coins:85,inventory:{m001:3},settings:{bgm:false,bgmVol:.4,sfxVol:0},garden:{phase:'empty'},recipes:{},potions:{},requests:{}};
const saved=sandbox.sanitizeSave(before);
assert.equal(saved.coins,85);assert.equal(saved.inventory.m001,3);assert.equal(saved.settings.sfxVol,0);assert.equal(saved.settings.bgm,false);assert.equal(saved.settings.ambVol,.3);assert.equal(saved.settings.haptics,false);
assert.equal(sandbox.sanitizeSave({...before,settings:{ambVol:9,haptics:true}}).settings.ambVol,1);
assert.equal(sandbox.sanitizeSave({...before,settings:{ambVol:0}}).settings.ambVol,0);
const original=fs.existsSync(new URL('../github-single-file-before-audio.html',import.meta.url))?fs.readFileSync(new URL('../github-single-file-before-audio.html',import.meta.url),'utf8'):null;
if(original){const images=s=>[...s.matchAll(/data:image\/jpeg;base64,([A-Za-z0-9+/=]+)/g)].map(m=>m[1]);assert.deepEqual(images(html),images(original));}
console.log('PASS: 10 sound types, 130s BGM scheduling, finite audio envelopes, old-save compatibility, silent volume and optional haptics.');
console.log('Audio graph scheduling checks do not replace listening tests on an actual device.');
