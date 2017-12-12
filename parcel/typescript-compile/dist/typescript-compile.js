// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      function localRequire(x) {
        return newRequire(localRequire.resolve(x));
      }

      localRequire.resolve = function (x) {
        return modules[name][1][x] || x;
      };

      var module = cache[name] = new newRequire.Module;
      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;
  }

  function Module() {
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({13:[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error;
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^\)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^\/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;

},{}],12:[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
};

module.exports = reloadCSS;

},{"./bundle-url":13}],6:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":12}],8:[function(require,module,exports) {
"use strict";
exports.__esModule = true;
/**
 * イベント名の名前空間
 */
var EventName;
(function (EventName) {
    EventName.CLICK = "click";
    EventName.RESIZE = "resize";
    EventName.DOM_CONTENT_LOADED = "DOMContentLoaded";
    EventName.MOUSE_DOWN = "mousedown";
    EventName.MOUSE_MOVE = "mousemove";
    EventName.MOUSE_UP = "mouseup";
})(EventName = exports.EventName || (exports.EventName = {}));

},{}],11:[function(require,module,exports) {
"use strict";
exports.__esModule = true;
/**
 * イベント名の名前空間
 */
var SVGNameSpace;
(function (SVGNameSpace) {
    SVGNameSpace.SVG = "http://www.w3.org/2000/svg";
    SVGNameSpace.LINK = "http://www.w3.org/1999/xlink";
})(SVGNameSpace = exports.SVGNameSpace || (exports.SVGNameSpace = {}));

},{}],10:[function(require,module,exports) {
"use strict";
exports.__esModule = true;
var SVGNameSpace_1 = require("../svgnamespace/SVGNameSpace");
/**
 * パーティクルのクラス
 */
var SudaParticle = /** @class */ (function () {
    function SudaParticle(linkId, linePath, startTime) {
        if (startTime === void 0) { startTime = 0; }
        this.time = 0;
        this.view = document.createElementNS(SVGNameSpace_1.SVGNameSpace.SVG, "use");
        this.view.setAttributeNS(SVGNameSpace_1.SVGNameSpace.LINK, "href", linkId);
        this.linePath = linePath;
        this.pathTotalLength = linePath.getTotalLength();
        this.time = startTime;
        this.setSudaPosition(this.time);
    }
    SudaParticle.prototype.update = function () {
        this.time += 10;
        if (this.time >= this.pathTotalLength) {
            this.time = 0;
        }
        this.setSudaPosition(this.time);
    };
    SudaParticle.prototype.setSudaPosition = function (targetTime) {
        var targetPoint = this.linePath.getPointAtLength(targetTime);
        var prevTime = targetTime - 1;
        if (prevTime < 0) {
            prevTime = this.pathTotalLength - 1;
        }
        var prevPoint = this.linePath.getPointAtLength(prevTime);
        var vx = prevPoint.x - targetPoint.x;
        var vy = prevPoint.y - targetPoint.y;
        var angle = Math.atan2(vy, vx) * (180 / Math.PI) - 180;
        this.view.setAttribute("transform", "translate(" + targetPoint.x + ", " + targetPoint.y + ") rotate(" + angle + ")");
    };
    return SudaParticle;
}());
exports["default"] = SudaParticle;

},{"../svgnamespace/SVGNameSpace":11}],9:[function(require,module,exports) {
"use strict";
exports.__esModule = true;
var SudaParticle_1 = require("./SudaParticle");
var SVGNameSpace_1 = require("../svgnamespace/SVGNameSpace");
var SudaParticleEmitter = /** @class */ (function () {
    function SudaParticleEmitter() {
        this.view = document.createElementNS(SVGNameSpace_1.SVGNameSpace.SVG, "g");
        this.particles = [];
        // メインのレイヤーを配置
        this.linePath = document.getElementById("linePath");
        if (!this.linePath) {
            return;
        }
        for (var i = 0; i < 1; i++) {
            this.increseSuda(i);
        }
    }
    SudaParticleEmitter.prototype.update = function () {
        if (!this.particles || this.particles.length <= 0) {
            return;
        }
        for (var _i = 0, _a = this.particles; _i < _a.length; _i++) {
            var particle = _a[_i];
            particle.update();
        }
    };
    SudaParticleEmitter.prototype.increseSuda = function (startTime) {
        if (startTime === void 0) { startTime = 0; }
        var particle = new SudaParticle_1["default"]("#suda", this.linePath, startTime);
        this.particles.push(particle);
        this.view.appendChild(particle.view);
    };
    return SudaParticleEmitter;
}());
exports["default"] = SudaParticleEmitter;

},{"./SudaParticle":10,"../svgnamespace/SVGNameSpace":11}],7:[function(require,module,exports) {
"use strict";
exports.__esModule = true;
var EventName_1 = require("./eventname/EventName");
var SudaParticleEmitter_1 = require("./particle/SudaParticleEmitter");
var Main3 = /** @class */ (function () {
    function Main3() {
        var _this = this;
        var svgField = document.querySelector("#tonkotuField");
        this.sudaEmitter = new SudaParticleEmitter_1["default"]();
        svgField.appendChild(this.sudaEmitter.view);
        document.getElementById("syringe").addEventListener(EventName_1.EventName.CLICK, function (event) { return _this.onFieldClick(event); });
        this.render();
    }
    Main3.prototype.render = function () {
        var _this = this;
        if (!this.sudaEmitter) {
            return;
        }
        this.sudaEmitter.update();
        requestAnimationFrame(function () { return _this.render(); });
    };
    Main3.prototype.onFieldClick = function (event) {
        if (!this.sudaEmitter) {
            return;
        }
        this.sudaEmitter.increseSuda();
    };
    return Main3;
}());
window.addEventListener(EventName_1.EventName.DOM_CONTENT_LOADED, function () { return new Main3(); });

},{"./eventname/EventName":8,"./particle/SudaParticleEmitter":9}],4:[function(require,module,exports) {
"use strict";

require("./style/style3.css");

require("./script/Main.ts");
},{"./style/style3.css":6,"./script/Main.ts":7}],0:[function(require,module,exports) {
var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module() {
  OldModule.call(this);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

if (!module.bundle.parent) {
  var ws = new WebSocket('ws://10.0.1.19:52253/');
  ws.onmessage = function(event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.require, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      window.location.reload();
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
    }

    if (data.type === 'error') {
      // console.error(`[parcel] ${data.error.message}\n${data.error.stack}`);
    }
  };
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || (Array.isArray(dep) && dep[dep.length - 1] === id)) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(function (id) {
    return hmrAccept(global.require, id)
  });
}
},{}]},{},[0,4])