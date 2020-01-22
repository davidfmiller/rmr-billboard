/* globals require, __dirname, module */

const
  path = require('path'),
  webpack = require('webpack');

const config = {
  entry: './src/scripts/index.js',
//  mode: 'development',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'docs/build/'),
    filename: 'billboard.bundle.js'
  },
  watch : true,
  plugins : [
  ],
  module : {
    rules : [
    {
      test : /\.js$/,
//      include : path.resolve(__dirname, 'src'),
      use : [{
        loader: 'babel-loader',
        options : {
          presets : [
            ['es2015' ]
          ]
        }
      }]
    }


    ]
  }
};

module.exports = config;
