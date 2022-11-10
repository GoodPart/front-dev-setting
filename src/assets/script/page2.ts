import {CreateElementDiv, CreateEleMentForm} from "./TS/createElement";

const test2 = new CreateElementDiv("div", {
    className : "test-class",
    id : "test-id",
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

test1.insertDOM("append", "#root");