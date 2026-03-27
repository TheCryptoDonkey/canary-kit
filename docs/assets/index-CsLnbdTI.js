const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./maplibre-gl-B2k4QVOw.css","./toast-C4N9aZta.js","./toast-CgbN074q.js","./sync-CTwt-KD4.js","./sync-CwEABoV0.js","./persona-Dsq2HFSt.js","./secp256k1-C_bO5q2F.js","./sha2-CYoIH8nM.js","./hmac-DQiyGg8T.js","./shamir-modal-gCFr2z9i.js","./state-CLSKUA-n.js","./types-CzyfO6OG.js","./escape-DpAnlPWD.js","./dist-WfeG15f_.js","./english-mdr-mXCq.js","./linkage-proof-uFP-kPrh.js","./persona-picker-BUfNbhnS.js","./persona-Dokjm9UC.js","./persona-tree-PFALM7An.js","./nip19-CMkgf31k.js","./base-Ed-gKsml.js","./bip39-DavBqmoH.js","./bip39-DvIKHvPh.js","./english-DbZVR_DO.js","./mnemonic-BvFL4mtR.js","./mnemonic-BV7pFTpA.js","./export-modal-BfxhDh8-.js","./persona-CkGuvy9J.js","./connect-B8zPYnAS.js","./connect-BehTCNdg.js","./profiles-CPYVn98y.js","./profiles-De-8whYi.js","./pure-DPIhlgK_.js","./liveness-DQaL8XIC.js","./header-eK0tL-2b.js","./nip44-BYfilQ3Z.js"])))=>i.map(i=>d[i]);
import{a as e,i as t,n,o as r,r as i,s as a,t as o}from"./types-CzyfO6OG.js";import{a as s,i as c,n as l,o as u,t as d}from"./state-CLSKUA-n.js";import{S as f,_ as p,a as m,b as h,c as g,f as _,g as v,h as y,i as b,m as ee,n as x,o as te,p as ne,r as S,s as re,t as ie,v as ae,x as oe,y as se}from"./header-eK0tL-2b.js";import{t as ce}from"./secp256k1-C_bO5q2F.js";import{i as le,r as ue,t as de}from"./pure-DPIhlgK_.js";import{n as fe,r as C,t as pe}from"./nip44-BYfilQ3Z.js";import{A as me,D as he,E as ge,F as _e,I as ve,L as ye,M as be,N as xe,O as Se,P as w,T as Ce,_ as we,d as Te,f as Ee,g as De,h as Oe,j as ke,k as Ae,m as je,p as Me,v as Ne,y as Pe}from"./sync-CwEABoV0.js";import{c as Fe,i as Ie,l as Le,n as Re,r as ze,t as Be,u as Ve}from"./persona-Dokjm9UC.js";import{i as He,r as Ue,t as T}from"./persona-tree-PFALM7An.js";import{a as We,i as Ge,n as Ke,o as qe,r as E,s as Je}from"./connect-BehTCNdg.js";import{t as D}from"./toast-CgbN074q.js";import{t as Ye}from"./nip19-CMkgf31k.js";import{t as O}from"./escape-DpAnlPWD.js";import{n as Xe,t as Ze}from"./persona-picker-BUfNbhnS.js";import{a as Qe,c as $e,i as et,o as tt,r as nt}from"./profiles-De-8whYi.js";var rt=Object.create,it=Object.defineProperty,at=Object.getOwnPropertyDescriptor,ot=Object.getOwnPropertyNames,st=Object.getPrototypeOf,ct=Object.prototype.hasOwnProperty,lt=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),ut=(e,t)=>{let n={};for(var r in e)it(n,r,{get:e[r],enumerable:!0});return t||it(n,Symbol.toStringTag,{value:`Module`}),n},dt=(e,t,n,r)=>{if(t&&typeof t==`object`||typeof t==`function`)for(var i=ot(t),a=0,o=i.length,s;a<o;a++)s=i[a],!ct.call(e,s)&&s!==n&&it(e,s,{get:(e=>t[e]).bind(null,s),enumerable:!(r=at(t,s))||r.enumerable});return e},ft=(e,t,n)=>(n=e==null?{}:rt(st(e)),dt(t||!e||!e.__esModule?it(n,`default`,{value:e,enumerable:!0}):n,e));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function pt(e){let t=Math.floor(e/86400);if(t>=1)return`${t}d`;let n=Math.floor(e/3600);return n>=1?`${n}h`:`${Math.floor(e/60)}m`}function mt(e){return e?`
    <div class="identity-badge">
      <span class="identity-badge__name">${O(e.displayName??`${e.pubkey.slice(0,8)}…`)}</span>
    </div>
  `:``}function ht(e,t){let n=Object.values(e);if(n.length===0)return`<div class="group-list__empty">No groups yet</div>`;let{activePersonaId:r,personas:i}=l();return n.map(e=>{let n=e.id===t,a=n?` group-list__item--active`:``,o=pt(e.livenessInterval),s=pt(e.livenessInterval),c=e.personaId?Object.values(i).find(t=>t.id===e.personaId):void 0,l=c?Ze(c.name):``,u=c?.archived||r&&e.personaId!==r?` hidden`:``;return`
        <button
          class="group-list__item${a}"
          data-group-id="${O(e.id)}"
          aria-current="${n?`true`:`false`}"
          ${u}
        >
          ${l}<span class="group-list__name">${O(e.name)}</span>
          <span class="group-list__preset">${O(o)} · ${O(s)}</span>
        </button>
      `}).join(``)}function gt(e){let{identity:t,groups:n,activeGroupId:r}=l();e.innerHTML=`
    <div class="sidebar__tagline">spoken-word verification</div>
    ${mt(t)}
    <nav class="group-list" aria-label="Groups">
      ${ht(n,r)}
    </nav>
    <button class="btn btn--primary" id="create-group-btn">+ New Group</button>
    <button class="btn btn--sm sidebar__sync-btn" id="sync-groups-btn" title="Sync groups from other devices">Sync Groups</button>
  `,e.querySelector(`.group-list`)?.addEventListener(`click`,e=>{let t=e.target.closest(`[data-group-id]`);if(!t)return;let n=t.dataset.groupId;n&&s({activeGroupId:n})}),e.querySelector(`#create-group-btn`)?.addEventListener(`click`,()=>{e.dispatchEvent(new CustomEvent(`canary:create-group`,{bubbles:!0}))}),e.querySelector(`#sync-groups-btn`)?.addEventListener(`click`,()=>{document.dispatchEvent(new CustomEvent(`canary:sync-vault`))})}var _t=`app-modal`;function vt(e,t){let n=document.getElementById(_t);if(n||(n=document.createElement(`dialog`),n.id=_t,n.className=`modal`,document.body.appendChild(n)),n.innerHTML=`
    <form class="modal__form" method="dialog" id="modal-form">
      ${e}
    </form>
  `,t){let e=n.querySelector(`#modal-form`);e?.addEventListener(`submit`,n=>{n.preventDefault(),t(new FormData(e)),yt()})}n.addEventListener(`click`,e=>{e.target===n&&yt()}),n.showModal()}function yt(){document.getElementById(_t)?.close()}var bt=/^[0-9a-f]{64}$/,xt=/^[0-9b-hjkmnp-z]+$/,St=new TextEncoder().encode(`canary:beacon:key`),Ct=new TextEncoder().encode(`canary:duress:key`);function wt(e){if(!bt.test(e))throw Error(`seedHex must be a 64-character lowercase hex string (32 bytes)`)}function Tt(e){if(e.length!==32)throw Error(`AES-256-GCM requires a 32-byte key`)}function Et(e){return wt(e),_e(w(e),St)}function Dt(e){return wt(e),_e(w(e),Ct)}async function Ot(e,t){Tt(e);let n=crypto.getRandomValues(new Uint8Array(12)),r=await crypto.subtle.importKey(`raw`,e,{name:`AES-GCM`},!1,[`encrypt`]),i=new Uint8Array(await crypto.subtle.encrypt({name:`AES-GCM`,iv:n},r,t)),a=new Uint8Array(12+i.length);return a.set(n),a.set(i,12),ke(a)}async function kt(e,t,n){if(typeof t!=`string`||t.length===0||t.length>11)throw Error(`geohash must be a non-empty string of at most 11 characters`);if(!xt.test(t))throw Error(`geohash contains invalid characters (valid: 0-9, b-h, j-k, m-n, p-z)`);if(!Number.isInteger(n)||n<1||n>11)throw Error(`precision must be an integer between 1 and 11`);let r={geohash:t,precision:n,timestamp:Math.floor(Date.now()/1e3)};return Ot(e,new TextEncoder().encode(JSON.stringify(r)))}function At(e,t,n){if(!bt.test(e))throw Error(`Invalid member pubkey: expected 64 lowercase hex characters, got ${e.length} chars`);if(t){if(typeof t.geohash!=`string`||t.geohash.length===0||t.geohash.length>11)throw Error(`location.geohash must be a non-empty string of at most 11 characters`);if(!xt.test(t.geohash))throw Error(`location.geohash contains invalid characters (valid: 0-9, b-h, j-k, m-n, p-z)`);if(!Number.isInteger(t.precision)||t.precision<1||t.precision>11)throw Error(`location.precision must be an integer between 1 and 11`);return{type:`duress`,member:e,geohash:t.geohash,precision:t.precision,locationSource:t.locationSource,timestamp:Math.floor(Date.now()/1e3),scope:n?.scope??`group`,...n?.originGroupId!==void 0&&{originGroupId:n.originGroupId}}}return{type:`duress`,member:e,geohash:``,precision:0,locationSource:`none`,timestamp:Math.floor(Date.now()/1e3),scope:n?.scope??`group`,...n?.originGroupId!==void 0&&{originGroupId:n.originGroupId}}}async function jt(e,t){return Ot(e,new TextEncoder().encode(JSON.stringify(t)))}function Mt(){let{identity:e}=l();if(!e?.pubkey)throw Error(`No local identity — cannot perform privileged action.`);return e.pubkey}function Nt(e){let t=Mt();if(!e.admins.includes(t))throw Error(`Not authorised — you are not an admin of "${e.name}".`)}function Pt(e){let t=new Uint8Array(e.length/2);for(let n=0;n<e.length;n+=2)t[n/2]=parseInt(e.slice(n,n+2),16);return t}function Ft(e,t,n,r){let i=crypto.randomUUID(),a=Me({name:e,members:n?[n]:[],preset:t,creator:n}),o=l().settings,c=[...o.defaultReadRelays??o.defaultRelays],u=[...o.defaultWriteRelays??o.defaultRelays],d={family:`words`,"field-ops":`words`,enterprise:`words`,event:`pin`},f={...a,id:i,nostrEnabled:u.length>0||c.length>0,relays:u,readRelays:c,writeRelays:u,encodingFormat:d[t]??`words`,usedInvites:[],latestInviteIssuedAt:0,livenessInterval:a.rotationInterval,livenessCheckins:{},tolerance:1,memberNames:{},duressMode:`immediate`,personaId:r??``},{groups:p}=l();return s({groups:{...p,[i]:f},activeGroupId:i}),n&&b(i,{type:`member-join`,pubkey:n,timestamp:Math.floor(Date.now()/1e3),epoch:0,opId:crypto.randomUUID()}),i}function It(e){let{groups:t,activeGroupId:n,deletedGroupIds:r}=l(),i={...t};delete i[e];let a=r.includes(e)?r:[...r,e];s({groups:i,activeGroupId:n===e?null:n,deletedGroupIds:a}),document.dispatchEvent(new CustomEvent(`canary:vault-publish-now`))}function Lt(e){let{groups:t}=l(),n=t[e];if(!n){console.warn(`[canary:actions] reseedGroup: unknown group id "${e}"`);return}Nt(n);let r=Oe(n),i=(n.epoch??0)+1,a=crypto.randomUUID(),o=[...n.admins??[]];b(e,{type:`reseed`,seed:Pt(r.seed),counter:r.counter,timestamp:Math.floor(Date.now()/1e3),epoch:i,opId:a,admins:o,members:[...n.members]}),u(e,{...r,epoch:i,consumedOps:[a],admins:o}),te(e)}function Rt(e){let{groups:t}=l(),n=t[e];if(!n){console.warn(`[canary:actions] compromiseReseed: unknown group id "${e}"`);return}Nt(n);let r=Oe(n),i=(n.epoch??0)+1;u(e,{...r,epoch:i,consumedOps:[],admins:[...n.admins??[]]}),te(e)}function zt(e,t,n){let{groups:r}=l(),i=r[e];if(!i){console.warn(`[canary:actions] addGroupMember: unknown group id "${e}"`);return}Nt(i);let a=crypto.randomUUID();u(e,{...Te(i,t),consumedOps:[...i.consumedOps??[],a]}),te(e),b(e,{type:`member-join`,pubkey:t,displayName:n||void 0,timestamp:Math.floor(Date.now()/1e3),epoch:i.epoch??0,opId:a})}function Bt(e,t){let{groups:n}=l(),r=n[e];if(!r){console.warn(`[canary:actions] removeGroupMember: unknown group id "${e}"`);return}if(t!==Mt()&&Nt(r),!r.members.includes(t))return;let i=Oe(je(r,t)),a=(r.epoch??0)+1,o={...r.memberNames??{}};delete o[t];let s={...r.livenessCheckins??{}};delete s[t];let c=(r.admins??[]).filter(e=>e!==t);u(e,{...i,memberNames:o,livenessCheckins:s,admins:c,epoch:a,consumedOps:[]}),te(e)}function Vt(e){let{groups:t}=l(),n=t[e];if(!n){console.warn(`[canary:actions] burnWord: unknown group id "${e}"`);return}let r=Ee(n);u(e,r),b(e,{type:`counter-advance`,counter:r.counter,usageOffset:r.usageOffset,timestamp:Math.floor(Date.now()/1e3)})}var Ht=/^[0-9a-f]{64}$/;function Ut(e){if(!e||typeof e!=`object`)throw Error(`Import failed — expected a JSON object.`);let t=e;if(typeof t.name!=`string`||t.name.trim().length===0)throw Error(`Import failed — name is required.`);if(typeof t.seed!=`string`||!Ht.test(t.seed))throw Error(`Import failed — seed must be a 64-character lowercase hex string.`);if(!Array.isArray(t.members)||t.members.length===0)throw Error(`Import failed — members must be a non-empty array.`);for(let e of t.members)if(typeof e!=`string`||!Ht.test(e))throw Error(`Import failed — invalid member pubkey: "${String(e)}".`);if(Array.isArray(t.admins)){for(let e of t.admins)if(typeof e!=`string`||!Ht.test(e))throw Error(`Import failed — invalid admin pubkey: "${String(e)}".`);let e=new Set(t.members);for(let n of t.admins)if(!e.has(n))throw Error(`Import failed — admin "${n}" is not in the members list.`)}if(t.rotationInterval!==void 0&&(typeof t.rotationInterval!=`number`||!Number.isInteger(t.rotationInterval)||t.rotationInterval<=0))throw Error(`Import failed — rotationInterval must be a positive integer.`);if(t.wordCount!==void 0&&t.wordCount!==1&&t.wordCount!==2&&t.wordCount!==3)throw Error(`Import failed — wordCount must be 1, 2, or 3.`);if(t.encodingFormat!==void 0&&t.encodingFormat!==`words`&&t.encodingFormat!==`pin`&&t.encodingFormat!==`hex`)throw Error(`Import failed — encodingFormat must be words, pin, or hex.`);if(t.epoch!==void 0&&(typeof t.epoch!=`number`||!Number.isInteger(t.epoch)||t.epoch<0))throw Error(`Import failed — epoch must be a non-negative integer.`);if(t.consumedOps!==void 0&&(!Array.isArray(t.consumedOps)||!t.consumedOps.every(e=>typeof e==`string`)))throw Error(`Import failed — consumedOps must be an array of strings.`)}function Wt(e){let{groups:t}=l();if(Object.keys(t).length>0){e.hidden=!0;return}e.hidden=!1,e.innerHTML=`
    <section class="welcome">
      <h1 class="welcome__title">CANARY</h1>
      <p class="welcome__subtitle">Protect your people with rotating verification words</p>

      <div class="welcome__steps">
        <div class="welcome__step">
          <span class="welcome__step-num">01</span>
          <span class="welcome__step-text">Create a group with your family or team</span>
        </div>
        <div class="welcome__step">
          <span class="welcome__step-num">02</span>
          <span class="welcome__step-text">Share the invite — in person or via paste code</span>
        </div>
        <div class="welcome__step">
          <span class="welcome__step-num">03</span>
          <span class="welcome__step-text">Everyone derives the same word from the shared seed</span>
        </div>
        <div class="welcome__step">
          <span class="welcome__step-num">04</span>
          <span class="welcome__step-text">Words rotate automatically. Emergency words signal danger.</span>
        </div>
      </div>

      <div class="welcome__actions">
        <button class="btn btn--primary btn--lg" id="welcome-create">Create Group</button>
        <button class="btn btn--ghost btn--lg" id="welcome-join">Join with Invite</button>
      </div>
    </section>
  `,document.getElementById(`welcome-create`).addEventListener(`click`,()=>{document.dispatchEvent(new CustomEvent(`canary:create-group`))}),document.getElementById(`welcome-join`).addEventListener(`click`,()=>{document.dispatchEvent(new CustomEvent(`canary:join-group`))})}var k=`canary:group`;function A(e){switch(e.encodingFormat){case`pin`:return{format:`pin`,digits:6};case`hex`:return{format:`hex`,length:8};default:return{format:`words`,count:e.wordCount}}}function Gt(e,t){return t===`pin`&&e.length===6?`${e.slice(0,3)}-${e.slice(3)}`:t===`hex`&&e.length===8?`${e.slice(0,4)}-${e.slice(4)}`:e}function Kt(e,t){let{identity:n}=l();return n?.pubkey===e?`You`:t.memberNames?.[e]||e.slice(0,8)+`…`}var qt=null;function Jt(){qt!==null&&(clearInterval(qt),qt=null)}function Yt(e=new Date){return e.toISOString().slice(11,19)+` UTC`}function Xt(e){return e.replace(/[a-zA-Z0-9]/g,`•`)}var Zt=`ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789•·∘◦○●◈◆▪▫`;function Qt(e,t,n=600){let r=t.length,i=Math.ceil(n/30),a=e=>Math.floor(e/r*i*.7)+Math.floor(i*.3),o=0,s=setInterval(()=>{o++;let n=``;for(let e=0;e<r;e++)o>=a(e)?n+=t[e]:n+=Zt[Math.floor(Math.random()*65)];e.textContent=n,o>=i&&(clearInterval(s),e.textContent=t)},30)}function $t(e){if(e<=0)return`0s`;let t=Math.floor(e/86400),n=Math.floor(e%86400/3600),r=Math.floor(e%3600/60),i=Math.floor(e%60);return t>=1?n>0?`${t}d ${n}h`:`${t}d`:n>=1?r>0?`${n}h ${r}m`:`${n}h`:r>=1?i>0?`${r}m ${i}s`:`${r}m`:`${i}s`}function en(e){let t=Math.floor(Date.now()/1e3),n=(Ce(t,e.rotationInterval)+1)*e.rotationInterval;return Math.max(0,n-t)}var tn=[`Sun`,`Mon`,`Tue`,`Wed`,`Thu`,`Fri`,`Sat`],nn=[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`,`Sep`,`Oct`,`Nov`,`Dec`];function rn(e,t){if(t>=86400){let t=new Date(Date.now()+e*1e3);return`rotates ${tn[t.getUTCDay()]} ${t.getUTCDate()} ${nn[t.getUTCMonth()]} at ${String(t.getUTCHours()).padStart(2,`0`)}:${String(t.getUTCMinutes()).padStart(2,`0`)} UTC (${$t(e)})`}return`rotates in ${$t(e)} · ${Yt()}`}function an(e){let{identity:t}=l(),n=e.counter+e.usageOffset;return he(e.seed,k,n,A(e),t?.pubkey)}function on(e){let{identity:t}=l();if(!t?.pubkey)return null;let n=e.counter+e.usageOffset;return we(e.seed,k,t.pubkey,n,A(e),e.tolerance)}function sn(t){Jt();let{groups:n,activeGroupId:r}=l();if(!r){t.innerHTML=``;return}let i=n[r];if(!i){t.innerHTML=``;return}let a=De(i);if(a!==i){u(r,a);return}let o=Gt(an(i),i.encodingFormat),s=on(i),c=s?Gt(s,i.encodingFormat):null,d=Xt(o),f=en(i);t.innerHTML=`
    <section class="hero">

      <div class="hero__word-container">
        <div class="hero__word hero__word--masked" id="hero-word">${d}</div>
        <button
          class="hero__reveal-btn btn"
          id="hero-reveal-btn"
          type="button"
          aria-label="Hold to reveal verification word"
        >Hold to Reveal</button>
      </div>

      <div class="hero__countdown">
        <div class="hero__progress">
          <div class="hero__progress-bar" id="hero-progress-bar" style="width: ${Math.min(100,Math.max(0,(i.rotationInterval-f)/i.rotationInterval*100))}%"></div>
        </div>
        <span class="hero__countdown-label" id="hero-countdown-label">${rn(f,i.rotationInterval)}</span>
      </div>

      <p class="hero__hint">Press and hold to reveal. Tap the right side for your alternate word.</p>

      <button class="btn btn--ghost" id="burn-btn" type="button" title="Rotate to a new word now. All group members will get a new word too.">I used this word</button>
      <button class="btn btn--outline" id="hero-invite-btn" type="button" title="Share group access with someone new">Invite Someone</button>
      ${i.members.length>=2?`<button class="btn btn--outline" id="hero-call-btn" type="button" title="Start a phone call verification">Verify Call</button>`:``}

    </section>
  `;let p=t.querySelector(`#hero-word`),m=t.querySelector(`#hero-reveal-btn`);function h(e){p&&(p.textContent=e&&c?c:o,p.classList.remove(`hero__word--masked`),p.classList.add(`hero__word--revealed`))}function g(){p&&(p.textContent=d,p.classList.remove(`hero__word--revealed`),p.classList.add(`hero__word--masked`))}m&&(m.addEventListener(`pointerdown`,e=>{e.preventDefault();let t=m.getBoundingClientRect();h(e.clientX-t.left>t.width/2)}),m.addEventListener(`pointerup`,g),m.addEventListener(`pointerleave`,g),m.addEventListener(`pointercancel`,g)),t.querySelector(`#burn-btn`)?.addEventListener(`click`,()=>{try{Vt(r),D(e(l().groups[r]??i)===`online`?`Word rotated — syncing to group`:`Word rotated`,`success`,2e3),document.dispatchEvent(new CustomEvent(`canary:vault-publish-now`)),requestAnimationFrame(()=>{let e=document.getElementById(`hero-word`);e&&Qt(e,e.textContent??`••••••••`)})}catch(e){D(e instanceof Error?e.message:`Failed to rotate word`,`error`)}}),t.querySelector(`#hero-invite-btn`)?.addEventListener(`click`,()=>{document.dispatchEvent(new CustomEvent(`canary:show-invite`,{detail:{groupId:r}}))}),t.querySelector(`#hero-call-btn`)?.addEventListener(`click`,()=>{let{identity:e}=l(),t=i.members.filter(t=>t!==e?.pubkey);if(t.length===0)return;if(t.length===1){document.dispatchEvent(new CustomEvent(`canary:verify-call`,{detail:{groupId:r,pubkey:t[0]}}));return}let n=t.map(e=>`
      <button class="btn btn--outline member-pick-btn" data-pubkey="${O(e)}" type="button" style="width:100%;text-align:left;margin-bottom:0.5rem;">
        ${O(Kt(e,i))}
      </button>
    `).join(``),a=document.getElementById(`member-picker`);a||(a=document.createElement(`dialog`),a.id=`member-picker`,a.className=`modal`,document.body.appendChild(a)),a.innerHTML=`
      <div class="modal__form" style="min-width:240px;">
        <h2 class="modal__title">Who are you calling?</h2>
        ${n}
        <div class="modal__actions">
          <button class="btn" id="picker-cancel" type="button">Cancel</button>
        </div>
      </div>
    `,a.querySelector(`#picker-cancel`)?.addEventListener(`click`,()=>a.close()),a.addEventListener(`click`,e=>{e.target===a&&a.close()}),a.querySelectorAll(`.member-pick-btn`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.pubkey;a.close(),t&&document.dispatchEvent(new CustomEvent(`canary:verify-call`,{detail:{groupId:r,pubkey:t}}))})}),a.showModal()});let _=t.querySelector(`#hero-progress-bar`),v=t.querySelector(`#hero-countdown-label`);qt=setInterval(()=>{let{groups:e}=l(),n=e[r];if(!n){Jt();return}let i=en(n),a=Math.min(100,Math.max(0,(n.rotationInterval-i)/n.rotationInterval*100));_&&(_.style.width=`${a}%`),v&&(v.textContent=rn(i,n.rotationInterval)),i===0&&(Jt(),sn(t))},1e3)}var cn=`canary:duress-dismissed`;function ln(){try{let e=localStorage.getItem(cn);return e?new Set(JSON.parse(e)):new Set}catch{return new Set}}function un(e){let t=ln();t.add(e),localStorage.setItem(cn,JSON.stringify([...t]))}function dn(e){let t=ln();t.delete(e),localStorage.setItem(cn,JSON.stringify([...t]))}function fn(e,t){let n=l().groups[t];if(!n)return e.slice(0,8);let{identity:r}=l();return r?.pubkey===e?`You`:n.memberNames?.[e]||`${e.slice(0,8)}\u2026${e.slice(-4)}`}function pn(e){let t=Math.floor(Date.now()/1e3)-e;if(t<30)return`just now`;if(t<60)return`${t}s ago`;let n=Math.floor(t/60);return n<60?`${n} min ago`:new Date(e*1e3).toLocaleTimeString()}function mn(e,t,n,r,i){if(!i&&ln().has(e))return;let a=document.querySelector(`.duress-overlay`);a&&a.remove();let o=fn(e,t),s=r?pn(r):new Date().toLocaleTimeString(),c=document.createElement(`div`);c.className=`duress-overlay`,c.dataset.subject=e,c.dataset.groupId=t,c.setAttribute(`role`,`alertdialog`),c.setAttribute(`aria-label`,`${o} needs help`);let u=document.createElement(`div`);u.className=`duress-overlay__content`;let d=document.createElement(`div`);d.className=`duress-overlay__icon`,d.setAttribute(`aria-hidden`,`true`),d.textContent=`!`,u.appendChild(d);let f=document.createElement(`h1`);f.className=`duress-overlay__title`,f.textContent=o,u.appendChild(f);let p=document.createElement(`h2`);if(p.className=`duress-overlay__subtitle`,p.textContent=`NEEDS HELP`,u.appendChild(p),n&&(n.lat!==0||n.lon!==0)){let e=document.createElement(`p`);e.className=`duress-overlay__location`,e.textContent=`Last known: ${n.lat.toFixed(4)}, ${n.lon.toFixed(4)}`,u.appendChild(e)}let m=document.createElement(`p`);m.className=`duress-overlay__time`,m.textContent=s,u.appendChild(m);let h=document.createElement(`button`);h.className=`btn btn--lg duress-overlay__dismiss`,h.textContent=`I'm Responding`,h.title=`Dismiss this alert on your screen only — does not clear the duress for others`,h.addEventListener(`click`,()=>{un(e),c.classList.remove(`duress-overlay--visible`),setTimeout(()=>c.remove(),300)}),u.appendChild(h);let g=document.createElement(`button`);g.className=`btn btn--lg duress-overlay__stand-down`,g.textContent=`Stand Down — Person is Safe`,g.title=`Broadcast to all group members that this person has been confirmed safe`,g.addEventListener(`click`,()=>{un(e),b(t,{type:`duress-clear`,subject:e,timestamp:Math.floor(Date.now()/1e3),opId:crypto.randomUUID()}),c.classList.remove(`duress-overlay--visible`),setTimeout(()=>c.remove(),300);let{identity:n}=l();D(`Duress stood down for ${o} by ${n?.pubkey===e?`Self`:fn(n?.pubkey??``,t)}`,`success`)}),u.appendChild(g),c.appendChild(u),document.body.appendChild(c),requestAnimationFrame(()=>c.classList.add(`duress-overlay--visible`));function _(e){e.key===`Escape`&&(c.classList.remove(`duress-overlay--visible`),setTimeout(()=>c.remove(),300),document.removeEventListener(`keydown`,_))}document.addEventListener(`keydown`,_)}document.addEventListener(`canary:duress-clear`,(e=>{let{subject:t,clearedBy:n}=e.detail;dn(t);let r=Array.from(document.querySelectorAll(`.duress-overlay`)).find(e=>e.dataset.subject===t);r&&(r.classList.remove(`duress-overlay--visible`),setTimeout(()=>r.remove(),300));let i=e.detail.groupId,a=fn(t,i),o=fn(n,i);D(t===n?`${a} self-cleared their duress`:`${o} confirmed ${a} is safe`,`success`)}));function hn(e){let t=new Uint32Array(1);return crypto.getRandomValues(t),t[0]%e}function gn(e){let{groups:t,activeGroupId:n,identity:r}=l();if(r?.pubkey===e)return`You`;if(!n)return e.slice(0,8)+`…`;let i=t[n];return i&&i.memberNames?.[e]||e.slice(0,8)+`…`}function _n(e,t){let n=[],r=new Set(t);for(;n.length<e;){let e=me(hn(Ae)).toLowerCase();r.has(e)||(r.add(e),n.push(e))}return n}function vn(e){for(let t=e.length-1;t>0;t--){let n=hn(t+1);[e[t],e[n]]=[e[n],e[t]]}return e}function yn(e,t){for(let n of e)mn(n,t,void 0,Math.floor(Date.now()/1e3),!0);document.dispatchEvent(new CustomEvent(`canary:duress`,{detail:{members:e},bubbles:!0}));let{groups:n}=l(),r=n[t];if(!r)return;let i=Dt(r.seed);for(let n of e)jt(i,At(n,null)),b(t,{type:`duress-alert`,lat:0,lon:0,timestamp:Math.floor(Date.now()/1e3),opId:crypto.randomUUID(),subject:n})}function bn(e){let{groups:t,activeGroupId:n}=l();if(!n){e.innerHTML=``;return}let r=t[n];if(!r){e.innerHTML=``;return}let{identity:i}=l(),a=r.members.filter(e=>e!==i?.pubkey);if(a.length===0){e.innerHTML=`
      <section class="panel verify-panel">
        <h2 class="panel__title">Verify Someone</h2>
        <p class="settings-hint">No other members to verify yet. Invite someone first.</p>
      </section>
    `;return}e.innerHTML=`
    <section class="panel verify-panel">
      <h2 class="panel__title">Verify Someone</h2>
      <p class="settings-hint">Who are you verifying?</p>

      <div class="verify-member-list" id="verify-member-list">
        ${a.map(e=>`<button class="verify-member-btn btn btn--outline" data-pubkey="${O(e)}" type="button">${O(gn(e))}</button>`).join(``)}
      </div>

      <div id="verify-choices-area" hidden>
        <p class="settings-hint" id="verify-prompt"></p>
        <div class="verify-choices" id="verify-choices"></div>
      </div>

      <details class="verify-fallback" style="margin-top: 0.75rem;">
        <summary class="settings-hint" style="cursor: pointer;">Type manually</summary>
        <div class="verify-form" style="margin-top: 0.5rem;">
          <input class="input" id="verify-input" type="text" placeholder="${r.encodingFormat===`pin`?`Enter PIN`:`Enter word`}" autocomplete="off" spellcheck="false" />
          <button class="btn btn--primary" id="verify-btn" type="button">Verify</button>
        </div>
      </details>

      <div id="verify-result" class="verify-result" hidden></div>
      <div style="display: flex; gap: 0.5rem; margin-top: 0.75rem;">
        <button class="btn btn--ghost" id="verify-back" type="button" hidden>Verify another</button>
      </div>
    </section>
  `;let o=e.querySelector(`#verify-member-list`),s=e.querySelector(`#verify-choices-area`),c=e.querySelector(`#verify-choices`),u=e.querySelector(`#verify-prompt`),d=e.querySelector(`#verify-result`),f=e.querySelector(`#verify-back`);function p(e){let{groups:t,activeGroupId:n}=l();if(!n)return;let r=t[n];if(!r)return;let i=Ce(Math.floor(Date.now()/1e3),r.rotationInterval)+r.usageOffset,a=A(r),f=he(r.seed,k,i,a,e).toLowerCase(),p=we(r.seed,k,e,i,a,r.tolerance)?.toLowerCase(),h=new Set([f]);p&&h.add(p);let g=_n(p?2:3,h),_=vn([f,...p?[p]:[],...g]);u.textContent=`Tap the word ${gn(e)} just said:`,d.hidden=!0,c.innerHTML=_.map(e=>`<button class="verify-choice" data-word="${O(e)}" type="button">${O(Gt(e,r.encodingFormat))}</button>`).join(``),o.hidden=!0,s.hidden=!1,c.querySelectorAll(`.verify-choice`).forEach(t=>{t.addEventListener(`click`,()=>m(t.dataset.word??``,t,e))})}function m(e,t,n){let{groups:r,activeGroupId:i}=l();if(!i)return;let a=r[i];if(!a)return;let o=Ce(Math.floor(Date.now()/1e3),a.rotationInterval)+a.usageOffset,s=Pe(a.seed,k,o,e,a.members,{encoding:A(a),tolerance:a.tolerance}),u=s.status===`valid`,p=gn(n);c.querySelectorAll(`.verify-choice`).forEach(e=>e.classList.remove(`verify-choice--correct`,`verify-choice--wrong`)),t.classList.add(u?`verify-choice--correct`:`verify-choice--wrong`),d.hidden=!1,d.className=`verify-result verify-result--${u?`valid`:`invalid`}`,d.textContent=u?`${p} is verified.`:`${p} gave the wrong word.`,f.hidden=!1,s.status===`duress`&&yn(s.identities??[],i)}e.querySelectorAll(`.verify-member-btn`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.pubkey;t&&p(t)})}),f.addEventListener(`click`,()=>{o.hidden=!1,s.hidden=!0,d.hidden=!0,f.hidden=!0});let h=e.querySelector(`#verify-input`),g=e.querySelector(`#verify-btn`);function _(){let e=h?.value.trim().toLowerCase().replace(/-/g,``)??``;if(!e)return;let{groups:t,activeGroupId:n}=l();if(!n)return;let r=t[n];if(!r)return;let i=Ce(Math.floor(Date.now()/1e3),r.rotationInterval)+r.usageOffset,a=Pe(r.seed,k,i,e,r.members,{encoding:A(r),tolerance:r.tolerance}),o=a.status===`valid`;d.hidden=!1,d.className=`verify-result verify-result--${o?`valid`:`invalid`}`,d.textContent=o?`Verified.`:`Wrong word.`,f.hidden=!1,a.status===`duress`&&yn(a.identities??[],n)}g?.addEventListener(`click`,_),h?.addEventListener(`keydown`,e=>{e.key===`Enter`&&_()})}function xn(e){let t=JSON.stringify(e),n=new TextEncoder().encode(t),r=``;for(let e=0;e<n.length;e++)r+=String.fromCharCode(n[e]);return btoa(r)}function Sn(e){let t=atob(e),n=new Uint8Array(t.length);for(let e=0;e<t.length;e++)n[e]=t.charCodeAt(e);return JSON.parse(new TextDecoder().decode(n))}function Cn(e){return xn(e).replace(/\+/g,`-`).replace(/\//g,`_`).replace(/=+$/,``)}function wn(e){let t=e.replace(/-/g,`+`).replace(/_/g,`/`),n=t.length%4;return n===2?t+=`==`:n===3&&(t+=`=`),Sn(t)}function Tn(e){let t=``;for(let n=0;n<e.length;n++)t+=String.fromCharCode(e[n]);return btoa(t).replace(/\+/g,`-`).replace(/\//g,`_`).replace(/=+$/,``)}function En(e){let t=e.replace(/-/g,`+`).replace(/_/g,`/`),n=t.length%4;n===2?t+=`==`:n===3&&(t+=`=`);let r=atob(t),i=new Uint8Array(r.length);for(let e=0;e<r.length;e++)i[e]=r.charCodeAt(e);return i}var Dn=/^[0-9a-f]{64}$/,On=/^[0-9a-f]{128}$/,kn=/^[0-9a-f]{32}$/;function An(e){let{adminSig:t,...n}=e,r=Object.keys(n).sort().reduce((e,t)=>(e[t]=n[t],e),{});return new TextEncoder().encode(JSON.stringify(r))}function jn(e){let{groupName:t,groupId:n,adminPubkey:r,adminPrivkey:i,relays:a,expiresInSec:o=86400}=e,s=new Uint8Array(16);crypto.getRandomValues(s);let c={groupName:t,groupId:n,adminPubkey:r,inviteId:be(s),expiresAt:Math.floor(Date.now()/1e3)+o,relays:[...a],adminSig:``},l=ve(An(c));return c.adminSig=be(ce.sign(l,w(i))),c}function Mn(e){if(typeof e!=`object`||!e)throw Error(`Remote invite token must be a non-null object`);let t=e;if(typeof t.groupName!=`string`||t.groupName.length===0)throw Error(`groupName must be a non-empty string`);if(typeof t.groupId!=`string`||t.groupId.length===0)throw Error(`groupId must be a non-empty string`);if(typeof t.adminPubkey!=`string`||!Dn.test(t.adminPubkey))throw Error(`adminPubkey must be a 64-character hex string`);if(typeof t.inviteId!=`string`||!kn.test(t.inviteId))throw Error(`inviteId must be a 32-character hex string`);if(typeof t.adminSig!=`string`||!On.test(t.adminSig))throw Error(`adminSig must be a 128-character hex string`);if(!Array.isArray(t.relays)||!t.relays.every(e=>typeof e==`string`))throw Error(`relays must be an array of strings`);if(typeof t.expiresAt!=`number`||!Number.isFinite(t.expiresAt))throw Error(`expiresAt must be a finite number`);let n=Math.floor(Date.now()/1e3);if(t.expiresAt<=n)throw Error(`Remote invite token has expired`);let r=e,i=ve(An(r));if(!ce.verify(w(r.adminSig),i,w(r.adminPubkey)))throw Error(`Remote invite token signature is invalid`)}function Nn(e){let{welcome:t,adminPrivkey:n,joinerPubkey:r}=e;return fe(JSON.stringify(t),C(w(n),r))}function Pn(e){let{envelope:t,joinerPrivkey:n,adminPubkey:r,expectedInviteId:i}=e,a=pe(t,C(w(n),r)),o=JSON.parse(a);if(typeof o.inviteId!=`string`||!kn.test(o.inviteId))throw Error(`Welcome payload must include a valid inviteId`);if(o.inviteId!==i)throw Error(`Welcome payload inviteId does not match the pending invite`);if(typeof o.seed!=`string`||!Dn.test(o.seed))throw Error(`Welcome payload seed must be a 64-character hex string`);if(typeof o.groupId!=`string`||o.groupId.length===0)throw Error(`Welcome payload must include a non-empty groupId`);return o}function Fn(e){if(e.startsWith(`wss://`))return!0;if(e.startsWith(`ws://`))try{let t=new URL(e);return t.hostname===`localhost`||t.hostname===`127.0.0.1`||t.hostname===`[::1]`}catch{return!1}return!1}var In=/^[0-9a-f]{64}$/,Ln=/^[0-9a-f]{128}$/,Rn=/^[0-9a-f]{32}$/,zn=10080*60,Bn=300;function j(e){return typeof e==`number`&&Number.isInteger(e)&&e>=0}function Vn(){let e=new Uint8Array(16);return crypto.getRandomValues(e),Array.from(e).map(e=>e.toString(16).padStart(2,`0`)).join(``)}function Hn(e){let t=e;if(!t||typeof t!=`object`)throw Error(`Invalid invite payload — expected an object.`);if(typeof t.groupId!=`string`||t.groupId.length===0)throw Error(`Invalid invite payload — groupId is required.`);if(typeof t.seed!=`string`||!In.test(t.seed))throw Error(`Invalid invite payload — seed must be 64-char hex.`);if(typeof t.groupName!=`string`||t.groupName.trim().length===0)throw Error(`Invalid invite payload — groupName is required.`);if(!Number.isInteger(t.rotationInterval)||t.rotationInterval<=0)throw Error(`Invalid invite payload — rotationInterval must be > 0.`);if(t.wordCount!==1&&t.wordCount!==2&&t.wordCount!==3)throw Error(`Invalid invite payload — wordCount must be 1, 2, or 3.`);if(typeof t.wordlist!=`string`||t.wordlist.length===0)throw Error(`Invalid invite payload — wordlist is required.`);if(!j(t.counter)||!j(t.usageOffset))throw Error(`Invalid invite payload — counter and usageOffset must be non-negative integers.`);if(typeof t.nonce!=`string`||!Rn.test(t.nonce))throw Error(`Invalid invite payload — nonce must be 32-char hex.`);if(!Number.isInteger(t.beaconInterval)||t.beaconInterval<=0)throw Error(`Invalid invite payload — beaconInterval must be > 0.`);if(!Number.isInteger(t.beaconPrecision)||t.beaconPrecision<1||t.beaconPrecision>11)throw Error(`Invalid invite payload — beaconPrecision must be 1..11.`);if(!Array.isArray(t.members)||!t.members.every(e=>typeof e==`string`&&In.test(e)))throw Error(`Invalid invite payload — members must be 64-char hex pubkeys.`);if(!Array.isArray(t.relays)||!t.relays.every(e=>typeof e==`string`&&Fn(e)))throw Error(`Invalid invite payload — relays must be wss:// URLs (or ws:// for localhost).`);if(t.encodingFormat!==`words`&&t.encodingFormat!==`pin`&&t.encodingFormat!==`hex`)throw Error(`Invalid invite payload — encodingFormat must be words|pin|hex.`);if(!j(t.tolerance))throw Error(`Invalid invite payload — tolerance must be a non-negative integer.`);if(t.tolerance>10)throw Error(`Invalid invite payload — tolerance must be <= 10.`);if(!j(t.issuedAt)||!j(t.expiresAt))throw Error(`Invalid invite payload — issuedAt/expiresAt must be unix seconds.`);if(t.expiresAt<=t.issuedAt)throw Error(`Invalid invite payload — expiresAt must be after issuedAt.`);if(!j(t.epoch))throw Error(`Invalid invite payload — epoch must be a non-negative integer.`);if(!Array.isArray(t.admins)||!t.admins.every(e=>typeof e==`string`&&In.test(e)))throw Error(`Invalid invite payload — admins must be 64-char hex pubkeys.`);let n=new Set(t.members);if(!t.admins.every(e=>n.has(e)))throw Error(`Invalid invite payload — all admins must be in members.`);if(t.protocolVersion===void 0||t.protocolVersion===null)throw Error(`Invalid invite payload — protocolVersion is required.`);if(t.protocolVersion!==2)throw Error(`Unsupported invite protocol version: ${t.protocolVersion} (expected: 2)`);if(typeof t.inviterPubkey!=`string`||!In.test(t.inviterPubkey))throw Error(`Invalid invite payload — inviterPubkey must be a 64-char hex pubkey.`);if(!t.admins.includes(t.inviterPubkey))throw Error(`Invalid invite payload — inviterPubkey must be in admins.`);if(typeof t.inviterSig!=`string`||!Ln.test(t.inviterSig))throw Error(`Invalid invite payload — inviterSig must be a 128-char hex Schnorr signature.`)}function Un(e){let{inviterSig:t,memberNames:n,relays:r,...i}=e,a=Object.keys(i).sort().reduce((e,t)=>(e[t]=i[t],e),{});return new TextEncoder().encode(JSON.stringify(a))}function Wn(e,t){let n=ve(Un(e));return be(ce.sign(n,w(t)))}function Gn(e){let t=ve(Un(e));return ce.verify(w(e.inviterSig),t,w(e.inviterPubkey))}function Kn(e){let{nonce:t,relays:n,memberNames:r,...i}=e,a=JSON.stringify(i),o=new TextEncoder,s=_e(w(t),o.encode(a)),c=s[0]<<25|s[1]<<17|s[2]<<9|s[3]<<1|s[4]>>7,l=c>>>22&2047,u=c>>>11&2047,d=c&2047;return`${me(l)} ${me(u)} ${me(d)}`}function qn(e){let{identity:t}=l();if(!t?.pubkey)throw Error(`No identity — sign in first.`);if(!t.privkey)throw Error(`Invite creation requires a local key (nsec). NIP-07 extensions cannot sign invites.`);if(!e.admins.includes(t.pubkey))throw Error(`Not authorised — you are not an admin of "${e.name}".`);let n=Vn(),r=Math.floor(Date.now()/1e3),i={groupId:e.id,seed:e.seed,groupName:e.name,rotationInterval:e.rotationInterval,wordCount:e.wordCount,wordlist:e.wordlist,counter:e.counter,usageOffset:e.usageOffset,nonce:n,beaconInterval:e.beaconInterval,beaconPrecision:e.beaconPrecision,members:[...e.members],relays:[...e.writeRelays??e.relays??[]],encodingFormat:e.encodingFormat??`words`,tolerance:e.tolerance??1,issuedAt:r,expiresAt:r+zn,epoch:e.epoch??0,admins:[...e.admins??[]],protocolVersion:2,inviterPubkey:t.pubkey,inviterSig:``,memberNames:{...e.memberNames}};return i.inviterSig=Wn(i,t.privkey),{payload:i,confirmCode:Kn(i)}}function Jn(e,t){let n;try{n=Sn(e)}catch{throw Error(`Invalid invite payload — could not decode.`)}Hn(n);let r={groupId:n.groupId,seed:n.seed,groupName:n.groupName,rotationInterval:n.rotationInterval,wordCount:n.wordCount,wordlist:n.wordlist,counter:n.counter,usageOffset:n.usageOffset,nonce:n.nonce,beaconInterval:n.beaconInterval,beaconPrecision:n.beaconPrecision,members:[...n.members],relays:[...n.relays],encodingFormat:n.encodingFormat,tolerance:n.tolerance,issuedAt:n.issuedAt,expiresAt:n.expiresAt,epoch:n.epoch,admins:[...n.admins],protocolVersion:n.protocolVersion,inviterPubkey:n.inviterPubkey,inviterSig:n.inviterSig,memberNames:n.memberNames&&typeof n.memberNames==`object`?{...n.memberNames}:void 0};if(!Gn(r))throw Error(`Invite signature is invalid — the inviter could not prove control of the admin key.`);if(!t?.trim())throw Error(`Confirmation code is required — ask the sender to read it to you.`);let i=Kn(r);if(t.trim().replace(/[-\s]+/g,` `).toLowerCase()!==i.toLowerCase())throw Error(`Confirmation words do not match — invite may have been tampered with.`);let a=Math.floor(Date.now()/1e3);if(r.expiresAt<=a)throw Error(`Invite has expired. Ask for a new invite.`);if(r.issuedAt>a+Bn)throw Error(`Invite timestamp is too far in the future — check your device clock.`);return r}function Yn(e,t){let{groups:n}=l(),r=n[e];return r?Array.isArray(r.usedInvites)&&r.usedInvites.includes(t):!1}function Xn(e,t){let{groups:n}=l(),r=n[e];if(!r){console.warn(`[canary:invite] consumeInvite: unknown group id "${e}"`);return}u(e,{usedInvites:Array.from(new Set([...r.usedInvites,t]))})}var Zn=10080*60;function Qn(e){let t=Object.keys(e).sort().reduce((t,n)=>(t[n]=e[n],t),{});return new TextEncoder().encode(JSON.stringify(t))}function $n(e,t){let n;try{n=Sn(e)}catch{return{valid:!1,error:`Invalid join token — could not decode.`}}if(n.g!==t.groupId)return{valid:!1,error:`Join token is for a different group.`};if(typeof n.p!=`string`||!In.test(n.p))return{valid:!1,error:`Join token has invalid pubkey.`};if(typeof n.s!=`string`||!Ln.test(n.s))return{valid:!1,error:`Join token has invalid signature.`};let r=Math.floor(Date.now()/1e3);if(typeof n.t!=`number`||n.t<r-Zn)return{valid:!1,error:`Join token has expired or is stale.`};if(n.t>r+Bn)return{valid:!1,error:`Join token timestamp is too far in the future.`};let{s:i,...a}=n,o=ve(Qn(a));try{if(!ce.verify(w(n.s),o,w(n.p)))return{valid:!1,error:`Join token signature is invalid.`}}catch{return{valid:!1,error:`Join token signature verification failed.`}}let s=(n.w||``).toLowerCase(),c=t.tolerance??1,l=!1;for(let e=t.counter-c;e<=t.counter+c;e++)if(!(e<0)&&s===he(t.groupSeed,t.context,e,t.encoding).toLowerCase()){l=!0;break}return l?{valid:!0,pubkey:n.p,displayName:n.n||``,word:n.w||``}:{valid:!1,error:`Join token word does not match — seed possession not proven.`}}var er=null;function tr(e){let{identity:t}=l();if(!t?.pubkey)throw Error(`No identity — sign in first.`);if(!t.privkey)throw Error(`Invite creation requires a local key (nsec). NIP-07 extensions cannot sign invites.`);if(!e.admins.includes(t.pubkey))throw Error(`Not authorised — you are not an admin of "${e.name}".`);let n=e.writeRelays?.length?[...e.writeRelays]:[...l().settings.defaultWriteRelays??l().settings.defaultRelays],r=jn({groupName:e.name,groupId:e.id,adminPubkey:t.pubkey,adminPrivkey:t.privkey,relays:n}),i=Cn(r);return er={groupId:e.id,tokenPayload:i,inviteId:r.inviteId},er}function nr(e,t){let{identity:n}=l();if(!n?.privkey)throw Error(`No local identity — cannot create welcome envelope.`);if(!er)throw Error(`No active remote invite session — cannot create welcome envelope.`);return Nn({welcome:{inviteId:er.inviteId,seed:e.seed,counter:e.counter,usageOffset:e.usageOffset,epoch:e.epoch??0,wordCount:e.wordCount,rotationInterval:e.rotationInterval,groupId:e.id,groupName:e.name,wordlist:e.wordlist,beaconInterval:e.beaconInterval,beaconPrecision:e.beaconPrecision,encodingFormat:e.encodingFormat??`words`,tolerance:e.tolerance??1,members:[...e.members],admins:[...e.admins??[]],relays:[...e.writeRelays??e.relays??[]],memberNames:e.memberNames?{...e.memberNames}:void 0},adminPrivkey:n.privkey,joinerPubkey:t})}function rr(){er=null}function ir(e){let t=new Uint8Array(e.length/2);for(let n=0;n<t.length;n++)t[n]=parseInt(e.substring(n*2,n*2+2),16);return t}function ar(e){let t=``;for(let n=0;n<e.length;n++)t+=e[n].toString(16).padStart(2,`0`);return t}var or={words:0,pin:1,hex:2},sr={0:`words`,1:`pin`,2:`hex`},cr={"en-v1":0},lr={0:`en-v1`},ur=1,dr=new TextEncoder,fr=new TextDecoder;function pr(e){let t=dr.encode(e.groupId),n=dr.encode(e.groupName),r=e.admins.map(t=>{let n=e.members.indexOf(t);if(n===-1)throw Error(`Admin ${t} not found in members array`);return n}),i=178+e.members.length*32+1+r.length+1+t.length+1+n.length,a=new ArrayBuffer(i),o=new DataView(a),s=new Uint8Array(a),c=0;o.setUint8(c,ur),c+=1,s.set(ir(e.seed),c),c+=32,s.set(ir(e.inviterPubkey),c),c+=32,s.set(ir(e.inviterSig),c),c+=64,s.set(ir(e.nonce),c),c+=16,o.setUint32(c,e.counter),c+=4,o.setUint16(c,e.usageOffset),c+=2,o.setUint32(c,e.epoch),c+=4,o.setUint32(c,e.rotationInterval),c+=4,o.setUint32(c,e.beaconInterval),c+=4,o.setUint8(c,e.beaconPrecision),c+=1,o.setUint8(c,e.wordCount),c+=1,o.setUint8(c,e.tolerance),c+=1,o.setUint8(c,or[e.encodingFormat]??0),c+=1,o.setUint8(c,cr[e.wordlist]??0),c+=1,o.setUint32(c,e.issuedAt),c+=4,o.setUint32(c,e.expiresAt),c+=4,o.setUint8(c,e.protocolVersion),c+=1,o.setUint8(c,e.members.length),c+=1;for(let t of e.members)s.set(ir(t),c),c+=32;o.setUint8(c,r.length),c+=1;for(let e of r)o.setUint8(c,e),c+=1;return o.setUint8(c,t.length),c+=1,s.set(t,c),c+=t.length,o.setUint8(c,n.length),c+=1,s.set(n,c),c+=n.length,s}function mr(e){let t=new DataView(e.buffer,e.byteOffset,e.byteLength),n=0,r=t.getUint8(n);if(n+=1,r!==ur)throw Error(`Unsupported binary invite version: ${r}`);let i=ar(e.slice(n,n+32));n+=32;let a=ar(e.slice(n,n+32));n+=32;let o=ar(e.slice(n,n+64));n+=64;let s=ar(e.slice(n,n+16));n+=16;let c=t.getUint32(n);n+=4;let l=t.getUint16(n);n+=2;let u=t.getUint32(n);n+=4;let d=t.getUint32(n);n+=4;let f=t.getUint32(n);n+=4;let p=t.getUint8(n);n+=1;let m=t.getUint8(n);n+=1;let h=t.getUint8(n);n+=1;let g=sr[t.getUint8(n)]??`words`;n+=1;let _=lr[t.getUint8(n)]??`en-v1`;n+=1;let v=t.getUint32(n);n+=4;let y=t.getUint32(n);n+=4;let b=t.getUint8(n);n+=1;let ee=t.getUint8(n);n+=1;let x=[];for(let t=0;t<ee;t++)x.push(ar(e.slice(n,n+32))),n+=32;let te=t.getUint8(n);n+=1;let ne=[];for(let e=0;e<te;e++){let e=t.getUint8(n);if(n+=1,e>=x.length)throw Error(`Invalid admin index ${e} in binary invite (${x.length} members)`);ne.push(x[e])}let S=t.getUint8(n);n+=1;let re=fr.decode(e.slice(n,n+S));n+=S;let ie=t.getUint8(n);n+=1;let ae=fr.decode(e.slice(n,n+ie));return n+=ie,{groupId:re,seed:i,groupName:ae,rotationInterval:d,wordCount:m,wordlist:_,counter:c,usageOffset:l,nonce:s,beaconInterval:f,beaconPrecision:p,members:x,relays:[],encodingFormat:g,tolerance:h,issuedAt:v,expiresAt:y,epoch:u,admins:ne,protocolVersion:b,inviterPubkey:a,inviterSig:o}}var M=function(e,t){let n=e,r=hr[t],i=null,a=0,o=null,s=[],c={},l=function(e,t){a=n*4+17,i=function(e){let t=Array(e);for(let n=0;n<e;n+=1){t[n]=Array(e);for(let r=0;r<e;r+=1)t[n][r]=null}return t}(a),u(0,0),u(a-7,0),u(0,a-7),p(),f(),h(e,t),n>=7&&m(e),o??=v(n,r,s),g(o,t)},u=function(e,t){for(let n=-1;n<=7;n+=1)if(!(e+n<=-1||a<=e+n))for(let r=-1;r<=7;r+=1)t+r<=-1||a<=t+r||(0<=n&&n<=6&&(r==0||r==6)||0<=r&&r<=6&&(n==0||n==6)||2<=n&&n<=4&&2<=r&&r<=4?i[e+n][t+r]=!0:i[e+n][t+r]=!1)},d=function(){let e=0,t=0;for(let n=0;n<8;n+=1){l(!0,n);let r=F.getLostPoint(c);(n==0||e>r)&&(e=r,t=n)}return t},f=function(){for(let e=8;e<a-8;e+=1)i[e][6]??(i[e][6]=e%2==0);for(let e=8;e<a-8;e+=1)i[6][e]??(i[6][e]=e%2==0)},p=function(){let e=F.getPatternPosition(n);for(let t=0;t<e.length;t+=1)for(let n=0;n<e.length;n+=1){let r=e[t],a=e[n];if(i[r][a]==null)for(let e=-2;e<=2;e+=1)for(let t=-2;t<=2;t+=1)e==-2||e==2||t==-2||t==2||e==0&&t==0?i[r+e][a+t]=!0:i[r+e][a+t]=!1}},m=function(e){let t=F.getBCHTypeNumber(n);for(let n=0;n<18;n+=1){let r=!e&&(t>>n&1)==1;i[Math.floor(n/3)][n%3+a-8-3]=r}for(let n=0;n<18;n+=1){let r=!e&&(t>>n&1)==1;i[n%3+a-8-3][Math.floor(n/3)]=r}},h=function(e,t){let n=r<<3|t,o=F.getBCHTypeInfo(n);for(let t=0;t<15;t+=1){let n=!e&&(o>>t&1)==1;t<6?i[t][8]=n:t<8?i[t+1][8]=n:i[a-15+t][8]=n}for(let t=0;t<15;t+=1){let n=!e&&(o>>t&1)==1;t<8?i[8][a-t-1]=n:t<9?i[8][15-t-1+1]=n:i[8][15-t-1]=n}i[a-8][8]=!e},g=function(e,t){let n=-1,r=a-1,o=7,s=0,c=F.getMaskFunction(t);for(let t=a-1;t>0;t-=2)for(t==6&&--t;;){for(let n=0;n<2;n+=1)if(i[r][t-n]==null){let a=!1;s<e.length&&(a=(e[s]>>>o&1)==1),c(r,t-n)&&(a=!a),i[r][t-n]=a,--o,o==-1&&(s+=1,o=7)}if(r+=n,r<0||a<=r){r-=n,n=-n;break}}},_=function(e,t){let n=0,r=0,i=0,a=Array(t.length),o=Array(t.length);for(let s=0;s<t.length;s+=1){let c=t[s].dataCount,l=t[s].totalCount-c;r=Math.max(r,c),i=Math.max(i,l),a[s]=Array(c);for(let t=0;t<a[s].length;t+=1)a[s][t]=255&e.getBuffer()[t+n];n+=c;let u=F.getErrorCorrectPolynomial(l),d=gr(a[s],u.getLength()-1).mod(u);o[s]=Array(u.getLength()-1);for(let e=0;e<o[s].length;e+=1){let t=e+d.getLength()-o[s].length;o[s][e]=t>=0?d.getAt(t):0}}let s=0;for(let e=0;e<t.length;e+=1)s+=t[e].totalCount;let c=Array(s),l=0;for(let e=0;e<r;e+=1)for(let n=0;n<t.length;n+=1)e<a[n].length&&(c[l]=a[n][e],l+=1);for(let e=0;e<i;e+=1)for(let n=0;n<t.length;n+=1)e<o[n].length&&(c[l]=o[n][e],l+=1);return c},v=function(e,t,n){let r=_r.getRSBlocks(e,t),i=vr();for(let t=0;t<n.length;t+=1){let r=n[t];i.put(r.getMode(),4),i.put(r.getLength(),F.getLengthInBits(r.getMode(),e)),r.write(i)}let a=0;for(let e=0;e<r.length;e+=1)a+=r[e].dataCount;if(i.getLengthInBits()>a*8)throw`code length overflow. (`+i.getLengthInBits()+`>`+a*8+`)`;for(i.getLengthInBits()+4<=a*8&&i.put(0,4);i.getLengthInBits()%8!=0;)i.putBit(!1);for(;!(i.getLengthInBits()>=a*8||(i.put(236,8),i.getLengthInBits()>=a*8));)i.put(17,8);return _(i,r)};c.addData=function(e,t){t||=`Byte`;let n=null;switch(t){case`Numeric`:n=yr(e);break;case`Alphanumeric`:n=br(e);break;case`Byte`:n=xr(e);break;case`Kanji`:n=Sr(e);break;default:throw`mode:`+t}s.push(n),o=null},c.isDark=function(e,t){if(e<0||a<=e||t<0||a<=t)throw e+`,`+t;return i[e][t]},c.getModuleCount=function(){return a},c.make=function(){if(n<1){let e=1;for(;e<40;e++){let t=_r.getRSBlocks(e,r),n=vr();for(let t=0;t<s.length;t++){let r=s[t];n.put(r.getMode(),4),n.put(r.getLength(),F.getLengthInBits(r.getMode(),e)),r.write(n)}let i=0;for(let e=0;e<t.length;e++)i+=t[e].dataCount;if(n.getLengthInBits()<=i*8)break}n=e}l(!1,d())},c.createTableTag=function(e,t){e||=2,t=t===void 0?e*4:t;let n=``;n+=`<table style="`,n+=` border-width: 0px; border-style: none;`,n+=` border-collapse: collapse;`,n+=` padding: 0px; margin: `+t+`px;`,n+=`">`,n+=`<tbody>`;for(let t=0;t<c.getModuleCount();t+=1){n+=`<tr>`;for(let r=0;r<c.getModuleCount();r+=1)n+=`<td style="`,n+=` border-width: 0px; border-style: none;`,n+=` border-collapse: collapse;`,n+=` padding: 0px; margin: 0px;`,n+=` width: `+e+`px;`,n+=` height: `+e+`px;`,n+=` background-color: `,n+=c.isDark(t,r)?`#000000`:`#ffffff`,n+=`;`,n+=`"/>`;n+=`</tr>`}return n+=`</tbody>`,n+=`</table>`,n},c.createSvgTag=function(e,t,n,r){let i={};typeof arguments[0]==`object`&&(i=arguments[0],e=i.cellSize,t=i.margin,n=i.alt,r=i.title),e||=2,t=t===void 0?e*4:t,n=typeof n==`string`?{text:n}:n||{},n.text=n.text||null,n.id=n.text?n.id||`qrcode-description`:null,r=typeof r==`string`?{text:r}:r||{},r.text=r.text||null,r.id=r.text?r.id||`qrcode-title`:null;let a=c.getModuleCount()*e+t*2,o,s,l,u,d=``,f;for(f=`l`+e+`,0 0,`+e+` -`+e+`,0 0,-`+e+`z `,d+=`<svg version="1.1" xmlns="http://www.w3.org/2000/svg"`,d+=i.scalable?``:` width="`+a+`px" height="`+a+`px"`,d+=` viewBox="0 0 `+a+` `+a+`" `,d+=` preserveAspectRatio="xMinYMin meet"`,d+=r.text||n.text?` role="img" aria-labelledby="`+y([r.id,n.id].join(` `).trim())+`"`:``,d+=`>`,d+=r.text?`<title id="`+y(r.id)+`">`+y(r.text)+`</title>`:``,d+=n.text?`<description id="`+y(n.id)+`">`+y(n.text)+`</description>`:``,d+=`<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>`,d+=`<path d="`,l=0;l<c.getModuleCount();l+=1)for(u=l*e+t,o=0;o<c.getModuleCount();o+=1)c.isDark(l,o)&&(s=o*e+t,d+=`M`+s+`,`+u+f);return d+=`" stroke="transparent" fill="black"/>`,d+=`</svg>`,d},c.createDataURL=function(e,t){e||=2,t=t===void 0?e*4:t;let n=c.getModuleCount()*e+t*2,r=t,i=n-t;return Dr(n,n,function(t,n){if(r<=t&&t<i&&r<=n&&n<i){let i=Math.floor((t-r)/e),a=Math.floor((n-r)/e);return c.isDark(a,i)?0:1}else return 1})},c.createImgTag=function(e,t,n){e||=2,t=t===void 0?e*4:t;let r=c.getModuleCount()*e+t*2,i=``;return i+=`<img`,i+=` src="`,i+=c.createDataURL(e,t),i+=`"`,i+=` width="`,i+=r,i+=`"`,i+=` height="`,i+=r,i+=`"`,n&&(i+=` alt="`,i+=y(n),i+=`"`),i+=`/>`,i};let y=function(e){let t=``;for(let n=0;n<e.length;n+=1){let r=e.charAt(n);switch(r){case`<`:t+=`&lt;`;break;case`>`:t+=`&gt;`;break;case`&`:t+=`&amp;`;break;case`"`:t+=`&quot;`;break;default:t+=r;break}}return t},b=function(e){e=e===void 0?2:e;let t=c.getModuleCount()*1+e*2,n=e,r=t-e,i,a,o,s,l,u={"██":`█`,"█ ":`▀`," █":`▄`,"  ":` `},d={"██":`▀`,"█ ":`▀`," █":` `,"  ":` `},f=``;for(i=0;i<t;i+=2){for(o=Math.floor((i-n)/1),s=Math.floor((i+1-n)/1),a=0;a<t;a+=1)l=`█`,n<=a&&a<r&&n<=i&&i<r&&c.isDark(o,Math.floor((a-n)/1))&&(l=` `),n<=a&&a<r&&n<=i+1&&i+1<r&&c.isDark(s,Math.floor((a-n)/1))?l+=` `:l+=`█`,f+=e<1&&i+1>=r?d[l]:u[l];f+=`
`}return t%2&&e>0?f.substring(0,f.length-t-1)+Array(t+1).join(`▀`):f.substring(0,f.length-1)};return c.createASCII=function(e,t){if(e||=1,e<2)return b(t);--e,t=t===void 0?e*2:t;let n=c.getModuleCount()*e+t*2,r=t,i=n-t,a,o,s,l,u=Array(e+1).join(`██`),d=Array(e+1).join(`  `),f=``,p=``;for(a=0;a<n;a+=1){for(s=Math.floor((a-r)/e),p=``,o=0;o<n;o+=1)l=1,r<=o&&o<i&&r<=a&&a<i&&c.isDark(s,Math.floor((o-r)/e))&&(l=0),p+=l?u:d;for(s=0;s<e;s+=1)f+=p+`
`}return f.substring(0,f.length-1)},c.renderTo2dContext=function(e,t){t||=2;let n=c.getModuleCount();for(let r=0;r<n;r++)for(let i=0;i<n;i++)e.fillStyle=c.isDark(r,i)?`black`:`white`,e.fillRect(i*t,r*t,t,t)},c};M.stringToBytes=function(e){let t=[];for(let n=0;n<e.length;n+=1){let r=e.charCodeAt(n);t.push(r&255)}return t},M.createStringToBytes=function(e,t){let n=function(){let n=Tr(e),r=function(){let e=n.read();if(e==-1)throw`eof`;return e},i=0,a={};for(;;){let e=n.read();if(e==-1)break;let t=r(),o=r(),s=r(),c=String.fromCharCode(e<<8|t);a[c]=o<<8|s,i+=1}if(i!=t)throw i+` != `+t;return a}();return function(e){let t=[];for(let r=0;r<e.length;r+=1){let i=e.charCodeAt(r);if(i<128)t.push(i);else{let i=n[e.charAt(r)];typeof i==`number`?(i&255)==i?t.push(i):(t.push(i>>>8),t.push(i&255)):t.push(63)}}return t}};var N={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},hr={L:1,M:0,Q:3,H:2},P={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},F=function(){let e=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],t=1335,n=7973,r={},i=function(e){let t=0;for(;e!=0;)t+=1,e>>>=1;return t};return r.getBCHTypeInfo=function(e){let n=e<<10;for(;i(n)-i(t)>=0;)n^=t<<i(n)-i(t);return(e<<10|n)^21522},r.getBCHTypeNumber=function(e){let t=e<<12;for(;i(t)-i(n)>=0;)t^=n<<i(t)-i(n);return e<<12|t},r.getPatternPosition=function(t){return e[t-1]},r.getMaskFunction=function(e){switch(e){case P.PATTERN000:return function(e,t){return(e+t)%2==0};case P.PATTERN001:return function(e,t){return e%2==0};case P.PATTERN010:return function(e,t){return t%3==0};case P.PATTERN011:return function(e,t){return(e+t)%3==0};case P.PATTERN100:return function(e,t){return(Math.floor(e/2)+Math.floor(t/3))%2==0};case P.PATTERN101:return function(e,t){return e*t%2+e*t%3==0};case P.PATTERN110:return function(e,t){return(e*t%2+e*t%3)%2==0};case P.PATTERN111:return function(e,t){return(e*t%3+(e+t)%2)%2==0};default:throw`bad maskPattern:`+e}},r.getErrorCorrectPolynomial=function(e){let t=gr([1],0);for(let n=0;n<e;n+=1)t=t.multiply(gr([1,I.gexp(n)],0));return t},r.getLengthInBits=function(e,t){if(1<=t&&t<10)switch(e){case N.MODE_NUMBER:return 10;case N.MODE_ALPHA_NUM:return 9;case N.MODE_8BIT_BYTE:return 8;case N.MODE_KANJI:return 8;default:throw`mode:`+e}else if(t<27)switch(e){case N.MODE_NUMBER:return 12;case N.MODE_ALPHA_NUM:return 11;case N.MODE_8BIT_BYTE:return 16;case N.MODE_KANJI:return 10;default:throw`mode:`+e}else if(t<41)switch(e){case N.MODE_NUMBER:return 14;case N.MODE_ALPHA_NUM:return 13;case N.MODE_8BIT_BYTE:return 16;case N.MODE_KANJI:return 12;default:throw`mode:`+e}else throw`type:`+t},r.getLostPoint=function(e){let t=e.getModuleCount(),n=0;for(let r=0;r<t;r+=1)for(let i=0;i<t;i+=1){let a=0,o=e.isDark(r,i);for(let n=-1;n<=1;n+=1)if(!(r+n<0||t<=r+n))for(let s=-1;s<=1;s+=1)i+s<0||t<=i+s||n==0&&s==0||o==e.isDark(r+n,i+s)&&(a+=1);a>5&&(n+=3+a-5)}for(let r=0;r<t-1;r+=1)for(let i=0;i<t-1;i+=1){let t=0;e.isDark(r,i)&&(t+=1),e.isDark(r+1,i)&&(t+=1),e.isDark(r,i+1)&&(t+=1),e.isDark(r+1,i+1)&&(t+=1),(t==0||t==4)&&(n+=3)}for(let r=0;r<t;r+=1)for(let i=0;i<t-6;i+=1)e.isDark(r,i)&&!e.isDark(r,i+1)&&e.isDark(r,i+2)&&e.isDark(r,i+3)&&e.isDark(r,i+4)&&!e.isDark(r,i+5)&&e.isDark(r,i+6)&&(n+=40);for(let r=0;r<t;r+=1)for(let i=0;i<t-6;i+=1)e.isDark(i,r)&&!e.isDark(i+1,r)&&e.isDark(i+2,r)&&e.isDark(i+3,r)&&e.isDark(i+4,r)&&!e.isDark(i+5,r)&&e.isDark(i+6,r)&&(n+=40);let r=0;for(let n=0;n<t;n+=1)for(let i=0;i<t;i+=1)e.isDark(i,n)&&(r+=1);let i=Math.abs(100*r/t/t-50)/5;return n+=i*10,n},r}(),I=function(){let e=Array(256),t=Array(256);for(let t=0;t<8;t+=1)e[t]=1<<t;for(let t=8;t<256;t+=1)e[t]=e[t-4]^e[t-5]^e[t-6]^e[t-8];for(let n=0;n<255;n+=1)t[e[n]]=n;let n={};return n.glog=function(e){if(e<1)throw`glog(`+e+`)`;return t[e]},n.gexp=function(t){for(;t<0;)t+=255;for(;t>=256;)t-=255;return e[t]},n}(),gr=function(e,t){if(e.length===void 0)throw e.length+`/`+t;let n=function(){let n=0;for(;n<e.length&&e[n]==0;)n+=1;let r=Array(e.length-n+t);for(let t=0;t<e.length-n;t+=1)r[t]=e[t+n];return r}(),r={};return r.getAt=function(e){return n[e]},r.getLength=function(){return n.length},r.multiply=function(e){let t=Array(r.getLength()+e.getLength()-1);for(let n=0;n<r.getLength();n+=1)for(let i=0;i<e.getLength();i+=1)t[n+i]^=I.gexp(I.glog(r.getAt(n))+I.glog(e.getAt(i)));return gr(t,0)},r.mod=function(e){if(r.getLength()-e.getLength()<0)return r;let t=I.glog(r.getAt(0))-I.glog(e.getAt(0)),n=Array(r.getLength());for(let e=0;e<r.getLength();e+=1)n[e]=r.getAt(e);for(let r=0;r<e.getLength();r+=1)n[r]^=I.gexp(I.glog(e.getAt(r))+t);return gr(n,0).mod(e)},r},_r=function(){let e=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],t=function(e,t){let n={};return n.totalCount=e,n.dataCount=t,n},n={},r=function(t,n){switch(n){case hr.L:return e[(t-1)*4+0];case hr.M:return e[(t-1)*4+1];case hr.Q:return e[(t-1)*4+2];case hr.H:return e[(t-1)*4+3];default:return}};return n.getRSBlocks=function(e,n){let i=r(e,n);if(i===void 0)throw`bad rs block @ typeNumber:`+e+`/errorCorrectionLevel:`+n;let a=i.length/3,o=[];for(let e=0;e<a;e+=1){let n=i[e*3+0],r=i[e*3+1],a=i[e*3+2];for(let e=0;e<n;e+=1)o.push(t(r,a))}return o},n}(),vr=function(){let e=[],t=0,n={};return n.getBuffer=function(){return e},n.getAt=function(t){return(e[Math.floor(t/8)]>>>7-t%8&1)==1},n.put=function(e,t){for(let r=0;r<t;r+=1)n.putBit((e>>>t-r-1&1)==1)},n.getLengthInBits=function(){return t},n.putBit=function(n){let r=Math.floor(t/8);e.length<=r&&e.push(0),n&&(e[r]|=128>>>t%8),t+=1},n},yr=function(e){let t=N.MODE_NUMBER,n=e,r={};r.getMode=function(){return t},r.getLength=function(e){return n.length},r.write=function(e){let t=n,r=0;for(;r+2<t.length;)e.put(i(t.substring(r,r+3)),10),r+=3;r<t.length&&(t.length-r==1?e.put(i(t.substring(r,r+1)),4):t.length-r==2&&e.put(i(t.substring(r,r+2)),7))};let i=function(e){let t=0;for(let n=0;n<e.length;n+=1)t=t*10+a(e.charAt(n));return t},a=function(e){if(`0`<=e&&e<=`9`)return e.charCodeAt(0)-48;throw`illegal char :`+e};return r},br=function(e){let t=N.MODE_ALPHA_NUM,n=e,r={};r.getMode=function(){return t},r.getLength=function(e){return n.length},r.write=function(e){let t=n,r=0;for(;r+1<t.length;)e.put(i(t.charAt(r))*45+i(t.charAt(r+1)),11),r+=2;r<t.length&&e.put(i(t.charAt(r)),6)};let i=function(e){if(`0`<=e&&e<=`9`)return e.charCodeAt(0)-48;if(`A`<=e&&e<=`Z`)return e.charCodeAt(0)-65+10;switch(e){case` `:return 36;case`$`:return 37;case`%`:return 38;case`*`:return 39;case`+`:return 40;case`-`:return 41;case`.`:return 42;case`/`:return 43;case`:`:return 44;default:throw`illegal char :`+e}};return r},xr=function(e){let t=N.MODE_8BIT_BYTE,n=M.stringToBytes(e),r={};return r.getMode=function(){return t},r.getLength=function(e){return n.length},r.write=function(e){for(let t=0;t<n.length;t+=1)e.put(n[t],8)},r},Sr=function(e){let t=N.MODE_KANJI,n=M.stringToBytes;(function(e,t){let r=n(e);if(r.length!=2||(r[0]<<8|r[1])!=t)throw`sjis not supported.`})(`友`,38726);let r=n(e),i={};return i.getMode=function(){return t},i.getLength=function(e){return~~(r.length/2)},i.write=function(e){let t=r,n=0;for(;n+1<t.length;){let r=(255&t[n])<<8|255&t[n+1];if(33088<=r&&r<=40956)r-=33088;else if(57408<=r&&r<=60351)r-=49472;else throw`illegal char at `+(n+1)+`/`+r;r=(r>>>8&255)*192+(r&255),e.put(r,13),n+=2}if(n<t.length)throw`illegal char at `+(n+1)},i},Cr=function(){let e=[],t={};return t.writeByte=function(t){e.push(t&255)},t.writeShort=function(e){t.writeByte(e),t.writeByte(e>>>8)},t.writeBytes=function(e,n,r){n||=0,r||=e.length;for(let i=0;i<r;i+=1)t.writeByte(e[i+n])},t.writeString=function(e){for(let n=0;n<e.length;n+=1)t.writeByte(e.charCodeAt(n))},t.toByteArray=function(){return e},t.toString=function(){let t=``;t+=`[`;for(let n=0;n<e.length;n+=1)n>0&&(t+=`,`),t+=e[n];return t+=`]`,t},t},wr=function(){let e=0,t=0,n=0,r=``,i={},a=function(e){r+=String.fromCharCode(o(e&63))},o=function(e){if(e<0)throw`n:`+e;if(e<26)return 65+e;if(e<52)return 97+(e-26);if(e<62)return 48+(e-52);if(e==62)return 43;if(e==63)return 47;throw`n:`+e};return i.writeByte=function(r){for(e=e<<8|r&255,t+=8,n+=1;t>=6;)a(e>>>t-6),t-=6},i.flush=function(){if(t>0&&(a(e<<6-t),e=0,t=0),n%3!=0){let e=3-n%3;for(let t=0;t<e;t+=1)r+=`=`}},i.toString=function(){return r},i},Tr=function(e){let t=e,n=0,r=0,i=0,a={};a.read=function(){for(;i<8;){if(n>=t.length){if(i==0)return-1;throw`unexpected end of file./`+i}let e=t.charAt(n);if(n+=1,e==`=`)return i=0,-1;e.match(/^\s$/)||(r=r<<6|o(e.charCodeAt(0)),i+=6)}let e=r>>>i-8&255;return i-=8,e};let o=function(e){if(65<=e&&e<=90)return e-65;if(97<=e&&e<=122)return e-97+26;if(48<=e&&e<=57)return e-48+52;if(e==43)return 62;if(e==47)return 63;throw`c:`+e};return a},Er=function(e,t){let n=e,r=t,i=Array(e*t),a={};a.setPixel=function(e,t,r){i[t*n+e]=r},a.write=function(e){e.writeString(`GIF87a`),e.writeShort(n),e.writeShort(r),e.writeByte(128),e.writeByte(0),e.writeByte(0),e.writeByte(0),e.writeByte(0),e.writeByte(0),e.writeByte(255),e.writeByte(255),e.writeByte(255),e.writeString(`,`),e.writeShort(0),e.writeShort(0),e.writeShort(n),e.writeShort(r),e.writeByte(0);let t=s(2);e.writeByte(2);let i=0;for(;t.length-i>255;)e.writeByte(255),e.writeBytes(t,i,255),i+=255;e.writeByte(t.length-i),e.writeBytes(t,i,t.length-i),e.writeByte(0),e.writeString(`;`)};let o=function(e){let t=e,n=0,r=0,i={};return i.write=function(e,i){if(e>>>i)throw`length over`;for(;n+i>=8;)t.writeByte(255&(e<<n|r)),i-=8-n,e>>>=8-n,r=0,n=0;r=e<<n|r,n+=i},i.flush=function(){n>0&&t.writeByte(r)},i},s=function(e){let t=1<<e,n=(1<<e)+1,r=e+1,a=c();for(let e=0;e<t;e+=1)a.add(String.fromCharCode(e));a.add(String.fromCharCode(t)),a.add(String.fromCharCode(n));let s=Cr(),l=o(s);l.write(t,r);let u=0,d=String.fromCharCode(i[u]);for(u+=1;u<i.length;){let e=String.fromCharCode(i[u]);u+=1,a.contains(d+e)?d+=e:(l.write(a.indexOf(d),r),a.size()<4095&&(a.size()==1<<r&&(r+=1),a.add(d+e)),d=e)}return l.write(a.indexOf(d),r),l.write(n,r),l.flush(),s.toByteArray()},c=function(){let e={},t=0,n={};return n.add=function(r){if(n.contains(r))throw`dup key:`+r;e[r]=t,t+=1},n.size=function(){return t},n.indexOf=function(t){return e[t]},n.contains=function(t){return e[t]!==void 0},n};return a},Dr=function(e,t,n){let r=Er(e,t);for(let i=0;i<t;i+=1)for(let t=0;t<e;t+=1)r.setPixel(t,i,n(t,i));let i=Cr();r.write(i);let a=wr(),o=i.toByteArray();for(let e=0;e<o.length;e+=1)a.writeByte(o[e]);return a.flush(),`data:image/gif;base64,`+a};M.stringToBytes;function Or(e,t=4){let n=M(0,`L`);return n.addData(e),n.make(),n.createSvgTag({cellSize:t,margin:2,scalable:!0})}var kr=25519;function Ar(e){let t=E(),{identity:n}=l();if(!t||!n?.pubkey||!n?.privkey)return e.onError(`No relay pool or identity available.`),()=>{};let{inviteId:r,adminPubkey:i,readRelays:a,writeRelays:o,onWelcome:s,onError:c}=e,u=n.privkey;n.pubkey;let d=Array.from(new Set([...a,...o])),f=C(w(u),i),p=fe(JSON.stringify({type:`join-request`,inviteId:r}),f),m=de({kind:kr,created_at:Math.floor(Date.now()/1e3),tags:[[`d`,r],[`p`,i]],content:p},w(u));Promise.allSettled(t.publish(o,m)).catch(()=>{});let h=t.subscribeMany(d,{kinds:[kr],"#d":[r],authors:[i]},{onevent(e){if(le(e)&&!(typeof e.content==`string`&&e.content.length>65536))try{let t=pe(e.content,f),n=JSON.parse(t);n.type===`welcome`&&n.inviteId===r&&n.envelope&&(s(n.envelope),h.close())}catch{}},oneose(){}}),g=setTimeout(()=>{h.close(),c(`Timed out waiting for welcome message from admin.`)},12e4);return()=>{clearTimeout(g),h.close()}}function jr(e){let t=E(),{identity:n}=l();if(!t||!n?.pubkey||!n?.privkey)return e.onError(`No relay pool or identity available.`),()=>{};let{inviteId:r,readRelays:i,writeRelays:a,onJoinRequest:o,onError:s}=e,c=n.privkey,u=Array.from(new Set([...i,...a])),d=t.subscribeMany(u,{kinds:[kr],"#d":[r],"#p":[n.pubkey]},{onevent(e){if(le(e)&&!(typeof e.content==`string`&&e.content.length>65536))try{let t=C(w(c),e.pubkey),n=pe(e.content,t),i=JSON.parse(n);i.type===`join-request`&&i.inviteId===r&&o(e.pubkey)}catch{}},oneose(){}}),f=setTimeout(()=>{d.close(),s(`Timed out waiting for join request.`)},3e5);return()=>{clearTimeout(f),d.close()}}function Mr(e){let t=E(),{identity:n}=l();if(!t||!n?.privkey)return;let{inviteId:r,joinerPubkey:i,envelope:a,writeRelays:o}=e,s=C(w(n.privkey),i),c=fe(JSON.stringify({type:`welcome`,inviteId:r,envelope:a}),s),u=de({kind:kr,created_at:Math.floor(Date.now()/1e3),tags:[[`d`,r],[`p`,i]],content:c},w(n.privkey));Promise.allSettled(t.publish(o,u)).catch(()=>{})}var Nr=35520;function Pr(e){let t=E(),{identity:n}=l();if(!t||!n?.privkey)return;let{token:r,writeRelays:i}=e,a=JSON.stringify(r),o=String(Math.floor(Date.now()/1e3)+10080*60),s=de({kind:Nr,created_at:Math.floor(Date.now()/1e3),tags:[[`d`,r.inviteId],[`expiration`,o]],content:a},w(n.privkey));Promise.allSettled(t.publish(i,s)).catch(()=>{})}function Fr(e){let t=E();if(!t)return e.onError(`No relay pool available.`),()=>{};let{inviteId:n,readRelays:r,onToken:i,onError:a}=e,o=!1,s=t.subscribeMany(r,{kinds:[Nr],"#d":[n]},{onevent(e){if(le(e)&&!(typeof e.content==`string`&&e.content.length>65536)&&!o)try{let t=JSON.parse(e.content);t.inviteId===n&&(o=!0,i(t),s.close())}catch{}},oneose(){o||(s.close(),a(`Invite not found on relay — it may have expired.`))}}),c=setTimeout(()=>{o||(s.close(),a(`Timed out looking for invite on relay.`))},15e3);return()=>{clearTimeout(c),s.close()}}var Ir=ut({renderMembers:()=>Wr,showConfirmMemberModal:()=>Kr,showInviteModal:()=>Vr,showShareStateModal:()=>Hr}),Lr=[210,140,30,280,60,330,170,0];function Rr(e,t){let n=t.indexOf(e);return Lr[(n>=0?n:0)%Lr.length]}function zr(e,t,n,r){let i=Rr(e,t),a=n[e]??0;if(a===0)return`hsl(${i}, 55%, 55%)`;let o=Math.floor(Date.now()/1e3)-a;return o<=r?`hsl(${i}, 70%, 55%)`:o<=r*1.25?`hsl(${i}, 40%, 50%)`:`#94a3b8`}function Br(e,t,n){let{identity:r,groups:i}=l(),a=r?.pubkey===e,o;if(n){let t=i[n]?.memberNames?.[e];t&&t!==`You`&&(o=t)}return o||=Qe(e),a?o?`${o} (you)`:`You`:o||`${e.slice(0,8)}\u2026${e.slice(-4)}`}function Vr(t,n){let r=n?.title??`Invite to Group`,i=n?.scanHint??`Scan with your phone camera to join`;n?.showConfirmMemberNote,e(t);let a=document.getElementById(`invite-modal`);a||(a=document.createElement(`dialog`),a.id=`invite-modal`,a.className=`modal`,document.body.appendChild(a),a.addEventListener(`click`,e=>{e.target===a&&(rr(),a.close())}));let o=a;function s(){o.innerHTML=`
      <div class="modal__form invite-share">
        <h2 class="modal__title">${O(r)}</h2>
        <p class="invite-hint">How are you sharing this?</p>

        <div class="invite-share__actions" style="flex-direction: column; gap: 0.75rem;">
          <button class="btn btn--primary" id="invite-qr-path" type="button">Scan QR &mdash; they're with me</button>
          <button class="btn btn--primary" id="invite-link-path" type="button">Secure Channel &mdash; Signal, WhatsApp, etc.</button>
        </div>

        <div class="modal__actions">
          <button class="btn" id="invite-close-btn" type="button">Cancel</button>
        </div>
      </div>
    `,o.querySelector(`#invite-qr-path`)?.addEventListener(`click`,d),o.querySelector(`#invite-link-path`)?.addEventListener(`click`,f),o.querySelector(`#invite-close-btn`)?.addEventListener(`click`,()=>{rr(),o.close()})}function c(e){o.innerHTML=`
      <div class="modal__form invite-share">
        <h2 class="modal__title">Step 2 of 3: Paste Join Code</h2>
        <p class="invite-hint">Ask them to open the invite and send you their join code.</p>
        <input class="input" id="remote-joincode-input" type="text" placeholder="Paste their join code here..." autocomplete="off" style="font-family: monospace; font-size: 0.85rem;">
        <p class="invite-hint" id="remote-joincode-error" style="color: var(--duress); display: none;"></p>
        <div class="modal__actions" style="gap: 0.5rem;">
          <button class="btn" id="remote-back-2" type="button">Back</button>
          <button class="btn btn--primary" id="remote-next-2" type="button">Generate Welcome</button>
        </div>
      </div>
    `,o.querySelector(`#remote-back-2`)?.addEventListener(`click`,e),o.querySelector(`#remote-next-2`)?.addEventListener(`click`,()=>{let e=o.querySelector(`#remote-joincode-input`),n=o.querySelector(`#remote-joincode-error`),r=e?.value.trim()??``;if(!/^[0-9a-f]{64}$/.test(r)){n&&(n.textContent=`Invalid join code — must be a 64-character hex public key.`,n.style.display=``);return}try{let e=l().groups[t.id];if(!e)throw Error(`Group not found.`);u(nr(e,r),r)}catch(e){n&&(n.textContent=e instanceof Error?e.message:`Failed to create welcome envelope.`,n.style.display=``)}})}function u(e,n){o.innerHTML=`
      <div class="modal__form invite-share">
        <h2 class="modal__title">Step 3 of 3: Send Welcome</h2>
        <p class="invite-hint">Copy this encrypted message and send it back to them.</p>
        <p class="invite-hint" style="color: var(--success); font-weight: 500;">This is encrypted — only they can read it.</p>
        <div class="invite-share__actions" style="flex-direction: column; gap: 0.5rem;">
          <button class="btn btn--primary" id="remote-copy-welcome" type="button">Copy Welcome Message</button>
        </div>
        <label class="input-label" style="margin-top: 0.5rem;">Member name (optional)
          <input class="input" id="remote-joiner-name" type="text" placeholder="e.g. Alice" autocomplete="off">
        </label>
        <div class="modal__actions" style="gap: 0.5rem;">
          <button class="btn btn--primary" id="remote-done" type="button">Done</button>
        </div>
      </div>
    `,o.querySelector(`#remote-copy-welcome`)?.addEventListener(`click`,async t=>{let n=t.currentTarget;try{await navigator.clipboard.writeText(e),n.textContent=`Copied!`,n.classList.add(`btn--copied`),setTimeout(()=>{n.textContent=`Copy Welcome Message`,n.classList.remove(`btn--copied`)},2e3)}catch{}}),o.querySelector(`#remote-done`)?.addEventListener(`click`,()=>{try{let e=l().groups[t.id];if(e&&!e.members.includes(n)){let e=o.querySelector(`#remote-joiner-name`)?.value.trim()??``;zt(t.id,n,e),D(e?`${e} added to group`:`Member added to group`,`success`)}}catch(e){D(e instanceof Error?e.message:`Failed to add member`,`error`)}rr(),o.close()})}function d(){let e,n,a;try{let r=qn(t);e=r.payload,n=r.confirmCode,a=pr(e)}catch(e){D(e instanceof Error?e.message:`Failed to create invite.`,`error`);return}let c=`${window.location.href.split(`#`)[0]}#inv/${Tn(a)}`,l=Or(c);o.innerHTML=`
      <div class="modal__form invite-share">
        <h2 class="modal__title">${O(r)}</h2>

        <div class="qr-container" data-url="${O(c)}">${l}</div>
        <p class="invite-hint">${O(i)}</p>
        <p class="invite-hint" style="color: var(--duress); font-weight: 500;">Contains the group key &mdash; only share in person.</p>

        <div style="margin: 1rem 0; padding: 0.75rem; border-radius: 0.5rem; background: var(--surface-alt, rgba(255,255,255,0.05));">
          <p class="invite-hint" style="font-weight: 600; margin-bottom: 0.25rem;">Read these words aloud:</p>
          <p style="font-size: 1.25rem; font-weight: 700; letter-spacing: 0.05em; text-align: center;">${O(n)}</p>
        </div>

        <div class="modal__actions" style="gap: 0.5rem;">
          <button class="btn" id="invite-back-btn" type="button">Back</button>
          <button class="btn" id="invite-done-btn" type="button">Done</button>
        </div>
      </div>
    `,o.querySelector(`#invite-back-btn`)?.addEventListener(`click`,()=>{s()}),o.querySelector(`#invite-done-btn`)?.addEventListener(`click`,()=>{o.close()})}function f(){let e;try{e=tr(t)}catch(e){D(e instanceof Error?e.message:`Failed to create remote invite.`,`error`);return}let n=`${window.location.href.split(`#`)[0]}#j/${e.inviteId}`,r=t.readRelays?.length?t.readRelays:l().settings.defaultReadRelays,i=t.writeRelays?.length?t.writeRelays:l().settings.defaultWriteRelays;m(r,i).then(()=>{Pr({token:wn(e.tokenPayload),writeRelays:i})});let a=()=>{};o.innerHTML=`
      <div class="modal__form invite-share">
        <h2 class="modal__title">Send Invite Link</h2>
        <p class="invite-hint">Copy this link and send it via Signal, WhatsApp, or any secure channel.</p>
        <p class="invite-hint" style="color: var(--duress); font-weight: 500;">This link does NOT contain the group secret — it's safe to send.</p>

        <div class="invite-share__actions" style="flex-direction: column; gap: 0.5rem;">
          <button class="btn btn--primary" id="remote-copy-link" type="button">Copy Link</button>
        </div>

        <p class="invite-hint" id="remote-relay-status" style="color: var(--text-muted); margin-top: 1rem;">Waiting for them to open the link...</p>

        <details style="margin-top: 1rem;">
          <summary class="invite-hint" style="cursor: pointer; color: var(--text-muted);">Manual fallback (if relay is unavailable)</summary>
          <div style="margin-top: 0.5rem;">
            <button class="btn btn--sm" id="remote-manual-fallback" type="button">Switch to manual steps</button>
          </div>
        </details>

        <div class="modal__actions" style="gap: 0.5rem;">
          <button class="btn" id="remote-back-btn" type="button">Back</button>
        </div>
      </div>
    `,o.querySelector(`#remote-copy-link`)?.addEventListener(`click`,async e=>{let t=e.currentTarget;try{await navigator.clipboard.writeText(n),t.textContent=`Copied!`,t.classList.add(`btn--copied`),setTimeout(()=>{t.textContent=`Copy Link`,t.classList.remove(`btn--copied`)},2e3)}catch{}}),m(r,i).then(()=>{a=jr({inviteId:e.inviteId,readRelays:r,writeRelays:i,onJoinRequest(n){a();try{let r=l().groups[t.id];if(!r)return;let a=nr(r,n);Mr({inviteId:e.inviteId,joinerPubkey:n,envelope:a,writeRelays:i}),r.members.includes(n)||zt(t.id,n),rr(),o.close(),D(`Member joined via relay`,`success`)}catch(e){D(e instanceof Error?e.message:`Failed to send welcome`,`error`)}},onError(e){let t=o.querySelector(`#remote-relay-status`);t&&(t.textContent=e||`Relay unavailable — use manual fallback below.`)}})}),o.querySelector(`#remote-manual-fallback`)?.addEventListener(`click`,()=>{a(),c(()=>{a=()=>{},f()})}),o.querySelector(`#remote-back-btn`)?.addEventListener(`click`,()=>{a(),rr(),s()})}s(),a.showModal()}function Hr(e){Vr(e,{title:`Share Group State`,scanHint:`Share with existing members to sync the latest group state.`,showConfirmMemberNote:!1})}function Ur(e,t){let{identity:n,groups:r}=l(),i=r[t],a=n?.pubkey===e,o=i?.admins.includes(e)??!1,s=Br(e,i?.members??[],t),c=tt(e),u=i?.memberNames?.[e],d=i?.livenessCheckins?.[e],f=`Never checked in`;if(d){let e=Math.floor(Date.now()/1e3)-d;f=e<60?`Active now`:e<3600?`${Math.floor(e/60)}m ago`:`${Math.floor(e/3600)}h ago`}let p=[a?`<span class="member-detail__badge">You</span>`:``,o?`<span class="member-detail__badge member-detail__badge--admin">Admin</span>`:``].filter(Boolean).join(` `),m=c?.display_name||c?.name,h=(e,t)=>`<div class="member-detail__row"><span class="member-detail__label">${e}</span><span class="member-detail__value">${O(t)}</span></div>`,g=[h(`Pubkey`,`${e.slice(0,16)}…${e.slice(-8)}`)];m&&g.push(h(`Nostr name`,m)),c?.nip05&&g.push(h(`NIP-05`,c.nip05)),c?.about&&g.push(h(`About`,c.about.length>80?c.about.slice(0,80)+`…`:c.about)),c?.lud16&&g.push(h(`Lightning`,c.lud16)),c?.website&&g.push(h(`Website`,c.website)),u&&u!==`You`&&u!==m&&g.push(h(`Display name`,u)),g.push(h(`Liveness`,f)),c||g.push(`<div class="member-detail__row"><span class="member-detail__label" style="color: var(--text-muted); font-style: italic;">No Nostr profile found on relay</span></div>`),vt(`
    <div class="member-detail__header">
      ${c?.picture?`<img class="member-detail__avatar" src="${O(c.picture)}" alt="" />`:``}
      <div>
        <h2 class="modal__title" style="margin:0;">${O(s)} ${p}</h2>
      </div>
    </div>
    <div class="member-detail__rows">${g.join(``)}</div>
    <div class="modal__actions">
      <button class="btn btn--sm" id="member-detail-copy" type="button">Copy Pubkey</button>
      <button class="btn" id="modal-cancel-btn" type="button">Close</button>
    </div>
  `,()=>{}),requestAnimationFrame(()=>{document.getElementById(`member-detail-copy`)?.addEventListener(`click`,async()=>{try{await navigator.clipboard.writeText(e);let t=document.getElementById(`member-detail-copy`);t.textContent=`Copied!`,setTimeout(()=>{t.textContent=`Copy Pubkey`},1500)}catch{}}),document.getElementById(`modal-cancel-btn`)?.addEventListener(`click`,()=>{document.getElementById(`app-modal`)?.close()})})}function Wr(e){let{groups:t,activeGroupId:n}=l();if(!n){e.innerHTML=``;return}let r=t[n];if(!r){e.innerHTML=``;return}let{identity:i}=l(),a=!!i?.pubkey&&r.admins.includes(i.pubkey);et(r.members,n),e.innerHTML=`
    <section class="panel members-panel">
      <h2 class="panel__title">Members</h2>
      <ul class="member-list">
        ${r.members.length>0?r.members.map(e=>{let t=zr(e,r.members,r.livenessCheckins??{},r.livenessInterval),i=tt(e),o=i?.picture?`<img src="${O(i.picture)}" alt="" style="width:24px;height:24px;border-radius:50%;object-fit:cover;flex-shrink:0;border:2px solid ${t};box-shadow:0 0 6px ${t}80;" />`:`<span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:${t};flex-shrink:0;box-shadow:0 0 6px ${t}80;"></span>`;return`
          <li class="member-item" data-pubkey="${O(e)}">
            ${o}
            <button class="member-item__name-btn" data-pubkey="${O(e)}" type="button">${O(Br(e,r.members,n))}</button>
            ${a?`<button
              class="btn btn--sm member-item__remove"
              data-pubkey="${O(e)}"
              type="button"
              aria-label="Remove member"
            >\u2715</button>`:``}
          </li>`}).join(``):`<li class="member-item member-item--empty">No members yet.</li>`}
      </ul>
      ${a?`<div class="members-actions">
        <button class="btn btn--sm" id="invite-btn" type="button" title="Invite a new person to join this group">+ Invite</button>
        <button class="btn btn--sm" id="share-state-btn" type="button" title="Share the latest group state with existing members after changes">Share State</button>
        <button class="btn btn--sm" id="confirm-member-btn" type="button" title="Verify and add a member using their acknowledgement token or verification word">Confirm Member</button>
      </div>`:``}
    </section>
  `,e.querySelectorAll(`.member-item__name-btn`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.pubkey;t&&Ur(t,n)})}),e.querySelector(`.member-list`)?.addEventListener(`click`,e=>{let t=e.target.closest(`.member-item__remove`);if(!t)return;let r=t.dataset.pubkey;if(!r)return;let{groups:i}=l(),a=i[n]?.members??[];if(!confirm(`Remove ${Br(r,a,n)} from the group?\n\nThis rotates the group secret immediately. Remaining members must re-join using a fresh invite.`))return;let{activeGroupId:o}=l();if(!o)return;Bt(o,r);let{groups:s}=l(),c=s[o];c&&c.members.length>0&&Hr(c)}),e.querySelector(`#invite-btn`)?.addEventListener(`click`,()=>{let{groups:e,activeGroupId:t}=l();if(!t)return;let n=e[t];n&&Vr(n)}),e.querySelector(`#share-state-btn`)?.addEventListener(`click`,()=>{let{groups:e,activeGroupId:t}=l();if(!t)return;let n=e[t];n&&Hr(n)}),e.querySelector(`#confirm-member-btn`)?.addEventListener(`click`,()=>{Kr()})}function Gr(e,t,n){let{groups:r,identity:i}=l(),a=r[e];if(!a||!i?.pubkey||!a.admins.includes(i.pubkey))return!1;a.members.includes(t)||zt(e,t,n);let o=l().groups[e];return o&&n&&u(e,{memberNames:{...o.memberNames,[t]:n}}),!0}function Kr(e){let{groups:t,activeGroupId:n}=l();n&&t[n]&&(vt(`
    <h2 class="modal__title">Confirm Member</h2>

    <label class="input-label">Acknowledgement link or token
      <textarea name="ackToken" class="input" rows="2" placeholder="Paste #ack/... link or token">${O(e??``)}</textarea>
    </label>

    <div class="confirm-member__divider">
      <span>— or verify by word —</span>
    </div>

    <label class="input-label">Verification word
      <input name="word" class="input" placeholder="e.g. sparrow">
    </label>
    <label class="input-label">Member name
      <input name="memberName" class="input" placeholder="e.g. Alice">
    </label>

    <div class="modal__actions">
      <button type="button" class="btn" id="modal-cancel-btn">Cancel</button>
      <button type="submit" class="btn btn--primary">Confirm</button>
    </div>
  `,e=>{try{let t=e.get(`ackToken`)?.trim(),n=e.get(`word`)?.trim().toLowerCase(),r=e.get(`memberName`)?.trim(),{activeGroupId:i}=l();if(!i)throw Error(`No active group.`);let{groups:a}=l(),o=a[i];if(!o)throw Error(`Group not found.`);if(t){let e=$n(t.includes(`#ack/`)?decodeURIComponent(t.split(`#ack/`)[1]):t,{groupId:i,groupSeed:o.seed,counter:o.counter+(o.usageOffset??0),context:`canary:group`,encoding:A(o),tolerance:o.tolerance??1});if(!e.valid)throw Error(e.error??`Invalid join token.`);if(!Gr(i,e.pubkey,e.displayName||r||``))throw Error(`Member could not be added — they may already be in the group or you are not an admin.`);D(`${e.displayName||`Member`} has joined the group`,`success`)}else if(n){if(!r)throw Error(`Please enter the member name.`);let e=o.counter+(o.usageOffset??0);if(n!==he(o.seed,`canary:group`,e,A(o)).toLowerCase())throw Error(`Word does not match — the member may not have the current group key.`);let t=new Uint8Array(32);if(crypto.getRandomValues(t),!Gr(i,Array.from(t,e=>e.toString(16).padStart(2,`0`)).join(``),r))throw Error(`Member could not be added — you may not be an admin of this group.`);D(`${r} has joined the group`,`success`)}else throw Error(`Provide either an ack token or a verification word.`)}catch(e){throw alert(e instanceof Error?e.message:`Confirmation failed.`),e}}),requestAnimationFrame(()=>{document.getElementById(`modal-cancel-btn`)?.addEventListener(`click`,()=>{document.getElementById(`app-modal`)?.close()})}))}var qr=`0123456789bcdefghjkmnpqrstuvwxyz`,Jr=Object.create(null);for(let e=0;e<32;e++)Jr[qr[e]]=e;function Yr(e){for(let t of e)if(!(t in Jr))throw TypeError(`Invalid geohash character: '${t}' in "${e}"`)}function Xr(e,t,n=5){if(!Number.isFinite(e)||e<-90||e>90)throw RangeError(`Invalid latitude: ${e}`);if(!Number.isFinite(t)||t<-180||t>180)throw RangeError(`Invalid longitude: ${t}`);if(!Number.isFinite(n)||(n=Math.round(n),n<1))throw RangeError(`Invalid precision: ${n}`);n=Math.min(12,n);let r=-90,i=90,a=-180,o=180,s=``,c=0,l=0,u=!0;for(;s.length<n;){if(u){let e=(a+o)/2;t>=e?(l|=1<<4-c,a=e):o=e}else{let t=(r+i)/2;e>=t?(l|=1<<4-c,r=t):i=t}u=!u,c++,c===5&&(s+=qr[l],c=0,l=0)}return s}function Zr(e){if(e.length===0)throw TypeError(`Cannot decode an empty geohash`);let t=Qr(e);return{lat:(t.minLat+t.maxLat)/2,lon:(t.minLon+t.maxLon)/2,error:{lat:(t.maxLat-t.minLat)/2,lon:(t.maxLon-t.minLon)/2}}}function Qr(e){Yr(e);let t=-90,n=90,r=-180,i=180,a=!0;for(let o of e){let e=Jr[o];for(let o=4;o>=0;o--){if(a){let t=(r+i)/2;e>>o&1?r=t:i=t}else{let r=(t+n)/2;e>>o&1?t=r:n=r}a=!a}}return{minLat:t,maxLat:n,minLon:r,maxLon:i}}var $r=[0,25e5,63e4,78e3,2e4,2400,610,76,19,2.4];function ei(e){if(!Number.isFinite(e))throw RangeError(`Invalid precision: ${e}`);return $r[Math.max(1,Math.min(9,Math.round(e)))]}var L=null,R=null,z={},B={},ti={},V=null,H=new Set,ni=!1,ri=null,ii=[{label:`City`,value:4,hint:`~20 km`},{label:`Neighbourhood`,value:5,hint:`~2.4 km`},{label:`Street`,value:6,hint:`~610 m`},{label:`Exact`,value:9,hint:`~2 m`}],ai=6371e3;function oi(e,t,n,r=48){let i=[];for(let a=0;a<=r;a++){let o=a/r*2*Math.PI,s=n/ai*Math.cos(o)*(180/Math.PI),c=n/(ai*Math.cos(e*Math.PI/180))*Math.sin(o)*(180/Math.PI);i.push([t+c,e+s])}return i}var si=[210,140,30,280,60,330,170,0];function ci(e){let{groups:t,activeGroupId:n}=l(),r=((n?t[n]:null)?.members??[]).indexOf(e);return si[(r>=0?r:0)%si.length]}function li(e){if(H.has(e))return`#f87171`;let{groups:t,activeGroupId:n}=l(),r=n?t[n]:null;if(!r)return`hsl(${ci(e)}, 70%, 55%)`;let i=r.livenessCheckins[e]??0;if(i===0)return`hsl(${ci(e)}, 20%, 50%)`;let a=Math.floor(Date.now()/1e3)-i,o=r.livenessInterval;return a<=o?`hsl(${ci(e)}, 70%, 55%)`:a<=o*1.25?`hsl(${ci(e)}, 40%, 50%)`:`#94a3b8`}function ui(){return{type:`FeatureCollection`,features:Object.entries(B).map(([e,t])=>({type:`Feature`,properties:{pubkey:e,duress:H.has(e),colour:li(e)},geometry:{type:`Polygon`,coordinates:[oi(t.lat,t.lon,ei(t.precision))]}}))}}var di=`5.19.0`,fi=`https://unpkg.com/maplibre-gl@${di}/dist/maplibre-gl.js`,pi=`https://unpkg.com/maplibre-gl@${di}/dist/maplibre-gl.css`,mi=`sha384-pEfbADcwebVj4NNOvWFLUkm+FiGTICE5bChpV647czG7OpSqcHNgxM8QawfAkbRO`,hi=`sha384-MGCxhspF/+ufueUgol3FDkiAYQbpSNRhBT0VWHJt64U8qIy9qlnXWx8LAbj6niPH`;async function gi(){if(R)return R;try{let[e]=await Promise.all([S(()=>import(`./maplibre-gl-bplzWB1Q.js`).then(e=>ft(e.default,1)),[],import.meta.url),S(()=>Promise.resolve({}),__vite__mapDeps([0]),import.meta.url)]);return R=e,e}catch{}let e=document.createElement(`link`);return e.rel=`stylesheet`,e.href=pi,e.integrity=hi,e.crossOrigin=`anonymous`,document.head.appendChild(e),await new Promise((e,t)=>{let n=document.createElement(`script`);n.src=fi,n.integrity=mi,n.crossOrigin=`anonymous`,n.onload=()=>e(),n.onerror=t,document.head.appendChild(n)}),R=window.maplibregl,R}async function _i(e){let{groups:t,activeGroupId:n}=l();if(!n||!t[n]){L&&(L.remove(),L=null,ni=!1),e.innerHTML=``;return}let r=t[n],i=r.beaconPrecision??5;if(ri!==n){B={},ti={},H.clear();for(let[e,t]of Object.entries(z))t.remove(),delete z[e];if(ri=n,r.lastPositions)for(let[e,t]of Object.entries(r.lastPositions))B[e]=t}if(L&&document.getElementById(`beacon-map`)){U();for(let[e,t]of Object.entries(B))Si(e,t.lat,t.lon);G(),Object.keys(B).length>0&&W();return}queueMicrotask(()=>G()),e.innerHTML=`
    <section class="panel beacon-panel">
      <h3 class="panel__title">Location</h3>
      <p class="settings-hint" style="margin-bottom: 0.5rem;">Approximate location of group members. Circles show the geohash area — your exact position is never shared. In an emergency, full GPS precision is used so your group can help. Circles turn <span style="color: #f87171; font-weight: 500;">red</span> when an emergency signal is active.</p>
      <div class="beacon-map" id="beacon-map" style="height: 500px; border-radius: 8px;"></div>
      <div style="display: flex; align-items: center; gap: 0.75rem; margin-top: 0.5rem; flex-wrap: wrap;">
        <button class="btn ${V===null?``:`btn--primary`}" id="beacon-toggle-btn" type="button">
          ${V===null?`Share Location`:`Sharing Location`}
        </button>
        <button class="btn btn--ghost" id="beacon-fit-btn" type="button" title="Zoom to fit all group members on the map">Fit All</button>
        ${V===null?``:`<span class="settings-hint" style="margin: 0;">Your approximate area is visible to group members</span>`}
      </div>
      <div style="margin-top: 0.75rem;">
        <span class="input-label">"I'm Alive" precision</span>
        <div class="segmented" id="beacon-precision-picker">
          ${ii.map(e=>`<button class="segmented__btn ${i===e.value?`segmented__btn--active`:``}" data-beacon-precision="${e.value}" title="${e.hint}">${e.label}</button>`).join(``)}
        </div>
        <p class="settings-hint">How precisely your location is shared in routine check-ins</p>
      </div>
      <p class="settings-hint" style="margin-top: 0.5rem; color: var(--duress);">Emergency signals always share your exact GPS so your group can find you.</p>
      <div class="beacon-list" id="beacon-list"></div>
    </section>
  `,e.querySelectorAll(`[data-beacon-precision]`).forEach(t=>{t.addEventListener(`click`,()=>{let n=Number(t.dataset.beaconPrecision),{activeGroupId:r}=l();r&&(u(r,{beaconPrecision:n}),V!==null&&(bi(),xi()),e.querySelectorAll(`[data-beacon-precision]`).forEach(e=>{e.classList.toggle(`segmented__btn--active`,Number(e.dataset.beaconPrecision)===n)}))})}),e.querySelector(`#beacon-toggle-btn`)?.addEventListener(`click`,()=>{V===null?xi():bi(),_i(e)}),e.querySelector(`#beacon-fit-btn`)?.addEventListener(`click`,()=>{W()});try{await gi(),vi()}catch{e.querySelector(`.beacon-map`).innerHTML=`<p style="color: var(--text-muted); text-align: center; padding: 2rem;">Map unavailable offline</p>`}}function vi(){let e=document.getElementById(`beacon-map`);if(!e||L||!R)return;let t=document.documentElement.dataset.theme===`light`?`https://basemaps.cartocdn.com/gl/positron-gl-style/style.json`:`https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json`;L=new R.Map({container:e,style:t,center:[-.1278,51.5074],zoom:12}),L.on(`load`,()=>{ni=!0,console.info(`[canary:beacon] map loaded, positions to catch up:`,Object.keys(B).length),L.addSource(`geohash-circles`,{type:`geojson`,data:ui()}),L.addLayer({id:`geohash-fill`,type:`fill`,source:`geohash-circles`,paint:{"fill-color":[`get`,`colour`],"fill-opacity":[`case`,[`get`,`duress`],.35,.2]}}),L.addLayer({id:`geohash-stroke`,type:`line`,source:`geohash-circles`,paint:{"line-color":[`get`,`colour`],"line-width":2.5,"line-opacity":[`case`,[`get`,`duress`],.9,.6]}});for(let[e,t]of Object.entries(B))Si(e,t.lat,t.lon);Object.keys(B).length>0&&W()})}function yi(){let{activeGroupId:e}=l();e&&u(e,{lastPositions:{...B}})}function U(){if(!L||!ni)return;let e=L.getSource(`geohash-circles`);e&&e.setData(ui())}function bi(){V!==null&&(navigator.geolocation.clearWatch(V),V=null);let{identity:e}=l();e?.pubkey&&(delete B[e.pubkey],delete ti[e.pubkey],z[e.pubkey]&&(z[e.pubkey].remove(),delete z[e.pubkey]),U(),G())}function xi(){if(V!==null||!(`geolocation`in navigator))return;let{groups:e,activeGroupId:t,identity:n}=l();if(!t||!e[t]||!n?.pubkey)return;let r=e[t],i=Et(r.seed),a=r.beaconPrecision||5;V=navigator.geolocation.watchPosition(async e=>{let r=Xr(e.coords.latitude,e.coords.longitude,a),o=Zr(r),s=o.lat,c=o.lon,l=await kt(i,r,a);n?.pubkey&&(ti[n.pubkey]=l,B[n.pubkey]={lat:s,lon:c,geohash:r,precision:a,timestamp:Math.floor(Date.now()/1e3)},Si(n.pubkey,s,c),U(),W(),G(),yi(),t&&b(t,{type:`beacon`,lat:s,lon:c,accuracy:ei(a),timestamp:Math.floor(Date.now()/1e3),opId:crypto.randomUUID()}))},e=>{console.warn(`[canary:beacon] watchPosition error`,e.code,e.message)},{enableHighAccuracy:!1,maximumAge:6e4,timeout:15e3})}function Si(e,t,n){if(!L||!R){console.warn(`[canary:beacon] updateMapMarker skipped — map not ready`,{map:!!L,maplibregl:!!R,pubkey:e.slice(0,8)});return}let r=li(e),i=H.has(e),a=Ci(e),o=tt(e),s=!!o?.picture,c=i?40:32;if(z[e]){z[e].setLngLat([n,t]);let o=z[e].getElement(),l=o.querySelector(`.beacon-dot`);l&&(s||(l.style.background=r),l.style.width=`${c}px`,l.style.height=`${c}px`,l.style.borderColor=r,l.style.boxShadow=`0 0 10px ${r}80`,l.style.animation=i?`beacon-pulse 1s ease-in-out infinite`:`none`);let u=o.querySelector(`.beacon-label`);u&&(u.textContent=a)}else{let l=document.createElement(`div`);l.style.display=`flex`,l.style.flexDirection=`column`,l.style.alignItems=`center`,l.style.pointerEvents=`none`;let u;s?(u=document.createElement(`img`),u.src=o.picture,u.style.objectFit=`cover`):(u=document.createElement(`div`),u.style.background=r),u.className=`beacon-dot`,u.style.width=`${c}px`,u.style.height=`${c}px`,u.style.borderRadius=`50%`,u.style.border=`3px solid ${r}`,u.style.boxShadow=`0 0 10px ${r}80`,u.style.zIndex=`2`,i&&(u.style.animation=`beacon-pulse 1s ease-in-out infinite`),l.appendChild(u);let d=document.createElement(`div`);d.className=`beacon-label`,d.textContent=a,d.style.fontSize=`11px`,d.style.fontWeight=`600`,d.style.color=`#fff`,d.style.textShadow=`0 1px 3px rgba(0,0,0,0.8)`,d.style.marginTop=`2px`,d.style.whiteSpace=`nowrap`,l.appendChild(d),z[e]=new R.Marker({element:l,anchor:`center`}).setLngLat([n,t]).addTo(L)}}function W(){if(!L)return;let e=Object.values(B);if(e.length===0)return;if(e.length===1){L.flyTo({center:[e[0].lon,e[0].lat],zoom:13});return}let t=e.map(e=>e.lon),n=e.map(e=>e.lat);L.fitBounds([[Math.min(...t),Math.min(...n)],[Math.max(...t),Math.max(...n)]],{padding:60,maxZoom:14})}function Ci(e){let{groups:t,activeGroupId:n,identity:r}=l(),i=n?t[n]:null,a=r?.pubkey===e,o,s=i?.memberNames?.[e];return s&&s!==`You`&&(o=s),o||=Qe(e),a?o?`${o} (you)`:`You`:o||`${e.slice(0,8)}\u2026`}function G(){let e=document.getElementById(`beacon-list`);e&&(e.innerHTML=Object.entries(B).map(([e,t])=>{let n=li(e),r=Ci(e),i=tt(e),a=Math.floor(Date.now()/1e3)-t.timestamp,o=a<60?`just now`:a<3600?`${Math.floor(a/60)}m ago`:`${Math.floor(a/3600)}h ago`;return`
      <div class="beacon-entry" style="display:flex;align-items:center;gap:0.5rem;padding:0.25rem 0;">
        ${i?.picture?`<img src="${O(i.picture)}" alt="" style="width:20px;height:20px;border-radius:50%;object-fit:cover;flex-shrink:0;border:2px solid ${n};" />`:`<span style="width:8px;height:8px;border-radius:50%;background:${n};flex-shrink:0;"></span>`}
        <span class="beacon-member" style="font-weight:500;">${O(r)}</span>
        <span class="beacon-geohash" style="color:var(--text-muted);font-size:0.8rem;">${O(t.geohash)}</span>
        <span style="color:var(--text-muted);font-size:0.75rem;margin-left:auto;">${O(o)}</span>
      </div>
    `}).join(``)||`<p class="settings-hint">No beacons yet — enable location to start</p>`)}document.addEventListener(`canary:duress`,(e=>{let{members:t}=e.detail;if(!t?.length)return;for(let e of t)H.add(e),wi(e);U();let n=t.map(e=>B[e]).filter(Boolean);if(L&&n.length===1)L.flyTo({center:[n[0].lon,n[0].lat],zoom:14});else if(L&&n.length>1){let e=n.map(e=>e.lon),t=n.map(e=>e.lat);L.fitBounds([[Math.min(...e),Math.min(...t)],[Math.max(...e),Math.max(...t)]],{padding:60})}}));function wi(e){let t=z[e];if(!t)return;let n=t.getElement();n.style.background=`#f87171`,n.style.width=`14px`,n.style.height=`14px`,n.style.boxShadow=`0 0 12px rgba(248, 113, 113, 0.6)`}function Ti(){if(console.info(`[canary:beacon] sendLocationPing called`,{hasGeo:`geolocation`in navigator,map:!!L,mapReady:ni}),!(`geolocation`in navigator))return;let{groups:e,activeGroupId:t,identity:n}=l();if(!t||!e[t]||!n?.pubkey){console.warn(`[canary:beacon] sendLocationPing: missing state`,{activeGroupId:t,hasPubkey:!!n?.pubkey});return}if(V!==null){console.info(`[canary:beacon] watch already active, skipping getCurrentPosition`);return}xi();let r=e[t],i=Et(r.seed),a=r.beaconPrecision||5;navigator.geolocation.getCurrentPosition(async e=>{let r=Xr(e.coords.latitude,e.coords.longitude,a),o=Zr(r),s=o.lat,c=o.lon,l=await kt(i,r,a);n?.pubkey&&(ti[n.pubkey]=l,B[n.pubkey]={lat:s,lon:c,geohash:r,precision:a,timestamp:Math.floor(Date.now()/1e3)},Si(n.pubkey,s,c),U(),W(),G(),yi(),t&&b(t,{type:`beacon`,lat:s,lon:c,accuracy:ei(a),timestamp:Math.floor(Date.now()/1e3),opId:crypto.randomUUID()}))},e=>{console.warn(`[canary:beacon] getCurrentPosition FAILED`,e.code,e.message),S(async()=>{let{showToast:e}=await import(`./toast-C4N9aZta.js`);return{showToast:e}},__vite__mapDeps([1,2]),import.meta.url).then(({showToast:t})=>{e.code===1?t(`Location permission denied`,`error`,3e3):e.code===3?t(`Location request timed out`,`error`,3e3):t(`Could not get location`,`error`,3e3)})},{enableHighAccuracy:!1,maximumAge:3e4,timeout:1e4})}function Ei(e,t,n,r,i){let{groups:a,activeGroupId:o}=l(),s=o?a[o]:null;if(!s||!s.members.includes(e))return;let c=Di(r),u=Xr(t,n,c);B[e]={lat:t,lon:n,geohash:u,precision:c,timestamp:i},Si(e,t,n),U(),W(),G(),yi()}function Di(e){return e<=3?9:e<=20?8:e<=80?7:e<=620?6:e<=2500?5:e<=2e4?4:e<=8e4?3:e<=63e4?2:1}function Oi(){V!==null&&navigator.geolocation.clearWatch(V),V=null,ni=!1,L&&=(L.remove(),null),z={},B={},ti={},H.clear(),ri=null}function ki(e){return new Date(e*1e3).toISOString().slice(11,19)+` UTC`}function Ai(e,t){return e<=t?`green`:e<=t*1.25?`amber`:`red`}function ji(e,t){return e<60?ki(t):e<3600?`${Math.floor(e/60)}m ago`:e<86400?`${Math.floor(e/3600)}h ago`:`${Math.floor(e/86400)}d ago`}var Mi=[{label:`1m`,value:60},{label:`2m`,value:120},{label:`5m`,value:300},{label:`15m`,value:900},{label:`1h`,value:3600},{label:`4h`,value:14400},{label:`24h`,value:86400},{label:`7d`,value:604800}];function Ni(e){let{groups:t,activeGroupId:n,identity:r}=l();if(!n||!t[n]){e.innerHTML=``;return}let i=t[n],a=Math.floor(Date.now()/1e3),o=i.livenessInterval,s=i.members.map(e=>{let t=i.livenessCheckins[e]??0,n=t>0,s=n?a-t:1/0,c=n?Ai(s,o):`grey`,l=n?Math.max(0,Math.min(100,(1-s/o)*100)):0,u=r?.pubkey===e,d=i.memberNames?.[e];return`
      <li class="liveness-item liveness-item--${c}">
        <span class="liveness-dot liveness-dot--${c}"></span>
        <span class="liveness-name">${O(u?`You`:d??`${e.slice(0,8)}\u2026`)}</span>
        <span class="liveness-time">${n?ji(s,t):`awaiting first check-in`}</span>
        <div class="liveness-bar">
          <div class="liveness-bar__fill liveness-bar__fill--${c}" style="width: ${l}%"></div>
        </div>
      </li>
    `}).join(``),c=r?.pubkey!=null&&i.members.includes(r.pubkey);e.innerHTML=`
    <section class="panel liveness-panel">
      <h3 class="panel__title">Liveness</h3>

      <div class="settings-section">
        <span class="input-label">Check-in interval</span>
        <div class="segmented" id="liveness-interval-picker">
          ${Mi.map(e=>`<button class="segmented__btn ${o===e.value?`segmented__btn--active`:``}" data-liveness-interval="${e.value}">${e.label}</button>`).join(``)}
        </div>
        <p class="settings-hint">How often members must check in</p>
      </div>

      <ul class="liveness-list" id="liveness-list">
        ${s}
      </ul>
      ${c?`
        <button class="btn btn--primary" id="checkin-btn" type="button" title="Check in with your group and share your approximate location">I'm Alive</button>
      `:``}
    </section>
  `,e.querySelectorAll(`[data-liveness-interval]`).forEach(e=>{e.addEventListener(`click`,()=>{u(n,{livenessInterval:Number(e.dataset.livenessInterval)})})}),document.getElementById(`checkin-btn`)?.addEventListener(`click`,()=>{try{let{identity:e,activeGroupId:t,groups:n}=l();if(!e?.pubkey||!t){console.warn(`[canary:liveness] No identity or activeGroupId`,{pubkey:e?.pubkey,gid:t});return}let r=n[t];if(!r){console.warn(`[canary:liveness] Group not found`,t);return}let i=Math.floor(Date.now()/1e3),a=Ce(i,r.rotationInterval);Ne(r.seed,`canary:liveness`,e.pubkey,a),u(t,{livenessCheckins:{...r.livenessCheckins,[e.pubkey]:i}}),b(t,{type:`liveness-checkin`,pubkey:e.pubkey,timestamp:i,opId:crypto.randomUUID()}),Promise.all([S(()=>import(`./push-BNk3z_NM.js`),[],import.meta.url),S(()=>import(`./sync-CTwt-KD4.js`),__vite__mapDeps([3,4,5,6,7,8]),import.meta.url)]).then(([{notifyCheckin:e},{hashGroupTag:n}])=>{e(n(t))}).catch(()=>{}),Ti(),setTimeout(()=>{document.getElementById(`beacon-container`)?.scrollIntoView({behavior:`smooth`,block:`center`})},300),D(`Check-in sent — location updated`,`success`,2e3)}catch(e){console.error(`[canary:liveness] Check-in failed:`,e),D(`Check-in failed`,`error`,3e3)}})}function Pi(e){if(e.startsWith(`wss://`))return!0;if(e.startsWith(`ws://`))try{let t=new URL(e);return t.hostname===`localhost`||t.hostname===`127.0.0.1`||t.hostname===`[::1]`}catch{return!1}return!1}var K=!1;function Fi(){let{personas:e}=l(),t=Object.values(e);return t.length===0?`<li class="relay-item"><span class="settings-hint">No personas yet</span></li>`:t.map(e=>{let t=e.npub.length>16?`${e.npub.slice(0,8)}\u2026${e.npub.slice(-4)}`:e.npub;return`
      <li class="relay-item">
        ${Ze(e.name)}
        <span class="relay-url">${O(e.displayName??e.name)}</span>
        <span class="settings-hint" style="margin-left: 0.25rem;">${O(t)}</span>
        <button class="btn btn--ghost btn--sm persona-publish-btn" data-persona-id="${O(e.id)}" title="Publish profile">Publish</button>
      </li>
    `}).join(``)}function Ii(t){let{groups:n,activeGroupId:r}=l();if(!r||!n[r]){t.innerHTML=``;return}let i=n[r],{identity:a}=l(),o=!!a?.pubkey&&i.admins.includes(a.pubkey);t.innerHTML=`
    <div class="settings-drawer" id="settings-drawer">
      <button class="settings-toggle" id="settings-toggle">
        <span>Group Settings</span>
        <span class="settings-chevron" style="${K?`transform: rotate(90deg);`:``}">&#9658;</span>
      </button>

      <div class="settings-body" id="settings-body"${K?``:` hidden`}>
        <!-- Group Name -->
        <label class="input-label">Name
          <input class="input" id="settings-name" value="${O(i.name)}">
        </label>

        <!-- Rotation Interval -->
        <div class="settings-section">
          <span class="input-label">Rotation</span>
          <div class="segmented">
            <button class="segmented__btn ${i.rotationInterval===30?`segmented__btn--active`:``}" data-interval="30">30s</button>
            <button class="segmented__btn ${i.rotationInterval===86400?`segmented__btn--active`:``}" data-interval="86400">24h</button>
            <button class="segmented__btn ${i.rotationInterval===604800?`segmented__btn--active`:``}" data-interval="604800">7d</button>
            <button class="segmented__btn ${i.rotationInterval===2592e3?`segmented__btn--active`:``}" data-interval="2592000">30d</button>
          </div>
          <p class="settings-hint">How often the verification word changes</p>
        </div>

        ${i.encodingFormat===`words`?`
        <!-- Word Count -->
        <div class="settings-section">
          <span class="input-label">Words</span>
          <div class="segmented">
            <button class="segmented__btn ${i.wordCount===1?`segmented__btn--active`:``}" data-words="1">1</button>
            <button class="segmented__btn ${i.wordCount===2?`segmented__btn--active`:``}" data-words="2">2</button>
            <button class="segmented__btn ${i.wordCount===3?`segmented__btn--active`:``}" data-words="3">3</button>
          </div>
          <p class="settings-hint">More words = stronger security</p>
        </div>
        `:``}

        <!-- Encoding Format -->
        <div class="settings-section">
          <span class="input-label">Display Format</span>
          <div class="segmented">
            <button class="segmented__btn ${i.encodingFormat===`words`?`segmented__btn--active`:``}" data-enc="words">Word</button>
            <button class="segmented__btn ${i.encodingFormat===`pin`?`segmented__btn--active`:``}" data-enc="pin">PIN</button>
            <button class="segmented__btn ${i.encodingFormat===`hex`?`segmented__btn--active`:``}" data-enc="hex">Hex</button>
          </div>
          <p class="settings-hint">Words for voice, PINs for digital input, Hex for machine-to-machine</p>
        </div>

        <!-- Tolerance Window -->
        <div class="settings-section">
          <span class="input-label">Tolerance</span>
          <div class="segmented">
            <button class="segmented__btn ${i.tolerance===0?`segmented__btn--active`:``}" data-tolerance="0">0</button>
            <button class="segmented__btn ${i.tolerance===1?`segmented__btn--active`:``}" data-tolerance="1">+/-1</button>
            <button class="segmented__btn ${i.tolerance===2?`segmented__btn--active`:``}" data-tolerance="2">+/-2</button>
            <button class="segmented__btn ${i.tolerance===3?`segmented__btn--active`:``}" data-tolerance="3">+/-3</button>
          </div>
          <p class="settings-hint">Accept words from neighbouring time windows (higher = more forgiving, less secure)</p>
        </div>

        <!-- Duress Mode -->
        <div class="settings-section">
          <span class="input-label">Emergency Alert Mode</span>
          <div class="segmented">
            <button class="segmented__btn ${i.duressMode===`immediate`||!i.duressMode?`segmented__btn--active`:``}" data-duress-mode="immediate">Immediate</button>
            <button class="segmented__btn ${i.duressMode===`dead-drop`?`segmented__btn--active`:``}" data-duress-mode="dead-drop">Dead Drop</button>
            <button class="segmented__btn ${i.duressMode===`both`?`segmented__btn--active`:``}" data-duress-mode="both">Both</button>
          </div>
          <p class="settings-hint">Immediate alerts members now. Dead drop records silently for later retrieval.</p>
        </div>

        <!-- Nostr Sync Toggle -->
        <div class="settings-section">
          <label class="toggle-label">
            <input type="checkbox" id="nostr-toggle" ${i.nostrEnabled?`checked`:``}>
            <span>Nostr Sync</span>
          </label>
          <div class="nostr-settings" id="nostr-settings"${i.nostrEnabled?``:` hidden`}>
            <!-- Identity -->
            <div class="nostr-identity" id="nostr-identity">
              <span class="settings-hint">Loading identity…</span>
            </div>

            <!-- Write relays (publishing) -->
            <div class="nostr-relays">
              <span class="input-label">Write Relays <span class="settings-hint" style="font-weight:normal;">(publishing)</span></span>
              <ul class="relay-list" id="write-relay-list">
                ${(i.writeRelays??[]).map((e,t)=>`
                  <li class="relay-item">
                    <span class="relay-url">${O(e)}</span>
                    <button class="btn btn--ghost btn--sm write-relay-remove" data-relay-index="${t}" aria-label="Remove write relay">✕</button>
                  </li>
                `).join(``)}
              </ul>
              <div class="relay-add-row">
                <input
                  class="input relay-add-input"
                  id="write-relay-add-input"
                  type="url"
                  placeholder="wss://relay.example.com"
                >
                <button class="btn btn--ghost btn--sm" id="write-relay-add-btn">Add</button>
              </div>
            </div>

            <!-- Read relays (subscriptions/discovery) -->
            <div class="nostr-relays" style="margin-top: 0.5rem;">
              <span class="input-label">Read Relays <span class="settings-hint" style="font-weight:normal;">(subscriptions)</span></span>
              <ul class="relay-list" id="read-relay-list">
                ${(i.readRelays??[]).map((e,t)=>`
                  <li class="relay-item">
                    <span class="relay-url">${O(e)}</span>
                    <button class="btn btn--ghost btn--sm read-relay-remove" data-relay-index="${t}" aria-label="Remove read relay">✕</button>
                  </li>
                `).join(``)}
              </ul>
              <div class="relay-add-row">
                <input
                  class="input relay-add-input"
                  id="read-relay-add-input"
                  type="url"
                  placeholder="wss://relay.example.com"
                >
                <button class="btn btn--ghost btn--sm" id="read-relay-add-btn">Add</button>
              </div>
            </div>

            <!-- Connection status -->
            <div class="nostr-connection-status">
              <span id="nostr-conn-status" class="settings-hint">
                ${Je()?`Connected to ${We()} relay${We()===1?``:`s`}`:`Not connected`}
              </span>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="settings-actions">
          <button class="btn btn--ghost" id="export-btn">Export Group</button>
          <button class="btn btn--ghost" id="import-btn">Import Group</button>
          ${o?`<button class="btn btn--warning" id="reseed-btn">Rotate Key</button>`:``}
          ${o?`<button class="btn btn--danger" id="compromise-reseed-btn">Compromise Reseed</button>`:``}
          <button class="btn btn--danger" id="dissolve-btn">Dissolve Group</button>
        </div>

        <!-- Personas -->
        <div class="settings-section">
          <span class="input-label">Personas</span>
          <ul class="relay-list" id="persona-list">
            ${Fi()}
          </ul>
          <div class="relay-add-row" style="margin-top: 0.5rem;">
            <input class="input relay-add-input" id="persona-name-input" type="text" placeholder="New persona name">
            <button class="btn btn--ghost btn--sm" id="persona-create-btn">Create</button>
          </div>
        </div>
      </div>
    </div>
  `,document.getElementById(`settings-toggle`).addEventListener(`click`,()=>{K=!K;let e=document.getElementById(`settings-body`),n=t.querySelector(`.settings-chevron`);e.hidden=!K,n.style.transform=K?`rotate(90deg)`:``}),document.getElementById(`settings-name`).addEventListener(`change`,e=>{let t=e.target.value.trim();t&&u(r,{name:t})}),t.querySelectorAll(`[data-interval]`).forEach(e=>{e.addEventListener(`click`,()=>{u(r,{rotationInterval:Number(e.dataset.interval)})})}),t.querySelectorAll(`[data-words]`).forEach(e=>{e.addEventListener(`click`,()=>{u(r,{wordCount:Number(e.dataset.words)})})}),t.querySelectorAll(`[data-enc]`).forEach(e=>{e.addEventListener(`click`,()=>{u(r,{encodingFormat:e.dataset.enc})})}),t.querySelectorAll(`[data-tolerance]`).forEach(e=>{e.addEventListener(`click`,()=>{u(r,{tolerance:Number(e.dataset.tolerance)})})}),t.querySelectorAll(`[data-duress-mode]`).forEach(e=>{e.addEventListener(`click`,()=>{u(r,{duressMode:e.dataset.duressMode})})}),document.getElementById(`nostr-toggle`).addEventListener(`change`,e=>{let t=e.target.checked;u(r,{nostrEnabled:t});let n=document.getElementById(`nostr-settings`);if(n.hidden=!t,t){let e=l().groups[r];m(e?.readRelays??[],e?.writeRelays??[],r).then(()=>{Ri()}),Li()}else g(),Ke(),x(!1,0),Ri()});function c(){let e=l().groups[r];e?.nostrEnabled&&m(e.readRelays??[],e.writeRelays??[],r)}t.querySelectorAll(`.write-relay-remove`).forEach(e=>{e.addEventListener(`click`,()=>{let t=Number(e.dataset.relayIndex),n=[...l().groups[r]?.writeRelays??[]];n.splice(t,1),u(r,{writeRelays:n}),c()})}),t.querySelectorAll(`.read-relay-remove`).forEach(e=>{e.addEventListener(`click`,()=>{let t=Number(e.dataset.relayIndex),n=[...l().groups[r]?.readRelays??[]];n.splice(t,1),u(r,{readRelays:n}),c()})}),document.getElementById(`write-relay-add-btn`).addEventListener(`click`,()=>{let e=document.getElementById(`write-relay-add-input`),t=e.value.trim();if(!Pi(t)){e.focus();return}let n=[...l().groups[r]?.writeRelays??[]];n.includes(t)?e.value=``:(n.push(t),u(r,{writeRelays:n}),e.value=``,c())}),document.getElementById(`read-relay-add-btn`).addEventListener(`click`,()=>{let e=document.getElementById(`read-relay-add-input`),t=e.value.trim();if(!Pi(t)){e.focus();return}let n=[...l().groups[r]?.readRelays??[]];n.includes(t)?e.value=``:(n.push(t),u(r,{readRelays:n}),e.value=``,c())}),document.getElementById(`write-relay-add-input`).addEventListener(`keydown`,e=>{e.key===`Enter`&&document.getElementById(`write-relay-add-btn`).click()}),document.getElementById(`read-relay-add-input`).addEventListener(`keydown`,e=>{e.key===`Enter`&&document.getElementById(`read-relay-add-btn`).click()}),i.nostrEnabled&&Li(),document.getElementById(`reseed-btn`)?.addEventListener(`click`,()=>{let{groups:t}=l(),n=t[r],i=n&&e(n)===`online`?`Rotate the group key? This broadcasts the new key to all members via the relay.`:`Rotate the group key? Remaining members will need to re-sync via Share State.`;confirm(i)&&(Lt(r),D(`Key rotated. New verification words are active.`,`warning`,6e3))}),document.getElementById(`compromise-reseed-btn`)?.addEventListener(`click`,()=>{confirm(`Compromise reseed? This generates a new key WITHOUT broadcasting. All members will need new invites.`)&&(Rt(r),D(`Emergency reseed complete. No broadcast sent — share new invites with all members.`,`warning`,8e3))}),document.getElementById(`dissolve-btn`).addEventListener(`click`,()=>{confirm(`Dissolve "${i.name}"? This cannot be undone.`)&&It(r)}),document.getElementById(`export-btn`).addEventListener(`click`,()=>{if(!confirm(`This exports the group secret in cleartext. Treat the file like a password.`))return;let e=new Blob([JSON.stringify(i,null,2)],{type:`application/json`}),t=URL.createObjectURL(e),n=document.createElement(`a`);n.href=t,n.download=`canary-${i.name.toLowerCase().replace(/\s+/g,`-`)}.json`,n.click(),URL.revokeObjectURL(t)}),document.getElementById(`import-btn`).addEventListener(`click`,()=>{if(!confirm(`Only import files from trusted sources — the file contains the group secret.`))return;let e=document.createElement(`input`);e.type=`file`,e.accept=`.json`,e.addEventListener(`change`,async()=>{let t=e.files?.[0];if(t)try{let e=await t.text(),n=JSON.parse(e);Ut(n);let r=crypto.randomUUID(),i={id:r,name:String(n.name),seed:String(n.seed),members:n.members.filter(e=>typeof e==`string`),memberNames:{},nostrEnabled:!1,relays:[],wordlist:typeof n.wordlist==`string`?n.wordlist:`en-v1`,wordCount:[1,2,3].includes(n.wordCount)?n.wordCount:2,counter:typeof n.counter==`number`&&n.counter>=0?n.counter:0,usageOffset:typeof n.usageOffset==`number`&&n.usageOffset>=0?n.usageOffset:0,rotationInterval:typeof n.rotationInterval==`number`&&n.rotationInterval>0?n.rotationInterval:86400,encodingFormat:[`words`,`pin`,`hex`].includes(n.encodingFormat)?n.encodingFormat:`words`,usedInvites:[],latestInviteIssuedAt:0,livenessInterval:typeof n.rotationInterval==`number`&&n.rotationInterval>0?n.rotationInterval:86400,livenessCheckins:{},tolerance:typeof n.tolerance==`number`&&n.tolerance>=0&&n.tolerance<=10?n.tolerance:1,beaconInterval:typeof n.beaconInterval==`number`&&n.beaconInterval>0?n.beaconInterval:60,beaconPrecision:typeof n.beaconPrecision==`number`&&n.beaconPrecision>0?n.beaconPrecision:5,duressPrecision:typeof n.duressPrecision==`number`&&n.duressPrecision>0?n.duressPrecision:9,duressMode:[`immediate`,`dead-drop`,`both`].includes(n.duressMode)?n.duressMode:`immediate`,createdAt:typeof n.createdAt==`number`?n.createdAt:Math.floor(Date.now()/1e3),admins:Array.isArray(n.admins)?n.admins.filter(e=>typeof e==`string`):[],epoch:typeof n.epoch==`number`&&n.epoch>=0?n.epoch:0,consumedOps:Array.isArray(n.consumedOps)?n.consumedOps.filter(e=>typeof e==`string`):[]},{groups:a}=l();s({groups:{...a,[r]:i},activeGroupId:r})}catch{alert(`Could not import group file. Check the file format.`)}}),e.click()}),document.getElementById(`persona-create-btn`)?.addEventListener(`click`,()=>{let e=document.getElementById(`persona-name-input`),t=e?.value.trim();if(!t){e?.focus();return}try{let n=Re(t),{personas:r}=l();s({personas:{...r,[t]:n}}),e&&(e.value=``),D(`Persona "${t}" created`,`success`)}catch(e){D(e instanceof Error?e.message:`Failed to create persona.`,`error`)}}),document.getElementById(`persona-name-input`)?.addEventListener(`keydown`,e=>{e.key===`Enter`&&document.getElementById(`persona-create-btn`)?.click()}),t.querySelectorAll(`.persona-publish-btn`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.personaId;t&&(document.dispatchEvent(new CustomEvent(`canary:publish-persona-profile`,{detail:{personaId:t}})),D(`Publishing profile for "${Object.values(l().personas).find(e=>e.id===t)?.name??t}"…`,`info`))})})}function Li(){let e=document.getElementById(`nostr-identity`);if(!e)return;let{identity:t}=l();if(!t?.pubkey){e.innerHTML=`<span class="settings-hint">No identity available.</span>`;return}let n=`${t.pubkey.slice(0,8)}…${t.pubkey.slice(-8)}`;e.innerHTML=`
    <div class="nostr-identity-row">
      <span class="input-label">Identity (Local key)</span>
      <span class="relay-url nostr-pubkey" title="${O(t.pubkey)}">${O(n)}</span>
    </div>
    <p class="settings-hint">Your identity is stored locally on this device.</p>
  `}function Ri(){let e=document.getElementById(`nostr-conn-status`);if(!e)return;let t=We();e.textContent=Je()?`Connected to ${t} relay${t===1?``:`s`}`:`Not connected`}var zi=new TextEncoder;function Bi(e){let t=new Uint8Array(4);return new DataView(t.buffer).setUint32(0,e,!1),t}function Vi(){let e=new Uint8Array(32);return crypto.getRandomValues(e),e}var Hi=Object.freeze({call:Object.freeze({wordCount:1,rotationSeconds:30,tolerance:1,directional:!0,description:`Phone verification for insurance, banking, and call centres. Single word with 30-second rotation. Deepfake-proof — cloning a voice does not help derive the current word.`}),handoff:Object.freeze({wordCount:1,rotationSeconds:0,tolerance:0,directional:!0,description:`Physical handoff verification for rideshare, delivery, and task completion. Single-use token per event. No time dependency — counter is the task/event ID.`})});function Ui(e){let t=e.preset?Hi[e.preset]:void 0,n=e.rotationSeconds??t?.rotationSeconds??30,r=e.tolerance??t?.tolerance??0,i=t?.wordCount??1,a=e.encoding??{format:`words`,count:i};if(!e.namespace)throw Error(`namespace must be a non-empty string`);if(e.namespace.includes(`\0`))throw Error(`namespace must not contain null bytes`);if(!e.roles[0]||!e.roles[1])throw Error(`Both roles must be non-empty strings`);if(e.roles[0].includes(`\0`)||e.roles[1].includes(`\0`))throw Error(`Roles must not contain null bytes`);if(e.roles[0]===e.roles[1])throw Error(`Roles must be distinct, got ["${e.roles[0]}", "${e.roles[1]}"]`);if(e.myRole!==e.roles[0]&&e.myRole!==e.roles[1])throw Error(`myRole "${e.myRole}" is not one of the configured roles ["${e.roles[0]}", "${e.roles[1]}"]`);if(!Number.isInteger(n)||n<0)throw RangeError(`rotationSeconds must be a non-negative integer, got ${n}`);if(!Number.isInteger(r)||r<0)throw RangeError(`tolerance must be a non-negative integer, got ${r}`);if(r>10)throw RangeError(`tolerance must be <= 10, got ${r}`);if(n===0&&e.counter===void 0)throw Error(`Fixed counter mode (rotationSeconds=0) requires config.counter`);if(n===0&&e.counter!==void 0&&(!Number.isInteger(e.counter)||e.counter<0||e.counter>4294967295))throw RangeError(`counter must be an integer 0–4294967295, got ${e.counter}`);if(n>0&&e.counter!==void 0)throw Error(`counter must not be set when rotationSeconds > 0 (counter is derived from time)`);let o=typeof e.secret==`string`?w(e.secret):e.secret,s=e.roles[0]===e.myRole?e.roles[1]:e.roles[0],c=`pair:${e.namespace}:${s}`,l=n===0;function u(t){if(l){if(e.counter===void 0)throw Error(`Fixed counter mode (rotationSeconds=0) requires config.counter`);return e.counter}let r=t??Math.floor(Date.now()/1e3);return Math.floor(r/n)}return{counter:u,myToken(t){return ge(o,e.namespace,e.roles,u(t),a)[e.myRole]},theirToken(t){return ge(o,e.namespace,e.roles,u(t),a)[s]},verify(t,n){let i=t.toLowerCase().trim().replace(/\s+/g,` `),l=u(n),d=Math.max(0,l-r),f=Math.min(4294967295,l+r),p=!1;for(let t=d;t<=f;t++)ye(i,ge(o,e.namespace,e.roles,t,a)[s])&&(p=!0);let m=[];if(e.theirIdentity){let t=new Set,n=2*r,u=Math.max(0,l-n),p=Math.min(4294967295,l+n);for(let n=u;n<=p;n++){let r=ge(o,e.namespace,e.roles,n,a);t.add(r[s])}for(let n=d;n<=f;n++){let r=xe(zi.encode(c+`:duress`),new Uint8Array([0]),zi.encode(e.theirIdentity),Bi(n)),s=_e(o,r),l=Se(s,a),u=1;for(;t.has(l)&&u<=255;)s=_e(o,xe(r,new Uint8Array([u]))),l=Se(s,a),u++;ye(i,l)&&m.push(e.theirIdentity)}}return m.length>0?{status:`duress`,identities:m}:p?{status:`valid`}:{status:`invalid`}},pair(t){return ge(o,e.namespace,e.roles,u(t),a)}}}var Wi={insurance:{label:`Insurance`,namespace:`aviva`,roles:[`caller`,`agent`],preset:`call`},pickup:{label:`Pickup`,namespace:`family`,roles:[`child`,`adult`],preset:`handoff`},rideshare:{label:`Rideshare`,namespace:`dispatch`,roles:[`requester`,`driver`],preset:`handoff`,encoding:`pin`}},Gi=Vi(),q=Wi.insurance,J,Ki,qi=null,Ji=1;function Yi(){let e=q.preset===`handoff`,t=q.encoding===`pin`?{format:`pin`,digits:4}:void 0,n={secret:Gi,namespace:q.namespace,roles:q.roles,preset:q.preset,...e?{counter:Ji}:{},...t?{encoding:t}:{}};J=Ui({...n,myRole:q.roles[0],theirIdentity:q.roles[1]}),Ki=Ui({...n,myRole:q.roles[1],theirIdentity:q.roles[0]})}Yi();function Xi(e,t){let n=q.preset===`handoff`,r=Hi[q.preset],i=n?Ji:Math.floor((t??Math.floor(Date.now()/1e3))/r.rotationSeconds),a=`pair:${q.namespace}:${e}`,o=q.encoding===`pin`?{format:`pin`,digits:4}:{format:`words`,count:1};return we(Gi,a,e,i,o,r.tolerance)}function Zi(){qi!==null&&(clearInterval(qi),qi=null)}function Qi(e){if(e<=0)return`0s`;let t=Math.floor(e/60),n=Math.floor(e%60);return t>0?`${t}m ${n}s`:`${n}s`}function $i(e){if(e===0)return 0;let t=Math.floor(Date.now()/1e3),n=(Math.floor(t/e)+1)*e;return Math.max(0,n-t)}function ea(e){Zi();let t=Math.floor(Date.now()/1e3),n=q.preset===`handoff`,r=n?0:Hi[q.preset].rotationSeconds,i=$i(r),a=r>0?Math.min(100,(r-i)/r*100):100,o=q.roles[0],s=q.roles[1];e.innerHTML=`
    <div class="call-sim">
      <div class="call-sim__header">
        <h2 class="call-sim__title">CANARY Call Verification Demo</h2>
        <div class="call-sim__scenarios" id="call-scenarios">
          ${Object.entries(Wi).map(([e,t])=>`<button class="btn call-sim__scenario-btn${q===t?` call-sim__scenario-btn--active`:``}" data-scenario="${e}">${t.label}</button>`).join(``)}
        </div>
      </div>

      <div class="call-sim__panels">
        <div class="call-sim__panel call-sim__panel--caller">
          <h3 class="call-sim__role">${o.toUpperCase()}</h3>
          <div class="call-sim__token-group">
            <span class="call-sim__label">Your code — tap to reveal:</span>
            <div class="call-sim__token call-sim__token--reveal" id="caller-reveal" data-real="${J.myToken(t)}" data-alt="${Xi(o,t)}">••••••••</div>
          </div>
          ${n?`<span class="call-sim__countdown">Single-use</span>`:`
          <div class="call-sim__progress"><div class="call-sim__progress-bar" id="caller-progress" style="width: ${a}%"></div></div>
          <span class="call-sim__countdown" id="caller-countdown">${Qi(i)}</span>
          `}
          <div class="call-sim__verify">
            <input type="text" class="input call-sim__input" id="caller-verify-input" placeholder="Type ${s}'s word..." autocomplete="off" />
            <button class="btn btn--primary call-sim__verify-btn" id="caller-verify-btn">Verify</button>
          </div>
          <div class="call-sim__result" id="caller-result" hidden></div>
        </div>

        <div class="call-sim__divider"></div>

        <div class="call-sim__panel call-sim__panel--agent">
          <h3 class="call-sim__role">${s.toUpperCase()}</h3>
          <div class="call-sim__token-group">
            <span class="call-sim__label">Your code — tap to reveal:</span>
            <div class="call-sim__token call-sim__token--reveal" id="agent-reveal" data-real="${Ki.myToken(t)}" data-alt="${Xi(s,t)}">••••••••</div>
          </div>
          ${n?`<span class="call-sim__countdown">Single-use</span>`:`
          <div class="call-sim__progress"><div class="call-sim__progress-bar" id="agent-progress" style="width: ${a}%"></div></div>
          <span class="call-sim__countdown" id="agent-countdown">${Qi(i)}</span>
          `}
          <div class="call-sim__verify">
            <input type="text" class="input call-sim__input" id="agent-verify-input" placeholder="Type ${o}'s word..." autocomplete="off" />
            <button class="btn btn--primary call-sim__verify-btn" id="agent-verify-btn">Verify</button>
          </div>
          <div class="call-sim__result" id="agent-result" hidden></div>
        </div>
      </div>

      <div class="call-sim__banner call-sim__banner--valid" id="call-verified-banner" hidden></div>

      <div class="call-sim__footer">
        <span class="call-sim__meta">Namespace: <strong>${q.namespace}</strong></span>
        <span class="call-sim__meta">Rotation: <strong>${n?`single-use`:r+`s`}</strong></span>
        <span class="call-sim__meta">Encoding: <strong>${q.encoding??`words`}</strong></span>
        <span class="call-sim__meta">Tolerance: <strong>+/-${n?`0`:Hi[q.preset].tolerance}</strong></span>
        <button class="btn" id="call-reset-seed">Reset seed</button>
      </div>

      <div class="call-sim__pair" id="call-pair">
        <span class="call-sim__meta">Pair: <code id="pair-display"></code></span>
      </div>
    </div>
  `,e.querySelector(`#call-scenarios`)?.addEventListener(`click`,t=>{let n=t.target.closest(`[data-scenario]`);if(!n)return;let r=n.dataset.scenario;Wi[r]&&Wi[r]!==q&&(q=Wi[r],Yi(),ea(e))}),e.querySelector(`#call-reset-seed`)?.addEventListener(`click`,()=>{Gi=Vi(),q.preset===`handoff`&&Ji++,Yi(),ea(e)});let c=!1,l=!1,u=!1;function d(){if(!u&&c&&l){Zi();let t=e.querySelector(`#call-verified-banner`);t&&(t.hidden=!1,t.textContent=`Call Verified — both parties authenticated`),e.querySelectorAll(`.call-sim__progress, .call-sim__countdown`).forEach(e=>{e.hidden=!0})}}function f(t,n,r,i,a){let o=e.querySelector(`#${t}`),s=e.querySelector(`#${n}`),f=e.querySelector(`#${r}`);if(!o||!s||!f)return;function p(){let e=o.value.trim();if(!e)return;let t=i.verify(e);f.hidden=!1,f.className=`call-sim__result`,t.status===`valid`?(f.classList.add(`call-sim__result--valid`),f.textContent=`Verified ✓`,a===`caller`?c=!0:l=!0,d()):t.status===`duress`?(f.classList.add(`call-sim__result--invalid`),f.textContent=`Failed ✗`,u=!0):(f.classList.add(`call-sim__result--invalid`),f.textContent=`Failed ✗`)}s.addEventListener(`click`,p),o.addEventListener(`keydown`,e=>{e.key===`Enter`&&p()})}f(`caller-verify-input`,`caller-verify-btn`,`caller-result`,J,`caller`),f(`agent-verify-input`,`agent-verify-btn`,`agent-result`,Ki,`agent`);function p(t){let n=e.querySelector(`#${t}`);if(!n)return;function r(e){e.preventDefault();let t=n.getBoundingClientRect();n.textContent=e.clientX-t.left<t.width/2?n.dataset.real:n.dataset.alt}function i(){n.textContent=`••••••••`}n.addEventListener(`pointerdown`,r),n.addEventListener(`pointerup`,i),n.addEventListener(`pointerleave`,i),n.addEventListener(`pointercancel`,i)}p(`caller-reveal`),p(`agent-reveal`);let m=e.querySelector(`#pair-display`);if(m){let e=J.pair(t);m.textContent=Object.entries(e).map(([e,t])=>`${e}: ${t}`).join(` | `)}!n&&r>0&&(qi=setInterval(()=>{let t=$i(r),n=Math.min(100,(r-t)/r*100),i=e.querySelector(`#caller-progress`),a=e.querySelector(`#agent-progress`),d=e.querySelector(`#caller-countdown`),f=e.querySelector(`#agent-countdown`),p=Math.max(0,100-n),m=p>50?`hsl(${Math.round(p/100*120)}, 70%, 45%)`:`hsl(${Math.round(p/100*120)}, 80%, 45%)`;i&&(i.style.width=`${n}%`,i.style.background=m),a&&(a.style.width=`${n}%`,a.style.background=m),d&&(d.textContent=Qi(t)),f&&(f.textContent=Qi(t));let h=Math.floor(Date.now()/1e3),g=e.querySelector(`#caller-reveal`),_=e.querySelector(`#agent-reveal`),v=J.myToken(h),y=g&&g.dataset.real!==v;if(g&&(g.dataset.real=v,g.dataset.alt=Xi(o,h)),_&&(_.dataset.real=Ki.myToken(h),_.dataset.alt=Xi(s,h)),y){c=!1,l=!1,u=!1;let t=e.querySelector(`#caller-result`),n=e.querySelector(`#agent-result`);t&&(t.hidden=!0,t.className=`call-sim__result`),n&&(n.hidden=!0,n.className=`call-sim__result`);let r=e.querySelector(`#caller-verify-input`),i=e.querySelector(`#agent-verify-input`);r&&(r.value=``),i&&(i.value=``);let a=e.querySelector(`#call-verified-banner`);a&&(a.hidden=!0),e.querySelectorAll(`.call-sim__progress, .call-sim__countdown`).forEach(e=>{e.hidden=!1})}let b=e.querySelector(`#pair-display`);if(b){let e=J.pair();b.textContent=Object.entries(e).map(([e,t])=>`${e}: ${t}`).join(` | `)}t===0&&(Zi(),ea(e))},1e3))}function ta(){Zi()}var na=`
  .id-tree {
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    margin-bottom: 1.25rem;
  }

  .id-tree__root {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0;
    color: var(--text-primary);
    font-weight: 600;
  }

  .id-tree__root-icon {
    font-size: 1rem;
  }

  .id-tree__node {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.25rem 0;
    cursor: pointer;
    transition: background 0.1s;
    border-radius: 3px;
  }

  .id-tree__node--selected {
    background: var(--bg-hover, rgba(255,255,255,0.04));
    border-left: 2px solid var(--amber-500);
  }

  .id-tree__node:hover {
    background: var(--bg-hover, rgba(255,255,255,0.04));
  }

  .id-tree__connector {
    color: var(--text-muted);
    white-space: pre;
    user-select: none;
    flex-shrink: 0;
  }

  .id-tree__badge {
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 0.625rem;
    font-weight: 700;
    flex-shrink: 0;
  }

  .id-tree__name {
    color: var(--text-primary);
    font-weight: 500;
  }

  .id-tree__display-name {
    color: var(--text-muted);
    font-size: 0.75rem;
  }

  .id-tree__type {
    font-size: 0.625rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-muted);
    border: 1px solid var(--border);
    border-radius: 999px;
    padding: 0.05rem 0.35rem;
  }

  .id-tree__groups {
    margin-left: auto;
    font-size: 0.6875rem;
    color: var(--text-muted);
    cursor: pointer;
    padding: 0.125rem 0.375rem;
    border-radius: 3px;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .id-tree__groups:hover {
    color: var(--amber-400);
  }

  .id-tree__add-btn {
    font-size: 0.75rem;
    color: var(--text-muted);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0 0.25rem;
    opacity: 0;
    transition: opacity 0.15s;
    flex-shrink: 0;
  }

  .id-tree__node:hover .id-tree__add-btn {
    opacity: 1;
  }

  .id-tree__add-btn:hover {
    color: var(--amber-400);
  }

  .id-tree__inline-input {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    background: var(--bg-deep);
    border: 1px solid var(--amber-500);
    border-radius: 3px;
    color: var(--text-primary);
    padding: 0.125rem 0.375rem;
    outline: none;
    width: 10rem;
  }

  .id-tree__inline-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.25rem 0;
  }
