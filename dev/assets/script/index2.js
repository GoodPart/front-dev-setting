/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/assets/script/TS/timepicker.ts":
/*!********************************************!*\
  !*** ./src/assets/script/TS/timepicker.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Timepicker": function() { return /* binding */ Timepicker; }
/* harmony export */ });
var Timepicker = (function () {
    function Timepicker() {
    }
    Timepicker.prototype.crtEle = function (props) {
        var root = document.querySelector("".concat(props.name));
        var _mode = props.dataset;
        var hourValue = 24;
        var minValue = 60;
        var secValue = 60;
        var globHouse = document.querySelector(".yogo_global_house");
        var timeSetValue = [hourValue, minValue, secValue];
        function crtList(value) {
            var crtUl = document.createElement("ul");
            for (var i = 0; i < value; i++) {
                var crtLi = document.createElement("li");
                var crtspan = document.createElement("span");
                crtspan.innerHTML = i < 10 ? "0".concat(i) : i;
                crtLi.append(crtspan);
                crtUl.append(crtLi);
            }
            return crtUl;
        }
        ;
        var crtRoot = document.createElement("div");
        crtRoot.className = 'yogo_picker';
        crtRoot.setAttribute('data-timeset', _mode.length);
        var crtDropDownMenu = document.createElement("div");
        crtDropDownMenu.className = 'yogo_picker-dropdown';
        crtDropDownMenu.dataset.id = props.name.substr(1);
        var crtFlexWrap = document.createElement("div");
        crtFlexWrap.className = 'flex-wrap';
        var crtInputArea = function (_mode) {
            var timeSetLength = _mode.length;
            var ele = _mode;
            return ("<div class=\"yogo_picker-input\"><input type=\"text\" placeholder=\"".concat(ele, "\" maxlength=\"").concat(timeSetLength, "\"></div>"));
        };
        if (_mode) {
            var loopLength = _mode.length == 8 ? 3 : 2;
            for (var i = 0; i < loopLength; i++) {
                var crtSection = document.createElement("div");
                crtSection.className = "section section-".concat(i);
                crtSection.append(crtList(timeSetValue[i]));
                crtFlexWrap.append(crtSection);
            }
            crtDropDownMenu.append(crtFlexWrap);
            crtRoot.innerHTML = crtInputArea(_mode);
            root.append(crtRoot);
        }
        globHouse.append(crtDropDownMenu);
    };
    ;
    Timepicker.prototype.selecting = function (props) {
        var trigger = props.name;
        var picker = document.querySelector("".concat(trigger));
        var pickerInput = picker.querySelector("input[type='text']");
        var numberItem = picker.querySelectorAll(".section ul li");
        var globHouse = document.querySelector(".yogo_global_house .yogo_picker-dropdown[data-id=\"".concat(picker.id, "\"]"));
        var globLi = globHouse.querySelectorAll(".section ul li");
        var pickerValue = {
            pageX: picker.getBoundingClientRect().left,
            pageY: picker.getBoundingClientRect().top + picker.getBoundingClientRect().height + 8
        };
    };
    ;
    Timepicker.prototype.updatePosition = function (action, options, tOb) {
        var ACTION = action;
        var OPTIONS = options;
        var throttle = {
            x: 20,
            y: 8
        };
        function calcX(picker, globHDiv) {
            var pvx = picker.x;
            var pvw = picker.width;
            var ghdw = globHDiv.offsetWidth;
            var standardX = pvx + ghdw + throttle.x;
            var resultX = pvx - ((pvx + ghdw) - (pvx + pvw));
            if (standardX > window.innerWidth) {
                return resultX;
            }
            else {
                return pvx;
            }
        }
        ;
        function calcY(picker, globDiv, bTo) {
            var pvt = picker.top;
            var pvh = picker.height;
            globDiv.classList.add("active");
            var ghdh = globDiv.offsetHeight;
            globDiv.classList.remove("active");
            var resultY = pvt - (ghdh + throttle.y - window.scrollY);
            var resultYN = pvt + window.scrollY + pvh + throttle.y;
            if (bTo == undefined || bTo == null) {
                return resultYN;
            }
            else {
                if (bTo === 'top') {
                    console.log(bTo);
                    return resultY;
                }
                else {
                    return resultYN;
                }
            }
        }
        ;
        if (ACTION === 'scroll') {
        }
        else if (ACTION === 'focus') {
            var updateValue = {
                id: OPTIONS.path[3].id,
                inputObjectValue: OPTIONS.target.getBoundingClientRect()
            };
            var globHouseDiv = document.querySelector(".yogo_global_house .yogo_picker-dropdown[data-id=\"".concat(updateValue.id, "\"]"));
            var valueX = calcX(updateValue.inputObjectValue, globHouseDiv);
            var valueY = calcY(updateValue.inputObjectValue, globHouseDiv, tOb);
            return {
                _x: valueX,
                _y: valueY
            };
        }
    };
    ;
    Timepicker.prototype.eventMethods = function (props) {
        var _this = this;
        var trigger = props.name;
        var picker = document.querySelector("".concat(trigger));
        var pickerInput = picker.querySelector("input[type='text']");
        var numberItem = picker.querySelectorAll(".section ul li");
        var globHouse = document.querySelector(".yogo_global_house .yogo_picker-dropdown[data-id=\"".concat(picker.id, "\"]"));
        var globLi = globHouse.querySelectorAll(".section ul li");
        function menuCheck(event, timeset, _picker) {
            var _input = _picker.querySelector("input[type='text']");
            var aliveValueHor = _input.value.substr(0, 2);
            var aliveValueMin = _input.value.substr(3, 2);
            var aliveValueSec = _input.value.substr(6, 2);
            var _sections = _picker.querySelectorAll(".section");
            var globHouse = document.querySelector(".yogo_global_house .yogo_picker-dropdown[data-id=\"".concat(_picker.id, "\"]"));
            var _newSections = globHouse.querySelectorAll(".section");
            var aliveValueArea = [aliveValueHor, aliveValueMin, aliveValueSec];
            Object.values(_newSections).map(function (ul, index) {
                Object.values(_newSections[index].children[0].children).map(function (li, index2) {
                    var _li = li.querySelector("span").innerText;
                    var checkValue = String(aliveValueArea[index]) === String(_li) ? index2 : null;
                    if (checkValue == null) {
                        li.classList.remove("active");
                    }
                    else {
                        var _li_1 = li;
                        var liLocationValue = _li_1.offsetTop;
                        _newSections[index].scroll({
                            top: liLocationValue - 100,
                            behavior: "smooth"
                        });
                        li.classList.add("active");
                    }
                });
            });
        }
        ;
        function parseTimeSet(e, value) {
            var valueLength = value.length;
            var _value = value;
            var _NumberValue = Number(value.substr(0, 2));
            var _NumberValueMin = Number(value.substr(-2, 4));
            var _Array = [];
            var checkFormat = function () {
                var check = true;
                if (_NumberValue >= 0 && _NumberValue > 23) {
                    check = false;
                    return false;
                }
                if (_NumberValueMin >= 0 && _NumberValueMin >= 60) {
                    check = false;
                    return false;
                }
                return check;
            };
            if ((valueLength > 3 && valueLength <= 5) || (valueLength > 6 && valueLength <= 8)) {
                if (checkFormat()) {
                    var parseTimeSet_1 = e.target.value.replace(/(\d)(?=(?:\d{2})+(?!\d))/g, '$1:');
                    return e.target.value = parseTimeSet_1;
                }
                else {
                    return null;
                }
            }
            return value;
        }
        pickerInput.addEventListener("keyup", function (e) {
            var target = e.target;
            var keyCode = e.keyCode;
            var inputKeyValue = target.value;
            function enterPress(e) {
                if ((Number(target.value.length) == 8 || Number(target.value.length) == 5) && (keyCode == 13 || keyCode == 9)) {
                    globHouse.classList.remove("active");
                    console.log("enter");
                }
                else {
                }
            }
            if ((keyCode < 48 || keyCode > 57) && (keyCode < 36 || keyCode > 40) && (keyCode < 16 || keyCode > 18) && keyCode != 186 && keyCode != 91 && keyCode != 13 && keyCode < 8) {
                target.value = null;
            }
            else {
                target.value = parseTimeSet(e, inputKeyValue);
                menuCheck(e, inputKeyValue, picker);
                enterPress(e);
            }
            ;
        });
        pickerInput.addEventListener("focus", function (e) {
            var getUpdateValues = _this.updatePosition("focus", e, props.tObPosition);
            globHouse.setAttribute("style", "transform : translateX(".concat(getUpdateValues._x, "px) translateY(").concat(getUpdateValues._y, "px)"));
            globHouse.classList.add("active");
        });
        pickerInput.addEventListener("blur", function (e) {
            globHouse.classList.remove("active");
        });
        if (props.autoBlur == undefined || props.autoBlur == null || props.autoBlur == false) {
            return false;
        }
        else {
            window.addEventListener("scroll", function (e) {
                globHouse.classList.remove("active");
                pickerInput.blur();
                console.log("scroll");
            });
        }
        globHouse.addEventListener("mousedown", function (e) {
            e.preventDefault();
        });
    };
    Timepicker.prototype.init = function (props) {
        this.crtEle(props);
        this.selecting(props);
        this.eventMethods(props);
    };
    return Timepicker;
}());

