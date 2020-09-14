/* eslint
   import/no-extraneous-dependencies: 0,
   @typescript-eslint/no-var-requires: 0,
   @typescript-eslint/explicit-function-return-type: 0 */

const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

const tsLoader = () => ({
  exclude: /node_modules/,
  test: /\.tsx?$/,
  use: 'ts-loader',
});

module.exports = {
  devtool: isProduction ? 'source-map' : 'inline-source-map',

  entry: './src/server/index.ts',

  externals: [nodeExternals()],

  mode: isProduction ? 'production' : 'development',

  module: {
    rules: [
      tsLoader(),
    ],
  },

  output: {
    filename: 'server.js',
  },

  plugins: [
    new webpack.EnvironmentPlugin([
      'AUTH_FACEBOOK_ID',
      'AUTH_FACEBOOK_SECRET',
      'DB_HOST',
      'FRONTEND_HOST',
      'NODE_ENV',
      'SERVER_HOST',
    ]),
  ],

  resolve: {
    extensions: ['.ts'],
  },

  stats: 'errors-only',

  target: 'node',
};
