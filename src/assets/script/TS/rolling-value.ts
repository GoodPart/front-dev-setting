class RollingValue {
    name : string;
    options : any;
    storage : any;

    constructor( name : string, options : any ) {
        this.name = name;
                this.options = options;
                this.storage = [];
    };

    getNumberLength(ele:any) {
        let getObj = [];
        Object.values(ele).map((target:any, index:number)=> {
            const tTxt = target.innerText;
            const tLength = tTxt.length;

            getObj = [
                ...getObj,
                {
                    txt : tTxt,
                    length : tLength
                }
            ]

        })


        return getObj
    };


    getNumb(num:number) {
        let data:any = String(num);

        return [...data]
    };

    crtHTML(name:string, number:number) {
        const targets:any = document.querySelectorAll(name);
        const getNL = this.getNumberLength(targets);

        // ul 만들기
        getNL.map((NL, index) => {
            targets[index].id = `pRoot-${index}`
            const crtUl = document.createElement("ul")

            // 초기 li 삽입
            for(let a = 0; a<NL.length; a++) {
                const crtLi = document.createElement("li");
                const liTemp = `
                    <span>0</span>
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                    <span>6</span>
                    <span>7</span>
                    <span>8</span>
                    <span>9</span>
                `;
                crtLi.innerHTML = liTemp;
                crtLi.className=`pacinco-item pacinco-item-${a}`;
                crtLi.dataset.number = '0';
                if(a <= NL.length) {
                    crtUl.appendChild(crtLi)
                }
            };

            //기존 값 초기화
            targets[index].innerText = '';
            //ul에 index에 맞는 클래스 생성
            crtUl.className=`pacinco-list pacinco-list-${index}`;
            // ul html 작성
            targets[index].appendChild(crtUl);

            const crtV = document.createElement("div");
            crtV.className = 'v sr-only'
            targets[index].prepend(crtV)

        });
    };
}