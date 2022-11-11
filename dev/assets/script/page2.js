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
/* harmony export */   "CreateEleMentForm": function() { return /* binding */ CreateEleMentForm; },
/* harmony export */   "CreateElementDiv": function() { return /* binding */ CreateElementDiv; }
/* harmony export */ });
var CreateEleMentForm = (function () {
    function CreateEleMentForm(ele, options) {
        this.ele = ele;
        this.options = options;
    }
    CreateEleMentForm.prototype.create = function () {
        var _this = this;
        var getEle = this.ele;
        var createEle = document.createElement("".concat(getEle));
        Object.keys(this.options).map(function (op, index) {
            if (op == 'id') {
                createEle.id = _this.options[op];
            }
            if (op == 'className') {
                createEle.className = _this.options[op];
            }
            if (op == 'type') {
                createEle.setAttribute("type", _this.options[op]);
                if (_this.options[op] == 'radio') {
                }
                else if (_this.options[op] == 'checkbox') {
                }
                else if (_this.options[op] == 'button') {
                }
            }
            if (op == 'name') {
                createEle.setAttribute("name", _this.options[op]);
            }
            if (op == 'datasets') {
                var datasetsLength = _this.options[op].length;
                for (var d = 0; d < datasetsLength; d++) {
                    createEle.setAttribute("data-".concat(_this.options[op][d].name), _this.options[op][d].value);
                }
            }
            if (op == 'placeholder') {
                createEle.setAttribute("placeholder", _this.options[op]);
            }
        });
        return createEle;
    };
    ;
    CreateEleMentForm.prototype.insertDOM = function (action, location) {
        var getEle = this.create();
        var _action = action;
        var _location = document.querySelector(location);
        if (_action == 'append') {
            _location.appendChild(getEle);
        }
        else {
            _location.prepend(getEle);
        }
    };
    return CreateEleMentForm;
}());
var CreateElementDiv = (function () {
    function CreateElementDiv(ele, options) {
        this.ele = ele;
        this.options = options;
    }
    ;
    CreateElementDiv.prototype.crtHTML = function () {
        var _this = this;
        var getEle = this.ele;
        var createEle = document.createElement("".concat(getEle));
        if (this.options) {
            Object.keys(this.options).map(function (op, index) {
                if (op == 'className') {
                    createEle.className = _this.options[op];
                }
                if (op == 'id') {
                    createEle.id = _this.options[op];
                }
                if (op == 'htmlTemplate') {
                }
            });
        }
        return createEle;
    };
    CreateElementDiv.prototype.doListing = function (parent, count, childNode, options) {
        var _this = this;
        var id = options.id, className = options.className, dataset = options.dataset;
        var _loop_1 = function (i) {
            var crtChildNode = document.createElement(childNode);
            if (options !== '' || options !== undefined || options !== null) {
                Object.keys(options).map(function (op, index) {
                    if (op == 'className') {
                        crtChildNode.className = _this.options[op];
                    }
                    if (op == 'id') {
                        crtChildNode.id = _this.options[op];
                    }
                });
            }
            if (i <= count) {
                parent.appendChild(childNode);
            }
        };
        for (var i = 0; i < count; i++) {
            _loop_1(i);
        }
        ;
    };
    return CreateElementDiv;
}());



/***/ }),

/***/ "./src/assets/script/TS/doFunction.ts":
/*!********************************************!*\
  !*** ./src/assets/script/TS/doFunction.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DoListing": function() { return /* binding */ DoListing; },
/* harmony export */   "doListing": function() { return /* binding */ doListing; }
/* harmony export */ });
var doListing = function (parent, count, childNode, options) {
    var id = options.id, className = options.className, dataset = options.dataset;
    var _loop_1 = function (i) {
        var crtChildNode = document.createElement(childNode);
        if (options !== '' || options !== undefined || options !== null) {
            Object.keys(options).map(function (op, index) {
                if (op == 'className') {
                    crtChildNode.className = options[op];
                }
                if (op == 'id') {
                    crtChildNode.id = options[op];
                }
            });
        }
        if (i <= count) {
            parent.appendChild(crtChildNode);
        }
    };
    for (var i = 0; i < count; i++) {
        _loop_1(i);
    }
    ;
};
var DoListing = (function () {
    function DoListing() {
    }
    DoListing.prototype.test = function () {
        console.log('test');
    };
    return DoListing;
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
/* harmony import */ var _TS_doFunction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TS/doFunction */ "./src/assets/script/TS/doFunction.ts");


var test2 = new _TS_createElement__WEBPACK_IMPORTED_MODULE_0__.CreateElementDiv("div", {
    className: "test-class",
    id: "test-id"
});
var test1 = new _TS_createElement__WEBPACK_IMPORTED_MODULE_0__.CreateEleMentForm("input", {
    className: "test-class2",
    type: "radio",
    name: "radio-input",
    checked: false,
    datasets: [
        {
            name: 'test',
            value: 123
        },
        {
            name: 'test2',
            value: 'asd'
        },
    ]
});
var testTemp = "\n    <div class='test'>test HTML template<div>\n";
console.log(test2);
var crtedUl = document.createElement("ul");
(0,_TS_doFunction__WEBPACK_IMPORTED_MODULE_1__.doListing)(crtedUl, 3, "li", {
    className: "testClass"
});

}();
/******/ })()
;
//# sourceMappingURL=page2.js.map