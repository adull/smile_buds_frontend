"use strict";var precacheConfig=[["/index.html","7d41f08a3f71747d993fe3d703e3e6ab"],["/static/css/main.70aaca14.css","8863f6ae6fd9efe714779660aeedf8b8"],["/static/js/main.b8aa89ce.js","3582222725bf80b9a3b38ff836df69a5"],["/static/media/andale-mono.9faaf134.ttf","9faaf134a8aaa30693588ef25366d64e"],["/static/media/arial-rounded-bold.8aa0ab49.ttf","8aa0ab4926aab1d490776698703ad0f5"],["/static/media/balloon.01df0d09.svg","01df0d092af9abe977ad29d3fa89cb04"],["/static/media/comic-sans.19a8e4fe.ttf","19a8e4fe8653a16013b0e20b53813a7e"],["/static/media/halloween-chat.606898f1.png","606898f1ea9598bfc15e09b778f1c16d"],["/static/media/halloween-diamong.368a20a2.png","368a20a2503b83ffe4d68a6cdd4c5497"],["/static/media/halloween-grin-icon.4660a958.png","4660a9582af31f5a08d6b36ad94ac4a9"],["/static/media/halloween-paw.def86710.png","def8671091341fbb6c16f70f928200bf"],["/static/media/halloween-star.1a9c8026.png","1a9c8026426e2583ff7f6c40af93b60f"],["/static/media/halloween-umbrella.54953788.png","54953788501a5586859a8a3c38777a9d"],["/static/media/smile.235abb7c.png","235abb7ca0ebbb8b9a43b7edfdd17115"],["/static/media/smile_buds.721d2d89.png","721d2d891f88df7c7ca8200d7c293b54"],["/static/media/spooky_buds.d148d366.png","d148d366bf20552b46744dce63ac28a0"],["/static/media/we_laugh.87d6101a.png","87d6101a09654af28387eedf56857dfb"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(a){return a.redirected?("body"in a?Promise.resolve(a.body):a.blob()).then(function(e){return new Response(e,{headers:a.headers,status:a.status,statusText:a.statusText})}):Promise.resolve(a)},createCacheKey=function(e,a,t,n){var r=new URL(e);return n&&r.pathname.match(n)||(r.search+=(r.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),r.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(a){return t.every(function(e){return!e.test(a[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],n=new URL(a,self.location),r=createCacheKey(n,hashParamName,t,/\.\w{8}\./);return[n.toString(),r]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(n){return setOfCachedUrls(n).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var e=new Request(a,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+a+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return n.put(a,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(a){return a.keys().then(function(e){return Promise.all(e.map(function(e){if(!t.has(e.url))return a.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(a){if("GET"===a.request.method){var e,t=stripIgnoredUrlParameters(a.request.url,ignoreUrlParametersMatching),n="index.html";(e=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,n),e=urlsToCacheKeys.has(t));var r="/index.html";!e&&"navigate"===a.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],a.request.url)&&(t=new URL(r,self.location).toString(),e=urlsToCacheKeys.has(t)),e&&a.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',a.request.url,e),fetch(a.request)}))}});