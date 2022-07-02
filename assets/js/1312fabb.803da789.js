"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[380],{3905:function(e,t,r){r.d(t,{Zo:function(){return l},kt:function(){return d}});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function p(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?p(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):p(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},p=Object.keys(e);for(n=0;n<p.length;n++)r=p[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var p=Object.getOwnPropertySymbols(e);for(n=0;n<p.length;n++)r=p[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c=n.createContext({}),u=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},l=function(e){var t=u(e.components);return n.createElement(c.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,p=e.originalType,c=e.parentName,l=o(e,["components","mdxType","originalType","parentName"]),m=u(r),d=a,h=m["".concat(c,".").concat(d)]||m[d]||s[d]||p;return r?n.createElement(h,i(i({ref:t},l),{},{components:r})):n.createElement(h,i({ref:t},l))}));function d(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var p=r.length,i=new Array(p);i[0]=m;var o={};for(var c in t)hasOwnProperty.call(t,c)&&(o[c]=t[c]);o.originalType=e,o.mdxType="string"==typeof e?e:a,i[1]=o;for(var u=2;u<p;u++)i[u]=r[u];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},2520:function(e,t,r){r.r(t),r.d(t,{assets:function(){return c},contentTitle:function(){return i},default:function(){return s},frontMatter:function(){return p},metadata:function(){return o},toc:function(){return u}});var n=r(3117),a=(r(7294),r(3905));const p={title:"Crawl using Headless Chrome (Chromium)"},i=void 0,o={unversionedId:"recipes/puppeteer_crawler",id:"recipes/puppeteer_crawler",title:"Crawl using Headless Chrome (Chromium)",description:"You can crawl a website using Headless Chrome (Chromium) by using Puppeteer Crawler.",source:"@site/docs/recipes/puppeteer_crawler.md",sourceDirName:"recipes",slug:"/recipes/puppeteer_crawler",permalink:"/ccht/recipes/puppeteer_crawler",draft:!1,editUrl:"https://github.com/pocka/ccht/edit/master/website/docs/recipes/puppeteer_crawler.md",tags:[],version:"current",frontMatter:{title:"Crawl using Headless Chrome (Chromium)"},sidebar:"docs",previous:{title:"Excluding URLs",permalink:"/ccht/recipes/exclude_urls"},next:{title:"Using with other program",permalink:"/ccht/recipes/pipe"}},c={},u=[{value:"Setup",id:"setup",level:2},{value:"With <code>puppeteer</code> npm package",id:"with-puppeteer-npm-package",level:3},{value:"Run",id:"run",level:2}],l={toc:u};function s(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},l,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"You can crawl a website using Headless Chrome (Chromium) by using Puppeteer Crawler."),(0,a.kt)("p",null,"The Puppeteer Crawler does not only check pages, but also other site resources such as images, CSS files, and JavaScript files."),(0,a.kt)("h2",{id:"setup"},"Setup"),(0,a.kt)("h3",{id:"with-puppeteer-npm-package"},"With ",(0,a.kt)("inlineCode",{parentName:"h3"},"puppeteer")," npm package"),(0,a.kt)("p",null,"In order to use Puppeteer Crawler, you need to make sure you have valid Chrome (Chromium) installation available.\nThe easiest way to do this is use ccht as a project dependency and install ",(0,a.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/puppeteer"},(0,a.kt)("inlineCode",{parentName:"a"},"puppeteer")," package"),".\nThe ",(0,a.kt)("inlineCode",{parentName:"p"},"puppeteer")," package automatically downloads the latest Chromium binary at installation.\nccht use the binary if the ",(0,a.kt)("inlineCode",{parentName:"p"},"puppeteer")," package is available."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"$ yarn add -D ccht puppeteer\n\n# or\n$ npm i -D ccht puppeteer\n")),(0,a.kt)("h2",{id:"run"},"Run"),(0,a.kt)("p",null,"Using Puppeteer Crawler is simple: just add ",(0,a.kt)("inlineCode",{parentName:"p"},"--crawler puppeteer"),"."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"$ npx ccht --crawler puppeteer https://example.com\n")))}s.isMDXComponent=!0}}]);