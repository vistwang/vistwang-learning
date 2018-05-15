//module.export 错误 ！！！！
/*module.export = {
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:/(node_modules|bower_components)/,
                use:{
                    loader:"babel-loader",
                    options: {
                        presets: ['@babel/preset-react']
                    }
                }
            }
        ]
    }
}*/

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react']
                    }
                }
            },
            {
                test:/\.css$/,
                use:[
                    {loader:'style-loader'},
                    {loader:'css-loader'}
                ]
            },
            {
                test:/\.scss$/,
                use:[
                    {loader:'style-loader'},
                    {loader:'css-loader'},
                    {loader:'sass-loader'}
                ]
            },
            {
                test:/\.(png|jpg|gif)$/,
                use:[
                    {
                        loader:"file-loader",
                        options:{}
                    }
                ]
            },
            {
                test:/\.(woff|svg|eot|ttf)\??.*$/,
                use:[
                    {
                        loader:"url-loader?limit=50000&name=[path][name].[ext]",
                        options:{}
                    }
                ]
            }
        ]
    }
}
