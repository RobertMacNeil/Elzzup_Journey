let path = require("path");
let CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    // includes common plugins like uglify if set to production (to minimize)
    mode: 'development',

    // source JS file (entry / output are called keys)
    entry: "./src/Game.ts",
    // output where bundled JS file will go (filename and path (made out of current directory/build))
    output: {
        filename: "build.js",
        path: path.join(__dirname, "build")
    },
    // when errors occur in browser, it shows the error in the TS and not in the transpiled bundle.js
    devtool: "source-map",
    // setup webpack-dev-server
    devServer: {
        contentBase: path.join(__dirname, "build"),
        writeToDisk: true,
        watchContentBase: true,
        port:5005
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        alias: {
            createjs: 'createjs/builds/1.0.0/createjs.min.js'
        }
    },
    // configuring webpack loaders
    module: {
        // array of rules on handling certain files when bundling
        rules: [
            {
                // babel is not needed when using typescript
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /node_modules[/\\]createjs/,
                // add createjs to the module system even though it does not support it (can import it)
                loaders: [
                    'imports-loader?this=>window',
                    'exports-loader?window.createjs'
                ]
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            // copy over json / png files in root of /lib to /build
            {from:'lib/', to:'lib/'},
            // include if you want index.html / styles.css in the root of project folder and copied to /build
            {from:'html/index.html', to:'index.html'},
            {from:'html/styles.css', to:'styles.css'}
        ]), 
    ]
};