import {CreateElementDiv, CreateEleMentForm} from "./TS/createElement";
import { doListing, DoListing } from "./TS/doFunction";

const test2 = new CreateElementDiv("div", {
    className : "test-class",
    id : "test-id",
    // htmlTemplate : `
    //     <div class='test'>test HTML template<div>
    // `
})
const test1 = new CreateEleMentForm("input", {
    className : "test-class2",
    // id : "test-id2",
    type : "radio",
    name : "radio-input",
    checked : false,
    datasets : [
        {
            name : 'test',
            value : 123
        },
        {
            name : 'test2',
            value : 'asd'
        },
    ],
    // placeholder : 'test placeholder.'
})

const testTemp = `
    <div class='test'>test HTML template<div>
`;

console.log(test2)

const crtedUl = document.createElement("ul");

doListing(crtedUl, 3, "li", {
    className : "testClass"
})

//     console.log(crtedUl)

// test1.insertDOM("append", "#root");