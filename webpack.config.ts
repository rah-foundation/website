import * as webpack from 'webpack';
import {join as joinPath} from 'path';
import {Configuration} from 'webpack';

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
        filename: 'client.js'
    },
    module: {
        loaders: [
            {
                test: /\.(less|css)$/,
                loader: [
                    'style',
                    'css?modules&importLoaders=1',
                    'less'
                ].join('!')
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: 'node_modules'
            },
        ],
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'source-map-loader'
            }
        ]
    }
};

export default config;