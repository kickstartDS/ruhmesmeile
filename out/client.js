var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/@kickstartds/core/lib/component/uid.js
function n() {
  return `${Date.now().toString(36)}${t++}`;
}
var t;
var init_uid = __esm({
  "node_modules/@kickstartds/core/lib/component/uid.js"() {
    t = 0;
  }
});

// node_modules/@kickstartds/core/lib/core/domLoaded.js
function o(o3) {
  e && (t2() ? setTimeout(o3) : n2.push(o3));
}
var e, t2, n2;
var init_domLoaded = __esm({
  "node_modules/@kickstartds/core/lib/core/domLoaded.js"() {
    e = "undefined" != typeof window;
    t2 = () => e && ("interactive" === document.readyState || "complete" === document.readyState);
    n2 = [];
    e && !t2() && document.addEventListener("DOMContentLoaded", () => {
      for (; n2.length; )
        n2.pop()();
    });
  }
});

// node_modules/lazysizes/lazysizes.js
var require_lazysizes = __commonJS({
  "node_modules/lazysizes/lazysizes.js"(exports, module) {
    (function(window2, factory) {
      var lazySizes = factory(window2, window2.document, Date);
      window2.lazySizes = lazySizes;
      if (typeof module == "object" && module.exports) {
        module.exports = lazySizes;
      }
    })(
      typeof window != "undefined" ? window : {},
      /**
       * import("./types/global")
       * @typedef { import("./types/lazysizes-config").LazySizesConfigPartial } LazySizesConfigPartial
       */
      function l2(window2, document2, Date2) {
        "use strict";
        var lazysizes, lazySizesCfg;
        (function() {
          var prop;
          var lazySizesDefaults = {
            lazyClass: "lazyload",
            loadedClass: "lazyloaded",
            loadingClass: "lazyloading",
            preloadClass: "lazypreload",
            errorClass: "lazyerror",
            //strictClass: 'lazystrict',
            autosizesClass: "lazyautosizes",
            fastLoadedClass: "ls-is-cached",
            iframeLoadMode: 0,
            srcAttr: "data-src",
            srcsetAttr: "data-srcset",
            sizesAttr: "data-sizes",
            //preloadAfterLoad: false,
            minSize: 40,
            customMedia: {},
            init: true,
            expFactor: 1.5,
            hFac: 0.8,
            loadMode: 2,
            loadHidden: true,
            ricTimeout: 0,
            throttleDelay: 125
          };
          lazySizesCfg = window2.lazySizesConfig || window2.lazysizesConfig || {};
          for (prop in lazySizesDefaults) {
            if (!(prop in lazySizesCfg)) {
              lazySizesCfg[prop] = lazySizesDefaults[prop];
            }
          }
        })();
        if (!document2 || !document2.getElementsByClassName) {
          return {
            init: function() {
            },
            /**
             * @type { LazySizesConfigPartial }
             */
            cfg: lazySizesCfg,
            /**
             * @type { true }
             */
            noSupport: true
          };
        }
        var docElem = document2.documentElement;
        var supportPicture = window2.HTMLPictureElement;
        var _addEventListener = "addEventListener";
        var _getAttribute = "getAttribute";
        var addEventListener = window2[_addEventListener].bind(window2);
        var setTimeout2 = window2.setTimeout;
        var requestAnimationFrame2 = window2.requestAnimationFrame || setTimeout2;
        var requestIdleCallback = window2.requestIdleCallback;
        var regPicture = /^picture$/i;
        var loadEvents = ["load", "error", "lazyincluded", "_lazyloaded"];
        var regClassCache = {};
        var forEach = Array.prototype.forEach;
        var hasClass = function(ele, cls) {
          if (!regClassCache[cls]) {
            regClassCache[cls] = new RegExp("(\\s|^)" + cls + "(\\s|$)");
          }
          return regClassCache[cls].test(ele[_getAttribute]("class") || "") && regClassCache[cls];
        };
        var addClass = function(ele, cls) {
          if (!hasClass(ele, cls)) {
            ele.setAttribute("class", (ele[_getAttribute]("class") || "").trim() + " " + cls);
          }
        };
        var removeClass = function(ele, cls) {
          var reg;
          if (reg = hasClass(ele, cls)) {
            ele.setAttribute("class", (ele[_getAttribute]("class") || "").replace(reg, " "));
          }
        };
        var addRemoveLoadEvents = function(dom, fn, add) {
          var action = add ? _addEventListener : "removeEventListener";
          if (add) {
            addRemoveLoadEvents(dom, fn);
          }
          loadEvents.forEach(function(evt) {
            dom[action](evt, fn);
          });
        };
        var triggerEvent = function(elem, name, detail, noBubbles, noCancelable) {
          var event = document2.createEvent("Event");
          if (!detail) {
            detail = {};
          }
          detail.instance = lazysizes;
          event.initEvent(name, !noBubbles, !noCancelable);
          event.detail = detail;
          elem.dispatchEvent(event);
          return event;
        };
        var updatePolyfill = function(el, full) {
          var polyfill;
          if (!supportPicture && (polyfill = window2.picturefill || lazySizesCfg.pf)) {
            if (full && full.src && !el[_getAttribute]("srcset")) {
              el.setAttribute("srcset", full.src);
            }
            polyfill({ reevaluate: true, elements: [el] });
          } else if (full && full.src) {
            el.src = full.src;
          }
        };
        var getCSS = function(elem, style) {
          return (getComputedStyle(elem, null) || {})[style];
        };
        var getWidth = function(elem, parent, width) {
          width = width || elem.offsetWidth;
          while (width < lazySizesCfg.minSize && parent && !elem._lazysizesWidth) {
            width = parent.offsetWidth;
            parent = parent.parentNode;
          }
          return width;
        };
        var rAF = function() {
          var running, waiting;
          var firstFns = [];
          var secondFns = [];
          var fns = firstFns;
          var run = function() {
            var runFns = fns;
            fns = firstFns.length ? secondFns : firstFns;
            running = true;
            waiting = false;
            while (runFns.length) {
              runFns.shift()();
            }
            running = false;
          };
          var rafBatch = function(fn, queue) {
            if (running && !queue) {
              fn.apply(this, arguments);
            } else {
              fns.push(fn);
              if (!waiting) {
                waiting = true;
                (document2.hidden ? setTimeout2 : requestAnimationFrame2)(run);
              }
            }
          };
          rafBatch._lsFlush = run;
          return rafBatch;
        }();
        var rAFIt = function(fn, simple) {
          return simple ? function() {
            rAF(fn);
          } : function() {
            var that = this;
            var args = arguments;
            rAF(function() {
              fn.apply(that, args);
            });
          };
        };
        var throttle = function(fn) {
          var running;
          var lastTime = 0;
          var gDelay = lazySizesCfg.throttleDelay;
          var rICTimeout = lazySizesCfg.ricTimeout;
          var run = function() {
            running = false;
            lastTime = Date2.now();
            fn();
          };
          var idleCallback = requestIdleCallback && rICTimeout > 49 ? function() {
            requestIdleCallback(run, { timeout: rICTimeout });
            if (rICTimeout !== lazySizesCfg.ricTimeout) {
              rICTimeout = lazySizesCfg.ricTimeout;
            }
          } : rAFIt(function() {
            setTimeout2(run);
          }, true);
          return function(isPriority) {
            var delay;
            if (isPriority = isPriority === true) {
              rICTimeout = 33;
            }
            if (running) {
              return;
            }
            running = true;
            delay = gDelay - (Date2.now() - lastTime);
            if (delay < 0) {
              delay = 0;
            }
            if (isPriority || delay < 9) {
              idleCallback();
            } else {
              setTimeout2(idleCallback, delay);
            }
          };
        };
        var debounce = function(func) {
          var timeout, timestamp;
          var wait = 99;
          var run = function() {
            timeout = null;
            func();
          };
          var later = function() {
            var last = Date2.now() - timestamp;
            if (last < wait) {
              setTimeout2(later, wait - last);
            } else {
              (requestIdleCallback || run)(run);
            }
          };
          return function() {
            timestamp = Date2.now();
            if (!timeout) {
              timeout = setTimeout2(later, wait);
            }
          };
        };
        var loader = function() {
          var preloadElems, isCompleted, resetPreloadingTimer, loadMode, started;
          var eLvW, elvH, eLtop, eLleft, eLright, eLbottom, isBodyHidden;
          var regImg = /^img$/i;
          var regIframe = /^iframe$/i;
          var supportScroll = "onscroll" in window2 && !/(gle|ing)bot/.test(navigator.userAgent);
          var shrinkExpand = 0;
          var currentExpand = 0;
          var isLoading = 0;
          var lowRuns = -1;
          var resetPreloading = function(e3) {
            isLoading--;
            if (!e3 || isLoading < 0 || !e3.target) {
              isLoading = 0;
            }
          };
          var isVisible = function(elem) {
            if (isBodyHidden == null) {
              isBodyHidden = getCSS(document2.body, "visibility") == "hidden";
            }
            return isBodyHidden || !(getCSS(elem.parentNode, "visibility") == "hidden" && getCSS(elem, "visibility") == "hidden");
          };
          var isNestedVisible = function(elem, elemExpand) {
            var outerRect;
            var parent = elem;
            var visible = isVisible(elem);
            eLtop -= elemExpand;
            eLbottom += elemExpand;
            eLleft -= elemExpand;
            eLright += elemExpand;
            while (visible && (parent = parent.offsetParent) && parent != document2.body && parent != docElem) {
              visible = (getCSS(parent, "opacity") || 1) > 0;
              if (visible && getCSS(parent, "overflow") != "visible") {
                outerRect = parent.getBoundingClientRect();
                visible = eLright > outerRect.left && eLleft < outerRect.right && eLbottom > outerRect.top - 1 && eLtop < outerRect.bottom + 1;
              }
            }
            return visible;
          };
          var checkElements = function() {
            var eLlen, i3, rect, autoLoadElem, loadedSomething, elemExpand, elemNegativeExpand, elemExpandVal, beforeExpandVal, defaultExpand, preloadExpand, hFac;
            var lazyloadElems = lazysizes.elements;
            if ((loadMode = lazySizesCfg.loadMode) && isLoading < 8 && (eLlen = lazyloadElems.length)) {
              i3 = 0;
              lowRuns++;
              for (; i3 < eLlen; i3++) {
                if (!lazyloadElems[i3] || lazyloadElems[i3]._lazyRace) {
                  continue;
                }
                if (!supportScroll || lazysizes.prematureUnveil && lazysizes.prematureUnveil(lazyloadElems[i3])) {
                  unveilElement(lazyloadElems[i3]);
                  continue;
                }
                if (!(elemExpandVal = lazyloadElems[i3][_getAttribute]("data-expand")) || !(elemExpand = elemExpandVal * 1)) {
                  elemExpand = currentExpand;
                }
                if (!defaultExpand) {
                  defaultExpand = !lazySizesCfg.expand || lazySizesCfg.expand < 1 ? docElem.clientHeight > 500 && docElem.clientWidth > 500 ? 500 : 370 : lazySizesCfg.expand;
                  lazysizes._defEx = defaultExpand;
                  preloadExpand = defaultExpand * lazySizesCfg.expFactor;
                  hFac = lazySizesCfg.hFac;
                  isBodyHidden = null;
                  if (currentExpand < preloadExpand && isLoading < 1 && lowRuns > 2 && loadMode > 2 && !document2.hidden) {
                    currentExpand = preloadExpand;
                    lowRuns = 0;
                  } else if (loadMode > 1 && lowRuns > 1 && isLoading < 6) {
                    currentExpand = defaultExpand;
                  } else {
                    currentExpand = shrinkExpand;
                  }
                }
                if (beforeExpandVal !== elemExpand) {
                  eLvW = innerWidth + elemExpand * hFac;
                  elvH = innerHeight + elemExpand;
                  elemNegativeExpand = elemExpand * -1;
                  beforeExpandVal = elemExpand;
                }
                rect = lazyloadElems[i3].getBoundingClientRect();
                if ((eLbottom = rect.bottom) >= elemNegativeExpand && (eLtop = rect.top) <= elvH && (eLright = rect.right) >= elemNegativeExpand * hFac && (eLleft = rect.left) <= eLvW && (eLbottom || eLright || eLleft || eLtop) && (lazySizesCfg.loadHidden || isVisible(lazyloadElems[i3])) && (isCompleted && isLoading < 3 && !elemExpandVal && (loadMode < 3 || lowRuns < 4) || isNestedVisible(lazyloadElems[i3], elemExpand))) {
                  unveilElement(lazyloadElems[i3]);
                  loadedSomething = true;
                  if (isLoading > 9) {
                    break;
                  }
                } else if (!loadedSomething && isCompleted && !autoLoadElem && isLoading < 4 && lowRuns < 4 && loadMode > 2 && (preloadElems[0] || lazySizesCfg.preloadAfterLoad) && (preloadElems[0] || !elemExpandVal && (eLbottom || eLright || eLleft || eLtop || lazyloadElems[i3][_getAttribute](lazySizesCfg.sizesAttr) != "auto"))) {
                  autoLoadElem = preloadElems[0] || lazyloadElems[i3];
                }
              }
              if (autoLoadElem && !loadedSomething) {
                unveilElement(autoLoadElem);
              }
            }
          };
          var throttledCheckElements = throttle(checkElements);
          var switchLoadingClass = function(e3) {
            var elem = e3.target;
            if (elem._lazyCache) {
              delete elem._lazyCache;
              return;
            }
            resetPreloading(e3);
            addClass(elem, lazySizesCfg.loadedClass);
            removeClass(elem, lazySizesCfg.loadingClass);
            addRemoveLoadEvents(elem, rafSwitchLoadingClass);
            triggerEvent(elem, "lazyloaded");
          };
          var rafedSwitchLoadingClass = rAFIt(switchLoadingClass);
          var rafSwitchLoadingClass = function(e3) {
            rafedSwitchLoadingClass({ target: e3.target });
          };
          var changeIframeSrc = function(elem, src) {
            var loadMode2 = elem.getAttribute("data-load-mode") || lazySizesCfg.iframeLoadMode;
            if (loadMode2 == 0) {
              elem.contentWindow.location.replace(src);
            } else if (loadMode2 == 1) {
              elem.src = src;
            }
          };
          var handleSources = function(source) {
            var customMedia;
            var sourceSrcset = source[_getAttribute](lazySizesCfg.srcsetAttr);
            if (customMedia = lazySizesCfg.customMedia[source[_getAttribute]("data-media") || source[_getAttribute]("media")]) {
              source.setAttribute("media", customMedia);
            }
            if (sourceSrcset) {
              source.setAttribute("srcset", sourceSrcset);
            }
          };
          var lazyUnveil = rAFIt(function(elem, detail, isAuto, sizes, isImg) {
            var src, srcset, parent, isPicture, event, firesLoad;
            if (!(event = triggerEvent(elem, "lazybeforeunveil", detail)).defaultPrevented) {
              if (sizes) {
                if (isAuto) {
                  addClass(elem, lazySizesCfg.autosizesClass);
                } else {
                  elem.setAttribute("sizes", sizes);
                }
              }
              srcset = elem[_getAttribute](lazySizesCfg.srcsetAttr);
              src = elem[_getAttribute](lazySizesCfg.srcAttr);
              if (isImg) {
                parent = elem.parentNode;
                isPicture = parent && regPicture.test(parent.nodeName || "");
              }
              firesLoad = detail.firesLoad || "src" in elem && (srcset || src || isPicture);
              event = { target: elem };
              addClass(elem, lazySizesCfg.loadingClass);
              if (firesLoad) {
                clearTimeout(resetPreloadingTimer);
                resetPreloadingTimer = setTimeout2(resetPreloading, 2500);
                addRemoveLoadEvents(elem, rafSwitchLoadingClass, true);
              }
              if (isPicture) {
                forEach.call(parent.getElementsByTagName("source"), handleSources);
              }
              if (srcset) {
                elem.setAttribute("srcset", srcset);
              } else if (src && !isPicture) {
                if (regIframe.test(elem.nodeName)) {
                  changeIframeSrc(elem, src);
                } else {
                  elem.src = src;
                }
              }
              if (isImg && (srcset || isPicture)) {
                updatePolyfill(elem, { src });
              }
            }
            if (elem._lazyRace) {
              delete elem._lazyRace;
            }
            removeClass(elem, lazySizesCfg.lazyClass);
            rAF(function() {
              var isLoaded = elem.complete && elem.naturalWidth > 1;
              if (!firesLoad || isLoaded) {
                if (isLoaded) {
                  addClass(elem, lazySizesCfg.fastLoadedClass);
                }
                switchLoadingClass(event);
                elem._lazyCache = true;
                setTimeout2(function() {
                  if ("_lazyCache" in elem) {
                    delete elem._lazyCache;
                  }
                }, 9);
              }
              if (elem.loading == "lazy") {
                isLoading--;
              }
            }, true);
          });
          var unveilElement = function(elem) {
            if (elem._lazyRace) {
              return;
            }
            var detail;
            var isImg = regImg.test(elem.nodeName);
            var sizes = isImg && (elem[_getAttribute](lazySizesCfg.sizesAttr) || elem[_getAttribute]("sizes"));
            var isAuto = sizes == "auto";
            if ((isAuto || !isCompleted) && isImg && (elem[_getAttribute]("src") || elem.srcset) && !elem.complete && !hasClass(elem, lazySizesCfg.errorClass) && hasClass(elem, lazySizesCfg.lazyClass)) {
              return;
            }
            detail = triggerEvent(elem, "lazyunveilread").detail;
            if (isAuto) {
              autoSizer.updateElem(elem, true, elem.offsetWidth);
            }
            elem._lazyRace = true;
            isLoading++;
            lazyUnveil(elem, detail, isAuto, sizes, isImg);
          };
          var afterScroll = debounce(function() {
            lazySizesCfg.loadMode = 3;
            throttledCheckElements();
          });
          var altLoadmodeScrollListner = function() {
            if (lazySizesCfg.loadMode == 3) {
              lazySizesCfg.loadMode = 2;
            }
            afterScroll();
          };
          var onload = function() {
            if (isCompleted) {
              return;
            }
            if (Date2.now() - started < 999) {
              setTimeout2(onload, 999);
              return;
            }
            isCompleted = true;
            lazySizesCfg.loadMode = 3;
            throttledCheckElements();
            addEventListener("scroll", altLoadmodeScrollListner, true);
          };
          return {
            _: function() {
              started = Date2.now();
              lazysizes.elements = document2.getElementsByClassName(lazySizesCfg.lazyClass);
              preloadElems = document2.getElementsByClassName(lazySizesCfg.lazyClass + " " + lazySizesCfg.preloadClass);
              addEventListener("scroll", throttledCheckElements, true);
              addEventListener("resize", throttledCheckElements, true);
              addEventListener("pageshow", function(e3) {
                if (e3.persisted) {
                  var loadingElements = document2.querySelectorAll("." + lazySizesCfg.loadingClass);
                  if (loadingElements.length && loadingElements.forEach) {
                    requestAnimationFrame2(function() {
                      loadingElements.forEach(function(img) {
                        if (img.complete) {
                          unveilElement(img);
                        }
                      });
                    });
                  }
                }
              });
              if (window2.MutationObserver) {
                new MutationObserver(throttledCheckElements).observe(docElem, { childList: true, subtree: true, attributes: true });
              } else {
                docElem[_addEventListener]("DOMNodeInserted", throttledCheckElements, true);
                docElem[_addEventListener]("DOMAttrModified", throttledCheckElements, true);
                setInterval(throttledCheckElements, 999);
              }
              addEventListener("hashchange", throttledCheckElements, true);
              ["focus", "mouseover", "click", "load", "transitionend", "animationend"].forEach(function(name) {
                document2[_addEventListener](name, throttledCheckElements, true);
              });
              if (/d$|^c/.test(document2.readyState)) {
                onload();
              } else {
                addEventListener("load", onload);
                document2[_addEventListener]("DOMContentLoaded", throttledCheckElements);
                setTimeout2(onload, 2e4);
              }
              if (lazysizes.elements.length) {
                checkElements();
                rAF._lsFlush();
              } else {
                throttledCheckElements();
              }
            },
            checkElems: throttledCheckElements,
            unveil: unveilElement,
            _aLSL: altLoadmodeScrollListner
          };
        }();
        var autoSizer = function() {
          var autosizesElems;
          var sizeElement = rAFIt(function(elem, parent, event, width) {
            var sources, i3, len;
            elem._lazysizesWidth = width;
            width += "px";
            elem.setAttribute("sizes", width);
            if (regPicture.test(parent.nodeName || "")) {
              sources = parent.getElementsByTagName("source");
              for (i3 = 0, len = sources.length; i3 < len; i3++) {
                sources[i3].setAttribute("sizes", width);
              }
            }
            if (!event.detail.dataAttr) {
              updatePolyfill(elem, event.detail);
            }
          });
          var getSizeElement = function(elem, dataAttr, width) {
            var event;
            var parent = elem.parentNode;
            if (parent) {
              width = getWidth(elem, parent, width);
              event = triggerEvent(elem, "lazybeforesizes", { width, dataAttr: !!dataAttr });
              if (!event.defaultPrevented) {
                width = event.detail.width;
                if (width && width !== elem._lazysizesWidth) {
                  sizeElement(elem, parent, event, width);
                }
              }
            }
          };
          var updateElementsSizes = function() {
            var i3;
            var len = autosizesElems.length;
            if (len) {
              i3 = 0;
              for (; i3 < len; i3++) {
                getSizeElement(autosizesElems[i3]);
              }
            }
          };
          var debouncedUpdateElementsSizes = debounce(updateElementsSizes);
          return {
            _: function() {
              autosizesElems = document2.getElementsByClassName(lazySizesCfg.autosizesClass);
              addEventListener("resize", debouncedUpdateElementsSizes);
            },
            checkElems: debouncedUpdateElementsSizes,
            updateElem: getSizeElement
          };
        }();
        var init = function() {
          if (!init.i && document2.getElementsByClassName) {
            init.i = true;
            autoSizer._();
            loader._();
          }
        };
        setTimeout2(function() {
          if (lazySizesCfg.init) {
            init();
          }
        });
        lazysizes = {
          /**
           * @type { LazySizesConfigPartial }
           */
          cfg: lazySizesCfg,
          autoSizer,
          loader,
          init,
          uP: updatePolyfill,
          aC: addClass,
          rC: removeClass,
          hC: hasClass,
          fire: triggerEvent,
          gW: getWidth,
          rAF
        };
        return lazysizes;
      }
    );
  }
});

