/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/assets/script/TS/methods/methods_form.ts":
/*!******************************************************!*\
  !*** ./src/assets/script/TS/methods/methods_form.ts ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MethodsForm": function() { return /* binding */ MethodsForm; }
/* harmony export */ });
var MethodsForm = (function () {
    function MethodsForm() {
    }
    MethodsForm.prototype.radio = function (inputName, triggerNumber, changeId) {
        var groupName = document.querySelectorAll("input[name=\"".concat(inputName, "\"]"));
        var trigger = groupName[triggerNumber];
        var target = document.querySelector("*[name=\"".concat(changeId, "\"]"));
        Object.keys(groupName).map(function (item, index) {
            var ele = groupName[item];
            ele.addEventListener("change", function () {
                if (ele.id === trigger.id) {
                    console.log("check", target);
                }
                else {
                    console.log("none", ele.id, trigger.id);
                }
            });
        });
    };
    ;
    return MethodsForm;
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
/*!***********************************!*\
  !*** ./src/assets/script/test.ts ***!
  \***********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TS_methods_methods_form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TS/methods/methods_form */ "./src/assets/script/TS/methods/methods_form.ts");

var radioSet = new _TS_methods_methods_form__WEBPACK_IMPORTED_MODULE_0__.MethodsForm().radio("radio-01", 1, "target");
console.log("test");

}();
/******/ })()
;
//# sourceMappingURL=test.js.map