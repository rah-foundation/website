/// <reference path="typings/index.d.ts" />

import * as React from 'react';
import {renderToString} from 'react-dom/server'
import {Router, match, RouterContext} from 'react-router';
import * as Express from 'express';
import * as webpack from 'webpack';
const webpackDevMiddleware = require('webpack-dev-middleware');

import {routes} from './routes';

import webpackConfig from './webpack.config';

const PORT = process.env.PORT || 8088;

const app = Express();

app.use(webpackDevMiddleware(webpack(webpackConfig), {
    noInfo: false,
    publicPath: '/dist',
    stats: {
        colors: true
    }
}));

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
            <script src='/dist/client.js' defer async></script>
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
