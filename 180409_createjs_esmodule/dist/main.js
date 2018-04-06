!function(t){var e={};function i(s){if(e[s])return e[s].exports;var r=e[s]={i:s,l:!1,exports:{}};return t[s].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=t,i.c=e,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:s})},i.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e,s){"use strict";s.r(e);
/**
 * @license Event
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2017 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
class r{constructor(t,e=!1,i=!1){this.type=t,this.target=null,this.currentTarget=null,this.eventPhase=0,this.bubbles=e,this.cancelable=i,this.timeStamp=(new Date).getTime(),this.defaultPrevented=!1,this.propagationStopped=!1,this.immediatePropagationStopped=!1,this.removed=!1}preventDefault(){return this.defaultPrevented=this.cancelable,this}stopPropagation(){return this.propagationStopped=!0,this}stopImmediatePropagation(){return this.immediatePropagationStopped=this.propagationStopped=!0,this}remove(){return this.removed=!0,this}clone(){const t=new r(this.type,this.bubbles,this.cancelable);for(let e in this)this.hasOwnProperty(e)&&(t[e]=this[e]);return t}set(t){for(let e in t)this[e]=t[e];return this}toString(){return`[${this.constructor.name} (type=${this.type})]`}}var h=r;
/**
 * @license EventDispatcher
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2017 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */class n{static initialize(t){const e=n.prototype;t.addEventListener=e.addEventListener,t.on=e.on,t.removeEventListener=t.off=e.removeEventListener,t.removeAllEventListeners=e.removeAllEventListeners,t.hasEventListener=e.hasEventListener,t.dispatchEvent=e.dispatchEvent,t._dispatchEvent=e._dispatchEvent,t.willTrigger=e.willTrigger}constructor(){this._listeners=null,this._captureListeners=null}addEventListener(t,e,i=!1){let s,r=(s=i?this._captureListeners=this._captureListeners||{}:this._listeners=this._listeners||{})[t];return r&&(this.removeEventListener(t,e,i),r=s[t]),r?r.push(e):s[t]=[e],e}on(t,e,i=null,s=!1,r={},h=!1){return e.handleEvent&&(i=i||e,e=e.handleEvent),i=i||this,this.addEventListener(t,t=>{e.call(i,t,r),s&&t.remove()},h)}removeEventListener(t,e,i=!1){const s=i?this._captureListeners:this._listeners;if(!s)return;const r=s[t];if(!r)return;const h=r.length;for(let i=0;i<h;i++)if(r[i]===e){1===h?delete s[t]:r.splice(i,1);break}}off(t,e,i=!1){this.removeEventListener(t,e,i)}removeAllEventListeners(t=null){t?(this._listeners&&delete this._listeners[t],this._captureListeners&&delete this._captureListeners[t]):this._listeners=this._captureListeners=null}dispatchEvent(t,e=!1,i=!1){if("string"==typeof t){const s=this._listeners;if(!(e||s&&s[t]))return!0;t=new h(t,e,i)}else t.target&&t.clone&&(t=t.clone());try{t.target=this}catch(t){}if(t.bubbles&&this.parent){let e=this;const i=[e];for(;e.parent;)i.push(e=e.parent);const s=i.length;let r;for(r=s-1;r>=0&&!t.propagationStopped;r--)i[r]._dispatchEvent(t,1+(0==r));for(r=1;r<s&&!t.propagationStopped;r++)i[r]._dispatchEvent(t,3)}else this._dispatchEvent(t,2);return!t.defaultPrevented}hasEventListener(t){const e=this._listeners,i=this._captureListeners;return!!(e&&e[t]||i&&i[t])}willTrigger(t){let e=this;for(;e;){if(e.hasEventListener(t))return!0;e=e.parent}return!1}toString(){return`[${this.constructor.name+this.name?` ${this.name}`:""}]`}_dispatchEvent(t,e){const i=1===e?this._captureListeners:this._listeners;if(t&&i){let s,r=i[t.type];if(!r||0===(s=r.length))return;try{t.currentTarget=this}catch(t){}try{t.eventPhase=e}catch(t){}t.removed=!1,r=r.slice();for(let i=0;i<s&&!t.immediatePropagationStopped;i++){let s=r[i];s.handleEvent?s.handleEvent(t):s(t),t.removed&&(this.off(t.type,s,1===e),t.removed=!1)}}}}var a=n;
/*
* @license UID
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2017 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/let o=0;class l{constructor(){throw"UID cannot be instantiated"}static get _nextID(){return o}static set _nextID(t){o=t}static get(){return l._nextID++}}
/*
* @license Point
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2017 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/class c{constructor(t=0,e=0){this.setValues(t,e)}setValues(t=0,e=0){return this.x=t,this.y=e,this}copy(t){return this.x=t.x,this.y=t.y,this}clone(){return new c(this.x,this.y)}toString(){return`[${this.constructor.name} (x=${this.x} y=${this.y})]`}}
/*
* @license Matrix2D
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2017 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/class u{constructor(t=1,e=0,i=0,s=1,r=0,h=0){this.setValues(t,e,i,s,r,h)}setValues(t=1,e=0,i=0,s=1,r=0,h=0){return this.a=t,this.b=e,this.c=i,this.d=s,this.tx=r,this.ty=h,this}append(t,e,i,s,r,h){let n=this.a,a=this.b,o=this.c,l=this.d;return 1==t&&0==e&&0==i&&1==s||(this.a=n*t+o*e,this.b=a*t+l*e,this.c=n*i+o*s,this.d=a*i+l*s),this.tx=n*r+o*h+this.tx,this.ty=a*r+l*h+this.ty,this}prepend(t,e,i,s,r,h){let n=this.a,a=this.c,o=this.tx;return this.a=t*n+i*this.b,this.b=e*n+s*this.b,this.c=t*a+i*this.d,this.d=e*a+s*this.d,this.tx=t*o+i*this.ty+r,this.ty=e*o+s*this.ty+h,this}appendMatrix(t){return this.append(t.a,t.b,t.c,t.d,t.tx,t.ty)}prependMatrix(t){return this.prepend(t.a,t.b,t.c,t.d,t.tx,t.ty)}appendTransform(t,e,i,s,r,h,n,a,o){let l,c,d;return r%360?(l=r*u.DEG_TO_RAD,c=Math.cos(l),d=Math.sin(l)):(c=1,d=0),h||n?(h*=u.DEG_TO_RAD,n*=u.DEG_TO_RAD,this.append(Math.cos(n),Math.sin(n),-Math.sin(h),Math.cos(h),t,e),this.append(c*i,d*i,-d*s,c*s,0,0)):this.append(c*i,d*i,-d*s,c*s,t,e),(a||o)&&(this.tx-=a*this.a+o*this.c,this.ty-=a*this.b+o*this.d),this}prependTransform(t,e,i,s,r,h,n,a,o){let l,c,d;return r%360?(l=r*u.DEG_TO_RAD,c=Math.cos(l),d=Math.sin(l)):(c=1,d=0),(a||o)&&(this.tx-=a,this.ty-=o),h||n?(h*=u.DEG_TO_RAD,n*=u.DEG_TO_RAD,this.prepend(c*i,d*i,-d*s,c*s,0,0),this.prepend(Math.cos(n),Math.sin(n),-Math.sin(h),Math.cos(h),t,e)):this.prepend(c*i,d*i,-d*s,c*s,t,e),this}rotate(t){t*=u.DEG_TO_RAD;let e=Math.cos(t),i=Math.sin(t),s=this.a,r=this.b;return this.a=s*e+this.c*i,this.b=r*e+this.d*i,this.c=-s*i+this.c*e,this.d=-r*i+this.d*e,this}skew(t,e){return t*=u.DEG_TO_RAD,e*=u.DEG_TO_RAD,this.append(Math.cos(e),Math.sin(e),-Math.sin(t),Math.cos(t),0,0),this}scale(t,e){return this.a*=t,this.b*=t,this.c*=e,this.d*=e,this}translate(t,e){return this.tx+=this.a*t+this.c*e,this.ty+=this.b*t+this.d*e,this}identity(){return this.a=this.d=1,this.b=this.c=this.tx=this.ty=0,this}invert(){let t=this.a,e=this.b,i=this.c,s=this.d,r=this.tx,h=t*s-e*i;return this.a=s/h,this.b=-e/h,this.c=-i/h,this.d=t/h,this.tx=(i*this.ty-s*r)/h,this.ty=-(t*this.ty-e*r)/h,this}isIdentity(){return 0===this.tx&&0===this.ty&&1===this.a&&0===this.b&&0===this.c&&1===this.d}equals(t){return this.tx===t.tx&&this.ty===t.ty&&this.a===t.a&&this.b===t.b&&this.c===t.c&&this.d===t.d}transformPoint(t,e,i=new c){return i.x=t*this.a+e*this.c+this.tx,i.y=t*this.b+e*this.d+this.ty,i}decompose(t={}){t.x=this.tx,t.y=this.ty,t.scaleX=Math.sqrt(this.a*this.a+this.b*this.b),t.scaleY=Math.sqrt(this.c*this.c+this.d*this.d);let e=Math.atan2(-this.c,this.d),i=Math.atan2(this.b,this.a);return Math.abs(1-e/i)<1e-5?(t.rotation=i/u.DEG_TO_RAD,this.a<0&&this.d>=0&&(t.rotation+=t.rotation<=0?180:-180),t.skewX=t.skewY=0):(t.skewX=e/u.DEG_TO_RAD,t.skewY=i/u.DEG_TO_RAD),t}copy(t){return this.setValues(t.a,t.b,t.c,t.d,t.tx,t.ty)}clone(){return new u(this.a,this.b,this.c,this.d,this.tx,this.ty)}toString(){return`[${this.constructor.name} (a=${this.a} b=${this.b} c=${this.c} d=${this.d} tx=${this.tx} ty=${this.ty})]`}}u.DEG_TO_RAD=Math.PI/180,u.identity=new u;
/*
* @license DisplayProps
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2017 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/
class d{constructor(t=!0,e=1,i,s,r){this.setValues(t,e,i,s,r)}setValues(t=!0,e=1,i,s,r){return this.visible=t,this.alpha=e,this.shadow=i,this.compositeOperation=s,this.matrix=r||this.matrix&&this.matrix.identity()||new u,this}append(t,e,i,s,r){return this.alpha*=e,this.shadow=i||this.shadow,this.compositeOperation=s||this.compositeOperation,this.visible=this.visible&&t,r&&this.matrix.appendMatrix(r),this}prepend(t,e,i,s,r){return this.alpha*=e,this.shadow=this.shadow||i,this.compositeOperation=this.compositeOperation||s,this.visible=this.visible&&t,r&&this.matrix.prependMatrix(r),this}identity(){return this.visible=!0,this.alpha=1,this.shadow=this.compositeOperation=null,this.matrix.identity(),this}clone(){return new d(this.alpha,this.shadow,this.compositeOperation,this.visible,this.matrix.clone())}}
/*
* @license Rectangle
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2017 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/class p{constructor(t=0,e=0,i=0,s=0){this.setValues(t,e,i,s)}setValues(t=0,e=0,i=0,s=0){return this.x=t,this.y=e,this.width=i,this.height=s,this}extend(t,e,i=0,s=0){return t+i>this.x+this.width&&(this.width=t+i-this.x),e+s>this.y+this.height&&(this.height=e+s-this.y),t<this.x&&(this.width+=this.x-t,this.x=t),e<this.y&&(this.height+=this.y-e,this.y=e),this}pad(t,e,i,s){return this.x-=e,this.y-=t,this.width+=e+s,this.height+=t+i,this}copy(t){return this.setValues(t.x,t.y,t.width,t.height)}contains(t,e,i=0,s=0){return t>=this.x&&t+i<=this.x+this.width&&e>=this.y&&e+s<=this.y+this.height}union(t){return this.clone().extend(t.x,t.y,t.width,t.height)}intersection(t){let e=t.x,i=t.y,s=e+t.width,r=i+t.height;return this.x>e&&(e=this.x),this.y>i&&(i=this.y),this.x+this.width<s&&(s=this.x+this.width),this.y+this.height<r&&(r=this.y+this.height),s<=e||r<=i?null:new p(e,i,s-e,r-i)}intersects(t){return t.x<=this.x+this.width&&this.x<=t.x+t.width&&t.y<=this.y+this.height&&this.y<=t.y+t.height}isEmpty(){return this.width<=0||this.height<=0}clone(){return new p(this.x,this.y,this.width,this.height)}toString(){return`[${this.constructor.name} (x=${this.x} y=${this.y} width=${this.width} height=${this.height})]`}}
/*
* @license Filter
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2017 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/class _{constructor(){this.usesContext=!1,this._multiPass=null,this.VTX_SHADER_BODY=null,this.FRAG_SHADER_BODY=null}getBounds(t){return t}shaderParamSetup(t,e,i){}applyFilter(t,e,i,s,r,h,n,a){h=h||t,null==n&&(n=e),null==a&&(a=i);try{let o=t.getImageData(e,i,s,r);if(this._applyFilter(o))return h.putImageData(o,n,a),!0}catch(t){}return!1}toString(){return`[${this.constructor.name}]`}clone(){return new _}_applyFilter(t){return!0}}
/**
 * @license
 *
 * StageGL
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2017 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */var g=class{constructor(){throw new Error("\n\t\t\tStageGL is not currently supported on the EaselJS 2.0 branch.\n\t\t\tEnd of Q1 2018 is targetted for StageGL support.\n\t\t\tFollow @CreateJS on Twitter for updates.\n\t\t")}};
/*
* @license Filter
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2017 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/class m extends _{constructor(){super(),this.width=void 0,this.height=void 0,this.x=void 0,this.y=void 0,this.scale=1,this.offX=0,this.offY=0,this.cacheID=0,this._filterOffX=0,this._filterOffY=0,this._cacheDataURLID=0,this._cacheDataURL=null,this._drawWidth=0,this._drawHeight=0,this._boundRect=new p}static getFilterBounds(t,e=new p){let i=t.filters,s=i&&i.length;if(!!s<=0)return e;for(let t=0;t<s;t++){let s=i[t];if(!s||!s.getBounds)continue;let r=s.getBounds();r&&(0==t?e.setValues(r.x,r.y,r.width,r.height):e.extend(r.x,r.y,r.width,r.height))}return e}define(t,e=0,i=0,s=1,r=1,h=1,n){if(!t)throw"No symbol to cache";this._options=n,this._useWebGL=void 0!==n,this.target=t,this.width=s>=1?s:1,this.height=r>=1?r:1,this.x=e,this.y=i,this.scale=h,this.update()}update(t){if(!this.target)throw"define() must be called before update()";let e=m.getFilterBounds(this.target),i=this.target.cacheCanvas;this._drawWidth=Math.ceil(this.width*this.scale)+e.width,this._drawHeight=Math.ceil(this.height*this.scale)+e.height,i&&this._drawWidth==i.width&&this._drawHeight==i.height||this._updateSurface(),this._filterOffX=e.x,this._filterOffY=e.y,this.offX=this.x*this.scale+this._filterOffX,this.offY=this.y*this.scale+this._filterOffY,this._drawToCache(t),this.cacheID=this.cacheID?this.cacheID+1:1}release(){let t=this.target.stage;this._useWebGL&&this._webGLCache?(this._webGLCache.isCacheControlled||(this.__lastRT&&(this.__lastRT=void 0),this.__rtA&&this._webGLCache._killTextureObject(this.__rtA),this.__rtB&&this._webGLCache._killTextureObject(this.__rtB),this.target&&this.target.cacheCanvas&&this._webGLCache._killTextureObject(this.target.cacheCanvas)),this._webGLCache=!1):t instanceof g&&t.releaseTexture(this.target.cacheCanvas),this.target=this.target.cacheCanvas=null,this.cacheID=this._cacheDataURLID=this._cacheDataURL=void 0,this.width=this.height=this.x=this.y=this.offX=this.offY=0,this.scale=1}getCacheDataURL(){let t=this.target&&this.target.cacheCanvas;return t?(this.cacheID!=this._cacheDataURLID&&(this._cacheDataURLID=this.cacheID,this._cacheDataURL=t.toDataURL?t.toDataURL():null),this._cacheDataURL):null}draw(t){return!!this.target&&(t.drawImage(this.target.cacheCanvas,this.x+this._filterOffX/this.scale,this.y+this._filterOffY/this.scale,this._drawWidth/this.scale,this._drawHeight/this.scale),!0)}getBounds(){const t=this.scale;return this._boundRect.setValue(this._filterOffX/t,this._filterOffY/t,this.width/t,this.height/t)}_updateSurface(){let t;if(!this._useWebGL)return(t=this.target.cacheCanvas)||(t=this.target.cacheCanvas=window.createjs&&createjs.createCanvas?createjs.createCanvas():document.createElement("canvas")),t.width=this._drawWidth,void(t.height=this._drawHeight);if(!this._webGLCache)if("stage"===this._options.useGL){if(null==this.target.stage||!this.target.stage.isWebGL)throw`Cannot use 'stage' for cache because the object's parent stage is ${null!=this.target.stage?"non WebGL.":"not set, please addChild to the correct stage."}`;this.target.cacheCanvas=!0,this._webGLCache=this.target.stage}else{if("new"!==this._options.useGL)throw"Invalid option provided to useGL, expected ['stage', 'new', StageGL, undefined], got "+this._options.useGL;this.target.cacheCanvas=document.createElement("canvas"),this._webGLCache=new g(this.target.cacheCanvas,{antialias:!0,transparent:!0,autoPurge:-1}),this._webGLCache.isCacheControlled=!0}let e=this._webGLCache;t=this.target.cacheCanvas,e.isCacheControlled&&(t.width=this._drawWidth,t.height=this._drawHeight,e.updateViewport(this._drawWidth,this._drawHeight)),this.target.filters?(e.getTargetRenderTexture(this.target,this._drawWidth,this._drawHeight),e.getTargetRenderTexture(this.target,this._drawWidth,this._drawHeight)):e.isCacheControlled||e.getTargetRenderTexture(this.target,this._drawWidth,this._drawHeight)}_drawToCache(t){let e=this.target,i=e.cacheCanvas,s=this._webGLCache;if(!this._useWebGL||!s){let s=i.getContext("2d");return t||s.clearRect(0,0,this._drawWidth+1,this._drawHeight+1),s.save(),s.globalCompositeOperation=t,s.setTransform(this.scale,0,0,this.scale,-this._filterOffX,-this._filterOffY),s.translate(-this.x,-this.y),e.draw(s,!0),s.restore(),e.filters&&e.filters.length&&this._applyFilters(e),void(i._invalid=!0)}this._webGLCache.cacheDraw(e,e.filters,this),(i=this.target.cacheCanvas).width=this._drawWidth,i.height=this._drawHeight,i._invalid=!0}_applyFilters(){let t=this.target.cacheCanvas,e=this.target.filters,i=this._drawWidth,s=this._drawHeight,r=t.getContext("2d").getImageData(0,0,i,s),h=e.length;for(let t=0;t<h;t++)e[t]._applyFilter(r);t.getContext("2d").putImageData(r,0,0)}}
/*
* @license DisplayObject
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2017 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/class f extends a{constructor(){super(),this.alpha=1,this.cacheCanvas=null,this.bitmapCache=null,this.id=l.get(),this.mouseEnabled=!0,this.tickEnabled=!0,this.name=null,this.parent=null,this.regX=0,this.regY=0,this.rotation=0,this.scaleX=1,this.scaleY=1,this.skewX=0,this.skewY=0,this.shadow=null,this.visible=!0,this.x=0,this.y=0,this.transformMatrix=null,this.compositeOperation=null,this.snapToPixel=!0,this.filters=null,this.mask=null,this.hitArea=null,this.cursor=null,this._props=new d,this._rectangle=new p,this._bounds=null,this._webGLRenderStyle=f._StageGL_NONE}get stage(){let t=this;for(;t.parent;)t=t.parent;return/^\[Stage(GL)?(\s\(name=\w+\))?\]$/.test(t.toString())?t:null}get scale(){return this.scaleX}set scale(t){this.scaleX=this.scaleY=t}isVisible(){return!!(this.visible&&this.alpha>0&&0!=this.scaleX&&0!=this.scaleY)}draw(t,e=!1){return this.drawCache(t,e)}drawCache(t,e=!1){let i=this.bitmapCache;return!(!i||e)&&i.draw(t)}updateContext(t){let e=this,i=e.mask,s=e._props.matrix;i&&i.graphics&&!i.graphics.isEmpty()&&(i.getMatrix(s),t.transform(s.a,s.b,s.c,s.d,s.tx,s.ty),i.graphics.drawAsPath(t),t.clip(),s.invert(),t.transform(s.a,s.b,s.c,s.d,s.tx,s.ty)),this.getMatrix(s);let r=s.tx,h=s.ty;f._snapToPixelEnabled&&e.snapToPixel&&(r=r+(r<0?-.5:.5)|0,h=h+(h<0?-.5:.5)|0),t.transform(s.a,s.b,s.c,s.d,r,h),t.globalAlpha*=e.alpha,e.compositeOperation&&(t.globalCompositeOperation=e.compositeOperation),e.shadow&&this._applyShadow(t,e.shadow)}cache(t,e,i,s,r=1,h){this.bitmapCache||(this.bitmapCache=new m),this.bitmapCache.define(this,t,e,i,s,r,h)}updateCache(t){if(!this.bitmapCache)throw"cache() must be called before updateCache()";this.bitmapCache.update(t)}uncache(){this.bitmapCache&&(this.bitmapCache.release(),this.bitmapCache=void 0)}getCacheDataURL(){return this.bitmapCache?this.bitmapCache.getDataURL():null}localToGlobal(t,e,i=new c){return this.getConcatenatedMatrix(this._props.matrix).transformPoint(t,e,i)}globalToLocal(t,e,i=new c){return this.getConcatenatedMatrix(this._props.matrix).invert().transformPoint(t,e,i)}localToLocal(t,e,i,s){return s=this.localToGlobal(t,e,s),i.globalToLocal(s.x,s.y,s)}setTransform(t=0,e=0,i=1,s=1,r=0,h=0,n=0,a=0,o=0){return this.x=t,this.y=e,this.scaleX=i,this.scaleY=s,this.rotation=r,this.skewX=h,this.skewY=n,this.regX=a,this.regY=o,this}getMatrix(t){let e=this,i=t&&t.identity()||new u;return e.transformMatrix?i.copy(e.transformMatrix):i.appendTransform(e.x,e.y,e.scaleX,e.scaleY,e.rotation,e.skewX,e.skewY,e.regX,e.regY)}getConcatenatedMatrix(t){let e=this,i=this.getMatrix(t);for(;e=e.parent;)i.prependMatrix(e.getMatrix(e._props.matrix));return i}getConcatenatedDisplayProps(t){t=t?t.identity():new d;let e=this,i=e.getMatrix(t.matrix);do{t.prepend(e.visible,e.alpha,e.shadow,e.compositeOperation),e!=this&&i.prependMatrix(e.getMatrix(e._props.matrix))}while(e=e.parent);return t}hitTest(t,e){let i=f._hitTestContext;i.setTransform(1,0,0,1,-t,-e),this.draw(i);let s=this._testHit(i);return i.setTransform(1,0,0,1,0,0),i.clearRect(0,0,2,2),s}set(t){for(let e in t)this[e]=t[e];return this}getBounds(){if(this._bounds)return this._rectangle.copy(this._bounds);let t=this.cacheCanvas;if(t){let e=this._cacheScale;return this._rectangle.setValues(this._cacheOffsetX,this._cacheOffsetY,t.width/e,t.height/e)}return null}getTransformedBounds(){return this._getBounds()}setBounds(t,e,i,s){null==t&&(this._bounds=t),this._bounds=(this._bounds||new p).setValues(t,e,i,s)}clone(){return this._cloneProps(new f)}toString(){return`[${this.constructor.name}${this.name?` (name=${this.name})`:""}]`}_cloneProps(t){return t.alpha=this.alpha,t.mouseEnabled=this.mouseEnabled,t.tickEnabled=this.tickEnabled,t.name=this.name,t.regX=this.regX,t.regY=this.regY,t.rotation=this.rotation,t.scaleX=this.scaleX,t.scaleY=this.scaleY,t.shadow=this.shadow,t.skewX=this.skewX,t.skewY=this.skewY,t.visible=this.visible,t.x=this.x,t.y=this.y,t.compositeOperation=this.compositeOperation,t.snapToPixel=this.snapToPixel,t.filters=null==this.filters?null:this.filters.slice(0),t.mask=this.mask,t.hitArea=this.hitArea,t.cursor=this.cursor,t._bounds=this._bounds,t}_applyShadow(t,e=Shadow.identity){e=e,t.shadowColor=e.color,t.shadowOffsetX=e.offsetX,t.shadowOffsetY=e.offsetY,t.shadowBlur=e.blur}_tick(t){let e=this._listeners;e&&e.tick&&(t.target=null,t.propagationStopped=t.immediatePropagationStopped=!1,this.dispatchEvent(t))}_testHit(t){try{return t.getImageData(0,0,1,1).data[3]>1}catch(t){if(!f.suppressCrossDomainErrors)throw"An error has occurred. This is most likely due to security restrictions on reading canvas pixel data with local or cross-domain images.";return!1}}_getBounds(t,e){return this._transformBounds(this.getBounds(),t,e)}_transformBounds(t,e,i){if(!t)return t;let{x:s,y:r,width:h,height:n}=t,a=this._props.matrix;a=i?a.identity():this.getMatrix(a),(s||r)&&a.appendTransform(0,0,1,1,0,0,0,-s,-r),e&&a.prependMatrix(e);let o=h*a.a,l=h*a.b,c=n*a.c,u=n*a.d,d=a.tx,p=a.ty,_=d,g=d,m=p,f=p;return(s=o+d)<_?_=s:s>g&&(g=s),(s=o+c+d)<_?_=s:s>g&&(g=s),(s=c+d)<_?_=s:s>g&&(g=s),(r=l+p)<m?m=r:r>f&&(f=r),(r=l+u+p)<m?m=r:r>f&&(f=r),(r=u+p)<m?m=r:r>f&&(f=r),t.setValues(_,m,g-_,f-m)}_hasMouseEventListener(){let t=f._MOUSE_EVENTS;for(let e=0,i=t.length;e<i;e++)if(this.hasEventListener(t[e]))return!0;return!!this.cursor}}{let t=window.createjs&&createjs.createCanvas?createjs.createCanvas():document.createElement("canvas");t.getContext&&(f._hitTestCanvas=t,f._hitTestContext=t.getContext("2d"),t.width=t.height=1),f._MOUSE_EVENTS=["click","dblclick","mousedown","mouseout","mouseover","pressmove","pressup","rollout","rollover"],f.suppressCrossDomainErrors=!1,f.snapToPixelEnabled=!1,f._StageGL_NONE=0,f._StageGL_SPRITE=1,f._StageGL_BITMAP=2}
/*
* @license Container
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2017 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/class v extends f{constructor(){super(),this.children=[],this.mouseChildren=!0,this.tickChildren=!0}get numChildren(){return this.children.length}isVisible(){let t=this.cacheCanvas||this.children.length;return!!(this.visible&&this.alpha>0&&0!=this.scaleX&&0!=this.scaleY&&t)}draw(t,e=!1){if(super.draw(t,e))return!0;let i=this.children.slice();for(let e=0,s=i.length;e<s;e++){let s=i[e];s.isVisible()&&(t.save(),s.updateContext(t),s.draw(t),t.restore())}return!0}addChild(...t){const e=t.length;if(0===e)return null;let i=t[0];if(e>1){for(let s=0;s<e;s++)i=this.addChild(t[s]);return i}let s=i.parent,r=s===this;return s&&s._removeChildAt(s.children.indexOf(i),r),i.parent=this,this.children.push(i),r||i.dispatchEvent("added"),i}addChildAt(...t){const e=t.length;if(0===e)return null;let i=t.pop();if(i<0||i>this.children.length)return t[e-2];if(e>2){for(let s=0;s<e-1;s++)this.addChildAt(t[s],i++);return t[e-2]}let s=t[0],r=s.parent,h=r===this;return r&&r._removeChildAt(r.children.indexOf(s),h),s.parent=this,this.children.splice(i++,0,s),h||s.dispatchEvent("added"),s}removeChild(...t){const e=t.length;if(0===e)return!0;if(e>1){let i=!0;for(let s=0;s<e;s++)i=i&&this.removeChild(t[s]);return i}return this._removeChildAt(this.children.indexOf(t[0]))}removeChildAt(...t){const e=t.length;if(0===e)return!0;if(e>1){t.sort((t,e)=>e-t);let i=!0;for(let s=0;s<e;s++)i=i&&this._removeChildAt(t[s]);return i}return this._removeChildAt(t[0])}removeAllChildren(){let t=this.children;for(;t.length;)this._removeChildAt(0)}getChildAt(t){return this.children[t]}getChildByName(t){let e=this.children;const i=e.length;for(let s=0;s<i;s++)if(e[s].name===t)return e[s];return null}sortChildren(t){this.children.sort(t)}getChildIndex(t){return this.children.indexOf(t)}swapChildrenAt(t,e){let i=this.children,s=i[t],r=i[e];s&&r&&(i[t]=r,i[e]=s)}swapChildren(t,e){let i=this.children;const s=i.length;let r,h;for(var n=0;n<s&&(i[n]===t&&(r=n),i[n]===e&&(h=n),null==r||null==h);n++);n!==s&&(i[r]=e,i[h]=t)}setChildIndex(t,e){let i=this.children;const s=i.length;if(!(t.parent!=this||e<0||e>=s)){for(var r=0;r<s&&i[r]!==t;r++);r!==s&&r!==e&&(i.splice(r,1),i.splice(e,0,t))}}contains(t){for(;t;){if(t===this)return!0;t=t.parent}return!1}hitTest(t,e){return null!=this.getObjectUnderPoint(t,e)}getObjectsUnderPoint(t,e,i=0){let s=[],r=this.localToGlobal(t,e);return this._getObjectsUnderPoint(r.x,r.y,s,i>0,1===i),s}getObjectUnderPoint(t,e,i=0){let s=this.localToGlobal(t,e);return this._getObjectsUnderPoint(s.x,s.y,null,i>0,1===i)}getBounds(){return this._getBounds(null,!0)}getTransformedBounds(){return this._getBounds()}clone(t=!1){let e=this._cloneProps(new v);return t&&this._cloneChildren(e),e}_tick(t){if(this.tickChildren)for(let e=this.children.length-1;e>=0;e--){let i=this.children[e];i.tickEnabled&&i._tick&&i._tick(t)}super._tick(t)}_cloneChildren(t){t.children.length&&t.removeAllChildren();let e=t.children;const i=this.children.length;for(let s=0;s<i;s++){let i=this.children[s].clone(!0);i.parent=t,e.push(i)}}_removeChildAt(t,e=!1){if(t<0||t>this.children.length-1)return!1;let i=this.children[t];return i&&(i.parent=null),this.children.splice(t,1),e||i.dispatchEvent("removed"),!0}_getObjectsUnderPoint(t,e,i,s,r,h=0){if(!h&&!this._testMask(this,t,e))return null;let n,a=f._hitTestContext;r=r||s&&this._hasMouseEventListener();let o=this.children;for(let l=o.length-1;l>=0;l--){let c=o[l],u=c.hitArea;if(c.visible&&(u||c.isVisible())&&(!s||c.mouseEnabled)&&(u||this._testMask(c,t,e)))if(!u&&c instanceof v){let n=c._getObjectsUnderPoint(t,e,i,s,r,h+1);if(!i&&n)return s&&!this.mouseChildren?this:n}else{if(s&&!r&&!c._hasMouseEventListener())continue;let h=c.getConcatenatedDisplayProps(c._props);if(n=h.matrix,u&&(n.appendMatrix(u.getMatrix(u._props.matrix)),h.alpha=u.alpha),a.globalAlpha=h.alpha,a.setTransform(n.a,n.b,n.c,n.d,n.tx-t,n.ty-e),(u||c).draw(a),!this._testHit(a))continue;if(a.setTransform(1,0,0,1,0,0),a.clearRect(0,0,2,2),!i)return s&&!this.mouseChildren?this:c;i.push(c)}}return null}_testMask(t,e,i){let s=t.mask;if(!s||!s.graphics||s.graphics.isEmpty())return!0;let r=this._props.matrix,h=t.parent;r=h?h.getConcatenatedMatrix(r):r.identity(),r=s.getMatrix(s._props.matrix).prependMatrix(r);let n=f._hitTestContext;return n.setTransform(r.a,r.b,r.c,r.d,r.tx-e,r.ty-i),s.graphics.drawAsPath(n),n.fillStyle="#000",n.fill(),!!this._testHit(n)&&(n.setTransform(1,0,0,1,0,0),n.clearRect(0,0,2,2),!0)}_getBounds(t,e){let i=super.getBounds();if(i)return this._transformBounds(i,t,e);let s=this._props.matrix;s=e?s.identity():this.getMatrix(s),t&&s.prependMatrix(t);const r=this.children.length;let h=null;for(let t=0;t<r;t++){let e=this.children[t];e.visible&&(i=e._getBounds(s))&&(h?h.extend(i.x,i.y,i.width,i.height):h=i.clone())}return h}}
/*
* @license MouseEvent
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2017 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/class w extends h{constructor(t,e,i,s,r,h,n,a,o,l,c){super(t,e,i),this.stageX=s,this.stageY=r,this.rawX=null==o?s:o,this.rawY=null==l?r:l,this.nativeEvent=h,this.pointerID=n,this.primary=!!a,this.relatedTarget=c}get localX(){return this.currentTarget.globalToLocal(this.rawX,this.rawY).x}get localY(){return this.currentTarget.globalToLocal(this.rawX,this.rawY).y}get isTouch(){return-1!==this.pointerID}clone(){return new w(this.type,this.bubbles,this.cancelable,this.stageX,this.stageY,this.nativeEvent,this.pointerID,this.primary,this.rawX,this.rawY)}toString(){return`[${this.constructor.name} (type=${this.type} stageX=${this.stageX} stageY=${this.stageY})]`}}
/*
* @license Stage
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2017 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/
/**
* @license Graphics
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2017 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/
class x{constructor(){this.command=null,this._stroke=null,this._strokeStyle=null,this._oldStrokeStyle=null,this._strokeDash=null,this._oldStrokeDash=null,this._strokeIgnoreScale=!1,this._fill=null,this._instructions=[],this._commitIndex=0,this._activeInstructions=[],this._dirty=!1,this._storeIndex=0,this.curveTo=this.quadraticCurveTo,this.drawRect=this.rect,this.mt=this.moveTo,this.lt=this.lineTo,this.at=this.arcTo,this.bt=this.bezierCurveTo,this.qt=this.quadraticCurveTo,this.a=this.arc,this.r=this.rect,this.cp=this.closePath,this.c=this.clear,this.f=this.beginFill,this.lf=this.beginLinearGradientFill,this.rf=this.beginRadialGradientFill,this.bf=this.beginBitmapFill,this.ef=this.endFill,this.ss=this.setStrokeStyle,this.sd=this.setStrokeDash,this.s=this.beginStroke,this.ls=this.beginLinearGradientStroke,this.rs=this.beginRadialGradientStroke,this.bs=this.beginBitmapStroke,this.es=this.endStroke,this.dr=this.drawRect,this.rr=this.drawRoundRect,this.rc=this.drawRoundRectComplex,this.dc=this.drawCircle,this.de=this.drawEllipse,this.dp=this.drawPolyStar,this.p=this.decodePath,this.clear()}static getRGB(t,e,i,s){return null!=t&&null==i&&(s=e,i=255&t,e=t>>8&255,t=t>>16&255),null==s?`rgb(${t},${e},${i})`:`rgba(${t},${e},${i},${s})`}static getHSL(t,e,i,s){return null==s?`hsl(${t%360},${e}%,${i}%)`:`hsl(${t%360},${e}%,${i}%,${s})`}get instructions(){return this._updateInstructions(),this._instructions}isEmpty(){return!(this._instructions.length||this._activeInstructions.length)}draw(t,e){this._updateInstructions();let i=this._instructions;const s=i.length;for(let r=this._storeIndex;r<s;r++)i[r].exec(t,e)}drawAsPath(t){this._updateInstructions();let e,i=this._instructions;const s=i.length;for(let r=this._storeIndex;r<s;r++)!1!==(e=i[r]).path&&e.exec(t)}moveTo(t,e){return this.append(new y(t,e),!0)}lineTo(t,e){return this.append(new b(t,e))}arcTo(t,e,i,s,r){return this.append(new T(t,e,i,s,r))}arc(t,e,i,s,r,h){return this.append(new C(t,e,i,s,r,h))}quadraticCurveTo(t,e,i,s){return this.append(new S(t,e,i,s))}bezierCurveTo(t,e,i,s,r,h){return this.append(new E(t,e,i,s,r,h))}rect(t,e,i,s){return this.append(new k(t,e,i,s))}closePath(){return this._activeInstructions.length?this.append(new P):this}clear(){return this._instructions.length=this._activeInstructions.length=this._commitIndex=0,this._strokeStyle=this._oldStrokeStyle=this._stroke=this._fill=this._strokeDash=this._oldStrokeDash=null,this._dirty=this._strokeIgnoreScale=!1,this}beginFill(t){return this._setFill(t?new D(t):null)}beginLinearGradientFill(t,e,i,s,r,h){return this._setFill((new D).linearGradient(t,e,i,s,r,h))}beginRadialGradientFill(t,e,i,s,r,h,n,a){return this._setFill((new D).radialGradient(t,e,i,s,r,h,n,a))}beginBitmapFill(t,e,i){return this._setFill(new D(null,i).bitmap(t,e))}endFill(){return this.beginFill()}setStrokeStyle(t,e=0,i=0,s=10,r=!1){return this._updateInstructions(!0),this._strokeStyle=this.command=new I(t,e,i,s,r),this._stroke&&(this._stroke.ignoreScale=r),this._strokeIgnoreScale=r,this}setStrokeDash(t,e=0){return this._updateInstructions(!0),this._strokeDash=this.command=new O(t,e),this}beginStroke(t){return this._setStroke(t?new L(t):null)}beginLinearGradientStroke(t,e,i,s,r,h){return this._setStroke((new L).linearGradient(t,e,i,s,r,h))}beginRadialGradientStroke(t,e,i,s,r,h,n,a){return this._setStroke((new L).radialGradient(t,e,i,s,r,h,n,a))}beginBitmapStroke(t,e="repeat"){return this._setStroke((new L).bitmap(t,e))}endStroke(){return this.beginStroke()}drawRoundRect(t,e,i,s,r){return this.drawRoundRectComplex(t,e,i,s,r,r,r,r)}drawRoundRectComplex(t,e,i,s,r,h,n,a){return this.append(new R(t,e,i,s,r,h,n,a))}drawCircle(t,e,i){return this.append(new A(t,e,i))}drawEllipse(t,e,i,s){return this.append(new G(t,e,i,s))}drawPolyStar(t,e,i,s,r,h){return this.append(new Y(t,e,i,s,r,h))}append(t,e){return this._activeInstructions.push(t),this.command=t,e||(this._dirty=!0),this}decodePath(t){let e=[this.moveTo,this.lineTo,this.quadraticCurveTo,this.bezierCurveTo,this.closePath],i=[2,2,4,6,0],s=0;const r=t.length;let h=[],n=0,a=0,o=x.BASE_64;for(;s<r;){let r=o[t.charAt(s)],l=r>>3,c=e[l];if(!c||3&r)throw`bad path data (@${s}):c`;const u=i[l];l||(n=a=0),h.length=0,s++;let d=2+(r>>2&1);for(let e=0;e<u;e++){let i=o[t.charAt(s)],r=i>>5?-1:1;i=(31&i)<<6|o[t.charAt(s+1)],3===d&&(i=i<<6|o[t.charAt(s+2)]),i=r*i/10,e%2?n=i+=n:a=i+=a,h[e]=i,s+=d}c.apply(this,h)}return this}store(){return this._updateInstructions(!0),this._storeIndex=this._instructions.length,this}unstore(){return this._storeIndex=0,this}clone(){let t=new x;return t.command=this.command,t._stroke=this._stroke,t._strokeStyle=this._strokeStyle,t._strokeDash=this._strokeDash,t._strokeIgnoreScale=this._strokeIgnoreScale,t._fill=this._fill,t._instructions=this._instructions.slice(),t._commitIndex=this._commitIndex,t._activeInstructions=this._activeInstructions.slice(),t._dirty=this._dirty,t._storeIndex=this._storeIndex,t}toString(){return`[${this.constructor.name}]`}_updateInstructions(t){let e=this._instructions,i=this._activeInstructions,s=this._commitIndex;if(this._dirty&&i.length){e.length=s,e.push(x.beginCmd);const r=i.length,h=e.length;e.length=h+r;for(let t=0;t<r;t++)e[t+h]=i[t];this._fill&&e.push(this._fill),this._stroke&&(this._strokeDash!==this._oldStrokeDash&&e.push(this._strokeDash),this._strokeStyle!==this._oldStrokeStyle&&e.push(this._strokeStyle),t&&(this._oldStrokeDash=this._strokeDash,this._oldStrokeStyle=this._strokeStyle),e.push(this._stroke)),this._dirty=!1}t&&(i.length=0,this._commitIndex=e.length)}_setFill(t){return this._updateInstructions(!0),this.command=this._fill=t,this}_setStroke(t){return this._updateInstructions(!0),(this.command=this._stroke=t)&&(t.ignoreScale=this._strokeIgnoreScale),this}static get LineTo(){return b}static get MoveTo(){return y}static get ArcTo(){return T}static get Arc(){return C}static get QuadraticCurveTo(){return S}static get BezierCurveTo(){return E}static get Rect(){return k}static get ClosePath(){return P}static get BeginPath(){return M}static get Fill(){return D}static get Stroke(){return L}static get StrokeStyle(){return I}static get StrokeDash(){return O}static get RoundRect(){return R}static get Circle(){return A}static get Ellipse(){return G}static get PolyStar(){return Y}}class b{constructor(t,e){this.x=t,this.y=e}exec(t){t.lineTo(this.x,this.y)}}class y{constructor(t,e){this.x=t,this.y=e}exec(t){t.moveTo(this.x,this.y)}}class T{constructor(t,e,i,s,r){this.x1=t,this.y1=e,this.x2=i,this.y2=s,this.radius=r}exec(t){t.arcTo(this.x1,this.y1,this.x2,this.y2,this.radius)}}class C{constructor(t,e,i,s,r,h){this.x=t,this.y=e,this.radius=i,this.startAngle=s,this.endAngle=r,this.anticlockwise=!!h}exec(t){t.arc(this.x,this.y,this.radius,this.startAngle,this.endAngle,this.anticlockwise)}}class S{constructor(t,e,i,s){this.cpx=t,this.cpy=e,this.x=i,this.y=s}exec(t){t.quadraticCurveTo(this.cpx,this.cpy,this.x,this.y)}}class E{constructor(t,e,i,s,r,h){this.cp1x=t,this.cp1y=e,this.cp2x=i,this.cp2y=s,this.x=r,this.y=h}exec(t){t.bezierCurveTo(this.cp1x,this.cp1y,this.cp2x,this.cp2y,this.x,this.y)}}class k{constructor(t,e,i,s){this.x=t,this.y=e,this.w=i,this.h=s}exec(t){t.rect(this.x,this.y,this.w,this.h)}}class P{constructor(){}exec(t){t.closePath()}}class M{constructor(){}exec(t){t.beginPath()}}class D{constructor(t,e){this.style=t,this.matrix=e,this.path=!1}exec(t){if(!this.style)return;t.fillStyle=this.style;let e=this.matrix;e&&(t.save(),t.transform(e.a,e.b,e.c,e.d,e.tx,e.ty)),t.fill(),e&&t.restore()}linearGradient(t,e,i,s,r,h){let n=this.style=x._ctx.createLinearGradient(i,s,r,h);const a=t.length;for(let i=0;i<a;i++)n.addColorStop(e[i],t[i]);return n.props={colors:t,ratios:e,x0:i,y0:s,x1:r,y1:h,type:"linear"},this}radialGradient(t,e,i,s,r,h,n,a){let o=this.style=x._ctx.createRadialGradient(i,s,r,h,n,a);const l=t.length;for(let i=0;i<l;i++)o.addColorStop(e[i],t[i]);return o.props={colors:t,ratios:e,x0:i,y0:s,r0:r,x1:h,y1:n,r1:a,type:"radial"},this}bitmap(t,e=""){if(t.naturalWidth||t.getContext||t.readyState>=2){(this.style=x._ctx.createPattern(t,e)).props={image:t,repetition:e,type:"bitmap"}}return this}}class L{constructor(t,e){this.style=t,this.ignoreScale=e,this.path=!1}exec(t){this.style&&(t.strokeStyle=this.style,this.ignoreScale&&(t.save(),t.setTransform(1,0,0,1,0,0)),t.stroke(),this.ignoreScale&&t.restore())}linearGradient(...t){D.prototype.linearGradient.apply(this,t)}radialGradient(...t){D.prototype.radialGradient.apply(this,t)}bitmap(...t){D.prototype.bitmap.apply(this,t)}}class I{constructor(t,e="butt",i="miter",s=10,r=!1){this.width=t,this.caps=e,this.joints=i,this.miterLimit=s,this.ignoreScale=r,this.path=!1}exec(t){t.lineWidth=this.width,t.lineCap=isNaN(this.caps)?this.caps:x.STROKE_CAPS_MAP[this.caps],t.lineJoin=isNaN(this.joints)?this.joints:x.STROKE_JOINTS_MAP[this.joints],t.miterLimit=this.miterLimit,t.ignoreScale=this.ignoreScale}}class O{constructor(t=O.EMPTY_SEGMENTS,e=0){this.segments=t,this.offset=e}static get EMPTY_SEGMENTS(){return _EMPTY_SEGMENTS}exec(t){t.setLineDash&&(t.setLineDash(this.segments),t.lineDashOffset=this.offset)}}class R{constructor(t,e,i,s,r,h,n,a){this.x=t,this.y=e,this.w=i,this.h=s,this.radiusTL=r,this.radiusTR=h,this.radiusBR=n,this.radiusBL=a}exec(t){let e=(o<l?o:l)/2,i=0,s=0,r=0,h=0,n=this.x,a=this.y,o=this.w,l=this.h,c=this.radiusTL,u=this.radiusTR,d=this.radiusBR,p=this.radiusBL;c<0&&(c*=i=-1),c>e&&(c=e),u<0&&(u*=s=-1),u>e&&(u=e),d<0&&(d*=r=-1),d>e&&(d=e),p<0&&(p*=h=-1),p>e&&(p=e),t.moveTo(n+o-u,a),t.arcTo(n+o+u*s,a-u*s,n+o,a+u,u),t.lineTo(n+o,a+l-d),t.arcTo(n+o+d*r,a+l+d*r,n+o-d,a+l,d),t.lineTo(n+p,a+l),t.arcTo(n-p*h,a+l+p*h,n,a+l-p,p),t.lineTo(n,a+c),t.arcTo(n-c*i,a-c*i,n+c,a,c),t.closePath()}}class A{constructor(t,e,i){this.x=t,this.y=e,this.radius=i}exec(t){t.arc(this.x,this.y,this.radius,0,2*Math.PI)}}class G{constructor(t,e,i,s){this.x=t,this.y=e,this.w=i,this.h=s}exec(t){let e=this.x,i=this.y,s=this.w,r=this.h,h=.5522848,n=s/2*h,a=r/2*h,o=e+s,l=i+r,c=e+s/2,u=i+r/2;t.moveTo(e,u),t.bezierCurveTo(e,u-a,c-n,i,c,i),t.bezierCurveTo(c+n,i,o,u-a,o,u),t.bezierCurveTo(o,u+a,c+n,l,c,l),t.bezierCurveTo(c-n,l,e,u+a,e,u)}}class Y{constructor(t,e,i,s,r=0,h=0){this.x=t,this.y=e,this.radius=i,this.sides=s,this.pointSize=r,this.angle=h}exec(t){let e=this.x,i=this.y,s=this.radius,r=this.angle/180*Math.PI,h=this.sides,n=1-this.pointSize,a=Math.PI/h;t.moveTo(e+Math.cos(r)*s,i+Math.sin(r)*s);for(let o=0;o<h;o++)r+=a,1!=n&&t.lineTo(e+Math.cos(r)*s*n,i+Math.sin(r)*s*n),r+=a,t.lineTo(e+Math.cos(r)*s,i+Math.sin(r)*s);t.closePath()}}{let t=window.createjs&&createjs.createCanvas?createjs.createCanvas():document.createElement("canvas");t.getContext&&(x._ctx=t.getContext("2d"),t.width=t.height=1),x.beginCmd=new M,x.BASE_64={A:0,B:1,C:2,D:3,E:4,F:5,G:6,H:7,I:8,J:9,K:10,L:11,M:12,N:13,O:14,P:15,Q:16,R:17,S:18,T:19,U:20,V:21,W:22,X:23,Y:24,Z:25,a:26,b:27,c:28,d:29,e:30,f:31,g:32,h:33,i:34,j:35,k:36,l:37,m:38,n:39,o:40,p:41,q:42,r:43,s:44,t:45,u:46,v:47,w:48,x:49,y:50,z:51,0:52,1:53,2:54,3:55,4:56,5:57,6:58,7:59,8:60,9:61,"+":62,"/":63},x.STROKE_CAPS_MAP=["butt","round","square"],x.STROKE_JOINTS_MAP=["miter","round","bevel"],x.EMPTY_SEGMENTS=[]}var X=x;
/*
* @license Shape
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2017 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/class B extends f{constructor(t=new X){super(),this.graphics=t}isVisible(){let t=this.cacheCanvas||this.graphics&&!this.graphics.isEmpty();return!!(this.visible&&this.alpha>0&&0!=this.scaleX&&0!=this.scaleY&&t)}draw(t,e=!1){return!!super.draw(t,e)||(this.graphics.draw(t,this),!0)}clone(t=!1){let e=t&&this.graphics?this.graphics.clone():this.graphics;return this._cloneProps(new B(e))}}
/**
 * @license AbstractTween
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2017 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */var F=class extends a{constructor(t){super(),this.ignoreGlobalPause=!1,this.loop=0,this.useTicks=!1,this.reversed=!1,this.bounce=!1,this.timeScale=1,this.duration=0,this.position=0,this.rawPosition=-1,this._paused=!0,this._next=null,this._prev=null,this._parent=null,this._labels=null,this._labelList=null,t&&(this.useTicks=!!t.useTicks,this.ignoreGlobalPause=!!t.ignoreGlobalPause,this.loop=!0===t.loop?-1:t.loop||0,this.reversed=!!t.reversed,this.bounce=!!t.bounce,this.timeScale=t.timeScale||1,t.onChange&&this.addEventListener("change",t.onChange),t.onComplete&&this.addEventListener("complete",t.onComplete))}get labels(){let t=this._labelList;if(!t){t=this._labelList=[];let e=this._labels;for(let i in e)t.push({label:i,position:e[i]});t.sort((t,e)=>t.position-e.position)}return t}set labels(t){this._labels=t,this._labelList=null}get currentLabel(){let t=this.labels,e=this.position;for(let i=0,s=t.length;i<s&&!(e<t[i].position);i++);return 0===i?null:t[i-1].label}get paused(){return this._paused}set paused(t){Q._register(this,t),this._paused=t}advance(t,e=!1){this.setPosition(this.rawPosition+t*this.timeScale,e)}setPosition(t,e=!1,i=!1,s){const r=this.duration,h=this.loop,n=this.rawPosition;let a=0,o=0,l=!1;if(t<0&&(t=0),0===r){if(l=!0,-1!==n)return l}else{if(o=t-(a=t/r|0)*r,(l=-1!==h&&t>=h*r+r)&&(t=(o=r)*(a=h)+r),t===n)return l;!this.reversed!=!(this.bounce&&a%2)&&(o=r-o)}this.position=o,this.rawPosition=t,this._updatePosition(i,l),l&&(this.paused=!0),s&&s(this),e||this._runActions(n,t,i,!i&&-1===n),this.dispatchEvent("change"),l&&this.dispatchEvent("complete")}calculatePosition(t){const e=this.duration,i=this.loop;let s=0,r=0;return 0===e?0:(-1!==i&&t>=i*e+e?(r=e,s=i):r=t<0?0:t-(s=t/e|0)*e,!this.reversed!=!(this.bounce&&s%2)?e-r:r)}addLabel(t,e){this._labels||(this._labels={}),this._labels[t]=e;const s=this._labelList;if(s){for(let t=0,i=s.length;t<i&&!(e<s[t].position);t++);s.splice(i,0,{label:t,position:e})}}gotoAndPlay(t){this.paused=!1,this._goto(t)}gotoAndStop(t){this.paused=!0,this._goto(t)}resolve(t){const e=Number(t);return isNaN(e)?this._labels&&this._labels[t]:e}toString(){return`[${this.constructor.name}${this.name?` (name=${this.name})`:""}]`}clone(){throw"AbstractTween cannot be cloned."}_init(t){t&&t.paused||(this.paused=!1),t&&null!=t.position&&this.setPosition(t.position)}_goto(t){const e=this.resolve(t);null!=e&&this.setPosition(e,!1,!0)}_runActions(t,e,i,s){if(!this._actionHead&&!this.tweens)return;const r=this.duration,h=this.loop;let n,a,o,l,c=this.reversed,u=this.bounce;if(0===r?(n=a=o=l=0,c=u=!1):(o=t-(n=t/r|0)*r,l=e-(a=e/r|0)*r),-1!==h&&(a>h&&(l=r,a=h),n>h&&(o=r,n=h)),i)return this._runActionsRange(l,l,i,s);if(n===a&&o===l&&!i&&!s)return;-1===n&&(n=o=0);const d=t<=e;let p=n;do{let t=p===n?o:d?0:r,e=p===a?l:d?r:0;if(!c!=!(u&&p%2)&&(t=r-t,e=r-e),u&&p!==n&&t===e);else if(this._runActionsRange(t,e,i,s||p!==n&&!u))return!0;s=!1}while(d&&++p<=a||!d&&--p>=a)}_runActionsRange(t,e,i,s){throw"_runActionsRange is abstract and must be overridden by a subclass."}_updatePosition(t,e){throw"_updatePosition is abstract and must be overridden by a subclass."}};
/**
 * @license Ease
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2017 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */function j(t){return t}function $(t){return function(e){return Math.pow(e,t)}}function H(t){return function(e){return 1-Math.pow(1-e,t)}}function U(t){return function(e){return(e*=2)<1?.5*Math.pow(e,t):1-.5*Math.abs(Math.pow(2-e,t))}}$(2),H(2),U(2),$(3),H(3),U(3),$(4),H(4),U(4),$(5),H(5),U(5),N=1.7;var N;(function(t){t*=1.525})(1.7),function(t,e){let i=2*Math.PI}(1,.3),function(t,e){let i=2*Math.PI}(1,.3),function(t,e){let i=2*Math.PI}(1,.3*1.5);
/**
 * @license Ticker
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2017 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
class W extends a{static get RAF_SYNCHED(){return"synched"}static get RAF(){return"raf"}static get TIMEOUT(){return"timeout"}constructor(t){super(),this.name=t,this.timingMode=W.TIMEOUT,this.maxDelta=0,this.paused=!1,this._inited=!1,this._startTime=0,this._pausedTime=0,this._ticks=0,this._pausedTicks=0,this._interval=50,this._lastTime=0,this._times=null,this._tickTimes=null,this._timerId=null,this._raf=!0}get interval(){return this._interval}set interval(t){this._interval=t,this._inited&&this._setupTick()}get framerate(){return 1e3/this._interval}set framerate(t){this.interval=1e3/t}init(){this._inited||(this._inited=!0,this._times=[],this._tickTimes=[],this._startTime=this._getTime(),this._times.push(this._lastTime=0),this._setupTick())}reset(){if(this._raf){let t=window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.oCancelAnimationFrame||window.msCancelAnimationFrame;t&&t(this._timerId)}else clearTimeout(this._timerId);this.removeAllEventListeners("tick"),this._timerId=this._times=this._tickTimes=null,this._startTime=this._lastTime=this._ticks=0,this._inited=!1}addEventListener(t,e,i){return!this._inited&&this.init(),super.addEventListener(t,e,i)}getMeasuredTickTime(t=null){const e=this._tickTimes;return!e||e.length<1?-1:(t=Math.min(e.length,t||0|this.framerate),e.reduce((t,e)=>t+e,0)/t)}getMeasuredFPS(t=null){const e=this._times;return!e||e.length<2?-1:(t=Math.min(e.length-1,t||0|this.framerate),1e3/((e[0]-e[t])/t))}getTime(t=!1){return this._startTime?this._getTime()-(t?this._pausedTime:0):-1}getEventTime(t=!1){return this._startTime?(this._lastTime||this._startTime)-(t?this._pausedTime:0):-1}getTicks(t=!1){return this._ticks-(t?this._pausedTicks:0)}_handleSynch(){this._timerId=null,this._setupTick(),this._getTime()-this._lastTime>=.97*(this._interval-1)&&this._tick()}_handleRAF(){this._timerId=null,this._setupTick(),this._tick()}_handleTimeout(){this._timerId=null,this._setupTick(),this._tick()}_setupTick(){if(null!=this._timerId)return;const t=this.timingMode||this._raf&&W.RAF;if(t===W.RAF_SYNCHED||t===W.RAF){const e=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame;if(e)return this._timerId=e(t===W.RAF?this._handleRAF.bind(this):this._handleSynch.bind(this)),void(this._raf=!0)}this._raf=!1,this._timerId=setTimeout(this._handleTimeout.bind(this),this._interval)}_tick(){const t=this.paused,e=this._getTime(),i=e-this._lastTime;if(this._lastTime=e,this._ticks++,t&&(this._pausedTicks++,this._pausedTime+=i),this.hasEventListener("tick")){const s=new h("tick"),r=this.maxDelta;s.delta=r&&i>r?r:i,s.paused=t,s.time=e,s.runTime=e-this._pausedTime,this.dispatchEvent(s)}for(this._tickTimes.unshift(this._getTime()-e);this._tickTimes.length>100;)this._tickTimes.pop();for(this._times.unshift(e);this._times.length>100;)this._times.pop()}_getTime(){const t=window.performance&&window.performance.now;return(t&&t.call(performance)||(new Date).getTime())-this._startTime}static on(t,e,i,s,r,h){return q.on(t,e,i,s,r,h)}static removeEventListener(t,e,i){q.removeEventListener(t,e,i)}static off(t,e,i){q.off(t,e,i)}static removeAllEventListeners(t){q.removeAllEventListeners(t)}static dispatchEvent(t,e,i){return q.dispatchEvent(t,e,i)}static hasEventListener(t){return q.hasEventListener(t)}static willTrigger(t){return q.willTrigger(t)}static toString(){return q.toString()}static init(){q.init()}static reset(){q.reset()}static addEventListener(t,e,i){q.addEventListener(t,e,i)}static getMeasuredTickTime(t){return q.getMeasuredTickTime(t)}static getMeasuredFPS(t){return q.getMeasuredFPS(t)}static getTime(t){return q.getTime(t)}static getEventTime(t){return q.getEventTime(t)}static getTicks(t){return q.getTicks(t)}static get interval(){return q.interval}static set interval(t){q.interval=t}static get framerate(){return q.framerate}static set framerate(t){q.framerate=t}static get name(){return q.name}static set name(t){q.name=t}static get timingMode(){return q.timingMode}static set timingMode(t){q.timingMode=t}static get maxDelta(){return q.maxDelta}static set maxDelta(t){q.maxDelta=t}static get paused(){return q.paused}static set paused(t){q.paused=t}}var V=W;const q=new W("createjs.global");
/**
 * @license Tween
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2017 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */class z extends F{constructor(t,e){super(e),this.pluginData=null,this.target=t,this.passive=!1,this._stepHead=new J(null,0,0,{},null,!0),this._stepTail=this._stepHead,this._stepPosition=0,this._actionHead=null,this._actionTail=null,this._plugins=null,this._pluginIds=null,this._injected=null,e&&(this.pluginData=e.pluginData,e.override&&z.removeTweens(t)),this.pluginData||(this.pluginData={}),this._init(e)}static get(t,e){return new z(t,e)}static tick(t,e){let i=z._tweenHead;for(;i;){let s=i._next;e&&!i.ignoreGlobalPause||i._paused||i.advance(i.useTicks?1:t),i=s}}static handleEvent(t){"tick"===t.type&&this.tick(t.delta,t.paused)}static removeTweens(t){if(!t.tweenjs_count)return;let e=z._tweenHead;for(;e;){let i=e._next;e.target===t&&(e.paused=!0),e=i}t.tweenjs_count=0}static removeAllTweens(){let t=z._tweenHead;for(;t;){let e=t._next;t._paused=!0,t.target&&(t.target.tweenjs_count=0),t._next=t._prev=null,t=e}z._tweenHead=z._tweenTail=null}static hasActiveTweens(t){return t?!!t.tweenjs_count:!!z._tweenHead}static installPlugin(t,e){t.install(e);const s=t.priority=t.priority||0,r=z._plugins=z._plugins||[];for(let t=0,e=r.length;t<e&&!(s<r[t].priority);t++);r.splice(i,0,t)}static _register(t,e){const i=t.target;if(!e&&t._paused){i&&(i.tweenjs_count=i.tweenjs_count?i.tweenjs_count+1:1);let e=z._tweenTail;e?(z._tweenTail=e._next=t,t._prev=e):z._tweenHead=z._tweenTail=t,z._inited||(V.addEventListener("tick",z),z._inited=!0)}else if(e&&!t._paused){i&&i.tweenjs_count--;let e=t._next,s=t._prev;e?e._prev=s:z._tweenTail=s,s?s._next=e:z._tweenHead=e,t._next=t._prev=null}}wait(t,e=!1){return t>0&&this._addStep(+t,this._stepTail.props,null,e),this}to(t,e=0,i=j){e<0&&(e=0);const s=this._addStep(+e,null,i);return this._appendProps(t,s),this}label(t){return this.addLabel(t,this.duration),this}call(t,e,i){return this._addAction(i||this.target,t,e||[this])}set(t,e){return this._addAction(e||this.target,this._set,[t])}play(t){return this._addAction(t||this,this._set,[{paused:!1}])}pause(t){return this._addAction(t||this,this._set,[{paused:!1}])}clone(){throw"Tween can not be cloned."}_addPlugin(t){let e=this._pluginIds||(this._pluginIds={}),i=t.id;if(!i||e[i])return;e[i]=!0;let s=this._plugins||(this._plugins=[]),r=t.priority||0;for(let e=0,i=s.length;e<i;e++)if(r<s[e].priority)return void s.splice(e,0,t);s.push(t)}_updatePosition(t,e){let i=this._stepHead.next,s=this.position,r=this.duration;if(this.target&&i){let t=i.next;for(;t&&t.t<=s;)t=(i=i.next).next;let h=e?0===r?1:s/r:(s-i.t)/i.d;this._updateTargetProps(i,h,e)}this._stepPosition=i?s-i.t:0}_updateTargetProps(t,e,i){if(this.passive=!!t.passive)return;let s,r,h,n,a=t.prev.props,o=t.props;(n=t.ease)&&(e=n(e,0,1,1));let l=this._plugins;t:for(let n in a){if(s=(r=a[n])!==(h=o[n])&&"number"==typeof r?r+(h-r)*e:e>=1?h:r,l)for(let r=0,h=l.length;r<h;r++){let h=l[r].change(this,t,n,s,e,i);if(h===z.IGNORE)continue t;void 0!==h&&(s=h)}this.target[n]=s}}_runActionsRange(t,e,i,s){let r=t>e,h=r?this._actionTail:this._actionHead,n=e,a=t;r&&(n=t,a=e);let o=this.position;for(;h;){let i=h.t;if((i===e||i>a&&i<n||s&&i===t)&&(h.funct.apply(h.scope,h.params),o!==this.position))return!0;h=r?h.prev:h.next}}_appendProps(t,e,i){let s,r,h,n,a,o=this._stepHead.props,l=this.target,c=z._plugins,u=e.prev,d=u.props,p=e.props||(e.props=this._cloneProps(d)),_={};for(s in t)if(t.hasOwnProperty(s)&&(_[s]=p[s]=t[s],void 0===o[s])){if(n=void 0,c)for(r=c.length-1;r>=0;r--)if(void 0!==(h=c[r].init(this,s,n))&&(n=h),n===z.IGNORE){(ignored=ignored||{})[s]=!0,delete p[s],delete _[s];break}n!==z.IGNORE&&(void 0===n&&(n=l[s]),d[s]=void 0===n?null:n)}for(s in _){h=t[s];let e,i=u;for(;(e=i)&&(i=e.prev);)if(i.props!==e.props){if(void 0!==i.props[s])break;i.props[s]=d[s]}}if(i&&(c=this._plugins))for(r=c.length-1;r>=0;r--)c[r].step(this,e,_);(a=this._injected)&&(this._injected=null,this._appendProps(a,e,!1))}_injectProp(t,e){(this._injected||(this._injected={}))[t]=e}_addStep(t,e,i,s=!1){let r=new J(this._stepTail,this.duration,t,e,i,s);return this.duration+=t,this._stepTail=this._stepTail.next=r}_addAction(t,e,i){let s=new K(this._actionTail,this.duration,t,e,i);return this._actionTail?this._actionTail.next=s:this._actionHead=s,this._actionTail=s,this}_set(t){for(let e in t)this[e]=t[e]}_cloneProps(t){let e={};for(let i in t)e[i]=t[i];return e}}{let t=z.prototype;t.w=t.wait,t.t=t.to,t.c=t.call,t.s=t.set}z.IGNORE={},z._tweens=[],z._plugins=null,z._tweenHead=null,z._tweenTail=null;class J{constructor(t,e,i,s,r,h){this.next=null,this.prev=t,this.t=e,this.d=i,this.props=s,this.ease=r,this.passive=h,this.index=t?t.index+1:0}}class K{constructor(t,e,i,s,r){this.next=null,this.d=0,this.prev=t,this.t=e,this.scope=i,this.funct=s,this.params=r}}var Q=z;const Z=new class extends v{constructor(t){super(),this.autoClear=!0,this.canvas="string"==typeof t?document.getElementById(t):t,this.mouseX=0,this.mouseY=0,this.drawRect=null,this.snapToPixelEnabled=!1,this.mouseInBounds=!1,this.tickOnUpdate=!0,this.mouseMoveOutside=!1,this.preventSelection=!0,this._pointerData={},this._pointerCount=0,this._primaryPointerID=null,this._mouseOverIntervalID=null,this._nextStage=null,this._prevStage=null,this.enableDOMEvents(!0)}get nextStage(){return this._nextStage}set nextStage(t){this._nextStage&&(this._nextStage._prevStage=null),t&&(t._prevStage=this),this._nextStage=t}update(t){if(!this.canvas)return;if(this.tickOnUpdate&&this.tick(t),!1===this.dispatchEvent("drawstart",!1,!0))return;f._snapToPixelEnabled=this.snapToPixelEnabled;let e=this.drawRect,i=this.canvas.getContext("2d");i.setTransform(1,0,0,1,0,0),this.autoClear&&(e?i.clearRect(e.x,e.y,e.width,e.height):i.clearRect(0,0,this.canvas.width+1,this.canvas.height+1)),i.save(),this.drawRect&&(i.beginPath(),i.rect(e.x,e.y,e.width,e.height),i.clip()),this.updateContext(i),this.draw(i,!1),i.restore(),this.dispatchEvent("drawend")}tick(t){if(!this.tickEnabled||!1===this.dispatchEvent("tickstart",!1,!0))return;let e=new h("tick");if(t)for(let i in t)t.hasOwnProperty(i)&&(e[i]=t[i]);this._tick(e),this.dispatchEvent("tickend")}handleEvent(t){"tick"===t.type&&this.update(t)}clear(){if(!this.canvas)return;let t=this.canvas.getContext("2d");t.setTransform(1,0,0,1,0,0),t.clearRect(0,0,this.canvas.width+1,this.canvas.height+1)}toDataURL(t,e="image/png"){let i,s=this.canvas.getContext("2d"),r=this.canvas.width,h=this.canvas.height;if(t){i=s.getImageData(0,0,r,h);var n=s.globalCompositeOperation;s.globalCompositeOperation="destination-over",s.fillStyle=t,s.fillRect(0,0,r,h)}let a=this.canvas.toDataURL(e);return t&&(s.putImageData(i,0,0),s.globalCompositeOperation=n),a}enableMouseOver(t=20){this._mouseOverIntervalID&&(clearInterval(this._mouseOverIntervalID),this._mouseOverIntervalID=null,0===t&&this._testMouseOver(!0)),t<=0||(this._mouseOverIntervalID=setInterval(()=>this._testMouseOver(),1e3/Math.min(50,t)))}enableDOMEvents(t=!0){let e=this._eventListeners;if(!t&&e){for(let t in e){let i=e[t];i.t.removeEventListener(t,i.f,!1)}this._eventListeners=null}else if(t&&!e&&this.canvas){let t=window.addEventListener?window:document;e=this._eventListeners={mouseup:{t:t,f:t=>this._handleMouseUp(t)},mousemove:{t:t,f:t=>this._handleMouseMove(t)},dblclick:{t:this.canvas,f:t=>this._handleDoubleClick(t)},mousedown:{t:this.canvas,f:t=>this._handleMouseDown(t)}};for(let t in e){let i=e[t];i.t.addEventListener&&i.t.addEventListener(t,i.f,!1)}}}clone(){throw"Stage cannot be cloned."}_getElementRect(t){let e;try{e=t.getBoundingClientRect()}catch(i){e={top:t.offsetTop,left:t.offsetLeft,width:t.offsetWidth,height:t.offsetHeight}}let i=(window.pageXOffset||document.scrollLeft||0)-(document.clientLeft||document.body.clientLeft||0),s=(window.pageYOffset||document.scrollTop||0)-(document.clientTop||document.body.clientTop||0),r=window.getComputedStyle?getComputedStyle(t,null):t.currentStyle,h=parseInt(r.paddingLeft)+parseInt(r.borderLeftWidth),n=parseInt(r.paddingTop)+parseInt(r.borderTopWidth),a=parseInt(r.paddingRight)+parseInt(r.borderRightWidth),o=parseInt(r.paddingBottom)+parseInt(r.borderBottomWidth);return{left:e.left+i+h,right:e.right+i-a,top:e.top+s+n,bottom:e.bottom+s-o}}_getPointerData(t){let e=this._pointerData[t];return e||(e=this._pointerData[t]={x:0,y:0}),e}_handleMouseMove(t=window.event){this._handlePointerMove(-1,t,t.pageX,t.pageY)}_handlePointerMove(t,e,i,s,r){if(this._prevStage&&void 0===r)return;if(!this.canvas)return;let h=this._nextStage,n=this._getPointerData(t),a=n.inBounds;this._updatePointerPosition(t,e,i,s),(a||n.inBounds||this.mouseMoveOutside)&&(-1===t&&n.inBounds===!a&&this._dispatchMouseEvent(this,a?"mouseleave":"mouseenter",!1,t,n,e),this._dispatchMouseEvent(this,"stagemousemove",!1,t,n,e),this._dispatchMouseEvent(n.target,"pressmove",!0,t,n,e)),h&&h._handlePointerMove(t,e,i,s,null)}_updatePointerPosition(t,e,i,s){let r=this._getElementRect(this.canvas);i-=r.left,s-=r.top;let h=this.canvas.width,n=this.canvas.height;i/=(r.right-r.left)/h,s/=(r.bottom-r.top)/n;let a=this._getPointerData(t);(a.inBounds=i>=0&&s>=0&&i<=h-1&&s<=n-1)?(a.x=i,a.y=s):this.mouseMoveOutside&&(a.x=i<0?0:i>h-1?h-1:i,a.y=s<0?0:s>n-1?n-1:s),a.posEvtObj=e,a.rawX=i,a.rawY=s,t!==this._primaryPointerID&&-1!==t||(this.mouseX=a.x,this.mouseY=a.y,this.mouseInBounds=a.inBounds)}_handleMouseUp(t){this._handlePointerUp(-1,t,!1)}_handlePointerUp(t,e,i,s){let r=this._nextStage,h=this._getPointerData(t);if(this._prevStage&&void 0===s)return;let n=null,a=h.target;s||!a&&!r||(n=this._getObjectsUnderPoint(h.x,h.y,null,!0)),h.down&&(this._dispatchMouseEvent(this,"stagemouseup",!1,t,h,e,n),h.down=!1),n===a&&this._dispatchMouseEvent(a,"click",!0,t,h,e),this._dispatchMouseEvent(a,"pressup",!0,t,h,e),i?(t==this._primaryPointerID&&(this._primaryPointerID=null),delete this._pointerData[t]):h.target=null,r&&r._handlePointerUp(t,e,i,s||n&&this)}_handleMouseDown(t){this._handlePointerDown(-1,t,t.pageX,t.pageY)}_handlePointerDown(t,e,i,s,r){this.preventSelection&&e.preventDefault(),null!=this._primaryPointerID&&-1!==t||(this._primaryPointerID=t),null!=s&&this._updatePointerPosition(t,e,i,s);let h=null,n=this._nextStage,a=this._getPointerData(t);r||(h=a.target=this._getObjectsUnderPoint(a.x,a.y,null,!0)),a.inBounds&&(this._dispatchMouseEvent(this,"stagemousedown",!1,t,a,e,h),a.down=!0),this._dispatchMouseEvent(h,"mousedown",!0,t,a,e),n&&n._handlePointerDown(t,e,i,s,r||h&&this)}_testMouseOver(t,e,i){if(this._prevStage&&void 0===e)return;let s=this._nextStage;if(!this._mouseOverIntervalID)return void(s&&s._testMouseOver(t,e,i));let r=this._getPointerData(-1);if(!r||!t&&this.mouseX===this._mouseOverX&&this.mouseY===this._mouseOverY&&this.mouseInBounds)return;let h=r.posEvtObj,n=i||h&&h.target===this.canvas,a=null,o=-1,l="";!e&&(t||this.mouseInBounds&&n)&&(a=this._getObjectsUnderPoint(this.mouseX,this.mouseY,null,!0),this._mouseOverX=this.mouseX,this._mouseOverY=this.mouseY);let c=this._mouseOverTarget||[],u=c[c.length-1],d=this._mouseOverTarget=[],p=a;for(;p;)d.unshift(p),l||(l=p.cursor),p=p.parent;this.canvas.style.cursor=l,!e&&i&&(i.canvas.style.cursor=l);for(let t=0,e=d.length;t<e&&d[t]==c[t];t++)o=t;u!=a&&this._dispatchMouseEvent(u,"mouseout",!0,-1,r,h,a);for(let t=c.length-1;t>o;t--)this._dispatchMouseEvent(c[t],"rollout",!1,-1,r,h,a);for(let t=d.length-1;t>o;t--)this._dispatchMouseEvent(d[t],"rollover",!1,-1,r,h,u);u!=a&&this._dispatchMouseEvent(a,"mouseover",!0,-1,r,h,u),s&&s._testMouseOver(t,e||a&&this,i||n&&this)}_handleDoubleClick(t,e){let i=null,s=this._nextStage,r=this._getPointerData(-1);e||(i=this._getObjectsUnderPoint(r.x,r.y,null,!0),this._dispatchMouseEvent(i,"dblclick",!0,-1,r,t)),s&&s._handleDoubleClick(t,e||i&&this)}_dispatchMouseEvent(t,e,i,s,r,h,n){if(!t||!i&&!t.hasEventListener(e))return;let a=new w(e,i,!1,r.x,r.y,h,s,s===this._primaryPointerID||-1===s,r.rawX,r.rawY,n);t.dispatchEvent(a)}}("myCanvas"),tt=new B;tt.graphics.beginFill("DarkRed").drawCircle(0,0,50),Z.addChild(tt),tt.x=300,tt.y=200,Q.get(tt,{loop:!0}).wait(300).to({x:740,y:400,scale:2},700).to({x:400,y:0,scale:1.4},1200).to({x:500,y:300,scale:3},1200).to({x:300,y:200,scale:1},700),function t(){Z.update();requestAnimationFrame(()=>t())}()}]);