// ==UserScript==
// @name         Re:Dollars 全站聊天
// @version      1.0.0
// @author       wataame
// @match        https://bgm.tv/*
// @match        https://bangumi.tv/*
// @match        https://chii.in/*
// @exclude      https://bgm.tv/rakuen/*
// @exclude      https://bangumi.tv/rakuen/*
// @exclude      https://chii.in/rakuen/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  var n$1,l$3,u$3,t$2,i$2,r$2,o$2,e$2,f$3,c$2,s$3,a$3,p$3={},v$2=[],y$2=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,w$2=Array.isArray;function d$3(n,l){for(var u in l)n[u]=l[u];return n}function g$1(n){n&&n.parentNode&&n.parentNode.removeChild(n);}function _$3(l,u,t){var i,r,o,e={};for(o in u)"key"==o?i=u[o]:"ref"==o?r=u[o]:e[o]=u[o];if(arguments.length>2&&(e.children=arguments.length>3?n$1.call(arguments,2):t),"function"==typeof l&&null!=l.defaultProps)for(o in l.defaultProps) void 0===e[o]&&(e[o]=l.defaultProps[o]);return m$1(l,e,i,r,null)}function m$1(n,t,i,r,o){var e={type:n,props:t,key:i,ref:r,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:null==o?++u$3:o,__i:-1,__u:0};return null==o&&null!=l$3.vnode&&l$3.vnode(e),e}function k$1(n){return n.children}function x(n,l){this.props=n,this.context=l;}function S(n,l){if(null==l)return n.__?S(n.__,n.__i+1):null;for(var u;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e)return u.__e;return "function"==typeof n.type?S(n):null}function C$1(n){var l,u;if(null!=(n=n.__)&&null!=n.__c){for(n.__e=n.__c.base=null,l=0;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e){n.__e=n.__c.base=u.__e;break}return C$1(n)}}function M(n){(!n.__d&&(n.__d=true)&&i$2.push(n)&&!$.__r++||r$2!=l$3.debounceRendering)&&((r$2=l$3.debounceRendering)||o$2)($);}function $(){for(var n,u,t,r,o,f,c,s=1;i$2.length;)i$2.length>s&&i$2.sort(e$2),n=i$2.shift(),s=i$2.length,n.__d&&(t=void 0,r=void 0,o=(r=(u=n).__v).__e,f=[],c=[],u.__P&&((t=d$3({},r)).__v=r.__v+1,l$3.vnode&&l$3.vnode(t),O(u.__P,t,r,u.__n,u.__P.namespaceURI,32&r.__u?[o]:null,f,null==o?S(r):o,!!(32&r.__u),c),t.__v=r.__v,t.__.__k[t.__i]=t,N(f,t,c),r.__e=r.__=null,t.__e!=o&&C$1(t)));$.__r=0;}function I(n,l,u,t,i,r,o,e,f,c,s){var a,h,y,w,d,g,_,m=t&&t.__k||v$2,b=l.length;for(f=P(u,l,m,f,b),a=0;a<b;a++)null!=(y=u.__k[a])&&(h=-1==y.__i?p$3:m[y.__i]||p$3,y.__i=a,g=O(n,y,h,i,r,o,e,f,c,s),w=y.__e,y.ref&&h.ref!=y.ref&&(h.ref&&B$1(h.ref,null,y),s.push(y.ref,y.__c||w,y)),null==d&&null!=w&&(d=w),(_=!!(4&y.__u))||h.__k===y.__k?f=A$1(y,f,n,_):"function"==typeof y.type&&void 0!==g?f=g:w&&(f=w.nextSibling),y.__u&=-7);return u.__e=d,f}function P(n,l,u,t,i){var r,o,e,f,c,s=u.length,a=s,h=0;for(n.__k=new Array(i),r=0;r<i;r++)null!=(o=l[r])&&"boolean"!=typeof o&&"function"!=typeof o?("string"==typeof o||"number"==typeof o||"bigint"==typeof o||o.constructor==String?o=n.__k[r]=m$1(null,o,null,null,null):w$2(o)?o=n.__k[r]=m$1(k$1,{children:o},null,null,null):null==o.constructor&&o.__b>0?o=n.__k[r]=m$1(o.type,o.props,o.key,o.ref?o.ref:null,o.__v):n.__k[r]=o,f=r+h,o.__=n,o.__b=n.__b+1,e=null,-1!=(c=o.__i=L(o,u,f,a))&&(a--,(e=u[c])&&(e.__u|=2)),null==e||null==e.__v?(-1==c&&(i>s?h--:i<s&&h++),"function"!=typeof o.type&&(o.__u|=4)):c!=f&&(c==f-1?h--:c==f+1?h++:(c>f?h--:h++,o.__u|=4))):n.__k[r]=null;if(a)for(r=0;r<s;r++)null!=(e=u[r])&&0==(2&e.__u)&&(e.__e==t&&(t=S(e)),D$1(e,e));return t}function A$1(n,l,u,t){var i,r;if("function"==typeof n.type){for(i=n.__k,r=0;i&&r<i.length;r++)i[r]&&(i[r].__=n,l=A$1(i[r],l,u,t));return l}n.__e!=l&&(t&&(l&&n.type&&!l.parentNode&&(l=S(n)),u.insertBefore(n.__e,l||null)),l=n.__e);do{l=l&&l.nextSibling;}while(null!=l&&8==l.nodeType);return l}function L(n,l,u,t){var i,r,o,e=n.key,f=n.type,c=l[u],s=null!=c&&0==(2&c.__u);if(null===c&&null==e||s&&e==c.key&&f==c.type)return u;if(t>(s?1:0))for(i=u-1,r=u+1;i>=0||r<l.length;)if(null!=(c=l[o=i>=0?i--:r++])&&0==(2&c.__u)&&e==c.key&&f==c.type)return o;return  -1}function T$1(n,l,u){"-"==l[0]?n.setProperty(l,null==u?"":u):n[l]=null==u?"":"number"!=typeof u||y$2.test(l)?u:u+"px";}function j$1(n,l,u,t,i){var r,o;n:if("style"==l)if("string"==typeof u)n.style.cssText=u;else {if("string"==typeof t&&(n.style.cssText=t=""),t)for(l in t)u&&l in u||T$1(n.style,l,"");if(u)for(l in u)t&&u[l]==t[l]||T$1(n.style,l,u[l]);}else if("o"==l[0]&&"n"==l[1])r=l!=(l=l.replace(f$3,"$1")),o=l.toLowerCase(),l=o in n||"onFocusOut"==l||"onFocusIn"==l?o.slice(2):l.slice(2),n.l||(n.l={}),n.l[l+r]=u,u?t?u.u=t.u:(u.u=c$2,n.addEventListener(l,r?a$3:s$3,r)):n.removeEventListener(l,r?a$3:s$3,r);else {if("http://www.w3.org/2000/svg"==i)l=l.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if("width"!=l&&"height"!=l&&"href"!=l&&"list"!=l&&"form"!=l&&"tabIndex"!=l&&"download"!=l&&"rowSpan"!=l&&"colSpan"!=l&&"role"!=l&&"popover"!=l&&l in n)try{n[l]=null==u?"":u;break n}catch(n){}"function"==typeof u||(null==u||false===u&&"-"!=l[4]?n.removeAttribute(l):n.setAttribute(l,"popover"==l&&1==u?"":u));}}function F(n){return function(u){if(this.l){var t=this.l[u.type+n];if(null==u.t)u.t=c$2++;else if(u.t<t.u)return;return t(l$3.event?l$3.event(u):u)}}}function O(n,u,t,i,r,o,e,f,c,s){var a,h,p,v,y,_,m,b,S,C,M,$,P,A,H,L,T,j=u.type;if(null!=u.constructor)return null;128&t.__u&&(c=!!(32&t.__u),o=[f=u.__e=t.__e]),(a=l$3.__b)&&a(u);n:if("function"==typeof j)try{if(b=u.props,S="prototype"in j&&j.prototype.render,C=(a=j.contextType)&&i[a.__c],M=a?C?C.props.value:a.__:i,t.__c?m=(h=u.__c=t.__c).__=h.__E:(S?u.__c=h=new j(b,M):(u.__c=h=new x(b,M),h.constructor=j,h.render=E$1),C&&C.sub(h),h.state||(h.state={}),h.__n=i,p=h.__d=!0,h.__h=[],h._sb=[]),S&&null==h.__s&&(h.__s=h.state),S&&null!=j.getDerivedStateFromProps&&(h.__s==h.state&&(h.__s=d$3({},h.__s)),d$3(h.__s,j.getDerivedStateFromProps(b,h.__s))),v=h.props,y=h.state,h.__v=u,p)S&&null==j.getDerivedStateFromProps&&null!=h.componentWillMount&&h.componentWillMount(),S&&null!=h.componentDidMount&&h.__h.push(h.componentDidMount);else {if(S&&null==j.getDerivedStateFromProps&&b!==v&&null!=h.componentWillReceiveProps&&h.componentWillReceiveProps(b,M),u.__v==t.__v||!h.__e&&null!=h.shouldComponentUpdate&&!1===h.shouldComponentUpdate(b,h.__s,M)){for(u.__v!=t.__v&&(h.props=b,h.state=h.__s,h.__d=!1),u.__e=t.__e,u.__k=t.__k,u.__k.some(function(n){n&&(n.__=u);}),$=0;$<h._sb.length;$++)h.__h.push(h._sb[$]);h._sb=[],h.__h.length&&e.push(h);break n}null!=h.componentWillUpdate&&h.componentWillUpdate(b,h.__s,M),S&&null!=h.componentDidUpdate&&h.__h.push(function(){h.componentDidUpdate(v,y,_);});}if(h.context=M,h.props=b,h.__P=n,h.__e=!1,P=l$3.__r,A=0,S){for(h.state=h.__s,h.__d=!1,P&&P(u),a=h.render(h.props,h.state,h.context),H=0;H<h._sb.length;H++)h.__h.push(h._sb[H]);h._sb=[];}else do{h.__d=!1,P&&P(u),a=h.render(h.props,h.state,h.context),h.state=h.__s;}while(h.__d&&++A<25);h.state=h.__s,null!=h.getChildContext&&(i=d$3(d$3({},i),h.getChildContext())),S&&!p&&null!=h.getSnapshotBeforeUpdate&&(_=h.getSnapshotBeforeUpdate(v,y)),L=a,null!=a&&a.type===k$1&&null==a.key&&(L=V(a.props.children)),f=I(n,w$2(L)?L:[L],u,t,i,r,o,e,f,c,s),h.base=u.__e,u.__u&=-161,h.__h.length&&e.push(h),m&&(h.__E=h.__=null);}catch(n){if(u.__v=null,c||null!=o)if(n.then){for(u.__u|=c?160:128;f&&8==f.nodeType&&f.nextSibling;)f=f.nextSibling;o[o.indexOf(f)]=null,u.__e=f;}else {for(T=o.length;T--;)g$1(o[T]);z$1(u);}else u.__e=t.__e,u.__k=t.__k,n.then||z$1(u);l$3.__e(n,u,t);}else null==o&&u.__v==t.__v?(u.__k=t.__k,u.__e=t.__e):f=u.__e=q$1(t.__e,u,t,i,r,o,e,c,s);return (a=l$3.diffed)&&a(u),128&u.__u?void 0:f}function z$1(n){n&&n.__c&&(n.__c.__e=true),n&&n.__k&&n.__k.forEach(z$1);}function N(n,u,t){for(var i=0;i<t.length;i++)B$1(t[i],t[++i],t[++i]);l$3.__c&&l$3.__c(u,n),n.some(function(u){try{n=u.__h,u.__h=[],n.some(function(n){n.call(u);});}catch(n){l$3.__e(n,u.__v);}});}function V(n){return "object"!=typeof n||null==n||n.__b&&n.__b>0?n:w$2(n)?n.map(V):d$3({},n)}function q$1(u,t,i,r,o,e,f,c,s){var a,h,v,y,d,_,m,b=i.props||p$3,k=t.props,x=t.type;if("svg"==x?o="http://www.w3.org/2000/svg":"math"==x?o="http://www.w3.org/1998/Math/MathML":o||(o="http://www.w3.org/1999/xhtml"),null!=e)for(a=0;a<e.length;a++)if((d=e[a])&&"setAttribute"in d==!!x&&(x?d.localName==x:3==d.nodeType)){u=d,e[a]=null;break}if(null==u){if(null==x)return document.createTextNode(k);u=document.createElementNS(o,x,k.is&&k),c&&(l$3.__m&&l$3.__m(t,e),c=false),e=null;}if(null==x)b===k||c&&u.data==k||(u.data=k);else {if(e=e&&n$1.call(u.childNodes),!c&&null!=e)for(b={},a=0;a<u.attributes.length;a++)b[(d=u.attributes[a]).name]=d.value;for(a in b)if(d=b[a],"children"==a);else if("dangerouslySetInnerHTML"==a)v=d;else if(!(a in k)){if("value"==a&&"defaultValue"in k||"checked"==a&&"defaultChecked"in k)continue;j$1(u,a,null,d,o);}for(a in k)d=k[a],"children"==a?y=d:"dangerouslySetInnerHTML"==a?h=d:"value"==a?_=d:"checked"==a?m=d:c&&"function"!=typeof d||b[a]===d||j$1(u,a,d,b[a],o);if(h)c||v&&(h.__html==v.__html||h.__html==u.innerHTML)||(u.innerHTML=h.__html),t.__k=[];else if(v&&(u.innerHTML=""),I("template"==t.type?u.content:u,w$2(y)?y:[y],t,i,r,"foreignObject"==x?"http://www.w3.org/1999/xhtml":o,e,f,e?e[0]:i.__k&&S(i,0),c,s),null!=e)for(a=e.length;a--;)g$1(e[a]);c||(a="value","progress"==x&&null==_?u.removeAttribute("value"):null!=_&&(_!==u[a]||"progress"==x&&!_||"option"==x&&_!=b[a])&&j$1(u,a,_,b[a],o),a="checked",null!=m&&m!=u[a]&&j$1(u,a,m,b[a],o));}return u}function B$1(n,u,t){try{if("function"==typeof n){var i="function"==typeof n.__u;i&&n.__u(),i&&null==u||(n.__u=n(u));}else n.current=u;}catch(n){l$3.__e(n,t);}}function D$1(n,u,t){var i,r;if(l$3.unmount&&l$3.unmount(n),(i=n.ref)&&(i.current&&i.current!=n.__e||B$1(i,null,u)),null!=(i=n.__c)){if(i.componentWillUnmount)try{i.componentWillUnmount();}catch(n){l$3.__e(n,u);}i.base=i.__P=null;}if(i=n.__k)for(r=0;r<i.length;r++)i[r]&&D$1(i[r],u,t||"function"!=typeof n.type);t||g$1(n.__e),n.__c=n.__=n.__e=void 0;}function E$1(n,l,u){return this.constructor(n,u)}function G(u,t,i){var r,o,e,f;t==document&&(t=document.documentElement),l$3.__&&l$3.__(u,t),o=(r="function"=="undefined")?null:t.__k,e=[],f=[],O(t,u=(t).__k=_$3(k$1,null,[u]),o||p$3,p$3,t.namespaceURI,o?null:t.firstChild?n$1.call(t.childNodes):null,e,o?o.__e:t.firstChild,r,f),N(e,u,f);}n$1=v$2.slice,l$3={__e:function(n,l,u,t){for(var i,r,o;l=l.__;)if((i=l.__c)&&!i.__)try{if((r=i.constructor)&&null!=r.getDerivedStateFromError&&(i.setState(r.getDerivedStateFromError(n)),o=i.__d),null!=i.componentDidCatch&&(i.componentDidCatch(n,t||{}),o=i.__d),o)return i.__E=i}catch(l){n=l;}throw n}},u$3=0,t$2=function(n){return null!=n&&null==n.constructor},x.prototype.setState=function(n,l){var u;u=null!=this.__s&&this.__s!=this.state?this.__s:this.__s=d$3({},this.state),"function"==typeof n&&(n=n(d$3({},u),this.props)),n&&d$3(u,n),null!=n&&this.__v&&(l&&this._sb.push(l),M(this));},x.prototype.forceUpdate=function(n){this.__v&&(this.__e=true,n&&this.__h.push(n),M(this));},x.prototype.render=k$1,i$2=[],o$2="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,e$2=function(n,l){return n.__v.__b-l.__v.__b},$.__r=0,f$3=/(PointerCapture)$|Capture$/i,c$2=0,s$3=F(false),a$3=F(true);

  var f$2=0;function u$2(e,t,n,o,i,u){t||(t={});var a,c,p=t;if("ref"in p)for(c in p={},t)"ref"==c?a=t[c]:p[c]=t[c];var l={type:e,props:p,key:n,ref:a,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--f$2,__i:-1,__u:0,__source:i,__self:u};if("function"==typeof e&&(a=e.defaultProps))for(c in a) void 0===p[c]&&(p[c]=a[c]);return l$3.vnode&&l$3.vnode(l),l}

  var t$1,r$1,u$1,i$1,o$1=0,f$1=[],c$1=l$3,e$1=c$1.__b,a$2=c$1.__r,v$1=c$1.diffed,l$2=c$1.__c,m=c$1.unmount,s$2=c$1.__;function p$2(n,t){c$1.__h&&c$1.__h(r$1,n,o$1||t),o$1=0;var u=r$1.__H||(r$1.__H={__:[],__h:[]});return n>=u.__.length&&u.__.push({}),u.__[n]}function d$2(n){return o$1=1,h$2(D,n)}function h$2(n,u,i){var o=p$2(t$1++,2);if(o.t=n,!o.__c&&(o.__=[D(void 0,u),function(n){var t=o.__N?o.__N[0]:o.__[0],r=o.t(t,n);t!==r&&(o.__N=[r,o.__[1]],o.__c.setState({}));}],o.__c=r$1,!r$1.__f)){var f=function(n,t,r){if(!o.__c.__H)return  true;var u=o.__c.__H.__.filter(function(n){return !!n.__c});if(u.every(function(n){return !n.__N}))return !c||c.call(this,n,t,r);var i=o.__c.props!==n;return u.forEach(function(n){if(n.__N){var t=n.__[0];n.__=n.__N,n.__N=void 0,t!==n.__[0]&&(i=true);}}),c&&c.call(this,n,t,r)||i};r$1.__f=true;var c=r$1.shouldComponentUpdate,e=r$1.componentWillUpdate;r$1.componentWillUpdate=function(n,t,r){if(this.__e){var u=c;c=void 0,f(n,t,r),c=u;}e&&e.call(this,n,t,r);},r$1.shouldComponentUpdate=f;}return o.__N||o.__}function y$1(n,u){var i=p$2(t$1++,3);!c$1.__s&&C(i.__H,u)&&(i.__=n,i.u=u,r$1.__H.__h.push(i));}function _$2(n,u){var i=p$2(t$1++,4);!c$1.__s&&C(i.__H,u)&&(i.__=n,i.u=u,r$1.__h.push(i));}function A(n){return o$1=5,T(function(){return {current:n}},[])}function T(n,r){var u=p$2(t$1++,7);return C(u.__H,r)&&(u.__=n(),u.__H=r,u.__h=n),u.__}function q(n,t){return o$1=8,T(function(){return n},t)}function j(){for(var n;n=f$1.shift();)if(n.__P&&n.__H)try{n.__H.__h.forEach(z),n.__H.__h.forEach(B),n.__H.__h=[];}catch(t){n.__H.__h=[],c$1.__e(t,n.__v);}}c$1.__b=function(n){r$1=null,e$1&&e$1(n);},c$1.__=function(n,t){n&&t.__k&&t.__k.__m&&(n.__m=t.__k.__m),s$2&&s$2(n,t);},c$1.__r=function(n){a$2&&a$2(n),t$1=0;var i=(r$1=n.__c).__H;i&&(u$1===r$1?(i.__h=[],r$1.__h=[],i.__.forEach(function(n){n.__N&&(n.__=n.__N),n.u=n.__N=void 0;})):(i.__h.forEach(z),i.__h.forEach(B),i.__h=[],t$1=0)),u$1=r$1;},c$1.diffed=function(n){v$1&&v$1(n);var t=n.__c;t&&t.__H&&(t.__H.__h.length&&(1!==f$1.push(t)&&i$1===c$1.requestAnimationFrame||((i$1=c$1.requestAnimationFrame)||w$1)(j)),t.__H.__.forEach(function(n){n.u&&(n.__H=n.u),n.u=void 0;})),u$1=r$1=null;},c$1.__c=function(n,t){t.some(function(n){try{n.__h.forEach(z),n.__h=n.__h.filter(function(n){return !n.__||B(n)});}catch(r){t.some(function(n){n.__h&&(n.__h=[]);}),t=[],c$1.__e(r,n.__v);}}),l$2&&l$2(n,t);},c$1.unmount=function(n){m&&m(n);var t,r=n.__c;r&&r.__H&&(r.__H.__.forEach(function(n){try{z(n);}catch(n){t=n;}}),r.__H=void 0,t&&c$1.__e(t,r.__v));};var k="function"==typeof requestAnimationFrame;function w$1(n){var t,r=function(){clearTimeout(u),k&&cancelAnimationFrame(t),setTimeout(n);},u=setTimeout(r,35);k&&(t=requestAnimationFrame(r));}function z(n){var t=r$1,u=n.__c;"function"==typeof u&&(n.__c=void 0,u()),r$1=t;}function B(n){var t=r$1;n.__c=n.__(),r$1=t;}function C(n,t){return !n||n.length!==t.length||t.some(function(t,r){return t!==n[r]})}function D(n,t){return "function"==typeof t?t(n):t}

  const __vitePreload = (m)=>m();

  var i=Symbol.for("preact-signals");function t(){if(!(s$1>1)){var i,t=false;while(void 0!==h$1){var r=h$1;h$1=void 0;f++;while(void 0!==r){var o=r.o;r.o=void 0;r.f&=-3;if(!(8&r.f)&&c(r))try{r.c();}catch(r){if(!t){i=r;t=true;}}r=o;}}f=0;s$1--;if(t)throw i}else s$1--;}function r(i){if(s$1>0)return i();s$1++;try{return i()}finally{t();}}var o=void 0;function n(i){var t=o;o=void 0;try{return i()}finally{o=t;}}var h$1=void 0,s$1=0,f=0,v=0;function e(i){if(void 0!==o){var t=i.n;if(void 0===t||t.t!==o){t={i:0,S:i,p:o.s,n:void 0,t:o,e:void 0,x:void 0,r:t};if(void 0!==o.s)o.s.n=t;o.s=t;i.n=t;if(32&o.f)i.S(t);return t}else if(-1===t.i){t.i=0;if(void 0!==t.n){t.n.p=t.p;if(void 0!==t.p)t.p.n=t.n;t.p=o.s;t.n=void 0;o.s.n=t;o.s=t;}return t}}}function u(i,t){this.v=i;this.i=0;this.n=void 0;this.t=void 0;this.W=null==t?void 0:t.watched;this.Z=null==t?void 0:t.unwatched;this.name=null==t?void 0:t.name;}u.prototype.brand=i;u.prototype.h=function(){return  true};u.prototype.S=function(i){var t=this,r=this.t;if(r!==i&&void 0===i.e){i.x=r;this.t=i;if(void 0!==r)r.e=i;else n(function(){var i;null==(i=t.W)||i.call(t);});}};u.prototype.U=function(i){var t=this;if(void 0!==this.t){var r=i.e,o=i.x;if(void 0!==r){r.x=o;i.e=void 0;}if(void 0!==o){o.e=r;i.x=void 0;}if(i===this.t){this.t=o;if(void 0===o)n(function(){var i;null==(i=t.Z)||i.call(t);});}}};u.prototype.subscribe=function(i){var t=this;return E(function(){var r=t.value,n=o;o=void 0;try{i(r);}finally{o=n;}},{name:"sub"})};u.prototype.valueOf=function(){return this.value};u.prototype.toString=function(){return this.value+""};u.prototype.toJSON=function(){return this.value};u.prototype.peek=function(){var i=o;o=void 0;try{return this.value}finally{o=i;}};Object.defineProperty(u.prototype,"value",{get:function(){var i=e(this);if(void 0!==i)i.i=this.i;return this.v},set:function(i){if(i!==this.v){if(f>100)throw new Error("Cycle detected");this.v=i;this.i++;v++;s$1++;try{for(var r=this.t;void 0!==r;r=r.x)r.t.N();}finally{t();}}}});function d$1(i,t){return new u(i,t)}function c(i){for(var t=i.s;void 0!==t;t=t.n)if(t.S.i!==t.i||!t.S.h()||t.S.i!==t.i)return  true;return  false}function a$1(i){for(var t=i.s;void 0!==t;t=t.n){var r=t.S.n;if(void 0!==r)t.r=r;t.S.n=t;t.i=-1;if(void 0===t.n){i.s=t;break}}}function l$1(i){var t=i.s,r=void 0;while(void 0!==t){var o=t.p;if(-1===t.i){t.S.U(t);if(void 0!==o)o.n=t.n;if(void 0!==t.n)t.n.p=o;}else r=t;t.S.n=t.r;if(void 0!==t.r)t.r=void 0;t=o;}i.s=r;}function y(i,t){u.call(this,void 0);this.x=i;this.s=void 0;this.g=v-1;this.f=4;this.W=null==t?void 0:t.watched;this.Z=null==t?void 0:t.unwatched;this.name=null==t?void 0:t.name;}y.prototype=new u;y.prototype.h=function(){this.f&=-3;if(1&this.f)return  false;if(32==(36&this.f))return  true;this.f&=-5;if(this.g===v)return  true;this.g=v;this.f|=1;if(this.i>0&&!c(this)){this.f&=-2;return  true}var i=o;try{a$1(this);o=this;var t=this.x();if(16&this.f||this.v!==t||0===this.i){this.v=t;this.f&=-17;this.i++;}}catch(i){this.v=i;this.f|=16;this.i++;}o=i;l$1(this);this.f&=-2;return  true};y.prototype.S=function(i){if(void 0===this.t){this.f|=36;for(var t=this.s;void 0!==t;t=t.n)t.S.S(t);}u.prototype.S.call(this,i);};y.prototype.U=function(i){if(void 0!==this.t){u.prototype.U.call(this,i);if(void 0===this.t){this.f&=-33;for(var t=this.s;void 0!==t;t=t.n)t.S.U(t);}}};y.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(var i=this.t;void 0!==i;i=i.x)i.t.N();}};Object.defineProperty(y.prototype,"value",{get:function(){if(1&this.f)throw new Error("Cycle detected");var i=e(this);this.h();if(void 0!==i)i.i=this.i;if(16&this.f)throw this.v;return this.v}});function w(i,t){return new y(i,t)}function _$1(i){var r=i.u;i.u=void 0;if("function"==typeof r){s$1++;var n=o;o=void 0;try{r();}catch(t){i.f&=-2;i.f|=8;b(i);throw t}finally{o=n;t();}}}function b(i){for(var t=i.s;void 0!==t;t=t.n)t.S.U(t);i.x=void 0;i.s=void 0;_$1(i);}function g(i){if(o!==this)throw new Error("Out-of-order effect");l$1(this);o=i;this.f&=-2;if(8&this.f)b(this);t();}function p$1(i,t){this.x=i;this.u=void 0;this.s=void 0;this.o=void 0;this.f=32;this.name=null==t?void 0:t.name;}p$1.prototype.c=function(){var i=this.S();try{if(8&this.f)return;if(void 0===this.x)return;var t=this.x();if("function"==typeof t)this.u=t;}finally{i();}};p$1.prototype.S=function(){if(1&this.f)throw new Error("Cycle detected");this.f|=1;this.f&=-9;_$1(this);a$1(this);s$1++;var i=o;o=this;return g.bind(this,i)};p$1.prototype.N=function(){if(!(2&this.f)){this.f|=2;this.o=h$1;h$1=this;}};p$1.prototype.d=function(){this.f|=8;if(!(1&this.f))b(this);};p$1.prototype.dispose=function(){this.d();};function E(i,t){var r=new p$1(i,t);try{r.c();}catch(i){r.d();throw i}var o=r.d.bind(r);o[Symbol.dispose]=o;return o}

  var s;function l(i,n){l$3[i]=n.bind(null,l$3[i]||function(){});}function d(i){if(s)s();s=i&&i.S();}function h(i){var r=this,f=i.data,o=useSignal(f);o.value=f;var e=T(function(){var i=r.__v;while(i=i.__)if(i.__c){i.__c.__$f|=4;break}r.__$u.c=function(){var i,t=r.__$u.S(),f=e.value;t();if(t$2(f)||3!==(null==(i=r.base)?void 0:i.nodeType)){r.__$f|=1;r.setState({});}else r.base.data=f;};return w(function(){var i=o.value.value;return 0===i?0:true===i?"":i||""})},[]);return e.value}h.displayName="_st";Object.defineProperties(u.prototype,{constructor:{configurable:true,value:void 0},type:{configurable:true,value:h},props:{configurable:true,get:function(){return {data:this}}},__b:{configurable:true,value:1}});l("__b",function(i,r){if("string"==typeof r.type){var n,t=r.props;for(var f in t)if("children"!==f){var o=t[f];if(o instanceof u){if(!n)r.__np=n={};n[f]=o;t[f]=o.peek();}}}i(r);});l("__r",function(i,r){d();var n,t=r.__c;if(t){t.__$f&=-2;if(void 0===(n=t.__$u))t.__$u=n=function(i){var r;E(function(){r=this;});r.c=function(){t.__$f|=1;t.setState({});};return r}();}d(n);i(r);});l("__e",function(i,r,n,t){d();i(r,n,t);});l("diffed",function(i,r){d();var n;if("string"==typeof r.type&&(n=r.__e)){var t=r.__np,f=r.props;if(t){var o=n.U;if(o)for(var e in o){var u=o[e];if(void 0!==u&&!(e in t)){u.d();o[e]=void 0;}}else n.U=o={};for(var a in t){var c=o[a],s=t[a];if(void 0===c){c=p(n,a,s,f);o[a]=c;}else c.o(s,f);}}}i(r);});function p(i,r,n,t){var f=r in i&&void 0===i.ownerSVGElement,o=d$1(n);return {o:function(i,r){o.value=i;t=r;},d:E(function(){var n=o.value.value;if(t[r]!==n){t[r]=n;if(f)i[r]=n;else if(n)i.setAttribute(r,n);else i.removeAttribute(r);}})}}l("unmount",function(i,r){if("string"==typeof r.type){var n=r.__e;if(n){var t=n.U;if(t){n.U=void 0;for(var f in t){var o=t[f];if(o)o.d();}}}}else {var e=r.__c;if(e){var u=e.__$u;if(u){e.__$u=void 0;u.d();}}}i(r);});l("__h",function(i,r,n,t){if(t<3||9===t)r.__$f|=2;i(r,n,t);});x.prototype.shouldComponentUpdate=function(i,r){var n=this.__$u,t=n&&void 0!==n.s;for(var f in r)return  true;if(this.__f||"boolean"==typeof this.u&&true===this.u){if(!(t||2&this.__$f||4&this.__$f))return  true;if(1&this.__$f)return  true}else {if(!(t||4&this.__$f))return  true;if(3&this.__$f)return  true}for(var o in i)if("__source"!==o&&i[o]!==this.props[o])return  true;for(var e in this.props)if(!(e in i))return  true;return  false};function useSignal(i){return T(function(){return d$1(i)},[])}

  const BACKEND_URL = "https://bgmchat.ry.mk";
  const UPLOAD_BASE_URL = "https://lsky.ry.mk";
  const WEBSOCKET_URL = "wss://bgmchat.ry.mk/ws";
  const BGM_APP_ID = "bgm460268b348b05f082";
  const BGM_CALLBACK_URL = `https://bgmchat.ry.mk/api/auth/callback`;
  const MESSAGE_GROUP_TIME_GAP = 300;
  const TYPING_STOP_DELAY = 2500;
  const DRAFT_SAVE_DELAY = 1e3;
  const SEARCH_DEBOUNCE = 500;
  const MENTION_DEBOUNCE = 300;
  const PRESENCE_SYNC_DELAY = 120;
  const TYPING_AUTO_CLEAR = 1e4;
  const HEARTBEAT_INTERVAL = 25e3;
  const RECONNECT_DELAY = 2e3;
  const CONNECTION_CHECK_INTERVAL = 1e4;
  const MAX_DOM_MESSAGES = 100;
  const MAX_MENTION_RESULTS = 10;
  const MAX_AVATARS_SHOWN = 5;
  const COLLAPSE_MAX_HEIGHT = 300;
  const NEW_MESSAGE_ANIMATION = 350;
  const CONTEXT_MENU_REACTIONS = [67, 63, 38, 124, 46, 106].map((n) => `(bgm${n})`);

  function updateSignalMap(sig, fn) {
    const next = new Map(sig.value);
    fn(next);
    sig.value = next;
  }
  function updateSignalSet(sig, fn) {
    const next = new Set(sig.value);
    fn(next);
    sig.value = next;
  }

  const CHAT_OPEN_KEY = "dollars.isChatOpen";
  const MAXIMIZED_KEY = "dollars.isMaximized";
  const MOBILE_CHAT_VIEW_KEY = "dollars.mobileChatViewActive";
  const CHAT_POSITION_KEY = "dollarsChatPosition";
  function readBoolean(key) {
    try {
      const raw = localStorage.getItem(key);
      return raw === null ? null : JSON.parse(raw);
    } catch {
      return null;
    }
  }
  function loadWindowState() {
    return {
      isChatOpen: readBoolean(CHAT_OPEN_KEY),
      isMaximized: readBoolean(MAXIMIZED_KEY),
      mobileChatViewActive: readBoolean(MOBILE_CHAT_VIEW_KEY),
      position: loadWindowPosition()
    };
  }
  function saveChatOpenState(isOpen) {
    localStorage.setItem(CHAT_OPEN_KEY, JSON.stringify(isOpen));
  }
  function saveMaximizedState(isMaximized) {
    localStorage.setItem(MAXIMIZED_KEY, JSON.stringify(isMaximized));
  }
  function saveMobileChatViewState(active) {
    localStorage.setItem(MOBILE_CHAT_VIEW_KEY, JSON.stringify(active));
  }
  function saveWindowPosition(position) {
    localStorage.setItem(CHAT_POSITION_KEY, JSON.stringify(position));
  }
  function loadWindowPosition() {
    try {
      const raw = localStorage.getItem(CHAT_POSITION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }
  function clearWindowState() {
    localStorage.removeItem(CHAT_OPEN_KEY);
    localStorage.removeItem(MAXIMIZED_KEY);
    localStorage.removeItem(MOBILE_CHAT_VIEW_KEY);
    localStorage.removeItem(CHAT_POSITION_KEY);
  }

  const BROWSE_POSITION_KEY = "dollars_browse_position";
  const browsePosition = d$1(null);
  function saveBrowsePosition(anchorMessageId) {
    const position = {
      anchorMessageId,
      timestamp: Date.now()
    };
    browsePosition.value = position;
    localStorage.setItem(BROWSE_POSITION_KEY, JSON.stringify(position));
  }
  function loadBrowsePosition() {
    try {
      const saved = localStorage.getItem(BROWSE_POSITION_KEY);
      if (!saved) return null;
      const position = JSON.parse(saved);
      const MAX_AGE = 24 * 60 * 60 * 1e3;
      if (Date.now() - position.timestamp > MAX_AGE) {
        clearBrowsePosition();
        return null;
      }
      browsePosition.value = position;
      return position;
    } catch {
      return null;
    }
  }
  function clearBrowsePosition() {
    browsePosition.value = null;
    localStorage.removeItem(BROWSE_POSITION_KEY);
  }

  const DRAFT_KEY_PREFIX = "dollars_draft_";
  const DRAFT_EXPIRY = 7 * 24 * 60 * 60 * 1e3;
  const currentDraft = d$1(null);
  function getDraftKey() {
    return `${DRAFT_KEY_PREFIX}main`;
  }
  function saveDraft(content, replyTo = null) {
    if (!content.trim() && !replyTo) {
      clearDraft();
      return;
    }
    const draft = {
      content,
      replyTo,
      timestamp: Date.now()
    };
    const key = getDraftKey();
    localStorage.setItem(key, JSON.stringify(draft));
    currentDraft.value = draft;
  }
  function loadDraft() {
    try {
      const key = getDraftKey();
      const saved = localStorage.getItem(key);
      if (!saved) return null;
      const draft = JSON.parse(saved);
      if (Date.now() - draft.timestamp > DRAFT_EXPIRY) {
        clearDraft();
        return null;
      }
      currentDraft.value = draft;
      return draft;
    } catch {
      return null;
    }
  }
  function clearDraft() {
    const key = getDraftKey();
    localStorage.removeItem(key);
    currentDraft.value = null;
  }

  function getChiiApp() {
    return chiiApp;
  }
  function getChiiLib() {
    return chiiLib;
  }

  const isLoggedIn = d$1(false);
  const userInfo = d$1({
    id: window.CHOBITS_UID?.toString() || "",
    name: window.CHOBITS_USERNAME || "",
    nickname: "",
    avatar: "",
    formhash: ""
  });
  const settings = d$1({
    showCard: true,
    linkPreview: true,
    sendShortcut: "CtrlEnter",
    sharePresence: false,
    notificationType: "off",
    loadImages: true,
    rememberOpenState: false,
    backgroundMode: "tint",
    glassBlur: true
  });
  const blockedUsers = d$1(/* @__PURE__ */ new Set());
  async function initializeBlockedUsers() {
    const list = window.data_ignore_users || [];
    if (!list.length) return;
    const newBlockedUsers = /* @__PURE__ */ new Set();
    let cache = {};
    let cacheDirty = false;
    try {
      const cloudSettings = getChiiApp().cloud_settings.getAll();
      if (cloudSettings?.dollars_blocked_cache) {
        cache = JSON.parse(cloudSettings.dollars_blocked_cache);
      }
    } catch (e) {
      console.warn("[Re:Dollars] Failed to parse blocked users cache", e);
    }
    const fetchPromises = [];
    for (const u of list) {
      const uStr = String(u);
      if (/^\d+$/.test(uStr)) {
        newBlockedUsers.add(uStr);
      } else {
        if (cache[uStr]) {
          newBlockedUsers.add(String(cache[uStr]));
        } else {
          fetchPromises.push(
            fetch(`https://api.bgm.tv/v0/users/${uStr}`).then((r) => r.ok ? r.json() : null).then((d) => {
              if (d?.id) {
                const id = String(d.id);
                newBlockedUsers.add(id);
                cache[uStr] = id;
                cacheDirty = true;
              }
            }).catch((e) => console.error(`[Re:Dollars] Failed to resolve user ${uStr}`, e))
          );
        }
      }
    }
    if (fetchPromises.length) {
      await Promise.all(fetchPromises);
    }
    blockedUsers.value = newBlockedUsers;
    if (cacheDirty) {
      try {
        const cloud = getChiiApp().cloud_settings;
        cloud.update({ dollars_blocked_cache: JSON.stringify(cache) });
        cloud.save();
      } catch (e) {
      }
    }
  }
  function initUserInfo() {
    const nicknameEl = document.querySelector("#dock .content ul li:first-child a span");
    const avatarEl = document.querySelector(".avatarNeue.avatarSize32");
    const formhashEl = document.querySelector('input[name="formhash"]');
    userInfo.value = {
      ...userInfo.value,
      nickname: nicknameEl?.textContent?.trim() || window.CHOBITS_USERNAME || "",
      avatar: avatarEl?.style.backgroundImage?.slice(5, -2) || "",
      formhash: formhashEl?.value || ""
    };
  }
  function loadSettingsFromCloud() {
    const cloudSettings = getChiiApp().cloud_settings.getAll();
    if (!cloudSettings) return;
    const defaults = settings.peek();
    const newSettings = { ...defaults };
    for (const key in cloudSettings) {
      if (key in defaults) {
        const defaultValue = defaults[key];
        if (typeof defaultValue === "boolean") {
          newSettings[key] = cloudSettings[key] === "true";
        } else {
          newSettings[key] = cloudSettings[key];
        }
      }
    }
    settings.value = newSettings;
  }
  function saveSettings() {
    const cloud = getChiiApp().cloud_settings;
    const settingsToSave = {};
    const currentSettings = settings.peek();
    for (const key in currentSettings) {
      settingsToSave[key] = String(currentSettings[key]);
    }
    cloud.update(settingsToSave);
    cloud.save();
  }
  function getToken() {
    return getChiiApp().cloud_settings.getAll()?.dollarsAuthToken || null;
  }
  function getAuthHeaders() {
    const token = getToken();
    return token ? { "Authorization": `Bearer ${token}` } : {};
  }

  const user = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    blockedUsers,
    getAuthHeaders,
    getToken,
    initUserInfo,
    initializeBlockedUsers,
    isLoggedIn,
    loadSettingsFromCloud,
    saveSettings,
    settings,
    userInfo
  }, Symbol.toStringTag, { value: 'Module' }));

  const lastReadId = d$1(null);
  const pendingReadId = d$1(null);
  const isReadStateSyncing = d$1(false);
  const hasUnreadMessages = w(() => {
    const readId = lastReadId.value;
    if (!readId) return false;
    const newestId = historyNewestId.value;
    return newestId !== null && newestId > readId;
  });
  const unreadCount = w(() => {
    const readId = lastReadId.value;
    if (!readId) return 0;
    const ids = messageIds.value;
    return ids.filter((id) => id > readId).length;
  });
  function getReadStateUserId() {
    const uid = window.CHOBITS_UID;
    return uid ? Number(uid) : null;
  }
  async function loadReadState() {
    try {
      const userId = getReadStateUserId();
      if (!userId) {
        console.warn("Cannot load read state: user not logged in");
        return null;
      }
      isReadStateSyncing.value = true;
      const response = await fetch(`${BACKEND_URL}/api/messages/read?user_id=${userId}`, {
        headers: getAuthHeaders(),
        credentials: "include"
      });
      if (!response.ok) return null;
      const data = await response.json();
      if (data.status && typeof data.last_read_id === "number") {
        const remoteId = data.last_read_id;
        const localId = lastReadId.value || 0;
        const effectiveId = Math.max(remoteId, localId);
        lastReadId.value = effectiveId;
        if (localId > remoteId) {
          syncReadStateToBackend(localId);
        }
        return effectiveId;
      }
      return null;
    } catch (e) {
      console.error("Failed to load read state:", e);
      return null;
    } finally {
      isReadStateSyncing.value = false;
    }
  }
  function updateReadState(messageId) {
    const current = lastReadId.value;
    if (current !== null && messageId <= current) return;
    lastReadId.value = messageId;
    pendingReadId.value = messageId;
    debouncedSyncToBackend();
  }
  let syncTimer = null;
  function debouncedSyncToBackend() {
    if (syncTimer) clearTimeout(syncTimer);
    syncTimer = window.setTimeout(() => {
      const pending = pendingReadId.value;
      if (pending !== null) {
        syncReadStateToBackend(pending);
        pendingReadId.value = null;
      }
    }, 500);
  }
  async function syncReadStateToBackend(messageId) {
    try {
      const userId = getReadStateUserId();
      if (!userId) {
        console.warn("Cannot sync read state: user not logged in");
        return;
      }
      const response = await fetch(`${BACKEND_URL}/api/messages/read`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders()
        },
        credentials: "include",
        body: JSON.stringify({ user_id: userId, last_read_id: messageId })
      });
      if (!response.ok) {
        pendingReadId.value = messageId;
        return;
      }
      const data = await response.json();
      if (data.status && typeof data.effective_last_read_id === "number") {
        const effective = data.effective_last_read_id;
        if (effective > (lastReadId.value || 0)) {
          lastReadId.value = effective;
        }
      }
    } catch (e) {
      console.error("Failed to sync read state:", e);
      pendingReadId.value = messageId;
    }
  }
  function markSentMessageAsRead(messageId) {
    updateReadState(messageId);
  }
  function getFirstUnreadId() {
    const readId = lastReadId.value;
    if (!readId) return null;
    const ids = messageIds.peek();
    for (const id of ids) {
      if (id > readId) return id;
    }
    return null;
  }

  const conversations = d$1([
    {
      id: "dollars",
      type: "channel",
      title: "Re:Dollars",
      avatar: "https://lsky.ry.mk/i/2025/09/06/68bc5540a8c51.webp",
      lastMessage: { text: "", timestamp: 0 },
      unreadCount: 0
    }
  ]);
  const activeConversationId = d$1("dollars");
  function setActiveConversation(conversationId) {
    activeConversationId.value = conversationId;
    __vitePreload(async () => { const {activeExtensionId, extensionConversations} = await Promise.resolve().then(() => extensionConversations$1);return { activeExtensionId, extensionConversations }},false             ?__VITE_PRELOAD__:void 0).then(({ activeExtensionId, extensionConversations }) => {
      if (activeExtensionId.value !== null) {
        const activeExt = extensionConversations.value.find(
          (item) => item.id === activeExtensionId.value
        );
        if (activeExt?.onDeactivate) {
          activeExt.onDeactivate();
        }
        activeExtensionId.value = null;
      }
    });
  }
  function updateConversationLastMessage(conversationId, text, timestamp) {
    const updated = conversations.value.map(
      (conv) => conv.id === conversationId ? { ...conv, lastMessage: { text, timestamp } } : conv
    );
    updated.sort((a, b) => (b.lastMessage.timestamp || 0) - (a.lastMessage.timestamp || 0));
    conversations.value = updated;
  }

  const scrollButtonMode = d$1("to-bottom");
  function getCurrentUserId() {
    return String(window.CHOBITS_UID || "");
  }
  const messageMap = d$1(/* @__PURE__ */ new Map());
  function getRawMessage(id) {
    return messageMap.value.get(Number(id))?.message;
  }
  const messageIds = w(() => {
    const map = messageMap.value;
    return Array.from(map.keys()).sort((a, b) => {
      const msgA = map.get(a);
      const msgB = map.get(b);
      if (msgA.timestamp !== msgB.timestamp) return msgA.timestamp - msgB.timestamp;
      if (msgA.uid === 0 && msgB.uid !== 0) return 1;
      if (msgA.uid !== 0 && msgB.uid === 0) return -1;
      return a - b;
    });
  });
  const isChatOpen = d$1(false);
  const isLoadingHistory = d$1(false);
  const historyFullyLoaded = d$1(false);
  const historyOldestId = d$1(null);
  const historyNewestId = d$1(null);
  const timelineIsLive = d$1(true);
  const isContextLoading = d$1(false);
  const initialMessagesLoaded = d$1(false);
  const replyingTo = d$1(null);
  const editingMessage = d$1(null);
  const unreadWhileScrolled = d$1(0);
  const unreadJumpList = d$1([]);
  const searchQuery = d$1("");
  const pendingMention = d$1(null);
  const currentDateLabel = d$1(null);
  const showScrollBottomBtn = d$1(false);
  const newMessageIds = d$1(/* @__PURE__ */ new Set());
  const pendingJumpToMessage = d$1(null);
  let nextOptimisticId = -1;
  const pendingTimeouts = /* @__PURE__ */ new Map();
  const PENDING_TIMEOUT_MS = 1e4;
  const wsConnected = d$1(false);
  const onlineUsers = d$1(/* @__PURE__ */ new Map());
  const onlineCount = d$1(0);
  const typingUsers = d$1(/* @__PURE__ */ new Map());
  function getMessageGrouping(msgId) {
    const map = messageMap.peek();
    const ids = messageIds.peek();
    const userId = getCurrentUserId();
    const msg = map.get(msgId);
    if (!msg) {
      return { isSelf: false, isGrouped: false, isGroupedWithNext: false };
    }
    const index = ids.indexOf(msgId);
    const prevId = index > 0 ? ids[index - 1] : null;
    const nextId = index < ids.length - 1 ? ids[index + 1] : null;
    const prevMsg = prevId ? map.get(prevId) : null;
    const nextMsg = nextId ? map.get(nextId) : null;
    const isSameUserAsPrev = prevMsg && String(prevMsg.uid) === String(msg.uid) && msg.timestamp - prevMsg.timestamp < MESSAGE_GROUP_TIME_GAP;
    const isSameUserAsNext = nextMsg && String(nextMsg.uid) === String(msg.uid) && nextMsg.timestamp - msg.timestamp < MESSAGE_GROUP_TIME_GAP;
    return {
      isSelf: String(msg.uid) === String(userId),
      isGrouped: !!isSameUserAsPrev,
      isGroupedWithNext: !!isSameUserAsNext
    };
  }
  const pendingScrollToBottom = d$1(false);
  const manualScrollToBottom = d$1(0);
  const isAtBottom = d$1(true);
  function addMessage(msg, tempId) {
    r(() => {
      const map = new Map(messageMap.value);
      let replacedOptimistic = false;
      let inheritedStableKey;
      let matchedTempId;
      if (tempId) {
        for (const [id, m] of map) {
          if (m.state === "sending" && m.stableKey === tempId) {
            inheritedStableKey = m.stableKey;
            matchedTempId = id;
            map.delete(id);
            replacedOptimistic = true;
            break;
          }
        }
      }
      if (matchedTempId !== void 0) {
        const timeout = pendingTimeouts.get(matchedTempId);
        if (timeout) {
          clearTimeout(timeout);
          pendingTimeouts.delete(matchedTempId);
        }
      }
      const confirmedMsg = inheritedStableKey ? { ...msg, stableKey: inheritedStableKey, state: "sent" } : { ...msg, state: "sent" };
      map.set(confirmedMsg.id, confirmedMsg);
      messageMap.value = map;
      if (!replacedOptimistic) {
        updateSignalSet(newMessageIds, (s) => s.add(confirmedMsg.id));
        setTimeout(() => updateSignalSet(newMessageIds, (s) => s.delete(confirmedMsg.id)), 350);
      }
      pendingScrollToBottom.value = true;
    });
  }
  function addOptimisticMessage(content, user, replyToId, replyDetails, imageMeta) {
    const tempId = nextOptimisticId--;
    const stableKey = `temp-${Math.random().toString(36).slice(2)}`;
    const optimisticMsg = {
      id: tempId,
      uid: Number(user.id),
      nickname: user.nickname,
      avatar: user.avatar,
      message: content,
      timestamp: Math.floor(Date.now() / 1e3),
      reply_to_id: replyToId,
      reply_details: replyDetails,
      image_meta: imageMeta,
      stableKey,
      state: "sending"
    };
    r(() => {
      const map = new Map(messageMap.value);
      map.set(tempId, optimisticMsg);
      messageMap.value = map;
      updateSignalSet(newMessageIds, (s) => s.add(tempId));
      setTimeout(() => updateSignalSet(newMessageIds, (s) => s.delete(tempId)), 350);
      manualScrollToBottom.value++;
    });
    const timeoutId = setTimeout(() => {
      markMessageFailed(tempId);
      pendingTimeouts.delete(tempId);
    }, PENDING_TIMEOUT_MS);
    pendingTimeouts.set(tempId, timeoutId);
    return { tempId, stableKey };
  }
  function markMessageFailed(tempId) {
    const msg = messageMap.value.get(tempId);
    if (msg && msg.state === "sending") {
      updateSignalMap(messageMap, (map) => map.set(tempId, { ...msg, state: "failed" }));
    }
  }
  function removeOptimisticMessage(tempId) {
    const timeout = pendingTimeouts.get(tempId);
    if (timeout) {
      clearTimeout(timeout);
      pendingTimeouts.delete(tempId);
    }
    updateSignalMap(messageMap, (map) => map.delete(tempId));
  }
  function retryMessage(tempId) {
    const msg = messageMap.value.get(tempId);
    if (!msg || msg.state !== "failed") return null;
    const content = msg.message;
    const stableKey = msg.stableKey || `temp-${Math.random().toString(36).slice(2)}`;
    updateSignalMap(messageMap, (map) => map.set(tempId, { ...msg, state: "sending" }));
    const timeoutId = setTimeout(() => {
      markMessageFailed(tempId);
      pendingTimeouts.delete(tempId);
    }, PENDING_TIMEOUT_MS);
    pendingTimeouts.set(tempId, timeoutId);
    return { content, stableKey };
  }
  function addMessagesBatch(newMessages) {
    if (newMessages.length === 0) return;
    const map = new Map(messageMap.value);
    for (const msg of newMessages) {
      const existing = map.get(msg.id);
      if (!existing || msg.edited_at && msg.edited_at > (existing.edited_at || 0)) {
        map.set(msg.id, msg);
      }
    }
    messageMap.value = map;
  }
  function updateMessage(id, updates) {
    const existing = messageMap.value.get(id);
    if (existing) {
      updateSignalMap(messageMap, (map) => map.set(id, { ...existing, ...updates }));
    }
  }
  function getMessageById(id) {
    return messageMap.value.get(id);
  }
  function deleteMessage$1(id) {
    updateMessage(id, { is_deleted: true });
  }
  function clearMessages() {
    messageMap.value = /* @__PURE__ */ new Map();
  }
  function setMessages(newMessages) {
    const map = /* @__PURE__ */ new Map();
    for (const msg of newMessages) {
      map.set(msg.id, msg);
    }
    messageMap.value = map;
  }
  async function loadMessageContext(messageId) {
    isLoadingHistory.value = true;
    try {
      const { fetchMessageContext } = await __vitePreload(async () => { const { fetchMessageContext } = await Promise.resolve().then(() => api);return { fetchMessageContext }},false             ?__VITE_PRELOAD__:void 0);
      const result = await fetchMessageContext(messageId);
      if (result && result.messages.length > 0) {
        r(() => {
          clearMessages();
          addMessagesBatch(result.messages);
          historyOldestId.value = result.messages[0].id;
          historyNewestId.value = result.messages[result.messages.length - 1].id;
          historyFullyLoaded.value = !result.has_more_before;
          timelineIsLive.value = false;
        });
        return { targetIndex: result.target_index };
      }
    } catch (e) {
    } finally {
      isLoadingHistory.value = false;
    }
    return null;
  }
  function toggleChat(open, skipSave = false) {
    const newState = open ?? !isChatOpen.value;
    isChatOpen.value = newState;
    if (!skipSave) {
      saveChatOpenState(newState);
    }
  }
  function setReplyTo(data) {
    replyingTo.value = data;
    editingMessage.value = null;
  }
  function setEditingMessage(data) {
    editingMessage.value = data;
    replyingTo.value = null;
  }
  function cancelReplyOrEdit() {
    replyingTo.value = null;
    editingMessage.value = null;
  }

  const chat = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    activeConversationId,
    addMessage,
    addMessagesBatch,
    addOptimisticMessage,
    browsePosition,
    cancelReplyOrEdit,
    clearBrowsePosition,
    clearDraft,
    clearMessages,
    conversations,
    currentDateLabel,
    currentDraft,
    deleteMessage: deleteMessage$1,
    editingMessage,
    getFirstUnreadId,
    getMessageById,
    getMessageGrouping,
    getRawMessage,
    hasUnreadMessages,
    historyFullyLoaded,
    historyNewestId,
    historyOldestId,
    initialMessagesLoaded,
    isAtBottom,
    isChatOpen,
    isContextLoading,
    isLoadingHistory,
    isReadStateSyncing,
    lastReadId,
    loadBrowsePosition,
    loadDraft,
    loadMessageContext,
    loadReadState,
    manualScrollToBottom,
    markMessageFailed,
    markSentMessageAsRead,
    messageIds,
    messageMap,
    newMessageIds,
    onlineCount,
    onlineUsers,
    pendingJumpToMessage,
    pendingMention,
    pendingReadId,
    pendingScrollToBottom,
    removeOptimisticMessage,
    replyingTo,
    retryMessage,
    saveBrowsePosition,
    saveDraft,
    scrollButtonMode,
    searchQuery,
    setActiveConversation,
    setEditingMessage,
    setMessages,
    setReplyTo,
    showScrollBottomBtn,
    timelineIsLive,
    toggleChat,
    typingUsers,
    unreadCount,
    unreadJumpList,
    unreadWhileScrolled,
    updateConversationLastMessage,
    updateMessage,
    updateReadState,
    wsConnected
  }, Symbol.toStringTag, { value: 'Module' }));

  const EXCLUSIVE_GROUP = /* @__PURE__ */ new Set(["smiley", "contextMenu", "profileCard"]);
  const ANIMATION_DURATION = {
    smiley: 200,
    contextMenu: 150,
    reactionPicker: 150,
    profileCard: 200,
    userProfile: 250
  };
  const activePanels = d$1(/* @__PURE__ */ new Set());
  const closingPanels = d$1(/* @__PURE__ */ new Set());
  const isSmileyPanelOpen = w(() => activePanels.value.has("smiley"));
  const isSmileyPanelClosing = w(() => closingPanels.value.has("smiley"));
  const isContextMenuOpen = w(() => activePanels.value.has("contextMenu"));
  const isContextMenuClosing = w(() => closingPanels.value.has("contextMenu"));
  const isReactionPickerOpen = w(() => activePanels.value.has("reactionPicker"));
  const isReactionPickerClosing = w(() => closingPanels.value.has("reactionPicker"));
  w(() => activePanels.value.has("profileCard"));
  const isProfileCardClosing = w(() => closingPanels.value.has("profileCard"));
  const isUserProfilePanelOpen = w(() => activePanels.value.has("userProfile"));
  const isUserProfilePanelClosing = w(() => closingPanels.value.has("userProfile"));
  const isSearchActive = w(() => activePanels.value.has("search"));
  const isImageViewerOpen = w(() => activePanels.value.has("imageViewer"));
  const contextMenuPosition = d$1({ x: 0, y: 0 });
  const contextMenuTargetId = d$1(null);
  const contextMenuImageUrl = d$1(null);
  const contextMenuBmoCode = d$1(null);
  const profileCardUserId = d$1(null);
  const profileCardAnchor = d$1(null);
  const userProfilePanelUserId = d$1(null);
  const imageViewerItems = d$1([]);
  const imageViewerImages = w(() => imageViewerItems.value.map((item) => item.src));
  const imageViewerIndex = d$1(0);
  const imageViewerSource = d$1("generic");
  const reactionPickerPosition = d$1({ x: 0, y: 0, width: 280 });
  function addPanel(id) {
    const next = new Set(activePanels.value);
    next.add(id);
    activePanels.value = next;
    if (closingPanels.value.has(id)) {
      const nextClosing = new Set(closingPanels.value);
      nextClosing.delete(id);
      closingPanels.value = nextClosing;
    }
  }
  function removePanel(id) {
    if (!activePanels.value.has(id)) return;
    const next = new Set(activePanels.value);
    next.delete(id);
    activePanels.value = next;
    if (closingPanels.value.has(id)) {
      const nextClosing = new Set(closingPanels.value);
      nextClosing.delete(id);
      closingPanels.value = nextClosing;
    }
  }
  function setClosing(id) {
    const next = new Set(closingPanels.value);
    next.add(id);
    closingPanels.value = next;
  }
  function closeExclusiveGroup(except) {
    for (const id of EXCLUSIVE_GROUP) {
      if (id !== except && activePanels.value.has(id)) {
        hidePanelImmediate(id);
      }
    }
  }
  function hidePanelImmediate(id) {
    removePanel(id);
    cleanupPanelState(id);
  }
  function cleanupPanelState(id) {
    switch (id) {
      case "contextMenu":
        contextMenuTargetId.value = null;
        contextMenuImageUrl.value = null;
        contextMenuBmoCode.value = null;
        break;
      case "profileCard":
        profileCardUserId.value = null;
        profileCardAnchor.value = null;
        break;
      case "userProfile":
        userProfilePanelUserId.value = null;
        break;
      case "imageViewer":
        imageViewerItems.value = [];
        imageViewerIndex.value = 0;
        imageViewerSource.value = "generic";
        break;
    }
  }
  function showPanel(id) {
    if (EXCLUSIVE_GROUP.has(id)) {
      closeExclusiveGroup(id);
    }
    addPanel(id);
  }
  function hidePanel(id) {
    if (!activePanels.value.has(id)) return;
    if (closingPanels.value.has(id)) return;
    const duration = ANIMATION_DURATION[id];
    if (duration) {
      setClosing(id);
      setTimeout(() => {
        removePanel(id);
        cleanupPanelState(id);
      }, duration);
    } else {
      removePanel(id);
      cleanupPanelState(id);
    }
  }
  function togglePanel(id, open) {
    const shouldOpen = open ?? !activePanels.value.has(id);
    if (shouldOpen) {
      showPanel(id);
    } else {
      hidePanel(id);
    }
  }
  function showContextMenu(x, y, targetId, imageUrl, bmoCode) {
    contextMenuPosition.value = { x, y };
    contextMenuTargetId.value = targetId;
    contextMenuImageUrl.value = imageUrl ?? null;
    contextMenuBmoCode.value = bmoCode ?? null;
    showPanel("contextMenu");
  }
  function hideContextMenu() {
    if (!isContextMenuOpen.value || isContextMenuClosing.value) return;
    hideReactionPicker();
    hidePanel("contextMenu");
  }
  function showReactionPicker(x, y, width) {
    reactionPickerPosition.value = { x, y, width: width || 280 };
    showPanel("reactionPicker");
  }
  function hideReactionPicker() {
    if (!isReactionPickerOpen.value || isReactionPickerClosing.value) return;
    hidePanel("reactionPicker");
  }
  function toggleSmileyPanel(open) {
    togglePanel("smiley", open);
  }
  function showProfileCard(userId, anchor) {
    if (profileCardUserId.value === userId) {
      hideProfileCard();
      return;
    }
    profileCardUserId.value = userId;
    profileCardAnchor.value = anchor;
    showPanel("profileCard");
  }
  function hideProfileCard() {
    if (!profileCardUserId.value || isProfileCardClosing.value) return;
    hidePanel("profileCard");
  }
  function showUserProfile(userId) {
    userProfilePanelUserId.value = userId;
    showPanel("userProfile");
  }
  function hideUserProfile() {
    if (!isUserProfilePanelOpen.value || isUserProfilePanelClosing.value) return;
    hidePanel("userProfile");
  }
  function showImageViewer(images, index = 0, source = "generic") {
    imageViewerItems.value = images.map(
      (item) => typeof item === "string" ? { src: item } : item
    );
    imageViewerIndex.value = index;
    imageViewerSource.value = source;
    showPanel("imageViewer");
  }
  function hideImageViewer() {
    removePanel("imageViewer");
    cleanupPanelState("imageViewer");
  }
  function toggleSearch(active) {
    togglePanel("search", active);
  }

  const isMobileViewport = d$1(window.innerWidth <= 768);
  const isNarrowLayout = d$1(false);
  const isMaximized = d$1(false);
  const mobileChatViewActive = d$1(false);
  const inputAreaHeight = d$1(60);
  window.addEventListener("resize", () => {
    isMobileViewport.value = window.innerWidth <= 768;
  });
  function toggleMaximize() {
    isMaximized.value = !isMaximized.value;
    __vitePreload(async () => { const {settings} = await Promise.resolve().then(() => user);return { settings }},false             ?__VITE_PRELOAD__:void 0).then(({ settings }) => {
      if (settings.value.rememberOpenState) {
        saveMaximizedState(isMaximized.value);
      }
    });
  }
  function setMobileChatView(active) {
    mobileChatViewActive.value = active;
    __vitePreload(async () => { const {settings} = await Promise.resolve().then(() => user);return { settings }},false             ?__VITE_PRELOAD__:void 0).then(({ settings }) => {
      if (settings.value.rememberOpenState) {
        saveMobileChatViewState(active);
      }
    });
  }
  let hasInitializedLayout = false;
  function resetLayoutCheck() {
    hasInitializedLayout = false;
  }
  function checkNarrowLayout(width) {
    const wasNarrow = isNarrowLayout.value;
    const isNowNarrow = width < 600 || isMobileViewport.value;
    isNarrowLayout.value = isNowNarrow;
    if (!hasInitializedLayout) {
      hasInitializedLayout = true;
      const savedMobileChatView = loadWindowState().mobileChatViewActive;
      if (savedMobileChatView === null) {
        if (isNowNarrow) {
          mobileChatViewActive.value = true;
        } else {
          mobileChatViewActive.value = false;
        }
      }
      return;
    }
    if (!wasNarrow && isNowNarrow) {
      mobileChatViewActive.value = true;
    } else if (wasNarrow && !isNowNarrow) {
      mobileChatViewActive.value = false;
    }
  }
  function ensureNarrowLayoutChatView(width) {
    const isNowNarrow = width < 600 || isMobileViewport.value;
    isNarrowLayout.value = isNowNarrow;
    if (isNowNarrow && !mobileChatViewActive.value) {
      mobileChatViewActive.value = true;
    }
  }

  const ui = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    activePanels,
    checkNarrowLayout,
    closingPanels,
    contextMenuBmoCode,
    contextMenuImageUrl,
    contextMenuPosition,
    contextMenuTargetId,
    ensureNarrowLayoutChatView,
    hideContextMenu,
    hideImageViewer,
    hidePanel,
    hideProfileCard,
    hideReactionPicker,
    hideUserProfile,
    imageViewerImages,
    imageViewerIndex,
    imageViewerItems,
    imageViewerSource,
    inputAreaHeight,
    isContextMenuClosing,
    isContextMenuOpen,
    isImageViewerOpen,
    isMaximized,
    isMobileViewport,
    isNarrowLayout,
    isProfileCardClosing,
    isReactionPickerClosing,
    isReactionPickerOpen,
    isSearchActive,
    isSmileyPanelClosing,
    isSmileyPanelOpen,
    isUserProfilePanelClosing,
    isUserProfilePanelOpen,
    mobileChatViewActive,
    profileCardAnchor,
    profileCardUserId,
    reactionPickerPosition,
    resetLayoutCheck,
    setMobileChatView,
    showContextMenu,
    showImageViewer,
    showPanel,
    showProfileCard,
    showReactionPicker,
    showUserProfile,
    toggleMaximize,
    togglePanel,
    toggleSearch,
    toggleSmileyPanel,
    userProfilePanelUserId
  }, Symbol.toStringTag, { value: 'Module' }));

  const extensionConversations = d$1([]);
  const activeExtensionId = d$1(null);
  function registerConversationItem(item) {
    const existing = extensionConversations.value.find((i) => i.id === item.id);
    if (existing) {
      extensionConversations.value = extensionConversations.value.map(
        (i) => i.id === item.id ? item : i
      );
    } else {
      extensionConversations.value = [...extensionConversations.value, item];
    }
    return () => {
      extensionConversations.value = extensionConversations.value.filter((i) => i.id !== item.id);
    };
  }
  function updateConversationItem(id, updates) {
    extensionConversations.value = extensionConversations.value.map(
      (item) => item.id === id ? { ...item, ...updates } : item
    );
  }
  function setActiveExtension(extensionId) {
    activeExtensionId.value = extensionId;
    __vitePreload(async () => { const {activeConversationId} = await Promise.resolve().then(() => chat);return { activeConversationId }},false             ?__VITE_PRELOAD__:void 0).then(({ activeConversationId }) => {
      activeConversationId.value = "";
    });
  }

  const extensionConversations$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    activeExtensionId,
    extensionConversations,
    registerConversationItem,
    setActiveExtension,
    updateConversationItem
  }, Symbol.toStringTag, { value: 'Module' }));

  const _ = "http://www.w3.org/2000/svg";
  const a = 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
  const s24 = (c) => `<svg xmlns="${_}" width="24" height="24" viewBox="0 0 24 24" ${a}>${c}</svg>`;
  const s20 = (c) => `<svg xmlns="${_}" width="20" height="20" viewBox="0 0 24 24" ${a}>${c}</svg>`;
  const iconSpoiler = s24('<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10.585 10.587a2 2 0 0 0 2.829 2.828"/><path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87"/><path d="M3 3l18 18"/>');
  const iconBold = s24('<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 5h6a3.5 3.5 0 0 1 0 7h-6z"/><path d="M13 12h1a3.5 3.5 0 0 1 0 7h-7v-7"/>');
  const iconItalic = s24('<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M11 5l6 0"/><path d="M7 19l6 0"/><path d="M14 5l-4 14"/>');
  const iconUnderline = s24('<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 5v5a5 5 0 0 0 10 0v-5"/><path d="M5 19h14"/>');
  const iconStrike = s24('<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0"/><path d="M16 6.5a4 2 0 0 0 -4 -1.5h-1a3.5 3.5 0 0 0 0 7h2a3.5 3.5 0 0 1 0 7h-1.5a4 2 0 0 1 -4 -1.5"/>');
  const iconCode = s24('<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 8l-4 4l4 4"/><path d="M17 8l4 4l-4 4"/><path d="M14 4l-4 16"/>');
  const iconLink = s24('<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 15l6 -6"/><path d="M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464"/><path d="M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463"/>');
  const iconCheck = s20('<polyline points="20 6 9 17 4 12"/>');
  const iconBack = s20('<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>');
  const iconUpload = s24('<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>');
  const iconClose = s24('<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>');
  const iconSearch = s24('<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>');
  const iconSend = s24('<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>');
  const iconEmoji = s24('<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>');
  const iconArrowLeft = s24('<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>');
  const iconStar = s24('<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"/>');
  const iconBmoPanel = s20('<path d="M12 5l0 14"/><path d="M5 12l14 0"/>');
  const iconHome = s24('<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l-2 0l9 -9l9 9l-2 0"/><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"/><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"/>');
  const iconHistory = s24('<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 8l0 4l2 2"/><path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5"/>');
  const iconExpand = s24('<path d="M6 9l6 6l6 -6"/>');
  const iconReply = s24('<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12"/><path d="M11 8l-3 3l3 3"/><path d="M16 11h-8"/>');
  const iconCopy = s24('<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 9.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667l0 -8.666"/><path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1"/>');
  const iconEdit = s24('<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"/><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415"/><path d="M16 5l3 3"/>');
  const iconDelete = s24('<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"/><path d="M9 15l6 -6"/><path d="M11 9h4v4"/>');
  const iconFavorite = s24('<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 20l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.96 6.053"/><path d="M16 19h6"/><path d="M19 16v6"/>');
  const iconCalendar = s24('<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12"/><path d="M16 3v4"/><path d="M8 3v4"/><path d="M4 11h16"/><path d="M11 15h1"/><path d="M12 15v3"/>');
  const iconPhoto = s20('<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 8h.01"/><path d="M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12"/><path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5"/><path d="M14 14l1 -1c.928 -.893 2.072 -.893 3 0l3 3"/>');
  const iconPen = s24('<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>');

  const parseMessages = (data) => Array.isArray(data) ? data : data?.messages || data?.results || [];
  async function fetchRecentMessages(limit = 50) {
    const res = await fetch(`${BACKEND_URL}/api/messages?limit=${limit}`);
    if (!res.ok) return [];
    return parseMessages(await res.json());
  }
  async function fetchHistoryMessages(beforeId, limit = 30) {
    const res = await fetch(`${BACKEND_URL}/api/messages?before_id=${beforeId}&limit=${limit}`);
    if (!res.ok) return [];
    return parseMessages(await res.json());
  }
  async function fetchNewerMessages(afterId, limit = 30) {
    const res = await fetch(`${BACKEND_URL}/api/messages?since_db_id=${afterId}&limit=${limit}`);
    if (!res.ok) return [];
    return parseMessages(await res.json());
  }
  async function getUnreadCount(sinceId, uid) {
    try {
      const res = await fetch(`${BACKEND_URL}/api/messages/unread-count?since_db_id=${sinceId}&uid=${uid}`);
      if (!res.ok) return null;
      const data = await res.json();
      return {
        count: data.count || 0,
        latest_id: data.latest_id || 0
      };
    } catch (e) {
      return null;
    }
  }
  async function fetchMessageContext(messageId, before = 30, after = 30) {
    const res = await fetch(`${BACKEND_URL}/api/messages/context/${messageId}?before=${before}&after=${after}&extended=1`);
    if (!res.ok) return null;
    const data = await res.json();
    return {
      messages: parseMessages(data.messages || data),
      target_id: data.target_id ?? messageId,
      target_index: data.target_index ?? 0,
      has_more_before: data.has_more_before ?? true,
      has_more_after: data.has_more_after ?? true
    };
  }
  async function sendMessage$1(content) {
    try {
      const formhash = userInfo.value.formhash;
      const params = new URLSearchParams();
      params.append("message", content);
      params.append("formhash", formhash);
      const res = await fetch("/dollars?ajax=1", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: params
      });
      if (res.ok) {
        return { status: true };
      } else {
        return { status: false, error: "Network response was not ok" };
      }
    } catch (e) {
      return { status: false, error: String(e) };
    }
  }
  async function getFirstMessageIdByDate(date) {
    try {
      const res = await fetch(`${BACKEND_URL}/api/messages/by-date?date=${date}&first_id_only=true`);
      if (!res.ok) return null;
      const data = await res.json();
      return data.status ? data.id : null;
    } catch (e) {
      return null;
    }
  }
  async function editMessage(messageId, content) {
    const res = await fetch(`${BACKEND_URL}/api/messages/${messageId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders()
      },
      credentials: "include",
      body: JSON.stringify({ content })
    });
    if (!res.ok) return { status: false, error: `HTTP ${res.status}` };
    return res.json();
  }
  async function deleteMessage(messageId) {
    const res = await fetch(`${BACKEND_URL}/api/messages/${messageId}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
      credentials: "include"
    });
    if (!res.ok) return { status: false, error: `HTTP ${res.status}` };
    return res.json();
  }
  async function toggleReaction(messageId, emoji) {
    const res = await fetch(`${BACKEND_URL}/api/messages/${messageId}/reactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders()
      },
      credentials: "include",
      body: JSON.stringify({
        emoji,
        user_id: userInfo.value.id,
        nickname: userInfo.value.nickname
      })
    });
    if (!res.ok) return { status: false };
    return res.json();
  }
  async function searchMessages(query, offset = 0, limit = 20) {
    const res = await fetch(
      `${BACKEND_URL}/api/search?q=${encodeURIComponent(query)}&offset=${offset}&limit=${limit}`
    );
    const data = await res.json();
    if (data.status) {
      return {
        messages: data.results || [],
        hasMore: data.hasMore || false
      };
    }
    return { messages: [], hasMore: false };
  }
  async function fetchNotifications(uid) {
    try {
      const res = await fetch(`${BACKEND_URL}/api/notifications?uid=${uid}`);
      const data = await res.json();
      if (data.status && data.notifications) {
        return data.notifications;
      }
    } catch (e) {
    }
    return [];
  }
  async function markNotificationRead(notifId, uid) {
    await fetch(`${BACKEND_URL}/api/notifications/${notifId}/read`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid })
    });
  }
  async function markAllNotificationsRead(uid) {
    await fetch(`${BACKEND_URL}/api/notifications/read-all`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid })
    });
  }

  async function fetchUserProfile(userId) {
    try {
      const res = await fetch(`${BACKEND_URL}/api/users/${userId}`);
      const data = await res.json();
      if (data.status && data.data) {
        const d = data.data;
        return {
          id: d.id,
          nickname: d.nickname,
          username: d.username,
          avatar: d.avatar?.large || d.avatar?.medium || d.avatar?.small || "",
          sign: d.sign,
          url: d.url,
          lastActive: d.stats?.last_message_time ? Math.floor(Date.parse(d.stats.last_message_time) / 1e3) : void 0,
          stats: d.stats
        };
      }
    } catch (e) {
    }
    return null;
  }
  async function lookupUsersByName(usernames) {
    try {
      const res = await fetch(`${BACKEND_URL}/api/users/lookup-by-name`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usernames })
      });
      if (!res.ok) return {};
      const data = await res.json();
      return data.data || {};
    } catch (e) {
      return {};
    }
  }

  async function fetchGalleryMedia(offset = 0, limit = 50, uid) {
    let url = `${BACKEND_URL}/api/gallery?offset=${offset}&limit=${limit}`;
    if (uid) {
      url += `&uid=${uid}`;
    }
    const res = await fetch(url);
    const data = await res.json();
    if (data.status) {
      return {
        items: data.items || [],
        hasMore: data.hasMore || false,
        total: data.total || 0
      };
    }
    return { items: [], hasMore: false, total: 0 };
  }
  const UPLOAD_MAX_IMAGE_SIZE = 50 * 1024 * 1024;
  const UPLOAD_MAX_FILE_SIZE = 200 * 1024 * 1024;
  const UPLOAD_TIMEOUT_MS = 6e4;
  const UPLOAD_MAX_RETRIES = 1;
  async function uploadFile(file) {
    const isImage = file.type.startsWith("image/");
    const maxSize = isImage ? UPLOAD_MAX_IMAGE_SIZE : UPLOAD_MAX_FILE_SIZE;
    if (file.size > maxSize) {
      const maxMB = Math.round(maxSize / (1024 * 1024));
      return { status: false, error: `文件过大 (${(file.size / (1024 * 1024)).toFixed(1)}MB)，最大支持 ${maxMB}MB` };
    }
    const fieldName = isImage ? "image" : "file";
    const endpoint = isImage ? `${UPLOAD_BASE_URL}/api/upload` : `${UPLOAD_BASE_URL}/api/upload/file`;
    let lastError = "上传失败";
    for (let attempt = 0; attempt <= UPLOAD_MAX_RETRIES; attempt++) {
      if (attempt > 0) {
        await new Promise((r) => setTimeout(r, 2e3));
      }
      try {
        const formData = new FormData();
        formData.append(fieldName, file);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), UPLOAD_TIMEOUT_MS);
        const res = await fetch(endpoint, {
          method: "POST",
          credentials: "include",
          body: formData,
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        let data;
        try {
          data = await res.json();
        } catch {
          if (!res.ok) {
            lastError = `服务器错误 (HTTP ${res.status})`;
            if (res.status >= 500) continue;
            return { status: false, error: lastError };
          }
          return { status: false, error: "服务器返回了无法解析的响应" };
        }
        if (!res.ok) {
          lastError = data?.message || `上传失败 (HTTP ${res.status})`;
          if (res.status >= 500) continue;
          return { status: false, error: lastError };
        }
        if (data.status && !data.url) {
          data.url = data.fileUrl || data.imageUrl || data.videoUrl;
        }
        if (data.status && data.url && !data.url.startsWith("http")) {
          data.url = `${UPLOAD_BASE_URL}${data.url}`;
        }
        if (!data.status) {
          return { status: false, error: data.message || data.error || "上传处理失败" };
        }
        return data;
      } catch (e) {
        if (e.name === "AbortError") {
          lastError = "上传超时，请检查网络后重试";
          continue;
        }
        lastError = "网络错误，请检查连接后重试";
        continue;
      }
    }
    return { status: false, error: lastError };
  }

  async function checkAuth() {
    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/me`, {
        headers: getAuthHeaders(),
        credentials: "include"
      });
      const data = await res.json();
      const localUid = window.CHOBITS_UID ? String(window.CHOBITS_UID) : null;
      if (data.status && (!localUid || String(data.user.id) === localUid)) {
        return { isLoggedIn: true, user: data.user };
      }
      const cloud = getChiiApp()?.cloud_settings;
      const token = cloud?.getAll()?.dollarsAuthToken;
      if (token) {
        try {
          const loginRes = await fetch(`${BACKEND_URL}/api/auth/token-login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
            credentials: "include"
          });
          const loginData = await loginRes.json();
          if (loginData.status) {
            return { isLoggedIn: true, user: loginData.user };
          }
        } catch (tokenErr) {
        }
      }
    } catch (e) {
    }
    return { isLoggedIn: false };
  }
  function performLogin() {
    const width = 600, height = 700;
    const left = (screen.width - width) / 2;
    const top = (screen.height - height) / 2;
    const currentHost = window.location.hostname;
    const authUrl = `https://${currentHost}/oauth/authorize?client_id=${BGM_APP_ID}&response_type=code&redirect_uri=${encodeURIComponent(BGM_CALLBACK_URL)}`;
    const loginWindow = window.open(authUrl, "BangumiLogin", `width=${width},height=${height},top=${top},left=${left}`);
    const messageHandler = (event) => {
      if (event.data && event.data.type === "bgm_login_success") {
        if (event.data.token) {
          const cloud = getChiiApp()?.cloud_settings;
          if (cloud) {
            cloud.update({ dollarsAuthToken: event.data.token });
            cloud.save();
          }
        }
        checkAuth().then((result) => {
          if (result.isLoggedIn) {
            window.location.reload();
          }
        });
        window.removeEventListener("message", messageHandler);
        loginWindow?.close();
      }
    };
    window.addEventListener("message", messageHandler);
  }
  async function performLogout() {
    try {
      await fetch(`${BACKEND_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include"
      });
      const cloud = getChiiApp()?.cloud_settings;
      if (cloud) {
        cloud.delete("dollarsAuthToken");
        cloud.save();
      }
      window.location.reload();
    } catch (e) {
    }
  }

  const api = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    checkAuth,
    deleteMessage,
    editMessage,
    fetchGalleryMedia,
    fetchHistoryMessages,
    fetchMessageContext,
    fetchNewerMessages,
    fetchNotifications,
    fetchRecentMessages,
    fetchUserProfile,
    getFirstMessageIdByDate,
    getUnreadCount,
    lookupUsersByName,
    markAllNotificationsRead,
    markNotificationRead,
    performLogin,
    performLogout,
    searchMessages,
    sendMessage: sendMessage$1,
    toggleReaction,
    uploadFile
  }, Symbol.toStringTag, { value: 'Module' }));

  const settingsConfig = [
    {
      key: "auth_control_group",
      type: "auth_control_group",
      label: "Bangumi 授权"
    },
    {
      key: "showCard",
      type: "checkbox",
      label: "首页显示 Re:Dollars 卡片",
      onchange: applyHomeCardDisplay
    },
    {
      key: "linkPreview",
      type: "checkbox",
      label: "启用链接预览"
    },
    {
      key: "sharePresence",
      type: "checkbox",
      label: "分享在线状态"
    },
    {
      key: "notificationType",
      type: "radio",
      label: "消息通知",
      options: {
        detail: "详细",
        simple: "精简",
        off: "关闭"
      }
    },
    {
      key: "loadImages",
      type: "checkbox",
      label: "默认加载图片"
    },
    {
      key: "rememberOpenState",
      type: "checkbox",
      label: "记忆窗口状态",
      onchange: handleRememberOpenStateChange
    },
    {
      key: "sendShortcut",
      type: "radio",
      label: "发送快捷键",
      options: {
        CtrlEnter: "Ctrl+Enter 发送",
        Enter: "Enter 发送"
      }
    },
    {
      key: "backgroundMode",
      type: "radio",
      label: "主题背景",
      options: {
        transparent: "透明",
        lines: "线条",
        tint: "色调"
      },
      onchange: applyBackgroundPattern
    },
    {
      key: "glassBlur",
      type: "checkbox",
      label: "玻璃模糊",
      onchange: applyGlassBlur
    }
  ];
  function applyHomeCardDisplay() {
    const card = document.getElementById("dollars-card");
    if (card) {
      card.style.display = settings.value.showCard ? "" : "none";
    }
  }
  function applyBackgroundPattern() {
    const root = document.getElementById("dollars-chat-root");
    if (root) {
      root.dataset.bgMode = settings.value.backgroundMode;
      root.classList.remove("no-background-pattern");
    }
  }
  function applyGlassBlur() {
    const root = document.getElementById("dollars-chat-root");
    if (root) {
      if (settings.value.glassBlur) {
        root.classList.remove("disable-blur");
      } else {
        root.classList.add("disable-blur");
      }
    }
  }
  function handleRememberOpenStateChange() {
    if (!settings.value.rememberOpenState) {
      clearWindowState();
    } else {
      saveChatOpenState(isChatOpen.value);
      __vitePreload(async () => { const {isMaximized, mobileChatViewActive} = await Promise.resolve().then(() => ui);return { isMaximized, mobileChatViewActive }},false             ?__VITE_PRELOAD__:void 0).then(({ isMaximized, mobileChatViewActive }) => {
        saveMaximizedState(isMaximized.value);
        saveMobileChatViewState(mobileChatViewActive.value);
      }).catch(() => {
      });
    }
  }
  function applyAllSettings() {
    applyHomeCardDisplay();
    applyBackgroundPattern();
    applyGlassBlur();
  }
  function generateApiConfig() {
    return settingsConfig.map((s) => {
      if (s.type === "auth_control_group") {
        return {
          title: s.label,
          name: "dollars_auth_action",
          type: "radio",
          defaultValue: isLoggedIn.value ? "logged_in" : "logged_out",
          getCurrentValue: () => isLoggedIn.value ? "logged_in" : "logged_out",
          onChange: (value) => {
            if (value === "logged_in") {
              performLogin();
            } else if (value === "logged_out") {
              performLogout();
            }
          },
          options: [
            { value: "logged_in", label: isLoggedIn.value ? `已授权：${userInfo.value.nickname}` : "点击授权" },
            { value: "logged_out", label: isLoggedIn.value ? "撤销授权" : "未授权" }
          ]
        };
      } else if (s.type === "checkbox") {
        return {
          title: s.label,
          name: s.key,
          type: "radio",
          defaultValue: String(settings.value[s.key] ?? true),
          getCurrentValue: () => String(settings.value[s.key]),
          onChange: (value) => {
            settings.value = {
              ...settings.peek(),
              [s.key]: value === "true"
            };
            saveSettings();
            if (s.onchange) s.onchange();
          },
          options: [
            { value: "true", label: "开启" },
            { value: "false", label: "关闭" }
          ]
        };
      } else if (s.type === "radio" && s.options) {
        return {
          title: s.label,
          name: s.key,
          type: "radio",
          defaultValue: String(settings.value[s.key] ?? Object.keys(s.options)[0]),
          getCurrentValue: () => String(settings.value[s.key]),
          onChange: (value) => {
            settings.value = {
              ...settings.peek(),
              [s.key]: value
            };
            saveSettings();
            if (s.onchange) s.onchange();
          },
          options: Object.entries(s.options).map(([value, label]) => ({ value, label }))
        };
      }
      return null;
    }).filter((x) => x !== null);
  }
  function integrateWithNativeSettingsPanel() {
    const apiConfig = generateApiConfig();
    getChiiLib().ukagaka.addPanelTab({
      tab: "dollars_chat_settings",
      label: "Re:Dollars",
      type: "options",
      config: apiConfig
    });
    const settingsBtnHeader = document.getElementById("dollars-settings-btn-header");
    if (settingsBtnHeader) {
      settingsBtnHeader.title = "打开聊天设置";
      settingsBtnHeader.addEventListener("click", (e) => {
        e.stopPropagation();
        getChiiLib().ukagaka.showCustomizePanelWithTab("dollars_chat_settings");
      });
    }
  }
  function openSettingsPanel() {
    getChiiLib().ukagaka.showCustomizePanelWithTab("dollars_chat_settings");
  }

  function ChatHeader() {
    const handleClose = () => {
      toggleChat(false);
    };
    const handleMaximize = () => {
      toggleMaximize();
    };
    const handleSearch = () => {
      toggleSearch(!isSearchActive.value);
    };
    const handleSettings = () => {
      openSettingsPanel();
    };
    const handleBack = () => {
      setMobileChatView(false);
    };
    const activeConv = conversations.value.find((c) => c.id === activeConversationId.value);
    const activeExtension = activeExtensionId.value ? extensionConversations.value.find((e) => e.id === activeExtensionId.value) : null;
    const isShowingChatView = isNarrowLayout.value && mobileChatViewActive.value;
    let mainTitle = "Re:Dollars";
    let avatarUrl = "https://lsky.ry.mk/i/2025/09/06/68bc5540a8c51.webp";
    let showOnlineStatus = true;
    let statusLabel = "在线";
    if (isNarrowLayout.value && !isShowingChatView) {
      mainTitle = "会话列表";
      showOnlineStatus = false;
    } else if (activeExtension) {
      mainTitle = activeExtension.title;
      avatarUrl = activeExtension.avatar;
      if (activeExtension.statusLabel) {
        showOnlineStatus = true;
        statusLabel = activeExtension.statusLabel;
      } else {
        showOnlineStatus = false;
      }
    } else if (activeConv) {
      mainTitle = activeConv.type === "channel" ? activeConv.title : activeConv.user?.nickname || activeConv.title;
      avatarUrl = activeConv.type === "channel" ? activeConv.avatar : activeConv.user?.avatar || activeConv.avatar;
      showOnlineStatus = activeConv.type === "channel";
    }
    if (isUserProfilePanelOpen.value && isNarrowLayout.value) {
      return /* @__PURE__ */ u$2("div", { class: "chat-header", children: [
        /* @__PURE__ */ u$2("div", { class: "chat-header-left-pane", children: /* @__PURE__ */ u$2(
          "button",
          {
            id: "dollars-back-btn",
            class: "header-btn",
            title: "返回",
            onClick: hideUserProfile,
            dangerouslySetInnerHTML: { __html: iconArrowLeft }
          }
        ) }),
        /* @__PURE__ */ u$2("div", { class: "title-wrapper", children: /* @__PURE__ */ u$2("div", { class: "header-text-column", children: /* @__PURE__ */ u$2("span", { class: "header-main-title", children: "用户资料" }) }) }),
        /* @__PURE__ */ u$2("div", { class: "header-buttons", children: [
          /* @__PURE__ */ u$2(
            "button",
            {
              id: "dollars-maximize-btn",
              class: "header-btn maximize-btn",
              title: isMaximized.value ? "还原" : "最大化",
              onClick: handleMaximize
            }
          ),
          /* @__PURE__ */ u$2(
            "button",
            {
              class: "header-btn close-btn",
              title: "关闭",
              onClick: handleClose
            }
          )
        ] })
      ] });
    }
    return /* @__PURE__ */ u$2("div", { class: "chat-header", children: [
      /* @__PURE__ */ u$2("div", { class: "chat-header-left-pane", children: [
        /* @__PURE__ */ u$2(
          "button",
          {
            id: "dollars-settings-btn-header",
            class: "header-btn",
            title: "设置",
            onClick: handleSettings,
            style: { display: isShowingChatView ? "none" : "flex" }
          }
        ),
        /* @__PURE__ */ u$2(
          "button",
          {
            id: "dollars-back-btn",
            class: "header-btn",
            title: "返回",
            onClick: handleBack,
            style: { display: isShowingChatView ? "flex" : "none" },
            dangerouslySetInnerHTML: { __html: iconArrowLeft }
          }
        )
      ] }),
      /* @__PURE__ */ u$2("div", { class: "title-wrapper", children: [
        (!isNarrowLayout.value || isShowingChatView) && /* @__PURE__ */ u$2(
          "img",
          {
            class: "header-chat-icon",
            src: avatarUrl,
            alt: mainTitle
          }
        ),
        /* @__PURE__ */ u$2("div", { class: "header-text-column", children: [
          /* @__PURE__ */ u$2("span", { class: "header-main-title", children: mainTitle }),
          showOnlineStatus && /* @__PURE__ */ u$2("span", { class: "online-status", children: [
            /* @__PURE__ */ u$2("span", { class: "online-dot" }),
            /* @__PURE__ */ u$2("span", { id: "dollars-online-count", children: onlineCount.value }),
            " ",
            statusLabel
          ] })
        ] })
      ] }),
      /* @__PURE__ */ u$2("div", { class: "header-buttons", children: [
        /* @__PURE__ */ u$2(
          "button",
          {
            id: "dollars-search-btn",
            class: "header-btn",
            title: "搜索",
            onClick: handleSearch
          }
        ),
        /* @__PURE__ */ u$2(
          "button",
          {
            id: "dollars-maximize-btn",
            class: "header-btn maximize-btn",
            title: isMaximized.value ? "还原" : "最大化",
            onClick: handleMaximize
          }
        ),
        /* @__PURE__ */ u$2(
          "button",
          {
            class: "header-btn close-btn",
            title: "关闭",
            onClick: handleClose
          }
        )
      ] })
    ] });
  }

  const isMobile = () => {
    if (typeof window === "undefined") return false;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };
  const escapeHTML = (str) => (str || "").replace(/[&<>"']/g, (m) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[m] || m);
  const decodeHTML = (str) => {
    const div = document.createElement("div");
    div.innerHTML = String(str ?? "");
    return div.textContent || "";
  };
  const formatDate = (ts, fmt = "time") => {
    const d = new Date(ts * 1e3);
    const pad = (n) => String(n).padStart(2, "0");
    if (fmt === "key") return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    if (fmt === "time") return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
    if (fmt === "full") return d.toLocaleString("zh-CN", { hour12: false }).replace(/\//g, "-");
    const diff = Math.round(((/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0) - new Date(d).setHours(0, 0, 0, 0)) / 864e5);
    if (diff === 0) return "今天";
    if (diff === 1) return "昨天";
    if (diff > 1 && diff < 7) return ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][d.getDay()];
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  };
  const isActiveToday = (lastMessageTime) => {
    if (!lastMessageTime) return false;
    const ts = new Date(lastMessageTime).getTime() / 1e3;
    return formatDate(ts, "label") === "今天";
  };
  const stripBBCode = (t) => t?.replace(/\[.*?\]/g, "").replace(/\s+/g, " ").trim() || "";
  const getAvatarUrl = (avatar, size = "l", fallback = "icon.jpg") => {
    if (!avatar || typeof avatar !== "string") {
      return `//lain.bgm.tv/pic/user/${size}/${fallback}`;
    }
    if (avatar.includes("//")) {
      return avatar.replace(/\/pic\/user\/[sml]\//, `/pic/user/${size}/`);
    }
    const cleanPath = avatar.replace(/^\/+/, "");
    return `https://lain.bgm.tv/pic/user/${size}/${cleanPath}`;
  };
  function debounce(fn, delay = 400) {
    let t;
    return ((...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), delay);
    });
  }
  const calculateImageStyle = (meta) => {
    if (meta?.width && meta?.height) {
      const MAX_IMG_WIDTH = 320;
      const MAX_IMG_HEIGHT = 350;
      let w = Number(meta.width);
      let h = Number(meta.height);
      if (w > MAX_IMG_WIDTH) {
        h = MAX_IMG_WIDTH / w * h;
        w = MAX_IMG_WIDTH;
      }
      if (h > MAX_IMG_HEIGHT) {
        w = MAX_IMG_HEIGHT / h * w;
        h = MAX_IMG_HEIGHT;
      }
      return `aspect-ratio: ${meta.width} / ${meta.height}; width: ${Math.round(w)}px; max-width: 100%;`;
    }
    return `aspect-ratio: 1 / 1; width: 200px; max-width: 100%;`;
  };
  const getThumbnailUrl = (url) => {
    if (!url || typeof url !== "string") return url;
    try {
      const parsed = new URL(url);
      if (parsed.hostname !== "lsky.ry.mk") return url;
      if (!parsed.pathname.startsWith("/i/") || parsed.pathname.startsWith("/i/thumbs/")) return url;
      parsed.pathname = `/i/thumbs/${parsed.pathname.slice("/i/".length)}`;
      return parsed.toString();
    } catch {
      return url;
    }
  };
  const generateReactionTooltip = (users) => {
    return users.map(
      ({ id, user_id, nickname }) => `<a href="/user/${user_id ?? id}" target="_blank" class="dollars-tooltip-link">${escapeHTML(nickname)}</a>`
    ).join("、");
  };

  function shallowDiffers(a, b) {
    for (const i in a) if (i !== "__source" && !(i in b)) return true;
    for (const i in b) if (i !== "__source" && a[i] !== b[i]) return true;
    return false;
  }
  function memo(c, comparer) {
    function shouldUpdate(nextProps) {
      const ref = this.props.ref;
      const updateRef = ref === nextProps.ref;
      if (!updateRef && ref) {
        if (typeof ref === "function") {
          ref(null);
        } else if (typeof ref === "object" && "current" in ref) {
          ref.current = null;
        }
      }
      if (!comparer) return shallowDiffers(this.props, nextProps);
      return !comparer(this.props, nextProps) || !updateRef;
    }
    function Memoed(props) {
      this.shouldComponentUpdate = shouldUpdate;
      return _$3(c, props);
    }
    Memoed.displayName = `Memo(${c.displayName || c.name || "Component"})`;
    Memoed.prototype = { isReactComponent: true };
    Memoed._forwarded = true;
    Memoed.type = c;
    return Memoed;
  }

  const musumeSmileyIds = [
    ...Array.from({ length: 96 }, (_, index) => index + 1),
    ...Array.from({ length: 20 }, (_, index) => index + 99)
  ];
  const blakeSmileyIds = Array.from({ length: 118 }, (_, index) => index + 1);
  const musumeSmileySections = [
    {
      name: "情绪反应",
      ids: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 100, 106, 108, 118]
    },
    {
      name: "动作道具",
      ids: [43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 101, 102, 103, 99, 107, 112, 109, 110, 111, 113, 114, 115, 116, 117]
    },
    {
      name: "日常状态",
      ids: [77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 104, 105, 94, 95, 96]
    },
    {
      name: "提示反馈",
      ids: [1, 2, 3, 4, 5]
    }
  ];
  const blakeSmileySections = [
    musumeSmileySections[0],
    musumeSmileySections[1],
    {
      name: "得分反馈",
      ids: [97, 98]
    },
    musumeSmileySections[2],
    musumeSmileySections[3]
  ];
  const groupedSmileySections = {
    Musume: musumeSmileySections,
    Blake: blakeSmileySections
  };
  function getRangeIds(range) {
    if (range.ids) return range.ids;
    if (range.start == null || range.end == null) return [];
    return Array.from({ length: range.end - range.start + 1 }, (_, index) => range.start + index);
  }
  function rangeIncludesId(range, id) {
    return getRangeIds(range).includes(id);
  }
  function formatSmileyCode(prefix, id, codePad) {
    const num = codePad ? String(id).padStart(codePad, "0") : String(id);
    return `(${prefix}${num})`;
  }
  const smileyRanges = [
    {
      name: "TV",
      start: 24,
      end: 125,
      path: (id) => `/img/smiles/tv/${String(id - 23).padStart(2, "0")}.gif`
    },
    {
      name: "BGM",
      start: 1,
      end: 23,
      path: (id) => {
        const ext = id === 11 || id === 23 ? "gif" : "png";
        return `/img/smiles/bgm/${String(id).padStart(2, "0")}.${ext}`;
      }
    },
    {
      name: "VS",
      start: 200,
      end: 238,
      path: (id) => `/img/smiles/tv_vs/bgm_${id}.png`
    },
    {
      name: "500",
      start: 500,
      end: 529,
      path: (id) => {
        const gifIds = /* @__PURE__ */ new Set([500, 501, 505, 515, 516, 517, 518, 519, 521, 522, 523]);
        const ext = gifIds.has(id) ? "gif" : "png";
        return `/img/smiles/tv_500/bgm_${id}.${ext}`;
      }
    },
    {
      name: "Musume",
      ids: musumeSmileyIds,
      codePrefix: "musume_",
      codePad: 2,
      tabIconId: 3,
      isLarge: true,
      path: (id) => `/img/smiles/musume/musume_${String(id).padStart(2, "0")}.gif`
    },
    {
      name: "Blake",
      ids: blakeSmileyIds,
      codePrefix: "blake_",
      codePad: 2,
      tabIconId: 3,
      isLarge: true,
      path: (id) => `/img/smiles/blake/blake_${String(id).padStart(2, "0")}.gif`
    },
    { name: "BMO" },
    { name: "收藏" }
  ];
  const smileyRangesWithoutFavorites = smileyRanges.filter((r) => r.name !== "收藏" && !r.isLarge);
  function getSmileyUrl(code) {
    if (typeof code === "string") {
      const largeSmileyMatch = code.match(/\(((?:musume_|blake_))(\d+)\)/);
      if (largeSmileyMatch) {
        const [, prefix, rawId] = largeSmileyMatch;
        const id2 = parseInt(rawId, 10);
        const range3 = smileyRanges.find((r) => r.codePrefix === prefix && rangeIncludesId(r, id2));
        return range3?.path?.(id2) ?? null;
      }
      const bgmMatch = code.match(/\(bgm(\d+)\)/);
      if (!bgmMatch) return null;
      const id = parseInt(bgmMatch[1], 10);
      const range2 = smileyRanges.find((r) => !r.codePrefix && r.start && r.end && id >= r.start && id <= r.end);
      return range2?.path?.(id) ?? null;
    }
    const range = smileyRanges.find((r) => !r.codePrefix && r.start && r.end && code >= r.start && code <= r.end);
    return range?.path?.(code) ?? null;
  }
  function generateSmileyCodes(groupName) {
    const range = smileyRanges.find((r) => r.name === groupName);
    if (!range) return [];
    const prefix = range.codePrefix || "bgm";
    const ids = getRangeIds(range);
    return ids.map((id) => formatSmileyCode(prefix, id, range.codePad));
  }
  function getGroupedSmileyCodes(groupName) {
    const range = smileyRanges.find((r) => r.name === groupName);
    const sections = groupedSmileySections[groupName];
    if (!range || !sections) return [];
    const prefix = range.codePrefix || "bgm";
    return sections.map((section) => ({
      name: section.name,
      items: section.ids.filter((id) => rangeIncludesId(range, id)).map((id) => ({
        id,
        code: formatSmileyCode(prefix, id, range.codePad)
      }))
    })).filter((section) => section.items.length > 0);
  }

  const INLINE_TOKEN_REGEX = /\[(emoji|sticker)\]([\s\S]+?)\[\/\1\]|\(((?:musume_|blake_))(\d+)\)|\(bgm(\d+)\)|\((bmo(?:C|_)[a-zA-Z0-9_-]+)\)/gi;
  function isValidInlineMediaUrl(src) {
    return /^https?:\/\/[^\s<>"']+$/i.test(src.trim());
  }
  function isInsideHtmlTag(text, index) {
    const before = text.slice(0, index);
    return before.lastIndexOf("<") > before.lastIndexOf(">");
  }
  function parseInlineTokenMatch(match) {
    const raw = match[0];
    const [, customTag, customSrc, largePrefix, , , bmoCode] = match;
    if (customTag && customSrc) {
      if (!isValidInlineMediaUrl(customSrc)) return null;
      const src2 = customSrc.trim();
      return {
        raw,
        type: "custom-image",
        src: src2,
        isCommunityEmoji: src2.includes("/emojis/")
      };
    }
    if (bmoCode) {
      return {
        raw,
        type: "bmo",
        code: raw
      };
    }
    const src = getSmileyUrl(raw);
    if (!src) return null;
    return {
      raw,
      type: "smiley",
      variant: largePrefix === "musume_" ? "musume" : largePrefix === "blake_" ? "blake" : "bgm",
      src
    };
  }
  function collectRenderableInlineTokenRaws(text) {
    const tokens = [];
    const matcher = new RegExp(INLINE_TOKEN_REGEX);
    let match;
    while ((match = matcher.exec(text)) !== null) {
      const token = parseInlineTokenMatch(match);
      if (token) {
        tokens.push(token.raw);
      }
    }
    return tokens;
  }
  function replaceInlineTokens(text, renderMatch, options = {}) {
    const matcher = new RegExp(INLINE_TOKEN_REGEX);
    const renderText = options.renderText || ((chunk) => chunk);
    let lastIndex = 0;
    let result = "";
    let match;
    while ((match = matcher.exec(text)) !== null) {
      result += renderText(text.slice(lastIndex, match.index));
      const raw = match[0];
      if (options.skipInsideHtml && isInsideHtmlTag(text, match.index)) {
        result += raw;
      } else {
        result += renderMatch(parseInlineTokenMatch(match), raw);
      }
      lastIndex = match.index + raw.length;
    }
    return result + renderText(text.slice(lastIndex));
  }

  function normalizeBangumiUrl(url) {
    try {
      const urlObj = new URL(url);
      const hostname = urlObj.hostname.toLowerCase();
      if (hostname === "bangumi.tv" || hostname === "bgm.tv" || hostname === "chii.in") {
        return urlObj.pathname + urlObj.search + urlObj.hash;
      }
    } catch (e) {
    }
    return url;
  }
  function generatePreviewCardHTML(data, originalUrl) {
    if (!data) return "";
    const normalizedUrl = normalizeBangumiUrl(originalUrl);
    const title = escapeHTML(data.title || originalUrl);
    const desc = data.description ? escapeHTML(data.description) : "";
    const domain = originalUrl.includes("//") ? originalUrl.split("/")[2].replace(/^www\\./, "") : "";
    let coverHTML = "";
    if (data.image) {
      coverHTML = `<div class="cover"><img src="${escapeHTML(data.image)}" loading="lazy" referrerPolicy="no-referrer"></div>`;
    } else {
      coverHTML = `<div class="cover"><div style="font-size: 32px; text-align: center; line-height: 80px; color: var(--dollars-text-placeholder);">🔗</div></div>`;
    }
    return `
        <a href="${escapeHTML(normalizedUrl)}" target="_blank" rel="noopener noreferrer" class="dollars-preview-card" data-entity-type="generic">
            ${coverHTML}
            <div class="inner">
                <p class="title" title="${title}">${title}</p>
                ${desc ? `<p class="info">${desc}</p>` : ""}
                <p class="rateInfo">${escapeHTML(domain)}</p>
            </div>
        </a>`;
  }
  function processBBCode(text, imageMeta = {}, options = {}, linkPreviews = {}) {
    let html = text;
    const codeBlocks = [];
    html = html.replace(/\[code\]([\s\S]*?)\[\/code\]/gi, (_, content) => {
      codeBlocks.push(content);
      return `\0CODE_BLOCK_${codeBlocks.length - 1}\0`;
    });
    html = html.replace(/(^|\s)(#[\p{L}\p{N}_]{1,50})(?=$|\s|[.,!?;:)])/gu, '$1<span class="chat-tag">$2</span>');
    const bbMap = { b: "strong", i: "em", u: "u", s: "s" };
    html = html.replace(
      /\[(b|i|u|s)\]([\s\S]+?)\[\/\1\]/gi,
      (_, tag, content) => `<${bbMap[tag.toLowerCase()]}>${processBBCode(content, imageMeta, { ...options, isInsideQuote: true }, linkPreviews)}</${bbMap[tag.toLowerCase()]}>`
    );
    html = html.replace(/\[mask\]([\s\S]+?)\[\/mask\]/gi, '<span class="text_mask"><span class="inner">$1</span></span>');
    html = html.replace(/<span class="text_mask"><span class="inner">\[img\]([\s\S]+?)\[\/img\]<\/span><\/span>/gi, (m, src) => {
      const cleanSrc = src.replace(/<[^>]*>?/gm, "").trim();
      if (!/^https?:\/\/[^\s<>"']+$/i.test(cleanSrc)) return escapeHTML(m);
      if (options.isInsideQuote) {
        return `<span class="text_mask"><span class="inner"><a href="${cleanSrc}" target="_blank">[图片]</a></span></span>`;
      }
      const meta = imageMeta[cleanSrc];
      const imageStyle = calculateImageStyle(meta);
      const thumbSrc = getThumbnailUrl(cleanSrc);
      return `<div class="image-container image-placeholder image-masked" style="${imageStyle}" data-iw="${meta?.width || ""}" data-ih="${meta?.height || ""}" data-src="${cleanSrc}">
            <img src="${thumbSrc}" data-full-src="${cleanSrc}" class="full-image is-loaded" alt="image" loading="lazy" decoding="async" referrerpolicy="no-referrer">
            <div class="image-load-hint">显示图片</div>
        </div>`;
    });
    html = html.replace(/\[audio\]([\s\S]+?)\[\/audio\]/gi, (m, src) => {
      const cleanSrc = src.replace(/<[^>]*>?/gm, "").trim();
      if (!/^https?:\/\/[^\s<>"']+$/i.test(cleanSrc)) return escapeHTML(m);
      if (options.isInsideQuote) {
        return `<a href="${cleanSrc}" target="_blank">[音频]</a>`;
      }
      return `<div class="audio-player-container" style="margin: 5px 0;"><audio controls preload="metadata" style="max-width: 100%; width: 300px; border-radius: 20px;"><source src="${cleanSrc}">您的浏览器不支持音频播放。</audio></div>`;
    });
    html = html.replace(/\[video\]([\s\S]+?)\[\/video\]/gi, (m, src) => {
      const cleanSrc = src.replace(/<[^>]*>?/gm, "").trim();
      if (!/^https?:\/\/[^\s<>"']+$/i.test(cleanSrc)) return escapeHTML(m);
      if (options.isInsideQuote) {
        return `<a href="${cleanSrc}" target="_blank">[视频]</a>`;
      }
      return `<div class="video-player-container" style="max-width: 100%; margin: 5px 0;"><video controls preload="metadata" style="max-width: 100%; max-height: 400px; border-radius: 8px; background: #000;"><source src="${cleanSrc}" type="video/mp4"><source src="${cleanSrc}" type="video/webm">您的浏览器不支持视频播放。</video></div>`;
    });
    html = html.replace(/\[file=(.*?)\]([\s\S]+?)\[\/file\]/gi, (m, label, src) => {
      const cleanSrc = src.replace(/<[^>]*>?/gm, "").trim();
      if (!/^https?:\/\/[^\s<>"']+$/i.test(cleanSrc)) return escapeHTML(m);
      const name = escapeHTML((label || "").trim() || "附件");
      if (options.isInsideQuote) {
        return `<a href="${cleanSrc}" target="_blank">[附件] ${name}</a>`;
      }
      return `<a href="${cleanSrc}" target="_blank" rel="noopener noreferrer" class="chat-file-link" download="${name}">${name}</a>`;
    });
    html = html.replace(/\[img\]([\s\S]+?)\[\/img\]/gi, (m, src) => {
      const cleanSrc = src.replace(/<[^>]*>?/gm, "").trim();
      if (!/^https?:\/\/[^\s<>"']+$/i.test(cleanSrc)) return escapeHTML(m);
      if (options.isInsideQuote) {
        return `<a href="${cleanSrc}" target="_blank">[图片]</a>`;
      }
      const meta = imageMeta[cleanSrc];
      const imageStyle = calculateImageStyle(meta);
      const shouldLoadImage = settings.value.loadImages;
      const thumbSrc = getThumbnailUrl(cleanSrc);
      if (!shouldLoadImage) {
        return `<div class="image-container image-placeholder" style="${imageStyle}" data-iw="${meta?.width || ""}" data-ih="${meta?.height || ""}">
                <img src="${thumbSrc}" data-full-src="${cleanSrc}" class="full-image is-loaded" alt="image" loading="lazy" decoding="async" referrerpolicy="no-referrer">
            </div>`;
      }
      return `<div class="image-container" style="${imageStyle}" data-iw="${meta?.width || ""}" data-ih="${meta?.height || ""}">
            <img src="${cleanSrc}" data-full-src="${cleanSrc}" class="full-image" alt="image" loading="lazy" decoding="async" referrerpolicy="no-referrer">
        </div>`;
    });
    html = html.replace(/\[user=(.+?)\]([\s\S]+?)\[\/user\]/gi, '<a href="/user/$1" target="_blank" class="user-mention">@$2</a>');
    html = replaceInlineTokens(html, (token, raw) => {
      if (!token) {
        return raw.startsWith("[") ? escapeHTML(raw) : raw;
      }
      switch (token.type) {
        case "custom-image": {
          const className = token.isCommunityEmoji ? "smiley" : "custom-emoji";
          return `<img src="${escapeHTML(token.src)}" class="${className}" alt="sticker" loading="lazy" decoding="async" fetchpriority="low" referrerpolicy="no-referrer">`;
        }
        case "smiley": {
          const className = token.variant === "bgm" ? "smiley" : `smiley ${token.variant === "blake" ? "smiley-blake" : "smiley-musume"}`;
          const size = token.variant === "bgm" ? ' width="21" height="21"' : "";
          return `<img src="${escapeHTML(token.src)}" class="${className}" alt="${escapeHTML(token.raw)}"${size}>`;
        }
        case "bmo":
          return `<span class="bmo" data-code="${escapeHTML(token.code)}"></span>`;
      }
    }, { skipInsideHtml: true });
    html = html.replace(/\[url=([^\]]+?)\]([\s\S]+?)\[\/url\]/gi, (_, url, label) => {
      const normalizedUrl = normalizeBangumiUrl(url);
      const linkHtml = `<a href="${escapeHTML(normalizedUrl)}" target="_blank" rel="noopener noreferrer">${label}</a>`;
      if (!options.isInsideQuote && settings.value.linkPreview && linkPreviews && linkPreviews[url] && options.previewsCollector) {
        const previewHtml = generatePreviewCardHTML(linkPreviews[url], url);
        options.previewsCollector.push(previewHtml);
      }
      return linkHtml;
    });
    html = html.replace(/\[quote(?:=(\d+))?\]([\s\S]*?)\[\/quote\]\n?/gi, (_, id, content) => {
      if (options.replyDetails) return "";
      if (!content.trim()) return "";
      const attrs = id ? `data-jump-to-id="${id}" title="点击跳转到原文"` : "";
      const processedContent = processBBCode(content, imageMeta, { ...options, isInsideQuote: true }, linkPreviews);
      return `<blockquote class="chat-quote" ${attrs}><div class="quote-content" style="white-space: pre-wrap;">${processedContent}</div></blockquote>`;
    });
    html = html.replace(/(https?:\/\/[^\s<>"'\]\[]+)/g, (url, _g1, offset, str) => {
      const before = str.slice(0, offset);
      const after = str.slice(offset + url.length);
      if (before.endsWith(">") && after.startsWith("</a>") || before.endsWith('src="') && after.startsWith('"')) return url;
      const lastOpen = before.lastIndexOf("<");
      const lastClose = before.lastIndexOf(">");
      if (lastOpen > lastClose) return url;
      const normalizedUrl = normalizeBangumiUrl(url);
      const linkHtml = `<a href="${normalizedUrl}" target="_blank" rel="noopener noreferrer">${url}</a>`;
      if (!options.isInsideQuote && settings.value.linkPreview && linkPreviews && linkPreviews[url] && options.previewsCollector) {
        const previewHtml = generatePreviewCardHTML(linkPreviews[url], url);
        options.previewsCollector.push(previewHtml);
      }
      return linkHtml;
    });
    html = html.replace(/(<\/blockquote>)<br\s*\/?>/gi, "$1");
    html = html.replace(/\n/g, "<br>");
    codeBlocks.forEach((content, i) => {
      html = html.replace(`\0CODE_BLOCK_${i}\0`, `<div class="codeHighlight"><pre>${escapeHTML(content)}</pre></div>`);
    });
    return html;
  }
  function renderReplyQuote(details, replyToId) {
    const content = stripQuotes(details.content).replace(/\[file=.*?\].*?\[\/file\]/gi, "[附件]").substring(0, 80);
    const avatarSrc = getAvatarUrl(details.avatar, "s");
    const imageHTML = details.firstImage ? `<img src="${details.firstImage}" class="quote-thumbnail" loading="lazy">` : "";
    const avatarHTML = details.firstImage ? "" : `<img src="${avatarSrc}" class="quote-avatar" loading="lazy">`;
    return `<blockquote class="chat-quote" data-jump-to-id="${replyToId}" title="点击跳转到原文">${imageHTML}<div class="quote-text-wrapper"><div class="quote-header">${avatarHTML}<span class="quote-nickname">${escapeHTML(details.nickname)}</span></div><div class="quote-content">${escapeHTML(content)}${details.content.length > 80 ? "..." : ""}</div></div></blockquote>`;
  }
  function stripQuotes(text) {
    return (text || "").replace(/\[quote(?:=\d+)?\][\s\S]*?\[\/quote\]/gi, "").trim();
  }

  function useLongPress({ threshold = 500, onLongPress, onClick }) {
    const timerRef = A(null);
    const isLongPressRef = A(false);
    const startXRef = A(0);
    const startYRef = A(0);
    const handledRef = A(false);
    const start = q((e) => {
      if (e instanceof MouseEvent && e.button !== 0) return;
      if (e instanceof TouchEvent) {
        startXRef.current = e.touches[0].clientX;
        startYRef.current = e.touches[0].clientY;
      } else {
        startXRef.current = e.clientX;
        startYRef.current = e.clientY;
      }
      isLongPressRef.current = false;
      handledRef.current = false;
      timerRef.current = setTimeout(() => {
        isLongPressRef.current = true;
        handledRef.current = true;
        onLongPress(e);
      }, threshold);
    }, [onLongPress, threshold]);
    const clear = q(() => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    }, []);
    const move = q((e) => {
      if (!timerRef.current) return;
      const moveThreshold = 10;
      let x = 0, y = 0;
      if (e instanceof TouchEvent) {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
      } else {
        x = e.clientX;
        y = e.clientY;
      }
      if (Math.abs(x - startXRef.current) > moveThreshold || Math.abs(y - startYRef.current) > moveThreshold) {
        clear();
      }
    }, [clear]);
    const end = q((e) => {
      clear();
      if (isLongPressRef.current) {
        e.stopPropagation();
        if (e.cancelable) e.preventDefault();
        return;
      }
      if (onClick) {
        handledRef.current = true;
        e.stopPropagation();
        onClick(e);
      }
    }, [clear, onClick]);
    return {
      onMouseDown: (e) => start(e),
      onMouseMove: (e) => move(e),
      onMouseUp: (e) => end(e),
      onMouseLeave: (_e) => clear(),
      onTouchStart: (e) => {
        e.stopPropagation();
        start(e);
      },
      onTouchMove: (e) => move(e),
      onTouchEnd: (e) => end(e)
    };
  }

  function UserAvatar({ uid, src, nickname, className = "" }) {
    const isOnline = w(() => {
      const uidStr = String(uid);
      return uidStr === "0" || onlineUsers.value.has(uidStr);
    });
    const handleShortClick = (e) => {
      if (e.cancelable && e.type !== "click") {
        e.preventDefault();
      }
      e.stopPropagation();
      const profileUid = uid === 0 || String(uid) === "0" ? "3605" : String(uid);
      showUserProfile(profileUid);
    };
    const handleLongPress = (e) => {
      e.stopPropagation();
      if (uid === 0 || String(uid) === "0") {
        pendingMention.value = { uid: "bot", nickname: "Bangumi娘" };
      } else {
        pendingMention.value = { uid: String(uid), nickname };
      }
      if (navigator.vibrate) navigator.vibrate(50);
    };
    const longPressProps = useLongPress({
      onLongPress: handleLongPress,
      onClick: handleShortClick,
      threshold: 500
    });
    return /* @__PURE__ */ u$2(
      "img",
      {
        class: `avatar ${isOnline.value ? "online" : ""} ${className}`,
        src,
        alt: nickname,
        "data-uid": uid,
        onContextMenu: (e) => {
          e.preventDefault();
          e.stopPropagation();
        },
        ...longPressProps
      }
    );
  }

  const notifications = d$1([]);
  const notificationCount = w(() => notifications.value.length);
  const dockIconFlashing = d$1(false);
  async function loadNotifications() {
    if (!userInfo.value.id) return;
    try {
      const data = await fetchNotifications(userInfo.value.id);
      if (Array.isArray(data)) {
        const existingIds = new Set(notifications.value.map((n) => n.id));
        const newNotifs = data.filter((n) => !existingIds.has(n.id));
        notifications.value = [...newNotifs.reverse(), ...notifications.value];
        updateUnreadJumpList();
        if (settings.value.notificationType === "simple" && notifications.value.length > 0) {
          dockIconFlashing.value = true;
        }
      }
    } catch (e) {
    }
  }
  function addNotification(n) {
    if (notifications.value.some((existing) => existing.id === n.id)) return;
    notifications.value = [n, ...notifications.value];
    updateUnreadJumpList();
    if (settings.value.notificationType === "simple") {
      dockIconFlashing.value = true;
    }
  }
  function removeNotification(id) {
    notifications.value = notifications.value.filter((n) => n.id !== id);
    updateUnreadJumpList();
  }
  function clearAllNotifications() {
    notifications.value = [];
    unreadJumpList.value = [];
    dockIconFlashing.value = false;
  }
  function stopDockFlashing() {
    dockIconFlashing.value = false;
  }
  function updateUnreadJumpList() {
    unreadJumpList.value = notifications.value.map((n) => {
      const id = n.message_id || n.message?.id;
      return Number(id);
    }).filter((id) => !isNaN(id) && id > 0).sort((a, b) => a - b);
  }
  function markMessageAsSeenIfNotified(messageId) {
    const notif = notifications.value.find((n) => {
      const nMsgId = Number(n.message_id || n.message?.id);
      return nMsgId === messageId;
    });
    if (!notif) return;
    removeNotification(notif.id);
    if (userInfo.value.id) {
      markNotificationRead(notif.id, userInfo.value.id).catch(() => {
      });
    }
  }
  function NotificationManager() {
    y$1(() => {
    }, []);
    const handleMarkRead = q(async (notif) => {
      removeNotification(notif.id);
      if (userInfo.value.id) {
        try {
          await markNotificationRead(notif.id, userInfo.value.id);
        } catch (e) {
        }
      }
    }, []);
    const handleView = q(async (notif) => {
      handleMarkRead(notif);
      toggleChat(true);
      const messageId = notif.message_id || notif.message?.id;
      if (messageId) {
        pendingJumpToMessage.value = messageId;
      }
    }, [handleMarkRead]);
    const handleMarkAllRead = q(async () => {
      clearAllNotifications();
      if (userInfo.value.id) {
        try {
          await markAllNotificationsRead(userInfo.value.id);
        } catch (e) {
        }
      }
    }, []);
    const count = notificationCount.value;
    if (settings.value.notificationType === "simple") {
      return null;
    }
    if (count === 0) {
      return null;
    }
    return /* @__PURE__ */ u$2("div", { id: "unified-notifier", class: count > 0 ? "show" : "", children: [
      /* @__PURE__ */ u$2("div", { class: "un-header", children: [
        /* @__PURE__ */ u$2("span", { children: [
          "通知 (",
          /* @__PURE__ */ u$2("span", { class: "un-count", children: count }),
          ")"
        ] }),
        /* @__PURE__ */ u$2(
          "a",
          {
            href: "#",
            class: "un-clear-all",
            onClick: (e) => {
              e.preventDefault();
              handleMarkAllRead();
            },
            children: "全部已读"
          }
        )
      ] }),
      /* @__PURE__ */ u$2("div", { class: "un-body", children: /* @__PURE__ */ u$2("ul", { children: notifications.value.map((notif) => /* @__PURE__ */ u$2(
        NotificationItem,
        {
          notification: notif,
          onView: () => handleView(notif),
          onDismiss: () => handleMarkRead(notif)
        },
        notif.id
      )) }) })
    ] });
  }
  function NotificationItem({ notification, onView, onDismiss }) {
    const isReply = notification.type === "reply";
    const typeLabel = isReply ? "回复了你" : "提到了你";
    const rawText = stripBBCode(
      decodeHTML(notification.message?.message || notification.content || "")
    );
    const text = rawText.substring(0, 20) + (rawText.length > 20 ? "..." : "");
    const avatarSrc = getAvatarUrl(
      notification.message?.avatar || notification.avatar || "",
      "m"
    );
    const nickname = notification.message?.nickname || notification.nickname || "Unknown";
    return /* @__PURE__ */ u$2(
      "li",
      {
        class: "un-item",
        id: `un-item-${notification.id}`,
        "data-notif-id": notification.id,
        "data-message-id": notification.message_id || notification.message?.id,
        children: [
          /* @__PURE__ */ u$2(
            "span",
            {
              class: "avatarNeue avatarReSize40",
              style: { backgroundImage: `url('${avatarSrc}')` }
            }
          ),
          /* @__PURE__ */ u$2("div", { class: "content", children: [
            /* @__PURE__ */ u$2("strong", { class: "un-widget-title", children: [
              escapeHTML(nickname),
              " ",
              /* @__PURE__ */ u$2("span", { style: { fontWeight: "normal", color: "var(--dollars-text-placeholder)", fontSize: "11px" }, children: typeLabel })
            ] }),
            /* @__PURE__ */ u$2("span", { class: "un-widget-message", children: escapeHTML(text) }),
            /* @__PURE__ */ u$2("div", { class: "actions", children: [
              /* @__PURE__ */ u$2(
                "a",
                {
                  href: "#",
                  class: "un-action-btn btnRedSmall ll",
                  onClick: (e) => {
                    e.preventDefault();
                    onView();
                  },
                  children: /* @__PURE__ */ u$2("span", { children: "查看" })
                }
              ),
              /* @__PURE__ */ u$2(
                "a",
                {
                  href: "#",
                  class: "un-action-btn btnGraySmall ll",
                  style: { marginLeft: "6px" },
                  onClick: (e) => {
                    e.preventDefault();
                    onDismiss();
                  },
                  children: /* @__PURE__ */ u$2("span", { children: "忽略" })
                }
              )
            ] })
          ] })
        ]
      }
    );
  }

  function useSwipeToReply({ messageId, onReply, elementRef }) {
    const swipeState = A({
      startX: 0,
      startY: 0,
      currentTranslate: 0,
      isSwiping: false,
      startTime: 0
    });
    const handleTouchStart = q((e) => {
      if (e.touches.length !== 1) return;
      if (e.target.closest(".reaction-item, button")) return;
      swipeState.current = {
        startX: e.touches[0].clientX,
        startY: e.touches[0].clientY,
        currentTranslate: 0,
        isSwiping: false,
        startTime: Date.now()
      };
      if (elementRef.current) {
        elementRef.current.style.transition = "none";
      }
    }, [elementRef]);
    const handleTouchMove = q((e) => {
      if (!elementRef.current) return;
      const deltaX = e.touches[0].clientX - swipeState.current.startX;
      const deltaY = e.touches[0].clientY - swipeState.current.startY;
      if (!swipeState.current.isSwiping) {
        if (Math.abs(deltaX) > 10 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
          swipeState.current.isSwiping = true;
        } else {
          return;
        }
      }
      if (swipeState.current.isSwiping) {
        e.preventDefault();
        const translate = deltaX < 0 ? -60 * (1 - Math.exp(-(-deltaX / 150))) : 0;
        swipeState.current.currentTranslate = translate;
        elementRef.current.style.transform = `translateX(${translate}px)`;
        const indicatorEl = elementRef.current.querySelector(".swipe-reply-indicator");
        if (indicatorEl) {
          const progress = Math.min(Math.abs(translate) / 40, 1);
          indicatorEl.style.opacity = String(progress);
          indicatorEl.style.transform = `translateY(-50%) scale(${0.5 + 0.5 * progress})`;
        }
      }
    }, [elementRef]);
    const handleTouchEnd = q((e) => {
      if (!elementRef.current) return;
      elementRef.current.style.transition = "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
      elementRef.current.style.transform = "";
      const indicatorEl = elementRef.current.querySelector(".swipe-reply-indicator");
      if (indicatorEl) {
        indicatorEl.style.transition = "all 0.2s ease";
        indicatorEl.style.opacity = "0";
        indicatorEl.style.transform = "translateY(-50%) scale(0.5)";
      }
      const touch = e.changedTouches[0];
      const dist = Math.sqrt(
        Math.pow(touch.clientX - swipeState.current.startX, 2) + Math.pow(touch.clientY - swipeState.current.startY, 2)
      );
      const duration = Date.now() - swipeState.current.startTime;
      const isTap = !swipeState.current.isSwiping && duration < 300 && dist < 10;
      if (swipeState.current.isSwiping) {
        if (swipeState.current.currentTranslate < -35) {
          onReply();
        }
      } else if (isTap) {
        const target = e.target;
        const isImage = target.tagName === "IMG" || target.closest(".full-image");
        const isImagePlaceholder = target.closest(".image-placeholder");
        const isLink = target.closest("a");
        const isQuote = target.closest(".chat-quote[data-jump-to-id]");
        const isAvatar = target.closest(".avatar");
        const isMask = target.closest(".text_mask") && !target.closest(".image-masked");
        const isTag = target.closest(".chat-tag");
        const isButton = target.closest("button");
        const isVideo = target.tagName === "VIDEO" || target.closest(".video-container") || target.closest("video");
        if (!isImage && !isImagePlaceholder && !isLink && !isQuote && !isAvatar && !isMask && !isTag && !isButton && !isVideo) {
          if (isContextMenuOpen.peek()) return;
          if (isSmileyPanelOpen.peek() || profileCardUserId.peek()) return;
          if (e.cancelable) e.preventDefault();
          showContextMenu(touch.clientX, touch.clientY, String(messageId), null);
        }
      }
      swipeState.current.isSwiping = false;
    }, [onReply, messageId, elementRef]);
    return {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd
    };
  }

  function MessageReactions({ reactions, messageId }) {
    if (!reactions || reactions.length === 0) return null;
    const grouped = reactions.reduce((acc, r) => {
      if (!acc[r.emoji]) acc[r.emoji] = [];
      acc[r.emoji].push(r);
      return acc;
    }, {});
    return /* @__PURE__ */ u$2("div", { class: "reactions-container likes_grid", children: Object.entries(grouped).map(([emoji, users]) => /* @__PURE__ */ u$2(ReactionItem, { emoji, users, messageId }, emoji)) });
  }
  function ReactionItem({ emoji, users, messageId }) {
    const url = getSmileyUrl(emoji);
    const itemRef = A(null);
    const isBmo = emoji.startsWith("(bmo");
    const isSelected = users.some((u) => String(u.user_id) === String(userInfo.peek().id));
    const usersWithAvatar = users.filter((u) => u.avatar);
    const anonymousCount = users.length - usersWithAvatar.length;
    const avatarsToShow = usersWithAvatar.slice(0, MAX_AVATARS_SHOWN);
    const extraAvatarCount = usersWithAvatar.length - MAX_AVATARS_SHOWN;
    const extraCount = Math.max(0, extraAvatarCount) + anonymousCount;
    y$1(() => {
      const el = itemRef.current;
      if (!el) return;
      const $ = window.$;
      if (typeof $ === "undefined" || typeof $.fn?.tooltip !== "function") {
        el.setAttribute("title", users.map((u) => u.nickname).join("、"));
        return;
      }
      el.setAttribute("data-original-title", generateReactionTooltip(users));
      el.setAttribute("title", "");
      const $el = $(el);
      let hideTimeout;
      const getTip = () => {
        const tooltip = $el.data("bs.tooltip");
        return tooltip?.$tip || (typeof tooltip?.tip === "function" ? $(tooltip.tip()) : null);
      };
      const clearHideTimeout = () => {
        if (!hideTimeout) return;
        clearTimeout(hideTimeout);
        hideTimeout = void 0;
      };
      const scheduleHide = () => {
        clearHideTimeout();
        hideTimeout = setTimeout(() => $el.tooltip("hide"), 300);
      };
      const syncTooltipHover = () => {
        const $tip = getTip();
        if (!$tip?.length) return;
        $tip.off(".dollarsTooltip");
        $tip.on("mouseenter.dollarsTooltip", clearHideTimeout);
        $tip.on("mouseleave.dollarsTooltip", scheduleHide);
        $tip.on("click.dollarsTooltip", (event) => event.stopPropagation());
      };
      const handleMouseEnter = () => {
        clearHideTimeout();
        $el.tooltip("show");
        syncTooltipHover();
      };
      $el.tooltip("destroy");
      $el.tooltip({
        container: "body",
        html: true,
        placement: "top",
        animation: true,
        trigger: "manual",
        template: '<div class="tooltip dollars-tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
      });
      $el.off(".dollarsTooltip");
      $el.on("mouseenter.dollarsTooltip", handleMouseEnter);
      $el.on("mouseleave.dollarsTooltip", scheduleHide);
      return () => {
        clearHideTimeout();
        getTip()?.off(".dollarsTooltip");
        $el.off(".dollarsTooltip");
        $el.tooltip("hide");
        $el.tooltip("destroy");
      };
    }, [users]);
    const handleToggle = async (e) => {
      e.stopPropagation();
      await toggleReaction(messageId, emoji);
    };
    return /* @__PURE__ */ u$2(
      "div",
      {
        ref: itemRef,
        class: `reaction-item item ${isSelected ? "selected" : ""}`,
        "data-emoji": emoji,
        onClick: handleToggle,
        children: [
          /* @__PURE__ */ u$2(
            "span",
            {
              class: "emoji",
              style: url ? { backgroundImage: `url('${url}')` } : void 0,
              children: [
                !url && !isBmo && emoji,
                isBmo && /* @__PURE__ */ u$2("span", { class: "bmo", "data-code": emoji })
              ]
            }
          ),
          avatarsToShow.length > 0 && /* @__PURE__ */ u$2("span", { class: "reaction-avatars", children: avatarsToShow.map((u, i) => /* @__PURE__ */ u$2(
            "img",
            {
              class: "reaction-avatar",
              src: getAvatarUrl(u.avatar, "l"),
              alt: u.nickname,
              style: { zIndex: MAX_AVATARS_SHOWN - i }
            },
            u.user_id
          )) }),
          avatarsToShow.length === 0 ? /* @__PURE__ */ u$2("span", { class: "num", children: users.length }) : extraCount > 0 ? /* @__PURE__ */ u$2("span", { class: "num extra", children: [
            "+",
            extraCount
          ] }) : null
        ]
      }
    );
  }

  function hasRichBubbleContent(messageText, hasReplyQuote, hasLinkPreviewCards, hasCollapseToggle) {
    if (hasReplyQuote || hasLinkPreviewCards || hasCollapseToggle) {
      return true;
    }
    return /\[(?:img|emoji|sticker|audio|video|code|quote)\]|\[file=.*?\]|\((?:musume|blake)_\d+\)/i.test(messageText);
  }
  function getBubbleTimestampMode(isGroupedWithNext, editedAt, isDeleted, isSticker, prefersTrailing) {
    if (isGroupedWithNext && !(editedAt && !isDeleted)) {
      return "hidden";
    }
    if (isSticker) {
      return "overlay";
    }
    return prefersTrailing ? "trailing" : "stacked";
  }
  function arePropsEqual(prev, next) {
    const prevKey = prev.message.stableKey || prev.message.id;
    const nextKey = next.message.stableKey || next.message.id;
    return prevKey === nextKey && prev.message.message === next.message.message && prev.message.is_deleted === next.message.is_deleted && prev.message.edited_at === next.message.edited_at && prev.message.reactions === next.message.reactions && prev.message.link_previews === next.message.link_previews && prev.message.image_meta === next.message.image_meta && prev.message.state === next.message.state && prev.isSelf === next.isSelf && prev.isGrouped === next.isGrouped && prev.isGroupedWithNext === next.isGroupedWithNext;
  }
  const MessageItem = memo(({ message, isSelf, isGrouped, isGroupedWithNext }) => {
    const messageRef = A(null);
    const textContentRef = A(null);
    const [isExpanded, setIsExpanded] = d$2(false);
    const [isCollapsible, setIsCollapsible] = d$2(false);
    const [isNew, setIsNew] = d$2(() => newMessageIds.peek().has(message.id));
    y$1(() => {
      if (isNew) {
        const timer = setTimeout(() => setIsNew(false), NEW_MESSAGE_ANIMATION);
        return () => clearTimeout(timer);
      }
    }, [isNew]);
    const messageId = message.id;
    const messageText = message.message;
    const isDeleted = message.is_deleted;
    const editedAt = message.edited_at;
    const replyToId = message.reply_to_id;
    const replyDetails = message.reply_details;
    const imageMeta = message.image_meta;
    const linkPreviews = message.link_previews;
    const content = T(() => {
      if (isDeleted) {
        return '<div class="text-content deleted">此消息已撤回</div>';
      }
      const previews = [];
      let html = processBBCode(
        escapeHTML(messageText),
        imageMeta || {},
        {
          replyToId,
          replyDetails,
          previewsCollector: previews
        },
        linkPreviews || {}
      );
      if (replyToId && replyDetails) {
        html = renderReplyQuote(replyDetails, replyToId) + html;
      }
      if (previews.length > 0) {
        html += '<div class="message-previews">' + previews.join("") + "</div>";
      }
      return html;
    }, [messageId, messageText, isDeleted, replyToId, replyDetails, imageMeta, linkPreviews, settings.value.linkPreview, settings.value.loadImages]);
    y$1(() => {
      const el = messageRef.current;
      if (!el) return;
      let hasRendered = false;
      const handleVisibility = () => {
        if (hasRendered) return;
        hasRendered = true;
        markMessageAsSeenIfNotified(messageId);
        const imgs = el.querySelectorAll(".full-image");
        imgs.forEach((img) => {
          const image = img;
          const container = image.closest(".image-container");
          const handleLoad = () => {
            image.classList.add("is-loaded");
            if (container) container.classList.add("is-loaded");
          };
          const handleError = () => {
            image.src = "/img/no_img.gif";
            image.classList.add("is-loaded", "load-failed");
            if (container) container.classList.add("is-loaded");
          };
          if (image.complete) {
            if (image.naturalWidth > 0) {
              handleLoad();
            } else {
              handleError();
            }
          } else {
            image.addEventListener("load", handleLoad, { once: true });
            image.addEventListener("error", handleError, { once: true });
          }
        });
      };
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              handleVisibility();
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "100px" }
      );
      observer.observe(el);
      return () => {
        observer.disconnect();
      };
    }, [content, messageId]);
    y$1(() => {
      const el = messageRef.current;
      if (!el) return;
      const handlers = [];
      const addImageViewerHandler = (img) => {
        const handler = (e) => {
          e.preventDefault();
          e.stopPropagation();
          const allImgs = el.querySelectorAll(".full-image");
          const imageUrls = Array.from(allImgs).map((i) => i.dataset.fullSrc || i.src);
          const currentUrl = img.dataset.fullSrc || img.src;
          const index = imageUrls.indexOf(currentUrl);
          showImageViewer(imageUrls, Math.max(0, index));
        };
        img.addEventListener("click", handler);
        img.style.cursor = "zoom-in";
        handlers.push({ el: img, fn: handler });
      };
      const placeholders = el.querySelectorAll(".image-placeholder[data-src]");
      placeholders.forEach((placeholder) => {
        const container = placeholder;
        if (container.classList.contains("image-masked")) return;
        const handler = (e) => {
          e.preventDefault();
          e.stopPropagation();
          const img = container.querySelector(".full-image");
          if (!img) return;
          const fullSrc = img.dataset.fullSrc || container.dataset.src || img.src;
          showImageViewer([fullSrc], 0);
        };
        container.addEventListener("click", handler);
        handlers.push({ el: container, fn: handler });
      });
      const imgs = el.querySelectorAll(".full-image");
      imgs.forEach((img) => {
        addImageViewerHandler(img);
      });
      return () => {
        handlers.forEach(({ el: el2, fn }) => {
          el2.removeEventListener("click", fn);
        });
      };
    }, [content]);
    const isSticker = T(() => {
      if (isDeleted) return false;
      const raw = (messageText || "").trim();
      return /^(\[img\][^\[]+\[\/img\]|\[(?:emoji|sticker)\][^\[]+\[\/(?:emoji|sticker)\]|\((?:musume|blake)_\d+\))$/i.test(raw) && !replyToId;
    }, [messageText, isDeleted, replyToId]);
    const shouldCollapse = isCollapsible && !isExpanded;
    const hasReplyQuote = !!(replyToId && replyDetails);
    const hasLinkPreviewCards = settings.value.linkPreview && Object.keys(linkPreviews || {}).length > 0;
    const prefersTrailingTimestamp = !isDeleted && !hasRichBubbleContent(
      messageText,
      hasReplyQuote,
      hasLinkPreviewCards,
      isCollapsible
    );
    const timeText = formatDate(message.timestamp, "time") + (editedAt && !isDeleted ? " (已编辑)" : "");
    const fullTimeText = formatDate(message.timestamp, "full");
    const timestampMode = getBubbleTimestampMode(
      !!isGroupedWithNext,
      editedAt,
      isDeleted,
      isSticker,
      prefersTrailingTimestamp
    );
    y$1(() => {
      const el = textContentRef.current;
      if (!el || isDeleted || isSticker) {
        setIsCollapsible(false);
        return;
      }
      let frameId = 0;
      const imageListeners = [];
      const resizeObserver = new ResizeObserver(() => {
        if (frameId) cancelAnimationFrame(frameId);
        frameId = requestAnimationFrame(measure);
      });
      const measure = () => {
        frameId = 0;
        const nextCollapsible = el.scrollHeight > COLLAPSE_MAX_HEIGHT + 1;
        setIsCollapsible((prev) => prev === nextCollapsible ? prev : nextCollapsible);
      };
      resizeObserver.observe(el);
      el.querySelectorAll("img").forEach((node) => {
        const image = node;
        const handleChange = () => {
          if (frameId) cancelAnimationFrame(frameId);
          frameId = requestAnimationFrame(measure);
        };
        image.addEventListener("load", handleChange);
        image.addEventListener("error", handleChange);
        imageListeners.push({ image, handleChange });
      });
      measure();
      return () => {
        if (frameId) cancelAnimationFrame(frameId);
        resizeObserver.disconnect();
        imageListeners.forEach(({ image, handleChange }) => {
          image.removeEventListener("load", handleChange);
          image.removeEventListener("error", handleChange);
        });
      };
    }, [content, isDeleted, isSticker]);
    y$1(() => {
      if (!isCollapsible && isExpanded) {
        setIsExpanded(false);
      }
    }, [isCollapsible, isExpanded]);
    const avatarUrl = getAvatarUrl(message.avatar, "l");
    const nickColor = message.color || "var(--primary-color)";
    const handleContextMenu = q((e) => {
      let imageUrl = null;
      let bmoCode = null;
      const target = e.target;
      const bmoElement = target.closest(".bmo");
      if (bmoElement) {
        bmoCode = bmoElement.dataset.code || null;
      } else if (target.tagName === "IMG") {
        imageUrl = target.src;
      } else if (target.classList.contains("emoji") || target.style.backgroundImage) {
        const bg = window.getComputedStyle(target).backgroundImage;
        const match = bg.match(/url\(["']?(.*?)["']?\)/);
        if (match && match[1]) {
          imageUrl = match[1];
        }
      }
      if (isMobile() && !imageUrl && !bmoCode) {
        return;
      }
      e.preventDefault();
      showContextMenu(e.clientX, e.clientY, String(messageId), imageUrl, bmoCode);
    }, [messageId]);
    const triggerReply = q(() => {
      const rawContent = (getRawMessage(messageId) || messageText || "").trim();
      const text = stripQuotes(escapeHTML(rawContent)).replace(/\[img\].*?\[\/img\]/gi, "[图片]").replace(/\[file=.*?\].*?\[\/file\]/gi, "[附件]").replace(/\n/g, " ").replace(/\s+/g, " ").trim();
      setReplyTo({
        id: String(messageId),
        uid: String(message.uid),
        user: message.nickname,
        text,
        raw: rawContent,
        avatar: message.avatar
      });
      const textarea = document.querySelector("#dollars-main-chat textarea");
      if (textarea) textarea.focus();
    }, [messageId, messageText, message.uid, message.nickname, message.avatar]);
    const handleRetry = q(async () => {
      const result = retryMessage(messageId);
      if (result) {
        const [{ sendPendingMessage }, { sendMessage: apiSendMessage }] = await Promise.all([
          __vitePreload(() => Promise.resolve().then(() => useWebSocket$1),false             ?__VITE_PRELOAD__:void 0),
          __vitePreload(() => Promise.resolve().then(() => api),false             ?__VITE_PRELOAD__:void 0)
        ]);
        sendPendingMessage(result.stableKey, result.content);
        apiSendMessage(result.content);
      }
    }, [messageId]);
    const handleBubbleClick = q((e) => {
      if (message.state === "failed") {
        e.stopPropagation();
        handleRetry();
      }
    }, [message.state, handleRetry]);
    const { onTouchStart, onTouchMove, onTouchEnd } = useSwipeToReply({
      messageId,
      onReply: triggerReply,
      elementRef: messageRef
    });
    const className = [
      "chat-message",
      isSelf && "self",
      isGrouped && "is-grouped-with-prev",
      isGroupedWithNext && "is-grouped-with-next",
      editedAt && !isDeleted && "is-edited",
      isNew && "new-message",
      message.state === "sending" && "pending",
      message.state === "failed" && "failed"
    ].filter(Boolean).join(" ");
    return /* @__PURE__ */ u$2(
      "div",
      {
        id: `db-${messageId}`,
        ref: messageRef,
        class: className,
        "data-db-id": messageId,
        "data-uid": message.uid,
        "data-timestamp": message.timestamp,
        onContextMenu: handleContextMenu,
        onTouchStart,
        onTouchMove,
        onTouchEnd,
        onTouchCancel: onTouchEnd,
        children: [
          /* @__PURE__ */ u$2("div", { class: "swipe-reply-indicator" }),
          /* @__PURE__ */ u$2(
            UserAvatar,
            {
              uid: message.uid,
              src: avatarUrl,
              nickname: message.nickname
            }
          ),
          /* @__PURE__ */ u$2("div", { class: "message-content", children: [
            /* @__PURE__ */ u$2("span", { class: "nickname", children: /* @__PURE__ */ u$2(
              "a",
              {
                href: message.uid === 0 ? "/user/bangumi" : `/user/${message.uid}`,
                target: "_blank",
                rel: "noopener",
                children: message.nickname
              }
            ) }),
            /* @__PURE__ */ u$2(
              "div",
              {
                class: [
                  "bubble",
                  isSticker && "sticker-mode",
                  timestampMode === "trailing" && "has-trailing-timestamp",
                  timestampMode === "stacked" && "has-stacked-timestamp"
                ].filter(Boolean).join(" "),
                onClick: message.state === "failed" ? handleBubbleClick : void 0,
                style: message.state === "failed" ? { cursor: "pointer" } : void 0,
                children: [
                  /* @__PURE__ */ u$2("svg", { viewBox: "0 0 11 20", width: "11", height: "20", class: "bubble-tail", children: /* @__PURE__ */ u$2("use", { href: "#message-tail-filled" }) }),
                  /* @__PURE__ */ u$2("span", { class: "bubble-nickname", style: { "--nick-color": nickColor }, children: message.nickname }),
                  /* @__PURE__ */ u$2(k$1, { children: [
                    /* @__PURE__ */ u$2(
                      "div",
                      {
                        ref: textContentRef,
                        class: `text-content ${shouldCollapse ? "is-collapsed" : ""}`,
                        style: { "--collapse-max-height": `${COLLAPSE_MAX_HEIGHT}px` },
                        dangerouslySetInnerHTML: { __html: content }
                      }
                    ),
                    isCollapsible && /* @__PURE__ */ u$2(
                      "button",
                      {
                        type: "button",
                        class: "expand-toggle-btn",
                        "aria-expanded": isExpanded,
                        onClick: (e) => {
                          e.stopPropagation();
                          setIsExpanded(!isExpanded);
                        },
                        children: isExpanded ? "收起" : "展开全文"
                      }
                    )
                  ] }),
                  timestampMode !== "hidden" && /* @__PURE__ */ u$2(
                    "span",
                    {
                      class: `bubble-timestamp ${timestampMode === "overlay" ? "is-overlay" : timestampMode === "trailing" ? "is-trailing" : "is-stacked"}`,
                      title: fullTimeText,
                      children: timeText
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ u$2(MessageReactions, { reactions: message.reactions || [], messageId })
          ] })
        ]
      }
    );
  }, arePropsEqual);

  const ease = (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  function smoothScrollTo(container, targetTop, options = {}) {
    const { duration: explicitDuration, easing = ease } = options;
    const startTop = container.scrollTop;
    const distance = Math.abs(targetTop - startTop);
    if (distance < 10) {
      container.scrollTop = targetTop;
      return null;
    }
    const duration = explicitDuration ?? Math.min(250 + Math.sqrt(distance) * 8, 650);
    const startTime = performance.now();
    const diff = targetTop - startTop;
    let animId;
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      container.scrollTop = startTop + diff * easing(progress);
      if (progress < 1) {
        animId = requestAnimationFrame(animate);
      }
    };
    animId = requestAnimationFrame(animate);
    return animId;
  }
  function smoothScrollToCenter(container, el, options = {}) {
    const ch = container.clientHeight;
    const targetTop = Math.max(0, el.offsetTop - ch / 2 + el.offsetHeight / 2);
    return smoothScrollTo(container, targetTop, { easing: (t) => 1 - Math.pow(1 - t, 3), duration: 600, ...options });
  }

  const smoothScroll = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    smoothScrollTo,
    smoothScrollToCenter
  }, Symbol.toStringTag, { value: 'Module' }));

  function useScrollManager(onLoadHistory, onLoadNewerHistory) {
    const bodyRef = A(null);
    const listRef = A(null);
    const isLoadingRef = A(false);
    const isStickingToBottom = A(true);
    const prevScrollHeight = A(0);
    const isRestoringScroll = A(false);
    const hideDateLabelTimer = A(null);
    const scrollAnimationRef = A(null);
    const isProgrammaticScroll = A(false);
    const smoothScrollTo$1 = q((targetTop, duration) => {
      if (!bodyRef.current) return;
      if (scrollAnimationRef.current) {
        cancelAnimationFrame(scrollAnimationRef.current);
      }
      const animId = smoothScrollTo(bodyRef.current, targetTop, { duration });
      scrollAnimationRef.current = animId;
    }, []);
    const scrollToBottom = q((smooth = true) => {
      if (!bodyRef.current) return;
      const targetTop = bodyRef.current.scrollHeight;
      if (smooth) {
        isProgrammaticScroll.current = true;
        smoothScrollTo$1(targetTop);
        setTimeout(() => {
          isProgrammaticScroll.current = false;
        }, 700);
      } else {
        bodyRef.current.scrollTop = targetTop;
      }
      isStickingToBottom.current = true;
    }, [smoothScrollTo$1]);
    const getTopVisibleMessageId = q(() => {
      if (!bodyRef.current || !listRef.current) return null;
      const scrollTop = bodyRef.current.scrollTop;
      const topThreshold = scrollTop + 60;
      const msgs = Array.from(listRef.current.querySelectorAll(".chat-message[data-db-id]"));
      const topMsg = msgs.find((el) => el.offsetTop + el.offsetHeight > topThreshold);
      return topMsg?.dataset.dbId ? parseInt(topMsg.dataset.dbId, 10) : null;
    }, []);
    const getBottomVisibleMessageId = q(() => {
      if (!bodyRef.current || !listRef.current) return null;
      const scrollTop = bodyRef.current.scrollTop;
      const clientHeight = bodyRef.current.clientHeight;
      const bottomThreshold = scrollTop + clientHeight - 60;
      const msgs = Array.from(listRef.current.querySelectorAll(".chat-message[data-db-id]"));
      for (let i = msgs.length - 1; i >= 0; i--) {
        const el = msgs[i];
        if (el.offsetTop < bottomThreshold) {
          return el.dataset.dbId ? parseInt(el.dataset.dbId, 10) : null;
        }
      }
      return null;
    }, []);
    const updateScrollButtonMode = q(() => {
      if (!bodyRef.current) return;
      if (hasUnreadMessages.value) {
        const firstUnreadId = getFirstUnreadId();
        if (firstUnreadId) {
          const unreadEl = document.getElementById(`db-${firstUnreadId}`);
          if (unreadEl) {
            const rect = unreadEl.getBoundingClientRect();
            const containerRect = bodyRef.current.getBoundingClientRect();
            if (rect.top > containerRect.bottom) {
              scrollButtonMode.value = "to-unread";
              return;
            }
          } else {
            scrollButtonMode.value = "to-unread";
            return;
          }
        }
      }
      scrollButtonMode.value = "to-bottom";
    }, []);
    const updateFloatingUI = (scrollTop, clientHeight) => {
      if (!bodyRef.current || !listRef.current) return;
      const nearBottom = bodyRef.current.scrollHeight - scrollTop - clientHeight <= 150;
      showScrollBottomBtn.value = !nearBottom || !timelineIsLive.value;
      if (typeof hideDateLabelTimer.current === "number") {
        clearTimeout(hideDateLabelTimer.current);
        hideDateLabelTimer.current = null;
      }
      if (nearBottom) {
        currentDateLabel.value = null;
        return;
      }
      const msgs = Array.from(listRef.current.children);
      const topThreshold = scrollTop + 50;
      const topMsg = msgs.find((el) => {
        return el.classList.contains("chat-message") && el.offsetTop + el.offsetHeight > topThreshold;
      });
      if (topMsg && topMsg.dataset.timestamp) {
        const ts = parseInt(topMsg.dataset.timestamp, 10);
        const label = formatDate(ts, "label");
        if (currentDateLabel.peek() !== label) {
          currentDateLabel.value = label;
        }
        hideDateLabelTimer.current = window.setTimeout(() => {
          currentDateLabel.value = null;
        }, 1e3);
      }
    };
    const handleScroll = q(() => {
      if (!bodyRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = bodyRef.current;
      const atBottom = scrollHeight - scrollTop - clientHeight < 50;
      isAtBottom.value = atBottom;
      if (!isProgrammaticScroll.current) {
        isStickingToBottom.current = atBottom;
      }
      if (atBottom && timelineIsLive.value) {
        unreadWhileScrolled.value = 0;
        unreadJumpList.value = [];
        const unreadSep = document.querySelector(".unread-separator");
        if (unreadSep) unreadSep.remove();
        const browseSep = document.querySelector(".browse-separator");
        if (browseSep) browseSep.remove();
      }
      if (listRef.current) {
        if (atBottom && timelineIsLive.value) {
          clearBrowsePosition();
        } else {
          const topVisibleMsg = getTopVisibleMessageId();
          if (topVisibleMsg) {
            saveBrowsePosition(topVisibleMsg);
          }
        }
        const bottomVisibleMsg = getBottomVisibleMessageId();
        if (bottomVisibleMsg) {
          updateReadState(bottomVisibleMsg);
        }
      }
      updateScrollButtonMode();
      updateFloatingUI(scrollTop, clientHeight);
      if (scrollTop < 200 && !isLoadingRef.current && !historyFullyLoaded.value) {
        onLoadHistory();
      }
      if (atBottom && !isLoadingRef.current && !timelineIsLive.value) {
        isStickingToBottom.current = false;
        onLoadNewerHistory();
      }
    }, []);
    y$1(() => {
      if (manualScrollToBottom.value > 0) {
        scrollToBottom(true);
      }
    }, [manualScrollToBottom.value]);
    y$1(() => {
      if (isChatOpen.value && messageIds.value.length > 0 && timelineIsLive.value && isStickingToBottom.current) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (bodyRef.current) {
              bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
            }
          });
        });
      }
    }, [isChatOpen.value]);
    _$2(() => {
      if (pendingScrollToBottom.value) {
        pendingScrollToBottom.value = false;
        if (isStickingToBottom.current) {
          requestAnimationFrame(() => {
            scrollToBottom(true);
          });
        }
      }
    }, [pendingScrollToBottom.value, scrollToBottom]);
    const visibleMessageIds = T(() => {
      const allIds = messageIds.value;
      const blocked = blockedUsers.value;
      const filteredIds = allIds.filter((id) => {
        const msg = messageMap.peek().get(id);
        return msg && !blocked.has(String(msg.uid));
      });
      if (filteredIds.length > MAX_DOM_MESSAGES && isStickingToBottom.current) {
        return filteredIds.slice(-MAX_DOM_MESSAGES);
      }
      return filteredIds;
    }, [messageIds.value, blockedUsers.value]);
    _$2(() => {
      if (isRestoringScroll.current && bodyRef.current) {
        const newScrollHeight = bodyRef.current.scrollHeight;
        const scrollDiff = newScrollHeight - prevScrollHeight.current;
        if (scrollDiff > 0) {
          bodyRef.current.scrollTop = scrollDiff;
        }
        isRestoringScroll.current = false;
      }
    }, [visibleMessageIds]);
    y$1(() => {
      const listEl = listRef.current;
      if (!listEl) return;
      const observer = new ResizeObserver(() => {
        if (!isStickingToBottom.current || isProgrammaticScroll.current || !bodyRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = bodyRef.current;
        if (scrollHeight - scrollTop - clientHeight < 150) {
          bodyRef.current.scrollTop = scrollHeight;
        }
      });
      observer.observe(listEl);
      return () => observer.disconnect();
    }, []);
    return {
      bodyRef,
      listRef,
      isStickingToBottom,
      isRestoringScroll,
      isProgrammaticScroll,
      isLoadingRef,
      prevScrollHeight,
      handleScroll,
      scrollToBottom,
      smoothScrollTo: smoothScrollTo$1,
      visibleMessageIds,
      loadHistory: onLoadHistory,
      loadNewerHistory: onLoadNewerHistory,
      getTopVisibleMessageId,
      getBottomVisibleMessageId
    };
  }

  function normalizeMessage(msg) {
    const normalized = { ...msg };
    if (normalized.db_id) {
      normalized.id = normalized.db_id;
    }
    if (msg.id && msg.db_id) {
      normalized.bangumi_id = msg.id;
    }
    if (normalized.msg && !normalized.message) {
      normalized.message = normalized.msg;
    }
    return normalized;
  }
  function handleNewMessages(data) {
    const payload = Array.isArray(data.payload) ? data.payload : [];
    if (!payload.length) return;
    const filteredPayload = payload.filter(
      (msg) => !blockedUsers.value.has(String(msg.uid))
    );
    if (!filteredPayload.length) return;
    const lastMsg = filteredPayload[filteredPayload.length - 1];
    updateConversationLastMessage(
      "dollars",
      lastMsg.msg || lastMsg.message || "",
      lastMsg.timestamp
    );
    let newUnreadCount = 0;
    const currentUserId = String(userInfo.value.id);
    for (const msg of filteredPayload) {
      const normalizedMsg = normalizeMessage(msg);
      if (!getMessageById(normalizedMsg.id)) {
        const tempId = msg.tempId;
        addMessage(normalizedMsg, tempId);
        if (String(normalizedMsg.uid) === currentUserId) {
          markSentMessageAsRead(normalizedMsg.id);
        } else {
          newUnreadCount++;
        }
      }
    }
    if (newUnreadCount > 0 && timelineIsLive.value && !isAtBottom.value) {
      unreadWhileScrolled.value += newUnreadCount;
      showScrollBottomBtn.value = true;
    }
  }
  function handleNewPM(data) {
    const payload = data.payload;
    if (!payload) return;
    if (blockedUsers.value.has(String(payload.uid))) return;
    const normalizedMsg = normalizeMessage(payload);
    if (!getMessageById(normalizedMsg.id)) {
      addMessage(normalizedMsg);
    }
  }
  function handleNotification(data) {
    const n = data.payload;
    addNotification(n);
    if (isChatOpen.value && unreadWhileScrolled.value === 0) {
      const mid = Number(n.message_id || n.message?.id);
      if (mid) {
        setTimeout(() => markMessageAsSeenIfNotified(mid), 100);
      }
    }
  }
  function handleMessageDelete(data) {
    const { id } = data.payload;
    deleteMessage$1(Number(id));
  }
  function handleMessageEdit(data) {
    const fullMsg = data.payload;
    updateMessage(fullMsg.id, normalizeMessage(fullMsg));
  }
  function checkMissedMessages() {
    if (!isChatOpen.value) return;
    const ids = messageIds.value;
    if (ids.length === 0) return;
    const lastId = ids[ids.length - 1];
    getUnreadCount(lastId, Number(userInfo.value.id)).then(async (res) => {
      if (res && res.count > 0) {
        const newMessages = await fetchNewerMessages(lastId, 100);
        if (newMessages.length > 0) {
          addMessagesBatch(newMessages);
        }
      }
    });
  }
  function handleReadStateUpdate(data) {
    const payload = data.payload;
    if (!payload) return;
    const remoteReadId = Number(payload.last_read_id);
    if (!remoteReadId || isNaN(remoteReadId)) return;
    const currentReadId = lastReadId.value || 0;
    if (remoteReadId > currentReadId) {
      lastReadId.value = remoteReadId;
    }
  }

  let presenceSubscribed = /* @__PURE__ */ new Set();
  let syncPresenceTimer = null;
  function collectUidsForPresence() {
    const ids = messageIds.peek();
    const recentIds = ids.slice(-150);
    const uids = /* @__PURE__ */ new Set();
    const map = messageMap.peek();
    for (const id of recentIds) {
      const msg = map.get(id);
      if (msg && msg.uid) {
        uids.add(String(msg.uid));
      }
    }
    return Array.from(uids);
  }
  function syncPresenceSubscriptions$1(send, isConnected) {
    if (syncPresenceTimer) {
      clearTimeout(syncPresenceTimer);
    }
    syncPresenceTimer = setTimeout(() => {
      syncPresenceTimer = null;
      if (!isConnected() || !isChatOpen.value) {
        if (presenceSubscribed.size > 0) {
          send({ type: "presence_unsubscribe" });
          presenceSubscribed.clear();
        }
        return;
      }
      const want = new Set(collectUidsForPresence());
      const toAdd = [...want].filter((u) => !presenceSubscribed.has(u));
      const toDel = [...presenceSubscribed].filter((u) => !want.has(u));
      if (toDel.length) {
        send({ type: "presence_unsubscribe", uids: toDel });
      }
      if (toAdd.length) {
        send({ type: "presence_subscribe", uids: toAdd });
        send({ type: "presence_query", uids: toAdd });
      }
      presenceSubscribed = want;
    }, PRESENCE_SYNC_DELAY);
  }
  function resetPresence() {
    onlineUsers.value = /* @__PURE__ */ new Map();
    typingUsers.value = /* @__PURE__ */ new Map();
    presenceSubscribed.clear();
  }
  function handleOnlineCountUpdate(data) {
    onlineCount.value = data.count;
  }
  function handlePresenceResult(data) {
    if (!Array.isArray(data.users)) return;
    const newOnlineUsers = new Map(onlineUsers.value);
    let changed = false;
    data.users.forEach(({ id, active }) => {
      const uid = String(id);
      if (active) {
        if (!newOnlineUsers.has(uid)) {
          newOnlineUsers.set(uid, true);
          changed = true;
        }
      } else {
        if (newOnlineUsers.has(uid)) {
          newOnlineUsers.delete(uid);
          changed = true;
        }
      }
    });
    if (changed) onlineUsers.value = newOnlineUsers;
  }
  function handlePresenceUpdate(data) {
    const u = data.user;
    if (u && u.id != null) {
      const uid = String(u.id);
      updateSignalMap(onlineUsers, (map) => {
        u.active ? map.set(uid, true) : map.delete(uid);
      });
    }
  }
  function handleTypingStart(data) {
    const typingUserId = String(data.user?.id);
    if (typingUserId === String(userInfo.value.id)) return;
    if (blockedUsers.value.has(typingUserId)) return;
    updateSignalMap(typingUsers, (map) => map.set(typingUserId, data.user.name || data.user.nickname));
    setTimeout(() => {
      if (typingUsers.value.has(typingUserId)) {
        updateSignalMap(typingUsers, (map) => map.delete(typingUserId));
      }
    }, TYPING_AUTO_CLEAR);
  }
  function handleTypingStop(data) {
    updateSignalMap(typingUsers, (map) => map.delete(String(data.user?.id)));
  }
  function sendTypingStart$1(send, isConnected) {
    if (isConnected() && settings.value.sharePresence) {
      send({ type: "typing_start" });
    }
  }
  function sendTypingStop$1(send, isConnected) {
    if (isConnected() && settings.value.sharePresence) {
      send({ type: "typing_stop" });
    }
  }

  function updateReactionUI(messageId, reaction, action) {
    const msg = getMessageById(messageId);
    if (!msg) return;
    const reactions = [...msg.reactions || []];
    const reactionUserId = String(reaction.user_id);
    if (action === "add") {
      const existingIdx = reactions.findIndex((r) => r.emoji === reaction.emoji && String(r.user_id) === reactionUserId);
      if (existingIdx === -1) {
        reactions.push({
          emoji: reaction.emoji,
          user_id: reaction.user_id,
          nickname: reaction.nickname,
          avatar: reaction.avatar
        });
      }
    } else {
      const idx = reactions.findIndex((r) => r.emoji === reaction.emoji && String(r.user_id) === reactionUserId);
      if (idx !== -1) {
        reactions.splice(idx, 1);
      }
    }
    updateMessage(messageId, { reactions });
    if (action === "add" && String(reaction.user_id) === String(userInfo.value.id)) {
      setTimeout(() => {
        const el = document.querySelector(`#db-${messageId} .reaction-item[data-emoji="${reaction.emoji}"]`);
        if (el) {
          el.classList.add("live_selected");
          setTimeout(() => el.classList.remove("live_selected"), 1e3);
        }
      }, 10);
    }
  }
  function handleReactionAdd(data) {
    updateReactionUI(data.payload.message_id, data.payload.reaction, "add");
  }
  function handleReactionRemove(data) {
    const { message_id, user_id, emoji, nickname } = data.payload;
    updateReactionUI(message_id, { user_id, nickname: nickname || "", emoji }, "remove");
  }

  let ws = null;
  let reconnectTimer = null;
  let heartbeatTimer = null;
  let connectionCheckTimer = null;
  let wsInitialized = false;
  function sendMessage(data) {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(data));
    }
  }
  function isConnected() {
    return !!ws && ws.readyState === WebSocket.OPEN;
  }
  function initWebSocket() {
    if (wsInitialized) return;
    wsInitialized = true;
    connectWebSocket();
    startConnectionMonitoring();
  }
  function connectWebSocket() {
    if (ws && ws.readyState === WebSocket.OPEN) return;
    if (ws && ws.readyState === WebSocket.CONNECTING) return;
    if (ws) {
      ws.close();
      ws = null;
    }
    ws = new WebSocket(WEBSOCKET_URL);
    ws.onopen = () => {
      wsConnected.value = true;
      if (reconnectTimer) {
        clearTimeout(reconnectTimer);
        reconnectTimer = null;
      }
      startHeartbeat();
      sendMessage({ type: "identify", uid: userInfo.value.id });
      if (settings.value.sharePresence) {
        sendMessage({
          type: "join",
          user: {
            id: userInfo.value.id,
            name: userInfo.value.nickname,
            avatar: userInfo.value.avatar
          }
        });
      }
      if (isChatOpen.value) {
        sendMessage({ type: "presence", open: true });
        setTimeout(() => syncPresenceSubscriptions(), 0);
      }
    };
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        handleWebSocketMessage(data);
      } catch {
      }
    };
    ws.onclose = () => {
      wsConnected.value = false;
      stopHeartbeat();
      resetPresence();
      if (settings.value.notificationType === "detail" || isChatOpen.value) {
        scheduleReconnect();
      }
    };
    ws.onerror = () => {
    };
  }
  function disconnectWebSocket() {
    if (reconnectTimer) {
      clearTimeout(reconnectTimer);
      reconnectTimer = null;
    }
    stopHeartbeat();
    stopConnectionMonitoring();
    if (ws) {
      ws.close();
      ws = null;
    }
    wsConnected.value = false;
  }
  function startConnectionMonitoring() {
    if (connectionCheckTimer) return;
    connectionCheckTimer = setInterval(() => {
      const shouldBeConnected = settings.value.notificationType === "detail" || isChatOpen.value;
      if (shouldBeConnected && !isConnected()) {
        connectWebSocket();
      }
    }, CONNECTION_CHECK_INTERVAL);
  }
  function stopConnectionMonitoring() {
    if (connectionCheckTimer) {
      clearInterval(connectionCheckTimer);
      connectionCheckTimer = null;
    }
  }
  function scheduleReconnect() {
    if (reconnectTimer) {
      clearTimeout(reconnectTimer);
    }
    reconnectTimer = setTimeout(() => {
      reconnectTimer = null;
      ws = null;
      connectWebSocket();
    }, RECONNECT_DELAY);
  }
  function startHeartbeat() {
    stopHeartbeat();
    if (document.hidden) return;
    heartbeatTimer = setInterval(() => {
      sendMessage({ type: "ping" });
    }, HEARTBEAT_INTERVAL);
  }
  function stopHeartbeat() {
    if (heartbeatTimer) {
      clearInterval(heartbeatTimer);
      heartbeatTimer = null;
    }
  }
  function handleWebSocketMessage(data) {
    if (data.ackId) {
      sendMessage({ type: "ack", ackId: data.ackId });
    }
    switch (data.type) {
      case "online_count_update":
        handleOnlineCountUpdate(data);
        break;
      case "presence_result":
        handlePresenceResult(data);
        break;
      case "presence_update":
        handlePresenceUpdate(data);
        break;
      case "typing_start":
        handleTypingStart(data);
        break;
      case "typing_stop":
        handleTypingStop(data);
        break;
      case "reaction_add":
        handleReactionAdd(data);
        break;
      case "reaction_remove":
        handleReactionRemove(data);
        break;
      case "new_messages":
        handleNewMessages(data);
        break;
      case "new_pm":
        handleNewPM(data);
        break;
      case "notification":
        handleNotification(data);
        break;
      case "message_delete":
        handleMessageDelete(data);
        break;
      case "message_edit":
        handleMessageEdit(data);
        break;
      case "read_state_update":
        handleReadStateUpdate(data);
        break;
    }
  }
  function syncPresenceSubscriptions() {
    syncPresenceSubscriptions$1(sendMessage, isConnected);
  }
  function sendTypingStart() {
    sendTypingStart$1(sendMessage, isConnected);
  }
  function sendTypingStop() {
    sendTypingStop$1(sendMessage, isConnected);
  }
  function sendPendingMessage(tempId, content) {
    if (isConnected()) {
      sendMessage({ type: "pending_message", tempId, content });
    }
  }
  function useWebSocket() {
    const connect = q(() => {
      connectWebSocket();
    }, []);
    const disconnect = q(() => {
      disconnectWebSocket();
    }, []);
    y$1(() => {
      const handleVisibilityChange = () => {
        if (document.hidden) {
          if (settings.value.notificationType !== "detail") {
            stopHeartbeat();
          }
        } else {
          startHeartbeat();
          setTimeout(() => {
            const shouldConnect = isChatOpen.value || settings.value.notificationType === "detail";
            if (shouldConnect && !isConnected()) {
              connectWebSocket();
            }
            checkMissedMessages();
          }, 100);
        }
      };
      document.addEventListener("visibilitychange", handleVisibilityChange);
      return () => {
        document.removeEventListener("visibilitychange", handleVisibilityChange);
      };
    }, []);
    y$1(() => {
      if (isChatOpen.value && !isConnected()) {
        connectWebSocket();
        if (!connectionCheckTimer) {
          startConnectionMonitoring();
        }
      }
    }, [isChatOpen.value]);
    return { connect, disconnect, send: sendMessage, isConnected: wsConnected };
  }

  const useWebSocket$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    initWebSocket,
    sendPendingMessage,
    sendTypingStart,
    sendTypingStop,
    syncPresenceSubscriptions,
    useWebSocket
  }, Symbol.toStringTag, { value: 'Module' }));

  function insertUnreadSeparator(messageId) {
    const existing = document.querySelector(".unread-separator");
    if (existing) existing.remove();
    if (!messageId) return;
    const targetMsg = document.getElementById(`db-${messageId}`);
    if (!targetMsg) return;
    const separator = document.createElement("div");
    separator.className = "unread-separator";
    separator.innerHTML = "<span>未读消息</span>";
    targetMsg.parentNode?.insertBefore(separator, targetMsg);
  }

  function useHistoryLoader(refs) {
    const { bodyRef, listRef, isLoadingRef, isStickingToBottom, prevScrollHeight, isRestoringScroll } = refs;
    const loadHistory = q(async () => {
      if (isLoadingRef.current || historyFullyLoaded.value) return;
      const oldestId = historyOldestId.value;
      if (!oldestId) return;
      isLoadingRef.current = true;
      isLoadingHistory.value = true;
      if (bodyRef.current) {
        prevScrollHeight.current = bodyRef.current.scrollHeight;
      }
      try {
        const newMessages = await fetchHistoryMessages(oldestId, 50);
        if (newMessages.length === 0) {
          historyFullyLoaded.value = true;
        } else {
          const minId = Math.min(...newMessages.map((m) => m.id));
          historyOldestId.value = minId;
          const filtered = newMessages.filter((m) => !blockedUsers.value.has(String(m.uid)));
          isRestoringScroll.current = true;
          addMessagesBatch(filtered);
          syncPresenceSubscriptions();
        }
      } catch (e) {
      } finally {
        isLoadingRef.current = false;
        isLoadingHistory.value = false;
      }
    }, []);
    const loadNewerHistory = q(async () => {
      if (isLoadingRef.current || timelineIsLive.value) return;
      const newestId = historyNewestId.value;
      if (!newestId) return;
      isLoadingRef.current = true;
      const LIMIT = 50;
      try {
        const newMessages = await fetchNewerMessages(newestId, LIMIT);
        const existingIds = new Set(messageIds.peek());
        const filteredNewMessages = newMessages.filter(
          (m) => !existingIds.has(m.id) && !blockedUsers.value.has(String(m.uid))
        );
        if (filteredNewMessages.length > 0) {
          addMessagesBatch(filteredNewMessages);
          const maxId = Math.max(...filteredNewMessages.map((m) => m.id));
          historyNewestId.value = maxId;
          if (newMessages.length < LIMIT) {
            timelineIsLive.value = true;
            unreadWhileScrolled.value = 0;
            showScrollBottomBtn.value = false;
            clearBrowsePosition();
            syncPresenceSubscriptions();
          }
        } else {
          timelineIsLive.value = true;
          unreadWhileScrolled.value = 0;
          showScrollBottomBtn.value = false;
          clearBrowsePosition();
          syncPresenceSubscriptions();
        }
      } catch (e) {
      } finally {
        setTimeout(() => {
          isLoadingRef.current = false;
        }, 100);
      }
    }, []);
    const jumpToMessage = q(async (id) => {
      const targetId = String(id);
      const highlightDuration = 800;
      const scrollAndHighlight = (el, hideOverlay = false) => {
        isStickingToBottom.current = false;
        if (!bodyRef.current) return;
        el.scrollIntoView({ behavior: "auto", block: "center" });
        if (hideOverlay) {
          requestAnimationFrame(() => {
            isContextLoading.value = false;
          });
        }
        if (listRef.current) listRef.current.classList.add("focus-mode");
        el.classList.remove("message-highlight");
        void el.offsetWidth;
        el.classList.add("message-highlight");
        setTimeout(() => {
          if (listRef.current) listRef.current.classList.remove("focus-mode");
          el.classList.remove("message-highlight");
        }, highlightDuration);
      };
      const existingElement = document.getElementById(`db-${targetId}`);
      if (existingElement) {
        scrollAndHighlight(existingElement);
        return;
      }
      if (isLoadingRef.current) return;
      isLoadingRef.current = true;
      isLoadingHistory.value = true;
      isContextLoading.value = true;
      try {
        const contextResult = await fetchMessageContext(id);
        if (contextResult && contextResult.messages.length > 0) {
          const filtered = contextResult.messages.filter(
            (m) => !blockedUsers.value.has(String(m.uid))
          );
          setMessages(filtered);
          if (filtered.length > 0) {
            historyOldestId.value = filtered[0].id;
            historyNewestId.value = filtered[filtered.length - 1].id;
            historyFullyLoaded.value = !contextResult.has_more_before;
          }
          timelineIsLive.value = false;
          requestAnimationFrame(() => {
            setTimeout(() => {
              const newElement = document.getElementById(`db-${targetId}`);
              if (newElement) {
                scrollAndHighlight(newElement, true);
              } else {
                const msgElements = listRef.current?.querySelectorAll(".chat-message");
                if (msgElements && contextResult.target_index < msgElements.length) {
                  scrollAndHighlight(msgElements[contextResult.target_index]);
                }
              }
            }, 300);
          });
        } else {
        }
      } catch (e) {
        isContextLoading.value = false;
      } finally {
        isLoadingRef.current = false;
        isLoadingHistory.value = false;
      }
    }, []);
    y$1(() => {
      const messageId = pendingJumpToMessage.value;
      if (messageId !== null) {
        pendingJumpToMessage.value = null;
        jumpToMessage(messageId);
      }
    }, [pendingJumpToMessage.value]);
    y$1(() => {
      if (!isChatOpen.value) return;
      const loadInitialMessages = async () => {
        if (initialMessagesLoaded.value) {
          syncPresenceSubscriptions();
          return;
        }
        isLoadingHistory.value = true;
        isContextLoading.value = true;
        await loadReadState();
        try {
          const savedBrowse = loadBrowsePosition();
          const currentUnreadCount = unreadCount.value;
          console.log("[Browse Position Debug]", {
            savedBrowse,
            currentUnreadCount,
            lastReadId: lastReadId.value
          });
          if (savedBrowse) {
            console.log("[Browse Position] Attempting to restore to message:", savedBrowse.anchorMessageId);
            unreadWhileScrolled.value = currentUnreadCount;
            showScrollBottomBtn.value = currentUnreadCount > 0;
            const contextResult = await fetchMessageContext(savedBrowse.anchorMessageId, 25, 50);
            if (contextResult && contextResult.messages.length > 0) {
              const filtered = contextResult.messages.filter(
                (m) => !blockedUsers.value.has(String(m.uid))
              );
              setMessages(filtered);
              if (filtered.length > 0) {
                historyOldestId.value = filtered[0].id;
                historyNewestId.value = filtered[filtered.length - 1].id;
              }
              historyFullyLoaded.value = !contextResult.has_more_before;
              timelineIsLive.value = false;
              isStickingToBottom.current = false;
              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  const readId = lastReadId.value;
                  if (readId) {
                    const firstUnreadId = filtered.find((m) => m.id > readId)?.id;
                    if (firstUnreadId) {
                      insertUnreadSeparator(String(firstUnreadId));
                    }
                  }
                  const browseEl = document.getElementById(`db-${savedBrowse.anchorMessageId}`);
                  if (browseEl && bodyRef.current) {
                    bodyRef.current.scrollTop = browseEl.offsetTop - 10;
                    console.log("[Browse Position] Restored successfully");
                  } else if (bodyRef.current) {
                    bodyRef.current.scrollTop = 0;
                    console.warn("[Browse Position] Anchor message not found in loaded messages, scrolled to top");
                  }
                  syncPresenceSubscriptions();
                  isLoadingHistory.value = false;
                  isContextLoading.value = false;
                  initialMessagesLoaded.value = true;
                });
              });
              return;
            } else {
              console.warn("[Browse Position] Failed to load context, clearing invalid browse position");
              clearBrowsePosition();
            }
          }
          timelineIsLive.value = true;
          isStickingToBottom.current = true;
          clearBrowsePosition();
          const recentMessages = await fetchRecentMessages(50);
          if (recentMessages.length > 0) {
            const filtered = recentMessages.filter((m) => !blockedUsers.value.has(String(m.uid)));
            addMessagesBatch(filtered);
            if (filtered.length > 0) {
              historyOldestId.value = filtered[0].id;
              historyNewestId.value = filtered[filtered.length - 1].id;
            }
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                if (bodyRef.current) {
                  bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
                  isStickingToBottom.current = true;
                }
                syncPresenceSubscriptions();
                isLoadingHistory.value = false;
                isContextLoading.value = false;
                initialMessagesLoaded.value = true;
              });
            });
          } else {
            isLoadingHistory.value = false;
            isContextLoading.value = false;
            initialMessagesLoaded.value = true;
          }
        } catch (e) {
          isLoadingHistory.value = false;
          isContextLoading.value = false;
        }
      };
      loadInitialMessages();
    }, [isChatOpen.value]);
    return {
      loadHistory,
      loadNewerHistory,
      jumpToMessage
    };
  }

  function ChatBody() {
    const historyCallbacksRef = A({
      loadHistory: () => {
      },
      loadNewerHistory: () => {
      }
    });
    const scrollManager = useScrollManager(
      () => historyCallbacksRef.current.loadHistory(),
      () => historyCallbacksRef.current.loadNewerHistory()
    );
    const { bodyRef, listRef, handleScroll, visibleMessageIds } = scrollManager;
    const { loadHistory, loadNewerHistory, jumpToMessage } = useHistoryLoader(scrollManager);
    historyCallbacksRef.current.loadHistory = loadHistory;
    historyCallbacksRef.current.loadNewerHistory = loadNewerHistory;
    y$1(() => {
      const listEl = listRef.current;
      if (!listEl) return;
      const handleClick = (e) => {
        const target = e.target;
        const mention = target.closest("a.user-mention");
        if (mention) {
          e.preventDefault();
          e.stopPropagation();
          const href = mention.getAttribute("href") || "";
          const match = href.match(/^\/user\/(.+)$/);
          if (match) {
            showUserProfile(match[1]);
          }
          return;
        }
        if (target.classList.contains("chat-tag")) {
          e.preventDefault();
          e.stopPropagation();
          const tag = target.textContent?.trim();
          if (tag) {
            toggleSearch(true);
            searchQuery.value = tag;
          }
          return;
        }
        const quote = target.closest(".chat-quote[data-jump-to-id]");
        if (quote) {
          e.preventDefault();
          e.stopPropagation();
          const id = Number(quote.dataset.jumpToId);
          if (id) {
            jumpToMessage(id);
          }
        }
      };
      listEl.addEventListener("click", handleClick);
      return () => listEl.removeEventListener("click", handleClick);
    }, []);
    return /* @__PURE__ */ u$2(
      "div",
      {
        class: `chat-body ${isLoadingHistory.value ? "loading" : ""} ${isContextLoading.value ? "context-loading" : ""}`,
        ref: bodyRef,
        onScroll: handleScroll,
        style: { paddingBottom: `${inputAreaHeight.value + 20}px` },
        children: /* @__PURE__ */ u$2("div", { class: "chat-list", ref: listRef, children: visibleMessageIds.map((msgId) => {
          const msg = messageMap.value.get(msgId);
          if (!msg) return null;
          const grouping = getMessageGrouping(msgId);
          return /* @__PURE__ */ u$2(
            MessageItem,
            {
              message: msg,
              isSelf: grouping.isSelf,
              isGrouped: grouping.isGrouped,
              isGroupedWithNext: grouping.isGroupedWithNext
            },
            msg.stableKey || msgId
          );
        }) })
      }
    );
  }

  const CODE_BLOCK_PLACEHOLDER_PREFIX = "\0CODE_BLOCK_";
  const mentionRegex = /(^|\s|\[\/[^\]]+\])@([\p{L}\p{N}_']{1,30})/gu;
  async function transformMentions(text, lookupUsersByName) {
    const codeBlocks = [];
    let processedText = text.replace(/\[code\]([\s\S]*?)\[\/code\]/gi, (match) => {
      codeBlocks.push(match);
      return `${CODE_BLOCK_PLACEHOLDER_PREFIX}${codeBlocks.length - 1}\0`;
    });
    const matches = [...processedText.matchAll(mentionRegex)];
    if (matches.length === 0) {
      return restoreCodeBlocks(processedText, codeBlocks);
    }
    const usernamesToLookup = [...new Set(matches.map((match) => match[2]))].filter((u) => u !== "Bangumi娘");
    if (usernamesToLookup.length === 0) {
      return restoreCodeBlocks(processedText, codeBlocks);
    }
    const userDataMap = await lookupUsersByName(usernamesToLookup);
    const replacementMap = /* @__PURE__ */ new Map();
    for (const username in userDataMap) {
      const data = userDataMap[username];
      if (data?.id && data?.nickname) {
        replacementMap.set(username, `[user=${data.id}]${data.nickname}[/user]`);
      }
    }
    processedText = processedText.replace(
      mentionRegex,
      (match, prefix, username) => replacementMap.has(username) ? `${prefix}${replacementMap.get(username)}` : match
    );
    return restoreCodeBlocks(processedText, codeBlocks);
  }
  function restoreCodeBlocks(text, codeBlocks) {
    let restoredText = text;
    codeBlocks.forEach((block, i) => {
      restoredText = restoredText.replace(`${CODE_BLOCK_PLACEHOLDER_PREFIX}${i}\0`, block);
    });
    return restoredText;
  }

  const STRINGS = {
    // 通用
    loading: "加载中...",
    confirm: "确认",
    cancel: "取消",
    // 消息状态
    messageDeleted: "此消息已撤回",
    messageEdited: "已编辑",
    messageFailed: "发送失败，点击重试",
    expandFull: "展开全文",
    collapse: "收起",
    imageTag: "[图片]",
    // 输入
    typingSingle: "正在输入...",
    typingMultiple: (count) => ` 和其他 ${count} 人正在输入...`,
    typingAnd: " 和 ",
    // 搜索
    searchPlaceholder: "搜索消息...",
    searchNoResults: "未找到相关消息",
    searchConversations: "搜索对话...",
    // 用户
    online: "在线",
    noSignature: "这个人很懒，什么都没有写...",
    noMessages: "暂无发言记录",
    messagesUnit: "条消息",
    perDay: "条/天",
    firstMessage: "首次发言",
    searchMessages: "搜索发言",
    homepage: "主页",
    signature: "个性签名",
    media: "媒体",
    userProfile: "用户资料",
    // 操作
    confirmDelete: "确认撤回这条消息吗？",
    savedToBmo: "已存入BMO面板",
    reply: "回复",
    copy: "复制",
    edit: "编辑",
    delete: "撤回",
    favorite: "收藏",
    // 通知
    repliedYou: "回复了你",
    mentionedYou: "提到了你",
    view: "查看",
    ignore: "忽略",
    // BMO
    openBmoPanel: "打开 BMO 快速拼装面板",
    noBmoSaved: "暂无保存的 BMO 表情",
    uploadOrFavorite: "上传或右键图片收藏",
    // 格式化
    linkPlaceholder: "输入链接 URL..."
  };

  function TypingIndicator() {
    const users = Array.from(typingUsers.value.values());
    const lastText = A("");
    const isVisible = useSignal(false);
    y$1(() => {
      if (users.length > 0) {
        let text = "";
        if (users.length === 1) {
          text = `${users[0]} ${STRINGS.typingSingle}`;
        } else if (users.length === 2) {
          text = `${users[0]}${STRINGS.typingAnd}${users[1]} ${STRINGS.typingSingle}`;
        } else {
          text = `${users[0]}${STRINGS.typingMultiple(users.length - 1)}`;
        }
        lastText.current = text;
        isVisible.value = true;
      } else {
        isVisible.value = false;
      }
    }, [users.length]);
    return /* @__PURE__ */ u$2("div", { id: "dollars-typing-indicator", class: isVisible.value ? "visible" : "", children: lastText.current || " " });
  }

  const FAVORITES_KEY = "dollars_saved_favorites";
  const favorites = d$1([]);
  function initFavorites() {
    try {
      const cloud = getChiiApp().cloud_settings.getAll();
      if (cloud[FAVORITES_KEY]) {
        const parsed = JSON.parse(cloud[FAVORITES_KEY]);
        if (Array.isArray(parsed)) {
          favorites.value = parsed;
        }
      }
    } catch (e) {
      favorites.value = [];
    }
    if (userInfo.value.id) {
      syncFavorites();
    }
  }
  async function syncFavorites() {
    if (!userInfo.value.id) return;
    try {
      const res = await fetch(`${BACKEND_URL}/api/favorites?uid=${userInfo.value.id}`);
      if (!res.ok) return;
      const { data } = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        const current = favorites.peek();
        const merged = [.../* @__PURE__ */ new Set([...data, ...current])];
        if (merged.length !== current.length || merged.some((u) => !current.includes(u))) {
          favorites.value = merged;
          saveToCloud(merged);
        }
      }
    } catch (e) {
    }
  }
  function addFavorite(url) {
    const list = favorites.peek();
    if (!list.includes(url)) {
      const newList = [url, ...list];
      favorites.value = newList;
      saveToCloud(newList);
      if (userInfo.value.id) {
        fetch(`${BACKEND_URL}/api/favorites/add`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: userInfo.value.id, image_url: url })
        }).catch(() => {
        });
      }
    }
  }
  function removeFavorite(url) {
    const list = favorites.peek();
    const newList = list.filter((u) => u !== url);
    favorites.value = newList;
    saveToCloud(newList);
    if (userInfo.value.id) {
      fetch(`${BACKEND_URL}/api/favorites/remove`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userInfo.value.id, image_url: url })
      }).catch(() => {
      });
    }
  }
  function saveToCloud(list) {
    const cloud = getChiiApp().cloud_settings;
    cloud.update({ [FAVORITES_KEY]: JSON.stringify(list) });
    cloud.save();
  }

  const BMO_READY_EVENT = "dollars:bmo-ready";
  function announceBmoReady() {
    window.dispatchEvent(new Event(BMO_READY_EVENT));
  }
  function ensureBmoji() {
    if (window.Bmoji) {
      announceBmoReady();
      return;
    }
    const existingScript = document.querySelector('script[data-dollars-bmo], script[src*="/js/lib/bmo/bmo.js"]');
    if (existingScript) {
      existingScript.addEventListener("load", announceBmoReady, { once: true });
      return;
    }
    const version = window.CHOBITS_VER;
    const script = document.createElement("script");
    script.dataset.dollarsBmo = "1";
    script.src = version ? `/js/lib/bmo/bmo.js?${version}` : "/js/lib/bmo/bmo.js";
    script.addEventListener("load", announceBmoReady, { once: true });
    document.head.appendChild(script);
  }
  function onBmoReady(callback) {
    window.addEventListener(BMO_READY_EVENT, callback);
    return () => {
      window.removeEventListener(BMO_READY_EVENT, callback);
    };
  }
  function loadSavedBmoItems() {
    try {
      const bmoji = window.Bmoji;
      const savedBmo = bmoji?.savedBmo?.list?.() || JSON.parse(localStorage.getItem("chii_saved_bmo") || "[]");
      return Array.isArray(savedBmo) ? savedBmo.filter((item) => !!item?.code) : [];
    } catch {
      return [];
    }
  }

  function SmileyPanel({ onSelect, textareaRef }) {
    const [activeTab, setActiveTab] = d$2("TV");
    const [bmoItems, setBmoItems] = d$2([]);
    const [isUploading, setIsUploading] = d$2(false);
    const panelRef = A(null);
    const contentRef = A(null);
    y$1(() => {
      if (activeTab === "BMO") {
        setBmoItems(loadSavedBmoItems());
      }
    }, [activeTab]);
    y$1(() => {
      if (!isSmileyPanelOpen.value) return;
      const handleClickOutside = (e) => {
        const panel = panelRef.current;
        const trigger = document.getElementById("dollars-emoji-btn");
        if (panel && !panel.contains(e.target) && (!trigger || !trigger.contains(e.target))) {
          toggleSmileyPanel(false);
        }
      };
      const timer = setTimeout(() => {
        document.addEventListener("click", handleClickOutside);
      }, 50);
      return () => {
        clearTimeout(timer);
        document.removeEventListener("click", handleClickOutside);
      };
    }, [isSmileyPanelOpen.value]);
    y$1(() => {
      if (activeTab === "收藏") {
        initFavorites();
      }
    }, [activeTab]);
    y$1(() => {
      const bmoji = window.Bmoji;
      if (!bmoji || !isSmileyPanelOpen.value) return;
      requestAnimationFrame(() => {
        if (activeTab === "BMO" && contentRef.current) {
          bmoji.renderAll(contentRef.current, { width: 21, height: 21 });
        }
        const tabsContainer = document.getElementById("dollars-smiles-tabs");
        if (tabsContainer) {
          bmoji.renderAll(tabsContainer, { width: 21, height: 21 });
        }
      });
    }, [isSmileyPanelOpen.value, activeTab, bmoItems]);
    const handleSelect = q((code) => {
      onSelect(code);
      toggleSmileyPanel(false);
    }, [onSelect]);
    const handleTabClick = q((groupName) => {
      setActiveTab(groupName);
    }, []);
    const handleOpenBmoPanel = q((e) => {
      e.preventDefault();
      const apiObject = window.BgmBmoQuickPanel;
      if (apiObject && typeof apiObject.open === "function") {
        const textarea = textareaRef.current;
        if (!textarea) return;
        textarea.focus();
        apiObject.open(textarea);
        toggleSmileyPanel(false);
      } else {
        if (confirm("你需要先启用 'BMO 快速拼装面板'。\n\n是否前往启用页面？")) {
          window.location.href = "/dev/app/4853";
        }
      }
    }, [textareaRef]);
    const handleUploadFavorite = q(async (e) => {
      e.preventDefault();
      const tempInput = document.createElement("input");
      tempInput.type = "file";
      tempInput.accept = "image/*";
      tempInput.style.display = "none";
      tempInput.onchange = async (evt) => {
        const target = evt.target;
        const file = target.files?.[0];
        if (!file) return;
        const formData = new FormData();
        formData.append("image", file);
        setIsUploading(true);
        try {
          const res = await fetch(`${UPLOAD_BASE_URL}/api/upload`, {
            method: "POST",
            credentials: "include",
            body: formData
          });
          const result = await res.json();
          if (!res.ok || !result.status) throw new Error(result.message || "上传失败");
          const imageUrl = result.url || result.imageUrl;
          addFavorite(imageUrl);
        } catch (err) {
          alert(err.message || "上传失败");
        } finally {
          setIsUploading(false);
        }
      };
      tempInput.click();
    }, []);
    const handleRemoveFavorite = q((e, url) => {
      e.preventDefault();
      e.stopPropagation();
      removeFavorite(url);
    }, []);
    if (!isSmileyPanelOpen.value) {
      return null;
    }
    let smileys = [];
    let groupedSmileySections = [];
    let specialContent = null;
    if (activeTab === "BMO") {
      specialContent = /* @__PURE__ */ u$2("div", { style: { display: "contents" }, children: [
        /* @__PURE__ */ u$2("li", { class: "smiley-item", children: /* @__PURE__ */ u$2(
          "a",
          {
            href: "#",
            id: "dollars-open-bmo-panel",
            title: "打开 BMO 快速拼装面板",
            onClick: handleOpenBmoPanel,
            style: { backgroundImage: "none", display: "flex", alignItems: "center", justifyContent: "center" },
            dangerouslySetInnerHTML: { __html: iconBmoPanel }
          }
        ) }),
        bmoItems.length > 0 ? bmoItems.map((item) => /* @__PURE__ */ u$2("li", { class: "smiley-item", children: /* @__PURE__ */ u$2(
          "a",
          {
            href: "#",
            "data-smiley": item.code,
            title: item.name || item.code,
            onClick: (e) => {
              e.preventDefault();
              handleSelect(item.code);
            },
            children: /* @__PURE__ */ u$2("span", { class: "bmo", "data-code": item.code })
          }
        ) }, item.code)) : /* @__PURE__ */ u$2("p", { style: { width: "100%", textAlign: "center", color: "var(--dollars-text-secondary)", fontSize: "12px", marginTop: "20px", padding: "0 10px" }, children: [
          "暂无保存的 BMO 表情",
          /* @__PURE__ */ u$2("br", {}),
          /* @__PURE__ */ u$2("a", { href: "/dev/app/4853", target: "_blank", rel: "noopener", style: { color: "var(--primary-color)" }, children: "前往 BMO 快速拼装面板" })
        ] })
      ] });
    } else if (activeTab === "收藏") {
      const favoritesList = favorites.value;
      specialContent = /* @__PURE__ */ u$2("div", { style: { display: "contents" }, children: [
        /* @__PURE__ */ u$2("li", { class: "smiley-item favorite-item", style: { border: "2px dashed var(--dollars-border)", borderRadius: "8px", boxSizing: "border-box" }, children: /* @__PURE__ */ u$2(
          "a",
          {
            href: "#",
            title: "上传新表情",
            onClick: handleUploadFavorite,
            style: { backgroundImage: "none", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--dollars-text-secondary)" },
            children: isUploading ? /* @__PURE__ */ u$2("span", { style: { fontSize: "12px" }, children: "..." }) : /* @__PURE__ */ u$2("span", { dangerouslySetInnerHTML: { __html: iconUpload } })
          }
        ) }),
        favoritesList.length > 0 ? favoritesList.map((url) => /* @__PURE__ */ u$2("li", { class: "smiley-item favorite-item", children: [
          /* @__PURE__ */ u$2(
            "a",
            {
              href: "#",
              "data-smiley": `[sticker]${escapeHTML(url)}[/sticker]`,
              title: `[sticker]${url}[/sticker]`,
              onClick: (e) => {
                e.preventDefault();
                handleSelect(`[sticker]${url}[/sticker]`);
              },
              style: { backgroundImage: `url('${url}')` }
            }
          ),
          /* @__PURE__ */ u$2(
            "button",
            {
              class: "remove-favorite-btn",
              title: "移除收藏",
              onClick: (e) => handleRemoveFavorite(e, url),
              children: "×"
            }
          )
        ] }, url)) : /* @__PURE__ */ u$2("p", { style: { width: "100%", textAlign: "center", color: "var(--dollars-icon-color-secondary)", fontSize: "12px", marginTop: "20px", padding: "0 10px" }, children: [
          "上传或右键图片收藏",
          /* @__PURE__ */ u$2("br", {}),
          "(存储于Chii云端)"
        ] })
      ] });
    } else if (smileyRanges.find((r) => r.name === activeTab)?.isLarge) {
      groupedSmileySections = getGroupedSmileyCodes(activeTab);
    } else {
      smileys = generateSmileyCodes(activeTab);
    }
    const activeRange = smileyRanges.find((r) => r.name === activeTab);
    const isLargeTab = activeRange?.isLarge ?? false;
    return /* @__PURE__ */ u$2("div", { ref: panelRef, id: "dollars-smiles-floating", class: `open ${isSmileyPanelClosing.value ? "closing" : ""} ${isLargeTab ? "large-smiley-mode" : ""}`, children: [
      /* @__PURE__ */ u$2("div", { id: "dollars-smiles-tabs", children: smileyRanges.map((range) => {
        let textContent = range.name;
        if (range.name === "收藏") {
          textContent = /* @__PURE__ */ u$2("span", { dangerouslySetInnerHTML: { __html: iconStar }, style: { display: "flex" } });
        } else if (range.name === "BMO") {
          textContent = /* @__PURE__ */ u$2("span", { class: "bmo", "data-code": "(bmoCgASACIBLgCg)", style: { verticalAlign: "middle" } });
        } else if (range.path) {
          const iconId = range.tabIconId ?? range.ids?.[0] ?? range.start;
          if (!iconId) return null;
          textContent = /* @__PURE__ */ u$2("img", { src: range.path(iconId), alt: range.name, style: { width: "21px", height: "21px", verticalAlign: "middle" } });
        }
        return /* @__PURE__ */ u$2(
          "button",
          {
            class: `smiley-tab-btn ${activeTab === range.name ? "active" : ""}`,
            "data-group": range.name,
            onClick: () => handleTabClick(range.name),
            title: range.name,
            children: textContent
          },
          range.name
        );
      }) }),
      /* @__PURE__ */ u$2("div", { id: "dollars-smiles-content", ref: contentRef, class: groupedSmileySections.length > 0 ? "grouped-content" : "", children: [
        specialContent,
        groupedSmileySections.map((section) => /* @__PURE__ */ u$2("section", { class: "smiley-group-section", children: [
          /* @__PURE__ */ u$2("div", { class: "smiley-group-title", children: section.name }),
          /* @__PURE__ */ u$2("div", { class: "smiley-group-grid", children: section.items.map(({ code }) => {
            const url = getSmileyUrl(code);
            return /* @__PURE__ */ u$2("li", { class: "smiley-item", children: /* @__PURE__ */ u$2(
              "a",
              {
                href: "#",
                "data-smiley": code,
                onClick: (e) => {
                  e.preventDefault();
                  handleSelect(code);
                },
                style: url ? { backgroundImage: `url('${url}')` } : void 0,
                title: code
              }
            ) }, code);
          }) })
        ] }, section.name)),
        smileys.map((code) => {
          const url = getSmileyUrl(code);
          return /* @__PURE__ */ u$2("li", { class: "smiley-item", children: /* @__PURE__ */ u$2(
            "a",
            {
              href: "#",
              "data-smiley": code,
              onClick: (e) => {
                e.preventDefault();
                handleSelect(code);
              },
              style: url ? { backgroundImage: `url('${url}')` } : void 0,
              title: code
            }
          ) }, code);
        })
      ] })
    ] });
  }

  const formatterVisible = d$1(false);
  const formatterLinkMode = d$1(false);
  const PORTAL_ID = "dollars-text-formatter-portal";
  function TextFormatter({ editorRef, inputControllerRef }) {
    y$1(() => {
      let root = document.getElementById(PORTAL_ID);
      if (!root) {
        root = document.createElement("div");
        root.id = PORTAL_ID;
        document.body.appendChild(root);
      }
      G(/* @__PURE__ */ u$2(TextFormatterLayer, { editorRef, inputControllerRef }), root);
      return () => {
        G(null, root);
        root.remove();
      };
    }, [editorRef, inputControllerRef]);
    return null;
  }
  function TextFormatterLayer({ editorRef, inputControllerRef }) {
    const containerRef = A(null);
    const linkInputRef = A(null);
    const savedRangeRef = A(null);
    const checkSelection = q(() => {
      const editor = editorRef.current;
      const controller = inputControllerRef.current;
      if (!editor || !controller) return;
      if (document.activeElement !== editor) {
        if (containerRef.current?.contains(document.activeElement)) return;
        if (formatterLinkMode.value) return;
        hide();
        return;
      }
      const selection = controller.getSelection();
      if (selection.start !== selection.end) {
        show();
      } else {
        hide();
      }
    }, [editorRef, inputControllerRef]);
    const show = q(() => {
      const editor = editorRef.current;
      const controller = inputControllerRef.current;
      const el = containerRef.current;
      if (!editor || !controller || !el) return;
      const rect = editor.getBoundingClientRect();
      el.style.top = `${rect.top - 50}px`;
      el.style.left = `${rect.left + rect.width / 2 - el.offsetWidth / 2}px`;
      formatterVisible.value = true;
      savedRangeRef.current = controller.getSelection();
    }, [editorRef, inputControllerRef]);
    const hide = q(() => {
      formatterVisible.value = false;
      setTimeout(() => {
        if (!formatterVisible.value) {
          formatterLinkMode.value = false;
          if (linkInputRef.current) {
            linkInputRef.current.value = "";
          }
        }
      }, 200);
    }, []);
    const switchMode = q((isLinkMode) => {
      const controller = inputControllerRef.current;
      if (isLinkMode) {
        formatterLinkMode.value = true;
        savedRangeRef.current = controller?.getSelection() || { start: 0, end: 0 };
        setTimeout(() => linkInputRef.current?.focus(), 50);
      } else {
        formatterLinkMode.value = false;
        restoreSelection();
      }
    }, [inputControllerRef]);
    const restoreSelection = q(() => {
      const controller = inputControllerRef.current;
      if (controller && savedRangeRef.current) {
        controller.focus();
        controller.setSelection(savedRangeRef.current.start, savedRangeRef.current.end);
      }
    }, [inputControllerRef]);
    const applyBBCode = q((tag) => {
      restoreSelection();
      const controller = inputControllerRef.current;
      if (!controller) return;
      const { start, end } = controller.getSelection();
      const text = controller.getValue();
      const selection = text.substring(start, end);
      if (!selection) return;
      const before = text.substring(0, start);
      const after = text.substring(end);
      const newText = `${before}[${tag}]${selection}[/${tag}]${after}`;
      controller.setValue(newText, {
        focus: true,
        selection: {
          start: start + tag.length + 2,
          end: end + tag.length + 2
        }
      });
      hide();
    }, [inputControllerRef, restoreSelection, hide]);
    const applyLink = q(() => {
      const url = linkInputRef.current?.value.trim();
      if (!url) {
        switchMode(false);
        return;
      }
      const controller = inputControllerRef.current;
      if (!controller) return;
      const activeSelection = savedRangeRef.current || controller.getSelection();
      const { start, end } = activeSelection;
      const text = controller.getValue();
      const selection = text.substring(start, end);
      const before = text.substring(0, start);
      const after = text.substring(end);
      const newText = `${before}[url=${url}]${selection}[/url]${after}`;
      controller.setValue(newText, {
        focus: true,
        selection: {
          start,
          end: start + newText.length - before.length - after.length
        }
      });
      hide();
      if (linkInputRef.current) {
        linkInputRef.current.value = "";
      }
    }, [inputControllerRef, switchMode, hide]);
    y$1(() => {
      const editor = editorRef.current;
      if (!editor) return;
      const handleMouseDown = () => hide();
      const handleMouseUp = () => setTimeout(checkSelection, 10);
      const handleTouchEnd = () => setTimeout(checkSelection, 50);
      const handleKeyUp = () => setTimeout(checkSelection, 10);
      const handleScroll = () => hide();
      const handleResize = () => hide();
      editor.addEventListener("mousedown", handleMouseDown);
      document.addEventListener("mouseup", handleMouseUp);
      editor.addEventListener("touchend", handleTouchEnd);
      editor.addEventListener("keyup", handleKeyUp);
      editor.addEventListener("scroll", handleScroll);
      window.addEventListener("resize", handleResize);
      return () => {
        editor.removeEventListener("mousedown", handleMouseDown);
        document.removeEventListener("mouseup", handleMouseUp);
        editor.removeEventListener("touchend", handleTouchEnd);
        editor.removeEventListener("keyup", handleKeyUp);
        editor.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleResize);
      };
    }, [editorRef, checkSelection, hide]);
    const handleAction = q((action) => {
      switch (action) {
        case "b":
        case "i":
        case "u":
        case "s":
        case "mask":
        case "code":
          applyBBCode(action);
          break;
        case "link-mode":
          switchMode(true);
          break;
        case "cancel-link":
          switchMode(false);
          break;
        case "apply-link":
          applyLink();
          break;
      }
    }, [applyBBCode, switchMode, applyLink]);
    const handleLinkKeyDown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        applyLink();
      } else if (e.key === "Escape") {
        switchMode(false);
        inputControllerRef.current?.focus();
      }
    };
    const className = [
      "dollars-text-formatter",
      formatterVisible.value && "visible",
      formatterLinkMode.value && "link-mode"
    ].filter(Boolean).join(" ");
    const formatterContent = /* @__PURE__ */ u$2(
      "div",
      {
        ref: containerRef,
        id: "dollars-text-formatter",
        class: className,
        children: [
          /* @__PURE__ */ u$2("div", { class: "formatter-row main-buttons", children: [
            /* @__PURE__ */ u$2("button", { type: "button", class: "formatter-btn", title: "防剧透 (Mask)", onClick: () => handleAction("mask"), dangerouslySetInnerHTML: { __html: iconSpoiler } }),
            /* @__PURE__ */ u$2("div", { class: "formatter-divider" }),
            /* @__PURE__ */ u$2("button", { type: "button", class: "formatter-btn", title: "加粗", onClick: () => handleAction("b"), dangerouslySetInnerHTML: { __html: iconBold } }),
            /* @__PURE__ */ u$2("button", { type: "button", class: "formatter-btn", title: "斜体", onClick: () => handleAction("i"), dangerouslySetInnerHTML: { __html: iconItalic } }),
            /* @__PURE__ */ u$2("button", { type: "button", class: "formatter-btn", title: "下划线", onClick: () => handleAction("u"), dangerouslySetInnerHTML: { __html: iconUnderline } }),
            /* @__PURE__ */ u$2("button", { type: "button", class: "formatter-btn", title: "删除线", onClick: () => handleAction("s"), dangerouslySetInnerHTML: { __html: iconStrike } }),
            /* @__PURE__ */ u$2("button", { type: "button", class: "formatter-btn", title: "等宽代码", onClick: () => handleAction("code"), dangerouslySetInnerHTML: { __html: iconCode } }),
            /* @__PURE__ */ u$2("div", { class: "formatter-divider" }),
            /* @__PURE__ */ u$2("button", { type: "button", class: "formatter-btn", title: "添加链接", onClick: () => handleAction("link-mode"), dangerouslySetInnerHTML: { __html: iconLink } })
          ] }),
          /* @__PURE__ */ u$2("div", { class: "formatter-row formatter-link-input-wrapper", children: [
            /* @__PURE__ */ u$2("button", { type: "button", class: "formatter-btn", title: "返回", onClick: () => handleAction("cancel-link"), dangerouslySetInnerHTML: { __html: iconBack } }),
            /* @__PURE__ */ u$2("div", { class: "formatter-divider" }),
            /* @__PURE__ */ u$2("input", { ref: linkInputRef, type: "text", class: "formatter-link-input", placeholder: "输入链接 URL...", autoComplete: "off", onKeyDown: handleLinkKeyDown }),
            /* @__PURE__ */ u$2("div", { class: "formatter-divider" }),
            /* @__PURE__ */ u$2("button", { type: "button", class: "formatter-btn", title: "确认", onClick: () => handleAction("apply-link"), dangerouslySetInnerHTML: { __html: iconCheck } })
          ] })
        ]
      }
    );
    return formatterContent;
  }

  function MentionCompleter({ editorRef, inputControllerRef }) {
    const containerRef = A(null);
    const [visible, setVisible] = d$2(false);
    const [users, setUsers] = d$2([]);
    const [matchStart, setMatchStart] = d$2(-1);
    const queryRef = A(null);
    const timerRef = A(null);
    const checkInput = q(() => {
      const controller = inputControllerRef.current;
      if (!controller) return;
      const cursor = controller.getSelection().end;
      const text = controller.getValue().slice(0, cursor);
      const match = text.match(/(?:^|\s)(@[^\s]*)$/);
      if (!match) {
        hide();
        return;
      }
      const newMatchStart = cursor - match[1].length;
      setMatchStart(newMatchStart);
      const currentQuery = match[1].slice(1);
      if (currentQuery === queryRef.current && visible) return;
      queryRef.current = currentQuery;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (!currentQuery) {
        hide();
        return;
      }
      timerRef.current = setTimeout(() => fetchUsers(currentQuery), MENTION_DEBOUNCE);
    }, [inputControllerRef, visible]);
    const fetchUsers = async (query) => {
      try {
        const res = await fetch(
          `https://bgm.ry.mk/search/users?q=${encodeURIComponent(query)}&exact=true&limit=${MAX_MENTION_RESULTS}`
        );
        if (query !== queryRef.current) return;
        const json = await res.json();
        const data = json.data || [];
        if (data.length > 0) {
          setUsers(data);
          setVisible(true);
        } else {
          hide();
        }
      } catch (e) {
        hide();
      }
    };
    const hide = q(() => {
      setVisible(false);
      queryRef.current = null;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    }, []);
    const selectUser = q((user) => {
      const controller = inputControllerRef.current;
      if (!controller) return;
      controller.replaceRange(`@${user.username} `, matchStart, controller.getSelection().end, {
        focus: true
      });
      hide();
    }, [inputControllerRef, matchStart, hide]);
    y$1(() => {
      const editor = editorRef.current;
      if (!editor) return;
      const handleInput = () => checkInput();
      const handleBlur = (e) => {
        if (containerRef.current?.contains(e.relatedTarget)) return;
        setTimeout(hide, 150);
      };
      const handleKeyDown = (e) => {
        if (e.key === "Escape" && visible) {
          e.preventDefault();
          hide();
        }
      };
      editor.addEventListener("input", handleInput);
      editor.addEventListener("blur", handleBlur);
      editor.addEventListener("keydown", handleKeyDown);
      return () => {
        editor.removeEventListener("input", handleInput);
        editor.removeEventListener("blur", handleBlur);
        editor.removeEventListener("keydown", handleKeyDown);
      };
    }, [editorRef, checkInput, hide, visible]);
    if (!visible || users.length === 0) {
      return null;
    }
    return /* @__PURE__ */ u$2(
      "div",
      {
        ref: containerRef,
        id: "dollars-mention-list",
        class: "visible",
        children: users.map((user) => /* @__PURE__ */ u$2(
          "div",
          {
            class: "mention-item",
            onClick: () => selectUser(user),
            children: [
              /* @__PURE__ */ u$2(
                "img",
                {
                  src: user.avatar_url || "//lain.bgm.tv/pic/user/m/000/00/00/0.jpg",
                  alt: ""
                }
              ),
              /* @__PURE__ */ u$2("div", { class: "mention-item-info", children: [
                /* @__PURE__ */ u$2("span", { class: "mention-item-nick", children: escapeHTML(user.nickname || user.username) }),
                /* @__PURE__ */ u$2("span", { class: "mention-item-user", children: [
                  "@",
                  escapeHTML(user.username)
                ] })
              ] })
            ]
          },
          user.id || user.username
        ))
      }
    );
  }

  function MediaPreview({ previewMedia, onRemoveMedia }) {
    if (previewMedia.length === 0) return null;
    return /* @__PURE__ */ u$2("div", { class: "image-preview-container visible", children: previewMedia.map((media, index) => /* @__PURE__ */ u$2("div", { class: `image-preview-item ${media.type === "video" ? "video-preview-item" : ""}`, children: [
      media.type === "image" ? /* @__PURE__ */ u$2(
        "img",
        {
          src: media.url,
          class: "preview-image",
          onClick: () => {
            const imageUrls = previewMedia.filter((m) => m.type === "image").map((m) => m.url);
            const imageIndex = previewMedia.slice(0, index).filter((m) => m.type === "image").length;
            showImageViewer(imageUrls, imageIndex);
          },
          style: { cursor: "zoom-in" }
        }
      ) : /* @__PURE__ */ u$2(k$1, { children: [
        /* @__PURE__ */ u$2(
          "video",
          {
            src: media.url,
            class: "preview-video",
            muted: true,
            preload: "metadata"
          }
        ),
        /* @__PURE__ */ u$2("div", { class: "video-play-overlay", children: /* @__PURE__ */ u$2("svg", { viewBox: "0 0 24 24", width: "24", height: "24", fill: "white", children: /* @__PURE__ */ u$2("path", { d: "M8 5v14l11-7z" }) }) })
      ] }),
      /* @__PURE__ */ u$2(
        "button",
        {
          class: "preview-remove-btn",
          onClick: () => onRemoveMedia(index),
          title: media.type === "image" ? "删除图片" : "删除视频",
          children: "✕"
        }
      )
    ] }, index)) });
  }

  const ALLOWED_IMAGE_EXTS = /* @__PURE__ */ new Set([
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
    ".gif",
    ".avif",
    ".bmp",
    ".tiff",
    ".tif",
    ".svg",
    ".heic",
    ".heif",
    ".ico",
    ".jxl",
    ".apng"
  ]);
  const ALLOWED_VIDEO_EXTS = /* @__PURE__ */ new Set([
    ".mp4",
    ".webm",
    ".mov",
    ".mkv",
    ".avi"
  ]);
  const ALLOWED_AUDIO_EXTS = /* @__PURE__ */ new Set([
    ".mp3",
    ".wav",
    ".ogg",
    ".aac",
    ".flac",
    ".weba"
  ]);
  function useMediaUpload(inputControllerRef) {
    const fileInputRef = A(null);
    const [isUploading, setIsUploading] = d$2(false);
    const [previewMedia, setPreviewMedia] = d$2([]);
    const attachLongPressRef = A(null);
    const isAttachLongPressRef = A(false);
    const parseMediaFiles = q((text, knownMeta) => {
      const imgRegex = /\[img\](.*?)\[\/img\]/g;
      const videoRegex = /\[video\](.*?)\[\/video\]/g;
      const media = [];
      let match;
      while ((match = imgRegex.exec(text)) !== null) {
        media.push({ type: "image", url: match[1], position: match.index });
      }
      while ((match = videoRegex.exec(text)) !== null) {
        media.push({ type: "video", url: match[1], position: match.index });
      }
      media.sort((a, b) => a.position - b.position);
      setPreviewMedia((prev) => {
        if (prev.length === media.length && prev.every((item, i) => item.type === media[i].type && item.url === media[i].url)) {
          return prev;
        }
        return media.map(({ type, url }) => {
          const existing = prev.find((p) => p.url === url);
          if (existing) {
            return { ...existing, type, url };
          }
          if (knownMeta && knownMeta[url]) {
            const meta = knownMeta[url];
            return {
              type,
              url,
              width: meta.width,
              height: meta.height
            };
          }
          return { type, url };
        });
      });
    }, []);
    const handleRemoveMedia = q((index) => {
      const controller = inputControllerRef.current;
      if (!controller) return;
      const text = controller.getValue();
      const currentPreviewMedia = previewMedia;
      const media = currentPreviewMedia[index];
      if (!media) return;
      const regex = media.type === "image" ? /\[img\](.*?)\[\/img\]/g : /\[video\](.*?)\[\/video\]/g;
      let matchIndex = 0;
      let currentMediaIndex = 0;
      for (let i = 0; i < index; i++) {
        if (currentPreviewMedia[i].type === media.type) {
          matchIndex++;
        }
      }
      const newText = text.replace(regex, (match) => {
        if (currentMediaIndex === matchIndex) {
          currentMediaIndex++;
          return "";
        }
        currentMediaIndex++;
        return match;
      });
      controller.setValue(newText, { focus: true });
    }, [inputControllerRef, previewMedia]);
    const handleAttachClick = q(() => {
      if (isAttachLongPressRef.current) {
        isAttachLongPressRef.current = false;
        return;
      }
      if (fileInputRef.current) {
        fileInputRef.current.accept = "image/*,video/*";
        fileInputRef.current.click();
      }
    }, []);
    const handleAttachTouchStart = q(() => {
      isAttachLongPressRef.current = false;
      attachLongPressRef.current = setTimeout(() => {
        isAttachLongPressRef.current = true;
        if (navigator.vibrate) navigator.vibrate(50);
        if (fileInputRef.current) {
          fileInputRef.current.accept = "*/*";
          fileInputRef.current.click();
        }
      }, 500);
    }, []);
    const handleAttachTouchEnd = q(() => {
      if (attachLongPressRef.current) {
        clearTimeout(attachLongPressRef.current);
        attachLongPressRef.current = null;
      }
    }, []);
    const handleFileUpload = q(async (file) => {
      const ext = "." + (file.name.split(".").pop() || "").toLowerCase();
      const isImage = file.type.startsWith("image/") || ALLOWED_IMAGE_EXTS.has(ext);
      const isVideo = file.type.startsWith("video/") || ALLOWED_VIDEO_EXTS.has(ext);
      const isAudio = file.type.startsWith("audio/") || ALLOWED_AUDIO_EXTS.has(ext);
      let fileToUpload = file;
      if (!file.type && isImage) {
        const mimeMap = {
          ".heic": "image/heic",
          ".heif": "image/heif",
          ".bmp": "image/bmp",
          ".tiff": "image/tiff",
          ".tif": "image/tiff",
          ".jxl": "image/jxl",
          ".avif": "image/avif",
          ".jpg": "image/jpeg",
          ".jpeg": "image/jpeg",
          ".png": "image/png",
          ".webp": "image/webp",
          ".gif": "image/gif"
        };
        const correctedMime = mimeMap[ext] || "application/octet-stream";
        fileToUpload = new File([file], file.name, { type: correctedMime });
      }
      setIsUploading(true);
      let clientWidth = 0;
      let clientHeight = 0;
      if (isImage) {
        try {
          const img = new Image();
          const objectUrl = URL.createObjectURL(fileToUpload);
          await new Promise((resolve) => {
            img.onload = () => {
              clientWidth = img.naturalWidth;
              clientHeight = img.naturalHeight;
              URL.revokeObjectURL(objectUrl);
              resolve();
            };
            img.onerror = () => {
              URL.revokeObjectURL(objectUrl);
              resolve();
            };
            img.src = objectUrl;
          });
        } catch (e) {
          console.warn("Failed to get image dimensions:", e);
        }
      }
      try {
        const result = await uploadFile(fileToUpload);
        if (result.status && result.url) {
          const controller = inputControllerRef.current;
          if (!controller) return;
          let tag = "img";
          if (isVideo) {
            tag = "video";
          } else if (isAudio) {
            tag = "audio";
          } else if (!isImage) {
            tag = "file";
          }
          const safeName = file.name.replace(/[\[\]\r\n]+/g, " ").trim() || "附件";
          const bbcode = tag === "file" ? `[file=${safeName}]${result.url}[/file]` : `[${tag}]${result.url}[/${tag}]`;
          controller.insertText(bbcode, { focus: true });
          if (tag === "img" && clientWidth && clientHeight) {
            setPreviewMedia((prev) => {
              const existingIndex = prev.findIndex(
                (item) => item.type === "image" && item.url === result.url && (!item.width || !item.height)
              );
              if (existingIndex >= 0) {
                const next = [...prev];
                next[existingIndex] = {
                  ...next[existingIndex],
                  width: clientWidth,
                  height: clientHeight
                };
                return next;
              }
              if (prev.some((item) => item.type === "image" && item.url === result.url)) {
                return prev;
              }
              return [...prev, {
                type: "image",
                url: result.url,
                width: clientWidth,
                height: clientHeight
              }];
            });
          }
        } else {
          alert(result.error || "上传失败");
        }
      } catch (e) {
        alert("上传失败，请重试");
      } finally {
        setIsUploading(false);
      }
    }, [inputControllerRef]);
    const handleFileChange = q(async (e) => {
      const input = e.target;
      const file = input.files?.[0];
      if (file) {
        await handleFileUpload(file);
        input.value = "";
      }
    }, [handleFileUpload]);
    const handlePaste = q(async (e) => {
      const items = [...e.clipboardData?.items || []].filter(
        (it) => it.kind === "file" && (it.type.startsWith("image/") || it.type.startsWith("video/") || it.type.startsWith("audio/") || it.type === "application/octet-stream" || it.type === "")
      );
      if (items.length > 0) {
        e.preventDefault();
        for (const item of items) {
          const file = item.getAsFile();
          if (file) {
            await handleFileUpload(file);
          }
        }
        return;
      }
      const text = e.clipboardData?.getData("text/plain");
      if (text) {
        e.preventDefault();
        inputControllerRef.current?.insertText(text, { focus: true });
      }
    }, [handleFileUpload]);
    return {
      fileInputRef,
      isUploading,
      previewMedia,
      setPreviewMedia,
      parseMediaFiles,
      handleRemoveMedia,
      handleAttachClick,
      handleAttachTouchStart,
      handleAttachTouchEnd,
      handleFileChange,
      handleFileUpload,
      handlePaste
    };
  }

  const RICH_INPUT_TOKEN_ATTR = "data-rich-raw";
  const BLOCK_TAGS = /* @__PURE__ */ new Set(["DIV", "P", "LI"]);
  function buildTokenHTML(raw, innerHTML, className) {
    return `<span class="chat-input-token ${className}" ${RICH_INPUT_TOKEN_ATTR}="${escapeHTML(raw)}" contenteditable="false">${innerHTML}</span>`;
  }
  function renderRichInputToken(token) {
    switch (token.type) {
      case "custom-image": {
        const className = token.isCommunityEmoji ? "smiley chat-input-inline-smiley" : "custom-emoji chat-input-inline-sticker";
        const innerHTML = `<img src="${escapeHTML(token.src)}" class="${className}" alt="${escapeHTML(token.raw)}" loading="lazy" decoding="async" referrerpolicy="no-referrer">`;
        return buildTokenHTML(token.raw, innerHTML, "chat-input-token-image");
      }
      case "bmo":
        return buildTokenHTML(token.raw, `<span class="bmo" data-code="${escapeHTML(token.code)}"></span>`, "chat-input-token-bmo");
      case "smiley": {
        let className = "smiley chat-input-inline-smiley";
        if (token.variant === "musume") {
          className += " smiley-musume chat-input-inline-large";
        } else if (token.variant === "blake") {
          className += " smiley-blake chat-input-inline-large";
        }
        const attrs = token.variant === "bgm" ? ' width="21" height="21"' : "";
        const innerHTML = `<img src="${escapeHTML(token.src)}" class="${className}" alt="${escapeHTML(token.raw)}"${attrs}>`;
        return buildTokenHTML(token.raw, innerHTML, "chat-input-token-smiley");
      }
    }
  }
  function collectRenderableRichInputTokens(text) {
    return collectRenderableInlineTokenRaws(text);
  }
  function renderRichInputHTML(text) {
    return replaceInlineTokens(
      text,
      (token, raw) => token ? renderRichInputToken(token) : escapeHTML(raw),
      { renderText: escapeHTML }
    );
  }
  function isTokenElement(node) {
    return node instanceof HTMLElement && node.hasAttribute(RICH_INPUT_TOKEN_ATTR);
  }
  function isBlockElement(node) {
    return node instanceof HTMLElement && BLOCK_TAGS.has(node.tagName);
  }
  function getNodeRawLength(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent?.length || 0;
    }
    if (!(node instanceof HTMLElement)) {
      return 0;
    }
    const raw = node.getAttribute(RICH_INPUT_TOKEN_ATTR);
    if (raw != null) {
      return raw.length;
    }
    if (node.tagName === "BR") {
      return 1;
    }
    let total = 0;
    node.childNodes.forEach((child) => {
      total += getNodeRawLength(child);
    });
    return total;
  }
  function appendBlockBoundary(parts) {
    const last = parts[parts.length - 1];
    if (last?.endsWith("\n")) return;
    parts.push("\n");
  }
  function extractNodeText(node, parts) {
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.textContent) {
        parts.push(node.textContent);
      }
      return;
    }
    if (!(node instanceof HTMLElement)) {
      return;
    }
    const raw = node.getAttribute(RICH_INPUT_TOKEN_ATTR);
    if (raw != null) {
      parts.push(raw);
      return;
    }
    if (node.tagName === "BR") {
      parts.push("\n");
      return;
    }
    const children = Array.from(node.childNodes);
    children.forEach((child, index) => {
      extractNodeText(child, parts);
      if (isBlockElement(child) && index < children.length - 1) {
        appendBlockBoundary(parts);
      }
    });
  }
  function extractRichInputText(root) {
    const parts = [];
    const children = Array.from(root.childNodes);
    children.forEach((child, index) => {
      extractNodeText(child, parts);
      if (isBlockElement(child) && index < children.length - 1) {
        appendBlockBoundary(parts);
      }
    });
    return parts.join("");
  }
  function getRawOffset(root, target, offset) {
    let total = 0;
    const walk = (node) => {
      if (node === target) {
        if (node.nodeType === Node.TEXT_NODE) {
          total += Math.min(offset, node.textContent?.length || 0);
          return true;
        }
        if (isTokenElement(node)) {
          total += offset > 0 ? node.getAttribute(RICH_INPUT_TOKEN_ATTR)?.length || 0 : 0;
          return true;
        }
        const limit = Math.min(offset, node.childNodes.length);
        for (let i = 0; i < limit; i++) {
          total += getNodeRawLength(node.childNodes[i]);
        }
        return true;
      }
      if (isTokenElement(node)) {
        total += node.getAttribute(RICH_INPUT_TOKEN_ATTR)?.length || 0;
        return false;
      }
      if (node.nodeType === Node.TEXT_NODE) {
        total += node.textContent?.length || 0;
        return false;
      }
      if (node instanceof HTMLElement && node.tagName === "BR") {
        total += 1;
        return false;
      }
      for (const child of Array.from(node.childNodes)) {
        if (walk(child)) {
          return true;
        }
      }
      return false;
    };
    walk(root);
    return total;
  }
  function getRichInputSelection(root) {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return null;
    const range = selection.getRangeAt(0);
    if (!root.contains(range.startContainer) || !root.contains(range.endContainer)) {
      return null;
    }
    return {
      start: getRawOffset(root, range.startContainer, range.startOffset),
      end: getRawOffset(root, range.endContainer, range.endOffset)
    };
  }
  function findDomPosition(node, rawOffset) {
    if (node.nodeType === Node.TEXT_NODE) {
      return {
        container: node,
        offset: Math.min(rawOffset, node.textContent?.length || 0)
      };
    }
    if (isTokenElement(node) || node instanceof HTMLElement && node.tagName === "BR") {
      const parent = node.parentNode;
      if (!parent) {
        return { container: node, offset: 0 };
      }
      const index = Array.from(parent.childNodes).indexOf(node);
      const nodeLength = getNodeRawLength(node);
      return {
        container: parent,
        offset: index + (rawOffset > 0 && nodeLength > 0 ? 1 : 0)
      };
    }
    let remaining = rawOffset;
    for (const child of Array.from(node.childNodes)) {
      const childLength = getNodeRawLength(child);
      if (remaining <= childLength) {
        return findDomPosition(child, remaining);
      }
      remaining -= childLength;
    }
    return {
      container: node,
      offset: node.childNodes.length
    };
  }
  function setRichInputSelection(root, start, end = start) {
    const selection = window.getSelection();
    if (!selection) return;
    const totalLength = getNodeRawLength(root);
    const startOffset = Math.max(0, Math.min(start, totalLength));
    const endOffset = Math.max(0, Math.min(end, totalLength));
    const startPos = findDomPosition(root, startOffset);
    const endPos = findDomPosition(root, endOffset);
    const range = document.createRange();
    range.setStart(startPos.container, startPos.offset);
    range.setEnd(endPos.container, endPos.offset);
    selection.removeAllRanges();
    selection.addRange(range);
  }
  function getRenderedRichInputTokens(root) {
    return Array.from(root.querySelectorAll(`[${RICH_INPUT_TOKEN_ATTR}]`)).map((node) => node.getAttribute(RICH_INPUT_TOKEN_ATTR) || "");
  }
  function needsRichInputNormalization(root, text) {
    const expectedTokens = collectRenderableRichInputTokens(text);
    const renderedTokens = getRenderedRichInputTokens(root);
    if (expectedTokens.length !== renderedTokens.length) {
      return true;
    }
    if (expectedTokens.some((token, index) => token !== renderedTokens[index])) {
      return true;
    }
    return Array.from(root.querySelectorAll("div, p, br")).some(
      (node) => !node.closest(`[${RICH_INPUT_TOKEN_ATTR}]`)
    );
  }

  const MAX_INPUT_HEIGHT = 150;
  function ChatInput() {
    const editorRef = A(null);
    const textareaProxyRef = A(null);
    const inputControllerRef = A(null);
    const containerRef = A(null);
    const inputValueRef = A("");
    const selectionRef = A({ start: 0, end: 0 });
    const [isSending, setIsSending] = d$2(false);
    const typingTimerRef = A(null);
    const isTypingRef = A(false);
    const draftSaveTimerRef = A(null);
    const isComposingRef = A(false);
    const {
      fileInputRef,
      isUploading,
      previewMedia,
      setPreviewMedia,
      parseMediaFiles,
      handleRemoveMedia,
      handleAttachClick,
      handleAttachTouchStart,
      handleAttachTouchEnd,
      handleFileChange,
      handlePaste
    } = useMediaUpload(inputControllerRef);
    const syncProxyTextarea = q((value = inputValueRef.current, selection = selectionRef.current) => {
      const proxy = textareaProxyRef.current;
      if (!proxy) return;
      proxy.value = value;
      proxy.selectionStart = selection.start;
      proxy.selectionEnd = selection.end;
    }, []);
    const updateEditorHeight = q(() => {
      const editor = editorRef.current;
      if (!editor) return;
      editor.style.height = "auto";
      const nextHeight = Math.max(38, Math.min(editor.scrollHeight, MAX_INPUT_HEIGHT));
      editor.style.height = `${nextHeight}px`;
      editor.classList.toggle("is-overflowing", editor.scrollHeight > MAX_INPUT_HEIGHT);
    }, []);
    const syncRenderedAssetLayout = q(() => {
      const editor = editorRef.current;
      if (!editor) return;
      const images = Array.from(editor.querySelectorAll("img"));
      if (images.length === 0) {
        requestAnimationFrame(updateEditorHeight);
        return;
      }
      images.forEach((img) => {
        if (img.complete) return;
        const refresh = () => requestAnimationFrame(updateEditorHeight);
        img.addEventListener("load", refresh, { once: true });
        img.addEventListener("error", refresh, { once: true });
      });
      requestAnimationFrame(updateEditorHeight);
    }, [updateEditorHeight]);
    const scheduleDraftSave = q((value) => {
      if (editingMessage.value) return;
      if (draftSaveTimerRef.current) {
        clearTimeout(draftSaveTimerRef.current);
      }
      draftSaveTimerRef.current = setTimeout(() => {
        const content = value.trim();
        const reply = replyingTo.value;
        const replyInfo = reply ? {
          id: reply.id,
          uid: reply.uid,
          user: reply.user,
          avatar: reply.avatar,
          text: reply.text,
          raw: reply.raw
        } : null;
        saveDraft(content, replyInfo);
      }, DRAFT_SAVE_DELAY);
    }, []);
    const processInputState = q((value, knownMeta, options = {}) => {
      parseMediaFiles(value, knownMeta);
      updateEditorHeight();
      if (options.silent) {
        if (typingTimerRef.current) {
          clearTimeout(typingTimerRef.current);
        }
        if (isTypingRef.current) {
          sendTypingStop();
          isTypingRef.current = false;
        }
        if (draftSaveTimerRef.current) {
          clearTimeout(draftSaveTimerRef.current);
        }
      } else {
        if (settings.value.sharePresence && !isTypingRef.current) {
          sendTypingStart();
          isTypingRef.current = true;
        }
        if (typingTimerRef.current) {
          clearTimeout(typingTimerRef.current);
        }
        typingTimerRef.current = setTimeout(() => {
          if (isTypingRef.current) {
            sendTypingStop();
            isTypingRef.current = false;
          }
        }, TYPING_STOP_DELAY);
        scheduleDraftSave(value);
      }
    }, [parseMediaFiles, scheduleDraftSave, updateEditorHeight]);
    const renderBmoTokens = q((value) => {
      if (!value.includes("(bmo")) return;
      const editor = editorRef.current;
      const bmoji = window.Bmoji;
      if (!editor || typeof bmoji?.renderAll !== "function") return;
      requestAnimationFrame(() => {
        if (editorRef.current === editor) {
          bmoji.renderAll(editor, { width: 21, height: 21 });
          requestAnimationFrame(updateEditorHeight);
        }
      });
    }, [updateEditorHeight]);
    const renderEditorValue = q((value, selection, focus = false) => {
      const editor = editorRef.current;
      if (!editor) return;
      editor.innerHTML = renderRichInputHTML(value);
      if (focus) {
        editor.focus();
      }
      if (focus || document.activeElement === editor) {
        setRichInputSelection(editor, selection.start, selection.end);
      }
      syncRenderedAssetLayout();
      renderBmoTokens(value);
    }, [renderBmoTokens, syncRenderedAssetLayout]);
    const applyInputValue = q((value, options = {}) => {
      const selection = options.selection || { start: value.length, end: value.length };
      inputValueRef.current = value;
      selectionRef.current = selection;
      syncProxyTextarea(value, selection);
      renderEditorValue(value, selection, !!options.focus);
      processInputState(value, options.knownMeta, options);
    }, [processInputState, renderEditorValue, syncProxyTextarea]);
    inputControllerRef.current = {
      focus: () => editorRef.current?.focus(),
      getSelection: () => {
        const editor = editorRef.current;
        const selection = editor ? getRichInputSelection(editor) : null;
        if (selection) {
          selectionRef.current = selection;
          syncProxyTextarea(inputValueRef.current, selection);
          return selection;
        }
        return selectionRef.current;
      },
      getValue: () => inputValueRef.current,
      insertText: (text, options = {}) => {
        const currentSelection = inputControllerRef.current?.getSelection() || selectionRef.current;
        inputControllerRef.current?.replaceRange(text, currentSelection.start, currentSelection.end, options);
      },
      replaceRange: (text, start, end, options = {}) => {
        const currentValue = inputValueRef.current;
        const nextValue = currentValue.substring(0, start) + text + currentValue.substring(end);
        const selection = options.selection || {
          start: start + text.length,
          end: start + text.length
        };
        applyInputValue(nextValue, { ...options, selection });
      },
      setSelection: (start, end = start) => {
        const selection = { start, end };
        selectionRef.current = selection;
        syncProxyTextarea(inputValueRef.current, selection);
        const editor = editorRef.current;
        if (editor && document.activeElement === editor) {
          setRichInputSelection(editor, start, end);
        }
      },
      setValue: (value, options = {}) => {
        applyInputValue(value, options);
      }
    };
    const handleEditorInput = q(() => {
      const editor = editorRef.current;
      if (!editor) return;
      const selection = getRichInputSelection(editor) || selectionRef.current;
      const value = extractRichInputText(editor);
      inputValueRef.current = value;
      selectionRef.current = selection;
      syncProxyTextarea(value, selection);
      if (!isComposingRef.current && needsRichInputNormalization(editor, value)) {
        renderEditorValue(value, selection);
      }
      processInputState(value);
    }, [processInputState, renderEditorValue, syncProxyTextarea]);
    const handleCompositionStart = q(() => {
      isComposingRef.current = true;
    }, []);
    const handleCompositionEnd = q(() => {
      isComposingRef.current = false;
      handleEditorInput();
    }, [handleEditorInput]);
    const clearInput = q((focus = false) => {
      inputControllerRef.current?.setValue("", {
        focus,
        silent: true,
        selection: { start: 0, end: 0 }
      });
    }, []);
    y$1(() => {
      const mention = pendingMention.value;
      const controller = inputControllerRef.current;
      if (!mention || !controller) return;
      const { uid, nickname } = mention;
      const mentionText = uid === "bot" ? `@${nickname}` : `[user=${uid}]${nickname}[/user]`;
      const { start, end } = controller.getSelection();
      const value = controller.getValue();
      const before = value.slice(0, start);
      const needsLeadingSpace = before.length > 0 && !/\s$/.test(before);
      const text = `${needsLeadingSpace ? " " : ""}${mentionText} `;
      controller.replaceRange(text, start, end, { focus: true });
      pendingMention.value = null;
    }, [pendingMention.value]);
    y$1(() => {
      if (editingMessage.value) return;
      const draft = loadDraft();
      if (draft?.content) {
        inputControllerRef.current?.setValue(draft.content, {
          silent: true,
          selection: { start: draft.content.length, end: draft.content.length }
        });
      } else {
        updateEditorHeight();
      }
      if (draft?.replyTo) {
        setReplyTo({
          ...draft.replyTo,
          raw: draft.replyTo.raw || draft.replyTo.text
        });
      }
    }, []);
    y$1(() => {
      const msg = editingMessage.value;
      if (msg) {
        inputControllerRef.current?.setValue(msg.raw, {
          focus: true,
          knownMeta: msg.image_meta,
          silent: true,
          selection: { start: msg.raw.length, end: msg.raw.length }
        });
        return;
      }
      updateEditorHeight();
    }, [editingMessage.value, updateEditorHeight]);
    y$1(() => {
      const proxy = textareaProxyRef.current;
      if (!proxy) return;
      const handleProxyInput = () => {
        applyInputValue(proxy.value, {
          selection: {
            start: proxy.selectionStart,
            end: proxy.selectionEnd
          }
        });
      };
      proxy.addEventListener("input", handleProxyInput);
      return () => proxy.removeEventListener("input", handleProxyInput);
    }, [applyInputValue]);
    y$1(() => {
      const syncSelection = () => {
        const editor = editorRef.current;
        if (!editor || document.activeElement !== editor) return;
        const selection = getRichInputSelection(editor);
        if (!selection) return;
        selectionRef.current = selection;
        syncProxyTextarea(inputValueRef.current, selection);
      };
      document.addEventListener("selectionchange", syncSelection);
      return () => document.removeEventListener("selectionchange", syncSelection);
    }, [syncProxyTextarea]);
    y$1(() => {
      return () => {
        if (typingTimerRef.current) {
          clearTimeout(typingTimerRef.current);
        }
        if (draftSaveTimerRef.current) {
          clearTimeout(draftSaveTimerRef.current);
        }
        if (isTypingRef.current) {
          sendTypingStop();
        }
      };
    }, []);
    const getImageMeta = () => previewMedia.reduce((meta, media) => {
      if (media.type === "image" && media.width && media.height) {
        meta[media.url] = {
          width: media.width,
          height: media.height
        };
      }
      return meta;
    }, {});
    const handleSend = async () => {
      const content = inputValueRef.current.trim();
      if (!content || isSending) return;
      setIsSending(true);
      try {
        if (editingMessage.value) {
          let finalContent = content;
          if (editingMessage.value.hiddenQuote) {
            finalContent = `${editingMessage.value.hiddenQuote}
${content}`;
          }
          finalContent = await transformMentions(finalContent, lookupUsersByName);
          const result = await editMessage(Number(editingMessage.value.id), finalContent);
          if (!result.status) {
            alert(result.error || "编辑失败");
          } else {
            clearInput();
            const imageMeta = getImageMeta();
            if (Object.keys(imageMeta).length > 0) {
              updateMessage(Number(editingMessage.value.id), { image_meta: imageMeta });
            }
          }
          cancelReplyOrEdit();
        } else {
          let finalContent = content;
          const reply = replyingTo.value;
          if (reply) {
            finalContent = `[quote=${reply.id}][/quote]${content}`;
          }
          const transformedContent = await transformMentions(finalContent, lookupUsersByName);
          const imageMeta = getImageMeta();
          const user = userInfo.value;
          const { tempId, stableKey } = addOptimisticMessage(
            transformedContent,
            { id: user.id, nickname: user.nickname, avatar: user.avatar },
            reply ? Number(reply.id) : void 0,
            reply ? { uid: Number(reply.uid), nickname: reply.user, avatar: reply.avatar, content: reply.text } : void 0,
            Object.keys(imageMeta).length > 0 ? imageMeta : void 0
          );
          sendPendingMessage(stableKey, transformedContent);
          clearInput(true);
          setPreviewMedia([]);
          clearDraft();
          cancelReplyOrEdit();
          const result = await sendMessage$1(transformedContent);
          if (!result.status) {
            removeOptimisticMessage(tempId);
            alert(result.error || "发送失败");
          }
        }
      } catch (e) {
        alert("发送失败，请重试");
      } finally {
        setIsSending(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key !== "Enter") return;
      const isShortcut = e.ctrlKey || e.metaKey;
      const shouldSend = settings.value.sendShortcut === "Enter" && !isShortcut || settings.value.sendShortcut === "CtrlEnter" && isShortcut;
      if (shouldSend) {
        e.preventDefault();
        handleSend();
        return;
      }
      e.preventDefault();
      inputControllerRef.current?.insertText("\n", { focus: true });
    };
    y$1(() => {
      if (!containerRef.current) return;
      const updateHeight = () => {
        if (containerRef.current) {
          inputAreaHeight.value = containerRef.current.offsetHeight;
        }
      };
      const observer = new ResizeObserver(updateHeight);
      observer.observe(containerRef.current);
      updateHeight();
      return () => observer.disconnect();
    }, []);
    return /* @__PURE__ */ u$2("div", { ref: containerRef, class: "chat-input-container", children: [
      /* @__PURE__ */ u$2(
        SmileyPanel,
        {
          onSelect: (code) => inputControllerRef.current?.insertText(code, { focus: true }),
          textareaRef: textareaProxyRef
        }
      ),
      /* @__PURE__ */ u$2(TextFormatter, { editorRef, inputControllerRef }),
      /* @__PURE__ */ u$2(MentionCompleter, { editorRef, inputControllerRef }),
      /* @__PURE__ */ u$2(TypingIndicator, {}),
      /* @__PURE__ */ u$2("div", { class: "chat-input-area", children: [
        (replyingTo.value || editingMessage.value) && /* @__PURE__ */ u$2("div", { id: "dollars-reply-preview", class: `reply-preview visible`, children: [
          /* @__PURE__ */ u$2("div", { class: "reply-bar" }),
          replyingTo.value && /* @__PURE__ */ u$2(k$1, { children: [
            /* @__PURE__ */ u$2(
              "img",
              {
                class: "reply-avatar",
                src: getAvatarUrl(replyingTo.value.avatar, "s"),
                alt: ""
              }
            ),
            /* @__PURE__ */ u$2("div", { class: "reply-info", children: [
              /* @__PURE__ */ u$2("span", { class: "reply-user", children: escapeHTML(replyingTo.value.user) }),
              /* @__PURE__ */ u$2("span", { class: "reply-text", children: escapeHTML(replyingTo.value.text.substring(0, 50)) })
            ] })
          ] }),
          editingMessage.value && /* @__PURE__ */ u$2("div", { class: "reply-info", children: [
            /* @__PURE__ */ u$2("span", { class: "reply-user", children: "编辑消息" }),
            /* @__PURE__ */ u$2("span", { class: "reply-text", children: escapeHTML(editingMessage.value.raw.substring(0, 50)) })
          ] }),
          /* @__PURE__ */ u$2(
            "button",
            {
              class: "reply-cancel-btn",
              onClick: () => {
                clearInput();
                cancelReplyOrEdit();
              },
              children: "✕"
            }
          )
        ] }),
        /* @__PURE__ */ u$2(
          MediaPreview,
          {
            previewMedia,
            onRemoveMedia: handleRemoveMedia
          }
        ),
        /* @__PURE__ */ u$2("div", { class: "input-wrapper", children: [
          /* @__PURE__ */ u$2(
            "button",
            {
              id: "dollars-emoji-btn",
              class: "action-btn",
              title: "表情",
              onClick: () => toggleSmileyPanel(),
              dangerouslySetInnerHTML: { __html: iconEmoji }
            }
          ),
          /* @__PURE__ */ u$2("div", { class: "dollars-input-wrapper", children: [
            /* @__PURE__ */ u$2(
              "div",
              {
                ref: editorRef,
                class: "chat-textarea chat-rich-editor",
                contentEditable: true,
                role: "textbox",
                "aria-multiline": "true",
                "data-placeholder": "说点什么...",
                spellcheck: false,
                onInput: handleEditorInput,
                onKeyDown: handleKeyDown,
                onPaste: handlePaste,
                onCompositionStart: handleCompositionStart,
                onCompositionEnd: handleCompositionEnd
              }
            ),
            /* @__PURE__ */ u$2(
              "textarea",
              {
                ref: textareaProxyRef,
                class: "chat-textarea-proxy",
                tabIndex: -1,
                "aria-hidden": "true"
              }
            )
          ] }),
          /* @__PURE__ */ u$2("div", { class: "input-actions", children: [
            /* @__PURE__ */ u$2(
              "button",
              {
                id: "dollars-attach-btn",
                class: "action-btn",
                title: "上传图片/视频（长按上传文件）",
                onClick: handleAttachClick,
                onTouchStart: handleAttachTouchStart,
                onTouchEnd: handleAttachTouchEnd,
                onTouchCancel: handleAttachTouchEnd,
                onMouseDown: handleAttachTouchStart,
                onMouseUp: handleAttachTouchEnd,
                onMouseLeave: handleAttachTouchEnd,
                dangerouslySetInnerHTML: { __html: iconUpload }
              }
            ),
            /* @__PURE__ */ u$2(
              "input",
              {
                ref: fileInputRef,
                type: "file",
                accept: "image/*,video/*",
                style: { display: "none" },
                onChange: handleFileChange
              }
            ),
            /* @__PURE__ */ u$2(
              "button",
              {
                class: `send-btn ${isUploading ? "uploading" : ""}`,
                disabled: isSending || isUploading,
                onClick: handleSend,
                onMouseDown: (e) => e.preventDefault(),
                title: isUploading ? "上传中..." : "发送",
                dangerouslySetInnerHTML: { __html: iconSend }
              }
            )
          ] })
        ] })
      ] })
    ] });
  }

  function GalleryPanel({ onClose }) {
    const items = useSignal([]);
    const isLoading = useSignal(false);
    const hasMore = useSignal(true);
    const offset = A(0);
    const initialized = A(false);
    const gridRef = A(null);
    const targetUid = useSignal(void 0);
    const isResolvingUser = useSignal(false);
    y$1(() => {
      const parseUserFilter = async () => {
        const query = searchQuery.value.trim();
        const userMatch = query.match(/^user:(\S+)$/i);
        if (userMatch && userMatch[1]) {
          const username = userMatch[1];
          isResolvingUser.value = true;
          try {
            const result = await lookupUsersByName([username]);
            if (result && result[username]) {
              const newUid = result[username].id;
              if (targetUid.value !== newUid) {
                targetUid.value = newUid;
                items.value = [];
                offset.current = 0;
                hasMore.value = true;
                loadMore();
              }
            } else {
              if (targetUid.value !== -1) {
                targetUid.value = -1;
                items.value = [];
                offset.current = 0;
                hasMore.value = false;
              }
            }
          } catch (e) {
            console.error("Failed to resolve user filter", e);
          } finally {
            isResolvingUser.value = false;
          }
        } else {
          if (targetUid.value !== void 0) {
            targetUid.value = void 0;
            items.value = [];
            offset.current = 0;
            hasMore.value = true;
            loadMore();
          }
        }
      };
      parseUserFilter();
    }, [searchQuery.value]);
    const loadMore = q(async () => {
      if (isLoading.value || !hasMore.value || isResolvingUser.value) return;
      if (targetUid.value === -1) return;
      isLoading.value = true;
      try {
        const data = await fetchGalleryMedia(offset.current, 50, targetUid.value);
        items.value = [...items.value, ...data.items];
        hasMore.value = data.hasMore;
        offset.current += data.items.length;
      } catch (e) {
        console.error("[GalleryPanel] Failed to load:", e);
      } finally {
        isLoading.value = false;
      }
    }, [targetUid.value, isResolvingUser.value]);
    y$1(() => {
      if (!initialized.current && !isResolvingUser.value) {
        initialized.current = true;
      }
    }, []);
    y$1(() => {
      const checkAndLoadMore = () => {
        const grid = gridRef.current;
        if (grid && hasMore.value && !isLoading.value && !isResolvingUser.value) {
          if (grid.scrollHeight <= grid.clientHeight) {
            loadMore();
          }
        }
      };
      const timer = setTimeout(checkAndLoadMore, 100);
      return () => clearTimeout(timer);
    }, [items.value.length, hasMore.value, isLoading.value, isResolvingUser.value]);
    const handleScroll = (e) => {
      const el = e.target;
      if (!isLoading.value && hasMore.value && el.scrollHeight - el.scrollTop - el.clientHeight < 100) {
        loadMore();
      }
    };
    const imageItems = items.value.filter((item) => item.type === "image");
    const viewerItems = imageItems.map((item) => ({
      src: item.url,
      messageId: item.message_id,
      nickname: item.nickname,
      avatar: item.avatar,
      timestamp: item.timestamp
    }));
    return /* @__PURE__ */ u$2("div", { class: "gallery-container", children: [
      /* @__PURE__ */ u$2("div", { class: "gallery-header", children: [
        /* @__PURE__ */ u$2("span", { class: "gallery-title", children: "相册" }),
        /* @__PURE__ */ u$2(
          "div",
          {
            class: "gallery-close-btn",
            onClick: onClose,
            children: /* @__PURE__ */ u$2("svg", { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", children: /* @__PURE__ */ u$2("path", { d: "M18 6L6 18M6 6l12 12" }) })
          }
        )
      ] }),
      /* @__PURE__ */ u$2("div", { class: "gallery-grid", ref: gridRef, onScroll: handleScroll, children: [
        items.value.map((item, idx) => {
          const imageIndex = imageItems.indexOf(item);
          return /* @__PURE__ */ u$2(
            "div",
            {
              class: "gallery-item",
              children: item.type === "video" ? /* @__PURE__ */ u$2("div", { class: "video-container", onClick: () => {
                window.open(item.url, "_blank");
              }, children: [
                /* @__PURE__ */ u$2(
                  "img",
                  {
                    src: item.thumbnailUrl || item.url,
                    alt: "Video thumbnail",
                    loading: "lazy",
                    style: "width: 100%; height: 100%; object-fit: cover; cursor: pointer;",
                    onError: (e) => {
                      const target = e.currentTarget;
                      target.src = "/img/no_img.gif";
                      target.onerror = null;
                    }
                  }
                ),
                /* @__PURE__ */ u$2("div", { class: "video-overlay", children: /* @__PURE__ */ u$2("svg", { xmlns: "http://www.w3.org/2000/svg", width: "48", height: "48", viewBox: "0 0 24 24", fill: "white", style: "filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));", children: /* @__PURE__ */ u$2("path", { d: "M8 5v14l11-7z" }) }) })
              ] }) : /* @__PURE__ */ u$2(
                "img",
                {
                  src: item.thumbnailUrl || item.url,
                  alt: "",
                  loading: "lazy",
                  style: "cursor: pointer;",
                  onClick: () => {
                    showImageViewer(viewerItems, imageIndex, "gallery");
                  },
                  onError: (e) => {
                    const target = e.currentTarget;
                    target.src = "/img/no_img.gif";
                    target.onerror = null;
                  }
                }
              )
            },
            `${item.message_id}-${idx}`
          );
        }),
        isLoading.value && /* @__PURE__ */ u$2("div", { class: "gallery-loading", children: "加载中..." })
      ] })
    ] });
  }

  function SearchPanel() {
    const results = useSignal([]);
    const isLoading = useSignal(false);
    const hasMore = useSignal(false);
    const searchOffset = A(0);
    const inputRef = A(null);
    const isGalleryMode = useSignal(false);
    const performSearch = q(async (q, isNewSearch = false) => {
      if (!q.trim()) {
        results.value = [];
        return;
      }
      if (isNewSearch) {
        results.value = [];
        searchOffset.current = 0;
        hasMore.value = true;
      }
      isLoading.value = true;
      try {
        const data = await searchMessages(q, searchOffset.current);
        if (isNewSearch) {
          results.value = data.messages;
        } else {
          results.value = [...results.value, ...data.messages];
        }
        hasMore.value = data.hasMore;
        searchOffset.current += data.messages.length;
      } catch (e) {
      } finally {
        isLoading.value = false;
      }
    }, []);
    const debouncedSearch = q(debounce((q) => performSearch(q, true), SEARCH_DEBOUNCE), []);
    y$1(() => {
      if (isSearchActive.value && searchQuery.value) {
        debouncedSearch(searchQuery.value);
      } else if (!searchQuery.value) {
        results.value = [];
      }
    }, [searchQuery.value, isSearchActive.value]);
    y$1(() => {
      if (isSearchActive.value && inputRef.current) {
        setTimeout(() => {
          inputRef.current?.focus();
        }, 50);
      }
    }, [isSearchActive.value]);
    const handleInput = (e) => {
      const val = e.target.value;
      searchQuery.value = val;
    };
    const handleScroll = (e) => {
      const el = e.target;
      if (!isLoading.value && hasMore.value && el.scrollHeight - el.scrollTop - el.clientHeight < 50) {
        performSearch(searchQuery.value, false);
      }
    };
    const handleClose = () => {
      toggleSearch(false);
      searchQuery.value = "";
      results.value = [];
      isGalleryMode.value = false;
    };
    const toggleGalleryMode = () => {
      isGalleryMode.value = !isGalleryMode.value;
    };
    const handleResultClick = async (msg) => {
      handleClose();
      const { loadMessageContext } = await __vitePreload(async () => { const { loadMessageContext } = await Promise.resolve().then(() => chat);return { loadMessageContext }},false             ?__VITE_PRELOAD__:void 0);
      const result = await loadMessageContext(msg.id);
      if (result) {
        setTimeout(() => {
          const targetId = `db-${msg.id}`;
          const el = document.getElementById(targetId);
          const listEl = document.querySelector(".chat-list");
          if (el) {
            el.scrollIntoView({ behavior: "auto", block: "center" });
            setTimeout(() => {
              const container = document.querySelector(".chat-body");
              if (container) {
                __vitePreload(async () => { const {smoothScrollToCenter} = await Promise.resolve().then(() => smoothScroll);return { smoothScrollToCenter }},false             ?__VITE_PRELOAD__:void 0).then(({ smoothScrollToCenter }) => {
                  smoothScrollToCenter(container, el);
                });
              } else {
                el.scrollIntoView({ behavior: "smooth", block: "center" });
              }
            }, 100);
            if (listEl) listEl.classList.add("focus-mode");
            el.classList.remove("message-highlight");
            void el.offsetWidth;
            el.classList.add("message-highlight");
            setTimeout(() => {
              if (listEl) listEl.classList.remove("focus-mode");
              el.classList.remove("message-highlight");
            }, 800);
          } else {
            const msgElements = listEl?.querySelectorAll(".chat-message");
            if (msgElements && result.targetIndex < msgElements.length) {
              const targetEl = msgElements[result.targetIndex];
              targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
            }
          }
        }, 300);
      }
    };
    const dateInputRef = A(null);
    const openDatePicker = () => {
      if (dateInputRef.current) {
        if ("showPicker" in HTMLInputElement.prototype) {
          try {
            dateInputRef.current.showPicker();
          } catch (err) {
            dateInputRef.current.click();
          }
        } else {
          dateInputRef.current.click();
        }
      }
    };
    const handleDateChange = async (e) => {
      const date = e.target.value;
      if (!date) return;
      const { getFirstMessageIdByDate } = await __vitePreload(async () => { const { getFirstMessageIdByDate } = await Promise.resolve().then(() => api);return { getFirstMessageIdByDate }},false             ?__VITE_PRELOAD__:void 0);
      const msgId = await getFirstMessageIdByDate(date);
      if (msgId) {
        handleResultClick({ id: msgId });
      } else {
        alert(`日期 ${date} 没有找到消息`);
      }
      e.target.value = "";
    };
    if (!isSearchActive.value) return null;
    return /* @__PURE__ */ u$2("div", { id: "dollars-search-ui", children: [
      /* @__PURE__ */ u$2("div", { class: "search-panel-row", children: [
        /* @__PURE__ */ u$2("div", { class: "search-bar", style: { flex: 1, marginBottom: 0 }, children: [
          /* @__PURE__ */ u$2(
            "div",
            {
              class: "search-icon",
              style: { display: "flex", alignItems: "center", opacity: 0.5 },
              dangerouslySetInnerHTML: { __html: iconSearch }
            }
          ),
          /* @__PURE__ */ u$2(
            "input",
            {
              ref: inputRef,
              type: "search",
              placeholder: "搜索消息...",
              value: searchQuery.value,
              onInput: handleInput,
              autoFocus: true
            }
          ),
          /* @__PURE__ */ u$2(
            "div",
            {
              class: "search-close-btn",
              onClick: handleClose,
              dangerouslySetInnerHTML: { __html: iconClose }
            }
          )
        ] }),
        /* @__PURE__ */ u$2(
          "div",
          {
            class: "search-calendar-btn",
            onClick: openDatePicker,
            title: "按日期跳转",
            dangerouslySetInnerHTML: { __html: iconCalendar }
          }
        ),
        /* @__PURE__ */ u$2(
          "div",
          {
            class: `search-gallery-btn ${isGalleryMode.value ? "active" : ""}`,
            onClick: toggleGalleryMode,
            title: "相册模式",
            dangerouslySetInnerHTML: { __html: iconPhoto }
          }
        )
      ] }),
      /* @__PURE__ */ u$2(
        "input",
        {
          type: "date",
          ref: dateInputRef,
          onChange: handleDateChange,
          style: { position: "absolute", opacity: 0, pointerEvents: "none", width: 0, height: 0 }
        }
      ),
      isGalleryMode.value ? /* @__PURE__ */ u$2(GalleryPanel, { onClose: () => isGalleryMode.value = false }) : /* @__PURE__ */ u$2("div", { id: "dollars-search-results", onScroll: handleScroll, children: [
        results.value.map((msg) => /* @__PURE__ */ u$2(
          "div",
          {
            class: "search-result-item",
            onClick: () => handleResultClick(msg),
            children: [
              /* @__PURE__ */ u$2("img", { src: getAvatarUrl(msg.avatar, "s"), alt: msg.nickname }),
              /* @__PURE__ */ u$2("div", { class: "dollars-search-content", children: [
                /* @__PURE__ */ u$2("div", { class: "dollars-search-header", children: [
                  /* @__PURE__ */ u$2("span", { class: "dollars-search-nickname", children: msg.nickname }),
                  /* @__PURE__ */ u$2("span", { class: "dollars-search-timestamp", children: formatDate(msg.timestamp, "full") })
                ] }),
                /* @__PURE__ */ u$2("div", { class: "dollars-search-message", children: msg.message.replace(/\[.*?\]/g, " ") })
              ] })
            ]
          },
          msg.id
        )),
        isLoading.value && /* @__PURE__ */ u$2("div", { class: "search-status-msg", children: "搜索中..." }),
        !isLoading.value && results.value.length === 0 && searchQuery.value && /* @__PURE__ */ u$2("div", { class: "search-status-msg", children: "未找到相关消息" })
      ] })
    ] });
  }

  function UserProfilePanel() {
    const [profile, setProfile] = d$2(null);
    const [media, setMedia] = d$2([]);
    const [mediaLoading, setMediaLoading] = d$2(false);
    const [isVisible, setIsVisible] = d$2(false);
    const userId = userProfilePanelUserId.value;
    const isOpen = isUserProfilePanelOpen.value;
    const isClosing = isUserProfilePanelClosing.value;
    y$1(() => {
      if (!userId) {
        setProfile(null);
        setMedia([]);
        setMediaLoading(false);
        return;
      }
      let stale = false;
      setProfile(null);
      fetchUserProfile(userId).then((data) => {
        if (stale) return;
        if (data) setProfile(data);
      });
      return () => {
        stale = true;
      };
    }, [userId]);
    y$1(() => {
      if (!profile?.id) {
        setMedia([]);
        setMediaLoading(false);
        return;
      }
      let stale = false;
      setMedia([]);
      setMediaLoading(true);
      fetchGalleryMedia(0, 6, profile.id).then((result) => {
        if (stale) return;
        setMedia(result.items.map((item) => ({
          url: item.url,
          thumbnailUrl: item.thumbnailUrl,
          type: item.type,
          message_id: item.message_id,
          nickname: item.nickname,
          avatar: item.avatar,
          timestamp: item.timestamp
        })));
        setMediaLoading(false);
      });
      return () => {
        stale = true;
      };
    }, [profile?.id]);
    y$1(() => {
      if (!isOpen || isClosing) {
        setIsVisible(false);
        return;
      }
      const frameId = requestAnimationFrame(() => {
        setIsVisible(true);
      });
      return () => cancelAnimationFrame(frameId);
    }, [isOpen, isClosing]);
    if (!isOpen) return null;
    const handleHistory = () => {
      if (profile) {
        searchQuery.value = `user:${profile.username}`;
        hideUserProfile();
        toggleSearch(true);
      }
    };
    const handleHomepage = () => {
      if (profile) {
        window.open(`/user/${profile.username}`, "_blank");
      }
    };
    const isActive = isActiveToday(profile?.stats?.last_message_time);
    const isNarrow = isNarrowLayout.value;
    const lastMsgTs = profile?.stats?.last_message_time ? new Date(profile.stats.last_message_time).getTime() / 1e3 : null;
    const lastActiveText = lastMsgTs ? `${formatDate(lastMsgTs, "label")} ${formatDate(lastMsgTs, "time")}` : null;
    const imageItems = media.filter((item) => item.type === "image");
    const viewerItems = imageItems.map((item) => ({
      src: item.url,
      messageId: item.message_id,
      nickname: item.nickname,
      avatar: item.avatar,
      timestamp: item.timestamp
    }));
    return /* @__PURE__ */ u$2(
      "div",
      {
        id: "dollars-user-profile-panel",
        class: `${isNarrow ? "narrow" : "wide"} ${isVisible ? "visible" : ""} ${isClosing ? "closing" : ""}`,
        children: [
          !isNarrow && /* @__PURE__ */ u$2("div", { class: "uprofile-card-header", children: [
            /* @__PURE__ */ u$2(
              "button",
              {
                class: "header-btn dollars-back-btn",
                title: "返回",
                "aria-label": "返回",
                onClick: hideUserProfile
              }
            ),
            /* @__PURE__ */ u$2("span", { class: "uprofile-card-title", children: "用户资料" })
          ] }),
          /* @__PURE__ */ u$2("div", { class: "uprofile-banner", children: /* @__PURE__ */ u$2(
            "img",
            {
              class: "uprofile-avatar",
              src: profile ? getAvatarUrl(profile.avatar, "l") : void 0,
              alt: profile?.nickname ?? userId ?? ""
            }
          ) }),
          /* @__PURE__ */ u$2("div", { class: "uprofile-content", children: profile && /* @__PURE__ */ u$2("div", { class: "uprofile-body", children: [
            /* @__PURE__ */ u$2("div", { class: "uprofile-name-section", children: [
              /* @__PURE__ */ u$2("div", { class: "uprofile-nickname", children: [
                profile?.nickname ?? userId,
                isActive && /* @__PURE__ */ u$2("span", { class: "uprofile-status-dot active", "aria-label": "在线", role: "img" })
              ] }),
              /* @__PURE__ */ u$2("div", { class: "uprofile-username", children: [
                "@",
                profile?.username ?? userId
              ] }),
              lastActiveText && !isActive && /* @__PURE__ */ u$2("div", { class: "uprofile-last-active", children: [
                "最近活跃 ",
                lastActiveText
              ] })
            ] }),
            profile?.stats && /* @__PURE__ */ u$2("div", { class: "uprofile-stats-row", children: [
              /* @__PURE__ */ u$2("div", { class: "uprofile-stat", children: [
                /* @__PURE__ */ u$2("span", { class: "uprofile-stat-num", children: profile.stats.message_count.toLocaleString() }),
                /* @__PURE__ */ u$2("span", { class: "uprofile-stat-label", children: "条消息" })
              ] }),
              /* @__PURE__ */ u$2("div", { class: "uprofile-stat-divider" }),
              /* @__PURE__ */ u$2("div", { class: "uprofile-stat", children: [
                /* @__PURE__ */ u$2("span", { class: "uprofile-stat-num", children: profile.stats.average_messages_per_day.toFixed(1) }),
                /* @__PURE__ */ u$2("span", { class: "uprofile-stat-label", children: "条/天" })
              ] })
            ] }),
            profile && /* @__PURE__ */ u$2("div", { class: "uprofile-actions", children: [
              /* @__PURE__ */ u$2("button", { class: "uprofile-action-btn", onClick: handleHistory, children: [
                /* @__PURE__ */ u$2("span", { "aria-hidden": "true", dangerouslySetInnerHTML: { __html: iconHistory } }),
                "搜索发言"
              ] }),
              /* @__PURE__ */ u$2("button", { class: "uprofile-action-btn", onClick: handleHomepage, children: [
                /* @__PURE__ */ u$2("span", { "aria-hidden": "true", dangerouslySetInnerHTML: { __html: iconHome } }),
                "主页"
              ] })
            ] }),
            (profile?.sign || profile?.stats?.first_message_time) && /* @__PURE__ */ u$2("div", { class: "uprofile-info-section", children: [
              profile.sign && /* @__PURE__ */ u$2("div", { class: "uprofile-info-row", children: [
                /* @__PURE__ */ u$2("span", { class: "context-icon", "aria-hidden": "true", dangerouslySetInnerHTML: { __html: iconPen } }),
                /* @__PURE__ */ u$2("div", { class: "uprofile-info-content", children: [
                  /* @__PURE__ */ u$2("div", { class: "uprofile-info-label", children: "个性签名" }),
                  /* @__PURE__ */ u$2("div", { class: "uprofile-info-value uprofile-sign-value", children: profile.sign })
                ] })
              ] }),
              profile.stats?.first_message_time && /* @__PURE__ */ u$2("div", { class: "uprofile-info-row", children: [
                /* @__PURE__ */ u$2("span", { class: "context-icon", "aria-hidden": "true", dangerouslySetInnerHTML: { __html: iconCalendar } }),
                /* @__PURE__ */ u$2("div", { class: "uprofile-info-content", children: [
                  /* @__PURE__ */ u$2("div", { class: "uprofile-info-label", children: "首次发言" }),
                  /* @__PURE__ */ u$2("div", { class: "uprofile-info-value", children: formatDate(new Date(profile.stats.first_message_time).getTime() / 1e3, "full") })
                ] })
              ] })
            ] }),
            !mediaLoading && media.length > 0 && /* @__PURE__ */ u$2("div", { class: "uprofile-media-section", children: [
              /* @__PURE__ */ u$2("div", { class: "uprofile-media-header", children: /* @__PURE__ */ u$2("span", { children: "媒体" }) }),
              /* @__PURE__ */ u$2("div", { class: "uprofile-media-grid", children: media.map((item) => {
                const imageIndex = imageItems.indexOf(item);
                return /* @__PURE__ */ u$2(
                  "div",
                  {
                    class: "uprofile-media-item",
                    children: item.type === "video" ? /* @__PURE__ */ u$2(
                      "button",
                      {
                        class: "uprofile-media-video-btn",
                        "aria-label": `播放 ${item.nickname} 分享的视频`,
                        onClick: () => window.open(item.url, "_blank"),
                        children: [
                          /* @__PURE__ */ u$2(
                            "img",
                            {
                              src: item.thumbnailUrl,
                              alt: `${item.nickname} 分享的视频`,
                              loading: "lazy"
                            }
                          ),
                          /* @__PURE__ */ u$2("div", { class: "uprofile-media-video-badge", "aria-hidden": "true", children: /* @__PURE__ */ u$2("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "white", children: /* @__PURE__ */ u$2("polygon", { points: "5 3 19 12 5 21 5 3" }) }) })
                        ]
                      }
                    ) : /* @__PURE__ */ u$2(
                      "img",
                      {
                        src: item.thumbnailUrl,
                        alt: `${item.nickname} 分享的图片`,
                        loading: "lazy",
                        style: "cursor: pointer;",
                        onClick: () => {
                          showImageViewer(viewerItems, imageIndex, "userProfile");
                        },
                        onError: (e) => {
                          const target = e.currentTarget;
                          target.src = "/img/no_img.gif";
                          target.onerror = null;
                        }
                      }
                    )
                  },
                  `${item.message_id}-${item.url}`
                );
              }) })
            ] }),
            !profile?.stats && profile && /* @__PURE__ */ u$2("div", { class: "uprofile-empty-hint", children: "暂无发言记录" })
          ] }) })
        ]
      }
    );
  }

  function FloatingUI() {
    const lastDateLabel = A("");
    const isDateVisible = useSignal(false);
    y$1(() => {
      const label = currentDateLabel.value;
      if (label) {
        lastDateLabel.current = label;
        isDateVisible.value = true;
      } else {
        isDateVisible.value = false;
      }
    }, [currentDateLabel.value]);
    const handleScrollBottom = async (e) => {
      e.preventDefault();
      if (scrollButtonMode.value === "to-unread" && hasUnreadMessages.value) {
        const firstUnreadId = getFirstUnreadId();
        if (firstUnreadId) {
          pendingJumpToMessage.value = firstUnreadId;
          scrollButtonMode.value = "to-bottom";
          return;
        }
      }
      clearBrowsePosition();
      const ids = messageIds.value;
      if (ids.length > 0) {
        updateReadState(ids[ids.length - 1]);
      }
      if (timelineIsLive.value) {
        manualScrollToBottom.value++;
        return;
      }
      try {
        const recentMessages = await fetchRecentMessages(50);
        if (recentMessages.length > 0) {
          const filtered = recentMessages.filter((m) => !blockedUsers.value.has(String(m.uid)));
          setMessages(filtered);
          if (filtered.length > 0) {
            historyOldestId.value = filtered[0].id;
            historyNewestId.value = filtered[filtered.length - 1].id;
          }
          historyFullyLoaded.value = false;
          timelineIsLive.value = true;
          unreadWhileScrolled.value = 0;
          showScrollBottomBtn.value = false;
          syncPresenceSubscriptions();
          requestAnimationFrame(() => {
            manualScrollToBottom.value++;
          });
        }
      } catch (e2) {
      }
    };
    const handleScrollToMention = (e) => {
      e.preventDefault();
      const jumpList2 = unreadJumpList.value;
      if (jumpList2.length === 0) return;
      const nextMentionId = jumpList2[0];
      unreadJumpList.value = jumpList2.slice(1);
      pendingJumpToMessage.value = nextMentionId;
    };
    const bottomBtnBottom = inputAreaHeight.value + 20;
    const mentionBtnBottom = bottomBtnBottom + 50;
    const jumpList = unreadJumpList.value;
    const showMentionBtn = jumpList.length > 0;
    const scrollBtnClasses = `nav-btn ${showScrollBottomBtn.value ? "visible" : ""} mode-${scrollButtonMode.value}`;
    const currentUnreadCount = unreadCount.value;
    const getTooltip = () => {
      return scrollButtonMode.value === "to-unread" ? "跳转到未读消息" : "跳转到最新消息";
    };
    return /* @__PURE__ */ u$2(k$1, { children: [
      /* @__PURE__ */ u$2("div", { id: "dollars-floating-date", class: isDateVisible.value ? "visible" : "", children: lastDateLabel.current || currentDateLabel.value }),
      /* @__PURE__ */ u$2(
        "div",
        {
          id: "dollars-scroll-mention-btn",
          class: `nav-btn ${showMentionBtn ? "visible" : ""}`,
          onClick: handleScrollToMention,
          style: { bottom: `${mentionBtnBottom}px` },
          title: "跳转到提及消息",
          children: [
            /* @__PURE__ */ u$2("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", children: [
              /* @__PURE__ */ u$2("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
              /* @__PURE__ */ u$2("path", { d: "M8 12a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" }),
              /* @__PURE__ */ u$2("path", { d: "M16 12v1.5a2.5 2.5 0 0 0 5 0v-1.5a9 9 0 1 0 -5.5 8.28" })
            ] }),
            showMentionBtn && /* @__PURE__ */ u$2("div", { id: "dollars-mention-badge", class: "nav-btn-badge", children: jumpList.length > 99 ? "99+" : jumpList.length })
          ]
        }
      ),
      /* @__PURE__ */ u$2(
        "div",
        {
          id: "dollars-scroll-bottom-btn",
          class: scrollBtnClasses,
          onClick: handleScrollBottom,
          style: { bottom: `${bottomBtnBottom}px` },
          title: getTooltip(),
          children: [
            /* @__PURE__ */ u$2("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "3", "stroke-linecap": "round", "stroke-linejoin": "round", children: /* @__PURE__ */ u$2("path", { d: "M12 5v14m-7-7l7 7 7-7" }) }),
            currentUnreadCount > 0 && /* @__PURE__ */ u$2("div", { id: "dollars-unread-badge", class: "nav-btn-badge", children: currentUnreadCount > 99 ? "99+" : currentUnreadCount })
          ]
        }
      )
    ] });
  }

  function ConversationList({ searchTerm = "" }) {
    const extensionItems = extensionConversations.value.filter((item) => !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase())).sort((a, b) => (b.priority || 0) - (a.priority || 0));
    const filteredConversations = searchTerm ? conversations.value.filter(
      (conv) => conv.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) : conversations.value;
    const handleClick = (conversationId) => {
      setActiveConversation(conversationId);
      if (isNarrowLayout.value) {
        setMobileChatView(true);
      }
    };
    const handleExtensionClick = (item) => {
      setActiveExtension(item.id);
      item.onClick();
      if (isNarrowLayout.value) {
        setMobileChatView(true);
      }
    };
    return /* @__PURE__ */ u$2("div", { id: "dollars-conversation-list", children: [
      extensionItems.map((item) => {
        const isActive = item.id === activeExtensionId.value;
        return /* @__PURE__ */ u$2(
          "div",
          {
            class: `conversation-item extension-item ${isActive ? "active" : ""}`,
            onClick: () => handleExtensionClick(item),
            children: [
              /* @__PURE__ */ u$2("img", { src: item.avatar, class: "avatar", alt: item.title, loading: "lazy" }),
              /* @__PURE__ */ u$2("div", { class: "dollars-conv-content", children: [
                /* @__PURE__ */ u$2("div", { class: "dollars-conv-title", children: /* @__PURE__ */ u$2("span", { class: "dollars-conv-nickname", children: item.title }) }),
                item.subtitle && /* @__PURE__ */ u$2("div", { class: "dollars-conv-last-message", children: item.subtitle })
              ] }),
              item.badge && /* @__PURE__ */ u$2("div", { class: "unread-badge", children: item.badge })
            ]
          },
          `ext-${item.id}`
        );
      }),
      filteredConversations.map((conv) => {
        const isActive = conv.id === activeConversationId.value;
        const title = conv.type === "channel" ? conv.title : conv.user?.nickname || conv.title;
        const avatarUrl = conv.type === "channel" ? conv.avatar : conv.user?.avatar || conv.avatar;
        const lastMessageText = (conv.lastMessage.text || "").replace(/\[.*?\]/g, "").trim();
        const timeText = conv.lastMessage.timestamp ? formatDate(conv.lastMessage.timestamp, "time") : "";
        return /* @__PURE__ */ u$2(
          "div",
          {
            class: `conversation-item ${isActive ? "active" : ""}`,
            "data-conversation-id": conv.id,
            onClick: () => handleClick(conv.id),
            children: [
              /* @__PURE__ */ u$2("img", { src: avatarUrl, class: "avatar", alt: title, loading: "lazy" }),
              /* @__PURE__ */ u$2("div", { class: "dollars-conv-content", children: [
                /* @__PURE__ */ u$2("div", { class: "dollars-conv-title", children: [
                  /* @__PURE__ */ u$2("span", { class: "dollars-conv-nickname", children: title }),
                  /* @__PURE__ */ u$2("span", { class: "dollars-conv-timestamp", children: timeText })
                ] }),
                /* @__PURE__ */ u$2("div", { class: "dollars-conv-last-message", children: lastMessageText || " " })
              ] }),
              conv.unreadCount > 0 && /* @__PURE__ */ u$2("div", { class: "unread-badge", children: conv.unreadCount })
            ]
          },
          conv.id
        );
      })
    ] });
  }

  function Sidebar() {
    const [searchTerm, setSearchTerm] = d$2("");
    const handleSearchInput = (e) => {
      const target = e.target;
      setSearchTerm(target.value);
    };
    return /* @__PURE__ */ u$2("div", { id: "dollars-sidebar", children: [
      /* @__PURE__ */ u$2("div", { id: "dollars-sidebar-search-container", children: /* @__PURE__ */ u$2(
        "input",
        {
          type: "search",
          id: "dollars-sidebar-search-input",
          placeholder: "搜索对话...",
          value: searchTerm,
          onInput: handleSearchInput
        }
      ) }),
      /* @__PURE__ */ u$2(ConversationList, { searchTerm })
    ] });
  }

  const BMO_RENDER_OPTIONS = { width: 21, height: 21 };
  function persistWindowPosition(element) {
    if (!settings.value.rememberOpenState) return;
    saveWindowPosition({
      x: element.offsetLeft,
      y: element.offsetTop,
      width: element.offsetWidth,
      height: element.offsetHeight
    });
  }
  function ChatWindow({ skipEntryAnimation = false }) {
    const windowRef = A(null);
    useWebSocket();
    const [animateIn, setAnimateIn] = d$2(skipEntryAnimation);
    y$1(() => {
      if (!skipEntryAnimation) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setAnimateIn(true);
          });
        });
      }
    }, []);
    const getPointer = (e) => {
      if ("touches" in e) {
        const t = e.touches[0] || e.changedTouches[0];
        return { x: t.clientX, y: t.clientY };
      }
      return { x: e.clientX, y: e.clientY };
    };
    const dragState = A({
      isDragging: false,
      startX: 0,
      startY: 0,
      initialLeft: 0,
      initialTop: 0
    });
    const handleDragStart = (e) => {
      if (isMobileViewport.value || isMaximized.value) return;
      const target = e.target;
      if (!target.closest(".chat-header") || target.closest("button")) return;
      e.preventDefault();
      const { x, y } = getPointer(e);
      dragState.current = {
        isDragging: true,
        startX: x,
        startY: y,
        initialLeft: windowRef.current?.offsetLeft || 0,
        initialTop: windowRef.current?.offsetTop || 0
      };
      document.addEventListener("mousemove", handleDragMove);
      document.addEventListener("mouseup", handleDragEnd);
      document.addEventListener("touchmove", handleDragMove, { passive: false });
      document.addEventListener("touchend", handleDragEnd);
    };
    const handleDragMove = (e) => {
      if (!dragState.current.isDragging || !windowRef.current) return;
      e.preventDefault();
      const { x, y } = getPointer(e);
      const dx = x - dragState.current.startX;
      const dy = y - dragState.current.startY;
      const width = windowRef.current.offsetWidth;
      const height = windowRef.current.offsetHeight;
      const maxLeft = Math.max(0, window.innerWidth - width);
      const maxTop = Math.max(0, window.innerHeight - height);
      const newLeft = Math.min(Math.max(0, dragState.current.initialLeft + dx), maxLeft);
      const newTop = Math.min(Math.max(0, dragState.current.initialTop + dy), maxTop);
      windowRef.current.style.left = `${newLeft}px`;
      windowRef.current.style.top = `${newTop}px`;
    };
    const handleDragEnd = () => {
      dragState.current.isDragging = false;
      document.removeEventListener("mousemove", handleDragMove);
      document.removeEventListener("mouseup", handleDragEnd);
      document.removeEventListener("touchmove", handleDragMove);
      document.removeEventListener("touchend", handleDragEnd);
      if (windowRef.current) {
        persistWindowPosition(windowRef.current);
      }
    };
    y$1(() => {
      if (isMobileViewport.value || isMaximized.value || !settings.value.rememberOpenState) return;
      const saved = loadWindowPosition();
      if (saved && windowRef.current) {
        const { x, y, width, height } = saved;
        windowRef.current.style.left = `${x}px`;
        windowRef.current.style.top = `${y}px`;
        if (width) windowRef.current.style.width = `${width}px`;
        if (height) windowRef.current.style.height = `${height}px`;
      }
    }, []);
    y$1(() => {
      let rafId;
      const handleResize = () => {
        if (rafId) return;
        rafId = requestAnimationFrame(() => {
          rafId = 0;
          if (!windowRef.current || isMobileViewport.value || isMaximized.value) return;
          const rect = windowRef.current.getBoundingClientRect();
          const width = rect.width;
          const height = rect.height;
          const maxLeft = Math.max(0, window.innerWidth - width);
          const maxTop = Math.max(0, window.innerHeight - height);
          let newLeft = rect.left;
          let newTop = rect.top;
          let needsUpdate = false;
          if (newLeft > maxLeft) {
            newLeft = maxLeft;
            needsUpdate = true;
          }
          if (newTop > maxTop) {
            newTop = maxTop;
            needsUpdate = true;
          }
          if (needsUpdate) {
            windowRef.current.style.left = `${newLeft}px`;
            windowRef.current.style.top = `${newTop}px`;
          }
        });
      };
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
        if (rafId) cancelAnimationFrame(rafId);
      };
    }, []);
    y$1(() => {
      if (!windowRef.current) return;
      resetLayoutCheck();
      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          checkNarrowLayout(entry.contentRect.width);
        }
      });
      observer.observe(windowRef.current);
      checkNarrowLayout(windowRef.current.offsetWidth);
      return () => observer.disconnect();
    }, []);
    y$1(() => {
      if (isChatOpen.value && windowRef.current) {
        ensureNarrowLayoutChatView(windowRef.current.offsetWidth);
      }
    }, [isChatOpen.value]);
    const resizeState = A({
      isResizing: false,
      startX: 0,
      startY: 0,
      initialWidth: 0,
      initialHeight: 0,
      initialLeft: 0,
      initialTop: 0
    });
    const handleResizeStart = (e) => {
      if (isMobileViewport.value || isMaximized.value) return;
      e.preventDefault();
      e.stopPropagation();
      if (!windowRef.current) return;
      const rect = windowRef.current.getBoundingClientRect();
      const { x, y } = getPointer(e);
      resizeState.current = {
        isResizing: true,
        startX: x,
        startY: y,
        initialWidth: rect.width,
        initialHeight: rect.height,
        initialLeft: rect.left,
        initialTop: rect.top
      };
      document.addEventListener("mousemove", handleResizeMove);
      document.addEventListener("mouseup", handleResizeEnd);
      document.addEventListener("touchmove", handleResizeMove, { passive: false });
      document.addEventListener("touchend", handleResizeEnd);
    };
    const handleResizeMove = (e) => {
      if (!resizeState.current.isResizing || !windowRef.current) return;
      e.preventDefault();
      const { x, y } = getPointer(e);
      const dx = resizeState.current.startX - x;
      const dy = resizeState.current.startY - y;
      let newWidth = Math.max(280, resizeState.current.initialWidth + dx);
      let newHeight = Math.max(200, resizeState.current.initialHeight + dy);
      let newLeft = resizeState.current.initialLeft - (newWidth - resizeState.current.initialWidth);
      let newTop = resizeState.current.initialTop - (newHeight - resizeState.current.initialHeight);
      if (newTop < 0) {
        newHeight += newTop;
        newTop = 0;
      }
      if (newLeft < 0) {
        newWidth += newLeft;
        newLeft = 0;
      }
      windowRef.current.style.width = `${newWidth}px`;
      windowRef.current.style.height = `${newHeight}px`;
      windowRef.current.style.left = `${newLeft}px`;
      windowRef.current.style.top = `${newTop}px`;
    };
    const handleResizeEnd = () => {
      resizeState.current.isResizing = false;
      document.removeEventListener("mousemove", handleResizeMove);
      document.removeEventListener("mouseup", handleResizeEnd);
      document.removeEventListener("touchmove", handleResizeMove);
      document.removeEventListener("touchend", handleResizeEnd);
      if (windowRef.current) {
        persistWindowPosition(windowRef.current);
      }
    };
    const className = [
      "dollars-chat-window",
      animateIn && isChatOpen.value && "visible",
      isMobileViewport.value && "mobile",
      isMaximized.value && "maximized",
      isSearchActive.value && "search-active",
      isNarrowLayout.value && "is-narrow",
      mobileChatViewActive.value && "mobile-chat-active"
    ].filter(Boolean).join(" ");
    y$1(() => {
      const container = windowRef.current;
      if (!container) return;
      let hasObserved = false;
      const renderBmo = () => {
        const bmoji = window.Bmoji;
        if (!bmoji || !windowRef.current) return;
        if (!hasObserved && typeof bmoji.observe === "function") {
          bmoji.observe(windowRef.current, BMO_RENDER_OPTIONS);
          hasObserved = true;
        }
        if (typeof bmoji.renderAll === "function") {
          bmoji.renderAll(windowRef.current, BMO_RENDER_OPTIONS);
        }
      };
      renderBmo();
      const disposeBmoReady = onBmoReady(renderBmo);
      return () => {
        disposeBmoReady();
        const bmoji = window.Bmoji;
        if (typeof bmoji?.disconnect === "function") {
          bmoji.disconnect();
        }
      };
    }, []);
    return /* @__PURE__ */ u$2(
      "div",
      {
        id: "dollars-chat-window",
        ref: windowRef,
        class: className,
        onMouseDown: handleDragStart,
        onTouchStart: handleDragStart,
        children: [
          /* @__PURE__ */ u$2(
            "div",
            {
              id: "dollars-resize-handle",
              title: "调整窗口大小",
              onMouseDown: handleResizeStart,
              onTouchStart: handleResizeStart
            }
          ),
          /* @__PURE__ */ u$2(ChatHeader, {}),
          /* @__PURE__ */ u$2("div", { id: "dollars-content-panes", children: [
            /* @__PURE__ */ u$2(Sidebar, {}),
            /* @__PURE__ */ u$2("div", { id: "dollars-main-chat", children: [
              /* @__PURE__ */ u$2(SearchPanel, {}),
              /* @__PURE__ */ u$2(UserProfilePanel, {}),
              /* @__PURE__ */ u$2(ChatBody, {}),
              /* @__PURE__ */ u$2(FloatingUI, {}),
              /* @__PURE__ */ u$2(ChatInput, {})
            ] })
          ] })
        ]
      }
    );
  }

  function ReactionPickerFloating() {
    const [activeTab, setActiveTab] = d$2("TV");
    const [bmoItems, setBmoItems] = d$2([]);
    const contentRef = A(null);
    const containerRef = A(null);
    y$1(() => {
      if (activeTab === "BMO") {
        setBmoItems(loadSavedBmoItems());
      }
    }, [activeTab]);
    y$1(() => {
      const bmoji = window.Bmoji;
      if (!isReactionPickerOpen.value || !bmoji || !containerRef.current) return;
      requestAnimationFrame(() => {
        if (containerRef.current) {
          bmoji.renderAll(containerRef.current, { width: 21, height: 21 });
        }
      });
    }, [isReactionPickerOpen.value, activeTab, bmoItems]);
    y$1(() => {
      if (!isReactionPickerOpen.value) return;
      const handleClickOutside = (e) => {
        if (containerRef.current && !containerRef.current.contains(e.target)) {
          hideReactionPicker();
        }
      };
      const timer = setTimeout(() => {
        document.addEventListener("click", handleClickOutside);
      }, 50);
      return () => {
        clearTimeout(timer);
        document.removeEventListener("click", handleClickOutside);
      };
    }, [isReactionPickerOpen.value]);
    _$2(() => {
      if (isReactionPickerOpen.value && containerRef.current) {
        const el = containerRef.current;
        const rect = el.getBoundingClientRect();
        let { x: x2, y: y2 } = reactionPickerPosition.value;
        let hasChanged = false;
        if (x2 + rect.width > window.innerWidth) {
          x2 = Math.max(10, window.innerWidth - rect.width - 10);
          hasChanged = true;
        }
        if (x2 < 10) {
          x2 = 10;
          hasChanged = true;
        }
        if (y2 + rect.height > window.innerHeight) {
          y2 = Math.max(10, window.innerHeight - rect.height - 10);
          hasChanged = true;
        }
        if (y2 < 10) {
          y2 = 10;
          hasChanged = true;
        }
        if (hasChanged) {
          el.style.left = `${x2}px`;
          el.style.top = `${y2}px`;
        }
      }
    }, [isReactionPickerOpen.value, reactionPickerPosition.value, activeTab]);
    const handleReaction = q(async (emoji) => {
      const targetId = contextMenuTargetId.value;
      if (!targetId) return;
      hideReactionPicker();
      hideContextMenu();
      await toggleReaction(Number(targetId), emoji);
    }, []);
    if (!isReactionPickerOpen.value) {
      return null;
    }
    const { x, y, width } = reactionPickerPosition.value;
    let smileys = [];
    let specialContent = null;
    if (activeTab === "BMO") {
      specialContent = /* @__PURE__ */ u$2("div", { style: { display: "contents" }, children: bmoItems.length > 0 ? bmoItems.map((item) => /* @__PURE__ */ u$2("li", { class: "smiley-item", children: /* @__PURE__ */ u$2(
        "a",
        {
          href: "#",
          "data-smiley": item.code,
          title: item.name || item.code,
          onClick: (e) => {
            e.preventDefault();
            handleReaction(item.code);
          },
          children: /* @__PURE__ */ u$2("span", { class: "bmo", "data-code": item.code })
        }
      ) }, item.code)) : /* @__PURE__ */ u$2("p", { style: { width: "100%", textAlign: "center", color: "var(--dollars-text-secondary)", fontSize: "12px", marginTop: "20px", padding: "0 10px" }, children: "暂无保存的 BMO 表情" }) });
    } else {
      smileys = generateSmileyCodes(activeTab);
    }
    return /* @__PURE__ */ u$2(
      "div",
      {
        id: "dollars-reaction-picker-floating",
        class: `open ${isReactionPickerClosing.value ? "closing" : ""}`,
        ref: containerRef,
        style: { left: `${x}px`, top: `${y}px`, width: `${width}px` },
        children: [
          /* @__PURE__ */ u$2("div", { class: "reaction-picker-tabs", children: smileyRangesWithoutFavorites.map((range) => {
            let textContent = range.name;
            if (range.name === "BMO") {
              textContent = /* @__PURE__ */ u$2("span", { class: "bmo", "data-code": "(bmoCgASACIBLgCg)", style: { verticalAlign: "middle" } });
            } else if (range.path && range.start) {
              const iconId = range.tabIconId ?? range.start;
              textContent = /* @__PURE__ */ u$2("img", { src: range.path(iconId), alt: range.name, style: { width: "21px", height: "21px", verticalAlign: "middle" } });
            }
            return /* @__PURE__ */ u$2(
              "button",
              {
                class: `reaction-picker-tab-btn ${activeTab === range.name ? "active" : ""}`,
                "data-group": range.name,
                onClick: () => setActiveTab(range.name),
                title: range.name,
                children: textContent
              },
              range.name
            );
          }) }),
          /* @__PURE__ */ u$2("div", { class: "reaction-picker-content", ref: contentRef, children: [
            specialContent,
            smileys.map((code) => {
              const url = getSmileyUrl(code);
              return /* @__PURE__ */ u$2("li", { class: "smiley-item", children: /* @__PURE__ */ u$2(
                "a",
                {
                  href: "#",
                  "data-smiley": code,
                  onClick: (e) => {
                    e.preventDefault();
                    handleReaction(code);
                  },
                  style: url ? { backgroundImage: `url('${url}')` } : void 0,
                  title: code
                }
              ) }, code);
            })
          ] })
        ]
      }
    );
  }

  function ContextMenu() {
    const menuRef = A(null);
    y$1(() => {
      const handleClick = (e) => {
        const menu = menuRef.current;
        const picker = document.getElementById("dollars-reaction-picker-floating");
        if (menu && !menu.contains(e.target) && (!picker || !picker.contains(e.target))) {
          hideContextMenu();
        }
      };
      if (isContextMenuOpen.value) {
        document.addEventListener("click", handleClick);
      }
      return () => {
        document.removeEventListener("click", handleClick);
      };
    }, [isContextMenuOpen.value]);
    _$2(() => {
      if (isContextMenuOpen.value && menuRef.current) {
        const el = menuRef.current;
        const rect = el.getBoundingClientRect();
        let { x: x2, y: y2 } = contextMenuPosition.value;
        let hasChanged = false;
        if (x2 + rect.width > window.innerWidth) {
          x2 = Math.max(10, window.innerWidth - rect.width - 10);
          hasChanged = true;
        }
        if (x2 < 10) {
          x2 = 10;
          hasChanged = true;
        }
        if (y2 + rect.height > window.innerHeight) {
          y2 = Math.max(10, window.innerHeight - rect.height - 10);
          hasChanged = true;
        }
        if (y2 < 10) {
          y2 = 10;
          hasChanged = true;
        }
        if (hasChanged) {
          el.style.left = `${x2}px`;
          el.style.top = `${y2}px`;
        }
      }
    }, [isContextMenuOpen.value, contextMenuPosition.value]);
    y$1(() => {
      if (!isContextMenuOpen.value) return;
      const renderBmo = () => {
        requestAnimationFrame(() => {
          if (window.Bmoji && menuRef.current) {
            window.Bmoji.renderAll(menuRef.current, { width: 24, height: 24 });
          }
        });
      };
      renderBmo();
      return onBmoReady(renderBmo);
    }, [isContextMenuOpen.value]);
    const handleReaction = q(async (emoji) => {
      const targetId2 = contextMenuTargetId.value;
      if (!targetId2) return;
      hideContextMenu();
      await toggleReaction(Number(targetId2), emoji);
    }, []);
    const handleMoreReactions = q((e) => {
      e.stopPropagation();
      if (isReactionPickerOpen.value) {
        hideReactionPicker();
        return;
      }
      const button = e.currentTarget;
      const reactionsRow = button.closest(".context-menu-reactions");
      if (reactionsRow) {
        const rect = reactionsRow.getBoundingClientRect();
        showReactionPicker(rect.left, rect.bottom + 8, rect.width);
      }
    }, []);
    const handleReply = q(() => {
      const targetId2 = contextMenuTargetId.value;
      if (!targetId2) return;
      hideContextMenu();
      const raw = getRawMessage(targetId2);
      const messageEl = document.getElementById(`db-${targetId2}`);
      if (!raw || !messageEl) return;
      const uid = messageEl.dataset.uid || "";
      const user = messageEl.querySelector(".nickname a")?.textContent?.trim() || "";
      const avatar = messageEl.querySelector(".avatar")?.src || "";
      const text = stripQuotes(decodeHTML(raw)).replace(/\[img\].*?\[\/img\]/gi, "[图片]").replace(/\[file=.*?\].*?\[\/file\]/gi, "[附件]").replace(/\n/g, " ").replace(/\s+/g, " ").trim();
      setReplyTo({
        id: targetId2,
        uid,
        user,
        text,
        raw,
        avatar
      });
    }, []);
    const handleEdit = q(() => {
      const targetId2 = contextMenuTargetId.value;
      if (!targetId2) return;
      hideContextMenu();
      const msg2 = messageMap.value.get(Number(targetId2));
      if (!msg2) return;
      const rawContent = msg2.message;
      const quoteRegex = /^(\[quote(?:=[^\]]*)?\][\s\S]*?\[\/quote\])\s*/i;
      const match = rawContent.match(quoteRegex);
      let hiddenQuote = "";
      let editableText = rawContent;
      if (match) {
        hiddenQuote = match[1];
        editableText = rawContent.substring(match[0].length);
      }
      setEditingMessage({
        id: targetId2,
        raw: editableText,
        hiddenQuote,
        image_meta: msg2.image_meta
      });
    }, []);
    const handleCopy = q(async () => {
      const targetId2 = contextMenuTargetId.value;
      if (!targetId2) return;
      hideContextMenu();
      const raw = getRawMessage(targetId2);
      if (!raw) return;
      const plainText = decodeHTML(raw).replace(/\[.*?\]/g, "").trim();
      try {
        await navigator.clipboard.writeText(plainText);
      } catch (e) {
      }
    }, []);
    const handleDelete = q(async () => {
      const targetId2 = contextMenuTargetId.value;
      if (!targetId2) return;
      hideContextMenu();
      if (!confirm("确认撤回这条消息吗？")) {
        return;
      }
      const result = await deleteMessage(Number(targetId2));
      if (!result.status) {
        alert(result.error || "撤回失败");
      }
    }, []);
    const handleFavorite = q((e) => {
      const button = e.currentTarget;
      if (contextMenuBmoCode.value) {
        const bmoCode = contextMenuBmoCode.value;
        try {
          const bmoji = window.Bmoji;
          const existing = bmoji.savedBmo.list() || [];
          if (!existing.some((i) => i.code === bmoCode)) {
            bmoji.savedBmo.create({ code: bmoCode, name: bmoCode });
            const span = button.querySelector("span:not(.context-icon)");
            if (span) span.textContent = "已存入BMO面板";
          } else {
            const span = button.querySelector("span:not(.context-icon)");
            if (span) span.textContent = "已存在";
          }
        } catch (err) {
          const span = button.querySelector("span:not(.context-icon)");
          if (span) span.textContent = "收藏失败";
        }
      } else if (contextMenuImageUrl.value) {
        try {
          addFavorite(contextMenuImageUrl.value);
          const span = button.querySelector("span:not(.context-icon)");
          if (span) span.textContent = "已收藏";
        } catch (err) {
          const span = button.querySelector("span:not(.context-icon)");
          if (span) span.textContent = "收藏失败";
        }
      }
      setTimeout(() => {
        hideContextMenu();
      }, 1e3);
    }, []);
    if (!isContextMenuOpen.value) {
      return null;
    }
    const { x, y } = contextMenuPosition.value;
    const targetId = contextMenuTargetId.value;
    const msg = targetId ? messageMap.value.get(Number(targetId)) : null;
    const isSelf = msg && String(msg.uid) === String(userInfo.value.id);
    const hasImage = !!contextMenuImageUrl.value || !!contextMenuBmoCode.value;
    return /* @__PURE__ */ u$2(k$1, { children: [
      /* @__PURE__ */ u$2(
        "div",
        {
          id: "dollars-context-menu",
          ref: menuRef,
          class: `visible has-items-wrapper ${hasImage ? "image-mode" : ""} ${isContextMenuClosing.value ? "closing" : ""}`,
          style: { left: `${x}px`, top: `${y}px`, pointerEvents: "auto" },
          children: [
            targetId && /* @__PURE__ */ u$2("div", { class: "context-menu-reactions", children: [
              CONTEXT_MENU_REACTIONS.map((emoji) => {
                const url = getSmileyUrl(emoji);
                const isBmo = emoji.startsWith("(bmo");
                return /* @__PURE__ */ u$2(
                  "div",
                  {
                    class: "reaction-item",
                    "data-emoji": emoji,
                    onClick: () => handleReaction(emoji),
                    children: [
                      url && /* @__PURE__ */ u$2("img", { src: url, alt: emoji }),
                      isBmo && /* @__PURE__ */ u$2("span", { class: "bmo", "data-code": emoji })
                    ]
                  },
                  emoji
                );
              }),
              /* @__PURE__ */ u$2(
                "button",
                {
                  class: `context-menu-reactions-more ${isReactionPickerOpen.value ? "expanded" : ""}`,
                  onClick: handleMoreReactions,
                  title: "更多表情",
                  dangerouslySetInnerHTML: { __html: iconExpand }
                }
              )
            ] }),
            !isReactionPickerOpen.value && /* @__PURE__ */ u$2("div", { class: "context-menu-items", children: [
              /* @__PURE__ */ u$2("button", { "data-action": "reply", onClick: handleReply, children: [
                /* @__PURE__ */ u$2("span", { class: "context-icon", dangerouslySetInnerHTML: { __html: iconReply } }),
                /* @__PURE__ */ u$2("span", { children: "回复" })
              ] }),
              /* @__PURE__ */ u$2("button", { "data-action": "copy", onClick: handleCopy, children: [
                /* @__PURE__ */ u$2("span", { class: "context-icon", dangerouslySetInnerHTML: { __html: iconCopy } }),
                /* @__PURE__ */ u$2("span", { children: "复制" })
              ] }),
              hasImage && /* @__PURE__ */ u$2("button", { class: "image-action", "data-action": "favorite", onClick: handleFavorite, children: [
                /* @__PURE__ */ u$2("span", { class: "context-icon", dangerouslySetInnerHTML: { __html: iconFavorite } }),
                /* @__PURE__ */ u$2("span", { children: "收藏表情" })
              ] }),
              isSelf && /* @__PURE__ */ u$2(k$1, { children: [
                /* @__PURE__ */ u$2("button", { class: "auth-action", "data-action": "edit", onClick: handleEdit, children: [
                  /* @__PURE__ */ u$2("span", { class: "context-icon", dangerouslySetInnerHTML: { __html: iconEdit } }),
                  /* @__PURE__ */ u$2("span", { children: "编辑" })
                ] }),
                /* @__PURE__ */ u$2("button", { class: "auth-action danger", "data-action": "delete", onClick: handleDelete, children: [
                  /* @__PURE__ */ u$2("span", { class: "context-icon", dangerouslySetInnerHTML: { __html: iconDelete } }),
                  /* @__PURE__ */ u$2("span", { children: "撤回" })
                ] })
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ u$2(ReactionPickerFloating, {})
    ] });
  }

  function ProfileCard() {
    const cardRef = A(null);
    const [profile, setProfile] = d$2(null);
    const [loading, setLoading] = d$2(false);
    const userId = profileCardUserId.value;
    const anchor = profileCardAnchor.value;
    y$1(() => {
      if (!userId) {
        setProfile(null);
        return;
      }
      const loadProfile = async () => {
        setLoading(true);
        const data = await fetchUserProfile(userId);
        if (data) {
          setProfile(data);
        }
        setLoading(false);
      };
      loadProfile();
    }, [userId]);
    y$1(() => {
      if (!userId || !anchor || !cardRef.current) return;
      const card = cardRef.current;
      const rect = anchor.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      let top = rect.top;
      let left = rect.right + 10;
      if (left + cardRect.width > window.innerWidth) {
        left = rect.left - cardRect.width - 10;
      }
      left = Math.max(10, Math.min(left, window.innerWidth - cardRect.width - 10));
      top = Math.max(10, Math.min(top, window.innerHeight - cardRect.height - 10));
      card.style.top = `${top}px`;
      card.style.left = `${left}px`;
    }, [userId, anchor, profile]);
    const cleanupRef = A(null);
    y$1(() => {
      if (!userId) return;
      const timeoutId = setTimeout(() => {
        const handleClickOutside = (e) => {
          if (cardRef.current && !cardRef.current.contains(e.target) && anchor && !anchor.contains(e.target)) {
            hideProfileCard();
          }
        };
        document.addEventListener("click", handleClickOutside);
        document.addEventListener("touchend", handleClickOutside);
        cleanupRef.current = () => {
          document.removeEventListener("click", handleClickOutside);
          document.removeEventListener("touchend", handleClickOutside);
        };
      }, 0);
      return () => {
        clearTimeout(timeoutId);
        cleanupRef.current?.();
        cleanupRef.current = null;
      };
    }, [userId, anchor]);
    if (!userId) return null;
    const active = isActiveToday(profile?.stats?.last_message_time);
    const lastActiveText = !loading && profile?.stats?.last_message_time ? (() => {
      const ts = new Date(profile.stats.last_message_time).getTime() / 1e3;
      return `最近活跃：${formatDate(ts, "label")} ${formatDate(ts, "time")}`;
    })() : null;
    const handleHistory = () => {
      if (profile) {
        searchQuery.value = `user:${profile.username}`;
        toggleSearch(true);
        hideProfileCard();
      }
    };
    const handleHomepage = () => {
      if (profile) {
        window.open(`/user/${profile.username}`, "_blank");
        hideProfileCard();
      }
    };
    return /* @__PURE__ */ u$2(
      "div",
      {
        id: "dollars-profile-card",
        ref: cardRef,
        class: `${userId ? "visible" : ""} ${isProfileCardClosing.value ? "closing" : ""}`,
        children: [
          /* @__PURE__ */ u$2("div", { class: "dollars-profile-banner" }),
          /* @__PURE__ */ u$2("div", { class: "dollars-profile-body", children: [
            /* @__PURE__ */ u$2("div", { class: "dollars-profile-top-row", children: [
              /* @__PURE__ */ u$2("div", { class: "dollars-profile-identity", children: [
                /* @__PURE__ */ u$2(
                  "img",
                  {
                    class: `dollars-profile-avatar ${active ? "active" : ""}`,
                    src: profile ? getAvatarUrl(profile.avatar, "l") : void 0,
                    alt: profile?.nickname ?? userId ?? ""
                  }
                ),
                /* @__PURE__ */ u$2("div", { class: "dollars-profile-names", children: [
                  /* @__PURE__ */ u$2("div", { class: "dollars-profile-nickname", children: profile?.nickname }),
                  /* @__PURE__ */ u$2("div", { class: "dollars-profile-username", children: [
                    "@",
                    profile?.username ?? userId
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ u$2("div", { class: "dollars-profile-actions", children: [
                /* @__PURE__ */ u$2(
                  "button",
                  {
                    class: "dollars-profile-btn",
                    title: "搜索历史发言",
                    onClick: handleHistory,
                    dangerouslySetInnerHTML: { __html: iconHistory }
                  }
                ),
                /* @__PURE__ */ u$2(
                  "button",
                  {
                    class: "dollars-profile-btn",
                    title: "主页",
                    onClick: handleHomepage,
                    dangerouslySetInnerHTML: { __html: iconHome }
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ u$2("div", { class: "dollars-profile-sign", children: profile?.sign || "这个人很懒，什么都没有写..." }),
            /* @__PURE__ */ u$2("div", { class: `dollars-profile-footer ${active ? "active" : ""}`, children: loading ? "加载中..." : lastActiveText ?? "暂无发言记录" })
          ] })
        ]
      }
    );
  }

  function DockButton() {
    y$1(() => {
      const notifyLink = document.querySelector('#dock a[href*="/notify/all"]');
      if (!notifyLink) return;
      const parentLi = notifyLink.closest("li");
      if (!parentLi) return;
      const li = document.createElement("li");
      li.className = "chat";
      parentLi.before(li);
      G(/* @__PURE__ */ u$2(DockButtonContent, {}), li);
      return () => {
        G(null, li);
        li.remove();
      };
    }, []);
    return null;
  }
  const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M13.05 20.1l-3.05 -6.1l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5l-3.312 9.173" /><path d="M19 16l-2 3h4l-2 3" /></svg>`;
  const svgDataUrl = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svgString)}`;
  function DockButtonContent() {
    const linkRef = A(null);
    y$1(() => {
      const unsubscribe = dockIconFlashing.subscribe((flashing) => {
        const link = linkRef.current;
        if (!link) return;
        if (flashing) {
          link.classList.add("flashing");
        } else {
          link.classList.remove("flashing");
        }
      });
      return unsubscribe;
    }, []);
    y$1(() => {
      const unsubscribe = notificationCount.subscribe((count) => {
        const link = linkRef.current;
        if (!link) return;
        let badge = link.querySelector(".dock-notif-badge");
        if (count > 0) {
          if (!badge) {
            badge = document.createElement("span");
            badge.className = "dock-notif-badge";
            link.appendChild(badge);
          }
          badge.textContent = count > 99 ? "99+" : String(count);
          badge.style.display = "block";
        } else if (badge) {
          badge.style.display = "none";
        }
      });
      return unsubscribe;
    }, []);
    const handleClick = (e) => {
      e.preventDefault();
      toggleChat(!isChatOpen.value);
      if (!isChatOpen.value) {
        stopDockFlashing();
      }
    };
    return /* @__PURE__ */ u$2("a", { ref: linkRef, href: "#", id: "dock-chat-link", title: "打开聊天窗口", onClick: handleClick, children: /* @__PURE__ */ u$2(
      "span",
      {
        class: "ico ico-sq ico_robot_open",
        style: { backgroundImage: `url('${svgDataUrl}')` },
        children: "聊天"
      }
    ) });
  }

  class ErrorBoundary extends x {
    state = {
      hasError: false,
      error: null
    };
    static getDerivedStateFromError(error) {
      return { hasError: true, error };
    }
    componentDidCatch(_error, _errorInfo) {
    }
    render() {
      if (this.state.hasError) {
        if (this.props.fallback) {
          return this.props.fallback;
        }
        return /* @__PURE__ */ u$2("div", { class: "error-fallback", style: {
          padding: "20px",
          textAlign: "center",
          color: "var(--dollars-text-secondary, #888)"
        }, children: [
          /* @__PURE__ */ u$2("div", { style: { fontSize: "24px", marginBottom: "10px" }, children: "😢" }),
          /* @__PURE__ */ u$2("div", { children: "加载出错了" }),
          /* @__PURE__ */ u$2(
            "button",
            {
              style: {
                marginTop: "10px",
                padding: "8px 16px",
                border: "none",
                borderRadius: "4px",
                background: "var(--primary-color, #f09199)",
                color: "white",
                cursor: "pointer"
              },
              onClick: () => this.setState({ hasError: false, error: null }),
              children: "重试"
            }
          )
        ] });
      }
      return this.props.children;
    }
  }

  const SWIPE_THRESHOLD = 50;
  const SWIPE_DOWN_THRESHOLD = 80;
  const DOUBLE_TAP_DELAY = 300;
  const MIN_SCALE = 1;
  const MAX_SCALE = 4;
  const ANIM_DURATION = 250;
  let stylesInjected = false;
  function injectStyles$1() {
    if (stylesInjected) return;
    stylesInjected = true;
    const css = `
.lb-overlay{position:fixed;inset:0;z-index:var(--dollars-z-index-modal,2000);background:rgba(0,0,0,.92);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .25s ease;touch-action:none;user-select:none;-webkit-user-select:none}
.lb-overlay.lb-visible{opacity:1}
.lb-overlay.lb-closing{opacity:0}
.lb-img-wrap{position:relative;width:100%;height:100%;display:flex;align-items:center;justify-content:center;overflow:hidden;pointer-events:none}
.lb-img{max-width:90vw;max-height:90vh;object-fit:contain;transform-origin:center center;transition:transform .25s ease,opacity .2s ease;will-change:transform;pointer-events:auto;-webkit-user-drag:none;user-select:auto;-webkit-user-select:auto;-webkit-touch-callout:default}
.lb-img.lb-dragging{transition:none}
.lb-nav,.lb-close{position:absolute;border:none;background:rgba(255,255,255,.15);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);color:#fff;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:2;transition:background .2s}
.lb-nav{top:50%;transform:translateY(-50%);width:44px;height:44px;opacity:.7;transition:background .2s,opacity .2s}
.lb-nav:hover,.lb-close:hover{background:rgba(255,255,255,.3)}
.lb-nav:hover{opacity:1}
.lb-prev{left:12px}
.lb-next{right:12px}
.lb-close{top:12px;right:12px;width:40px;height:40px;font-size:20px}
.lb-counter{position:absolute;top:16px;left:50%;transform:translateX(-50%);color:rgba(255,255,255,.7);font-size:14px;z-index:2;pointer-events:none}
.lb-capsule{position:absolute;bottom:28px;left:50%;transform:translateX(-50%);display:flex;align-items:center;gap:8px;max-width:min(76vw,340px);padding:7px 12px 7px 9px;border:1px solid rgba(255,255,255,.14);border-radius:999px;background:rgba(12,12,14,.56);backdrop-filter:blur(12px) saturate(1.1);-webkit-backdrop-filter:blur(12px) saturate(1.1);box-shadow:0 8px 20px rgba(0,0,0,.24);color:#fff;cursor:pointer;z-index:2;transition:background-color .18s ease,border-color .18s ease,transform .18s ease;appearance:none;-webkit-appearance:none;font:inherit;text-align:left}
.lb-capsule:hover{background:rgba(12,12,14,.68);border-color:rgba(255,255,255,.2);transform:translateX(-50%) scale(1.015)}
.lb-capsule:active{transform:translateX(-50%) scale(.985)}
.lb-capsule-avatar{width:28px;height:28px;border-radius:50%;object-fit:cover;border:1px solid rgba(255,255,255,.18);flex-shrink:0}
.lb-capsule-info{display:flex;flex-direction:column;min-width:0;gap:2px;line-height:1.1}
.lb-capsule-nickname,.lb-capsule-date{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.lb-capsule-nickname{font-size:12px;font-weight:600;letter-spacing:.01em;text-shadow:0 1px 2px rgba(0,0,0,.35)}
.lb-capsule-date{font-size:10px;color:rgba(255,255,255,.72)}
@media(max-width:600px){.lb-nav{display:none}.lb-img{max-width:100vw;max-height:100vh}.lb-capsule{bottom:18px;max-width:calc(100vw - 28px);padding:7px 11px 7px 9px}}
`;
    const el = document.createElement("style");
    el.textContent = css;
    document.head.appendChild(el);
  }
  function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
  }
  function dist(a, b) {
    return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
  }
  function midpoint(a, b) {
    return { x: (a.clientX + b.clientX) / 2, y: (a.clientY + b.clientY) / 2 };
  }
  function LightboxViewer() {
    const overlayRef = A(null);
    const imgRef = A(null);
    const scale = A(1);
    const tx = A(0);
    const ty = A(0);
    const startTouches = A([]);
    const startScale = A(1);
    const startTx = A(0);
    const startTy = A(0);
    const startDist = A(0);
    const startMid = A({ x: 0, y: 0 });
    const lastTap = A(0);
    const isDragging = A(false);
    const hasMoved = A(false);
    const swipeStartX = A(0);
    const swipeStartY = A(0);
    const closing = A(false);
    const items = imageViewerItems.value;
    const images = imageViewerImages.value;
    const index = imageViewerIndex.value;
    const source = imageViewerSource.value;
    const visible = isImageViewerOpen.value;
    const total = images.length;
    const currentItem = items[index];
    const handleCapsuleClick = q((e) => {
      e.stopPropagation();
      const messageId = currentItem?.messageId;
      if (!messageId) return;
      hideImageViewer();
      if (source === "userProfile") {
        hideUserProfile();
      }
      if (source !== "generic") {
        toggleSearch(false);
      }
      pendingJumpToMessage.value = messageId;
      toggleChat(true);
    }, [currentItem?.messageId, source]);
    const applyTransform = q(() => {
      const img = imgRef.current;
      if (img) {
        img.style.transform = `translate3d(${tx.current}px,${ty.current}px,0) scale(${scale.current})`;
      }
    }, []);
    const zoomAtPoint = q((clientX, clientY, nextScale) => {
      const img = imgRef.current;
      if (!img) return;
      const currentScale = scale.current;
      const clampedScale = clamp(nextScale, MIN_SCALE, MAX_SCALE);
      if (clampedScale <= MIN_SCALE) {
        scale.current = 1;
        tx.current = 0;
        ty.current = 0;
        img.classList.remove("lb-dragging");
        applyTransform();
        return;
      }
      const rect = img.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const ratio = clampedScale / currentScale;
      tx.current += (clientX - centerX) * (1 - ratio);
      ty.current += (clientY - centerY) * (1 - ratio);
      scale.current = clampedScale;
      img.classList.remove("lb-dragging");
      applyTransform();
    }, [applyTransform]);
    const toggleZoomAtPoint = q((clientX, clientY) => {
      zoomAtPoint(clientX, clientY, scale.current > 1.1 ? 1 : 2.5);
    }, [zoomAtPoint]);
    const resetTransform = q(() => {
      scale.current = 1;
      tx.current = 0;
      ty.current = 0;
      const img = imgRef.current;
      if (img) {
        img.classList.remove("lb-dragging");
        img.style.transform = "";
      }
    }, []);
    const close = q(() => {
      if (closing.current) return;
      closing.current = true;
      const overlay = overlayRef.current;
      if (overlay) {
        overlay.classList.add("lb-closing");
        overlay.classList.remove("lb-visible");
      }
      setTimeout(() => {
        hideImageViewer();
        closing.current = false;
      }, ANIM_DURATION);
    }, []);
    const navigate = q((dir) => {
      if (total <= 1) return;
      const next = (index + dir + total) % total;
      imageViewerIndex.value = next;
      resetTransform();
    }, [index, total, resetTransform]);
    y$1(() => {
      if (!visible) return;
      const onKey = (e) => {
        if (e.key === "Escape") {
          close();
          e.preventDefault();
        } else if (e.key === "ArrowLeft") {
          navigate(-1);
          e.preventDefault();
        } else if (e.key === "ArrowRight") {
          navigate(1);
          e.preventDefault();
        }
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }, [visible, close, navigate]);
    y$1(() => {
      if (!visible) return;
      resetTransform();
      requestAnimationFrame(() => {
        overlayRef.current?.classList.add("lb-visible");
      });
    }, [visible, index, resetTransform]);
    y$1(injectStyles$1, []);
    if (!visible || total === 0) return null;
    const src = images[index];
    const onTouchStart = (e) => {
      const touches = e.touches;
      hasMoved.current = false;
      if (touches.length === 1) {
        const t = touches[0];
        isDragging.current = true;
        startTouches.current = [{ x: t.clientX, y: t.clientY }];
        startTx.current = tx.current;
        startTy.current = ty.current;
        swipeStartX.current = t.clientX;
        swipeStartY.current = t.clientY;
        const now = Date.now();
        if (now - lastTap.current < DOUBLE_TAP_DELAY) {
          e.preventDefault();
          toggleZoomAtPoint(t.clientX, t.clientY);
          lastTap.current = 0;
          isDragging.current = false;
          return;
        }
        lastTap.current = now;
      } else if (touches.length === 2) {
        e.preventDefault();
        isDragging.current = false;
        startScale.current = scale.current;
        startTx.current = tx.current;
        startTy.current = ty.current;
        startDist.current = dist(touches[0], touches[1]);
        startMid.current = midpoint(touches[0], touches[1]);
      }
    };
    const onTouchMove = (e) => {
      const touches = e.touches;
      hasMoved.current = true;
      if (touches.length === 2) {
        e.preventDefault();
        const d = dist(touches[0], touches[1]);
        const mid = midpoint(touches[0], touches[1]);
        const ratio = d / startDist.current;
        scale.current = clamp(startScale.current * ratio, 0.5, MAX_SCALE);
        tx.current = startTx.current + (mid.x - startMid.current.x);
        ty.current = startTy.current + (mid.y - startMid.current.y);
        imgRef.current?.classList.add("lb-dragging");
        applyTransform();
      } else if (touches.length === 1 && isDragging.current) {
        const t = touches[0];
        const dx = t.clientX - startTouches.current[0].x;
        const dy = t.clientY - startTouches.current[0].y;
        if (scale.current > 1.05) {
          e.preventDefault();
          tx.current = startTx.current + dx;
          ty.current = startTy.current + dy;
          imgRef.current?.classList.add("lb-dragging");
          applyTransform();
        } else {
          ty.current = dy * 0.5;
          imgRef.current?.classList.add("lb-dragging");
          applyTransform();
        }
      }
    };
    const onTouchEnd = (e) => {
      if (e.touches.length > 0) return;
      isDragging.current = false;
      imgRef.current?.classList.remove("lb-dragging");
      if (scale.current < MIN_SCALE) {
        scale.current = MIN_SCALE;
        tx.current = 0;
        ty.current = 0;
        applyTransform();
      }
      if (scale.current <= 1.05 && hasMoved.current) {
        const changedTouch = e.changedTouches[0];
        if (changedTouch) {
          const dx = changedTouch.clientX - swipeStartX.current;
          const dy = changedTouch.clientY - swipeStartY.current;
          if (dy > SWIPE_DOWN_THRESHOLD && Math.abs(dx) < dy) {
            close();
            return;
          }
          if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dy) < Math.abs(dx)) {
            navigate(dx < 0 ? 1 : -1);
            return;
          }
        }
        tx.current = 0;
        ty.current = 0;
        applyTransform();
      }
    };
    const onWheel = (e) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      imgRef.current?.classList.add("lb-dragging");
      zoomAtPoint(e.clientX, e.clientY, scale.current * delta);
      setTimeout(() => imgRef.current?.classList.remove("lb-dragging"), 50);
    };
    const onBackdropClick = (e) => {
      if (e.target === overlayRef.current) {
        close();
      }
    };
    const onImageDoubleClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleZoomAtPoint(e.clientX, e.clientY);
    };
    return /* @__PURE__ */ u$2(
      "div",
      {
        ref: overlayRef,
        class: "lb-overlay",
        onClick: onBackdropClick,
        children: [
          /* @__PURE__ */ u$2("button", { class: "lb-close", onClick: close, "aria-label": "Close", children: /* @__PURE__ */ u$2("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", children: /* @__PURE__ */ u$2("path", { d: "M18 6L6 18M6 6l12 12" }) }) }),
          total > 1 && /* @__PURE__ */ u$2("div", { class: "lb-counter", children: [
            index + 1,
            " / ",
            total
          ] }),
          total > 1 && /* @__PURE__ */ u$2(k$1, { children: [
            /* @__PURE__ */ u$2("button", { class: "lb-nav lb-prev", onClick: () => navigate(-1), "aria-label": "Previous", children: /* @__PURE__ */ u$2("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", children: /* @__PURE__ */ u$2("polyline", { points: "15 18 9 12 15 6" }) }) }),
            /* @__PURE__ */ u$2("button", { class: "lb-nav lb-next", onClick: () => navigate(1), "aria-label": "Next", children: /* @__PURE__ */ u$2("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", children: /* @__PURE__ */ u$2("polyline", { points: "9 18 15 12 9 6" }) }) })
          ] }),
          currentItem?.messageId && currentItem.nickname && currentItem.timestamp != null && /* @__PURE__ */ u$2("button", { class: "lb-capsule", onClick: handleCapsuleClick, children: [
            /* @__PURE__ */ u$2(
              "img",
              {
                class: "lb-capsule-avatar",
                src: getAvatarUrl(currentItem.avatar || "", "s"),
                alt: currentItem.nickname
              }
            ),
            /* @__PURE__ */ u$2("span", { class: "lb-capsule-info", children: [
              /* @__PURE__ */ u$2("span", { class: "lb-capsule-nickname", children: currentItem.nickname }),
              /* @__PURE__ */ u$2("span", { class: "lb-capsule-date", children: formatDate(currentItem.timestamp, "full") })
            ] })
          ] }),
          /* @__PURE__ */ u$2(
            "div",
            {
              class: "lb-img-wrap",
              children: /* @__PURE__ */ u$2(
                "img",
                {
                  ref: imgRef,
                  class: "lb-img",
                  src,
                  alt: "",
                  draggable: false,
                  onDblClick: onImageDoubleClick,
                  onTouchStart,
                  onTouchMove,
                  onTouchEnd,
                  onWheel,
                  onError: (e) => {
                    e.currentTarget.src = "/img/no_img.gif";
                  }
                }
              )
            }
          )
        ]
      }
    );
  }

  function ImageViewer() {
    return /* @__PURE__ */ u$2(LightboxViewer, {});
  }

  const settingsLoaded = d$1(false);
  function App() {
    const hasInitializedRef = A(false);
    y$1(() => {
      initUserInfo();
      loadSettingsFromCloud();
      applyAllSettings();
      initializeBlockedUsers();
      checkAuth().then(({ isLoggedIn: loggedIn, user }) => {
        isLoggedIn.value = loggedIn;
        if (user) {
          userInfo.value = { ...userInfo.value, ...user };
        }
        integrateWithNativeSettingsPanel();
        applyAllSettings();
        settingsLoaded.value = true;
        if (settings.value.rememberOpenState) {
          const savedState = loadWindowState();
          if (savedState.isChatOpen !== null) {
            isChatOpen.value = savedState.isChatOpen;
          }
          if (savedState.isMaximized !== null) {
            isMaximized.value = savedState.isMaximized;
          }
        }
        const notifType = settings.value.notificationType;
        if (notifType === "detail") {
          initWebSocket();
          loadNotifications();
        } else if (notifType === "simple") {
          loadNotifications();
        }
      });
      const dispose = isChatOpen.subscribe((isOpen) => {
        if (isOpen && !hasInitializedRef.current) {
          hasInitializedRef.current = true;
          ensureBmoji();
          initFavorites();
        }
      });
      return dispose;
    }, []);
    const hasEverOpened = A(false);
    const wasOpenOnMount = A(isChatOpen.peek());
    if (isChatOpen.value) {
      hasEverOpened.current = true;
    }
    const needsEntryAnimation = hasEverOpened.current && !wasOpenOnMount.current;
    if (hasEverOpened.current) {
      wasOpenOnMount.current = false;
    }
    return /* @__PURE__ */ u$2("div", { id: "dollars-chat-root", "data-bg-mode": settings.value.backgroundMode, children: [
      /* @__PURE__ */ u$2(DockButton, {}),
      /* @__PURE__ */ u$2(NotificationManager, {}),
      hasEverOpened.current && /* @__PURE__ */ u$2(ErrorBoundary, { children: [
        /* @__PURE__ */ u$2(ChatWindow, { skipEntryAnimation: !needsEntryAnimation && isChatOpen.value }),
        /* @__PURE__ */ u$2(ContextMenu, {}),
        /* @__PURE__ */ u$2(ProfileCard, {}),
        /* @__PURE__ */ u$2(ImageViewer, {})
      ] })
    ] });
  }

  const API_VERSION = "1.0.0";
  const eventListeners = /* @__PURE__ */ new Map();
  function createDollarsAPI() {
    return {
      version: API_VERSION,
      conversationList: {
        registerItem(item) {
          return registerConversationItem(item);
        },
        updateItem(id, updates) {
          updateConversationItem(id, updates);
        },
        getItems() {
          return [...extensionConversations.value];
        }
      },
      components: {
        UserAvatar
      },
      state: {
        isChatOpen,
        isLoggedIn,
        userInfo
      },
      events: {
        on(event, callback) {
          if (!eventListeners.has(event)) {
            eventListeners.set(event, /* @__PURE__ */ new Set());
          }
          eventListeners.get(event).add(callback);
          return () => {
            eventListeners.get(event)?.delete(callback);
          };
        },
        off(event, callback) {
          eventListeners.get(event)?.delete(callback);
        },
        emit(event, ...args) {
          const listeners = eventListeners.get(event);
          if (listeners) {
            listeners.forEach((callback) => {
              try {
                callback(...args);
              } catch (e) {
                console.error(`[DollarsAPI] Event callback error for '${event}':`, e);
              }
            });
          }
        }
      },
      actions: {
        toggleChat(open) {
          toggleChat(open);
        },
        showProfileCard(userId, anchor) {
          showProfileCard(userId, anchor);
        }
      }
    };
  }
  function initDollarsAPI() {
    const api = createDollarsAPI();
    window.DollarsAPI = api;
    isChatOpen.subscribe((isOpen) => {
      api.events.emit(isOpen ? "chatOpen" : "chatClose");
    });
  }

  const cssContent = ":root {\n  --dollars-z-index-base: 90;\n  --dollars-z-index-smiley: 99;\n  --dollars-z-index-context: 95;\n  --dollars-z-index-overlay: 110;\n  --dollars-z-index-modal: 2000;\n  --dollars-bg: #fff;\n  --dollars-bg-hover: rgba(0, 0, 0, 0.04);\n  --dollars-border: rgba(0, 0, 0, 0.08);\n  --dollars-shadow: rgba(0, 0, 0, 0.1);\n  --dollars-bg-pattern: none;\n  --dollars-bg-pattern-url: url('https://lsky.ry.mk/i/2026/01/03/background.svg');\n  --dollars-text: #333;\n  --dollars-text-secondary: #666;\n  --dollars-text-placeholder: #999;\n  --dollars-icon-color: #555;\n  --dollars-icon-color-secondary: #888;\n  --dollars-color-online: #4CAF50;\n  --dollars-color-danger: #ef4444;\n  --dollars-glass-border: rgba(255, 255, 255, 0.3);\n  --dollars-glass-highlight: rgba(255, 255, 255, 0.3);\n  --dollars-glass-bg: rgba(255, 255, 255, 0.55);\n  --dollars-glass-blur: blur(16px) saturate(1.6) brightness(1.03);\n  --dollars-glass-shadow:\n    0 8px 32px 0 rgba(31, 38, 135, 0.12),\n    0 2px 16px 0 rgba(31, 38, 135, 0.06),\n    inset 0 1px 0 0 rgba(255, 255, 255, 0.5),\n    inset 0 -1px 0 0 rgba(255, 255, 255, 0.2);\n  --dollars-glass-border-color: rgba(255, 255, 255, 0.4);\n}\n#dollars-chat-window.visible {\n  --dollars-bg-pattern: var(--dollars-bg-pattern-url);\n}\nhtml[data-theme=\"dark\"] {\n  --dollars-bg: #1a1a1a;\n  --dollars-bg-hover: rgba(255, 255, 255, 0.08);\n  --dollars-border: rgba(255, 255, 255, 0.12);\n  --dollars-shadow: rgba(0, 0, 0, 0.3);\n  --dollars-text: #e0e0e0;\n  --dollars-text-secondary: #999;\n  --dollars-text-placeholder: #666;\n  --dollars-icon-color: #bbb;\n  --dollars-icon-color-secondary: #bbb;\n  --dollars-glass-border: rgba(255, 255, 255, 0.1);\n  --dollars-glass-highlight: rgba(255, 255, 255, 0.1);\n  --dollars-glass-bg: rgba(30, 30, 30, 0.65);\n  --dollars-glass-blur: blur(16px) saturate(1.6) brightness(1.1);\n  --dollars-glass-shadow:\n    0 8px 32px 0 rgba(0, 0, 0, 0.3),\n    inset 0 1px 0 0 rgba(255, 255, 255, 0.1),\n    inset 0 -1px 0 0 rgba(255, 255, 255, 0.05);\n  --dollars-glass-border-color: rgba(255, 255, 255, 0.12);\n}\n#dollars-chat-root.disable-blur {\n  --dollars-glass-blur: none !important;\n  --dollars-glass-bg: rgba(255, 255, 255, 0.95);\n}\nhtml[data-theme=\"dark\"] #dollars-chat-root.disable-blur {\n  --dollars-glass-bg: rgba(30, 30, 30, 0.95);\n}\n#dollars-chat-root *::-webkit-scrollbar {\n  width: 5px;\n  height: 5px;\n}\n#dollars-chat-root *::-webkit-scrollbar-track {\n  background: transparent;\n}\n#dollars-chat-root *::-webkit-scrollbar-thumb {\n  background: color-mix(in srgb, var(--primary-color), transparent 75%);\n  border-radius: 10px;\n}\n#dollars-chat-root *::-webkit-scrollbar-thumb:hover {\n  background: color-mix(in srgb, var(--primary-color), transparent 50%);\n}\n#dollars-chat-root * {\n  box-sizing: border-box;\n  scrollbar-width: thin;\n  scrollbar-color: color-mix(in srgb, var(--primary-color), transparent 75%) transparent;\n}\n#dollars-chat-root {\n  color: var(--dollars-text);\n}\n#dollars-chat-window {\n  position: fixed;\n  bottom: 80px;\n  right: 20px;\n  width: 400px;\n  height: 550px;\n  z-index: var(--dollars-z-index-base);\n  display: flex;\n  flex-direction: column;\n  border-radius: 15px;\n  background: rgba(255, 255, 255, 0.85);\n  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.25);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  background-clip: padding-box;\n  overflow: hidden;\n  opacity: 0;\n  pointer-events: none;\n  transform: translateY(20px) scale(0.9);\n  transition: opacity 0.3s ease-out, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);\n}\n#dollars-chat-window.visible {\n  opacity: 1;\n  pointer-events: auto;\n  transform: translateY(0) scale(1);\n}\nhtml[data-theme=\"dark\"] #dollars-chat-window {\n  background: rgba(30, 30, 30, 0.9);\n  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.5);\n}\n#dollars-chat-window.maximized {\n  top: 10px !important;\n  left: 10px !important;\n  right: 10px !important;\n  bottom: 10px !important;\n  width: auto !important;\n  height: auto !important;\n  max-width: none !important;\n  max-height: none !important;\n  border-radius: 12px;\n  transform: none !important;\n}\n#dollars-chat-window.mobile {\n  top: 4vh !important;\n  left: 0 !important;\n  right: 0 !important;\n  bottom: auto !important;\n  width: 95vw !important;\n  height: 92vh !important;\n  max-width: 600px;\n  margin-left: auto !important;\n  margin-right: auto !important;\n  border-radius: 20px;\n}\n#dollars-chat-window.mobile.maximized {\n  top: 0px !important;\n  left: 0px !important;\n  right: 0px !important;\n  bottom: 0px !important;\n  width: 100vw !important;\n  height: 100vh !important;\n  height: 100dvh !important;\n  max-width: none !important;\n  margin-left: 0 !important;\n  margin-right: 0 !important;\n  border-radius: 0;\n  z-index: 98 !important;\n}\n#dollars-chat-window.mobile.visible {\n  transform: translateY(0) scale(1);\n}\n#dollars-content-panes {\n  display: flex;\n  flex: 1;\n  min-height: 0;\n  overflow: hidden;\n  position: relative;\n}\n#dollars-sidebar {\n  width: 25%;\n  height: 100%;\n  max-width: 320px;\n  display: flex;\n  flex-direction: column;\n  flex-shrink: 0;\n  border-right: none;\n  box-shadow: inset -1px 0 0 0 rgba(0, 0, 0, 0.03);\n  background-color: var(--dollars-bg);\n}\n#dollars-sidebar-search-container {\n  padding: 8px;\n  padding-top: 48px;\n  border-bottom: 1px solid var(--dollars-border);\n  flex-shrink: 0;\n}\n#dollars-sidebar-search-input {\n  display: flex;\n  align-items: center;\n  position: relative;\n  border-radius: 100px;\n  border: 1px solid var(--dollars-border);\n  background-color: var(--dollars-bg);\n  transition: 0.3s ease-in-out;\n  padding: 6px 12px;\n  width: 100%;\n  box-sizing: border-box;\n  font-size: 13px;\n  color: var(--dollars-text);\n}\n#dollars-sidebar-search-input:focus {\n  outline: 0;\n  border-color: var(--primary-color);\n  box-shadow: 0 0 10px rgba(240, 145, 153, 0.6);\n}\nhtml[data-theme=\"dark\"] #dollars-sidebar-search-input {\n  background-color: #3a3a3a;\n}\n#dollars-sidebar-search-input::placeholder {\n  color: var(--dollars-text-placeholder);\n}\n#dollars-conversation-list {\n  flex-grow: 1;\n  overflow-y: auto;\n  overscroll-behavior: contain;\n  padding: 4px;\n}\n.conversation-item {\n  display: flex;\n  align-items: center;\n  padding: 5px 10px;\n  gap: 12px;\n  cursor: pointer;\n  position: relative;\n  border-radius: 15px;\n  transition: background-color 0.2s, box-shadow 0.2s;\n}\n.conversation-item:hover {\n  background-color: var(--dollars-bg-hover);\n}\n.conversation-item.active {\n  background: color-mix(in srgb, var(--primary-color), #ffffff 30%);\n  color: #fff;\n}\nhtml[data-theme=\"dark\"] .conversation-item.active {\n  background: color-mix(in srgb, var(--primary-color), #180518 60%);\n}\n.conversation-item.active .dollars-conv-last-message,\n.conversation-item.active .dollars-conv-nickname,\n.conversation-item.active .dollars-conv-timestamp {\n  color: #fff;\n  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);\n}\n.conversation-item .avatar {\n  width: 46px;\n  height: 46px;\n  border-radius: 50%;\n  flex-shrink: 0;\n  object-fit: cover;\n  background-color: #f3f3f3;\n}\nhtml[data-theme=\"dark\"] .conversation-item .avatar {\n  background-color: #444;\n}\n.conversation-item .dollars-conv-content {\n  flex-grow: 1;\n  overflow: hidden;\n}\n.conversation-item .dollars-conv-title {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  font-weight: 700;\n  font-size: 13px;\n}\n.conversation-item .dollars-conv-nickname {\n  color: var(--dollars-text);\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.conversation-item .dollars-conv-timestamp {\n  font-size: 11px;\n  color: var(--dollars-text-secondary);\n  flex-shrink: 0;\n  margin-left: 8px;\n}\n.conversation-item .dollars-conv-last-message {\n  font-size: 12px;\n  color: var(--dollars-text-secondary);\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  margin-top: 2px;\n}\n.conversation-item .unread-badge {\n  position: absolute;\n  right: 10px;\n  top: 50%;\n  transform: translateY(-50%);\n  background-color: var(--primary-color);\n  color: #fff;\n  font-size: 10px;\n  font-weight: bold;\n  padding: 2px 6px;\n  border-radius: 10px;\n  min-width: 16px;\n  text-align: center;\n}\n#dollars-chat-window.is-narrow #dollars-sidebar {\n  width: 100%;\n  max-width: none;\n  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n}\n#dollars-chat-window.is-narrow.mobile-chat-active #dollars-sidebar {\n  transform: translateX(-100%);\n}\n#dollars-chat-window.is-narrow #dollars-main-chat {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  transform: translateX(100%);\n  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n}\n#dollars-chat-window.is-narrow.mobile-chat-active #dollars-main-chat {\n  transform: translateX(0);\n}\n#dollars-chat-window.is-narrow #dollars-content-panes {\n  overflow: hidden;\n}\n#dollars-main-chat {\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n  min-height: 0;\n  overflow: hidden;\n  position: relative;\n  background-color: var(--dollars-bg);\n  isolation: isolate;\n  z-index: 0;\n}\n#dollars-main-chat::before {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  z-index: -1;\n  pointer-events: none;\n  will-change: opacity;\n  opacity: 0;\n  transition: opacity 0.3s ease;\n}\n#dollars-chat-root[data-bg-mode=\"transparent\"] #dollars-main-chat::before {\n  display: none !important;\n}\n#dollars-chat-root[data-bg-mode=\"tint\"] #dollars-main-chat::before {\n  background-image:\n    var(--dollars-bg-pattern),\n    linear-gradient(160deg,\n      color-mix(in srgb, var(--primary-color), #a0c4ff 50%) 0%,\n      color-mix(in srgb, var(--primary-color), #ffffff 50%) 50%,\n      color-mix(in srgb, var(--primary-color), #ffc6ff 50%) 100%);\n  background-repeat: repeat, no-repeat;\n  background-position: center, center;\n  background-size: 400px, cover;\n  background-blend-mode: overlay, normal;\n  opacity: 0.65;\n}\n#dollars-chat-root[data-bg-mode=\"lines\"] #dollars-main-chat::before {\n  background-image: none;\n  background-color: color-mix(in srgb, var(--primary-color), #ffffff 94%);\n  opacity: 0.2;\n}\n#dollars-chat-root[data-bg-mode=\"lines\"] #dollars-main-chat::after {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  background-color: color-mix(in srgb, var(--primary-color), #ffffff 70%);\n  -webkit-mask-image: var(--dollars-bg-pattern);\n  mask-image: var(--dollars-bg-pattern);\n  -webkit-mask-repeat: repeat;\n  mask-repeat: repeat;\n  -webkit-mask-size: 400px;\n  opacity: 0.7;\n  z-index: -1;\n  pointer-events: none;\n}\nhtml[data-theme=\"dark\"] #dollars-chat-root[data-bg-mode=\"lines\"] #dollars-main-chat::after {\n  opacity: 0.1;\n}\nhtml[data-theme=\"dark\"] #dollars-chat-root[data-bg-mode=\"lines\"] #dollars-main-chat::before {\n  background-image: none !important;\n  background-color: transparent !important;\n  -webkit-mask-image: none !important;\n  mask-image: none !important;\n  opacity: 0.25;\n}\nhtml[data-theme=\"dark\"] #dollars-chat-root[data-bg-mode=\"tint\"] #dollars-main-chat::before {\n  background-image:\n    var(--dollars-bg-pattern),\n    linear-gradient(160deg,\n      color-mix(in srgb, var(--primary-color), #a0c4ff 50%) 0%,\n      color-mix(in srgb, var(--primary-color), #ffffff 50%) 50%,\n      color-mix(in srgb, var(--primary-color), #ffc6ff 50%) 100%);\n  background-repeat: repeat, no-repeat;\n  background-position: center, center;\n  background-size: 400px, cover;\n  background-blend-mode: overlay, normal;\n  -webkit-mask-image: none;\n  mask-image: none;\n  opacity: 0.3;\n}\n.chat-header {\n  background: var(--dollars-glass-bg);\n  backdrop-filter: var(--dollars-glass-blur);\n  -webkit-backdrop-filter: var(--dollars-glass-blur);\n  border-bottom: none;\n  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.02);\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 2px 15px;\n  cursor: move;\n  touch-action: none;\n  flex-shrink: 0;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  width: 100%;\n  height: 40px;\n  box-sizing: border-box;\n  z-index: 10002;\n}\nhtml[data-theme=\"dark\"] .chat-header {\n  background: var(--dollars-bg);\n  border-bottom: none;\n  box-shadow: 0 1px 0 0 rgba(255, 255, 255, 0.02);\n}\n.chat-header .title-wrapper {\n  flex-grow: 1;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: flex-start;\n  min-width: 0;\n  padding: 0 4px;\n  gap: 8px;\n  pointer-events: none;\n}\n.chat-header-left-pane {\n  width: 25%;\n  max-width: 320px;\n  flex-shrink: 0;\n  display: flex;\n  align-items: center;\n  padding-left: 5px;\n  gap: 4px;\n  margin-right: 8px;\n}\n#dollars-chat-window.is-narrow .chat-header-left-pane {\n  width: auto;\n  max-width: none;\n}\n.header-chat-icon {\n  width: 30px;\n  height: 30px;\n  border-radius: 50%;\n  object-fit: cover;\n  flex-shrink: 0;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.header-text-column {\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n  min-width: 0;\n  justify-content: center;\n}\n.chat-header .title,\n.header-main-title {\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--dollars-text);\n  letter-spacing: 0.2px;\n  line-height: 1.2;\n}\n.chat-header .online-status {\n  font-size: 10px;\n  color: var(--dollars-text-secondary);\n  display: flex;\n  align-items: center;\n  gap: 3px;\n  opacity: 0.85;\n  line-height: 1.2;\n}\n.chat-header .online-dot {\n  width: 6px;\n  height: 6px;\n  background-color: var(--dollars-color-online);\n  border-radius: 50%;\n  flex-shrink: 0;\n}\n.chat-header .header-buttons {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n}\n.chat-header .header-btn {\n  width: 24px;\n  height: 24px;\n  border: none;\n  background: transparent;\n  border-radius: 4px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: var(--dollars-text-secondary);\n  transition: background-color 0.2s;\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: 18px;\n}\n.chat-header .header-btn:hover {\n  background-color: rgba(0, 0, 0, 0.05);\n}\nhtml[data-theme=\"dark\"] .chat-header .header-btn:hover {\n  background-color: rgba(255, 255, 255, 0.08);\n}\n#dollars-search-btn,\n#dollars-maximize-btn,\n.chat-header .close-btn {\n  background-color: var(--dollars-icon-color);\n  -webkit-mask-repeat: no-repeat;\n  mask-repeat: no-repeat;\n  -webkit-mask-position: center;\n  mask-position: center;\n  -webkit-mask-size: 18px;\n  mask-size: 18px;\n}\n#dollars-search-btn {\n  -webkit-mask-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"white\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>');\n  mask-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"white\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>');\n}\n#dollars-maximize-btn {\n  -webkit-mask-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"white\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3\"/></svg>');\n  mask-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"white\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3\"/></svg>');\n}\n#dollars-chat-window.maximized #dollars-maximize-btn {\n  -webkit-mask-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"white\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3\"/></svg>');\n  mask-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"white\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3\"/></svg>');\n}\n.chat-header .close-btn {\n  -webkit-mask-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"white\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><line x1=\"18\" y1=\"6\" x2=\"6\" y2=\"18\"/><line x1=\"6\" y1=\"6\" x2=\"18\" y2=\"18\"/></svg>');\n  mask-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"white\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><line x1=\"18\" y1=\"6\" x2=\"6\" y2=\"18\"/><line x1=\"6\" y1=\"6\" x2=\"18\" y2=\"18\"/></svg>');\n}\n.chat-header .header-btn svg {\n  width: 18px;\n  height: 18px;\n}\n.chat-body {\n  contain: layout style paint;\n  flex-grow: 1;\n  overflow-y: scroll;\n  overflow-x: hidden;\n  padding: 10px;\n  padding-top: 50px;\n  padding-bottom: 80px;\n  display: flex;\n  flex-direction: column;\n  position: relative;\n  -webkit-overflow-scrolling: touch;\n  overscroll-behavior: contain;\n  min-height: 0;\n  overflow-anchor: auto;\n  background: transparent;\n}\n.chat-body.loading .chat-list {\n  opacity: 0;\n  transition: opacity 0.3s;\n}\n.chat-body.context-loading .chat-list {\n  opacity: 0 !important;\n  transition: opacity 0.05s ease;\n}\n.chat-list {\n  display: flex;\n  flex-direction: column;\n  contain: layout style;\n  transition: opacity 0.3s ease;\n}\n.chat-message {\n  position: relative;\n  overflow: visible !important;\n  content-visibility: auto;\n  contain-intrinsic-size: 80px;\n  overflow-clip-margin: 5px;\n  display: flex;\n  gap: 8px;\n  margin-bottom: 12px;\n  align-items: flex-start;\n  opacity: 1;\n  transform: translateY(0) scale(1);\n  transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.3s ease-out;\n  will-change: transform, opacity;\n  transform-origin: center bottom;\n}\n.chat-message.self {\n  flex-direction: row-reverse;\n}\n.chat-message.self .message-content {\n  align-items: flex-end;\n}\n.chat-message.pending {\n  opacity: 0.7;\n}\n.chat-message.pending .bubble {\n  animation: pending-pulse 1.5s ease-in-out infinite;\n}\n@keyframes pending-pulse {\n  0%,\n  100% {\n    opacity: 0.7;\n  }\n  50% {\n    opacity: 1;\n  }\n}\n.chat-message.failed {\n  opacity: 0.9;\n}\n.chat-message.failed .bubble {\n  border: 1px solid rgba(239, 68, 68, 0.5);\n  position: relative;\n}\n.chat-message.failed .bubble::after {\n  content: \"发送失败，点击重试\";\n  position: absolute;\n  bottom: -18px;\n  right: 0;\n  font-size: 11px;\n  color: var(--dollars-color-danger);\n  opacity: 0;\n  transition: opacity 0.2s;\n  white-space: nowrap;\n}\n.chat-message.failed:hover .bubble::after,\n.chat-message.failed:active .bubble::after {\n  opacity: 1;\n}\n.chat-message.is-grouped-with-next {\n  margin-bottom: 2px;\n}\n.chat-message.is-grouped-with-prev .avatar {\n  visibility: hidden;\n  height: 0 !important;\n  margin: 0 !important;\n  border: none !important;\n}\n.chat-message .nickname {\n  display: none !important;\n}\n.chat-message .avatar {\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  cursor: pointer;\n  flex-shrink: 0;\n  object-fit: cover;\n  background-color: #f3f3f3;\n  transition: box-shadow 0.3s;\n  -webkit-touch-callout: none;\n  user-select: none;\n}\nhtml[data-theme=\"dark\"] .chat-message .avatar {\n  background-color: #444;\n}\n.chat-message::after {\n  content: \"\";\n  position: absolute;\n  width: 8px;\n  height: 8px;\n  background-color: var(--dollars-color-online);\n  border: 2px solid var(--dollars-bg);\n  border-radius: 50%;\n  z-index: 5;\n  top: 23px;\n  left: 23px;\n  pointer-events: none;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);\n  opacity: 0;\n  transform: scale(0);\n  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;\n}\n.chat-message:has(.avatar.online)::after {\n  opacity: 1;\n  transform: scale(1);\n}\n.chat-message.self::after {\n  left: auto;\n  right: -2px;\n}\n.chat-message.is-grouped-with-prev::after {\n  opacity: 0 !important;\n  transform: scale(0) !important;\n}\n.chat-message .message-content {\n  max-width: 75%;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n}\n.chat-list.focus-mode .chat-message:not(.message-highlight) {\n  filter: blur(4px);\n  opacity: 0.6;\n  transition: filter 0.3s ease, opacity 0.3s ease;\n}\n.chat-message.message-highlight {\n  position: relative;\n  z-index: 10;\n  transform: scale(1.02);\n  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n.chat-message.message-highlight .bubble {\n  box-shadow: 0 0 20px rgba(var(--primary-rgb), 0.4);\n}\n.chat-message .bubble {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  padding: 6px 10px 6px;\n  border-radius: 0 12px 12px 12px;\n  word-wrap: break-word;\n  overflow-wrap: anywhere;\n  background-color: #fff;\n  box-shadow: 0 1px 2px rgba(16, 35, 47, 0.15);\n  color: var(--dollars-text);\n  font-size: 14px;\n  max-width: min(40dvh, 100%);\n  position: relative;\n  transition: background 0.3s ease;\n}\nhtml[data-theme=\"dark\"] .chat-message .bubble {\n  background-color: #212121;\n}\n.chat-message.self .bubble {\n  border-radius: 12px 0 12px 12px;\n  background: color-mix(in srgb, var(--primary-color), #ffffff 80%);\n}\nhtml[data-theme=\"dark\"] .chat-message.self .bubble {\n  background-color: color-mix(in srgb, var(--primary-color), #180518 60%);\n}\n.chat-message:not(.self).is-grouped-with-prev .bubble {\n  border-top-left-radius: 4px !important;\n}\n.chat-message.self.is-grouped-with-prev .bubble {\n  border-top-right-radius: 4px !important;\n}\n.bubble.sticker-mode {\n  background: transparent !important;\n  box-shadow: none !important;\n  padding: 0 !important;\n  border: none !important;\n}\n.bubble-nickname {\n  display: block;\n  width: 100%;\n  font-size: 12px;\n  margin-bottom: 4px;\n  line-height: 1.2;\n  user-select: none;\n  color: var(--nick-color, var(--primary-color));\n}\nhtml[data-theme=\"dark\"] .bubble-nickname {\n  color: color-mix(in srgb, var(--nick-color, var(--primary-color)), #fff 60%) !important;\n}\n.chat-message.self .bubble-nickname {\n  display: none;\n}\n.chat-message .swipe-reply-indicator {\n  position: absolute;\n  left: 100%;\n  top: 50%;\n  transform: translateY(-50%) scale(0.5);\n  margin-left: 10px;\n  opacity: 0;\n  width: 32px;\n  height: 32px;\n  background-color: var(--dollars-icon-color-secondary);\n  -webkit-mask-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"white\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M9 14l-4 -4l4 -4\" /><path d=\"M5 10h11a4 4 0 1 1 0 8h-1\" /></svg>');\n  mask-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"white\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M9 14l-4 -4l4 -4\" /><path d=\"M5 10h11a4 4 0 1 1 0 8h-1\" /></svg>');\n  -webkit-mask-size: 24px;\n  mask-size: 24px;\n  -webkit-mask-repeat: no-repeat;\n  mask-repeat: no-repeat;\n  -webkit-mask-position: center;\n  mask-position: center;\n  transition: transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.2s ease;\n  pointer-events: none;\n}\n.chat-message.is-grouped-with-prev .bubble-nickname {\n  display: none;\n}\n.bubble.sticker-mode .bubble-nickname {\n  display: none !important;\n}\n.bubble-timestamp {\n  font-size: 10px;\n  opacity: 0.58;\n  user-select: none;\n  cursor: default;\n  color: var(--dollars-text-secondary);\n  line-height: 1.2;\n  white-space: nowrap;\n  pointer-events: none;\n  max-width: 100%;\n}\n.text-content {\n  display: block;\n  width: 100%;\n}\nhtml[data-theme=\"dark\"] .bubble-timestamp {\n  color: color-mix(in srgb, var(--primary-color), #fff 60%);\n}\n.bubble.has-trailing-timestamp {\n  display: flow-root;\n}\n.bubble.has-trailing-timestamp .text-content {\n  display: inline;\n  width: auto;\n}\n.bubble.has-trailing-timestamp .bubble-timestamp.is-trailing {\n  float: right;\n  margin-left: 8px;\n  margin-top: 8px;\n  text-align: right;\n}\n.bubble.has-stacked-timestamp .bubble-timestamp.is-stacked {\n  align-self: flex-end;\n  margin-top: 6px;\n  text-align: right;\n}\n.bubble.has-stacked-timestamp .expand-toggle-btn + .bubble-timestamp.is-stacked {\n  margin-top: 4px;\n}\n.bubble.sticker-mode .bubble-timestamp.is-overlay {\n  position: absolute;\n  right: 6px;\n  bottom: 6px;\n  background: rgba(0, 0, 0, 0.4);\n  backdrop-filter: blur(4px);\n  -webkit-backdrop-filter: blur(4px);\n  color: rgba(255, 255, 255, 0.9);\n  padding: 2px 6px;\n  border-radius: 999px;\n  font-size: 10px;\n  line-height: 1.2;\n  opacity: 0;\n  transition: opacity 0.2s ease;\n  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);\n  z-index: 10;\n}\n@media (hover: hover) and (pointer: fine) {\n  .chat-message:hover .bubble.sticker-mode .bubble-timestamp.is-overlay,\n  .chat-message:focus-within .bubble.sticker-mode .bubble-timestamp.is-overlay {\n    opacity: 1;\n  }\n}\n@media (hover: none), (pointer: coarse) {\n  .bubble.sticker-mode .bubble-timestamp.is-overlay {\n    opacity: 1;\n  }\n}\n.chat-message.failed .bubble.sticker-mode .bubble-timestamp.is-overlay {\n  opacity: 1;\n}\n.bubble-tail {\n  position: absolute;\n  top: 0;\n  width: 11px;\n  height: 20px;\n  pointer-events: none;\n  z-index: 1;\n}\n.chat-message:not(.self) .bubble-tail {\n  left: -9px;\n  top: -1px;\n  color: #fff;\n  transform: scaleY(-1);\n}\nhtml[data-theme=\"dark\"] .chat-message:not(.self) .bubble-tail {\n  color: #212121;\n}\n.chat-message.self .bubble-tail {\n  right: -9px;\n  top: -1px;\n  transform: scale(-1, -1);\n  color: color-mix(in srgb, var(--primary-color), #ffffff 80%);\n}\nhtml[data-theme=\"dark\"] .chat-message.self .bubble-tail {\n  color: color-mix(in srgb, var(--primary-color), #180518 60%) !important;\n}\n.chat-message.is-grouped-with-prev .bubble-tail {\n  display: none;\n}\n.bubble.sticker-mode .bubble-tail {\n  display: none;\n}\n.bubble .text-content.deleted {\n  font-style: italic !important;\n  color: var(--dollars-text-secondary) !important;\n}\n.bubble .text-content.is-collapsed {\n  display: block !important;\n  max-height: var(--collapse-max-height, 300px);\n  overflow: hidden;\n  position: relative;\n  -webkit-mask-image: linear-gradient(to bottom, black 70%, transparent 100%);\n  mask-image: linear-gradient(to bottom, black 70%, transparent 100%);\n}\n.expand-toggle-btn {\n  display: inline-block;\n  align-self: center;\n  max-width: 100%;\n  background: color-mix(in srgb, var(--primary-color), transparent 90%);\n  border: 0;\n  border-radius: 999px;\n  color: var(--primary-color);\n  font-size: 12px;\n  font-weight: 600;\n  line-height: 1.2;\n  cursor: pointer;\n  padding: 4px 10px;\n  margin-top: 8px;\n  text-align: center;\n  transition: background-color 0.2s ease;\n}\n.expand-toggle-btn:hover {\n  background: color-mix(in srgb, var(--primary-color), transparent 84%);\n  text-decoration: none;\n}\n.expand-toggle-btn:focus-visible {\n  outline: 2px solid color-mix(in srgb, var(--primary-color), #fff 15%);\n  outline-offset: 2px;\n}\n.bubble a {\n  color: #0084b4 !important;\n}\n.bubble a:hover {\n  text-decoration: underline;\n}\n.bubble img.smiley {\n  display: inline-block;\n  width: 21px;\n  height: 21px;\n  margin: 0 1px;\n  vertical-align: text-bottom;\n  image-rendering: pixelated;\n}\n.bubble img.custom-emoji {\n  max-width: 150px;\n  max-height: 150px;\n  border-radius: 8px;\n}\n.bubble img.smiley-musume,\n.bubble img.smiley-blake {\n  width: 60px;\n  height: 60px;\n  image-rendering: auto;\n  vertical-align: bottom;\n}\n.bubble.sticker-mode .custom-emoji {\n  max-width: 120px;\n  max-height: 120px;\n  margin: 2px 0;\n  display: block;\n}\n.bubble.sticker-mode .smiley-musume,\n.bubble.sticker-mode .smiley-blake {\n  width: 100px;\n  height: 100px;\n  display: block;\n  margin: 2px 0;\n}\n.bubble .image-container {\n  position: relative;\n  display: grid;\n  overflow: hidden;\n  border-radius: 8px;\n  cursor: pointer;\n  max-height: 350px;\n}\n.bubble .image-container .full-image {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  opacity: 0;\n  grid-area: 1/1;\n  transition: opacity 0.3s ease-out;\n  z-index: 2;\n}\n.bubble .image-container .full-image.is-loaded {\n  opacity: 1;\n}\n.bubble .image-container .full-image.load-failed {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  background-color: var(--dollars-bg-hover);\n  border-radius: 8px;\n}\n.bubble .image-container.image-placeholder {\n  cursor: default;\n}\n.bubble .image-container.image-placeholder .image-load-hint {\n  position: absolute;\n  right: 10px;\n  bottom: 10px;\n  z-index: 3;\n  background: rgba(0, 0, 0, 0.5);\n  color: #fff;\n  padding: 6px 12px;\n  border-radius: 16px;\n  font-size: 12px;\n  white-space: nowrap;\n  pointer-events: none;\n  backdrop-filter: blur(4px);\n  -webkit-backdrop-filter: blur(4px);\n  transition: opacity 0.2s ease;\n}\n.bubble .image-container.image-placeholder:hover .image-load-hint {\n  background: rgba(0, 0, 0, 0.7);\n}\n.bubble .image-container.image-masked .full-image {\n  filter: blur(24px) brightness(0.45);\n  transform: scale(1.08);\n}\n.bubble .image-container.image-masked {\n  cursor: default;\n}\n.bubble .image-container.image-masked .image-load-hint {\n  background: rgba(0, 0, 0, 0.68);\n}\n.bubble .chat-file-link {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  margin: 4px 0;\n  padding: 2px 0;\n  font-size: 13px;\n  font-weight: 600;\n  line-height: 1.5;\n  max-width: 100%;\n  color: var(--primary-color) !important;\n  text-decoration: none !important;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.bubble .chat-file-link::before {\n  content: \"附件\";\n  flex-shrink: 0;\n  padding: 1px 6px;\n  border-radius: 999px;\n  font-size: 11px;\n  font-weight: 700;\n  color: var(--primary-color);\n  background: color-mix(in srgb, var(--primary-color), transparent 88%);\n}\n.bubble .chat-file-link:hover {\n  text-decoration: underline !important;\n}\n.chat-quote {\n  padding: 6px 8px;\n  border-left: 3px solid var(--primary-color);\n  background: linear-gradient(#ffffffe6, #ffffffe6), var(--primary-color);\n  border-radius: 4px;\n  margin-bottom: 8px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  cursor: pointer;\n  max-width: 100%;\n  width: 100%;\n  box-sizing: border-box;\n  transition: opacity 0.2s, transform 0.15s ease, background 0.2s;\n}\nhtml[data-theme=\"dark\"] .chat-quote {\n  background: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), var(--primary-color);\n}\n.chat-quote:hover {\n  opacity: 0.9;\n  transform: scale(1.01);\n}\n.quote-avatar {\n  width: 14px;\n  height: 14px;\n  border-radius: 50%;\n  object-fit: cover;\n  flex-shrink: 0;\n  margin-right: 4px;\n}\n.quote-thumbnail {\n  width: 36px;\n  height: 36px;\n  border-radius: 4px;\n  object-fit: cover;\n  margin-bottom: 2px;\n  display: block;\n}\n.quote-nickname {\n  font-weight: 700;\n  color: var(--primary-color);\n  font-size: 12px;\n}\n.quote-text-wrapper {\n  min-width: 0;\n  flex: 1;\n}\n.quote-content {\n  font-size: 12px;\n  color: var(--dollars-text);\n  opacity: 0.8;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  overflow-wrap: break-word;\n}\n.chat-input-container {\n  position: absolute;\n  bottom: 12px;\n  left: 12px;\n  right: 12px;\n  width: auto;\n  z-index: 100;\n  transition: transform 0.2s ease;\n}\n.chat-input-container:hover {\n  transform: translateY(-2px);\n}\n.chat-input-area {\n  position: relative;\n  background: var(--dollars-glass-bg);\n  backdrop-filter: var(--dollars-glass-blur);\n  -webkit-backdrop-filter: var(--dollars-glass-blur);\n  border: none;\n  box-shadow:\n    var(--dollars-glass-shadow),\n    inset 0 0 0 1px var(--dollars-glass-border-color, rgba(255, 255, 255, 0.35));\n  border-radius: 24px;\n  padding: 6px 8px;\n  transition: box-shadow 0.2s ease;\n}\n.reply-preview {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 0 8px 4px 8px;\n  margin: 0 4px 4px 4px;\n  border-bottom: 1px solid var(--dollars-glass-border);\n  height: 0;\n  opacity: 0;\n  overflow: hidden;\n  transition: height 0.2s ease-out, opacity 0.2s ease-out;\n}\n.reply-preview.visible {\n  height: 42px;\n  opacity: 1;\n}\n.reply-preview .reply-bar {\n  width: 3px;\n  height: 70%;\n  background-color: var(--primary-color);\n  border-radius: 2px;\n}\n.reply-preview .reply-avatar {\n  width: 24px;\n  height: 24px;\n  border-radius: 50%;\n}\n.reply-preview .reply-info {\n  flex: 1;\n  min-width: 0;\n  font-size: 12px;\n  line-height: 1.4;\n}\n.reply-preview .reply-user {\n  font-weight: 700;\n  color: var(--primary-color);\n}\n.reply-preview .reaction-item .num {\n  color: var(--dollars-text-secondary);\n}\n@keyframes pop {\n  0% {\n    transform: scale(1);\n  }\n  50% {\n    transform: scale(1.4);\n  }\n  100% {\n    transform: scale(1);\n  }\n}\n.reaction-item.live_selected .emoji {\n  animation: pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n}\n.reply-preview .reply-text {\n  color: var(--dollars-text-secondary);\n  display: block;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.reply-preview .reply-cancel-btn {\n  background: none;\n  border: none;\n  cursor: pointer;\n  color: var(--dollars-text-secondary);\n  font-size: 20px;\n  padding: 0;\n}\n.image-preview-container {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 0 8px;\n  margin: 0 4px;\n  border-bottom: 1px solid var(--dollars-glass-border);\n  height: 0;\n  opacity: 0;\n  overflow-x: auto;\n  overflow-y: hidden;\n  transition: height 0.2s ease-out, opacity 0.2s ease-out, padding 0.2s ease-out, margin 0.2s ease-out;\n  scrollbar-width: none;\n}\n.image-preview-container.visible {\n  height: 80px;\n  opacity: 1;\n  padding-bottom: 8px;\n  margin-bottom: 4px;\n  margin-top: 4px;\n}\n.image-preview-container::-webkit-scrollbar {\n  display: none;\n}\n.image-preview-item {\n  position: relative;\n  flex-shrink: 0;\n  width: 64px;\n  height: 64px;\n  border-radius: 8px;\n  overflow: hidden;\n  border: 1px solid var(--dollars-border);\n  background: var(--dollars-bg);\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.preview-image {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  transition: transform 0.2s;\n}\n.image-preview-item:hover .preview-image {\n  transform: scale(1.05);\n}\n.preview-remove-btn {\n  position: absolute;\n  top: 2px;\n  right: 2px;\n  width: 18px;\n  height: 18px;\n  background: rgba(0, 0, 0, 0.5);\n  border-radius: 50%;\n  color: #fff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 14px;\n  cursor: pointer;\n  border: none;\n  backdrop-filter: blur(2px);\n  transition: background 0.2s, transform 0.1s;\n  padding: 0;\n  line-height: 1;\n}\n.preview-remove-btn:hover {\n  background: rgba(244, 67, 54, 0.9);\n  transform: scale(1.1);\n}\n.video-preview-item {\n  position: relative;\n}\n.preview-video {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  transition: transform 0.2s;\n}\n.video-preview-item:hover .preview-video {\n  transform: scale(1.05);\n}\n.video-play-overlay {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  width: 32px;\n  height: 32px;\n  background: rgba(0, 0, 0, 0.6);\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  pointer-events: none;\n  backdrop-filter: blur(2px);\n}\n.video-play-overlay svg {\n  margin-left: 2px;\n}\n.input-wrapper {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  position: relative;\n}\n.dollars-input-wrapper {\n  flex-grow: 1;\n  display: flex;\n  align-items: stretch;\n  border-radius: 18px;\n  min-width: 0;\n  background-color: rgba(255, 255, 255, 0.25);\n  border: none;\n  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.03);\n  transition: all 0.2s ease;\n  backdrop-filter: blur(5px);\n  padding-left: 0;\n  position: relative;\n}\nhtml[data-theme=\"dark\"] .dollars-input-wrapper {\n  background-color: rgba(0, 0, 0, 0.3);\n}\n.dollars-input-wrapper:focus-within {\n  background-color: rgba(255, 255, 255, 0.5);\n  border-color: var(--primary-color);\n  box-shadow: inset 0 1px 3px rgba(0, 0, 0, .1), 0 0 8px color-mix(in srgb, var(--primary-color), transparent 40%) !important;\n}\nhtml[data-theme=\"dark\"] .dollars-input-wrapper:focus-within {\n  background-color: rgba(0, 0, 0, 0.5);\n}\n.chat-textarea {\n  flex: 1;\n  border: none;\n  outline: none;\n  background: transparent;\n  border-radius: 18px;\n  padding: 8px 14px;\n  resize: none;\n  font-size: 14px;\n  line-height: 1.4;\n  height: 38px;\n  max-height: 150px;\n  color: var(--dollars-text);\n  outline: none;\n  font-family: inherit;\n  box-sizing: border-box;\n  width: 100%;\n  display: block;\n  white-space: pre-wrap;\n  word-break: break-word;\n  overflow-wrap: anywhere;\n  overflow-y: hidden;\n}\nhtml[data-theme=\"dark\"] .chat-textarea {\n  background: none !important;\n}\n.chat-textarea:focus {\n  outline: none;\n  box-shadow: none !important;\n}\n.chat-rich-editor {\n  min-height: 38px;\n  caret-color: var(--dollars-text);\n  line-height: 1.5;\n}\n.chat-rich-editor.is-overflowing {\n  overflow-y: auto;\n}\n.chat-rich-editor:empty::before {\n  content: attr(data-placeholder);\n  color: var(--dollars-text-placeholder);\n  pointer-events: none;\n}\n.chat-textarea-proxy {\n  position: absolute;\n  inset: 0;\n  opacity: 0;\n  pointer-events: none;\n  resize: none;\n}\n.chat-input-token {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  vertical-align: middle;\n  max-width: 100%;\n  user-select: all;\n  margin-block: 2px;\n}\n.chat-input-token img,\n.chat-input-token .bmoji-image {\n  display: block;\n  pointer-events: none;\n}\n.chat-input-token-smiley .chat-input-inline-smiley:not(.chat-input-inline-large),\n.chat-input-token-bmo .bmoji-image {\n  image-rendering: pixelated;\n}\n.chat-input-token-smiley .chat-input-inline-large,\n.chat-input-token-image .chat-input-inline-sticker {\n  image-rendering: auto;\n}\n.chat-input-inline-smiley {\n  width: 21px;\n  height: 21px;\n}\n.chat-input-inline-large {\n  width: 60px;\n  height: 60px;\n}\n.chat-input-inline-sticker {\n  width: auto;\n  height: 60px;\n  max-width: min(180px, 100%);\n  max-height: 60px;\n  border-radius: 10px;\n}\n.input-actions {\n  display: flex;\n  gap: 4px;\n}\n.action-btn {\n  flex-shrink: 0;\n  width: 38px;\n  height: 38px;\n  border: none;\n  border-radius: 50%;\n  background-color: transparent;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: var(--dollars-text-secondary);\n  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);\n  background-repeat: no-repeat;\n  background-position: center;\n}\n.action-btn:hover {\n  background-color: var(--dollars-glass-highlight);\n  transform: scale(1.1);\n}\n.action-btn:active {\n  transform: scale(0.95);\n}\n.action-btn svg {\n  width: 20px;\n  height: 20px;\n}\n.send-btn {\n  width: 38px;\n  height: 38px;\n  border: none;\n  background: var(--primary-color);\n  background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"white\" stroke-width=\"2.5\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M4.698 4.034l16.302 7.966l-16.302 7.966a.503 .503 0 0 1 -.546 -.124a.555 .555 0 0 1 -.12 -.568l2.468 -7.274l-2.468 -7.274a.555 .555 0 0 1 .12 -.568a.503 .503 0 0 1 .546 -.124z\" /><path d=\"M6.5 12h14.5\" /></svg>');\n  background-size: 20px;\n  background-repeat: no-repeat;\n  background-position: center;\n  border-radius: 50%;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  transition: background-color .2s, filter .2s, box-shadow 0.2s, transform 0.15s ease;\n  box-shadow: 0 0 10px color-mix(in srgb, var(--primary-color), transparent 20%);\n}\n.send-btn:hover {\n  filter: brightness(1.1);\n  transform: scale(1.05);\n}\n.send-btn:disabled {\n  background-color: #ccc;\n  cursor: not-allowed;\n  filter: none;\n  box-shadow: none;\n}\n.send-btn svg {\n  width: 18px;\n  height: 18px;\n}\n#dollars-smiles-floating {\n  --item-size: 32px;\n  --icon-size: 21px;\n  --item-hover-bg: rgba(255, 255, 255, 0.3);\n  --item-hover-scale: 1.1;\n  --transition-speed: 0.2s;\n  --panel-height: 320px;\n  --border-color: var(--dollars-border);\n  position: absolute;\n  bottom: calc(100% + 5px);\n  z-index: var(--dollars-z-index-smiley);\n  height: var(--panel-height);\n  width: 100%;\n  left: 0;\n  display: flex;\n  flex-direction: column;\n  border: 1px solid var(--dollars-glass-border-color);\n  border-radius: 18px;\n  background: var(--dollars-glass-bg);\n  backdrop-filter: var(--dollars-glass-blur);\n  -webkit-backdrop-filter: var(--dollars-glass-blur);\n  box-shadow: var(--dollars-glass-shadow);\n  box-sizing: border-box;\n  overflow: hidden;\n  opacity: 0;\n  transform: translateY(10px) scale(0.95);\n  transition: opacity 0.2s, transform 0.2s;\n  pointer-events: none;\n  transform-origin: bottom left;\n}\nhtml[data-theme=\"dark\"] #dollars-smiles-floating {\n  --item-hover-bg: rgba(255, 255, 255, 0.1);\n}\n@keyframes dollars-panel-slide-up {\n  from {\n    opacity: 0;\n    transform: translateY(15px) scale(0.95);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n#dollars-smiles-floating.open {\n  opacity: 1;\n  transform: translateY(0) scale(1);\n  pointer-events: auto;\n  animation: dollars-panel-slide-up 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n#dollars-smiles-tabs {\n  display: flex;\n  flex-shrink: 0;\n  padding: 4px;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.2);\n  background-color: transparent;\n  overflow-x: auto;\n  overflow-y: hidden;\n  scrollbar-width: none;\n}\n#dollars-smiles-tabs::-webkit-scrollbar {\n  display: none;\n}\n.smiley-tab-btn {\n  padding: 4px 12px;\n  border: 1px solid transparent;\n  border-radius: 15px;\n  background: none;\n  cursor: pointer;\n  color: var(--primary-color);\n  font-size: 13px;\n  flex-shrink: 0;\n  transition: background-color var(--transition-speed), color var(--transition-speed);\n  image-rendering: pixelated;\n}\n.smiley-tab-btn:hover {\n  background-color: var(--item-hover-bg);\n}\n.smiley-tab-btn.active {\n  background-color: transparent;\n  color: var(--primary-color);\n  border-color: var(--dollars-border);\n  font-weight: 700;\n}\n#dollars-smiles-content {\n  padding: 8px;\n  overflow-y: auto;\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n  justify-content: flex-start;\n  overscroll-behavior: contain;\n}\n#dollars-smiles-content.grouped-content {\n  display: block;\n  padding: 10px;\n}\n.smiley-group-section + .smiley-group-section {\n  margin-top: 12px;\n  padding-top: 10px;\n  border-top: 1px solid rgba(127, 127, 127, 0.18);\n}\n.smiley-group-title {\n  margin: 0 0 8px 2px;\n  color: var(--dollars-text-secondary);\n  font-size: 12px;\n  font-weight: 700;\n  line-height: 1.3;\n}\n.smiley-group-grid {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n}\n.smiley-item {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  width: var(--item-size);\n  height: var(--item-size);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n}\n.smiley-item a {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n  border-radius: 6px;\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: var(--icon-size) var(--icon-size);\n  font-size: 0;\n  transition: background-color var(--transition-speed), transform calc(var(--transition-speed) / 2);\n  image-rendering: pixelated;\n}\n#dollars-smiles-floating .bmo,\n#dollars-reaction-picker-floating .bmo {\n  vertical-align: middle;\n}\n.smiley-item a:hover {\n  background-color: var(--item-hover-bg);\n  transform: scale(var(--item-hover-scale));\n}\n.smiley-item.favorite-item {\n  width: 64px;\n  height: 64px;\n  border-radius: 8px;\n}\n.smiley-item.favorite-item a {\n  background-size: contain;\n  background-color: rgba(0, 0, 0, 0.03);\n}\nhtml[data-theme=\"dark\"] .smiley-item.favorite-item a {\n  background-color: rgba(255, 255, 255, 0.05);\n}\n.smiley-item.favorite-item .remove-favorite-btn {\n  position: absolute;\n  top: -4px;\n  right: -4px;\n  width: 16px;\n  height: 16px;\n  background: rgba(0, 0, 0, 0.5);\n  color: white;\n  border-radius: 50%;\n  border: none;\n  font-size: 12px;\n  line-height: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  opacity: 0;\n  transition: opacity 0.2s;\n}\n.smiley-item.favorite-item:hover .remove-favorite-btn {\n  opacity: 1;\n}\n#dollars-smiles-floating.large-smiley-mode {\n  --item-size: 56px;\n  --icon-size: 48px;\n}\n#dollars-smiles-floating.large-smiley-mode .smiley-item a {\n  image-rendering: auto;\n}\n#dollars-context-menu {\n  position: fixed;\n  z-index: var(--dollars-z-index-overlay);\n  background: transparent;\n  border: none;\n  box-shadow: none;\n  min-width: unset;\n  opacity: 0;\n  transform: scale(0.95);\n  pointer-events: none;\n  transition: transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.15s ease-out;\n}\nhtml[data-theme=\"dark\"] #dollars-context-menu {\n  background: transparent;\n  box-shadow: none;\n}\n#dollars-context-menu.visible {\n  opacity: 1;\n  transform: scale(1);\n  pointer-events: auto;\n}\n#dollars-context-menu.has-items-wrapper {\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  align-items: flex-start;\n}\n.context-menu-reactions {\n  display: flex;\n  align-items: center;\n  padding: 6px;\n  gap: 4px;\n  background: var(--dollars-glass-bg);\n  backdrop-filter: var(--dollars-glass-blur);\n  -webkit-backdrop-filter: var(--dollars-glass-blur);\n  box-shadow: var(--dollars-glass-shadow);\n  border: 1px solid var(--dollars-glass-border-color);\n  border-radius: 40px;\n}\n.context-menu-reactions .reaction-item {\n  width: 30px;\n  height: 30px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 50%;\n  cursor: pointer;\n  transition: transform 0.1s ease, background-color 0.15s ease;\n  -webkit-touch-callout: none;\n  user-select: none;\n}\n.context-menu-reactions .reaction-item:hover {\n  background-color: var(--dollars-bg-hover);\n  transform: scale(1.15);\n}\n.context-menu-reactions .reaction-item:active {\n  transform: scale(0.95);\n}\n.context-menu-reactions .reaction-item img {\n  width: 20px;\n  height: 20px;\n  display: block;\n  image-rendering: pixelated;\n}\n.context-menu-reactions .reaction-item .bmoji-image,\n.reaction-item .bmoji-image {\n  width: 18px !important;\n  height: 18px !important;\n}\n.context-menu-reactions-more {\n  width: 30px;\n  height: 30px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: none;\n  background: none;\n  border-radius: 50%;\n  cursor: pointer;\n  color: var(--dollars-text-secondary);\n  transition: background-color 0.15s ease, transform 0.1s ease;\n  flex-shrink: 0;\n}\n.context-menu-reactions-more:hover {\n  background-color: var(--dollars-bg-hover);\n  transform: scale(1.1);\n}\n.context-menu-reactions-more:active {\n  transform: scale(0.95);\n}\n.context-menu-reactions-more svg {\n  width: 20px;\n  height: 20px;\n  transition: transform 0.3s ease;\n}\n.context-menu-reactions-more.expanded svg {\n  transform: rotate(180deg);\n}\n.context-menu-items {\n  padding: 5px 0;\n  min-width: 160px;\n  max-width: 220px;\n  background: var(--dollars-glass-bg);\n  backdrop-filter: var(--dollars-glass-blur);\n  -webkit-backdrop-filter: var(--dollars-glass-blur);\n  box-shadow: var(--dollars-glass-shadow);\n  border: 1px solid var(--dollars-glass-border-color);\n  border-radius: 18px;\n  overflow: hidden;\n}\n.context-menu-items button {\n  display: flex;\n  align-items: center;\n  width: 100%;\n  padding: 8px 12px;\n  border: none;\n  background: none;\n  text-align: left;\n  cursor: pointer;\n  color: var(--dollars-text);\n  font-size: 14px;\n  line-height: 20px;\n  transition: background-color 0.1s ease;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.context-menu-items button span:not(.context-icon) {\n  flex: 1;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.context-icon {\n  width: 20px;\n  height: 20px;\n  margin-right: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  color: var(--dollars-text-secondary);\n}\nhtml[data-theme=\"dark\"] .context-icon {\n  color: #aaa;\n}\n.context-icon svg {\n  width: 20px;\n  height: 20px;\n}\n.context-menu-items button.danger .context-icon {\n  color: #f5222d;\n}\n.context-menu-items button:hover {\n  background-color: var(--dollars-bg-hover);\n}\n.context-menu-items button.danger {\n  color: #f5222d;\n}\n.context-menu-items button.image-action {\n  display: none;\n}\n#dollars-context-menu.image-mode .context-menu-items button.image-action {\n  display: flex;\n}\n#dollars-reaction-picker-floating {\n  --item-size: 32px;\n  --icon-size: 21px;\n  --item-hover-bg: rgba(255, 255, 255, 0.3);\n  --panel-height: 260px;\n  position: fixed;\n  z-index: calc(var(--dollars-z-index-overlay) + 1);\n  height: var(--panel-height);\n  display: flex;\n  flex-direction: column;\n  border: 1px solid var(--dollars-glass-border-color);\n  border-radius: 18px;\n  background: var(--dollars-glass-bg);\n  backdrop-filter: var(--dollars-glass-blur);\n  -webkit-backdrop-filter: var(--dollars-glass-blur);\n  box-shadow: var(--dollars-glass-shadow);\n  overflow: hidden;\n  opacity: 0;\n  transform: translateY(-5px) scale(0.95);\n  transition: opacity 0.15s ease, transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1);\n  pointer-events: none;\n}\nhtml[data-theme=\"dark\"] #dollars-reaction-picker-floating {\n  --item-hover-bg: rgba(255, 255, 255, 0.1);\n}\n@keyframes dollars-picker-slide-down {\n  0% {\n    opacity: 0;\n    transform: translateY(-15px) scale(0.95);\n  }\n  60% {\n    transform: translateY(3px) scale(1.01);\n  }\n  100% {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n#dollars-reaction-picker-floating.open {\n  opacity: 1;\n  transform: translateY(0) scale(1);\n  pointer-events: auto;\n  animation: dollars-picker-slide-down 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n.reaction-picker-tabs {\n  display: flex;\n  flex-shrink: 0;\n  padding: 4px;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.2);\n  background-color: transparent;\n  gap: 2px;\n}\n.reaction-picker-tab-btn {\n  padding: 4px 10px;\n  border: 1px solid transparent;\n  border-radius: 12px;\n  background: none;\n  cursor: pointer;\n  color: var(--dollars-text-secondary);\n  font-size: 13px;\n  transition: background-color 0.15s, color 0.15s;\n  image-rendering: pixelated;\n}\nhtml[data-theme=\"dark\"] .reaction-picker-tab-btn {\n  color: #aaa;\n}\n.reaction-picker-tab-btn:hover {\n  background-color: var(--item-hover-bg);\n}\nhtml[data-theme=\"dark\"] .reaction-picker-tab-btn:hover {\n  background-color: #444;\n}\n.reaction-picker-tab-btn.active {\n  background-color: var(--dollars-bg);\n  color: var(--dollars-text);\n  border-color: var(--dollars-border);\n  font-weight: 700;\n}\nhtml[data-theme=\"dark\"] .reaction-picker-tab-btn.active {\n  background-color: #3a3a3a;\n  color: #eee;\n  border-color: #555;\n}\n.reaction-picker-content {\n  padding: 8px;\n  overflow-y: auto;\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n  justify-content: flex-start;\n  overscroll-behavior: contain;\n}\n.reaction-picker-content .smiley-item {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  width: var(--item-size);\n  height: var(--item-size);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n}\n.reaction-picker-content .smiley-item a {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n  border-radius: 6px;\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: var(--icon-size) var(--icon-size);\n  font-size: 0;\n  transition: background-color 0.15s, transform 0.1s;\n  image-rendering: pixelated;\n}\n.reaction-picker-content .smiley-item a:hover {\n  background-color: var(--item-hover-bg);\n  transform: scale(1.1);\n}\n.user-mention {\n  color: var(--primary-color);\n  font-weight: 500;\n}\n.user-mention:hover {\n  text-decoration: underline;\n}\n.chat-tag {\n  color: var(--primary-color);\n  cursor: pointer;\n  margin-right: 2px;\n  display: inline-block;\n}\n.chat-tag:hover {\n  opacity: 0.8;\n}\n#dollars-floating-date {\n  position: absolute;\n  top: 55px;\n  left: 50%;\n  transform: translateX(-50%);\n  z-index: 10;\n  pointer-events: none;\n  opacity: 0;\n  transition: opacity 0.2s ease;\n  background: var(--dollars-glass-bg);\n  backdrop-filter: var(--dollars-glass-blur);\n  -webkit-backdrop-filter: var(--dollars-glass-blur);\n  box-shadow: var(--dollars-glass-shadow);\n  border: 1px solid var(--dollars-glass-border-color);\n  color: var(--primary-color);\n  padding: 4px 12px;\n  border-radius: 20px;\n  font-size: 12px;\n  font-weight: 700;\n  text-shadow: none;\n  white-space: nowrap;\n}\n#dollars-floating-date.visible {\n  opacity: 1;\n}\n#dollars-typing-indicator {\n  position: absolute;\n  top: -30px;\n  left: 10px;\n  height: auto;\n  background: var(--dollars-glass-bg);\n  backdrop-filter: var(--dollars-glass-blur);\n  -webkit-backdrop-filter: var(--dollars-glass-blur);\n  box-shadow: var(--dollars-glass-shadow);\n  border: 1px solid var(--dollars-glass-border-color);\n  padding: 4px 10px;\n  border-radius: 12px;\n  font-size: 12px;\n  color: var(--dollars-text-secondary);\n  font-style: italic;\n  opacity: 0;\n  transition: opacity 0.2s, transform 0.2s;\n  line-height: 1.5;\n  pointer-events: none;\n  transform: translateY(5px);\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n#dollars-typing-indicator.visible {\n  opacity: 1;\n  transform: translateY(0);\n}\nhtml[data-theme=dark] #dollars-typing-indicator {\n  color: #fff;\n}\nspan.text_mask {\n  background-color: #555;\n}\n@media (max-width: 768px) {\n  #dollars-chat-window {\n    width: auto;\n    max-width: calc(100vw - 20px);\n    height: calc(100dvh - 60px);\n    max-height: calc(100dvh - 60px);\n    left: 10px;\n    right: 10px;\n    bottom: 30px;\n    top: auto;\n  }\n  .chat-message {\n    content-visibility: visible;\n    contain-intrinsic-size: auto;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  #dollars-chat-window,\n  #dollars-chat-window .chat-header .close-btn,\n  #dollars-chat-window .chat-message,\n  #dollars-chat-window .send-btn {\n    transition: none !important;\n  }\n}\n#dollars-profile-card {\n  position: fixed;\n  z-index: var(--dollars-z-index-overlay);\n  width: 280px;\n  padding: 0;\n  border-radius: 20px;\n  background: var(--dollars-glass-bg);\n  backdrop-filter: var(--dollars-glass-blur);\n  -webkit-backdrop-filter: var(--dollars-glass-blur);\n  box-shadow: var(--dollars-glass-shadow);\n  color: var(--dollars-text);\n  opacity: 0;\n  transform: scale(0.95) translateY(5px);\n  transition: opacity 0.25s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);\n  pointer-events: none;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  border: 1px solid var(--dollars-glass-border-color);\n}\n@keyframes dollars-profile-slide-up {\n  from {\n    opacity: 0;\n    transform: translateY(15px) scale(0.95);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n#dollars-profile-card.visible {\n  opacity: 1;\n  transform: scale(1) translateY(0);\n  pointer-events: auto;\n  transition: none;\n  animation: dollars-profile-slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1);\n}\n.dollars-profile-banner {\n  height: 60px;\n  width: 100%;\n  background: linear-gradient(160deg,\n    color-mix(in srgb, var(--primary-color), var(--dollars-bg) 30%) 0%,\n    color-mix(in srgb, var(--primary-color), var(--dollars-bg) 60%) 50%,\n    color-mix(in srgb, var(--primary-color), var(--dollars-bg) 30%) 100%);\n  position: relative;\n}\n.dollars-profile-banner::before {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  background-image: var(--dollars-bg-pattern-url);\n  background-size: 300px;\n  opacity: 0.6;\n  mix-blend-mode: overlay;\n}\nhtml[data-theme=dark] .dollars-profile-banner::before {\n  opacity: 0.2;\n}\n.dollars-profile-body {\n  padding: 0 20px 15px 20px;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n}\n.dollars-profile-top-row {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-end;\n  margin-top: -30px;\n  margin-bottom: 12px;\n  position: relative;\n  z-index: 2;\n}\n.dollars-profile-identity {\n  display: flex;\n  align-items: flex-end;\n  gap: 12px;\n  flex-grow: 1;\n  min-width: 0;\n  margin-right: 8px;\n}\n.dollars-profile-avatar {\n  width: 64px;\n  height: 64px;\n  border-radius: 50%;\n  border: 3px solid var(--dollars-bg);\n  background-color: var(--dollars-bg);\n  object-fit: cover;\n  box-shadow: 0 4px 8px var(--dollars-shadow);\n  flex-shrink: 0;\n  transition: border-color 0.2s;\n}\n.dollars-profile-avatar.active {\n  border-color: var(--dollars-color-online);\n  box-shadow: 0 0 0 2px var(--dollars-bg), 0 0 0 4px var(--dollars-color-online);\n}\n.dollars-profile-names {\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n}\n.dollars-profile-nickname {\n  font-size: 16px;\n  font-weight: 700;\n  color: var(--dollars-text);\n  line-height: 1.2;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.dollars-profile-username {\n  font-size: 12px;\n  color: var(--dollars-text-secondary);\n  font-family: monospace;\n  opacity: 0.7;\n}\n.dollars-profile-actions {\n  display: flex;\n  gap: 6px;\n  flex-shrink: 0;\n}\n.dollars-profile-btn {\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  background: transparent;\n  border: 1px solid var(--dollars-border);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: var(--dollars-text-secondary);\n  transition: all 0.2s;\n  cursor: pointer;\n  position: relative;\n}\n.dollars-profile-btn:hover {\n  background: var(--primary-color);\n  color: var(--dollars-bg);\n  border-color: var(--primary-color);\n  transform: translateY(-2px);\n  box-shadow: 0 2px 8px var(--dollars-shadow);\n}\n.dollars-profile-btn svg {\n  width: 15px;\n  height: 15px;\n  stroke: currentColor;\n}\n.dollars-profile-sign {\n  font-size: 12px;\n  line-height: 1.6;\n  color: var(--dollars-text-secondary);\n  margin-bottom: 12px;\n  padding: 6px 10px;\n  border-left: 2px solid color-mix(in srgb, var(--primary-color), transparent 40%);\n  background: color-mix(in srgb, var(--primary-color), transparent 92%);\n  border-radius: 0 6px 6px 0;\n  word-wrap: break-word;\n}\n.dollars-profile-footer {\n  font-size: 10px;\n  color: var(--dollars-text-placeholder);\n  padding-top: 8px;\n  border-top: 1px solid var(--dollars-border);\n  margin-top: auto;\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.dollars-profile-footer::before {\n  content: \"\";\n  display: block;\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  background-color: var(--dollars-border);\n}\n.dollars-profile-footer.active::before {\n  background-color: var(--dollars-color-online);\n}\n#dollars-emoji-btn {\n  width: 38px;\n  height: 38px;\n  border: none;\n  background-color: var(--dollars-icon-color);\n  cursor: pointer;\n  -webkit-mask-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"white\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z\" /><path d=\"M16 3l-4 4l-4 -4\" /></svg>');\n  mask-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"white\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z\" /><path d=\"M16 3l-4 4l-4 -4\" /></svg>');\n  -webkit-mask-size: 23px;\n  mask-size: 23px;\n  -webkit-mask-repeat: no-repeat;\n  mask-repeat: no-repeat;\n  -webkit-mask-position: center;\n  mask-position: center;\n  border-radius: 50%;\n}\n#dollars-emoji-btn svg {\n  display: none !important;\n}\n#dollars-attach-btn {\n  width: 38px;\n  height: 38px;\n  border: none;\n  background-color: var(--dollars-icon-color);\n  cursor: pointer;\n  -webkit-mask-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"white\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M15 7l-6.5 6.5a1.5 1.5 0 0 0 3 3l6.5 -6.5a3 3 0 0 0 -6 -6l-6.5 6.5a4.5 4.5 0 0 0 9 9l6.5 -6.5\" /></svg>');\n  mask-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"white\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M15 7l-6.5 6.5a1.5 1.5 0 0 0 3 3l6.5 -6.5a3 3 0 0 0 -6 -6l-6.5 6.5a4.5 4.5 0 0 0 9 9l6.5 -6.5\" /></svg>');\n  -webkit-mask-size: 23px;\n  mask-size: 23px;\n  -webkit-mask-repeat: no-repeat;\n  mask-repeat: no-repeat;\n  -webkit-mask-position: center;\n  mask-position: center;\n  border-radius: 50%;\n}\n#dollars-attach-btn svg {\n  display: none !important;\n}\n.send-btn svg {\n  display: none !important;\n}\n.chat-header .header-buttons,\n.header-buttons {\n  margin-left: auto;\n  display: flex;\n  align-items: center;\n  gap: 5px;\n}\n.header-btn {\n  cursor: pointer;\n  width: 24px;\n  height: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 4px;\n  transition: background-color .2s ease, transform 0.15s ease;\n  border: none;\n  background: transparent;\n}\n#dollars-back-btn,\n.dollars-back-btn {\n  margin-right: 0;\n  background-color: var(--dollars-icon-color);\n  -webkit-mask-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"white\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"15 18 9 12 15 6\"/></svg>');\n  mask-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"white\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"15 18 9 12 15 6\"/></svg>');\n  -webkit-mask-repeat: no-repeat;\n  mask-repeat: no-repeat;\n  -webkit-mask-position: center;\n  mask-position: center;\n}\n#dollars-back-btn svg,\n.dollars-back-btn svg {\n  display: none !important;\n}\n#dollars-resize-handle {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 20px;\n  height: 20px;\n  cursor: nw-resize;\n  z-index: 10003;\n  touch-action: none;\n  background-color: var(--dollars-icon-color-secondary);\n  -webkit-mask-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M10 2L2 10\" stroke=\"white\" stroke-width=\"2\" stroke-linecap=\"round\"/><path d=\"M14 6L6 14\" stroke=\"white\" stroke-width=\"2\" stroke-linecap=\"round\"/></svg>');\n  mask-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M10 2L2 10\" stroke=\"white\" stroke-width=\"2\" stroke-linecap=\"round\"/><path d=\"M14 6L6 14\" stroke=\"white\" stroke-width=\"2\" stroke-linecap=\"round\"/></svg>');\n  -webkit-mask-repeat: no-repeat;\n  mask-repeat: no-repeat;\n  -webkit-mask-position: 5px 5px;\n  mask-position: 5px 5px;\n  -webkit-mask-size: 10px;\n  mask-size: 10px;\n  opacity: .6;\n  transition: opacity .2s ease;\n}\n#dollars-resize-handle:hover {\n  opacity: 1;\n}\n#dollars-resize-handle::after {\n  display: none !important;\n}\n#dollars-settings-btn-header {\n  background-color: var(--dollars-icon-color);\n  -webkit-mask-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"white\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z\" /><circle cx=\"12\" cy=\"12\" r=\"3\" /></svg>');\n  mask-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"white\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z\" /><circle cx=\"12\" cy=\"12\" r=\"3\" /></svg>');\n  -webkit-mask-repeat: no-repeat;\n  mask-repeat: no-repeat;\n  -webkit-mask-position: center;\n  mask-position: center;\n}\n#dollars-text-formatter {\n  position: fixed;\n  z-index: var(--dollars-z-index-context);\n  background: var(--dollars-glass-bg);\n  backdrop-filter: var(--dollars-glass-blur);\n  -webkit-backdrop-filter: var(--dollars-glass-blur);\n  box-shadow: var(--dollars-glass-shadow);\n  border: 1px solid var(--dollars-glass-border-color);\n  border-radius: 50px;\n  display: flex;\n  flex-direction: column;\n  padding: 4px;\n  opacity: 0;\n  transform: translateY(10px) scale(0.95);\n  pointer-events: none;\n  transition: opacity 0.2s cubic-bezier(0.2, 0.8, 0.2, 1),\n    transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);\n}\n#dollars-text-formatter.visible {\n  opacity: 1;\n  transform: translateY(0) scale(1);\n  pointer-events: auto;\n}\n.formatter-row {\n  display: flex;\n  align-items: center;\n  gap: 2px;\n}\n.formatter-btn {\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: none;\n  background: transparent;\n  border-radius: 50px;\n  cursor: pointer;\n  color: var(--dollars-text);\n  transition: background-color 0.15s, transform 0.1s, color 0.15s;\n}\n.formatter-btn:hover {\n  background-color: var(--dollars-bg-hover);\n}\n.formatter-btn.active {\n  color: var(--primary-color);\n}\n.formatter-btn svg {\n  width: 18px;\n  height: 18px;\n}\n.formatter-divider {\n  width: 1px;\n  height: 18px;\n  background-color: var(--dollars-border);\n  margin: 0 4px;\n}\n.formatter-link-input-wrapper {\n  display: none;\n  align-items: center;\n  gap: 4px;\n  padding: 0 2px;\n}\n#dollars-text-formatter.link-mode .main-buttons {\n  display: none;\n}\n#dollars-text-formatter.link-mode .formatter-link-input-wrapper {\n  display: flex;\n}\n.formatter-link-input {\n  background: transparent;\n  border: none;\n  color: var(--dollars-text);\n  font-size: 13px;\n  width: 150px;\n  outline: none;\n  padding: 4px;\n}\n.formatter-link-input::placeholder {\n  color: var(--dollars-text-placeholder);\n}\n#dollars-nav-group {\n  position: absolute;\n  bottom: 90px;\n  right: 20px;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  z-index: 30;\n  pointer-events: none;\n  transition: transform 0.2s, opacity 0.2s;\n}\n#dollars-nav-group.visible {\n  pointer-events: auto;\n}\n.nav-btn {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  border: 1px solid var(--dollars-glass-border-color);\n  background: var(--dollars-glass-bg);\n  backdrop-filter: var(--dollars-glass-blur);\n  -webkit-backdrop-filter: var(--dollars-glass-blur);\n  box-shadow: var(--dollars-glass-shadow);\n  color: var(--primary-color);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  opacity: 0;\n  transform: scale(0.8);\n  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);\n  pointer-events: none;\n}\n.nav-btn.visible {\n  opacity: 1;\n  transform: scale(1);\n  pointer-events: auto;\n}\n.nav-btn:hover {\n  background: var(--dollars-glass-bg);\n  transform: scale(1.1);\n  box-shadow: var(--dollars-glass-shadow), 0 0 0 2px color-mix(in srgb, var(--primary-color), transparent 70%);\n}\n.nav-btn:active {\n  transform: scale(0.95);\n}\n.nav-btn svg {\n  width: 24px;\n  height: 24px;\n  stroke-width: 2.5;\n}\n#dollars-scroll-bottom-btn {\n  position: absolute;\n  bottom: 80px;\n  right: 20px;\n  z-index: 95;\n}\n#dollars-scroll-mention-btn {\n  position: absolute;\n  right: 20px;\n  z-index: 95;\n}\n#dollars-scroll-mention-btn svg {\n  transform: rotate(180deg);\n}\n.nav-btn-badge {\n  position: absolute;\n  top: -5px;\n  right: -5px;\n  min-width: 18px;\n  height: 18px;\n  border-radius: 9px;\n  background-color: var(--primary-color);\n  color: #fff;\n  font-size: 11px;\n  font-weight: 700;\n  line-height: 18px;\n  text-align: center;\n  padding: 0 5px;\n  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);\n  z-index: 31;\n}\n#dollars-mention-list {\n  position: absolute;\n  bottom: calc(100% + 5px);\n  left: 0;\n  width: 100%;\n  max-height: 220px;\n  overflow-y: auto;\n  border-radius: 18px;\n  display: none;\n  flex-direction: column;\n  z-index: var(--dollars-z-index-smiley);\n  background: var(--dollars-glass-bg);\n  backdrop-filter: var(--dollars-glass-blur);\n  -webkit-backdrop-filter: var(--dollars-glass-blur);\n  box-shadow: var(--dollars-glass-shadow);\n  border: 1px solid var(--dollars-glass-border-color);\n  gap: 4px;\n  transition: bottom 0.2s ease;\n}\n#dollars-mention-list.visible {\n  display: flex;\n  animation: dollars-slide-up 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);\n}\n@keyframes dollars-slide-up {\n  from {\n    opacity: 0;\n    transform: translateY(10px) scale(0.98);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n@keyframes dollars-item-slide-in {\n  0% {\n    opacity: 0;\n    transform: translateY(10px);\n  }\n  100% {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.mention-item {\n  display: flex;\n  align-items: center;\n  padding: 4px 8px;\n  border-radius: 15px;\n  cursor: pointer;\n  transition: background-color 0.2s;\n  gap: 8px;\n  animation: dollars-item-slide-in 0.25s cubic-bezier(0.2, 0.8, 0.2, 1) backwards;\n}\n.mention-item:nth-child(1) {\n  animation-delay: 0ms;\n}\n.mention-item:nth-child(2) {\n  animation-delay: 30ms;\n}\n.mention-item:nth-child(3) {\n  animation-delay: 60ms;\n}\n.mention-item:nth-child(4) {\n  animation-delay: 90ms;\n}\n.mention-item:nth-child(5) {\n  animation-delay: 120ms;\n}\n.mention-item:nth-child(6) {\n  animation-delay: 150ms;\n}\n.mention-item:hover,\n.mention-item.active {\n  background-color: rgba(255, 255, 255, 0.3);\n}\nhtml[data-theme=\"dark\"] .mention-item:hover,\nhtml[data-theme=\"dark\"] .mention-item.active {\n  background-color: rgba(255, 255, 255, 0.1);\n}\n.mention-item img {\n  width: 24px;\n  height: 24px;\n  border-radius: 50%;\n  object-fit: cover;\n  background-color: var(--dollars-bg);\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n.mention-item-info {\n  display: flex;\n  align-items: baseline;\n  gap: 6px;\n  overflow: hidden;\n  min-width: 0;\n  line-height: 1.2;\n}\n.mention-item-nick {\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--dollars-text);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.mention-item-user {\n  font-size: 10px;\n  color: var(--dollars-text-secondary);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  opacity: 0.8;\n}\n.dollars-preview-card {\n  background-color: var(--dollars-bg);\n  border: 1px solid var(--dollars-border);\n  border-radius: 8px;\n  padding: 10px;\n  display: flex;\n  gap: 12px;\n  text-decoration: none !important;\n  transition: all 0.2s;\n  box-sizing: border-box;\n  max-width: 100% !important;\n  height: 100px;\n  width: 300px;\n  overflow: hidden;\n  position: relative;\n  min-width: 0;\n}\n.dollars-preview-card .cover {\n  width: 80px;\n  height: 80px;\n  flex-shrink: 0;\n  border-radius: 6px;\n  background-color: var(--dollars-bg);\n  overflow: hidden;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.dollars-preview-card .cover img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  border-radius: 0 !important;\n}\n.dollars-preview-card[data-entity-type=character] .cover img,\n.dollars-preview-card[data-entity-type=person] .cover img {\n  object-fit: contain !important;\n}\n.dollars-preview-card[data-entity-type=generic] .cover {\n  background-color: var(--dollars-bg);\n  border-radius: 5px;\n}\n.dollars-preview-card[data-entity-type=generic] .cover img {\n  object-fit: cover;\n}\n.dollars-preview-card .inner {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  overflow: hidden;\n}\n.dollars-preview-card .title {\n  font-size: 14px;\n  font-weight: bold;\n  color: var(--dollars-text) !important;\n  margin: 0 0 4px 0;\n  line-height: 1.4;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.dollars-preview-card .info {\n  font-size: 12px;\n  color: var(--dollars-text-secondary);\n  margin: 0;\n  line-height: 1.5;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.dollars-preview-card[data-entity-type=generic] .info {\n  margin-top: 4px;\n  margin-bottom: 0;\n}\n.dollars-preview-card .rateInfo {\n  margin-top: 6px;\n  font-size: 11px;\n  color: var(--dollars-text-placeholder);\n  display: flex;\n  align-items: center;\n  gap: 5px;\n}\n@media (prefers-reduced-motion: reduce) {\n  .uprofile-action-btn,\n  .uprofile-action-btn:active {\n    transition: none;\n    transform: none;\n  }\n  .uprofile-info-row {\n    transition: none;\n  }\n  .uprofile-media-item img {\n    transition: none;\n  }\n  #dollars-user-profile-panel.narrow,\n  #dollars-user-profile-panel.narrow.visible,\n  #dollars-user-profile-panel.narrow.closing {\n    transition: none;\n  }\n  #dollars-user-profile-panel.wide,\n  #dollars-user-profile-panel.wide.visible,\n  #dollars-user-profile-panel.wide.closing {\n    transition: none;\n  }\n}\n#dollars-user-profile-panel {\n  position: absolute;\n  z-index: 100;\n  display: flex;\n  flex-direction: column;\n  background: var(--dollars-bg);\n  overflow: hidden;\n}\n#dollars-user-profile-panel.narrow {\n  inset: 0;\n  transform: translateX(100%);\n  transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);\n}\n#dollars-user-profile-panel.narrow.visible {\n  transform: translateX(0);\n}\n#dollars-user-profile-panel.narrow.closing {\n  transform: translateX(100%);\n}\n#dollars-user-profile-panel.wide {\n  top: calc(40px + 16px);\n  right: 16px;\n  bottom: 16px;\n  left: 16px;\n  z-index: 101;\n  border-radius: 16px;\n  border: 1px solid var(--dollars-border);\n  box-shadow: 0 8px 40px -8px var(--dollars-shadow);\n  opacity: 0;\n  transform: translateY(4px);\n  transition: opacity 0.25s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);\n  pointer-events: none;\n}\n#dollars-user-profile-panel.wide.visible {\n  opacity: 1;\n  transform: translateY(0);\n  pointer-events: auto;\n}\n#dollars-user-profile-panel.wide.closing {\n  opacity: 0;\n  transform: translateY(4px);\n  pointer-events: none;\n}\n.uprofile-card-header {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 12px 8px 8px;\n  flex-shrink: 0;\n  border-bottom: 1px solid var(--dollars-border);\n}\n.uprofile-card-title {\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--dollars-text);\n}\n.uprofile-banner {\n  height: 120px;\n  flex-shrink: 0;\n  background: linear-gradient(160deg,\n    color-mix(in srgb, var(--primary-color), var(--dollars-bg) 30%) 0%,\n    color-mix(in srgb, var(--primary-color), var(--dollars-bg) 60%) 50%,\n    color-mix(in srgb, var(--primary-color), var(--dollars-bg) 30%) 100%);\n  position: relative;\n  display: flex;\n  align-items: flex-end;\n  justify-content: center;\n}\n.uprofile-banner::before {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  background-image: var(--dollars-bg-pattern-url);\n  background-size: 300px;\n  opacity: 0.6;\n  mix-blend-mode: overlay;\n}\nhtml[data-theme=dark] .uprofile-banner::before {\n  opacity: 0.2;\n}\n.uprofile-avatar {\n  width: 88px;\n  height: 88px;\n  border-radius: 50%;\n  border: 3px solid var(--dollars-bg);\n  background-color: var(--dollars-bg);\n  object-fit: cover;\n  box-shadow: 0 4px 16px var(--dollars-shadow);\n  position: relative;\n  z-index: 1;\n  transform: translateY(44px);\n  flex-shrink: 0;\n}\n.uprofile-content {\n  flex: 1;\n  overflow-y: auto;\n  padding: 52px 20px 24px;\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.uprofile-body {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.uprofile-name-section {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 2px;\n}\n.uprofile-nickname {\n  font-size: 20px;\n  font-weight: 800;\n  color: var(--dollars-text);\n  line-height: 1.3;\n  word-break: break-word;\n  text-align: center;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n}\n.uprofile-status-dot {\n  display: inline-block;\n  width: 9px;\n  height: 9px;\n  border-radius: 50%;\n  background-color: var(--dollars-color-online);\n  flex-shrink: 0;\n  box-shadow: 0 0 0 2px var(--dollars-bg);\n  position: relative;\n}\n.uprofile-status-dot.active::after {\n  content: none;\n}\n.uprofile-username {\n  font-size: 13px;\n  color: var(--dollars-text-secondary);\n  font-family: monospace;\n  text-align: center;\n}\n.uprofile-last-active {\n  font-size: 12px;\n  color: var(--dollars-text-placeholder);\n  margin-top: 2px;\n}\n.uprofile-stats-row {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0;\n  background: color-mix(in srgb, var(--primary-color), transparent 92%);\n  border: 1px solid color-mix(in srgb, var(--primary-color), transparent 80%);\n  border-radius: 12px;\n  padding: 10px 8px;\n}\n.uprofile-stat {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 2px;\n}\n.uprofile-stat-num {\n  font-size: 17px;\n  font-weight: 700;\n  color: var(--primary-color);\n  line-height: 1;\n  letter-spacing: -0.3px;\n  display: inline-block;\n}\n.uprofile-stat-label {\n  font-size: 11px;\n  color: var(--dollars-text-placeholder);\n  line-height: 1;\n}\n.uprofile-stat-divider {\n  width: 1px;\n  height: 28px;\n  background: color-mix(in srgb, var(--primary-color), transparent 70%);\n  flex-shrink: 0;\n}\n.uprofile-actions {\n  display: flex;\n  gap: 8px;\n}\n.uprofile-action-btn {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  padding: 10px 12px;\n  border-radius: 10px;\n  background: var(--dollars-glass-bg);\n  border: 1px solid var(--dollars-border);\n  color: var(--dollars-text);\n  font-size: 13px;\n  cursor: pointer;\n  transition: background-color 0.14s ease-out, color 0.14s ease-out, border-color 0.14s ease-out;\n  white-space: nowrap;\n}\n.uprofile-action-btn:hover {\n  background: var(--primary-color);\n  color: var(--dollars-bg);\n  border-color: var(--primary-color);\n}\n.uprofile-action-btn:focus-visible {\n  outline: 2px solid var(--primary-color);\n  outline-offset: 2px;\n}\n.uprofile-action-btn span {\n  display: flex;\n  align-items: center;\n  flex-shrink: 0;\n}\n.uprofile-action-btn svg {\n  width: 16px;\n  height: 16px;\n  stroke: currentColor;\n}\n.uprofile-info-section {\n  display: flex;\n  flex-direction: column;\n  border-top: 1px solid var(--dollars-border);\n  padding-top: 12px;\n}\n.uprofile-info-row {\n  display: flex;\n  align-items: flex-start;\n  gap: 12px;\n  padding: 10px 8px;\n  border-radius: 8px;\n  transition: background-color 0.15s;\n}\n.uprofile-info-row:hover {\n  background: var(--dollars-bg-hover);\n}\n.uprofile-info-row + .uprofile-info-row {\n  border-top: 1px solid color-mix(in srgb, var(--dollars-border), transparent 50%);\n}\n.uprofile-info-content {\n  flex: 1;\n  min-width: 0;\n}\n.uprofile-info-label {\n  font-size: 11px;\n  color: var(--primary-color);\n  opacity: 0.8;\n  font-weight: 500;\n  margin-bottom: 2px;\n}\n.uprofile-info-value {\n  font-size: 13px;\n  color: var(--dollars-text);\n  line-height: 1.5;\n  word-break: break-word;\n}\n.uprofile-sign-value {\n  padding: 4px 8px;\n  border-left: 2px solid color-mix(in srgb, var(--primary-color), transparent 40%);\n  background: color-mix(in srgb, var(--primary-color), transparent 92%);\n  border-radius: 0 6px 6px 0;\n  color: var(--dollars-text-secondary);\n}\n.uprofile-media-section {\n  border-top: 1px solid var(--dollars-border);\n  padding-top: 12px;\n}\n.uprofile-media-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 10px;\n  padding: 0 4px;\n}\n.uprofile-media-header span {\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--dollars-text);\n}\n.uprofile-media-grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 3px;\n  border-radius: 10px;\n  overflow: hidden;\n}\n.uprofile-media-item {\n  position: relative;\n  aspect-ratio: 1;\n  cursor: pointer;\n  overflow: hidden;\n  background: var(--dollars-border);\n}\n.uprofile-media-item img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  transition: transform 0.16s ease-out;\n}\n.uprofile-media-item:hover img {\n  transform: scale(1.02);\n}\n.uprofile-media-video-btn {\n  display: block;\n  width: 100%;\n  height: 100%;\n  padding: 0;\n  border: none;\n  background: none;\n  cursor: pointer;\n  position: relative;\n}\n.uprofile-media-video-badge {\n  position: absolute;\n  bottom: 4px;\n  left: 4px;\n  width: 24px;\n  height: 24px;\n  border-radius: 50%;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.uprofile-media-video-badge svg {\n  margin-left: 2px;\n}\n.uprofile-empty-hint {\n  text-align: center;\n  color: var(--dollars-text-placeholder);\n  font-size: 13px;\n  padding: 16px 0;\n}\n#dollars-search-ui {\n  display: flex;\n  flex-direction: column;\n  flex-grow: 1;\n  min-height: 0;\n  gap: 8px;\n  padding: 52px 12px 12px 12px;\n  background: var(--dollars-glass-bg);\n  backdrop-filter: var(--dollars-glass-blur);\n  -webkit-backdrop-filter: var(--dollars-glass-blur);\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 100;\n}\n#dollars-search-ui~.chat-input-container,\n#dollars-user-profile-panel.visible~.chat-input-container {\n  display: none;\n}\n#dollars-search-ui .search-panel-row {\n  display: flex;\n  align-items: center;\n  width: 100%;\n  opacity: 0.8\n}\n#dollars-search-ui .search-calendar-btn {\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-left: 5px;\n  width: 35px;\n  height: 35px;\n  border-radius: 50%;\n  background-color: var(--dollars-bg);\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n  border: 1px solid var(--dollars-border);\n  color: var(--dollars-text-secondary);\n  flex-shrink: 0;\n  transition: all 0.2s;\n}\n#dollars-search-ui .search-bar {\n  height: 35px;\n  display: flex;\n  align-items: center;\n  min-width: 0;\n  position: relative;\n  border-radius: 100px;\n  border: 1px solid var(--dollars-border);\n  background-color: var(--dollars-bg);\n  transition: all .3s ease-in-out;\n  padding: 0 6px 0 6px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n#dollars-search-ui .search-bar:focus-within {\n  border-color: var(--primary-color);\n  box-shadow: 0 0 10px rgba(240, 145, 153, .6);\n}\n#dollars-search-ui input {\n  flex-grow: 1;\n  min-width: 0;\n  padding: 6px 0;\n  border: none;\n  border-radius: 0;\n  background-color: transparent;\n  outline: 0;\n  color: var(--dollars-text);\n}\n#dollars-search-ui .search-close-btn {\n  flex-shrink: 0;\n  cursor: pointer;\n  font-size: 20px;\n  color: var(--dollars-text-secondary);\n  align-items: center;\n  opacity: 0.5;\n  z-index: 1;\n  display: flex;\n}\n#dollars-search-ui .search-icon {\n  flex-shrink: 0;\n}\n#dollars-search-ui input[type=search]::-webkit-search-cancel-button,\n#dollars-search-ui input[type=search]::-webkit-search-decoration {\n  -webkit-appearance: none;\n  appearance: none;\n  display: none;\n}\n#dollars-search-results {\n  flex-grow: 1;\n  overflow-y: auto;\n  overscroll-behavior: contain;\n}\n.search-status-msg {\n  text-align: center;\n  padding: 20px;\n  color: var(--dollars-text-placeholder);\n}\n.search-result-item {\n  display: flex;\n  align-items: flex-start;\n  gap: 8px;\n  padding: 8px;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: background-color .2s;\n}\n.search-result-item:hover {\n  background-color: var(--dollars-bg-hover);\n}\n.search-result-item img {\n  width: 24px;\n  height: 24px;\n  border-radius: 50%;\n}\n.search-result-item .dollars-search-content {\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.search-result-item .dollars-search-header {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 12px;\n}\n.search-result-item .dollars-search-nickname {\n  font-weight: 700;\n  color: var(--dollars-text);\n}\n.search-result-item .dollars-search-timestamp {\n  color: var(--dollars-text-secondary);\n}\n.search-result-item .dollars-search-message {\n  font-size: 13px;\n  color: var(--dollars-text-secondary);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n#dollars-search-ui .search-gallery-btn {\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-left: 5px;\n  width: 35px;\n  height: 35px;\n  border-radius: 50%;\n  background-color: var(--dollars-bg);\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n  border: 1px solid var(--dollars-border);\n  color: var(--dollars-text-secondary);\n  flex-shrink: 0;\n  transition: all 0.2s;\n}\n#dollars-search-ui .search-gallery-btn:hover {\n  background-color: var(--dollars-bg-hover);\n}\n#dollars-search-ui .search-gallery-btn.active {\n  background-color: var(--primary-color);\n  color: #fff;\n  border-color: var(--primary-color);\n}\n#dollars-search-ui .search-calendar-btn svg,\n#dollars-search-ui .search-gallery-btn svg {\n  width: 20px;\n  height: 20px;\n}\n#dollars-search-ui .gallery-container {\n  display: flex;\n  flex-direction: column;\n  flex-grow: 1;\n  min-height: 0;\n  overflow: hidden;\n}\n#dollars-search-ui .gallery-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 8px;\n}\n#dollars-search-ui .gallery-title {\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--dollars-text);\n}\n#dollars-search-ui .gallery-close-btn {\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  border-radius: 50%;\n  color: var(--dollars-text-secondary);\n  transition: all 0.2s;\n}\n#dollars-search-ui .gallery-close-btn:hover {\n  background-color: var(--dollars-bg-hover);\n}\n#dollars-search-ui .gallery-grid {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  gap: 4px;\n  flex-grow: 1;\n  overflow-y: auto;\n  overscroll-behavior: contain;\n  align-content: start;\n}\n#dollars-search-ui .gallery-item {\n  position: relative;\n  width: 100%;\n  padding-bottom: 100%;\n  cursor: pointer;\n  overflow: hidden;\n  border-radius: 6px;\n  background-color: var(--dollars-bg);\n}\n#dollars-search-ui .gallery-item a {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  display: block;\n}\n#dollars-search-ui .gallery-item img,\n#dollars-search-ui .gallery-item video {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n#dollars-search-ui .gallery-item .video-overlay {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: rgba(0, 0, 0, 0.3);\n  pointer-events: none;\n}\n#dollars-search-ui .gallery-item:hover .video-overlay {\n  background-color: rgba(0, 0, 0, 0.4);\n}\n#dollars-search-ui .gallery-loading {\n  grid-column: 1 / -1;\n  text-align: center;\n  padding: 20px;\n  color: var(--dollars-text-secondary);\n}\n.dollars-tooltip {\n  pointer-events: auto !important;\n}\n.dollars-tooltip .tooltip-inner a {\n  color: #eee !important;\n  text-decoration: none !important;\n  transition: color .2s;\n  cursor: pointer;\n}\n.dollars-tooltip .tooltip-inner a:hover {\n  color: #fff !important;\n  border-bottom-color: #fff;\n  text-decoration: none !important;\n}\n@keyframes dollars-message-in {\n  0% {\n    opacity: 0;\n    transform: translateY(16px);\n  }\n  100% {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@keyframes dollars-scale-out {\n  from {\n    opacity: 1;\n    transform: scale(1);\n  }\n  to {\n    opacity: 0;\n    transform: scale(0.95);\n  }\n}\n@keyframes dollars-slide-down-out {\n  from {\n    opacity: 1;\n    transform: translateY(0);\n  }\n  to {\n    opacity: 0;\n    transform: translateY(10px);\n  }\n}\n#dollars-context-menu.closing {\n  animation: dollars-scale-out 0.15s ease-out forwards;\n  pointer-events: none;\n}\n@keyframes dollars-profile-slide-out {\n  0% {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n  100% {\n    opacity: 0;\n    transform: translateY(10px) scale(0.95);\n  }\n}\n#dollars-profile-card.closing {\n  animation: dollars-profile-slide-out 0.2s cubic-bezier(0.4, 0, 1, 1) forwards;\n  pointer-events: none;\n  transition: none;\n}\n#dollars-smiles-floating.closing {\n  animation: dollars-slide-down-out 0.2s ease-out forwards;\n  pointer-events: none;\n}\n#dollars-reaction-picker-floating.closing {\n  animation: dollars-scale-out 0.15s ease-out forwards;\n  pointer-events: none;\n}\n.chat-message.new-message {\n  animation: dollars-message-in 0.35s cubic-bezier(0.4, 0, 0.2, 1) forwards;\n  transition: none;\n  opacity: 0;\n  transform: translateY(16px);\n}\n.chat-message.pending.new-message {\n  opacity: 0.75;\n}\n.chat-message.pending {\n  opacity: 0.7;\n  transition: opacity 0.25s ease-out !important;\n}\n.chat-message.pending .bubble::after {\n  content: '';\n  position: absolute;\n  right: 6px;\n  bottom: 4px;\n  width: 12px;\n  height: 12px;\n  border: 2px solid var(--dollars-text-secondary);\n  border-top-color: transparent;\n  border-radius: 50%;\n  animation: dollars-spin 0.7s ease-in-out infinite, dollars-spinner-fade-in 0.2s ease-out forwards;\n  will-change: transform;\n}\n@keyframes dollars-spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n@keyframes dollars-spinner-fade-in {\n  from {\n    opacity: 0;\n    transform: scale(0.5) rotate(0deg);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1) rotate(0deg);\n  }\n}\n#dollars-chat-root .likes_grid {\n  opacity: 1;\n}\n#dollars-chat-root .likes_grid .item {\n  gap: 3px;\n  background: rgba(255, 255, 255, 0.85);\n}\nhtml[data-theme=\"dark\"] #dollars-chat-root .likes_grid .item {\n  background: rgba(255, 255, 255, 0.15);\n}\n.reaction-avatars {\n  display: inline-flex;\n  align-items: center;\n  margin-left: 3px;\n  flex-shrink: 0;\n}\n.reaction-avatar {\n  width: 21px;\n  height: 21px;\n  border-radius: 50%;\n  margin-left: -5px;\n  object-fit: cover;\n  background-color: var(--dollars-bg);\n  position: relative;\n  flex-shrink: 0;\n  transition: transform 0.15s ease;\n}\n.reaction-avatar:first-child {\n  margin-left: 0;\n}\n.reaction-item:hover .reaction-avatar {\n  border-color: #369cf8;\n}\n.reaction-item .num.extra {\n  font-size: 10px;\n  margin-left: 2px;\n  color: var(--dollars-text-secondary);\n}\n.reaction-item:hover .num.extra {\n  color: #fff;\n}\n@keyframes dollars-stagger-fade {\n  from {\n    opacity: 0;\n    transform: scale(0.85);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n#dollars-smiles-floating.open .smiley-item,\n#dollars-reaction-picker-floating.open .smiley-item {\n  animation: dollars-stagger-fade 0.25s cubic-bezier(0.2, 0.8, 0.2, 1) backwards;\n}\n@keyframes dollars-menu-cascade {\n  from {\n    opacity: 0;\n    transform: translateX(-8px);\n  }\n  to {\n    opacity: 1;\n    transform: translateX(0);\n  }\n}\n#dollars-context-menu.visible .context-menu-items button {\n  animation: dollars-menu-cascade 0.2s cubic-bezier(0.2, 0.8, 0.2, 1) backwards;\n}\n#dollars-context-menu.visible .context-menu-items button:nth-child(1) {\n  animation-delay: 0ms;\n}\n#dollars-context-menu.visible .context-menu-items button:nth-child(2) {\n  animation-delay: 25ms;\n}\n#dollars-context-menu.visible .context-menu-items button:nth-child(3) {\n  animation-delay: 50ms;\n}\n#dollars-context-menu.visible .context-menu-items button:nth-child(4) {\n  animation-delay: 75ms;\n}\n#dollars-context-menu.visible .context-menu-items button:nth-child(5) {\n  animation-delay: 100ms;\n}\n#dollars-context-menu.visible .context-menu-items button:nth-child(6) {\n  animation-delay: 125ms;\n}\n#dollars-context-menu.visible .context-menu-items button:nth-child(7) {\n  animation-delay: 150ms;\n}\n#dollars-context-menu.visible .context-menu-items button:nth-child(8) {\n  animation-delay: 175ms;\n}\n@keyframes dollars-reaction-bounce {\n  0% {\n    opacity: 0;\n    transform: scale(0.3) translateY(15px);\n  }\n  40% {\n    transform: scale(1.2) translateY(-10px);\n  }\n  65% {\n    transform: scale(0.92) translateY(2px);\n  }\n  85% {\n    transform: scale(1.05) translateY(-2px);\n  }\n  100% {\n    opacity: 1;\n    transform: scale(1) translateY(0);\n  }\n}\n#dollars-context-menu.visible .context-menu-reactions .reaction-item {\n  animation: dollars-reaction-bounce 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;\n}\n#dollars-context-menu.visible .context-menu-reactions .reaction-item:nth-child(1) {\n  animation-delay: 0ms;\n}\n#dollars-context-menu.visible .context-menu-reactions .reaction-item:nth-child(2) {\n  animation-delay: 35ms;\n}\n#dollars-context-menu.visible .context-menu-reactions .reaction-item:nth-child(3) {\n  animation-delay: 70ms;\n}\n#dollars-context-menu.visible .context-menu-reactions .reaction-item:nth-child(4) {\n  animation-delay: 105ms;\n}\n#dollars-context-menu.visible .context-menu-reactions .reaction-item:nth-child(5) {\n  animation-delay: 140ms;\n}\n#dollars-context-menu.visible .context-menu-reactions .reaction-item:nth-child(6) {\n  animation-delay: 175ms;\n}\n#dollars-context-menu.visible .context-menu-reactions .reaction-item:nth-child(7) {\n  animation-delay: 210ms;\n}\n.reply-preview.visible {\n  animation: dollars-slide-up 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);\n}\n.search-result-item {\n  animation: dollars-item-slide-in 0.25s cubic-bezier(0.2, 0.8, 0.2, 1) backwards;\n}\n.search-result-item:nth-child(1) {\n  animation-delay: 0ms;\n}\n.search-result-item:nth-child(2) {\n  animation-delay: 30ms;\n}\n.search-result-item:nth-child(3) {\n  animation-delay: 60ms;\n}\n.search-result-item:nth-child(4) {\n  animation-delay: 90ms;\n}\n.search-result-item:nth-child(5) {\n  animation-delay: 120ms;\n}\n.search-result-item:nth-child(6) {\n  animation-delay: 150ms;\n}\n.search-result-item:nth-child(7) {\n  animation-delay: 180ms;\n}\n.search-result-item:nth-child(8) {\n  animation-delay: 210ms;\n}\n.conversation-item {\n  transition: background-color 0.2s, box-shadow 0.2s, transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1);\n}\n.conversation-item:hover {\n  transform: scale(1.02);\n}\n.conversation-item:active {\n  transform: scale(0.98);\n}\n.send-btn:active {\n  transform: scale(0.9) !important;\n}\n.header-btn:active {\n  transform: scale(0.92);\n}\n@keyframes dollars-date-slide {\n  from {\n    opacity: 0;\n    transform: translateX(-50%) translateY(-10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateX(-50%) translateY(0);\n  }\n}\n#dollars-floating-date.visible {\n  animation: dollars-date-slide 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);\n}\n@keyframes dollars-btn-bounce-in {\n  0% {\n    opacity: 0;\n    transform: scale(0.5);\n  }\n  60% {\n    transform: scale(1.1);\n  }\n  100% {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n.nav-btn.visible {\n  animation: dollars-btn-bounce-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n.dollars-preview-card {\n  animation: dollars-item-slide-in 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);\n}\n.smiley-tab-btn,\n.reaction-picker-tab-btn {\n  transition: background-color 0.15s, color 0.15s, transform 0.1s;\n}\n.smiley-tab-btn:active,\n.reaction-picker-tab-btn:active {\n  transform: scale(0.95);\n}\n@keyframes dollars-formatter-in {\n  from {\n    opacity: 0;\n    transform: translateY(8px) scale(0.9);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n#dollars-text-formatter.visible {\n  animation: dollars-formatter-in 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);\n}\n.formatter-btn:active {\n  transform: scale(0.9);\n}\n@media (prefers-reduced-motion: reduce) {\n  *,\n  *::before,\n  *::after {\n    animation-duration: 0.01ms !important;\n    animation-iteration-count: 1 !important;\n    transition-duration: 0.01ms !important;\n  }\n}\n#unified-notifier {\n  position: fixed;\n  bottom: 40px;\n  right: 30px;\n  width: 223px;\n  z-index: 10001;\n  border-radius: 15px;\n  backdrop-filter: blur(10px);\n  -webkit-backdrop-filter: blur(10px);\n  overflow: hidden;\n  transform: translateX(calc(100% + 30px));\n  transition: all .4s ease-in-out;\n  background-color: rgba(254, 254, 254, .9);\n  color: #000;\n  border: 1px solid rgba(0, 0, 0, .1);\n  box-shadow: 0 5px 25px -5px rgba(80, 80, 80, .3);\n  display: flex;\n  flex-direction: column;\n}\nhtml[data-theme=dark] #unified-notifier {\n  background-color: rgba(45, 46, 47, .9);\n  color: #e0e0e1;\n  border: 1px solid rgba(255, 255, 255, .15);\n}\n#unified-notifier.show {\n  transform: translateX(0);\n}\n.un-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0 15px;\n  height: 32px;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--primary-color);\n  border-bottom: 1px solid #eee;\n}\nhtml[data-theme=dark] .un-header {\n  border-bottom: 1px solid #444;\n}\n.un-body {\n  padding: 0;\n  max-height: 400px;\n  overflow-y: auto;\n}\n.un-item {\n  display: flex;\n  align-items: flex-start;\n  padding: 10px 15px;\n}\n.un-item:not(:last-child) {\n  border-bottom: 1px solid #eee;\n}\nhtml[data-theme=dark] .un-item:not(:last-child) {\n  border-bottom: 1px solid #444;\n}\n.un-item .avatarNeue {\n  margin-right: 12px;\n  flex-shrink: 0;\n  width: 40px;\n  height: 40px;\n  background-size: cover;\n  border-radius: 50%;\n}\n.un-item .content {\n  flex-grow: 1;\n  font-size: 13px;\n  overflow: hidden;\n}\n.un-item .actions {\n  margin-top: 8px;\n}\n.un-action-btn {\n  cursor: pointer;\n  display: inline-block;\n  padding: 2px 8px;\n  border-radius: 4px;\n  font-size: 12px;\n  text-decoration: none !important;\n  transition: background-color 0.2s;\n}\n.un-action-btn.btnRedSmall {\n  background-color: var(--primary-color);\n  color: #fff !important;\n}\n.un-action-btn.btnRedSmall:hover {\n  background-color: #369cf8;\n}\n.un-action-btn.btnGraySmall {\n  background-color: #eee;\n  color: #666 !important;\n}\n.un-action-btn.btnGraySmall:hover {\n  background-color: #ddd;\n}\nhtml[data-theme=dark] .un-action-btn.btnGraySmall {\n  background-color: #444;\n  color: #ccc !important;\n}\nhtml[data-theme=dark] .un-action-btn.btnGraySmall:hover {\n  background-color: #555;\n}\n.un-widget-title {\n  color: #3e3e3e;\n  display: block;\n  margin-bottom: 4px;\n}\n.un-widget-message {\n  color: #666;\n  display: block;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  margin-bottom: 4px;\n}\nhtml[data-theme=dark] .un-widget-title {\n  color: #e9e9e9;\n}\nhtml[data-theme=dark] .un-widget-message {\n  color: #aaa;\n}\n.un-clear-all {\n  font-size: 12px;\n  color: var(--dollars-text-placeholder) !important;\n  text-decoration: none !important;\n}\n.un-clear-all:hover {\n  color: var(--primary-color) !important;\n}\n@keyframes dollars-fade-in {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.browse-separator {\n  display: block;\n  position: relative;\n  text-align: center;\n  margin: 12px -19px;\n  width: calc(100% + 38px);\n  height: 30px;\n  line-height: 30px;\n  background-color: rgba(var(--primary-color-rgb, 249, 109, 142), 0.1);\n  z-index: 2;\n  pointer-events: none;\n  animation: dollars-fade-in 0.3s ease;\n}\n.browse-separator span {\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--primary-color);\n  background: transparent;\n  border: none;\n  box-shadow: none;\n  padding: 0 12px;\n}\nhtml[data-theme='dark'] .browse-separator {\n  background-color: rgba(249, 109, 142, 0.15);\n}\n.unread-separator {\n  display: block;\n  position: relative;\n  text-align: center;\n  margin: 12px -19px;\n  width: calc(100% + 38px);\n  height: 30px;\n  line-height: 30px;\n  background-color: rgba(255, 255, 255, 0.9);\n  z-index: 2;\n  pointer-events: none;\n  animation: dollars-fade-in 0.3s ease;\n}\n.unread-separator span {\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--primary-color);\n  background: transparent;\n  border: none;\n  box-shadow: none;\n  padding: 0 12px;\n}\nhtml[data-theme='dark'] .unread-separator {\n  background-color: rgba(60, 62, 64, 0.9);\n}\n#dollars-card {\n  transition: transform 0.1s ease-out, box-shadow 0.3s ease;\n  transform-style: preserve-3d;\n  perspective: 1000px;\n  border: 1px solid var(--primary-color) !important;\n  background-color: var(--dollars-bg);\n  cursor: pointer;\n}\n#dollars-card::before {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  z-index: -1;\n  pointer-events: none;\n  background-image:\n    url('https://lsky.ry.mk/i/2026/01/03/background.svg'),\n    linear-gradient(160deg,\n      color-mix(in srgb, var(--primary-color), #a0c4ff 50%) 0%,\n      color-mix(in srgb, var(--primary-color), #ffffff 50%) 50%,\n      color-mix(in srgb, var(--primary-color), #ffc6ff 50%) 100%);\n  background-repeat: repeat, no-repeat;\n  background-position: 300px, center;\n  background-size: 300px auto, cover;\n  background-blend-mode: overlay, normal;\n  opacity: 1;\n  transition: opacity 0.3s ease, background-position 0.1s ease-out;\n}\nhtml[data-theme='dark'] #dollars-card {\n  border: 1px solid var(--primary-color);\n  background: initial;\n}\nhtml[data-theme='dark'] #dollars-card::before {\n  background: linear-gradient(160deg,\n      var(--primary-color) 0%,\n      color-mix(in srgb, var(--primary-color), transparent 40%) 100%);\n  -webkit-mask-image: url('https://lsky.ry.mk/i/2026/01/03/background.svg');\n  mask-image: url('https://lsky.ry.mk/i/2026/01/03/background.svg');\n  mask-repeat: repeat;\n  mask-size: 300px;\n  mask-position: 300px;\n}\n#dollars-card:hover {\n  transform: scale(1.02);\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);\n}\n#dock-chat-link {\n  position: relative;\n}\n#dock-chat-link.flashing {\n  animation: dock-flash 1s ease-in-out infinite;\n}\n@keyframes dock-flash {\n  0%,\n  100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.3;\n  }\n}\n.dock-notif-badge {\n  position: absolute;\n  top: -4px;\n  right: -4px;\n  min-width: 16px;\n  height: 16px;\n  padding: 0 4px;\n  border-radius: 8px;\n  background-color: #f96d8e;\n  color: #fff;\n  font-size: 10px;\n  font-weight: 700;\n  line-height: 16px;\n  text-align: center;\n  display: none;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);\n}\n";

  function injectStyles() {
    if (document.querySelector("[data-dollars-styles]")) return;
    const style = document.createElement("style");
    style.setAttribute("data-dollars-styles", "");
    style.textContent = cssContent;
    document.head.appendChild(style);
  }
  function injectSVGFilters() {
    if (document.querySelector("[data-dollars-svg-filters]")) return;
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("data-dollars-svg-filters", "");
    svg.setAttribute("width", "0");
    svg.setAttribute("height", "0");
    svg.style.cssText = "position:absolute;left:-9999px;top:-9999px;pointer-events:none;z-index:-1;";
    svg.innerHTML = `
        <defs>
            <symbol id="message-tail-filled" viewBox="0 0 11 20">
                <g transform="translate(9 -14)" fill="currentColor" fill-rule="evenodd">
                    <path d="M-6 16h6v17c-.193-2.84-.876-5.767-2.05-8.782-.904-2.325-2.446-4.485-4.625-6.48A1 1 0 01-6 16z" transform="matrix(1 0 0 -1 0 49)" id="corner-fill"/>
                </g>
            </symbol>
        </defs>
    `;
    document.body.appendChild(svg);
  }
  function injectHomeCard() {
    if (window.location.pathname !== "/") return;
    const sideInner = document.querySelector("#columnHomeB .sideInner");
    if (!sideInner) return;
    if (document.getElementById("dollars-card")) return;
    const cardContainer = document.createElement("div");
    cardContainer.className = "featuredItems";
    cardContainer.innerHTML = `
        <div id="dollars-card" class="appItem">
            <a href="#"><p class="title">全站聊天窗💫</p><p>Re:Dollars</p></a>
        </div>
    `;
    sideInner.parentNode?.insertBefore(cardContainer, sideInner);
    const card = document.getElementById("dollars-card");
    if (card && !settings.value.showCard) {
      card.style.display = "none";
    }
    card?.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleChat(!isChatOpen.value);
    });
  }
  function init() {
    injectStyles();
    injectSVGFilters();
    initDollarsAPI();
    const container = document.createElement("div");
    container.id = "dollars-app-mount";
    document.body.appendChild(container);
    G(/* @__PURE__ */ u$2(App, {}), container);
    setTimeout(injectHomeCard, 0);
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
