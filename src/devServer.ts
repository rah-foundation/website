/// <reference path="../typings/index.d.ts" />

import {match} from 'react-router';
import * as Express from 'express';
import * as webpack from 'webpack';
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const lessParser = require('postcss-less').parse;
const CssModulesRequireHook = require('css-modules-require-hook')

import {clientConfig, CSS_MODULES_LOCAL_ID_NAME} from '../webpack.config';
import {join, basename} from 'path';
import * as chokidar from 'chokidar';
import renderIndex from './index';

// path require CSS
CssModulesRequireHook({
     extensions: '.less',
     processorOpts: {parser: lessParser},
     generateScopedName: CSS_MODULES_LOCAL_ID_NAME
});

// patch require images
['.png', '.svg', '.jpg', '.jpeg', '.gif'].forEach(extension => {
    require.extensions[extension] = function requireImages(module: any, filename: string) {
        // TODO: filenames can colide, if this issue is solved in manifest plugin we
        //       can use full paths to fix it:
        //       https://github.com/danethurber/webpack-manifest-plugin/issues/23
        const manifest = require('../dist/manifest.json');
        const result = manifest[basename(filename)];
        if (!result) {
            throw new Error(`Could not find ${filename} in manifest.
            manifest content: ${JSON.stringify(manifest, null, 2)}`);
        }
        module.exports = join('/', result);
        return module;
    };
});

import {get as handleGet} from './controller';

const PORT = process.env.PORT || 8088;
(<any>clientConfig.entry).client.push('webpack-hot-middleware/client');
(<any>clientConfig.entry).client.push('webpack/hot/only-dev-server');
clientConfig.module.loaders.shift();
clientConfig.module.loaders.unshift({
    test: /\.ts(x?)$/,
    loaders: ['react-hot', 'ts']
});

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

// watch for changes in server
const watcher = chokidar.watch('./src/components/**/*.tsx');
watcher.on('ready', () => {
    watcher.on('all', () => {
        Object.keys(require.cache).forEach((id) => {
            // Delete cache of all files in components
            if (/src\/components/.test(id)) {
                delete require.cache[id];
            }
            // Delete webpack manifest cache
            if (/manifest\.json/.test(id)) {
                delete require.cache[id];
            }
            // Delete cache of routes.tsx so it is re-required on app server request
            if (/src\/routes\.(tsx|svg|png|jpg|jpeg)$/.test(id)) {
                delete require.cache[id];
            }
        });
    });
});

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
