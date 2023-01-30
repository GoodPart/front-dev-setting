class Timepicker {
    crtEle(props) {
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




    }

    init(props) {
        this.crtEle(props)

    }
   

};


class Selector {
    //   cunstructor
        
        // 검색
        createSearchControl(name, depthLength, liHeight) {
            const searchModule = name.querySelector(".yogo_search input");
       
            searchModule.addEventListener("keyup", (e)=> {
                // 카테고리가 있는지 없는지 if
                if(depthLength > 1) {
                    const optionsItem = name.querySelectorAll(".yogo_option ul li");
                    const optionItemValue = name.querySelectorAll(".yogo_option ul li div input + label span:not(.yogoClickRipple-root)");
                    filterList(e.target.value, optionItemValue, optionsItem)

                }else {
                    const optionsItem = name.querySelectorAll(".yogo_option");
                    const optionItemValue = name.querySelectorAll(".yogo_option div input + label span:not(.yogoClickRipple-root)");  
                    filterList(e.target.value, optionItemValue, optionsItem)

                }
                
            })

            function filterList (keyvalue, optionValue,optionsItem) {
                const _optionList = optionValue;
                const _optionItem = optionsItem

                for(let i = 0; i<_optionList.length; i++) {
                    // console.log( _optionList[i].innerHTML,'==', keyvalue, '///', _optionList[i].innerHTML.indexOf(keyvalue) )

                    if(_optionList[i].innerHTML.indexOf(keyvalue)>-1) {
                        _optionItem[i].style.height = `${liHeight}px`;
                        
                    }else {
                        _optionItem[i].style.height = "0";
                    }
                }
          
            }
        };

        // 랜덤 색상 RGB
        getRandomColor() {
            return `rgb( ${new Array(3).fill().map(v => Math.random() * 255).join(", ")} )`;
        }

        sortColorPicker(sortColor, i) {
            if(sortColor === false) {
                return this.getRandomColor()
            }else {
                return sortColor[i] // [Array];
            }

        }

        toggleChange(name, globHouse){
            const _target = document.querySelector(name);

            const anchor = _target.querySelector(".yogo_selector_anchor");
            const listArea = globHouse;

            const ACTIVE = "active";
      
            window.addEventListener("click", (e)=> {
                if(e.target.closest(`#${_target.id} .yogo_value_area`) || e.target.closest(`.yogo_global_house div[data-id="${_target.id}"]`)) {
                    if(e.target.classList.contains("ico-btn_delete")) {
                        anchor.classList.remove(ACTIVE);
                        listArea.classList.remove(ACTIVE)
                    }else {
                        anchor.classList.add(ACTIVE);
                        listArea.classList.add(ACTIVE)

                    }

                    // if(e.target.closest(".yogo_selector_anchor")) {
                    //     if(e.target.classList.contains("active")) {
                    //         console.log("클래스 포함")
                    //         anchor.classList.remove(ACTIVE);
                    //         listArea.classList.remove(ACTIVE)
                    //     }else {
                    //         console.log("클래스 미포함")

                    //         anchor.classList.add(ACTIVE);
                    //         listArea.classList.add(ACTIVE)
                    //     }
                        
                    // }
                }else {
                    anchor.classList.remove(ACTIVE);
                    listArea.classList.remove(ACTIVE)
                }
            })
        }

        togglePlaceholder(target, valueArea) {
            const _target = document.querySelector(`${target}`);
            const globHouse = document.querySelector(".yogo_global_house");

            const placeholderCheck = valueArea.querySelectorAll(".active").length != 0 ? false : true
            // console.log(valueArea.querySelectorAll(".active").length)

            if(placeholderCheck) {
                // 아이템이 체크된 상태
                valueArea.parentNode.classList.add("placeholder")
            }else {
                valueArea.parentNode.classList.remove("placeholder")

            }
        }

        // value 영역 선택된 체크리스트 제거 버튼 클릭시
        deleteItem(name, globHouse) {
            const _target = document.querySelector(name);

            const deletes = _target.querySelectorAll(".ico-btn_delete");


            Object.values(deletes).map((ele, index)=> {
                ele.addEventListener("click", (e)=> {
                    const dataId = e.target.parentNode.parentNode.dataset.id;
                    
                    const checkedItem = globHouse.querySelector(`.yogo_option .${dataId}`) || globHouse.querySelector(`.yogo_show-item-value .${dataId}`);

                    checkedItem.click();
                })

            })
        }


