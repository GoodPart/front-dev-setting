interface objectConfig {
    name : string;
    datasets : string;
}

export class Timepicker implements objectConfig {
    name : string;
    datasets : string;

    crtEle(props:any) {
        const root = document.querySelector(`${props.name}`);
        const _mode = props.dataset;
        const hourValue = 24;
        const minValue = 60;
        const secValue = 60;
        const globHouse = document.querySelector(".yogo_global_house");


        const timeSetValue = [hourValue, minValue, secValue]

        function crtList(value) {
            const crtUl = document.createElement("ul");
            for(let i = 0; i<value; i++) {
                const crtLi = document.createElement("li");
                const crtspan:any = document.createElement("span")

                crtspan.innerHTML = i < 10 ? `0${i}` : i;
                crtLi.append(crtspan)
                crtUl.append(crtLi)
            }

            return crtUl
        };


        const crtRoot = document.createElement("div");
        crtRoot.className = 'yogo_picker';
        crtRoot.setAttribute('data-timeset', _mode.length)

        const crtDropDownMenu = document.createElement("div");
        crtDropDownMenu.className = 'yogo_picker-dropdown';
        crtDropDownMenu.dataset.id = props.name.substr(1);
        const crtFlexWrap = document.createElement("div")
        crtFlexWrap.className = 'flex-wrap';


        const crtInputArea = (_mode) => {
            const timeSetLength = _mode.length;
            const ele = _mode;
            return (
                `<div class="yogo_picker-input"><input type="text" placeholder="${ele}" maxlength="${timeSetLength}"></div>`
            )
        }
        
        if(_mode) {

            const loopLength = _mode.length  == 8 ? 3 : 2;
            for(let i = 0; i<loopLength; i++) {
                const crtSection = document.createElement("div");
                crtSection.className = `section section-${i}`;
                
                crtSection.append(crtList(timeSetValue[i]));
                crtFlexWrap.append(crtSection)
            }
            crtDropDownMenu.append(crtFlexWrap)
            crtRoot.innerHTML = crtInputArea(_mode);



            // crtRoot.append(crtDropDownMenu)
            root.append(crtRoot)

        }
        globHouse.append(crtDropDownMenu)
    };

    selecting(props) {
        const trigger = props.name;
        const picker = document.querySelector(`${trigger}`);
        const pickerInput = picker.querySelector("input[type='text']");
        const numberItem = picker.querySelectorAll(".section ul li")

        const globHouse = document.querySelector(`.yogo_global_house .yogo_picker-dropdown[data-id="${picker.id}"]`);
        const globLi = globHouse.querySelectorAll(".section ul li");

        // console.log(picker.getBoundingClientRect().height);
        const pickerValue = {
            pageX : picker.getBoundingClientRect().left,
            pageY : picker.getBoundingClientRect().top + picker.getBoundingClientRect().height + 8, //8 = 사이 넓이 값
        }

        //  if(initOption) {
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
    };



