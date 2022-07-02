"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[501],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return m}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),l=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=l(e.components);return r.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),d=l(n),m=a,h=d["".concat(s,".").concat(m)]||d[m]||u[m]||o;return n?r.createElement(h,i(i({ref:t},p),{},{components:n})):r.createElement(h,i({ref:t},p))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=d;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:a,i[1]=c;for(var l=2;l<o;l++)i[l]=n[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},6558:function(e,t,n){n.r(t),n.d(t,{assets:function(){return s},contentTitle:function(){return i},default:function(){return u},frontMatter:function(){return o},metadata:function(){return c},toc:function(){return l}});var r=n(3117),a=(n(7294),n(3905));const o={title:"Node API",slug:"/api"},i=void 0,c={unversionedId:"node_api",id:"node_api",title:"Node API",description:"[types-ts]//github.com/pocka/ccht/blob/master/src/types.ts",source:"@site/docs/node_api.md",sourceDirName:".",slug:"/api",permalink:"/ccht/api",draft:!1,editUrl:"https://github.com/pocka/ccht/edit/master/website/docs/node_api.md",tags:[],version:"current",frontMatter:{title:"Node API",slug:"/api"},sidebar:"api",previous:{title:"CLI",permalink:"/ccht/cli"}},s={},l=[{value:"Basic Usage",id:"basic-usage",level:2},{value:"Using your own crawler",id:"using-your-own-crawler",level:2}],p={toc:l};function u(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"With ccht's Node.js API, you have more control over crawling and reporting.\nIn fact, ",(0,a.kt)("inlineCode",{parentName:"p"},"ccht")," CLI is just a wrapper for the Node.js API."),(0,a.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,a.kt)("div",{parentName:"div",className:"admonition-heading"},(0,a.kt)("h5",{parentName:"div"},(0,a.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,a.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,a.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"TL;DR")),(0,a.kt)("div",{parentName:"div",className:"admonition-content"},(0,a.kt)("p",{parentName:"div"},"See ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/pocka/ccht/blob/master/src/types.ts"},"our type definition file"),"."))),(0,a.kt)("h2",{id:"basic-usage"},"Basic Usage"),(0,a.kt)("p",null,"Run ",(0,a.kt)("inlineCode",{parentName:"p"},"checkAndReport")," function with a crawler and JSON Reporter.\nThis will cover the most of usecases."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="Get a result in JSON"',title:'"Get',a:!0,result:!0,in:!0,'JSON"':!0},'import { checkAndReport, NodeHttpCrawler, JsonReporter } from "ccht";\n\nconst results = await checkAndReport(\n  new NodeHttpCrawler({\n    concurrency: 1,\n    timeout: 5000,\n    useragent: "ccht/node",\n  }),\n  new JsonReporter({}),\n  "https://example.com",\n  {\n    // [Required]\n    // You need set includeUrls manually\n    includeUrls: ["https://example.com"],\n\n    // [Required]\n    excludeUrls: [\n      // You can use RegExp and Function for match patterns!\n      // (same for includeUrls)\n      /\\.htm$/,\n      (url) => url.includes("auth"),\n    ],\n\n    // [Required]\n    expectedStatus: /^[123]\\d\\d$/,\n\n    reportTypes: ["error", "unexpected_status"],\n\n    // [Required]\n    reportSeverities: ["danger", "warning", "info", "debug"],\n\n    // [Required]\n    exitErrorSeverities: ["danger"],\n  }\n);\n\n// Since reporter always emits strings, you need to deserialize the result.\nconsole.log(JSON.parse(results));\n')),(0,a.kt)("p",null,"For more about the checker options, see ",(0,a.kt)("inlineCode",{parentName:"p"},"CheckerOptions")," in ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/pocka/ccht/blob/master/src/types.ts"},(0,a.kt)("inlineCode",{parentName:"a"},"types.ts")),"."),(0,a.kt)("h2",{id:"using-your-own-crawler"},"Using your own crawler"),(0,a.kt)("p",null,"Crawler is a simple JavaScript object, implements ",(0,a.kt)("inlineCode",{parentName:"p"},"visit")," method and ",(0,a.kt)("inlineCode",{parentName:"p"},"destroy")," method."),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"visit")," async method takes an URL, checks for it somehow, and returns URLs to be crawled later.\nTo crawl effeciently, you should set and check the second parameter, which is a Map of ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/pocka/ccht/blob/master/src/types.ts#L1"},(0,a.kt)("inlineCode",{parentName:"a"},"VisitedLink")," object"),". A caller checks duplication too, but you need check in the ",(0,a.kt)("inlineCode",{parentName:"p"},"visit")," method especially if your crawler support concurrency."),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"destroy")," async method will be called when there is no more resources to crawl.\nFree resources in the method (or don't, but your crawler must have the method)."),(0,a.kt)("p",null,"See more at ",(0,a.kt)("inlineCode",{parentName:"p"},"interface Crawler")," in ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/pocka/ccht/blob/master/src/types.ts"},(0,a.kt)("inlineCode",{parentName:"a"},"types.ts")),"."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="Ways to implement crawlers"',title:'"Ways',to:!0,implement:!0,'crawlers"':!0},'import { checkAndReport } from "ccht";\nimport fetch from "node-fetch";\n\n// Simple object with required methods\nconst objectCrawler = {\n  async visit(url, visited) {\n    /*...*/\n  },\n  async destroy() {\n    /*...*/\n  },\n};\n\nawait checkAndReport(objectCrawler /*...*/);\n\n// A function that returns a crawle\nconst functionCrawler = (...params) => {\n  return {\n    async visit(url, visited) {\n      /*...*/\n    },\n    async destroy() {\n      /*...*/\n    },\n  };\n};\n\nawait checkAndReport(functionCrawler(foo) /*...*/);\n\n// Class style\nclass ClassCrawler {\n  async visit(url, visited) {\n    /*...*/\n  }\n\n  async destroy() {\n    /*...*/\n  }\n}\n\nawait checkAndReport(new ClassCrawler() /*...*/);\n\n// If you\'re using TypeScript, you should use `Crawler` interface type.\nclass ClassCrawler implements Crawler {\n  /*...*/\n}\nconst objectCrawler: Crawler = {\n  /*...*/\n};\nconst functionCrawler = (): Crawler => {\n  /*...*/\n};\n')))}u.isMDXComponent=!0}}]);