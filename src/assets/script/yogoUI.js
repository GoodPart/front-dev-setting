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
            // const target = document.querySelector(name);

            const searchModule = name.querySelector(".yogo_search input");
            // console.log(searchModule)
            // const __optionsItemHeight = target.querySelector(".yogo_option ul li");

            // console.log(liHeight)

            searchModule.addEventListener("keyup", (e)=> {
                if(depthLength > 1) {
                    const optionsItem = name.querySelectorAll(".yogo_option ul li");
                    const optionItemValue = name.querySelectorAll(".yogo_option ul li div input + label span");
                    filterList(e.target.value, optionItemValue, optionsItem)

                }else {
                    const optionsItem = name.querySelectorAll(".yogo_option");
                    const optionItemValue = name.querySelectorAll(".yogo_option div input + label span");  
                    filterList(e.target.value, optionItemValue, optionsItem)

                }
                
            })

            function filterList (keyvalue, optionValue,optionsItem) {
                const _optionList = optionValue;
                const _optionItem = optionsItem

                for(let i = 0; i<_optionList.length; i++) {
                    if(_optionList[i].innerHTML.indexOf(keyvalue)>-1) {
                        // console.log("있음")
                        // _optionItem[i].style.display = "block"
                        _optionItem[i].style.height = `${liHeight}px`;
                        
                    }else {
                        // console.log("없음")
                        // _optionItem[i].style.display = "none"
                        _optionItem[i].style.height = "0";
                    }
                }
          
            }
        };

        // 랜덤 색상 RGB
        getRandomColor() {
            return `rgb( ${new Array(3).fill().map(v => Math.random() * 255).join(", ")} )`;
        }

        toggleChange(name, globHouse){
            const _target = document.querySelector(name);
            console.log(_target)

            // const valueArea = _target.querySelector(".yogo_value_area")
            const anchor = _target.querySelector(".yogo_selector_anchor");
            const listArea = globHouse;

            const ACTIVE = "active";

            function handleClick() {
                anchor.classList.toggle(ACTIVE);
                listArea.classList.toggle(ACTIVE)
            }

            // anchor.addEventListener("click", handleClick);

            window.addEventListener("click", (e)=> {
                if(e.target.closest(`#${_target.id} .yogo_value_area`) || e.target.closest(`.yogo_global_house div[data-id="${_target.id}"]`)) {
                    console.log(e.target.classList.contains("ico-btn_delete"));
                    
                    if(e.target.classList.contains("ico-btn_delete")) {
                        anchor.classList.remove(ACTIVE);
                        listArea.classList.remove(ACTIVE)
                    }else {
                        anchor.classList.add(ACTIVE);
                        listArea.classList.add(ACTIVE)

                    }
                }else {
                    console.log("false")
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

        // 체크된 리스트 노출.
        // showCheckedItem(target, options, showlist, depthLength, action, checkBoxListItemInputsLength) {
        //     const _target = target
        //     const _depth = depthLength;

        //     // console.log(options)

        //     function showValue (dataList, target) {
        //         const _target = target;
        //         const showArea = _target.querySelector(".yogo_value_area");
            
        //         const _dataList = dataList;

        //         // 리스트 초기화
        //         if(_depth > 1) {
        //         showArea.innerHTML = ''

        //             // _dataList.map((ele, index)=> {
        //             //     const crtEleSpan = document.createElement("span");
        //             //     const findIdValue = _target.querySelector(`.yogo_title input[id=${ele.rootId}] + label span`);


        //             //     console.log("text Ellipsis-->",textEllipsis)
        //             //     crtEleSpan.innerHTML = `
        //             //         ${findIdValue.innerHTML} - ${ele.value}
        //             //     `
        //             //     showArea.append(crtEleSpan)
        //             // })
        //         }else {
        //         showArea.innerHTML = ''

        //             _dataList.map((ele, index)=> {
        //                 const crtEleSpan = document.createElement("span");
        //                 const findIdValue = _target.querySelector(`.yogo_option input[id=${ele.id}] + label span`);


        //                 crtEleSpan.innerHTML = `
        //                     ${findIdValue.innerHTML}
        //                 `
        //                 showArea.append(crtEleSpan)
        //             })
        //         }

                
        //     }

        //     function listReducer (option, action, showlist, checkBoxListItemInputsLength) {
        //         const optionId = option.id;
        //         const optionValue = option.value;


        //         if(_depth > 1) {
                    
        //             if(action === 'PUSH') {
        //                 // showlist에 있는지 비교.
        //                 if(showlist == '') {
        //                     showlist.push(option)
        //                 }
                        
        //                 Object.values(showlist).map((showlistItem, index)=> {
        //                     if(showlistItem.id === optionId && showlistItem.value === optionValue) {
        //                         // console.log("중복인데", showlist[index])
        //                     }
        //                         showlist.push(option)
        //                         // 중복 리스트 제거
        //                         showlist = Array.from(new Set(showlist))
                            
                            
                            
        //                 })
        //             }
        //             if(action === 'PUSH_ALL') {
        //                 if(showlist == '') {
        //                     showlist.push(option)
        //                 }
        //                 const beforeListLength = showlist.length;

        //                 showlist.push(option)
                        


        //             }
        //             if(action === 'POP') {
        //                 console.log(option)
        //             }




        //         }else {
        //             if(showlist == '') {
        //                 showlist.push(option)
        //             }else {
        //                 if(action === 'PUSH') {
        //                     // showlist에 있는지 비교.
        //                     showlist.push(option)
        //                     // 중복 리스트 제거
        //                     showlist = Array.from(new Set(showlist))
                            
        //                 }
        //                 if(action === 'POP') {

        //                     if(showlist.indexOf(option)) {
        //                         showlist.splice(showlist.indexOf(option), 1)
        //                     }else {
        //                         // console.log("안대는데")
        //                     }

                            
        //                 }
        //             }
        //         }

        //         showValue(showlist, target)

                
        //     }
            



        //     listReducer(options, action, showlist, checkBoxListItemInputsLength);
        // }

        // value 영역 선택된 체크리스트 제거 버튼 클릭시
        deleteItem(name, globHouse) {
            const _target = document.querySelector(name);

            const deletes = _target.querySelectorAll(".ico-btn_delete");


            Object.values(deletes).map((ele, index)=> {
                ele.addEventListener("click", (e)=> {
                    const dataId = e.target.parentNode.parentNode.dataset.id;
                    
                    const checkedItem = globHouse.querySelector(`.yogo_option .${dataId}`) || globHouse.querySelector(`.yogo_show-item-value .${dataId}`);

                    checkedItem.click()
                })

            })
        }


        // 카테고리별 모두 체크 기능
        checkAllByCategory(name, depthLength, data, randomColor) {
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

                if(selectAll) {
                    // console.log(getAllCheckTarget)
                    // getAllCheckTarget.click()
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

                        
                        Object.values(checkBoxListItemInputs).map((ele, index)=> {
                            const checkBoxListItemInputs = checkBoxList.querySelectorAll("li div input[type='checkbox']");
                            const checkBoxListItemInputsChecked = checkBoxList.querySelectorAll("li div input[type='checkbox']:checked");


                            const showListChange = target.querySelector(`.yogo_show-item-value.${ele.id}`);

                            if(e.target.checked) {
                                showListChange.classList.add("active")
                                getCategoryCount.querySelector(".checked-item").innerHTML = checkBoxListItemInputs.length;
                                getCategoryCount.querySelector(".checked-item").classList.add("bounce")
                                
                                setTimeout(()=> {
                                    getCategoryCount.querySelector(".checked-item").classList.remove("bounce")

                                }, 200)
                                
                                
                                if(ele.checked) {
                                    // console.log(ele,`의 상태는 ${ele.checked}입니다.`, checkedItemState)
                                }

                                if(this.textEllipsis) {
                                    const placeholderCheck = listarea.querySelectorAll(".active").length > this.textEllipsis.length ? true : false;

                                    if(placeholderCheck) {
                                        // 3개 초과시
                                        console.log('active 갯수',listarea.querySelectorAll(".active").length)
                                        Object.values(listarea.querySelectorAll(".active")).map((ele, index)=> {

                                            if(index>=this.textEllipsis.length) {
                                                ele.style.display = 'none';
                                            }else {
                                                ele.style.display = 'inline-block';
                                            }
                                        })
                                    }else {
                                        console.log('active 갯수',listarea.querySelectorAll(".active").length)
                                        Object.values(listarea.querySelectorAll(".active")).map((ele, index)=> {
                                            // console.log(ele)


                                            if(index>=this.textEllipsis.length) {
                                                ele.style.display = 'none';
                                            }else {
                                                ele.style.display = 'inline-block';
                                            }
                                        })
                                    }
                                }

                            }else {
                                const showListChange = target.querySelector(`.yogo_show-item-value.${ele.id}`);
                                showListChange.classList.remove("active")

                                getCategoryCount.querySelector(".checked-item").innerHTML = 0 
                                getCategoryCount.querySelector(".checked-item").classList.add("bounce")
                                setTimeout(()=> {
                                    getCategoryCount.querySelector(".checked-item").classList.remove("bounce")

                                }, 200)

                                if(this.textEllipsis) {
                                showListChange.style.display = 'none'

                                    const placeholderCheck = listarea.querySelectorAll(".active").length > this.textEllipsis.length ? true : false;

                                    if(placeholderCheck) {
                                        // 3개 초과시
                                        console.log('active 갯수',listarea.querySelectorAll(".active").length)

                                        Object.values(listarea.querySelectorAll(".active")).map((ele, index)=> {

                                            ele.style.display = 'inline-block';
                                            if(index >=this.textEllipsis.length) {
                                                ele.style.display = 'none';
                                            }
                                        })
                                    }else {
                                        console.log('active 갯수',listarea.querySelectorAll(".active").length)

                                        Object.values(listarea.querySelectorAll(".active")).map((ele, index)=> {
                                            if(index>=this.textEllipsis.length) {
                                                ele.style.display = 'none';
                                            }else {
                                                ele.style.display = 'inline-block';
                                            }
                                        })
                                    }
                                }

                            }

                            ele.checked = e.target.checked

                        });
                        this.togglePlaceholder(this.name, listarea)


                    });


                    // 모든 checkbox 영역 변경시 체크하기.
                    Object.values(checkBoxListItemInputs).map((ele, index)=> {

                        ele.addEventListener("change", (e)=> {
                            allCheck(getAllCheckTarget, checkBoxList);

                            const showListChange = target.querySelector(`.yogo_show-item-value.${ele.id}`);
                            const checkBoxListItemInputsChecked = checkBoxList.querySelectorAll("li div input[type='checkbox']:checked");




                            if(ele.checked) {

                                showListChange.classList.add("active")
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
                                        console.log('active 갯수',listarea.querySelectorAll(".active").length, ellipsisCount)

                                        Object.values(listarea.querySelectorAll(".active")).map((ele, index)=> {
                                            // console.log(ele)

                                            if(index>=this.textEllipsis.length) {
                                                ele.style.display = 'none';
                                            }else {
                                                ele.style.display = 'inline-block';
                                            }
                                        })

                                        ellipsisCount.style.display = 'inline-block'
                                        ellipsisCount.innerHTML = `and ${listarea.querySelectorAll(".active").length - this.textEllipsis.length} more`;

                                    }else {
                                        console.log('active 갯수',listarea.querySelectorAll(".active").length)

                                        Object.values(listarea.querySelectorAll(".active")).map((ele, index)=> {
                                            // console.log(ele)

                                            if(index>=this.textEllipsis.length) {
                                                ele.style.display = 'none';
                                            }else {
                                                ele.style.display = 'inline-block';
                                            }
                                        })
                                        ellipsisCount.style.display = 'none'
                                    
                                    ellipsisCount.innerHTML = `and ${listarea.querySelectorAll(".active").length - this.textEllipsis.length} more`
                                    ellipsisCount.parentNode.appendChild(ellipsisCount)


                                    }

                                    
                                }
                                
                            }else {
                                // showListChange.style.display = 'none';
                                showListChange.classList.remove("active")

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
                                        console.log('active 갯수',listarea.querySelectorAll(".active").length)

                                        Object.values(listarea.querySelectorAll(".active")).map((ele, index)=> {

                                            ele.style.display = 'inline-block';
                                            if(index >=this.textEllipsis.length) {
                                                ele.style.display = 'none';
                                            }
                                        })
                                        ellipsisCount.style.display = 'inline-block'

                                        ellipsisCount.innerHTML = `and ${listarea.querySelectorAll(".active").length - this.textEllipsis.length} more`

                                    }else {
                                        console.log('active 갯수',listarea.querySelectorAll(".active").length)

                                        Object.values(listarea.querySelectorAll(".active")).map((ele, index)=> {
                                            if(index>=this.textEllipsis.length) {
                                                ele.style.display = 'none';
                                            }else {
                                                ele.style.display = 'inline-block';
                                            }
                                        })
                                    }
                                    ellipsisCount.style.display = 'none'

                                    ellipsisCount.innerHTML = `and ${listarea.querySelectorAll(".active").length - this.textEllipsis.length} more`
                                }

                            }
                            this.togglePlaceholder(this.name, listarea)
                            

                        })

                        allCheck(getAllCheckTarget, checkBoxList);
                        this.togglePlaceholder(this.name, listarea)

                        
                    })





                }
                else {
                    const checkBoxListItem = ele.querySelector("div input")
                    const listarea = target.querySelector(".yogo_value_area .yogo_value_wrap");

                  
                    const crtEleSpan = document.createElement("span");
                    crtEleSpan.className = `yogo_show-item-value yogo_depth-${_name}-${index}`;
                    crtEleSpan.setAttribute("data-id", `yogo_depth-${_name}-${index}`);
                    ele.checked ? crtEleSpan.classList.add("active") : crtEleSpan.classList.remove("active")
                       
                    crtEleSpan.innerHTML = `
                    <span class='yogo_item_value'>${data[index]} <i class="ico ico-btn_delete"></i></span> 
                    `
                    listarea.append(crtEleSpan)
                    this.togglePlaceholder(this.name, listarea)


                    checkBoxListItem.addEventListener("change", (e)=> {
                        const showListChange = target.querySelector(`.yogo_show-item-value.${ele.querySelector("input").id}`);

                        if(ele.querySelector("input").checked) {
                            showListChange.classList.add("active")

                        }else {
                            showListChange.classList.remove("active")

                        }

                        this.togglePlaceholder(this.name, listarea)

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
            yogo_addon.className = 'yogo_addon'

                 const _allCheckControler = `
                    <button type='button' name='yogo_allCheck'>Select All</button> <button type='button' name='yogo_clearCheck'>Deselect All</button>
                `
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
        createUseEle(name, depthLength, data, allCheckControler, search, mode, randomColor) {
            const target = document.querySelector(name);

            const _name = name.split('#')[1];

            const crtSelectorWrap = document.createElement("div");
            crtSelectorWrap.className = "yogo_selector_wrap";

            const crtSelectorValue = document.createElement("div");
            crtSelectorValue.className = "yogo_value_area";

            const crtDiv = document.createElement("div");
            crtDiv.className = 'yogo_value_wrap'

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
                                <span class='index_color' style='background-color:${randomColor()}'></span>
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

                        const crtInputLabel_depth_2 = `
                        <input type='checkbox' id='yogo_depth-${_name}-${i}-${j}' ${data[i].depth_1[j].checked ? 'checked' : ''} class='yogo_depth-${_name}-${i}-${j}'><label for='yogo_depth-${_name}-${i}-${j}'><span>${data[i].depth_1[j].value}</span></label>
                        `

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
                // crtSelectorWrap.appendChild(crtOptionList);
                globHouse.append(crtOptionList)
            };


            if(depthLength <=1) {
                for(let i = 0; i<data.length; i++) {
                    const crtOptionItem = document.createElement("div");
                    crtOptionItem.className = `yogo_option yogo_option--${i}`;

                    const crtDepth_1_Title = document.createElement("div");

                    const crtInputLabel_depth_1 = `
                        <input type='checkbox' id='yogo_depth-${_name}-${i}' class='yogo_depth-${_name}-${i}'><label for='yogo_depth-${_name}-${i}'><span>${data[i]}</span></label>
                    `

                    // yogo_title 추가
                    crtDepth_1_Title.innerHTML=crtInputLabel_depth_1;

                    crtOptionItem.appendChild(crtDepth_1_Title)


                    crtOptionContent.appendChild(crtOptionItem)
                    
                    // yogo_options 만들기 완료
                    crtOptionList.appendChild(crtOptionContent)
                }; // for 완료

                globHouse.append(crtOptionList)
            }
            

            // crtSelectorWrap
            // crtSelectorWrap.appendChild(crtOptionList);

            
            crtSelectorWrap.prepend(crtSelectorValue)

            // console.log(target)
            const result = target.appendChild(crtSelectorWrap);

            
            return result


        };

        // 진입
        init({name ,search, depthLength, textEllipsis,allCheckControler, data, mode}) {

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
                    console.log("요기니??", textEllipsis)
                    this.textEllipsis = false;
                }else {
                    this.textEllipsis = textEllipsis
                }
                if(allCheckControler === undefined || allCheckControler === '') {
                    this.allCheckControler = false
                }else {
                    this.allCheckControler = allCheckControler;
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

                // console.log('this --->',this.name,this.search,this.depthLength,this.allCheckControler, this.data)   

                // console.log('text Ellipsis',this.textEllipsis)

                

                

                // 모든 조건문 만족시 진행
                if(true) {
                    
                    // element 생성
                    this.createUseEle(this.name, this.depthLength, this.data, this.allCheckControler, this.search, this.mode, this.getRandomColor);


                    const _name = name.substr(1);
                    const globHouse = document.querySelector(`.yogo_global_house .yogo_options[data-id="${_name}"]`);
                    this.toggleChange(this.name, globHouse)

                    // 각 카테고리 별 모든 체크 
                    this.checkAllByCategory(this.name, this.depthLength, this.data);

                    if(this.allCheckControler) {
                        this.checkAllByCenterControl(this.name, this.depthLength);
                    }
                    
                    if(this.search) {
                        // const _target = document.querySelector(name);
                        // const _name = name.substr(1);
                        // const globHouse = document.querySelector(`.yogo_global_house .yogo_options[data-id="${_name}"]`);

                        if(this.depthLength > 1) {
                            const liHeight = globHouse.querySelector(".yogo_options .yogo_option ul li").offsetHeight;

                            this.createSearchControl(globHouse,this.depthLength, liHeight)
                            this.deleteItem(this.name, globHouse)
                        }else {
                            const liHeight = globHouse.querySelector(".yogo_options .yogo_option div").offsetHeight;

                            this.createSearchControl(globHouse,this.depthLength, liHeight)
                            this.deleteItem(this.name, globHouse)
                            
                        }
                        
                    }

                    // this.scanCheckAction(this.name)

                }

        };

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
        const crtGolbalArea = document.createElement("div");
        crtGolbalArea.className = 'yogo_global_house';

        function crtGlobCheck(){
            const body = document.querySelector("body");
            const globArea = document.querySelector(".yogo_global_house")

            if(body.querySelector(".yogo_global_house")) {
                // console.log("있음")
                return false
            }else {
                // console.log("없음")
                return true
            }
        };

        if(crtGlobCheck()) {
            document.querySelector("body").append(crtGolbalArea)
        }else {
            // console.log("done")
        };
        
        if(this.options.type =='timepicker') {
            const picker = document.querySelector(`${this.trigger}`);
            const parent = picker.parentElement;

            parent.className = picker.className
            parent.id = picker.id

            picker.remove(); // input 제거

            const crtPicker = new Timepicker();
            crtPicker.init({
                name : this.trigger,
                dataset : this.options.timeSet,
            })
            // HTML 생성됨.
            const Picker = document.querySelector(`${this.trigger}`);
            const PickerInput = Picker.querySelector("input[type='text']");
            const numberItem = Picker.querySelectorAll(".section ul li")

            const globHouse = document.querySelector(`.yogo_global_house .yogo_picker-dropdown[data-id="${Picker.id}"]`);
            const globLi = globHouse.querySelectorAll(".section ul li");

            const pickerValue = {
                pageX : Picker.offsetLeft,
                pageY : Picker.offsetTop + Picker.offsetHeight + 8, //8 = 사이 넓이 값
            }
            globHouse.style.top = `${pickerValue.pageY}px`;
            globHouse.style.left = `${pickerValue.pageX}px`; 



            Object.values(globLi).map((ele, index)=> {
                ele.addEventListener("click", (e)=> {
                    console.log(ele.parentNode,e.target)
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

            // console.log(PickerInput)
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
        }
        if(this.options.type == 'multiselector') {
            const selector = document.querySelector(`${this.trigger}`);


            const crtHTML = new Selector();
            crtHTML.init({
                name : this.trigger,
                search : this.options.search,
                depthLength : this.options.depthLength,
                textEllipsis : this.options.textEllipsis,
                allCheckControler : this.options.allCheckControler,
                data : this.options.data,
                mode : this.options.mode

            });
            const globHouse = document.querySelector(`.yogo_global_house .yogo_options[data-id="${selector.id}"]`);


            const selectorValue = {
                pageX : selector.offsetLeft,
                pageY : selector.offsetTop + selector.offsetHeight + 4, //8 = 사이 넓이 값
                width : selector.offsetWidth,
            }


            globHouse.style.top = `${selectorValue.pageY}px`;
            globHouse.style.left = `${selectorValue.pageX}px`;
            globHouse.style.width = `${selectorValue.width}px`;


        }
    }
    


}