/* globals require, __dirname, module */

const
  path = require('path'),
  webpack = require('webpack');

const config = {
  entry: './src/scripts/index.js',
  mode: 'development',
//  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'docs/build/'),
    filename: 'billboard.bundle.js'
  },
  watch : true,
  plugins : [
  ],
  module : {
    rules : [
    ]
  }
};

module.exports = config;
