import * as webpack from 'webpack';
import {join as joinPath} from 'path';
import {Configuration} from 'webpack';

export const CSS_MODULES_LOCAL_ID_NAME = '[name]__[local]___[hash:base64:5]';

const config: Configuration = {
    resolve: {
        extensions: ['', '.js', '.less', '.ts', '.tsx'],
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
                test: /\.less$/,
                loader: `style!css?modules&localIdentName=${CSS_MODULES_LOCAL_ID_NAME}!less`
            }
        ],
        preLoaders: [
            {
                test: /\.less$/,
                loader: 'typed-css-modules!less'
            }
        ]
    }
};

export default config;