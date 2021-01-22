(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{78:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return a})),r.d(t,"metadata",(function(){return i})),r.d(t,"toc",(function(){return s})),r.d(t,"default",(function(){return p}));var n=r(3),o=r(7),c=(r(0),r(84)),a={id:"introduction",title:"Introduction",slug:"/"},i={unversionedId:"introduction",id:"introduction",isDocsHomePage:!1,title:"Introduction",description:"ccht is a Node.js library to crawl website and report dead links (broken links), or its wrapper CLI.",source:"@site/docs/introduction.md",slug:"/",permalink:"/ccht/",editUrl:"https://github.com/pocka/ccht/edit/master/website/docs/introduction.md",version:"current",sidebar:"docs",next:{title:"Quick Start",permalink:"/ccht/quickstart"}},s=[{value:"What ccht does",id:"what-ccht-does",children:[]},{value:"What ccht does not",id:"what-ccht-does-not",children:[]}],u={toc:s};function p(e){var t=e.components,r=Object(o.a)(e,["components"]);return Object(c.b)("wrapper",Object(n.a)({},u,r,{components:t,mdxType:"MDXLayout"}),Object(c.b)("p",null,"ccht is a Node.js library to crawl website and report dead links (broken links), or its wrapper CLI.\nThe most common usage is detecting pages or resources that return 4xx/5xx HTTP status code."),Object(c.b)("h2",{id:"what-ccht-does"},"What ccht does"),Object(c.b)("p",null,"At first, ccht loads specified website recursively by Node.js's HTTP module or Headless Chromium browser via ",Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"https://github.com/puppeteer/puppeteer"}),"puppeteer"),".\nThen, ccht reports what pages or assets (we call them ",Object(c.b)("em",{parentName:"p"},"resources"),") we loaded and how was them, such as HTTP status codes or network connection failure."),Object(c.b)("p",null,"You can configure the report threshold.\nFor example, you can switch whether to show HTTP redirect or not."),Object(c.b)("h2",{id:"what-ccht-does-not"},"What ccht does not"),Object(c.b)("p",null,"Site validity check, such as HTML validation or checking HTTP headers.\nYou can use other tools. (e.g. ",Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"https://webhint.io/"}),"webhint"),")"),Object(c.b)("p",null,"You can combine existing softwares with ccht by ",Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"#"}),"JSON reporter")," and ",Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"#"}),"configuring report severity"),"."))}p.isMDXComponent=!0},84:function(e,t,r){"use strict";r.d(t,"a",(function(){return l})),r.d(t,"b",(function(){return h}));var n=r(0),o=r.n(n);function c(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){c(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},c=Object.keys(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var u=o.a.createContext({}),p=function(e){var t=o.a.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},l=function(e){var t=p(e.components);return o.a.createElement(u.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},b=o.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,c=e.originalType,a=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),l=p(r),b=n,h=l["".concat(a,".").concat(b)]||l[b]||d[b]||c;return r?o.a.createElement(h,i(i({ref:t},u),{},{components:r})):o.a.createElement(h,i({ref:t},u))}));function h(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var c=r.length,a=new Array(c);a[0]=b;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i.mdxType="string"==typeof e?e:n,a[1]=i;for(var u=2;u<c;u++)a[u]=r[u];return o.a.createElement.apply(null,a)}return o.a.createElement.apply(null,r)}b.displayName="MDXCreateElement"}}]);