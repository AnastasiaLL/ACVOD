const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const baseConfig = {
    entry: path.resolve(__dirname, './src/index.js'),
    // mode: 'development',
    module: {
      rules: [
          {
              test: /\.css$/i,
              use: ['style-loader', 'css-loader'],
          },

          {
              test: /\.(?:ico|gif|png|jpg|jpeg|svg|webp)$/i,
              type: 'asset/resource',
          },

          {
              test: /\.s[ac]ss$/i,
              use: [
                "style-loader",
                "css-loader",
                "sass-loader",
              ],
          },

          {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
              }
          },
      ],
    },

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist'),
        assetModuleFilename: '[file]',
    },

    plugins: [
      new HtmlWebpackPlugin({
          template: path.resolve(__dirname, './src/index.html'),
          filename: 'index.html',
      }),
      new CleanWebpackPlugin(),
    ],

    performance: {
      hints: false,
    },
 
    optimization: {  
      minimizer: [
        new CssMinimizerPlugin(),
      ],
    }    
};

module.exports = ({ mode }) => {

  const isProductionMode = mode === 'prod';
  const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

  return merge(baseConfig, envConfig);
};