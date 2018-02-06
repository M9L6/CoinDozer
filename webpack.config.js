var webpack = require('webpack');
const path = require('path');

module.exports = {

    entry: {
        main : './js/control/app.js'
    },
    output: {
        path: path.resolve(__dirname,'build/js'),
        filename: '[name].bundle.js'
    },
    module: {},
    plugins:[
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings:false
            }
        })
    ]
};