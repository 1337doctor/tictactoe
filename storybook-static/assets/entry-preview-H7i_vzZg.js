import{h as c,c as _,i as h,a as T,r as d}from"./vue.esm-bundler-RGxD8kB_.js";const{sanitizeStoryContextUpdate:U}=__STORYBOOK_MODULE_PREVIEW_API__;function b(e){return typeof e=="function"?{render:e,name:e.name}:e}function m(e,r){let t=e;return t===null?null:typeof t=="function"?t:r?{...b(t),components:{...t.components||{},story:r}}:{render(){return c(t)}}}function y(e,r){return r.reduce((t,s)=>a=>{let n,i=s(o=>{let u=U(o);return o&&(u.args=Object.assign(a.args,u.args)),n=t({...a,...u}),n},a);return n||(n=t(a)),i===n?n:m(i,()=>c(n))},t=>m(e(t)))}var I=(e,r)=>{let{id:t,component:s}=r;if(!s)throw new Error(`Unable to render story ${t} as the component annotation is missing from the default export`);return()=>c(s,e,P(e,r))},N=async(e,r)=>{globalThis&&globalThis.PLUGINS_SETUP_FUNCTIONS&&await Promise.all([...globalThis.PLUGINS_SETUP_FUNCTIONS].map(t=>t(e,r)))},l=new Map;async function z({storyFn:e,forceRemount:r,showMain:t,showException:s,storyContext:a,id:n},i){let o=l.get(i);if(o&&!r){let p=e(),f=O(p,a);return j(o.reactiveArgs,f),()=>{g(o.vueApp,i)}}o&&r&&g(o.vueApp,i);let u=_({setup(){a.args=d(a.args);let p=e(),f=O(p,a),S={vueApp:u,reactiveArgs:d(f)};return l.set(i,S),()=>c(p)}});return u.config.errorHandler=p=>s(p),await N(u,a),u.mount(i),t(),()=>{g(u,i)}}function P(e,r){let{argTypes:t}=r,s=Object.entries(e).filter(([a])=>{var n,i;return((i=(n=t[a])==null?void 0:n.table)==null?void 0:i.category)==="slots"}).map(([a,n])=>[a,typeof n=="function"?n:()=>n]);return Object.fromEntries(s)}function O(e,r){return e.props&&h(e)?e.props:r.args}function j(e,r){if(Object.keys(r).length===0)return;let t=T(e)?e:d(e);Object.keys(t).forEach(s=>{s in r||delete t[s]}),Object.assign(t,r)}function g(e,r){e==null||e.unmount(),l.has(r)&&l.delete(r)}var A={renderer:"vue3"};export{y as applyDecorators,A as parameters,I as render,z as renderToCanvas};
