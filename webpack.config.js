const {resolve} = require('path');
const {HotModuleReplacementPlugin, LoaderOptionsPlugin, NoEmitOnErrorsPlugin} = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? null : 'eval-cheap-module-source-map' ,
    entry:[
        'react-hot-loader/patch',
        'webpack-hot-middleware/client',
        resolve(__dirname, 'client','src', 'index.js')
    ],
    output: {
        filename: '[name].bundle.js',
        path: resolve(__dirname, 'client', 'build'),
        publicPath: resolve(__dirname, 'client', 'build')
    },
    stats: {
        errorDetails: true,
        children: true
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:resolve(__dirname, 'client', 'public', 'index.html'),
            favicon:resolve(__dirname, 'client', 'public', 'bertIcon.png'),
            manifest:resolve(__dirname, 'client', 'public', 'manifest.json'),
            robots:resolve(__dirname, 'client', 'public', 'robots.txt')
        }),
        new HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                    loader: 'file-loader',
                    },
                ],
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
            test: /\.(jsx|js)$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: {
                presets: [
                    "@babel/preset-env", 
                    ["@babel/preset-react", {"runtime": "automatic"}] ]
            }}]
            }
        ]
    }
    }