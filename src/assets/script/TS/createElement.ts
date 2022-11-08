interface optionsConfig {
    id ? :string;
    name ? : string;
    className ? : string; 
}

interface createElementConfig {
    ele : string; // 엘리먼트(div, p ...)
    options : object;
}

class CreateElement implements createElementConfig {
    ele : string;
    options : optionsConfig;
    
    constructor(ele:string, options : object) {
        this.ele = ele;
        this.options = options
    }

    crtHTML() {
        const getEle = this.ele;
        const createEle = document.createElement(`${getEle}`);
        
        if(this.options) {

            Object.keys(this.options).map((op, index)=> {
                console.log(op)

                if(op == 'className') {
                    createEle.className =  this.options[op];
                }
                if(op == 'id') {
                    createEle.id =  this.options[op];
                }
                if(op == 'name') {
                    createEle.setAttribute("name", this.options[op])
                }

            })
            // if(this.options.className) {
            //     createEle.className = this.options.className
            // }
        }else {

        }
        console.log(createEle)
        
        return createEle
    }

    insertOptions(crtedEle, options) {

    }

    init()  {
        // console.log(this.ele, this.options)
        this.crtHTML()
    }
}

export {CreateElement}