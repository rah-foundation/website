import * as webpack from 'webpack';
import {join as joinPath} from 'path';
import {Configuration, Plugin} from 'webpack';
const precss = require('precss');
const autoprefixer = require('autoprefixer');

export const CSS_MODULES_LOCAL_ID_NAME = '[name]__[local]___[hash:base64:5]';
const _DEVELOPMENT_ = process.env.NODE_ENV !== 'production';

interface OurConfiguration extends Configuration {
    postcss: ()=> Object[]
}

const config: OurConfiguration = {
    devtool: 'source-map',
    target: 'node',
    resolve: {
        extensions: ['', '.js', '.less', '.ts', '.tsx', '.png'],
        root: __dirname,
        modulesDirectories: ['node_modules']
    },
    entry: {
        client: ['src/client'],
        // server: ['src/server']
    },
    output: {
        path: joinPath(__dirname, 'dist'),
        filename: '[name].js'
    },
    postcss() {
        return [precss, autoprefixer];
    },
    module: {
        loaders: [
            {
                test: /\.less$/,
                loaders: [
                    'style',
                    `css?modules&localIdentName=${CSS_MODULES_LOCAL_ID_NAME}`,
                    'less'
                ]
            },
            {
                test: /\.ts(x?)$/,
                loader: 'ts-loader'
            },
            {
                test: /\.json/,
                loader: 'json'
            },
            {
                test: /\.png/,
                loader: 'file'
            }
        ],
        preLoaders: [
            {
                test: /\.less$/,
                loaders: [
                    'typed-css-modules',
                    'less',
                    'postcss'
                ]
            }
        ]
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};

if (!_DEVELOPMENT_) {
    config.entry.server.push('webpack-hot-middleware/client');

    // Use CDN for libraries
    config.externals = {
        'react': 'React',
        'react-router': 'ReactRouter',
        'react-dom': 'ReactDOM'
    };

    // Minify the JavaScript
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
             warnings: false
        }
    }));
    config.output.filename = '[name]-[hash:7].js';

    // Extract CSS into a file (FIXME)
    // const ExtractTextPlugin = require('extract-text-webpack-plugin');
    // config.module.loaders.unshift();
    // config.module.loaders.push({
    //     test: /\.less$/,
    //     loader: ExtractTextPlugin.extract(
    //         'style',
    //         `css?modules&localIdentName=${CSS_MODULES_LOCAL_ID_NAME}`,
    //         'less'
    //     )
    // });
    // config.plugins.push(ExtractTextPlugin('styles.css'));

    // Add manifest
    const ManifestPlugin = require('webpack-manifest-plugin');
    config.plugins.push(new ManifestPlugin());
}

export default config;
