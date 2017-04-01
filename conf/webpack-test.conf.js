module.exports = {
    module: {
        preLoaders: [{
            test: /\.ts$/,
            exclude: /node_modules/,
            loader: 'tslint'
        }],

        loaders: [
            {
                test: /.json$/,
                loaders: [
                    'json'
                ]
            },
            {
                test: /\.(css)$/,
                loaders: [
                    'style',
                    'css',
                    'sass',
                    'postcss',
                    '',
                ]
            }, {
                test: /\.ts$/,
                exclude: /node_modules/,
                loaders: [
                    'ng-annotate',
                    'ts'
                ]
            },
            // { 
            //     test: /\.scss$/, 
            //     loader: 'style!css!sass!sass-resources' 
            // },
            { test: /\.scss$/, loader: 'style!css!sass!sass-resources' },
            { test: /\.(jpe?g|png|woff|woff2|eot|ttf|svg|gif)$/, loader: 'url-loader?limit=100000' },
            { test: /bootstrap-sass\/assets\/javascripts\//, loader: 'imports?jQuery=jquery' }
        ]
    },
    sassResources: './conf/sass-resources.scss',
    plugins: [],
    debug: true,
    devtool: 'cheap-module-eval-source-map',
    resolve: {
        extensions: [
            '',
            '.webpack.js',
            '.web.js',
            '.js',
            '.ts'
        ]
    },
    ts: {
        configFileName: 'conf/ts.conf.json'
    },
    tslint: {
        configuration: require('../tslint.json')
    }
};
