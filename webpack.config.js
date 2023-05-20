const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    entry: '/src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'webpack.bundle.js',
    },
    mode: 'development',
    plugins:
        new MiniCssExtractPlugin()
        [new HtmlWebpackPlugin(
            {
                template: "/public/index.html",
                inject: "body",
                filename: "web.html"
            },
            {
                optimization: {
                    minimize: true,
                    minimizer: [new TerserPlugin()],
                }
            }
        )],
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9000,
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin, "css-loader"],
            },
        ],
    },
};
