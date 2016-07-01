import * as webpack from 'webpack';
import {join as joinPath} from 'path';
import {Configuration} from 'webpack';

export const CSS_MODULES_LOCAL_ID_NAME = '[name]__[local]___[hash:base64:5]';
const _DEVELOPMENT_ = process.env.NODE_ENV !== 'production';

const config: Configuration = {
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.js', '.less', '.ts', '.tsx'],
        root: __dirname,
        modulesDirectories: ['node_modules']
    },
    entry: {
        client: ['src/client']
            .concat(_DEVELOPMENT_ ? ['webpack-hot-middleware/client'] : [])
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
                loaders: [
                    'style',
                    `css?modules&localIdentName=${CSS_MODULES_LOCAL_ID_NAME}`,
                    'less'
                ]
            },
            {
                test: /\.json/,
                loader: 'json'
            }
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
        new webpack.NoErrorsPlugin()
    ]
};

export default config;
