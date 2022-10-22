const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const baseConfig = {
    entry: path.resolve(__dirname, './src/index.js'),
    mode: 'development',
    module: {
      rules: [
          // {
          //     test: /\.css$/i,
          //     use: ['style-loader', 'css-loader'],
          // },

          {
              test: /\.(?:ico|gif|png|jpg|jpeg|svg|webp)$/i,
              type: 'asset/resource',
          },

          {
              test: /\.css$/i,
              use: [MiniCssExtractPlugin.loader, "css-loader"],
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
                options: {
                  presets: ['@babel/preset-env']
                }
              }
          },
      ],
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
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
        new MiniCssExtractPlugin(),  
        
    ],

    performance: {
      hints: false,
    },
 
    optimization: {         
        minimizer: [
          new CssMinimizerPlugin(),
        ],
        runtimeChunk: 'single',         
    }    
};

module.exports = ({ mode }) => {

  const isProductionMode = mode === 'prod';
  const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

  return merge(baseConfig, envConfig);
};