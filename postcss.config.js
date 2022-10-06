module.exports = {
    parser : "postcss-scss", /* sass의 주석을 그대로 보존하기 위해  */
    plugins : [
        require("postcss-flexbugs-fixes"), /* flex 관련 이슈 해결 */
        require("postcss-preset-env"),
        require("autoprefixer")
    ]
};