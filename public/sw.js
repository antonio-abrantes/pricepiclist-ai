if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,a)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let t={};const d=e=>i(e,c),r={module:{uri:c},exports:t,require:d};s[c]=Promise.all(n.map((e=>r[e]||d(e)))).then((e=>(a(...e),t)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"7deb6689fa2fc80d176dd461a3e5122d"},{url:"/_next/static/J_dPlv2Ww9i1iPGS0JnsL/_buildManifest.js",revision:"ae9eef61ecb4f32528f2e03fce5305d0"},{url:"/_next/static/J_dPlv2Ww9i1iPGS0JnsL/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/329-83bf08dfdf0fc19f.js",revision:"J_dPlv2Ww9i1iPGS0JnsL"},{url:"/_next/static/chunks/396-0e4d9c49c5c0d6ee.js",revision:"J_dPlv2Ww9i1iPGS0JnsL"},{url:"/_next/static/chunks/424-7e4e7eb6a592193c.js",revision:"J_dPlv2Ww9i1iPGS0JnsL"},{url:"/_next/static/chunks/488-d81d9e22762c1154.js",revision:"J_dPlv2Ww9i1iPGS0JnsL"},{url:"/_next/static/chunks/513-75a4ecbd7ac532e2.js",revision:"J_dPlv2Ww9i1iPGS0JnsL"},{url:"/_next/static/chunks/574-ff69606b9c2e3c7c.js",revision:"J_dPlv2Ww9i1iPGS0JnsL"},{url:"/_next/static/chunks/61-214ad386b88d75ae.js",revision:"J_dPlv2Ww9i1iPGS0JnsL"},{url:"/_next/static/chunks/698-6eaf48527e7b6ac1.js",revision:"J_dPlv2Ww9i1iPGS0JnsL"},{url:"/_next/static/chunks/826-0e78cdbb987ac5b0.js",revision:"J_dPlv2Ww9i1iPGS0JnsL"},{url:"/_next/static/chunks/83-d062ef063b21b246.js",revision:"J_dPlv2Ww9i1iPGS0JnsL"},{url:"/_next/static/chunks/864-30c5d373fec1fe59.js",revision:"J_dPlv2Ww9i1iPGS0JnsL"},{url:"/_next/static/chunks/8e1d74a4-487a0999c60eb38e.js",revision:"J_dPlv2Ww9i1iPGS0JnsL"},{url:"/_next/static/chunks/906-f0ecfaccd4eeb4d7.js",revision:"J_dPlv2Ww9i1iPGS0JnsL"},{url:"/_next/static/chunks/app/_not-found-c131fa79e299d693.js",revision:"J_dPlv2Ww9i1iPGS0JnsL"},{url:"/_next/static/chunks/app/layout-e5f3a78e0133e347.js",revision:"J_dPlv2Ww9i1iPGS0JnsL"},{url:"/_next/static/chunks/app/list/%5Bid%5D/page-d379d71728e95ee1.js",revision:"J_dPlv2Ww9i1iPGS0JnsL"},{url:"/_next/static/chunks/app/page-edc8068b628eb94d.js",revision:"J_dPlv2Ww9i1iPGS0JnsL"},{url:"/_next/static/chunks/app/profile/page-0ecc33cf61a57fc6.js",revision:"J_dPlv2Ww9i1iPGS0JnsL"},{url:"/_next/static/chunks/app/security/page-aea594208e703218.js",revision:"J_dPlv2Ww9i1iPGS0JnsL"},{url:"/_next/static/chunks/app/settings/page-d48e6f0cc75c2c8f.js",revision:"J_dPlv2Ww9i1iPGS0JnsL"},{url:"/_next/static/chunks/fd9d1056-66cbff9a6a18e591.js",revision:"J_dPlv2Ww9i1iPGS0JnsL"},{url:"/_next/static/chunks/framework-8883d1e9be70c3da.js",revision:"J_dPlv2Ww9i1iPGS0JnsL"},{url:"/_next/static/chunks/main-79c01fb1e3dea3e5.js",revision:"J_dPlv2Ww9i1iPGS0JnsL"},{url:"/_next/static/chunks/main-app-65185cf534b00d30.js",revision:"J_dPlv2Ww9i1iPGS0JnsL"},{url:"/_next/static/chunks/pages/_app-27277a117f49dcf1.js",revision:"J_dPlv2Ww9i1iPGS0JnsL"},{url:"/_next/static/chunks/pages/_error-91a5938854a6f402.js",revision:"J_dPlv2Ww9i1iPGS0JnsL"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-b755bda4db359320.js",revision:"J_dPlv2Ww9i1iPGS0JnsL"},{url:"/_next/static/css/2ca243aed2afac46.css",revision:"2ca243aed2afac46"},{url:"/_next/static/media/26a46d62cd723877-s.woff2",revision:"befd9c0fdfa3d8a645d5f95717ed6420"},{url:"/_next/static/media/55c55f0601d81cf3-s.woff2",revision:"43828e14271c77b87e3ed582dbff9f74"},{url:"/_next/static/media/581909926a08bbc8-s.woff2",revision:"f0b86e7c24f455280b8df606b89af891"},{url:"/_next/static/media/6d93bde91c0c2823-s.woff2",revision:"621a07228c8ccbfd647918f1021b4868"},{url:"/_next/static/media/97e0cb1ae144a2a9-s.woff2",revision:"e360c61c5bd8d90639fd4503c829c2dc"},{url:"/_next/static/media/a34f9d1faa5f3315-s.p.woff2",revision:"d4fe31e6a2aebc06b8d6e558c9141119"},{url:"/_next/static/media/df0a9ae256c0569c-s.woff2",revision:"d54db44de5ccb18886ece2fda72bdfe0"},{url:"/apple-icon.png",revision:"56d851ecdf2f72afc217927a5ebe69a0"},{url:"/favicon.ico",revision:"ba1b7d68af45717698924df1abc909fd"},{url:"/icon-192x192.png",revision:"8a4bf343a829374fb3317550d14aa03e"},{url:"/icon-512x512.png",revision:"497d8f87aae312ddf0ecc95cf953ef09"},{url:"/icon.ico",revision:"ba1b7d68af45717698924df1abc909fd"},{url:"/manifest.json",revision:"31ed2d55119caddc8b41ace244ee5e2a"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:i,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
