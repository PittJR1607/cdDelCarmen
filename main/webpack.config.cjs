const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devMode = process.env.NODE_ENV !== "production";

module.exports = {
    entry: './src/main.js',
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
          {
            test: /\.(sa|sc|c)ss$/i,
            use: [
              devMode ? "style-loader" : MiniCssExtractPlugin.loader,
              "css-loader",
              "postcss-loader"
         
            ],
          },
        ],
      },
      performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
      },
      plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
        }),
        new HtmlWebpackPlugin({
            filename: 'actividades.html',
            template: 'src/actividades.html',
        }),
    ].concat(devMode ? [] : [new MiniCssExtractPlugin()]),
};