        // 카테고리별 모두 체크 기능
        checkAllByCategory(name, depthLength, data, optionEllipsis, allCheckSign) {
            const _showlist = []



            // name의 셀렉터 정의. 
            const _name = name.substr(1);
            const target = document.querySelector(name);
            const dataLength = data.length;

            const globHouse = document.querySelector(`.yogo_global_house .yogo_options[data-id="${_name}"]`);

            const getOptions = target.querySelector(".yogo_options");
            // const getOptionsItem = getOptions.querySelectorAll(".yogo_option");

            const newGetOptions = globHouse;
            // console.log(globHouse)
            const newGetOptionsItem = newGetOptions.querySelectorAll(".yogo_option");
            
            function allCheck(params1, params2, params3) {
                const getAllCheckTarget = params1; // 모두 선택하기 input.
                const checkBoxListItemInputs = params2.querySelectorAll("li div input[type='checkbox']") // 모든 checkbox..
                const checkBoxListItemInputsChecked = params2.querySelectorAll("li div input[type='checkbox']:checked") // 모든 체크된 checkbox.

                const selectAll = (checkBoxListItemInputs.length == checkBoxListItemInputsChecked.length);
                getAllCheckTarget.checked = selectAll

            }

            function textEllipsisFunc(ellipsisEle, displayParam, optionEllipsis, area) {
                ellipsisEle.style.display = `${displayParam}`;

                if(optionEllipsis.subTextTemplate) {
                    const tempSource = optionEllipsis.subTextTemplate;
                    const result = tempSource.replace("@@", area.querySelectorAll(".active").length - optionEllipsis.length)
                    return ellipsisEle.innerHTML = result;
                }else {
                    return ellipsisEle.innerHTML = `and ${area.querySelectorAll(".active").length - optionEllipsis.length} more options`;
                
                }
            }


            Object.values(newGetOptionsItem).map((ele, index)=> {
                const option = ele;
                const checkBoxList = ele.querySelector(".yogo_checkbox_list")

                // depth 가 2개 이상일 경우
                if(depthLength >1) {

                    const checkBoxListItemInputs = checkBoxList.querySelectorAll("li div input[type='checkbox']");
                    const checkBoxListItemInputsChecked = checkBoxList.querySelectorAll("li div input[type='checkbox']:checked");

                    const getAllCheckTarget = ele.querySelector(".yogo_title input"); // depth 1 초과 일때 필요. 

                    const getCategorySymbol = ele.querySelector(".yogo_title ");
                    const getCategoryCount = ele.querySelector(".yogo_title .category_count");
                    const getCategoryColor = ele.querySelector(".yogo_title .index_color").style.backgroundColor;


                    const crtShowListWrap = document.createElement("div");
                    crtShowListWrap.className = `yogo_category-wrap yogo_category-wrap--${index}`;

                    const listarea = target.querySelector(".yogo_value_area .yogo_value_wrap");


                    // find depth 0 title value.
                    const depth_0_title = data[index].depth_0[0].value;

                    
                    
                    // value_area 영역에 노출되는 아이템 만드는 영역
                    Object.values(data[index].depth_1).map((ele, index2)=> {
                        const crtEleSpan = document.createElement("span");
                        crtEleSpan.className = `yogo_show-item-value yogo_depth-${_name}-${index}-${index2}`;
                        crtEleSpan.setAttribute("data-id", `yogo_depth-${_name}-${index}-${index2}`);
                        // console.log("2depth ->", ele)
                        ele.checked ? crtEleSpan.classList.add("active") : crtEleSpan.classList.remove("active")
                        ele.checked ? getCategoryCount.querySelector(".checked-item").innerHTML = checkBoxListItemInputsChecked.length :getCategoryCount.querySelector(".checked-item").innerHTML = checkBoxListItemInputsChecked.length;
                       
                        crtEleSpan.innerHTML = `
                        <span class='index_color' style='background-color:${getCategoryColor}'></span><span><em>${depth_0_title}</em></span><span class='yogo_item_value'>${ele.value} <i class="ico ico-btn_delete"></i></span> 
                        `
                        crtShowListWrap.append(crtEleSpan)
                    })

                    listarea.append(crtShowListWrap)

                    this.togglePlaceholder(this.name, listarea)

                    

                    // 카테고리 모두 체크하기 클릭시 하위 리스트 체크 기능.
                    getAllCheckTarget.addEventListener("change", (e)=> {
                        const _ico = checkBoxList.querySelectorAll("li div input[type='checkbox'] + label .ico");

                        Object.values(checkBoxListItemInputs).map((ele, index)=> {
                            const checkBoxListItemInputs = checkBoxList.querySelectorAll("li div input[type='checkbox']");
                            const showListChange = target.querySelector(`.yogo_show-item-value.${ele.id}`);

                            if(e.target.checked) {
                                showListChange.classList.add("active")
                                _ico[index].classList.remove("ico-checkbox_false");
                                _ico[index].classList.add("ico-checkbox_true");

                                
                                getCategoryCount.querySelector(".checked-item").innerHTML = checkBoxListItemInputs.length;
                                getCategoryCount.querySelector(".checked-item").classList.add("bounce")
                                
                                setTimeout(()=> {
                                    getCategoryCount.querySelector(".checked-item").classList.remove("bounce")

                                }, 200)

                                

                                if(this.textEllipsis) {
                                    const placeholderCheck = listarea.querySelectorAll(".active").length > this.textEllipsis.length ? true : false;

                                    const ellipsisCount = target.querySelector(".ellipsis-count");
                                    ellipsisCount.parentNode.appendChild(ellipsisCount)

                                    if(placeholderCheck) {
                                        // 3개 초과시
                                        Object.values(listarea.querySelectorAll(".active")).map((ele, index)=> {

                                            if(index>=this.textEllipsis.length) {
                                                ele.style.display = 'none';
                                            }else {
                                                ele.style.display = 'inline-block';
                                            }
                                        })
                                      
                                        textEllipsisFunc(ellipsisCount, 'inline-block', optionEllipsis, listarea)
                                    }else {
                                        Object.values(listarea.querySelectorAll(".active")).map((ele, index)=> {

                                            if(index>=this.textEllipsis.length) {
                                                ele.style.display = 'none';
                                            }else {
                                                ele.style.display = 'inline-block';
                                            }
                                        })
                                        
                                        textEllipsisFunc(ellipsisCount, 'inline-block', optionEllipsis, listarea)
                                    }
                                }else {
                                    const allItemLength = listarea.querySelectorAll("span.yogo_show-item-value").length;
                                    const placeholderCheck = listarea.querySelectorAll(".active").length >= allItemLength ? true : false;
    
                                    // console.log(ele,listarea.querySelectorAll(".active").length , allItemLength, 'placecheck->', placeholderCheck) 
    
                                    if(placeholderCheck) {
                                        const allcheckSign = target.querySelector(".allcheck-sign");
    
                                        allcheckSign.innerText = allCheckSign;
                                        allcheckSign.classList.add("active")
                                    }else {
                                        const allcheckSign = target.querySelector(".allcheck-sign");
    
                                        allcheckSign.classList.remove("active")
    
                                    }
    
                                }

                            }else {
                                const showListChange = target.querySelector(`.yogo_show-item-value.${ele.id}`);
                                showListChange.classList.remove("active")
                                _ico[index].classList.add("ico-checkbox_false");
                                _ico[index].classList.remove("ico-checkbox_true");

                                getCategoryCount.querySelector(".checked-item").innerHTML = 0 
                                getCategoryCount.querySelector(".checked-item").classList.add("bounce")
                                setTimeout(()=> {
                                    getCategoryCount.querySelector(".checked-item").classList.remove("bounce")

                                }, 200)

                                if(this.textEllipsis) {
                                showListChange.style.display = 'none'

                                    const placeholderCheck = listarea.querySelectorAll(".active").length > this.textEllipsis.length ? true : false;

                                    const ellipsisCount = target.querySelector(".ellipsis-count");
                                    ellipsisCount.parentNode.appendChild(ellipsisCount)

                                    if(placeholderCheck) {
                                        // 3개 초과시

                                        Object.values(listarea.querySelectorAll(".active")).map((ele, index)=> {

                                            ele.style.display = 'inline-block';
                                            if(index >=this.textEllipsis.length) {
                                                ele.style.display = 'none';
                                            }
                                        })
                                    
                                        textEllipsisFunc(ellipsisCount, 'inline-block', optionEllipsis, listarea)
                                    }else {

                                        Object.values(listarea.querySelectorAll(".active")).map((ele, index)=> {
                                            if(index>=this.textEllipsis.length) {
                                                ele.style.display = 'none';
                                            }else {
                                                ele.style.display = 'inline-block';
                                            }
                                        })

                                        textEllipsisFunc(ellipsisCount, 'inline-block', optionEllipsis, listarea)
                                    }
                                }else {
                                    const allcheckSign = target.querySelector(".allcheck-sign");
    
                                    allcheckSign.classList.remove("active")
    
                                }

                            }

                            ele.checked = e.target.checked

                        });
                        this.togglePlaceholder(this.name, listarea)


                    });


                    // 모든 checkbox 영역 변경시 체크하기.
                    Object.values(checkBoxListItemInputs).map((ele, index)=> {
                        const _ico = checkBoxList.querySelectorAll("input + label .ico");

                        ele.addEventListener("change", (e)=> {
                            allCheck(getAllCheckTarget, checkBoxList);

                            const showListChange = target.querySelector(`.yogo_show-item-value.${ele.id}`);
                            const checkBoxListItemInputsChecked = checkBoxList.querySelectorAll("li div input[type='checkbox']:checked");





                            if(ele.checked) {

                            // console.log(_ico)

                                showListChange.classList.add("active")
                                _ico[index].classList.remove("ico-checkbox_false");
                                _ico[index].classList.add("ico-checkbox_true");
                                getCategoryCount.querySelector(".checked-item").innerHTML = checkBoxListItemInputsChecked.length 
                                getCategoryCount.querySelector(".checked-item").classList.add("bounce")
                                setTimeout(()=> {
                                    getCategoryCount.querySelector(".checked-item").classList.remove("bounce")
                                }, 200)

                                if(this.textEllipsis) {
                                    const placeholderCheck = listarea.querySelectorAll(".active").length > this.textEllipsis.length ? true : false;

                                    const ellipsisCount = target.querySelector(".ellipsis-count");
                                    ellipsisCount.parentNode.appendChild(ellipsisCount)



                                    if(placeholderCheck) {
                                        // 3개 초과시

                                        Object.values(listarea.querySelectorAll(".active")).map((ele, index)=> {
                                            // console.log(ele)

                                            if(index>=this.textEllipsis.length) {
                                                ele.style.display = 'none';
                                            }else {
                                                ele.style.display = 'inline-block';
                                            }
                                        })
                                        textEllipsisFunc(ellipsisCount, 'inline-block', optionEllipsis, listarea)

                                    }else {

                                        Object.values(listarea.querySelectorAll(".active")).map((ele, index)=> {
                                            // console.log(ele)

                                            if(index>=this.textEllipsis.length) {
                                                ele.style.display = 'none';
                                            }else {
                                                ele.style.display = 'inline-block';
                                            }
                                        })

                                        textEllipsisFunc(ellipsisCount, 'none', optionEllipsis, listarea)
                                    }
                                }else {
                                    const allItemLength = listarea.querySelectorAll("span.yogo_show-item-value").length;
                                    const placeholderCheck = listarea.querySelectorAll(".active").length === allItemLength ? true : false;
    
                                    // console.log(placeholderCheck) 
    
                                    if(placeholderCheck) {
                                        const allcheckSign = target.querySelector(".allcheck-sign");
    
                                        // console.log(allCheckSign)
                                        allcheckSign.innerText = allCheckSign;
                                        
                                        allcheckSign.classList.add("active")
                                    }else {
                                        const allcheckSign = target.querySelector(".allcheck-sign");
    
                                        allcheckSign.classList.remove("active")
    
                                    }
    
                                }
                                
                            }else {
                                // showListChange.style.display = 'none';
                                showListChange.classList.remove("active")
                                _ico[index].classList.add("ico-checkbox_false");
                                _ico[index].classList.remove("ico-checkbox_true");
                                getCategoryCount.querySelector(".checked-item").innerHTML =  checkBoxListItemInputsChecked.length 
                                getCategoryCount.querySelector(".checked-item").classList.add("bounce")
                                setTimeout(()=> {
                                    getCategoryCount.querySelector(".checked-item").classList.remove("bounce")
                                }, 200)



                                if(this.textEllipsis) {
                                    showListChange.style.display = 'none'

                                    const placeholderCheck = listarea.querySelectorAll(".active").length > this.textEllipsis.length ? true : false;

                                    const ellipsisCount = target.querySelector(".ellipsis-count");
                                    ellipsisCount.parentNode.appendChild(ellipsisCount)


                                    if(placeholderCheck) {
                                        // 3개 초과시
                                        Object.values(listarea.querySelectorAll(".active")).map((ele, index)=> {

                                            ele.style.display = 'inline-block';
                                            if(index >=this.textEllipsis.length) {
                                                ele.style.display = 'none';
                                            }
                                        })
                                     
                                        textEllipsisFunc(ellipsisCount, 'inline-block', optionEllipsis, listarea)

                                    }else {
                                        Object.values(listarea.querySelectorAll(".active")).map((ele, index)=> {
                                            if(index>=this.textEllipsis.length) {
                                                ele.style.display = 'none';
                                            }else {
                                                ele.style.display = 'inline-block';
                                            }
                                        })
                                       
                                        textEllipsisFunc(ellipsisCount, 'none', optionEllipsis, listarea)
                                    }
                                    
                                }else {
                                    const allcheckSign = target.querySelector(".allcheck-sign");
    
                                    allcheckSign.classList.remove("active")
    
                                }

                            }
                            this.togglePlaceholder(this.name, listarea)
                            

                        })

                        allCheck(getAllCheckTarget, checkBoxList);
                        this.togglePlaceholder(this.name, listarea)

                        
                    });

                }
                else {
                    // depth 가 1개일 경우
                    const checkBoxListItem = ele.querySelector("div input")
                    const listarea = target.querySelector(".yogo_value_area .yogo_value_wrap");

                    const crtEleSpan = document.createElement("span");
                    crtEleSpan.className = `yogo_show-item-value yogo_depth-${_name}-${index}`;
                    crtEleSpan.setAttribute("data-id", `yogo_depth-${_name}-${index}`);

                    data[index].checked ? crtEleSpan.classList.add("active") : crtEleSpan.classList.remove("active")
                    // console.log(crtEleSpan)

                    crtEleSpan.innerHTML = `
                    <span class='yogo_item_value'>${data[index].value} <i class="ico ico-btn_delete"></i></span> 
                    `

                    // console.log(ele)
                    // ele.checked ? crtEleSpan.classList.add("active") : crtEleSpan.classList.remove("active")
                       
                    // crtEleSpan.innerHTML = `
                    // <span class='yogo_item_value'>${data[index]} <i class="ico ico-btn_delete"></i></span> 
                    // `

                  
                    listarea.append(crtEleSpan)
                    this.togglePlaceholder(this.name, listarea)


                    checkBoxListItem.addEventListener("change", (e)=> {
                        const showListChange = target.querySelector(`.yogo_show-item-value.${ele.querySelector("input").id}`);

                        // console.log("change", ele.querySelector("input"))
                        if(ele.querySelector("input").checked) {
                            showListChange.classList.add("active")
                            // console.log(ele.querySelector("input + label .ico"))
                            ele.querySelector("input + label .ico ").classList.remove("ico-checkbox_false")
                            ele.querySelector("input + label .ico ").classList.add("ico-checkbox_true")


                            if(this.textEllipsis) {
                                const placeholderCheck = listarea.querySelectorAll(".active").length > this.textEllipsis.length ? true : false;
                                // console.log(listarea.querySelectorAll(".active").length, this.textEllipsis.length)

                                const ellipsisCount = target.querySelector(".ellipsis-count");
                                ellipsisCount.parentNode.appendChild(ellipsisCount)



                                if(placeholderCheck) {
                                    // 3개 초과시

                                    Object.values(listarea.querySelectorAll(".active")).map((ele, index)=> {
                                        // console.log(ele)

                                        if(index>=this.textEllipsis.length) {
                                            ele.style.display = 'none';
                                        }else {
                                            ele.style.display = 'inline-block';
                                        }
                                    })
                                    textEllipsisFunc(ellipsisCount, 'inline-block', optionEllipsis, listarea)

                                }else {

                                    Object.values(listarea.querySelectorAll(".active")).map((ele, index)=> {
                                        // console.log(ele)

                                        if(index>=this.textEllipsis.length) {
                                            ele.style.display = 'none';
                                        }else {
                                            ele.style.display = 'inline-block';
                                        }
                                    })

                                    textEllipsisFunc(ellipsisCount, 'none', optionEllipsis, listarea)
                                }
                            }else {
                                const allItemLength = listarea.querySelectorAll("span.yogo_show-item-value").length;
                                const placeholderCheck = listarea.querySelectorAll(".active").length === allItemLength ? true : false;

                                // console.log(placeholderCheck) 

                                if(placeholderCheck) {
                                    const allcheckSign = target.querySelector(".allcheck-sign");

                                    // console.log(allCheckSign)
                                    allcheckSign.innerText = allCheckSign;
                                    
                                    allcheckSign.classList.add("active")
                                }else {
                                    const allcheckSign = target.querySelector(".allcheck-sign");

                                    allcheckSign.classList.remove("active")

                                }

                            }
                            

                        }else {
                            showListChange.classList.remove("active")
                            ele.querySelector("input + label .ico ").classList.add("ico-checkbox_false")
                            ele.querySelector("input + label .ico ").classList.remove("ico-checkbox_true")

                            if(this.textEllipsis) {
                                showListChange.style.display = 'none'

                                const placeholderCheck = listarea.querySelectorAll(".active").length > this.textEllipsis.length ? true : false;

                                const ellipsisCount = target.querySelector(".ellipsis-count");
                                ellipsisCount.parentNode.appendChild(ellipsisCount)


                                if(placeholderCheck) {
                                    // 3개 초과시
                                    Object.values(listarea.querySelectorAll(".active")).map((ele, index)=> {

                                        ele.style.display = 'inline-block';
                                        if(index >=this.textEllipsis.length) {
                                            ele.style.display = 'none';
                                        }
                                    })
                                 
                                    textEllipsisFunc(ellipsisCount, 'inline-block', optionEllipsis, listarea)

                                }else {
                                    Object.values(listarea.querySelectorAll(".active")).map((ele, index)=> {
                                        if(index>=this.textEllipsis.length) {
                                            ele.style.display = 'none';
                                        }else {
                                            ele.style.display = 'inline-block';
                                        }
                                    })
                                   
                                    textEllipsisFunc(ellipsisCount, 'none', optionEllipsis, listarea)
                                }
                                
                            }else {
                                const allcheckSign = target.querySelector(".allcheck-sign");

                                allcheckSign.classList.remove("active")

                            }

                        }

                        this.togglePlaceholder(this.name, listarea)

                        // console.log("change", newGetOptionsItem.length, listarea.querySelectorAll("span.yogo_show-item-value").length)

                                    // let count = 0;
                                    // const getLength = newGetOptionsItem.length;
                                    
                                    // Object.values(newGetOptionsItem).map((ele, index)=> {
                                    //     const checkBoxListItem = ele.querySelector("div input").checked ? count++ : count;

                                    //     if(getLength === count) {
                                    //         console.log("모두체크")
                                    //     }else {
                                    //         console.log("아직", checkBoxListItem.length)
                                    //     }
                                    // })

                        // console.log(getLength, count)

                        // console.log(newGetOptionsItem)
                        // if()

                        // if(newGetOptionsItem.length === )
                    })
                  
                }



                

                
                
            })

            return _showlist
        };

