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
    port: 8080,
    historyApiFallback: true,
    proxy: {
      '*': {
        target: 'http://localhost:8081'
      }
    }
  },
  devtool: 'inline-source-map',
  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          babelrc: false,
          presets: [
            ['@babel/preset-env', {
              useBuiltIns: 'usage',
              corejs: 3,
              targets: {
                "browsers": [
                  "> 0.25%",
                  "Chrome >= 41", // ここでGooglebot対応
                  "ie >= 11" // polyfillでレガシー対応するのであれば、ここまで振り切っても良い気がする
                ]
              },
            }],
            '@babel/preset-react',
          ],
          plugins: [
            ['@babel/plugin-proposal-class-properties', {
              loose: true
            }]
          ]
        }
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