`;function ra(e,t){let n=0;for(let r of Object.values(t))r.personaId===e&&n++;return n}function ia(e,t){for(let[n,r]of Object.entries(t))if(r.personaId===e)return n;return null}function aa(e,t,n,i,a,o){if(e.archived)return``;let s=n===0?``:i?`└── `:`├── `,c=Xe(e.name),l=O(e.name.slice(0,1).toUpperCase()),u=ra(e.id,t),d=u>0?`${u} group${u===1?``:`s`}`:``,f=e.displayName&&e.displayName!==e.name?` <span class="id-tree__display-name">(${O(e.displayName)})</span>`:``,p=`<span class="id-tree__type">${O(r(e))}</span>`,m=n*1.5,h=`
    <div class="id-tree__node${e.id===o?` id-tree__node--selected`:``}" data-tree-persona-id="${O(e.id)}" style="padding-left: ${m}rem;">
      <span class="id-tree__connector">${a}${s}</span>
      <span class="id-tree__badge" style="background: ${c};">${l}</span>
      <span class="id-tree__name">${O(e.name)}</span>${f}
      ${p}
      <button class="id-tree__add-btn" data-tree-add-child="${O(e.id)}" title="Add child persona or account">+</button>
      ${d?`<span class="id-tree__groups" data-tree-groups-persona="${O(e.id)}">${d}</span>`:``}
    </div>
  `,g=Object.values(e.children).filter(e=>!e.archived),_=n===0?``:a+(i?`    `:`│   `);return h+g.map((e,r)=>{let i=r===g.length-1;return aa(e,t,n+1,i,_,o)}).join(``)}function oa(e){let{identity:t,personas:n,groups:r}=l();if(!t)return`<div class="id-tree"></div>`;let i=`<style id="identity-tree-styles">${na}</style>`,a=t.displayName&&t.displayName!==`You`?O(t.displayName):`Master Identity`,o=Object.values(n).filter(e=>!e.archived);return`
    ${i}
    <div class="id-tree">
      <div class="id-tree__root">
        <span class="id-tree__root-icon">&#128273;</span>
        <span>${a}</span>
      </div>
      ${o.map((t,n)=>aa(t,r,0,n===o.length-1,``,e)).join(``)}
    </div>
  `}function sa(e){let t=e.querySelector(`.id-tree`);t&&(t.addEventListener(`click`,e=>{let n=e.target,r=n.closest(`[data-tree-add-child]`);if(r){e.stopPropagation();let n=r.dataset.treeAddChild;ca(t,r,n);return}let i=n.closest(`[data-tree-groups-persona]`);if(i){e.stopPropagation();let t=i.dataset.treeGroupsPersona,{groups:n}=l(),r=ia(t,n);s(r?{view:`groups`,activeGroupId:r}:{view:`groups`});return}let a=n.closest(`[data-tree-persona-id]`);if(a){let e=a.dataset.treePersonaId;e&&document.dispatchEvent(new CustomEvent(`canary:select-persona`,{detail:{personaId:e}}))}}),t.addEventListener(`keydown`,e=>{let t=e.target;(e.key===`Enter`||e.key===` `)&&t.matches(`[data-tree-persona-id]`)&&(e.preventDefault(),t.click())}))}function ca(e,t,n){if(e.querySelector(`.id-tree__inline-row`))return;let r=t.closest(`.id-tree__node`);if(!r)return;let i=parseFloat(r.style.paddingLeft||`0`)+1.5,a=document.createElement(`div`);a.className=`id-tree__inline-row`,a.style.paddingLeft=i+`rem`;let o=document.createElement(`input`);o.className=`id-tree__inline-input`,o.type=`text`,o.placeholder=`child name`,o.maxLength=32,o.autocomplete=`off`;let c=document.createElement(`select`);c.className=`input`,c.style.cssText=`font-size:0.75rem;padding:0.125rem 0.375rem;max-width:8rem;`,c.innerHTML=`
    <option value="account">Account</option>
    <option value="persona">Persona</option>
  `,a.appendChild(o),a.appendChild(c),r.insertAdjacentElement(`afterend`,a),o.focus();function u(){a.remove()}function d(){let e=o.value.trim().toLowerCase();if(!e||e.length===0||e.length>32||e!==e.toLowerCase()||/\s/.test(e)){u();return}try{let t=Be(n,e,c.value===`persona`?`persona`:`account`),{personas:r}=l();T(r,n)&&(s({personas:la(r,n,t)}),document.dispatchEvent(new CustomEvent(`canary:select-persona`,{detail:{personaId:t.id}})))}catch{}u()}o.addEventListener(`keydown`,e=>{e.key===`Enter`?(e.preventDefault(),d()):e.key===`Escape`&&(e.preventDefault(),u())}),o.addEventListener(`blur`,()=>{setTimeout(u,150)})}function la(e,t,n){let r={};for(let[i,a]of Object.entries(e))i===t?r[i]={...a,children:{...a.children,[n.id]:n}}:a.children&&Object.keys(a.children).length>0?r[i]={...a,children:la(a.children,t,n)}:r[i]=a;return r}var ua=!1,da=!1,Y=null,X=!1,fa=!1,pa=!1,ma=null,Z=[{name:``,index:0},{name:``,index:0},{name:``,index:0}],ha=!1;function ga(e){return e.length<=16?e:`${e.slice(0,8)}\u2026${e.slice(-4)}`}function _a(e){return!(e.length===0||e.length>32||e!==e.toLowerCase()||/\s/.test(e))}function va(e){return a(e)===`account`?`A standalone child key you can export as an nsec account.`:`A reusable branch for related identities, profiles, and group keys.`}function ya(e){return a(e)===`account`?`account`:`persona`}function ba(){let e=l().identity;return e?e.signerType===`nip07`?{label:`Extension managed`,detail:`Your browser extension keeps the root secret private, so canary-kit cannot derive or back up the tree here.`,recoveryBacked:!1}:e.mnemonic?{label:`Mnemonic-backed root`,detail:`This root supports the full nsec-tree workflow: derived personas, derived accounts, proofs, and phrase/Shamir recovery.`,recoveryBacked:!0}:{label:`nsec-backed root`,detail:`This imported nsec can still derive the identity tree, but it has no recovery phrase. Create a new mnemonic-backed root only if you want phrase/Shamir recovery.`,recoveryBacked:!1}:{label:`No identity`,detail:`Create or restore a mnemonic-backed root to use the identity tree and recovery features.`,recoveryBacked:!1}}function xa(e,t){let n=t.querySelector(`[data-field="displayName"]`),r=t.querySelector(`[data-field="about"]`),i=t.querySelector(`[data-field="picture"]`);return!n&&!r&&!i?!1:(n?.value??``)!==(e.displayName??``)||(r?.value??``)!==(e.about??``)||(i?.value??``)!==(e.picture??``)}function Sa(){if(!Y)return null;let e=T(l().personas,Y);return e?[...e.ancestors.map(e=>({name:e.name,index:e.index})),{name:e.persona.name,index:e.persona.index}]:null}function Ca(e){Z=[{name:e[0]?.name??``,index:e[0]?.index??0},{name:e[1]?.name??``,index:e[1]?.index??0},{name:e[2]?.name??``,index:e[2]?.index??0}],ha=!1}function wa(e){return e.map((e,t)=>t===0?`derivePersona(${e.name}, ${e.index??0})`:`persona:${e.name}@${e.index??0}`).join(` → `)}function Ta(){let e=Z.map(e=>({name:e.name.trim(),index:e.index??0})).filter(e=>e.name.length>0);if(e.length===0)return null;try{let t=ze(e);return{path:e,npub:t.npub,nsec:t.nsec}}catch(e){return{error:e instanceof Error?e.message:`Unable to derive identity`}}}function Ea(){let e=Ta();return e===null?`<div class="id-derive__hint">Add at least the first level to derive an identity.</div>`:`error`in e?`<div class="id-derive__error">${O(e.error)}</div>`:`
    <div class="id-derive__result">
      <div class="id-derive__chain">Path: ${O(wa(e.path))}</div>
      <div class="id-derive__row">
        <span class="id-derive__key">npub</span>
        <code class="id-derive__value">${O(e.npub)}</code>
      </div>
      <div class="id-derive__row">
        <span class="id-derive__key">nsec</span>
        <code class="id-derive__value id-derive__value--secret${ha?` id-derive__value--revealed`:``}">${O(e.nsec)}</code>
      </div>
      <div class="id-derive__copy">
        <button class="btn btn--sm" id="id-derive-copy-npub">Copy npub</button>
        <button class="btn btn--sm" id="id-derive-copy-nsec">${ha?`Copy nsec`:`Reveal + copy nsec`}</button>
      </div>
    </div>
  `}function Da(e){let t=e.querySelector(`#id-derive-feedback`);t&&(t.innerHTML=Ea())}var Oa=`
  .id-hub { max-width: 600px; margin: 0 auto; padding: 1.5rem 1rem 3rem; }

  .id-hub__heading {
    font-family: var(--font-display);
    font-size: 1.5rem;
    font-weight: 400;
    color: var(--text-bright);
    margin: 0 0 0.25rem;
    letter-spacing: 0.01em;
  }

  .id-hub__sub {
    font-size: 0.75rem;
    color: var(--text-muted);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 1.5rem;
  }

  /* ── Master card ────────────────────────────────── */

  .id-master {
    background: var(--bg-raised);
    border: 1px solid var(--border);
    border-left: 3px solid var(--amber-500);
    border-radius: 6px;
    padding: 1.25rem;
    margin-bottom: 1.5rem;
  }

  .id-master__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .id-master__stats {
    font-size: 0.8125rem;
    color: var(--text-secondary);
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .id-master__actions {
    display: flex;
    gap: 0.375rem;
    flex-wrap: wrap;
  }

  .id-master__mnemonic {
    margin-top: 1rem;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    padding: 0.625rem 0.75rem;
    background: var(--bg-deep);
    border: 1px solid var(--border);
    border-radius: 4px;
    color: var(--text-primary);
    cursor: pointer;
    user-select: none;
    filter: blur(5px);
    transition: filter 0.2s var(--ease-out);
    line-height: 1.6;
    word-spacing: 0.25em;
  }

  .id-master__mnemonic--revealed {
    filter: none;
    user-select: text;
  }

  .id-master__mnemonic-hint {
    font-size: 0.6875rem;
    color: var(--text-muted);
    margin-top: 0.25rem;
    display: block;
  }

  .id-choice {
    margin-top: 1rem;
    border: 1px solid var(--border);
    border-radius: 8px;
    background: var(--bg-deep);
    padding: 0.875rem;
    display: grid;
    gap: 0.75rem;
  }

  .id-choice__title {
    margin: 0;
    font-size: 0.8125rem;
    color: var(--text-bright);
  }

  .id-choice__sub {
    margin: 0;
    font-size: 0.75rem;
    line-height: 1.55;
    color: var(--text-secondary);
  }

  .id-choice__grid {
    display: grid;
    gap: 0.75rem;
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  }

  .id-choice__card {
    border: 1px solid var(--border);
    border-radius: 6px;
    background: var(--bg-surface);
    padding: 0.75rem;
    display: grid;
    gap: 0.5rem;
  }

  .id-choice__card-title {
    margin: 0;
    font-size: 0.8125rem;
    color: var(--text-primary);
  }

  .id-choice__list {
    margin: 0;
    padding-left: 1rem;
    font-size: 0.75rem;
    line-height: 1.55;
    color: var(--text-secondary);
  }

  .id-derive {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border);
    display: grid;
    gap: 0.75rem;
  }

  .id-derive__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .id-derive__title {
    margin: 0;
    font-size: 0.875rem;
    color: var(--text-bright);
  }

  .id-derive__sub {
    margin: 0.25rem 0 0;
    font-size: 0.75rem;
    color: var(--text-muted);
    line-height: 1.5;
  }

  .id-derive__actions {
    display: flex;
    gap: 0.375rem;
    flex-wrap: wrap;
  }

  .id-derive__grid {
    display: grid;
    gap: 0.625rem;
    grid-template-columns: 1fr;
  }

  .id-derive__field {
    display: grid;
    gap: 0.25rem;
  }

  .id-derive__label {
    font-size: 0.6875rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  .id-derive__hint,
  .id-derive__error {
    font-size: 0.75rem;
    line-height: 1.5;
  }

  .id-derive__hint { color: var(--text-muted); }
  .id-derive__error { color: var(--failed); }

  .id-derive__result {
    background: var(--bg-deep);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 0.75rem;
    display: grid;
    gap: 0.625rem;
  }

  .id-derive__chain {
    font-size: 0.6875rem;
    color: var(--text-muted);
    word-break: break-word;
  }

  .id-derive__row {
    display: grid;
    gap: 0.25rem;
  }

  .id-derive__key {
    font-size: 0.6875rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .id-derive__value {
    margin: 0;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--text-primary);
    word-break: break-all;
  }

  .id-derive__value--secret {
    filter: blur(5px);
    user-select: none;
  }

  .id-derive__value--revealed {
    filter: none;
    user-select: text;
  }

  .id-derive__copy {
    display: flex;
    gap: 0.375rem;
    flex-wrap: wrap;
  }

  /* ── Empty state ────────────────────────────────── */

  .id-empty {
    text-align: center;
    padding: 3rem 1.5rem;
    border: 1px dashed var(--border);
    border-radius: 8px;
    margin-bottom: 1.5rem;
  }

  .id-empty__icon {
    font-size: 2rem;
    margin-bottom: 0.75rem;
    opacity: 0.4;
  }

  .id-empty__title {
    font-family: var(--font-display);
    font-size: 1.125rem;
    color: var(--text-primary);
    margin: 0 0 0.5rem;
  }

  .id-empty__text {
    font-size: 0.8125rem;
    color: var(--text-muted);
    line-height: 1.6;
    max-width: 380px;
    margin: 0 auto 1.25rem;
  }

  /* ── Create form ────────────────────────────────── */

  .id-create {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    margin-bottom: 0.25rem;
  }

  .id-create__error {
    font-size: 0.75rem;
    color: var(--failed);
    min-height: 1.125rem;
  }

  /* ── Section divider ────────────────────────────── */

  .id-divider {
    border: none;
    border-top: 1px solid var(--border);
    margin: 1.5rem 0;
  }

  /* ── Archived ───────────────────────────────────── */

  .id-archived__toggle {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem 0;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-muted);
    text-align: left;
  }

  .id-archived__toggle:hover { color: var(--text-secondary); }

  .id-archived__list {
    overflow: hidden;
    transition: max-height 0.3s var(--ease-out);
  }

  .id-archived__row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--border);
    font-size: 0.8125rem;
  }

  .id-archived__badge {
    width: 1.375rem;
    height: 1.375rem;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 0.625rem;
    font-weight: 700;
    color: #fff;
    opacity: 0.5;
  }

  .id-archived__name { color: var(--text-muted); }
  .id-archived__npub { color: var(--text-muted); opacity: 0.5; font-size: 0.6875rem; flex: 1; }

  /* ── NIP-07 fallback ────────────────────────────── */

  .id-nip07 { padding: 2rem 1.5rem; }

  .id-nip07__card {
    background: var(--bg-raised);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 1.25rem;
    margin-bottom: 1rem;
  }

  .id-nip07__header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .id-nip07__icon {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    background: var(--bg-hover);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
  }

  .id-nip07__why {
    background: var(--bg-raised);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 1.25rem;
  }

  .id-nip07__why h3 {
    font-family: var(--font-display);
    font-size: 0.9375rem;
    margin: 0 0 0.75rem;
    color: var(--text-primary);
  }

  .id-nip07__why p {
    font-size: 0.8125rem;
    color: var(--text-muted);
    line-height: 1.6;
    margin: 0 0 0.625rem;
  }

  .id-nip07__why details {
    font-size: 0.75rem;
    color: var(--text-muted);
    opacity: 0.7;
    margin-top: 0.75rem;
  }

  .id-nip07__why summary { cursor: pointer; }
  .id-nip07__why code { font-family: var(--font-mono); font-size: 0.6875rem; }

  /* ── Detail panel ────────────────────────────────── */

  .id-detail {
    background: var(--bg-raised);
    border: 1px solid var(--border);
    border-left: 3px solid var(--amber-500);
    border-radius: 6px;
    padding: 1rem 1.25rem 1.25rem;
    margin-bottom: 1.5rem;
  }

  .id-detail__hint {
    font-size: 0.8125rem;
    color: var(--text-muted);
    text-align: center;
    padding: 1.5rem 0;
  }

  .id-detail__header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.5rem;
  }

  .persona-card__badge {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 0.75rem;
    font-weight: 700;
    flex-shrink: 0;
  }

  .persona-card__breadcrumb {
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    color: var(--text-muted);
    padding-top: 0.625rem;
    line-height: 1.4;
  }

  .persona-card__breadcrumb-sep {
    opacity: 0.4;
    margin: 0 0.125rem;
  }

  .persona-card__breadcrumb-current {
    color: var(--text-secondary);
  }

  .persona-card__npub {
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    color: var(--text-muted);
    padding: 0.625rem 0;
    word-break: break-all;
  }

  .persona-card__section {
    padding: 0.5rem 0;
  }

  .persona-card__section-title {
    font-size: 0.6875rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-muted);
    margin: 0 0 0.5rem;
    font-weight: 600;
  }

  .persona-card__field {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    margin-bottom: 0.5rem;
  }

  .persona-card__field-label {
    font-size: 0.6875rem;
    color: var(--text-muted);
  }

  .persona-card__input {
    font-size: 0.8125rem;
  }

  .persona-card__publish-btn {
    margin-top: 0.375rem;
  }

  .persona-card__relay-default {
    font-size: 0.8125rem;
    color: var(--text-muted);
  }

  .persona-card__customise-link {
    font-size: 0.75rem;
    color: var(--amber-400);
    margin-left: 0.5rem;
    text-decoration: none;
  }

  .persona-card__customise-link:hover {
    text-decoration: underline;
  }

  .persona-card__group-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;
  }

  .persona-card__group-chip {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    background: var(--bg-deep);
    border: 1px solid var(--border);
    border-radius: 3px;
    color: var(--text-secondary);
    cursor: pointer;
    transition: border-color 0.15s var(--ease-out);
  }

  .persona-card__group-chip:hover {
    border-color: var(--amber-400);
    color: var(--text-primary);
  }

  .persona-card__group-chip-wrap {
    display: inline-flex;
    align-items: center;
    gap: 0;
  }

  .persona-card__group-remove {
    font-size: 0.75rem;
    line-height: 1;
    padding: 0.25rem 0.25rem;
    background: none;
    border: 1px solid var(--border);
    border-left: none;
    border-radius: 0 3px 3px 0;
    color: var(--text-muted);
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.15s, color 0.15s;
  }

  .persona-card__group-chip-wrap:hover .persona-card__group-remove {
    opacity: 1;
  }

  .persona-card__group-remove:hover {
    color: var(--failed);
  }

  .persona-card__group-chip-wrap .persona-card__group-chip {
    border-radius: 3px 0 0 3px;
  }

  .persona-card__assign-select {
    margin-top: 0.375rem;
  }

  .persona-card__actions {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    padding-top: 0.75rem;
    flex-wrap: wrap;
  }

  .persona-card__more {
    position: relative;
    margin-left: auto;
  }

  .persona-card__more-btn {
    font-size: 1rem;
    padding: 0.25rem 0.5rem;
  }

  .persona-card__menu {
    position: absolute;
    right: 0;
    top: 100%;
    z-index: 10;
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: 4px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
    min-width: 160px;
    padding: 0.25rem 0;
  }

  .persona-card__menu-item {
    display: block;
    width: 100%;
    padding: 0.5rem 0.75rem;
    text-align: left;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--text-primary);
    background: none;
    border: none;
    cursor: pointer;
    transition: background 0.1s;
  }

  .persona-card__menu-item:hover {
    background: var(--bg-hover);
  }

  .persona-card__menu-item--danger {
    color: var(--failed);
  }

  .persona-card__qr {
    text-align: center;
    padding: 0.75rem 0;
  }

  .persona-card__qr-label {
    display: block;
    font-family: var(--font-mono);
    font-size: 0.625rem;
    color: var(--text-muted);
    margin-top: 0.375rem;
  }

  .persona-card__meta {
    font-size: 0.75rem;
    color: var(--text-muted);
  }

  /* ── Mobile ─────────────────────────────────────── */

  @media (max-width: 480px) {
    .id-hub { padding: 1rem 0.75rem 2rem; }

    .id-master__row {
      flex-direction: column;
      align-items: flex-start;
    }

    .id-master__actions {
      width: 100%;
    }

    .id-master__actions .btn {
      flex: 1;
      min-width: 0;
      text-align: center;
    }

    .id-create {
      flex-direction: column;
    }

    .id-create .input {
      width: 100%;
    }

    .persona-card__actions {
      flex-direction: column;
      align-items: stretch;
    }

    .persona-card__more {
      margin-left: 0;
    }

    .persona-card__menu {
      position: fixed;
      left: 0.75rem;
      right: 0.75rem;
      bottom: 0.75rem;
      top: auto;
      border-radius: 8px;
    }

    .persona-card__menu-item {
      padding: 0.75rem 1rem;
      font-size: 0.875rem;
    }
  }
