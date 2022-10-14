const path = require("path");

module.exports = {
    mode : "development",
    entry : {
        index : path.join(__dirname, 'src', 'assets/script/index.ts')
    },
    output : {
        filename : "[name].js",
        path : path.resolve("dev")
    },
    resolve: {
        modules : [path.join(__dirname, "src"), "node_modules"],
        extensions : [".ts", ".js"]
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
            },
            {
                test : /\.ts$/,
                exclude : /node_modules/,
                use : ['ts-loader']
            }
        ]
    },
    
    devtool : 'source-map',
}