// node_modules/@kickstartds/core/lib/core/lazysizes.js
var import_lazysizes, t3;
var init_lazysizes = __esm({
  "node_modules/@kickstartds/core/lib/core/lazysizes.js"() {
    import_lazysizes = __toESM(require_lazysizes());
    init_domLoaded();
    t3 = { beforeunveil: "core.lazysizes.beforeunveil" };
    e && document.addEventListener("lazybeforeunveil", (e3) => {
      const o3 = e3.target.getAttribute("ks-component");
      o3 ? window._ks.radio.emit(`${t3.beforeunveil}.${o3}`, e3.target) : window._ks.radio.emit(t3.beforeunveil, e3.target);
      const r3 = e3.target.getAttribute("data-bg");
      r3 && (e3.target.style.backgroundImage = `url(${r3})`);
    });
  }
});

// node_modules/@kickstartds/core/lib/component/define.js
var import_lazysizes3, r, n3, c, i, a, d, l, u, b;
var init_define = __esm({
  "node_modules/@kickstartds/core/lib/component/define.js"() {
    init_uid();
    init_domLoaded();
    init_lazysizes();
    import_lazysizes3 = __toESM(require_lazysizes());
    r = {};
    n3 = "ks-component";
    c = "data-uid";
    i = (t5, e3) => t5.forEach((t6) => {
      if (t6.nodeType === Node.ELEMENT_NODE) {
        [t6, ...t6.querySelectorAll(`[${n3}]`)].forEach(e3);
      }
    });
    a = (t5) => t5 ? t5.isComponent ? t5 : t5().then((t6) => t6.default || t6) : null;
    d = (e3, o3, r3) => new Promise((t5) => {
      if (e3.classList.contains("lazyload") && !e3.classList.contains("lazyloaded")) {
        const n6 = window._ks.radio.on(`${t3.beforeunveil}.${o3}`, (o4, s2) => {
          s2 === e3 && (window._ks.radio.off(n6), t5(r3));
        });
      } else
        t5(r3);
    }).then(a).then((o4) => {
      o4 && !e3.hasAttribute(c) && (e3.setAttribute(c, n()), e3._ks = { d: [] }, new o4(e3));
    }).catch((t5) => {
      console.error(`Error in ${o3}:`), console.error(t5);
    });
    l = (t5) => i(t5, (t6) => {
      if (t6.hasAttribute(c))
        return;
      const e3 = t6.getAttribute(n3);
      const o3 = r[e3];
      o3 && d(t6, e3, o3);
    });
    u = (t5) => i(t5, (t6) => {
      var e3;
      t6.removeAttribute(c), null == (e3 = t6._ks) || e3.d.forEach((t7) => {
        try {
          t7();
        } catch (e4) {
        }
      }), delete t6._ks;
    });
    b = (t5, e3) => {
      r[t5] = e3, o(() => {
        document.body.querySelectorAll(`[${n3}="${t5}"]`).forEach((o3) => d(o3, t5, e3));
      });
    };
    if (e) {
      const t5 = new MutationObserver((t6) => {
        t6.forEach((t7) => {
          switch (t7.type) {
            case "attributes":
              const { target: e3 } = t7;
              t7.oldValue && u([e3]), e3.hasAttribute(n3) && l([e3]);
              break;
            case "childList":
              l(t7.addedNodes), u(t7.removedNodes);
          }
        });
      });
      o(() => {
        t5.observe(document.body, { childList: true, subtree: true, attributes: true, attributeOldValue: true, attributeFilter: [n3, c] });
      });
    }
  }
});