        // 모든 카테고리 모두체크 기능 활성화
        checkAllByCenterControl(name,depthLength) {
            const _name = name.substr(1);

            const globHouse = document.querySelector(`.yogo_global_house .yogo_options[data-id="${_name}"]`);

            const target = document.querySelector(name);
            // 모든 카테고리 및 하위 체크박스 체크 관리.
            const controler = globHouse.querySelector(".yogo_option--allcheck");

            
            const controlerAllCheck = controler.querySelector("button[name='yogo_allCheck']");
            const controlerClearCheck = controler.querySelector("button[name='yogo_clearCheck']");

            // 모든 카테고리 모두 체크 토글 함수.
            function toggleAllCheck(target, category_0, clickEle) {
                // const target = document.querySelector(name);

                const lis = category_0;
                const clickTarget = clickEle;

                if(clickTarget.name == controlerAllCheck.name) {
                    // 모두 체크.
                    Object.values(lis).map((ele, index)=> {
                        if(!ele.checked) {
                            ele.click()
                        }
                    })
                }
                if(clickTarget.name == controlerClearCheck.name) {
                    // 모두 해제.
                    Object.values(lis).map((ele, index)=> {
                        if(ele.checked) {
                            ele.click()
                        }else {
                            ele.click()
                            ele.click()
                        }
                    })
                }
            }

            

            Object.values(controler.children).map((ele, index)=> {
                ele.addEventListener("click", (e)=> {
                    if(depthLength >1) {
                        const target = document.querySelector(name);
                        const lis = globHouse.querySelectorAll(".yogo_option ul li div input")

                        toggleAllCheck(target, lis, e.target)
                    }
                    else {
                        const target = document.querySelector(name);
                        const lis = globHouse.querySelectorAll(".yogo_option div input")

                        toggleAllCheck(target, lis, e.target)
                    }
                })
            })

            // 상태 초기화


        }


