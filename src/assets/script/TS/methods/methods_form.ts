export class MethodsForm {
    constructor() {

    }

    radio(inputName: string, triggerNumber : number, changeId : string) {
        const groupName = document.querySelectorAll(`input[name="${inputName}"]`);
        const trigger = groupName[triggerNumber-1]; // css child기준 1부터 시작하므로 -1
        console.log(groupName)
        
        Object.keys(groupName).map((item, index)=> {
            const ele = groupName[item];

            ele.addEventListener("change", ()=> {
                console.log("change", trigger)
            })
        })
    };


}