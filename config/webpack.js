/* eslint
   import/no-extraneous-dependencies: 0,
   @typescript-eslint/no-var-requires: 0,
   @typescript-eslint/explicit-function-return-type: 0 */

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');

require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

const plugins = [
  new HtmlWebpackPlugin({
    inlineSource: '.css$',
    template: './src/assets/index.html',
  }),

  new webpack.EnvironmentPlugin({
    AUTH_FACEBOOK_ID: '',
    NODE_ENV: 'development',
    SERVER_HOST: null,
  }),
];

if (isProduction) {
  plugins.push(new MiniCssExtractPlugin({
    filename: '[name].css',
  }));
} else {
  plugins.push(new webpack.HotModuleReplacementPlugin());
}

const cssLoader = () => ({
  test: /\.css$/,
  use: [{
    loader: 'style-loader',
  }, {
    loader: 'css-loader',
  }],
});

const tsLoader = () => ({
  exclude: /node_modules/,
  test: /\.tsx?$/,
  use: 'ts-loader',
});

const htmlLoader = () => ({
  test: /\.(html)$/,
  use: {
    loader: 'html-loader',
  },
});

module.exports = {
  devServer: {
    compress: true,
    contentBase: path.join(__dirname, '../public'),
    historyApiFallback: true,
    hot: true,
    port: 3000,
    proxy: {
      '/api/v1': 'http://localhost:3001',
    },
  },

  devtool: isProduction ? 'source-map' : 'inline-source-map',

  entry: './src/main.ts',

  mode: 'development',

  module: {
    rules: [
      cssLoader(),
      tsLoader(),
      htmlLoader(),
    ],
  },

  node: {
    __dirname: false,
    __filename: false,
    fs: 'empty',
  },

  output: {
    filename: 'bundle.js',
    publicPath: '/',
  },

  plugins,

  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
  },

  stats: 'errors-only',
};
