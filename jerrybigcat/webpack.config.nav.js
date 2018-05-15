const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
	entry: {
		nav: path.resolve(__dirname, 'src/containers/navigator/index.js'),
		vendor: ['react','react-dom'],
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'scripts/nav/[name].bundle.js',
		publicPath: '/',
	},
	module: {
		rules: [{
			test: /\.js$/,
			loader: 'babel-loader',
			exclude: /node_modules/,
		},{
			test: /\.(css|scss)$/,
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
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor'],
        filename: 'scripts/common.rc.dom.min.js',
        minChunks: Infinity,
        chunks:['nav']
    }),
		new ExtractTextPlugin({
			filename: 'accets/css/nav/[name].css'
		}),
		new HtmlWebpackPlugin({
			template: 'src/views/navigator.tpl.html',
			filename: 'nav/index.html',
			title: '导航',
			chunks: ['vendor', 'nav']
		}),
		new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
	]
}