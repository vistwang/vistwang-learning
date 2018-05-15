const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
	entry: {
		account: path.resolve(__dirname, 'src/containers/account/index.js'),
		login: path.resolve(__dirname, 'src/containers/login/index.js'),
		register: path.resolve(__dirname, 'src/containers/register/index.js'),
		// price: path.resolve(__dirname, 'src/containers/price/index.js'),
		payment: path.resolve(__dirname, 'src/containers/payment/index.js'),
		alipay: path.resolve(__dirname, 'src/containers/account/price/AlipayPage.js'),
		// active_account: path.resolve(__dirname, 'src/containers/active_account/index.js'),
		// bind_email: path.resolve(__dirname, 'src/containers/bind_email/index.js'),
		invite: path.resolve(__dirname, 'src/containers/invite/index.js'),
		vendor: ['react','react-dom'],
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'scripts/account/[name].[chunkhash:30].bundle.js',
		publicPath: '/',
		chunkFilename: 'scripts/account/chunks/bundle.[id].[chunkhash:30].chunk.js'
	},
	module: {
		rules: [{
			test: /\.js$/,
			loader: 'babel-loader',
			exclude: /node_modules/,
			// include: [
			// 	path.resolve(__dirname, 'src'),
			// 	path.resolve(__dirname, 'node_modules/react-geetest')
			// ]
		},{
			test: /\.(css|scss)$/,
			// loader: 'style-loader!css-loader!sass-loader'
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: ['css-loader', 'sass-loader']
			})
		},{
		// 	test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
		// 	loader: 'file-loader',
		// 	options: {
		// 		name: '[name].[ext]?[hash]',
		// 		outputPath: 'accets/font/'
		// 	}
		// },{
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
        filename: 'scripts/common.rc.dom.js',
        minChunks: Infinity,
        chunks:['account','login','register','price','payment','alipay']
    }),
		new ExtractTextPlugin({
			filename: 'accets/css/account/[name].[contenthash:30].css'
		}),
		new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
		new HtmlWebpackPlugin({
			template: 'src/views/account.tpl.html',
			filename: 'account/index.html',
			title: '账户中心 - M1云端市场部',
			chunks: ['vendor', 'account']
		}),
		new HtmlWebpackPlugin({
			template: 'src/views/login.tpl.html',
			filename: 'login.html',
			title: '登录 - M1云端市场部',
			chunks: ['vendor', 'login']
		}),
		new HtmlWebpackPlugin({
			template: 'src/views/register.tpl.html',
			filename: 'register.html',
			title: '注册 - M1云端市场部',
			chunks: ['vendor', 'register']
		}),
		// new HtmlWebpackPlugin({
		// 	template: 'src/views/price.tpl.html',
		// 	filename: 'price.html',
		// 	title: '版本价格 - M1云端市场部',
		// 	chunks: ['vendor', 'price']
		// }),
		new HtmlWebpackPlugin({
			template: 'src/views/alipay.tpl.html',
			filename: 'account/price/alipay.html',
			title: '支付宝支付成功 - M1云端市场部',
			chunks: ['vendor', 'alipay']
		}),
		new HtmlWebpackPlugin({
			template: 'src/views/payment.tpl.html',
			filename: 'payment.html',
			title: '付款状态 - M1云端市场部',
			chunks: ['vendor', 'payment']
		}),
		// new HtmlWebpackPlugin({
		// 	template: 'src/views/active_account.tpl.html',
		// 	filename: 'active_account.html',
		// 	title: '账户激活 - M1云端市场部',
		// 	chunks: ['active_account']
		// }),
		// new HtmlWebpackPlugin({
		// 	template: 'src/views/bind_email.tpl.html',
		// 	filename: 'bind_email.html',
		// 	title: '激活邮箱 - M1云端市场部',
		// 	chunks: ['bind_email']
		// }),
		// new HtmlWebpackPlugin({
		// 	template: 'src/views/terms.tpl.html',
		// 	filename: 'terms.html',
		// 	title: '服务协议 - M1云端市场部',
		// 	chunks: ['terms']
		// }),
		new HtmlWebpackPlugin({
			template: 'src/views/invite.tpl.html',
			filename: 'invite.html',
			title: '邀请子账户 - M1云端市场部',
			chunks: ['invite']
		}),
		// new HtmlWebpackPlugin({
		// 	template: 'src/views/404.tpl.html',
		// 	filename: '404.html',
		// 	title: '404 - 页面未找到 - M1云端市场部',
		// 	chunks: ['404']
		// }),
		// new HtmlWebpackPlugin({
		// 	template: 'src/views/browser_upgrade.tpl.html',
		// 	filename: 'browser_upgrade.html',
		// 	title: '浏览器升级 - M1云端市场部',
		// 	chunks: ['browser_upgrade']
		// })
	]
}