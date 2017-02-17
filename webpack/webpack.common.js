var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
	entry: {
		'polyfills': helpers.root('app') + '/polyfills.ts',
		'vendor': helpers.root('app') + '/vendor.ts',
		'app': helpers.root('app') + '/app.ts',
		'css': helpers.root('app') + '/app.css'
	},

	resolve: {
		extensions: ['.ts', '.js']
	},

	module: {
		rules: [
			{
				test: /\.(html|php)$/,
				loader: 'html-loader'
			},
			{
				test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
				loader: 'file-loader?name=/assets/[name].[hash].[ext]'
			},
			{
				test: /\.css$/,
				exclude: helpers.root('src', 'app'),
				loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader?sourceMap' })
			},
			{
				test: /\.css$/,
				include: helpers.root('src', 'app'),
				loader: 'raw-loader'
			},
			{
				test: /\.ts$/,
				loaders: ['awesome-typescript-loader']
			}
		]
	},

	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: ['app', 'vendor', 'polyfills']
		}),

		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery"
		}),

		new HtmlWebpackPlugin({
			inject: 'head',
			filename: helpers.root('public_html') + '/index.php',
			template: helpers.root('webpack') + '/index.php'
		})
	]
};