        // 옵션 영역 만들기.
        createOptionArea(insertArea, options) {
            const area = insertArea;
            const yogo_addon = document.createElement("div");
            yogo_addon.className = 'yogo_addon';
            let _allCheckControler;

            if(!options.allCheckControler) {
                // console.log('false - ',options.allCheckControler)
                 _allCheckControler = `
                    <button type='button' name='yogo_allCheck' class='yogoUiButton-root yogoUiButton-root--dark'>Select All <span class='yogoClickRipple-root'></span></button> <button type='button' name='yogo_clearCheck' class='yogoUiButton-root yogoUiButton-root--dark'>Deselect All <span class='yogoClickRipple-root'></span></button>
                `
            }else {
                if(options.allCheckControler.text){
                    _allCheckControler = `
                        <button type='button' name='yogo_allCheck' class='yogoUiButton-root yogoUiButton-root--dark'>${options.allCheckControler.text[0]}<span class='yogoClickRipple-root'></span></button> <button type='button' name='yogo_clearCheck' class='yogoUiButton-root yogoUiButton-root--dark'>${options.allCheckControler.text[1]}<span class='yogoClickRipple-root'></span></button>
                    `
                }else {
                    _allCheckControler = `
                    <button type='button' name='yogo_allCheck' class='yogoUiButton-root yogoUiButton-root--dark'>Select All <span class='yogoClickRipple-root'></span></button> <button type='button' name='yogo_clearCheck' class='yogoUiButton-root yogoUiButton-root--dark'>Deselect All <span class='yogoClickRipple-root'></span></button>
                `
                }
                
            }

                
                const _searchControler = `
                        <i class="ico ico-ico_search"></i>
                        <input type="text" placeholder="Search">
                `
                const _list = [ _allCheckControler, _searchControler]
                const _listAddClassName = ['yogo_option--allcheck','yogo_search']

                // console.log(options)
                Object.entries(options).map((ele, index)=> {
                    const emptyDiv = document.createElement("div");
                    emptyDiv.className = _listAddClassName[index]

                    if(ele[1]) {
                        emptyDiv.innerHTML=_list[index];
                        yogo_addon.appendChild(emptyDiv)
                    }
                })
                area.appendChild(yogo_addon)
        }

