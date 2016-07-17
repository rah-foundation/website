/// <reference path="../typings/index.d.ts" />

import * as React from 'react';
import {renderToString} from 'react-dom/server'
import {Router, match, RouterContext} from 'react-router';
import * as Express from 'express';
import * as webpack from 'webpack';

import {t} from './translate';;
import {routes} from './routes';

const app = Express();
app.use(Express.static('dist'));
app.get('*', (req, res)=> {
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
    let clinetJSFileName = 'client.js';
    const dependencies = require('../package.json').dependencies;
    // clinetJSFileName = require('../../dist/manifest.json')[clinetJSFileName];

    // TODO: use CDNize
    const cdnFiles = [{
        name: 'react',
        url: `https://cdnjs.cloudflare.com/ajax/libs/react/_VERSION_/react.min.js`
    },{
        name: 'react-dom',
        url: `https://cdnjs.cloudflare.com/ajax/libs/react/_VERSION_/react-dom.min.js`
    }, {
        name: 'react-router',
        url: 'https://cdnjs.cloudflare.com/ajax/libs/react-router/_VERSION_/ReactRouter.js'
    }]
    .map(lib => {
        const url = lib.url.replace('_VERSION_', dependencies[lib.name].replace('^', '').replace('~', ''));
        return `<script src="${url}" defer></script>`;
    }).join('\n');

    return `
    <html doctype='html' dir="${t('dir')}">
        <head>
            <title>${t('title')}</title>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width">
            ${cdnFiles}
            <script src='/client.js' defer></script>
        </head>
        <body>
            <div id="root">${renderToString(<RouterContext {...renderProps} />)}</div>
        </body>
    </html>`
    .trim();
}

const PORT = process.env.PORT || 8088;
app.listen(PORT, (error: Error) => {
    if (error) {
        return console.error(error);
    }

    console.info(`App is running at http://localhost:${PORT}`);
});
