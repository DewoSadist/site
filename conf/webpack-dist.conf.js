const webpack = require('webpack');
const conf = require('./gulp.conf');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
    module: {
        loaders: [{
                test: /\.json$/,
                loaders: [
                    'json'
                ]
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(
                    'style',
                    'css?minimize' +
                    '!postcss' +
                    '!sass' +
                    '!sass-resources'
                )
            }, {
                test: /\.ts$/,
                exclude: /node_modules/,
                loaders: [
                    'ng-annotate',
                    'ts'
                ]
            }, {
                test: /\.(jpe?g|png|woff|woff2|eot|ttf|svg|gif)$/,
                loader: 'url?limit=100000'
            }, {
                test: /bootstrap-sass\/assets\/javascripts\//,
                loader: 'imports?jQuery=jquery'
            }
        ]
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
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                drop_debugger: true,
                drop_console: true,
                unused: true,
                dead_code: true,
                warnings: false
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function(module) {
                return isExternal(module);
            }
        }),
        new ExtractTextPlugin('index-[contenthash].css')
    ],
    postcss: () => [
        autoprefixer({ browsers: ['last 5 versions'] })
    ],
    sassResources: './conf/sass-resources.scss',
    output: {
        path: path.join(process.cwd(), conf.paths.dist),
        filename: '[name]-[hash].js'
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
    entry: {
        app: [
            `bootstrap-loader/extractStyles`,
            `./${conf.path.src('index')}`,
            `./${conf.path.tmp('templateCacheHtml.ts')}`
        ]
    },
    ts: {
        configFileName: 'conf/ts.conf.json'
    },
    tslint: {
        configuration: require('../tslint.json')
    }
};

function isExternal(module) {
    var userRequest = module.userRequest;

    if (typeof userRequest !== 'string') {
        return false;
    }

    return userRequest.indexOf('node_modules') >= 0 && userRequest.indexOf('node_modules/bootstrap') < 0;
}
