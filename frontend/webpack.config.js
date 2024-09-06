const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");


module.exports = {
    entry: './src/app.js',
    mode: 'development',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist'),
        //publicPath: '/'
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9002,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.scss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },
        ],
    },
     plugins: [
         new HtmlWebpackPlugin({
             template: "./index.html",
         }),
         new CopyPlugin({
             patterns: [
                 { from: "./src/templates", to: "templates" },
                 { from: "./src/images", to: "images" },
                 { from: "./node_modules/bootstrap/dist/css/bootstrap.css", to: "styles" },
                 { from: "./node_modules/bootstrap/dist/js/bootstrap.js", to: "scripts" },
                 // { from: "./node_modules/bootstrap/dist/js/bootstrap.bundle.js", to: "scripts" },
                 { from: "./node_modules/@popperjs/core/dist/umd/popper.js", to: "scripts" },
                 { from: "./node_modules/font-awesome/fonts", to: "fonts" },
                 // { from: "./node_modules/font-awesome/css/font-awesome.css", to: "styles" },
                 { from: "./node_modules/font-awesome/css/font-awesome.min.css", to: "styles" },
                 { from: "./node_modules/font-awesome/scss/_icons.scss", to: "styles" },

                 // { from: "./node_modules/font-awesome/scss/font-awesome.scss", to: "styles" },

             ],
         }),
     ],
};