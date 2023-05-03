const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
    entry: './src/index.js',
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
      plugins: [].concat(devMode ? [] : [new MiniCssExtractPlugin()]),
};