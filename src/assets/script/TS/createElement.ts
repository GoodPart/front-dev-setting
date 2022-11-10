interface optionsConfig {
    id ? :string;
    name ? : string;
    className ? : string;
}
interface optionsFormConfig {
    id ? :string;
    className ? : string;
    type ? : string;
    name ? : string;
    readonly ? :boolean;
    disabled ? : boolean;
    datasets ? : any[];
    maxlength ? : string;
    placeholder ? : string;
}


interface createElementConfig {
    ele : string; // 엘리먼트(div, p ...)
    options : object;
}
interface createElementFormConfig {
    ele : string;
    options : object;
}

// form 클래스
class CreateEleMentForm implements createElementFormConfig{
    ele : string;
    options : optionsFormConfig;

    constructor(ele : string, options : object) {
        this.ele = ele;
        this.options = options
    }


    create() {
        const getEle = this.ele;

        const createEle = document.createElement(`${getEle}`);

        Object.keys(this.options).map((op, index)=> {
            if(op == 'id') {
                createEle.id =  this.options[op];
            }
            if(op == 'className') {
                createEle.className =  this.options[op];
            }
            if(op == 'type') {
                createEle.setAttribute("type", this.options[op])

                if(this.options[op] == 'radio') {
                    
                }else if(this.options[op] == 'checkbox') {

                }else if(this.options[op] == 'button') {
                    
                }
            }
            if(op == 'name') {
                createEle.setAttribute("name", this.options[op])
            }
            if(op == 'datasets') {
                const datasetsLength = this.options[op].length;

                for(let d = 0; d<datasetsLength; d++) {
                    createEle.setAttribute(`data-${this.options[op][d].name}`, this.options[op][d].value)
                }
            }
            if(op == 'placeholder') {
                createEle.setAttribute("placeholder", this.options[op])
            }
    
        })

        return createEle
        console.log(createEle)
    };

    insertDOM(action:string, location:any){
        const getEle = this.create();
        const _action = action;
        const _location = document.querySelector(location);
        if(_action == 'append') {
            _location.appendChild(getEle)
        }else {
            _location.prepend(getEle)
        }
    }


}

// div 클래스
class CreateElementDiv implements createElementConfig {
    ele : string;
    options : optionsConfig;
    
    constructor(ele:string, options : object) {
        this.ele = ele;
        this.options = options
    };

    crtHTML() {
        const getEle = this.ele;



        const createEle = document.createElement(`${getEle}`);
        
        if(getEle == "div" ) {
            console.log(getEle)

        }else {
            console.log(getEle)
        }
        // if(this.options) {

        //     Object.keys(this.options).map((op, index)=> {

        //         if(op == 'className') {
        //             createEle.className =  this.options[op];
        //         }
        //         if(op == 'id') {
        //             createEle.id =  this.options[op];
        //         }
        //         if(op == 'name') {
        //             createEle.setAttribute("name", this.options[op])
        //         }

        //     })
            
        // }
        
        return createEle
    }

    insertOptions(crtedEle, options) {

    }

    // init()  {
    //     // console.log(this.ele, this.options)
    //     this.crtHTML()
    // }
}

export {CreateElementDiv, CreateEleMentForm}