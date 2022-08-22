const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index:path.resolve(__dirname, 'client','src', 'index.js'),
        index:path.resolve(__dirname, 'client','src', 'index.js')
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'client', 'build'),
        publicPath: path.resolve(__dirname, 'client', 'build')
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname, 'client', 'public', 'index.html'),
            favicon:path.resolve(__dirname, 'client', 'public', 'bertIcon.png'),
            manifest:path.resolve(__dirname, 'client', 'public', 'manifest.json'),
            robots:path.resolve(__dirname, 'client', 'public', 'robots.txt')
        })
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
            include: path.resolve(__dirname, 'client', 'src'),
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