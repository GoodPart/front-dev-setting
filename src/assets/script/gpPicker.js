class GpTimpicker {
    crtEle(props) {
        const root = document.querySelector(`.${props.name}`);

        const mode = props.mode;
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
        crtRoot.className = 'gp_picker';
        const crtDropDownMenu = document.createElement("div");
        crtDropDownMenu.className = 'gp_picker-dropdown';
        const crtFlexWrap = document.createElement("div")
        crtFlexWrap.className = 'flex-wrap';


        const crtInputArea = (mode) => {
            // .replace(/(\d)(?=(?:\d{2})+(?!\d))/g, '$1:')

            if(mode == 3) {
                const ele = '000000';
                const crtPlaceHolder = ele.replace(/(\d)(?=(?:\d{2})+(?!\d))/g, '$1:')
                return (
                    `
                    <div class="gp_picker-input">
                        <input type="text" placeholder="${crtPlaceHolder}" id="gp_timpicker ${props.name}" maxlength="8">
                    </div>
                    `
                )
            }
            if(mode == 2) {
                const ele = '0000';
                const crtPlaceHolder = ele.replace(/(\d)(?=(?:\d{2})+(?!\d))/g, '$1:')
                return (
                    `
                    <div class="gp_picker-input">
                        <input type="text" placeholder="${crtPlaceHolder}" id="gp_timpicker ${props.name}" maxlength="5">
                    </div>
                    `
                )
            }
            
        }
        
        if(mode) {
            for(let i = 0; i<mode; i++) {
                const crtSection = document.createElement("div");
                crtSection.className = `section section-${i}`;
                
                crtSection.append(crtList(timeSetValue[i]));
                crtFlexWrap.append(crtSection)
            }
            crtDropDownMenu.append(crtFlexWrap)
            crtRoot.innerHTML = crtInputArea(mode);

            crtRoot.append(crtDropDownMenu)

            root.append(crtRoot)
        }



    }

    init(props) {
        this.crtEle(props)
    }
};


window.addEventListener("load", (e)=> {
    const findTrigger = document.querySelectorAll("#gpPicker");

    if(findTrigger) {
        Object.values(findTrigger).map((picker, index) => {
        

            const parent = picker.parentElement;
            parent.className = picker.className

            const _mode = picker.dataset.mode;

            picker.remove(); // input 제거

            const crtPicker = new GpTimpicker();

            crtPicker.init({
                name : picker.className,
                mode : picker.dataset.mode,
            })


            // HTML 생성됨.
            const gpPicker = document.querySelector(`.${parent.className}`);
            const gpPickerInput = gpPicker.querySelector("input[type='text']");
            const minItem = gpPicker.querySelectorAll(".section ul li")

            Object.values(minItem).map((ele, index)=> {
                ele.addEventListener("click", (e)=> {
                    // console.log(ele.parentNode,e.target)
                    const section = ele.parentNode.parentNode;
                    const listItem = e.path[1];
                    // const dataSet = `00:00:00`

                    if(_mode == 3) {
                        if(section.classList.contains("section-0")) {
                        // console.log("시")
                        
                        if(gpPickerInput.value) {
                            const aliveValueMin = gpPickerInput.value.substr(3,2);
                            const aliveValueSec = gpPickerInput.value.substr(6,8);
                            gpPickerInput.value = `${e.target.innerText}:${aliveValueMin}:${aliveValueSec}`
                        }else {
                            gpPickerInput.value = `${e.target.innerText}:00:00`
                        }

                        Object.values(section.querySelectorAll("li")).map((ele, index1)=> {
                            ele.classList.remove('active')
                        })
                        listItem.classList.add("active")
                        
                        }
                        if(section.classList.contains("section-1")) {
                            // console.log("분")
                            const result = `${gpPickerInput.value}:${e.target.innerText}`; 
                            if(gpPickerInput.value) {
                                const aliveValueHor = gpPickerInput.value.substr(0,2);
                                const aliveValueSec = gpPickerInput.value.substr(6,8);
                                gpPickerInput.value = `${aliveValueHor}:${e.target.innerText}:${aliveValueSec}`
                            }else {
                                gpPickerInput.value = `00:${e.target.innerText}:00`
                            }
                            Object.values(section.querySelectorAll("li")).map((ele, index1)=> {
                                ele.classList.remove('active')
                            })
                            listItem.classList.add("active")

                        }
                        if(section.classList.contains("section-2")) {
                            // console.log('초')
                            if(gpPickerInput.value) {
                                const aliveValueHor = gpPickerInput.value.substr(0,2);
                                const aliveValueMin = gpPickerInput.value.substr(3,2);
                                gpPickerInput.value = `${aliveValueHor}:${aliveValueMin}:${e.target.innerText}`
                            }else {
                                gpPickerInput.value = `00:00:${e.target.innerText}`
                            }
                            Object.values(section.querySelectorAll("li")).map((ele, index1)=> {
                                ele.classList.remove('active')
                            })
                            listItem.classList.add("active")
                        }
                    
                    }
                    if(_mode == 2) {
                        if(section.classList.contains("section-0")) {
                        // console.log("시")
                        
                        if(gpPickerInput.value) {
                            const aliveValueMin = gpPickerInput.value.substr(3,2);
                            gpPickerInput.value = `${e.target.innerText}:${aliveValueMin}`
                        }else {
                            gpPickerInput.value = `${e.target.innerText}:00`
                        }

                        Object.values(section.querySelectorAll("li")).map((ele, index1)=> {
                            ele.classList.remove('active')
                        })
                        listItem.classList.add("active")
                        
                        }
                        if(section.classList.contains("section-1")) {
                            // console.log("분")
                            const result = `${gpPickerInput.value}:${e.target.innerText}`; 
                            if(gpPickerInput.value) {
                                const aliveValueHor = gpPickerInput.value.substr(0,2);
                                gpPickerInput.value = `${aliveValueHor}:${e.target.innerText}`
                            }else {
                                gpPickerInput.value = `00:${e.target.innerText}`
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
                const aliveValueHor = gpPickerInput.value.substr(0,2);
                const aliveValueMin = gpPickerInput.value.substr(3,2);
                const aliveValueSec = gpPickerInput.value.substr(6,2);
                const _sections = gpPicker.querySelectorAll(".section")

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

                    // console.log(`${_NumberValue} >= 0 && ${_NumberValue} >23`)
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

            // console.log(gpPickerInput)
            gpPickerInput.addEventListener("keyup", (e)=> {
                const inputKeyValue = e.target.value;

                if(e.keyCode !== 229) {
                    e.target.value = parseTimeSet(e, inputKeyValue, _mode)
                    menuCheck(e, e.target.value)

                }else {
                    alert("한글은 표기할 수 없습니다.")
                    e.target.value = null;
                };

            });

            window.addEventListener("click", (e)=> {
                const checkPickerArea = e.target.closest(`.${parent.className}`);

                if(checkPickerArea == null) {
                    gpPicker.querySelector(".gp_picker-dropdown").classList.remove("active")
                }else {
                    // console.log("checkPickerArea", checkPickerArea)
                    gpPicker.querySelector(".gp_picker-dropdown").classList.add("active");
                }
            })






           
            
        })
    }

    
})

