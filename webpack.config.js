const path = require("path");
const glob = require("glob");

module.exports = {
    mode : "development",
    // entry : {
    //     index : path.join(__dirname, 'src', 'assets/script/index.ts'),
    //     test : path.join(__dirname, 'src', 'assets/script/test.ts')
    // },
    entry : glob.sync("./src/assets/script/*.ts").reduce((acc, path) => {
        // console.log(acc, path)
        let entry = path.replace('.ts', '')
        let entry2 = entry.replace('./src/assets/script/', '');
        acc[entry2] = path
        
        // console.log('after',acc[entry2])

        return acc
    }, {}),
    output : {
        filename : "[name].js",
        // filename : glob.sync("./src/assets/script/*.js"),
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