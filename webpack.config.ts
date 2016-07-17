import * as webpack from 'webpack';
import {join as joinPath} from 'path';
import {cloneDeep} from 'lodash';
import {Configuration, Plugin} from 'webpack';
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const ManifestPlugin = require('webpack-manifest-plugin');
const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

export const CSS_MODULES_LOCAL_ID_NAME = '[name]__[local]___[hash:base64:5]';
const _DEVELOPMENT_ = process.env.NODE_ENV !== 'production';

interface OurConfiguration extends Configuration {
    postcss: ()=> Object[]
}

const clientConfig: OurConfiguration = {
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.js', '.less', '.ts', '.tsx', '.png', '.json'],
        root: __dirname,
        modulesDirectories: ['node_modules']
    },
    externals: {
        'react': 'React',
        'react-router': 'ReactRouter',
        'react-dom': 'ReactDOM'
    },
    entry: {
        client: ['src/client']
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
            },
            {
                test: /\.less$/,
                loaders: [
                    'style',
                    `css?modules`,
                    'less'
                ]
            },
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
        new webpack.NoErrorsPlugin(),
        new ManifestPlugin(),
        // new ExtractTextPlugin('styles.css')
    ]
};

if (!_DEVELOPMENT_) {
    // Minify the JavaScript
    clientConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
        mangle: true,
        compress: {
             warnings: false
        }
    }));
    clientConfig.output.filename = '[name]-[hash:7].js';
}

const serverConfig = cloneDeep(clientConfig);
serverConfig.target = 'node';
serverConfig.entry = {
    server: ['src/server']
};
serverConfig.externals = [nodeExternals()];
serverConfig.module.loaders.pop(); // remove browser CSS loader
serverConfig.module.loaders.push({
    test: /\.less$/,
    loader: ExtractTextPlugin.extract('css?modules!less')
});
serverConfig.plugins.push(new ExtractTextPlugin('styles.css'));

export default [clientConfig, serverConfig];
