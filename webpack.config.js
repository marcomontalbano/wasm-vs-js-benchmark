const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require('path');

module.exports = {
    entry: './src-js/bootstrap.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bootstrap.js',
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
                test: /[js|rs]\.worker\.js$/,
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
