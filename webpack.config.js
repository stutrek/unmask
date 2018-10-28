var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ForceCaseSensitivityPlugin = require('case-sensitive-paths-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var appConfig = require('./appConfig');

var IS_DEV;
if (typeof process.env.IS_DEV !== 'undefined') {
    IS_DEV = process.env.IS_DEV === 'true';
} else if (process.argv.indexOf('dev') !== -1) {
    IS_DEV = true;
} else {
    IS_DEV = process.argv.join('').indexOf('simple-dev-server') !== -1;
}

var isProfile = process.argv.join('').indexOf('--profile') !== -1;

if (!isProfile) {
    console.log('IS DEV?', IS_DEV);
}

var plugins = [
    new ForceCaseSensitivityPlugin(),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en-gb/),
    new ExtractTextPlugin('assets/[name]-[hash].css', {allChunks: true}),
    new webpack.optimize.CommonsChunkPlugin({
        minChunks: 2,
        async: true
    }),

    new HtmlWebpackPlugin({
        template: __dirname + '/src/index.html',
        filename: 'index-prod.html',
        appConfig: appConfig.prod,
        chunks: ['app']
    }),
    new HtmlWebpackPlugin({
        template: __dirname + '/src/index.html',
        filename: 'index-dev.html',
        appConfig: appConfig.dev,
        chunks: ['app']
    }),
    new HtmlWebpackPlugin({
        template: __dirname + '/sandbox/index.html',
        filename: 'sandbox.html',
        appConfig: appConfig.dev,
        chunks: ['sandbox']
    }),

    new CopyWebpackPlugin([
        { from: 'robots.txt' }
    ])
];

if (IS_DEV) {
    plugins.push();
}

if (!IS_DEV) {
    plugins.unshift(
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        })
    );
    plugins.unshift(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: true
        })
    );
}

var entry, output;

entry = {
    app: __dirname + '/src/index.js',
    sandbox: __dirname + '/sandbox/index.js'
};

output = {
    path      : __dirname + '/build',
    filename  : 'assets/[name]-[hash].js',
    chunkFilename: 'assets/chunks/[id]-[hash].js',
    publicPath: '/',
};

var jsLoaders = [];

var config = {
    entry: entry,

    output: output,

    plugins: plugins,

    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
				loader: 'babel-loader',
			}
        }, {
            test  : /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                        modules: true,
                        camelCase: true,
                        importLoaders: 1,
                        localIdentName: '[name]_[local]'
                    }
                },              {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true
                    }
                }]
            })
        }, {
            test  : /\.(otf|eot|ttf|woff|woff2)$/,
            use: {
                loader: 'file-loader',
                options: {
                    'name': 'assets/fonts/[name]-[hash].[ext]'
                }
            }
        }, {
            test: /\.(png|jpg|gif|ico)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 12288,
                    name: 'assets/images/[name]-[hash].[ext]'
                }
            }
        }, {
            test: /\.svg$/,
            use: 'svg-inline-loader'
        }, {
            test: /\.md$/,
            use: [
                'html-loader',
                'markdown-loader'
            ]
        }]
    },

    devtool: 'source-map',

    resolve: {
        modules  : [
            __dirname + '/src',
            __dirname + '/node_modules'
        ]
    }
};

module.exports = config;
