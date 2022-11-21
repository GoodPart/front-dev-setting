import { Timepicker } from "./timepicker";

export class YogoUI {

    trigger: string;
    options :any;

    moduleTypeList = [
        'timepicker',
        'multiselector',
        // 'ripple'
    ]
    
    constructor(trigger:string, options:object) {
        this.trigger = trigger;
        this.options = options;
        // console.log(this.options)
    };

    init() {
        const crtGolbalArea = document.createElement("div");
        crtGolbalArea.className = 'yogo_global_house';

        // const initAfterOptions = initOption;

        /* globalhouse 체크 */
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

            if(picker.tagName == 'INPUT') {
                const parent = picker.parentElement; // 상위 div

                parent.className = picker.className
                parent.id = picker.id;

                picker.remove(); // input 제거

                const crtPicker = new Timepicker();
                crtPicker.init({
                    name : this.trigger,
                    dataset : this.options.timeSet,
                    tObPosition : this.options.tObPosition,
                    autoBlur : this.options.autoBlur
                })

            }


            
            
        }
     
        // const rippleInit = new ClickRipple();
        // rippleInit.init(this.trigger);
    }
    


}