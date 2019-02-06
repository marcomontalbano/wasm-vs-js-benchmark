const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require('path');

module.exports = {
    entry: './public/bootstrap.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bootstrap.js',
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'public')
    },
    plugins: [
        new CopyWebpackPlugin([
            './public/index.html',
            './public/favicon.ico',
        ])
    ],
    module: {
        rules: [
            {
                test: /worker\.js$/,
                use: {
                    loader: 'worker-loader',
                    options: {
                        name: 'js/worker.[hash].js'
                    }
                }
            },
            {
                test: /\.wasm$/,
                type: 'javascript/auto', /** this disabled webpacks default handling of wasm */
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'wasm/[name].[hash].[ext]',
                            publicPath: '../'
                        }
                    }
                ]
            }
        ]
    }
};
