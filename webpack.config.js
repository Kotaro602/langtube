const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.join(__dirname, './src'),
  mode: 'development',
  entry: '../src/index.jsx',
  output: {
    path: path.join(__dirname, './public'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: 'public',
    //host: '0.0.0.0',
    port: 8080,
    disableHostCheck: true
  },
  devtool: 'inline-source-map',
  module: {
    rules: [{
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
        loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
      }
    ]
  },
  resolve: {
    extensions: [".webpack.js", ".web.js", ".js", ".jsx"]
  }
};