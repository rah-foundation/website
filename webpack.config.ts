import {cloneDeep} from 'lodash';
import * as webpack from 'webpack';
import {join as joinPath} from 'path';
import {Configuration, Plugin} from 'webpack';
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const FONT_REGEX = /\.(ttf|eot|svg|woff|woff2|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/;
export const CSS_MODULES_LOCAL_ID_NAME = '[local]___[hash:base64:7]';
const _DEVELOPMENT_ = process.env.NODE_ENV !== 'production';

interface OurConfiguration extends Configuration {
    postcss: ()=> Array<{}>
}

export const clientConfig: OurConfiguration = {
    bail: true,
    debug: true,
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.js', '.less', '.ts', '.tsx', '.png', '.json'],
        root: __dirname,
        modulesDirectories: ['node_modules']
    },
    entry: {
        client: ['src/client']
    },
    output: {
        path: joinPath(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].js',
        pathinfo: true
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
                test: FONT_REGEX,
                loader: 'file'
            },
            {
                test: /\.svg(\?.*)?$/,
                loader: 'url?limit=10000&mimetype=image/svg+xml&name=[hash].[ext]'
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                loader: 'url?limit=1000&name=[hash].[ext]'
            },
            {
                test: /\.less$/,
                loader: _DEVELOPMENT_ ?
                    `style!css?modules&localIdentName=${CSS_MODULES_LOCAL_ID_NAME}!less?sourceMap!postcss` :
                    ExtractTextPlugin.extract(`css?modules&localIdentName=${CSS_MODULES_LOCAL_ID_NAME}!less?sourceMap!postcss`)
            },
        ],
        preLoaders: [
            {
                test: /\.less$/,
                loaders: [
                    'typed-css-modules',
                    'less'
                ]
            }
        ]
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new ManifestPlugin(),
        new ExtractTextPlugin('styles.css'),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        new FaviconsWebpackPlugin({
            logo: 'src/components/App/images/favicon.png',
            emitStats: true,
            statsFilename: 'icons.json',
            icons: {
                android: false,
                appleIcon: false,
                appleStartup: false,
                favicons: true,
            }
        })
    ]
};

if (!_DEVELOPMENT_) {
    clientConfig.devtool = 'cheap-source-map';
    clientConfig.debug = false;
    clientConfig.externals = {
        'react': 'React',
        'react-router': 'ReactRouter',
        'react-dom': 'ReactDOM'
    };

    // Minify the JavaScript
    clientConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
        mangle: true,
        compress: {
             warnings: false
        }
    }));

    // TODO: Figure out file name mangling that works in server and client
    // clientConfig.output.filename = '[name]-[hash:7].js';
}

export const serverConfig = cloneDeep(clientConfig);
serverConfig.target = 'node';
serverConfig.entry = {
    server: ['src/server']
};
serverConfig.externals = [nodeExternals()];
serverConfig.module.loaders.pop(); // remove browser CSS loader
serverConfig.module.loaders.push({
    test: /\.less$/,
    loader: ExtractTextPlugin.extract(
        `css?modules&sourceMap&localIdentName=${CSS_MODULES_LOCAL_ID_NAME}!less?sourceMap`
    )
});
serverConfig.plugins.push(new ExtractTextPlugin('styles.css'));


let config: OurConfiguration|OurConfiguration[] = [clientConfig, serverConfig];

if (process.argv.indexOf('--client') > -1) {
    config = clientConfig;
} else if (process.argv.indexOf('--server') > -1) {
    config = serverConfig;
}

export default config;
