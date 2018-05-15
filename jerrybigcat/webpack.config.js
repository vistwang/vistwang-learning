const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
	entry: {
		campaign: ['babel-polyfill', path.resolve(__dirname, './src/containers/campaign/index.js')],
		setting: ['babel-polyfill', path.resolve(__dirname, './src/containers/setting/index.js')],
		common: ['react','react-dom', 'redux','react-router'],
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		publicPath:'/',
		filename: 'scripts/campaign/[name].[chunkhash:8].js',
		chunkFilename: 'scripts/campaign/chunks/bundle.[id].[chunkhash:8].chunk.js'
	},
	module: {
		rules: [{
			test: /\.js$/,
			loader:'babel-loader',
			exclude: /node_modules/
		},{
			test: /\.(css|scss)$/,
			// loader: 'style-loader!css-loader!sass-loader'
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: ['css-loader', 'sass-loader']
			})
		},{
			test: /\.(png|jpg|jpeg|gif|svg)$/,
			loader: 'url-loader',
			options: {
				name: '[name].[ext]?[hash]',
				limit: 8192,
				outputPath: 'accets/images/'
			}
		}]
	},
	devServer: {
		historyApiFallback: true
	},
	plugins: [
		// new HtmlWebpackPlugin({
		// 	template: 'src/index.tpl.html',
		// 	filename: 'index.html',
		// 	chunks:['vendor','index'],
		// 	title: 'campaign',
		// 	showError: true
		// }),
		new HtmlWebpackPlugin({
			template: 'src/views/campaign.tpl.html',
			filename:'campaign/index.html',
			chunks: ['common', 'campaign'],
			title: 'compaign',
			showError: true
		}),
		new HtmlWebpackPlugin({
			template: 'src/views/setting.tpl.html',
			filename:'setting/index.html',
			chunks: ['common','setting'],
			title: 'setting',
			showError: true
		}),
		new webpack.optimize.CommonsChunkPlugin({
      names: ['common'],
      minChunks: Infinity,
      filename: 'scripts/common.rc.dom.rx.ro.js',
      chunks: ['campaign', 'setting']
    }),
		new ExtractTextPlugin({
			filename: 'accets/css/campaign/[name].[contenthash:30].css'
		}),
		new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
	]
}