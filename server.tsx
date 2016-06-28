/// <reference path="typings/index.d.ts" />

import * as React from 'react';
import {renderToString} from 'react-dom/server'
import {Router, match, RouterContext} from 'react-router';
import * as Express from 'express';
import * as webpack from 'webpack';
const webpackDevMiddleware = require('webpack-dev-middleware');
const lessParser = require('postcss-less').parse;
const CssModulesRequireHook = require('css-modules-require-hook')
const webpackHotMiddleware = require("webpack-hot-middleware");
import webpackConfig from './webpack.config';
import {CSS_MODULES_LOCAL_ID_NAME} from './webpack.config'

const _DEVELOPMENT_ = true;

CssModulesRequireHook({
    extensions: '.less',
    generateScopedName: CSS_MODULES_LOCAL_ID_NAME,
    processorOpts: {parser: lessParser}
});

import {routes} from './routes';

const PORT = process.env.PORT || 8088;

const app = Express();

if (_DEVELOPMENT_) {
    const compiler = webpack(webpackConfig);
    app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: '/'
    }));
    app.use(webpackHotMiddleware(compiler));
} else {
    app.use(Express.static('dist'));
}

app.get('*', (req, res)=> {

    // TODO: Fix the typings for match
    match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
        if (error) {
            res.status(500).send(error.message);
        } else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        } else if (renderProps) {
            res.status(200).send(renderIndex(renderProps))
        } else {
            res.status(404).send('Not found');
        }
    });
});

function renderIndex(renderProps: Object): string {
    return `
    <html doctype='html'>
        <head>
            <title>Ctrl+S</title>
            <script src='/client.js' defer async></script>
        </head>
        <body>
            <div id="root">${renderToString(<RouterContext {...renderProps} />)}</div>
        </body>
    </html>`
    .trim();
}

app.listen(PORT, (error: Error) => {
    if (error) {
        return console.error(error);
    }

    console.info(`App is running at http://localhost:${PORT}`);
});
