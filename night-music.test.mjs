import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';import crypto from 'node:crypto';
const html=fs.readFileSync(new URL('./index.html',import.meta.url),'utf8');
const code=html.slice(html.indexOf('function createMusicPlayer('),html.indexOf('const musicPlayer='));
const create=vm.runInNewContext(code+';createSceneMusicPlayer');
function audio(){return {paused:true,volume:0,plays:0,play(){this.plays++;this.paused=false;return Promise.resolve();},pause(){this.paused=true;}};}
let settings={bgm:true,bgmVol:.7},isNight=false,hidden=false;const day=audio(),night=audio();const player=create(day,night,()=>settings,()=>isNight,()=>hidden);
player.resume();assert.equal(day.plays+night.plays,0,'title remains silent');
player.setMusic(true);assert.equal(day.paused,false);assert.equal(night.paused,true);assert.equal(day.loop,true);assert.equal(night.loop,true);
isNight=true;player.resume();assert.equal(day.paused,true);assert.equal(night.paused,false,'night command selects supplied music');
isNight=false;player.resume();assert.equal(day.paused,false);assert.equal(night.paused,true);
for(let i=0;i<20;i++){isNight=!isNight;player.resume();assert.equal(day.paused,isNight);assert.equal(night.paused,!isNight);}
settings.bgm=false;player.setMusic(false);isNight=!isNight;player.resume();assert.equal(day.paused,true);assert.equal(night.paused,true);
settings.bgm=true;player.setMusic(true);hidden=true;player.pause();player.resume();assert.equal(day.paused,true);assert.equal(night.paused,true);
hidden=false;player.resume();assert.equal(night.paused,!isNight);assert.equal(day.paused,isNight);
settings.bgmVol=0;player.applyVolumes();assert.equal(day.volume,0);assert.equal(night.volume,0);
settings.bgmVol=2;player.applyVolumes();assert.equal(day.volume,.55);assert.equal(night.volume,.55);
// A delayed play response for the old track must not restart it after switching.
const lateDay=audio(),lateNight=audio();let lateResolve;lateDay.play=()=>new Promise(resolve=>{lateResolve=()=>{lateDay.paused=false;resolve();};});isNight=false;
const late=create(lateDay,lateNight,()=>settings,()=>isNight,()=>false);late.setMusic(true);isNight=true;late.resume();lateResolve();await Promise.resolve();assert.equal(lateDay.paused,true);assert.equal(lateNight.paused,false);
// A saved night view starts on the night track only after entering.
const savedDay=audio(),savedNight=audio();const saved=create(savedDay,savedNight,()=>settings,()=>true,()=>false);saved.resume();assert.equal(savedNight.plays,0);saved.setMusic(true);assert.equal(savedNight.plays,1);assert.equal(savedDay.plays,0);
// A browser rejection remains safe, and the next user gesture can retry.
const rejectDay=audio(),rejectNight=audio();rejectNight.play=()=>Promise.reject(new Error('blocked'));const rejected=create(rejectDay,rejectNight,()=>settings,()=>true,()=>false);rejected.setMusic(true);await new Promise(r=>setImmediate(r));rejectNight.play=function(){this.paused=false;return Promise.resolve();};rejected.resume();assert.equal(rejectNight.paused,false);
const media=fs.readFileSync(new URL('./night-bgm.mp3',import.meta.url));assert.equal(media.length,6384000);assert.equal(crypto.createHash('sha256').update(media).digest('hex'),'5f11725305e33dcc4bc16fa3b9187a0a680ffe32ee6008822aae78226ecff9a7');
assert.ok(html.includes('id="nightMusic" loop preload="auto" playsinline src="./night-bgm.mp3"'));assert.ok(html.includes('制作：優日のすたるじっく'));assert.ok(html.includes('https://youtu.be/uTzAU7xYYqg'));assert.ok(html.includes("sfx.setScene(night&&cur==='garden'?'fire':cur);musicPlayer.resume();"));
console.log('PASS night music: entry, saved night, day/night switching, rapid changes, delayed play, mute, volume, visibility, rejection retry, exact supplied MP3 and credits');