;


/***/ }),

/***/ "./src/assets/script/TS/yogoUI.ts":
/*!****************************************!*\
  !*** ./src/assets/script/TS/yogoUI.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "YogoUI": function() { return /* binding */ YogoUI; }
/* harmony export */ });
/* harmony import */ var _timepicker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timepicker */ "./src/assets/script/TS/timepicker.ts");

var YogoUI = (function () {
    function YogoUI(trigger, options) {
        this.moduleTypeList = [
            'timepicker',
            'multiselector',
        ];
        this.trigger = trigger;
        this.options = options;
    }
    ;
    YogoUI.prototype.init = function () {
        var crtGolbalArea = document.createElement("div");
        crtGolbalArea.className = 'yogo_global_house';
        function crtGlobCheck() {
            var body = document.querySelector("body");
            var globArea = document.querySelector(".yogo_global_house");
            if (body.querySelector(".yogo_global_house")) {
                return false;
            }
            else {
                return true;
            }
        }
        ;
        if (crtGlobCheck()) {
            document.querySelector("body").append(crtGolbalArea);
        }
        else {
        }
        ;
        if (this.options.type == 'timepicker') {
            var picker = document.querySelector("".concat(this.trigger));
            if (picker.tagName == 'INPUT') {
                var parent_1 = picker.parentElement;
                parent_1.className = picker.className;
                parent_1.id = picker.id;
                picker.remove();
                var crtPicker = new _timepicker__WEBPACK_IMPORTED_MODULE_0__.Timepicker();
                crtPicker.init({
                    name: this.trigger,
                    dataset: this.options.timeSet,
                    tObPosition: this.options.tObPosition,
                    autoBlur: this.options.autoBlur
                });
            }
        }
    };
    return YogoUI;
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
/*!*************************************!*\
  !*** ./src/assets/script/index2.ts ***!
  \*************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TS_yogoUI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TS/yogoUI */ "./src/assets/script/TS/yogoUI.ts");

var test2 = new _TS_yogoUI__WEBPACK_IMPORTED_MODULE_0__.YogoUI("#testpicker3", {
    type: "timepicker",
    timeSet: "00:00:00",
    tObPosition: 'top'
});
test2.init();

}();
/******/ })()
;
//# sourceMappingURL=index2.js.map