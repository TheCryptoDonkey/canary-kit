const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./maplibre-gl-DwUhsmFz.css"])))=>i.map(i=>d[i]);
(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function n(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(o){if(o.ep)return;o.ep=!0;const s=n(o);fetch(o.href,s)}})();const lu="modulepreload",du=function(e,t){return new URL(e,t).href},$i={},ke=function(t,n,r){let o=Promise.resolve();if(n&&n.length>0){let l=function(d){return Promise.all(d.map(u=>Promise.resolve(u).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};const i=document.getElementsByTagName("link"),a=document.querySelector("meta[property=csp-nonce]"),c=a?.nonce||a?.getAttribute("nonce");o=l(n.map(d=>{if(d=du(d,r),d in $i)return;$i[d]=!0;const u=d.endsWith(".css"),f=u?'[rel="stylesheet"]':"";if(r)for(let p=i.length-1;p>=0;p--){const m=i[p];if(m.href===d&&(!u||m.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${d}"]${f}`))return;const h=document.createElement("link");if(h.rel=u?"stylesheet":lu,u||(h.as="script"),h.crossOrigin="",h.href=d,c&&h.setAttribute("nonce",c),document.head.appendChild(h),u)return new Promise((p,m)=>{h.addEventListener("load",p),h.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${d}`)))})}))}function s(i){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=i,window.dispatchEvent(a),!a.defaultPrevented)throw i}return o.then(i=>{for(const a of i||[])a.status==="rejected"&&s(a.reason);return t().catch(s)})},et=["wss://relay.damus.io","wss://nos.lol","wss://relay.nostr.band"],qe="wss://relay.trotters.cc";function Br(e){return e.readRelays?.length>0||e.writeRelays?.length>0||e.relays?.length>0?"online":"offline"}function uu(e){try{const t=new URL(e);return t.pathname=t.pathname.replace(/\/+$/,""),t.toString()}catch{return e.replace(/\/+$/,"")}}function we(e){const t=new Set,n=[];for(const r of e){const o=uu(r);t.has(o)||(t.add(o),n.push(o))}return n}function fu(e){return we([...e.readRelays??[],...e.writeRelays??[],...e.relays??[]])}const hu={view:"groups",groups:{},activeGroupId:null,identity:null,settings:{theme:"dark",pinEnabled:!1,autoLockMinutes:5,defaultRelays:[qe],defaultReadRelays:[...et,qe],defaultWriteRelays:[qe]}};let ut=structuredClone(hu);const jo=new Set;function ys(){for(const e of jo)try{e()}catch(t){console.error("[canary:state] subscriber threw:",t)}}function R(){return ut}function ee(e){ut={...ut,...e},ys()}function W(e,t){const n=ut.groups[e];if(!n){console.warn(`[canary:state] updateGroup: unknown group id "${e}"`);return}ut={...ut,groups:{...ut.groups,[e]:{...n,...t}}},ys()}function gs(e){return jo.add(e),()=>{jo.delete(e)}}function Ya(e){ut=e,ys()}const pu=6e5,mu=16,Ho=12;async function Za(e,t){const n=await crypto.subtle.importKey("raw",new TextEncoder().encode(e),"PBKDF2",!1,["deriveKey"]);return crypto.subtle.deriveKey({name:"PBKDF2",salt:t,iterations:pu,hash:"SHA-256"},n,{name:"AES-GCM",length:256},!1,["encrypt","decrypt"])}async function yu(e,t){const n=crypto.getRandomValues(new Uint8Array(Ho)),r=await crypto.subtle.encrypt({name:"AES-GCM",iv:n},t,new TextEncoder().encode(e)),o=new Uint8Array(n.length+new Uint8Array(r).length);return o.set(n),o.set(new Uint8Array(r),n.length),btoa(String.fromCharCode(...o))}async function bs(e,t){const n=Uint8Array.from(atob(e),i=>i.charCodeAt(0)),r=n.slice(0,Ho),o=n.slice(Ho),s=await crypto.subtle.decrypt({name:"AES-GCM",iv:r},t,o);return new TextDecoder().decode(s)}function gu(){return crypto.getRandomValues(new Uint8Array(mu))}function bu(e){return btoa(String.fromCharCode(...e))}function Xa(e){return Uint8Array.from(atob(e),t=>t.charCodeAt(0))}function vs(e){return e instanceof Uint8Array||ArrayBuffer.isView(e)&&e.constructor.name==="Uint8Array"}function _e(e,t=""){if(!Number.isSafeInteger(e)||e<0){const n=t&&`"${t}" `;throw new Error(`${n}expected integer >= 0, got ${e}`)}}function H(e,t,n=""){const r=vs(e),o=e?.length,s=t!==void 0;if(!r||s&&o!==t){const i=n&&`"${n}" `,a=s?` of length ${t}`:"",c=r?`length=${o}`:`type=${typeof e}`;throw new Error(i+"expected Uint8Array"+a+", got "+c)}return e}function $n(e){if(typeof e!="function"||typeof e.create!="function")throw new Error("Hash must wrapped by utils.createHasher");_e(e.outputLen),_e(e.blockLen)}function yr(e,t=!0){if(e.destroyed)throw new Error("Hash instance has been destroyed");if(t&&e.finished)throw new Error("Hash#digest() has already been called")}function vu(e,t){H(e,void 0,"digestInto() output");const n=t.outputLen;if(e.length<n)throw new Error('"digestInto() output" expected to be of length >='+n)}function je(...e){for(let t=0;t<e.length;t++)e[t].fill(0)}function At(e){return new DataView(e.buffer,e.byteOffset,e.byteLength)}function $e(e,t){return e<<32-t|e>>>t}function Dn(e,t){return e<<t|e>>>32-t>>>0}const Qa=typeof Uint8Array.from([]).toHex=="function"&&typeof Uint8Array.fromHex=="function",wu=Array.from({length:256},(e,t)=>t.toString(16).padStart(2,"0"));function j(e){if(H(e),Qa)return e.toHex();let t="";for(let n=0;n<e.length;n++)t+=wu[e[n]];return t}const ze={_0:48,_9:57,A:65,F:70,a:97,f:102};function Mi(e){if(e>=ze._0&&e<=ze._9)return e-ze._0;if(e>=ze.A&&e<=ze.F)return e-(ze.A-10);if(e>=ze.a&&e<=ze.f)return e-(ze.a-10)}function z(e){if(typeof e!="string")throw new Error("hex string expected, got "+typeof e);if(Qa)return Uint8Array.fromHex(e);const t=e.length,n=t/2;if(t%2)throw new Error("hex string expected, got unpadded hex of length "+t);const r=new Uint8Array(n);for(let o=0,s=0;o<n;o++,s+=2){const i=Mi(e.charCodeAt(s)),a=Mi(e.charCodeAt(s+1));if(i===void 0||a===void 0){const c=e[s]+e[s+1];throw new Error('hex string expected, got non-hex character "'+c+'" at index '+s)}r[o]=i*16+a}return r}function Eu(e){if(typeof e!="string")throw new Error("string expected");return new Uint8Array(new TextEncoder().encode(e))}function Oi(e,t=""){return typeof e=="string"?Eu(e):H(e,void 0,t)}function oe(...e){let t=0;for(let r=0;r<e.length;r++){const o=e[r];H(o),t+=o.length}const n=new Uint8Array(t);for(let r=0,o=0;r<e.length;r++){const s=e[r];n.set(s,o),o+=s.length}return n}function ku(e,t){if(t!==void 0&&{}.toString.call(t)!=="[object Object]")throw new Error("options must be object or undefined");return Object.assign(e,t)}function ws(e,t={}){const n=(o,s)=>e(s).update(o).digest(),r=e(void 0);return n.outputLen=r.outputLen,n.blockLen=r.blockLen,n.create=o=>e(o),Object.assign(n,t),Object.freeze(n)}function vt(e=32){const t=typeof globalThis=="object"?globalThis.crypto:null;if(typeof t?.getRandomValues!="function")throw new Error("crypto.getRandomValues must be defined");return t.getRandomValues(new Uint8Array(e))}const ec=e=>({oid:Uint8Array.from([6,9,96,134,72,1,101,3,4,2,e])});class tc{oHash;iHash;blockLen;outputLen;finished=!1;destroyed=!1;constructor(t,n){if($n(t),H(n,void 0,"key"),this.iHash=t.create(),typeof this.iHash.update!="function")throw new Error("Expected instance of class which extends utils.Hash");this.blockLen=this.iHash.blockLen,this.outputLen=this.iHash.outputLen;const r=this.blockLen,o=new Uint8Array(r);o.set(n.length>r?t.create().update(n).digest():n);for(let s=0;s<o.length;s++)o[s]^=54;this.iHash.update(o),this.oHash=t.create();for(let s=0;s<o.length;s++)o[s]^=106;this.oHash.update(o),je(o)}update(t){return yr(this),this.iHash.update(t),this}digestInto(t){yr(this),H(t,this.outputLen,"output"),this.finished=!0,this.iHash.digestInto(t),this.oHash.update(t),this.oHash.digestInto(t),this.destroy()}digest(){const t=new Uint8Array(this.oHash.outputLen);return this.digestInto(t),t}_cloneInto(t){t||=Object.create(Object.getPrototypeOf(this),{});const{oHash:n,iHash:r,finished:o,destroyed:s,blockLen:i,outputLen:a}=this;return t=t,t.finished=o,t.destroyed=s,t.blockLen=i,t.outputLen=a,t.oHash=n._cloneInto(t.oHash),t.iHash=r._cloneInto(t.iHash),t}clone(){return this._cloneInto()}destroy(){this.destroyed=!0,this.oHash.destroy(),this.iHash.destroy()}}const tt=(e,t,n)=>new tc(e,t).update(n).digest();tt.create=(e,t)=>new tc(e,t);function _u(e,t,n,r){$n(e);const o=ku({dkLen:32,asyncTick:10},r),{c:s,dkLen:i,asyncTick:a}=o;if(_e(s,"c"),_e(i,"dkLen"),_e(a,"asyncTick"),s<1)throw new Error("iterations (c) must be >= 1");const c=Oi(t,"password"),l=Oi(n,"salt"),d=new Uint8Array(i),u=tt.create(e,c),f=u._cloneInto().update(l);return{c:s,dkLen:i,asyncTick:a,DK:d,PRF:u,PRFSalt:f}}function xu(e,t,n,r,o){return e.destroy(),t.destroy(),r&&r.destroy(),je(o),n}function Su(e,t,n,r){const{c:o,dkLen:s,DK:i,PRF:a,PRFSalt:c}=_u(e,t,n,r);let l;const d=new Uint8Array(4),u=At(d),f=new Uint8Array(a.outputLen);for(let h=1,p=0;p<s;h++,p+=a.outputLen){const m=i.subarray(p,p+a.outputLen);u.setInt32(0,h,!1),(l=c._cloneInto(l)).update(d).digestInto(f),m.set(f.subarray(0,m.length));for(let y=1;y<o;y++){a._cloneInto(l).update(f).digestInto(f);for(let E=0;E<m.length;E++)m[E]^=f[E]}}return xu(a,c,i,l,f)}function Iu(e,t,n){return e&t^~e&n}function Ru(e,t,n){return e&t^e&n^t&n}class Es{blockLen;outputLen;padOffset;isLE;buffer;view;finished=!1;length=0;pos=0;destroyed=!1;constructor(t,n,r,o){this.blockLen=t,this.outputLen=n,this.padOffset=r,this.isLE=o,this.buffer=new Uint8Array(t),this.view=At(this.buffer)}update(t){yr(this),H(t);const{view:n,buffer:r,blockLen:o}=this,s=t.length;for(let i=0;i<s;){const a=Math.min(o-this.pos,s-i);if(a===o){const c=At(t);for(;o<=s-i;i+=o)this.process(c,i);continue}r.set(t.subarray(i,i+a),this.pos),this.pos+=a,i+=a,this.pos===o&&(this.process(n,0),this.pos=0)}return this.length+=t.length,this.roundClean(),this}digestInto(t){yr(this),vu(t,this),this.finished=!0;const{buffer:n,view:r,blockLen:o,isLE:s}=this;let{pos:i}=this;n[i++]=128,je(this.buffer.subarray(i)),this.padOffset>o-i&&(this.process(r,0),i=0);for(let u=i;u<o;u++)n[u]=0;r.setBigUint64(o-8,BigInt(this.length*8),s),this.process(r,0);const a=At(t),c=this.outputLen;if(c%4)throw new Error("_sha2: outputLen must be aligned to 32bit");const l=c/4,d=this.get();if(l>d.length)throw new Error("_sha2: outputLen bigger than state");for(let u=0;u<l;u++)a.setUint32(4*u,d[u],s)}digest(){const{buffer:t,outputLen:n}=this;this.digestInto(t);const r=t.slice(0,n);return this.destroy(),r}_cloneInto(t){t||=new this.constructor,t.set(...this.get());const{blockLen:n,buffer:r,length:o,finished:s,destroyed:i,pos:a}=this;return t.destroyed=i,t.finished=s,t.length=o,t.pos=a,o%n&&t.buffer.set(r),t}clone(){return this._cloneInto()}}const rt=Uint32Array.from([1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225]),ce=Uint32Array.from([1779033703,4089235720,3144134277,2227873595,1013904242,4271175723,2773480762,1595750129,1359893119,2917565137,2600822924,725511199,528734635,4215389547,1541459225,327033209]),qn=BigInt(2**32-1),Bi=BigInt(32);function Au(e,t=!1){return t?{h:Number(e&qn),l:Number(e>>Bi&qn)}:{h:Number(e>>Bi&qn)|0,l:Number(e&qn)|0}}function Cu(e,t=!1){const n=e.length;let r=new Uint32Array(n),o=new Uint32Array(n);for(let s=0;s<n;s++){const{h:i,l:a}=Au(e[s],t);[r[s],o[s]]=[i,a]}return[r,o]}const Pi=(e,t,n)=>e>>>n,Ui=(e,t,n)=>e<<32-n|t>>>n,Mt=(e,t,n)=>e>>>n|t<<32-n,Ot=(e,t,n)=>e<<32-n|t>>>n,jn=(e,t,n)=>e<<64-n|t>>>n-32,Hn=(e,t,n)=>e>>>n-32|t<<64-n;function We(e,t,n,r){const o=(t>>>0)+(r>>>0);return{h:e+n+(o/2**32|0)|0,l:o|0}}const Tu=(e,t,n)=>(e>>>0)+(t>>>0)+(n>>>0),Lu=(e,t,n,r)=>t+n+r+(e/2**32|0)|0,Nu=(e,t,n,r)=>(e>>>0)+(t>>>0)+(n>>>0)+(r>>>0),$u=(e,t,n,r,o)=>t+n+r+o+(e/2**32|0)|0,Mu=(e,t,n,r,o)=>(e>>>0)+(t>>>0)+(n>>>0)+(r>>>0)+(o>>>0),Ou=(e,t,n,r,o,s)=>t+n+r+o+s+(e/2**32|0)|0,Bu=Uint32Array.from([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]),ot=new Uint32Array(64);class Pu extends Es{constructor(t){super(64,t,8,!1)}get(){const{A:t,B:n,C:r,D:o,E:s,F:i,G:a,H:c}=this;return[t,n,r,o,s,i,a,c]}set(t,n,r,o,s,i,a,c){this.A=t|0,this.B=n|0,this.C=r|0,this.D=o|0,this.E=s|0,this.F=i|0,this.G=a|0,this.H=c|0}process(t,n){for(let u=0;u<16;u++,n+=4)ot[u]=t.getUint32(n,!1);for(let u=16;u<64;u++){const f=ot[u-15],h=ot[u-2],p=$e(f,7)^$e(f,18)^f>>>3,m=$e(h,17)^$e(h,19)^h>>>10;ot[u]=m+ot[u-7]+p+ot[u-16]|0}let{A:r,B:o,C:s,D:i,E:a,F:c,G:l,H:d}=this;for(let u=0;u<64;u++){const f=$e(a,6)^$e(a,11)^$e(a,25),h=d+f+Iu(a,c,l)+Bu[u]+ot[u]|0,m=($e(r,2)^$e(r,13)^$e(r,22))+Ru(r,o,s)|0;d=l,l=c,c=a,a=i+h|0,i=s,s=o,o=r,r=h+m|0}r=r+this.A|0,o=o+this.B|0,s=s+this.C|0,i=i+this.D|0,a=a+this.E|0,c=c+this.F|0,l=l+this.G|0,d=d+this.H|0,this.set(r,o,s,i,a,c,l,d)}roundClean(){je(ot)}destroy(){this.set(0,0,0,0,0,0,0,0),je(this.buffer)}}class Uu extends Pu{A=rt[0]|0;B=rt[1]|0;C=rt[2]|0;D=rt[3]|0;E=rt[4]|0;F=rt[5]|0;G=rt[6]|0;H=rt[7]|0;constructor(){super(32)}}const nc=Cu(["0x428a2f98d728ae22","0x7137449123ef65cd","0xb5c0fbcfec4d3b2f","0xe9b5dba58189dbbc","0x3956c25bf348b538","0x59f111f1b605d019","0x923f82a4af194f9b","0xab1c5ed5da6d8118","0xd807aa98a3030242","0x12835b0145706fbe","0x243185be4ee4b28c","0x550c7dc3d5ffb4e2","0x72be5d74f27b896f","0x80deb1fe3b1696b1","0x9bdc06a725c71235","0xc19bf174cf692694","0xe49b69c19ef14ad2","0xefbe4786384f25e3","0x0fc19dc68b8cd5b5","0x240ca1cc77ac9c65","0x2de92c6f592b0275","0x4a7484aa6ea6e483","0x5cb0a9dcbd41fbd4","0x76f988da831153b5","0x983e5152ee66dfab","0xa831c66d2db43210","0xb00327c898fb213f","0xbf597fc7beef0ee4","0xc6e00bf33da88fc2","0xd5a79147930aa725","0x06ca6351e003826f","0x142929670a0e6e70","0x27b70a8546d22ffc","0x2e1b21385c26c926","0x4d2c6dfc5ac42aed","0x53380d139d95b3df","0x650a73548baf63de","0x766a0abb3c77b2a8","0x81c2c92e47edaee6","0x92722c851482353b","0xa2bfe8a14cf10364","0xa81a664bbc423001","0xc24b8b70d0f89791","0xc76c51a30654be30","0xd192e819d6ef5218","0xd69906245565a910","0xf40e35855771202a","0x106aa07032bbd1b8","0x19a4c116b8d2d0c8","0x1e376c085141ab53","0x2748774cdf8eeb99","0x34b0bcb5e19b48a8","0x391c0cb3c5c95a63","0x4ed8aa4ae3418acb","0x5b9cca4f7763e373","0x682e6ff3d6b2b8a3","0x748f82ee5defb2fc","0x78a5636f43172f60","0x84c87814a1f0ab72","0x8cc702081a6439ec","0x90befffa23631e28","0xa4506cebde82bde9","0xbef9a3f7b2c67915","0xc67178f2e372532b","0xca273eceea26619c","0xd186b8c721c0c207","0xeada7dd6cde0eb1e","0xf57d4f7fee6ed178","0x06f067aa72176fba","0x0a637dc5a2c898a6","0x113f9804bef90dae","0x1b710b35131c471b","0x28db77f523047d84","0x32caab7b40c72493","0x3c9ebe0a15c9bebc","0x431d67c49c100d4c","0x4cc5d4becb3e42b6","0x597f299cfc657e2a","0x5fcb6fab3ad6faec","0x6c44198c4a475817"].map(e=>BigInt(e))),Du=nc[0],qu=nc[1],st=new Uint32Array(80),it=new Uint32Array(80);class ju extends Es{constructor(t){super(128,t,16,!1)}get(){const{Ah:t,Al:n,Bh:r,Bl:o,Ch:s,Cl:i,Dh:a,Dl:c,Eh:l,El:d,Fh:u,Fl:f,Gh:h,Gl:p,Hh:m,Hl:y}=this;return[t,n,r,o,s,i,a,c,l,d,u,f,h,p,m,y]}set(t,n,r,o,s,i,a,c,l,d,u,f,h,p,m,y){this.Ah=t|0,this.Al=n|0,this.Bh=r|0,this.Bl=o|0,this.Ch=s|0,this.Cl=i|0,this.Dh=a|0,this.Dl=c|0,this.Eh=l|0,this.El=d|0,this.Fh=u|0,this.Fl=f|0,this.Gh=h|0,this.Gl=p|0,this.Hh=m|0,this.Hl=y|0}process(t,n){for(let L=0;L<16;L++,n+=4)st[L]=t.getUint32(n),it[L]=t.getUint32(n+=4);for(let L=16;L<80;L++){const O=st[L-15]|0,P=it[L-15]|0,$=Mt(O,P,1)^Mt(O,P,8)^Pi(O,P,7),v=Ot(O,P,1)^Ot(O,P,8)^Ui(O,P,7),b=st[L-2]|0,g=it[L-2]|0,k=Mt(b,g,19)^jn(b,g,61)^Pi(b,g,6),_=Ot(b,g,19)^Hn(b,g,61)^Ui(b,g,6),A=Nu(v,_,it[L-7],it[L-16]),w=$u(A,$,k,st[L-7],st[L-16]);st[L]=w|0,it[L]=A|0}let{Ah:r,Al:o,Bh:s,Bl:i,Ch:a,Cl:c,Dh:l,Dl:d,Eh:u,El:f,Fh:h,Fl:p,Gh:m,Gl:y,Hh:E,Hl:S}=this;for(let L=0;L<80;L++){const O=Mt(u,f,14)^Mt(u,f,18)^jn(u,f,41),P=Ot(u,f,14)^Ot(u,f,18)^Hn(u,f,41),$=u&h^~u&m,v=f&p^~f&y,b=Mu(S,P,v,qu[L],it[L]),g=Ou(b,E,O,$,Du[L],st[L]),k=b|0,_=Mt(r,o,28)^jn(r,o,34)^jn(r,o,39),A=Ot(r,o,28)^Hn(r,o,34)^Hn(r,o,39),w=r&s^r&a^s&a,I=o&i^o&c^i&c;E=m|0,S=y|0,m=h|0,y=p|0,h=u|0,p=f|0,{h:u,l:f}=We(l|0,d|0,g|0,k|0),l=a|0,d=c|0,a=s|0,c=i|0,s=r|0,i=o|0;const x=Tu(k,A,I);r=Lu(x,g,_,w),o=x|0}({h:r,l:o}=We(this.Ah|0,this.Al|0,r|0,o|0)),{h:s,l:i}=We(this.Bh|0,this.Bl|0,s|0,i|0),{h:a,l:c}=We(this.Ch|0,this.Cl|0,a|0,c|0),{h:l,l:d}=We(this.Dh|0,this.Dl|0,l|0,d|0),{h:u,l:f}=We(this.Eh|0,this.El|0,u|0,f|0),{h,l:p}=We(this.Fh|0,this.Fl|0,h|0,p|0),{h:m,l:y}=We(this.Gh|0,this.Gl|0,m|0,y|0),{h:E,l:S}=We(this.Hh|0,this.Hl|0,E|0,S|0),this.set(r,o,s,i,a,c,l,d,u,f,h,p,m,y,E,S)}roundClean(){je(st,it)}destroy(){je(this.buffer),this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)}}class Hu extends ju{Ah=ce[0]|0;Al=ce[1]|0;Bh=ce[2]|0;Bl=ce[3]|0;Ch=ce[4]|0;Cl=ce[5]|0;Dh=ce[6]|0;Dl=ce[7]|0;Eh=ce[8]|0;El=ce[9]|0;Fh=ce[10]|0;Fl=ce[11]|0;Gh=ce[12]|0;Gl=ce[13]|0;Hh=ce[14]|0;Hl=ce[15]|0;constructor(){super(64)}}const se=ws(()=>new Uu,ec(1)),Fo=ws(()=>new Hu,ec(3));function Jt(e){return e instanceof Uint8Array||ArrayBuffer.isView(e)&&e.constructor.name==="Uint8Array"}function Fu(e){if(!Jt(e))throw new Error("Uint8Array expected")}function rc(e,t){return Array.isArray(t)?t.length===0?!0:e?t.every(n=>typeof n=="string"):t.every(n=>Number.isSafeInteger(n)):!1}function oc(e){if(typeof e!="function")throw new Error("function expected");return!0}function Tt(e,t){if(typeof t!="string")throw new Error(`${e}: string expected`);return!0}function tn(e){if(!Number.isSafeInteger(e))throw new Error(`invalid integer: ${e}`)}function gr(e){if(!Array.isArray(e))throw new Error("array expected")}function br(e,t){if(!rc(!0,t))throw new Error(`${e}: array of strings expected`)}function ks(e,t){if(!rc(!1,t))throw new Error(`${e}: array of numbers expected`)}function Mn(...e){const t=s=>s,n=(s,i)=>a=>s(i(a)),r=e.map(s=>s.encode).reduceRight(n,t),o=e.map(s=>s.decode).reduce(n,t);return{encode:r,decode:o}}function Pr(e){const t=typeof e=="string"?e.split(""):e,n=t.length;br("alphabet",t);const r=new Map(t.map((o,s)=>[o,s]));return{encode:o=>(gr(o),o.map(s=>{if(!Number.isSafeInteger(s)||s<0||s>=n)throw new Error(`alphabet.encode: digit index outside alphabet "${s}". Allowed: ${e}`);return t[s]})),decode:o=>(gr(o),o.map(s=>{Tt("alphabet.decode",s);const i=r.get(s);if(i===void 0)throw new Error(`Unknown letter: "${s}". Allowed: ${e}`);return i}))}}function Ur(e=""){return Tt("join",e),{encode:t=>(br("join.decode",t),t.join(e)),decode:t=>(Tt("join.decode",t),t.split(e))}}function sc(e,t="="){return tn(e),Tt("padding",t),{encode(n){for(br("padding.encode",n);n.length*e%8;)n.push(t);return n},decode(n){br("padding.decode",n);let r=n.length;if(r*e%8)throw new Error("padding: invalid, string should have whole number of bytes");for(;r>0&&n[r-1]===t;r--)if((r-1)*e%8===0)throw new Error("padding: invalid, string has too much padding");return n.slice(0,r)}}}function Go(e,t,n){if(t<2)throw new Error(`convertRadix: invalid from=${t}, base cannot be less than 2`);if(n<2)throw new Error(`convertRadix: invalid to=${n}, base cannot be less than 2`);if(gr(e),!e.length)return[];let r=0;const o=[],s=Array.from(e,a=>{if(tn(a),a<0||a>=t)throw new Error(`invalid integer: ${a}`);return a}),i=s.length;for(;;){let a=0,c=!0;for(let l=r;l<i;l++){const d=s[l],u=t*a,f=u+d;if(!Number.isSafeInteger(f)||u/t!==a||f-d!==u)throw new Error("convertRadix: carry overflow");const h=f/n;a=f%n;const p=Math.floor(h);if(s[l]=p,!Number.isSafeInteger(p)||p*n+a!==f)throw new Error("convertRadix: carry overflow");if(c)p?c=!1:r=l;else continue}if(o.push(a),c)break}for(let a=0;a<e.length-1&&e[a]===0;a++)o.push(0);return o.reverse()}const ic=(e,t)=>t===0?e:ic(t,e%t),vr=(e,t)=>e+(t-ic(e,t)),or=(()=>{let e=[];for(let t=0;t<40;t++)e.push(2**t);return e})();function wr(e,t,n,r){if(gr(e),t<=0||t>32)throw new Error(`convertRadix2: wrong from=${t}`);if(n<=0||n>32)throw new Error(`convertRadix2: wrong to=${n}`);if(vr(t,n)>32)throw new Error(`convertRadix2: carry overflow from=${t} to=${n} carryBits=${vr(t,n)}`);let o=0,s=0;const i=or[t],a=or[n]-1,c=[];for(const l of e){if(tn(l),l>=i)throw new Error(`convertRadix2: invalid data word=${l} from=${t}`);if(o=o<<t|l,s+t>32)throw new Error(`convertRadix2: carry overflow pos=${s} from=${t}`);for(s+=t;s>=n;s-=n)c.push((o>>s-n&a)>>>0);const d=or[s];if(d===void 0)throw new Error("invalid carry");o&=d-1}if(o=o<<n-s&a,!r&&s>=t)throw new Error("Excess padding");if(!r&&o>0)throw new Error(`Non-zero padding: ${o}`);return r&&s>0&&c.push(o>>>0),c}function ac(e){tn(e);const t=2**8;return{encode:n=>{if(!Jt(n))throw new Error("radix.encode input should be Uint8Array");return Go(Array.from(n),t,e)},decode:n=>(ks("radix.decode",n),Uint8Array.from(Go(n,e,t)))}}function _s(e,t=!1){if(tn(e),e<=0||e>32)throw new Error("radix2: bits should be in (0..32]");if(vr(8,e)>32||vr(e,8)>32)throw new Error("radix2: carry overflow");return{encode:n=>{if(!Jt(n))throw new Error("radix2.encode input should be Uint8Array");return wr(Array.from(n),8,e,!t)},decode:n=>(ks("radix2.decode",n),Uint8Array.from(wr(n,e,8,t)))}}function Di(e){return oc(e),function(...t){try{return e.apply(null,t)}catch{}}}function cc(e,t){return tn(e),oc(t),{encode(n){if(!Jt(n))throw new Error("checksum.encode: input should be Uint8Array");const r=t(n).slice(0,e),o=new Uint8Array(n.length+e);return o.set(n),o.set(r,n.length),o},decode(n){if(!Jt(n))throw new Error("checksum.decode: input should be Uint8Array");const r=n.slice(0,-e),o=n.slice(-e),s=t(r).slice(0,e);for(let i=0;i<e;i++)if(s[i]!==o[i])throw new Error("Invalid checksum");return r}}}const Fn={alphabet:Pr,chain:Mn,checksum:cc,convertRadix:Go,convertRadix2:wr,radix:ac,radix2:_s,join:Ur,padding:sc},Gu=typeof Uint8Array.from([]).toBase64=="function"&&typeof Uint8Array.fromBase64=="function",Ku=(e,t)=>{Tt("base64",e);const n=/^[A-Za-z0-9=+/]+$/,r="base64";if(e.length>0&&!n.test(e))throw new Error("invalid base64");return Uint8Array.fromBase64(e,{alphabet:r,lastChunkHandling:"strict"})},He=Gu?{encode(e){return Fu(e),e.toBase64()},decode(e){return Ku(e)}}:Mn(_s(6),Pr("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"),sc(6),Ur("")),Vu=e=>Mn(ac(58),Pr(e),Ur("")),zu=Vu("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"),Wu=e=>Mn(cc(4,t=>e(e(t))),zu),Ko=Mn(Pr("qpzry9x8gf2tvdw0s3jn54khce6mua7l"),Ur("")),qi=[996825010,642813549,513874426,1027748829,705979059];function cn(e){const t=e>>25;let n=(e&33554431)<<5;for(let r=0;r<qi.length;r++)(t>>r&1)===1&&(n^=qi[r]);return n}function ji(e,t,n=1){const r=e.length;let o=1;for(let s=0;s<r;s++){const i=e.charCodeAt(s);if(i<33||i>126)throw new Error(`Invalid prefix (${e})`);o=cn(o)^i>>5}o=cn(o);for(let s=0;s<r;s++)o=cn(o)^e.charCodeAt(s)&31;for(let s of t)o=cn(o)^s;for(let s=0;s<6;s++)o=cn(o);return o^=n,Ko.encode(wr([o%or[30]],30,5,!1))}function Ju(e){const t=e==="bech32"?1:734539939,n=_s(5),r=n.decode,o=n.encode,s=Di(r);function i(u,f,h=90){Tt("bech32.encode prefix",u),Jt(f)&&(f=Array.from(f)),ks("bech32.encode",f);const p=u.length;if(p===0)throw new TypeError(`Invalid prefix length ${p}`);const m=p+7+f.length;if(h!==!1&&m>h)throw new TypeError(`Length ${m} exceeds limit ${h}`);const y=u.toLowerCase(),E=ji(y,f,t);return`${y}1${Ko.encode(f)}${E}`}function a(u,f=90){Tt("bech32.decode input",u);const h=u.length;if(h<8||f!==!1&&h>f)throw new TypeError(`invalid string length: ${h} (${u}). Expected (8..${f})`);const p=u.toLowerCase();if(u!==p&&u!==u.toUpperCase())throw new Error("String must be lowercase or uppercase");const m=p.lastIndexOf("1");if(m===0||m===-1)throw new Error('Letter "1" must be present between prefix and data only');const y=p.slice(0,m),E=p.slice(m+1);if(E.length<6)throw new Error("Data must be at least 6 characters long");const S=Ko.decode(E).slice(0,-6),L=ji(y,S,t);if(!E.endsWith(L))throw new Error(`Invalid checksum in ${u}: expected "${L}"`);return{prefix:y,words:S}}const c=Di(a);function l(u){const{prefix:f,words:h}=a(u,!1);return{prefix:f,words:h,bytes:r(h)}}function d(u,f){return i(u,o(f))}return{encode:i,decode:a,encodeFromBytes:d,decodeToBytes:l,decodeUnsafe:c,fromWords:r,fromWordsUnsafe:s,toWords:o}}const Fe=Ju("bech32");const Yu=e=>e[0]==="あいこくしん";function lc(e){if(typeof e!="string")throw new TypeError("invalid mnemonic type: "+typeof e);return e.normalize("NFKD")}function dc(e){const t=lc(e),n=t.split(" ");if(![12,15,18,21,24].includes(n.length))throw new Error("Invalid mnemonic");return{nfkd:t,words:n}}function uc(e){if(H(e),![16,20,24,28,32].includes(e.length))throw new Error("invalid entropy length")}function Zu(e,t=128){if(_e(t),t%32!==0||t>256)throw new TypeError("Invalid entropy");return ef(vt(t/8),e)}const Xu=e=>{const t=8-e.length/4;return new Uint8Array([se(e)[0]>>t<<t])};function fc(e){if(!Array.isArray(e)||e.length!==2048||typeof e[0]!="string")throw new Error("Wordlist: expected array of 2048 strings");return e.forEach(t=>{if(typeof t!="string")throw new Error("wordlist: non-string element: "+t)}),Fn.chain(Fn.checksum(1,Xu),Fn.radix2(11,!0),Fn.alphabet(e))}function Qu(e,t){const{words:n}=dc(e),r=fc(t).decode(n);return uc(r),r}function ef(e,t){return uc(e),fc(t).encode(e).join(Yu(t)?"　":" ")}function tf(e,t){try{Qu(e,t)}catch{return!1}return!0}const nf=e=>lc("mnemonic"+e);function rf(e,t=""){return Su(Fo,dc(e).nfkd,nf(t),{c:2048,dkLen:64})}const hc=`abandon
ability
able
about
above
absent
absorb
abstract
absurd
abuse
access
accident
account
accuse
achieve
acid
acoustic
acquire
across
act
action
actor
actress
actual
adapt
add
addict
address
adjust
admit
adult
advance
advice
aerobic
affair
afford
afraid
again
age
agent
agree
ahead
aim
air
airport
aisle
alarm
album
alcohol
alert
alien
all
alley
allow
almost
alone
alpha
already
also
alter
always
amateur
amazing
among
amount
amused
analyst
anchor
ancient
anger
angle
angry
animal
ankle
announce
annual
another
answer
antenna
antique
anxiety
any
apart
apology
appear
apple
approve
april
arch
arctic
area
arena
argue
arm
armed
armor
army
around
arrange
arrest
arrive
arrow
art
artefact
artist
artwork
ask
aspect
assault
asset
assist
assume
asthma
athlete
atom
attack
attend
attitude
attract
auction
audit
august
aunt
author
auto
autumn
average
avocado
avoid
awake
aware
away
awesome
awful
awkward
axis
baby
bachelor
bacon
badge
bag
balance
balcony
ball
bamboo
banana
banner
bar
barely
bargain
barrel
base
basic
basket
battle
beach
bean
beauty
because
become
beef
before
begin
behave
behind
believe
below
belt
bench
benefit
best
betray
better
between
beyond
bicycle
bid
bike
bind
biology
bird
birth
bitter
black
blade
blame
blanket
blast
bleak
bless
blind
blood
blossom
blouse
blue
blur
blush
board
boat
body
boil
bomb
bone
bonus
book
boost
border
boring
borrow
boss
bottom
bounce
box
boy
bracket
brain
brand
brass
brave
bread
breeze
brick
bridge
brief
bright
bring
brisk
broccoli
broken
bronze
broom
brother
brown
brush
bubble
buddy
budget
buffalo
build
bulb
bulk
bullet
bundle
bunker
burden
burger
burst
bus
business
busy
butter
buyer
buzz
cabbage
cabin
cable
cactus
cage
cake
call
calm
camera
camp
can
canal
cancel
candy
cannon
canoe
canvas
canyon
capable
capital
captain
car
carbon
card
cargo
carpet
carry
cart
case
cash
casino
castle
casual
cat
catalog
catch
category
cattle
caught
cause
caution
cave
ceiling
celery
cement
census
century
cereal
certain
chair
chalk
champion
change
chaos
chapter
charge
chase
chat
cheap
check
cheese
chef
cherry
chest
chicken
chief
child
chimney
choice
choose
chronic
chuckle
chunk
churn
cigar
cinnamon
circle
citizen
city
civil
claim
clap
clarify
claw
clay
clean
clerk
clever
click
client
cliff
climb
clinic
clip
clock
clog
close
cloth
cloud
clown
club
clump
cluster
clutch
coach
coast
coconut
code
coffee
coil
coin
collect
color
column
combine
come
comfort
comic
common
company
concert
conduct
confirm
congress
connect
consider
control
convince
cook
cool
copper
copy
coral
core
corn
correct
cost
cotton
couch
country
couple
course
cousin
cover
coyote
crack
cradle
craft
cram
crane
crash
crater
crawl
crazy
cream
credit
creek
crew
cricket
crime
crisp
critic
crop
cross
crouch
crowd
crucial
cruel
cruise
crumble
crunch
crush
cry
crystal
cube
culture
cup
cupboard
curious
current
curtain
curve
cushion
custom
cute
cycle
dad
damage
damp
dance
danger
daring
dash
daughter
dawn
day
deal
debate
debris
decade
december
decide
decline
decorate
decrease
deer
defense
define
defy
degree
delay
deliver
demand
demise
denial
dentist
deny
depart
depend
deposit
depth
deputy
derive
describe
desert
design
desk
despair
destroy
detail
detect
develop
device
devote
diagram
dial
diamond
diary
dice
diesel
diet
differ
digital
dignity
dilemma
dinner
dinosaur
direct
dirt
disagree
discover
disease
dish
dismiss
disorder
display
distance
divert
divide
divorce
dizzy
doctor
document
dog
doll
dolphin
domain
donate
donkey
donor
door
dose
double
dove
draft
dragon
drama
drastic
draw
dream
dress
drift
drill
drink
drip
drive
drop
drum
dry
duck
dumb
dune
during
dust
dutch
duty
dwarf
dynamic
eager
eagle
early
earn
earth
easily
east
easy
echo
ecology
economy
edge
edit
educate
effort
egg
eight
either
elbow
elder
electric
elegant
element
elephant
elevator
elite
else
embark
embody
embrace
emerge
emotion
employ
empower
empty
enable
enact
end
endless
endorse
enemy
energy
enforce
engage
engine
enhance
enjoy
enlist
enough
enrich
enroll
ensure
enter
entire
entry
envelope
episode
equal
equip
era
erase
erode
erosion
error
erupt
escape
essay
essence
estate
eternal
ethics
evidence
evil
evoke
evolve
exact
example
excess
exchange
excite
exclude
excuse
execute
exercise
exhaust
exhibit
exile
exist
exit
exotic
expand
expect
expire
explain
expose
express
extend
extra
eye
eyebrow
fabric
face
faculty
fade
faint
faith
fall
false
fame
family
famous
fan
fancy
fantasy
farm
fashion
fat
fatal
father
fatigue
fault
favorite
feature
february
federal
fee
feed
feel
female
fence
festival
fetch
fever
few
fiber
fiction
field
figure
file
film
filter
final
find
fine
finger
finish
fire
firm
first
fiscal
fish
fit
fitness
fix
flag
flame
flash
flat
flavor
flee
flight
flip
float
flock
floor
flower
fluid
flush
fly
foam
focus
fog
foil
fold
follow
food
foot
force
forest
forget
fork
fortune
forum
forward
fossil
foster
found
fox
fragile
frame
frequent
fresh
friend
fringe
frog
front
frost
frown
frozen
fruit
fuel
fun
funny
furnace
fury
future
gadget
gain
galaxy
gallery
game
gap
garage
garbage
garden
garlic
garment
gas
gasp
gate
gather
gauge
gaze
general
genius
genre
gentle
genuine
gesture
ghost
giant
gift
giggle
ginger
giraffe
girl
give
glad
glance
glare
glass
glide
glimpse
globe
gloom
glory
glove
glow
glue
goat
goddess
gold
good
goose
gorilla
gospel
gossip
govern
gown
grab
grace
grain
grant
grape
grass
gravity
great
green
grid
grief
grit
grocery
group
grow
grunt
guard
guess
guide
guilt
guitar
gun
gym
habit
hair
half
hammer
hamster
hand
happy
harbor
hard
harsh
harvest
hat
have
hawk
hazard
head
health
heart
heavy
hedgehog
height
hello
helmet
help
hen
hero
hidden
high
hill
hint
hip
hire
history
hobby
hockey
hold
hole
holiday
hollow
home
honey
hood
hope
horn
horror
horse
hospital
host
hotel
hour
hover
hub
huge
human
humble
humor
hundred
hungry
hunt
hurdle
hurry
hurt
husband
hybrid
ice
icon
idea
identify
idle
ignore
ill
illegal
illness
image
imitate
immense
immune
impact
impose
improve
impulse
inch
include
income
increase
index
indicate
indoor
industry
infant
inflict
inform
inhale
inherit
initial
inject
injury
inmate
inner
innocent
input
inquiry
insane
insect
inside
inspire
install
intact
interest
into
invest
invite
involve
iron
island
isolate
issue
item
ivory
jacket
jaguar
jar
jazz
jealous
jeans
jelly
jewel
job
join
joke
journey
joy
judge
juice
jump
jungle
junior
junk
just
kangaroo
keen
keep
ketchup
key
kick
kid
kidney
kind
kingdom
kiss
kit
kitchen
kite
kitten
kiwi
knee
knife
knock
know
lab
label
labor
ladder
lady
lake
lamp
language
laptop
large
later
latin
laugh
laundry
lava
law
lawn
lawsuit
layer
lazy
leader
leaf
learn
leave
lecture
left
leg
legal
legend
leisure
lemon
lend
length
lens
leopard
lesson
letter
level
liar
liberty
library
license
life
lift
light
like
limb
limit
link
lion
liquid
list
little
live
lizard
load
loan
lobster
local
lock
logic
lonely
long
loop
lottery
loud
lounge
love
loyal
lucky
luggage
lumber
lunar
lunch
luxury
lyrics
machine
mad
magic
magnet
maid
mail
main
major
make
mammal
man
manage
mandate
mango
mansion
manual
maple
marble
march
margin
marine
market
marriage
mask
mass
master
match
material
math
matrix
matter
maximum
maze
meadow
mean
measure
meat
mechanic
medal
media
melody
melt
member
memory
mention
menu
mercy
merge
merit
merry
mesh
message
metal
method
middle
midnight
milk
million
mimic
mind
minimum
minor
minute
miracle
mirror
misery
miss
mistake
mix
mixed
mixture
mobile
model
modify
mom
moment
monitor
monkey
monster
month
moon
moral
more
morning
mosquito
mother
motion
motor
mountain
mouse
move
movie
much
muffin
mule
multiply
muscle
museum
mushroom
music
must
mutual
myself
mystery
myth
naive
name
napkin
narrow
nasty
nation
nature
near
neck
need
negative
neglect
neither
nephew
nerve
nest
net
network
neutral
never
news
next
nice
night
noble
noise
nominee
noodle
normal
north
nose
notable
note
nothing
notice
novel
now
nuclear
number
nurse
nut
oak
obey
object
oblige
obscure
observe
obtain
obvious
occur
ocean
october
odor
off
offer
office
often
oil
okay
old
olive
olympic
omit
once
one
onion
online
only
open
opera
opinion
oppose
option
orange
orbit
orchard
order
ordinary
organ
orient
original
orphan
ostrich
other
outdoor
outer
output
outside
oval
oven
over
own
owner
oxygen
oyster
ozone
pact
paddle
page
pair
palace
palm
panda
panel
panic
panther
paper
parade
parent
park
parrot
party
pass
patch
path
patient
patrol
pattern
pause
pave
payment
peace
peanut
pear
peasant
pelican
pen
penalty
pencil
people
pepper
perfect
permit
person
pet
phone
photo
phrase
physical
piano
picnic
picture
piece
pig
pigeon
pill
pilot
pink
pioneer
pipe
pistol
pitch
pizza
place
planet
plastic
plate
play
please
pledge
pluck
plug
plunge
poem
poet
point
polar
pole
police
pond
pony
pool
popular
portion
position
possible
post
potato
pottery
poverty
powder
power
practice
praise
predict
prefer
prepare
present
pretty
prevent
price
pride
primary
print
priority
prison
private
prize
problem
process
produce
profit
program
project
promote
proof
property
prosper
protect
proud
provide
public
pudding
pull
pulp
pulse
pumpkin
punch
pupil
puppy
purchase
purity
purpose
purse
push
put
puzzle
pyramid
quality
quantum
quarter
question
quick
quit
quiz
quote
rabbit
raccoon
race
rack
radar
radio
rail
rain
raise
rally
ramp
ranch
random
range
rapid
rare
rate
rather
raven
raw
razor
ready
real
reason
rebel
rebuild
recall
receive
recipe
record
recycle
reduce
reflect
reform
refuse
region
regret
regular
reject
relax
release
relief
rely
remain
remember
remind
remove
render
renew
rent
reopen
repair
repeat
replace
report
require
rescue
resemble
resist
resource
response
result
retire
retreat
return
reunion
reveal
review
reward
rhythm
rib
ribbon
rice
rich
ride
ridge
rifle
right
rigid
ring
riot
ripple
risk
ritual
rival
river
road
roast
robot
robust
rocket
romance
roof
rookie
room
rose
rotate
rough
round
route
royal
rubber
rude
rug
rule
run
runway
rural
sad
saddle
sadness
safe
sail
salad
salmon
salon
salt
salute
same
sample
sand
satisfy
satoshi
sauce
sausage
save
say
scale
scan
scare
scatter
scene
scheme
school
science
scissors
scorpion
scout
scrap
screen
script
scrub
sea
search
season
seat
second
secret
section
security
seed
seek
segment
select
sell
seminar
senior
sense
sentence
series
service
session
settle
setup
seven
shadow
shaft
shallow
share
shed
shell
sheriff
shield
shift
shine
ship
shiver
shock
shoe
shoot
shop
short
shoulder
shove
shrimp
shrug
shuffle
shy
sibling
sick
side
siege
sight
sign
silent
silk
silly
silver
similar
simple
since
sing
siren
sister
situate
six
size
skate
sketch
ski
skill
skin
skirt
skull
slab
slam
sleep
slender
slice
slide
slight
slim
slogan
slot
slow
slush
small
smart
smile
smoke
smooth
snack
snake
snap
sniff
snow
soap
soccer
social
sock
soda
soft
solar
soldier
solid
solution
solve
someone
song
soon
sorry
sort
soul
sound
soup
source
south
space
spare
spatial
spawn
speak
special
speed
spell
spend
sphere
spice
spider
spike
spin
spirit
split
spoil
sponsor
spoon
sport
spot
spray
spread
spring
spy
square
squeeze
squirrel
stable
stadium
staff
stage
stairs
stamp
stand
start
state
stay
steak
steel
stem
step
stereo
stick
still
sting
stock
stomach
stone
stool
story
stove
strategy
street
strike
strong
struggle
student
stuff
stumble
style
subject
submit
subway
success
such
sudden
suffer
sugar
suggest
suit
summer
sun
sunny
sunset
super
supply
supreme
sure
surface
surge
surprise
surround
survey
suspect
sustain
swallow
swamp
swap
swarm
swear
sweet
swift
swim
swing
switch
sword
symbol
symptom
syrup
system
table
tackle
tag
tail
talent
talk
tank
tape
target
task
taste
tattoo
taxi
teach
team
tell
ten
tenant
tennis
tent
term
test
text
thank
that
theme
then
theory
there
they
thing
this
thought
three
thrive
throw
thumb
thunder
ticket
tide
tiger
tilt
timber
time
tiny
tip
tired
tissue
title
toast
tobacco
today
toddler
toe
together
toilet
token
tomato
tomorrow
tone
tongue
tonight
tool
tooth
top
topic
topple
torch
tornado
tortoise
toss
total
tourist
toward
tower
town
toy
track
trade
traffic
tragic
train
transfer
trap
trash
travel
tray
treat
tree
trend
trial
tribe
trick
trigger
trim
trip
trophy
trouble
truck
true
truly
trumpet
trust
truth
try
tube
tuition
tumble
tuna
tunnel
turkey
turn
turtle
twelve
twenty
twice
twin
twist
two
type
typical
ugly
umbrella
unable
unaware
uncle
uncover
under
undo
unfair
unfold
unhappy
uniform
unique
unit
universe
unknown
unlock
until
unusual
unveil
update
upgrade
uphold
upon
upper
upset
urban
urge
usage
use
used
useful
useless
usual
utility
vacant
vacuum
vague
valid
valley
valve
van
vanish
vapor
various
vast
vault
vehicle
velvet
vendor
venture
venue
verb
verify
version
very
vessel
veteran
viable
vibrant
vicious
victory
video
view
village
vintage
violin
virtual
virus
visa
visit
visual
vital
vivid
vocal
voice
void
volcano
volume
vote
voyage
wage
wagon
wait
walk
wall
walnut
want
warfare
warm
warrior
wash
wasp
waste
water
wave
way
wealth
weapon
wear
weasel
weather
web
wedding
weekend
weird
welcome
west
wet
whale
what
wheat
wheel
when
where
whip
whisper
wide
width
wife
wild
will
win
window
wine
wing
wink
winner
winter
wire
wisdom
wise
wish
witness
wolf
woman
wonder
wood
wool
word
work
world
worry
worth
wrap
wreck
wrestle
wrist
write
wrong
yard
year
yellow
you
young
youth
zebra
zero
zone
zoo`.split(`
`);const xs=BigInt(0),Vo=BigInt(1);function Er(e,t=""){if(typeof e!="boolean"){const n=t&&`"${t}" `;throw new Error(n+"expected boolean, got type="+typeof e)}return e}function pc(e){if(typeof e=="bigint"){if(!sr(e))throw new Error("positive bigint expected, got "+e)}else _e(e);return e}function Gn(e){const t=pc(e).toString(16);return t.length&1?"0"+t:t}function mc(e){if(typeof e!="string")throw new Error("hex string expected, got "+typeof e);return e===""?xs:BigInt("0x"+e)}function On(e){return mc(j(e))}function yc(e){return mc(j(of(H(e)).reverse()))}function Ss(e,t){_e(t),e=pc(e);const n=z(e.toString(16).padStart(t*2,"0"));if(n.length!==t)throw new Error("number too large");return n}function gc(e,t){return Ss(e,t).reverse()}function of(e){return Uint8Array.from(e)}function sf(e){return Uint8Array.from(e,(t,n)=>{const r=t.charCodeAt(0);if(t.length!==1||r>127)throw new Error(`string contains non-ASCII character "${e[n]}" with code ${r} at position ${n}`);return r})}const sr=e=>typeof e=="bigint"&&xs<=e;function af(e,t,n){return sr(e)&&sr(t)&&sr(n)&&t<=e&&e<n}function cf(e,t,n,r){if(!af(t,n,r))throw new Error("expected valid "+e+": "+n+" <= n < "+r+", got "+t)}function lf(e){let t;for(t=0;e>xs;e>>=Vo,t+=1);return t}const Is=e=>(Vo<<BigInt(e))-Vo;function df(e,t,n){if(_e(e,"hashLen"),_e(t,"qByteLen"),typeof n!="function")throw new Error("hmacFn must be a function");const r=y=>new Uint8Array(y),o=Uint8Array.of(),s=Uint8Array.of(0),i=Uint8Array.of(1),a=1e3;let c=r(e),l=r(e),d=0;const u=()=>{c.fill(1),l.fill(0),d=0},f=(...y)=>n(l,oe(c,...y)),h=(y=o)=>{l=f(s,y),c=f(),y.length!==0&&(l=f(i,y),c=f())},p=()=>{if(d++>=a)throw new Error("drbg: tried max amount of iterations");let y=0;const E=[];for(;y<t;){c=f();const S=c.slice();E.push(S),y+=c.length}return oe(...E)};return(y,E)=>{u(),h(y);let S;for(;!(S=E(p()));)h();return u(),S}}function Rs(e,t={},n={}){if(!e||typeof e!="object")throw new Error("expected valid options object");function r(s,i,a){const c=e[s];if(a&&c===void 0)return;const l=typeof c;if(l!==i||c===null)throw new Error(`param "${s}" is invalid: expected ${i}, got ${l}`)}const o=(s,i)=>Object.entries(s).forEach(([a,c])=>r(a,c,i));o(t,!1),o(n,!0)}function Hi(e){const t=new WeakMap;return(n,...r)=>{const o=t.get(n);if(o!==void 0)return o;const s=e(n,...r);return t.set(n,s),s}}const me=BigInt(0),fe=BigInt(1),St=BigInt(2),bc=BigInt(3),vc=BigInt(4),wc=BigInt(5),uf=BigInt(7),Ec=BigInt(8),ff=BigInt(9),kc=BigInt(16);function Ie(e,t){const n=e%t;return n>=me?n:t+n}function be(e,t,n){let r=e;for(;t-- >me;)r*=r,r%=n;return r}function Fi(e,t){if(e===me)throw new Error("invert: expected non-zero number");if(t<=me)throw new Error("invert: expected positive modulus, got "+t);let n=Ie(e,t),r=t,o=me,s=fe;for(;n!==me;){const a=r/n,c=r%n,l=o-s*a;r=n,n=c,o=s,s=l}if(r!==fe)throw new Error("invert: does not exist");return Ie(o,t)}function As(e,t,n){if(!e.eql(e.sqr(t),n))throw new Error("Cannot find square root")}function _c(e,t){const n=(e.ORDER+fe)/vc,r=e.pow(t,n);return As(e,r,t),r}function hf(e,t){const n=(e.ORDER-wc)/Ec,r=e.mul(t,St),o=e.pow(r,n),s=e.mul(t,o),i=e.mul(e.mul(s,St),o),a=e.mul(s,e.sub(i,e.ONE));return As(e,a,t),a}function pf(e){const t=Dr(e),n=xc(e),r=n(t,t.neg(t.ONE)),o=n(t,r),s=n(t,t.neg(r)),i=(e+uf)/kc;return(a,c)=>{let l=a.pow(c,i),d=a.mul(l,r);const u=a.mul(l,o),f=a.mul(l,s),h=a.eql(a.sqr(d),c),p=a.eql(a.sqr(u),c);l=a.cmov(l,d,h),d=a.cmov(f,u,p);const m=a.eql(a.sqr(d),c),y=a.cmov(l,d,m);return As(a,y,c),y}}function xc(e){if(e<bc)throw new Error("sqrt is not defined for small field");let t=e-fe,n=0;for(;t%St===me;)t/=St,n++;let r=St;const o=Dr(e);for(;Gi(o,r)===1;)if(r++>1e3)throw new Error("Cannot find square root: probably non-prime P");if(n===1)return _c;let s=o.pow(r,t);const i=(t+fe)/St;return function(c,l){if(c.is0(l))return l;if(Gi(c,l)!==1)throw new Error("Cannot find square root");let d=n,u=c.mul(c.ONE,s),f=c.pow(l,t),h=c.pow(l,i);for(;!c.eql(f,c.ONE);){if(c.is0(f))return c.ZERO;let p=1,m=c.sqr(f);for(;!c.eql(m,c.ONE);)if(p++,m=c.sqr(m),p===d)throw new Error("Cannot find square root");const y=fe<<BigInt(d-p-1),E=c.pow(u,y);d=p,u=c.sqr(E),f=c.mul(f,u),h=c.mul(h,E)}return h}}function mf(e){return e%vc===bc?_c:e%Ec===wc?hf:e%kc===ff?pf(e):xc(e)}const yf=["create","isValid","is0","neg","inv","sqrt","sqr","eql","add","sub","mul","pow","div","addN","subN","mulN","sqrN"];function gf(e){const t={ORDER:"bigint",BYTES:"number",BITS:"number"},n=yf.reduce((r,o)=>(r[o]="function",r),t);return Rs(e,n),e}function bf(e,t,n){if(n<me)throw new Error("invalid exponent, negatives unsupported");if(n===me)return e.ONE;if(n===fe)return t;let r=e.ONE,o=t;for(;n>me;)n&fe&&(r=e.mul(r,o)),o=e.sqr(o),n>>=fe;return r}function Sc(e,t,n=!1){const r=new Array(t.length).fill(n?e.ZERO:void 0),o=t.reduce((i,a,c)=>e.is0(a)?i:(r[c]=i,e.mul(i,a)),e.ONE),s=e.inv(o);return t.reduceRight((i,a,c)=>e.is0(a)?i:(r[c]=e.mul(i,r[c]),e.mul(i,a)),s),r}function Gi(e,t){const n=(e.ORDER-fe)/St,r=e.pow(t,n),o=e.eql(r,e.ONE),s=e.eql(r,e.ZERO),i=e.eql(r,e.neg(e.ONE));if(!o&&!s&&!i)throw new Error("invalid Legendre symbol result");return o?1:s?0:-1}function vf(e,t){t!==void 0&&_e(t);const n=t!==void 0?t:e.toString(2).length,r=Math.ceil(n/8);return{nBitLength:n,nByteLength:r}}class wf{ORDER;BITS;BYTES;isLE;ZERO=me;ONE=fe;_lengths;_sqrt;_mod;constructor(t,n={}){if(t<=me)throw new Error("invalid field: expected ORDER > 0, got "+t);let r;this.isLE=!1,n!=null&&typeof n=="object"&&(typeof n.BITS=="number"&&(r=n.BITS),typeof n.sqrt=="function"&&(this.sqrt=n.sqrt),typeof n.isLE=="boolean"&&(this.isLE=n.isLE),n.allowedLengths&&(this._lengths=n.allowedLengths?.slice()),typeof n.modFromBytes=="boolean"&&(this._mod=n.modFromBytes));const{nBitLength:o,nByteLength:s}=vf(t,r);if(s>2048)throw new Error("invalid field: expected ORDER of <= 2048 bytes");this.ORDER=t,this.BITS=o,this.BYTES=s,this._sqrt=void 0,Object.preventExtensions(this)}create(t){return Ie(t,this.ORDER)}isValid(t){if(typeof t!="bigint")throw new Error("invalid field element: expected bigint, got "+typeof t);return me<=t&&t<this.ORDER}is0(t){return t===me}isValidNot0(t){return!this.is0(t)&&this.isValid(t)}isOdd(t){return(t&fe)===fe}neg(t){return Ie(-t,this.ORDER)}eql(t,n){return t===n}sqr(t){return Ie(t*t,this.ORDER)}add(t,n){return Ie(t+n,this.ORDER)}sub(t,n){return Ie(t-n,this.ORDER)}mul(t,n){return Ie(t*n,this.ORDER)}pow(t,n){return bf(this,t,n)}div(t,n){return Ie(t*Fi(n,this.ORDER),this.ORDER)}sqrN(t){return t*t}addN(t,n){return t+n}subN(t,n){return t-n}mulN(t,n){return t*n}inv(t){return Fi(t,this.ORDER)}sqrt(t){return this._sqrt||(this._sqrt=mf(this.ORDER)),this._sqrt(this,t)}toBytes(t){return this.isLE?gc(t,this.BYTES):Ss(t,this.BYTES)}fromBytes(t,n=!1){H(t);const{_lengths:r,BYTES:o,isLE:s,ORDER:i,_mod:a}=this;if(r){if(!r.includes(t.length)||t.length>o)throw new Error("Field.fromBytes: expected "+r+" bytes, got "+t.length);const l=new Uint8Array(o);l.set(t,s?0:l.length-t.length),t=l}if(t.length!==o)throw new Error("Field.fromBytes: expected "+o+" bytes, got "+t.length);let c=s?yc(t):On(t);if(a&&(c=Ie(c,i)),!n&&!this.isValid(c))throw new Error("invalid field element: outside of range 0..ORDER");return c}invertBatch(t){return Sc(this,t)}cmov(t,n,r){return r?n:t}}function Dr(e,t={}){return new wf(e,t)}function Ic(e){if(typeof e!="bigint")throw new Error("field order must be bigint");const t=e.toString(2).length;return Math.ceil(t/8)}function Rc(e){const t=Ic(e);return t+Math.ceil(t/2)}function Ac(e,t,n=!1){H(e);const r=e.length,o=Ic(t),s=Rc(t);if(r<16||r<s||r>1024)throw new Error("expected "+s+"-1024 bytes of input, got "+r);const i=n?yc(e):On(e),a=Ie(i,t-fe)+fe;return n?gc(a,o):Ss(a,o)}const Yt=BigInt(0),It=BigInt(1);function kr(e,t){const n=t.negate();return e?n:t}function Ki(e,t){const n=Sc(e.Fp,t.map(r=>r.Z));return t.map((r,o)=>e.fromAffine(r.toAffine(n[o])))}function Cc(e,t){if(!Number.isSafeInteger(e)||e<=0||e>t)throw new Error("invalid window size, expected [1.."+t+"], got W="+e)}function ho(e,t){Cc(e,t);const n=Math.ceil(t/e)+1,r=2**(e-1),o=2**e,s=Is(e),i=BigInt(e);return{windows:n,windowSize:r,mask:s,maxNumber:o,shiftBy:i}}function Vi(e,t,n){const{windowSize:r,mask:o,maxNumber:s,shiftBy:i}=n;let a=Number(e&o),c=e>>i;a>r&&(a-=s,c+=It);const l=t*r,d=l+Math.abs(a)-1,u=a===0,f=a<0,h=t%2!==0;return{nextN:c,offset:d,isZero:u,isNeg:f,isNegF:h,offsetF:l}}const po=new WeakMap,Tc=new WeakMap;function mo(e){return Tc.get(e)||1}function zi(e){if(e!==Yt)throw new Error("invalid wNAF")}class Ef{BASE;ZERO;Fn;bits;constructor(t,n){this.BASE=t.BASE,this.ZERO=t.ZERO,this.Fn=t.Fn,this.bits=n}_unsafeLadder(t,n,r=this.ZERO){let o=t;for(;n>Yt;)n&It&&(r=r.add(o)),o=o.double(),n>>=It;return r}precomputeWindow(t,n){const{windows:r,windowSize:o}=ho(n,this.bits),s=[];let i=t,a=i;for(let c=0;c<r;c++){a=i,s.push(a);for(let l=1;l<o;l++)a=a.add(i),s.push(a);i=a.double()}return s}wNAF(t,n,r){if(!this.Fn.isValid(r))throw new Error("invalid scalar");let o=this.ZERO,s=this.BASE;const i=ho(t,this.bits);for(let a=0;a<i.windows;a++){const{nextN:c,offset:l,isZero:d,isNeg:u,isNegF:f,offsetF:h}=Vi(r,a,i);r=c,d?s=s.add(kr(f,n[h])):o=o.add(kr(u,n[l]))}return zi(r),{p:o,f:s}}wNAFUnsafe(t,n,r,o=this.ZERO){const s=ho(t,this.bits);for(let i=0;i<s.windows&&r!==Yt;i++){const{nextN:a,offset:c,isZero:l,isNeg:d}=Vi(r,i,s);if(r=a,!l){const u=n[c];o=o.add(d?u.negate():u)}}return zi(r),o}getPrecomputes(t,n,r){let o=po.get(n);return o||(o=this.precomputeWindow(n,t),t!==1&&(typeof r=="function"&&(o=r(o)),po.set(n,o))),o}cached(t,n,r){const o=mo(t);return this.wNAF(o,this.getPrecomputes(o,t,r),n)}unsafe(t,n,r,o){const s=mo(t);return s===1?this._unsafeLadder(t,n,o):this.wNAFUnsafe(s,this.getPrecomputes(s,t,r),n,o)}createCache(t,n){Cc(n,this.bits),Tc.set(t,n),po.delete(t)}hasCache(t){return mo(t)!==1}}function kf(e,t,n,r){let o=t,s=e.ZERO,i=e.ZERO;for(;n>Yt||r>Yt;)n&It&&(s=s.add(o)),r&It&&(i=i.add(o)),o=o.double(),n>>=It,r>>=It;return{p1:s,p2:i}}function Wi(e,t,n){if(t){if(t.ORDER!==e)throw new Error("Field.ORDER must match order: Fp == p, Fn == n");return gf(t),t}else return Dr(e,{isLE:n})}function _f(e,t,n={},r){if(r===void 0&&(r=e==="edwards"),!t||typeof t!="object")throw new Error(`expected valid ${e} CURVE object`);for(const c of["p","n","h"]){const l=t[c];if(!(typeof l=="bigint"&&l>Yt))throw new Error(`CURVE.${c} must be positive bigint`)}const o=Wi(t.p,n.Fp,r),s=Wi(t.n,n.Fn,r),a=["Gx","Gy","a","b"];for(const c of a)if(!o.isValid(t[c]))throw new Error(`CURVE.${c} must be valid field element of CURVE.Fp`);return t=Object.freeze(Object.assign({},t)),{CURVE:t,Fp:o,Fn:s}}function Lc(e,t){return function(r){const o=e(r);return{secretKey:o,publicKey:t(o)}}}const Ji=(e,t)=>(e+(e>=0?t:-t)/Nc)/t;function xf(e,t,n){const[[r,o],[s,i]]=t,a=Ji(i*e,n),c=Ji(-o*e,n);let l=e-a*r-c*s,d=-a*o-c*i;const u=l<Xe,f=d<Xe;u&&(l=-l),f&&(d=-d);const h=Is(Math.ceil(lf(n)/2))+Vt;if(l<Xe||l>=h||d<Xe||d>=h)throw new Error("splitScalar (endomorphism): failed, k="+e);return{k1neg:u,k1:l,k2neg:f,k2:d}}function zo(e){if(!["compact","recovered","der"].includes(e))throw new Error('Signature format must be "compact", "recovered", or "der"');return e}function yo(e,t){const n={};for(let r of Object.keys(t))n[r]=e[r]===void 0?t[r]:e[r];return Er(n.lowS,"lowS"),Er(n.prehash,"prehash"),n.format!==void 0&&zo(n.format),n}class Sf extends Error{constructor(t=""){super(t)}}const dt={Err:Sf,_tlv:{encode:(e,t)=>{const{Err:n}=dt;if(e<0||e>256)throw new n("tlv.encode: wrong tag");if(t.length&1)throw new n("tlv.encode: unpadded data");const r=t.length/2,o=Gn(r);if(o.length/2&128)throw new n("tlv.encode: long form length too big");const s=r>127?Gn(o.length/2|128):"";return Gn(e)+s+o+t},decode(e,t){const{Err:n}=dt;let r=0;if(e<0||e>256)throw new n("tlv.encode: wrong tag");if(t.length<2||t[r++]!==e)throw new n("tlv.decode: wrong tlv");const o=t[r++],s=!!(o&128);let i=0;if(!s)i=o;else{const c=o&127;if(!c)throw new n("tlv.decode(long): indefinite length not supported");if(c>4)throw new n("tlv.decode(long): byte length is too big");const l=t.subarray(r,r+c);if(l.length!==c)throw new n("tlv.decode: length bytes not complete");if(l[0]===0)throw new n("tlv.decode(long): zero leftmost byte");for(const d of l)i=i<<8|d;if(r+=c,i<128)throw new n("tlv.decode(long): not minimal encoding")}const a=t.subarray(r,r+i);if(a.length!==i)throw new n("tlv.decode: wrong value length");return{v:a,l:t.subarray(r+i)}}},_int:{encode(e){const{Err:t}=dt;if(e<Xe)throw new t("integer: negative integers are not allowed");let n=Gn(e);if(Number.parseInt(n[0],16)&8&&(n="00"+n),n.length&1)throw new t("unexpected DER parsing assertion: unpadded hex");return n},decode(e){const{Err:t}=dt;if(e[0]&128)throw new t("invalid signature integer: negative");if(e[0]===0&&!(e[1]&128))throw new t("invalid signature integer: unnecessary leading zero");return On(e)}},toSig(e){const{Err:t,_int:n,_tlv:r}=dt,o=H(e,void 0,"signature"),{v:s,l:i}=r.decode(48,o);if(i.length)throw new t("invalid signature: left bytes after parsing");const{v:a,l:c}=r.decode(2,s),{v:l,l:d}=r.decode(2,c);if(d.length)throw new t("invalid signature: left bytes after parsing");return{r:n.decode(a),s:n.decode(l)}},hexFromSig(e){const{_tlv:t,_int:n}=dt,r=t.encode(2,n.encode(e.r)),o=t.encode(2,n.encode(e.s)),s=r+o;return t.encode(48,s)}},Xe=BigInt(0),Vt=BigInt(1),Nc=BigInt(2),Kn=BigInt(3),If=BigInt(4);function Rf(e,t={}){const n=_f("weierstrass",e,t),{Fp:r,Fn:o}=n;let s=n.CURVE;const{h:i,n:a}=s;Rs(t,{},{allowInfinityPoint:"boolean",clearCofactor:"function",isTorsionFree:"function",fromBytes:"function",toBytes:"function",endo:"object"});const{endo:c}=t;if(c&&(!r.is0(s.a)||typeof c.beta!="bigint"||!Array.isArray(c.basises)))throw new Error('invalid endo: expected "beta": bigint and "basises": array');const l=Mc(r,o);function d(){if(!r.isOdd)throw new Error("compression is not supported: Field does not have .isOdd()")}function u(A,w,I){const{x,y:T}=w.toAffine(),C=r.toBytes(x);if(Er(I,"isCompressed"),I){d();const N=!r.isOdd(T);return oe($c(N),C)}else return oe(Uint8Array.of(4),C,r.toBytes(T))}function f(A){H(A,void 0,"Point");const{publicKey:w,publicKeyUncompressed:I}=l,x=A.length,T=A[0],C=A.subarray(1);if(x===w&&(T===2||T===3)){const N=r.fromBytes(C);if(!r.isValid(N))throw new Error("bad point: is not on curve, wrong x");const M=m(N);let B;try{B=r.sqrt(M)}catch(G){const J=G instanceof Error?": "+G.message:"";throw new Error("bad point: is not on curve, sqrt error"+J)}d();const U=r.isOdd(B);return(T&1)===1!==U&&(B=r.neg(B)),{x:N,y:B}}else if(x===I&&T===4){const N=r.BYTES,M=r.fromBytes(C.subarray(0,N)),B=r.fromBytes(C.subarray(N,N*2));if(!y(M,B))throw new Error("bad point: is not on curve");return{x:M,y:B}}else throw new Error(`bad point: got length ${x}, expected compressed=${w} or uncompressed=${I}`)}const h=t.toBytes||u,p=t.fromBytes||f;function m(A){const w=r.sqr(A),I=r.mul(w,A);return r.add(r.add(I,r.mul(A,s.a)),s.b)}function y(A,w){const I=r.sqr(w),x=m(A);return r.eql(I,x)}if(!y(s.Gx,s.Gy))throw new Error("bad curve params: generator point");const E=r.mul(r.pow(s.a,Kn),If),S=r.mul(r.sqr(s.b),BigInt(27));if(r.is0(r.add(E,S)))throw new Error("bad curve params: a or b");function L(A,w,I=!1){if(!r.isValid(w)||I&&r.is0(w))throw new Error(`bad point coordinate ${A}`);return w}function O(A){if(!(A instanceof g))throw new Error("Weierstrass Point expected")}function P(A){if(!c||!c.basises)throw new Error("no endo");return xf(A,c.basises,o.ORDER)}const $=Hi((A,w)=>{const{X:I,Y:x,Z:T}=A;if(r.eql(T,r.ONE))return{x:I,y:x};const C=A.is0();w==null&&(w=C?r.ONE:r.inv(T));const N=r.mul(I,w),M=r.mul(x,w),B=r.mul(T,w);if(C)return{x:r.ZERO,y:r.ZERO};if(!r.eql(B,r.ONE))throw new Error("invZ was invalid");return{x:N,y:M}}),v=Hi(A=>{if(A.is0()){if(t.allowInfinityPoint&&!r.is0(A.Y))return;throw new Error("bad point: ZERO")}const{x:w,y:I}=A.toAffine();if(!r.isValid(w)||!r.isValid(I))throw new Error("bad point: x or y not field elements");if(!y(w,I))throw new Error("bad point: equation left != right");if(!A.isTorsionFree())throw new Error("bad point: not in prime-order subgroup");return!0});function b(A,w,I,x,T){return I=new g(r.mul(I.X,A),I.Y,I.Z),w=kr(x,w),I=kr(T,I),w.add(I)}class g{static BASE=new g(s.Gx,s.Gy,r.ONE);static ZERO=new g(r.ZERO,r.ONE,r.ZERO);static Fp=r;static Fn=o;X;Y;Z;constructor(w,I,x){this.X=L("x",w),this.Y=L("y",I,!0),this.Z=L("z",x),Object.freeze(this)}static CURVE(){return s}static fromAffine(w){const{x:I,y:x}=w||{};if(!w||!r.isValid(I)||!r.isValid(x))throw new Error("invalid affine point");if(w instanceof g)throw new Error("projective point not allowed");return r.is0(I)&&r.is0(x)?g.ZERO:new g(I,x,r.ONE)}static fromBytes(w){const I=g.fromAffine(p(H(w,void 0,"point")));return I.assertValidity(),I}static fromHex(w){return g.fromBytes(z(w))}get x(){return this.toAffine().x}get y(){return this.toAffine().y}precompute(w=8,I=!0){return _.createCache(this,w),I||this.multiply(Kn),this}assertValidity(){v(this)}hasEvenY(){const{y:w}=this.toAffine();if(!r.isOdd)throw new Error("Field doesn't support isOdd");return!r.isOdd(w)}equals(w){O(w);const{X:I,Y:x,Z:T}=this,{X:C,Y:N,Z:M}=w,B=r.eql(r.mul(I,M),r.mul(C,T)),U=r.eql(r.mul(x,M),r.mul(N,T));return B&&U}negate(){return new g(this.X,r.neg(this.Y),this.Z)}double(){const{a:w,b:I}=s,x=r.mul(I,Kn),{X:T,Y:C,Z:N}=this;let M=r.ZERO,B=r.ZERO,U=r.ZERO,D=r.mul(T,T),G=r.mul(C,C),J=r.mul(N,N),K=r.mul(T,C);return K=r.add(K,K),U=r.mul(T,N),U=r.add(U,U),M=r.mul(w,U),B=r.mul(x,J),B=r.add(M,B),M=r.sub(G,B),B=r.add(G,B),B=r.mul(M,B),M=r.mul(K,M),U=r.mul(x,U),J=r.mul(w,J),K=r.sub(D,J),K=r.mul(w,K),K=r.add(K,U),U=r.add(D,D),D=r.add(U,D),D=r.add(D,J),D=r.mul(D,K),B=r.add(B,D),J=r.mul(C,N),J=r.add(J,J),D=r.mul(J,K),M=r.sub(M,D),U=r.mul(J,G),U=r.add(U,U),U=r.add(U,U),new g(M,B,U)}add(w){O(w);const{X:I,Y:x,Z:T}=this,{X:C,Y:N,Z:M}=w;let B=r.ZERO,U=r.ZERO,D=r.ZERO;const G=s.a,J=r.mul(s.b,Kn);let K=r.mul(I,C),ne=r.mul(x,N),ie=r.mul(T,M),Ne=r.add(I,x),re=r.add(C,N);Ne=r.mul(Ne,re),re=r.add(K,ne),Ne=r.sub(Ne,re),re=r.add(I,T);let ae=r.add(C,M);return re=r.mul(re,ae),ae=r.add(K,ie),re=r.sub(re,ae),ae=r.add(x,T),B=r.add(N,M),ae=r.mul(ae,B),B=r.add(ne,ie),ae=r.sub(ae,B),D=r.mul(G,re),B=r.mul(J,ie),D=r.add(B,D),B=r.sub(ne,D),D=r.add(ne,D),U=r.mul(B,D),ne=r.add(K,K),ne=r.add(ne,K),ie=r.mul(G,ie),re=r.mul(J,re),ne=r.add(ne,ie),ie=r.sub(K,ie),ie=r.mul(G,ie),re=r.add(re,ie),K=r.mul(ne,re),U=r.add(U,K),K=r.mul(ae,re),B=r.mul(Ne,B),B=r.sub(B,K),K=r.mul(Ne,ne),D=r.mul(ae,D),D=r.add(D,K),new g(B,U,D)}subtract(w){return this.add(w.negate())}is0(){return this.equals(g.ZERO)}multiply(w){const{endo:I}=t;if(!o.isValidNot0(w))throw new Error("invalid scalar: out of range");let x,T;const C=N=>_.cached(this,N,M=>Ki(g,M));if(I){const{k1neg:N,k1:M,k2neg:B,k2:U}=P(w),{p:D,f:G}=C(M),{p:J,f:K}=C(U);T=G.add(K),x=b(I.beta,D,J,N,B)}else{const{p:N,f:M}=C(w);x=N,T=M}return Ki(g,[x,T])[0]}multiplyUnsafe(w){const{endo:I}=t,x=this;if(!o.isValid(w))throw new Error("invalid scalar: out of range");if(w===Xe||x.is0())return g.ZERO;if(w===Vt)return x;if(_.hasCache(this))return this.multiply(w);if(I){const{k1neg:T,k1:C,k2neg:N,k2:M}=P(w),{p1:B,p2:U}=kf(g,x,C,M);return b(I.beta,B,U,T,N)}else return _.unsafe(x,w)}toAffine(w){return $(this,w)}isTorsionFree(){const{isTorsionFree:w}=t;return i===Vt?!0:w?w(g,this):_.unsafe(this,a).is0()}clearCofactor(){const{clearCofactor:w}=t;return i===Vt?this:w?w(g,this):this.multiplyUnsafe(i)}isSmallOrder(){return this.multiplyUnsafe(i).is0()}toBytes(w=!0){return Er(w,"isCompressed"),this.assertValidity(),h(g,this,w)}toHex(w=!0){return j(this.toBytes(w))}toString(){return`<Point ${this.is0()?"ZERO":this.toHex()}>`}}const k=o.BITS,_=new Ef(g,t.endo?Math.ceil(k/2):k);return g.BASE.precompute(8),g}function $c(e){return Uint8Array.of(e?2:3)}function Mc(e,t){return{secretKey:t.BYTES,publicKey:1+e.BYTES,publicKeyUncompressed:1+2*e.BYTES,publicKeyHasPrefix:!0,signature:2*t.BYTES}}function Af(e,t={}){const{Fn:n}=e,r=t.randomBytes||vt,o=Object.assign(Mc(e.Fp,n),{seed:Rc(n.ORDER)});function s(h){try{const p=n.fromBytes(h);return n.isValidNot0(p)}catch{return!1}}function i(h,p){const{publicKey:m,publicKeyUncompressed:y}=o;try{const E=h.length;return p===!0&&E!==m||p===!1&&E!==y?!1:!!e.fromBytes(h)}catch{return!1}}function a(h=r(o.seed)){return Ac(H(h,o.seed,"seed"),n.ORDER)}function c(h,p=!0){return e.BASE.multiply(n.fromBytes(h)).toBytes(p)}function l(h){const{secretKey:p,publicKey:m,publicKeyUncompressed:y}=o;if(!vs(h)||"_lengths"in n&&n._lengths||p===m)return;const E=H(h,void 0,"key").length;return E===m||E===y}function d(h,p,m=!0){if(l(h)===!0)throw new Error("first arg must be private key");if(l(p)===!1)throw new Error("second arg must be public key");const y=n.fromBytes(h);return e.fromBytes(p).multiply(y).toBytes(m)}const u={isValidSecretKey:s,isValidPublicKey:i,randomSecretKey:a},f=Lc(a,c);return Object.freeze({getPublicKey:c,getSharedSecret:d,keygen:f,Point:e,utils:u,lengths:o})}function Cf(e,t,n={}){$n(t),Rs(n,{},{hmac:"function",lowS:"boolean",randomBytes:"function",bits2int:"function",bits2int_modN:"function"}),n=Object.assign({},n);const r=n.randomBytes||vt,o=n.hmac||((I,x)=>tt(t,I,x)),{Fp:s,Fn:i}=e,{ORDER:a,BITS:c}=i,{keygen:l,getPublicKey:d,getSharedSecret:u,utils:f,lengths:h}=Af(e,n),p={prehash:!0,lowS:typeof n.lowS=="boolean"?n.lowS:!0,format:"compact",extraEntropy:!1},m=a*Nc<s.ORDER;function y(I){const x=a>>Vt;return I>x}function E(I,x){if(!i.isValidNot0(x))throw new Error(`invalid signature ${I}: out of range 1..Point.Fn.ORDER`);return x}function S(){if(m)throw new Error('"recovered" sig type is not supported for cofactor >2 curves')}function L(I,x){zo(x);const T=h.signature,C=x==="compact"?T:x==="recovered"?T+1:void 0;return H(I,C)}class O{r;s;recovery;constructor(x,T,C){if(this.r=E("r",x),this.s=E("s",T),C!=null){if(S(),![0,1,2,3].includes(C))throw new Error("invalid recovery id");this.recovery=C}Object.freeze(this)}static fromBytes(x,T=p.format){L(x,T);let C;if(T==="der"){const{r:U,s:D}=dt.toSig(H(x));return new O(U,D)}T==="recovered"&&(C=x[0],T="compact",x=x.subarray(1));const N=h.signature/2,M=x.subarray(0,N),B=x.subarray(N,N*2);return new O(i.fromBytes(M),i.fromBytes(B),C)}static fromHex(x,T){return this.fromBytes(z(x),T)}assertRecovery(){const{recovery:x}=this;if(x==null)throw new Error("invalid recovery id: must be present");return x}addRecoveryBit(x){return new O(this.r,this.s,x)}recoverPublicKey(x){const{r:T,s:C}=this,N=this.assertRecovery(),M=N===2||N===3?T+a:T;if(!s.isValid(M))throw new Error("invalid recovery id: sig.r+curve.n != R.x");const B=s.toBytes(M),U=e.fromBytes(oe($c((N&1)===0),B)),D=i.inv(M),G=$(H(x,void 0,"msgHash")),J=i.create(-G*D),K=i.create(C*D),ne=e.BASE.multiplyUnsafe(J).add(U.multiplyUnsafe(K));if(ne.is0())throw new Error("invalid recovery: point at infinify");return ne.assertValidity(),ne}hasHighS(){return y(this.s)}toBytes(x=p.format){if(zo(x),x==="der")return z(dt.hexFromSig(this));const{r:T,s:C}=this,N=i.toBytes(T),M=i.toBytes(C);return x==="recovered"?(S(),oe(Uint8Array.of(this.assertRecovery()),N,M)):oe(N,M)}toHex(x){return j(this.toBytes(x))}}const P=n.bits2int||function(x){if(x.length>8192)throw new Error("input is too large");const T=On(x),C=x.length*8-c;return C>0?T>>BigInt(C):T},$=n.bits2int_modN||function(x){return i.create(P(x))},v=Is(c);function b(I){return cf("num < 2^"+c,I,Xe,v),i.toBytes(I)}function g(I,x){return H(I,void 0,"message"),x?H(t(I),void 0,"prehashed message"):I}function k(I,x,T){const{lowS:C,prehash:N,extraEntropy:M}=yo(T,p);I=g(I,N);const B=$(I),U=i.fromBytes(x);if(!i.isValidNot0(U))throw new Error("invalid private key");const D=[b(U),b(B)];if(M!=null&&M!==!1){const ne=M===!0?r(h.secretKey):M;D.push(H(ne,void 0,"extraEntropy"))}const G=oe(...D),J=B;function K(ne){const ie=P(ne);if(!i.isValidNot0(ie))return;const Ne=i.inv(ie),re=e.BASE.multiply(ie).toAffine(),ae=i.create(re.x);if(ae===Xe)return;const Un=i.create(Ne*i.create(J+ae*U));if(Un===Xe)return;let Li=(re.x===ae?0:2)|Number(re.y&Vt),Ni=Un;return C&&y(Un)&&(Ni=i.neg(Un),Li^=1),new O(ae,Ni,m?void 0:Li)}return{seed:G,k2sig:K}}function _(I,x,T={}){const{seed:C,k2sig:N}=k(I,x,T);return df(t.outputLen,i.BYTES,o)(C,N).toBytes(T.format)}function A(I,x,T,C={}){const{lowS:N,prehash:M,format:B}=yo(C,p);if(T=H(T,void 0,"publicKey"),x=g(x,M),!vs(I)){const U=I instanceof O?", use sig.toBytes()":"";throw new Error("verify expects Uint8Array signature"+U)}L(I,B);try{const U=O.fromBytes(I,B),D=e.fromBytes(T);if(N&&U.hasHighS())return!1;const{r:G,s:J}=U,K=$(x),ne=i.inv(J),ie=i.create(K*ne),Ne=i.create(G*ne),re=e.BASE.multiplyUnsafe(ie).add(D.multiplyUnsafe(Ne));return re.is0()?!1:i.create(re.x)===G}catch{return!1}}function w(I,x,T={}){const{prehash:C}=yo(T,p);return x=g(x,C),O.fromBytes(I,"recovered").recoverPublicKey(x).toBytes()}return Object.freeze({keygen:l,getPublicKey:d,getSharedSecret:u,utils:f,lengths:h,Point:e,sign:_,verify:A,recoverPublicKey:w,Signature:O,hash:t})}const qr={p:BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"),n:BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"),h:BigInt(1),a:BigInt(0),b:BigInt(7),Gx:BigInt("0x79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798"),Gy:BigInt("0x483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8")},Tf={beta:BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),basises:[[BigInt("0x3086d221a7d46bcde86c90e49284eb15"),-BigInt("0xe4437ed6010e88286f547fa90abfe4c3")],[BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"),BigInt("0x3086d221a7d46bcde86c90e49284eb15")]]},Lf=BigInt(0),Wo=BigInt(2);function Nf(e){const t=qr.p,n=BigInt(3),r=BigInt(6),o=BigInt(11),s=BigInt(22),i=BigInt(23),a=BigInt(44),c=BigInt(88),l=e*e*e%t,d=l*l*e%t,u=be(d,n,t)*d%t,f=be(u,n,t)*d%t,h=be(f,Wo,t)*l%t,p=be(h,o,t)*h%t,m=be(p,s,t)*p%t,y=be(m,a,t)*m%t,E=be(y,c,t)*y%t,S=be(E,a,t)*m%t,L=be(S,n,t)*d%t,O=be(L,i,t)*p%t,P=be(O,r,t)*l%t,$=be(P,Wo,t);if(!_r.eql(_r.sqr($),e))throw new Error("Cannot find square root");return $}const _r=Dr(qr.p,{sqrt:Nf}),Nt=Rf(qr,{Fp:_r,endo:Tf}),Pe=Cf(Nt,se),Yi={};function xr(e,...t){let n=Yi[e];if(n===void 0){const r=se(sf(e));n=oe(r,r),Yi[e]=n}return se(oe(n,...t))}const Cs=e=>e.toBytes(!0).slice(1),Ts=e=>e%Wo===Lf;function Jo(e){const{Fn:t,BASE:n}=Nt,r=t.fromBytes(e),o=n.multiply(r);return{scalar:Ts(o.y)?r:t.neg(r),bytes:Cs(o)}}function Oc(e){const t=_r;if(!t.isValidNot0(e))throw new Error("invalid x: Fail if x ≥ p");const n=t.create(e*e),r=t.create(n*e+BigInt(7));let o=t.sqrt(r);Ts(o)||(o=t.neg(o));const s=Nt.fromAffine({x:e,y:o});return s.assertValidity(),s}const vn=On;function Bc(...e){return Nt.Fn.create(vn(xr("BIP0340/challenge",...e)))}function Zi(e){return Jo(e).bytes}function $f(e,t,n=vt(32)){const{Fn:r}=Nt,o=H(e,void 0,"message"),{bytes:s,scalar:i}=Jo(t),a=H(n,32,"auxRand"),c=r.toBytes(i^vn(xr("BIP0340/aux",a))),l=xr("BIP0340/nonce",c,s,o),{bytes:d,scalar:u}=Jo(l),f=Bc(d,s,o),h=new Uint8Array(64);if(h.set(d,0),h.set(r.toBytes(r.create(u+f*i)),32),!Pc(h,o,s))throw new Error("sign: Invalid signature produced");return h}function Pc(e,t,n){const{Fp:r,Fn:o,BASE:s}=Nt,i=H(e,64,"signature"),a=H(t,void 0,"message"),c=H(n,32,"publicKey");try{const l=Oc(vn(c)),d=vn(i.subarray(0,32));if(!r.isValidNot0(d))return!1;const u=vn(i.subarray(32,64));if(!o.isValidNot0(u))return!1;const f=Bc(o.toBytes(d),Cs(l),a),h=s.multiplyUnsafe(u).add(l.multiplyUnsafe(o.neg(f))),{x:p,y:m}=h.toAffine();return!(h.is0()||!Ts(m)||p!==d)}catch{return!1}}const Q=(()=>{const n=(r=vt(48))=>Ac(r,qr.n);return{keygen:Lc(n,Zi),getPublicKey:Zi,sign:$f,verify:Pc,Point:Nt,utils:{randomSecretKey:n,taggedHash:xr,lift_x:Oc,pointToBytes:Cs},lengths:{secretKey:32,publicKey:32,publicKeyHasPrefix:!1,signature:64,seed:48}}})(),Mf=Uint8Array.from([7,4,13,1,10,6,15,3,12,0,9,5,2,14,11,8]),Uc=Uint8Array.from(new Array(16).fill(0).map((e,t)=>t)),Of=Uc.map(e=>(9*e+5)%16),Dc=(()=>{const n=[[Uc],[Of]];for(let r=0;r<4;r++)for(let o of n)o.push(o[r].map(s=>Mf[s]));return n})(),qc=Dc[0],jc=Dc[1],Hc=[[11,14,15,12,5,8,7,9,11,13,14,15,6,7,9,8],[12,13,11,15,6,9,9,7,12,15,11,13,7,8,7,7],[13,15,14,11,7,7,6,8,13,14,13,12,5,5,6,9],[14,11,12,14,8,6,5,5,15,12,15,14,9,9,8,6],[15,12,13,13,9,5,8,6,14,11,12,11,8,6,5,5]].map(e=>Uint8Array.from(e)),Bf=qc.map((e,t)=>e.map(n=>Hc[t][n])),Pf=jc.map((e,t)=>e.map(n=>Hc[t][n])),Uf=Uint32Array.from([0,1518500249,1859775393,2400959708,2840853838]),Df=Uint32Array.from([1352829926,1548603684,1836072691,2053994217,0]);function Xi(e,t,n,r){return e===0?t^n^r:e===1?t&n|~t&r:e===2?(t|~n)^r:e===3?t&r|n&~r:t^(n|~r)}const Vn=new Uint32Array(16);class qf extends Es{h0=1732584193;h1=-271733879;h2=-1732584194;h3=271733878;h4=-1009589776;constructor(){super(64,20,8,!0)}get(){const{h0:t,h1:n,h2:r,h3:o,h4:s}=this;return[t,n,r,o,s]}set(t,n,r,o,s){this.h0=t|0,this.h1=n|0,this.h2=r|0,this.h3=o|0,this.h4=s|0}process(t,n){for(let h=0;h<16;h++,n+=4)Vn[h]=t.getUint32(n,!0);let r=this.h0|0,o=r,s=this.h1|0,i=s,a=this.h2|0,c=a,l=this.h3|0,d=l,u=this.h4|0,f=u;for(let h=0;h<5;h++){const p=4-h,m=Uf[h],y=Df[h],E=qc[h],S=jc[h],L=Bf[h],O=Pf[h];for(let P=0;P<16;P++){const $=Dn(r+Xi(h,s,a,l)+Vn[E[P]]+m,L[P])+u|0;r=u,u=l,l=Dn(a,10)|0,a=s,s=$}for(let P=0;P<16;P++){const $=Dn(o+Xi(p,i,c,d)+Vn[S[P]]+y,O[P])+f|0;o=f,f=d,d=Dn(c,10)|0,c=i,i=$}}this.set(this.h1+a+d|0,this.h2+l+f|0,this.h3+u+o|0,this.h4+r+i|0,this.h0+s+c|0)}roundClean(){je(Vn)}destroy(){this.destroyed=!0,je(this.buffer),this.set(0,0,0,0,0)}}const jf=ws(()=>new qf);const pn=Pe.Point,{Fn:ln}=pn,go=Wu(se),Hf=Uint8Array.from("Bitcoin seed".split(""),e=>e.charCodeAt(0)),bo={private:76066276,public:76067358},vo=2147483648,Ff=e=>jf(se(e)),Gf=e=>At(e).getUint32(0,!1),zn=e=>{if(!Number.isSafeInteger(e)||e<0||e>2**32-1)throw new Error("invalid number, should be from 0 to 2**32-1, got "+e);const t=new Uint8Array(4);return At(t).setUint32(0,e,!1),t};class xt{get fingerprint(){if(!this.pubHash)throw new Error("No publicKey set!");return Gf(this.pubHash)}get identifier(){return this.pubHash}get pubKeyHash(){return this.pubHash}get privateKey(){return this._privateKey||null}get publicKey(){return this._publicKey||null}get privateExtendedKey(){const t=this._privateKey;if(!t)throw new Error("No private key");return go.encode(this.serialize(this.versions.private,oe(Uint8Array.of(0),t)))}get publicExtendedKey(){if(!this._publicKey)throw new Error("No public key");return go.encode(this.serialize(this.versions.public,this._publicKey))}static fromMasterSeed(t,n=bo){if(H(t),8*t.length<128||8*t.length>512)throw new Error("HDKey: seed length must be between 128 and 512 bits; 256 bits is advised, got "+t.length);const r=tt(Fo,Hf,t),o=r.slice(0,32),s=r.slice(32);return new xt({versions:n,chainCode:s,privateKey:o})}static fromExtendedKey(t,n=bo){const r=go.decode(t),o=At(r),s=o.getUint32(0,!1),i={versions:n,depth:r[4],parentFingerprint:o.getUint32(5,!1),index:o.getUint32(9,!1),chainCode:r.slice(13,45)},a=r.slice(45),c=a[0]===0;if(s!==n[c?"private":"public"])throw new Error("Version mismatch");return c?new xt({...i,privateKey:a.slice(1)}):new xt({...i,publicKey:a})}static fromJSON(t){return xt.fromExtendedKey(t.xpriv)}versions;depth=0;index=0;chainCode=null;parentFingerprint=0;_privateKey;_publicKey;pubHash;constructor(t){if(!t||typeof t!="object")throw new Error("HDKey.constructor must not be called directly");if(this.versions=t.versions||bo,this.depth=t.depth||0,this.chainCode=t.chainCode||null,this.index=t.index||0,this.parentFingerprint=t.parentFingerprint||0,!this.depth&&(this.parentFingerprint||this.index))throw new Error("HDKey: zero depth with non-zero index/parent fingerprint");if(this.depth>255)throw new Error("HDKey: depth exceeds the serializable value 255");if(t.publicKey&&t.privateKey)throw new Error("HDKey: publicKey and privateKey at same time.");if(t.privateKey){if(!Pe.utils.isValidSecretKey(t.privateKey))throw new Error("Invalid private key");this._privateKey=t.privateKey,this._publicKey=Pe.getPublicKey(t.privateKey,!0)}else if(t.publicKey)this._publicKey=pn.fromBytes(t.publicKey).toBytes(!0);else throw new Error("HDKey: no public or private key provided");this.pubHash=Ff(this._publicKey)}derive(t){if(!/^[mM]'?/.test(t))throw new Error('Path must start with "m" or "M"');if(/^[mM]'?$/.test(t))return this;const n=t.replace(/^[mM]'?\//,"").split("/");let r=this;for(const o of n){const s=/^(\d+)('?)$/.exec(o),i=s&&s[1];if(!s||s.length!==3||typeof i!="string")throw new Error("invalid child index: "+o);let a=+i;if(!Number.isSafeInteger(a)||a>=vo)throw new Error("Invalid index");s[2]==="'"&&(a+=vo),r=r.deriveChild(a)}return r}deriveChild(t){if(!this._publicKey||!this.chainCode)throw new Error("No publicKey or chainCode set");let n=zn(t);if(t>=vo){const c=this._privateKey;if(!c)throw new Error("Could not derive hardened child key");n=oe(Uint8Array.of(0),c,n)}else n=oe(this._publicKey,n);const r=tt(Fo,this.chainCode,n),o=r.slice(0,32),s=r.slice(32);if(!Pe.utils.isValidSecretKey(o))throw new Error("Tweak bigger than curve order");const i={versions:this.versions,chainCode:s,depth:this.depth+1,parentFingerprint:this.fingerprint,index:t},a=ln.fromBytes(o);try{if(this._privateKey){const c=ln.create(ln.fromBytes(this._privateKey)+a);if(!ln.isValidNot0(c))throw new Error("The tweak was out of range or the resulted private key is invalid");i.privateKey=ln.toBytes(c)}else{const c=pn.fromBytes(this._publicKey).add(pn.BASE.multiply(a));if(c.equals(pn.ZERO))throw new Error("The tweak was equal to negative P, which made the result key invalid");i.publicKey=c.toBytes(!0)}return new xt(i)}catch{return this.deriveChild(t+1)}}sign(t){if(!this._privateKey)throw new Error("No privateKey set!");return H(t,32),Pe.sign(t,this._privateKey,{prehash:!1})}verify(t,n){if(H(t,32),H(n,64),!this._publicKey)throw new Error("No publicKey set!");return Pe.verify(n,t,this._publicKey,{prehash:!1})}wipePrivateData(){return this._privateKey&&(this._privateKey.fill(0),this._privateKey=void 0),this}toJSON(){return{xpriv:this.privateExtendedKey,xpub:this.publicExtendedKey}}serialize(t,n){if(!this.chainCode)throw new Error("No chainCode set");return H(n,33),oe(zn(t),new Uint8Array([this.depth]),zn(this.parentFingerprint),zn(this.index),this.chainCode,n)}}function Kf(e){return e instanceof Uint8Array||ArrayBuffer.isView(e)&&e.constructor.name==="Uint8Array"}function Qi(e){if(typeof e!="boolean")throw new Error(`boolean expected, not ${e}`)}function wo(e){if(!Number.isSafeInteger(e)||e<0)throw new Error("positive integer expected, got "+e)}function he(e,t,n=""){const r=Kf(e),o=e?.length,s=t!==void 0;if(!r||s&&o!==t){const i=n&&`"${n}" `,a=s?` of length ${t}`:"",c=r?`length=${o}`:`type=${typeof e}`;throw new Error(i+"expected Uint8Array"+a+", got "+c)}return e}function de(e){return new Uint32Array(e.buffer,e.byteOffset,Math.floor(e.byteLength/4))}function Zt(...e){for(let t=0;t<e.length;t++)e[t].fill(0)}const Vf=new Uint8Array(new Uint32Array([287454020]).buffer)[0]===68;function zf(e,t){return e.buffer===t.buffer&&e.byteOffset<t.byteOffset+t.byteLength&&t.byteOffset<e.byteOffset+e.byteLength}function Fc(e,t){if(zf(e,t)&&e.byteOffset<t.byteOffset)throw new Error("complex overlap of input and output is not supported")}function Wf(e,t){if(t==null||typeof t!="object")throw new Error("options must be defined");return Object.assign(e,t)}function Gc(e,t){if(e.length!==t.length)return!1;let n=0;for(let r=0;r<e.length;r++)n|=e[r]^t[r];return n===0}const Jf=(e,t)=>{function n(r,...o){if(he(r,void 0,"key"),!Vf)throw new Error("Non little-endian hardware is not yet supported");if(e.nonceLength!==void 0){const d=o[0];he(d,e.varSizeNonce?void 0:e.nonceLength,"nonce")}const s=e.tagLength;s&&o[1]!==void 0&&he(o[1],void 0,"AAD");const i=t(r,...o),a=(d,u)=>{if(u!==void 0){if(d!==2)throw new Error("cipher output not supported");he(u,void 0,"output")}};let c=!1;return{encrypt(d,u){if(c)throw new Error("cannot encrypt() twice with same key + nonce");return c=!0,he(d),a(i.encrypt.length,u),i.encrypt(d,u)},decrypt(d,u){if(he(d),s&&d.length<s)throw new Error('"ciphertext" expected length bigger than tagLength='+s);return a(i.decrypt.length,u),i.decrypt(d,u)}}}return Object.assign(n,e),n};function Kc(e,t,n=!0){if(t===void 0)return new Uint8Array(e);if(t.length!==e)throw new Error('"output" expected Uint8Array of length '+e+", got: "+t.length);if(n&&!zt(t))throw new Error("invalid output, must be aligned");return t}function zt(e){return e.byteOffset%4===0}function Ct(e){return Uint8Array.from(e)}const pt=16,Yf=283;function Zf(e){if(![16,24,32].includes(e.length))throw new Error('"aes key" expected Uint8Array of length 16/24/32, got length='+e.length)}function Ls(e){return e<<1^Yf&-(e>>7)}function Ft(e,t){let n=0;for(;t>0;t>>=1)n^=e&-(t&1),e=Ls(e);return n}const Yo=(()=>{const e=new Uint8Array(256);for(let n=0,r=1;n<256;n++,r^=Ls(r))e[n]=r;const t=new Uint8Array(256);t[0]=99;for(let n=0;n<255;n++){let r=e[255-n];r|=r<<8,t[e[n]]=(r^r>>4^r>>5^r>>6^r>>7^99)&255}return Zt(e),t})(),Xf=Yo.map((e,t)=>Yo.indexOf(t)),Qf=e=>e<<24|e>>>8,Eo=e=>e<<8|e>>>24;function Vc(e,t){if(e.length!==256)throw new Error("Wrong sbox length");const n=new Uint32Array(256).map((l,d)=>t(e[d])),r=n.map(Eo),o=r.map(Eo),s=o.map(Eo),i=new Uint32Array(256*256),a=new Uint32Array(256*256),c=new Uint16Array(256*256);for(let l=0;l<256;l++)for(let d=0;d<256;d++){const u=l*256+d;i[u]=n[l]^r[d],a[u]=o[l]^s[d],c[u]=e[l]<<8|e[d]}return{sbox:e,sbox2:c,T0:n,T1:r,T2:o,T3:s,T01:i,T23:a}}const Ns=Vc(Yo,e=>Ft(e,3)<<24|e<<16|e<<8|Ft(e,2)),zc=Vc(Xf,e=>Ft(e,11)<<24|Ft(e,13)<<16|Ft(e,9)<<8|Ft(e,14)),eh=(()=>{const e=new Uint8Array(16);for(let t=0,n=1;t<16;t++,n=Ls(n))e[t]=n;return e})();function Wc(e){he(e);const t=e.length;Zf(e);const{sbox2:n}=Ns,r=[];zt(e)||r.push(e=Ct(e));const o=de(e),s=o.length,i=c=>De(n,c,c,c,c),a=new Uint32Array(t+28);a.set(o);for(let c=s;c<a.length;c++){let l=a[c-1];c%s===0?l=i(Qf(l))^eh[c/s-1]:s>6&&c%s===4&&(l=i(l)),a[c]=a[c-s]^l}return Zt(...r),a}function th(e){const t=Wc(e),n=t.slice(),r=t.length,{sbox2:o}=Ns,{T0:s,T1:i,T2:a,T3:c}=zc;for(let l=0;l<r;l+=4)for(let d=0;d<4;d++)n[l+d]=t[r-l-4+d];Zt(t);for(let l=4;l<r-4;l++){const d=n[l],u=De(o,d,d,d,d);n[l]=s[u&255]^i[u>>>8&255]^a[u>>>16&255]^c[u>>>24]}return n}function ft(e,t,n,r,o,s){return e[n<<8&65280|r>>>8&255]^t[o>>>8&65280|s>>>24&255]}function De(e,t,n,r,o){return e[t&255|n&65280]|e[r>>>16&255|o>>>16&65280]<<16}function ea(e,t,n,r,o){const{sbox2:s,T01:i,T23:a}=Ns;let c=0;t^=e[c++],n^=e[c++],r^=e[c++],o^=e[c++];const l=e.length/4-2;for(let p=0;p<l;p++){const m=e[c++]^ft(i,a,t,n,r,o),y=e[c++]^ft(i,a,n,r,o,t),E=e[c++]^ft(i,a,r,o,t,n),S=e[c++]^ft(i,a,o,t,n,r);t=m,n=y,r=E,o=S}const d=e[c++]^De(s,t,n,r,o),u=e[c++]^De(s,n,r,o,t),f=e[c++]^De(s,r,o,t,n),h=e[c++]^De(s,o,t,n,r);return{s0:d,s1:u,s2:f,s3:h}}function nh(e,t,n,r,o){const{sbox2:s,T01:i,T23:a}=zc;let c=0;t^=e[c++],n^=e[c++],r^=e[c++],o^=e[c++];const l=e.length/4-2;for(let p=0;p<l;p++){const m=e[c++]^ft(i,a,t,o,r,n),y=e[c++]^ft(i,a,n,t,o,r),E=e[c++]^ft(i,a,r,n,t,o),S=e[c++]^ft(i,a,o,r,n,t);t=m,n=y,r=E,o=S}const d=e[c++]^De(s,t,o,r,n),u=e[c++]^De(s,n,t,o,r),f=e[c++]^De(s,r,n,t,o),h=e[c++]^De(s,o,r,n,t);return{s0:d,s1:u,s2:f,s3:h}}function rh(e){if(he(e),e.length%pt!==0)throw new Error("aes-(cbc/ecb).decrypt ciphertext should consist of blocks with size "+pt)}function oh(e,t,n){he(e);let r=e.length;const o=r%pt;if(!t&&o!==0)throw new Error("aec/(cbc-ecb): unpadded plaintext with disabled padding");zt(e)||(e=Ct(e));const s=de(e);if(t){let a=pt-o;a||(a=pt),r=r+a}n=Kc(r,n),Fc(e,n);const i=de(n);return{b:s,o:i,out:n}}function sh(e,t){if(!t)return e;const n=e.length;if(!n)throw new Error("aes/pcks5: empty ciphertext not allowed");const r=e[n-1];if(r<=0||r>16)throw new Error("aes/pcks5: wrong padding");const o=e.subarray(0,-r);for(let s=0;s<r;s++)if(e[n-s-1]!==r)throw new Error("aes/pcks5: wrong padding");return o}function ih(e){const t=new Uint8Array(16),n=de(t);t.set(e);const r=pt-e.length;for(let o=pt-r;o<pt;o++)t[o]=r;return n}const Jc=Jf({blockSize:16,nonceLength:16},function(t,n,r={}){const o=!r.disablePadding;return{encrypt(s,i){const a=Wc(t),{b:c,o:l,out:d}=oh(s,o,i);let u=n;const f=[a];zt(u)||f.push(u=Ct(u));const h=de(u);let p=h[0],m=h[1],y=h[2],E=h[3],S=0;for(;S+4<=c.length;)p^=c[S+0],m^=c[S+1],y^=c[S+2],E^=c[S+3],{s0:p,s1:m,s2:y,s3:E}=ea(a,p,m,y,E),l[S++]=p,l[S++]=m,l[S++]=y,l[S++]=E;if(o){const L=ih(s.subarray(S*4));p^=L[0],m^=L[1],y^=L[2],E^=L[3],{s0:p,s1:m,s2:y,s3:E}=ea(a,p,m,y,E),l[S++]=p,l[S++]=m,l[S++]=y,l[S++]=E}return Zt(...f),d},decrypt(s,i){rh(s);const a=th(t);let c=n;const l=[a];zt(c)||l.push(c=Ct(c));const d=de(c);i=Kc(s.length,i),zt(s)||l.push(s=Ct(s)),Fc(s,i);const u=de(s),f=de(i);let h=d[0],p=d[1],m=d[2],y=d[3];for(let E=0;E+4<=u.length;){const S=h,L=p,O=m,P=y;h=u[E+0],p=u[E+1],m=u[E+2],y=u[E+3];const{s0:$,s1:v,s2:b,s3:g}=nh(a,h,p,m,y);f[E++]=$^S,f[E++]=v^L,f[E++]=b^O,f[E++]=g^P}return Zt(...l),sh(i,o)}}}),Yc=e=>Uint8Array.from(e.split(""),t=>t.charCodeAt(0)),ah=Yc("expand 16-byte k"),ch=Yc("expand 32-byte k"),lh=de(ah),dh=de(ch);function V(e,t){return e<<t|e>>>32-t}function Zo(e){return e.byteOffset%4===0}const Wn=64,uh=16,Zc=2**32-1,ta=Uint32Array.of();function fh(e,t,n,r,o,s,i,a){const c=o.length,l=new Uint8Array(Wn),d=de(l),u=Zo(o)&&Zo(s),f=u?de(o):ta,h=u?de(s):ta;for(let p=0;p<c;i++){if(e(t,n,r,d,i,a),i>=Zc)throw new Error("arx: counter overflow");const m=Math.min(Wn,c-p);if(u&&m===Wn){const y=p/4;if(p%4!==0)throw new Error("arx: invalid block position");for(let E=0,S;E<uh;E++)S=y+E,h[S]=f[S]^d[E];p+=Wn;continue}for(let y=0,E;y<m;y++)E=p+y,s[E]=o[E]^l[y];p+=m}}function hh(e,t){const{allowShortKeys:n,extendNonceFn:r,counterLength:o,counterRight:s,rounds:i}=Wf({allowShortKeys:!1,counterLength:8,counterRight:!1,rounds:20},t);if(typeof e!="function")throw new Error("core must be a function");return wo(o),wo(i),Qi(s),Qi(n),(a,c,l,d,u=0)=>{he(a,void 0,"key"),he(c,void 0,"nonce"),he(l,void 0,"data");const f=l.length;if(d===void 0&&(d=new Uint8Array(f)),he(d,void 0,"output"),wo(u),u<0||u>=Zc)throw new Error("arx: counter overflow");if(d.length<f)throw new Error(`arx: output (${d.length}) is shorter than data (${f})`);const h=[];let p=a.length,m,y;if(p===32)h.push(m=Ct(a)),y=dh;else if(p===16&&n)m=new Uint8Array(32),m.set(a),m.set(a,16),y=lh,h.push(m);else throw he(a,32,"arx key"),new Error("invalid key size");Zo(c)||h.push(c=Ct(c));const E=de(m);if(r){if(c.length!==24)throw new Error("arx: extended nonce must be 24 bytes");r(y,E,de(c.subarray(0,16)),E),c=c.subarray(16)}const S=16-o;if(S!==c.length)throw new Error(`arx: nonce must be ${S} or 16 bytes`);if(S!==12){const O=new Uint8Array(12);O.set(c,s?0:12-c.length),c=O,h.push(c)}const L=de(c);return fh(e,y,E,L,l,d,u,i),Zt(...h),d}}function ph(e,t,n,r,o,s=20){let i=e[0],a=e[1],c=e[2],l=e[3],d=t[0],u=t[1],f=t[2],h=t[3],p=t[4],m=t[5],y=t[6],E=t[7],S=o,L=n[0],O=n[1],P=n[2],$=i,v=a,b=c,g=l,k=d,_=u,A=f,w=h,I=p,x=m,T=y,C=E,N=S,M=L,B=O,U=P;for(let G=0;G<s;G+=2)$=$+k|0,N=V(N^$,16),I=I+N|0,k=V(k^I,12),$=$+k|0,N=V(N^$,8),I=I+N|0,k=V(k^I,7),v=v+_|0,M=V(M^v,16),x=x+M|0,_=V(_^x,12),v=v+_|0,M=V(M^v,8),x=x+M|0,_=V(_^x,7),b=b+A|0,B=V(B^b,16),T=T+B|0,A=V(A^T,12),b=b+A|0,B=V(B^b,8),T=T+B|0,A=V(A^T,7),g=g+w|0,U=V(U^g,16),C=C+U|0,w=V(w^C,12),g=g+w|0,U=V(U^g,8),C=C+U|0,w=V(w^C,7),$=$+_|0,U=V(U^$,16),T=T+U|0,_=V(_^T,12),$=$+_|0,U=V(U^$,8),T=T+U|0,_=V(_^T,7),v=v+A|0,N=V(N^v,16),C=C+N|0,A=V(A^C,12),v=v+A|0,N=V(N^v,8),C=C+N|0,A=V(A^C,7),b=b+w|0,M=V(M^b,16),I=I+M|0,w=V(w^I,12),b=b+w|0,M=V(M^b,8),I=I+M|0,w=V(w^I,7),g=g+k|0,B=V(B^g,16),x=x+B|0,k=V(k^x,12),g=g+k|0,B=V(B^g,8),x=x+B|0,k=V(k^x,7);let D=0;r[D++]=i+$|0,r[D++]=a+v|0,r[D++]=c+b|0,r[D++]=l+g|0,r[D++]=d+k|0,r[D++]=u+_|0,r[D++]=f+A|0,r[D++]=h+w|0,r[D++]=p+I|0,r[D++]=m+x|0,r[D++]=y+T|0,r[D++]=E+C|0,r[D++]=S+N|0,r[D++]=L+M|0,r[D++]=O+B|0,r[D++]=P+U|0}const jr=hh(ph,{counterRight:!1,counterLength:4,allowShortKeys:!1});function Xc(e,t,n){return $n(e),n===void 0&&(n=new Uint8Array(e.outputLen)),tt(e,n,t)}const ko=Uint8Array.of(0),na=Uint8Array.of();function Qc(e,t,n,r=32){$n(e),_e(r,"length");const o=e.outputLen;if(r>255*o)throw new Error("Length must be <= 255*HashLen");const s=Math.ceil(r/o);n===void 0?n=na:H(n,void 0,"info");const i=new Uint8Array(s*o),a=tt.create(e,t),c=a._cloneInto(),l=new Uint8Array(a.outputLen);for(let d=0;d<s;d++)ko[0]=d+1,c.update(d===0?na:l).update(n).update(ko).digestInto(l),i.set(l,o*d),a._cloneInto(c);return a.destroy(),c.destroy(),je(l,ko),i.slice(0,r)}var mh=Object.defineProperty,Z=(e,t)=>{for(var n in t)mh(e,n,{get:t[n],enumerable:!0})},Bt=Symbol("verified"),yh=e=>e instanceof Object;function $s(e){if(!yh(e)||typeof e.kind!="number"||typeof e.content!="string"||typeof e.created_at!="number"||typeof e.pubkey!="string"||!e.pubkey.match(/^[a-f0-9]{64}$/)||!Array.isArray(e.tags))return!1;for(let t=0;t<e.tags.length;t++){let n=e.tags[t];if(!Array.isArray(n))return!1;for(let r=0;r<n.length;r++)if(typeof n[r]!="string")return!1}return!0}var gh={};Z(gh,{binarySearch:()=>Ms,bytesToHex:()=>j,hexToBytes:()=>z,insertEventIntoAscendingList:()=>wh,insertEventIntoDescendingList:()=>vh,mergeReverseSortedLists:()=>Eh,normalizeURL:()=>bh,utf8Decoder:()=>Qe,utf8Encoder:()=>xe});var Qe=new TextDecoder("utf-8"),xe=new TextEncoder;function bh(e){try{e.indexOf("://")===-1&&(e="wss://"+e);let t=new URL(e);return t.protocol==="http:"?t.protocol="ws:":t.protocol==="https:"&&(t.protocol="wss:"),t.pathname=t.pathname.replace(/\/+/g,"/"),t.pathname.endsWith("/")&&(t.pathname=t.pathname.slice(0,-1)),(t.port==="80"&&t.protocol==="ws:"||t.port==="443"&&t.protocol==="wss:")&&(t.port=""),t.searchParams.sort(),t.hash="",t.toString()}catch{throw new Error(`Invalid URL: ${e}`)}}function vh(e,t){const[n,r]=Ms(e,o=>t.id===o.id?0:t.created_at===o.created_at?-1:o.created_at-t.created_at);return r||e.splice(n,0,t),e}function wh(e,t){const[n,r]=Ms(e,o=>t.id===o.id?0:t.created_at===o.created_at?-1:t.created_at-o.created_at);return r||e.splice(n,0,t),e}function Ms(e,t){let n=0,r=e.length-1;for(;n<=r;){const o=Math.floor((n+r)/2),s=t(e[o]);if(s===0)return[o,!0];s<0?r=o-1:n=o+1}return[n,!1]}function Eh(e,t){const n=new Array(e.length+t.length);n.length=0;let r=0,o=0,s=[];for(;r<e.length&&o<t.length;){let i;if(e[r]?.created_at>t[o]?.created_at?(i=e[r],r++):(i=t[o],o++),n.length>0&&n[n.length-1].created_at===i.created_at){if(s.includes(i.id))continue}else s.length=0;n.push(i),s.push(i.id)}for(;r<e.length;){const i=e[r];if(r++,n.length>0&&n[n.length-1].created_at===i.created_at){if(s.includes(i.id))continue}else s.length=0;n.push(i),s.push(i.id)}for(;o<t.length;){const i=t[o];if(o++,n.length>0&&n[n.length-1].created_at===i.created_at){if(s.includes(i.id))continue}else s.length=0;n.push(i),s.push(i.id)}return n}var kh=class{generateSecretKey(){return Q.utils.randomSecretKey()}getPublicKey(t){return j(Q.getPublicKey(t))}finalizeEvent(t,n){const r=t;return r.pubkey=j(Q.getPublicKey(n)),r.id=ir(r),r.sig=j(Q.sign(z(ir(r)),n)),r[Bt]=!0,r}verifyEvent(t){if(typeof t[Bt]=="boolean")return t[Bt];try{const n=ir(t);if(n!==t.id)return t[Bt]=!1,!1;const r=Q.verify(z(t.sig),z(n),z(t.pubkey));return t[Bt]=r,r}catch{return t[Bt]=!1,!1}}};function _h(e){if(!$s(e))throw new Error("can't serialize event with wrong or missing properties");return JSON.stringify([0,e.pubkey,e.created_at,e.kind,e.tags,e.content])}function ir(e){let t=se(xe.encode(_h(e)));return j(t)}var Hr=new kh,xh=Hr.generateSecretKey,Fr=Hr.getPublicKey,Ve=Hr.finalizeEvent,Os=Hr.verifyEvent,Sh={};Z(Sh,{Application:()=>Pp,BadgeAward:()=>$h,BadgeDefinition:()=>Tp,BlockedRelaysList:()=>fp,BlossomServerList:()=>vp,BookmarkList:()=>lp,Bookmarksets:()=>Rp,Calendar:()=>Gp,CalendarEventRSVP:()=>Kp,ChannelCreation:()=>sl,ChannelHideMessage:()=>cl,ChannelMessage:()=>al,ChannelMetadata:()=>il,ChannelMuteUser:()=>ll,ChatMessage:()=>Mh,ClassifiedListing:()=>qp,ClientAuth:()=>ul,Comment:()=>Fh,CommunitiesList:()=>dp,CommunityDefinition:()=>Jp,CommunityPostApproval:()=>Zh,Contacts:()=>Th,CreateOrUpdateProduct:()=>$p,CreateOrUpdateStall:()=>Np,Curationsets:()=>Ap,Date:()=>Hp,DirectMessageRelaysList:()=>gp,DraftClassifiedListing:()=>jp,DraftLong:()=>Op,Emojisets:()=>Bp,EncryptedDirectMessage:()=>Lh,EventDeletion:()=>Nh,FavoriteRelays:()=>pp,FileMessage:()=>Bh,FileMetadata:()=>Hh,FileServerPreference:()=>bp,Followsets:()=>xp,ForumThread:()=>Oh,GenericRepost:()=>qs,Genericlists:()=>Sp,GiftWrap:()=>dl,GroupMetadata:()=>Yp,HTTPAuth:()=>js,Handlerinformation:()=>Wp,Handlerrecommendation:()=>zp,Highlights:()=>op,InterestsList:()=>mp,Interestsets:()=>Lp,JobFeedback:()=>ep,JobRequest:()=>Xh,JobResult:()=>Qh,Label:()=>Yh,LightningPubRPC:()=>Ep,LiveChatMessage:()=>Gh,LiveEvent:()=>Up,LongFormArticle:()=>Mp,Metadata:()=>Ah,Mutelist:()=>ip,NWCWalletInfo:()=>wp,NWCWalletRequest:()=>fl,NWCWalletResponse:()=>kp,NormalVideo:()=>Uh,NostrConnect:()=>_p,OpenTimestamps:()=>qh,Photo:()=>Ph,Pinlist:()=>ap,Poll:()=>jh,PollResponse:()=>sp,PrivateDirectMessage:()=>ol,ProblemTracker:()=>zh,ProfileBadges:()=>Cp,PublicChatsList:()=>up,Reaction:()=>Ds,RecommendRelay:()=>Ch,RelayList:()=>cp,RelayReview:()=>Vp,Relaysets:()=>Ip,Report:()=>Wh,Reporting:()=>Jh,Repost:()=>Us,Seal:()=>rl,SearchRelaysList:()=>hp,ShortTextNote:()=>nl,ShortVideo:()=>Dh,Time:()=>Fp,UserEmojiList:()=>yp,UserStatuses:()=>Dp,Voice:()=>Kh,VoiceComment:()=>Vh,Zap:()=>rp,ZapGoal:()=>tp,ZapRequest:()=>np,classifyKind:()=>Ih,isAddressableKind:()=>Ps,isEphemeralKind:()=>tl,isKind:()=>Rh,isRegularKind:()=>el,isReplaceableKind:()=>Bs});function el(e){return e<1e4&&e!==0&&e!==3}function Bs(e){return e===0||e===3||1e4<=e&&e<2e4}function tl(e){return 2e4<=e&&e<3e4}function Ps(e){return 3e4<=e&&e<4e4}function Ih(e){return el(e)?"regular":Bs(e)?"replaceable":tl(e)?"ephemeral":Ps(e)?"parameterized":"unknown"}function Rh(e,t){const n=t instanceof Array?t:[t];return $s(e)&&n.includes(e.kind)||!1}var Ah=0,nl=1,Ch=2,Th=3,Lh=4,Nh=5,Us=6,Ds=7,$h=8,Mh=9,Oh=11,rl=13,ol=14,Bh=15,qs=16,Ph=20,Uh=21,Dh=22,sl=40,il=41,al=42,cl=43,ll=44,qh=1040,dl=1059,jh=1068,Hh=1063,Fh=1111,Gh=1311,Kh=1222,Vh=1244,zh=1971,Wh=1984,Jh=1984,Yh=1985,Zh=4550,Xh=5999,Qh=6999,ep=7e3,tp=9041,np=9734,rp=9735,op=9802,sp=1018,ip=1e4,ap=10001,cp=10002,lp=10003,dp=10004,up=10005,fp=10006,hp=10007,pp=10012,mp=10015,yp=10030,gp=10050,bp=10096,vp=10063,wp=13194,Ep=21e3,ul=22242,fl=23194,kp=23195,_p=24133,js=27235,xp=3e4,Sp=30001,Ip=30002,Rp=30003,Ap=30004,Cp=30008,Tp=30009,Lp=30015,Np=30017,$p=30018,Mp=30023,Op=30024,Bp=30030,Pp=30078,Up=30311,Dp=30315,qp=30402,jp=30403,Hp=31922,Fp=31923,Gp=31924,Kp=31925,Vp=31987,zp=31989,Wp=31990,Jp=34550,Yp=39e3,Zp={};Z(Zp,{getHex64:()=>Hs,getInt:()=>hl,getSubscriptionId:()=>Xp,matchEventId:()=>Qp,matchEventKind:()=>tm,matchEventPubkey:()=>em});function Hs(e,t){let n=t.length+3,r=e.indexOf(`"${t}":`)+n,o=e.slice(r).indexOf('"')+r+1;return e.slice(o,o+64)}function hl(e,t){let n=t.length,r=e.indexOf(`"${t}":`)+n+3,o=e.slice(r),s=Math.min(o.indexOf(","),o.indexOf("}"));return parseInt(o.slice(0,s),10)}function Xp(e){let t=e.slice(0,22).indexOf('"EVENT"');if(t===-1)return null;let n=e.slice(t+7+1).indexOf('"');if(n===-1)return null;let r=t+7+1+n,o=e.slice(r+1,80).indexOf('"');if(o===-1)return null;let s=r+1+o;return e.slice(r+1,s)}function Qp(e,t){return t===Hs(e,"id")}function em(e,t){return t===Hs(e,"pubkey")}function tm(e,t){return t===hl(e,"kind")}var nm={};Z(nm,{makeAuthEvent:()=>rm});function rm(e,t){return{kind:ul,created_at:Math.floor(Date.now()/1e3),tags:[["relay",e],["challenge",t]],content:""}}var om;try{om=WebSocket}catch{}var sm;try{sm=WebSocket}catch{}var im={};Z(im,{BECH32_REGEX:()=>pl,Bech32MaxSize:()=>Fs,NostrTypeGuard:()=>am,decode:()=>Gr,decodeNostrURI:()=>lm,encodeBytes:()=>Vr,naddrEncode:()=>mm,neventEncode:()=>pm,noteEncode:()=>fm,nprofileEncode:()=>hm,npubEncode:()=>um,nsecEncode:()=>dm});var am={isNProfile:e=>/^nprofile1[a-z\d]+$/.test(e||""),isNEvent:e=>/^nevent1[a-z\d]+$/.test(e||""),isNAddr:e=>/^naddr1[a-z\d]+$/.test(e||""),isNSec:e=>/^nsec1[a-z\d]{58}$/.test(e||""),isNPub:e=>/^npub1[a-z\d]{58}$/.test(e||""),isNote:e=>/^note1[a-z\d]+$/.test(e||""),isNcryptsec:e=>/^ncryptsec1[a-z\d]+$/.test(e||"")},Fs=5e3,pl=/[\x21-\x7E]{1,83}1[023456789acdefghjklmnpqrstuvwxyz]{6,}/;function cm(e){const t=new Uint8Array(4);return t[0]=e>>24&255,t[1]=e>>16&255,t[2]=e>>8&255,t[3]=e&255,t}function lm(e){try{return e.startsWith("nostr:")&&(e=e.substring(6)),Gr(e)}catch{return{type:"invalid",data:null}}}function Gr(e){let{prefix:t,words:n}=Fe.decode(e,Fs),r=new Uint8Array(Fe.fromWords(n));switch(t){case"nprofile":{let o=_o(r);if(!o[0]?.[0])throw new Error("missing TLV 0 for nprofile");if(o[0][0].length!==32)throw new Error("TLV 0 should be 32 bytes");return{type:"nprofile",data:{pubkey:j(o[0][0]),relays:o[1]?o[1].map(s=>Qe.decode(s)):[]}}}case"nevent":{let o=_o(r);if(!o[0]?.[0])throw new Error("missing TLV 0 for nevent");if(o[0][0].length!==32)throw new Error("TLV 0 should be 32 bytes");if(o[2]&&o[2][0].length!==32)throw new Error("TLV 2 should be 32 bytes");if(o[3]&&o[3][0].length!==4)throw new Error("TLV 3 should be 4 bytes");return{type:"nevent",data:{id:j(o[0][0]),relays:o[1]?o[1].map(s=>Qe.decode(s)):[],author:o[2]?.[0]?j(o[2][0]):void 0,kind:o[3]?.[0]?parseInt(j(o[3][0]),16):void 0}}}case"naddr":{let o=_o(r);if(!o[0]?.[0])throw new Error("missing TLV 0 for naddr");if(!o[2]?.[0])throw new Error("missing TLV 2 for naddr");if(o[2][0].length!==32)throw new Error("TLV 2 should be 32 bytes");if(!o[3]?.[0])throw new Error("missing TLV 3 for naddr");if(o[3][0].length!==4)throw new Error("TLV 3 should be 4 bytes");return{type:"naddr",data:{identifier:Qe.decode(o[0][0]),pubkey:j(o[2][0]),kind:parseInt(j(o[3][0]),16),relays:o[1]?o[1].map(s=>Qe.decode(s)):[]}}}case"nsec":return{type:t,data:r};case"npub":case"note":return{type:t,data:j(r)};default:throw new Error(`unknown prefix ${t}`)}}function _o(e){let t={},n=e;for(;n.length>0;){let r=n[0],o=n[1],s=n.slice(2,2+o);if(n=n.slice(2+o),s.length<o)throw new Error(`not enough data to read on TLV ${r}`);t[r]=t[r]||[],t[r].push(s)}return t}function dm(e){return Vr("nsec",e)}function um(e){return Vr("npub",z(e))}function fm(e){return Vr("note",z(e))}function Kr(e,t){let n=Fe.toWords(t);return Fe.encode(e,n,Fs)}function Vr(e,t){return Kr(e,t)}function hm(e){let t=Gs({0:[z(e.pubkey)],1:(e.relays||[]).map(n=>xe.encode(n))});return Kr("nprofile",t)}function pm(e){let t;e.kind!==void 0&&(t=cm(e.kind));let n=Gs({0:[z(e.id)],1:(e.relays||[]).map(r=>xe.encode(r)),2:e.author?[z(e.author)]:[],3:t?[new Uint8Array(t)]:[]});return Kr("nevent",n)}function mm(e){let t=new ArrayBuffer(4);new DataView(t).setUint32(0,e.kind,!1);let n=Gs({0:[xe.encode(e.identifier)],1:(e.relays||[]).map(r=>xe.encode(r)),2:[z(e.pubkey)],3:[new Uint8Array(t)]});return Kr("naddr",n)}function Gs(e){let t=[];return Object.entries(e).reverse().forEach(([n,r])=>{r.forEach(o=>{let s=new Uint8Array(o.length+2);s.set([parseInt(n)],0),s.set([o.length],1),s.set(o,2),t.push(s)})}),oe(...t)}var ym={};Z(ym,{decrypt:()=>gm,encrypt:()=>ml});function ml(e,t,n){const r=e instanceof Uint8Array?e:z(e),o=Pe.getSharedSecret(r,z("02"+t)),s=yl(o);let i=Uint8Array.from(vt(16)),a=xe.encode(n),c=Jc(s,i).encrypt(a),l=He.encode(new Uint8Array(c)),d=He.encode(new Uint8Array(i.buffer));return`${l}?iv=${d}`}function gm(e,t,n){const r=e instanceof Uint8Array?e:z(e);let[o,s]=n.split("?iv="),i=Pe.getSharedSecret(r,z("02"+t)),a=yl(i),c=He.decode(s),l=He.decode(o),d=Jc(a,c).decrypt(l);return Qe.decode(d)}function yl(e){return e.slice(1,33)}var bm={};Z(bm,{NIP05_REGEX:()=>Ks,isNip05:()=>vm,isValid:()=>km,queryProfile:()=>gl,searchDomain:()=>Em,useFetchImplementation:()=>wm});var Ks=/^(?:([\w.+-]+)@)?([\w_-]+(\.[\w_-]+)+)$/,vm=e=>Ks.test(e||""),zr;try{zr=fetch}catch{}function wm(e){zr=e}async function Em(e,t=""){try{const n=`https://${e}/.well-known/nostr.json?name=${t}`,r=await zr(n,{redirect:"manual"});if(r.status!==200)throw Error("Wrong response code");return(await r.json()).names}catch{return{}}}async function gl(e){const t=e.match(Ks);if(!t)return null;const[,n="_",r]=t;try{const o=`https://${r}/.well-known/nostr.json?name=${n}`,s=await zr(o,{redirect:"manual"});if(s.status!==200)throw Error("Wrong response code");const i=await s.json(),a=i.names[n];return a?{pubkey:a,relays:i.relays?.[a]}:null}catch{return null}}async function km(e,t){const n=await gl(t);return n?n.pubkey===e:!1}var _m={};Z(_m,{parse:()=>xm});function xm(e){const t={reply:void 0,root:void 0,mentions:[],profiles:[],quotes:[]};let n,r;for(let o=e.tags.length-1;o>=0;o--){const s=e.tags[o];if(s[0]==="e"&&s[1]){const[i,a,c,l,d]=s,u={id:a,relays:c?[c]:[],author:d};if(l==="root"){t.root=u;continue}if(l==="reply"){t.reply=u;continue}if(l==="mention"){t.mentions.push(u);continue}n?r=u:n=u,t.mentions.push(u);continue}if(s[0]==="q"&&s[1]){const[i,a,c]=s;t.quotes.push({id:a,relays:c?[c]:[]})}if(s[0]==="p"&&s[1]){t.profiles.push({pubkey:s[1],relays:s[2]?[s[2]]:[]});continue}}return t.root||(t.root=r||n||t.reply),t.reply||(t.reply=n||t.root),[t.reply,t.root].forEach(o=>{if(!o)return;let s=t.mentions.indexOf(o);if(s!==-1&&t.mentions.splice(s,1),o.author){let i=t.profiles.find(a=>a.pubkey===o.author);i&&i.relays&&(o.relays||(o.relays=[]),i.relays.forEach(a=>{o.relays?.indexOf(a)===-1&&o.relays.push(a)}),i.relays=o.relays)}}),t.mentions.forEach(o=>{if(o.author){let s=t.profiles.find(i=>i.pubkey===o.author);s&&s.relays&&(o.relays||(o.relays=[]),s.relays.forEach(i=>{o.relays.indexOf(i)===-1&&o.relays.push(i)}),s.relays=o.relays)}}),t}var Sm={};Z(Sm,{fetchRelayInformation:()=>Rm,useFetchImplementation:()=>Im});var bl;try{bl=fetch}catch{}function Im(e){bl=e}async function Rm(e){return await(await fetch(e.replace("ws://","http://").replace("wss://","https://"),{headers:{Accept:"application/nostr+json"}})).json()}var Am={};Z(Am,{getPow:()=>Cm,minePow:()=>Lm});function Cm(e){let t=0;for(let n=0;n<64;n+=8){const r=parseInt(e.substring(n,n+8),16);if(r===0)t+=32;else{t+=Math.clz32(r);break}}return t}function Tm(e){let t=0;for(let n=0;n<e.length;n++){const r=e[n];if(r===0)t+=8;else{t+=Math.clz32(r)-24;break}}return t}function Lm(e,t){let n=0;const r=e,o=["nonce",n.toString(),t.toString()];for(r.tags.push(o);;){const s=Math.floor(new Date().getTime()/1e3);s!==r.created_at&&(n=0,r.created_at=s),o[1]=(++n).toString();const i=se(xe.encode(JSON.stringify([0,r.pubkey,r.created_at,r.kind,r.tags,r.content])));if(Tm(i)>=t){r.id=j(i);break}}return r}var Nm={};Z(Nm,{unwrapEvent:()=>Gm,unwrapManyEvents:()=>Km,wrapEvent:()=>Ll,wrapManyEvents:()=>Fm});var $m={};Z($m,{createRumor:()=>Rl,createSeal:()=>Al,createWrap:()=>Cl,unwrapEvent:()=>Ys,unwrapManyEvents:()=>Tl,wrapEvent:()=>Sr,wrapManyEvents:()=>jm});var Mm={};Z(Mm,{decrypt:()=>Js,encrypt:()=>Ws,getConversationKey:()=>Vs,v2:()=>Dm});var vl=1,wl=65535;function Vs(e,t){const n=Pe.getSharedSecret(e,z("02"+t)).subarray(1,33);return Xc(se,n,xe.encode("nip44-v2"))}function El(e,t){const n=Qc(se,e,t,76);return{chacha_key:n.subarray(0,32),chacha_nonce:n.subarray(32,44),hmac_key:n.subarray(44,76)}}function zs(e){if(!Number.isSafeInteger(e)||e<1)throw new Error("expected positive integer");if(e<=32)return 32;const t=1<<Math.floor(Math.log2(e-1))+1,n=t<=256?32:t/8;return n*(Math.floor((e-1)/n)+1)}function Om(e){if(!Number.isSafeInteger(e)||e<vl||e>wl)throw new Error("invalid plaintext size: must be between 1 and 65535 bytes");const t=new Uint8Array(2);return new DataView(t.buffer).setUint16(0,e,!1),t}function Bm(e){const t=xe.encode(e),n=t.length,r=Om(n),o=new Uint8Array(zs(n)-n);return oe(r,t,o)}function Pm(e){const t=new DataView(e.buffer).getUint16(0),n=e.subarray(2,2+t);if(t<vl||t>wl||n.length!==t||e.length!==2+zs(t))throw new Error("invalid padding");return Qe.decode(n)}function kl(e,t,n){if(n.length!==32)throw new Error("AAD associated data must be 32 bytes");const r=oe(n,t);return tt(se,e,r)}function Um(e){if(typeof e!="string")throw new Error("payload must be a valid string");const t=e.length;if(t<132||t>87472)throw new Error("invalid payload length: "+t);if(e[0]==="#")throw new Error("unknown encryption version");let n;try{n=He.decode(e)}catch(s){throw new Error("invalid base64: "+s.message)}const r=n.length;if(r<99||r>65603)throw new Error("invalid data length: "+r);const o=n[0];if(o!==2)throw new Error("unknown encryption version "+o);return{nonce:n.subarray(1,33),ciphertext:n.subarray(33,-32),mac:n.subarray(-32)}}function Ws(e,t,n=vt(32)){const{chacha_key:r,chacha_nonce:o,hmac_key:s}=El(t,n),i=Bm(e),a=jr(r,o,i),c=kl(s,a,n);return He.encode(oe(new Uint8Array([2]),n,a,c))}function Js(e,t){const{nonce:n,ciphertext:r,mac:o}=Um(e),{chacha_key:s,chacha_nonce:i,hmac_key:a}=El(t,n),c=kl(a,r,n);if(!Gc(c,o))throw new Error("invalid MAC");const l=jr(s,i,r);return Pm(l)}var Dm={utils:{getConversationKey:Vs,calcPaddedLen:zs},encrypt:Ws,decrypt:Js},qm=2880*60,_l=()=>Math.round(Date.now()/1e3),xl=()=>Math.round(_l()-Math.random()*qm),Sl=(e,t)=>Vs(e,t),Il=(e,t,n)=>Ws(JSON.stringify(e),Sl(t,n)),ra=(e,t)=>JSON.parse(Js(e.content,Sl(t,e.pubkey)));function Rl(e,t){const n={created_at:_l(),content:"",tags:[],...e,pubkey:Fr(t)};return n.id=ir(n),n}function Al(e,t,n){return Ve({kind:rl,content:Il(e,t,n),created_at:xl(),tags:[]},t)}function Cl(e,t){const n=xh();return Ve({kind:dl,content:Il(e,n,t),created_at:xl(),tags:[["p",t]]},n)}function Sr(e,t,n){const r=Rl(e,t),o=Al(r,t,n);return Cl(o,n)}function jm(e,t,n){if(!n||n.length===0)throw new Error("At least one recipient is required.");const r=Fr(t),o=[Sr(e,t,r)];return n.forEach(s=>{o.push(Sr(e,t,s))}),o}function Ys(e,t){const n=ra(e,t);return ra(n,t)}function Tl(e,t){let n=[];return e.forEach(r=>{n.push(Ys(r,t))}),n.sort((r,o)=>r.created_at-o.created_at),n}function Hm(e,t,n,r){const o={created_at:Math.ceil(Date.now()/1e3),kind:ol,tags:[],content:t};return(Array.isArray(e)?e:[e]).forEach(({publicKey:i,relayUrl:a})=>{o.tags.push(a?["p",i,a]:["p",i])}),r&&o.tags.push(["e",r.eventId,r.relayUrl||"","reply"]),n&&o.tags.push(["subject",n]),o}function Ll(e,t,n,r,o){const s=Hm(t,n,r,o);return Sr(s,e,t.publicKey)}function Fm(e,t,n,r,o){if(!t||t.length===0)throw new Error("At least one recipient is required.");return[{publicKey:Fr(e)},...t].map(i=>Ll(e,i,n,r,o))}var Gm=Ys,Km=Tl,Vm={};Z(Vm,{finishRepostEvent:()=>zm,getRepostedEvent:()=>Wm,getRepostedEventPointer:()=>Nl});function zm(e,t,n,r){let o;const s=[...e.tags??[],["e",t.id,n],["p",t.pubkey]];return t.kind===nl?o=Us:(o=qs,s.push(["k",String(t.kind)])),Ve({kind:o,tags:s,content:e.content===""||t.tags?.find(i=>i[0]==="-")?"":JSON.stringify(t),created_at:e.created_at},r)}function Nl(e){if(![Us,qs].includes(e.kind))return;let t,n;for(let r=e.tags.length-1;r>=0&&(t===void 0||n===void 0);r--){const o=e.tags[r];o.length>=2&&(o[0]==="e"&&t===void 0?t=o:o[0]==="p"&&n===void 0&&(n=o))}if(t!==void 0)return{id:t[1],relays:[t[2],n?.[2]].filter(r=>typeof r=="string"),author:n?.[1]}}function Wm(e,{skipVerification:t}={}){const n=Nl(e);if(n===void 0||e.content==="")return;let r;try{r=JSON.parse(e.content)}catch{return}if(r.id===n.id&&!(!t&&!Os(r)))return r}var Jm={};Z(Jm,{NOSTR_URI_REGEX:()=>Zs,parse:()=>Zm,test:()=>Ym});var Zs=new RegExp(`nostr:(${pl.source})`);function Ym(e){return typeof e=="string"&&new RegExp(`^${Zs.source}$`).test(e)}function Zm(e){const t=e.match(new RegExp(`^${Zs.source}$`));if(!t)throw new Error(`Invalid Nostr URI: ${e}`);return{uri:t[0],value:t[1],decoded:Gr(t[1])}}var Xm={};Z(Xm,{finishReactionEvent:()=>Qm,getReactedEventPointer:()=>ey});function Qm(e,t,n){const r=t.tags.filter(o=>o.length>=2&&(o[0]==="e"||o[0]==="p"));return Ve({...e,kind:Ds,tags:[...e.tags??[],...r,["e",t.id],["p",t.pubkey]],content:e.content??"+"},n)}function ey(e){if(e.kind!==Ds)return;let t,n;for(let r=e.tags.length-1;r>=0&&(t===void 0||n===void 0);r--){const o=e.tags[r];o.length>=2&&(o[0]==="e"&&t===void 0?t=o:o[0]==="p"&&n===void 0&&(n=o))}if(!(t===void 0||n===void 0))return{id:t[1],relays:[t[2],n[2]].filter(r=>r!==void 0),author:n[1]}}var ty={};Z(ty,{parse:()=>ry});var xo=/\W/m,oa=/[^\w\/] |[^\w\/]$|$|,| /m,ny=42;function*ry(e){let t=[];if(typeof e!="string"){for(let s=0;s<e.tags.length;s++){const i=e.tags[s];i[0]==="emoji"&&i.length>=3&&t.push({type:"emoji",shortcode:i[1],url:i[2]})}e=e.content}const n=e.length;let r=0,o=0;e:for(;o<n;){const s=e.indexOf(":",o),i=e.indexOf("#",o);if(s===-1&&i===-1)break e;if(s===-1||i>=0&&i<s){if(i===0||e[i-1].match(xo)){const a=e.slice(i+1,i+ny).match(xo),c=a?i+1+a.index:n;yield{type:"text",text:e.slice(r,i)},yield{type:"hashtag",value:e.slice(i+1,c)},o=c,r=o;continue e}o=i+1;continue e}if(e.slice(s-5,s)==="nostr"){const a=e.slice(s+60).match(xo),c=a?s+60+a.index:n;try{let l,{data:d,type:u}=Gr(e.slice(s+1,c));switch(u){case"npub":l={pubkey:d};break;case"note":l={id:d};break;case"nsec":o=c+1;continue;default:l=d}r!==s-5&&(yield{type:"text",text:e.slice(r,s-5)}),yield{type:"reference",pointer:l},o=c,r=o;continue e}catch{o=s+1;continue e}}else if(e.slice(s-5,s)==="https"||e.slice(s-4,s)==="http"){const a=e.slice(s+4).match(oa),c=a?s+4+a.index:n,l=e[s-1]==="s"?5:4;try{let d=new URL(e.slice(s-l,c));if(d.hostname.indexOf(".")===-1)throw new Error("invalid url");if(r!==s-l&&(yield{type:"text",text:e.slice(r,s-l)}),/\.(png|jpe?g|gif|webp|heic|svg)$/i.test(d.pathname)){yield{type:"image",url:d.toString()},o=c,r=o;continue e}if(/\.(mp4|avi|webm|mkv|mov)$/i.test(d.pathname)){yield{type:"video",url:d.toString()},o=c,r=o;continue e}if(/\.(mp3|aac|ogg|opus|wav|flac)$/i.test(d.pathname)){yield{type:"audio",url:d.toString()},o=c,r=o;continue e}yield{type:"url",url:d.toString()},o=c,r=o;continue e}catch{o=c+1;continue e}}else if(e.slice(s-3,s)==="wss"||e.slice(s-2,s)==="ws"){const a=e.slice(s+4).match(oa),c=a?s+4+a.index:n,l=e[s-1]==="s"?3:2;try{let d=new URL(e.slice(s-l,c));if(d.hostname.indexOf(".")===-1)throw new Error("invalid ws url");r!==s-l&&(yield{type:"text",text:e.slice(r,s-l)}),yield{type:"relay",url:d.toString()},o=c,r=o;continue e}catch{o=c+1;continue e}}else{for(let a=0;a<t.length;a++){const c=t[a];if(e[s+c.shortcode.length+1]===":"&&e.slice(s+1,s+c.shortcode.length+1)===c.shortcode){r!==s&&(yield{type:"text",text:e.slice(r,s)}),yield c,o=s+c.shortcode.length+2,r=o;continue e}}o=s+1;continue e}}r!==n&&(yield{type:"text",text:e.slice(r)})}var oy={};Z(oy,{channelCreateEvent:()=>sy,channelHideMessageEvent:()=>cy,channelMessageEvent:()=>ay,channelMetadataEvent:()=>iy,channelMuteUserEvent:()=>ly});var sy=(e,t)=>{let n;if(typeof e.content=="object")n=JSON.stringify(e.content);else if(typeof e.content=="string")n=e.content;else return;return Ve({kind:sl,tags:[...e.tags??[]],content:n,created_at:e.created_at},t)},iy=(e,t)=>{let n;if(typeof e.content=="object")n=JSON.stringify(e.content);else if(typeof e.content=="string")n=e.content;else return;return Ve({kind:il,tags:[["e",e.channel_create_event_id],...e.tags??[]],content:n,created_at:e.created_at},t)},ay=(e,t)=>{const n=[["e",e.channel_create_event_id,e.relay_url,"root"]];return e.reply_to_channel_message_event_id&&n.push(["e",e.reply_to_channel_message_event_id,e.relay_url,"reply"]),Ve({kind:al,tags:[...n,...e.tags??[]],content:e.content,created_at:e.created_at},t)},cy=(e,t)=>{let n;if(typeof e.content=="object")n=JSON.stringify(e.content);else if(typeof e.content=="string")n=e.content;else return;return Ve({kind:cl,tags:[["e",e.channel_message_event_id],...e.tags??[]],content:n,created_at:e.created_at},t)},ly=(e,t)=>{let n;if(typeof e.content=="object")n=JSON.stringify(e.content);else if(typeof e.content=="string")n=e.content;else return;return Ve({kind:ll,tags:[["p",e.pubkey_to_mute],...e.tags??[]],content:n,created_at:e.created_at},t)},dy={};Z(dy,{EMOJI_SHORTCODE_REGEX:()=>$l,matchAll:()=>uy,regex:()=>Xs,replaceAll:()=>fy});var $l=/:(\w+):/,Xs=()=>new RegExp(`\\B${$l.source}\\B`,"g");function*uy(e){const t=e.matchAll(Xs());for(const n of t)try{const[r,o]=n;yield{shortcode:r,name:o,start:n.index,end:n.index+r.length}}catch{}}function fy(e,t){return e.replaceAll(Xs(),(n,r)=>t({shortcode:n,name:r}))}var hy={};Z(hy,{useFetchImplementation:()=>py,validateGithub:()=>my});var Qs;try{Qs=fetch}catch{}function py(e){Qs=e}async function my(e,t,n){try{return await(await Qs(`https://gist.github.com/${t}/${n}/raw`)).text()===`Verifying that I control the following Nostr public key: ${e}`}catch{return!1}}var yy={};Z(yy,{makeNwcRequestEvent:()=>by,parseConnectionString:()=>gy});function gy(e){const{host:t,pathname:n,searchParams:r}=new URL(e),o=n||t,s=r.get("relay"),i=r.get("secret");if(!o||!s||!i)throw new Error("invalid connection string");return{pubkey:o,relay:s,secret:i}}async function by(e,t,n){const o=ml(t,e,JSON.stringify({method:"pay_invoice",params:{invoice:n}})),s={kind:fl,created_at:Math.round(Date.now()/1e3),content:o,tags:[["p",e]]};return Ve(s,t)}var vy={};Z(vy,{normalizeIdentifier:()=>wy});function wy(e){return e=e.trim().toLowerCase(),e=e.normalize("NFKC"),Array.from(e).map(t=>new RegExp("\\p{Letter}","u").test(t)||new RegExp("\\p{Number}","u").test(t)?t:"-").join("")}var Ey={};Z(Ey,{getSatoshisAmountFromBolt11:()=>Ry,getZapEndpoint:()=>_y,makeZapReceipt:()=>Iy,makeZapRequest:()=>xy,useFetchImplementation:()=>ky,validateZapRequest:()=>Sy});var ei;try{ei=fetch}catch{}function ky(e){ei=e}async function _y(e){try{let t="",{lud06:n,lud16:r}=JSON.parse(e.content);if(r){let[i,a]=r.split("@");t=new URL(`/.well-known/lnurlp/${i}`,`https://${a}`).toString()}else if(n){let{words:i}=Fe.decode(n,1e3),a=Fe.fromWords(i);t=Qe.decode(a)}else return null;let s=await(await ei(t)).json();if(s.allowsNostr&&s.nostrPubkey)return s.callback}catch{}return null}function xy(e){let t={kind:9734,created_at:Math.round(Date.now()/1e3),content:e.comment||"",tags:[["p","pubkey"in e?e.pubkey:e.event.pubkey],["amount",e.amount.toString()],["relays",...e.relays]]};if("event"in e){if(t.tags.push(["e",e.event.id]),Bs(e.event.kind)){const n=["a",`${e.event.kind}:${e.event.pubkey}:`];t.tags.push(n)}else if(Ps(e.event.kind)){let n=e.event.tags.find(([o,s])=>o==="d"&&s);if(!n)throw new Error("d tag not found or is empty");const r=["a",`${e.event.kind}:${e.event.pubkey}:${n[1]}`];t.tags.push(r)}t.tags.push(["k",e.event.kind.toString()])}return t}function Sy(e){let t;try{t=JSON.parse(e)}catch{return"Invalid zap request JSON."}if(!$s(t))return"Zap request is not a valid Nostr event.";if(!Os(t))return"Invalid signature on zap request.";let n=t.tags.find(([s,i])=>s==="p"&&i);if(!n)return"Zap request doesn't have a 'p' tag.";if(!n[1].match(/^[a-f0-9]{64}$/))return"Zap request 'p' tag is not valid hex.";let r=t.tags.find(([s,i])=>s==="e"&&i);return r&&!r[1].match(/^[a-f0-9]{64}$/)?"Zap request 'e' tag is not valid hex.":t.tags.find(([s,i])=>s==="relays"&&i)?null:"Zap request doesn't have a 'relays' tag."}function Iy({zapRequest:e,preimage:t,bolt11:n,paidAt:r}){let o=JSON.parse(e),s=o.tags.filter(([a])=>a==="e"||a==="p"||a==="a"),i={kind:9735,created_at:Math.round(r.getTime()/1e3),content:"",tags:[...s,["P",o.pubkey],["bolt11",n],["description",e]]};return t&&i.tags.push(["preimage",t]),i}function Ry(e){if(e.length<50)return 0;e=e.substring(0,50);const t=e.lastIndexOf("1");if(t===-1)return 0;const n=e.substring(0,t);if(!n.startsWith("lnbc"))return 0;const r=n.substring(4);if(r.length<1)return 0;const o=r[r.length-1],s=o.charCodeAt(0)-48,i=s>=0&&s<=9;let a=r.length-1;if(i&&a++,a<1)return 0;const c=parseInt(r.substring(0,a));switch(o){case"m":return c*1e5;case"u":return c*100;case"n":return c/10;case"p":return c/1e4;default:return c*1e8}}var Ay={};Z(Ay,{Negentropy:()=>Ol,NegentropyStorageVector:()=>Ly,NegentropySync:()=>Ny});var So=97,Wt=32,Ml=16,wt={Skip:0,Fingerprint:1,IdList:2},Ye=class{_raw;length;constructor(e){typeof e=="number"?(this._raw=new Uint8Array(e),this.length=0):e instanceof Uint8Array?(this._raw=new Uint8Array(e),this.length=e.length):(this._raw=new Uint8Array(512),this.length=0)}unwrap(){return this._raw.subarray(0,this.length)}get capacity(){return this._raw.byteLength}extend(e){if(e instanceof Ye&&(e=e.unwrap()),typeof e.length!="number")throw Error("bad length");const t=e.length+this.length;if(this.capacity<t){const n=this._raw,r=Math.max(this.capacity*2,t);this._raw=new Uint8Array(r),this._raw.set(n)}this._raw.set(e,this.length),this.length+=e.length}shift(){const e=this._raw[0];return this._raw=this._raw.subarray(1),this.length--,e}shiftN(e=1){const t=this._raw.subarray(0,e);return this._raw=this._raw.subarray(e),this.length-=e,t}};function Jn(e){let t=0;for(;;){if(e.length===0)throw Error("parse ends prematurely");let n=e.shift();if(t=t<<7|n&127,(n&128)===0)break}return t}function Je(e){if(e===0)return new Ye(new Uint8Array([0]));let t=[];for(;e!==0;)t.push(e&127),e>>>=7;t.reverse();for(let n=0;n<t.length-1;n++)t[n]|=128;return new Ye(new Uint8Array(t))}function Cy(e){return ar(e,1)[0]}function ar(e,t){if(e.length<t)throw Error("parse ends prematurely");return e.shiftN(t)}var Ty=class{buf;constructor(){this.setToZero()}setToZero(){this.buf=new Uint8Array(Wt)}add(e){let t=0,n=0,r=new DataView(this.buf.buffer),o=new DataView(e.buffer);for(let s=0;s<8;s++){let i=s*4,a=r.getUint32(i,!0),c=o.getUint32(i,!0),l=a;l+=t,l+=c,l>4294967295&&(n=1),r.setUint32(i,l&4294967295,!0),t=n,n=0}}negate(){let e=new DataView(this.buf.buffer);for(let n=0;n<8;n++){let r=n*4;e.setUint32(r,~e.getUint32(r,!0))}let t=new Uint8Array(Wt);t[0]=1,this.add(t)}getFingerprint(e){let t=new Ye;return t.extend(this.buf),t.extend(Je(e)),se(t.unwrap()).subarray(0,Ml)}},Ly=class{items;sealed;constructor(){this.items=[],this.sealed=!1}insert(e,t){if(this.sealed)throw Error("already sealed");const n=z(t);if(n.byteLength!==Wt)throw Error("bad id size for added item");this.items.push({timestamp:e,id:n})}seal(){if(this.sealed)throw Error("already sealed");this.sealed=!0,this.items.sort(Io);for(let e=1;e<this.items.length;e++)if(Io(this.items[e-1],this.items[e])===0)throw Error("duplicate item inserted")}unseal(){this.sealed=!1}size(){return this._checkSealed(),this.items.length}getItem(e){if(this._checkSealed(),e>=this.items.length)throw Error("out of range");return this.items[e]}iterate(e,t,n){this._checkSealed(),this._checkBounds(e,t);for(let r=e;r<t&&n(this.items[r],r);++r);}findLowerBound(e,t,n){return this._checkSealed(),this._checkBounds(e,t),this._binarySearch(this.items,e,t,r=>Io(r,n)<0)}fingerprint(e,t){let n=new Ty;return n.setToZero(),this.iterate(e,t,r=>(n.add(r.id),!0)),n.getFingerprint(t-e)}_checkSealed(){if(!this.sealed)throw Error("not sealed")}_checkBounds(e,t){if(e>t||t>this.items.length)throw Error("bad range")}_binarySearch(e,t,n,r){let o=n-t;for(;o>0;){let s=t,i=Math.floor(o/2);s+=i,r(e[s])?(t=++s,o-=i+1):o=i}return t}},Ol=class{storage;frameSizeLimit;lastTimestampIn;lastTimestampOut;constructor(e,t=6e4){if(t<4096)throw Error("frameSizeLimit too small");this.storage=e,this.frameSizeLimit=t,this.lastTimestampIn=0,this.lastTimestampOut=0}_bound(e,t){return{timestamp:e,id:t||new Uint8Array(0)}}initiate(){let e=new Ye;return e.extend(new Uint8Array([So])),this.splitRange(0,this.storage.size(),this._bound(Number.MAX_VALUE),e),j(e.unwrap())}reconcile(e,t,n){const r=new Ye(z(e));this.lastTimestampIn=this.lastTimestampOut=0;let o=new Ye;o.extend(new Uint8Array([So]));let s=Cy(r);if(s<96||s>111)throw Error("invalid negentropy protocol version byte");if(s!==So)throw Error("unsupported negentropy protocol version requested: "+(s-96));let i=this.storage.size(),a=this._bound(0),c=0,l=!1;for(;r.length!==0;){let d=new Ye,u=()=>{l&&(l=!1,d.extend(this.encodeBound(a)),d.extend(Je(wt.Skip)))},f=this.decodeBound(r),h=Jn(r),p=c,m=this.storage.findLowerBound(c,i,f);if(h===wt.Skip)l=!0;else if(h===wt.Fingerprint){let y=ar(r,Ml),E=this.storage.fingerprint(p,m);Bl(y,E)!==0?(u(),this.splitRange(p,m,f,d)):l=!0}else if(h===wt.IdList){let y=Jn(r),E={};for(let S=0;S<y;S++){let L=ar(r,Wt);E[j(L)]=L}if(l=!0,this.storage.iterate(p,m,S=>{let L=S.id;const O=j(L);return E[O]?delete E[j(L)]:t?.(O),!0}),n)for(let S of Object.values(E))n(j(S))}else throw Error("unexpected mode");if(this.exceededFrameSizeLimit(o.length+d.length)){let y=this.storage.fingerprint(m,i);o.extend(this.encodeBound(this._bound(Number.MAX_VALUE))),o.extend(Je(wt.Fingerprint)),o.extend(y);break}else o.extend(d);c=m,a=f}return o.length===1?null:j(o.unwrap())}splitRange(e,t,n,r){let o=t-e,s=16;if(o<s*2)r.extend(this.encodeBound(n)),r.extend(Je(wt.IdList)),r.extend(Je(o)),this.storage.iterate(e,t,i=>(r.extend(i.id),!0));else{let i=Math.floor(o/s),a=o%s,c=e;for(let l=0;l<s;l++){let d=i+(l<a?1:0),u=this.storage.fingerprint(c,c+d);c+=d;let f;if(c===t)f=n;else{let h,p;this.storage.iterate(c-1,c+1,(m,y)=>(y===c-1?h=m:p=m,!0)),f=this.getMinimalBound(h,p)}r.extend(this.encodeBound(f)),r.extend(Je(wt.Fingerprint)),r.extend(u)}}}exceededFrameSizeLimit(e){return e>this.frameSizeLimit-200}decodeTimestampIn(e){let t=Jn(e);return t=t===0?Number.MAX_VALUE:t-1,this.lastTimestampIn===Number.MAX_VALUE||t===Number.MAX_VALUE?(this.lastTimestampIn=Number.MAX_VALUE,Number.MAX_VALUE):(t+=this.lastTimestampIn,this.lastTimestampIn=t,t)}decodeBound(e){let t=this.decodeTimestampIn(e),n=Jn(e);if(n>Wt)throw Error("bound key too long");let r=ar(e,n);return{timestamp:t,id:r}}encodeTimestampOut(e){if(e===Number.MAX_VALUE)return this.lastTimestampOut=Number.MAX_VALUE,Je(0);let t=e;return e-=this.lastTimestampOut,this.lastTimestampOut=t,Je(e+1)}encodeBound(e){let t=new Ye;return t.extend(this.encodeTimestampOut(e.timestamp)),t.extend(Je(e.id.length)),t.extend(e.id),t}getMinimalBound(e,t){if(t.timestamp!==e.timestamp)return this._bound(t.timestamp);{let n=0,r=t.id,o=e.id;for(let s=0;s<Wt&&r[s]===o[s];s++)n++;return this._bound(t.timestamp,t.id.subarray(0,n+1))}}};function Bl(e,t){for(let n=0;n<e.byteLength;n++){if(e[n]<t[n])return-1;if(e[n]>t[n])return 1}return e.byteLength>t.byteLength?1:e.byteLength<t.byteLength?-1:0}function Io(e,t){return e.timestamp===t.timestamp?Bl(e.id,t.id):e.timestamp-t.timestamp}var Ny=class{relay;storage;neg;filter;subscription;onhave;onneed;constructor(e,t,n,r={}){this.relay=e,this.storage=t,this.neg=new Ol(t),this.onhave=r.onhave,this.onneed=r.onneed,this.filter=n,this.subscription=this.relay.prepareSubscription([{}],{label:r.label||"negentropy"}),this.subscription.oncustom=o=>{switch(o[0]){case"NEG-MSG":{o.length<3&&console.warn(`got invalid NEG-MSG from ${this.relay.url}: ${o}`);try{const s=this.neg.reconcile(o[2],this.onhave,this.onneed);s?this.relay.send(`["NEG-MSG", "${this.subscription.id}", "${s}"]`):(this.close(),r.onclose?.())}catch(s){console.error("negentropy reconcile error:",s),r?.onclose?.(`reconcile error: ${s}`)}break}case"NEG-CLOSE":{const s=o[2];console.warn("negentropy error:",s),r.onclose?.(s);break}case"NEG-ERR":r.onclose?.()}}}async start(){const e=this.neg.initiate();this.relay.send(`["NEG-OPEN","${this.subscription.id}",${JSON.stringify(this.filter)},"${e}"]`)}close(){this.relay.send(`["NEG-CLOSE","${this.subscription.id}"]`),this.subscription.close()}},$y={};Z($y,{getToken:()=>My,hashPayload:()=>ti,unpackEventFromToken:()=>Ul,validateEvent:()=>Gl,validateEventKind:()=>ql,validateEventMethodTag:()=>Hl,validateEventPayloadTag:()=>Fl,validateEventTimestamp:()=>Dl,validateEventUrlTag:()=>jl,validateToken:()=>Oy});var Pl="Nostr ";async function My(e,t,n,r=!1,o){const s={kind:js,tags:[["u",e],["method",t]],created_at:Math.round(new Date().getTime()/1e3),content:""};o&&s.tags.push(["payload",ti(o)]);const i=await n(s);return(r?Pl:"")+He.encode(xe.encode(JSON.stringify(i)))}async function Oy(e,t,n){const r=await Ul(e).catch(s=>{throw s});return await Gl(r,t,n).catch(s=>{throw s})}async function Ul(e){if(!e)throw new Error("Missing token");e=e.replace(Pl,"");const t=Qe.decode(He.decode(e));if(!t||t.length===0||!t.startsWith("{"))throw new Error("Invalid token");return JSON.parse(t)}function Dl(e){return e.created_at?Math.round(new Date().getTime()/1e3)-e.created_at<60:!1}function ql(e){return e.kind===js}function jl(e,t){const n=e.tags.find(r=>r[0]==="u");return n?n.length>0&&n[1]===t:!1}function Hl(e,t){const n=e.tags.find(r=>r[0]==="method");return n?n.length>0&&n[1].toLowerCase()===t.toLowerCase():!1}function ti(e){const t=se(xe.encode(JSON.stringify(e)));return j(t)}function Fl(e,t){const n=e.tags.find(o=>o[0]==="payload");if(!n)return!1;const r=ti(t);return n.length>0&&n[1]===r}async function Gl(e,t,n,r){if(!Os(e))throw new Error("Invalid nostr event, signature invalid");if(!ql(e))throw new Error("Invalid nostr event, kind invalid");if(!Dl(e))throw new Error("Invalid nostr event, created_at timestamp invalid");if(!jl(e,t))throw new Error("Invalid nostr event, url tag invalid");if(!Hl(e,n))throw new Error("Invalid nostr event, method tag invalid");if(r&&typeof r=="object"&&Object.keys(r).length>0&&!Fl(e,r))throw new Error("Invalid nostr event, payload tag does not match request body hash");return!0}function By(e){return Array.from(e,t=>t.toString(16).padStart(2,"0")).join("")}const Py="m/44'/1237'/0'/0/0";function Uy(){return Zu(hc,128)}function Kl(e){return tf(e,hc)}function Vl(e){const t=rf(e),r=xt.fromMasterSeed(t).derive(Py);if(!r.privateKey)throw new Error("Failed to derive private key");const o=By(r.privateKey);return{pubkey:Fr(r.privateKey),privkey:o}}const sa=Object.freeze(Object.defineProperty({__proto__:null,generateMnemonic:Uy,mnemonicToKeypair:Vl,validateMnemonic:Kl},Symbol.toStringTag,{value:"Module"})),Ir="canary:groups",Rr="canary:identity",Wr="canary:settings",Jr="canary:pin-salt",wn="canary:active-group",Xo="canary:mnemonic";let En=null;function zl(e){En=e}function Yr(){En=null}const Yn={theme:"dark",pinEnabled:!0,autoLockMinutes:5,defaultRelays:[qe],defaultReadRelays:[...et,qe],defaultWriteRelays:[qe]};function nt(e){try{const t=localStorage.getItem(e);return t===null?null:JSON.parse(t)}catch{return null}}function Et(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function Re(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function nn(e){return Re(e)&&e._encrypted===!0&&typeof e.ciphertext=="string"}async function Ro(e,t){return{_encrypted:!0,ciphertext:await yu(JSON.stringify(e),t)}}async function ni(e,t){return JSON.parse(await bs(e.ciphertext,t))}function Wl(e){return Re(e)?Object.values(e).some(t=>Re(t)&&t._seedEncrypted===!0):!1}function Jl(e){return Re(e)&&e._privkeyEncrypted===!0}function Yl(){return localStorage.getItem(Jr)}function Dy(){const e=gu(),t=bu(e);return localStorage.setItem(Jr,t),t}function Zl(){localStorage.removeItem(Jr)}async function qy(e,t){const n={};for(const[r,o]of Object.entries(e)){const{_seedEncrypted:s,...i}=o;n[r]={...i,seed:s?await bs(o.seed,t):o.seed}}return n}function jy(e){if(e.readRelays?.length||e.writeRelays?.length)return{readRelays:e.readRelays??[],writeRelays:e.writeRelays??[]};const t=e.relays??[],n=t.length>0?t:[qe],r=new Set([...et,...n]);return{readRelays:Array.from(r),writeRelays:n}}function ri(e){const t={...Yn,...e??{}};return t.defaultRelays?.length||(t.defaultRelays=[...Yn.defaultRelays]),t.defaultReadRelays?.length||(t.defaultReadRelays=[...Yn.defaultReadRelays]),t.defaultWriteRelays?.length||(t.defaultWriteRelays=[...Yn.defaultWriteRelays]),t}function cr(e){if(!Re(e))return{};const t={};for(const[n,r]of Object.entries(e)){if(!Re(r)||typeof r.name!="string")continue;const o=jy(r);t[n]={...r,id:n,usedInvites:Array.isArray(r.usedInvites)?r.usedInvites.filter(s=>typeof s=="string"):[],latestInviteIssuedAt:typeof r.latestInviteIssuedAt=="number"?r.latestInviteIssuedAt:0,tolerance:typeof r.tolerance=="number"?r.tolerance:1,livenessInterval:typeof r.livenessInterval=="number"?r.livenessInterval:typeof r.rotationInterval=="number"?r.rotationInterval:604800,livenessCheckins:Re(r.livenessCheckins)?Object.fromEntries(Object.entries(r.livenessCheckins).filter(([,s])=>typeof s=="number").map(([s,i])=>[s,i])):{},memberNames:Re(r.memberNames)?Object.fromEntries(Object.entries(r.memberNames).filter(([,s])=>typeof s=="string").map(([s,i])=>[s,i])):void 0,lastPositions:Re(r.lastPositions)?Object.fromEntries(Object.entries(r.lastPositions).filter(([,s])=>Re(s)).map(([s,i])=>[s,i])):void 0,beaconPrecision:typeof r.beaconPrecision=="number"?r.beaconPrecision:6,nostrEnabled:typeof r.nostrEnabled=="boolean"?r.nostrEnabled:o.writeRelays.length>0||o.readRelays.length>0,...o}}return t}function Qo(e){return!Re(e)||typeof e.pubkey!="string"?null:{pubkey:e.pubkey,privkey:typeof e.privkey=="string"?e.privkey:void 0,nsec:typeof e.nsec=="string"?e.nsec:void 0,mnemonic:typeof e.mnemonic=="string"?e.mnemonic:void 0,displayName:typeof e.displayName=="string"?e.displayName:void 0,picture:typeof e.picture=="string"?e.picture:void 0,signerType:e.signerType==="nip07"?"nip07":"local"}}function kn(e){const t=localStorage.getItem(Xo);if(!t)return{identity:e,migrated:!1};let n=e;const r=t.trim().replace(/\s+/g," ");try{if(n&&Kl(r)){const{pubkey:o}=Vl(r);o===n.pubkey&&(n={...n,mnemonic:r})}}catch{}return localStorage.removeItem(Xo),{identity:n,migrated:!0}}function Xl(e,t){if(typeof e=="string"&&e in t)return e;const n=Object.keys(t);return n.length>0?n[0]:null}async function Hy(e){const t=nt(Ir);if(t===null)return{groups:{},migrated:!1};if(nn(t)){if(!e)throw new Error("Encrypted groups require PIN unlock");const n=await ni(t,e);return{groups:cr(n),migrated:!1}}if(Wl(t)){if(!e)throw new Error("Encrypted groups require PIN unlock");const n=await qy(t,e);return{groups:cr(n),migrated:!0}}return{groups:cr(t),migrated:e!==void 0}}function Fy(){const e=nt(Ir);return e===null||nn(e)||Wl(e)?{groups:{},migrated:!1}:{groups:cr(e),migrated:!1}}async function Gy(e){const t=nt(Rr);if(t===null)return kn(null);if(nn(t)){if(!e)throw new Error("Encrypted identity requires PIN unlock");const s=await ni(t,e);return kn(Qo(s))}let n=t,r=e!==void 0;if(Jl(t)){if(!e)throw new Error("Encrypted identity requires PIN unlock");const s=t.privkey?await bs(t.privkey,e):void 0,{_privkeyEncrypted:i,...a}=t;n={...a,privkey:s},r=!0}const o=kn(Qo(n));return{identity:o.identity,migrated:r||o.migrated}}function Ky(){const e=nt(Rr);return e===null||nn(e)||Jl(e)?kn(null):kn(Qo(e))}async function Vy(e){const t=nt(wn);if(t===null)return{activeGroupId:null,migrated:!1};if(nn(t)){if(!e)throw new Error("Encrypted active group requires PIN unlock");const n=await ni(t,e);return{activeGroupId:typeof n=="string"?n:null,migrated:!1}}return{activeGroupId:typeof t=="string"?t:null,migrated:e!==void 0}}function zy(){const e=nt(wn);return e===null||nn(e)?{activeGroupId:null,migrated:!1}:{activeGroupId:typeof e=="string"?e:null,migrated:!1}}async function Zr(e,t){if(t){const[n,r,o]=await Promise.all([Ro(e.groups,t),Ro(e.identity,t),Ro(e.activeGroupId,t)]);Et(Ir,n),Et(Rr,r),Et(wn,o)}else Et(Ir,e.groups),Et(Rr,e.identity),e.activeGroupId===null?localStorage.removeItem(wn):Et(wn,e.activeGroupId);Et(Wr,e.settings),localStorage.removeItem(Xo)}async function oi(){const e=R(),t=!!Yl();if(e.settings.pinEnabled&&t&&En===null){console.error("[canary:storage] PIN enabled but key not loaded — state NOT persisted.");return}try{await Zr(e,e.settings.pinEnabled&&En!==null?En:void 0)}catch(n){console.error("[canary:storage] Persistence failed — state NOT persisted:",n)}}function Ql(){return localStorage.getItem(Jr)!==null}function Wy(){const e=nt(Wr);return ri(e)}async function Jy(e){const t=Yl();if(!t)throw new Error("No PIN salt found");const n=Xa(t),r=await Za(e,n),o=nt(Wr),s=ri(o),[i,a,c]=await Promise.all([Hy(r),Gy(r),Vy(r)]),l={view:"groups",groups:i.groups,activeGroupId:Xl(c.activeGroupId,i.groups),identity:a.identity,settings:s};zl(r),Ya(l),(i.migrated||a.migrated||c.migrated)&&await Zr(l,r)}function Yy(){const e=nt(Wr),t=ri(e),n=Fy(),r=Ky(),o=zy(),s={view:"groups",groups:n.groups,activeGroupId:Xl(o.activeGroupId,n.groups),identity:r.identity,settings:t};Ya(s),(n.migrated||r.migrated||o.migrated)&&oi()}let es=0,ts,ia=Promise.resolve();const Zy=100;function Xy(){gs(()=>{const e=++es;clearTimeout(ts),ts=setTimeout(()=>{ia=ia.then(async()=>{e===es&&await oi()}).catch(t=>{console.error("[canary:storage] Serialised write failed:",t)})},Zy)}),window.addEventListener("pagehide",()=>si())}function si(){clearTimeout(ts),es++,oi().catch(()=>{})}async function Qy(e){const t=Dy(),n=Xa(t),r=await Za(e,n);zl(r);try{const o=R();await Zr({...o,settings:{...o.settings,pinEnabled:!0}},r)}catch(o){throw Yr(),Zl(),o}}async function eg(){const e=R();await Zr({...e,settings:{...e.settings,pinEnabled:!1}}),Yr(),Zl()}const tg=[1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225],ng=new Uint32Array([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]);function Me(e,t){return(e>>>t|e<<32-t)>>>0}function ge(e){const t=e.length*8,n=new Uint8Array(Math.ceil((e.length+9)/64)*64);n.set(e),n[e.length]=128;const r=new DataView(n.buffer);r.setUint32(n.length-8,Math.floor(t/4294967296),!1),r.setUint32(n.length-4,t>>>0,!1);let[o,s,i,a,c,l,d,u]=tg;const f=new Uint32Array(64);for(let m=0;m<n.length;m+=64){for(let b=0;b<16;b++)f[b]=r.getUint32(m+b*4,!1);for(let b=16;b<64;b++){const g=f[b-15],k=f[b-2],_=Me(g,7)^Me(g,18)^g>>>3,A=Me(k,17)^Me(k,19)^k>>>10;f[b]=f[b-16]+_+f[b-7]+A>>>0}let y=o,E=s,S=i,L=a,O=c,P=l,$=d,v=u;for(let b=0;b<64;b++){const g=Me(O,6)^Me(O,11)^Me(O,25),k=O&P^~O&$,_=v+g+k+ng[b]+f[b]>>>0,A=Me(y,2)^Me(y,13)^Me(y,22),w=y&E^y&S^E&S,I=A+w>>>0;v=$,$=P,P=O,O=L+_>>>0,L=S,S=E,E=y,y=_+I>>>0}o=o+y>>>0,s=s+E>>>0,i=i+S>>>0,a=a+L>>>0,c=c+O>>>0,l=l+P>>>0,d=d+$>>>0,u=u+v>>>0}const h=new Uint8Array(32),p=new DataView(h.buffer);return p.setUint32(0,o,!1),p.setUint32(4,s,!1),p.setUint32(8,i,!1),p.setUint32(12,a,!1),p.setUint32(16,c,!1),p.setUint32(20,l,!1),p.setUint32(24,d,!1),p.setUint32(28,u,!1),h}const dn=64;function mt(e,t){const n=e.length>dn?ge(e):e,r=new Uint8Array(dn);r.set(n);const o=new Uint8Array(dn),s=new Uint8Array(dn);for(let c=0;c<dn;c++)o[c]=r[c]^54,s[c]=r[c]^92;const i=ge(yt(o,t)),a=ge(yt(s,i));return r.fill(0),o.fill(0),s.fill(0),a}function ed(){const e=new Uint8Array(32);return crypto.getRandomValues(e),Ge(e)}function F(e){if(e.length%2!==0)throw new Error(`hexToBytes: odd-length hex string (${e.length} chars)`);const t=new Uint8Array(e.length/2);for(let n=0;n<t.length;n++){const r=e.slice(n*2,n*2+2);if(!/^[0-9a-fA-F]{2}$/.test(r))throw new TypeError(`Invalid hex character at position ${n*2}`);t[n]=parseInt(r,16)}return t}function Ge(e){let t="";for(let n=0;n<e.length;n++)t+=e[n].toString(16).padStart(2,"0");return t}function rg(e,t){if(t+1>=e.length)throw new RangeError(`readUint16BE: offset ${t} out of bounds for length ${e.length}`);return(e[t]<<8|e[t+1])>>>0}function yt(...e){const t=e.reduce((o,s)=>o+s.length,0),n=new Uint8Array(t);let r=0;for(const o of e)n.set(o,r),r+=o.length;return n}function td(e){let t="";for(let n=0;n<e.length;n++)t+=String.fromCharCode(e[n]);return btoa(t)}function og(e){const t=atob(e),n=new Uint8Array(t.length);for(let r=0;r<t.length;r++)n[r]=t.charCodeAt(r);return n}function sg(e,t){const n=Math.max(e.length,t.length);let r=e.length^t.length;for(let o=0;o<n;o++)r|=(e[o]??0)^(t[o]??0);return r===0}const aa=new TextEncoder;function Ao(e,t){return sg(aa.encode(e),aa.encode(t))}function Xr(e){return new TextEncoder().encode(e)}function ig(e){return mt(F(e),Xr("canary:sync:key"))}async function ag(e,t){const n=crypto.getRandomValues(new Uint8Array(12)),r=await crypto.subtle.importKey("raw",e,{name:"AES-GCM"},!1,["encrypt"]),o=await crypto.subtle.encrypt({name:"AES-GCM",iv:n},r,Xr(t)),s=yt(n,new Uint8Array(o));return td(s)}async function cg(e,t){const n=og(t);if(n.length<28)throw new Error("decryptEnvelope: encoded data too short (minimum 28 bytes: 12-byte IV + 16-byte GCM tag)");const r=n.slice(0,12),o=n.slice(12),s=await crypto.subtle.importKey("raw",e,{name:"AES-GCM"},!1,["decrypt"]);let i;try{i=await crypto.subtle.decrypt({name:"AES-GCM",iv:r},s,o)}catch{throw new Error("decryptEnvelope: decryption failed — wrong key or tampered data")}return new TextDecoder().decode(i)}function lg(e,t){if(!/^[0-9a-f]{64}$/.test(t))throw new Error("personalPrivkeyHex must be a 64-character lowercase hex string (32 bytes)");const n=yt(Xr("canary:sync:sign:"),F(t));return mt(F(e),n)}function dg(e){return Ge(ge(Xr(e)))}const ii=604800,ca=100;function rn(e,t=ii){if(!Number.isFinite(e)||e<0)throw new RangeError(`timestampSec must be a non-negative finite number, got ${e}`);if(!Number.isFinite(t)||t<=0)throw new RangeError(`rotationIntervalSec must be a positive finite number, got ${t}`);return Math.floor(e/t)}const Ar=["ability","able","about","above","absent","absorb","abstract","absurd","access","accident","account","accuse","achieve","acid","acorn","acoustic","acquire","across","act","action","actor","actress","actual","adapt","add","addict","address","adjust","admiral","admit","adult","advance","advice","aerobic","affair","afford","afraid","again","age","agent","agree","ahead","aim","air","airport","aisle","alarm","album","alcohol","alert","alien","all","alley","allow","almost","alone","alpha","alpine","already","also","always","amateur","amazing","amber","among","amount","amused","analyst","anchor","ancient","anger","angle","animal","ankle","announce","annual","another","answer","antenna","antique","anvil","anxiety","any","apart","apology","appear","apple","approve","april","apron","arch","arctic","area","arena","argue","arm","armed","armor","army","around","arrange","arrive","arrow","art","artefact","artist","artwork","ask","aspect","asset","assist","assume","asthma","athlete","atom","attack","attend","attitude","attract","auction","audit","august","aunt","author","auto","autumn","average","avocado","avoid","awake","aware","away","awesome","awful","awkward","axis","baby","bachelor","bacon","badge","badger","bag","bakery","balance","balcony","ball","balm","bamboo","banana","banjo","banner","bar","barely","bargain","barrel","base","basic","basil","basket","battle","beach","beacon","bean","beauty","because","become","beef","beetle","before","begin","behave","behind","belfry","believe","below","belt","bench","benefit","berry","best","better","between","beyond","bicycle","bid","bike","bind","biology","birch","bird","birth","bishop","bitter","black","blame","blanket","bleak","bless","bloom","blossom","blouse","blue","blur","blush","board","boat","bobcat","body","boil","bone","bonfire","bonus","book","boost","border","boring","borrow","boss","bottom","bounce","bouquet","box","boy","bracket","brain","branch","brand","brass","brave","bread","breaker","breeze","brick","bridge","brief","bright","bring","brisk","broccoli","bronze","brook","broom","brother","brown","brush","bubble","buckle","buddy","budget","buffalo","bugle","build","bulb","bulk","bumble","bundle","bunker","burger","burrow","burst","bus","bushel","business","busy","butter","buyer","buzz","cabbage","cabin","cable","cactus","cage","cairn","cake","call","calm","camel","camera","camp","can","canal","cancel","candy","canoe","canopy","canvas","canyon","capable","cape","capital","captain","car","caravan","carbon","card","cargo","carpet","carry","cart","case","cash","casino","castle","casual","cat","catalog","catch","category","cattle","caught","cause","caution","cave","cedar","ceiling","celery","cellar","cement","census","century","cereal","certain","chair","chalk","champion","change","chapter","charge","charter","chase","chat","cheap","check","cheese","chef","cherry","chest","chestnut","chicken","chief","child","chimney","choice","choose","chuckle","chunk","churn","cider","cigar","cinnamon","circle","citizen","city","civil","claim","clam","clap","clarify","claw","clay","clean","clerk","clever","click","client","cliff","climb","clinic","clip","cloak","clock","clog","close","cloth","cloud","clown","club","clump","cluster","clutch","coach","coast","cobalt","cocoa","coconut","code","codex","coffee","coil","coin","collect","color","column","combine","come","comet","comfort","comic","common","company","concert","condor","conduct","confirm","congress","connect","consider","consul","control","convince","cook","cool","copper","copy","coral","core","cork","corn","cornet","correct","cosmos","cost","cotton","couch","cougar","country","couple","course","cousin","cover","coyote","crack","cradle","craft","cram","crane","crater","crawl","cream","credit","creek","crew","cricket","crisp","critic","croft","crop","cross","crouch","crowd","crown","crucial","cruise","crumble","crunch","cry","crystal","cube","culture","cup","cupboard","curious","current","curtain","curve","cushion","custom","cute","cycle","cypress","dad","dagger","dahlia","damp","damsel","dance","danger","dapple","daring","dash","daughter","dawn","day","deal","debate","decade","december","decide","decline","decorate","decrease","defense","define","defy","degree","delay","deliver","delta","demand","demise","denial","denim","dentist","depart","depend","deposit","depot","depth","deputy","derive","describe","desert","design","desk","detail","detect","develop","device","devote","diagram","dial","diamond","diary","dice","diesel","diet","differ","digital","dignity","dilemma","dinner","dinosaur","direct","dirt","disagree","discover","dish","display","distance","divert","divide","divorce","dizzy","doctor","document","dog","doll","dolphin","domain","donate","donkey","donor","door","dorsal","double","dove","draft","drafter","dragon","drake","drama","drastic","draw","dream","dress","drift","drifter","drill","drink","drive","drop","droplet","drum","drummer","dry","duck","dulcet","dune","dungeon","during","dusk","dust","dutch","duty","dwarf","dynamic","eager","eagle","early","earn","earth","easily","east","easy","echo","ecology","economy","edge","edgeway","edit","educate","effort","egg","eight","either","elbow","elder","electric","elegant","element","elephant","elevator","elite","elm","else","embark","ember","embody","embrace","emerald","emerge","emotion","employ","empower","empty","enable","enact","end","endless","endorse","enemy","energy","enforce","engage","engine","enhance","enjoy","enlist","enough","enrich","enroll","ensign","ensure","enter","entire","entry","envelope","episode","epoch","equal","equip","era","erase","erode","erosion","error","escape","essay","essence","estate","estuary","eternal","ether","ethics","everest","evidence","evil","evolve","exact","example","exchange","excite","exclude","excuse","execute","exercise","exhaust","exhibit","exist","exit","exotic","expand","expect","explain","express","extend","extra","eye","eyebrow","fabric","face","faculty","fade","faint","faith","falcon","fall","fallow","false","fame","family","famous","fancy","fantasy","farm","fashion","fat","father","fathom","fatigue","favorite","feature","february","federal","fee","feed","feel","female","fence","fennel","fern","festival","fetch","fever","fiber","fiction","fiddle","field","figure","file","film","filter","final","finch","find","finger","finish","fire","firm","first","fiscal","fish","fit","fitness","fix","fjord","flag","flagon","flame","flannel","flash","flat","flavor","flicker","flight","flint","flip","float","flock","floor","floret","fluid","flush","flutter","fly","foal","foam","focus","fog","foil","fold","follow","food","foot","force","forest","forge","forget","fork","fortune","forum","forward","fossil","foster","found","foundry","fox","foxglove","fragile","frame","frequent","fresco","fresh","friend","fringe","frog","front","frost","frown","frozen","fruit","fuel","fun","funny","furnace","furrow","future","gadget","gain","galaxy","gallery","galley","game","gap","garage","garbage","garden","garland","garlic","garment","garnet","gas","gasp","gate","gather","gauge","gaze","gazelle","general","genius","genre","gentle","genuine","gesture","geyser","giant","gibbon","gift","giggle","ginger","giraffe","girl","give","glacier","glad","glance","glare","glass","glen","glide","glimpse","globe","gloom","glory","glove","glow","glue","goat","goblet","goddess","gold","golden","good","goose","gopher","gorge","gorilla","gospel","gossip","govern","gown","grab","grace","grain","granite","grant","grape","grass","gravity","great","green","grid","grocery","group","grow","grunt","guard","guess","guide","guilt","guitar","guppy","gust","gym","habit","half","hamlet","hammer","hammock","hamster","hand","happy","harbor","hard","harness","harvest","hat","have","hawk","hawthorn","head","health","heart","hearth","heavy","hedgehog","height","hello","helmet","help","hen","herald","hermit","hero","heron","hickory","hidden","high","hill","hint","hip","hire","history","hobby","hockey","hold","hole","holiday","hollow","home","homeward","honey","hood","hope","horizon","horn","hornet","horse","hospital","host","hotel","hour","hover","howler","hub","huge","human","humble","humor","hundred","hungry","hunt","hunter","hurdle","hurry","husband","hybrid","ice","icon","idea","identify","idle","igloo","ignore","ill","image","imitate","immune","impact","improve","inch","include","income","increase","index","indicate","indigo","indoor","industry","infant","inflict","inform","inhale","inherit","initial","inject","inkwell","inlet","inmate","inner","innocent","input","inquiry","insect","inside","inspire","install","intact","interest","into","invest","invite","involve","inward","iris","iron","island","issue","item","ivory","jacket","jade","jaguar","jar","jasmine","javelin","jazz","jeans","jelly","jersey","jewel","job","join","joke","jostle","journal","journey","joy","jubilee","judge","juice","jumble","jump","junco","jungle","junior","juniper","just","kangaroo","kayak","keen","keep","keeper","kelp","kennel","kernel","kestrel","ketchup","kettle","key","kick","kid","kidney","kind","kindle","kingdom","kinglet","kipper","kiss","kit","kitchen","kite","kitten","kiwi","knapsack","knee","knife","knock","lab","label","labor","ladder","lady","lake","lamp","language","lantern","lapis","laptop","larch","large","later","latin","laugh","laundry","laurel","lava","lavender","law","lawn","layer","lazy","leader","leaf","learn","leave","lecture","left","leg","legal","legend","leisure","lemon","lend","length","lens","leopard","lesson","letter","level","liar","liberty","library","license","lichen","life","lift","light","like","limit","linden","link","linnet","lion","liquid","list","little","live","lizard","llama","load","loan","lobster","local","lock","locust","lodge","logic","long","loom","loop","lottery","lotus","loud","lounge","love","loyal","lucky","luggage","lumber","lumen","lunar","lunch","luxury","machine","mackerel","magic","magnet","main","major","make","mammal","man","manage","mandate","mango","mansion","mantis","manual","maple","marble","march","margin","marine","market","marriage","marsh","marten","mask","masonry","mass","master","match","material","math","matrix","matter","maximum","maze","meadow","mean","measure","mechanic","medal","media","melody","melt","member","memory","mention","menu","mercy","merge","merit","merlin","merry","mesa","mesh","message","metal","method","micron","middle","midnight","milk","millet","million","mimic","mind","minimum","minnow","minor","minute","miracle","mirage","mirror","miss","mistake","mix","mixed","mixture","moat","mobile","model","modify","mohawk","mom","moment","monarch","mongrel","monitor","monkey","month","moon","moose","moral","more","morning","mortar","mosaic","mosquito","mother","motion","motor","mountain","mouse","move","movie","much","muffin","mullet","multiply","muscle","museum","mushroom","music","muslin","mussel","must","mustang","mutual","myrtle","myself","mystery","myth","naive","name","napkin","narrow","narwhal","nation","nature","near","neck","nectar","need","negative","neither","nephew","nest","nester","net","nettle","network","neutral","never","news","newt","next","nice","nimble","noble","noggin","noise","nomad","nominee","noodle","normal","north","nose","notable","note","nothing","notice","novel","now","nuclear","number","nurse","nut","nutmeg","oak","oakmoss","oasis","obey","object","oblige","observe","obsidian","obtain","ocean","octave","october","odor","off","offer","office","often","oil","okay","old","olive","olympic","omit","once","onion","online","only","onyx","opal","open","opera","opinion","oppose","option","orange","orbit","orchard","orchid","order","ordinary","organ","orient","original","oriole","orphan","osprey","ostrich","other","otter","outdoor","outer","outpost","output","outside","oval","oven","over","own","owner","oxygen","oyster","ozone","pact","paddle","page","pagoda","palace","palm","panda","panel","panther","paper","parade","parent","park","parrot","party","pass","patch","path","patient","patrol","pattern","pause","pave","payment","peanut","peasant","pelican","pen","pencil","people","pepper","perfect","permit","person","phone","photo","phrase","physical","piano","picnic","picture","pigeon","pill","pilot","pink","pioneer","pipe","pitch","pizza","place","planet","plastic","plate","play","please","pledge","pluck","plug","poem","poet","point","polar","pole","police","pond","pony","pool","popular","portion","position","possible","post","potato","pottery","powder","power","practice","praise","predict","prefer","prepare","present","pretty","prevent","price","pride","primary","print","priority","private","prize","process","produce","profit","program","project","promote","proof","property","prosper","protect","proud","provide","public","pudding","pull","pulp","pulse","pumpkin","puppy","purchase","purity","purpose","purse","push","put","puzzle","pyramid","quality","quantum","quarter","question","quick","quiz","quote","rabbit","race","rack","radar","radio","rail","rain","raise","rally","ramp","ranch","random","range","rapid","rare","rate","rather","raven","raw","razor","ready","real","reason","rebuild","recall","receive","recipe","record","recycle","reduce","reflect","reform","refuse","region","regular","relax","release","relief","rely","remain","remember","remove","render","renew","rent","reopen","repair","repeat","replace","report","require","rescue","resource","response","result","retire","retreat","return","reunion","reveal","review","reward","rhythm","rib","ribbon","rice","rich","ride","ridge","rifle","ring","ripple","risk","ritual","rival","river","road","roast","robot","robust","rocket","romance","roof","rookie","room","rose","rotate","round","route","royal","rubber","rug","rule","run","runway","rural","saddle","sadness","safe","salad","salmon","salon","salt","salute","same","sample","sand","satisfy","satoshi","sauce","sausage","save","say","scale","scan","school","science","scorpion","scout","screen","script","scrub","search","season","seat","second","secret","section","security","seed","seek","segment","select","sell","seminar","senior","sense","sentence","service","session","settle","setup","seven","shadow","shallow","share","shed","shell","sheriff","shield","shift","shine","shoe","shoot","shop","short","shoulder","shove","shrimp","shuffle","shy","sibling","sick","side","sight","sign","silent","silk","silly","silver","similar","simple","since","sister","situate","six","size","skate","sketch","ski","skill","skin","skirt","slab","slam","sleep","slice","slide","slight","slim","small","smart","smile","smooth","snack","snake","snow","soap","soccer","social","sock","soda","soft","solar","soldier","solid","solution","solve","someone","song","soon","sort","soul","sound","soup","source","south","space","spare","spatial","speak","special","speed","spell","spend","sphere","spice","spider","spike","spin","spirit","spoil","sponsor","spoon","sport","spot","spray","spread","spring","spy","square","squirrel","stable","stadium","staff","stage","stairs","stamp","stand","start","state","stay","steak","stem","step","stereo","stick","still","stock","stomach","stone","stool","story","stove","strategy","street","strong","student","style","subject","submit","subway","success","such","sudden","sugar","suggest","suit","summer","sunny","sunset","super","supply","supreme","sure","surface","surge","surprise","surround","survey","sustain","swap","swarm","sweet","swift","swim","swing","switch","sword","symbol","syrup","system","table","tackle","tag","talent","talk","tape","task","taste","taxi","teach","team","tell","tennis","term","test","text","thank","theme","then","theory","they","this","thought","thrive","throw","thumb","thunder","ticket","tide","tiger","tilt","timber","time","tiny","tip","tired","tissue","title","toast","today","toddler","together","toilet","token","tomato","tomorrow","tone","tonight","tool","tooth","top","topic","topple","torch","tortoise","toss","total","tourist","tower","town","toy","track","trade","traffic","train","transfer","trap","travel","tray","treat","trend","tribe","trick","trigger","trim","trip","trophy","truck","true","trumpet","truth","try","tuition","tunnel","turkey","turn","turtle","twelve","twenty","twice","twin","twist","two","type","typical","umbrella","unable","unaware","uncle","uncover","under","undo","unfair","unfold","uniform","unique","unit","universe","unknown","unlock","until","unusual","update","upgrade","uphold","upon","upper","upset","urban","urge","usage","use","used","useful","useless","usual","utility","vague","valid","valley","valve","vapor","various","vast","vehicle","velvet","vendor","venue","verb","verify","version","very","vessel","veteran","viable","vibrant","vicious","victory","video","village","vintage","violin","virtual","visa","visit","visual","vital","vivid","vocal","voice","volcano","vote","voyage","wagon","walk","wall","walnut","want","warm","warrior","wash","wasp","water","wave","way","wealth","weasel","web","wedding","weekend","welcome","west","wet","whale","what","wheat","wheel","when","whip","whisper","wide","width","wife","wild","will","win","window","wine","wing","wink","winner","winter","wire","wisdom","wise","wish","witness","wolf","woman","wonder","wool","word","work","world","worry","worth","wreck","wrestle","yard","year","yellow","you","young","youth","zebra","zero","zone","zoo"],la=2048,ug=new Map;for(let e=0;e<Ar.length;e++)ug.set(Ar[e],e);function Co(e){if(e<0||e>=la)throw new RangeError(`Wordlist index out of range: ${e} (must be 0-${la-1})`);return Ar[e]}const Bn={format:"words",count:1};function fg(e,t=1,n=Ar){if(n.length!==2048)throw new RangeError("Wordlist must contain exactly 2048 entries");if(t<1||t>16)throw new RangeError("Word count must be 1–16");if(e.length<t*2)throw new RangeError("Not enough bytes for requested word count");const r=[];for(let o=0;o<t;o++){const s=rg(e,o*2)%n.length;r.push(n[s])}return r}function hg(e,t=4){if(t<1||t>10)throw new RangeError("PIN digits must be 1–10");const n=Math.min(Math.ceil(t*.415),e.length),r=Math.pow(10,t);if(t>=9){let s=0n;for(let i=0;i<n;i++)s=s*256n+BigInt(e[i]);return Number(s%BigInt(r)).toString().padStart(t,"0")}let o=0;for(let s=0;s<n;s++)o=o*256+e[s]>>>0;return(o%r).toString().padStart(t,"0")}function pg(e,t=8){if(t<1||t>64)throw new RangeError("Hex length must be 1–64");const n=Math.ceil(t/2);let r="";for(let o=0;o<n&&o<e.length;o++)r+=e[o].toString(16).padStart(2,"0");return r.slice(0,t)}function ns(e,t=Bn){switch(t.format){case"words":return fg(e,t.count??1,t.wordlist).join(" ");case"pin":return hg(e,t.digits??4);case"hex":return pg(e,t.length??8)}}const gt=10,mg=new TextEncoder;function Sn(e){return mg.encode(e)}function ai(e){if(!Number.isInteger(e)||e<0||e>4294967295)throw new RangeError(`Counter must be an integer 0–${4294967295}, got ${e}`);const t=new Uint8Array(4);return new DataView(t.buffer).setUint32(0,e,!1),t}const da=16;function ci(e){const t=typeof e=="string"?F(e):e;if(t.length<da)throw new RangeError(`Secret must be at least ${da} bytes, got ${t.length}`);return t}function yg(e,t,n){const r=ci(e),o=yt(Sn(t),ai(n));return mt(r,o)}function Ke(e,t,n,r=Bn){const o=yg(e,t,n);return ns(o,r)}function li(e,t,n,r,o=Bn,s){if(!Number.isInteger(s)||s<0)throw new RangeError("maxTolerance must be a non-negative integer");if(s>gt)throw new RangeError(`maxTolerance must be <= ${gt}, got ${s}`);const i=new Set,a=2*s,c=Math.max(0,r-a),l=Math.min(4294967295,r+a);for(let m=c;m<=l;m++)i.add(Ke(e,t,m,o));const d=ci(e),u=yt(Sn(t+":duress"),new Uint8Array([0]),Sn(n),ai(r));let f=mt(d,u),h=ns(f,o),p=1;for(;i.has(h)&&p<=255;)f=mt(d,yt(u,new Uint8Array([p]))),h=ns(f,o),p++;if(i.has(h))throw new Error("Duress token collision unresolvable after 255 retries");return h}function nd(e,t,n,r,o,s){const i=s?.encoding??Bn,a=s?.tolerance??0;if(!Number.isInteger(a)||a<0)throw new RangeError("Tolerance must be a non-negative integer");if(a>gt)throw new RangeError(`Tolerance must be <= ${gt}, got ${a}`);const c=r.toLowerCase().trim().replace(/\s+/g," "),l=Ao(c,Ke(e,t,n,i)),d=Math.max(0,n-a),u=Math.min(4294967295,n+a),f=[];for(const p of o){let m=!1;for(let y=d;y<=u;y++)Ao(c,li(e,t,p,y,i,a))&&(m=!0);m&&f.push(p)}let h=!1;for(let p=d;p<=u;p++)p!==n&&Ao(c,Ke(e,t,p,i))&&(h=!0);return l?{status:"valid"}:f.length>0?{status:"duress",identities:f}:h?{status:"valid"}:{status:"invalid"}}function gg(e,t,n,r){const o=ci(e),s=yt(Sn(t+":alive"),new Uint8Array([0]),Sn(n),ai(r));return mt(o,s)}function bg(e,t,n,r,o=Bn){return{[n[0]]:Ke(e,`${t}:${n[0]}`,r,o),[n[1]]:Ke(e,`${t}:${n[1]}`,r,o)}}const To=Object.freeze({family:Object.freeze({wordCount:1,rotationInterval:ii,description:"Casual verification for family and friends. Single word, weekly rotation. Adequate for live voice/video calls where the attacker gets one attempt. NOT suitable for text-based verification — 11 bits of entropy is trivially brute-forceable without rate limiting."}),"field-ops":Object.freeze({wordCount:2,rotationInterval:86400,description:"High-security preset for journalism, activism, and field operations. Two-word phrases (~22 bits) with daily rotation. Use burn-after-use for maximum protection."}),enterprise:Object.freeze({wordCount:2,rotationInterval:172800,description:"Enterprise incident response. Two-word phrases with 48-hour rotation. Balances security with operational convenience for larger teams."}),event:Object.freeze({wordCount:1,rotationInterval:14400,description:"Temporary groups for conferences, festivals, and meetups. Single word with 4-hour rotation. Fast setup, easy to share at the door."})}),vg=/^[0-9a-f]{64}$/,ua=100;function rs(e){if(!vg.test(e))throw new Error(`Invalid member pubkey: expected 64 hex characters, got ${e.length} chars`)}function wg(e){if(e.preset!==void 0&&(typeof e.preset!="string"||!Object.hasOwn(To,e.preset)))throw new Error(`Unknown preset: "${e.preset}". Valid presets: ${Object.keys(To).join(", ")}`);const t=Math.floor(Date.now()/1e3),n=e.preset!==void 0?To[e.preset]:void 0,r=e.rotationInterval??n?.rotationInterval??ii,o=e.wordCount??n?.wordCount??1,s=e.tolerance??1;if(!Number.isInteger(r)||r<=0)throw new Error(`rotationInterval must be a positive integer, got ${r}`);if(o!==1&&o!==2&&o!==3)throw new Error(`wordCount must be 1, 2, or 3, got ${o}`);if(!Number.isInteger(s)||s<0||s>gt)throw new RangeError(`tolerance must be an integer 0–${gt}, got ${s}`);if(e.beaconInterval!==void 0&&(!Number.isInteger(e.beaconInterval)||e.beaconInterval<=0))throw new Error(`beaconInterval must be a positive integer, got ${e.beaconInterval}`);if(e.beaconPrecision!==void 0&&(!Number.isInteger(e.beaconPrecision)||e.beaconPrecision<1||e.beaconPrecision>11))throw new Error(`beaconPrecision must be an integer between 1 and 11, got ${e.beaconPrecision}`);for(const i of e.members)rs(i);if(e.creator!==void 0&&(rs(e.creator),!e.members.includes(e.creator)))throw new Error("creator must be in members");return o===1&&e.members.length>=10&&console.warn(`[canary-kit] Group "${e.name}" has ${e.members.length} members with 1-word encoding. CANARY spec recommends 2+ words for groups of 10+ members to avoid duress collision (~2.2% at 10 members).`),{name:e.name,seed:ed(),members:[...e.members],rotationInterval:r,wordCount:o,tolerance:s,wordlist:e.wordlist??"en-v1",counter:rn(t,r),usageOffset:0,createdAt:t,beaconInterval:e.beaconInterval??300,beaconPrecision:e.beaconPrecision??6,admins:e.creator?[e.creator]:[],epoch:0,consumedOps:[]}}function Eg(e){const t=rn(Math.floor(Date.now()/1e3),e.rotationInterval),n=e.counter+e.usageOffset+1;if(n>t+ca)throw new RangeError(`Cannot advance counter: effective counter ${n} would exceed time-based counter ${t} + MAX_COUNTER_OFFSET (${ca})`);return{...e,usageOffset:e.usageOffset+1}}function di(e){return{...e,seed:ed(),usageOffset:0}}function rd(e,t){if(rs(t),e.members.includes(t))return e;if(e.members.length>=ua)throw new Error(`Cannot add member: group has reached the maximum of ${ua} members`);return{...e,members:[...e.members,t]}}function od(e,t){return{...e,members:e.members.filter(n=>n!==t)}}function kg(e,t=Math.floor(Date.now()/1e3)){const n=rn(t,e.rotationInterval);return n<=e.counter?e:{...e,counter:n,usageOffset:0}}const _g=new Set(["member-join","member-leave","counter-advance","reseed","beacon","duress-alert","liveness-checkin","state-snapshot"]),Oe=/^[0-9a-f]{64}$/,fa=100,xg=2e7,os=300,ha=1e3;function Lo(e,t,n,r){const o=[...e,t];return o.length>ha?{consumedOps:o.slice(-ha),consumedOpsFloor:Math.max(r??0,n)}:{consumedOps:o,consumedOpsFloor:r}}const Ce=2;function qt(e){return typeof e=="number"&&Number.isFinite(e)}function Be(e){return qt(e)&&Number.isInteger(e)&&e>=0}function pa(e){const t={...e,protocolVersion:Ce};if(e.type==="reseed"){const{seed:n,...r}=t;return JSON.stringify({...r,seed:Ge(e.seed)})}return JSON.stringify(t)}function Cr(e){if(e==null)return"null";if(typeof e=="boolean"||typeof e=="number"||typeof e=="string")return JSON.stringify(e);if(Array.isArray(e))return"["+e.map(Cr).join(",")+"]";if(e instanceof Uint8Array)throw new Error("stableStringify: Uint8Array must be hex-encoded before serialisation");if(typeof e=="object"){const t=e;return"{"+Object.keys(t).sort().filter(o=>t[o]!==void 0).map(o=>JSON.stringify(o)+":"+Cr(t[o])).join(",")+"}"}throw new Error(`stableStringify: unsupported type ${typeof e}`)}function Zn(e){if(e.type==="reseed"){const{seed:t,...n}=e;return Cr({...n,seed:Ge(t)})}return Cr(e)}function ma(e){let t;try{t=JSON.parse(e)}catch{throw new Error("Invalid sync message: not valid JSON")}const n=t.type;if(typeof n!="string"||!_g.has(n))throw new Error(`Invalid sync message type: ${String(n)}`);const r=t.timestamp;if(!Be(r))throw new Error("Invalid sync message: missing or invalid timestamp");const o=t.protocolVersion;if(o==null)throw new Error("Invalid sync message: protocolVersion is required");if(o!==Ce)throw new Error(`Unsupported protocol version: ${o} (expected: ${Ce})`);switch(n){case"member-join":if(typeof t.pubkey!="string"||!Oe.test(t.pubkey))throw new Error("Invalid sync message: member-join requires a 64-char hex pubkey");if(!Be(t.epoch))throw new Error("Invalid sync message: member-join requires a non-negative epoch");if(typeof t.opId!="string"||t.opId.length===0||t.opId.length>128)throw new Error("Invalid sync message: member-join requires a non-empty opId (max 128 chars)");break;case"member-leave":if(typeof t.pubkey!="string"||!Oe.test(t.pubkey))throw new Error("Invalid sync message: member-leave requires a 64-char hex pubkey");if(!Be(t.epoch))throw new Error("Invalid sync message: member-leave requires a non-negative epoch");if(typeof t.opId!="string"||t.opId.length===0||t.opId.length>128)throw new Error("Invalid sync message: member-leave requires a non-empty opId (max 128 chars)");break;case"liveness-checkin":if(typeof t.pubkey!="string"||!Oe.test(t.pubkey))throw new Error("Invalid sync message: liveness-checkin requires a 64-char hex pubkey");if(typeof t.opId!="string"||t.opId.length===0||t.opId.length>128)throw new Error("Invalid sync message: liveness-checkin requires a non-empty opId (max 128 chars)");break;case"counter-advance":if(!Be(t.counter))throw new Error("Invalid sync message: counter-advance requires a non-negative counter");if(!Be(t.usageOffset))throw new Error("Invalid sync message: counter-advance requires a non-negative usageOffset");break;case"reseed":if(typeof t.seed!="string"||!Oe.test(t.seed))throw new Error("Invalid sync message: reseed.seed must be a 64-char hex string");if(!Be(t.counter))throw new Error("Invalid sync message: reseed requires a non-negative counter");if(!Be(t.epoch))throw new Error("Invalid sync message: reseed requires a non-negative epoch");if(typeof t.opId!="string"||t.opId.length===0||t.opId.length>128)throw new Error("Invalid sync message: reseed requires a non-empty opId (max 128 chars)");if(!Array.isArray(t.admins)||!t.admins.every(s=>typeof s=="string"&&Oe.test(s)))throw new Error("Invalid sync message: reseed.admins must be 64-char hex pubkeys");if(!Array.isArray(t.members)||!t.members.every(s=>typeof s=="string"&&Oe.test(s)))throw new Error("Invalid sync message: reseed.members must be 64-char hex pubkeys");return{type:n,seed:F(t.seed),counter:t.counter,timestamp:r,epoch:t.epoch,opId:t.opId,admins:[...t.admins],members:[...t.members],protocolVersion:Ce};case"beacon":if(!qt(t.lat)||!qt(t.lon))throw new Error("Invalid sync message: beacon requires numeric lat and lon");if(t.lat<-90||t.lat>90||t.lon<-180||t.lon>180)throw new Error("Invalid sync message: beacon lat/lon out of range");if(!qt(t.accuracy)||t.accuracy<0||t.accuracy>xg)throw new Error("Invalid sync message: beacon requires a non-negative accuracy");if(typeof t.opId!="string"||t.opId.length===0||t.opId.length>128)throw new Error("Invalid sync message: beacon requires a non-empty opId (max 128 chars)");break;case"duress-alert":if(!qt(t.lat)||!qt(t.lon))throw new Error("Invalid sync message: duress-alert requires numeric lat and lon");if(t.lat<-90||t.lat>90||t.lon<-180||t.lon>180)throw new Error("Invalid sync message: duress-alert lat/lon out of range");if(typeof t.opId!="string"||t.opId.length===0||t.opId.length>128)throw new Error("Invalid sync message: duress-alert requires a non-empty opId (max 128 chars)");break;case"state-snapshot":if(typeof t.seed!="string"||!Oe.test(t.seed))throw new Error("Invalid sync message: state-snapshot requires a 64-char hex seed");if(!Be(t.counter))throw new Error("Invalid sync message: state-snapshot requires a non-negative counter");if(!Be(t.usageOffset))throw new Error("Invalid sync message: state-snapshot requires a non-negative usageOffset");if(!Array.isArray(t.members)||!t.members.every(s=>typeof s=="string"&&Oe.test(s)))throw new Error("Invalid sync message: state-snapshot members must be 64-char hex pubkeys");if(!Array.isArray(t.admins)||!t.admins.every(s=>typeof s=="string"&&Oe.test(s)))throw new Error("Invalid sync message: state-snapshot admins must be 64-char hex pubkeys");if(!Be(t.epoch))throw new Error("Invalid sync message: state-snapshot requires a non-negative epoch");if(typeof t.opId!="string"||t.opId.length===0||t.opId.length>128)throw new Error("Invalid sync message: state-snapshot requires a non-empty opId (max 128 chars)");if(t.prevEpochSeed!==void 0&&(typeof t.prevEpochSeed!="string"||!Oe.test(t.prevEpochSeed)))throw new Error("Invalid sync message: state-snapshot.prevEpochSeed must be a 64-char hex string");break}return t}function ya(e,t){return e.type==="reseed"||e.type==="state-snapshot"||e.type==="member-join"&&e.pubkey!==t||e.type==="member-leave"&&e.pubkey!==t}function sd(e,t,n=Math.floor(Date.now()/1e3),r){if(ya(t,r)){if(!r||!e.admins.includes(r))return e;const o=t.epoch,s=t.opId;if(o===void 0||s===void 0||o<e.epoch)return e;if(t.type==="reseed"){if(o!==e.epoch+1)return e;const i=t;if(!i.admins||!i.members)return e;const a=new Set(i.members);if(!i.admins.every(c=>a.has(c)))return e}else if(t.type==="state-snapshot"){if(o<e.epoch)return e;const i=t;if(!i.admins||!i.members)return e;const a=new Set(i.members);if(!i.admins.every(c=>a.has(c)))return e}else if(o!==e.epoch)return e;if(t.type!=="reseed"&&!(t.type==="state-snapshot"&&o>e.epoch)&&(new Set(e.consumedOps).has(s)||e.consumedOpsFloor!==void 0&&t.timestamp<=e.consumedOpsFloor))return e}if(t.type==="duress-alert"||t.type==="beacon"||t.type==="liveness-checkin"){const o=n-t.timestamp;if(o>os||o<-60)return e}if(t.type==="liveness-checkin"&&r&&t.pubkey!==r||t.type==="member-leave"&&!ya(t,r)&&(new Set(e.consumedOps).has(t.opId)||e.consumedOpsFloor!==void 0&&t.timestamp<=e.consumedOpsFloor))return e;switch(t.type){case"member-join":{const o=rd(e,t.pubkey),s=Lo(o.consumedOps,t.opId,t.timestamp,e.consumedOpsFloor),i=t.displayName?{memberNames:{...o.memberNames,[t.pubkey]:t.displayName}}:{};return{...o,...s,...i}}case"member-leave":if(!e.members.includes(t.pubkey))return e;{const o=od(e,t.pubkey),s=Lo(o.consumedOps,t.opId,t.timestamp,e.consumedOpsFloor);return{...o,...s}}case"counter-advance":{if(!r||!e.members.includes(r)||t.usageOffset>fa)return e;const o=e.counter+e.usageOffset,s=t.counter+t.usageOffset;if(s<=o)return e;const a=Math.floor(n/e.rotationInterval)+fa;return s>a?e:{...e,counter:t.counter,usageOffset:t.usageOffset}}case"reseed":return{...e,seed:Ge(t.seed),counter:t.counter,usageOffset:0,members:[...t.members],admins:[...t.admins],epoch:t.epoch,consumedOps:[t.opId]};case"state-snapshot":{if(t.epoch===e.epoch){if(t.seed!==e.seed)return e;const o=e.counter+e.usageOffset;if(t.counter+t.usageOffset<o||!e.members.every(a=>t.members.includes(a))||!e.admins.every(a=>t.admins.includes(a)))return e;const i=Lo(e.consumedOps,t.opId,t.timestamp,e.consumedOpsFloor);return{...e,counter:t.counter,usageOffset:t.usageOffset,members:[...t.members],admins:[...t.admins],...i}}return e}case"beacon":case"duress-alert":case"liveness-checkin":return e;default:return e}}var Pt=Symbol("verified"),Sg=e=>e instanceof Object;function Ig(e){if(!Sg(e)||typeof e.kind!="number"||typeof e.content!="string"||typeof e.created_at!="number"||typeof e.pubkey!="string"||!e.pubkey.match(/^[a-f0-9]{64}$/)||!Array.isArray(e.tags))return!1;for(let t=0;t<e.tags.length;t++){let n=e.tags[t];if(!Array.isArray(n))return!1;for(let r=0;r<n.length;r++)if(typeof n[r]!="string")return!1}return!0}new TextDecoder("utf-8");var Rg=new TextEncoder,Ag=class{generateSecretKey(){return Q.utils.randomSecretKey()}getPublicKey(t){return j(Q.getPublicKey(t))}finalizeEvent(t,n){const r=t;return r.pubkey=j(Q.getPublicKey(n)),r.id=No(r),r.sig=j(Q.sign(z(No(r)),n)),r[Pt]=!0,r}verifyEvent(t){if(typeof t[Pt]=="boolean")return t[Pt];try{const n=No(t);if(n!==t.id)return t[Pt]=!1,!1;const r=Q.verify(z(t.sig),z(n),z(t.pubkey));return t[Pt]=r,r}catch{return t[Pt]=!1,!1}}};function Cg(e){if(!Ig(e))throw new Error("can't serialize event with wrong or missing properties");return JSON.stringify([0,e.pubkey,e.created_at,e.kind,e.tags,e.content])}function No(e){let t=se(Rg.encode(Cg(e)));return j(t)}var Qr=new Ag,Tg=Qr.generateSecretKey,In=Qr.getPublicKey,bt=Qr.finalizeEvent,ga=Qr.verifyEvent,Lg=new TextDecoder("utf-8"),id=new TextEncoder,ad=1,cd=65535;function Te(e,t){const n=Pe.getSharedSecret(e,z("02"+t)).subarray(1,33);return Xc(se,n,id.encode("nip44-v2"))}function ld(e,t){const n=Qc(se,e,t,76);return{chacha_key:n.subarray(0,32),chacha_nonce:n.subarray(32,44),hmac_key:n.subarray(44,76)}}function dd(e){if(!Number.isSafeInteger(e)||e<1)throw new Error("expected positive integer");if(e<=32)return 32;const t=1<<Math.floor(Math.log2(e-1))+1,n=t<=256?32:t/8;return n*(Math.floor((e-1)/n)+1)}function Ng(e){if(!Number.isSafeInteger(e)||e<ad||e>cd)throw new Error("invalid plaintext size: must be between 1 and 65535 bytes");const t=new Uint8Array(2);return new DataView(t.buffer).setUint16(0,e,!1),t}function $g(e){const t=id.encode(e),n=t.length,r=Ng(n),o=new Uint8Array(dd(n)-n);return oe(r,t,o)}function Mg(e){const t=new DataView(e.buffer).getUint16(0),n=e.subarray(2,2+t);if(t<ad||t>cd||n.length!==t||e.length!==2+dd(t))throw new Error("invalid padding");return Lg.decode(n)}function ud(e,t,n){if(n.length!==32)throw new Error("AAD associated data must be 32 bytes");const r=oe(n,t);return tt(se,e,r)}function Og(e){if(typeof e!="string")throw new Error("payload must be a valid string");const t=e.length;if(t<132||t>87472)throw new Error("invalid payload length: "+t);if(e[0]==="#")throw new Error("unknown encryption version");let n;try{n=He.decode(e)}catch(s){throw new Error("invalid base64: "+s.message)}const r=n.length;if(r<99||r>65603)throw new Error("invalid data length: "+r);const o=n[0];if(o!==2)throw new Error("unknown encryption version "+o);return{nonce:n.subarray(1,33),ciphertext:n.subarray(33,-32),mac:n.subarray(-32)}}function Xt(e,t,n=vt(32)){const{chacha_key:r,chacha_nonce:o,hmac_key:s}=ld(t,n),i=$g(e),a=jr(r,o,i),c=ud(s,a,n);return He.encode(oe(new Uint8Array([2]),n,a,c))}function Qt(e,t){const{nonce:n,ciphertext:r,mac:o}=Og(e),{chacha_key:s,chacha_nonce:i,hmac_key:a}=ld(t,n),c=ud(a,r,n);if(!Gc(c,o))throw new Error("invalid MAC");const l=jr(s,i,r);return Mg(l)}function $o(e){if(!/^[0-9a-f]*$/i.test(e)||e.length%2!==0)throw new Error(`Invalid hex string: "${e.slice(0,20)}${e.length>20?"…":""}"`);const t=new Uint8Array(e.length/2);for(let n=0;n<e.length;n+=2)t[n/2]=parseInt(e.slice(n,n+2),16);return t}function Bg(e){return Array.from(e,t=>t.toString(16).padStart(2,"0")).join("")}class ba{constructor(t,n){this.pubkey=t,this.privkeyHex=n}async sign(t){const n=$o(this.privkeyHex);return bt(t,n)}async encrypt(t,n){const r=$o(this.privkeyHex),o=Te(r,n);return Xt(t,o)}async decrypt(t,n){const r=$o(this.privkeyHex),o=Te(r,n);return Qt(t,o)}}class fd{pubkey;signingKey;constructor(t,n){this.signingKey=lg(t,n),this.pubkey=In(this.signingKey)}async sign(t){return bt(t,this.signingKey)}}function hd(){return typeof window.nostr?.signEvent=="function"}async function Pg(e){if(e.privkey&&e.pubkey)return{signer:new ba(e.pubkey,e.privkey),signerType:"local",pubkey:e.pubkey,privkey:e.privkey};const t=Tg(),n=In(t),r=Bg(t);return{signer:new ba(n,r),signerType:"local",pubkey:n,privkey:r}}var _t=Symbol("verified"),Ug=e=>e instanceof Object;function Dg(e){if(!Ug(e)||typeof e.kind!="number"||typeof e.content!="string"||typeof e.created_at!="number"||typeof e.pubkey!="string"||!e.pubkey.match(/^[a-f0-9]{64}$/)||!Array.isArray(e.tags))return!1;for(let t=0;t<e.tags.length;t++){let n=e.tags[t];if(!Array.isArray(n))return!1;for(let r=0;r<n.length;r++)if(typeof n[r]!="string")return!1}return!0}new TextDecoder("utf-8");var qg=new TextEncoder;function mn(e){try{e.indexOf("://")===-1&&(e="wss://"+e);let t=new URL(e);return t.protocol==="http:"?t.protocol="ws:":t.protocol==="https:"&&(t.protocol="wss:"),t.pathname=t.pathname.replace(/\/+/g,"/"),t.pathname.endsWith("/")&&(t.pathname=t.pathname.slice(0,-1)),(t.port==="80"&&t.protocol==="ws:"||t.port==="443"&&t.protocol==="wss:")&&(t.port=""),t.searchParams.sort(),t.hash="",t.toString()}catch{throw new Error(`Invalid URL: ${e}`)}}var jg=class{generateSecretKey(){return Q.utils.randomSecretKey()}getPublicKey(e){return j(Q.getPublicKey(e))}finalizeEvent(e,t){const n=e;return n.pubkey=j(Q.getPublicKey(t)),n.id=Mo(n),n.sig=j(Q.sign(z(Mo(n)),t)),n[_t]=!0,n}verifyEvent(e){if(typeof e[_t]=="boolean")return e[_t];try{const t=Mo(e);if(t!==e.id)return e[_t]=!1,!1;const n=Q.verify(z(e.sig),z(t),z(e.pubkey));return e[_t]=n,n}catch{return e[_t]=!1,!1}}};function Hg(e){if(!Dg(e))throw new Error("can't serialize event with wrong or missing properties");return JSON.stringify([0,e.pubkey,e.created_at,e.kind,e.tags,e.content])}function Mo(e){let t=se(qg.encode(Hg(e)));return j(t)}var eo=new jg;eo.generateSecretKey;eo.getPublicKey;eo.finalizeEvent;var Fg=eo.verifyEvent,Gg=22242;function Kg(e,t){if(e.ids&&e.ids.indexOf(t.id)===-1||e.kinds&&e.kinds.indexOf(t.kind)===-1||e.authors&&e.authors.indexOf(t.pubkey)===-1)return!1;for(let n in e)if(n[0]==="#"){let r=n.slice(1),o=e[`#${r}`];if(o&&!t.tags.find(([s,i])=>s===n.slice(1)&&o.indexOf(i)!==-1))return!1}return!(e.since&&t.created_at<e.since||e.until&&t.created_at>e.until)}function Vg(e,t){for(let n=0;n<e.length;n++)if(Kg(e[n],t))return!0;return!1}function zg(e,t){let n=t.length+3,r=e.indexOf(`"${t}":`)+n,o=e.slice(r).indexOf('"')+r+1;return e.slice(o,o+64)}function Wg(e){let t=e.slice(0,22).indexOf('"EVENT"');if(t===-1)return null;let n=e.slice(t+7+1).indexOf('"');if(n===-1)return null;let r=t+7+1+n,o=e.slice(r+1,80).indexOf('"');if(o===-1)return null;let s=r+1+o;return e.slice(r+1,s)}function Jg(e,t){return{kind:Gg,created_at:Math.floor(Date.now()/1e3),tags:[["relay",e],["challenge",t]],content:""}}var pd=class extends Error{constructor(e,t){super(`Tried to send message '${e} on a closed connection to ${t}.`),this.name="SendingOnClosedConnection"}},md=class{url;_connected=!1;onclose=null;onnotice=e=>console.debug(`NOTICE from ${this.url}: ${e}`);onauth;baseEoseTimeout=4400;publishTimeout=4400;pingFrequency=29e3;pingTimeout=2e4;resubscribeBackoff=[1e4,1e4,1e4,2e4,2e4,3e4,6e4];openSubs=new Map;enablePing;enableReconnect;idleSince=Date.now();ongoingOperations=0;reconnectTimeoutHandle;pingIntervalHandle;reconnectAttempts=0;skipReconnection=!1;connectionPromise;openCountRequests=new Map;openEventPublishes=new Map;ws;challenge;authPromise;serial=0;verifyEvent;_WebSocket;constructor(e,t){this.url=mn(e),this.verifyEvent=t.verifyEvent,this._WebSocket=t.websocketImplementation||WebSocket,this.enablePing=t.enablePing,this.enableReconnect=t.enableReconnect||!1}static async connect(e,t){const n=new md(e,t);return await n.connect(t),n}closeAllSubscriptions(e){for(let[t,n]of this.openSubs)n.close(e);this.openSubs.clear();for(let[t,n]of this.openEventPublishes)n.reject(new Error(e));this.openEventPublishes.clear();for(let[t,n]of this.openCountRequests)n.reject(new Error(e));this.openCountRequests.clear()}get connected(){return this._connected}async reconnect(){const e=this.resubscribeBackoff[Math.min(this.reconnectAttempts,this.resubscribeBackoff.length-1)];this.reconnectAttempts++,this.reconnectTimeoutHandle=setTimeout(async()=>{try{await this.connect()}catch{}},e)}handleHardClose(e){this.pingIntervalHandle&&(clearInterval(this.pingIntervalHandle),this.pingIntervalHandle=void 0),this._connected=!1,this.connectionPromise=void 0,this.idleSince=void 0,this.enableReconnect&&!this.skipReconnection?this.reconnect():(this.onclose?.(),this.closeAllSubscriptions(e))}async connect(e){let t;return this.connectionPromise?this.connectionPromise:(this.challenge=void 0,this.authPromise=void 0,this.skipReconnection=!1,this.connectionPromise=new Promise((n,r)=>{e?.timeout&&(t=setTimeout(()=>{r("connection timed out"),this.connectionPromise=void 0,this.skipReconnection=!0,this.onclose?.(),this.handleHardClose("relay connection timed out")},e.timeout)),e?.abort&&(e.abort.onabort=r);try{this.ws=new this._WebSocket(this.url)}catch(o){clearTimeout(t),r(o);return}this.ws.onopen=()=>{this.reconnectTimeoutHandle&&(clearTimeout(this.reconnectTimeoutHandle),this.reconnectTimeoutHandle=void 0),clearTimeout(t),this._connected=!0;const o=this.reconnectAttempts>0;this.reconnectAttempts=0;for(const s of this.openSubs.values()){if(s.eosed=!1,o)for(let i=0;i<s.filters.length;i++)s.lastEmitted&&(s.filters[i].since=s.lastEmitted+1);s.fire()}this.enablePing&&(this.pingIntervalHandle=setInterval(()=>this.pingpong(),this.pingFrequency)),n()},this.ws.onerror=()=>{clearTimeout(t),r("connection failed"),this.connectionPromise=void 0,this.skipReconnection=!0,this.onclose?.(),this.handleHardClose("relay connection failed")},this.ws.onclose=o=>{clearTimeout(t),r(o.message||"websocket closed"),this.handleHardClose("relay connection closed")},this.ws.onmessage=this._onmessage.bind(this)}),this.connectionPromise)}waitForPingPong(){return new Promise(e=>{this.ws.once("pong",()=>e(!0)),this.ws.ping()})}waitForDummyReq(){return new Promise((e,t)=>{if(!this.connectionPromise)return t(new Error(`no connection to ${this.url}, can't ping`));try{const n=this.subscribe([{ids:["aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"],limit:0}],{label:"<forced-ping>",oneose:()=>{e(!0),n.close()},onclose(){e(!0)},eoseTimeout:this.pingTimeout+1e3})}catch(n){t(n)}})}async pingpong(){this.ws?.readyState===1&&(await Promise.any([this.ws&&this.ws.ping&&this.ws.once?this.waitForPingPong():this.waitForDummyReq(),new Promise(t=>setTimeout(()=>t(!1),this.pingTimeout))])||this.ws?.readyState===this._WebSocket.OPEN&&this.ws?.close())}async send(e){if(!this.connectionPromise)throw new pd(e,this.url);this.connectionPromise.then(()=>{this.ws?.send(e)})}async auth(e){const t=this.challenge;if(!t)throw new Error("can't perform auth, no challenge was received");return this.authPromise?this.authPromise:(this.authPromise=new Promise(async(n,r)=>{try{let o=await e(Jg(this.url,t)),s=setTimeout(()=>{let i=this.openEventPublishes.get(o.id);i&&(i.reject(new Error("auth timed out")),this.openEventPublishes.delete(o.id))},this.publishTimeout);this.openEventPublishes.set(o.id,{resolve:n,reject:r,timeout:s}),this.send('["AUTH",'+JSON.stringify(o)+"]")}catch(o){console.warn("subscribe auth function failed:",o)}}),this.authPromise)}async publish(e){this.idleSince=void 0,this.ongoingOperations++;const t=new Promise((n,r)=>{const o=setTimeout(()=>{const s=this.openEventPublishes.get(e.id);s&&(s.reject(new Error("publish timed out")),this.openEventPublishes.delete(e.id))},this.publishTimeout);this.openEventPublishes.set(e.id,{resolve:n,reject:r,timeout:o})});return this.send('["EVENT",'+JSON.stringify(e)+"]"),this.ongoingOperations--,this.ongoingOperations===0&&(this.idleSince=Date.now()),t}async count(e,t){this.serial++;const n=t?.id||"count:"+this.serial,r=new Promise((o,s)=>{this.openCountRequests.set(n,{resolve:o,reject:s})});return this.send('["COUNT","'+n+'",'+JSON.stringify(e).substring(1)),r}subscribe(e,t){t.label!=="<forced-ping>"&&(this.idleSince=void 0,this.ongoingOperations++);const n=this.prepareSubscription(e,t);return n.fire(),t.abort&&(t.abort.onabort=()=>n.close(String(t.abort.reason||"<aborted>"))),n}prepareSubscription(e,t){this.serial++;const n=t.id||(t.label?t.label+":":"sub:")+this.serial,r=new Yg(this,n,e,t);return this.openSubs.set(n,r),r}close(){this.skipReconnection=!0,this.reconnectTimeoutHandle&&(clearTimeout(this.reconnectTimeoutHandle),this.reconnectTimeoutHandle=void 0),this.pingIntervalHandle&&(clearInterval(this.pingIntervalHandle),this.pingIntervalHandle=void 0),this.closeAllSubscriptions("relay connection closed by us"),this._connected=!1,this.idleSince=void 0,this.onclose?.(),this.ws?.readyState===this._WebSocket.OPEN&&this.ws?.close()}_onmessage(e){const t=e.data;if(!t)return;const n=Wg(t);if(n){const r=this.openSubs.get(n);if(!r)return;const o=zg(t,"id"),s=r.alreadyHaveEvent?.(o);if(r.receivedEvent?.(this,o),s)return}try{let r=JSON.parse(t);switch(r[0]){case"EVENT":{const o=this.openSubs.get(r[1]),s=r[2];this.verifyEvent(s)&&Vg(o.filters,s)?o.onevent(s):o.oninvalidevent?.(s),(!o.lastEmitted||o.lastEmitted<s.created_at)&&(o.lastEmitted=s.created_at);return}case"COUNT":{const o=r[1],s=r[2],i=this.openCountRequests.get(o);i&&(i.resolve(s.count),this.openCountRequests.delete(o));return}case"EOSE":{const o=this.openSubs.get(r[1]);if(!o)return;o.receivedEose();return}case"OK":{const o=r[1],s=r[2],i=r[3],a=this.openEventPublishes.get(o);a&&(clearTimeout(a.timeout),s?a.resolve(i):a.reject(new Error(i)),this.openEventPublishes.delete(o));return}case"CLOSED":{const o=r[1],s=this.openSubs.get(o);if(!s)return;s.closed=!0,s.close(r[2]);return}case"NOTICE":{this.onnotice(r[1]);return}case"AUTH":{this.challenge=r[1],this.onauth&&this.auth(this.onauth);return}default:{this.openSubs.get(r[1])?.oncustom?.(r);return}}}catch(r){try{const[o,s,i]=JSON.parse(t);console.warn(`[nostr] relay ${this.url} error processing message:`,r,i)}catch{console.warn(`[nostr] relay ${this.url} error processing message:`,r)}return}}},Yg=class{relay;id;lastEmitted;closed=!1;eosed=!1;filters;alreadyHaveEvent;receivedEvent;onevent;oninvalidevent;oneose;onclose;oncustom;eoseTimeout;eoseTimeoutHandle;constructor(e,t,n,r){if(n.length===0)throw new Error("subscription can't be created with zero filters");this.relay=e,this.filters=n,this.id=t,this.alreadyHaveEvent=r.alreadyHaveEvent,this.receivedEvent=r.receivedEvent,this.eoseTimeout=r.eoseTimeout||e.baseEoseTimeout,this.oneose=r.oneose,this.onclose=r.onclose,this.oninvalidevent=r.oninvalidevent,this.onevent=r.onevent||(o=>{console.warn(`onevent() callback not defined for subscription '${this.id}' in relay ${this.relay.url}. event received:`,o)})}fire(){this.relay.send('["REQ","'+this.id+'",'+JSON.stringify(this.filters).substring(1)),this.eoseTimeoutHandle=setTimeout(this.receivedEose.bind(this),this.eoseTimeout)}receivedEose(){this.eosed||(clearTimeout(this.eoseTimeoutHandle),this.eosed=!0,this.oneose?.())}close(e="closed by caller"){if(!this.closed&&this.relay.connected){try{this.relay.send('["CLOSE",'+JSON.stringify(this.id)+"]")}catch(t){if(!(t instanceof pd))throw t}this.closed=!0}this.relay.openSubs.delete(this.id),this.relay.ongoingOperations--,this.relay.ongoingOperations===0&&(this.relay.idleSince=Date.now()),this.onclose?.(e)}},Zg=e=>(e[_t]=!0,!0),Xg=class{relays=new Map;seenOn=new Map;trackRelays=!1;verifyEvent;enablePing;enableReconnect;automaticallyAuth;trustedRelayURLs=new Set;onRelayConnectionFailure;onRelayConnectionSuccess;allowConnectingToRelay;maxWaitForConnection;_WebSocket;constructor(e){this.verifyEvent=e.verifyEvent,this._WebSocket=e.websocketImplementation,this.enablePing=e.enablePing,this.enableReconnect=e.enableReconnect||!1,this.automaticallyAuth=e.automaticallyAuth,this.onRelayConnectionFailure=e.onRelayConnectionFailure,this.onRelayConnectionSuccess=e.onRelayConnectionSuccess,this.allowConnectingToRelay=e.allowConnectingToRelay,this.maxWaitForConnection=e.maxWaitForConnection||3e3}async ensureRelay(e,t){e=mn(e);let n=this.relays.get(e);if(n||(n=new md(e,{verifyEvent:this.trustedRelayURLs.has(e)?Zg:this.verifyEvent,websocketImplementation:this._WebSocket,enablePing:this.enablePing,enableReconnect:this.enableReconnect}),n.onclose=()=>{this.relays.delete(e)},this.relays.set(e,n)),this.automaticallyAuth){const r=this.automaticallyAuth(e);r&&(n.onauth=r)}try{await n.connect({timeout:t?.connectionTimeout,abort:t?.abort})}catch(r){throw this.relays.delete(e),r}return n}close(e){e.map(mn).forEach(t=>{this.relays.get(t)?.close(),this.relays.delete(t)})}subscribe(e,t,n){const r=[],o=[];for(let s=0;s<e.length;s++){const i=mn(e[s]);r.find(a=>a.url===i)||o.indexOf(i)===-1&&(o.push(i),r.push({url:i,filter:t}))}return this.subscribeMap(r,n)}subscribeMany(e,t,n){return this.subscribe(e,t,n)}subscribeMap(e,t){const n=new Map;for(const f of e){const{url:h,filter:p}=f;n.has(h)||n.set(h,[]),n.get(h).push(p)}const r=Array.from(n.entries()).map(([f,h])=>({url:f,filters:h}));this.trackRelays&&(t.receivedEvent=(f,h)=>{let p=this.seenOn.get(h);p||(p=new Set,this.seenOn.set(h,p)),p.add(f)});const o=new Set,s=[],i=[];let a=f=>{i[f]||(i[f]=!0,i.filter(h=>h).length===r.length&&(t.oneose?.(),a=()=>{}))};const c=[];let l=(f,h)=>{c[f]||(a(f),c[f]=h,c.filter(p=>p).length===r.length&&(t.onclose?.(c),l=()=>{}))};const d=f=>{if(t.alreadyHaveEvent?.(f))return!0;const h=o.has(f);return o.add(f),h},u=Promise.all(r.map(async({url:f,filters:h},p)=>{if(this.allowConnectingToRelay?.(f,["read",h])===!1){l(p,"connection skipped by allowConnectingToRelay");return}let m;try{m=await this.ensureRelay(f,{connectionTimeout:this.maxWaitForConnection<(t.maxWait||0)?Math.max(t.maxWait*.8,t.maxWait-1e3):this.maxWaitForConnection,abort:t.abort})}catch(E){this.onRelayConnectionFailure?.(f),l(p,E?.message||String(E));return}this.onRelayConnectionSuccess?.(f);let y=m.subscribe(h,{...t,oneose:()=>a(p),onclose:E=>{E.startsWith("auth-required: ")&&t.onauth?m.auth(t.onauth).then(()=>{m.subscribe(h,{...t,oneose:()=>a(p),onclose:S=>{l(p,S)},alreadyHaveEvent:d,eoseTimeout:t.maxWait,abort:t.abort})}).catch(S=>{l(p,`auth was required and attempted, but failed with: ${S}`)}):l(p,E)},alreadyHaveEvent:d,eoseTimeout:t.maxWait,abort:t.abort});s.push(y)}));return{async close(f){await u,s.forEach(h=>{h.close(f)})}}}subscribeEose(e,t,n){let r;return r=this.subscribe(e,t,{...n,oneose(){const o="closed automatically on eose";r?r.close(o):n.onclose?.(e.map(s=>o))}}),r}subscribeManyEose(e,t,n){return this.subscribeEose(e,t,n)}async querySync(e,t,n){return new Promise(async r=>{const o=[];this.subscribeEose(e,t,{...n,onevent(s){o.push(s)},onclose(s){r(o)}})})}async get(e,t,n){t.limit=1;const r=await this.querySync(e,t,n);return r.sort((o,s)=>s.created_at-o.created_at),r[0]||null}publish(e,t,n){return e.map(mn).map(async(r,o,s)=>{if(s.indexOf(r)!==o)return Promise.reject("duplicate url");if(this.allowConnectingToRelay?.(r,["write",t])===!1)return Promise.reject("connection skipped by allowConnectingToRelay");let i;try{i=await this.ensureRelay(r,{connectionTimeout:this.maxWaitForConnection<(n?.maxWait||0)?Math.max(n.maxWait*.8,n.maxWait-1e3):this.maxWaitForConnection,abort:n?.abort})}catch(a){return this.onRelayConnectionFailure?.(r),"connection failure: "+String(a)}return i.publish(t).catch(async a=>{if(a instanceof Error&&a.message.startsWith("auth-required: ")&&n?.onauth)return await i.auth(n.onauth),i.publish(t);throw a}).then(a=>{if(this.trackRelays){let c=this.seenOn.get(t.id);c||(c=new Set,this.seenOn.set(t.id,c)),c.add(i)}return a})})}listConnectionStatus(){const e=new Map;return this.relays.forEach((t,n)=>e.set(n,t.connected)),e}destroy(){this.relays.forEach(e=>e.close()),this.relays=new Map}pruneIdleRelays(e=1e4){const t=[];for(const[n,r]of this.relays)r.idleSince&&Date.now()-r.idleSince>=e&&(this.relays.delete(n),t.push(n),r.close());return t}},yd;try{yd=WebSocket}catch{}var Qg=class extends Xg{constructor(e){super({verifyEvent:Fg,websocketImplementation:yd,maxWaitForConnection:3e3,...e})}};let Ee=null,en=!1,to=0,Gt=[],Kt=[];function Tr(){const e=new Set([...Gt,...Kt]);return Array.from(e)}let gd=Promise.resolve();function ui(e,t){const n=we(e),r=t?we(t):[...n];Ee&&n.length===Gt.length&&n.every(s=>Gt.includes(s))&&r.length===Kt.length&&r.every(s=>Kt.includes(s))||(Ee&&(Ee.close(Tr()),Ee=null,en=!1,to=0,Gt=[],Kt=[]),Gt=n,Kt=r,Tr().length===0)||(Ee=new Qg,en=!1,gd=eb())}function no(){return gd}async function eb(){if(!Ee)return;const e=Ee,t=Tr();if(t.length===0)return;let n=0;for(const r of t)try{await e.ensureRelay(r,{connectionTimeout:5e3}),n++}catch(o){console.warn(`[canary:relay] Failed to connect to ${r}:`,o)}Ee===e&&(en=n>0,to=n,en?console.info(`[canary:relay] Connected to ${n}/${t.length} relay(s)`):console.error("[canary:relay] Could not connect to any relay:",t))}function bd(){Ee&&Ee.close(Tr()),Ee=null,en=!1,to=0,Gt=[],Kt=[]}function pe(){return Ee}function $t(){return en}function Lt(){return to}const tb=Object.freeze(Object.defineProperty({__proto__:null,connectRelays:ui,disconnectRelays:bd,getPool:pe,getRelayCount:Lt,isConnected:$t,waitForConnection:no},Symbol.toStringTag,{value:"Module"})),va=29111,Oo=29112,Bo=29113,Xn=/^[0-9a-f]{64}$/,wa=/^[0-9a-f]{128}$/,Qn=new TextEncoder,nb=3,rb=6e4;class ob{constructor(t){this.capacity=t}items=[];has(t){return this.items.includes(t)}add(t){this.has(t)||(this.items.length>=this.capacity&&this.items.shift(),this.items.push(t))}}class Lr{constructor(t,n,r,o){this.personalPubkey=r,this.personalPrivkey=o,this.readRelays=we(t),this.writeRelays=we(n)}subs=new Map;groupKeys=new Map;tagHashToGroupId=new Map;seenEventIds=new ob(1e3);decryptFailures=new Map;recoveryPending=new Map;recoverySub=null;readRelays;writeRelays;updateRelays(t,n){this.readRelays=we(t),this.writeRelays=n?we(n):[...this.readRelays]}get allRelays(){return we([...this.readRelays,...this.writeRelays])}registerGroup(t,n,r,o,s){const i=dg(t);console.info("[canary:sync] registerGroup",t.slice(0,8),"→ tagHash",i.slice(0,12),"members:",o.length),this.groupKeys.set(t,{key:ig(n),signer:r,tagHash:i,members:new Set(o),admins:new Set(s?.admins??[]),onRecoveryRequest:s?.onRecoveryRequest,onRecoveryResponse:s?.onRecoveryResponse}),this.tagHashToGroupId.set(i,t)}unregisterGroup(t){const n=this.groupKeys.get(t);n&&this.tagHashToGroupId.delete(n.tagHash),this.groupKeys.delete(t),this.decryptFailures.delete(t),this.recoveryPending.delete(t)}async send(t,n,r){$t()||ui(this.readRelays,this.writeRelays);const o=pe();if(!o)return;const s=this.groupKeys.get(t);if(!s){console.warn("[canary:sync] No group key registered for",t);return}const i=pa(n),a={...n,protocolVersion:Ce},c=Zn(a),l=ge(Qn.encode(c)),d=Ge(Q.sign(l,F(this.personalPrivkey))),u=JSON.stringify({s:this.personalPubkey,sig:d,p:i}),f=await ag(s.key,u),h={kind:va,content:f,tags:[["d",s.tagHash]],created_at:Math.floor(Date.now()/1e3)};try{const p=await s.signer.sign(h);console.info("[canary:sync] Publishing",n.type,"to",t.slice(0,8),"→ d-tag:",s.tagHash.slice(0,12),"(write relays only)"),await o.publish(this.writeRelays,p),console.info("[canary:sync] Published OK")}catch(p){console.error("[canary:sync] Publish failed:",p)}}subscribe(t,n){const r=pe();if(!r)return()=>{};const o=this.groupKeys.get(t);if(!o)return console.warn("[canary:sync] No group key registered for",t),()=>{};this._ensureRecoverySub();const s={kinds:[va],"#d":[o.tagHash],since:Math.floor(Date.now()/1e3)-10080*60};console.info("[canary:sync] Subscribing to",t.slice(0,8),"→ filter:",JSON.stringify(s));const i=r.subscribeMany(this.allRelays,s,{onevent:async a=>{try{if(!a||typeof a!="object"||typeof a.pubkey!="string"||typeof a.content!="string")return;console.info("[canary:sync] Received event",a.id?.slice(0,12),"kind:",a.kind,"from pubkey:",a.pubkey?.slice(0,12));const c=this.groupKeys.get(t);if(!c||a.pubkey===c.signer.pubkey)return;if(!ga(a)){console.warn("[canary:sync] Rejected event with invalid signature");return}if(typeof a.id=="string"&&this.seenEventIds.has(a.id))return;let l;try{l=await cg(c.key,a.content)}catch{this._trackDecryptFailure(t);return}this.decryptFailures.delete(t);const d=JSON.parse(l);if(!d||typeof d!="object"){console.warn("[canary:sync] Rejected malformed envelope");return}const u=d.s,f=d.sig,h=d.p;if(typeof u!="string"||typeof f!="string"||typeof h!="string"){console.warn("[canary:sync] Rejected envelope with missing sender proof fields");return}if(!Xn.test(u)||!wa.test(f)){console.warn("[canary:sync] Rejected envelope with invalid sender proof encoding");return}const p=ma(h),m={...p,protocolVersion:Ce},y=Zn(m),E=ge(Qn.encode(y));if(!Q.verify(F(f),E,F(u))){console.warn("[canary:sync] Rejected envelope with invalid sender proof");return}if(p.type!=="member-join"&&!c.members.has(u)){console.warn("[canary:sync] Rejected message from non-member pubkey");return}if(p.type==="liveness-checkin"&&p.pubkey!==u){console.warn("[canary:sync] Rejected liveness-checkin with mismatched sender");return}console.info("[canary:sync] Dispatching",p.type,"from sender",u.slice(0,8)),n(p,u),typeof a.id=="string"&&this.seenEventIds.add(a.id)}catch(c){console.warn("[canary:sync] Failed to process event:",c)}}});return this.subs.set(t,i),()=>{i.close(),this.subs.delete(t)}}async requestRecovery(t,n,r){const o=pe();if(!o)return;const s=this.groupKeys.get(t);if(!s)return;this.recoveryPending.set(t,Date.now());const i=F(this.personalPrivkey);for(const a of s.admins)if(a!==this.personalPubkey)try{const c=JSON.stringify({groupTag:s.tagHash,epoch:n,counter:r}),l=Te(i,a),d=Xt(c,l),u={kind:Oo,content:d,tags:[["p",a]],created_at:Math.floor(Date.now()/1e3)},f=bt(u,i);await o.publish(this.writeRelays,f)}catch(c){console.warn("[canary:sync] Recovery request to",a.slice(0,8),"failed:",c)}}_ensureRecoverySub(){if(this.recoverySub)return;const t=pe();if(!t)return;const n={kinds:[Oo,Bo],"#p":[this.personalPubkey],since:Math.floor(Date.now()/1e3)-300};this.recoverySub=t.subscribeMany(this.allRelays,n,{onevent:async r=>{try{if(!r||typeof r!="object"||!ga(r))return;r.kind===Oo?await this._handleRecoveryRequest(r):r.kind===Bo&&await this._handleRecoveryResponse(r)}catch(o){console.warn("[canary:sync] Recovery event processing failed:",o)}}})}async _handleRecoveryRequest(t){const n=pe();if(!n)return;const r=t.pubkey;if(!Xn.test(r))return;const o=F(this.personalPrivkey),s=Te(o,r),i=Qt(t.content,s),a=JSON.parse(i),c=a.groupTag,l=a.epoch,d=a.counter;if(typeof c!="string"||typeof l!="number"||typeof d!="number")return;const u=this.tagHashToGroupId.get(c);if(!u)return;const f=this.groupKeys.get(u);if(!f)return;if(!f.members.has(r)){console.warn("[canary:sync] Recovery request from non-member",r.slice(0,8));return}if(!f.onRecoveryRequest)return;const h=f.onRecoveryRequest(r,l,d);if(!h)return;const p=pa(h),m={...h,protocolVersion:Ce},y=Zn(m),E=ge(Qn.encode(y)),S=Ge(Q.sign(E,o)),L=JSON.stringify({s:this.personalPubkey,sig:S,groupTag:c,p}),O=Te(o,r),P=Xt(L,O),$={kind:Bo,content:P,tags:[["p",r]],created_at:Math.floor(Date.now()/1e3)},v=bt($,o);await n.publish(this.writeRelays,v),console.info("[canary:sync] Sent recovery response to",r.slice(0,8))}async _handleRecoveryResponse(t){const n=t.pubkey;if(!Xn.test(n))return;const r=F(this.personalPrivkey),o=Te(r,n),s=Qt(t.content,o),i=JSON.parse(s),a=i.s,c=i.sig,l=i.groupTag,d=i.p;if(typeof a!="string"||typeof c!="string"||typeof l!="string"||typeof d!="string"||!Xn.test(a)||!wa.test(c)||a!==n)return;const u=this.tagHashToGroupId.get(l);if(!u)return;const f=this.groupKeys.get(u);if(!f)return;if(!f.admins.has(n)){console.warn("[canary:sync] Recovery response from non-admin",n.slice(0,8));return}const h=ma(d),p={...h,protocolVersion:Ce},m=Zn(p),y=ge(Qn.encode(m));if(!Q.verify(F(c),y,F(n))){console.warn("[canary:sync] Recovery response with invalid signature");return}if(h.type!=="state-snapshot"){console.warn("[canary:sync] Recovery response contains non-snapshot type:",h.type);return}if(!h.admins.includes(n)){console.warn("[canary:sync] Recovery response sender not in snapshot admins");return}this.decryptFailures.delete(u),this.recoveryPending.delete(u),f.onRecoveryResponse&&f.onRecoveryResponse(h,n),console.info("[canary:sync] Applied recovery response from",n.slice(0,8))}_trackDecryptFailure(t){const n=(this.decryptFailures.get(t)??0)+1;if(this.decryptFailures.set(t,n),n<nb)return;const r=this.recoveryPending.get(t);if(r!==void 0&&Date.now()-r<rb)return;this.recoveryPending.delete(t);const o=this.groupKeys.get(t);o&&o.admins.size>0&&o.onRecoveryResponse&&(console.warn(`[canary:sync] ${n} decrypt failures for group — requesting recovery`),this.requestRecovery(t,0,0).catch(s=>{console.warn("[canary:sync] Auto-recovery request failed:",s)}))}disconnect(){for(const[,t]of this.subs)t.close();this.subs.clear(),this.recoverySub&&(this.recoverySub.close(),this.recoverySub=null)}}function Y(e,t="info",n=4e3){const r=document.getElementById("toast-container")??sb(),o=document.createElement("div");o.className=`toast toast--${t}`,o.textContent=e,r.appendChild(o),requestAnimationFrame(()=>o.classList.add("toast--visible")),setTimeout(()=>{o.classList.remove("toast--visible"),setTimeout(()=>o.remove(),300)},n)}function sb(){const e=document.createElement("div");return e.id="toast-container",e.className="toast-container",document.body.appendChild(e),e}const ib=Object.freeze(Object.defineProperty({__proto__:null,showToast:Y},Symbol.toStringTag,{value:"Module"}));let _n=null;function ab(e=6e4){_n||(Ea(),_n=setInterval(Ea,e))}function vd(){_n&&(clearInterval(_n),_n=null)}function Ea(){const{groups:e,identity:t}=R();if(!t)return;const n=Math.floor(Date.now()/1e3);for(const[r,o]of Object.entries(e)){Se(r,{type:"liveness-checkin",pubkey:t.pubkey,timestamp:n,opId:crypto.randomUUID()});const s={...o.livenessCheckins,[t.pubkey]:n};W(r,{livenessCheckins:s})}}const cb=60;function wd(e,t,n){const r=R().groups[e];if(!r)return;const o=Math.floor(Date.now()/1e3);if(n>o+cb)return;const s=r.livenessCheckins[t]??0;if(n<=s)return;const i={...r.livenessCheckins,[t]:n};W(e,{livenessCheckins:i})}const lb=Object.freeze(Object.defineProperty({__proto__:null,recordCheckin:wd,startLivenessHeartbeat:ab,stopLivenessHeartbeat:vd},Symbol.toStringTag,{value:"Module"})),Ed="canary:duress-queue";function db(){try{const e=localStorage.getItem(Ed);return e?JSON.parse(e):[]}catch{return[]}}function ub(e){try{localStorage.setItem(Ed,JSON.stringify(e))}catch{}}function fb(e){const t=db(),n=t.filter(o=>o.groupId===e),r=t.filter(o=>o.groupId!==e);return ub(r),n.map(o=>o.message)}let ue=null;const Nr=new Map,hb=500,ss=new Map;function ka(e,t){const n=ss.get(e);return n?n.includes(t):!1}function _a(e,t){let n=ss.get(e);n||(n=[],ss.set(e,n)),n.length>=hb&&n.shift(),n.push(t)}function pb(e){ue=e}async function Le(e,t,n){const{identity:r}=R(),o=t??e;if(!(!r||!r.privkey||e.length===0&&o.length===0))try{if(ui(e,o),ue?ue instanceof Lr&&ue.updateRelays(e,o):pb(new Lr(e,o,r.pubkey,r.privkey)),n&&_d(n),n){const s=fb(n);for(const i of s)Se(n,i)}no().then(()=>An($t(),Lt()))}catch(s){console.warn("[canary:sync] ensureTransport failed:",s),An(!1,0)}}function Se(e,t){!ue||!R().groups[e]||ue.send(e,t).catch(r=>{console.warn("[canary:sync] broadcast failed:",r)})}function on(e){if(!(ue instanceof Lr))return;const{identity:t,groups:n}=R(),r=n[e];if(!t?.privkey||!r?.seed)return;ue.unregisterGroup(e);const o=new fd(r.seed,t.privkey);ue.registerGroup(e,r.seed,o,r.members,kd(e))}function kd(e){return{admins:R().groups[e]?.admins??[],onRecoveryRequest:(t,n,r)=>{const{groups:o}=R(),s=o[e];return!s||!s.members.includes(t)?null:{type:"state-snapshot",seed:s.seed,counter:s.counter,usageOffset:s.usageOffset,members:s.members,admins:s.admins,epoch:s.epoch,opId:`recovery-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,timestamp:Math.floor(Date.now()/1e3)}},onRecoveryResponse:(t,n)=>{const{groups:r}=R(),o=r[e];if(!o)return;const s=sd(o,t,void 0,n);s!==o&&(W(e,s),on(e),Y("Group state recovered from admin","success"))}}}function mb(e,t,n,r=Math.floor(Date.now()/1e3),o=yb){if(t.type==="liveness-checkin"){if(!n)return;const s=r-t.timestamp;s<=os&&s>=-60&&(ka(e,t.opId)||(_a(e,t.opId),wd(e,n,t.timestamp)));return}if(t.type==="beacon"||t.type==="duress-alert"){const s=r-t.timestamp;if(s>os||s<-60||ka(e,t.opId))return;_a(e,t.opId),o(e,t,n)}}function yb(e,t,n){document.dispatchEvent(new CustomEvent("canary:sync-message",{detail:{groupId:e,message:t,sender:n}}))}function _d(e){if(!ue)return;if(Nr.get(e)?.(),ue instanceof Lr){const{identity:n,groups:r}=R(),o=r[e];if(n?.privkey&&o?.seed){const s=new fd(o.seed,n.privkey);ue.registerGroup(e,o.seed,s,o.members,kd(e))}}const t=ue.subscribe(e,(n,r)=>{const{groups:o}=R(),s=o[e];if(!s)return;const i=sd(s,n,void 0,r);if(i!==s&&W(e,i),(n.type==="member-join"||n.type==="member-leave"||n.type==="reseed"||n.type==="state-snapshot")&&on(e),n.type==="member-join"&&i!==s){const a=n.pubkey?i.memberNames?.[n.pubkey]??r?.slice(0,8)??"Someone":"Someone";document.dispatchEvent(new CustomEvent("canary:member-joined",{detail:{groupId:e,pubkey:n.pubkey,name:a}}))}if(n.type==="member-join"&&i!==s){const a=n.pubkey?i.memberNames?.[n.pubkey]??r?.slice(0,8)??"Someone":"Someone";Y(`${a} joined the group`,"success")}else n.type==="reseed"?Y("Group secret was rotated","warning"):n.type==="state-snapshot"&&Y("Group state recovered","success");mb(e,n,r),_b(),setTimeout(()=>An($t(),Lt()),1500)});Nr.set(e,t)}function gb(){const{groups:e}=R();for(const t of Object.keys(e))_d(t)}function Rn(){vd();for(const e of Nr.values())e();Nr.clear(),ue?.disconnect(),ue=null}const fi=Object.freeze([{name:"Alice",bio:"Security researcher. Loves hiking.",nsec:"nsec1vuhg9nandn0kas2w9uuvztwyla2fp7enfzz0emt6ly4gs6p5q3mqc6c6w5",npub:"npub1x5zth0r5sx8q3jsjgjn4jmq9vhk6djq23mnyzttp0vucaymt5wrss9zqf7",pubkey:"3504bbbc74818e08ca1244a7596c0565eda6c80a8ee6412d617b398e936ba387"},{name:"Bob",bio:"Journalist covering human rights.",nsec:"nsec1hszs2j8elt78kq6ewresrxfallpc6qvf0p33usgy9ujdkgu0mcesd4qryw",npub:"npub1fhfrmrnjwzae87dg2je3k0m750q4y70qweqf2klwhwucy4myc87q25s78h",pubkey:"4dd23d8e7270bb93f9a854b31b3f7ea3c15279e07640955beebbb9825764c1fc"},{name:"Charlie",bio:"Aid worker, field ops lead.",nsec:"nsec1xtpf5zgr2cx63v0dcflud46luerqnjqeel8drmp80k0dp66nf88s08j72c",npub:"npub1mz50hua3k5htvhke075xk8eqjmhp0mr9ahhcdgzqsgw4kx0gvv6ql9cjr5",pubkey:"d8a8fbf3b1b52eb65ed97fa86b1f2096ee17ec65edef86a040821d5b19e86334"},{name:"Dana",bio:"Conference organiser, Bitcoin maxi.",nsec:"nsec1efpah2zcmt2huqwhxc2tjdwqze3q0e5h0u3xf4hj4fymwekzu3msmkncp8",npub:"npub18pn0dtd6gvkrzpldf3cy62h8w6cekzu83u8qfqzjzmvlllcvwp3sf00cc3",pubkey:"3866f6adba432c3107ed4c704d2ae776b19b0b878f0e04805216d9ffff0c7063"}]);var er=new TextDecoder("utf-8");new TextEncoder;var xd=5e3;function is(e){let{prefix:t,words:n}=Fe.decode(e,xd),r=new Uint8Array(Fe.fromWords(n));switch(t){case"nprofile":{let o=Po(r);if(!o[0]?.[0])throw new Error("missing TLV 0 for nprofile");if(o[0][0].length!==32)throw new Error("TLV 0 should be 32 bytes");return{type:"nprofile",data:{pubkey:j(o[0][0]),relays:o[1]?o[1].map(s=>er.decode(s)):[]}}}case"nevent":{let o=Po(r);if(!o[0]?.[0])throw new Error("missing TLV 0 for nevent");if(o[0][0].length!==32)throw new Error("TLV 0 should be 32 bytes");if(o[2]&&o[2][0].length!==32)throw new Error("TLV 2 should be 32 bytes");if(o[3]&&o[3][0].length!==4)throw new Error("TLV 3 should be 4 bytes");return{type:"nevent",data:{id:j(o[0][0]),relays:o[1]?o[1].map(s=>er.decode(s)):[],author:o[2]?.[0]?j(o[2][0]):void 0,kind:o[3]?.[0]?parseInt(j(o[3][0]),16):void 0}}}case"naddr":{let o=Po(r);if(!o[0]?.[0])throw new Error("missing TLV 0 for naddr");if(!o[2]?.[0])throw new Error("missing TLV 2 for naddr");if(o[2][0].length!==32)throw new Error("TLV 2 should be 32 bytes");if(!o[3]?.[0])throw new Error("missing TLV 3 for naddr");if(o[3][0].length!==4)throw new Error("TLV 3 should be 4 bytes");return{type:"naddr",data:{identifier:er.decode(o[0][0]),pubkey:j(o[2][0]),kind:parseInt(j(o[3][0]),16),relays:o[1]?o[1].map(s=>er.decode(s)):[]}}}case"nsec":return{type:t,data:r};case"npub":case"note":return{type:t,data:j(r)};default:throw new Error(`unknown prefix ${t}`)}}function Po(e){let t={},n=e;for(;n.length>0;){let r=n[0],o=n[1],s=n.slice(2,2+o);if(n=n.slice(2+o),s.length<o)throw new Error(`not enough data to read on TLV ${r}`);t[r]=t[r]||[],t[r].push(s)}return t}function bb(e){return wb("nsec",e)}function vb(e,t){let n=Fe.toWords(t);return Fe.encode(e,n,xd)}function wb(e,t){return vb(e,t)}function Sd(){return document.documentElement.getAttribute("data-theme")==="light"?"light":"dark"}function Eb(e){e==="light"?document.documentElement.setAttribute("data-theme","light"):document.documentElement.removeAttribute("data-theme")}function Id(e){const t=Sd();e.setAttribute("aria-label",t==="dark"?"Switch to light mode":"Switch to dark mode"),e.textContent="◐"}function kb(e){const t=Sd()==="dark"?"light":"dark";Eb(t),ee({settings:{...R().settings,theme:t}}),Id(e)}function hi(e){const t=R().view;e.innerHTML=`
    <button class="header__hamburger" id="hamburger" aria-label="Toggle menu">&#9776;</button>
    <div class="header__brand">CANARY</div>
    <nav class="header__nav" id="header-nav">
      <button class="header__nav-tab${t==="groups"?" header__nav-tab--active":""}" data-view="groups">Groups</button>
      <button class="header__nav-tab${t==="call-demo"?" header__nav-tab--active":""}" data-view="call-demo">Call Demo</button>
    </nav>
    <div class="header__actions">
      <button class="header__identity-btn" id="identity-btn" title="Identity">
        <img class="header__identity-avatar" id="identity-avatar" alt="" hidden>
        <span class="header__identity-dot" id="identity-dot"></span>
        <span class="header__identity-label" id="identity-label">...</span>
      </button>
      <span id="relay-status" hidden>
        <span class="relay-dot"></span>
        <span class="relay-label"></span>
      </span>
      <button class="theme-toggle" id="theme-toggle" aria-label="Switch to light mode">&#9680;</button>
      <button class="theme-toggle" id="reset-btn" aria-label="Reset demo" title="Clear all data and reset">&#8634;</button>
    </div>
  `;const n=e.querySelector("#theme-toggle");n&&(Id(n),n.addEventListener("click",()=>kb(n)));const r=e.querySelector("#reset-btn");r&&r.addEventListener("click",()=>{confirm("Clear all data and reset the demo?")&&(localStorage.clear(),window.location.reload())}),pi();const o=e.querySelector("#identity-btn");o?.addEventListener("click",()=>Sb(o)),$t()&&An(!0,Lt()),e.querySelector("#header-nav")?.addEventListener("click",i=>{const a=i.target.closest("[data-view]");if(!a)return;const c=a.dataset.view;if(c){if(c==="groups"&&window.innerWidth<=768){const l=document.getElementById("sidebar"),d=document.getElementById("sidebar-overlay");if(l&&d){const u=l.classList.contains("sidebar--open");l.classList.toggle("sidebar--open",!u),d.classList.toggle("sidebar-overlay--visible",!u)}}c!==R().view&&ee({view:c})}})}function An(e,t){const n=document.getElementById("relay-status");if(!n)return;const r=n.querySelector(".relay-dot"),o=n.querySelector(".relay-label");!e||t===0?(n.removeAttribute("hidden"),r?.setAttribute("class","relay-dot relay-dot--offline"),o&&(o.textContent="Offline"),n.title="Not connected to any relay"):(n.removeAttribute("hidden"),r?.setAttribute("class","relay-dot relay-dot--synced"),o&&(o.textContent=`Synced · ${t} relay${t===1?"":"s"}`),n.title=`Connected to ${t} relay${t===1?"":"s"}`)}function _b(){const e=document.getElementById("relay-status");if(!e)return;const t=e.querySelector(".relay-dot"),n=e.querySelector(".relay-label");e.removeAttribute("hidden"),t?.setAttribute("class","relay-dot relay-dot--syncing"),n&&(n.textContent="Syncing...")}function pi(){const e=document.getElementById("identity-dot"),t=document.getElementById("identity-label"),n=document.getElementById("identity-avatar");if(!e||!t)return;const{identity:r}=R();if(!r?.pubkey){t.textContent="No identity",e.className="header__identity-dot header__identity-dot--none",n&&(n.hidden=!0);return}const o=`${r.pubkey.slice(0,6)}…${r.pubkey.slice(-4)}`,s=r.displayName&&r.displayName!=="You"?r.displayName:o;t.textContent=s,n&&r.picture?(n.src=r.picture,n.hidden=!1,e.hidden=!0):(n&&(n.hidden=!0),e.hidden=!1,e.className=r.signerType==="nip07"?"header__identity-dot header__identity-dot--extension":"header__identity-dot header__identity-dot--local")}function xb(e){return Array.from(e,t=>t.toString(16).padStart(2,"0")).join("")}function Rd(e,t){return t?.pubkey===e.pubkey&&t.mnemonic?{...e,mnemonic:t.mnemonic}:e}function xa(e,t){try{const n=R().identity,r=is(e.trim());if(r.type!=="nsec")return alert('Not a valid nsec. Expected a bech32-encoded private key starting with "nsec1".'),!1;const o=r.data,s=xb(o),i=In(o),a=Rd({pubkey:i,privkey:s,signerType:"local",displayName:t??"You"},n);return Rn(),ee({identity:a,groups:{},activeGroupId:null}),pi(),document.dispatchEvent(new CustomEvent("canary:resync")),t&&t!=="You"&&ke(async()=>{const{publishKind0:c}=await Promise.resolve().then(()=>Mr);return{publishKind0:c}},void 0,import.meta.url).then(({publishKind0:c})=>c(t,s)),!0}catch{return alert("Invalid nsec format."),!1}}function Sb(e){document.getElementById("identity-popover")?.remove();const{identity:t}=R(),n=t?.pubkey??"",r=n?`${n.slice(0,8)}…${n.slice(-8)}`:"None",o=t?.signerType==="nip07"?"Extension (NIP-07)":"Local key",s=fi.map(c=>`
    <button class="btn btn--sm identity-popover__demo" data-nsec="${c.nsec}" data-name="${c.name}" type="button">
      <strong>${c.name}</strong> <span class="identity-popover__label">${c.bio}</span>
    </button>
  `).join(""),i=document.createElement("div");i.id="identity-popover",i.className="identity-popover",i.innerHTML=`
    <div class="identity-popover__row">
      <span class="identity-popover__label">Pubkey</span>
      <span class="identity-popover__value" title="${n}">${r}</span>
    </div>
    <div class="identity-popover__row">
      <span class="identity-popover__label">Signer</span>
      <span class="identity-popover__value">${o}</span>
    </div>

    ${t?.mnemonic||t?.privkey?`
      <div class="identity-popover__divider"></div>
      <div class="identity-popover__section">
        <span class="identity-popover__label">Recovery phrase</span>
        <p style="font-size: 0.6875rem; color: var(--text-muted); margin: 0.25rem 0;">Back this up — it's the only way to recover your account.</p>
        <div id="recovery-reveal-area" style="margin-top: 0.375rem;">
          <button class="btn btn--sm" id="recovery-reveal-btn" type="button" style="width: 100%;">Show recovery phrase</button>
        </div>
      </div>
    `:""}
    ${t?.privkey?`
      <div class="identity-popover__section" style="padding-top: 0;">
        <details style="font-size: 0.75rem;">
          <summary style="cursor: pointer; color: var(--text-muted);">Advanced: show nsec</summary>
          <div id="nsec-reveal-area" style="margin-top: 0.375rem;">
            <button class="btn btn--sm" id="nsec-reveal-btn" type="button" style="width: 100%;">Show nsec</button>
          </div>
        </details>
      </div>
    `:""}

    <div class="identity-popover__divider"></div>
    <button class="btn btn--sm" id="identity-logout-btn" type="button" style="width: 100%; color: var(--failed);">Logout</button>

    <details style="margin-top: 0.25rem;">
      <summary class="btn btn--sm" style="width: 100%; text-align: center; cursor: pointer; list-style: none;">Switch account</summary>

      <div style="margin-top: 0.5rem;">
        <div class="identity-popover__section">
          <span class="identity-popover__label">Login with nsec</span>
          <form id="nsec-login-form" autocomplete="off" style="display: flex; flex-direction: column; gap: 0.375rem; margin-top: 0.375rem;">
            <input class="input" type="password" id="nsec-input" placeholder="nsec1..." autocomplete="off" style="width: 100%; font-size: 0.8125rem; padding: 0.5rem;" />
            <button class="btn btn--sm btn--primary" type="submit" style="width: 100%;">Login</button>
          </form>
        </div>

        <button class="btn btn--sm" id="nip07-connect-btn" type="button" style="width: 100%;">Use Browser Extension (NIP-07)</button>

        <div class="identity-popover__divider"></div>

        <div class="identity-popover__section">
          <span class="identity-popover__label">Demo accounts</span>
          <div class="identity-popover__demos">
            ${s}
          </div>
        </div>
      </div>
    </details>
  `,e.parentElement?.appendChild(i),i.querySelector("#identity-logout-btn")?.addEventListener("click",()=>{Rn(),ee({identity:null,groups:{},activeGroupId:null}),i.remove(),window.location.reload()}),i.querySelector("#recovery-reveal-btn")?.addEventListener("click",()=>{const c=i.querySelector("#recovery-reveal-area");if(!c)return;const l=R().identity?.mnemonic;if(!l){c.textContent="";const h=document.createElement("p");h.style.cssText="font-size:0.75rem;color:var(--text-muted);",h.textContent="No recovery phrase stored (key was imported via nsec).",c.appendChild(h);return}const d=l.split(" ");c.textContent="";const u=document.createElement("div");u.style.cssText="display:grid;grid-template-columns:repeat(3,1fr);gap:0.375rem;margin:0.375rem 0;",d.forEach((h,p)=>{const m=document.createElement("div");m.style.cssText="border:1px solid var(--border);border-radius:3px;padding:0.25rem;text-align:center;font-family:var(--font-mono,monospace);font-size:0.7rem;";const y=document.createElement("span");y.style.color="var(--text-muted)",y.textContent=`${p+1}. `;const E=document.createElement("span");E.textContent=h,m.append(y,E),u.appendChild(m)}),c.appendChild(u);const f=document.createElement("button");f.className="btn btn--sm",f.type="button",f.style.cssText="width:100%;margin-top:0.375rem;",f.textContent="Copy words",f.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(l),f.textContent="Copied!",setTimeout(()=>{f.textContent="Copy words"},2e3)}catch{}}),c.appendChild(f)}),i.querySelector("#nsec-reveal-btn")?.addEventListener("click",()=>{const c=i.querySelector("#nsec-reveal-area");if(!c||!t?.privkey)return;const l=bb(F(t.privkey));c.innerHTML=`
      <code style="font-size: 0.65rem; word-break: break-all; display: block; background: var(--bg); padding: 0.5rem; border-radius: 4px; border: 1px solid var(--border); user-select: all;">${l}</code>
      <button class="btn btn--sm" id="nsec-copy-btn" type="button" style="width: 100%; margin-top: 0.375rem;">Copy nsec</button>
    `,c.querySelector("#nsec-copy-btn")?.addEventListener("click",async d=>{const u=d.currentTarget;try{await navigator.clipboard.writeText(l),u.textContent="Copied!",setTimeout(()=>{u.textContent="Copy nsec"},2e3)}catch{}})}),i.querySelector("#nsec-login-form")?.addEventListener("submit",c=>{c.preventDefault();const l=i.querySelector("#nsec-input");l?.value.trim()&&xa(l.value)&&i.remove()}),i.querySelectorAll(".identity-popover__demo").forEach(c=>{c.addEventListener("click",()=>{const l=c.dataset.nsec,d=c.dataset.name;xa(l,d)&&i.remove()})}),i.querySelector("#nip07-connect-btn")?.addEventListener("click",async()=>{if(!hd()){alert("No Nostr extension found. Install Alby, nos2x, or another NIP-07 extension and reload.");return}try{Rn();const c=await window.nostr.getPublicKey(),l=Rd({pubkey:c,signerType:"nip07",displayName:t?.displayName??"You"},t);ee({identity:l,groups:{},activeGroupId:null}),pi(),document.dispatchEvent(new CustomEvent("canary:resync")),i.remove()}catch{alert("Extension rejected the request.")}});const a=c=>{!i.contains(c.target)&&c.target!==e&&(i.remove(),document.removeEventListener("click",a))};requestAnimationFrame(()=>document.addEventListener("click",a))}function q(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Sa(e){const t=Math.floor(e/86400);if(t>=1)return`${t}d`;const n=Math.floor(e/3600);return n>=1?`${n}h`:`${Math.floor(e/60)}m`}function Ib(e){if(!e)return"";const t=e.displayName??`${e.pubkey.slice(0,8)}…`;return`
    <div class="identity-badge">
      <span class="identity-badge__name">${q(t)}</span>
    </div>
  `}function Rb(e,t){const n=Object.values(e);return n.length===0?'<div class="group-list__empty">No groups yet</div>':n.map(r=>{const o=r.id===t,s=o?" group-list__item--active":"",i=Sa(r.livenessInterval),a=Sa(r.livenessInterval);return`
        <button
          class="group-list__item${s}"
          data-group-id="${q(r.id)}"
          aria-current="${o?"true":"false"}"
        >
          <span class="group-list__name">${q(r.name)}</span>
          <span class="group-list__preset">${q(i)} · ${q(a)}</span>
        </button>
      `}).join("")}function Ab(e){const{identity:t,groups:n,activeGroupId:r}=R();e.innerHTML=`
    <div class="sidebar__tagline">spoken-word verification</div>
    ${Ib(t)}
    <nav class="group-list" aria-label="Groups">
      ${Rb(n,r)}
    </nav>
    <button class="btn btn--primary" id="create-group-btn">+ New Group</button>
  `,e.querySelector(".group-list")?.addEventListener("click",i=>{const a=i.target.closest("[data-group-id]");if(!a)return;const c=a.dataset.groupId;c&&ee({activeGroupId:c})}),e.querySelector("#create-group-btn")?.addEventListener("click",()=>{e.dispatchEvent(new CustomEvent("canary:create-group",{bubbles:!0}))})}const as="app-modal";function mi(e,t){let n=document.getElementById(as);if(n||(n=document.createElement("dialog"),n.id=as,n.className="modal",document.body.appendChild(n)),n.innerHTML=`
    <form class="modal__form" method="dialog" id="modal-form">
      ${e}
    </form>
  `,t){const r=n.querySelector("#modal-form");r?.addEventListener("submit",o=>{o.preventDefault();const s=new FormData(r);t(s),Ia()})}n.addEventListener("click",r=>{r.target===n&&Ia()}),n.showModal()}function Ia(){document.getElementById(as)?.close()}const Cb=new TextEncoder().encode("canary:beacon:key");function yi(e){return mt(F(e),Cb)}async function Ad(e,t){const n=crypto.getRandomValues(new Uint8Array(12)),r=await crypto.subtle.importKey("raw",e,{name:"AES-GCM"},!1,["encrypt"]),o=new Uint8Array(await crypto.subtle.encrypt({name:"AES-GCM",iv:n},r,t)),s=new Uint8Array(12+o.length);return s.set(n),s.set(o,12),td(s)}async function Cd(e,t,n){const r={geohash:t,precision:n,timestamp:Math.floor(Date.now()/1e3)};return Ad(e,new TextEncoder().encode(JSON.stringify(r)))}function Tb(e,t){return{type:"duress",member:e,geohash:"",precision:0,locationSource:"none",timestamp:Math.floor(Date.now()/1e3)}}async function Lb(e,t){return Ad(e,new TextEncoder().encode(JSON.stringify(t)))}function Td(){const{identity:e}=R();if(!e?.pubkey)throw new Error("No local identity — cannot perform privileged action.");return e.pubkey}function ro(e){const t=Td();if(!e.admins.includes(t))throw new Error(`Not authorised — you are not an admin of "${e.name}".`)}function Nb(e){const t=new Uint8Array(e.length/2);for(let n=0;n<e.length;n+=2)t[n/2]=parseInt(e.slice(n,n+2),16);return t}function $b(e,t,n){const r=crypto.randomUUID(),s=wg({name:e,members:n?[n]:[],preset:t,creator:n}),i=R().settings,a=[...i.defaultReadRelays??i.defaultRelays],c=[...i.defaultWriteRelays??i.defaultRelays],l={family:"words","field-ops":"words",enterprise:"words",event:"pin"},d={...s,id:r,nostrEnabled:c.length>0||a.length>0,relays:c,readRelays:a,writeRelays:c,encodingFormat:l[t]??"words",usedInvites:[],latestInviteIssuedAt:0,livenessInterval:s.rotationInterval,livenessCheckins:{},tolerance:1,memberNames:{},duressMode:"immediate"},{groups:u}=R();return ee({groups:{...u,[r]:d},activeGroupId:r}),n&&Se(r,{type:"member-join",pubkey:n,timestamp:Math.floor(Date.now()/1e3),epoch:0,opId:crypto.randomUUID()}),r}function Mb(e){const{groups:t,activeGroupId:n}=R(),r={...t};delete r[e],ee({groups:r,activeGroupId:n===e?null:n})}function Ob(e){const{groups:t}=R(),n=t[e];if(!n){console.warn(`[canary:actions] reseedGroup: unknown group id "${e}"`);return}ro(n);const r=di(n),o=(n.epoch??0)+1,s=crypto.randomUUID(),i=[...n.admins??[]];Se(e,{type:"reseed",seed:Nb(r.seed),counter:r.counter,timestamp:Math.floor(Date.now()/1e3),epoch:o,opId:s,admins:i,members:[...n.members]}),W(e,{...r,epoch:o,consumedOps:[s],admins:i}),on(e)}function Bb(e){const{groups:t}=R(),n=t[e];if(!n){console.warn(`[canary:actions] compromiseReseed: unknown group id "${e}"`);return}ro(n);const r=di(n),o=(n.epoch??0)+1;W(e,{...r,epoch:o,consumedOps:[],admins:[...n.admins??[]]}),on(e)}function cs(e,t,n){const{groups:r}=R(),o=r[e];if(!o){console.warn(`[canary:actions] addGroupMember: unknown group id "${e}"`);return}ro(o);const s=crypto.randomUUID(),i=rd(o,t);W(e,{...i,consumedOps:[...o.consumedOps??[],s]}),on(e),Se(e,{type:"member-join",pubkey:t,displayName:n||void 0,timestamp:Math.floor(Date.now()/1e3),epoch:o.epoch??0,opId:s})}function Pb(e,t){const{groups:n}=R(),r=n[e];if(!r){console.warn(`[canary:actions] removeGroupMember: unknown group id "${e}"`);return}const o=Td();if(t!==o&&ro(r),!r.members.includes(t))return;const s=od(r,t),i=di(s),a=(r.epoch??0)+1,c={...r.memberNames??{}};delete c[t];const l={...r.livenessCheckins??{}};delete l[t];const d=(r.admins??[]).filter(u=>u!==t);W(e,{...i,memberNames:c,livenessCheckins:l,admins:d,epoch:a,consumedOps:[]}),on(e)}function Ub(e){const{groups:t}=R(),n=t[e];if(!n){console.warn(`[canary:actions] burnWord: unknown group id "${e}"`);return}const r=Eg(n);W(e,r),Se(e,{type:"counter-advance",counter:r.counter,usageOffset:r.usageOffset,timestamp:Math.floor(Date.now()/1e3)})}const Uo=/^[0-9a-f]{64}$/;function Db(e){if(!e||typeof e!="object")throw new Error("Import failed — expected a JSON object.");const t=e;if(typeof t.name!="string"||t.name.trim().length===0)throw new Error("Import failed — name is required.");if(typeof t.seed!="string"||!Uo.test(t.seed))throw new Error("Import failed — seed must be a 64-character lowercase hex string.");if(!Array.isArray(t.members)||t.members.length===0)throw new Error("Import failed — members must be a non-empty array.");for(const n of t.members)if(typeof n!="string"||!Uo.test(n))throw new Error(`Import failed — invalid member pubkey: "${String(n)}".`);if(Array.isArray(t.admins)){for(const r of t.admins)if(typeof r!="string"||!Uo.test(r))throw new Error(`Import failed — invalid admin pubkey: "${String(r)}".`);const n=new Set(t.members);for(const r of t.admins)if(!n.has(r))throw new Error(`Import failed — admin "${r}" is not in the members list.`)}if(t.rotationInterval!==void 0&&(typeof t.rotationInterval!="number"||!Number.isInteger(t.rotationInterval)||t.rotationInterval<=0))throw new Error("Import failed — rotationInterval must be a positive integer.");if(t.wordCount!==void 0&&t.wordCount!==1&&t.wordCount!==2&&t.wordCount!==3)throw new Error("Import failed — wordCount must be 1, 2, or 3.");if(t.encodingFormat!==void 0&&t.encodingFormat!=="words"&&t.encodingFormat!=="pin"&&t.encodingFormat!=="hex")throw new Error("Import failed — encodingFormat must be words, pin, or hex.");if(t.epoch!==void 0&&(typeof t.epoch!="number"||!Number.isInteger(t.epoch)||t.epoch<0))throw new Error("Import failed — epoch must be a non-negative integer.");if(t.consumedOps!==void 0&&(!Array.isArray(t.consumedOps)||!t.consumedOps.every(n=>typeof n=="string")))throw new Error("Import failed — consumedOps must be an array of strings.")}function qb(e){const{groups:t}=R();if(Object.keys(t).length>0){e.hidden=!0;return}e.hidden=!1,e.innerHTML=`
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
  `,document.getElementById("welcome-create").addEventListener("click",()=>{document.dispatchEvent(new CustomEvent("canary:create-group"))}),document.getElementById("welcome-join").addEventListener("click",()=>{document.dispatchEvent(new CustomEvent("canary:join-group"))})}const oo="canary:group";function Cn(e){switch(e.encodingFormat){case"pin":return{format:"pin",digits:6};case"hex":return{format:"hex",length:8};default:return{format:"words",count:e.wordCount}}}function Ra(e,t){return t==="pin"&&e.length===6?`${e.slice(0,3)}-${e.slice(3)}`:t==="hex"&&e.length===8?`${e.slice(0,4)}-${e.slice(4)}`:e}function jb(e,t){const{identity:n}=R();if(n?.pubkey===e)return"You";const r=t.memberNames?.[e];return r||e.slice(0,8)+"…"}let lr=null;function Do(){lr!==null&&(clearInterval(lr),lr=null)}function Hb(e=new Date){return e.toISOString().slice(11,19)+" UTC"}function Fb(e){return e.replace(/[a-zA-Z0-9]/g,"•")}function Aa(e){if(e<=0)return"0s";const t=Math.floor(e/86400),n=Math.floor(e%86400/3600),r=Math.floor(e%3600/60),o=Math.floor(e%60);return t>=1?n>0?`${t}d ${n}h`:`${t}d`:n>=1?r>0?`${n}h ${r}m`:`${n}h`:r>=1?o>0?`${r}m ${o}s`:`${r}m`:`${o}s`}function Ca(e){const t=Math.floor(Date.now()/1e3),r=(rn(t,e.rotationInterval)+1)*e.rotationInterval;return Math.max(0,r-t)}const Gb=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],Kb=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function Ta(e,t){if(t>=86400){const n=new Date(Date.now()+e*1e3),r=Gb[n.getUTCDay()],o=n.getUTCDate(),s=Kb[n.getUTCMonth()],i=String(n.getUTCHours()).padStart(2,"0"),a=String(n.getUTCMinutes()).padStart(2,"0");return`rotates ${r} ${o} ${s} at ${i}:${a} UTC (${Aa(e)})`}return`rotates in ${Aa(e)} · ${Hb()}`}function Vb(e){const t=e.counter+e.usageOffset;return Ke(e.seed,oo,t,Cn(e))}function zb(e){const{identity:t}=R();if(!t?.pubkey)return null;const n=e.counter+e.usageOffset;return li(e.seed,oo,t.pubkey,n,Cn(e),e.tolerance)}function Ld(e){Do();const{groups:t,activeGroupId:n}=R();if(!n){e.innerHTML="";return}const r=t[n];if(!r){e.innerHTML="";return}const o=kg(r);if(o!==r){W(n,o);return}const s=Vb(r),i=Ra(s,r.encodingFormat),a=zb(r),c=a?Ra(a,r.encodingFormat):null,l=Fb(i),d=Ca(r),u=Math.min(100,Math.max(0,(r.rotationInterval-d)/r.rotationInterval*100));e.innerHTML=`
    <section class="hero">

      <div class="hero__word-container">
        <div class="hero__word hero__word--masked" id="hero-word">${l}</div>
        <button
          class="hero__reveal-btn btn"
          id="hero-reveal-btn"
          type="button"
          aria-label="Hold to reveal verification word"
        >Hold to Reveal</button>
      </div>

      <div class="hero__countdown">
        <div class="hero__progress">
          <div class="hero__progress-bar" id="hero-progress-bar" style="width: ${u}%"></div>
        </div>
        <span class="hero__countdown-label" id="hero-countdown-label">${Ta(d,r.rotationInterval)}</span>
      </div>

      <p class="hero__hint">Press and hold to reveal. Tap the right side for your alternate word.</p>

      <button class="btn btn--ghost" id="burn-btn" type="button">I used this word</button>
      <button class="btn btn--outline" id="hero-invite-btn" type="button">Invite Someone</button>
      ${r.members.length>=2?'<button class="btn btn--outline" id="hero-call-btn" type="button" title="Start a phone call verification">Verify Call</button>':""}

    </section>
  `;const f=e.querySelector("#hero-word"),h=e.querySelector("#hero-reveal-btn");function p(P){f&&(f.textContent=P&&c?c:i,f.classList.remove("hero__word--masked"),f.classList.add("hero__word--revealed"))}function m(){f&&(f.textContent=l,f.classList.remove("hero__word--revealed"),f.classList.add("hero__word--masked"))}h&&(h.addEventListener("pointerdown",P=>{P.preventDefault();const $=h.getBoundingClientRect(),b=P.clientX-$.left>$.width/2;p(b)}),h.addEventListener("pointerup",m),h.addEventListener("pointerleave",m),h.addEventListener("pointercancel",m)),e.querySelector("#burn-btn")?.addEventListener("click",()=>{Ub(n)}),e.querySelector("#hero-invite-btn")?.addEventListener("click",()=>{document.dispatchEvent(new CustomEvent("canary:show-invite",{detail:{groupId:n}}))}),e.querySelector("#hero-call-btn")?.addEventListener("click",()=>{const{identity:P}=R(),$=r.members.filter(g=>g!==P?.pubkey);if($.length===0)return;if($.length===1){document.dispatchEvent(new CustomEvent("canary:verify-call",{detail:{groupId:n,pubkey:$[0]}}));return}const v=$.map(g=>`
      <button class="btn btn--outline member-pick-btn" data-pubkey="${q(g)}" type="button" style="width:100%;text-align:left;margin-bottom:0.5rem;">
        ${q(jb(g,r))}
      </button>
    `).join("");let b=document.getElementById("member-picker");b||(b=document.createElement("dialog"),b.id="member-picker",b.className="modal",document.body.appendChild(b)),b.innerHTML=`
      <div class="modal__form" style="min-width:240px;">
        <h2 class="modal__title">Who are you calling?</h2>
        ${v}
        <div class="modal__actions">
          <button class="btn" id="picker-cancel" type="button">Cancel</button>
        </div>
      </div>
    `,b.querySelector("#picker-cancel")?.addEventListener("click",()=>b.close()),b.addEventListener("click",g=>{g.target===b&&b.close()}),b.querySelectorAll(".member-pick-btn").forEach(g=>{g.addEventListener("click",()=>{const k=g.dataset.pubkey;b.close(),k&&document.dispatchEvent(new CustomEvent("canary:verify-call",{detail:{groupId:n,pubkey:k}}))})}),b.showModal()});const L=e.querySelector("#hero-progress-bar"),O=e.querySelector("#hero-countdown-label");lr=setInterval(()=>{const{groups:P}=R(),$=P[n];if(!$){Do();return}const v=Ca($),b=Math.min(100,Math.max(0,($.rotationInterval-v)/$.rotationInterval*100));L&&(L.style.width=`${b}%`),O&&(O.textContent=Ta(v,$.rotationInterval)),v===0&&(Do(),Ld(e))},1e3)}const La={valid:"✓",invalid:"✗"};function Na(e){const{groups:t,activeGroupId:n,identity:r}=R();if(r?.pubkey===e)return"You";if(!n)return e.slice(0,8)+"…";const o=t[n];if(!o)return e.slice(0,8)+"…";const s=o.memberNames?.[e];return s||e.slice(0,8)+"…"}function Wb(e){const{groups:t,activeGroupId:n}=R();if(!n){e.innerHTML="";return}const r=t[n];if(!r){e.innerHTML="";return}const o=r.encodingFormat==="pin"?"Enter PIN":r.encodingFormat==="hex"?"Enter hex":"Enter word",{identity:s}=R(),i=r.members.filter(p=>p!==s?.pubkey),a=i.map(p=>`<option value="${p}">${Na(p).replace(/</g,"&lt;")}</option>`).join(""),c=i.length>0;e.innerHTML=`
    <section class="panel verify-panel">
      <h2 class="panel__title">Verify Someone</h2>
      <p class="settings-hint">Someone told you a word? ${c?"Pick who you're talking to and type":"Type"} it here.</p>

      <div class="verify-form">
        ${c?`<select class="input" id="verify-member" style="margin-bottom: 0.5rem;">
          ${i.length>1?'<option value="">Who are you verifying?</option>':""}
          ${a}
        </select>`:""}
        <input
          class="input"
          id="verify-input"
          type="text"
          placeholder="${o}"
          autocomplete="off"
          spellcheck="false"
        />
        <button class="btn btn--primary" id="verify-btn" type="button">Verify</button>
      </div>

      <div id="verify-result" class="verify-result" hidden></div>
    </section>
  `;const l=e.querySelector("#verify-input"),d=e.querySelector("#verify-member"),u=e.querySelector("#verify-btn"),f=e.querySelector("#verify-result");if(!l||!u||!f)return;function h(){const{groups:p,activeGroupId:m}=R();if(!m)return;const y=p[m];if(!y)return;const E=d?.value;if(d&&!E){f.className="verify-result verify-result--invalid",f.innerHTML=`<span class="verify-icon">${La.invalid}</span><span class="verify-message">Pick who you're verifying first.</span>`,f.hidden=!1;return}const S=l.value.trim().toLowerCase().replace(/-/g,"");if(!S)return;const L=Math.floor(Date.now()/1e3),O=rn(L,y.rotationInterval)+y.usageOffset,P=Cn(y),$=nd(y.seed,oo,O,S,y.members,{encoding:P,tolerance:y.tolerance}),v=$.status==="duress"?"invalid":$.status==="valid"?"valid":"invalid";f.className="verify-result",f.classList.add(`verify-result--${v}`);const b=E?Na(E):"Speaker",g=La[v];let k;v==="valid"?k=`${b} is verified — word is correct.`:k=`${b} gave the wrong word — they may not have the current group key.`,f.innerHTML=`<span class="verify-icon">${g}</span><span class="verify-message"></span>`;const _=f.querySelector(".verify-message");if(_&&(_.textContent=k),f.hidden=!1,$.status==="duress"){document.dispatchEvent(new CustomEvent("canary:duress",{detail:{members:$.identities??[]},bubbles:!0}));const A=$.identities??[],w=yi(y.seed);for(const I of A){const x=Tb(I);Lb(w,x).then(T=>{console.info("[canary] Duress alert encrypted:",T.slice(0,32)+"…")}),Se(m,{type:"duress-alert",lat:0,lon:0,timestamp:Math.floor(Date.now()/1e3),opId:crypto.randomUUID(),subject:I})}}}u.addEventListener("click",h),l.addEventListener("keydown",p=>{p.key==="Enter"&&h()})}function Nd(e){const t=JSON.stringify(e),n=new TextEncoder().encode(t);let r="";for(let o=0;o<n.length;o++)r+=String.fromCharCode(n[o]);return btoa(r)}function so(e){const t=atob(e),n=new Uint8Array(t.length);for(let r=0;r<t.length;r++)n[r]=t.charCodeAt(r);return JSON.parse(new TextDecoder().decode(n))}function Jb(e){return Nd(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}function $d(e){let t=e.replace(/-/g,"+").replace(/_/g,"/");const n=t.length%4;return n===2?t+="==":n===3&&(t+="="),so(t)}function Yb(e){let t="";for(let n=0;n<e.length;n++)t+=String.fromCharCode(e[n]);return btoa(t).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}function Zb(e){let t=e.replace(/-/g,"+").replace(/_/g,"/");const n=t.length%4;n===2?t+="==":n===3&&(t+="=");const r=atob(t),o=new Uint8Array(r.length);for(let s=0;s<r.length;s++)o[s]=r.charCodeAt(s);return o}const Md=/^[0-9a-f]{64}$/,Xb=/^[0-9a-f]{128}$/,Od=/^[0-9a-f]{32}$/;function Bd(e){const{adminSig:t,...n}=e,r=Object.keys(n).sort().reduce((o,s)=>(o[s]=n[s],o),{});return new TextEncoder().encode(JSON.stringify(r))}function Qb(e){const{groupName:t,groupId:n,adminPubkey:r,adminPrivkey:o,relays:s,expiresInSec:i=86400}=e,a=new Uint8Array(16);crypto.getRandomValues(a);const c=Ge(a),l={groupName:t,groupId:n,adminPubkey:r,inviteId:c,expiresAt:Math.floor(Date.now()/1e3)+i,relays:[...s],adminSig:""},d=ge(Bd(l));return l.adminSig=Ge(Q.sign(d,F(o))),l}function Pd(e){if(e==null||typeof e!="object")throw new Error("Remote invite token must be a non-null object");const t=e;if(typeof t.groupName!="string"||t.groupName.length===0)throw new Error("groupName must be a non-empty string");if(typeof t.groupId!="string"||t.groupId.length===0)throw new Error("groupId must be a non-empty string");if(typeof t.adminPubkey!="string"||!Md.test(t.adminPubkey))throw new Error("adminPubkey must be a 64-character hex string");if(typeof t.inviteId!="string"||!Od.test(t.inviteId))throw new Error("inviteId must be a 32-character hex string");if(typeof t.adminSig!="string"||!Xb.test(t.adminSig))throw new Error("adminSig must be a 128-character hex string");if(!Array.isArray(t.relays)||!t.relays.every(i=>typeof i=="string"))throw new Error("relays must be an array of strings");if(typeof t.expiresAt!="number"||!Number.isFinite(t.expiresAt))throw new Error("expiresAt must be a finite number");const n=Math.floor(Date.now()/1e3);if(t.expiresAt<=n)throw new Error("Remote invite token has expired");const r=e,o=ge(Bd(r));if(!Q.verify(F(r.adminSig),o,F(r.adminPubkey)))throw new Error("Remote invite token signature is invalid")}function ev(e){const{welcome:t,adminPrivkey:n,joinerPubkey:r}=e,o=JSON.stringify(t),s=Te(F(n),r);return Xt(o,s)}function tv(e){const{envelope:t,joinerPrivkey:n,adminPubkey:r,expectedInviteId:o}=e,s=Te(F(n),r),i=Qt(t,s),a=JSON.parse(i);if(typeof a.inviteId!="string"||!Od.test(a.inviteId))throw new Error("Welcome payload must include a valid inviteId");if(a.inviteId!==o)throw new Error("Welcome payload inviteId does not match the pending invite");if(typeof a.seed!="string"||!Md.test(a.seed))throw new Error("Welcome payload seed must be a 64-character hex string");if(typeof a.groupId!="string"||a.groupId.length===0)throw new Error("Welcome payload must include a non-empty groupId");return a}function nv(e){if(e.startsWith("wss://"))return!0;if(e.startsWith("ws://"))try{const t=new URL(e);return t.hostname==="localhost"||t.hostname==="127.0.0.1"||t.hostname==="[::1]"}catch{return!1}return!1}const yn=/^[0-9a-f]{64}$/,Ud=/^[0-9a-f]{128}$/,rv=/^[0-9a-f]{32}$/,ov=10080*60,Dd=300;function Ut(e){return typeof e=="number"&&Number.isInteger(e)&&e>=0}function sv(){const e=new Uint8Array(16);return crypto.getRandomValues(e),Array.from(e).map(t=>t.toString(16).padStart(2,"0")).join("")}function iv(e){const t=e;if(!t||typeof t!="object")throw new Error("Invalid invite payload — expected an object.");if(typeof t.groupId!="string"||t.groupId.length===0)throw new Error("Invalid invite payload — groupId is required.");if(typeof t.seed!="string"||!yn.test(t.seed))throw new Error("Invalid invite payload — seed must be 64-char hex.");if(typeof t.groupName!="string"||t.groupName.trim().length===0)throw new Error("Invalid invite payload — groupName is required.");if(!Number.isInteger(t.rotationInterval)||t.rotationInterval<=0)throw new Error("Invalid invite payload — rotationInterval must be > 0.");if(t.wordCount!==1&&t.wordCount!==2&&t.wordCount!==3)throw new Error("Invalid invite payload — wordCount must be 1, 2, or 3.");if(typeof t.wordlist!="string"||t.wordlist.length===0)throw new Error("Invalid invite payload — wordlist is required.");if(!Ut(t.counter)||!Ut(t.usageOffset))throw new Error("Invalid invite payload — counter and usageOffset must be non-negative integers.");if(typeof t.nonce!="string"||!rv.test(t.nonce))throw new Error("Invalid invite payload — nonce must be 32-char hex.");if(!Number.isInteger(t.beaconInterval)||t.beaconInterval<=0)throw new Error("Invalid invite payload — beaconInterval must be > 0.");if(!Number.isInteger(t.beaconPrecision)||t.beaconPrecision<1||t.beaconPrecision>11)throw new Error("Invalid invite payload — beaconPrecision must be 1..11.");if(!Array.isArray(t.members)||!t.members.every(r=>typeof r=="string"&&yn.test(r)))throw new Error("Invalid invite payload — members must be 64-char hex pubkeys.");if(!Array.isArray(t.relays)||!t.relays.every(r=>typeof r=="string"&&nv(r)))throw new Error("Invalid invite payload — relays must be wss:// URLs (or ws:// for localhost).");if(t.encodingFormat!=="words"&&t.encodingFormat!=="pin"&&t.encodingFormat!=="hex")throw new Error("Invalid invite payload — encodingFormat must be words|pin|hex.");if(!Ut(t.tolerance))throw new Error("Invalid invite payload — tolerance must be a non-negative integer.");if(t.tolerance>10)throw new Error("Invalid invite payload — tolerance must be <= 10.");if(!Ut(t.issuedAt)||!Ut(t.expiresAt))throw new Error("Invalid invite payload — issuedAt/expiresAt must be unix seconds.");if(t.expiresAt<=t.issuedAt)throw new Error("Invalid invite payload — expiresAt must be after issuedAt.");if(!Ut(t.epoch))throw new Error("Invalid invite payload — epoch must be a non-negative integer.");if(!Array.isArray(t.admins)||!t.admins.every(r=>typeof r=="string"&&yn.test(r)))throw new Error("Invalid invite payload — admins must be 64-char hex pubkeys.");const n=new Set(t.members);if(!t.admins.every(r=>n.has(r)))throw new Error("Invalid invite payload — all admins must be in members.");if(t.protocolVersion===void 0||t.protocolVersion===null)throw new Error("Invalid invite payload — protocolVersion is required.");if(t.protocolVersion!==Ce)throw new Error(`Unsupported invite protocol version: ${t.protocolVersion} (expected: ${Ce})`);if(typeof t.inviterPubkey!="string"||!yn.test(t.inviterPubkey))throw new Error("Invalid invite payload — inviterPubkey must be a 64-char hex pubkey.");if(!t.admins.includes(t.inviterPubkey))throw new Error("Invalid invite payload — inviterPubkey must be in admins.");if(typeof t.inviterSig!="string"||!Ud.test(t.inviterSig))throw new Error("Invalid invite payload — inviterSig must be a 128-char hex Schnorr signature.")}function qd(e){const{inviterSig:t,memberNames:n,relays:r,...o}=e,s=Object.keys(o).sort().reduce((i,a)=>(i[a]=o[a],i),{});return new TextEncoder().encode(JSON.stringify(s))}function av(e,t){const n=qd(e),r=ge(n);return Ge(Q.sign(r,F(t)))}function cv(e){const t=qd(e),n=ge(t);return Q.verify(F(e.inviterSig),n,F(e.inviterPubkey))}function jd(e){const{nonce:t,relays:n,memberNames:r,...o}=e,s=JSON.stringify(o),i=new TextEncoder,a=mt(F(t),i.encode(s)),c=a[0]<<25|a[1]<<17|a[2]<<9|a[3]<<1|a[4]>>7,l=c>>>22&2047,d=c>>>11&2047,u=c&2047;return`${Co(l)} ${Co(d)} ${Co(u)}`}function lv(e){const{identity:t}=R();if(!t?.pubkey||!t?.privkey)throw new Error("No local identity — cannot create invite.");if(!e.admins.includes(t.pubkey))throw new Error(`Not authorised — you are not an admin of "${e.name}".`);const n=sv(),r=Math.floor(Date.now()/1e3),o={groupId:e.id,seed:e.seed,groupName:e.name,rotationInterval:e.rotationInterval,wordCount:e.wordCount,wordlist:e.wordlist,counter:e.counter,usageOffset:e.usageOffset,nonce:n,beaconInterval:e.beaconInterval,beaconPrecision:e.beaconPrecision,members:[...e.members],relays:[...e.writeRelays??e.relays??[]],encodingFormat:e.encodingFormat??"words",tolerance:e.tolerance??1,issuedAt:r,expiresAt:r+ov,epoch:e.epoch??0,admins:[...e.admins??[]],protocolVersion:Ce,inviterPubkey:t.pubkey,inviterSig:"",memberNames:{...e.memberNames}};o.inviterSig=av(o,t.privkey);const s=jd(o);return{payload:o,confirmCode:s}}function dv(e,t){let n;try{n=so(e)}catch{throw new Error("Invalid invite payload — could not decode.")}iv(n);const r={groupId:n.groupId,seed:n.seed,groupName:n.groupName,rotationInterval:n.rotationInterval,wordCount:n.wordCount,wordlist:n.wordlist,counter:n.counter,usageOffset:n.usageOffset,nonce:n.nonce,beaconInterval:n.beaconInterval,beaconPrecision:n.beaconPrecision,members:[...n.members],relays:[...n.relays],encodingFormat:n.encodingFormat,tolerance:n.tolerance,issuedAt:n.issuedAt,expiresAt:n.expiresAt,epoch:n.epoch,admins:[...n.admins],protocolVersion:n.protocolVersion,inviterPubkey:n.inviterPubkey,inviterSig:n.inviterSig,memberNames:n.memberNames&&typeof n.memberNames=="object"?{...n.memberNames}:void 0};if(!cv(r))throw new Error("Invite signature is invalid — the inviter could not prove control of the admin key.");if(!t?.trim())throw new Error("Confirmation code is required — ask the sender to read it to you.");const o=jd(r),s=t.trim().replace(/[-\s]+/g," ").toLowerCase(),i=o.toLowerCase();if(s!==i)throw new Error("Confirmation words do not match — invite may have been tampered with.");const a=Math.floor(Date.now()/1e3);if(r.expiresAt<=a)throw new Error("Invite has expired. Ask for a new invite.");if(r.issuedAt>a+Dd)throw new Error("Invite timestamp is too far in the future — check your device clock.");return r}function uv(e,t){const{groups:n}=R(),r=n[e];return r?Array.isArray(r.usedInvites)&&r.usedInvites.includes(t):!1}function fv(e,t){const{groups:n}=R(),r=n[e];if(!r){console.warn(`[canary:invite] consumeInvite: unknown group id "${e}"`);return}W(e,{usedInvites:Array.from(new Set([...r.usedInvites,t]))})}const hv=10080*60;function pv(e){const t=Object.keys(e).sort().reduce((n,r)=>(n[r]=e[r],n),{});return new TextEncoder().encode(JSON.stringify(t))}function mv(e,t){let n;try{n=so(e)}catch{return{valid:!1,error:"Invalid join token — could not decode."}}if(n.g!==t.groupId)return{valid:!1,error:"Join token is for a different group."};if(typeof n.p!="string"||!yn.test(n.p))return{valid:!1,error:"Join token has invalid pubkey."};if(typeof n.s!="string"||!Ud.test(n.s))return{valid:!1,error:"Join token has invalid signature."};const r=Math.floor(Date.now()/1e3);if(typeof n.t!="number"||n.t<r-hv)return{valid:!1,error:"Join token has expired or is stale."};if(n.t>r+Dd)return{valid:!1,error:"Join token timestamp is too far in the future."};const{s:o,...s}=n,i=ge(pv(s));try{if(!Q.verify(F(n.s),i,F(n.p)))return{valid:!1,error:"Join token signature is invalid."}}catch{return{valid:!1,error:"Join token signature verification failed."}}const a=(n.w||"").toLowerCase(),c=t.tolerance??1;let l=!1;for(let d=t.counter-c;d<=t.counter+c;d++)if(!(d<0)&&a===Ke(t.groupSeed,t.context,d,t.encoding).toLowerCase()){l=!0;break}return l?{valid:!0,pubkey:n.p,displayName:n.n||"",word:n.w||""}:{valid:!1,error:"Join token word does not match — seed possession not proven."}}let Tn=null;function yv(e){const{identity:t}=R();if(!t?.pubkey||!t?.privkey)throw new Error("No local identity — cannot create remote invite.");if(!e.admins.includes(t.pubkey))throw new Error(`Not authorised — you are not an admin of "${e.name}".`);const n=e.writeRelays?.length?[...e.writeRelays]:[...R().settings.defaultWriteRelays??R().settings.defaultRelays],r=Qb({groupName:e.name,groupId:e.id,adminPubkey:t.pubkey,adminPrivkey:t.privkey,relays:n}),o=Jb(r);return Tn={groupId:e.id,tokenPayload:o,inviteId:r.inviteId},Tn}function $a(e,t){const{identity:n}=R();if(!n?.privkey)throw new Error("No local identity — cannot create welcome envelope.");if(!Tn)throw new Error("No active remote invite session — cannot create welcome envelope.");const r={inviteId:Tn.inviteId,seed:e.seed,counter:e.counter,usageOffset:e.usageOffset,epoch:e.epoch??0,wordCount:e.wordCount,rotationInterval:e.rotationInterval,groupId:e.id,groupName:e.name,wordlist:e.wordlist,beaconInterval:e.beaconInterval,beaconPrecision:e.beaconPrecision,encodingFormat:e.encodingFormat??"words",tolerance:e.tolerance??1,members:[...e.members],admins:[...e.admins??[]],relays:[...e.writeRelays??e.relays??[]],memberNames:e.memberNames?{...e.memberNames}:void 0};return ev({welcome:r,adminPrivkey:n.privkey,joinerPubkey:t})}function un(){Tn=null}function fn(e){const t=new Uint8Array(e.length/2);for(let n=0;n<t.length;n++)t[n]=parseInt(e.substring(n*2,n*2+2),16);return t}function hn(e){let t="";for(let n=0;n<e.length;n++)t+=e[n].toString(16).padStart(2,"0");return t}const gv={words:0,pin:1,hex:2},bv={0:"words",1:"pin",2:"hex"},vv={"en-v1":0},wv={0:"en-v1"},Hd=1,Ma=new TextEncoder,Oa=new TextDecoder;function Ev(e){const t=Ma.encode(e.groupId),n=Ma.encode(e.groupName),r=e.admins.map(d=>{const u=e.members.indexOf(d);if(u===-1)throw new Error(`Admin ${d} not found in members array`);return u}),s=177+1+e.members.length*32+1+r.length+1+t.length+1+n.length,i=new ArrayBuffer(s),a=new DataView(i),c=new Uint8Array(i);let l=0;a.setUint8(l,Hd),l+=1,c.set(fn(e.seed),l),l+=32,c.set(fn(e.inviterPubkey),l),l+=32,c.set(fn(e.inviterSig),l),l+=64,c.set(fn(e.nonce),l),l+=16,a.setUint32(l,e.counter),l+=4,a.setUint16(l,e.usageOffset),l+=2,a.setUint32(l,e.epoch),l+=4,a.setUint32(l,e.rotationInterval),l+=4,a.setUint32(l,e.beaconInterval),l+=4,a.setUint8(l,e.beaconPrecision),l+=1,a.setUint8(l,e.wordCount),l+=1,a.setUint8(l,e.tolerance),l+=1,a.setUint8(l,gv[e.encodingFormat]??0),l+=1,a.setUint8(l,vv[e.wordlist]??0),l+=1,a.setUint32(l,e.issuedAt),l+=4,a.setUint32(l,e.expiresAt),l+=4,a.setUint8(l,e.protocolVersion),l+=1,a.setUint8(l,e.members.length),l+=1;for(const d of e.members)c.set(fn(d),l),l+=32;a.setUint8(l,r.length),l+=1;for(const d of r)a.setUint8(l,d),l+=1;return a.setUint8(l,t.length),l+=1,c.set(t,l),l+=t.length,a.setUint8(l,n.length),l+=1,c.set(n,l),l+=n.length,c}function kv(e){const t=new DataView(e.buffer,e.byteOffset,e.byteLength);let n=0;const r=t.getUint8(n);if(n+=1,r!==Hd)throw new Error(`Unsupported binary invite version: ${r}`);const o=hn(e.slice(n,n+32));n+=32;const s=hn(e.slice(n,n+32));n+=32;const i=hn(e.slice(n,n+64));n+=64;const a=hn(e.slice(n,n+16));n+=16;const c=t.getUint32(n);n+=4;const l=t.getUint16(n);n+=2;const d=t.getUint32(n);n+=4;const u=t.getUint32(n);n+=4;const f=t.getUint32(n);n+=4;const h=t.getUint8(n);n+=1;const p=t.getUint8(n);n+=1;const m=t.getUint8(n);n+=1;const y=bv[t.getUint8(n)]??"words";n+=1;const E=wv[t.getUint8(n)]??"en-v1";n+=1;const S=t.getUint32(n);n+=4;const L=t.getUint32(n);n+=4;const O=t.getUint8(n);n+=1;const P=t.getUint8(n);n+=1;const $=[];for(let w=0;w<P;w++)$.push(hn(e.slice(n,n+32))),n+=32;const v=t.getUint8(n);n+=1;const b=[];for(let w=0;w<v;w++){const I=t.getUint8(n);n+=1,b.push($[I])}const g=t.getUint8(n);n+=1;const k=Oa.decode(e.slice(n,n+g));n+=g;const _=t.getUint8(n);n+=1;const A=Oa.decode(e.slice(n,n+_));return n+=_,{groupId:k,seed:o,groupName:A,rotationInterval:u,wordCount:p,wordlist:E,counter:c,usageOffset:l,nonce:a,beaconInterval:f,beaconPrecision:h,members:$,relays:[],encodingFormat:y,tolerance:m,issuedAt:S,expiresAt:L,epoch:d,admins:b,protocolVersion:O,inviterPubkey:s,inviterSig:i}}const sn=function(e,t){let o=e;const s=gn[t];let i=null,a=0,c=null;const l=[],d={},u=function(v,b){a=o*4+17,i=(function(g){const k=new Array(g);for(let _=0;_<g;_+=1){k[_]=new Array(g);for(let A=0;A<g;A+=1)k[_][A]=null}return k})(a),f(0,0),f(a-7,0),f(0,a-7),m(),p(),E(v,b),o>=7&&y(v),c==null&&(c=O(o,s,l)),S(c,b)},f=function(v,b){for(let g=-1;g<=7;g+=1)if(!(v+g<=-1||a<=v+g))for(let k=-1;k<=7;k+=1)b+k<=-1||a<=b+k||(0<=g&&g<=6&&(k==0||k==6)||0<=k&&k<=6&&(g==0||g==6)||2<=g&&g<=4&&2<=k&&k<=4?i[v+g][b+k]=!0:i[v+g][b+k]=!1)},h=function(){let v=0,b=0;for(let g=0;g<8;g+=1){u(!0,g);const k=ct.getLostPoint(d);(g==0||v>k)&&(v=k,b=g)}return b},p=function(){for(let v=8;v<a-8;v+=1)i[v][6]==null&&(i[v][6]=v%2==0);for(let v=8;v<a-8;v+=1)i[6][v]==null&&(i[6][v]=v%2==0)},m=function(){const v=ct.getPatternPosition(o);for(let b=0;b<v.length;b+=1)for(let g=0;g<v.length;g+=1){const k=v[b],_=v[g];if(i[k][_]==null)for(let A=-2;A<=2;A+=1)for(let w=-2;w<=2;w+=1)A==-2||A==2||w==-2||w==2||A==0&&w==0?i[k+A][_+w]=!0:i[k+A][_+w]=!1}},y=function(v){const b=ct.getBCHTypeNumber(o);for(let g=0;g<18;g+=1){const k=!v&&(b>>g&1)==1;i[Math.floor(g/3)][g%3+a-8-3]=k}for(let g=0;g<18;g+=1){const k=!v&&(b>>g&1)==1;i[g%3+a-8-3][Math.floor(g/3)]=k}},E=function(v,b){const g=s<<3|b,k=ct.getBCHTypeInfo(g);for(let _=0;_<15;_+=1){const A=!v&&(k>>_&1)==1;_<6?i[_][8]=A:_<8?i[_+1][8]=A:i[a-15+_][8]=A}for(let _=0;_<15;_+=1){const A=!v&&(k>>_&1)==1;_<8?i[8][a-_-1]=A:_<9?i[8][15-_-1+1]=A:i[8][15-_-1]=A}i[a-8][8]=!v},S=function(v,b){let g=-1,k=a-1,_=7,A=0;const w=ct.getMaskFunction(b);for(let I=a-1;I>0;I-=2)for(I==6&&(I-=1);;){for(let x=0;x<2;x+=1)if(i[k][I-x]==null){let T=!1;A<v.length&&(T=(v[A]>>>_&1)==1),w(k,I-x)&&(T=!T),i[k][I-x]=T,_-=1,_==-1&&(A+=1,_=7)}if(k+=g,k<0||a<=k){k-=g,g=-g;break}}},L=function(v,b){let g=0,k=0,_=0;const A=new Array(b.length),w=new Array(b.length);for(let C=0;C<b.length;C+=1){const N=b[C].dataCount,M=b[C].totalCount-N;k=Math.max(k,N),_=Math.max(_,M),A[C]=new Array(N);for(let G=0;G<A[C].length;G+=1)A[C][G]=255&v.getBuffer()[G+g];g+=N;const B=ct.getErrorCorrectPolynomial(M),D=Ln(A[C],B.getLength()-1).mod(B);w[C]=new Array(B.getLength()-1);for(let G=0;G<w[C].length;G+=1){const J=G+D.getLength()-w[C].length;w[C][G]=J>=0?D.getAt(J):0}}let I=0;for(let C=0;C<b.length;C+=1)I+=b[C].totalCount;const x=new Array(I);let T=0;for(let C=0;C<k;C+=1)for(let N=0;N<b.length;N+=1)C<A[N].length&&(x[T]=A[N][C],T+=1);for(let C=0;C<_;C+=1)for(let N=0;N<b.length;N+=1)C<w[N].length&&(x[T]=w[N][C],T+=1);return x},O=function(v,b,g){const k=Ba.getRSBlocks(v,b),_=Pa();for(let w=0;w<g.length;w+=1){const I=g[w];_.put(I.getMode(),4),_.put(I.getLength(),ct.getLengthInBits(I.getMode(),v)),I.write(_)}let A=0;for(let w=0;w<k.length;w+=1)A+=k[w].dataCount;if(_.getLengthInBits()>A*8)throw"code length overflow. ("+_.getLengthInBits()+">"+A*8+")";for(_.getLengthInBits()+4<=A*8&&_.put(0,4);_.getLengthInBits()%8!=0;)_.putBit(!1);for(;!(_.getLengthInBits()>=A*8||(_.put(236,8),_.getLengthInBits()>=A*8));)_.put(17,8);return L(_,k)};d.addData=function(v,b){b=b||"Byte";let g=null;switch(b){case"Numeric":g=_v(v);break;case"Alphanumeric":g=xv(v);break;case"Byte":g=Sv(v);break;case"Kanji":g=Iv(v);break;default:throw"mode:"+b}l.push(g),c=null},d.isDark=function(v,b){if(v<0||a<=v||b<0||a<=b)throw v+","+b;return i[v][b]},d.getModuleCount=function(){return a},d.make=function(){if(o<1){let v=1;for(;v<40;v++){const b=Ba.getRSBlocks(v,s),g=Pa();for(let _=0;_<l.length;_++){const A=l[_];g.put(A.getMode(),4),g.put(A.getLength(),ct.getLengthInBits(A.getMode(),v)),A.write(g)}let k=0;for(let _=0;_<b.length;_++)k+=b[_].dataCount;if(g.getLengthInBits()<=k*8)break}o=v}u(!1,h())},d.createTableTag=function(v,b){v=v||2,b=typeof b>"u"?v*4:b;let g="";g+='<table style="',g+=" border-width: 0px; border-style: none;",g+=" border-collapse: collapse;",g+=" padding: 0px; margin: "+b+"px;",g+='">',g+="<tbody>";for(let k=0;k<d.getModuleCount();k+=1){g+="<tr>";for(let _=0;_<d.getModuleCount();_+=1)g+='<td style="',g+=" border-width: 0px; border-style: none;",g+=" border-collapse: collapse;",g+=" padding: 0px; margin: 0px;",g+=" width: "+v+"px;",g+=" height: "+v+"px;",g+=" background-color: ",g+=d.isDark(k,_)?"#000000":"#ffffff",g+=";",g+='"/>';g+="</tr>"}return g+="</tbody>",g+="</table>",g},d.createSvgTag=function(v,b,g,k){let _={};typeof arguments[0]=="object"&&(_=arguments[0],v=_.cellSize,b=_.margin,g=_.alt,k=_.title),v=v||2,b=typeof b>"u"?v*4:b,g=typeof g=="string"?{text:g}:g||{},g.text=g.text||null,g.id=g.text?g.id||"qrcode-description":null,k=typeof k=="string"?{text:k}:k||{},k.text=k.text||null,k.id=k.text?k.id||"qrcode-title":null;const A=d.getModuleCount()*v+b*2;let w,I,x,T,C="",N;for(N="l"+v+",0 0,"+v+" -"+v+",0 0,-"+v+"z ",C+='<svg version="1.1" xmlns="http://www.w3.org/2000/svg"',C+=_.scalable?"":' width="'+A+'px" height="'+A+'px"',C+=' viewBox="0 0 '+A+" "+A+'" ',C+=' preserveAspectRatio="xMinYMin meet"',C+=k.text||g.text?' role="img" aria-labelledby="'+P([k.id,g.id].join(" ").trim())+'"':"",C+=">",C+=k.text?'<title id="'+P(k.id)+'">'+P(k.text)+"</title>":"",C+=g.text?'<description id="'+P(g.id)+'">'+P(g.text)+"</description>":"",C+='<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>',C+='<path d="',x=0;x<d.getModuleCount();x+=1)for(T=x*v+b,w=0;w<d.getModuleCount();w+=1)d.isDark(x,w)&&(I=w*v+b,C+="M"+I+","+T+N);return C+='" stroke="transparent" fill="black"/>',C+="</svg>",C},d.createDataURL=function(v,b){v=v||2,b=typeof b>"u"?v*4:b;const g=d.getModuleCount()*v+b*2,k=b,_=g-b;return Tv(g,g,function(A,w){if(k<=A&&A<_&&k<=w&&w<_){const I=Math.floor((A-k)/v),x=Math.floor((w-k)/v);return d.isDark(x,I)?0:1}else return 1})},d.createImgTag=function(v,b,g){v=v||2,b=typeof b>"u"?v*4:b;const k=d.getModuleCount()*v+b*2;let _="";return _+="<img",_+=' src="',_+=d.createDataURL(v,b),_+='"',_+=' width="',_+=k,_+='"',_+=' height="',_+=k,_+='"',g&&(_+=' alt="',_+=P(g),_+='"'),_+="/>",_};const P=function(v){let b="";for(let g=0;g<v.length;g+=1){const k=v.charAt(g);switch(k){case"<":b+="&lt;";break;case">":b+="&gt;";break;case"&":b+="&amp;";break;case'"':b+="&quot;";break;default:b+=k;break}}return b},$=function(v){v=typeof v>"u"?2:v;const g=d.getModuleCount()*1+v*2,k=v,_=g-v;let A,w,I,x,T;const C={"██":"█","█ ":"▀"," █":"▄","  ":" "},N={"██":"▀","█ ":"▀"," █":" ","  ":" "};let M="";for(A=0;A<g;A+=2){for(I=Math.floor((A-k)/1),x=Math.floor((A+1-k)/1),w=0;w<g;w+=1)T="█",k<=w&&w<_&&k<=A&&A<_&&d.isDark(I,Math.floor((w-k)/1))&&(T=" "),k<=w&&w<_&&k<=A+1&&A+1<_&&d.isDark(x,Math.floor((w-k)/1))?T+=" ":T+="█",M+=v<1&&A+1>=_?N[T]:C[T];M+=`
`}return g%2&&v>0?M.substring(0,M.length-g-1)+Array(g+1).join("▀"):M.substring(0,M.length-1)};return d.createASCII=function(v,b){if(v=v||1,v<2)return $(b);v-=1,b=typeof b>"u"?v*2:b;const g=d.getModuleCount()*v+b*2,k=b,_=g-b;let A,w,I,x;const T=Array(v+1).join("██"),C=Array(v+1).join("  ");let N="",M="";for(A=0;A<g;A+=1){for(I=Math.floor((A-k)/v),M="",w=0;w<g;w+=1)x=1,k<=w&&w<_&&k<=A&&A<_&&d.isDark(I,Math.floor((w-k)/v))&&(x=0),M+=x?T:C;for(I=0;I<v;I+=1)N+=M+`
`}return N.substring(0,N.length-1)},d.renderTo2dContext=function(v,b){b=b||2;const g=d.getModuleCount();for(let k=0;k<g;k++)for(let _=0;_<g;_++)v.fillStyle=d.isDark(k,_)?"black":"white",v.fillRect(_*b,k*b,b,b)},d};sn.stringToBytes=function(e){const t=[];for(let n=0;n<e.length;n+=1){const r=e.charCodeAt(n);t.push(r&255)}return t};sn.createStringToBytes=function(e,t){const n=(function(){const o=Av(e),s=function(){const c=o.read();if(c==-1)throw"eof";return c};let i=0;const a={};for(;;){const c=o.read();if(c==-1)break;const l=s(),d=s(),u=s(),f=String.fromCharCode(c<<8|l),h=d<<8|u;a[f]=h,i+=1}if(i!=t)throw i+" != "+t;return a})(),r=63;return function(o){const s=[];for(let i=0;i<o.length;i+=1){const a=o.charCodeAt(i);if(a<128)s.push(a);else{const c=n[o.charAt(i)];typeof c=="number"?(c&255)==c?s.push(c):(s.push(c>>>8),s.push(c&255)):s.push(r)}}return s}};const le={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},gn={L:1,M:0,Q:3,H:2},at={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},ct=(function(){const e=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],t=1335,n=7973,r=21522,o={},s=function(i){let a=0;for(;i!=0;)a+=1,i>>>=1;return a};return o.getBCHTypeInfo=function(i){let a=i<<10;for(;s(a)-s(t)>=0;)a^=t<<s(a)-s(t);return(i<<10|a)^r},o.getBCHTypeNumber=function(i){let a=i<<12;for(;s(a)-s(n)>=0;)a^=n<<s(a)-s(n);return i<<12|a},o.getPatternPosition=function(i){return e[i-1]},o.getMaskFunction=function(i){switch(i){case at.PATTERN000:return function(a,c){return(a+c)%2==0};case at.PATTERN001:return function(a,c){return a%2==0};case at.PATTERN010:return function(a,c){return c%3==0};case at.PATTERN011:return function(a,c){return(a+c)%3==0};case at.PATTERN100:return function(a,c){return(Math.floor(a/2)+Math.floor(c/3))%2==0};case at.PATTERN101:return function(a,c){return a*c%2+a*c%3==0};case at.PATTERN110:return function(a,c){return(a*c%2+a*c%3)%2==0};case at.PATTERN111:return function(a,c){return(a*c%3+(a+c)%2)%2==0};default:throw"bad maskPattern:"+i}},o.getErrorCorrectPolynomial=function(i){let a=Ln([1],0);for(let c=0;c<i;c+=1)a=a.multiply(Ln([1,lt.gexp(c)],0));return a},o.getLengthInBits=function(i,a){if(1<=a&&a<10)switch(i){case le.MODE_NUMBER:return 10;case le.MODE_ALPHA_NUM:return 9;case le.MODE_8BIT_BYTE:return 8;case le.MODE_KANJI:return 8;default:throw"mode:"+i}else if(a<27)switch(i){case le.MODE_NUMBER:return 12;case le.MODE_ALPHA_NUM:return 11;case le.MODE_8BIT_BYTE:return 16;case le.MODE_KANJI:return 10;default:throw"mode:"+i}else if(a<41)switch(i){case le.MODE_NUMBER:return 14;case le.MODE_ALPHA_NUM:return 13;case le.MODE_8BIT_BYTE:return 16;case le.MODE_KANJI:return 12;default:throw"mode:"+i}else throw"type:"+a},o.getLostPoint=function(i){const a=i.getModuleCount();let c=0;for(let u=0;u<a;u+=1)for(let f=0;f<a;f+=1){let h=0;const p=i.isDark(u,f);for(let m=-1;m<=1;m+=1)if(!(u+m<0||a<=u+m))for(let y=-1;y<=1;y+=1)f+y<0||a<=f+y||m==0&&y==0||p==i.isDark(u+m,f+y)&&(h+=1);h>5&&(c+=3+h-5)}for(let u=0;u<a-1;u+=1)for(let f=0;f<a-1;f+=1){let h=0;i.isDark(u,f)&&(h+=1),i.isDark(u+1,f)&&(h+=1),i.isDark(u,f+1)&&(h+=1),i.isDark(u+1,f+1)&&(h+=1),(h==0||h==4)&&(c+=3)}for(let u=0;u<a;u+=1)for(let f=0;f<a-6;f+=1)i.isDark(u,f)&&!i.isDark(u,f+1)&&i.isDark(u,f+2)&&i.isDark(u,f+3)&&i.isDark(u,f+4)&&!i.isDark(u,f+5)&&i.isDark(u,f+6)&&(c+=40);for(let u=0;u<a;u+=1)for(let f=0;f<a-6;f+=1)i.isDark(f,u)&&!i.isDark(f+1,u)&&i.isDark(f+2,u)&&i.isDark(f+3,u)&&i.isDark(f+4,u)&&!i.isDark(f+5,u)&&i.isDark(f+6,u)&&(c+=40);let l=0;for(let u=0;u<a;u+=1)for(let f=0;f<a;f+=1)i.isDark(f,u)&&(l+=1);const d=Math.abs(100*l/a/a-50)/5;return c+=d*10,c},o})(),lt=(function(){const e=new Array(256),t=new Array(256);for(let r=0;r<8;r+=1)e[r]=1<<r;for(let r=8;r<256;r+=1)e[r]=e[r-4]^e[r-5]^e[r-6]^e[r-8];for(let r=0;r<255;r+=1)t[e[r]]=r;const n={};return n.glog=function(r){if(r<1)throw"glog("+r+")";return t[r]},n.gexp=function(r){for(;r<0;)r+=255;for(;r>=256;)r-=255;return e[r]},n})(),Ln=function(e,t){if(typeof e.length>"u")throw e.length+"/"+t;const n=(function(){let o=0;for(;o<e.length&&e[o]==0;)o+=1;const s=new Array(e.length-o+t);for(let i=0;i<e.length-o;i+=1)s[i]=e[i+o];return s})(),r={};return r.getAt=function(o){return n[o]},r.getLength=function(){return n.length},r.multiply=function(o){const s=new Array(r.getLength()+o.getLength()-1);for(let i=0;i<r.getLength();i+=1)for(let a=0;a<o.getLength();a+=1)s[i+a]^=lt.gexp(lt.glog(r.getAt(i))+lt.glog(o.getAt(a)));return Ln(s,0)},r.mod=function(o){if(r.getLength()-o.getLength()<0)return r;const s=lt.glog(r.getAt(0))-lt.glog(o.getAt(0)),i=new Array(r.getLength());for(let a=0;a<r.getLength();a+=1)i[a]=r.getAt(a);for(let a=0;a<o.getLength();a+=1)i[a]^=lt.gexp(lt.glog(o.getAt(a))+s);return Ln(i,0).mod(o)},r},Ba=(function(){const e=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],t=function(o,s){const i={};return i.totalCount=o,i.dataCount=s,i},n={},r=function(o,s){switch(s){case gn.L:return e[(o-1)*4+0];case gn.M:return e[(o-1)*4+1];case gn.Q:return e[(o-1)*4+2];case gn.H:return e[(o-1)*4+3];default:return}};return n.getRSBlocks=function(o,s){const i=r(o,s);if(typeof i>"u")throw"bad rs block @ typeNumber:"+o+"/errorCorrectionLevel:"+s;const a=i.length/3,c=[];for(let l=0;l<a;l+=1){const d=i[l*3+0],u=i[l*3+1],f=i[l*3+2];for(let h=0;h<d;h+=1)c.push(t(u,f))}return c},n})(),Pa=function(){const e=[];let t=0;const n={};return n.getBuffer=function(){return e},n.getAt=function(r){const o=Math.floor(r/8);return(e[o]>>>7-r%8&1)==1},n.put=function(r,o){for(let s=0;s<o;s+=1)n.putBit((r>>>o-s-1&1)==1)},n.getLengthInBits=function(){return t},n.putBit=function(r){const o=Math.floor(t/8);e.length<=o&&e.push(0),r&&(e[o]|=128>>>t%8),t+=1},n},_v=function(e){const t=le.MODE_NUMBER,n=e,r={};r.getMode=function(){return t},r.getLength=function(i){return n.length},r.write=function(i){const a=n;let c=0;for(;c+2<a.length;)i.put(o(a.substring(c,c+3)),10),c+=3;c<a.length&&(a.length-c==1?i.put(o(a.substring(c,c+1)),4):a.length-c==2&&i.put(o(a.substring(c,c+2)),7))};const o=function(i){let a=0;for(let c=0;c<i.length;c+=1)a=a*10+s(i.charAt(c));return a},s=function(i){if("0"<=i&&i<="9")return i.charCodeAt(0)-48;throw"illegal char :"+i};return r},xv=function(e){const t=le.MODE_ALPHA_NUM,n=e,r={};r.getMode=function(){return t},r.getLength=function(s){return n.length},r.write=function(s){const i=n;let a=0;for(;a+1<i.length;)s.put(o(i.charAt(a))*45+o(i.charAt(a+1)),11),a+=2;a<i.length&&s.put(o(i.charAt(a)),6)};const o=function(s){if("0"<=s&&s<="9")return s.charCodeAt(0)-48;if("A"<=s&&s<="Z")return s.charCodeAt(0)-65+10;switch(s){case" ":return 36;case"$":return 37;case"%":return 38;case"*":return 39;case"+":return 40;case"-":return 41;case".":return 42;case"/":return 43;case":":return 44;default:throw"illegal char :"+s}};return r},Sv=function(e){const t=le.MODE_8BIT_BYTE,n=sn.stringToBytes(e),r={};return r.getMode=function(){return t},r.getLength=function(o){return n.length},r.write=function(o){for(let s=0;s<n.length;s+=1)o.put(n[s],8)},r},Iv=function(e){const t=le.MODE_KANJI,n=sn.stringToBytes;(function(s,i){const a=n(s);if(a.length!=2||(a[0]<<8|a[1])!=i)throw"sjis not supported."})("友",38726);const r=n(e),o={};return o.getMode=function(){return t},o.getLength=function(s){return~~(r.length/2)},o.write=function(s){const i=r;let a=0;for(;a+1<i.length;){let c=(255&i[a])<<8|255&i[a+1];if(33088<=c&&c<=40956)c-=33088;else if(57408<=c&&c<=60351)c-=49472;else throw"illegal char at "+(a+1)+"/"+c;c=(c>>>8&255)*192+(c&255),s.put(c,13),a+=2}if(a<i.length)throw"illegal char at "+(a+1)},o},Fd=function(){const e=[],t={};return t.writeByte=function(n){e.push(n&255)},t.writeShort=function(n){t.writeByte(n),t.writeByte(n>>>8)},t.writeBytes=function(n,r,o){r=r||0,o=o||n.length;for(let s=0;s<o;s+=1)t.writeByte(n[s+r])},t.writeString=function(n){for(let r=0;r<n.length;r+=1)t.writeByte(n.charCodeAt(r))},t.toByteArray=function(){return e},t.toString=function(){let n="";n+="[";for(let r=0;r<e.length;r+=1)r>0&&(n+=","),n+=e[r];return n+="]",n},t},Rv=function(){let e=0,t=0,n=0,r="";const o={},s=function(a){r+=String.fromCharCode(i(a&63))},i=function(a){if(a<0)throw"n:"+a;if(a<26)return 65+a;if(a<52)return 97+(a-26);if(a<62)return 48+(a-52);if(a==62)return 43;if(a==63)return 47;throw"n:"+a};return o.writeByte=function(a){for(e=e<<8|a&255,t+=8,n+=1;t>=6;)s(e>>>t-6),t-=6},o.flush=function(){if(t>0&&(s(e<<6-t),e=0,t=0),n%3!=0){const a=3-n%3;for(let c=0;c<a;c+=1)r+="="}},o.toString=function(){return r},o},Av=function(e){const t=e;let n=0,r=0,o=0;const s={};s.read=function(){for(;o<8;){if(n>=t.length){if(o==0)return-1;throw"unexpected end of file./"+o}const c=t.charAt(n);if(n+=1,c=="=")return o=0,-1;if(c.match(/^\s$/))continue;r=r<<6|i(c.charCodeAt(0)),o+=6}const a=r>>>o-8&255;return o-=8,a};const i=function(a){if(65<=a&&a<=90)return a-65;if(97<=a&&a<=122)return a-97+26;if(48<=a&&a<=57)return a-48+52;if(a==43)return 62;if(a==47)return 63;throw"c:"+a};return s},Cv=function(e,t){const n=e,r=t,o=new Array(e*t),s={};s.setPixel=function(l,d,u){o[d*n+l]=u},s.write=function(l){l.writeString("GIF87a"),l.writeShort(n),l.writeShort(r),l.writeByte(128),l.writeByte(0),l.writeByte(0),l.writeByte(0),l.writeByte(0),l.writeByte(0),l.writeByte(255),l.writeByte(255),l.writeByte(255),l.writeString(","),l.writeShort(0),l.writeShort(0),l.writeShort(n),l.writeShort(r),l.writeByte(0);const d=2,u=a(d);l.writeByte(d);let f=0;for(;u.length-f>255;)l.writeByte(255),l.writeBytes(u,f,255),f+=255;l.writeByte(u.length-f),l.writeBytes(u,f,u.length-f),l.writeByte(0),l.writeString(";")};const i=function(l){const d=l;let u=0,f=0;const h={};return h.write=function(p,m){if(p>>>m)throw"length over";for(;u+m>=8;)d.writeByte(255&(p<<u|f)),m-=8-u,p>>>=8-u,f=0,u=0;f=p<<u|f,u=u+m},h.flush=function(){u>0&&d.writeByte(f)},h},a=function(l){const d=1<<l,u=(1<<l)+1;let f=l+1;const h=c();for(let S=0;S<d;S+=1)h.add(String.fromCharCode(S));h.add(String.fromCharCode(d)),h.add(String.fromCharCode(u));const p=Fd(),m=i(p);m.write(d,f);let y=0,E=String.fromCharCode(o[y]);for(y+=1;y<o.length;){const S=String.fromCharCode(o[y]);y+=1,h.contains(E+S)?E=E+S:(m.write(h.indexOf(E),f),h.size()<4095&&(h.size()==1<<f&&(f+=1),h.add(E+S)),E=S)}return m.write(h.indexOf(E),f),m.write(u,f),m.flush(),p.toByteArray()},c=function(){const l={};let d=0;const u={};return u.add=function(f){if(u.contains(f))throw"dup key:"+f;l[f]=d,d+=1},u.size=function(){return d},u.indexOf=function(f){return l[f]},u.contains=function(f){return typeof l[f]<"u"},u};return s},Tv=function(e,t,n){const r=Cv(e,t);for(let a=0;a<t;a+=1)for(let c=0;c<e;c+=1)r.setPixel(c,a,n(c,a));const o=Fd();r.write(o);const s=Rv(),i=o.toByteArray();for(let a=0;a<i.length;a+=1)s.writeByte(i[a]);return s.flush(),"data:image/gif;base64,"+s};sn.stringToBytes;function Lv(e,t=4){const n=sn(0,"L");return n.addData(e),n.make(),n.createSvgTag({cellSize:t,margin:2,scalable:!0})}const $r=25519;function Gd(e){const t=pe(),{identity:n}=R();if(!t||!n?.pubkey||!n?.privkey)return e.onError("No relay pool or identity available."),()=>{};const{inviteId:r,adminPubkey:o,readRelays:s,writeRelays:i,onWelcome:a,onError:c}=e,l=n.privkey;n.pubkey;const d=Array.from(new Set([...s,...i])),u=Te(F(l),o),f=JSON.stringify({type:"join-request",inviteId:r}),h=Xt(f,u),p=bt({kind:$r,created_at:Math.floor(Date.now()/1e3),tags:[["d",r],["p",o]],content:h},F(l));Promise.allSettled(t.publish(i,p)).catch(()=>{});const m=t.subscribeMany(d,{kinds:[$r],"#d":[r],authors:[o]},{onevent(E){try{const S=Qt(E.content,u),L=JSON.parse(S);L.type==="welcome"&&L.inviteId===r&&L.envelope&&(a(L.envelope),m.close())}catch{}},oneose(){}}),y=setTimeout(()=>{m.close(),c("Timed out waiting for welcome message from admin.")},12e4);return()=>{clearTimeout(y),m.close()}}function Nv(e){const t=pe(),{identity:n}=R();if(!t||!n?.pubkey||!n?.privkey)return e.onError("No relay pool or identity available."),()=>{};const{inviteId:r,readRelays:o,writeRelays:s,onJoinRequest:i,onError:a}=e,c=n.privkey,l=Array.from(new Set([...o,...s])),d=t.subscribeMany(l,{kinds:[$r],"#d":[r],"#p":[n.pubkey]},{onevent(f){try{const h=Te(F(c),f.pubkey),p=Qt(f.content,h),m=JSON.parse(p);m.type==="join-request"&&m.inviteId===r&&i(f.pubkey)}catch{}},oneose(){}}),u=setTimeout(()=>{d.close(),a("Timed out waiting for join request.")},3e5);return()=>{clearTimeout(u),d.close()}}function $v(e){const t=pe(),{identity:n}=R();if(!t||!n?.privkey)return;const{inviteId:r,joinerPubkey:o,envelope:s,writeRelays:i}=e,a=Te(F(n.privkey),o),c=JSON.stringify({type:"welcome",inviteId:r,envelope:s}),l=Xt(c,a),d=bt({kind:$r,created_at:Math.floor(Date.now()/1e3),tags:[["d",r],["p",o]],content:l},F(n.privkey));Promise.allSettled(t.publish(i,d)).catch(()=>{})}const Kd=25520;function Mv(e){const t=pe(),{identity:n}=R();if(!t||!n?.privkey)return;const{token:r,writeRelays:o}=e,s=JSON.stringify(r),i=bt({kind:Kd,created_at:Math.floor(Date.now()/1e3),tags:[["d",r.inviteId]],content:s},F(n.privkey));Promise.allSettled(t.publish(o,i)).catch(()=>{})}function Ov(e){const t=pe();if(!t)return e.onError("No relay pool available."),()=>{};const{inviteId:n,readRelays:r,onToken:o,onError:s}=e;let i=!1;const a=t.subscribeMany(r,{kinds:[Kd],"#d":[n]},{onevent(l){if(!i)try{const d=JSON.parse(l.content);d.inviteId===n&&(i=!0,o(d),a.close())}catch{}},oneose(){i||(a.close(),s("Invite not found on relay — it may have expired."))}}),c=setTimeout(()=>{i||(a.close(),s("Timed out looking for invite on relay."))},15e3);return()=>{clearTimeout(c),a.close()}}const Ze=new Map,dr=new Map,Bv=6e4,ve=new Set;function gi(e){const t=Ze.get(e);if(t)return t.display_name||t.name||void 0}function an(e){return Ze.get(e)}function Vd(e,t){const n=pe();if(!n){console.warn("[profiles] no pool — skipping");return}const r=Date.now(),o=e.filter(c=>{if(Ze.has(c)||ve.has(c))return!1;const l=dr.get(c);return!(l&&r-l<Bv)});if(o.length===0){console.warn("[profiles] all cached/pending — nothing to fetch");return}for(const c of o)ve.add(c);const s=Uv(t),i=[...new Set([...s,...zd])];if(console.warn("[profiles] fetching",o.length,"profiles from",i,"for group",t?.slice(0,8)),i.length===0){for(const c of o)ve.delete(c);return}const a=n.subscribeMany(i,{kinds:[0],authors:o},{onevent(c){try{const l=JSON.parse(c.content);console.warn("[profiles] got profile for",c.pubkey.slice(0,8),l.display_name||l.name||"(no name)"),Ze.set(c.pubkey,l),ve.delete(c.pubkey);const d=l.display_name||l.name;if(d&&t){const u=R().groups[t];u&&u.memberNames?.[c.pubkey]!==d&&W(t,{memberNames:{...u.memberNames,[c.pubkey]:d}})}}catch{dr.set(c.pubkey,Date.now()),ve.delete(c.pubkey)}},oneose(){console.warn("[profiles] EOSE — found:",o.filter(c=>Ze.has(c)).length,"missing:",o.filter(c=>!Ze.has(c)).length);for(const c of o)Ze.has(c)||dr.set(c,Date.now()),ve.delete(c);a.close()}})}const bi=["wss://purplepag.es","wss://relay.damus.io","wss://nos.lol"],zd=bi;async function Pv(){await no();const e=pe(),{identity:t,settings:n}=R();if(!e||!t?.pubkey)return;const r=t.pubkey;if(ve.has(r))return;Ze.delete(r),dr.delete(r),ve.add(r);const o=n?.defaultRelays?.length?n.defaultRelays:[],s=[...new Set([...o,...zd])];if(s.length===0){ve.delete(r);return}console.warn("[profiles] fetching own kind 0 from",s);const i=e.subscribeMany(s,{kinds:[0],authors:[r]},{onevent(a){try{const c=JSON.parse(a.content);console.warn("[profiles] got own profile from relay:",c.display_name||c.name||"(no name)"),Ze.set(a.pubkey,c),ve.delete(a.pubkey);const l=c.display_name||c.name,d=c.picture,{identity:u}=R();if(u&&u.pubkey===a.pubkey){const f={};l&&u.displayName!==l&&(f.displayName=l),d&&u.picture!==d&&(f.picture=d),Object.keys(f).length>0&&ee({identity:{...u,...f}})}}catch{ve.delete(a.pubkey)}},oneose(){ve.delete(r),i.close()}})}function Uv(e){if(e){const n=R().groups[e];if(n?.relays?.length)return n.relays}const t=R().settings;return t?.defaultRelays?.length?t.defaultRelays:[]}function Dv(e){const t=new Uint8Array(e.length/2);for(let n=0;n<e.length;n+=2)t[n/2]=parseInt(e.slice(n,n+2),16);return t}function qv(e,t){setTimeout(async()=>{try{const n=pe();if(!n){console.warn("[profiles] no pool — skipping kind 0 publish");return}await no();const r=JSON.stringify({name:e}),o={kind:0,created_at:Math.floor(Date.now()/1e3),tags:[],content:r},s=Dv(t),i=bt(o,s),{settings:a}=R(),c=a?.defaultWriteRelays?.length?a.defaultWriteRelays:a?.defaultRelays?.length?a.defaultRelays:[],l=we([...bi,...c]);console.warn("[profiles] publishing kind 0 to",l);const d=n.publish(l,i),f=(await Promise.allSettled(d)).filter(h=>h.status==="fulfilled").length;console.warn(`[profiles] kind 0 published to ${f}/${l.length} relay(s)`)}catch(n){console.warn("[profiles] kind 0 publish failed:",n)}},2e3)}const Mr=Object.freeze(Object.defineProperty({__proto__:null,PROFILE_RELAYS:bi,fetchOwnProfile:Pv,fetchProfiles:Vd,getCachedName:gi,getCachedProfile:an,publishKind0:qv},Symbol.toStringTag,{value:"Module"})),Wd=new Map(fi.map(e=>[e.pubkey,e.name])),Ua=[210,140,30,280,60,330,170,0];function jv(e,t){const n=t.indexOf(e);return Ua[(n>=0?n:0)%Ua.length]}function Hv(e,t,n,r){const o=jv(e,t),s=n[e]??0;if(s===0)return`hsl(${o}, 55%, 55%)`;const i=Math.floor(Date.now()/1e3)-s;return i<=r?`hsl(${o}, 70%, 55%)`:i<=r*1.25?`hsl(${o}, 40%, 50%)`:"#94a3b8"}function ls(e,t,n){const{identity:r,groups:o}=R(),s=r?.pubkey===e;let i;if(n){const c=o[n]?.memberNames?.[e];c&&c!=="You"&&(i=c)}return i||(i=Wd.get(e)),i||(i=gi(e)),s?i?`${i} (you)`:"You":i||`${e.slice(0,8)}…${e.slice(-4)}`}function io(e,t){const n=t?.title??"Invite to Group",r=t?.scanHint??"Scan with your phone camera to join";t?.showConfirmMemberNote,Br(e);let o=document.getElementById("invite-modal");o||(o=document.createElement("dialog"),o.id="invite-modal",o.className="modal",document.body.appendChild(o),o.addEventListener("click",u=>{u.target===o&&(un(),o.close())}));const s=o;function i(){s.innerHTML=`
      <div class="modal__form invite-share">
        <h2 class="modal__title">${q(n)}</h2>
        <p class="invite-hint">How are you sharing this?</p>

        <div class="invite-share__actions" style="flex-direction: column; gap: 0.75rem;">
          <button class="btn btn--primary" id="invite-qr-path" type="button">Scan QR &mdash; they're with me</button>
          <button class="btn btn--primary" id="invite-link-path" type="button">Secure Channel &mdash; Signal, WhatsApp, etc.</button>
        </div>

        <div class="modal__actions">
          <button class="btn" id="invite-close-btn" type="button">Cancel</button>
        </div>
      </div>
    `,s.querySelector("#invite-qr-path")?.addEventListener("click",l),s.querySelector("#invite-link-path")?.addEventListener("click",d),s.querySelector("#invite-close-btn")?.addEventListener("click",()=>{un(),s.close()})}function a(u){s.innerHTML=`
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
    `,s.querySelector("#remote-back-2")?.addEventListener("click",u),s.querySelector("#remote-next-2")?.addEventListener("click",()=>{const f=s.querySelector("#remote-joincode-input"),h=s.querySelector("#remote-joincode-error"),p=f?.value.trim()??"";if(!/^[0-9a-f]{64}$/.test(p)){h&&(h.textContent="Invalid join code — must be a 64-character hex public key.",h.style.display="");return}try{const m=R().groups[e.id];if(!m)throw new Error("Group not found.");const y=$a(m,p);c(y,p)}catch(m){h&&(h.textContent=m instanceof Error?m.message:"Failed to create welcome envelope.",h.style.display="")}})}function c(u,f){s.innerHTML=`
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
    `,s.querySelector("#remote-copy-welcome")?.addEventListener("click",async h=>{const p=h.currentTarget;try{await navigator.clipboard.writeText(u),p.textContent="Copied!",p.classList.add("btn--copied"),setTimeout(()=>{p.textContent="Copy Welcome Message",p.classList.remove("btn--copied")},2e3)}catch{}}),s.querySelector("#remote-done")?.addEventListener("click",()=>{try{const h=R().groups[e.id];if(h&&!h.members.includes(f)){const p=s.querySelector("#remote-joiner-name")?.value.trim()??"";cs(e.id,f,p),Y(p?`${p} added to group`:"Member added to group","success")}}catch(h){Y(h instanceof Error?h.message:"Failed to add member","error")}un(),s.close()})}function l(){const{payload:u,confirmCode:f}=lv(e),h=Ev(u),m=`${window.location.href.split("#")[0]}#inv/${Yb(h)}`,y=Lv(m);s.innerHTML=`
      <div class="modal__form invite-share">
        <h2 class="modal__title">${q(n)}</h2>

        <div class="qr-container" data-url="${q(m)}">${y}</div>
        <p class="invite-hint">${q(r)}</p>
        <p class="invite-hint" style="color: var(--duress); font-weight: 500;">Contains the group key &mdash; only share in person.</p>

        <div style="margin: 1rem 0; padding: 0.75rem; border-radius: 0.5rem; background: var(--surface-alt, rgba(255,255,255,0.05));">
          <p class="invite-hint" style="font-weight: 600; margin-bottom: 0.25rem;">Read these words aloud:</p>
          <p style="font-size: 1.25rem; font-weight: 700; letter-spacing: 0.05em; text-align: center;">${q(f)}</p>
        </div>

        <div class="modal__actions" style="gap: 0.5rem;">
          <button class="btn" id="invite-back-btn" type="button">Back</button>
          <button class="btn" id="invite-done-btn" type="button">Done</button>
        </div>
      </div>
    `,s.querySelector("#invite-back-btn")?.addEventListener("click",()=>{i()}),s.querySelector("#invite-done-btn")?.addEventListener("click",()=>{s.close()})}function d(){const u=yv(e),h=`${window.location.href.split("#")[0]}#j/${u.inviteId}`,p=e.readRelays?.length?e.readRelays:R().settings.defaultReadRelays,m=e.writeRelays?.length?e.writeRelays:R().settings.defaultWriteRelays;Le(p,m).then(()=>{Mv({token:$d(u.tokenPayload),writeRelays:m})});let y=()=>{};s.innerHTML=`
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
    `,s.querySelector("#remote-copy-link")?.addEventListener("click",async E=>{const S=E.currentTarget;try{await navigator.clipboard.writeText(h),S.textContent="Copied!",S.classList.add("btn--copied"),setTimeout(()=>{S.textContent="Copy Link",S.classList.remove("btn--copied")},2e3)}catch{}}),Le(p,m).then(()=>{y=Nv({inviteId:u.inviteId,readRelays:p,writeRelays:m,onJoinRequest(E){y();try{const S=R().groups[e.id];if(!S)return;const L=$a(S,E);$v({inviteId:u.inviteId,joinerPubkey:E,envelope:L,writeRelays:m}),S.members.includes(E)||cs(e.id,E),un(),s.close(),Y("Member joined via relay","success")}catch(S){Y(S instanceof Error?S.message:"Failed to send welcome","error")}},onError(E){const S=s.querySelector("#remote-relay-status");S&&(S.textContent=E||"Relay unavailable — use manual fallback below.")}})}),s.querySelector("#remote-manual-fallback")?.addEventListener("click",()=>{y(),a(()=>{y=()=>{},d()})}),s.querySelector("#remote-back-btn")?.addEventListener("click",()=>{y(),un(),i()})}i(),o.showModal()}function ds(e){io(e,{title:"Share Group State",scanHint:"Share with existing members to sync the latest group state.",showConfirmMemberNote:!1})}function Fv(e,t){const{identity:n,groups:r}=R(),o=r[t],s=n?.pubkey===e,i=o?.admins.includes(e)??!1,a=ls(e,o?.members??[],t),c=an(e),l=Wd.get(e),d=o?.memberNames?.[e],u=o?.livenessCheckins?.[e];let f="Never checked in";if(u){const S=Math.floor(Date.now()/1e3)-u;S<60?f="Active now":S<3600?f=`${Math.floor(S/60)}m ago`:f=`${Math.floor(S/3600)}h ago`}const h=[s?'<span class="member-detail__badge">You</span>':"",i?'<span class="member-detail__badge member-detail__badge--admin">Admin</span>':""].filter(Boolean).join(" "),p=c?.display_name||c?.name,m=(S,L)=>`<div class="member-detail__row"><span class="member-detail__label">${S}</span><span class="member-detail__value">${q(L)}</span></div>`,y=[m("Pubkey",`${e.slice(0,16)}…${e.slice(-8)}`)];p&&y.push(m("Nostr name",p)),c?.nip05&&y.push(m("NIP-05",c.nip05)),c?.about&&y.push(m("About",c.about.length>80?c.about.slice(0,80)+"…":c.about)),c?.lud16&&y.push(m("Lightning",c.lud16)),c?.website&&y.push(m("Website",c.website)),d&&d!=="You"&&d!==p&&y.push(m("Display name",d)),l&&y.push(m("Demo account",l)),y.push(m("Liveness",f)),!c&&!l&&y.push('<div class="member-detail__row"><span class="member-detail__label" style="color: var(--text-muted); font-style: italic;">No Nostr profile found on relay</span></div>');const E=c?.picture?`<img class="member-detail__avatar" src="${q(c.picture)}" alt="" />`:"";mi(`
    <div class="member-detail__header">
      ${E}
      <div>
        <h2 class="modal__title" style="margin:0;">${q(a)} ${h}</h2>
      </div>
    </div>
    <div class="member-detail__rows">${y.join("")}</div>
    <div class="modal__actions">
      <button class="btn btn--sm" id="member-detail-copy" type="button">Copy Pubkey</button>
      <button class="btn" id="modal-cancel-btn" type="button">Close</button>
    </div>
  `,()=>{}),requestAnimationFrame(()=>{document.getElementById("member-detail-copy")?.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(e);const S=document.getElementById("member-detail-copy");S.textContent="Copied!",setTimeout(()=>{S.textContent="Copy Pubkey"},1500)}catch{}}),document.getElementById("modal-cancel-btn")?.addEventListener("click",()=>{document.getElementById("app-modal")?.close()})})}function Jd(e){const{groups:t,activeGroupId:n}=R();if(!n){e.innerHTML="";return}const r=t[n];if(!r){e.innerHTML="";return}const{identity:o}=R(),s=!!o?.pubkey&&r.admins.includes(o.pubkey);Vd(r.members,n);const i=r.members.length>0?r.members.map(a=>{const c=Hv(a,r.members,r.livenessCheckins??{},r.livenessInterval),l=an(a),d=l?.picture?`<img src="${q(l.picture)}" alt="" style="width:24px;height:24px;border-radius:50%;object-fit:cover;flex-shrink:0;border:2px solid ${c};box-shadow:0 0 6px ${c}80;" />`:`<span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:${c};flex-shrink:0;box-shadow:0 0 6px ${c}80;"></span>`;return`
          <li class="member-item" data-pubkey="${q(a)}">
            ${d}
            <button class="member-item__name-btn" data-pubkey="${q(a)}" type="button">${q(ls(a,r.members,n))}</button>
            ${s?`<button
              class="btn btn--sm member-item__remove"
              data-pubkey="${q(a)}"
              type="button"
              aria-label="Remove member"
            >✕</button>`:""}
          </li>`}).join(""):'<li class="member-item member-item--empty">No members yet.</li>';e.innerHTML=`
    <section class="panel members-panel">
      <h2 class="panel__title">Members</h2>
      <ul class="member-list">
        ${i}
      </ul>
      ${s?`<div class="members-actions">
        <button class="btn btn--sm" id="invite-btn" type="button">+ Invite</button>
        <button class="btn btn--sm" id="share-state-btn" type="button">Share State</button>
        <button class="btn btn--sm" id="confirm-member-btn" type="button">Confirm Member</button>
      </div>`:""}
    </section>
  `,e.querySelectorAll(".member-item__name-btn").forEach(a=>{a.addEventListener("click",()=>{const c=a.dataset.pubkey;c&&Fv(c,n)})}),e.querySelector(".member-list")?.addEventListener("click",a=>{const c=a.target.closest(".member-item__remove");if(!c)return;const l=c.dataset.pubkey;if(!l)return;const{groups:d}=R(),u=d[n]?.members??[];if(!confirm(`Remove ${ls(l,u,n)} from the group?

This rotates the group secret immediately. Remaining members must re-join using a fresh invite.`))return;const{activeGroupId:f}=R();if(!f)return;Pb(f,l);const{groups:h}=R(),p=h[f];p&&p.members.length>0&&ds(p)}),e.querySelector("#invite-btn")?.addEventListener("click",()=>{const{groups:a,activeGroupId:c}=R();if(!c)return;const l=a[c];l&&io(l)}),e.querySelector("#share-state-btn")?.addEventListener("click",()=>{const{groups:a,activeGroupId:c}=R();if(!c)return;const l=a[c];l&&ds(l)}),e.querySelector("#confirm-member-btn")?.addEventListener("click",()=>{Yd()})}function Da(e,t,n){const{groups:r,identity:o}=R(),s=r[e];if(!s||!o?.pubkey||!s.admins.includes(o.pubkey))return!1;s.members.includes(t)||cs(e,t,n);const i=R().groups[e];return i&&n&&W(e,{memberNames:{...i.memberNames,[t]:n}}),!0}function Yd(e){const{groups:t,activeGroupId:n}=R();!n||!t[n]||(mi(`
    <h2 class="modal__title">Confirm Member</h2>

    <label class="input-label">Acknowledgement link or token
      <textarea name="ackToken" class="input" rows="2" placeholder="Paste #ack/... link or token">${q(e??"")}</textarea>
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
  `,o=>{try{const s=o.get("ackToken")?.trim(),i=o.get("word")?.trim().toLowerCase(),a=o.get("memberName")?.trim(),{activeGroupId:c}=R();if(!c)throw new Error("No active group.");const{groups:l}=R(),d=l[c];if(!d)throw new Error("Group not found.");if(s){const u=s.includes("#ack/")?decodeURIComponent(s.split("#ack/")[1]):s,f=mv(u,{groupId:c,groupSeed:d.seed,counter:d.counter+(d.usageOffset??0),context:"canary:group",encoding:Cn(d),tolerance:d.tolerance??1});if(!f.valid)throw new Error(f.error??"Invalid join token.");if(!Da(c,f.pubkey,f.displayName||a||""))throw new Error("Member could not be added — they may already be in the group or you are not an admin.");Y(`${f.displayName||"Member"} has joined the group`,"success")}else if(i){if(!a)throw new Error("Please enter the member name.");const u=d.counter+(d.usageOffset??0),f=Ke(d.seed,oo,u,Cn(d)).toLowerCase();if(i!==f)throw new Error("Word does not match — the member may not have the current group key.");const h=new Uint8Array(32);crypto.getRandomValues(h);const p=Array.from(h,m=>m.toString(16).padStart(2,"0")).join("");if(!Da(c,p,a))throw new Error("Member could not be added — you may not be an admin of this group.");Y(`${a} has joined the group`,"success")}else throw new Error("Provide either an ack token or a verification word.")}catch(s){throw alert(s instanceof Error?s.message:"Confirmation failed."),s}}),requestAnimationFrame(()=>{document.getElementById("modal-cancel-btn")?.addEventListener("click",()=>{document.getElementById("app-modal")?.close()})}))}const Gv=Object.freeze(Object.defineProperty({__proto__:null,renderMembers:Jd,showConfirmMemberModal:Yd,showInviteModal:io,showShareStateModal:ds},Symbol.toStringTag,{value:"Module"})),us="0123456789bcdefghjkmnpqrstuvwxyz",vi={};for(let e=0;e<us.length;e++)vi[us[e]]=e;function Kv(e){for(const t of e)if(!(t in vi))throw new TypeError(`Invalid geohash character: '${t}' in "${e}"`)}function wi(e,t,n=5){if(!Number.isFinite(e)||e<-90||e>90)throw new RangeError(`Invalid latitude: ${e}`);if(!Number.isFinite(t)||t<-180||t>180)throw new RangeError(`Invalid longitude: ${t}`);if(!Number.isFinite(n))throw new RangeError(`Invalid precision: ${n}`);if(n=Math.round(n),n<1)throw new RangeError(`Invalid precision: ${n}`);n=Math.min(12,n);let r=-90,o=90,s=-180,i=180,a="",c=0,l=0,d=!0;for(;a.length<n;){if(d){const u=(s+i)/2;t>=u?(l|=1<<4-c,s=u):i=u}else{const u=(r+o)/2;e>=u?(l|=1<<4-c,r=u):o=u}d=!d,c++,c===5&&(a+=us[l],c=0,l=0)}return a}function Zd(e){if(e.length===0)throw new TypeError("Cannot decode an empty geohash");const t=Vv(e);return{lat:(t.minLat+t.maxLat)/2,lon:(t.minLon+t.maxLon)/2,error:{lat:(t.maxLat-t.minLat)/2,lon:(t.maxLon-t.minLon)/2}}}function Vv(e){Kv(e);let t=-90,n=90,r=-180,o=180,s=!0;for(const i of e){const a=vi[i];for(let c=4;c>=0;c--){if(s){const l=(r+o)/2;a>>c&1?r=l:o=l}else{const l=(t+n)/2;a>>c&1?t=l:n=l}s=!s}}return{minLat:t,maxLat:n,minLon:r,maxLon:o}}const zv=[0,25e5,63e4,78e3,2e4,2400,610,76,19,2.4];function Ei(e){if(!Number.isFinite(e))throw new RangeError(`Invalid precision: ${e}`);const t=Math.max(1,Math.min(9,Math.round(e)));return zv[t]}let te=null,Ue=null,ht={},ye={},ki={},Ae=null,ao=new Set,co=!1;const qa={1:"2,500 km — continental",2:"630 km — country",3:"78 km — region",4:"20 km — city",5:"2.4 km — neighbourhood",6:"610 m — street",7:"76 m — building",8:"19 m — door",9:"2.4 m — exact"},ja=6371e3;function Wv(e,t,n,r=48){const o=[];for(let s=0;s<=r;s++){const i=s/r*2*Math.PI,a=n/ja*Math.cos(i)*(180/Math.PI),c=n/(ja*Math.cos(e*Math.PI/180))*Math.sin(i)*(180/Math.PI);o.push([t+c,e+a])}return o}const Ha=[210,140,30,280,60,330,170,0];function tr(e){const{groups:t,activeGroupId:n}=R(),s=((n?t[n]:null)?.members??[]).indexOf(e);return Ha[(s>=0?s:0)%Ha.length]}function _i(e){if(ao.has(e))return"#f87171";const{groups:t,activeGroupId:n}=R(),r=n?t[n]:null;if(!r)return`hsl(${tr(e)}, 70%, 55%)`;const o=r.livenessCheckins[e]??0;if(o===0)return`hsl(${tr(e)}, 20%, 50%)`;const s=Math.floor(Date.now()/1e3)-o,i=r.livenessInterval;return s<=i?`hsl(${tr(e)}, 70%, 55%)`:s<=i*1.25?`hsl(${tr(e)}, 40%, 50%)`:"#94a3b8"}function Xd(){return{type:"FeatureCollection",features:Object.entries(ye).map(([e,t])=>({type:"Feature",properties:{pubkey:e,duress:ao.has(e),colour:_i(e)},geometry:{type:"Polygon",coordinates:[Wv(t.lat,t.lon,Ei(t.precision))]}}))}}const Qd="5.19.0",Jv=`https://unpkg.com/maplibre-gl@${Qd}/dist/maplibre-gl.js`,Yv=`https://unpkg.com/maplibre-gl@${Qd}/dist/maplibre-gl.css`,Zv="sha384-pEfbADcwebVj4NNOvWFLUkm+FiGTICE5bChpV647czG7OpSqcHNgxM8QawfAkbRO",Xv="sha384-MGCxhspF/+ufueUgol3FDkiAYQbpSNRhBT0VWHJt64U8qIy9qlnXWx8LAbj6niPH";async function Qv(){if(Ue)return Ue;try{const[t]=await Promise.all([ke(()=>import("./maplibre-gl-DFGd9893.js").then(n=>n.m),[],import.meta.url),ke(()=>Promise.resolve({}),__vite__mapDeps([0]),import.meta.url)]);return Ue=t,t}catch{}const e=document.createElement("link");return e.rel="stylesheet",e.href=Yv,e.integrity=Xv,e.crossOrigin="anonymous",document.head.appendChild(e),await new Promise((t,n)=>{const r=document.createElement("script");r.src=Jv,r.integrity=Zv,r.crossOrigin="anonymous",r.onload=()=>t(),r.onerror=n,document.head.appendChild(r)}),Ue=window.maplibregl,Ue}async function eu(e){const{groups:t,activeGroupId:n}=R();if(!n||!t[n]){te&&(te.remove(),te=null,co=!1),e.innerHTML="";return}const r=t[n],o=r.beaconPrecision??4;if(Object.keys(ye).length===0&&r.lastPositions)for(const[a,c]of Object.entries(r.lastPositions))ye[a]=c;if(te&&document.getElementById("beacon-map"))return;e.innerHTML=`
    <section class="panel beacon-panel">
      <h3 class="panel__title">Location</h3>
      <p class="settings-hint" style="margin-bottom: 0.5rem;">Approximate location of group members. Circles show the geohash area — your exact position is never shared. In an emergency, full GPS precision is used so your group can help. Circles turn <span style="color: #f87171; font-weight: 500;">red</span> when an emergency signal is active.</p>
      <div class="beacon-map" id="beacon-map" style="height: 500px; border-radius: 8px;"></div>
      <div style="display: flex; align-items: center; gap: 0.75rem; margin-top: 0.5rem;">
        <button class="btn ${Ae!==null?"btn--primary":""}" id="beacon-toggle-btn" type="button">
          ${Ae!==null?"Sharing Location":"Share Location"}
        </button>
        ${Ae!==null?'<span class="settings-hint" style="margin: 0;">Your approximate area is visible to group members</span>':""}
      </div>
      <div style="margin-top: 0.75rem;">
        <label class="input-label" style="margin-bottom: 0.25rem;">
          <span>Location Precision</span>
        </label>
        <input type="range" id="precision-slider" min="1" max="9" value="${o}" style="width: 100%; accent-color: #f59e0b;" />
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-top: 0.25rem;">
          <span class="settings-hint" id="precision-label">${qa[o]}</span>
          <span class="settings-hint" style="opacity: 0.5; font-size: 0.7rem;">Emergency: full GPS</span>
        </div>
      </div>
      <div class="beacon-list" id="beacon-list"></div>
    </section>
  `;const s=e.querySelector("#precision-slider"),i=e.querySelector("#precision-label");s?.addEventListener("input",()=>{const a=Number(s.value);i&&(i.textContent=qa[a]??"")}),s?.addEventListener("change",()=>{const a=Number(s.value),{activeGroupId:c}=R();c&&(W(c,{beaconPrecision:a}),Ae!==null&&(Fa(),fs()))}),e.querySelector("#beacon-toggle-btn")?.addEventListener("click",()=>{Ae!==null?Fa():fs(),eu(e)});try{await Qv(),e0()}catch{e.querySelector(".beacon-map").innerHTML='<p style="color: var(--text-muted); text-align: center; padding: 2rem;">Map unavailable offline</p>'}}function e0(){const e=document.getElementById("beacon-map");if(!e||te||!Ue)return;const n=document.documentElement.dataset.theme!=="light"?"https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json":"https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";te=new Ue.Map({container:e,style:n,center:[-.1278,51.5074],zoom:12}),te.on("load",()=>{co=!0,console.info("[canary:beacon] map loaded, positions to catch up:",Object.keys(ye).length),te.addSource("geohash-circles",{type:"geojson",data:Xd()}),te.addLayer({id:"geohash-fill",type:"fill",source:"geohash-circles",paint:{"fill-color":["get","colour"],"fill-opacity":["case",["get","duress"],.35,.2]}}),te.addLayer({id:"geohash-stroke",type:"line",source:"geohash-circles",paint:{"line-color":["get","colour"],"line-width":2.5,"line-opacity":["case",["get","duress"],.9,.6]}});for(const[r,o]of Object.entries(ye))lo(r,o.lat,o.lon);Object.keys(ye).length>0&&uo()})}function xi(){const{activeGroupId:e}=R();e&&W(e,{lastPositions:{...ye}})}function Pn(){if(!te||!co)return;const e=te.getSource("geohash-circles");e&&e.setData(Xd())}function Fa(){Ae!==null&&(navigator.geolocation.clearWatch(Ae),Ae=null);const{identity:e}=R();e?.pubkey&&(delete ye[e.pubkey],delete ki[e.pubkey],ht[e.pubkey]&&(ht[e.pubkey].remove(),delete ht[e.pubkey]),Pn(),fo())}function fs(){if(Ae!==null||!("geolocation"in navigator))return;const{groups:e,activeGroupId:t,identity:n}=R();if(!t||!e[t]||!n?.pubkey)return;const r=e[t],o=yi(r.seed),s=r.beaconPrecision||4;Ae=navigator.geolocation.watchPosition(async i=>{const a=wi(i.coords.latitude,i.coords.longitude,s),c=Zd(a),l=c.lat,d=c.lon,u=await Cd(o,a,s);n?.pubkey&&(ki[n.pubkey]=u,ye[n.pubkey]={lat:l,lon:d,geohash:a,precision:s,timestamp:Math.floor(Date.now()/1e3)},lo(n.pubkey,l,d),Pn(),uo(),fo(),xi(),t&&Se(t,{type:"beacon",lat:l,lon:d,accuracy:Ei(s),timestamp:Math.floor(Date.now()/1e3),opId:crypto.randomUUID()}))},i=>{console.warn("[canary:beacon] watchPosition error",i.code,i.message)},{enableHighAccuracy:!1,maximumAge:6e4,timeout:15e3})}function lo(e,t,n){if(!te||!Ue){console.warn("[canary:beacon] updateMapMarker skipped — map not ready",{map:!!te,maplibregl:!!Ue,pubkey:e.slice(0,8)});return}const r=_i(e),o=ao.has(e),s=tu(e),i=an(e),a=!!i?.picture,c=o?40:32;if(ht[e]){ht[e].setLngLat([n,t]);const l=ht[e].getElement(),d=l.querySelector(".beacon-dot");d&&(a||(d.style.background=r),d.style.width=`${c}px`,d.style.height=`${c}px`,d.style.borderColor=r,d.style.boxShadow=`0 0 10px ${r}80`,d.style.animation=o?"beacon-pulse 1s ease-in-out infinite":"none");const u=l.querySelector(".beacon-label");u&&(u.textContent=s)}else{const l=document.createElement("div");l.style.display="flex",l.style.flexDirection="column",l.style.alignItems="center",l.style.pointerEvents="none";let d;a?(d=document.createElement("img"),d.src=i.picture,d.style.objectFit="cover"):(d=document.createElement("div"),d.style.background=r),d.className="beacon-dot",d.style.width=`${c}px`,d.style.height=`${c}px`,d.style.borderRadius="50%",d.style.border=`3px solid ${r}`,d.style.boxShadow=`0 0 10px ${r}80`,d.style.zIndex="2",o&&(d.style.animation="beacon-pulse 1s ease-in-out infinite"),l.appendChild(d);const u=document.createElement("div");u.className="beacon-label",u.textContent=s,u.style.fontSize="11px",u.style.fontWeight="600",u.style.color="#fff",u.style.textShadow="0 1px 3px rgba(0,0,0,0.8)",u.style.marginTop="2px",u.style.whiteSpace="nowrap",l.appendChild(u),ht[e]=new Ue.Marker({element:l,anchor:"center"}).setLngLat([n,t]).addTo(te)}}function uo(){if(!te)return;const e=Object.values(ye);if(e.length===0)return;if(e.length===1){te.flyTo({center:[e[0].lon,e[0].lat],zoom:13});return}const t=e.map(r=>r.lon),n=e.map(r=>r.lat);te.fitBounds([[Math.min(...t),Math.min(...n)],[Math.max(...t),Math.max(...n)]],{padding:60,maxZoom:14})}function tu(e){const{groups:t,activeGroupId:n,identity:r}=R(),o=n?t[n]:null,s=r?.pubkey===e;let i;const a=o?.memberNames?.[e];return a&&a!=="You"&&(i=a),i||(i=gi(e)),s?i?`${i} (you)`:"You":i||`${e.slice(0,8)}…`}function fo(){const e=document.getElementById("beacon-list");if(!e)return;const t=Object.entries(ye).map(([n,r])=>{const o=_i(n),s=tu(n),i=an(n),a=Math.floor(Date.now()/1e3)-r.timestamp,c=a<60?"just now":a<3600?`${Math.floor(a/60)}m ago`:`${Math.floor(a/3600)}h ago`;return`
      <div class="beacon-entry" style="display:flex;align-items:center;gap:0.5rem;padding:0.25rem 0;">
        ${i?.picture?`<img src="${q(i.picture)}" alt="" style="width:20px;height:20px;border-radius:50%;object-fit:cover;flex-shrink:0;border:2px solid ${o};" />`:`<span style="width:8px;height:8px;border-radius:50%;background:${o};flex-shrink:0;"></span>`}
        <span class="beacon-member" style="font-weight:500;">${q(s)}</span>
        <span class="beacon-geohash" style="color:var(--text-muted);font-size:0.8rem;">${q(r.geohash)}</span>
        <span style="color:var(--text-muted);font-size:0.75rem;margin-left:auto;">${q(c)}</span>
      </div>
    `}).join("");e.innerHTML=t||'<p class="settings-hint">No beacons yet — enable location to start</p>'}document.addEventListener("canary:duress",(e=>{const{members:t}=e.detail;if(!t?.length)return;for(const r of t)ao.add(r),t0(r);Pn();const n=t.map(r=>ye[r]).filter(Boolean);if(te&&n.length===1)te.flyTo({center:[n[0].lon,n[0].lat],zoom:14});else if(te&&n.length>1){const r=n.map(s=>s.lon),o=n.map(s=>s.lat);te.fitBounds([[Math.min(...r),Math.min(...o)],[Math.max(...r),Math.max(...o)]],{padding:60})}}));function t0(e){const t=ht[e];if(!t)return;const n=t.getElement();n.style.background="#f87171",n.style.width="14px",n.style.height="14px",n.style.boxShadow="0 0 12px rgba(248, 113, 113, 0.6)"}function n0(){if(console.info("[canary:beacon] sendLocationPing called",{hasGeo:"geolocation"in navigator,map:!!te,mapReady:co}),!("geolocation"in navigator))return;const{groups:e,activeGroupId:t,identity:n}=R();if(!t||!e[t]||!n?.pubkey){console.warn("[canary:beacon] sendLocationPing: missing state",{activeGroupId:t,hasPubkey:!!n?.pubkey});return}const r=e[t],o=yi(r.seed),s=r.beaconPrecision||4;Ae===null&&fs(),navigator.geolocation.getCurrentPosition(async i=>{const a=wi(i.coords.latitude,i.coords.longitude,s),c=Zd(a),l=c.lat,d=c.lon,u=await Cd(o,a,s);n?.pubkey&&(ki[n.pubkey]=u,ye[n.pubkey]={lat:l,lon:d,geohash:a,precision:s,timestamp:Math.floor(Date.now()/1e3)},lo(n.pubkey,l,d),Pn(),uo(),fo(),xi(),t&&Se(t,{type:"beacon",lat:l,lon:d,accuracy:Ei(s),timestamp:Math.floor(Date.now()/1e3),opId:crypto.randomUUID()}))},i=>{console.warn("[canary:beacon] getCurrentPosition FAILED",i.code,i.message),ke(async()=>{const{showToast:a}=await Promise.resolve().then(()=>ib);return{showToast:a}},void 0,import.meta.url).then(({showToast:a})=>{i.code===1?a("Location permission denied","error",3e3):i.code===3?a("Location request timed out","error",3e3):a("Could not get location","error",3e3)})},{enableHighAccuracy:!1,maximumAge:3e4,timeout:1e4})}function r0(e,t,n,r,o){const s=o0(r),i=wi(t,n,s);ye[e]={lat:t,lon:n,geohash:i,precision:s,timestamp:o},lo(e,t,n),Pn(),uo(),fo(),xi()}function o0(e){return e<=3?9:e<=20?8:e<=80?7:e<=620?6:e<=2500?5:e<=2e4?4:e<=8e4?3:e<=63e4?2:1}function s0(e){return new Date(e*1e3).toISOString().slice(11,19)+" UTC"}function i0(e,t){return e<=t?"green":e<=t*1.25?"amber":"red"}function a0(e,t){return e<60?s0(t):e<3600?`${Math.floor(e/60)}m ago`:e<86400?`${Math.floor(e/3600)}h ago`:`${Math.floor(e/86400)}d ago`}const c0=[{label:"1h",value:3600},{label:"4h",value:14400},{label:"24h",value:86400},{label:"7d",value:604800}];function l0(e){const{groups:t,activeGroupId:n,identity:r}=R();if(!n||!t[n]){e.innerHTML="";return}const o=t[n],s=Math.floor(Date.now()/1e3),i=o.livenessInterval,a=o.members.map(d=>{const u=o.livenessCheckins[d]??0,f=u>0,h=f?s-u:1/0,p=f?i0(h,i):"grey",m=f?Math.max(0,Math.min(100,(1-h/i)*100)):0,y=r?.pubkey===d,E=o.memberNames?.[d],S=y?"You":E??`${d.slice(0,8)}…`;return`
      <li class="liveness-item liveness-item--${p}">
        <span class="liveness-dot liveness-dot--${p}"></span>
        <span class="liveness-name">${q(S)}</span>
        <span class="liveness-time">${f?a0(h,u):"awaiting first check-in"}</span>
        <div class="liveness-bar">
          <div class="liveness-bar__fill liveness-bar__fill--${p}" style="width: ${m}%"></div>
        </div>
      </li>
    `}).join(""),c=r?.pubkey!=null&&o.members.includes(r.pubkey),l=c0.map(d=>`<button class="segmented__btn ${i===d.value?"segmented__btn--active":""}" data-liveness-interval="${d.value}">${d.label}</button>`).join("");e.innerHTML=`
    <section class="panel liveness-panel">
      <h3 class="panel__title">Liveness</h3>

      <div class="settings-section">
        <span class="input-label">Check-in interval</span>
        <div class="segmented" id="liveness-interval-picker">
          ${l}
        </div>
        <p class="settings-hint">How often members must check in</p>
      </div>

      <ul class="liveness-list" id="liveness-list">
        ${a}
      </ul>
      ${c?`
        <button class="btn btn--primary" id="checkin-btn" type="button">I'm Alive</button>
      `:""}
    </section>
  `,e.querySelectorAll("[data-liveness-interval]").forEach(d=>{d.addEventListener("click",()=>{const u=Number(d.dataset.livenessInterval);W(n,{livenessInterval:u})})}),document.getElementById("checkin-btn")?.addEventListener("click",()=>{try{const{identity:d,activeGroupId:u,groups:f}=R();if(!d?.pubkey||!u){console.warn("[canary:liveness] No identity or activeGroupId",{pubkey:d?.pubkey,gid:u});return}const h=f[u];if(!h){console.warn("[canary:liveness] Group not found",u);return}const p=Math.floor(Date.now()/1e3),m=rn(p,h.rotationInterval);gg(h.seed,"canary:liveness",d.pubkey,m);const y={...h.livenessCheckins,[d.pubkey]:p};W(u,{livenessCheckins:y}),Se(u,{type:"liveness-checkin",pubkey:d.pubkey,timestamp:p,opId:crypto.randomUUID()}),n0(),setTimeout(()=>{document.getElementById("beacon-container")?.scrollIntoView({behavior:"smooth",block:"center"})},300),Y("Check-in sent — location updated","success",2e3)}catch(d){console.error("[canary:liveness] Check-in failed:",d),Y("Check-in failed","error",3e3)}})}function Ga(e){if(e.startsWith("wss://"))return!0;if(e.startsWith("ws://"))try{const t=new URL(e);return t.hostname==="localhost"||t.hostname==="127.0.0.1"||t.hostname==="[::1]"}catch{return!1}return!1}let Dt=!1;function d0(e){const{groups:t,activeGroupId:n}=R();if(!n||!t[n]){e.innerHTML="";return}const r=t[n],{identity:o}=R(),s=!!o?.pubkey&&r.admins.includes(o.pubkey);e.innerHTML=`
    <div class="settings-drawer" id="settings-drawer">
      <button class="settings-toggle" id="settings-toggle">
        <span>Group Settings</span>
        <span class="settings-chevron" style="${Dt?"transform: rotate(90deg);":""}">&#9658;</span>
      </button>

      <div class="settings-body" id="settings-body"${Dt?"":" hidden"}>
        <!-- Group Name -->
        <label class="input-label">Name
          <input class="input" id="settings-name" value="${q(r.name)}">
        </label>

        <!-- Rotation Interval -->
        <div class="settings-section">
          <span class="input-label">Rotation</span>
          <div class="segmented">
            <button class="segmented__btn ${r.rotationInterval===30?"segmented__btn--active":""}" data-interval="30">30s</button>
            <button class="segmented__btn ${r.rotationInterval===86400?"segmented__btn--active":""}" data-interval="86400">24h</button>
            <button class="segmented__btn ${r.rotationInterval===604800?"segmented__btn--active":""}" data-interval="604800">7d</button>
            <button class="segmented__btn ${r.rotationInterval===2592e3?"segmented__btn--active":""}" data-interval="2592000">30d</button>
          </div>
          <p class="settings-hint">How often the verification word changes</p>
        </div>

        ${r.encodingFormat==="words"?`
        <!-- Word Count -->
        <div class="settings-section">
          <span class="input-label">Words</span>
          <div class="segmented">
            <button class="segmented__btn ${r.wordCount===1?"segmented__btn--active":""}" data-words="1">1</button>
            <button class="segmented__btn ${r.wordCount===2?"segmented__btn--active":""}" data-words="2">2</button>
            <button class="segmented__btn ${r.wordCount===3?"segmented__btn--active":""}" data-words="3">3</button>
          </div>
          <p class="settings-hint">More words = stronger security</p>
        </div>
        `:""}

        <!-- Encoding Format -->
        <div class="settings-section">
          <span class="input-label">Display Format</span>
          <div class="segmented">
            <button class="segmented__btn ${r.encodingFormat==="words"?"segmented__btn--active":""}" data-enc="words">Word</button>
            <button class="segmented__btn ${r.encodingFormat==="pin"?"segmented__btn--active":""}" data-enc="pin">PIN</button>
            <button class="segmented__btn ${r.encodingFormat==="hex"?"segmented__btn--active":""}" data-enc="hex">Hex</button>
          </div>
          <p class="settings-hint">Words for voice, PINs for digital input, Hex for machine-to-machine</p>
        </div>

        <!-- Tolerance Window -->
        <div class="settings-section">
          <span class="input-label">Tolerance</span>
          <div class="segmented">
            <button class="segmented__btn ${r.tolerance===0?"segmented__btn--active":""}" data-tolerance="0">0</button>
            <button class="segmented__btn ${r.tolerance===1?"segmented__btn--active":""}" data-tolerance="1">+/-1</button>
            <button class="segmented__btn ${r.tolerance===2?"segmented__btn--active":""}" data-tolerance="2">+/-2</button>
            <button class="segmented__btn ${r.tolerance===3?"segmented__btn--active":""}" data-tolerance="3">+/-3</button>
          </div>
          <p class="settings-hint">Accept words from neighbouring time windows (higher = more forgiving, less secure)</p>
        </div>

        <!-- Duress Mode -->
        <div class="settings-section">
          <span class="input-label">Emergency Alert Mode</span>
          <div class="segmented">
            <button class="segmented__btn ${r.duressMode==="immediate"||!r.duressMode?"segmented__btn--active":""}" data-duress-mode="immediate">Immediate</button>
            <button class="segmented__btn ${r.duressMode==="dead-drop"?"segmented__btn--active":""}" data-duress-mode="dead-drop">Dead Drop</button>
            <button class="segmented__btn ${r.duressMode==="both"?"segmented__btn--active":""}" data-duress-mode="both">Both</button>
          </div>
          <p class="settings-hint">Immediate alerts members now. Dead drop records silently for later retrieval.</p>
        </div>

        <!-- Nostr Sync Toggle -->
        <div class="settings-section">
          <label class="toggle-label">
            <input type="checkbox" id="nostr-toggle" ${r.nostrEnabled?"checked":""}>
            <span>Nostr Sync</span>
          </label>
          <div class="nostr-settings" id="nostr-settings"${r.nostrEnabled?"":" hidden"}>
            <!-- Identity -->
            <div class="nostr-identity" id="nostr-identity">
              <span class="settings-hint">Loading identity…</span>
            </div>

            <!-- Write relays (publishing) -->
            <div class="nostr-relays">
              <span class="input-label">Write Relays <span class="settings-hint" style="font-weight:normal;">(publishing)</span></span>
              <ul class="relay-list" id="write-relay-list">
                ${(r.writeRelays??[]).map((a,c)=>`
                  <li class="relay-item">
                    <span class="relay-url">${q(a)}</span>
                    <button class="btn btn--ghost btn--sm write-relay-remove" data-relay-index="${c}" aria-label="Remove write relay">✕</button>
                  </li>
                `).join("")}
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
                ${(r.readRelays??[]).map((a,c)=>`
                  <li class="relay-item">
                    <span class="relay-url">${q(a)}</span>
                    <button class="btn btn--ghost btn--sm read-relay-remove" data-relay-index="${c}" aria-label="Remove read relay">✕</button>
                  </li>
                `).join("")}
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
                ${$t()?`Connected to ${Lt()} relay${Lt()===1?"":"s"}`:"Not connected"}
              </span>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="settings-actions">
          <button class="btn btn--ghost" id="export-btn">Export Group</button>
          <button class="btn btn--ghost" id="import-btn">Import Group</button>
          ${s?'<button class="btn btn--warning" id="reseed-btn">Rotate Key</button>':""}
          ${s?'<button class="btn btn--danger" id="compromise-reseed-btn">Compromise Reseed</button>':""}
          <button class="btn btn--danger" id="dissolve-btn">Dissolve Group</button>
        </div>
      </div>
    </div>
  `,document.getElementById("settings-toggle").addEventListener("click",()=>{Dt=!Dt;const a=document.getElementById("settings-body"),c=e.querySelector(".settings-chevron");a.hidden=!Dt,c.style.transform=Dt?"rotate(90deg)":""}),document.getElementById("settings-name").addEventListener("change",a=>{const c=a.target.value.trim();c&&W(n,{name:c})}),e.querySelectorAll("[data-interval]").forEach(a=>{a.addEventListener("click",()=>{W(n,{rotationInterval:Number(a.dataset.interval)})})}),e.querySelectorAll("[data-words]").forEach(a=>{a.addEventListener("click",()=>{W(n,{wordCount:Number(a.dataset.words)})})}),e.querySelectorAll("[data-enc]").forEach(a=>{a.addEventListener("click",()=>{W(n,{encodingFormat:a.dataset.enc})})}),e.querySelectorAll("[data-tolerance]").forEach(a=>{a.addEventListener("click",()=>{W(n,{tolerance:Number(a.dataset.tolerance)})})}),e.querySelectorAll("[data-duress-mode]").forEach(a=>{a.addEventListener("click",()=>{W(n,{duressMode:a.dataset.duressMode})})}),document.getElementById("nostr-toggle").addEventListener("change",a=>{const c=a.target.checked;W(n,{nostrEnabled:c});const l=document.getElementById("nostr-settings");if(l.hidden=!c,c){const d=R().groups[n],u=d?.readRelays??[],f=d?.writeRelays??[];Le(u,f,n).then(()=>{Va()}),Ka()}else Rn(),bd(),An(!1,0),Va()});function i(){const a=R().groups[n];a?.nostrEnabled&&Le(a.readRelays??[],a.writeRelays??[],n)}e.querySelectorAll(".write-relay-remove").forEach(a=>{a.addEventListener("click",()=>{const c=Number(a.dataset.relayIndex),l=[...R().groups[n]?.writeRelays??[]];l.splice(c,1),W(n,{writeRelays:l}),i()})}),e.querySelectorAll(".read-relay-remove").forEach(a=>{a.addEventListener("click",()=>{const c=Number(a.dataset.relayIndex),l=[...R().groups[n]?.readRelays??[]];l.splice(c,1),W(n,{readRelays:l}),i()})}),document.getElementById("write-relay-add-btn").addEventListener("click",()=>{const a=document.getElementById("write-relay-add-input"),c=a.value.trim();if(!Ga(c)){a.focus();return}const l=[...R().groups[n]?.writeRelays??[]];l.includes(c)?a.value="":(l.push(c),W(n,{writeRelays:l}),a.value="",i())}),document.getElementById("read-relay-add-btn").addEventListener("click",()=>{const a=document.getElementById("read-relay-add-input"),c=a.value.trim();if(!Ga(c)){a.focus();return}const l=[...R().groups[n]?.readRelays??[]];l.includes(c)?a.value="":(l.push(c),W(n,{readRelays:l}),a.value="",i())}),document.getElementById("write-relay-add-input").addEventListener("keydown",a=>{a.key==="Enter"&&document.getElementById("write-relay-add-btn").click()}),document.getElementById("read-relay-add-input").addEventListener("keydown",a=>{a.key==="Enter"&&document.getElementById("read-relay-add-btn").click()}),r.nostrEnabled&&Ka(),document.getElementById("reseed-btn")?.addEventListener("click",()=>{const{groups:a}=R(),c=a[n],d=(c?Br(c)==="online":!1)?"Rotate the group key? This broadcasts the new key to all members via the relay.":"Rotate the group key? Remaining members will need to re-sync via Share State.";confirm(d)&&(Ob(n),Y("Key rotated. New verification words are active.","warning",6e3))}),document.getElementById("compromise-reseed-btn")?.addEventListener("click",()=>{confirm("Compromise reseed? This generates a new key WITHOUT broadcasting. All members will need new invites.")&&(Bb(n),Y("Emergency reseed complete. No broadcast sent — share new invites with all members.","warning",8e3))}),document.getElementById("dissolve-btn").addEventListener("click",()=>{confirm(`Dissolve "${r.name}"? This cannot be undone.`)&&Mb(n)}),document.getElementById("export-btn").addEventListener("click",()=>{if(!confirm("This exports the group secret in cleartext. Treat the file like a password."))return;const a=new Blob([JSON.stringify(r,null,2)],{type:"application/json"}),c=URL.createObjectURL(a),l=document.createElement("a");l.href=c,l.download=`canary-${r.name.toLowerCase().replace(/\s+/g,"-")}.json`,l.click(),URL.revokeObjectURL(c)}),document.getElementById("import-btn").addEventListener("click",()=>{if(!confirm("Only import files from trusted sources — the file contains the group secret."))return;const a=document.createElement("input");a.type="file",a.accept=".json",a.addEventListener("change",async()=>{const c=a.files?.[0];if(c)try{const l=await c.text(),d=JSON.parse(l);Db(d);const u=crypto.randomUUID(),f={id:u,name:String(d.name),seed:String(d.seed),members:d.members.filter(p=>typeof p=="string"),memberNames:{},nostrEnabled:!1,relays:[],wordlist:typeof d.wordlist=="string"?d.wordlist:"en-v1",wordCount:[1,2,3].includes(d.wordCount)?d.wordCount:2,counter:typeof d.counter=="number"&&d.counter>=0?d.counter:0,usageOffset:typeof d.usageOffset=="number"&&d.usageOffset>=0?d.usageOffset:0,rotationInterval:typeof d.rotationInterval=="number"&&d.rotationInterval>0?d.rotationInterval:86400,encodingFormat:["words","pin","hex"].includes(d.encodingFormat)?d.encodingFormat:"words",usedInvites:[],latestInviteIssuedAt:0,livenessInterval:typeof d.rotationInterval=="number"&&d.rotationInterval>0?d.rotationInterval:86400,livenessCheckins:{},tolerance:typeof d.tolerance=="number"&&d.tolerance>=0&&d.tolerance<=10?d.tolerance:1,beaconInterval:typeof d.beaconInterval=="number"&&d.beaconInterval>0?d.beaconInterval:60,beaconPrecision:typeof d.beaconPrecision=="number"&&d.beaconPrecision>0?d.beaconPrecision:6,duressMode:["immediate","dead-drop","both"].includes(d.duressMode)?d.duressMode:"immediate",createdAt:typeof d.createdAt=="number"?d.createdAt:Math.floor(Date.now()/1e3),admins:Array.isArray(d.admins)?d.admins.filter(p=>typeof p=="string"):[],epoch:typeof d.epoch=="number"&&d.epoch>=0?d.epoch:0,consumedOps:Array.isArray(d.consumedOps)?d.consumedOps.filter(p=>typeof p=="string"):[]},{groups:h}=R();ee({groups:{...h,[u]:f},activeGroupId:u})}catch{alert("Could not import group file. Check the file format.")}}),a.click()})}function Ka(){const e=document.getElementById("nostr-identity");if(!e)return;const{identity:t}=R();if(!t?.pubkey){e.innerHTML='<span class="settings-hint">No identity available.</span>';return}const n=`${t.pubkey.slice(0,8)}…${t.pubkey.slice(-8)}`;e.innerHTML=`
    <div class="nostr-identity-row">
      <span class="input-label">Identity (Local key)</span>
      <span class="relay-url nostr-pubkey" title="${q(t.pubkey)}">${q(n)}</span>
    </div>
    <p class="settings-hint">Your identity is stored locally on this device.</p>
  `}function Va(){const e=document.getElementById("nostr-conn-status");if(!e)return;const t=Lt();e.textContent=$t()?`Connected to ${t} relay${t===1?"":"s"}`:"Not connected"}new TextEncoder;function nu(){const e=new Uint8Array(32);return crypto.getRandomValues(e),e}const Nn=Object.freeze({call:Object.freeze({wordCount:1,rotationSeconds:30,tolerance:1,directional:!0,description:"Phone verification for insurance, banking, and call centres. Single word with 30-second rotation. Deepfake-proof — cloning a voice does not help derive the current word."}),handoff:Object.freeze({wordCount:1,rotationSeconds:0,tolerance:0,directional:!0,description:"Physical handoff verification for rideshare, delivery, and task completion. Single-use token per event. No time dependency — counter is the task/event ID."})});function hs(e){const t=e.preset?Nn[e.preset]:void 0,n=e.rotationSeconds??t?.rotationSeconds??30,r=e.tolerance??t?.tolerance??0,o=t?.wordCount??1,s=e.encoding??{format:"words",count:o};if(e.roles[0]===e.roles[1])throw new Error(`Roles must be distinct, got ["${e.roles[0]}", "${e.roles[1]}"]`);if(e.myRole!==e.roles[0]&&e.myRole!==e.roles[1])throw new Error(`myRole "${e.myRole}" is not one of the configured roles ["${e.roles[0]}", "${e.roles[1]}"]`);if(!Number.isInteger(n)||n<0)throw new RangeError(`rotationSeconds must be a non-negative integer, got ${n}`);if(!Number.isInteger(r)||r<0)throw new RangeError(`tolerance must be a non-negative integer, got ${r}`);if(r>gt)throw new RangeError(`tolerance must be <= ${gt}, got ${r}`);if(n===0&&e.counter===void 0)throw new Error("Fixed counter mode (rotationSeconds=0) requires config.counter");if(n===0&&e.counter!==void 0&&(!Number.isInteger(e.counter)||e.counter<0||e.counter>4294967295))throw new RangeError(`counter must be an integer 0–${4294967295}, got ${e.counter}`);if(n>0&&e.counter!==void 0)throw new Error("counter must not be set when rotationSeconds > 0 (counter is derived from time)");const i=typeof e.secret=="string"?F(e.secret):e.secret,a=e.roles[0]===e.myRole?e.roles[1]:e.roles[0],c=`${e.namespace}:${e.myRole}`,l=`${e.namespace}:${a}`,d=n===0;function u(f){if(d){if(e.counter===void 0)throw new Error("Fixed counter mode (rotationSeconds=0) requires config.counter");return e.counter}const h=f??Math.floor(Date.now()/1e3);return Math.floor(h/n)}return{counter:u,myToken(f){return Ke(i,c,u(f),s)},theirToken(f){return Ke(i,l,u(f),s)},verify(f,h){const p=[];return e.theirIdentity&&p.push(e.theirIdentity),nd(i,l,u(h),f,p,{encoding:s,tolerance:r})},pair(f){return bg(i,e.namespace,e.roles,u(f),s)}}}const bn={insurance:{label:"Insurance",namespace:"aviva",roles:["caller","agent"],preset:"call"},pickup:{label:"Pickup",namespace:"family",roles:["child","adult"],preset:"handoff"},rideshare:{label:"Rideshare",namespace:"dispatch",roles:["requester","driver"],preset:"handoff",encoding:"pin"}};let Si=nu(),X=bn.insurance,jt,ur,fr=null,Ii=1;function ps(){const e=X.preset==="handoff",t=X.encoding==="pin"?{format:"pin",digits:4}:void 0,n={secret:Si,namespace:X.namespace,roles:X.roles,preset:X.preset,...e?{counter:Ii}:{},...t?{encoding:t}:{}};jt=hs({...n,myRole:X.roles[0],theirIdentity:X.roles[1]}),ur=hs({...n,myRole:X.roles[1],theirIdentity:X.roles[0]})}ps();function nr(e,t){const n=X.preset==="handoff",r=Nn[X.preset],o=n?Ii:Math.floor((t??Math.floor(Date.now()/1e3))/r.rotationSeconds),s=`${X.namespace}:${e}`,i=X.encoding==="pin"?{format:"pin",digits:4}:{format:"words",count:1};return li(Si,s,e,o,i,r.tolerance)}function hr(){fr!==null&&(clearInterval(fr),fr=null)}function rr(e){if(e<=0)return"0s";const t=Math.floor(e/60),n=Math.floor(e%60);return t>0?`${t}m ${n}s`:`${n}s`}function za(e){if(e===0)return 0;const t=Math.floor(Date.now()/1e3),r=(Math.floor(t/e)+1)*e;return Math.max(0,r-t)}function pr(e){hr();const t=Math.floor(Date.now()/1e3),n=X.preset==="handoff",r=n?0:Nn[X.preset].rotationSeconds,o=za(r),s=r>0?Math.min(100,(r-o)/r*100):100,i=X.roles[0],a=X.roles[1];e.innerHTML=`
    <div class="call-sim">
      <div class="call-sim__header">
        <h2 class="call-sim__title">CANARY Call Verification Demo</h2>
        <div class="call-sim__scenarios" id="call-scenarios">
          ${Object.entries(bn).map(([m,y])=>`<button class="btn call-sim__scenario-btn${X===y?" call-sim__scenario-btn--active":""}" data-scenario="${m}">${y.label}</button>`).join("")}
        </div>
      </div>

      <div class="call-sim__panels">
        <div class="call-sim__panel call-sim__panel--caller">
          <h3 class="call-sim__role">${i.toUpperCase()}</h3>
          <div class="call-sim__token-group">
            <span class="call-sim__label">Your code — tap to reveal:</span>
            <div class="call-sim__token call-sim__token--reveal" id="caller-reveal" data-real="${jt.myToken(t)}" data-alt="${nr(i,t)}">••••••••</div>
          </div>
          ${n?'<span class="call-sim__countdown">Single-use</span>':`
          <div class="call-sim__progress"><div class="call-sim__progress-bar" id="caller-progress" style="width: ${s}%"></div></div>
          <span class="call-sim__countdown" id="caller-countdown">${rr(o)}</span>
          `}
          <div class="call-sim__verify">
            <input type="text" class="input call-sim__input" id="caller-verify-input" placeholder="Type ${a}'s word..." autocomplete="off" />
            <button class="btn btn--primary call-sim__verify-btn" id="caller-verify-btn">Verify</button>
          </div>
          <div class="call-sim__result" id="caller-result" hidden></div>
        </div>

        <div class="call-sim__divider"></div>

        <div class="call-sim__panel call-sim__panel--agent">
          <h3 class="call-sim__role">${a.toUpperCase()}</h3>
          <div class="call-sim__token-group">
            <span class="call-sim__label">Your code — tap to reveal:</span>
            <div class="call-sim__token call-sim__token--reveal" id="agent-reveal" data-real="${ur.myToken(t)}" data-alt="${nr(a,t)}">••••••••</div>
          </div>
          ${n?'<span class="call-sim__countdown">Single-use</span>':`
          <div class="call-sim__progress"><div class="call-sim__progress-bar" id="agent-progress" style="width: ${s}%"></div></div>
          <span class="call-sim__countdown" id="agent-countdown">${rr(o)}</span>
          `}
          <div class="call-sim__verify">
            <input type="text" class="input call-sim__input" id="agent-verify-input" placeholder="Type ${i}'s word..." autocomplete="off" />
            <button class="btn btn--primary call-sim__verify-btn" id="agent-verify-btn">Verify</button>
          </div>
          <div class="call-sim__result" id="agent-result" hidden></div>
        </div>
      </div>

      <div class="call-sim__banner call-sim__banner--valid" id="call-verified-banner" hidden></div>

      <div class="call-sim__footer">
        <span class="call-sim__meta">Namespace: <strong>${X.namespace}</strong></span>
        <span class="call-sim__meta">Rotation: <strong>${n?"single-use":r+"s"}</strong></span>
        <span class="call-sim__meta">Encoding: <strong>${X.encoding??"words"}</strong></span>
        <span class="call-sim__meta">Tolerance: <strong>+/-${n?"0":Nn[X.preset].tolerance}</strong></span>
        <button class="btn" id="call-reset-seed">Reset seed</button>
      </div>

      <div class="call-sim__pair" id="call-pair">
        <span class="call-sim__meta">Pair: <code id="pair-display"></code></span>
      </div>
    </div>
  `,e.querySelector("#call-scenarios")?.addEventListener("click",m=>{const y=m.target.closest("[data-scenario]");if(!y)return;const E=y.dataset.scenario;bn[E]&&bn[E]!==X&&(X=bn[E],ps(),pr(e))}),e.querySelector("#call-reset-seed")?.addEventListener("click",()=>{Si=nu(),X.preset==="handoff"&&Ii++,ps(),pr(e)});let c=!1,l=!1,d=!1;function u(){if(!d&&c&&l){hr();const m=e.querySelector("#call-verified-banner");m&&(m.hidden=!1,m.textContent="Call Verified — both parties authenticated"),e.querySelectorAll(".call-sim__progress, .call-sim__countdown").forEach(y=>{y.hidden=!0})}}function f(m,y,E,S,L){const O=e.querySelector(`#${m}`),P=e.querySelector(`#${y}`),$=e.querySelector(`#${E}`);if(!O||!P||!$)return;function v(){const b=O.value.trim();if(!b)return;const g=S.verify(b);$.hidden=!1,$.className="call-sim__result",g.status==="valid"?($.classList.add("call-sim__result--valid"),$.textContent="Verified ✓",L==="caller"?c=!0:l=!0,u()):g.status==="duress"?($.classList.add("call-sim__result--invalid"),$.textContent="Failed ✗",d=!0):($.classList.add("call-sim__result--invalid"),$.textContent="Failed ✗")}P.addEventListener("click",v),O.addEventListener("keydown",b=>{b.key==="Enter"&&v()})}f("caller-verify-input","caller-verify-btn","caller-result",jt,"caller"),f("agent-verify-input","agent-verify-btn","agent-result",ur,"agent");function h(m){const y=e.querySelector(`#${m}`);if(!y)return;function E(L){L.preventDefault();const O=y.getBoundingClientRect(),P=L.clientX-O.left;y.textContent=P<O.width/2?y.dataset.real:y.dataset.alt}function S(){y.textContent="••••••••"}y.addEventListener("pointerdown",E),y.addEventListener("pointerup",S),y.addEventListener("pointerleave",S),y.addEventListener("pointercancel",S)}h("caller-reveal"),h("agent-reveal");const p=e.querySelector("#pair-display");if(p){const m=jt.pair(t),y=Object.entries(m).map(([E,S])=>`${E}: ${S}`).join(" | ");p.textContent=y}!n&&r>0&&(fr=setInterval(()=>{const m=za(r),y=Math.min(100,(r-m)/r*100),E=e.querySelector("#caller-progress"),S=e.querySelector("#agent-progress"),L=e.querySelector("#caller-countdown"),O=e.querySelector("#agent-countdown"),P=Math.max(0,100-y),$=P>50?`hsl(${Math.round(120*(P/100))}, 70%, 45%)`:`hsl(${Math.round(120*(P/100))}, 80%, 45%)`;E&&(E.style.width=`${y}%`,E.style.background=$),S&&(S.style.width=`${y}%`,S.style.background=$),L&&(L.textContent=rr(m)),O&&(O.textContent=rr(m));const v=Math.floor(Date.now()/1e3),b=e.querySelector("#caller-reveal"),g=e.querySelector("#agent-reveal"),k=jt.myToken(v),_=b&&b.dataset.real!==k;if(b&&(b.dataset.real=k,b.dataset.alt=nr(i,v)),g&&(g.dataset.real=ur.myToken(v),g.dataset.alt=nr(a,v)),_){c=!1,l=!1,d=!1;const w=e.querySelector("#caller-result"),I=e.querySelector("#agent-result");w&&(w.hidden=!0,w.className="call-sim__result"),I&&(I.hidden=!0,I.className="call-sim__result");const x=e.querySelector("#caller-verify-input"),T=e.querySelector("#agent-verify-input");x&&(x.value=""),T&&(T.value="");const C=e.querySelector("#call-verified-banner");C&&(C.hidden=!0),e.querySelectorAll(".call-sim__progress, .call-sim__countdown").forEach(N=>{N.hidden=!1})}const A=e.querySelector("#pair-display");if(A){const w=jt.pair(),I=Object.entries(w).map(([x,T])=>`${x}: ${T}`).join(" | ");A.textContent=I}m===0&&(hr(),pr(e))},1e3))}function u0(){hr()}let kt=null;function f0(e,t){const n=R().groups[t];if(!n)return e.slice(0,8);const{identity:r}=R();if(r?.pubkey===e)return"You";const o=n.memberNames?.[e];return o||`${e.slice(0,8)}…${e.slice(-4)}`}function h0(e,t){kt&&(kt(),kt=null),document.querySelector(".call-verify")?.remove();const{groups:n,identity:r}=R(),o=n[e];if(!o||!r)return;const s=r.pubkey,i=f0(t,e),a=an(t),c=s<t?[s,t]:[t,s],l=hs({secret:o.seed,namespace:"canary:call",roles:c,myRole:s,preset:"call"}),d=Nn.call.rotationSeconds,u=Math.floor(Date.now()/1e3),f=l.myToken(u),h=l.theirToken(u),p=document.createElement("div");p.className="call-verify",p.innerHTML=`
    <div class="call-verify__content">
      ${a?.picture?`<img class="call-verify__avatar" src="${q(a.picture)}" alt="" />`:""}
      <h2 class="call-verify__title">Call with ${q(i)}</h2>
      <p class="call-verify__instruction">Speak your word. Listen for theirs. If it matches, the call is verified.</p>

      <div class="call-verify__section call-verify__section--say">
        <span class="call-verify__label">Say this:</span>
        <span class="call-verify__word call-verify__word--mine" id="cv-word-mine">${f}</span>
      </div>

      <div class="call-verify__divider"></div>

      <div class="call-verify__section call-verify__section--hear">
        <span class="call-verify__label">They should say:</span>
        <span class="call-verify__word call-verify__word--theirs" id="cv-word-theirs">${h}</span>
      </div>

      <p class="call-verify__timer">Words change in <span id="cv-countdown">${d}</span>s</p>

      <p class="call-verify__instruction" style="margin-top: 1.5rem; font-size: 0.75rem;">In a real call, if they say the wrong word, it could be an emergency signal. A production app would automatically check and silently alert the group.</p>
      <div class="call-verify__actions">
        <button class="btn btn--primary call-verify__btn" id="cv-match">Match</button>
        <button class="btn call-verify__btn call-verify__btn--danger" id="cv-mismatch">Wrong Word</button>
        <button class="btn call-verify__btn" id="cv-close">Close</button>
      </div>
    </div>
  `;let m=null;function y(){const O=Math.floor(Date.now()/1e3),P=p.querySelector("#cv-word-mine"),$=p.querySelector("#cv-word-theirs"),v=p.querySelector("#cv-countdown");if(P&&(P.textContent=l.myToken(O)),$&&($.textContent=l.theirToken(O)),v){const b=O%d;v.textContent=String(d-b)}}m=setInterval(y,1e3);function E(){m!==null&&(clearInterval(m),m=null)}function S(){kt&&(kt(),kt=null),p.classList.remove("call-verify--visible"),setTimeout(()=>p.remove(),300)}function L(O){O.key==="Escape"&&S()}kt=()=>{E(),document.removeEventListener("keydown",L)},document.body.appendChild(p),requestAnimationFrame(()=>p.classList.add("call-verify--visible")),document.addEventListener("keydown",L),p.querySelector("#cv-match")?.addEventListener("click",()=>{E(),p.innerHTML=`
      <div class="call-verify__content">
        <h2 class="call-verify__title" style="color: var(--clr-success, #27ae60);">Call Verified</h2>
        <p class="call-verify__warning" style="color: var(--text-secondary);">${q(i)} is who they say they are. The call is authenticated.</p>
        <div class="call-verify__actions">
          <button class="btn btn--primary call-verify__btn" id="cv-dismiss-ok">Done</button>
        </div>
      </div>
    `,p.querySelector("#cv-dismiss-ok")?.addEventListener("click",S)}),p.querySelector("#cv-close")?.addEventListener("click",S),p.querySelector("#cv-mismatch")?.addEventListener("click",()=>{E(),p.innerHTML=`
      <div class="call-verify__content">
        <h2 class="call-verify__title" style="color: var(--clr-danger, #e74c3c);">Verification Failed</h2>
        <p class="call-verify__warning">The word didn't match. This person may not be who they claim to be.</p>
        <div class="call-verify__actions">
          <button class="btn call-verify__btn" id="cv-dismiss-fail">Dismiss</button>
        </div>
      </div>
    `,p.querySelector("#cv-dismiss-fail")?.addEventListener("click",S)})}function p0(e,t){const n=R().groups[t];if(!n)return e.slice(0,8);const{identity:r}=R();if(r?.pubkey===e)return"You";const o=n.memberNames?.[e];return o||`${e.slice(0,8)}…${e.slice(-4)}`}function m0(e){const n=Math.floor(Date.now()/1e3)-e;if(n<30)return"just now";if(n<60)return`${n}s ago`;const r=Math.floor(n/60);return r<60?`${r} min ago`:new Date(e*1e3).toLocaleTimeString()}function y0(e,t,n,r){const o=document.querySelector(".duress-overlay");o&&o.remove();const s=p0(e,t),i=r?m0(r):new Date().toLocaleTimeString(),a=document.createElement("div");a.className="duress-overlay",a.setAttribute("role","alertdialog"),a.setAttribute("aria-label",`${s} needs help`),a.innerHTML=`
    <div class="duress-overlay__content">
      <div class="duress-overlay__icon" aria-hidden="true">!</div>
      <h1 class="duress-overlay__title">${q(s)}</h1>
      <h2 class="duress-overlay__subtitle">NEEDS HELP</h2>
      ${n&&(n.lat!==0||n.lon!==0)?`<p class="duress-overlay__location">Last known: ${n.lat.toFixed(4)}, ${n.lon.toFixed(4)}</p>`:""}
      <p class="duress-overlay__time">${q(i)}</p>
      <button class="btn btn--lg duress-overlay__dismiss" id="duress-dismiss">I'm Responding</button>
    </div>
  `,document.body.appendChild(a),requestAnimationFrame(()=>a.classList.add("duress-overlay--visible")),document.getElementById("duress-dismiss").addEventListener("click",()=>{a.classList.remove("duress-overlay--visible"),setTimeout(()=>a.remove(),300)});function c(l){l.key==="Escape"&&(a.classList.remove("duress-overlay--visible"),setTimeout(()=>a.remove(),300),document.removeEventListener("keydown",c))}document.addEventListener("keydown",c)}function g0(e){if(e.startsWith("wss://"))return!0;if(e.startsWith("ws://"))try{const t=new URL(e);return t.hostname==="localhost"||t.hostname==="127.0.0.1"||t.hostname==="[::1]"}catch{return!1}return!1}function mr(e,t){return t?.pubkey===e.pubkey&&t.mnemonic?{...e,mnemonic:t.mnemonic}:e}function ru(e,t){return e?typeof t.epoch=="number"&&t.epoch<e.epoch?"This invite is older than the group state already stored on this device.":typeof t.latestInviteIssuedAt=="number"&&e.latestInviteIssuedAt>0&&t.latestInviteIssuedAt<e.latestInviteIssuedAt?"A newer invite has already been accepted for this group on this device.":typeof t.epoch=="number"&&t.epoch===e.epoch&&typeof t.counter=="number"&&t.counter<e.counter?"This invite would roll the group back to an older counter.":null:null}Xy();const b0=Wy();b0.theme==="light"?document.documentElement.setAttribute("data-theme","light"):document.documentElement.removeAttribute("data-theme");let Rt=null;function xn(){Rt!==null&&(clearTimeout(Rt),Rt=null);const{settings:e}=R();!e.pinEnabled||e.autoLockMinutes<=0||!Ql()||(Rt=setTimeout(()=>{Yr(),Ri()},e.autoLockMinutes*60*1e3))}function ou(){document.addEventListener("pointerdown",xn,{passive:!0}),document.addEventListener("keydown",xn,{passive:!0}),xn()}function su(){document.removeEventListener("pointerdown",xn),document.removeEventListener("keydown",xn),Rt!==null&&(clearTimeout(Rt),Rt=null)}function Ri(){su(),Rn();const e=document.getElementById("app");e.innerHTML=`
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
  `;const t=document.getElementById("pin-input"),n=document.getElementById("pin-error"),r=document.getElementById("pin-submit");let o=0;const s=[0,1e3,2e3,5e3,15e3,3e4];async function i(){const a=t.value.trim();if(a.length<6){n.textContent="PIN must be at least 6 digits.",n.hidden=!1,t.focus();return}r.disabled=!0,r.textContent="Unlocking…",n.hidden=!0;try{await Jy(a),await _0(),iu();const c=document.getElementById("header");c&&hi(c),au(),Ci(),gs(Ai),ou(),cu(),Or(),window.addEventListener("hashchange",()=>Or()),Ti()}catch{o++;const c=s[Math.min(o,s.length-1)];n.textContent=c>0?`Incorrect PIN. Wait ${c/1e3}s before retrying.`:"Incorrect PIN. Try again.",n.hidden=!1,t.value="",r.disabled=!0,r.textContent="Unlock",c>0?setTimeout(()=>{r.disabled=!1,t.focus()},c):(r.disabled=!1,t.focus())}}r.addEventListener("click",()=>{i()}),t.addEventListener("keydown",a=>{a.key==="Enter"&&i()}),requestAnimationFrame(()=>t.focus())}function iu(){const e=document.getElementById("app");if(!e)throw new Error("Missing #app mount point");e.innerHTML=`
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
  `}function au(){const e=document.getElementById("hamburger"),t=document.getElementById("sidebar"),n=document.getElementById("sidebar-overlay");if(!e||!t||!n)return;function r(){t.classList.add("sidebar--open"),n.classList.add("sidebar-overlay--visible"),e.setAttribute("aria-expanded","true")}function o(){t.classList.remove("sidebar--open"),n.classList.remove("sidebar-overlay--visible"),e.setAttribute("aria-expanded","false")}e.setAttribute("aria-expanded","false"),e.addEventListener("click",()=>{t.classList.contains("sidebar--open")?o():r()}),n.addEventListener("click",()=>{o()}),t.addEventListener("click",s=>{s.target.closest("[data-group-id]")&&o()})}let qo=!1;function Ai(){qo||(qo=!0,requestAnimationFrame(()=>{qo=!1,Ci()}))}function Ci(){const{view:e}=R(),t=document.getElementById("groups-view"),n=document.getElementById("call-demo-view");t&&(t.hidden=e!=="groups"),n&&(n.hidden=e!=="call-demo");const r=document.getElementById("header");if(r&&hi(r),e==="groups"){u0();const o=document.getElementById("welcome-container");o&&qb(o);const s=document.getElementById("sidebar");s&&Ab(s);const i=document.getElementById("hero-container");i&&Ld(i);const a=document.getElementById("verify-container");a&&Wb(a);const c=document.getElementById("members-container");c&&Jd(c);const l=R().groups[R().activeGroupId??""],d=l?Br(l)==="online":!1,u=document.getElementById("beacon-container");u&&(d?(u.hidden=!1,eu(u)):(u.hidden=!0,u.innerHTML=""));const f=document.getElementById("liveness-container");f&&(d?(f.hidden=!1,l0(f)):(f.hidden=!0,f.innerHTML=""));const h=document.getElementById("settings-container");h&&d0(h)}else if(e==="call-demo"){const o=document.getElementById("call-simulation-container");o&&pr(o)}}function v0(){const{identity:e}=R(),t=e?.displayName&&e.displayName!=="You"?e.displayName:"";mi(`
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
    ${t?"":`
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
  `,r=>{const o=r.get("name")?.trim()??"";if(!o)return;const s=t||r.get("myname")?.trim()||"",a=document.querySelector(".segmented__btn.segmented__btn--active[data-preset]")?.dataset.preset??"family",c=$b(o,a,e?.pubkey);if(s&&e?.pubkey){const d=R().groups[c];d&&W(c,{memberNames:{...d.memberNames,[e.pubkey]:s}})}const l=R().groups[c];l&&Br(l)==="online"&&fu(l).length>0&&Le(l.readRelays??[],l.writeRelays??[],c)}),requestAnimationFrame(()=>{document.getElementById("modal-cancel-btn")?.addEventListener("click",()=>{document.getElementById("app-modal")?.close()}),document.querySelectorAll(".segmented__btn[data-preset]").forEach(r=>{r.addEventListener("click",()=>{document.querySelectorAll(".segmented__btn[data-preset]").forEach(o=>o.classList.remove("segmented__btn--active")),r.classList.add("segmented__btn--active")})})})}function Or(){const e=window.location.hash;if(e.startsWith("#ack/")){let t;try{t=decodeURIComponent(e.slice(5))}catch{console.warn("[canary] Malformed ack fragment — ignoring."),window.location.hash="";return}window.location.hash="",document.dispatchEvent(new CustomEvent("canary:confirm-member",{detail:{token:t}}))}else if(e.startsWith("#inv/")){const t=e.slice(5);window.location.hash="",w0(t)}else if(e.startsWith("#j/")){const t=e.slice(3);window.location.hash="",/^[0-9a-f]{32}$/.test(t)?E0(t):Y("Invalid invite link.","error")}else if(e.startsWith("#remote/")){let t=e.slice(8);try{t=decodeURIComponent(t)}catch{}window.location.hash="",k0(t)}}function w0(e){try{const t=Zb(e),n=kv(t),{identity:r}=R();if(!r?.pubkey){Y("No local identity — create or import one first.","error");return}let o=document.getElementById("binary-join-modal");o||(o=document.createElement("dialog"),o.id="binary-join-modal",o.className="modal",document.body.appendChild(o),o.addEventListener("click",i=>{i.target===o&&o.close()}));const s=o;s.innerHTML=`
      <div class="modal__form invite-share">
        <h2 class="modal__title">Join ${q(n.groupName)}</h2>
        <p class="invite-hint">Invited by <code>${q(n.inviterPubkey.slice(0,8))}…</code></p>
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
    `,s.querySelector("#binary-join-cancel")?.addEventListener("click",()=>s.close()),s.querySelector("#binary-join-accept")?.addEventListener("click",()=>{const i=s.querySelector("#binary-join-confirm"),a=s.querySelector("#binary-join-error"),c=i?.value.trim()??"";if(!c){a&&(a.textContent="Please enter the confirmation words.",a.style.display="");return}try{const l=Nd(n),d=dv(l,c);if(uv(d.groupId,d.nonce))throw new Error("This invite has already been used.");const u=d.groupId,{groups:f}=R(),h=ru(f[u],{epoch:d.epoch,counter:d.counter,latestInviteIssuedAt:d.issuedAt});if(h)throw new Error(h);const p=new Set(d.members);p.add(r.pubkey);const m=R().settings,y=d.relays.length>0?d.relays:m.defaultWriteRelays?.length?[...m.defaultWriteRelays]:[qe],E=Array.from(new Set([...m.defaultReadRelays?.length?m.defaultReadRelays:et,...y])),S=y.length>0,L={id:u,name:d.groupName,seed:d.seed,members:Array.from(p),memberNames:d.memberNames??{},nostrEnabled:S,relays:d.relays,readRelays:E,writeRelays:y,wordlist:d.wordlist,wordCount:d.wordCount,counter:d.counter,usageOffset:d.usageOffset,rotationInterval:d.rotationInterval,encodingFormat:d.encodingFormat,usedInvites:[d.nonce],latestInviteIssuedAt:d.issuedAt,beaconInterval:d.beaconInterval,beaconPrecision:d.beaconPrecision,duressMode:"immediate",livenessInterval:d.rotationInterval,livenessCheckins:{},tolerance:d.tolerance,createdAt:Math.floor(Date.now()/1e3),admins:[...d.admins],epoch:d.epoch,consumedOps:[]},O={...f,[u]:L};ee({groups:O,activeGroupId:u}),fv(u,d.nonce),si(),S&&r&&Le(E,y,u).then(()=>{Se(u,{type:"member-join",pubkey:r.pubkey,displayName:r.displayName&&r.displayName!=="You"?r.displayName:void 0,timestamp:Math.floor(Date.now()/1e3),epoch:d.epoch,opId:crypto.randomUUID()})}),s.close(),Y(`Joined ${d.groupName}`,"success")}catch(l){a&&(a.textContent=l instanceof Error?l.message:"Failed to join group.",a.style.display="")}}),s.showModal()}catch(t){Y(t instanceof Error?t.message:"Invalid QR invite.","error")}}function ms(e,t,n){const{identity:r}=R();if(!r?.pubkey||!r?.privkey)return;const o=tv({envelope:e,joinerPrivkey:r.privkey,adminPubkey:t.adminPubkey,expectedInviteId:t.inviteId}),s=o.groupId,{groups:i}=R(),a=ru(i[s],{epoch:o.epoch,counter:o.counter});if(a)throw new Error(a);const c=new Set(o.members);c.add(r.pubkey);const l={...o.memberNames??{}};r.displayName&&r.displayName!=="You"&&(l[r.pubkey]=r.displayName);const d=[...o.relays??[]],u=d.length>0?d:[qe],f=Array.from(new Set([...et,...u])),h=u.length>0,p={id:s,name:o.groupName,seed:o.seed,members:Array.from(c),memberNames:l,nostrEnabled:h,relays:d,readRelays:f,writeRelays:u,wordlist:o.wordlist,wordCount:o.wordCount,counter:o.counter,usageOffset:o.usageOffset,rotationInterval:o.rotationInterval,encodingFormat:o.encodingFormat,usedInvites:[],latestInviteIssuedAt:0,beaconInterval:o.beaconInterval,beaconPrecision:o.beaconPrecision,duressMode:"immediate",livenessInterval:o.rotationInterval,livenessCheckins:{},tolerance:o.tolerance,createdAt:Math.floor(Date.now()/1e3),admins:[...o.admins],epoch:o.epoch,consumedOps:[]},m={...i,[s]:p};ee({groups:m,activeGroupId:s}),si(),h&&r&&Le(f,u,s).then(()=>{Se(s,{type:"member-join",pubkey:r.pubkey,displayName:r.displayName&&r.displayName!=="You"?r.displayName:void 0,timestamp:Math.floor(Date.now()/1e3),epoch:o.epoch,opId:crypto.randomUUID()})}),n.close(),Y(`Joined ${o.groupName}`,"success")}function E0(e){const{identity:t,settings:n}=R();if(!t?.pubkey||!t?.privkey){Y("No local identity — create or import one first.","error");return}const r=Array.from(new Set([...et,...n.defaultWriteRelays??[]])),o=n.defaultWriteRelays??[qe];let s=document.getElementById("relay-join-modal");s||(s=document.createElement("dialog"),s.id="relay-join-modal",s.className="modal",document.body.appendChild(s),s.addEventListener("click",l=>{l.target===s&&s.close()}));const i=s;i.innerHTML=`
    <div class="modal__form invite-share">
      <h2 class="modal__title">Joining...</h2>
      <p class="invite-hint" id="relay-join-status">Looking for invite on relay...</p>
      <div class="modal__actions">
        <button class="btn" id="relay-join-cancel" type="button">Cancel</button>
      </div>
    </div>
  `;let a=()=>{},c=()=>{};i.querySelector("#relay-join-cancel")?.addEventListener("click",()=>{a(),c(),i.close()}),i.showModal(),Le(r,o).then(()=>{a=Ov({inviteId:e,readRelays:r,onToken(l){try{Pd(l)}catch(p){const m=i.querySelector("#relay-join-status");m&&(m.textContent=p instanceof Error?p.message:"Invalid invite token.",m.style.color="var(--duress)");return}const d=l.relays?.length?l.relays:o,u=d,f=Array.from(new Set([...et,...d])),h=i.querySelector("#relay-join-status");h&&(h.textContent=`Joining ${l.groupName}...`),Le(f,u).then(()=>{c=Gd({inviteId:l.inviteId,adminPubkey:l.adminPubkey,readRelays:f,writeRelays:u,onWelcome(p){try{ms(p,l,i)}catch{h&&(h.textContent="Failed to join — welcome message could not be decrypted.",h.style.color="var(--duress)")}},onError(p){h&&(h.textContent=p,h.style.color="var(--duress)")}})})},onError(l){const d=i.querySelector("#relay-join-status");d&&(d.textContent=l,d.style.color="var(--duress)")}})})}function k0(e){try{let t;try{t=$d(e)}catch{try{t=so(e)}catch{throw new Error("Invalid invite — could not decode token.")}}Pd(t);const n=t,{identity:r,settings:o}=R();if(!r?.pubkey||!r?.privkey){Y("No local identity — create or import one first.","error");return}const s=`${n.adminPubkey.slice(0,8)}…${n.adminPubkey.slice(-4)}`,i=n.relays?.length?n.relays:o.defaultWriteRelays,a=i,c=Array.from(new Set([...et,...i])),l=Array.from(new Set([...c,...a]));let d=document.getElementById("remote-join-modal");d||(d=document.createElement("dialog"),d.id="remote-join-modal",d.className="modal",document.body.appendChild(d),d.addEventListener("click",h=>{h.target===d&&d.close()}));const u=d;let f=()=>{};u.innerHTML=`
      <div class="modal__form invite-share">
        <h2 class="modal__title">Remote Invite</h2>
        <p class="invite-hint">You've been invited to <strong>${q(n.groupName)}</strong> by <code>${q(s)}</code></p>

        <p class="invite-hint" id="remote-join-relay-status" style="color: var(--verified); font-weight: 500;">${l.length>0?"Connecting to relay...":""}</p>

        <div style="margin: 1rem 0;">
          <p class="invite-hint" style="font-weight: 500;">Or send this join code manually:</p>
          <div style="display: flex; align-items: center; gap: 0.5rem; justify-content: center; margin: 0.5rem 0;">
            <code style="font-size: 0.75rem; word-break: break-all; max-width: 80%;">${q(r.pubkey)}</code>
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
    `,l.length>0&&Le(c,a).then(()=>{const h=u.querySelector("#remote-join-relay-status");h&&(h.textContent="Waiting for admin to send group key..."),f=Gd({inviteId:n.inviteId,adminPubkey:n.adminPubkey,readRelays:c,writeRelays:a,onWelcome(p){try{ms(p,n,u)}catch{h&&(h.textContent="Auto-join failed — paste welcome message manually.",h.style.color="var(--duress)")}},onError(p){h&&(h.textContent=p,h.style.color="var(--duress)")}})}),u.querySelector("#remote-join-copy-pubkey")?.addEventListener("click",async h=>{const p=h.currentTarget;try{await navigator.clipboard.writeText(r.pubkey),p.textContent="Copied!",setTimeout(()=>{p.textContent="Copy"},1500)}catch{}}),u.querySelector("#remote-join-cancel")?.addEventListener("click",()=>{f(),u.close()}),u.querySelector("#remote-join-accept")?.addEventListener("click",async()=>{const h=u.querySelector("#remote-join-welcome-input"),p=u.querySelector("#remote-join-error"),m=(h?.value??"").replace(/[^A-Za-z0-9=+/]/g,"");if(!m){p&&(p.textContent="Please paste the welcome message.",p.style.display="");return}try{f(),ms(m,n,u)}catch(y){p&&(p.textContent=y instanceof Error?y.message:"Failed to decrypt welcome message.",p.style.display="")}}),u.showModal()}catch(t){Y(t instanceof Error?t.message:"Invalid remote invite.","error")}}function cu(){document.addEventListener("canary:create-group",()=>{v0()}),document.addEventListener("canary:show-invite",e=>{const{groupId:t}=e.detail,{groups:n}=R(),r=n[t];r&&io(r)}),document.addEventListener("canary:confirm-member",e=>{const{identity:t,groups:n,activeGroupId:r}=R();if(!r||!t?.pubkey)return;const o=n[r];if(!o||!o.admins.includes(t.pubkey))return;const s=e.detail?.token??"";ke(async()=>{const{showConfirmMemberModal:i}=await Promise.resolve().then(()=>Gv);return{showConfirmMemberModal:i}},void 0,import.meta.url).then(({showConfirmMemberModal:i})=>{i(s)})}),document.addEventListener("canary:verify-call",e=>{const{groupId:t,pubkey:n}=e.detail;h0(t,n)}),document.addEventListener("canary:pin-enable",e=>{const t=e.detail?.pin;!t||t.length<6||Qy(t).then(()=>{ee({settings:{...R().settings,pinEnabled:!0}}),ou()})}),document.addEventListener("canary:pin-disable",()=>{eg().then(()=>{ee({settings:{...R().settings,pinEnabled:!1}}),su()})}),document.addEventListener("canary:lock",()=>{Yr(),Ri()}),document.addEventListener("canary:sync-message",e=>{const{groupId:t,message:n,sender:r}=e.detail;if(n.type==="beacon")r0(r,n.lat,n.lon,n.accuracy??2e4,n.timestamp);else if(n.type==="duress-alert"){const o=n.subject||r;y0(o,t,n.lat!=null?{lat:n.lat,lon:n.lon}:void 0,n.timestamp)}}),document.addEventListener("canary:resync",()=>{Ti()})}async function _0(){let{identity:e}=R();const t=await Pg({pubkey:e?.pubkey??"",privkey:e?.privkey}),n={pubkey:t.pubkey,privkey:t.privkey,displayName:e?.displayName??"You",signerType:"local"};(!e||e.pubkey!==n.pubkey)&&ee({identity:mr(n,e)})}async function Ti(){const{groups:e,identity:t,settings:n}=R(),r=Object.keys(e).length,o=!!t?.privkey,s=[],i=[];for(const u of Object.values(e))s.push(...u.readRelays??[]),i.push(...u.writeRelays??[]),s.push(...u.relays??[]),i.push(...u.relays??[]);s.push(...n.defaultReadRelays??n.defaultRelays),i.push(...n.defaultWriteRelays??n.defaultRelays);const a=we(s),c=we(i),l=we([...a,...c]).length;if(l===0){console.warn("[canary:boot] No relays found — sync disabled"),r>0&&Y(`Sync disabled — ${r} group(s), no relays configured`,"warning",5e3);return}if(!o&&t?.signerType!=="nip07"){console.warn("[canary:boot] No privkey and no NIP-07 — sync disabled"),Y("Sync disabled — no private key","warning",5e3);return}if(console.warn("[canary:boot] Read relays:",a,"Write relays:",c),o)await Le(a,c),gb(),Y(`Syncing via ${l} relay(s)`,"success",2e3);else{const{connectRelays:u}=await ke(async()=>{const{connectRelays:f}=await Promise.resolve().then(()=>tb);return{connectRelays:f}},void 0,import.meta.url);u(a,c),Y(`Connected to ${l} relay(s)`,"success",2e3)}const{fetchOwnProfile:d}=await ke(async()=>{const{fetchOwnProfile:u}=await Promise.resolve().then(()=>Mr);return{fetchOwnProfile:u}},void 0,import.meta.url);if(d(),Ai(),o){const{startLivenessHeartbeat:u}=await ke(async()=>{const{startLivenessHeartbeat:f}=await Promise.resolve().then(()=>lb);return{startLivenessHeartbeat:f}},void 0,import.meta.url);u()}}function Wa(e){return Array.from(e,t=>t.toString(16).padStart(2,"0")).join("")}function x0(e){const t=e.split(" ");let n=document.getElementById("recovery-phrase-modal");n||(n=document.createElement("dialog"),n.id="recovery-phrase-modal",n.className="modal",document.body.appendChild(n));const r=n;r.textContent="";const o=document.createElement("div");o.className="modal__form",o.style.maxWidth="420px";const s=document.createElement("h2");s.className="modal__title",s.textContent="Back up your recovery phrase",o.appendChild(s);const i=document.createElement("p");i.className="invite-hint",i.textContent="Write these words down in order. They're the only way to recover your account.",o.appendChild(i);const a=document.createElement("div");a.className="recovery-grid",a.style.cssText="display:grid;grid-template-columns:repeat(3,1fr);gap:0.5rem;margin:1rem 0;",t.forEach((f,h)=>{const p=document.createElement("div");p.style.cssText="border:1px solid var(--border);border-radius:4px;padding:0.5rem;text-align:center;font-family:var(--font-mono,monospace);font-size:0.8rem;";const m=document.createElement("span");m.style.cssText="color:var(--text-muted);font-size:0.7rem;",m.textContent=`${h+1}. `;const y=document.createElement("span");y.style.fontWeight="500",y.textContent=f,p.append(m,y),a.appendChild(p)}),o.appendChild(a);const c=document.createElement("p");c.className="invite-hint",c.style.cssText="color:var(--duress);font-weight:500;",c.textContent="Do not share these words with anyone.",o.appendChild(c);const l=document.createElement("div");l.className="modal__actions",l.style.gap="0.5rem";const d=document.createElement("button");d.id="recovery-phrase-copy",d.className="btn btn--primary",d.type="button",d.textContent="Copy words",d.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(e),d.textContent="Copied!",setTimeout(()=>{d.textContent="Copy words"},2e3)}catch{}});const u=document.createElement("button");u.id="recovery-phrase-skip",u.className="btn",u.type="button",u.textContent="Skip for now",u.addEventListener("click",()=>r.close()),l.append(d,u),o.appendChild(l),r.appendChild(o),r.showModal()}function S0(){const e=document.getElementById("app"),t=fi.map(o=>`
    <button class="btn login-screen__demo" data-nsec="${q(o.nsec)}" data-name="${q(o.name)}" type="button">
      <strong>${q(o.name)}</strong> <span style="color: var(--text-muted); font-weight: 400;">${q(o.bio)}</span>
    </button>
  `).join("");e.innerHTML=`
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
          <p class="settings-hint" style="margin-bottom: 0.5rem;">Paste your 12-word recovery phrase to restore your account.</p>
          <form id="mnemonic-login-form" autocomplete="off" style="display: flex; flex-direction: column; gap: 0.375rem;">
            <textarea class="input" id="login-mnemonic" placeholder="Enter your 12 recovery words..." rows="3" style="width: 100%; font-size: 0.8rem; resize: none; padding: 0.5rem; font-family: var(--font-mono, monospace);"></textarea>
            <button class="btn btn--primary" type="submit">Recover account</button>
          </form>
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
                ${(R().settings.defaultWriteRelays??R().settings.defaultRelays).map((o,s)=>`
                  <li style="display: flex; align-items: center; gap: 0.25rem; margin-bottom: 0.25rem;">
                    <span class="settings-hint" style="flex: 1; font-size: 0.75rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin: 0;">${q(o)}</span>
                    <button class="btn btn--ghost btn--sm login-relay-remove" data-relay-index="${s}" type="button" style="padding: 0 0.25rem; font-size: 0.7rem;">✕</button>
                  </li>
                `).join("")}
              </ul>
              <div style="display: flex; gap: 0.25rem;">
                <input class="input" type="url" id="login-relay-input" placeholder="wss://relay.example.com" style="flex: 1; font-size: 0.75rem; padding: 0.375rem;" />
                <button class="btn btn--ghost btn--sm" id="login-relay-add" type="button">Add</button>
              </div>
              <p class="settings-hint" style="font-size: 0.7rem; margin: 0.5rem 0 0 0;">Read relays: ${et.map(o=>q(o.replace("wss://",""))).join(", ")} + write relay(s)</p>
            </div>
          </details>
        </div>

        <div style="border-top: 1px solid var(--border); margin: 1rem 0; padding-top: 0.75rem;">
          <p class="input-label__text" style="margin-bottom: 0.375rem;">Demo accounts</p>
          <div style="display: flex; flex-direction: column; gap: 0.25rem;">
            ${t}
          </div>
        </div>

      </div>
    </div>
  `,e.querySelector("#offline-form")?.addEventListener("submit",async o=>{o.preventDefault();const s=e.querySelector("#offline-name"),i=s?.value.trim();if(!i){s?.focus();return}const{generateMnemonic:a,mnemonicToKeypair:c}=await ke(async()=>{const{generateMnemonic:h,mnemonicToKeypair:p}=await Promise.resolve().then(()=>sa);return{generateMnemonic:h,mnemonicToKeypair:p}},void 0,import.meta.url),l=a(),{pubkey:d,privkey:u}=c(l);ee({identity:{pubkey:d,privkey:u,mnemonic:l,signerType:"local",displayName:i}}),await Ht();const{publishKind0:f}=await ke(async()=>{const{publishKind0:h}=await Promise.resolve().then(()=>Mr);return{publishKind0:h}},void 0,import.meta.url);f(i,u),x0(l)}),e.querySelector("#mnemonic-login-form")?.addEventListener("submit",async o=>{o.preventDefault();const i=e.querySelector("#login-mnemonic")?.value.trim();if(!i)return;if(i.split(/\s+/).length!==12){alert("Recovery phrase must be exactly 12 words.");return}try{const{validateMnemonic:c,mnemonicToKeypair:l}=await ke(async()=>{const{validateMnemonic:f,mnemonicToKeypair:h}=await Promise.resolve().then(()=>sa);return{validateMnemonic:f,mnemonicToKeypair:h}},void 0,import.meta.url);if(!c(i)){alert("Invalid recovery phrase. Please check your words and try again.");return}const{pubkey:d,privkey:u}=l(i);ee({identity:{pubkey:d,privkey:u,mnemonic:i,signerType:"local",displayName:"You"}}),await Ht()}catch{alert("Invalid recovery phrase.")}}),e.querySelector("#nsec-login-form")?.addEventListener("submit",async o=>{o.preventDefault();const i=e.querySelector("#login-nsec")?.value.trim();if(i)try{const a=R().identity,c=is(i);if(c.type!=="nsec"){alert("Not a valid nsec.");return}const l=c.data,d=Wa(l),u=In(l);ee({identity:mr({pubkey:u,privkey:d,signerType:"local",displayName:"You"},a)}),await Ht()}catch{alert("Invalid nsec format.")}}),e.querySelectorAll(".login-screen__demo").forEach(o=>{o.addEventListener("click",async()=>{const s=R().identity,i=o.dataset.nsec,a=o.dataset.name,l=is(i).data,d=Wa(l),u=In(l);ee({identity:mr({pubkey:u,privkey:d,signerType:"local",displayName:a},s)}),await Ht();const{publishKind0:f}=await ke(async()=>{const{publishKind0:h}=await Promise.resolve().then(()=>Mr);return{publishKind0:h}},void 0,import.meta.url);f(a,d)})}),e.querySelector("#login-nip07")?.addEventListener("click",async()=>{if(!hd()){alert("No Nostr extension found. Install Alby, nos2x, or another NIP-07 extension and reload.");return}try{const o=R().identity,s=await window.nostr.getPublicKey();ee({identity:mr({pubkey:s,signerType:"nip07",displayName:"You"},o)}),await Ht()}catch{alert("Extension rejected the request.")}});function n(){const o=e.querySelector("#login-relay-list");if(!o)return;const s=R().settings.defaultWriteRelays??R().settings.defaultRelays;o.innerHTML=s.map((i,a)=>`
      <li style="display: flex; align-items: center; gap: 0.25rem; margin-bottom: 0.25rem;">
        <span class="settings-hint" style="flex: 1; font-size: 0.75rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin: 0;">${q(i)}</span>
        <button class="btn btn--ghost btn--sm login-relay-remove" data-relay-index="${a}" type="button" style="padding: 0 0.25rem; font-size: 0.7rem;">✕</button>
      </li>
    `).join(""),r()}function r(){e.querySelectorAll(".login-relay-remove").forEach(o=>{o.addEventListener("click",()=>{const s=Number(o.dataset.relayIndex),i=[...R().settings.defaultWriteRelays??R().settings.defaultRelays];i.splice(s,1),ee({settings:{...R().settings,defaultWriteRelays:i,defaultRelays:i}}),n()})})}r(),e.querySelector("#login-relay-add")?.addEventListener("click",()=>{const o=e.querySelector("#login-relay-input"),s=o?.value.trim();if(!s||!g0(s))return;const i=[...R().settings.defaultWriteRelays??R().settings.defaultRelays];i.includes(s)||(i.push(s),ee({settings:{...R().settings,defaultWriteRelays:i,defaultRelays:i}}),n()),o&&(o.value="")}),e.querySelector("#login-relay-input")?.addEventListener("keydown",o=>{o.key==="Enter"&&(o.preventDefault(),e.querySelector("#login-relay-add")?.click())})}async function Ht(){iu(),window.location.hash==="#call"&&ee({view:"call-demo"});const e=document.getElementById("header");e&&hi(e),au(),Ci(),gs(Ai),cu(),Or(),window.addEventListener("hashchange",()=>Or()),Ti()}async function Ja(){if(Ql())Ri();else{Yy();const{identity:e}=R();e?.pubkey?await Ht():S0()}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{Ja()}):Ja();