`;function ka(){let{identity:e,groups:t}=l(),n=e?.pubkey??``,r=n?`${n.slice(0,8)}\u2026${n.slice(-4)}`:`unknown`,i=Object.keys(t).length;return`
    <div class="id-nip07">
      <div class="id-nip07__card">
        <div class="id-nip07__header">
          <div class="id-nip07__icon">\u{1F511}</div>
          <div>
            <div style="font-weight: 600; font-size: 0.9375rem;">Your Identity</div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">${O(r)} \u00B7 NIP-07 extension \u00B7 ${i} group${i===1?``:`s`}</div>
          </div>
        </div>
      </div>

      <div class="id-nip07__why">
        <h3>Why can\u2019t I manage personas?</h3>
        <p>Your NIP-07 browser extension keeps your private key secure by never exposing it to apps. This is good security \u2014 but it means canary-kit cannot derive sub-identities from your key.</p>
        <p>Personas, Shamir backup, nsec export, and linkage proofs all require the raw private key for cryptographic derivation. Your extension only allows signing and encryption.</p>
        <p>To use persona features, create a new account with a recovery phrase or import an existing one.</p>
        <details>
          <summary>Technical detail</summary>
          <p style="margin: 0.5rem 0 0; line-height: 1.5;">nsec-tree derives child keys via <code>HMAC-SHA256(master_key, purpose)</code>. NIP-07 extensions expose <code>signEvent()</code> and <code>nip44.encrypt()</code> but not the raw key bytes. A future NIP could add <code>deriveChild(purpose, index)</code> to bridge this gap.</p>
        </details>
      </div>
    </div>
  `}function Aa(){let{groups:e,personas:t}=l(),n=Object.values(e);if(n.length===0)return``;let r=new Map;for(let e of n){let t=e.personaId||`(unassigned)`,n=r.get(t)??[];n.push(e),r.set(t,n)}let i=[];for(let[e,n]of r){let r=e===`(unassigned)`,a=(r?null:T(t,e))?.persona,o=a?.archived,s=a?.name??e,c=r?`<span style="color:var(--text-muted);font-style:italic;">unassigned</span>`:`<span${o?` style="opacity:0.5;"`:``}>${O(s)}</span>`,l=n.map(e=>`<button class="persona-card__group-chip" data-navigate-group="${O(e.id)}">${O(e.name)}</button>`).join(` `);i.push(`<div style="display:flex;align-items:baseline;gap:0.5rem;margin-bottom:0.375rem;flex-wrap:wrap;">
      <span style="font-size:0.75rem;min-width:5rem;">${c}</span>${l}
    </div>`)}return`
    <div style="margin-top:0.75rem;padding-top:0.75rem;border-top:1px solid var(--border);">
      <h4 class="persona-card__section-title" style="margin-bottom:0.5rem;">Groups</h4>
      ${i.join(``)}
    </div>
  `}function ja(e){return`
    <div class="id-choice">
      <div>
        <h4 class="id-choice__title">Which path should I choose?</h4>
        <p class="id-choice__sub">Both imported <code>nsec</code> roots and mnemonic-backed roots can derive the full <code>nsec-tree</code> hierarchy. The difference is whether the root itself has phrase/Shamir recovery.</p>
      </div>
      <div class="id-choice__grid">
        <div class="id-choice__card">
          <h5 class="id-choice__card-title">Keep using this nsec-backed root</h5>
          <ul class="id-choice__list">
            <li>Best when this is already your live public identity</li>
            <li>Still derives personas, anonymous accounts, and proofs</li>
            <li>No phrase or Shamir recovery unless you already have the mnemonic elsewhere</li>
          </ul>
        </div>
        <div class="id-choice__card">
          <h5 class="id-choice__card-title">Create or restore a mnemonic-backed root</h5>
          <ul class="id-choice__list">
            <li>Best when you want long-term recovery and backup</li>
            <li>Adds 12-word phrase recovery and Shamir splitting</li>
            <li>${e?`You already have this capability on the current root.`:`Creates a new root or restores an existing mnemonic-backed one; it does not convert the current nsec in place.`}</li>
          </ul>
        </div>
      </div>
    </div>
  `}function Ma(){let{identity:e,personas:t,groups:n}=l();if(!e)return``;let r=0,i=0;for(let{persona:e}of He(t))e.archived||(a(e)===`account`?i++:r++);let o=Object.keys(n).length,s=!!e.mnemonic,c=Sa(),u=ba(),d=e.privkey?`
    <div class="id-derive">
      <div class="id-derive__header">
        <div>
          <h4 class="id-derive__title">Developer derivation example</h4>
          <p class="id-derive__sub">Enter up to three tree levels plus explicit indices and canary-kit recreates the deterministic child identity, including its <code>npub</code> and <code>nsec</code>.</p>
        </div>
        <div class="id-derive__actions">
          ${c&&c.length<=3?`<button class="btn btn--sm" id="id-derive-use-selected">Use selected persona</button>`:``}
          <button class="btn btn--sm" id="id-derive-clear">Clear</button>
        </div>
      </div>
      <div class="id-derive__grid">
        ${[0,1,2].map(e=>`
          <div class="id-derive__field">
            <span class="id-derive__label">Level ${e+1}</span>
            <div style="display:grid;grid-template-columns:minmax(0,1fr) 5.25rem;gap:0.5rem;align-items:end;">
              <input
                class="input"
                id="id-derive-level-${e+1}"
                data-derive-slot-name="${e}"
                type="text"
                value="${O(Z[e]?.name??``)}"
                placeholder="${e===0?`personal`:e===1?`team`:`ops`}"
                autocomplete="off"
                spellcheck="false"
              />
              <label style="display:grid;gap:0.25rem;">
                <span class="id-derive__label">Index</span>
                <input
                  class="input"
                  id="id-derive-index-${e+1}"
                  data-derive-slot-index="${e}"
                  type="number"
                  min="0"
                  step="1"
                  value="${String(Z[e]?.index??0)}"
                  placeholder="0"
                  inputmode="numeric"
                />
              </label>
            </div>
          </div>
        `).join(``)}
      </div>
      <div class="id-derive__hint">
        ${c?`Selected path: <code>${O(c.map(e=>`${e.name}@${e.index??0}`).join(` / `))}</code>${c.length>3?` — this example only exposes the first three tree levels, so fill it manually if you need a deeper path.`:``}`:`Tip: select a persona in the tree, then load it here to show that the same derivation inputs recreate the same identity. Change indices to match rotated personas.`}
      </div>
      <div id="id-derive-feedback">${Ea()}</div>
    </div>
  `:`
    <div class="id-derive">
      <div class="id-derive__header">
        <div>
          <h4 class="id-derive__title">Developer derivation example</h4>
          <p class="id-derive__sub">This needs a local key. Browser extensions keep the raw secret hidden, so canary-kit cannot recreate child identities here.</p>
        </div>
      </div>
    </div>
  `;return`
    <div class="id-master">
      <div class="id-master__row">
        <div class="id-master__stats">
          <span>${r} persona${r===1?``:`s`}</span>
          <span>\u00B7</span>
          <span>${i} account${i===1?``:`s`}</span>
          <span>\u00B7</span>
          <span>${o} group${o===1?``:`s`}</span>
          <span>\u00B7</span>
          <span>${s?`Backed up`:`No backup`}</span>
        </div>
        <div class="id-master__actions">
          ${s?`<button class="btn btn--sm" id="id-backup-btn">Backup</button>`:``}
          <button class="btn btn--sm" id="id-shamir-btn"${s?``:` disabled title="Shamir backup requires a mnemonic-backed root"`}>Shamir</button>
          <button class="btn btn--sm" id="id-verify-proof-btn">Verify proof</button>
        </div>
      </div>
      ${s?`
        <div id="id-mnemonic" class="id-master__mnemonic${da?` id-master__mnemonic--revealed`:``}">${O(e.mnemonic??``)}</div>
        <span class="id-master__mnemonic-hint">${da?`Click to hide`:`Click to reveal recovery phrase`}</span>
      `:`
        <span class="id-master__mnemonic-hint">This root can derive personas and accounts, but it cannot be recovered with a phrase or split with Shamir because no mnemonic is stored.</span>
        <div class="id-master__actions" style="margin-top:0.75rem;">
          <button class="btn btn--sm btn--primary" id="id-create-recovery-root">Create or restore mnemonic-backed root</button>
        </div>
      `}
      <div class="id-derive__hint"><strong>${O(u.label)}.</strong> ${O(u.detail)}</div>
      <div class="id-derive__hint">One root can create many unlinkable personas and exportable nsec accounts. Use proofs only when you want to prove continuity between identities.</div>
      ${ja(s)}
      ${Aa()}
      ${d}
    </div>
  `}function Na(e){return e.length===0?``:`<div class="persona-card__breadcrumb">${e.map((t,n)=>{let r=n===e.length-1,i=O(t.name);return r?`<span class="persona-card__breadcrumb-current">${i}</span>`:`<span>${i}</span>`}).join(` <span class="persona-card__breadcrumb-sep">/</span> `)}</div>`}function Pa(e){return`
    <div class="persona-card__section">
      <h4 class="persona-card__section-title">Profile</h4>
      <label class="persona-card__field">
        <span class="persona-card__field-label">Display name</span>
        <input class="input persona-card__input" type="text" data-field="displayName"
          value="${O(e.displayName??``)}" placeholder="Display name" />
      </label>
      <label class="persona-card__field">
        <span class="persona-card__field-label">About</span>
        <input class="input persona-card__input" type="text" data-field="about"
          value="${O(e.about??``)}" placeholder="Short bio" />
      </label>
      <label class="persona-card__field">
        <span class="persona-card__field-label">Picture URL</span>
        <input class="input persona-card__input" type="url" data-field="picture"
          value="${O(e.picture??``)}" placeholder="https://..." />
      </label>
      <button class="btn btn--sm btn--primary persona-card__publish-btn" id="id-detail-publish" hidden>
        Publish
      </button>
    </div>
  `}function Fa(e){let{settings:t}=l();if(!(e.readRelays&&e.readRelays.length>0||e.writeRelays&&e.writeRelays.length>0)&&!pa)return`
      <div class="persona-card__section">
        <h4 class="persona-card__section-title">Relays</h4>
        <span class="persona-card__relay-default">Using default relays</span>
        <a href="#" class="persona-card__customise-link" id="id-detail-customise-relays">Customise</a>
      </div>
    `;let n=e.readRelays??t.defaultReadRelays??[],r=e.writeRelays??t.defaultWriteRelays??[];return`
    <div class="persona-card__section">
      <h4 class="persona-card__section-title">Relays</h4>
      <label class="persona-card__field">
        <span class="persona-card__field-label">Read relays</span>
        <input class="input persona-card__input" type="text" data-relay-field="read"
          value="${O(n.join(`, `))}" placeholder="wss://relay.example.com" />
      </label>
      <label class="persona-card__field">
        <span class="persona-card__field-label">Write relays</span>
        <input class="input persona-card__input" type="text" data-relay-field="write"
          value="${O(r.join(`, `))}" placeholder="wss://relay.example.com" />
      </label>
      <button class="btn btn--sm btn--primary" id="id-detail-save-relays">Save relays</button>
    </div>
  `}function Ia(e){let{groups:t,personas:n}=l(),r=Object.values(t),i=r.filter(t=>t.personaId===e.id),a=r.filter(t=>t.personaId!==e.id),o=i.map(e=>`
    <span class="persona-card__group-chip-wrap">
      <button class="persona-card__group-chip" data-navigate-group="${O(e.id)}">${O(e.name)}</button>
      <button class="persona-card__group-remove" data-unassign-group="${O(e.id)}"
        title="Unassign from this persona" aria-label="Unassign ${O(e.name)}">\u00D7</button>
    </span>
  `).join(``);function s(e){if(!e.personaId)return``;for(let{persona:t}of He(n))if(t.id===e.personaId)return t.name;return``}let c=a.length>0?`<select class="input persona-card__assign-select" id="id-detail-assign" style="font-size:0.75rem;padding:0.25rem 0.375rem;">
        <option value="">+ Assign group\u2026</option>
        ${a.map(e=>{let t=s(e),n=t?` (${O(t)})`:``;return`<option value="${O(e.id)}">${O(e.name)}${n}</option>`}).join(``)}
      </select>`:``;return`
    <div class="persona-card__section">
      <h4 class="persona-card__section-title">Groups</h4>
      ${i.length>0?`<div class="persona-card__group-chips">${o}</div>`:`<span class="persona-card__meta">No groups assigned</span>`}
      ${c}
    </div>
  `}function La(e){let t=ya(e);return`
    <div class="persona-card__actions">
      <button class="btn btn--sm" id="id-detail-export">Export nsec</button>
      <div class="persona-card__more">
        <button class="btn btn--sm persona-card__more-btn" id="id-detail-menu-btn"
          aria-label="More actions" title="More actions">\u22EF</button>
        ${X?`
          <div class="persona-card__menu" id="id-detail-menu-panel">
            <button class="persona-card__menu-item" id="id-detail-copy-npub">Copy npub</button>
            <button class="persona-card__menu-item" id="id-detail-show-qr">
              ${fa?`Hide QR`:`Show QR`}
            </button>
            <button class="persona-card__menu-item" id="id-detail-rotate">Rotate ${t}</button>
            <button class="persona-card__menu-item" id="id-detail-prove">Prove continuity</button>
            <button class="persona-card__menu-item persona-card__menu-item--danger" id="id-detail-archive">Archive ${t}</button>
          </div>
        `:``}
      </div>
    </div>
    ${fa?`
      <div class="persona-card__qr">
        ${Or(e.npub,3)}
        <span class="persona-card__qr-label">${O(ga(e.npub))}</span>
      </div>
    `:``}
  `}function Ra(){let{personas:e}=l(),t=[...He(e)].filter(({persona:e})=>!e.archived);if(t.length>0?Y&&t.some(({persona:e})=>e.id===Y)||(Y=t[0].persona.id):Y=null,!Y)return`
      <div class="id-detail" id="id-detail">
        <div class="id-detail__hint">Select a persona or account from the tree above</div>
      </div>
    `;let n=T(e,Y);if(!n)return`
      <div class="id-detail" id="id-detail">
        <div class="id-detail__hint">Select a persona or account from the tree above</div>
      </div>
    `;let{persona:i,ancestors:a}=n,o=Xe(i.name),s=O(i.name.slice(0,1).toUpperCase()),c=r(i),u=va(i);return`
    <div class="id-detail" id="id-detail" data-detail-persona-id="${O(i.id)}">
      <div class="id-detail__header">
        <span class="persona-card__badge" style="background-color:${o}">${s}</span>
        <div>
          <div style="font-weight:600;font-size:0.9375rem;color:var(--text-primary);">${O(i.name)}</div>
          ${i.displayName?`<div style="font-size:0.8125rem;color:var(--text-secondary);">${O(i.displayName)}</div>`:``}
        </div>
      </div>
      <div class="id-derive__hint"><strong>${O(c)}.</strong> ${O(u)}</div>
      ${Na([...a,i])}
      <div class="persona-card__npub">${O(i.npub)}</div>
      ${Pa(i)}
      ${Fa(i)}
      ${Ia(i)}
      ${La(i)}
    </div>
  `}function za(){return`
    <div class="id-create">
      <input class="input" type="text" id="id-new-name" placeholder="persona or account name" maxlength="32" autocomplete="off" style="flex: 1; min-width: 0;" />
      <select class="input" id="id-new-type" style="max-width: 10rem;">
        <option value="persona">Persona</option>
        <option value="account">Anonymous account</option>
      </select>
      <button class="btn btn--primary btn--sm" id="id-create-btn">+ Create</button>
    </div>
    <div class="id-derive__hint">Personas are reusable branches. Anonymous accounts are standalone exportable nsec identities, unlinkable by default.</div>
    <div class="id-create__error" id="id-create-error"></div>
  `}function Ba(){let{personas:e}=l(),t=[...He(e)].filter(({persona:e})=>e.archived).map(({persona:e})=>e);if(t.length===0)return``;let n=t.map(e=>`
      <div class="id-archived__row">
        <span class="id-archived__badge" style="background: var(--text-muted);">${O(e.name.slice(0,1).toUpperCase())}</span>
        <span class="id-archived__name">${O(e.name)}</span>
        <span class="id-archived__npub">${O(ga(e.npub))}</span>
        <button class="btn btn--sm" data-restore-persona="${O(e.id)}">Restore</button>
      </div>
    `).join(``);return`
    <hr class="id-divider" />
    <div>
      <button class="id-archived__toggle" id="id-archived-toggle">
        <span>${ua?`▼`:`▶`}</span>
        <span>Archived (${t.length})</span>
      </button>
      <div class="id-archived__list" id="id-archived-list" style="max-height: ${ua?`1000px`:`0`};">
        ${n}
      </div>
    </div>
  `}function Q(e){ma?.abort(),ma=new AbortController;let{signal:t}=ma;if(e.textContent=``,!document.getElementById(`id-hub-styles`)){let e=document.createElement(`style`);e.id=`id-hub-styles`,e.textContent=Oa,document.head.appendChild(e)}if(!Ve()){let t=document.createElement(`div`);t.className=`id-hub`,t.innerHTML=ka(),e.appendChild(t);return}let n=document.createElement(`div`);n.className=`id-hub`,n.innerHTML=[`<h1 class="id-hub__heading">Identities</h1>`,`<div class="id-hub__sub">Derived from your master key</div>`,Ma(),oa(Y),Ra(),za(),Ba()].join(``),e.appendChild(n),sa(e),document.addEventListener(`canary:select-persona`,(t=>{let{personaId:n}=t.detail;n!==Y&&(Y=n,X=!1,fa=!1,pa=!1,Q(e))}),{signal:t});let i=e.querySelector(`#id-backup-btn`),a=e.querySelector(`#id-mnemonic`),o=a?.nextElementSibling;function c(){a&&(da=!da,a.classList.toggle(`id-master__mnemonic--revealed`,da),o&&(o.textContent=da?`Click to hide`:`Click to reveal recovery phrase`))}i?.addEventListener(`click`,c,{signal:t}),a?.addEventListener(`click`,c,{signal:t}),e.querySelector(`#id-shamir-btn`)?.addEventListener(`click`,()=>{document.dispatchEvent(new CustomEvent(`canary:shamir-split`,{bubbles:!0}))},{signal:t}),e.querySelector(`#id-verify-proof-btn`)?.addEventListener(`click`,()=>{document.dispatchEvent(new CustomEvent(`canary:verify-proof`,{bubbles:!0}))},{signal:t}),e.querySelector(`#id-create-recovery-root`)?.addEventListener(`click`,()=>{document.dispatchEvent(new CustomEvent(`canary:open-recovery-root-modal`,{bubbles:!0}))},{signal:t}),e.querySelectorAll(`[data-derive-slot-name]`).forEach(n=>{n.addEventListener(`input`,()=>{let t=Number(n.dataset.deriveSlotName);Z[t]={...Z[t],name:n.value},ha=!1,Da(e)},{signal:t})}),e.querySelectorAll(`[data-derive-slot-index]`).forEach(n=>{n.addEventListener(`input`,()=>{let t=Number(n.dataset.deriveSlotIndex),r=n.value.trim(),i=r===``?0:Number(r);Z[t]={...Z[t],index:i},ha=!1,Da(e)},{signal:t})}),e.querySelector(`#id-derive-clear`)?.addEventListener(`click`,()=>{Ca([]),Q(e)},{signal:t}),e.querySelector(`#id-derive-use-selected`)?.addEventListener(`click`,()=>{let t=Sa();t&&(Ca(t),Q(e))},{signal:t}),e.querySelector(`#id-derive-copy-npub`)?.addEventListener(`click`,()=>{let e=Ta();!e||`error`in e||navigator.clipboard.writeText(e.npub).then(()=>{D(`npub copied`,`success`)}).catch(()=>{})},{signal:t}),e.querySelector(`#id-derive-copy-nsec`)?.addEventListener(`click`,()=>{let t=Ta();!t||`error`in t||(ha=!0,navigator.clipboard.writeText(t.nsec).then(()=>{D(`nsec copied`,`success`),Da(e)}).catch(()=>{Da(e)}))},{signal:t});let d=e.querySelector(`#id-detail`);if(d&&Y){let n=Y;d.addEventListener(`input`,e=>{if(!e.target.dataset.field)return;let{personas:t}=l(),r=T(t,n);if(!r)return;let i=d.querySelector(`#id-detail-publish`);i&&(i.hidden=!xa(r.persona,d))},{signal:t}),d.querySelector(`#id-detail-publish`)?.addEventListener(`click`,()=>{let{personas:e}=l(),t=T(e,n);if(!t)return;let r=d.querySelector(`[data-field="displayName"]`),i=d.querySelector(`[data-field="about"]`),a=d.querySelector(`[data-field="picture"]`);s({personas:Ha(e,n,{...t.persona,displayName:r?.value||void 0,about:i?.value||void 0,picture:a?.value||void 0})}),D(`Profile saved for "${t.persona.name}"`,`success`)},{signal:t}),d.querySelector(`#id-detail-customise-relays`)?.addEventListener(`click`,t=>{t.preventDefault(),pa=!0,Q(e)},{signal:t}),d.querySelector(`#id-detail-save-relays`)?.addEventListener(`click`,()=>{let e=d.querySelector(`[data-relay-field="read"]`),t=d.querySelector(`[data-relay-field="write"]`),r=(e?.value??``).split(`,`).map(e=>e.trim()).filter(Boolean),i=(t?.value??``).split(`,`).map(e=>e.trim()).filter(Boolean),{personas:a}=l(),o=T(a,n);o&&(s({personas:Ha(a,n,{...o.persona,readRelays:r,writeRelays:i})}),pa=!1,D(`Relays saved for "${o.persona.name}"`,`success`))},{signal:t}),d.addEventListener(`click`,t=>{let n=t.target.closest(`[data-navigate-group]`);if(n){let e=n.dataset.navigateGroup;s({view:`groups`,activeGroupId:e});return}let r=t.target.closest(`[data-unassign-group]`);if(r){t.stopPropagation();let e=r.dataset.unassignGroup,{groups:n}=l(),i=n[e];if(!i)return;u(e,{personaId:``}),D(`"${i.name}" unassigned`,`info`);return}if(X){let n=t.target.closest(`#id-detail-menu-panel`),r=t.target.closest(`#id-detail-menu-btn`);!n&&!r&&(X=!1,Q(e))}},{signal:t}),d.querySelector(`#id-detail-assign`)?.addEventListener(`change`,e=>{let t=e.target,r=t.value;if(!r)return;let{groups:i,personas:a}=l(),o=i[r];if(!o)return;u(r,{personaId:n});let s=T(a,n);D(`"${o.name}" assigned to ${s?.persona.name??n}`,`success`),t.value=``},{signal:t}),d.querySelector(`#id-detail-export`)?.addEventListener(`click`,()=>{let{personas:t}=l();T(t,n)&&e.dispatchEvent(new CustomEvent(`canary:export-persona`,{bubbles:!0,detail:{personaId:n}}))},{signal:t}),d.querySelector(`#id-detail-menu-btn`)?.addEventListener(`click`,()=>{X=!X,Q(e)},{signal:t}),d.querySelector(`#id-detail-copy-npub`)?.addEventListener(`click`,()=>{let{personas:t}=l(),r=T(t,n);r&&(navigator.clipboard.writeText(r.persona.npub).then(()=>{D(`npub copied`,`success`)}).catch(()=>{}),X=!1,Q(e))},{signal:t}),d.querySelector(`#id-detail-show-qr`)?.addEventListener(`click`,()=>{fa=!fa,X=!1,Q(e)},{signal:t}),d.querySelector(`#id-detail-rotate`)?.addEventListener(`click`,()=>{let{personas:t}=l();T(t,n)&&(X=!1,e.dispatchEvent(new CustomEvent(`canary:rotate-persona`,{bubbles:!0,detail:{personaId:n}})))},{signal:t}),d.querySelector(`#id-detail-prove`)?.addEventListener(`click`,()=>{let{personas:t}=l();T(t,n)&&(X=!1,e.dispatchEvent(new CustomEvent(`canary:prove-ownership`,{bubbles:!0,detail:{personaId:n}})))},{signal:t}),d.querySelector(`#id-detail-archive`)?.addEventListener(`click`,()=>{let{personas:t}=l();T(t,n)&&(X=!1,e.dispatchEvent(new CustomEvent(`canary:archive-persona`,{bubbles:!0,detail:{personaId:n}})))},{signal:t})}e.querySelector(`.id-master`)?.addEventListener(`click`,e=>{let t=e.target.closest(`[data-navigate-group]`);if(t){let e=t.dataset.navigateGroup;s({view:`groups`,activeGroupId:e})}},{signal:t});let f=e.querySelector(`#id-new-name`),p=e.querySelector(`#id-new-type`),m=e.querySelector(`#id-create-btn`),h=e.querySelector(`#id-create-error`);function g(){if(!f||!h)return;let e=f.value.trim();if(!_a(e)){h.textContent=`Lowercase, no spaces, max 32 characters.`;return}let{personas:t}=l();if(Object.values(t).some(t=>t.name===e)){h.textContent=`That name is already taken.`;return}try{let n=Re(e,p?.value===`account`?`account`:`persona`);s({personas:{...t,[n.id]:n}}),f.value=``,p&&(p.value=`persona`),h.textContent=``,Y=n.id,X=!1,fa=!1,pa=!1,D(`${r(n)} "${n.name}" created`,`success`)}catch(e){h.textContent=e instanceof Error?e.message:`Failed to create item.`}}m?.addEventListener(`click`,g,{signal:t}),f?.addEventListener(`keydown`,e=>{e.key===`Enter`&&g()},{signal:t});let _=e.querySelector(`#id-archived-toggle`),v=e.querySelector(`#id-archived-list`);_&&v&&_.addEventListener(`click`,()=>{ua=!ua,v.style.maxHeight=ua?v.scrollHeight+`px`:`0`;let e=_.querySelector(`span`);e&&(e.textContent=ua?`▼`:`▶`)},{signal:t}),e.addEventListener(`click`,e=>{let t=e.target.closest(`[data-restore-persona]`);if(!t)return;let n=t.dataset.restorePersona,{personas:r}=l();T(r,n)&&s({personas:Va(r,n,!1)})},{signal:t})}function Va(e,t,n){let r={};for(let[i,a]of Object.entries(e))i===t?r[i]={...a,archived:n}:a.children&&Object.keys(a.children).length>0?r[i]={...a,children:Va(a.children,t,n)}:r[i]=a;return r}function Ha(e,t,n){let r={};for(let[i,a]of Object.entries(e))i===t?r[i]=n:a.children&&Object.keys(a.children).length>0?r[i]={...a,children:Ha(a.children,t,n)}:r[i]=a;return r}var Ua=null;function Wa(e,t){let n=l().groups[t];if(!n)return e.slice(0,8);let{identity:r}=l();return r?.pubkey===e?`You`:n.memberNames?.[e]||`${e.slice(0,8)}\u2026${e.slice(-4)}`}function Ga(e,t){Ua&&=(Ua(),null),document.querySelector(`.call-verify`)?.remove();let{groups:n,identity:r}=l(),i=n[e];if(!i||!r)return;let a=r.pubkey,o=Wa(t,e),s=tt(t),c=a<t?[a,t]:[t,a],u=Ui({secret:i.seed,namespace:`canary:call`,roles:c,myRole:a,preset:`call`}),d=Hi.call.rotationSeconds,f=Math.floor(Date.now()/1e3),p=u.myToken(f),m=u.theirToken(f),h=document.createElement(`div`);h.className=`call-verify`,h.innerHTML=`
    <div class="call-verify__content">
      ${s?.picture?`<img class="call-verify__avatar" src="${O(s.picture)}" alt="" />`:``}
      <h2 class="call-verify__title">Call with ${O(o)}</h2>
      <p class="call-verify__instruction">Speak your word. Listen for theirs. If it matches, the call is verified.</p>

      <div class="call-verify__section call-verify__section--say">
        <span class="call-verify__label">Say this:</span>
        <span class="call-verify__word call-verify__word--mine" id="cv-word-mine">${O(p)}</span>
      </div>

      <div class="call-verify__divider"></div>

      <div class="call-verify__section call-verify__section--hear">
        <span class="call-verify__label">They should say:</span>
        <span class="call-verify__word call-verify__word--theirs" id="cv-word-theirs">${O(m)}</span>
      </div>

      <p class="call-verify__timer">Words change in <span id="cv-countdown">${d}</span>s</p>

      <p class="call-verify__instruction" style="margin-top: 1.5rem; font-size: 0.75rem;">In a real call, if they say the wrong word, it could be an emergency signal. A production app would automatically check and silently alert the group.</p>
      <div class="call-verify__actions">
        <button class="btn btn--primary call-verify__btn" id="cv-match">Match</button>
        <button class="btn call-verify__btn call-verify__btn--danger" id="cv-mismatch">Wrong Word</button>
        <button class="btn call-verify__btn" id="cv-close">Close</button>
      </div>
    </div>
  `;let g=null;function _(){let e=Math.floor(Date.now()/1e3),t=h.querySelector(`#cv-word-mine`),n=h.querySelector(`#cv-word-theirs`),r=h.querySelector(`#cv-countdown`);if(t&&(t.textContent=u.myToken(e)),n&&(n.textContent=u.theirToken(e)),r){let t=e%d;r.textContent=String(d-t)}}g=setInterval(_,1e3);function v(){g!==null&&(clearInterval(g),g=null)}function y(){Ua&&=(Ua(),null),h.classList.remove(`call-verify--visible`),setTimeout(()=>h.remove(),300)}function b(e){e.key===`Escape`&&y()}Ua=()=>{v(),document.removeEventListener(`keydown`,b)},document.body.appendChild(h),requestAnimationFrame(()=>h.classList.add(`call-verify--visible`)),document.addEventListener(`keydown`,b),h.querySelector(`#cv-match`)?.addEventListener(`click`,()=>{v(),h.innerHTML=`
      <div class="call-verify__content">
        <h2 class="call-verify__title" style="color: var(--clr-success, #27ae60);">Call Verified</h2>
        <p class="call-verify__warning" style="color: var(--text-secondary);">${O(o)} is who they say they are. The call is authenticated.</p>
        <div class="call-verify__actions">
          <button class="btn btn--primary call-verify__btn" id="cv-dismiss-ok">Done</button>
        </div>
      </div>
    `,h.querySelector(`#cv-dismiss-ok`)?.addEventListener(`click`,y)}),h.querySelector(`#cv-close`)?.addEventListener(`click`,y),h.querySelector(`#cv-mismatch`)?.addEventListener(`click`,()=>{v(),h.innerHTML=`
      <div class="call-verify__content">
        <h2 class="call-verify__title" style="color: var(--clr-danger, #e74c3c);">Verification Failed</h2>
        <p class="call-verify__warning">The word didn't match. This person may not be who they claim to be.</p>
        <div class="call-verify__actions">
          <button class="btn call-verify__btn" id="cv-dismiss-fail">Dismiss</button>
        </div>
      </div>
    `,h.querySelector(`#cv-dismiss-fail`)?.addEventListener(`click`,y)})}var Ka=ut({VAULT_D_TAG:()=>Ja,VAULT_KIND:()=>qa,buildVaultEvent:()=>to,decryptVault:()=>eo,deserialiseVault:()=>Qa,encryptVault:()=>$a,fetchVault:()=>ro,fetchVaultNip07:()=>oo,mergeVaultGroups:()=>fo,publishVault:()=>no,publishVaultNip07:()=>ao,serialiseVault:()=>Za,subscribeToVault:()=>lo,unsubscribeFromVault:()=>uo}),qa=30078,Ja=`canary:vault`,Ya=2160*60*60;function Xa(e){let t=new Uint8Array(e.length/2);for(let n=0;n<e.length;n+=2)t[n/2]=parseInt(e.slice(n,n+2),16);return t}function Za(e,t={},n=[]){let r={};for(let[t,n]of Object.entries(e)){let{lastPositions:e,...i}=n;r[t]={...i,livenessCheckins:{}}}let i={version:3,groups:r,personas:t,deletedGroupIds:n};return JSON.stringify(i)}function Qa(e){try{let t=JSON.parse(e);if(!t||typeof t!=`object`||typeof t.groups!=`object`||t.groups===null)return{groups:{},personas:{},deletedGroupIds:[]};if(t.version===3)return{groups:t.groups,personas:t.personas&&typeof t.personas==`object`&&!Array.isArray(t.personas)?t.personas:{},deletedGroupIds:Array.isArray(t.deletedGroupIds)?t.deletedGroupIds:[]};console.info(`[canary:vault] Migrating vault from version`,t.version??1,`to v3`);let n=t.groups;for(let e of Object.values(n))!e.personaName&&!e.personaId&&(e.personaName=`personal`);let r=Array.isArray(t.personas)?t.personas:[],i={},a={};for(let e of r){let t=Ue();a[e.name]=t,i[t]={...e,id:t,children:{}}}for(let e of Object.values(n)){let t=e.personaName??`personal`;if(!a[t]){let e=Ue();a[t]=e,i[e]={name:t,id:e,index:0,npub:``,children:{}}}e.personaId||(e.personaId=a[t],delete e.personaName)}return{groups:n,personas:i,deletedGroupIds:Array.isArray(t.deletedGroupIds)?t.deletedGroupIds:[]}}catch{return{groups:{},personas:{},deletedGroupIds:[]}}}function $a(e,t,n){return fe(e,C(Xa(t),n))}function eo(e,t,n){try{return pe(e,C(Xa(t),n))}catch{return null}}function to(e,t){let n=Xa(t),r=Math.floor(Date.now()/1e3);return de({kind:qa,created_at:r,tags:[[`d`,Ja],[`expiration`,String(r+Ya)]],content:e},n)}async function no(e,t,n,r={},i=[]){let a=E();if(!a)throw Error(`No relay pool — connect first`);let o=qe();if(o.length===0)throw Error(`No write relays configured`);let s=to($a(Za(e,r,i),t,n),t);console.info(`[canary:vault] Publishing vault (${Object.keys(e).length} groups) to`,o),document.dispatchEvent(new CustomEvent(`canary:vault-syncing`));let c=await Promise.allSettled(a.publish(o,s)),l=c.filter(e=>e.status===`fulfilled`).length,u=c.filter(e=>e.status===`rejected`).length;console.info(`[canary:vault] Publish results: ${l} OK, ${u} failed`),u>0&&c.forEach((e,t)=>{e.status===`rejected`&&console.warn(`[canary:vault] Relay ${o[t]} rejected:`,e.reason)}),document.dispatchEvent(new CustomEvent(`canary:vault-synced`,{detail:{timestamp:Math.floor(Date.now()/1e3)}}))}async function ro(e,t){let n=E();if(!n)return console.warn(`[canary:vault] fetchVault: no pool`),null;let r=Ge();return r.length===0?(console.warn(`[canary:vault] fetchVault: no read relays`),null):(console.info(`[canary:vault] Fetching vault from`,r,`for`,t.slice(0,8)),new Promise(i=>{let a=!1,o=null,s=setTimeout(()=>{if(!a){if(a=!0,c.close(),console.warn(`[canary:vault] fetchVault timed out after 10s`),o){let n=eo(o.content,e,t);if(n){let e=Qa(n);if(Object.keys(e.groups).length>0){i(e);return}}}i(null)}},1e4),c=n.subscribeMany(r,{kinds:[qa],authors:[t],"#d":[Ja],limit:1},{onevent(e){le(e)&&(typeof e.content==`string`&&e.content.length>262144||(console.info(`[canary:vault] Received vault event created_at=${e.created_at}`),(!o||e.created_at>o.created_at)&&(o=e)))},oneose(){if(!a){if(a=!0,clearTimeout(s),c.close(),o){console.info(`[canary:vault] EOSE — decrypting vault event`);let n=eo(o.content,e,t);if(n){let e=Qa(n);if(Object.keys(e.groups).length>0){i(e);return}}console.warn(`[canary:vault] Vault decryption failed`)}else console.info(`[canary:vault] EOSE — no vault event found`);i(null)}}})}))}function io(){return!!window.nostr?.nip44?.encrypt&&!!window.nostr?.nip44?.decrypt}async function ao(e,t,n={},r=[]){let i=E();if(!i)throw Error(`No relay pool — connect first`);if(!io())throw Error(`NIP-07 extension does not support NIP-44`);let a=qe();if(a.length===0)throw Error(`No write relays configured`);let o=Za(e,n,r),s=await window.nostr.nip44.encrypt(t,o),c=Math.floor(Date.now()/1e3),l={kind:qa,created_at:c,tags:[[`d`,Ja],[`expiration`,String(c+Ya)]],content:s},u=await window.nostr.signEvent(l);console.info(`[canary:vault] Publishing vault via NIP-07 (${Object.keys(e).length} groups) to`,a),document.dispatchEvent(new CustomEvent(`canary:vault-syncing`));let d=await Promise.allSettled(i.publish(a,u)),f=d.filter(e=>e.status===`fulfilled`).length,p=d.filter(e=>e.status===`rejected`).length;console.info(`[canary:vault] NIP-07 publish results: ${f} OK, ${p} failed`),document.dispatchEvent(new CustomEvent(`canary:vault-synced`,{detail:{timestamp:c}}))}async function oo(e){let t=E();if(!t)return console.warn(`[canary:vault] fetchVaultNip07: no pool`),null;if(!io())return console.warn(`[canary:vault] fetchVaultNip07: extension lacks NIP-44`),null;let n=Ge();return n.length===0?(console.warn(`[canary:vault] fetchVaultNip07: no read relays`),null):(console.info(`[canary:vault] Fetching vault via NIP-07 from`,n,`for`,e.slice(0,8)),new Promise(r=>{let i=!1,a=null,o=setTimeout(async()=>{if(!i){if(i=!0,s.close(),console.warn(`[canary:vault] fetchVaultNip07 timed out after 10s`),a)try{let t=Qa(await window.nostr.nip44.decrypt(e,a.content));if(Object.keys(t.groups).length>0){r(t);return}}catch{}r(null)}},1e4),s=t.subscribeMany(n,{kinds:[qa],authors:[e],"#d":[Ja],limit:1},{onevent(e){le(e)&&(typeof e.content==`string`&&e.content.length>262144||(console.info(`[canary:vault] NIP-07 received vault event created_at=${e.created_at}`),(!a||e.created_at>a.created_at)&&(a=e)))},async oneose(){if(!i){if(i=!0,clearTimeout(o),s.close(),a){console.info(`[canary:vault] NIP-07 EOSE — decrypting vault event`);try{let t=Qa(await window.nostr.nip44.decrypt(e,a.content));if(Object.keys(t.groups).length>0){r(t);return}}catch(e){console.warn(`[canary:vault] NIP-07 vault decryption failed:`,e)}}else console.info(`[canary:vault] NIP-07 EOSE — no vault event found`);r(null)}}})}))}var so=null,co=0;function lo(e,t,n){uo();let r=E();if(!r)return;let i=Ge();if(i.length===0)return;co=Math.floor(Date.now()/1e3),console.info(`[canary:vault] Subscribing to live vault updates for`,e.slice(0,8));let a=r.subscribeMany(i,{kinds:[qa],authors:[e],"#d":[Ja],since:co},{async onevent(e){if(le(e)&&!(e.created_at<=co)&&!(typeof e.content==`string`&&e.content.length>262144)){console.info(`[canary:vault] Live vault update received created_at=${e.created_at}`),co=e.created_at;try{let r=await t(e.content);if(!r)return;let{groups:i,personas:a}=Qa(r);if(Object.keys(i).length===0)return;n(i,Object.keys(i).length,a)}catch(e){console.warn(`[canary:vault] Live vault decrypt failed:`,e)}}},oneose(){console.info(`[canary:vault] Live vault subscription EOSE — watching for updates`)}});so=()=>a.close()}function uo(){so?.(),so=null}function fo(e,t,n=[]){let r={...e},i=new Set(n);for(let[n,a]of Object.entries(t)){if(i.has(n))continue;let t=e[n];if(!t){r[n]=a;continue}let o=t.epoch??0,s=a.epoch??0;if(s>o)r[n]=a;else if(s===o){let e=t.counter??0;(a.counter??0)>e&&(r[n]=a)}}return r}function po(e){if(e.startsWith(`wss://`))return!0;if(e.startsWith(`ws://`))try{let t=new URL(e);return t.hostname===`localhost`||t.hostname===`127.0.0.1`||t.hostname===`[::1]`}catch{return!1}return!1}function mo(e,t){return t?.pubkey===e.pubkey&&t.mnemonic?{...e,mnemonic:t.mnemonic}:e}function ho(e,t){return e?typeof t.epoch==`number`&&t.epoch<e.epoch?`This invite is older than the group state already stored on this device.`:typeof t.latestInviteIssuedAt==`number`&&e.latestInviteIssuedAt>0&&t.latestInviteIssuedAt<e.latestInviteIssuedAt?`A newer invite has already been accepted for this group on this device.`:typeof t.epoch==`number`&&t.epoch===e.epoch&&typeof t.counter==`number`&&t.counter<e.counter?`This invite would roll the group back to an older counter.`:null:null}se(),h().theme===`light`?document.documentElement.setAttribute(`data-theme`,`light`):document.documentElement.removeAttribute(`data-theme`);var $=null;function go(){$!==null&&(clearTimeout($),$=null);let{settings:e}=l();!e.pinEnabled||e.autoLockMinutes<=0||!ae()||($=setTimeout(async()=>{await p(),Ie(),ee(),d(),yo()},e.autoLockMinutes*60*1e3))}function _o(){document.addEventListener(`pointerdown`,go,{passive:!0}),document.addEventListener(`keydown`,go,{passive:!0}),go()}function vo(){document.removeEventListener(`pointerdown`,go),document.removeEventListener(`keydown`,go),$!==null&&(clearTimeout($),$=null)}function yo(){vo(),g();let e=document.getElementById(`app`);e.innerHTML=`
    <div class="lock-screen">
      <h1 class="lock-screen__brand">CANARY</h1>
      <p class="lock-screen__hint">Enter your PIN to unlock</p>
      <input
        type="password"
        class="input lock-screen__input"
        id="pin-input"
        inputmode="numeric"
        maxlength="8"
        autofocus
        autocomplete="off"
        placeholder="••••••"
      >
      <p class="lock-screen__error" id="pin-error" hidden>Incorrect PIN. Try again.</p>
      <button class="btn btn--primary lock-screen__btn" id="pin-submit">Unlock</button>
    </div>
  `;let t=document.getElementById(`pin-input`),n=document.getElementById(`pin-error`),r=document.getElementById(`pin-submit`),i=0,a=[0,1e3,2e3,5e3,15e3,3e4];async function o(){let e=t.value.trim();if(e.length<6){n.textContent=`PIN must be at least 6 digits.`,n.hidden=!1,t.focus();return}r.disabled=!0,r.textContent=`Unlocking…`,n.hidden=!0;try{await f(e),await Mo();{let{identity:e,personas:t}=l();e?.privkey&&(Object.keys(t).length>0?Le(e,t):Fe(e))}bo();let t=document.getElementById(`header`);t&&ie(t),xo(),wo(),c(Co),_o(),jo(),Eo(),window.addEventListener(`hashchange`,()=>Eo()),Po(),nt().catch(()=>{})}catch{i++;let e=a[Math.min(i,a.length-1)];n.textContent=e>0?`Incorrect PIN. Wait ${e/1e3}s before retrying.`:`Incorrect PIN. Try again.`,n.hidden=!1,t.value=``,r.disabled=!0,r.textContent=`Unlock`,e>0?setTimeout(()=>{r.disabled=!1,t.focus()},e):(r.disabled=!1,t.focus())}}r.addEventListener(`click`,()=>{o()}),t.addEventListener(`keydown`,e=>{e.key===`Enter`&&o()}),requestAnimationFrame(()=>t.focus())}function bo(){let e=document.getElementById(`app`);if(!e)throw Error(`Missing #app mount point`);e.innerHTML=`
    <header class="header" id="header"></header>

    <div class="sidebar-overlay" id="sidebar-overlay"></div>

    <div class="layout" id="groups-view">
      <aside class="sidebar" id="sidebar"></aside>

      <main class="content" id="content">
        <div id="welcome-container"></div>
        <div id="hero-container"></div>
        <div id="duress-alert-banner" hidden></div>
        <div id="members-container"></div>
        <div id="verify-container"></div>
        <div id="beacon-container"></div>
        <div id="liveness-container"></div>
        <div id="settings-container"></div>
      </main>
    </div>

    <div id="call-demo-view" hidden>
      <main class="content" style="max-width: 100%;">
        <div id="call-simulation-container"></div>
      </main>
    </div>

    <div id="identities-view" style="display:none"></div>

    <footer class="app-footer" id="app-footer">
      <button class="app-footer__sync" id="footer-sync-btn">Sync Groups</button>
      <span class="app-footer__sep">&middot;</span>
      <span class="app-footer__version">CANARY v2.6.2</span>
    </footer>
  `}function xo(){let e=document.getElementById(`hamburger`),t=document.getElementById(`sidebar`),n=document.getElementById(`sidebar-overlay`);if(!e||!t||!n)return;function r(){t.classList.add(`sidebar--open`),n.classList.add(`sidebar-overlay--visible`),e.setAttribute(`aria-expanded`,`true`)}function i(){t.classList.remove(`sidebar--open`),n.classList.remove(`sidebar-overlay--visible`),e.setAttribute(`aria-expanded`,`false`)}e.setAttribute(`aria-expanded`,`false`),e.addEventListener(`click`,()=>{t.classList.contains(`sidebar--open`)?i():r()}),n.addEventListener(`click`,()=>{i()}),t.addEventListener(`click`,e=>{e.target.closest(`[data-group-id]`)&&i()})}var So=!1;function Co(){So||(So=!0,requestAnimationFrame(()=>{So=!1,wo()}))}function wo(){let{view:t}=l(),n=document.getElementById(`groups-view`),r=document.getElementById(`call-demo-view`),i=document.getElementById(`identities-view`);n&&(n.hidden=t!==`groups`),r&&(r.hidden=t!==`call-demo`),i&&(i.style.display=t===`identities`?``:`none`);let a=document.getElementById(`header`);if(a&&ie(a),t===`groups`){ta();let t=document.getElementById(`welcome-container`);t&&Wt(t);let n=document.getElementById(`sidebar`);n&&gt(n);let r=document.getElementById(`hero-container`);r&&sn(r);let i=document.getElementById(`verify-container`);i&&bn(i);let a=document.getElementById(`members-container`);a&&Wr(a);let o=l().groups[l().activeGroupId??``],s=o?e(o)===`online`:!1,c=document.getElementById(`beacon-container`);c&&(s?(c.hidden=!1,_i(c)):(Oi(),c.hidden=!0,c.innerHTML=``));let u=document.getElementById(`liveness-container`);u&&(s?(u.hidden=!1,Ni(u)):(u.hidden=!0,u.innerHTML=``));let d=document.getElementById(`settings-container`);d&&Ii(d)}else if(t===`call-demo`){let e=document.getElementById(`call-simulation-container`);e&&ea(e)}else if(t===`identities`){ta();let e=document.getElementById(`identities-view`);e&&Q(e)}}function To(){let{identity:t,personas:n,activePersonaId:r}=l(),a=t?.displayName&&t.displayName!==`You`?t.displayName:``,o=Object.values(n),s=o.length>0?o.map(e=>{let t=e.id===r?` selected`:``;return`<option value="${O(e.id)}"${t}>${O(e.name)}</option>`}).join(``):`<option value="">—</option>`;vt(`
    <h2 class="modal__title">New Group</h2>
    <label class="input-label">
      <span>What's your group called?</span>
      <input
        class="input"
        type="text"
        name="name"
        placeholder="e.g. Family, Field Team"
        required
        autofocus
      />
    </label>
    ${a?``:`
    <label class="input-label">
      <span>Your name</span>
      <input
        class="input"
        type="text"
        name="myname"
        placeholder="e.g. Alice"
      />
    </label>
    `}
    <label class="input-label" style="margin-top: 0.5rem;">
      <span>Persona</span>
      <select class="input" name="persona">${s}</select>
    </label>
    <fieldset class="segmented" style="margin-top: 0.5rem;">
      <legend class="input-label__text" style="margin-bottom: 0.25rem;">Preset</legend>
      <button type="button" class="segmented__btn segmented__btn--active" data-preset="family">Family</button>
      <button type="button" class="segmented__btn" data-preset="field-ops">Field Ops</button>
      <button type="button" class="segmented__btn" data-preset="enterprise">Enterprise</button>
      <button type="button" class="segmented__btn" data-preset="event">Event</button>
    </fieldset>
    <div class="modal__actions">
      <button type="button" class="btn" id="modal-cancel-btn">Cancel</button>
      <button type="submit" class="btn btn--primary">Create</button>
    </div>
  `,n=>{let r=n.get(`name`)?.trim()??``;if(!r)return;let o=a||n.get(`myname`)?.trim()||``,s=n.get(`persona`)?.trim()||``,c=Ft(r,document.querySelector(`.segmented__btn.segmented__btn--active[data-preset]`)?.dataset.preset??`family`,t?.pubkey,s);if(o&&t?.pubkey){let e=l().groups[c];e&&u(c,{memberNames:{...e.memberNames,[t.pubkey]:o}})}let d=l().groups[c];d&&e(d)===`online`&&i(d).length>0&&m(d.readRelays??[],d.writeRelays??[],c),Wo(),S(async()=>{let{shouldPromptForNotifications:e,shouldPromptAddToHomeScreen:t,isMacSafari:n,subscribeToPush:r,registerWithPushServer:i}=await import(`./push-BNk3z_NM.js`);return{shouldPromptForNotifications:e,shouldPromptAddToHomeScreen:t,isMacSafari:n,subscribeToPush:r,registerWithPushServer:i}},[],import.meta.url).then(({shouldPromptForNotifications:e,shouldPromptAddToHomeScreen:t,isMacSafari:n,subscribeToPush:r,registerWithPushServer:i})=>{if(t()){setTimeout(()=>{Bo()},1500);return}if(n()&&!(`Notification`in window)){console.info(`[canary:push] Mac Safari without notification support — skipping prompt`);return}e()&&setTimeout(()=>{zo(async()=>{try{let e=await r();if(!e){console.warn(`[canary:push] subscribeToPush returned null — permission denied or unavailable`);return}let{hashGroupTag:t}=await S(async()=>{let{hashGroupTag:e}=await import(`./sync-CTwt-KD4.js`);return{hashGroupTag:e}},__vite__mapDeps([3,4,5,6,7,8]),import.meta.url),{groups:n}=l(),a=Object.values(n).map(e=>({tagHash:t(e.id),livenessInterval:e.livenessInterval}));await i(e,a),console.info(`[canary:push] Registered with push server, groups:`,a.length),D(`Notifications enabled`,`success`)}catch(e){console.error(`[canary:push] Registration failed:`,e),D(`Failed to enable notifications`,`error`)}})},1500)}).catch(e=>console.error(`[canary:push] Import failed:`,e))}),requestAnimationFrame(()=>{document.getElementById(`modal-cancel-btn`)?.addEventListener(`click`,()=>{document.getElementById(`app-modal`)?.close()}),document.querySelectorAll(`.segmented__btn[data-preset]`).forEach(e=>{e.addEventListener(`click`,()=>{document.querySelectorAll(`.segmented__btn[data-preset]`).forEach(e=>e.classList.remove(`segmented__btn--active`)),e.classList.add(`segmented__btn--active`)})})})}function Eo(){let e=window.location.hash;if(e.startsWith(`#ack/`)){let t;try{t=decodeURIComponent(e.slice(5))}catch{console.warn(`[canary] Malformed ack fragment — ignoring.`),window.location.hash=``;return}window.location.hash=``,document.dispatchEvent(new CustomEvent(`canary:confirm-member`,{detail:{token:t}}))}else if(e.startsWith(`#inv/`)){let t=e.slice(5);window.location.hash=``,Do(t)}else if(e.startsWith(`#j/`)){let t=e.slice(3);window.location.hash=``,/^[0-9a-f]{32}$/.test(t)?ko(t):D(`Invalid invite link.`,`error`)}else if(e.startsWith(`#remote/`)){let t=e.slice(8);try{t=decodeURIComponent(t)}catch{}window.location.hash=``,Ao(t)}}function Do(e){try{let t=mr(En(e)),{identity:r}=l();if(!r?.pubkey){D(`No local identity — create or import one first.`,`error`);return}let i=document.getElementById(`binary-join-modal`);i||(i=document.createElement(`dialog`),i.id=`binary-join-modal`,i.className=`modal`,document.body.appendChild(i),i.addEventListener(`click`,e=>{e.target===i&&i.close()}));let a=i;a.innerHTML=`
      <div class="modal__form invite-share">
        <h2 class="modal__title">Join ${O(t.groupName)}</h2>
        <p class="invite-hint">Invited by <code>${O(t.inviterPubkey.slice(0,8))}\u2026</code></p>
        <p class="invite-hint">Ask the admin to read you the 3 confirmation words.</p>

        <label class="input-label">Confirmation words
          <input class="input" id="binary-join-confirm" type="text" placeholder="e.g. apple river castle" autocomplete="off">
        </label>
        <p class="invite-hint" id="binary-join-error" style="color: var(--duress); display: none;"></p>

        <div class="modal__actions" style="gap: 0.5rem;">
          <button class="btn" id="binary-join-cancel" type="button">Cancel</button>
          <button class="btn btn--primary" id="binary-join-accept" type="button">Join</button>
        </div>
      </div>
    `,a.querySelector(`#binary-join-cancel`)?.addEventListener(`click`,()=>a.close()),a.querySelector(`#binary-join-accept`)?.addEventListener(`click`,()=>{let e=a.querySelector(`#binary-join-confirm`),i=a.querySelector(`#binary-join-error`),c=e?.value.trim()??``;if(!c){i&&(i.textContent=`Please enter the confirmation words.`,i.style.display=``);return}try{let e=Jn(xn(t),c);if(Yn(e.groupId,e.nonce))throw Error(`This invite has already been used.`);let i=e.groupId,{groups:u}=l(),d=ho(u[i],{epoch:e.epoch,counter:e.counter,latestInviteIssuedAt:e.issuedAt});if(d)throw Error(d);let f=new Set(e.members);f.add(r.pubkey);let h=l().settings,g=e.relays.length>0?e.relays:h.defaultWriteRelays?.length?[...h.defaultWriteRelays]:[o],_=Array.from(new Set([...h.defaultReadRelays?.length?h.defaultReadRelays:n,...g])),v=g.length>0,y={id:i,name:e.groupName,seed:e.seed,members:Array.from(f),memberNames:e.memberNames??{},nostrEnabled:v,relays:e.relays,readRelays:_,writeRelays:g,wordlist:e.wordlist,wordCount:e.wordCount,counter:e.counter,usageOffset:e.usageOffset,rotationInterval:e.rotationInterval,encodingFormat:e.encodingFormat,usedInvites:[e.nonce],latestInviteIssuedAt:e.issuedAt,beaconInterval:e.beaconInterval,beaconPrecision:e.beaconPrecision,duressMode:`immediate`,livenessInterval:e.rotationInterval,livenessCheckins:{},tolerance:e.tolerance,personaId:l().activePersonaId??``,createdAt:Math.floor(Date.now()/1e3),admins:[...e.admins],epoch:e.epoch,consumedOps:[]};s({groups:{...u,[i]:y},activeGroupId:i}),Xn(i,e.nonce),p(),Wo(),v&&r&&m(_,g,i).then(()=>{b(i,{type:`member-join`,pubkey:r.pubkey,displayName:r.displayName&&r.displayName!==`You`?r.displayName:void 0,timestamp:Math.floor(Date.now()/1e3),epoch:e.epoch,opId:crypto.randomUUID()})}),a.close(),D(`Joined ${e.groupName}`,`success`)}catch(e){i&&(i.textContent=e instanceof Error?e.message:`Failed to join group.`,i.style.display=``)}}),a.showModal()}catch(e){D(e instanceof Error?e.message:`Invalid QR invite.`,`error`)}}function Oo(e,t,r){let{identity:i}=l();if(!i?.pubkey||!i?.privkey)return;let a=Pn({envelope:e,joinerPrivkey:i.privkey,adminPubkey:t.adminPubkey,expectedInviteId:t.inviteId}),c=a.groupId,{groups:u}=l(),d=ho(u[c],{epoch:a.epoch,counter:a.counter});if(d)throw Error(d);let f=new Set(a.members);f.add(i.pubkey);let h={...a.memberNames??{}};i.displayName&&i.displayName!==`You`&&(h[i.pubkey]=i.displayName);let g=[...a.relays??[]],_=g.length>0?g:[o],v=Array.from(new Set([...n,..._])),y=_.length>0,ee={id:c,name:a.groupName,seed:a.seed,members:Array.from(f),memberNames:h,nostrEnabled:y,relays:g,readRelays:v,writeRelays:_,wordlist:a.wordlist,wordCount:a.wordCount,counter:a.counter,usageOffset:a.usageOffset,rotationInterval:a.rotationInterval,encodingFormat:a.encodingFormat,usedInvites:[],latestInviteIssuedAt:0,beaconInterval:a.beaconInterval,beaconPrecision:a.beaconPrecision,duressMode:`immediate`,livenessInterval:a.rotationInterval,livenessCheckins:{},tolerance:a.tolerance,personaId:l().activePersonaId??``,createdAt:Math.floor(Date.now()/1e3),admins:[...a.admins],epoch:a.epoch,consumedOps:[]};s({groups:{...u,[c]:ee},activeGroupId:c}),p(),Wo(),y&&i&&m(v,_,c).then(()=>{b(c,{type:`member-join`,pubkey:i.pubkey,displayName:i.displayName&&i.displayName!==`You`?i.displayName:void 0,timestamp:Math.floor(Date.now()/1e3),epoch:a.epoch,opId:crypto.randomUUID()})}),r.close(),D(`Joined ${a.groupName}`,`success`)}function ko(e){let{identity:t,settings:r}=l();if(!t?.pubkey||!t?.privkey){D(`No local identity — create or import one first.`,`error`);return}let i=Array.from(new Set([...n,...r.defaultWriteRelays??[]])),a=r.defaultWriteRelays??[`wss://relay.trotters.cc`],o=document.getElementById(`relay-join-modal`);o||(o=document.createElement(`dialog`),o.id=`relay-join-modal`,o.className=`modal`,document.body.appendChild(o),o.addEventListener(`click`,e=>{e.target===o&&o.close()}));let s=o;s.innerHTML=`
    <div class="modal__form invite-share">
      <h2 class="modal__title">Joining...</h2>
      <p class="invite-hint" id="relay-join-status">Looking for invite on relay...</p>
      <div class="modal__actions">
        <button class="btn" id="relay-join-cancel" type="button">Cancel</button>
      </div>
    </div>
  `;let c=()=>{},u=()=>{};s.querySelector(`#relay-join-cancel`)?.addEventListener(`click`,()=>{c(),u(),s.close()}),s.showModal(),m(i,a).then(()=>{c=Fr({inviteId:e,readRelays:i,onToken(e){try{Mn(e)}catch(e){let t=s.querySelector(`#relay-join-status`);t&&(t.textContent=e instanceof Error?e.message:`Invalid invite token.`,t.style.color=`var(--duress)`);return}let t=e.relays?.length?e.relays:a,r=t,i=Array.from(new Set([...n,...t])),o=s.querySelector(`#relay-join-status`);o&&(o.textContent=`Joining ${e.groupName}...`),m(i,r).then(()=>{u=Ar({inviteId:e.inviteId,adminPubkey:e.adminPubkey,readRelays:i,writeRelays:r,onWelcome(t){try{Oo(t,e,s)}catch{o&&(o.textContent=`Failed to join — welcome message could not be decrypted.`,o.style.color=`var(--duress)`)}},onError(e){o&&(o.textContent=e,o.style.color=`var(--duress)`)}})})},onError(e){let t=s.querySelector(`#relay-join-status`);t&&(t.textContent=e,t.style.color=`var(--duress)`)}})})}function Ao(e){try{let t;try{t=wn(e)}catch{try{t=Sn(e)}catch{throw Error(`Invalid invite — could not decode token.`)}}Mn(t);let r=t,{identity:i,settings:a}=l();if(!i?.pubkey||!i?.privkey){D(`No local identity — create or import one first.`,`error`);return}let o=`${r.adminPubkey.slice(0,8)}\u2026${r.adminPubkey.slice(-4)}`,s=r.relays?.length?r.relays:a.defaultWriteRelays,c=s,u=Array.from(new Set([...n,...s])),d=Array.from(new Set([...u,...c])),f=document.getElementById(`remote-join-modal`);f||(f=document.createElement(`dialog`),f.id=`remote-join-modal`,f.className=`modal`,document.body.appendChild(f),f.addEventListener(`click`,e=>{e.target===f&&f.close()}));let p=f,h=()=>{};p.innerHTML=`
      <div class="modal__form invite-share">
        <h2 class="modal__title">Remote Invite</h2>
        <p class="invite-hint">You've been invited to <strong>${O(r.groupName)}</strong> by <code>${O(o)}</code></p>

        <p class="invite-hint" id="remote-join-relay-status" style="color: var(--verified); font-weight: 500;">${d.length>0?`Connecting to relay...`:``}</p>

        <div style="margin: 1rem 0;">
          <p class="invite-hint" style="font-weight: 500;">Or send this join code manually:</p>
          <div style="display: flex; align-items: center; gap: 0.5rem; justify-content: center; margin: 0.5rem 0;">
            <code style="font-size: 0.75rem; word-break: break-all; max-width: 80%;">${O(i.pubkey)}</code>
            <button class="btn btn--sm" id="remote-join-copy-pubkey" type="button">Copy</button>
          </div>
        </div>

        <div style="margin: 1rem 0;">
          <p class="invite-hint">Paste the welcome message they send you:</p>
          <input class="input" id="remote-join-welcome-input" type="text" placeholder="Paste welcome message here..." autocomplete="off" style="font-family: monospace; font-size: 0.85rem;">
          <p class="invite-hint" id="remote-join-error" style="color: var(--duress); display: none;"></p>
        </div>

        <div class="modal__actions" style="gap: 0.5rem;">
          <button class="btn" id="remote-join-cancel" type="button">Cancel</button>
          <button class="btn btn--primary" id="remote-join-accept" type="button">Join</button>
        </div>
      </div>
    `,d.length>0&&m(u,c).then(()=>{let e=p.querySelector(`#remote-join-relay-status`);e&&(e.textContent=`Waiting for admin to send group key...`),h=Ar({inviteId:r.inviteId,adminPubkey:r.adminPubkey,readRelays:u,writeRelays:c,onWelcome(t){try{Oo(t,r,p)}catch{e&&(e.textContent=`Auto-join failed — paste welcome message manually.`,e.style.color=`var(--duress)`)}},onError(t){e&&(e.textContent=t,e.style.color=`var(--duress)`)}})}),p.querySelector(`#remote-join-copy-pubkey`)?.addEventListener(`click`,async e=>{let t=e.currentTarget;try{await navigator.clipboard.writeText(i.pubkey),t.textContent=`Copied!`,setTimeout(()=>{t.textContent=`Copy`},1500)}catch{}}),p.querySelector(`#remote-join-cancel`)?.addEventListener(`click`,()=>{h(),p.close()}),p.querySelector(`#remote-join-accept`)?.addEventListener(`click`,async()=>{let e=p.querySelector(`#remote-join-welcome-input`),t=p.querySelector(`#remote-join-error`),n=(e?.value??``).replace(/[^A-Za-z0-9=+/]/g,``);if(!n){t&&(t.textContent=`Please paste the welcome message.`,t.style.display=``);return}try{h(),Oo(n,r,p)}catch(e){t&&(t.textContent=e instanceof Error?e.message:`Failed to decrypt welcome message.`,t.style.display=``)}}),p.showModal()}catch(e){D(e instanceof Error?e.message:`Invalid remote invite.`,`error`)}}function jo(){document.addEventListener(`canary:create-group`,()=>{To()}),document.addEventListener(`canary:show-invite`,e=>{let{groupId:t}=e.detail,{groups:n}=l(),r=n[t];r&&Vr(r)}),document.addEventListener(`canary:confirm-member`,e=>{let{identity:t,groups:n,activeGroupId:r}=l();if(!r||!t?.pubkey)return;let i=n[r];if(!i||!i.admins.includes(t.pubkey))return;let a=e.detail?.token??``;S(async()=>{let{showConfirmMemberModal:e}=await Promise.resolve().then(()=>Ir);return{showConfirmMemberModal:e}},void 0,import.meta.url).then(({showConfirmMemberModal:e})=>{e(a)})}),document.addEventListener(`canary:verify-call`,e=>{let{groupId:t,pubkey:n}=e.detail;Ga(t,n)}),document.addEventListener(`canary:shamir-split`,()=>{S(async()=>{let{showShamirModal:e}=await import(`./shamir-modal-gCFr2z9i.js`);return{showShamirModal:e}},__vite__mapDeps([9,10,11,12,13,7,14]),import.meta.url).then(({showShamirModal:e})=>{e()})}),document.addEventListener(`canary:verify-proof`,()=>{S(async()=>{let{showVerifyProofModal:e}=await import(`./linkage-proof-uFP-kPrh.js`);return{showVerifyProofModal:e}},__vite__mapDeps([15,16,17,18,10,11,5,6,7,8,12,19,20]),import.meta.url).then(({showVerifyProofModal:e})=>{e()})}),document.addEventListener(`canary:open-recovery-root-modal`,()=>{S(async()=>{let{showRecoveryRootModal:e}=await import(`./recovery-root-modal-D73wKdRq.js`);return{showRecoveryRootModal:e}},[],import.meta.url).then(({showRecoveryRootModal:e})=>{e()})}),document.addEventListener(`canary:create-recovery-root`,async e=>{let t=(e.detail?.name??``).trim();if(!t){alert(`Please enter a name for the new mnemonic-backed root.`);return}let{generateMnemonic:n}=await S(async()=>{let{generateMnemonic:e}=await import(`./bip39-DavBqmoH.js`);return{generateMnemonic:e}},__vite__mapDeps([21,22,7,8,20]),import.meta.url),{wordlist:r}=await S(async()=>{let{wordlist:e}=await import(`./english-DbZVR_DO.js`);return{wordlist:e}},__vite__mapDeps([23,14]),import.meta.url),{restoreFromMnemonic:i}=await S(async()=>{let{restoreFromMnemonic:e}=await import(`./mnemonic-BvFL4mtR.js`);return{restoreFromMnemonic:e}},__vite__mapDeps([24,25,6,7,8,22,20,14,5]),import.meta.url),a=n(r),{root:o,defaultPersona:c}=i(a),l=Fo(c.identity.privateKey),u=Fo(c.identity.publicKey);c.identity.privateKey.fill(0),o.destroy(),g(),s({identity:{pubkey:u,privkey:l,mnemonic:a,signerType:`local`,displayName:t},groups:{},personas:{},activeGroupId:null,activePersonaId:null}),document.dispatchEvent(new CustomEvent(`canary:resync`)),wo(),Io(a)}),document.addEventListener(`canary:restore-recovery-root`,async e=>{let t=(e.detail?.mnemonic??``).trim().replace(/\s+/g,` `);if(!t){alert(`Please paste a recovery phrase first.`);return}if(t.split(/\s+/).length!==12){alert(`Recovery phrase must be exactly 12 words.`);return}try{let{validateMnemonic:e,restoreFromMnemonic:n}=await S(async()=>{let{validateMnemonic:e,restoreFromMnemonic:t}=await import(`./mnemonic-BvFL4mtR.js`);return{validateMnemonic:e,restoreFromMnemonic:t}},__vite__mapDeps([24,25,6,7,8,22,20,14,5]),import.meta.url),{wordlist:r}=await S(async()=>{let{wordlist:e}=await import(`./english-DbZVR_DO.js`);return{wordlist:e}},__vite__mapDeps([23,14]),import.meta.url);if(!e(t,r)){alert(`Invalid recovery phrase. Please check your words and try again.`);return}let{root:i,defaultPersona:a}=n(t),o=Fo(a.identity.privateKey),c=Fo(a.identity.publicKey);a.identity.privateKey.fill(0),i.destroy(),g(),s({identity:{pubkey:c,privkey:o,mnemonic:t,signerType:`local`,displayName:`You`},groups:{},personas:{},activeGroupId:null,activePersonaId:null}),document.dispatchEvent(new CustomEvent(`canary:resync`)),wo()}catch{alert(`Invalid recovery phrase.`)}}),document.addEventListener(`canary:export-persona`,e=>{let{personaId:t}=e.detail,{personas:n}=l(),r=T(n,t);r&&S(async()=>{let{showExportModal:e}=await import(`./export-modal-BfxhDh8-.js`);return{showExportModal:e}},__vite__mapDeps([26,16,17,18,10,11,5,6,7,8,12]),import.meta.url).then(({showExportModal:e})=>{e(r.persona)})}),document.addEventListener(`canary:prove-ownership`,e=>{let{personaId:t}=e.detail;S(async()=>{let{showProveOwnershipModal:e}=await import(`./linkage-proof-uFP-kPrh.js`);return{showProveOwnershipModal:e}},__vite__mapDeps([15,16,17,18,10,11,5,6,7,8,12,19,20]),import.meta.url).then(({showProveOwnershipModal:e})=>{e(t)})}),document.addEventListener(`canary:archive-persona`,e=>{let{personaId:t}=e.detail,{personas:n}=l(),r=T(n,t);if(!r)return;function i(e,t){let n={};for(let[r,a]of Object.entries(e))a.id===t?n[r]={...a,archived:!0}:a.children&&Object.keys(a.children).length>0?n[r]={...a,children:i(a.children,t)}:n[r]=a;return n}s({personas:i(n,t)}),D(`Archived "${r.persona.name}"`,`success`)}),document.addEventListener(`canary:rotate-persona`,e=>{let{personaId:t}=e.detail;S(async()=>{let{rotatePersona:e}=await import(`./persona-CkGuvy9J.js`);return{rotatePersona:e}},__vite__mapDeps([27,17,18,10,11,5,6,7,8]),import.meta.url).then(({rotatePersona:e})=>{let{personas:n}=l(),r=T(n,t);if(!r)return;let i=e(t,r.persona.index);n[t]&&s({personas:{...n,[t]:i}}),D(`Rotated "${r.persona.name}" to index ${i.index}`,`success`)})}),document.addEventListener(`canary:pin-enable`,e=>{let t=e.detail?.pin;!t||t.length<6||v(t).then(()=>{s({settings:{...l().settings,pinEnabled:!0}}),_o()})}),document.addEventListener(`canary:pin-disable`,()=>{y().then(()=>{s({settings:{...l().settings,pinEnabled:!1}}),vo()})}),document.addEventListener(`canary:lock`,()=>{Ie(),ee(),yo()}),document.addEventListener(`canary:sync-message`,e=>{let{groupId:t,message:n,sender:r}=e.detail,{activeGroupId:i}=l();if(n.type===`beacon`){if(t!==i)return;Ei(r,n.lat,n.lon,n.accuracy??2e4,n.timestamp)}else if(n.type===`duress-alert`){let e=n.subject||r,{identity:i}=l();if(i?.pubkey===e)return;mn(e,t,n.lat==null?void 0:{lat:n.lat,lon:n.lon},n.timestamp)}else n.type===`duress-clear`&&document.dispatchEvent(new CustomEvent(`canary:duress-clear`,{detail:{subject:n.subject,clearedBy:r,groupId:t}}))}),document.addEventListener(`canary:resync`,()=>void Po()),document.addEventListener(`canary:publish-persona-profile`,async e=>{let{personaId:t}=e.detail,n=l().personas[t];n&&await $e(n)}),document.addEventListener(`canary:vault-publish-now`,()=>Wo()),document.addEventListener(`canary:sync-vault`,()=>void Go()),document.addEventListener(`visibilitychange`,()=>{if(document.hidden){p(),Wo();return}console.info(`[canary:boot] App foregrounded — reconnecting and syncing vault`),uo(),g(),S(async()=>{let{disconnectRelays:e}=await import(`./connect-B8zPYnAS.js`);return{disconnectRelays:e}},__vite__mapDeps([28,29,11,6,7,8]),import.meta.url).then(({disconnectRelays:e})=>{e(),Po()})})}async function Mo(){let{identity:e}=l(),t=await ne({pubkey:e?.pubkey??``,privkey:e?.privkey}),n={pubkey:t.pubkey,privkey:t.privkey,displayName:e?.displayName??`You`,signerType:`local`};(!e||e.pubkey!==n.pubkey)&&s({identity:mo(n,e)})}function No(){let{identity:e}=l();if(!e?.pubkey)return;let t=e.privkey?async t=>{let{decryptVault:n}=await S(async()=>{let{decryptVault:e}=await Promise.resolve().then(()=>Ka);return{decryptVault:e}},void 0,import.meta.url);return n(t,e.privkey,e.pubkey)}:e.signerType===`nip07`?async t=>{try{return await window.nostr.nip44.decrypt(e.pubkey,t)}catch{return null}}:null;t&&lo(e.pubkey,t,(e,t)=>{let{groups:n}=l(),r=fo(n,e,l().deletedGroupIds),i=Object.keys(r).length-Object.keys(n).length;(i>0||Object.entries(r).some(([e,t])=>{let r=n[e];return r?t.epoch!==r.epoch||t.counter!==r.counter:!0}))&&(s({groups:r}),p(),i>0?D(`${i} new group(s) synced from another device`,`success`):D(`Groups updated from another device`,`success`,2e3))})}async function Po(){let{groups:e,identity:n,settings:r}=l(),i=Object.keys(e).length,a=!!n?.privkey,o=[],c=[];for(let t of Object.values(e))o.push(...t.readRelays??[]),c.push(...t.writeRelays??[]),o.push(...t.relays??[]),c.push(...t.relays??[]);o.push(...r.defaultReadRelays??r.defaultRelays),c.push(...r.defaultWriteRelays??r.defaultRelays);let u=t(o),d=t(c),f=t([...u,...d]).length;if(f===0){console.warn(`[canary:boot] No relays found — sync disabled`),i>0&&D(`Sync disabled — ${i} group(s), no relays configured`,`warning`,5e3);return}if(!a&&n?.signerType!==`nip07`){console.warn(`[canary:boot] No privkey and no NIP-07 — sync disabled`),D(`Sync disabled — no private key`,`warning`,5e3);return}if(console.warn(`[canary:boot] Read relays:`,u,`Write relays:`,d),a){await m(u,d);let{waitForConnection:t}=await S(async()=>{let{waitForConnection:e}=await import(`./connect-B8zPYnAS.js`);return{waitForConnection:e}},__vite__mapDeps([28,29,11,6,7,8]),import.meta.url);await t(),console.info(`[canary:vault] Relay connections ready, fetching vault...`);try{let e=await ro(n.privkey,n.pubkey),t=e?.groups;if(console.info(`[canary:vault] Vault fetch result:`,t?`${Object.keys(t).length} group(s)`:`null`),t&&Object.keys(t).length>0){let{groups:e}=l(),n=fo(e,t,l().deletedGroupIds);if(Object.keys(e).sort().join(`,`)!==Object.keys(n).sort().join(`,`)||Object.entries(n).some(([t,n])=>{let r=e[t];return r?n.epoch!==r.epoch||n.counter!==r.counter||n.usageOffset!==r.usageOffset||n.members.length!==r.members.length:!0})){s({groups:n});let t=Object.keys(n).length-Object.keys(e).length;t>0?D(`Restored ${t} group(s) from vault`,`success`):D(`Synced from vault`,`success`,1500)}}if(e?.personas&&Object.keys(e.personas).length>0){let{personas:t}=l(),n={...t};for(let[t,r]of Object.entries(e.personas))n[t]?n[t]={...n[t],...r,npub:n[t].npub}:n[t]=r;s({personas:n})}}catch(e){console.warn(`[canary:vault] Vault fetch failed:`,e)}re(),No(),D(`Syncing via ${f} relay(s)`,`success`,2e3),typeof Notification<`u`&&Notification.permission===`granted`&&S(async()=>{let{getExistingSubscription:e,registerWithPushServer:t}=await import(`./push-BNk3z_NM.js`);return{getExistingSubscription:e,registerWithPushServer:t}},[],import.meta.url).then(async({getExistingSubscription:t,registerWithPushServer:n})=>{let r=await t();if(r){let{hashGroupTag:t}=await S(async()=>{let{hashGroupTag:e}=await import(`./sync-CTwt-KD4.js`);return{hashGroupTag:e}},__vite__mapDeps([3,4,5,6,7,8]),import.meta.url),i=Object.values(e).map(e=>({tagHash:t(e.id),livenessInterval:e.livenessInterval}));await n(r,i),console.info(`[canary:push] Re-registered with push server, groups:`,i.length)}else console.warn(`[canary:push] Permission granted but no existing subscription found`)}).catch(e=>console.error(`[canary:push] Re-registration failed:`,e))}else if(n?.signerType===`nip07`){let{connectRelays:e,waitForConnection:t}=await S(async()=>{let{connectRelays:e,waitForConnection:t}=await import(`./connect-B8zPYnAS.js`);return{connectRelays:e,waitForConnection:t}},__vite__mapDeps([28,29,11,6,7,8]),import.meta.url);e(u,d);try{await t(),console.info(`[canary:vault] NIP-07 vault sync starting...`);let e=await oo(n.pubkey),r=e?.groups;if(console.info(`[canary:vault] NIP-07 vault result:`,r?`${Object.keys(r).length} group(s)`:`null`),r&&Object.keys(r).length>0){let{groups:e}=l(),t=fo(e,r,l().deletedGroupIds);if(Object.keys(t).length!==Object.keys(e).length||Object.entries(t).some(([t,n])=>{let r=e[t];return r?n.epoch!==r.epoch||n.counter!==r.counter:!0})){s({groups:t});let n=Object.keys(t).length-Object.keys(e).length;n>0?D(`Restored ${n} group(s) from vault`,`success`):D(`Synced from vault`,`success`,1500)}}if(e?.personas&&Object.keys(e.personas).length>0){let{personas:t}=l(),n={...t};for(let[t,r]of Object.entries(e.personas))n[t]?n[t]={...n[t],...r,npub:n[t].npub}:n[t]=r;s({personas:n})}}catch(e){console.warn(`[canary:vault] NIP-07 vault sync failed:`,e)}No(),D(`Connected to ${f} relay(s)`,`success`,2e3)}else{let{connectRelays:e}=await S(async()=>{let{connectRelays:e}=await import(`./connect-B8zPYnAS.js`);return{connectRelays:e}},__vite__mapDeps([28,29,11,6,7,8]),import.meta.url);e(u,d),D(`Connected to ${f} relay(s)`,`success`,2e3)}let{fetchOwnProfile:p}=await S(async()=>{let{fetchOwnProfile:e}=await import(`./profiles-CPYVn98y.js`);return{fetchOwnProfile:e}},__vite__mapDeps([30,31,29,11,6,7,8,17,18,10,5,19,20,32]),import.meta.url);if(p(),Co(),a){let{startLivenessHeartbeat:e}=await S(async()=>{let{startLivenessHeartbeat:e}=await import(`./liveness-DQaL8XIC.js`);return{startLivenessHeartbeat:e}},__vite__mapDeps([33,34,16,17,18,10,11,5,6,7,8,12,2,29,35,20,22,19,32,4]),import.meta.url);e()}}function Fo(e){return Array.from(e,e=>e.toString(16).padStart(2,`0`)).join(``)}function Io(e){let t=e.split(` `),n=document.getElementById(`recovery-phrase-modal`);n||(n=document.createElement(`dialog`),n.id=`recovery-phrase-modal`,n.className=`modal`,document.body.appendChild(n));let r=n;r.textContent=``;let i=document.createElement(`div`);i.className=`modal__form`,i.style.maxWidth=`420px`;let a=document.createElement(`h2`);a.className=`modal__title`,a.textContent=`Back up your recovery phrase`,i.appendChild(a);let o=document.createElement(`p`);o.className=`invite-hint`,o.textContent=`Write these words down in order. They're the only way to recover your account.`,i.appendChild(o);let s=document.createElement(`div`);s.className=`recovery-grid`,s.style.cssText=`display:grid;grid-template-columns:repeat(3,1fr);gap:0.5rem;margin:1rem 0;`,t.forEach((e,t)=>{let n=document.createElement(`div`);n.style.cssText=`border:1px solid var(--border);border-radius:4px;padding:0.5rem;text-align:center;font-family:var(--font-mono,monospace);font-size:0.8rem;`;let r=document.createElement(`span`);r.style.cssText=`color:var(--text-muted);font-size:0.7rem;`,r.textContent=`${t+1}. `;let i=document.createElement(`span`);i.style.fontWeight=`500`,i.textContent=e,n.append(r,i),s.appendChild(n)}),i.appendChild(s);let c=document.createElement(`p`);c.className=`invite-hint`,c.style.cssText=`color:var(--duress);font-weight:500;`,c.textContent=`Do not share these words with anyone.`,i.appendChild(c);let l=document.createElement(`div`);l.className=`modal__actions`,l.style.gap=`0.5rem`;let u=document.createElement(`button`);u.id=`recovery-phrase-copy`,u.className=`btn btn--primary`,u.type=`button`,u.textContent=`Copy words`,u.addEventListener(`click`,async()=>{try{await navigator.clipboard.writeText(e),u.textContent=`Copied!`,setTimeout(()=>{u.textContent=`Copy words`},2e3),setTimeout(()=>{navigator.clipboard.writeText(``).catch(()=>{})},3e4)}catch{}});let d=document.createElement(`button`);d.id=`recovery-phrase-skip`,d.className=`btn`,d.type=`button`,d.textContent=`Skip for now`,d.addEventListener(`click`,()=>r.close()),l.append(u,d),i.appendChild(l),r.appendChild(i),r.showModal()}function Lo(){let e=document.getElementById(`app`);e.innerHTML=`
    <div class="lock-screen">
      <h1 class="lock-screen__brand">CANARY</h1>
      <p class="lock-screen__hint">Deepfake-proof identity verification</p>

      <div style="width: 100%; max-width: 360px; margin-top: 1.5rem;">

        <div style="background: var(--bg-raised); border: 1px solid var(--border); border-radius: 6px; padding: 1rem; margin-bottom: 1rem;">
          <p class="input-label__text" style="margin-bottom: 0.5rem;">Quick Start</p>
          <p class="settings-hint" style="margin-bottom: 0.5rem;">No Nostr account needed. Enter your name to get started.</p>
          <form id="offline-form" autocomplete="off" style="display: flex; gap: 0.375rem;">
            <input class="input" type="text" id="offline-name" placeholder="Enter your name" required style="flex: 1; font-size: 0.875rem; padding: 0.5rem;" />
            <button class="btn btn--primary" type="submit">Go</button>
          </form>
        </div>

        <div style="background: var(--bg-raised); border: 1px solid var(--border); border-radius: 6px; padding: 1rem; margin-bottom: 1rem;">
          <p class="input-label__text" style="margin-bottom: 0.5rem;">Recover Account</p>

          <div style="display: flex; gap: 0; margin-bottom: 0.75rem; border-bottom: 1px solid var(--border);">
            <button id="tab-recovery-phrase" type="button" class="btn btn--ghost btn--sm" style="border-bottom: 2px solid var(--accent); border-radius: 0; padding: 0.375rem 0.75rem; font-size: 0.75rem; opacity: 1;">Recovery Phrase</button>
            <button id="tab-shamir-shares" type="button" class="btn btn--ghost btn--sm" style="border-bottom: 2px solid transparent; border-radius: 0; padding: 0.375rem 0.75rem; font-size: 0.75rem; opacity: 0.6;">Shamir Shares</button>
          </div>

          <div id="panel-recovery-phrase">
            <p class="settings-hint" style="margin-bottom: 0.5rem;">Paste your 12-word recovery phrase to restore your account.</p>
            <form id="mnemonic-login-form" autocomplete="off" style="display: flex; flex-direction: column; gap: 0.375rem;">
              <textarea class="input" id="login-mnemonic" placeholder="Enter your 12 recovery words..." rows="3" style="width: 100%; font-size: 0.8rem; resize: none; padding: 0.5rem; font-family: var(--font-mono, monospace);"></textarea>
              <button class="btn btn--primary" type="submit">Recover account</button>
            </form>
          </div>

          <div id="panel-shamir-shares" style="display: none;">
            <p class="settings-hint" style="margin-bottom: 0.5rem;">Paste Shamir shares one at a time to reconstruct your recovery phrase.</p>
            <div style="display: flex; flex-direction: column; gap: 0.375rem;">
              <textarea class="input" id="shamir-share-input" placeholder="Paste a Shamir share (word list)..." rows="3" style="width: 100%; font-size: 0.8rem; resize: none; padding: 0.5rem; font-family: var(--font-mono, monospace);"></textarea>
              <button class="btn btn--primary" id="shamir-add-share" type="button">Add share</button>
              <p class="settings-hint" id="shamir-status" style="margin: 0; font-size: 0.75rem;"></p>
              <ul id="shamir-share-list" style="list-style: none; padding: 0; margin: 0;"></ul>
              <button class="btn btn--primary" id="shamir-recover" type="button" disabled style="margin-top: 0.25rem;">Recover</button>
            </div>
          </div>
        </div>

        <div style="background: var(--bg-raised); border: 1px solid var(--border); border-radius: 6px; padding: 1rem;">
          <p class="input-label__text" style="margin-bottom: 0.5rem;">Connect with Nostr</p>
          <p class="settings-hint" style="margin-bottom: 0.5rem;">Sync groups across devices via relays.</p>

          <form id="nsec-login-form" autocomplete="off" style="display: flex; flex-direction: column; gap: 0.375rem;">
            <input class="input" type="password" id="login-nsec" placeholder="nsec1..." autocomplete="off" style="width: 100%; font-size: 0.875rem; padding: 0.5rem;" />
            <button class="btn btn--primary" type="submit">Login with nsec</button>
          </form>

          <button class="btn" id="login-nip07" type="button" style="width: 100%; margin-top: 0.5rem;">Use Browser Extension (NIP-07)</button>

          <details style="margin-top: 0.75rem;">
            <summary class="settings-hint" style="cursor: pointer; user-select: none;">Relays</summary>
            <div style="margin-top: 0.375rem;">
              <p class="settings-hint" style="font-size: 0.7rem; margin: 0 0 0.25rem 0;">Write relay (publishing)</p>
              <ul id="login-relay-list" style="list-style: none; padding: 0; margin: 0 0 0.375rem 0;">
                ${(l().settings.defaultWriteRelays??l().settings.defaultRelays).map((e,t)=>`
                  <li style="display: flex; align-items: center; gap: 0.25rem; margin-bottom: 0.25rem;">
                    <span class="settings-hint" style="flex: 1; font-size: 0.75rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin: 0;">${O(e)}</span>
                    <button class="btn btn--ghost btn--sm login-relay-remove" data-relay-index="${t}" type="button" style="padding: 0 0.25rem; font-size: 0.7rem;">✕</button>
                  </li>
                `).join(``)}
              </ul>
              <div style="display: flex; gap: 0.25rem;">
                <input class="input" type="url" id="login-relay-input" placeholder="wss://relay.example.com" style="flex: 1; font-size: 0.75rem; padding: 0.375rem;" />
                <button class="btn btn--ghost btn--sm" id="login-relay-add" type="button">Add</button>
              </div>
              <p class="settings-hint" style="font-size: 0.7rem; margin: 0.5rem 0 0 0;">Read relays: ${n.map(e=>O(e.replace(`wss://`,``))).join(`, `)} + write relay(s)</p>
            </div>
          </details>
        </div>

      </div>
    </div>
  `,e.querySelector(`#offline-form`)?.addEventListener(`submit`,async t=>{t.preventDefault();let n=e.querySelector(`#offline-name`),r=n?.value.trim();if(!r){n?.focus();return}let{generateMnemonic:i}=await S(async()=>{let{generateMnemonic:e}=await import(`./bip39-DavBqmoH.js`);return{generateMnemonic:e}},__vite__mapDeps([21,22,7,8,20]),import.meta.url),{wordlist:a}=await S(async()=>{let{wordlist:e}=await import(`./english-DbZVR_DO.js`);return{wordlist:e}},__vite__mapDeps([23,14]),import.meta.url),{restoreFromMnemonic:o}=await S(async()=>{let{restoreFromMnemonic:e}=await import(`./mnemonic-BvFL4mtR.js`);return{restoreFromMnemonic:e}},__vite__mapDeps([24,25,6,7,8,22,20,14,5]),import.meta.url),c=i(a),{root:l,defaultPersona:u}=o(c),d=Array.from(u.identity.privateKey,e=>e.toString(16).padStart(2,`0`)).join(``),f=Array.from(u.identity.publicKey,e=>e.toString(16).padStart(2,`0`)).join(``);l.destroy(),s({identity:{pubkey:f,privkey:d,mnemonic:c,signerType:`local`,displayName:r}}),await Ro();let{publishKind0:p}=await S(async()=>{let{publishKind0:e}=await import(`./profiles-CPYVn98y.js`);return{publishKind0:e}},__vite__mapDeps([30,31,29,11,6,7,8,17,18,10,5,19,20,32]),import.meta.url);p(r,d),Io(c)}),e.querySelector(`#mnemonic-login-form`)?.addEventListener(`submit`,async t=>{t.preventDefault();let n=e.querySelector(`#login-mnemonic`)?.value.trim();if(n){if(n.split(/\s+/).length!==12){alert(`Recovery phrase must be exactly 12 words.`);return}try{let{validateMnemonic:e,restoreFromMnemonic:t}=await S(async()=>{let{validateMnemonic:e,restoreFromMnemonic:t}=await import(`./mnemonic-BvFL4mtR.js`);return{validateMnemonic:e,restoreFromMnemonic:t}},__vite__mapDeps([24,25,6,7,8,22,20,14,5]),import.meta.url),{wordlist:r}=await S(async()=>{let{wordlist:e}=await import(`./english-DbZVR_DO.js`);return{wordlist:e}},__vite__mapDeps([23,14]),import.meta.url);if(!e(n,r)){alert(`Invalid recovery phrase. Please check your words and try again.`);return}let{root:i,defaultPersona:a}=t(n),o=Array.from(a.identity.privateKey,e=>e.toString(16).padStart(2,`0`)).join(``),c=Array.from(a.identity.publicKey,e=>e.toString(16).padStart(2,`0`)).join(``);i.destroy(),s({identity:{pubkey:c,privkey:o,mnemonic:n,signerType:`local`,displayName:`You`}}),await Ro()}catch{alert(`Invalid recovery phrase.`)}}});let t=e.querySelector(`#tab-recovery-phrase`),r=e.querySelector(`#tab-shamir-shares`),i=e.querySelector(`#panel-recovery-phrase`),a=e.querySelector(`#panel-shamir-shares`);t.addEventListener(`click`,()=>{i.style.display=``,a.style.display=`none`,t.style.borderBottomColor=`var(--accent)`,t.style.opacity=`1`,r.style.borderBottomColor=`transparent`,r.style.opacity=`0.6`}),r.addEventListener(`click`,()=>{i.style.display=`none`,a.style.display=``,r.style.borderBottomColor=`var(--accent)`,r.style.opacity=`1`,t.style.borderBottomColor=`transparent`,t.style.opacity=`0.6`});let o=[],c=0;function u(){let t=e.querySelector(`#shamir-status`),n=e.querySelector(`#shamir-share-list`),r=e.querySelector(`#shamir-recover`);n.textContent=``;for(let e=0;e<o.length;e++){let t=document.createElement(`li`);t.className=`settings-hint`,t.style.cssText=`font-size: 0.75rem; padding: 0.125rem 0;`,t.textContent=`Share ${e+1} added`,n.appendChild(t)}if(o.length===0)t.textContent=``,r.disabled=!0;else if(o.length<c){let e=c-o.length;t.textContent=`Share ${o.length} added. Need ${e} more.`,r.disabled=!0}else t.textContent=`Ready to recover!`,r.disabled=!1}e.querySelector(`#shamir-add-share`)?.addEventListener(`click`,async()=>{let t=e.querySelector(`#shamir-share-input`),n=t.value.trim();if(n)try{let{wordsToShare:e}=await S(async()=>{let{wordsToShare:e}=await import(`./dist-WfeG15f_.js`);return{wordsToShare:e}},__vite__mapDeps([13,7,14]),import.meta.url),r=e(n.split(/\s+/));if(o.some(e=>e.id===r.id)){alert(`Share ${r.id} has already been added.`);return}if(o.length===0)c=r.threshold;else if(r.threshold!==c){alert(`Threshold mismatch: expected ${c}, got ${r.threshold}. Shares must be from the same set.`);return}o.push(r),t.value=``,u()}catch(e){alert(e instanceof Error?e.message:`Invalid share. Please check the words and try again.`)}}),e.querySelector(`#shamir-recover`)?.addEventListener(`click`,async()=>{if(!(o.length<c))try{let{reconstructSecret:e}=await S(async()=>{let{reconstructSecret:e}=await import(`./dist-WfeG15f_.js`);return{reconstructSecret:e}},__vite__mapDeps([13,7,14]),import.meta.url),t=e(o,c),n=new TextDecoder().decode(t),{validateMnemonic:r,restoreFromMnemonic:i}=await S(async()=>{let{validateMnemonic:e,restoreFromMnemonic:t}=await import(`./mnemonic-BvFL4mtR.js`);return{validateMnemonic:e,restoreFromMnemonic:t}},__vite__mapDeps([24,25,6,7,8,22,20,14,5]),import.meta.url),{wordlist:a}=await S(async()=>{let{wordlist:e}=await import(`./english-DbZVR_DO.js`);return{wordlist:e}},__vite__mapDeps([23,14]),import.meta.url);if(!r(n,a)){alert(`Reconstructed phrase is not a valid mnemonic. Please check your shares.`);return}let{root:l,defaultPersona:u}=i(n),d=Array.from(u.identity.privateKey,e=>e.toString(16).padStart(2,`0`)).join(``),f=Array.from(u.identity.publicKey,e=>e.toString(16).padStart(2,`0`)).join(``);l.destroy(),s({identity:{pubkey:f,privkey:d,mnemonic:n,signerType:`local`,displayName:`You`}}),await Ro()}catch(e){alert(e instanceof Error?e.message:`Failed to reconstruct secret from shares.`)}}),e.querySelector(`#nsec-login-form`)?.addEventListener(`submit`,async t=>{t.preventDefault();let n=e.querySelector(`#login-nsec`)?.value.trim();if(n)try{let e=l().identity,t=Ye(n);if(t.type!==`nsec`){alert(`Not a valid nsec.`);return}let r=t.data,i=Fo(r);s({identity:mo({pubkey:ue(r),privkey:i,signerType:`local`,displayName:`You`},e)}),await Ro()}catch(e){alert(e instanceof Error?e.message:`Invalid nsec format.`)}}),e.querySelector(`#login-nip07`)?.addEventListener(`click`,async()=>{if(!_()){alert(`No Nostr extension found. Install Alby, nos2x, or another NIP-07 extension and reload.`);return}try{let e=l().identity;s({identity:mo({pubkey:await window.nostr.getPublicKey(),signerType:`nip07`,displayName:`You`},e)}),await Ro()}catch{alert(`Extension rejected the request.`)}});function d(){let t=e.querySelector(`#login-relay-list`);t&&(t.innerHTML=(l().settings.defaultWriteRelays??l().settings.defaultRelays).map((e,t)=>`
      <li style="display: flex; align-items: center; gap: 0.25rem; margin-bottom: 0.25rem;">
        <span class="settings-hint" style="flex: 1; font-size: 0.75rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin: 0;">${O(e)}</span>
        <button class="btn btn--ghost btn--sm login-relay-remove" data-relay-index="${t}" type="button" style="padding: 0 0.25rem; font-size: 0.7rem;">✕</button>
      </li>
    `).join(``),f())}function f(){e.querySelectorAll(`.login-relay-remove`).forEach(e=>{e.addEventListener(`click`,()=>{let t=Number(e.dataset.relayIndex),n=[...l().settings.defaultWriteRelays??l().settings.defaultRelays];n.splice(t,1),s({settings:{...l().settings,defaultWriteRelays:n,defaultRelays:n}}),d()})})}f(),e.querySelector(`#login-relay-add`)?.addEventListener(`click`,()=>{let t=e.querySelector(`#login-relay-input`),n=t?.value.trim();if(!n||!po(n))return;let r=[...l().settings.defaultWriteRelays??l().settings.defaultRelays];r.includes(n)||(r.push(n),s({settings:{...l().settings,defaultWriteRelays:r,defaultRelays:r}}),d()),t&&(t.value=``)}),e.querySelector(`#login-relay-input`)?.addEventListener(`keydown`,t=>{t.key===`Enter`&&(t.preventDefault(),e.querySelector(`#login-relay-add`)?.click())})}async function Ro(){{let{identity:e,personas:t}=l();e?.privkey&&(Object.keys(t).length>0?Le(e,t):Fe(e))}bo(),window.location.hash===`#call`&&s({view:`call-demo`});let e=document.getElementById(`header`);e&&ie(e),xo(),document.getElementById(`footer-sync-btn`)?.addEventListener(`click`,()=>{document.dispatchEvent(new CustomEvent(`canary:sync-vault`))}),wo(),c(Co),c(Uo),jo(),Eo(),window.addEventListener(`hashchange`,()=>Eo()),Po(),nt().catch(()=>{})}function zo(e){let t=document.getElementById(`notification-prompt`);t&&t.remove();let n=document.createElement(`div`);n.id=`notification-prompt`,n.className=`notification-prompt`;let r=document.createElement(`div`);r.className=`notification-prompt__text`;let i=document.createElement(`strong`);i.textContent=`Enable notifications?`;let a=document.createElement(`span`);a.textContent=`We’ll alert you in emergencies and remind you to check in.`,r.append(i,a);let o=document.createElement(`div`);o.className=`notification-prompt__actions`;let s=document.createElement(`button`);s.className=`btn btn--sm btn--primary`,s.textContent=`Enable`;let c=document.createElement(`button`);c.className=`btn btn--sm`,c.textContent=`Not now`,o.append(s,c),n.append(r,o),document.getElementById(`app`)?.appendChild(n),s.addEventListener(`click`,()=>{n.remove(),e()}),c.addEventListener(`click`,()=>n.remove())}function Bo(){let e=document.getElementById(`notification-prompt`);e&&e.remove();let t=document.createElement(`div`);t.id=`notification-prompt`,t.className=`notification-prompt`;let n=document.createElement(`div`);n.className=`notification-prompt__text`;let r=document.createElement(`strong`);r.textContent=`Add to Home Screen`;let i=document.createElement(`span`);i.textContent=`To receive emergency alerts and liveness reminders, add CANARY to your home screen. Tap the share button, then "Add to Home Screen".`,n.append(r,i);let a=document.createElement(`div`);a.className=`notification-prompt__actions`;let o=document.createElement(`button`);o.className=`btn btn--sm`,o.textContent=`Got it`,a.append(o),t.append(n,a),document.getElementById(`app`)?.appendChild(t),o.addEventListener(`click`,()=>t.remove())}var Vo=null,Ho=3e4;function Uo(){let{identity:e,groups:t}=l();e?.pubkey&&(!e.privkey&&e.signerType!==`nip07`||Object.keys(t).length!==0&&(Vo&&clearTimeout(Vo),Vo=setTimeout(()=>{let{identity:e,groups:t,personas:n,deletedGroupIds:r}=l();!e?.pubkey||Object.keys(t).length===0||(e.privkey?no(t,e.privkey,e.pubkey,n,r):e.signerType===`nip07`&&ao(t,e.pubkey,n,r))},Ho)))}function Wo(){Vo&&clearTimeout(Vo);let{identity:e,groups:t,personas:n,deletedGroupIds:r}=l();!e?.pubkey||Object.keys(t).length===0||(e.privkey?no(t,e.privkey,e.pubkey,n,r):e.signerType===`nip07`?ao(t,e.pubkey,n,r):null)?.then(()=>console.info(`[canary:vault] Vault published OK`)).catch(e=>{console.error(`[canary:vault] Vault publish FAILED:`,e),D(`Vault publish failed: ${e instanceof Error?e.message:e}`,`error`)})}async function Go(){let{identity:e,groups:t,personas:n}=l();if(!e?.pubkey){D(`No identity — cannot sync`,`error`);return}if(!e.privkey&&e.signerType!==`nip07`){D(`No private key or extension — cannot sync`,`error`);return}let r=!e.privkey&&e.signerType===`nip07`,i=e.pubkey.slice(0,8);D(`Syncing as ${i}\u2026${r?` (NIP-07)`:``}`,`info`,3e3),console.info(`[canary:vault] Manual sync for pubkey ${i} (${r?`NIP-07`:`local key`})`);try{let{deletedGroupIds:a}=l();Object.keys(t).length>0&&(r?await ao(t,e.pubkey,n,a):await no(t,e.privkey,e.pubkey,n,a));let{waitForConnection:o}=await S(async()=>{let{waitForConnection:e}=await import(`./connect-B8zPYnAS.js`);return{waitForConnection:e}},__vite__mapDeps([28,29,11,6,7,8]),import.meta.url);await o();let c=r?await oo(e.pubkey):await ro(e.privkey,e.pubkey),u=c?.groups;if(u&&Object.keys(u).length>0){let{groups:e}=l(),t=fo(e,u,l().deletedGroupIds),n=Object.keys(t).length-Object.keys(e).length;s({groups:t}),p(),n>0?D(`Synced — ${n} new group(s) restored`,`success`):D(`Groups are in sync`,`success`,2e3)}else D(`No vault found for ${i}\u2026 — are both devices using the same identity?`,`warning`,5e3);if(c?.personas&&Object.keys(c.personas).length>0){let{personas:e}=l(),t={...e};for(let[e,n]of Object.entries(c.personas))t[e]?t[e]={...t[e],...n,npub:t[e].npub}:t[e]=n;s({personas:t})}}catch(e){console.error(`[canary:vault] Manual sync failed:`,e),D(`Sync failed: ${e instanceof Error?e.message:e}`,`error`)}}window.addEventListener(`pagehide`,()=>{Vo&&Wo()});async function Ko(){if(ae())yo();else{oe();let{identity:e}=l();e?.pubkey?await Ro():Lo()}}document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,()=>{Ko()}):Ko();export{lt as n,Or as t};