        // html 생성
        createUseEle(name, depthLength, data, allCheckControler, search, mode, sortColor, checkbox, allCheckSign) {
            const target = document.querySelector(name);

            const _name = name.split('#')[1];

            const crtSelectorWrap = document.createElement("div");
            crtSelectorWrap.className = "yogo_selector_wrap";

            const crtSelectorValue = document.createElement("div");
            crtSelectorValue.className = "yogo_value_area";

            const crtDiv = document.createElement("div");
            crtDiv.className = 'yogo_value_wrap'

            const crtAllCheckSign = document.createElement("div");
            crtAllCheckSign.classList.add("allcheck-sign");
            crtDiv.append(crtAllCheckSign);


            const crtAddCount = document.createElement("strong");
            crtAddCount.classList.add("ellipsis-count")
            crtDiv.append(crtAddCount)

            crtSelectorValue.append(crtDiv)

            const crtAnchor = document.createElement("div");
            crtAnchor.className = "yogo_selector_anchor";

            const anchorIcon = `
                <div><i class="ico ico-btn_arrow"></i></div>
            `
            crtAnchor.innerHTML = anchorIcon

            crtSelectorValue.appendChild(crtAnchor)

            // 옵션 영역
            const crtOptionList = document.createElement("div");
            crtOptionList.className =  "yogo_options"; // active 제거
            crtOptionList.dataset.depth = depthLength == 1 ? '1' : '2'

            crtOptionList.dataset.id = _name;

            const globHouse = document.querySelector(".yogo_global_house");

            const crtOptionContent = document.createElement("div");
            crtOptionContent.className = "yogo_option_wrap"

            //mode 관련 스크립트
            if(mode) {
                mode.map((mode_ele, index)=> {
                  if(mode_ele === 'sticky') {
                    crtOptionList.classList.add("mode_sticky")
                  }
                  
                  if(mode_ele === 'category_count') {
                    crtOptionList.classList.add("category_count")
                  }
                  if(mode_ele === 'category_smooth') {
                    crtOptionList.classList.add("category_smooth")
                  }
                })
            }else {
                // console.log("없음")
            }


            // option 영역 만들기고 값 넣기.
            this.createOptionArea(crtOptionList, {
                allCheckControler : allCheckControler,
                search : search,
            })


            if(depthLength>1){
                // depth1 만들기.
                for(let i = 0; i<data.length; i++) {
                    const crtOptionItem = document.createElement("div");
                    crtOptionItem.className = "yogo_option";

                    const crtDepth_1_Title = document.createElement("div");
                    crtDepth_1_Title.className = `yogo_title yogo_title-${i}`;
                    


                    const crtInputLabel_depth_1 = `
                        <input type='checkbox' id='yogo_depth-${_name}-${i}' ${data[i].depth_0[0].checked ? 'checked' : ''} class='yogo_depth-${_name}-${i}_checkall'>
                            <label for='yogo_depth-${_name}-${i}'>
                                <span class='index_color' style='background-color: ${this.sortColorPicker(this.sortColor, i)}'></span>
                                <span class='desc'>${data[i].depth_0[0].value}</span>
                            </label>
                                <div class='category_count'><div class='checked-item'></div><div class='check-item'>${data[i].depth_1.length}</div></div>
                    `

                    // yogo_title 추가
                    crtDepth_1_Title.innerHTML=crtInputLabel_depth_1;

                    crtOptionItem.appendChild(crtDepth_1_Title)


                    const crtDepth_2_list = document.createElement("ul");
                    crtDepth_2_list.className = `yogo_checkbox_list yogo_checkbox_list-${i}`
                    // depth2 만들기
                    for(let j = 0; j<data[i].depth_1.length; j++) {
                        const crtDepth_2_item = document.createElement("li");
                        const crtDepth_2_div = document.createElement("div");

                        const checkValue = data[i].depth_1[j].checked

                        let crtInputLabel_depth_2;

                        // console.log(data[i].depth_1[j])

                        if(!checkbox) {
                             crtInputLabel_depth_2 = `
                            <input type='checkbox' id='yogo_depth-${_name}-${i}-${j}' ${checkValue ? 'checked' : ''} class='yogo_depth-${_name}-${i}-${j}'><label class='yogoUiButton-root' for='yogo_depth-${_name}-${i}-${j}'><span class='yogo_value'>${data[i].depth_1[j].value}</span><span class="yogoClickRipple-root"></span></label>
    
                            `
                        }else {
                            if(!data[i].depth_1[j].disabled) {
                                crtInputLabel_depth_2 = `
                                <input type='checkbox' id='yogo_depth-${_name}-${i}-${j}' ${checkValue ? 'checked' : ''} class='yogo_depth-${_name}-${i}-${j}'><label class='yogoUiButton-root' for='yogo_depth-${_name}-${i}-${j}'><i class="ico ${checkValue ? 'ico-checkbox_true' : 'ico-checkbox_false'} "></i><span class='yogo_value'>${data[i].depth_1[j].value}</span><span class="yogoClickRipple-root"></span></label>
                                
                                `
                            }else {
                                crtInputLabel_depth_2 = `
                                <input type='checkbox' id='yogo_depth-${_name}-${i}-${j}'  class='yogo_depth-${_name}-${i}-${j}' ${data[i].depth_1[j].disabled ? 'disabled' : ''} ><label class='yogoUiButton-root' for='yogo_depth-${_name}-${i}-${j}'><i class="ico ${checkValue ? 'ico-checkbox_true' : 'ico-checkbox_disabled'} "></i><span class='yogo_value'>${data[i].depth_1[j].value}</span><span class="yogoClickRipple-root"></span></label>
                                
                                `
                            }
                            

                         
                        }
                       

                        crtDepth_2_div.innerHTML = crtInputLabel_depth_2
                        crtDepth_2_item.appendChild(crtDepth_2_div)

                        // for문 밖에서 생성한 ul에 추가.
                        crtDepth_2_list.appendChild(crtDepth_2_item)
                    }
                    // yogo_option 만들기 완료.
                    crtOptionItem.appendChild(crtDepth_2_list)

                    crtOptionContent.appendChild(crtOptionItem)

                    // yogo_options 만들기 완료
                    crtOptionList.appendChild(crtOptionContent)
                }; // for 완료

                // crtSelectorWrap
                globHouse.append(crtOptionList)
            };


            if(depthLength <=1) {
                for(let i = 0; i<data.length; i++) {
                    const crtOptionItem = document.createElement("div");
                    crtOptionItem.className = `yogo_option yogo_option--${i}`;

                    const crtDepth_1_Title = document.createElement("div");

                    const checkValue = data[i].checked
                    // console.log(checkValue)

                    // console.log('name ->',data[i].value,'checked ->', data[i].checked, 'disabled ->', data[i].disabled)

                    let crtInputLabel_depth_1;
                    if(!checkbox) {
                        crtInputLabel_depth_1 = `
                        <input type='checkbox' id='yogo_depth-${_name}-${i}' class='yogo_depth-${_name}-${i}' ${checkValue ? 'checked' : ''} ${data[i].disabled ? 'disabled' : ''} ><label class='yogoUiButton-root' for='yogo_depth-${_name}-${i}'><span class="yogo_value">${data[i].value}</span><span class="yogoClickRipple-root"></span></label>
                        `
                    }else {
                        if(!data[i].disabled) {
                            crtInputLabel_depth_1 = `
                            <input type='checkbox' id='yogo_depth-${_name}-${i}' class='yogo_depth-${_name}-${i}' ${checkValue ? 'checked' : ''} ${data[i].disabled ? 'disabled' : ''}><label class='yogoUiButton-root' for='yogo_depth-${_name}-${i}'><i class="ico ${checkValue ? 'ico-checkbox_true' : 'ico-checkbox_false'} "></i><span class="yogo_value">${data[i].value}</span><span class="yogoClickRipple-root"></span></label>
                            `

                        }else {
                            crtInputLabel_depth_1 = `
                            <input type='checkbox' id='yogo_depth-${_name}-${i}' class='yogo_depth-${_name}-${i}'  ${data[i].disabled ? 'disabled' : ''}><label class='yogoUiButton-root' for='yogo_depth-${_name}-${i}'><i class="ico ${checkValue ? 'ico-checkbox_true' : 'ico-checkbox_disabled'}"></i><span class="yogo_value">${data[i].value}</span><span class="yogoClickRipple-root"></span></label>
                            `
                        }

                    }
                    

                    

                    // yogo_title 추가
                    crtDepth_1_Title.innerHTML=crtInputLabel_depth_1;

                    crtOptionItem.appendChild(crtDepth_1_Title)


                    crtOptionContent.appendChild(crtOptionItem)
                    
                    // yogo_options 만들기 완료
                    crtOptionList.appendChild(crtOptionContent)
                }; // for 완료

                globHouse.append(crtOptionList)
            }
            
            
            

            // console.log('target',target)
            let checkDuplication = target.querySelector(".yogo_selector_wrap");
            // console.log('test',test)

            if(checkDuplication) {

            }else {
                crtSelectorWrap.prepend(crtSelectorValue)
                const result = target.appendChild(crtSelectorWrap);

                return result
            }
            
            

        };

