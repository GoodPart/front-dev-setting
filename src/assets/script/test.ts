import { MethodsForm } from "./TS/methods/methods_form";


const radioSet = new MethodsForm().radio("radio-01", 1, {type : "name", value : "target"});
const radioSet1 = new MethodsForm().radio("radio-10", 0, {type : "name", value : "target2"});