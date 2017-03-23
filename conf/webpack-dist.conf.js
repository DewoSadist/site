const webpack = require('webpack');
const conf = require('./gulp.conf');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const FailPlugin = require('webpack-fail-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const pkg = require('../package.json');
const autoprefixer = require('autoprefixer');

module.exports = {
  module: {
    loaders: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'tslint-loader',
        enforce: 'pre'
      },
      {
        test: /\.json$/,
        loaders: [
          'json-loader'
        ]
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: './conf/sass-resources.scss'
            }
          }
        ]
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loaders: [
          'ng-annotate-loader',
          'ts-loader'
        ]
      },
      { test: /\.(png|woff|woff2|eot|ttf|svg|gif)$/,
        loader: 'url-loader?limit=10000'
      },
      {
        test: /bootstrap-sass\/assets\/javascripts\//,
        loader: 'imports?jQuery=jquery'
      },
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    FailPlugin,
    new HtmlWebpackPlugin({
      template: conf.path.src('index.html')
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: {comments: false},
      compress: {unused: true, dead_code: true, warnings: false} // eslint-disable-line camelcase
    }),
    new ExtractTextPlugin('index-[contenthash].css'),
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor'}),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: () => [autoprefixer],
        resolve: {},
        context: process.cwd(),
        sassResources: './conf/sass-resources.scss',
        ts: {
          configFileName: 'tsconfig.json'
        },
        tslint: {
          configuration: require('../tslint.json')
        }
      }
    })
  ],
  output: {
    path: path.join(process.cwd(), conf.paths.dist),
    filename: '[name]-[hash].js'
  },
  resolve: {
    extensions: [
      '.webpack.js',
      '.web.js',
      '.js',
      '.ts'
    ]
  },
  entry: {
    app: [
      `bootstrap-loader/extractStyles`,
      `./${conf.path.src('index')}`
      ],
    vendor: Object.keys(pkg.dependencies)
  }
};