        // 진입
        init({name ,search, depthLength, textEllipsis, sortColor, allCheckControler, data, mode, checkbox, allCheckSign}) {

                if(name === undefined || name === '') {
                    throw new SyntaxError("name is not defind")
                }else {
                    this.name = name;
                }
                if(search === undefined || search === '' ) {
                    this.search = false
                }else {
                    this.search = search;
                }
                if(depthLength === undefined || depthLength === '') {
                    this.depthLength = 1
                }else {
                    this.depthLength = depthLength;
                }
                if(textEllipsis === undefined || textEllipsis === '' ) {
                    this.textEllipsis = false;
                }else {
                    this.textEllipsis = textEllipsis
                }
                if(sortColor === undefined || sortColor  === '') {
                    this.sortColor = false;
                }else {
                    this.sortColor = sortColor
                }
                if(allCheckControler === undefined || allCheckControler === '') {
                    this.allCheckControler = false
                }else {
                    this.allCheckControler = allCheckControler;
                }
                if(checkbox === undefined || checkbox === '') {
                    this.checkbox = false
                }else {
                    this.checkbox = checkbox;
                }
                if(data === undefined || data === '') {
                    throw new SyntaxError("data is not defind")
                }else {
                    this.data = data;
                }
                if( mode === '') {
                    throw new SyntaxError("mode is not defind")
                }else {
                    this.mode = mode;
                }

                if(allCheckSign == undefined || allCheckSign === '') {
                    this.allCheckSign = false
                }else {
                    this.allCheckSign = allCheckSign;
                }

                // console.log('this --->',this.name,this.search,this.depthLength,this.allCheckControler, this.data)   

                // console.log('text Ellipsis',this.textEllipsis)

                

                // this.sortColorPicker(this.sortColor)
                

                // 모든 조건문 만족시 진행
                if(true) {
                    
                    // element 생성
                    this.createUseEle(this.name, this.depthLength, this.data, this.allCheckControler, this.search, this.mode, this.sortColorPicker, this.checkbox, this.allCheckSign);


                    const _name = name.substr(1);
                    const globHouse = document.querySelector(`.yogo_global_house .yogo_options[data-id="${_name}"]`);
                    this.toggleChange(this.name, globHouse)

                    // 각 카테고리 별 모든 체크 
                    this.checkAllByCategory(this.name, this.depthLength, this.data, this.textEllipsis, this.allCheckSign);

                    if(this.allCheckControler) {
                        this.checkAllByCenterControl(this.name, this.depthLength);
                    }
                    
                    // if(this.search) {...}
                    if(this.search) {
                        // const _target = document.querySelector(name);
                        // const _name = name.substr(1);
                        // const globHouse = document.querySelector(`.yogo_global_house .yogo_options[data-id="${_name}"]`);

                        if(this.depthLength > 1) {
                            const liHeight = globHouse.querySelector(".yogo_options .yogo_option ul li").offsetHeight;

                            this.createSearchControl(globHouse,this.depthLength, liHeight)
                            // this.deleteItem(this.name, globHouse)
                        }else {
                            const liHeight = globHouse.querySelector(".yogo_options .yogo_option div").offsetHeight;

                            this.createSearchControl(globHouse,this.depthLength, liHeight)
                            // this.deleteItem(this.name, globHouse)
                            
                        }
                        
                    }
                    this.deleteItem(this.name, globHouse)


                    // this.scanCheckAction(this.name)

                }

        };

    }

class ClickRipple {
    // yogoClickRipple-root

    getXY(trigger) {

        const _target = trigger.substr(1);
        const root = document.querySelectorAll('.yogoUiButton-root');
        const root2 = document.querySelectorAll(`.yogo_global_house div[data-id="${_target}"] .yogoUiButton-root`)
        Object.values(root).map((item, index)=> {

            // if(item.type == 'checkbox') {
                // console.log("checkbox")
                
            // }else if(item.type == 'button') {
                // console.log("button")
                const findRippleRoot = item.querySelector(".yogoClickRipple-root");

                // if(item.type)
                item.addEventListener("mousedown", (e)=> {
                    const getXY = {
                        valueX : e.offsetX,
                        valueY : e.offsetY
                    }
                    // console.log(getXY)
                    const fillSpan = document.createElement("span");
                    fillSpan.className = 'fill';
                    fillSpan.style.top = `${getXY.valueY}px`;
                    fillSpan.style.left = `${getXY.valueX}px`;
                    findRippleRoot.appendChild(fillSpan);

                    
                    
                    setTimeout(()=> {

                        fillSpan.remove()
                    }, 800)
                })

                

            // }
        })

    }

    init(trigger) {
        // console.log(trigger)
        this.getXY(trigger)
    }

}


