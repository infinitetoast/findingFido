const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ContextReplacementPlugin } = require('webpack');

module.exports = {
  entry: {
    main: './client/main.ts'
  },
  output: {
    path: path.join(__dirname, "/dist/"),
    filename: "[name].bundle.js",
  },
  resolve: {
    extensions: ['.js', '.ts', '.html']
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
      { test: /.ts$/, use: ['awesome-typescript-loader', 'angular2-template-loader'] },
      { test: /.html$/, use: 'raw-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./client/index.html",
      filename: "index.html",
      showErrors: true,
      path: path.join(__dirname, "/dist/"),
    })
  ]
}