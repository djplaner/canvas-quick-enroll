(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function n(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerpolicy&&(s.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?s.credentials="include":o.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(o){if(o.ep)return;o.ep=!0;const s=n(o);fetch(o.href,s)}})();function h(){}function R(t){return t()}function x(){return Object.create(null)}function b(t){t.forEach(R)}function B(t){return typeof t=="function"}function X(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function J(t){return Object.keys(t).length===0}function K(t,e){t.appendChild(e)}function W(t,e,n){const r=z(t);if(!r.getElementById(e)){const o=$("style");o.id=e,o.textContent=n,V(r,o)}}function z(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function V(t,e){return K(t.head||t,e),e.sheet}function d(t,e,n){t.insertBefore(e,n||null)}function a(t){t.parentNode.removeChild(t)}function $(t){return document.createElement(t)}function F(t){return document.createTextNode(t)}function U(){return F(" ")}function P(){return F("")}function M(t,e,n,r){return t.addEventListener(e,n,r),()=>t.removeEventListener(e,n,r)}function G(t){return function(e){return e.preventDefault(),t.call(this,e)}}function C(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function Y(t){return Array.from(t.childNodes)}let N;function p(t){N=t}const m=[],T=[],y=[],q=[],Z=Promise.resolve();let v=!1;function ee(){v||(v=!0,Z.then(Q))}function w(t){y.push(t)}const k=new Set;let g=0;function Q(){const t=N;do{for(;g<m.length;){const e=m[g];g++,p(e),te(e.$$)}for(p(null),m.length=0,g=0;T.length;)T.pop()();for(let e=0;e<y.length;e+=1){const n=y[e];k.has(n)||(k.add(n),n())}y.length=0}while(m.length);for(;q.length;)q.pop()();v=!1,k.clear(),p(t)}function te(t){if(t.fragment!==null){t.update(),b(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(w)}}const ne=new Set;function re(t,e){t&&t.i&&(ne.delete(t),t.i(e))}function oe(t,e,n,r){const{fragment:o,after_update:s}=t.$$;o&&o.m(e,n),r||w(()=>{const l=t.$$.on_mount.map(R).filter(B);t.$$.on_destroy?t.$$.on_destroy.push(...l):b(l),t.$$.on_mount=[]}),s.forEach(w)}function se(t,e){const n=t.$$;n.fragment!==null&&(b(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function le(t,e){t.$$.dirty[0]===-1&&(m.push(t),ee(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function ie(t,e,n,r,o,s,l,i=[-1]){const c=N;p(t);const u=t.$$={fragment:null,ctx:[],props:s,update:h,not_equal:o,bound:x(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(c?c.$$.context:[])),callbacks:x(),dirty:i,skip_bound:!1,root:e.target||c.$$.root};l&&l(u.root);let _=!1;if(u.ctx=n?n(t,e.props||{},(f,j,...I)=>{const O=I.length?I[0]:j;return u.ctx&&o(u.ctx[f],u.ctx[f]=O)&&(!u.skip_bound&&u.bound[f]&&u.bound[f](O),_&&le(t,f)),j}):[],u.update(),_=!0,b(u.before_update),u.fragment=r?r(u.ctx):!1,e.target){if(e.hydrate){const f=Y(e.target);u.fragment&&u.fragment.l(f),f.forEach(a)}else u.fragment&&u.fragment.c();e.intro&&re(t.$$.fragment),oe(t,e.target,e.anchor,e.customElement),Q()}p(c)}class ce{$destroy(){se(this,1),this.$destroy=h}$on(e,n){if(!B(n))return h;const r=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return r.push(n),()=>{const o=r.indexOf(n);o!==-1&&r.splice(o,1)}}$set(e){this.$$set&&!J(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const E=async t=>{const e=t;try{const n=await fetch(e);return n.status===404||n.status===401?null:await n.json()}catch(n){console.error(`Could not fetch requested information: ${n}`)}},ue=async(t,e)=>{const n=t;try{const r=await fetch(n,{method:"DELETE",credentials:"include",headers:{"Content-Type":"application/json",Accept:"application/json","X-CSRF-Token":e}});return r.status===404||r.status===401?null:await r.json()}catch(r){console.error(`Could not delete requested information: ${r}`)}},fe=async(t,e,n)=>{try{const r=await fetch(t,{method:"POST",credentials:"include",headers:{"Content-Type":"application/json",Accept:"application/json","X-CSRF-Token":n},body:JSON.stringify(e)});return r.status===404||r.status===401?null:await r.json()}catch(r){console.error(`Could not post requested information: ${r}`)}};class ae{constructor(e,n){this.finishedCallBack=e,this.CONFIG=n,this.csrf=this.getCsrfToken(),this.currentHostName=document.location.hostname,this.baseApiUrl=`https://${this.currentHostName}/api/v1/courses/`,this.courseId=window.location.href.split("/")[window.location.href.split("/").indexOf("courses")+1],this.courseId=parseInt(this.courseId),this.getCanvasUser()}getCanvasUser(){E(`https://${this.currentHostName}/api/v1/users/self`).then(e=>{this.user=e,this.getUsersEnrollments()})}getUsersEnrollments(){E(`https://${this.currentHostName}/api/v1/users/self/enrollments?type[]=DesignerEnrollment&per_page=100`).then(e=>{e!==null&&(this.enrollments=e,this.finishedCallBack())})}getEnrollmentStatus(){const e=this.enrollments.filter(r=>r.course_id===this.courseId).length,n=this.getCourseEnrollementObject(this.courseId);return console.log(`-------------getEnrollmentStatus -- ${e}`),console.log(n),n!==void 0}getCourseEnrollementObject(e){return this.enrollments.find(n=>n.course_id===e)}enrollUser(){E(`https://${this.currentHostName}/api/v1/courses/${this.courseId}/sections`).then(e=>{if(e===null)return;const n=e;let r=null;if(n.length>0)r=n[0].id;else{alert("The current course has no sections. At least one section is required for quick enrol to work.");return}n.forEach(s=>{s.name.match(this.CONFIG.sectionName)&&(r=s.id)});const o={enrollment:{user_id:this.user.id,type:"DesignerEnrollment",enrollment_state:"active"}};fe(`https://${this.currentHostName}/api/v1/sections/${r}/enrollments`,o,this.csrf).then(s=>{s!==null&&this.getUsersEnrollments()})})}unEnrollUser(){const e=this.getCourseEnrollementObject(this.courseId);if(e===void 0){console.error(`Could not find enrollment object for course ${this.courseId}`);return}ue(`https://${this.currentHostName}/api/v1/courses/${this.courseId}/enrollments/${e.id}?task=delete`,this.csrf).then(n=>{this.getUsersEnrollments()})}getCsrfToken(){let e=new RegExp("^_csrf_token=(.*)$"),n=document.cookie.split(";");for(let r=0;r<n.length;r++){let o=n[r].trim(),s=e.exec(o);if(s)return decodeURIComponent(s[1])}return null}}function de(t){W(t,"svelte-oue8fh","button.canvas-quick-enrol.svelte-oue8fh{margin-left:2rem;margin-top:1rem;margin-bottom:1rem}")}function S(t){let e,n,r,o=t[1]===null&&A(),s=t[1]===!1&&D(t),l=t[1]===!0&&L(t);return{c(){o&&o.c(),e=U(),s&&s.c(),n=U(),l&&l.c(),r=P()},m(i,c){o&&o.m(i,c),d(i,e,c),s&&s.m(i,c),d(i,n,c),l&&l.m(i,c),d(i,r,c)},p(i,c){i[1]===null?o||(o=A(),o.c(),o.m(e.parentNode,e)):o&&(o.d(1),o=null),i[1]===!1?s?s.p(i,c):(s=D(i),s.c(),s.m(n.parentNode,n)):s&&(s.d(1),s=null),i[1]===!0?l?l.p(i,c):(l=L(i),l.c(),l.m(r.parentNode,r)):l&&(l.d(1),l=null)},d(i){o&&o.d(i),i&&a(e),s&&s.d(i),i&&a(n),l&&l.d(i),i&&a(r)}}}function A(t){let e;return{c(){e=$("button"),e.textContent="Waiting...",e.disabled=!0,C(e,"class","canvas-quick-enrol svelte-oue8fh")},m(n,r){d(n,e,r)},d(n){n&&a(e)}}}function D(t){let e,n,r;return{c(){e=$("button"),e.textContent="Quick Enroll",C(e,"class","canvas-quick-enrol svelte-oue8fh")},m(o,s){d(o,e,s),n||(r=M(e,"click",G(t[2])),n=!0)},p:h,d(o){o&&a(e),n=!1,r()}}}function L(t){let e,n,r;return{c(){e=$("button"),e.textContent="Unenroll",C(e,"class","canvas-quick-enrol svelte-oue8fh")},m(o,s){d(o,e,s),n||(r=M(e,"click",G(t[3])),n=!0)},p:h,d(o){o&&a(e),n=!1,r()}}}function he(t){let e,n=t[0]&&S(t);return{c(){n&&n.c(),e=P()},m(r,o){n&&n.m(r,o),d(r,e,o)},p(r,[o]){r[0]?n?n.p(r,o):(n=S(r),n.c(),n.m(e.parentNode,e)):n&&(n.d(1),n=null)},i:h,o:h,d(r){n&&n.d(r),r&&a(e)}}}function me(t,e,n){const r={sectionName:new RegExp("^Teaching Team.*$")};let o=!1,s=null;location.pathname.match(/^\/courses\/\d+\/*$/)&&(o=!0);const i=function(){n(1,s=c.getEnrollmentStatus())};let c=new ae(i,r);function u(){n(1,s=c.enrollUser())}function _(){n(1,s=c.unEnrollUser())}return[o,s,u,_]}class pe extends ce{constructor(e){super(),ie(this,e,me,he,X,{},de)}}const H=document.getElementById("left-side");H&&H.insertAdjacentHTML("afterbegin",'<div id="canvas-quick-enroll"></div>');new pe({target:document.getElementById("canvas-quick-enroll")});