// node_modules/@babel/runtime/helpers/esm/typeof.js
function _typeof(o3) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o4) {
    return typeof o4;
  } : function(o4) {
    return o4 && "function" == typeof Symbol && o4.constructor === Symbol && o4 !== Symbol.prototype ? "symbol" : typeof o4;
  }, _typeof(o3);
}
var init_typeof = __esm({
  "node_modules/@babel/runtime/helpers/esm/typeof.js"() {
  }
});

// node_modules/@babel/runtime/helpers/esm/toPrimitive.js
function toPrimitive(t5, r3) {
  if ("object" != _typeof(t5) || !t5)
    return t5;
  var e3 = t5[Symbol.toPrimitive];
  if (void 0 !== e3) {
    var i3 = e3.call(t5, r3 || "default");
    if ("object" != _typeof(i3))
      return i3;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r3 ? String : Number)(t5);
}
var init_toPrimitive = __esm({
  "node_modules/@babel/runtime/helpers/esm/toPrimitive.js"() {
    init_typeof();
  }
});

// node_modules/@babel/runtime/helpers/esm/toPropertyKey.js
function toPropertyKey(t5) {
  var i3 = toPrimitive(t5, "string");
  return "symbol" == _typeof(i3) ? i3 : i3 + "";
}
var init_toPropertyKey = __esm({
  "node_modules/@babel/runtime/helpers/esm/toPropertyKey.js"() {
    init_typeof();
    init_toPrimitive();
  }
});

