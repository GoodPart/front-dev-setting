/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/assets/script/TS/rolling-value.ts":
/*!***********************************************!*\
  !*** ./src/assets/script/TS/rolling-value.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RollingValue": function() { return /* binding */ RollingValue; }
/* harmony export */ });
var __read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var RollingValue = (function () {
    function RollingValue(name, options) {
        this.name = name;
        this.options = options;
        this.storage = [];
    }
    ;
    RollingValue.prototype.getNumberLength = function (ele) {
        var getObj = [];
        Object.keys(ele).map(function (target, index) {
            var tTxt = ele[target].innerText;
            var tLength = tTxt.length;
            getObj = __spreadArray(__spreadArray([], __read(getObj), false), [
                {
                    txt: tTxt,
                    length: tLength
                }
            ], false);
        });
        return getObj;
    };
    ;
    RollingValue.prototype.getNumb = function (num) {
        var data = String(num);
        return __spreadArray([], __read(data), false);
    };
    ;
    RollingValue.prototype.crtHTML = function (name) {
        var targets = document.querySelectorAll(name);
        var getNL = this.getNumberLength(targets);
        getNL.map(function (NL, index) {
            targets[index].id = "pRoot-".concat(index);
            var crtUl = document.createElement("ul");
            for (var a = 0; a < NL.length; a++) {
                var crtLi = document.createElement("li");
                var liTemp = "\n                    <span>0</span>\n                    <span>1</span>\n                    <span>2</span>\n                    <span>3</span>\n                    <span>4</span>\n                    <span>5</span>\n                    <span>6</span>\n                    <span>7</span>\n                    <span>8</span>\n                    <span>9</span>\n                ";
                crtLi.innerHTML = liTemp;
                crtLi.className = "pacinco-item pacinco-item-".concat(a);
                crtLi.dataset.number = '0';
                if (a <= NL.length) {
                    crtUl.appendChild(crtLi);
                }
            }
            ;
            targets[index].innerText = '';
            crtUl.className = "pacinco-list pacinco-list-".concat(index);
            targets[index].appendChild(crtUl);
            var crtV = document.createElement("div");
            crtV.className = 'v sr-only';
            targets[index].appendChild(crtV);
        });
    };
    ;
    RollingValue.prototype.addOrRemove = function (name, value) {
        var getLength = name.querySelectorAll("li");
        var inboundNumber = value;
        var valueStorage = [];
        if (this.getNumb(inboundNumber).length > getLength.length) {
            this.addRail(name);
        }
        else {
            if (this.getNumb(inboundNumber).length < getLength.length) {
                this.removeRail(name);
            }
            else {
            }
        }
    };
    ;
    RollingValue.prototype.addRail = function (name) {
        var selectUl = name.querySelector("ul");
        var crtLi = document.createElement("li");
        var test = "\n                <span>0</span>\n                <span>1</span>\n                <span>2</span>\n                <span>3</span>\n                <span>4</span>\n                <span>5</span>\n                <span>6</span>\n                <span>7</span>\n                <span>8</span>\n                <span>9</span>\n            ";
        crtLi.innerHTML = test;
        crtLi.className = "pacinco-item pacinco-item-".concat(selectUl.childElementCount);
        selectUl.appendChild(crtLi);
    };
    ;
    RollingValue.prototype.removeRail = function (name) {
        var selectUl = name.querySelector("ul");
        var liLength = selectUl.childElementCount;
        selectUl.removeChild(selectUl.querySelectorAll("li")[liLength - 1]);
    };
    ;
    RollingValue.prototype.rolling = function (name, value) {
        var _this = this;
        var _id = document.querySelector(name);
        var _li = _id.querySelectorAll("li");
        _id.querySelector(".v").innerHTML = value;
        var _loop_1 = function (liC) {
            setTimeout(function () {
                _li[liC].style.transform = "translateY(-".concat(_this.getNumb(value)[liC], "0%)");
                _li[liC].dataset.number = _this.getNumb(value)[liC];
            }, 250 * liC);
        };
        for (var liC = 0; liC < _li.length; liC++) {
            _loop_1(liC);
        }
    };
    ;
    RollingValue.prototype.calcCount = function (name, aV) {
        var _id = document.querySelector(name);
        var _count = document.querySelector("".concat(name, " + .cdd-change_count"));
        var beforeCv = Number(_id.querySelector(".v").innerText);
        if (beforeCv === aV) {
            _count.querySelector(".cv").innerText = 0;
            _count.querySelector(".value_arrow").className = "value_arrow keep";
        }
        else {
            if (beforeCv < aV) {
                _count.querySelector(".cv").innerText = Math.abs(beforeCv - aV);
                _count.querySelector(".value_arrow").className = "value_arrow increase";
            }
            else {
                _count.querySelector(".cv").innerText = Math.abs(beforeCv - aV);
                _count.querySelector(".value_arrow").className = "value_arrow decrease";
            }
        }
    };
    ;
    RollingValue.prototype.update = function (id, number) {
        var target = document.querySelector(id);
        this.addOrRemove(target, number);
        this.calcCount(id, number);
        this.rolling(id, number);
    };
    ;
    RollingValue.prototype.init = function () {
        this.crtHTML(this.name);
        console.log("init!!");
    };
    return RollingValue;
}());



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!************************************!*\
  !*** ./src/assets/script/index.ts ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TS_rolling_value__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TS/rolling-value */ "./src/assets/script/TS/rolling-value.ts");

var test = new _TS_rolling_value__WEBPACK_IMPORTED_MODULE_0__.RollingValue(".cdd-change_value", {
    options: "test"
});
test.init();
window.addEventListener("dblclick", function () {
    var randNumber = Math.floor(Math.random() * 1000);
    var randNumber2 = Math.floor(Math.random() * 100);
    var randNumber3 = Math.floor(Math.random() * 10);
    var randNumber4 = Math.floor(Math.random() * 10000);
    var randNumber5 = Math.floor(Math.random() * 100);
    test.update("#pRoot-0", randNumber);
    test.update("#pRoot-1", randNumber2);
    test.update("#pRoot-2", randNumber3);
    test.update("#pRoot-3", randNumber4);
    test.update("#pRoot-4", randNumber5);
});
setInterval(function (_interval) {
    var randNumber = Math.floor(Math.random() * 1000);
    var randNumber2 = Math.floor(Math.random() * 100);
    var randNumber3 = Math.floor(Math.random() * 10);
    var randNumber4 = Math.floor(Math.random() * 10000);
    var randNumber5 = Math.floor(Math.random() * 100);
    test.update("#pRoot-0", randNumber);
    test.update("#pRoot-1", randNumber2);
    test.update("#pRoot-2", randNumber3);
    test.update("#pRoot-3", randNumber4);
    test.update("#pRoot-4", randNumber5);
}, 1500);

}();
/******/ })()
;
//# sourceMappingURL=index.js.map