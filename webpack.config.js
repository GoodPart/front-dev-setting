const path = require("path");

module.exports = {
    mode : "development",
    entry : {
        index : path.join(__dirname, 'src', 'assets/script/index.js')
    },
    output : {
        filename : "[name].js",
        path : path.resolve(__dirname, "dev")
    },
    module : {
        rules : [
            {
                test : /\.js$/,
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
            }
        ]
    },
    devtool : 'source-map',
}