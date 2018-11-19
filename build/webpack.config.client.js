const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const baseConfig = require('./webpack.config.base');
const webpackMerge = require('webpack-merge');

const isDev = process.env.NODE_ENV === 'development';

let config = webpackMerge(baseConfig, {
    entry: {
        app: path.join(__dirname, '../client/app.js')
    },

    output: {
        filename: '[name].[hash].js'
    },

    plugins: [
        new HTMLPlugin({
            template: path.join(__dirname, '../client/template.html')
		}),
		new HTMLPlugin({
			template: '!!ejs-compiled-loader!' + path.join(__dirname, '../client/server.template.ejs'),
			filename: 'server.ejs'
		})
    ]
});

if(isDev){
    config.devServer = {
        host: '0.0.0.0',
        port: '8888',
        contentBase: path.join(__dirname, '../dist'),
        hot: true,
        overlay: {
            errors: true
        },
        publicPath: '/public/',
        historyApiFallback: {
            index: '/public/index.html'
        },
        proxy: {
            '/api': 'http://localhost:3333'
        }
    };
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
}else{
	config.entry = {
		app: path.join(__dirname, '../client/app.js')
	};
	config.output.filename = '[name].[chunkhash].js';
	config.optimization = {
		runtimeChunk: {
			name: 'manifest'
		},
		minimize: true,
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendor',
					chunks: 'all'
				}
			}
		}
	};
	config.plugins.push(
		new webpack.HashedModuleIdsPlugin()
	);
}

module.exports = config;
