"use strict";var precacheConfig=[["/index.html","1e52ac5d1d884ddb8c6ac51f103af89a"],["/static/css/main.94624324.css","597684c0c807da8c04e90d84f31df6a5"],["/static/js/main.f50c4ded.js","2bffc9773aa28b5989add4331f182348"],["/static/media/andale-mono.9faaf134.ttf","9faaf134a8aaa30693588ef25366d64e"],["/static/media/arial-rounded-bold.8aa0ab49.ttf","8aa0ab4926aab1d490776698703ad0f5"],["/static/media/balloon.01df0d09.svg","01df0d092af9abe977ad29d3fa89cb04"],["/static/media/chat.df357a36.png","df357a3646c2046e3889c97e9f0a5bb7"],["/static/media/comic-sans.19a8e4fe.ttf","19a8e4fe8653a16013b0e20b53813a7e"],["/static/media/diamong.c8b0fc60.png","c8b0fc604e79c8f16e3318885580c32d"],["/static/media/grin-icon.d37e1559.png","d37e1559388980342cbf7ec3dc1df8ec"],["/static/media/smile.235abb7c.png","235abb7ca0ebbb8b9a43b7edfdd17115"],["/static/media/smile_buds.721d2d89.png","721d2d891f88df7c7ca8200d7c293b54"],["/static/media/star.251dca22.png","251dca22d1570542d47a6e8332cc8368"],["/static/media/umbrella.78804997.png","788049974a81925d9caa646860c53a89"],["/static/media/we_laugh.87d6101a.png","87d6101a09654af28387eedf56857dfb"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,a,n){var r=new URL(e);return n&&r.pathname.match(n)||(r.search+=(r.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),r.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return a.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],n=new URL(t,self.location),r=createCacheKey(n,hashParamName,a,/\.\w{8}\./);return[n.toString(),r]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(n){return setOfCachedUrls(n).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return n.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!a.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,a=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),n="index.html";(e=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,n),e=urlsToCacheKeys.has(a));var r="/index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(a=new URL(r,self.location).toString(),e=urlsToCacheKeys.has(a)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});