const webpack = require('webpack');
const conf = require('./gulp.conf');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
    module: {
        preLoaders: [{
            test: /\.ts$/,
            exclude: /node_modules/,
            loader: 'tslint'
        }],
        loaders: [{
            test: /\.json$/,
            loaders: [
                'json'
            ]
        }, 
        {
            test: /\.scss$/,
            loaders: [
                'style',
                'css',
                'postcss',
                'sass',
                'sass-resources'
            ]
        },
         {
            test: /\.ts$/,
            exclude: /node_modules/,
            loaders: [
                'ng-annotate',
                'ts'
            ]
        }, {
            test: /\.(jpe?g|png|woff|woff2|eot|ttf|svg|gif)$/,
            loader: 'url-loader?limit=100000'
        }, {
            test: /bootstrap-sass\/assets\/javascripts\//,
            loader: 'imports?jQuery=jquery'
        }]
    },
    
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.ProvidePlugin({
            'moment': 'moment',
            'humanizeDuration': 'humanize-duration'
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({
            template: conf.path.src('index.html'),
            inject: true
        }),
        new ExtractTextPlugin('/index.css')
    ],
    postcss: () => [
        autoprefixer({ browsers: ['last 5 versions'] })
    ],
    sassResources: './conf/sass-resources.scss',
    debug: true,
    devtool: 'eval',
    output: {
        path: path.join(process.cwd(), conf.paths.tmp),
        filename: 'index.js'
    },
    resolve: {
        extensions: [
            '',
            '.webpack.js',
            '.web.js',
            '.js',
            '.ts'
        ]
    },
    entry: ['bootstrap-loader', `./${conf.path.src('index')}`],
    ts: {
        configFileName: 'conf/ts.conf.json'
    },
    tslint: {
        configuration: require('../tslint.json')
    }
};
