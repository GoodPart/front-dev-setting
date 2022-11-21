interface optionsConfig {
    type : string,
    value : string,
    activeClass ? : string
}

export class MethodsForm {
    constructor() {
        
    }

    initState(_trigger:any,_target:any) {
        if(_trigger.checked) {
            _target.setAttribute("disabled", "true")
        }else {
            _target.removeAttribute("disabled")
        }
    };

    radio(inputName: string, triggerNumber : number,  options:optionsConfig) {
        const groupName = document.querySelectorAll(`input[name="${inputName}"]`);
        const trigger = groupName[triggerNumber];
        // const target = document.querySelector(`*[name="${options.value}"]`);
        const target = document.querySelector(`*[${options.type}="${options.value}"]`)
        // console.log(target)

        
        Object.keys(groupName).map((item, index)=> {
            const ele = groupName[item];

            this.initState(trigger, target);

            ele.addEventListener("change", ()=> {

                if(ele.id === trigger.id) {
                    // check
                    target.setAttribute("disabled","true")
                }else {
                    target.removeAttribute("disabled")
                }
                

            })
        })
    };


}