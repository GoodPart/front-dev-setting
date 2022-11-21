import { YogoUI } from "./TS/yogoUI";


var test2 = new YogoUI("#testpicker3", {
    type : "timepicker", // 사용할 타입 선언
    timeSet : "00:00:00", // 00:00:00 , 00:00
    tObPosition : 'top',
    // autoBlur : true
    
})
test2.init();