const doListing =  (parent, count:number, childNode, options ) => {
        
    const {id, className, dataset} = options;

    for(let i = 0; i<count; i++) {
        const crtChildNode = document.createElement(childNode);

        if(options !== '' || options !== undefined || options !== null) {
            Object.keys(options).map((op, index)=> {

                if(op == 'className') {
                    crtChildNode.className =  options[op];
                }
                if(op == 'id') {
                    crtChildNode.id =  options[op];
                }
            })
        }

        if(i<= count) {
             parent.appendChild(crtChildNode)
        }

    };
};

class DoListing {

    constructor() {
        
    }
    test() {
        console.log('test')
    }
}

export {doListing, DoListing}