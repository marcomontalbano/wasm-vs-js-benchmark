const path = require('path');
module.exports = {
    entry: './public/bootstrap.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bootstrap.js',
    },
    mode: 'development',
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        port: 1234
    }
};
