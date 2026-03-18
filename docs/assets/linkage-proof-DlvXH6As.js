import{n as e}from"./state-q1HztOOl.js";import{t}from"./secp256k1-C_bO5q2F.js";import{a as n,o as r,r as i,s as a,u as o}from"./persona-hUa-gPg_.js";import{i as s}from"./persona-CWR_vlah.js";import{t as c}from"./escape-DiwqE07e.js";import{n as l}from"./persona-picker-Z5SKQAHZ.js";var u=new TextEncoder,d=/^[0-9a-f]{64}$/,f=/^[0-9a-f]{128}$/;function p(e,t){return`nsec-tree:own:${e}:${t}`}function m(e,t,n,r){return`nsec-tree:link:${e}:${t}:${n}:${r}`}function h(e,n){let i=o(e),a=r(t.getPublicKey(i)),s=r(n.publicKey),c=p(a,s),l=u.encode(c);return{masterPubkey:a,childPubkey:s,attestation:c,signature:r(t.sign(l,i))}}function g(e,n){let i=o(e),a=r(t.getPublicKey(i)),s=r(n.publicKey),c=m(a,s,n.purpose,n.index),l=u.encode(c),d=r(t.sign(l,i));return{masterPubkey:a,childPubkey:s,purpose:n.purpose,index:n.index,attestation:c,signature:d}}function _(e){if(!d.test(e.masterPubkey)||!d.test(e.childPubkey))return null;let t=e.purpose!==void 0;if(t!==(e.index!==void 0))return null;if(!t)return p(e.masterPubkey,e.childPubkey);let n=e.purpose,r=e.index;if(n===void 0||r===void 0||!Number.isInteger(r)||r<0||r>4294967295)return null;try{i(n)}catch{return null}return m(e.masterPubkey,e.childPubkey,n,r)}function v(e){try{let n=_(e);if(!n||e.attestation!==n||!f.test(e.signature))return!1;let r=u.encode(e.attestation),i=a(e.signature),o=a(e.masterPubkey);return t.verify(i,r,o)}catch{return!1}}var y=`linkage-prove-dialog`,b=`linkage-verify-dialog`;function x(e){let t=document.getElementById(e);return t||(t=document.createElement(`dialog`),t.id=e,t.className=`modal`,document.body.appendChild(t)),t}function S(e){e.addEventListener(`click`,t=>{t.target===e&&e.close()}),e.querySelector(`[data-close]`)?.addEventListener(`click`,()=>e.close())}function C(e,t){let n=new Blob([t],{type:`application/json`}),r=URL.createObjectURL(n),i=document.createElement(`a`);i.href=r,i.download=e,document.body.appendChild(i),i.click(),setTimeout(()=>{document.body.removeChild(i),URL.revokeObjectURL(r)},100)}function w(e){return`<span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${l(e)};margin-right:4px;vertical-align:middle;"></span>`}function T(t){let{personas:r}=e(),i=Object.values(r).filter(e=>e.name!==t&&!e.archived);if(i.length===0){alert(`No other personas to link to. Create another persona first.`);return}let a=x(y);a.innerHTML=E(t,i.map(e=>`<option value="${c(e.name)}" data-index="${e.index}">${w(e.name)} ${c(e.name)}</option>`).join(``)),S(a);let o=``,l=``;a.querySelector(`#lp-generate`)?.addEventListener(`click`,()=>{let e=a.querySelector(`#lp-target`);if(!e)return;let i=e.value,c=e.selectedOptions[0],u=parseInt(c?.dataset.index??`0`,10),d=a.querySelector(`input[name="lp-type"]:checked`)?.value===`full`?`full`:`blind`,f=s(t,r[t]?.index??0),p=s(i,u),m=n(f.identity.privateKey);try{let e=d===`blind`?h(m,p.identity):g(m,p.identity);o=JSON.stringify(e,null,2),l=`proof-${t}-${i}-${Math.floor(Date.now()/1e3)}.json`;let n=a.querySelector(`#lp-json`);n&&(n.textContent=o);let r=a.querySelector(`#lp-result`);r&&(r.style.display=`block`)}finally{m.destroy()}}),a.querySelector(`#lp-copy`)?.addEventListener(`click`,()=>{o&&navigator.clipboard.writeText(o).catch(()=>{})}),a.querySelector(`#lp-download`)?.addEventListener(`click`,()=>{o&&l&&C(l,o)}),a.showModal()}function E(e,t){return`
    <div class="modal__form" style="max-width:32rem;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
        <h2 style="margin:0;font-size:1.125rem;">Prove Ownership</h2>
        <button data-close style="background:none;border:none;cursor:pointer;font-size:1.25rem;color:var(--text,#e0e0e0);">&times;</button>
      </div>

      <p style="margin:0 0 1rem;color:var(--text-secondary,#aaa);font-size:0.875rem;">
        Prove ${w(e)}<strong>${c(e)}</strong> is linked to&hellip;
      </p>

      <label style="display:block;margin-bottom:0.75rem;">
        <span style="font-size:0.8125rem;color:var(--text-secondary,#aaa);">Target persona</span>
        <select id="lp-target" style="display:block;width:100%;margin-top:0.25rem;padding:0.5rem;border-radius:6px;border:1px solid var(--border,#444);background:var(--surface,#1e1e2e);color:var(--text,#e0e0e0);">
          ${t}
        </select>
      </label>

      <fieldset style="border:1px solid var(--border,#444);border-radius:6px;padding:0.75rem;margin-bottom:1rem;">
        <legend style="font-size:0.8125rem;color:var(--text-secondary,#aaa);padding:0 0.25rem;">Proof type</legend>
        <label style="display:block;margin-bottom:0.5rem;cursor:pointer;">
          <input type="radio" name="lp-type" value="blind" checked />
          <strong>Blind</strong>
          <span style="display:block;margin-left:1.25rem;font-size:0.75rem;color:var(--text-secondary,#aaa);">Proves both are the same person without revealing your master identity.</span>
        </label>
        <label style="display:block;cursor:pointer;">
          <input type="radio" name="lp-type" value="full" />
          <strong>Full</strong>
          <span style="display:block;margin-left:1.25rem;font-size:0.75rem;color:var(--text-secondary,#aaa);">Reveals your master identity and derivation paths. For legal/compliance only.</span>
        </label>
      </fieldset>

      <button id="lp-generate" class="btn btn--primary" style="width:100%;margin-bottom:1rem;">Generate proof</button>

      <div id="lp-result" style="display:none;">
        <pre id="lp-json" style="background:var(--surface,#1e1e2e);border:1px solid var(--border,#444);border-radius:6px;padding:0.75rem;overflow-x:auto;font-size:0.75rem;max-height:16rem;overflow-y:auto;white-space:pre-wrap;word-break:break-all;"></pre>
        <div style="display:flex;gap:0.5rem;margin-top:0.5rem;">
          <button id="lp-copy" class="btn" style="flex:1;">Copy</button>
          <button id="lp-download" class="btn" style="flex:1;">Download .json</button>
        </div>
      </div>
    </div>
  `}function D(){let e=x(b);e.innerHTML=O(),S(e),e.querySelector(`#vp-verify`)?.addEventListener(`click`,()=>{let t=e.querySelector(`#vp-input`),n=e.querySelector(`#vp-result`);if(!t||!n)return;let r=t.value.trim();if(!r){k(n,`error`,`Please paste a proof JSON.`);return}let i;try{i=JSON.parse(r)}catch{k(n,`error`,`Invalid JSON.`);return}try{v(i)?k(n,`success`,``,i):k(n,`error`,`Invalid proof — signature verification failed.`)}catch(e){k(n,`error`,e instanceof Error?e.message:String(e))}}),e.showModal()}function O(){return`
    <div class="modal__form" style="max-width:32rem;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
        <h2 style="margin:0;font-size:1.125rem;">Verify Linkage Proof</h2>
        <button data-close style="background:none;border:none;cursor:pointer;font-size:1.25rem;color:var(--text,#e0e0e0);">&times;</button>
      </div>

      <label style="display:block;margin-bottom:0.75rem;">
        <span style="font-size:0.8125rem;color:var(--text-secondary,#aaa);">Paste a linkage proof JSON</span>
        <textarea id="vp-input" rows="8" style="display:block;width:100%;margin-top:0.25rem;padding:0.5rem;border-radius:6px;border:1px solid var(--border,#444);background:var(--surface,#1e1e2e);color:var(--text,#e0e0e0);font-family:monospace;font-size:0.75rem;resize:vertical;" placeholder='{"masterPubkey":"...","childPubkey":"...","attestation":"...","signature":"..."}'></textarea>
      </label>

      <button id="vp-verify" class="btn btn--primary" style="width:100%;margin-bottom:1rem;">Verify</button>

      <div id="vp-result" style="display:none;padding:0.75rem;border-radius:6px;border:1px solid var(--border,#444);font-size:0.875rem;"></div>
    </div>
  `}function k(e,t,n,r){if(e.style.display=`block`,e.textContent=``,t===`error`){e.style.borderColor=`var(--clr-danger, #e74c3c)`;let t=document.createElement(`span`);t.style.color=`var(--clr-danger, #e74c3c)`,t.textContent=`\u2717 ${n}`,e.appendChild(t);return}e.style.borderColor=`var(--clr-success, #27ae60)`;let i=document.createElement(`div`);if(i.style.cssText=`color:var(--clr-success, #27ae60);font-weight:600;margin-bottom:0.5rem;`,i.textContent=`✓ Valid proof`,e.appendChild(i),r){let t=document.createElement(`div`);t.style.cssText=`font-size:0.75rem;color:var(--text-secondary,#aaa);`;let n=document.createElement(`div`);n.style.marginBottom=`0.25rem`;let i=document.createElement(`strong`);i.textContent=`Master pubkey: `;let a=document.createElement(`code`);a.style.wordBreak=`break-all`,a.textContent=r.masterPubkey,n.appendChild(i),n.appendChild(a);let o=document.createElement(`div`),s=document.createElement(`strong`);s.textContent=`Child pubkey: `;let c=document.createElement(`code`);c.style.wordBreak=`break-all`,c.textContent=r.childPubkey,o.appendChild(s),o.appendChild(c),t.appendChild(n),t.appendChild(o),e.appendChild(t)}}export{T as showProveOwnershipModal,D as showVerifyProofModal};