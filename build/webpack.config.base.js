const path = require('path');

module.exports = {
	output: {
        path: path.join(__dirname, '../dist'),
        publicPath: '/public/'
	},
	resolve: {
		alias: {
			VIEW: path.resolve(__dirname, '../client/views/')
		},
		extensions: ['.js', '.jsx', '.json']
	},
	module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.(js|jsx)$/,
                loader: 'eslint-loader',
                exclude: [
                    path.join(__dirname, '../node_modules')
                ]
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                exclude: [
                    path.join(__dirname, '../node_modules')
                ]
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