// node_modules/@babel/runtime/helpers/esm/defineProperty.js
function _defineProperty(e3, r3, t5) {
  return (r3 = toPropertyKey(r3)) in e3 ? Object.defineProperty(e3, r3, {
    value: t5,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e3[r3] = t5, e3;
}
var init_defineProperty = __esm({
  "node_modules/@babel/runtime/helpers/esm/defineProperty.js"() {
    init_toPropertyKey();
  }
});

// node_modules/@kickstartds/core/lib/component/Component.js
var Component;
var init_Component = __esm({
  "node_modules/@kickstartds/core/lib/component/Component.js"() {
    init_defineProperty();
    Component = class {
      constructor(t5) {
        if (this.element = t5, this.constructor.actions) {
          const n6 = Object.keys(this.constructor.actions);
          window._ks.radio.off(this.publicApiSubscription), this.publicApiSubscription = window._ks.radio.on(this.constructor.identifier, (o3, { args: i3 = [], element: s2 } = {}) => {
            const e3 = o3.split(".")[2];
            !e3 || !n6.includes(e3) || s2 && s2 !== t5 || this[e3](...i3);
          }), this.onDisconnect(() => window._ks.radio.off(this.publicApiSubscription));
        }
      }
      handleEvent(t5) {
        this[`on${t5.type}`](t5);
      }
      onDisconnect(t5) {
        this.element._ks.d.push(t5);
      }
    };
    _defineProperty(Component, "isComponent", true), _defineProperty(Component, "identifier", ""), _defineProperty(Component, "events", {}), _defineProperty(Component, "actions", {});
  }
});

// node_modules/@kickstartds/core/lib/component/index.js
var init_component = __esm({
  "node_modules/@kickstartds/core/lib/component/index.js"() {
    init_uid();
    init_define();
    init_Component();
  }
});

// node_modules/pubsub-js/src/pubsub.js
var require_pubsub = __commonJS({
  "node_modules/pubsub-js/src/pubsub.js"(exports, module) {
    (function(root, factory) {
      "use strict";
      var PubSub = {};
      if (root.PubSub) {
        PubSub = root.PubSub;
        console.warn("PubSub already loaded, using existing version");
      } else {
        root.PubSub = PubSub;
        factory(PubSub);
      }
      if (typeof exports === "object") {
        if (module !== void 0 && module.exports) {
          exports = module.exports = PubSub;
        }
        exports.PubSub = PubSub;
        module.exports = exports = PubSub;
      } else if (typeof define === "function" && define.amd) {
        define(function() {
          return PubSub;
        });
      }
    })(typeof window === "object" && window || exports, function(PubSub) {
      "use strict";
      var messages = {}, lastUid = -1, ALL_SUBSCRIBING_MSG = "*";
      function hasKeys(obj) {
        var key;
        for (key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            return true;
          }
        }
        return false;
      }
      function throwException(ex) {
        return function reThrowException() {
          throw ex;
        };
      }
      function callSubscriberWithDelayedExceptions(subscriber, message, data) {
        try {
          subscriber(message, data);
        } catch (ex) {
          setTimeout(throwException(ex), 0);
        }
      }
      function callSubscriberWithImmediateExceptions(subscriber, message, data) {
        subscriber(message, data);
      }
      function deliverMessage(originalMessage, matchedMessage, data, immediateExceptions) {
        var subscribers = messages[matchedMessage], callSubscriber = immediateExceptions ? callSubscriberWithImmediateExceptions : callSubscriberWithDelayedExceptions, s2;
        if (!Object.prototype.hasOwnProperty.call(messages, matchedMessage)) {
          return;
        }
        for (s2 in subscribers) {
          if (Object.prototype.hasOwnProperty.call(subscribers, s2)) {
            callSubscriber(subscribers[s2], originalMessage, data);
          }
        }
      }
      function createDeliveryFunction(message, data, immediateExceptions) {
        return function deliverNamespaced() {
          var topic = String(message), position = topic.lastIndexOf(".");
          deliverMessage(message, message, data, immediateExceptions);
          while (position !== -1) {
            topic = topic.substr(0, position);
            position = topic.lastIndexOf(".");
            deliverMessage(message, topic, data, immediateExceptions);
          }
          deliverMessage(message, ALL_SUBSCRIBING_MSG, data, immediateExceptions);
        };
      }
      function hasDirectSubscribersFor(message) {
        var topic = String(message), found = Boolean(Object.prototype.hasOwnProperty.call(messages, topic) && hasKeys(messages[topic]));
        return found;
      }
      function messageHasSubscribers(message) {
        var topic = String(message), found = hasDirectSubscribersFor(topic) || hasDirectSubscribersFor(ALL_SUBSCRIBING_MSG), position = topic.lastIndexOf(".");
        while (!found && position !== -1) {
          topic = topic.substr(0, position);
          position = topic.lastIndexOf(".");
          found = hasDirectSubscribersFor(topic);
        }
        return found;
      }
      function publish(message, data, sync, immediateExceptions) {
        message = typeof message === "symbol" ? message.toString() : message;
        var deliver = createDeliveryFunction(message, data, immediateExceptions), hasSubscribers = messageHasSubscribers(message);
        if (!hasSubscribers) {
          return false;
        }
        if (sync === true) {
          deliver();
        } else {
          setTimeout(deliver, 0);
        }
        return true;
      }
      PubSub.publish = function(message, data) {
        return publish(message, data, false, PubSub.immediateExceptions);
      };
      PubSub.publishSync = function(message, data) {
        return publish(message, data, true, PubSub.immediateExceptions);
      };
      PubSub.subscribe = function(message, func) {
        if (typeof func !== "function") {
          return false;
        }
        message = typeof message === "symbol" ? message.toString() : message;
        if (!Object.prototype.hasOwnProperty.call(messages, message)) {
          messages[message] = {};
        }
        var token = "uid_" + String(++lastUid);
        messages[message][token] = func;
        return token;
      };
      PubSub.subscribeAll = function(func) {
        return PubSub.subscribe(ALL_SUBSCRIBING_MSG, func);
      };
      PubSub.subscribeOnce = function(message, func) {
        var token = PubSub.subscribe(message, function() {
          PubSub.unsubscribe(token);
          func.apply(this, arguments);
        });
        return PubSub;
      };
      PubSub.clearAllSubscriptions = function clearAllSubscriptions() {
        messages = {};
      };
      PubSub.clearSubscriptions = function clearSubscriptions(topic) {
        var m;
        for (m in messages) {
          if (Object.prototype.hasOwnProperty.call(messages, m) && m.indexOf(topic) === 0) {
            delete messages[m];
          }
        }
      };
      PubSub.countSubscriptions = function countSubscriptions(topic) {
        var m;
        var token;
        var count = 0;
        for (m in messages) {
          if (Object.prototype.hasOwnProperty.call(messages, m) && m.indexOf(topic) === 0) {
            for (token in messages[m]) {
              count++;
            }
            break;
          }
        }
        return count;
      };
      PubSub.getSubscriptions = function getSubscriptions(topic) {
        var m;
        var list = [];
        for (m in messages) {
          if (Object.prototype.hasOwnProperty.call(messages, m) && m.indexOf(topic) === 0) {
            list.push(m);
          }
        }
        return list;
      };
      PubSub.unsubscribe = function(value) {
        var descendantTopicExists = function(topic) {
          var m2;
          for (m2 in messages) {
            if (Object.prototype.hasOwnProperty.call(messages, m2) && m2.indexOf(topic) === 0) {
              return true;
            }
          }
          return false;
        }, isTopic = typeof value === "string" && (Object.prototype.hasOwnProperty.call(messages, value) || descendantTopicExists(value)), isToken = !isTopic && typeof value === "string", isFunction = typeof value === "function", result = false, m, message, t5;
        if (isTopic) {
          PubSub.clearSubscriptions(value);
          return;
        }
        for (m in messages) {
          if (Object.prototype.hasOwnProperty.call(messages, m)) {
            message = messages[m];
            if (isToken && message[value]) {
              delete message[value];
              result = value;
              break;
            }
            if (isFunction) {
              for (t5 in message) {
                if (Object.prototype.hasOwnProperty.call(message, t5) && message[t5] === value) {
                  delete message[t5];
                  result = true;
                }
              }
            }
          }
        }
        return result;
      };
    });
  }
});

// node_modules/@kickstartds/ds-agency-premium/dist/components/section/js/spotlight.client.js
var spotlight_client_exports = {};
__export(spotlight_client_exports, {
  initSpotlight: () => initSpotlight
});
function onMousemove(event) {
  this.style.setProperty("--dsa-section__spotlight--top", `${event.clientY - this.getBoundingClientRect().top}px`);
  this.style.setProperty("--dsa-section__spotlight--left", `${event.clientX - this.getBoundingClientRect().left}px`);
}
var initSpotlight;
var init_spotlight_client = __esm({
  "node_modules/@kickstartds/ds-agency-premium/dist/components/section/js/spotlight.client.js"() {
    initSpotlight = (element) => {
      element.addEventListener("mousemove", onMousemove, { passive: true });
      return () => {
        element.style.removeProperty("--dsa-section__spotlight--top");
        element.style.removeProperty("--dsa-section__spotlight--left");
        element.removeEventListener("mousemove", onMousemove, { passive: true });
      };
    };
  }
});

// node_modules/@kickstartds/base/lib/_shared/SectionSlider-80f40b49.js
var SectionSlider_80f40b49_exports = {};
__export(SectionSlider_80f40b49_exports, {
  initSectionSlider: () => n4
});
var e2, t4, n4;
var init_SectionSlider_80f40b49 = __esm({
  "node_modules/@kickstartds/base/lib/_shared/SectionSlider-80f40b49.js"() {
    e2 = { passive: true };
    t4 = (t5) => {
      t5.style.cursor = "grab", t5.style.userSelect = "none";
      let n6 = 0;
      let o3 = 0;
      let s2 = 0;
      let r3;
      let l2 = false;
      const c2 = () => cancelAnimationFrame(r3);
      const i3 = () => {
        t5.scrollLeft += s2, s2 *= 0.9, Math.abs(s2) > 0.5 && (r3 = requestAnimationFrame(i3));
      };
      const m = (e3) => {
        e3.preventDefault();
        const r4 = e3.clientX - o3;
        const c3 = t5.scrollLeft;
        t5.scrollLeft = n6 - r4, s2 = t5.scrollLeft - c3, l2 = true;
      };
      const v = () => {
        document.removeEventListener("mousemove", m, e2), document.removeEventListener("mouseup", v, e2), document.removeEventListener("mouseleave", v, e2), t5.style.cursor = "grab", t5.style.removeProperty("user-select"), c2(), r3 = requestAnimationFrame(i3), requestAnimationFrame(() => {
          l2 = false;
        });
      };
      const u2 = (s3) => {
        n6 = t5.scrollLeft, o3 = s3.clientX, t5.style.cursor = "grabbing", t5.style.userSelect = "none", document.addEventListener("mousemove", m, e2), document.addEventListener("mouseup", v, e2), document.addEventListener("mouseleave", v, e2), c2();
      };
      const a2 = (e3) => {
        l2 && (e3.preventDefault(), e3.stopPropagation());
      };
      return t5.addEventListener("mousedown", u2, e2), t5.addEventListener("click", a2, true), t5.addEventListener("wheel", c2, e2), () => {
        document.removeEventListener("mousemove", m, e2), document.removeEventListener("mouseup", v, e2), document.removeEventListener("mouseleave", v, e2), t5.removeEventListener("mousedown", u2, e2), t5.removeEventListener("wheel", c2, e2), t5.removeEventListener("click", a2, true);
      };
    };
    n4 = (n6) => {
      const o3 = [];
      const [s2, r3] = n6.nextElementSibling.querySelectorAll(".l-section__slider-arrow");
      if (s2 && r3) {
        const t5 = n6.querySelector(".l-section__content");
        const l3 = t5.firstElementChild;
        if (l3) {
          const c2 = ((t6, n7, o4, s3, r4) => {
            const l4 = (e3) => {
              const t7 = Number(getComputedStyle(s3).getPropertyValue("grid-gap").split("px")[0]);
              const n8 = Math.ceil(r4.offsetWidth + t7);
              const l5 = o4.scrollLeft / n8;
              const c4 = e3 ? Math.floor(l5) + 1 : Math.ceil(l5) - 1;
              o4.scrollTo({ left: c4 * n8, behavior: "smooth" });
            };
            const c3 = () => l4(false);
            const i3 = () => l4(true);
            const m = () => {
              t6.disabled = o4.scrollLeft < 1, n7.disabled = o4.scrollLeft + o4.offsetWidth >= o4.scrollWidth;
            };
            return t6.addEventListener("click", c3), n7.addEventListener("click", i3), o4.addEventListener("scroll", m, e2), m(), t6.style.visibility = "visible", n7.style.visibility = "visible", () => {
              t6.removeEventListener("click", c3), n7.removeEventListener("click", i3), o4.removeEventListener("scroll", m, e2);
            };
          })(s2, r3, n6, t5, l3);
          o3.push(c2);
        }
      }
      const l2 = t4(n6);
      return o3.push(l2), () => {
        for (const e3 of o3)
          e3();
      };
    };
  }
});

// node_modules/@kickstartds/base/lib/section/Section.js
var Section_exports = {};
__export(Section_exports, {
  default: () => Section,
  getSectionSlider: () => i2
});
var i2, n5, Section;
var init_Section = __esm({
  "node_modules/@kickstartds/base/lib/section/Section.js"() {
    init_defineProperty();
    init_component();
    i2 = () => Promise.resolve().then(() => (init_SectionSlider_80f40b49(), SectionSlider_80f40b49_exports)).then((e3) => e3.initSectionSlider);
    n5 = "base.section";
    Section = class extends Component {
      constructor(e3) {
        super(e3);
        const t5 = e3.querySelector(".l-section__slider");
        t5 && i2().then((e4) => {
          const o3 = e4(t5);
          this.onDisconnect(o3);
        });
      }
    };
    _defineProperty(Section, "identifier", n5), b(n5, Section);
  }
});

// node_modules/@kickstartds/ds-agency-premium/dist/components/html/Html.client.js
init_component();
var consentButtonSelector = ".dsa-html__consent-button";
var copyScriptTag = (original) => {
  if (original.tagName === "SCRIPT") {
    const copy = document.createElement("script");
    for (const attr of original.attributes) {
      copy.setAttribute(attr.name, attr.value);
    }
    copy.textContent = original.textContent;
    return copy;
  }
  return original;
};
var Html = class extends Component {
  constructor(element) {
    super(element);
    const consentButton = element.querySelector(consentButtonSelector);
    const replaceHtml = () => {
      const template = element.querySelector("template");
      if (template) {
        const elements2 = [...template.content.children].map(copyScriptTag);
        element.replaceChildren(...elements2);
        consentButton?.removeEventListener("click", replaceHtml);
      }
    };
    if (consentButton) {
      consentButton.addEventListener("click", replaceHtml);
      this.onDisconnect(() => {
        consentButton.removeEventListener("click", replaceHtml);
      });
    } else {
      replaceHtml();
    }
  }
};
Html.identifier = "dsa.html";
b(Html.identifier, Html);

// node_modules/@kickstartds/ds-agency-premium/dist/components/nav-main/js/NavToggle.client.js
init_component();

// node_modules/@kickstartds/core/lib/core/radio.js
var import_pubsub_js = __toESM(require_pubsub());
init_domLoaded();
e && (window._ks = window._ks || {}, window._ks.radio = { on: (i3, o3) => import_pubsub_js.default.subscribe(i3, o3), once(i3, o3) {
  import_pubsub_js.default.subscribeOnce(i3, o3);
}, off: (i3) => import_pubsub_js.default.unsubscribe(i3), emit: (i3, o3) => import_pubsub_js.default.publish(i3, o3), emitSync: (i3, o3) => import_pubsub_js.default.publishSync(i3, o3) });

// node_modules/@kickstartds/core/lib/core/index.js
init_domLoaded();
init_lazysizes();

// node_modules/@kickstartds/ds-agency-premium/dist/components/nav-main/js/navMainEvents.client.js
var navMainEvents = {
  change: "nav-main.change"
};
var mm;
if (e) {
  mm = window.matchMedia("(min-width: 62em)");
  mm.addEventListener("change", (event) => window._ks.radio.emit(navMainEvents.change, event.matches));
}

// node_modules/@kickstartds/ds-agency-premium/dist/components/nav-main/js/body.client.js
var cache = /* @__PURE__ */ new Map();
var elements = [
  {
    selector: "body",
    property: "paddingRight"
  },
  {
    selector: ".nav-toggle",
    property: "marginRight"
  },
  {
    selector: ".kds-header__wrap > .l-container--section",
    property: "paddingRight"
  }
];
function setStyle(value) {
  elements.forEach(({ selector, property, negative }) => {
    if (!cache.has(selector)) {
      const element = document.querySelector(selector);
      if (!element) {
        return;
      }
      cache.set(selector, element);
    }
    cache.get(selector).style[property] = `${value && negative ? "-" : ""}${value}`;
  });
}
var body = {
  lock() {
    setStyle(`${window.innerWidth - document.body.offsetWidth}px`);
    document.documentElement.classList.add("overlay-open");
  },
  reset() {
    setStyle("");
    requestAnimationFrame(() => {
      document.documentElement.classList.remove("overlay-open");
    });
  }
};

// node_modules/@kickstartds/ds-agency-premium/dist/components/nav-main/js/NavToggle.client.js
var NavToggle = class extends Component {
  constructor(element) {
    super(element);
    this.isOpen = this.element.getAttribute("aria-expanded") === "true";
    this.nav = document.getElementById(this.element.getAttribute("aria-controls"));
    this.navMainDropdowns = [...document.querySelectorAll("#nav-main details")];
    this.element.addEventListener("click", this);
    window._ks.radio.on(navMainEvents.change, (_, desktop) => {
      if (desktop) {
        this.close();
      }
    });
    window._ks.radio.on("location.change", () => this.close());
  }
  open() {
    this.isOpen = true;
    body.lock();
    this.element.setAttribute("aria-expanded", this.isOpen);
    this.nav.focus();
    window.addEventListener("keydown", this);
  }
  close() {
    this.isOpen = false;
    body.reset();
    this.element.setAttribute("aria-expanded", this.isOpen);
    this.element.focus();
    window.removeEventListener("keydown", this);
  }
  onclick() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }
  onkeydown(event) {
    if (event.key === "Escape") {
      if (this.navMainDropdowns.every((dropdown) => !dropdown.hasAttribute("open"))) {
        this.close();
      }
    }
  }
};
NavToggle.identifier = "base.nav-toggle";
NavToggle.actions = {
  open: `${NavToggle.identifier}.open`,
  close: `${NavToggle.identifier}.close`
};
b(NavToggle.identifier, NavToggle);

// node_modules/@kickstartds/ds-agency-premium/dist/components/section/js/Section.client.js
init_component();
var identifier = "dsa.section";
var Section2 = class extends Component {
  constructor(element) {
    super(element);
    if (element.classList.contains("dsa-section--spotlight")) {
      Promise.resolve().then(() => (init_spotlight_client(), spotlight_client_exports)).then((mod) => {
        const cleanup = mod.initSpotlight(element);
        this.onDisconnect(cleanup);
      });
    }
    const sliderContainer = element.querySelector(".l-section__slider");
    if (sliderContainer) {
      Promise.resolve().then(() => (init_Section(), Section_exports)).then((mod) => mod.getSectionSlider()).then((initSectionSlider) => {
        const cleanup = initSectionSlider(sliderContainer);
        this.onDisconnect(cleanup);
      });
    }
  }
};
b(identifier, Section2);

// <stdin>
init_spotlight_client();
