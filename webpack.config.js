var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: path.resolve(__dirname, 'app/lingo.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "lingo.js"
    },

    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loaders: ["react-hot", "babel-loader"]
        }, {
            test: /\.css$/, // Only .css files
            loader: 'style!css' // Run both loaders
}
    ]
}
};