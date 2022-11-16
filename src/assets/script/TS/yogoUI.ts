import { Timepicker } from "./timepicker";

export class YogoUI {

    trigger: string;
    options :any;

    moduleTypeList = [
        'timepicker',
        'multiselector',
        // 'ripple'
    ]
    
    constructor(trigger:string, options:object) {
        this.trigger = trigger;
        this.options = options;
        // console.log(this.options)
    };

    init() {
        const crtGolbalArea = document.createElement("div");
        crtGolbalArea.className = 'yogo_global_house';

        // const initAfterOptions = initOption;

        /* globalhouse 체크 */
        function crtGlobCheck(){
            const body = document.querySelector("body");
            const globArea = document.querySelector(".yogo_global_house")

            if(body.querySelector(".yogo_global_house")) {
                return false
            }else {
                return true
            }
        };

        if(crtGlobCheck()) {
            document.querySelector("body").append(crtGolbalArea)
        }else {
        };


        
        
        

        if(this.options.type =='timepicker') {
            const picker = document.querySelector(`${this.trigger}`);

            // console.log('전',document.querySelector(`${this.trigger}`));

            if(picker.tagName == 'INPUT') {
                const parent = picker.parentElement; // 상위 div

                parent.className = picker.className
                parent.id = picker.id;

                picker.remove(); // input 제거

                const crtPicker = new Timepicker();
                crtPicker.init({
                    name : this.trigger,
                    dataset : this.options.timeSet,
                    tObPosition : this.options.tObPosition,
                })

            }


            

            
            // console.log('후',document.querySelectorAll(`${this.trigger}`));

            // HTML 생성됨.
            // const Picker = document.querySelector(`${this.trigger}`);
            // const PickerInput = Picker.querySelector("input[type='text']");
            // const numberItem = Picker.querySelectorAll(".section ul li")

            // const globHouse = document.querySelector(`.yogo_global_house .yogo_picker-dropdown[data-id="${Picker.id}"]`);
            // const globLi = globHouse.querySelectorAll(".section ul li");

          
            // const pickerValue = {
            //     pageX : Picker.getBoundingClientRect().left,
            //     pageY : Picker.getBoundingClientRect().top + Picker.offsetHeight + 8, //8 = 사이 넓이 값
            // }

            // console.log(pickerValue.pageX + globHouse.offsetWidth + 20 , window.innerWidth)


            // if(initOption) {
            //     const _parent = document.querySelector(`${initOption.hasScrollBar.ele}`);


            //     if(initOption.hasScrollBar.useScrollType === 'window') {
            //         _parent.addEventListener("scroll", (e)=> {
            //             globHouse.style.transform = `translateX(${pickerValue.pageX}px) translateY(${pickerValue.pageY - e.target.scrollTop}px)`
            //         })
            //     }
               
            //     if(initOption.hasScrollBar.useScrollType === 'position') {
            //         _parent.addEventListener("wheel", (e)=> {
            //             const result = _parent.style.top;
            //             const changeNumb = Number(result.replace("px",''))
            //             globHouse.style.transform = `translateX(${pickerValue.pageX}px) translateY(${pickerValue.pageY + changeNumb}px)`
            //         })
            //     }
            // }


            // function updatePosition(action, options, beforeOptions) {
            //     const ACTION = action;
            //     const OPTIONS = options;
            //     const throttle = {
            //         x : 20,
            //         y : 8
            //     };

            //     // const tObOption = initOption.tObPosition;
            //     // console.log(beforeOptions)

            //     // globDiv의 x위치값 계산
            //     function calcX(picker, globHDiv) {
            //         // picker
            //         let pvx = picker.x;
            //         let pvw = picker.width;
                    
                    
            //         //globDiv
            //         let ghdw = globHDiv.offsetWidth;
                    
            //         // 기준
            //         const standardX =  pvx + ghdw + throttle.x;
            //         const resultX = pvx - ((pvx + ghdw) - (pvx + pvw));

            //         // 화면 기준, globHouseDiv가 화면을 넘어감 or 좁다면
            //         if(standardX > window.innerWidth) {
            //             return resultX
            //         }else {
            //             return pvx
            //         }
            //     };
                
            //     // globDiv의 y위치값 계산
            //     function calcY(picker, globDiv, bTo) {
            //         // picker
            //         let pvt = picker.top;
            //         let pvh = picker.height;

            //         //globDiv
            //         globDiv.classList.add("active");
            //         let ghdh = globDiv.offsetHeight;
            //         globDiv.classList.remove("active");
                    
            //         const resultY = pvt - ( ghdh + throttle.y - window.scrollY); 
            //         const resultYN = pvt + window.scrollY + pvh + throttle.y;

            //         if(bTo == undefined || bTo == null) {
            //             // console.log(bTo)
            //             return resultYN
            //         }else {
            //             if(bTo === 'top') {
            //             console.log(bTo)
            //                 return resultY
            //             }else {
            //                 return resultYN
            //             }
            //         }
            //     };


            //     if(ACTION === 'scroll') {
            //         // console.log(ACTION, OPTIONS)
            //     }else if(ACTION === 'focus') {
            //         const updateValue = {
            //             id : OPTIONS.path[3].id,
            //             inputObjectValue : OPTIONS.target.getBoundingClientRect(),
            //         };
            //         const globHouseDiv = document.querySelector(`.yogo_global_house .yogo_picker-dropdown[data-id="${updateValue.id}"]`);

            //         // globHouse 위치 값 설정.
            //         globHouse.style.transform = `translateX(${calcX(updateValue.inputObjectValue, globHouseDiv)}px) translateY(${calcY(updateValue.inputObjectValue, globHouseDiv, beforeOptions.tObPosition)}px)`;

            //         // moreCalcY(calcY(updateValue.inputObjectValue, globHouseDiv, tObOption), initAfterOptions)
            //     }else {
            //         return  false
            //     }
            // // globHouse.classList.add("smooth")

            // }



            // Object.values(globLi).map((ele, index)=> {
            //     ele.addEventListener("click", (e)=> {
            //         // console.log(ele.parentNode,e.target)
            //         const section = ele.parentNode.parentNode;
            //         const listItem = e.path[1];
            //         // const dataSet = `00:00:00`

            //         if(this.options.timeSet.length ==8) {
            //             if(section.classList.contains("section-0")) {
            //             // console.log("시")
                        
            //             if(PickerInput.value) {
            //                 const aliveValueMin = PickerInput.value.substr(3,2);
            //                 const aliveValueSec = PickerInput.value.substr(6,8);
            //                 PickerInput.value = `${e.target.innerText}:${aliveValueMin}:${aliveValueSec}`
            //             }else {
            //                 PickerInput.value = `${e.target.innerText}:00:00`
            //             }

            //             Object.values(section.querySelectorAll("li")).map((ele, index1)=> {
            //                 ele.classList.remove('active')
            //             })
            //             listItem.classList.add("active")
                        
            //             }
            //             if(section.classList.contains("section-1")) {
            //                 // console.log("분")
            //                 const result = `${PickerInput.value}:${e.target.innerText}`; 
            //                 if(PickerInput.value) {
            //                     const aliveValueHor = PickerInput.value.substr(0,2);
            //                     const aliveValueSec = PickerInput.value.substr(6,8);
            //                     PickerInput.value = `${aliveValueHor}:${e.target.innerText}:${aliveValueSec}`
            //                 }else {
            //                     PickerInput.value = `00:${e.target.innerText}:00`
            //                 }
            //                 Object.values(section.querySelectorAll("li")).map((ele, index1)=> {
            //                     ele.classList.remove('active')
            //                 })
            //                 listItem.classList.add("active")

            //             }
            //             if(section.classList.contains("section-2")) {
            //                 // console.log('초')
            //                 if(PickerInput.value) {
            //                     const aliveValueHor = PickerInput.value.substr(0,2);
            //                     const aliveValueMin = PickerInput.value.substr(3,2);
            //                     PickerInput.value = `${aliveValueHor}:${aliveValueMin}:${e.target.innerText}`
            //                 }else {
            //                     PickerInput.value = `00:00:${e.target.innerText}`
            //                 }
            //                 Object.values(section.querySelectorAll("li")).map((ele, index1)=> {
            //                     ele.classList.remove('active')
            //                 })
            //                 listItem.classList.add("active")
            //             }
                    
            //         }
            //         if(this.options.timeSet.length == 5) {
            //             if(section.classList.contains("section-0")) {
            //             // console.log("시")
                        
            //             if(PickerInput.value) {
            //                 const aliveValueMin = PickerInput.value.substr(3,2);
            //                 PickerInput.value = `${e.target.innerText}:${aliveValueMin}`
            //             }else {
            //                 PickerInput.value = `${e.target.innerText}:00`
            //             }

            //             Object.values(section.querySelectorAll("li")).map((ele, index1)=> {
            //                 ele.classList.remove('active')
            //             })
            //             listItem.classList.add("active")
                        
            //             }
            //             if(section.classList.contains("section-1")) {
            //                 // console.log("분")
            //                 const result = `${PickerInput.value}:${e.target.innerText}`; 
            //                 if(PickerInput.value) {
            //                     const aliveValueHor = PickerInput.value.substr(0,2);
            //                     PickerInput.value = `${aliveValueHor}:${e.target.innerText}`
            //                 }else {
            //                     PickerInput.value = `00:${e.target.innerText}`
            //                 }
            //                 Object.values(section.querySelectorAll("li")).map((ele, index1)=> {
            //                     ele.classList.remove('active')
            //                 })
            //                 listItem.classList.add("active")

            //             }
            //         }

                    
            //     })
            // });
        
            // function menuCheck(event, timeset) {
            //     const aliveValueHor = PickerInput.value.substr(0,2);
            //     const aliveValueMin = PickerInput.value.substr(3,2);
            //     const aliveValueSec = PickerInput.value.substr(6,2);
            //     const _sections = Picker.querySelectorAll(".section")

            //     const globHouse = document.querySelector(`.yogo_global_house .yogo_picker-dropdown[data-id="${Picker.id}"]`);
            //     const _newSections = globHouse.querySelectorAll(".section")

            //     const aliveValueArea = [aliveValueHor, aliveValueMin, aliveValueSec]
            

            //     Object.values(_newSections).map((ul, index)=> {
                    
            //         Object.values(_newSections[index].children[0].children).map((li, index2)=> {
            //             const checkValue = String(aliveValueArea[index]) === String(li.innerText) ? index2 : null;

            //             if(checkValue == null) {
            //                 li.classList.remove("active");
            //             }else {
            //                 const liLocationValue = li.offsetTop;

            //                 _newSections[index].scroll({
            //                     top : liLocationValue-100, 
            //                     behavior : "smooth"
            //                 });

            //                 li.classList.add("active")
            //             }


            //         })

            //     })



            // };

            // function parseTimeSet(e,value, mode) {
            //     const valueLength = value.length;
            //     const _value = value
            //     const _NumberValue = Number(value.substr(0, 2));
            //     const _NumberValueMin = Number(value.substr(-2, 4));
            //     const _Array = [];
            
            //     const checkFormat = () =>{
            //         let check = true;

            //         if(_NumberValue >= 0 && _NumberValue >23) {
            //             check = false;
            //             return false
            //         }
            //         if(_NumberValueMin >= 0 && _NumberValueMin >= 60) {
            //             check = false
            //             return false
            //         }

            //         return check
            //     }

                    
            //     if((valueLength > 3 && valueLength <= 5) || (valueLength > 6 && valueLength <= 8)) {
            //         // 시간 범위 0 ~ 23
            //         if(checkFormat()) {
            //             // console.log("요기")
            //             const parseTimeSet = e.target.value.replace(/(\d)(?=(?:\d{2})+(?!\d))/g, '$1:')
            //             // menuCheck(e, parseTimeSet)
                        
            //             return e.target.value = parseTimeSet;
            //         }else {
            //             return null
            //         }
            //     }
            //     return value
            // }

            // PickerInput.addEventListener("keyup", (e)=> {
            //     const inputKeyValue = e.target.value;
            //     function enterPress(e) {

            //         if((Number(e.target.value.length) ==8 || Number(e.target.value.length) == 5) && (e.keyCode == 13 || e.keyCode == 9)) {
            //             globHouse.classList.remove("active")
            //             PickerInput.blur()
            //         }else {
            //         }
            //     }

            //     if(
            //         (e.keyCode<48 || e.keyCode>57) && (e.keyCode <36 || e.keyCode>40) && (e.keyCode < 16 || e.keyCode >18) && e.keyCode != 186 && e.keyCode != 91 && e.keyCode != 13 && e.keyCode < 8 
            //     ) {
            //         e.target.value = null;
            //     }else {
            //         e.target.value = parseTimeSet(e, inputKeyValue)
            //         menuCheck(e, e.target.value)
            //         enterPress(e)
            //     };

            // });

       
            // PickerInput.addEventListener("focus",(e)=> {
            //     // globHouse 위치 좌표값 지정.
            //     updatePosition("focus", e, this.options);
            //     globHouse.classList.add("active");
            // })
            // PickerInput.addEventListener("blur",(e)=> {
            //     globHouse.classList.remove("active");
            // })

            // globHouse.addEventListener("mousedown",(e)=> {
            //     // const checkPickerArea = e.target.closest(`${this.trigger}`);
            //     const checkPickerArea = e.target.closest(`.yogo_global_house`);
              
            //     if(checkPickerArea) {
            //         e.preventDefault();
            //     }else {
            //         // console.log(checkPickerArea)

            //     }
            // });

            

            
            
        }
     
        // const rippleInit = new ClickRipple();
        // rippleInit.init(this.trigger);
    }
    


}