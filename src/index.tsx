import * as React from 'react';
import {renderToString} from 'react-dom/server';
import {RouterContext} from 'react-router';

import {t} from './translate';

const _DEVELOPMENT_ = process.env.NODE_ENV !== 'production';

export default function renderIndex(renderProps: Object): string {
    const cdnScriptTags = getCDNScriptTags();

    return `
    <html doctype='html' dir="${t('dir')}">
        <head>
            <title>${t('title')}</title>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width">
            ${_DEVELOPMENT_ ? '' : '<link rel="stylesheet" href="/styles.css" />'}
            ${_DEVELOPMENT_ ? '' : cdnScriptTags}
            <script src='/public/client.js' defer></script>
        </head>
        <body>
            <div id="root">${renderToString(<RouterContext {...renderProps} />)}</div>
        </body>
    </html>`
    .trim();
}

function getCDNScriptTags(): string {
    const dependencies = require('../package.json').dependencies;

    return [
        {
            name: 'react',
            url: 'https://cdnjs.cloudflare.com/ajax/libs/react/_VERSION_/react.min.js'
        },{
            name: 'react-dom',
            url: 'https://cdnjs.cloudflare.com/ajax/libs/react/_VERSION_/react-dom.min.js'
        }, {
            name: 'react-router',
            url: 'https://cdnjs.cloudflare.com/ajax/libs/react-router/_VERSION_/ReactRouter.js'
        }
    ].map(lib => {
        const url = lib.url.replace('_VERSION_', dependencies[lib.name].replace(/\^|~/g, ''));
        return `<script src="${url}" defer></script>`;
    }).join('\n')
}
