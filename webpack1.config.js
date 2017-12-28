const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ContextReplacementPlugin } = require('webpack');

module.exports = {
  entry: {
    main: './client/main.ts',
  },
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].bundle.js',
  },
  watch: true,
  resolve: {
    extensions: ['.js', '.ts', '.html'],
  },
  devServer: {
    contentBase: path.join(__dirname, '/dist/'),
    port: 8080,
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
      { test: /.ts$/, use: ['awesome-typescript-loader', 'angular2-template-loader'] },
      { test: /.html$/, use: 'raw-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html',
      filename: 'index.html',
      showErrors: true,
      path: path.join(__dirname, '/dist/'),
      hash: true,
    }),
    new ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      path.resolve(__dirname, '/client'),
    ),
  ],
};
