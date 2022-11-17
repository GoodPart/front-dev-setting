export class MethodsForm {
    constructor() {

    }

    radio(inputName: string, triggerNumber : number, changeId : string) {
        const groupName = document.querySelectorAll(`input[name="${inputName}"]`);
        const trigger = groupName[triggerNumber]; // css child기준 1부터 시작하므로 -1
        const target = document.querySelector(`*[name="${changeId}"]`);
        // console.log(target)
        
        Object.keys(groupName).map((item, index)=> {
            const ele = groupName[item];

            ele.addEventListener("change", ()=> {

                if(ele.id === trigger.id) {
                    // check
                    console.log("check", target);

                }else {
                    console.log("none", ele.id , trigger.id)
                }
                

            })
        })
    };


}