import "@babel/polyfill"
import { add, hello } from "./util";

// import "./assets/css/style.css";
// import "./assets/css/header.css"

import "./assets/style/scss/test.scss"
import logo from "./assets/images/img_noimage.png"


const text = hello("webpack");
const num = add(1, 5);

const img = `<img src="${logo}" alt="이미지 테스트" >`

document.getElementById("root").innerHTML = img+ text + num;