class YogoUI {
    moduleTypeList = [
        'timepicker',
        'multiselector',
        // 'ripple'
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



    init(initOption) {
        const crtGolbalArea = document.createElement("div");
        crtGolbalArea.className = 'yogo_global_house';

        const initAfterOptions = initOption;
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
                })
            }

            
            // console.log('후',document.querySelectorAll(`${this.trigger}`));

            // HTML 생성됨.
            const Picker = document.querySelector(`${this.trigger}`);
            const PickerInput = Picker.querySelector("input[type='text']");
            const numberItem = Picker.querySelectorAll(".section ul li")

            const globHouse = document.querySelector(`.yogo_global_house .yogo_picker-dropdown[data-id="${Picker.id}"]`);
            const globLi = globHouse.querySelectorAll(".section ul li");

          
            const pickerValue = {
                pageX : Picker.getBoundingClientRect().left,
                pageY : Picker.getBoundingClientRect().top + Picker.offsetHeight + 8, //8 = 사이 넓이 값
            }

            // console.log(pickerValue.pageX + globHouse.offsetWidth + 20 , window.innerWidth)


            if(initOption) {
                const _parent = document.querySelector(`${initOption.hasScrollBar.ele}`);


                if(initOption.hasScrollBar.useScrollType === 'window') {
                    _parent.addEventListener("scroll", (e)=> {
                        globHouse.style.transform = `translateX(${pickerValue.pageX}px) translateY(${pickerValue.pageY - e.target.scrollTop}px)`
                    })
                }
               
                if(initOption.hasScrollBar.useScrollType === 'position') {
                    _parent.addEventListener("wheel", (e)=> {
                        const result = _parent.style.top;
                        const changeNumb = Number(result.replace("px",''))
                        globHouse.style.transform = `translateX(${pickerValue.pageX}px) translateY(${pickerValue.pageY + changeNumb}px)`
                    })
                }
            }


            // 드롭 다운 메뉴가 브라우저 우측으로 넘어갈시 좌우 보정
            // if(pickerValue.pageX + globHouse.offsetWidth + 20 > window.innerWidth) {
            //     // console.log("넘어감", )
            //     globHouse.style.transform = `translateX(${ pickerValue.pageX - ((pickerValue.pageX + globHouse.offsetWidth) - (pickerValue.pageX + PickerInput.offsetWidth))  }px) translateY(${pickerValue.pageY}px)`
            // }else {
            //     // console.log("통과")
            //     globHouse.style.transform = `translateX(${pickerValue.pageX}px) translateY(${pickerValue.pageY}px)`
            // }

            // 드롭다운 매뉴 위아래 수정 관련 스크립트 (수정중)
            // if(pickerValue.pageX + globHouse.offsetWidth + 20 > window.innerWidth) {
            //     console.log("넘어감", ) 
            //     if(this.options.tObPosition == undefined || this.options.tObPosition == null) {
            //         // tObPosition 옵션
            //         console.log("없어")
            //         globHouse.style.transform = `translateX(${ pickerValue.pageX - ((pickerValue.pageX + globHouse.offsetWidth) - (pickerValue.pageX + PickerInput.offsetWidth))  }px) translateY(${pickerValue.pageY}px)`
            //     }else {
            //         globHouse.classList.add("active");
            //         const globHouseHeight = globHouse.offsetHeight;
            //         globHouse.classList.remove("active");
            
            //         if(this.options.tObPosition === 'top') {
            //             globHouse.style.transform = `translateX(${ pickerValue.pageX - ((pickerValue.pageX + globHouse.offsetWidth) - (pickerValue.pageX + PickerInput.offsetWidth))  }px) translateY(${Picker.getBoundingClientRect().top - globHouseHeight - 8 }px)`
            //         }else if( this.options.tObPosition == 'bottom') {
            //             globHouse.style.transform = `translateX(${pickerValue.pageX}px) translateY(${pickerValue.pageY}px)`
            //         }
                    
            //     }
            // }else {
            //     console.log("통과")
            //     if(this.options.tObPosition == undefined || this.options.tObPosition == null) {
            //         // tObPosition 옵션
            //         console.log("없어")
            //         globHouse.style.transform = `translateX(${ pickerValue.pageX}px) translateY(${pickerValue.pageY}px)`
            //     }else {
            //         globHouse.classList.add("active");
            //         const globHouseHeight = globHouse.offsetHeight;
            //         globHouse.classList.remove("active");
            
            //         if(this.options.tObPosition === 'top') {
            //             globHouse.style.transform = `translateX(${pickerValue.pageX}px) translateY(${Picker.getBoundingClientRect().top - globHouseHeight - 8 }px)`
            //         }else if( this.options.tObPosition == 'bottom') {
            //             globHouse.style.transform = `translateX(${pickerValue.pageX}px) translateY(${pickerValue.pageY}px)`
            //         }
            //     }
            // }

            function updatePosition(action, options, beforeOptions, afterOptions) {
                const ACTION = action;
                const OPTIONS = options;
                const throttle = {
                    x : 20,
                    y : 8
                };

                // const tObOption = initOption.tObPosition;
                // console.log(beforeOptions)

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
                        // console.log(bTo)
                            return resultY
                        }else {
                            return resultYN
                        }
                    }
                };

                function moreCalcY(yvalue, iao) {
                    // console.log(yvalue)
                }


                if(ACTION === 'scroll') {
                    // console.log(ACTION, OPTIONS)
                }else if(ACTION === 'focus') {
                    const updateValue = {
                        id : OPTIONS.path[3].id,
                        inputObjectValue : OPTIONS.target.getBoundingClientRect(),
                    };
                    const globHouseDiv = document.querySelector(`.yogo_global_house .yogo_picker-dropdown[data-id="${updateValue.id}"]`);

                    // globHouse 위치 값 설정.
                    globHouse.style.transform = `translateX(${calcX(updateValue.inputObjectValue, globHouseDiv)}px) translateY(${calcY(updateValue.inputObjectValue, globHouseDiv, beforeOptions.tObPosition)}px)`;

                    // moreCalcY(calcY(updateValue.inputObjectValue, globHouseDiv, tObOption), initAfterOptions)
                }else {
                    return  false
                }
            // globHouse.classList.add("smooth")

            }



            Object.values(globLi).map((ele, index)=> {
                ele.addEventListener("click", (e)=> {
                    // console.log(ele.parentNode,e.target)
                    const section = ele.parentNode.parentNode;
                    const listItem = e.path[1];
                    // const dataSet = `00:00:00`

                    if(this.options.timeSet.length ==8) {
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
                    if(this.options.timeSet.length == 5) {
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

                const globHouse = document.querySelector(`.yogo_global_house .yogo_picker-dropdown[data-id="${Picker.id}"]`);
                const _newSections = globHouse.querySelectorAll(".section")

                const aliveValueArea = [aliveValueHor, aliveValueMin, aliveValueSec]
            

                Object.values(_newSections).map((ul, index)=> {
                    
                    Object.values(_newSections[index].children[0].children).map((li, index2)=> {
                        const checkValue = String(aliveValueArea[index]) === String(li.innerText) ? index2 : null;

                        if(checkValue == null) {
                            li.classList.remove("active");
                        }else {
                            const liLocationValue = li.offsetTop;

                            _newSections[index].scroll({
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

            PickerInput.addEventListener("keyup", (e)=> {
                const inputKeyValue = e.target.value;
                function enterPress(e) {

                    if((Number(e.target.value.length) ==8 || Number(e.target.value.length) == 5) && (e.keyCode == 13 || e.keyCode == 9)) {
                        globHouse.classList.remove("active")
                        PickerInput.blur()
                    }else {
                    }
                }

                if(
                    (e.keyCode<48 || e.keyCode>57) && (e.keyCode <36 || e.keyCode>40) && (e.keyCode < 16 || e.keyCode >18) && e.keyCode != 186 && e.keyCode != 91 && e.keyCode != 13 && e.keyCode < 8 
                ) {
                    e.target.value = null;
                }else {
                    e.target.value = parseTimeSet(e, inputKeyValue)
                    menuCheck(e, e.target.value)
                    enterPress(e)
                };

            });

       
            PickerInput.addEventListener("focus",(e)=> {
                // globHouse 위치 좌표값 지정.
                updatePosition("focus", e, this.options, initAfterOptions);
                globHouse.classList.add("active");
            })
            PickerInput.addEventListener("blur",(e)=> {
                globHouse.classList.remove("active");
            })

            globHouse.addEventListener("mousedown",(e)=> {
                // const checkPickerArea = e.target.closest(`${this.trigger}`);
                const checkPickerArea = e.target.closest(`.yogo_global_house`);
              
                if(checkPickerArea) {
                    e.preventDefault();
                }else {
                    // console.log(checkPickerArea)

                }
            });

            
            if(this.options.autoBlur == undefined || this.options.autoBlur == null || this.options.autoBlur == false ) {
                return false;
            }else {
                window.addEventListener("scroll", (e)=> {
                    globHouse.classList.remove("active");
                    PickerInput.blur();
                    // console.log("scroll")
                })
            }

            
            
        }
        if(this.options.type == 'multiselector') {
            const selector = document.querySelector(`${this.trigger}`);


            const crtHTML = new Selector();
            crtHTML.init({
                name : this.trigger,
                search : this.options.search,
                depthLength : this.options.depthLength,
                textEllipsis : this.options.textEllipsis,
                sortColor : this.options.sortColor,
                allCheckControler : this.options.allCheckControler,
                data : this.options.data,
                mode : this.options.mode,
                checkbox : this.options.checkbox,
                allCheckSign : this.options.allCheckSign

            });
            const globHouse = document.querySelector(`.yogo_global_house .yogo_options[data-id="${selector.id}"]`);

            function updatePosition(action, options, beforeOptions, afterOptions) {
                const ACTION = action;
                const OPTIONS = options;
                const throttle = {
                    x : 20,
                    y : 8
                };

                // const tObOption = initOption.tObPosition;
                // console.log(beforeOptions)

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
                    let ghdh = globDiv.offsetHeight;
                    console.log(pvt, pvh, ghdh)
                    
                    const resultY = pvt - ( ghdh + throttle.y - window.scrollY); 
                    const resultYN = pvt + window.scrollY + pvh + throttle.y;

                    return pvt
                  
                };


                if(ACTION === 'scroll') {
                    // console.log(ACTION, OPTIONS)
                }else if(ACTION === 'focus') {
                    const updateValue = {
                        id : OPTIONS.path[2].id,
                        inputObjectValue : OPTIONS.target.getBoundingClientRect(),
                    };

                    const globHouseDiv = document.querySelector(`.yogo_global_house .yogo_options[data-id="${updateValue.id}"]`);
                    console.log('option', document.querySelector(`.yogo_global_house .yogo_options[data-id="${updateValue.id}"]`))


                    // globHouse 위치 값 설정.
                    globHouse.style.transform = `translateX(${calcX(updateValue.inputObjectValue, globHouseDiv)}px) translateY(${calcY(updateValue.inputObjectValue, globHouseDiv)}px)`;

                    // moreCalcY(calcY(updateValue.inputObjectValue, globHouseDiv, tObOption), initAfterOptions)
                }else {
                    return  false
                }
            // globHouse.classList.add("smooth")

            }



            /* ------------- */

            const _target = document.querySelector(this.trigger);
            // console.log(_target)

            const anchor = _target.querySelector(".yogo_selector_anchor");

      
            window.addEventListener("click", (e)=> {
                
                if(e.target.closest(`#${_target.id} .yogo_value_area`) || e.target.closest(`.yogo_global_house div[data-id="${_target.id}"]`)) {
                    const selectorValue = {
                        pageX : selector.getBoundingClientRect().left,
                        pageY : selector.getBoundingClientRect().top + selector.offsetHeight, //8 = 사이 넓이 값
                        width : selector.getBoundingClientRect().width,
                    };
                        // console.log("열렸어?", e.target.b, )
                        globHouse.style.top = `${selectorValue.pageY + window.scrollY}px`;
                        globHouse.style.left = `${selectorValue.pageX}px`;
                        globHouse.style.width = `${selectorValue.width}px`;
                 

                }
            })
            /* ----------- */

              

            if(initOption) {
                const _parent = document.querySelector(`${initOption.hasScrollBar.ele}`);

                if(initOption.hasScrollBar.useScrollType === 'window') {
                    _parent.addEventListener("scroll", (e)=> {
                        globHouse.style.transform = `translateX(${pickerValue.pageX}px) translateY(${pickerValue.pageY - e.target.scrollTop}px)`
                    })
                }
               
                if(initOption.hasScrollBar.useScrollType === 'position') {
                    _parent.addEventListener("wheel", (e)=> {
                        const result = _parent.style.top;
                        const changeNumb = Number(result.replace("px",''))
                        globHouse.style.transform = `translateX(${pickerValue.pageX}px) translateY(${pickerValue.pageY + changeNumb}px)`
                    })
                }
            }


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
            //             // console.log(bTo)
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

            // .yogo_selector_anchor

            // const _anchor = selector.querySelector(".yogo_selector_anchor"); 

            // globHouse.style.top = `${selectorValue.pageY}px`;
            // globHouse.style.left = `${selectorValue.pageX}px`;
            // globHouse.style.width = `${selectorValue.width}px`;


           

        }
    
        const rippleInit = new ClickRipple();
        rippleInit.init(this.trigger);
    }

    // timepicker 위치 조정 업데이트 메소드
    updateTP(id, timeset) {
        // console.log(id, timeset)

        const Picker = document.querySelector(`${this.trigger}`);
        const PickerInput = Picker.querySelector("input[type='text']");
        const numberItem = Picker.querySelectorAll(".section ul li")

        const globHouse = document.querySelector(`.yogo_global_house .yogo_picker-dropdown[data-id="${Picker.id}"]`);
        const globLi = globHouse.querySelectorAll(".section ul li");


        function menuCheck( timeset) {
            const aliveValueHor = PickerInput.value.substr(0,2);
            const aliveValueMin = PickerInput.value.substr(3,2);
            const aliveValueSec = PickerInput.value.substr(6,2);
            const _sections = Picker.querySelectorAll(".section")

            const globHouse = document.querySelector(`.yogo_global_house .yogo_picker-dropdown[data-id="${Picker.id}"]`);
            const _newSections = globHouse.querySelectorAll(".section")

            const aliveValueArea = [aliveValueHor, aliveValueMin, aliveValueSec]
        

            Object.values(_newSections).map((ul, index)=> {
                
                Object.values(_newSections[index].children[0].children).map((li, index2)=> {
                    const checkValue = String(aliveValueArea[index]) === String(li.innerText) ? index2 : null;

                    if(checkValue == null) {
                        li.classList.remove("active");
                    }else {
                        const liLocationValue = li.offsetTop;

                        _newSections[index].scroll({
                            top : liLocationValue-100, 
                            behavior : "smooth"
                        });

                        li.classList.add("active")
                    }


                })

            })
        };



        // -----------

        // PickerInput.addEventListener("keyup", (e)=> {
            function parseTimeSet(value, mode) {
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
                        const parseTimeSet = value.replace(/(\d)(?=(?:\d{2})+(?!\d))/g, '$1:')
                        // menuCheck(e, parseTimeSet)
                        
                        return parseTimeSet;
                    }else {
                        return null
                    }
                }
                return value
            };

            const data =  parseTimeSet(timeset)
            PickerInput.value = data;
            menuCheck(data)

            

        // });


    
        
    }


    


}