const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        // static: './',
      
      port: 8000,
      historyApiFallback: true,
      hot: true,
    }
};
