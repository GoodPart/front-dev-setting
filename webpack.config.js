const path = require('path'); // 노드에서 제공하는 path모듈 활용
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry : {
        index : "./src/index.js",
        component1 : "./src/html/components/component1.js"
    },
    output : {
        filename : "[name].js",
        path : path.resolve(__dirname, "dist")
    },
    target : ['web', 'es5'],
    module : {
        rules : [
            {
                test : /\.s[ac]ss$/i,
                use : [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'], /* sass로 전처리, css로더로 파일읽고, mini로 link화 */
                exclude : /node_modules/
            },
            {
                test : /\.js%/,
                exclude : /node_modules/,
                use : {
                    loader : "babel-loader",
                    options : {
                        presets : [
                            ['@babel/preset-env', {
                                targets : {
                                    browsers : ['> 0.25% in KR']
                                }
                            }]
                        ]
                    }
                }
            },
            {
                test : /\.(png|svg|jpe?g|gif)$/,
                use : {
                    loader : "file-loader",
                    options : {
                        name : '[path][name].[ext]'
                    }
                }
            }
        ]
    },
    devtool : 'source-map',
    plugins : [
        new HtmlWebpackPlugin({
            template : "./index.html"
        }),
        new HtmlWebpackPlugin({
            title : "component1 title",
            filename : "component1.html",
            template : "./src/html/components/component1.html"
        }),
        // new HtmlWebpackPlugin({
        //     title : "component2 title",
        //     filename : "component2.html",
        //     template : "./src/html/components/component2.html"
        // }),
        new MiniCssExtractPlugin({
            filename : "common.css"
        }),
      
    ],
    devServer : {
        static : {
            directory : path.resolve(__dirname, "dist"),
            watch : true
        },
        hot:false, // 라이브리로드와 같이사용할 필요는 없음
        liveReload : true, // 라이브 리로드
        port : 9999
    }
}