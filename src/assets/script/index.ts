import { sayTs } from "./TS/sayTs";
import  {RollingValue} from "./TS/rolling-value";
import {CreateElement} from "./TS/createElement";

sayTs("say!!!!!!!!!!!");

 const test = new RollingValue(".cdd-change_value", {
    options : "test"
 })

test.init();

window.addEventListener("dblclick", ()=> {
    const randNumber = Math.floor(Math.random()*1000)
    const randNumber2 = Math.floor(Math.random()*100)
    const randNumber3 = Math.floor(Math.random()*10)
    const randNumber4 = Math.floor(Math.random()*10000)
    const randNumber5 = Math.floor(Math.random()*100)
    test.update("#pRoot-0", randNumber)

    test.update("#pRoot-1", randNumber2)
    test.update("#pRoot-2", randNumber3)
    test.update("#pRoot-3", randNumber4)
    test.update("#pRoot-4", randNumber5)
})

setInterval((_interval)=>{

    const randNumber = Math.floor(Math.random()*1000)
    const randNumber2 = Math.floor(Math.random()*100)
    const randNumber3 = Math.floor(Math.random()*10)
    const randNumber4 = Math.floor(Math.random()*10000)
    const randNumber5 = Math.floor(Math.random()*100)
    
    test.update("#pRoot-0", randNumber)

    test.update("#pRoot-1", randNumber2)
    test.update("#pRoot-2", randNumber3)
    test.update("#pRoot-3", randNumber4)
    test.update("#pRoot-4", randNumber5)
}, 1500)


const test2 = new CreateElement("div", {
    className : "test-class",
})

test2.init()