    updatePosition(action, options, tOb) {
        const ACTION = action;
        const OPTIONS = options;
        const throttle = {
            x : 20,
            y : 8
        };

        // globDiv의 x위치값 계산
        function calcX(picker, globHDiv) {
            // picker
            let pvx = picker.x;
            let pvw = picker.width;
            
            
            //globDiv
            let ghdw = globHDiv.offsetWidth;
            
            // 기준
            const standardX =  pvx + ghdw + throttle.x;
            const resultX = pvx - ((pvx + ghdw) - (pvx + pvw));

            // 화면 기준, globHouseDiv가 화면을 넘어감 or 좁다면
            if(standardX > window.innerWidth) {
                return resultX
            }else {
                return pvx
            }
        };
        
        // globDiv의 y위치값 계산
        function calcY(picker, globDiv, bTo) {
            // picker
            let pvt = picker.top;
            let pvh = picker.height;

            //globDiv
            globDiv.classList.add("active");
            let ghdh = globDiv.offsetHeight;
            globDiv.classList.remove("active");
            
            const resultY = pvt - ( ghdh + throttle.y - window.scrollY); 
            const resultYN = pvt + window.scrollY + pvh + throttle.y;

            if(bTo == undefined || bTo == null) {
                // console.log(bTo)
                return resultYN
            }else {
                if(bTo === 'top') {
                console.log(bTo)
                    return resultY
                }else {
                    return resultYN
                }
            }
        };

        if(ACTION === 'scroll') {
            
        }else if(ACTION === 'focus') {
            const updateValue = {
                id : OPTIONS.path[3].id,
                inputObjectValue : OPTIONS.target.getBoundingClientRect(),
            };

            const globHouseDiv = document.querySelector(`.yogo_global_house .yogo_picker-dropdown[data-id="${updateValue.id}"]`);
            
            const valueX = calcX(updateValue.inputObjectValue, globHouseDiv);
            const valueY = calcY(updateValue.inputObjectValue, globHouseDiv, tOb)

            return {
                _x : valueX,
                _y : valueY
            } 

        }
    };

    
    // 이벤트 메소드
    eventMethods(props) {
        const trigger = props.name;
        const picker = document.querySelector(`${trigger}`);
        const pickerInput = picker.querySelector("input[type='text']") as HTMLElement;
        const numberItem = picker.querySelectorAll(".section ul li")

        const globHouse = document.querySelector(`.yogo_global_house .yogo_picker-dropdown[data-id="${picker.id}"]`);
        const globLi = globHouse.querySelectorAll(".section ul li");



        function menuCheck(event, timeset, _picker) {
                const _input = _picker.querySelector("input[type='text']");
                const aliveValueHor = _input.value.substr(0,2);
                const aliveValueMin = _input.value.substr(3,2);
                const aliveValueSec = _input.value.substr(6,2);
                const _sections = _picker.querySelectorAll(".section")

                // console.log(aliveValueHor)

                const globHouse = document.querySelector(`.yogo_global_house .yogo_picker-dropdown[data-id="${_picker.id}"]`);
                const _newSections = globHouse.querySelectorAll(".section")

                const aliveValueArea = [aliveValueHor, aliveValueMin, aliveValueSec]
            

                Object.values(_newSections).map((ul, index)=> {
                    
                    Object.values(_newSections[index].children[0].children).map((li, index2)=> {
                        const _li = li.querySelector("span").innerText
                        const checkValue = String(aliveValueArea[index]) === String(_li) ? index2 : null;

                        if(checkValue == null) {
                            li.classList.remove("active");
                        }else {
                            const _li = li as HTMLElement;
                            const liLocationValue = _li.offsetTop;

                            _newSections[index].scroll({
                                top : liLocationValue-100, 
                                behavior : "smooth"
                            });

                            li.classList.add("active")
                        }


                    })

                })



            };
            
        function parseTimeSet(e,value) {
            const valueLength = value.length;
            const _value = value
            const _NumberValue = Number(value.substr(0, 2));
            const _NumberValueMin = Number(value.substr(-2, 4));
            const _Array = [];
        
            const checkFormat = () =>{
                let check = true;

                if(_NumberValue >= 0 && _NumberValue >23) {
                    check = false;
                    return false
                }
                if(_NumberValueMin >= 0 && _NumberValueMin >= 60) {
                    check = false
                    return false
                }

                return check
            }

                
            if((valueLength > 3 && valueLength <= 5) || (valueLength > 6 && valueLength <= 8)) {
                // 시간 범위 0 ~ 23
                if(checkFormat()) {
                    // console.log("요기")
                    const parseTimeSet = e.target.value.replace(/(\d)(?=(?:\d{2})+(?!\d))/g, '$1:')
                    // menuCheck(e, parseTimeSet)
                    
                    return e.target.value = parseTimeSet;
                }else {
                    return null
                }
            }
            return value
        }

        //key up
        pickerInput.addEventListener("keyup", (e:KeyboardEvent)=> {
            
            const target = e.target as HTMLInputElement;
            const keyCode = e.keyCode;
            const inputKeyValue = target.value;

            function enterPress(e) {

                if((Number(target.value.length) ==8 || Number(target.value.length) == 5) && (keyCode == 13 || keyCode == 9)) {
                    globHouse.classList.remove("active")
                    console.log("enter")
                    // pickerInput.setAttribute("blur", true);
                }else {
                }
            }

            if(
                (keyCode<48 || keyCode>57) && (keyCode <36 || keyCode>40) && (keyCode < 16 || keyCode >18) && keyCode != 186 && keyCode != 91 && keyCode != 13 && keyCode < 8 
            ) {
                target.value = null;
            }else {
                target.value = parseTimeSet(e, inputKeyValue)
                menuCheck(e, inputKeyValue, picker)
                enterPress(e)
            };

        });

        // focus
        pickerInput.addEventListener("focus",(e)=> {
            // globHouse 위치 좌표값 지정.
            const getUpdateValues = this.updatePosition("focus", e, props.tObPosition);

            globHouse.setAttribute("style", `transform : translateX(${getUpdateValues._x}px) translateY(${getUpdateValues._y}px)`)
            globHouse.classList.add("active");
        })
        // blur
        pickerInput.addEventListener("blur",(e)=> {
            globHouse.classList.remove("active");
        })


        if(props.autoBlur == undefined || props.autoBlur == null || props.autoBlur == false ) {
            return false;
        }else {
            window.addEventListener("scroll", (e)=> {
                globHouse.classList.remove("active");
                pickerInput.blur();
                console.log("scroll")
            })
        }
        

        //mouse down
         globHouse.addEventListener("mousedown",(e)=> {
            // console.log(e.target)
            // const checkPickerArea = e.target.closest(`${this.trigger}`);
            // const checkPickerArea = e.target.closest(`.yogo_global_house`);
            
            // const check = e.
            // if(checkPickerArea) {
                e.preventDefault();
            // }else {
            //     // console.log(checkPickerArea)

            // }
        });




    }

    init(props:object) {
        // console.log(props)
        this.crtEle(props);
        this.selecting(props);

        this.eventMethods(props)


    }
   

};