import * as webpack from 'webpack';
import {join as joinPath} from 'path';
import {Configuration} from 'webpack';

export const CSS_MODULES_LOCAL_ID_NAME = '[name]__[local]___[hash:base64:5]';

const config: Configuration = {
    resolve: {
        extensions: ['', '.js', '.css', '.ts', '.tsx'],
        root: __dirname,
        modulesDirectories: ['node_modules']
    },
    entry: {
        client: 'client'
    },
    output: {
        path: joinPath(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.ts(x?)$/,
                loader: 'ts-loader'
            },
            {
                test: /\.css$/,
                loader: `style!css?modules&localIdentName=${CSS_MODULES_LOCAL_ID_NAME}`
            }
        ],
        preLoaders: [
            {
                test: /\.css$/,
                loaders: ['typed-css-modules']
            }
        ]
    }
};

export default config;