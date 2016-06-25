import * as webpack from 'webpack';
import {join as joinPath} from 'path';
import {Configuration} from 'webpack';

const config: Configuration = {
    resolve: {
        extensions: ['', '.js', '.css', '.css.d.ts', '.ts', '.tsx'],
        root: __dirname,
        modulesDirectories: ['node_modules']
    },
    entry: {
        client: 'client'
    },
    output: {
        path: joinPath(__dirname, 'dist'),
        filename: '[name]-[hash:5].js'
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                exclude: 'node_modules'
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: 'awesome-typescript-loader'
            }
        ],
        preLoaders: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: 'typed-css-modules'
            }
        ]
    }
};

export default config;