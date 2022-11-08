/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/assets/script/TS/createElement.ts":
/*!***********************************************!*\
  !*** ./src/assets/script/TS/createElement.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateElement": function() { return /* binding */ CreateElement; }
/* harmony export */ });
var CreateElement = (function () {
    function CreateElement(ele, options) {
        this.ele = ele;
        this.options = options;
    }
    CreateElement.prototype.crtHTML = function () {
        var _this = this;
        var getEle = this.ele;
        var createEle = document.createElement("".concat(getEle));
        if (this.options) {
            Object.keys(this.options).map(function (op, index) {
                console.log(op);
                if (op == 'className') {
                    createEle.className = _this.options[op];
                }
                if (op == 'id') {
                    createEle.id = _this.options[op];
                }
                if (op == 'name') {
                    createEle.setAttribute("name", _this.options[op]);
                }
            });
        }
        else {
        }
        console.log(createEle);
        return createEle;
    };
    CreateElement.prototype.insertOptions = function (crtedEle, options) {
    };
    CreateElement.prototype.init = function () {
        this.crtHTML();
    };
    return CreateElement;
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
  !*** ./src/assets/script/page2.ts ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TS_createElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TS/createElement */ "./src/assets/script/TS/createElement.ts");

var test2 = new _TS_createElement__WEBPACK_IMPORTED_MODULE_0__.CreateElement("div", {
    className: "test-class",
    id: "test-id"
});
test2.init();

}();
/******/ })()
;
//# sourceMappingURL=page2.js.map