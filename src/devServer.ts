/// <reference path="../typings/index.d.ts" />

import {match} from 'react-router';
import * as Express from 'express';
import * as webpack from 'webpack';
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const lessParser = require('postcss-less').parse;
const CssModulesRequireHook = require('css-modules-require-hook')
const manifest = require('../dist/manifest.json');

// path require images
CssModulesRequireHook({
     extensions: '.less',
     processorOpts: {parser: lessParser}
});

// patch image extensions
require.extensions['.png'] = function requireImages(image: {filename: string}) {
    // TODO: FIXME: this is not working and requireing images is returning {}
    // TODO: filenames can colide, if this issue is solved in manifest plugin we
    //       can use full paths to fix it:
    //       https://github.com/danethurber/webpack-manifest-plugin/issues/23
    const imageFileName = image.filename.substring(image.filename.lastIndexOf('/') + 1);
    const result = manifest[imageFileName];
    return result;
}

import webpackCofigs from '../webpack.config';
import renderIndex from './index';
import {handleGet} from './server';

const PORT = process.env.PORT || 8088;
const clientConfig = webpackCofigs[0];
(<any>clientConfig.entry).client.push('webpack-hot-middleware/client');
const webpackStatsOptions = {
	chunk: false,
	chunkModules: false,
	modules: false,
	source: false,
	chunkOrigins: false
};

const app = Express();
const compiler = webpack(clientConfig);
app.use(webpackMiddleware(compiler, {
    hot: true,
    historyApiFallback: true,
    status: webpackStatsOptions
}));
app.use(webpackHotMiddleware(compiler));

app.get('*', handleGet);

app.listen(PORT, (error: Error) => {
    if (error) throw error;

    console.log('Development server with [HMR] started at port', PORT);
});
