const path = require('path');

module.exports = {
    target: 'node',

    entry: {
        app: path.join(__dirname, '../client/serverEntry.js')
    },

    output: {
        filename: 'serverEntry.js',
        path: path.join(__dirname, '../dist'),
        publicPath: '/public/',
        libraryTarget: 'commonjs2'
    },

    module: {
        rules: [
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: [
                    path.join(__dirname, '../node_modules')
                ]
            },
        ]
    }
};