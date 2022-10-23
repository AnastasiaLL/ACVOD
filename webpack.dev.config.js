const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {    
      port: 8080,
      historyApiFallback: true,
      hot: true,
    }
};
