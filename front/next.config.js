const path = require('path');
const withSass = require('@zeit/next-sass');
const withCss = require('@zeit/next-css');
const withTypescript = require('@zeit/next-typescript');

module.exports = withTypescript(withSass(withCss({
    webpack: function (config) {
        config.module.rules.push({
          test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 100000,
              name: '[name].[ext]'
            }
          }
        })
        return config
      },
      cssLoaderOptions: { // this solves the issue
        url: false
      }
})));