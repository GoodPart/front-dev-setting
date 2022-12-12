export class RollingValue {
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
        // ie 11 이하에선 values를 지원하지 않음.
        // Object.values(ele).map((target:any, index:number)=> {
        //     const tTxt = target.innerText;
        //     const tLength = tTxt.length;

        //     getObj = [
        //         ...getObj,
        //         {
        //             txt : tTxt,
        //             length : tLength
        //         }
        //     ]

        // })

        Object.keys(ele).map((target:any, index:number)=> {
            const tTxt = ele[target].innerText;
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

    crtHTML(name:string) {
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
            targets[index].appendChild(crtV)

        });
    };

    addOrRemove(name:any, value:number) {
        const getLength = name.querySelectorAll("li")
        const inboundNumber = value;

        const loopCount = Math.abs(this.getNumb(inboundNumber).length - getLength.length);
        // console.log(loopCount)

        let valueStorage = [];
        if(this.getNumb(inboundNumber).length > getLength.length) {
            // console.log("들어온 자리수가 많다", this.getNumb(inboundNumber).length, getLength.length, '---->',inboundNumber)
            // addRail
            
            for(let i = 0; i<loopCount; i++) {
                this.addRail(name)
            }
        }else {
            if(this.getNumb(inboundNumber).length < getLength.length) {
                // console.log("기존 자리수가 많다", this.getNumb(inboundNumber).length, getLength.length)
                for(let i = 0; i<loopCount; i++) {
                    this.removeRail(name)
                }
                // removeRail
            }else {
                // console.log("같다", this.getNumb(inboundNumber).length, getLength.length)
                // rolling
            }
        }

    };

    addRail(name:any) {
        const selectUl = name.querySelector("ul")
        const crtLi = document.createElement("li");
        const test = `
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

        crtLi.innerHTML = test;
        crtLi.className=`pacinco-item pacinco-item-${selectUl.childElementCount}`
        selectUl.appendChild(crtLi)
    };
    removeRail(name:any) {
        const selectUl = name.querySelector("ul")
        const liLength = selectUl.childElementCount;
        // console.log('여기',selectUl.querySelectorAll("li")[liLength-1])

        // ie에서 remove()를 사용할 수 없음(jquery)
        // selectUl.querySelector("li:last-child").remove();
        selectUl.removeChild(selectUl.querySelectorAll("li")[liLength-1])
    };

    rolling(name:any, value:number) {
        const _id = document.querySelector(name);
        const _li = _id.querySelectorAll("li");
        
        _id.querySelector(".v").innerHTML = value;
        
        for(let liC = 0; liC<_li.length; liC++) {
            setTimeout(()=> {
                _li[liC].style.transform = `translateY(-${this.getNumb(value)[liC]}0%)`;
                _li[liC].dataset.number = this.getNumb(value)[liC];
            }, 250 * liC)
        }
    };

    calcCount(name:any, aV:number) {
        const _id = document.querySelector(name);
        const _count:any = document.querySelector(`${name} + .cdd-change_count`);
        
        const beforeCv = Number(_id.querySelector(".v").innerText);

        if(beforeCv === aV) {
            // 값이 같다면
            // console.log(beforeCv, aV, beforeCv == aV)
            _count.querySelector(".cv").innerText =  0
            _count.querySelector(".value_arrow").className = "value_arrow keep"
        }else {
            if(beforeCv < aV) {
                // 새로운 값이 더 크다면
            _count.querySelector(".cv").innerText =  Math.abs(beforeCv - aV)
            _count.querySelector(".value_arrow").className = "value_arrow increase"

            }else {
                // 기존 값이 더 크다면
                _count.querySelector(".cv").innerText =  Math.abs(beforeCv - aV);
                _count.querySelector(".value_arrow").className = "value_arrow decrease"


            }
        }
        // console.log('before',beforeCv,'after', aV,'=', Math.abs(beforeCv - aV))

    };

    update(id:string, number:number) {

        const target = document.querySelector(id);
        
        this.addOrRemove(target, number);
        this.calcCount(id, number);
        this.rolling(id, number)

    };

    init() {
        this.crtHTML(this.name);
        console.log("init!!")
    }
}