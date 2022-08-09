class timepicker {
    crtEle(props) {
        const root = document.querySelector(`${props.name}`);

        // const mode = props.mode;
        const _mode = props.dataset;
        const hourValue = 24;
        const minValue = 60;
        const secValue = 60;

        const timeSetValue = [hourValue, minValue, secValue]

        function crtList(value) {
            const crtUl = document.createElement("ul");
            for(let i = 0; i<value; i++) {
                const crtLi = document.createElement("li");
                const crtspan = document.createElement("span")

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

            crtRoot.append(crtDropDownMenu)
            

            root.append(crtRoot)
        }



    }

    init(props) {
        this.crtEle(props)
    }
}


class YogoUI {
    moduleTypeList = [
        'timepicker',
        'multiselector',
    ]
    
    constructor(trigger, options) {
        this.trigger = trigger;
        this.options = options;
    };

    get findType() {
        return this.findTypeArea();
    }

    findTypeArea() {
        this.moduleTypeList.map((type, index)=> {
            if(type == this.options.type) {
                return type
            }
        })

    }

    init() {
        if(this.options.type =='timepicker') {
            const picker = document.querySelector(`${this.trigger}`);
            const parent = picker.parentElement;

            parent.className = picker.className
            // const _mode = picker.dataset.mode;

            // parent.dataset.mode = `mode_${_mode}`
            picker.remove(); // input 제거

            const crtPicker = new timepicker();
            crtPicker.init({
                name : this.trigger,
                // mode : picker.dataset.mode,
                dataset : this.options.timeSet,
            })
            // HTML 생성됨.
            const Picker = document.querySelector(`${this.trigger}`);
            const PickerInput = Picker.querySelector("input[type='text']");
            const numberItem = Picker.querySelectorAll(".section ul li")

            Object.values(numberItem).map((ele, index)=> {
                ele.addEventListener("click", (e)=> {
                    // console.log(ele.parentNode,e.target)
                    const section = ele.parentNode.parentNode;
                    const listItem = e.path[1];
                    // const dataSet = `00:00:00`

                    if(this.options.timeSet.length == 5) {
                        if(section.classList.contains("section-0")) {
                        // console.log("시")
                        
                        if(PickerInput.value) {
                            const aliveValueMin = PickerInput.value.substr(3,2);
                            const aliveValueSec = PickerInput.value.substr(6,8);
                            PickerInput.value = `${e.target.innerText}:${aliveValueMin}:${aliveValueSec}`
                        }else {
                            PickerInput.value = `${e.target.innerText}:00:00`
                        }

                        Object.values(section.querySelectorAll("li")).map((ele, index1)=> {
                            ele.classList.remove('active')
                        })
                        listItem.classList.add("active")
                        
                        }
                        if(section.classList.contains("section-1")) {
                            // console.log("분")
                            const result = `${PickerInput.value}:${e.target.innerText}`; 
                            if(PickerInput.value) {
                                const aliveValueHor = PickerInput.value.substr(0,2);
                                const aliveValueSec = PickerInput.value.substr(6,8);
                                PickerInput.value = `${aliveValueHor}:${e.target.innerText}:${aliveValueSec}`
                            }else {
                                PickerInput.value = `00:${e.target.innerText}:00`
                            }
                            Object.values(section.querySelectorAll("li")).map((ele, index1)=> {
                                ele.classList.remove('active')
                            })
                            listItem.classList.add("active")

                        }
                        if(section.classList.contains("section-2")) {
                            // console.log('초')
                            if(PickerInput.value) {
                                const aliveValueHor = PickerInput.value.substr(0,2);
                                const aliveValueMin = PickerInput.value.substr(3,2);
                                PickerInput.value = `${aliveValueHor}:${aliveValueMin}:${e.target.innerText}`
                            }else {
                                PickerInput.value = `00:00:${e.target.innerText}`
                            }
                            Object.values(section.querySelectorAll("li")).map((ele, index1)=> {
                                ele.classList.remove('active')
                            })
                            listItem.classList.add("active")
                        }
                    
                    }
                    if(this.options.timeSet.length == 8) {
                        if(section.classList.contains("section-0")) {
                        // console.log("시")
                        
                        if(PickerInput.value) {
                            const aliveValueMin = PickerInput.value.substr(3,2);
                            PickerInput.value = `${e.target.innerText}:${aliveValueMin}`
                        }else {
                            PickerInput.value = `${e.target.innerText}:00`
                        }

                        Object.values(section.querySelectorAll("li")).map((ele, index1)=> {
                            ele.classList.remove('active')
                        })
                        listItem.classList.add("active")
                        
                        }
                        if(section.classList.contains("section-1")) {
                            // console.log("분")
                            const result = `${PickerInput.value}:${e.target.innerText}`; 
                            if(PickerInput.value) {
                                const aliveValueHor = PickerInput.value.substr(0,2);
                                PickerInput.value = `${aliveValueHor}:${e.target.innerText}`
                            }else {
                                PickerInput.value = `00:${e.target.innerText}`
                            }
                            Object.values(section.querySelectorAll("li")).map((ele, index1)=> {
                                ele.classList.remove('active')
                            })
                            listItem.classList.add("active")

                        }
                    }

                    
                })
            });
        
            function menuCheck(event, timeset) {
                const aliveValueHor = PickerInput.value.substr(0,2);
                const aliveValueMin = PickerInput.value.substr(3,2);
                const aliveValueSec = PickerInput.value.substr(6,2);
                const _sections = Picker.querySelectorAll(".section")

                const aliveValueArea = [aliveValueHor, aliveValueMin, aliveValueSec]
            

                Object.values(_sections).map((ul, index)=> {
                    
                    Object.values(_sections[index].children[0].children).map((li, index2)=> {
                        const checkValue = String(aliveValueArea[index]) === String(li.innerText) ? index2 : null;

                        if(checkValue == null) {
                            li.classList.remove("active");
                        }else {
                            const liLocationValue = li.offsetTop;

                            _sections[index].scroll({
                                top : liLocationValue-100, 
                                behavior : "smooth"
                            });

                            li.classList.add("active")
                        }


                    })

                })



            };

            function parseTimeSet(e,value, mode) {
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

            // console.log(PickerInput)
            PickerInput.addEventListener("keyup", (e)=> {
                const inputKeyValue = e.target.value;
                function enterPress(e) {
                    // console.log('입력값 - 상수 + 상수',Number((e.target.value.length - _mode)) + Number(_mode),'입력값 길이',e.target.value.length, e.keyCode == 13)
                    if((Number(e.target.value.length) ==8 || Number(e.target.value.length) == 5) && e.keyCode == 13) {
                        Picker.querySelector(".yogo_picker-dropdown").classList.remove("active")
                    }else {
                        // console.log("또잉")
                    }
                }

                if(
                    (e.keyCode<48 || e.keyCode>57) && (e.keyCode <36 || e.keyCode>40) && (e.keyCode < 16 || e.keyCode >18) && e.keyCode != 186 && e.keyCode != 91 && e.keyCode != 13 && (e.keyCode < 8 || e.keyCode >9)
                ) {
                    // alert("숫자가 아니야.")
                    e.target.value = null;
                }else {
                    e.target.value = parseTimeSet(e, inputKeyValue)
                    menuCheck(e, e.target.value)
                    enterPress(e)
                };
                
                

            });
            PickerInput.addEventListener("focus",(e)=> {
                Picker.querySelector(".yogo_picker-dropdown").classList.add("active");

            })

            window.addEventListener("click", (e)=> {
                const checkPickerArea = e.target.closest(`${this.trigger}`);

                if(checkPickerArea == null) {
                    Picker.querySelector(".yogo_picker-dropdown").classList.remove("active")
                }else {
                    Picker.querySelector(".yogo_picker-dropdown").classList.add("active");
                }
            })

        }else {
            // console.log('false',this.options.type)
        }
    }
    


}