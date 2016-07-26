/// <reference path="../typings/index.d.ts" />

import {match} from 'react-router';
import * as Express from 'express';
import * as webpack from 'webpack';
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const lessParser = require('postcss-less').parse;
const CssModulesRequireHook = require('css-modules-require-hook')
const manifest = require('../dist/manifest.json');
import {CSS_MODULES_LOCAL_ID_NAME} from '../webpack.config';

// path require images
CssModulesRequireHook({
     extensions: '.less',
     processorOpts: {parser: lessParser},
     generateScopedName: CSS_MODULES_LOCAL_ID_NAME
});

// patch image extensions
require.extensions['.png'] = function requireImages(module: any, filename: string) {
    // TODO: FIXME: this is not working and requireing images is returning {}
    // TODO: filenames can colide, if this issue is solved in manifest plugin we
    //       can use full paths to fix it:
    //       https://github.com/danethurber/webpack-manifest-plugin/issues/23
    const imageFileName = filename.substring(filename.lastIndexOf('/') + 1);
    const result = manifest[imageFileName];
    return result;
}

import webpackCofigs from '../webpack.config';
import renderIndex from './index';
import {get as handleGet} from './controller';

const PORT = process.env.PORT || 8088;
const clientConfig = webpackCofigs[0];
(<any>clientConfig.entry).client.push('webpack-hot-middleware/client');
(<any>clientConfig.entry).client.push('webpack/hot/only-dev-server');
clientConfig.module.loaders.shift();
clientConfig.module.loaders.unshift({
    test: /\.ts(x?)$/,
    loaders: ['react-hot', 'ts']
})
const webpackStatsOptions = {
    colors: true,
    hash: false,
    version: false,
    timings: false,
    assets: false,
    chunks: false,
    chunkModules: false,
    modules: false,
    children: false,
    cached: false,
    reasons: false,
    source: false,
    errorDetails: true,
    chunkOrigins: false
};

const app = Express();
const compiler = webpack(clientConfig);
app.use(webpackMiddleware(compiler, {
    publicPath: clientConfig.output.publicPath,
    hot: true,
    historyApiFallback: true,
    stats: webpackStatsOptions
}));
app.use(webpackHotMiddleware(compiler));

app.get('*', handleGet);

app.listen(PORT, (error: Error) => {
    if (error) throw error;

    console.log(`
    ╔═══════════════════════════════════════╗
    ║                                       ║
    ║ Development server with [HMR] started ║
    ║ Visit http://localhost:${PORT}           ║
    ║                                       ║
    ╚═══════════════════════════════════════╝
    `);
});
