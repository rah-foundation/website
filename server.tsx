/// <reference path="typings/index.d.ts" />

import * as React from 'react';
import {renderToString} from 'react-dom/server'
import {Router, match, RouterContext} from 'react-router';
import * as Express from 'express';

import {routes} from './routes';

const PORT = process.env.PORT || 8088;

const app = Express();

app.get('*', (req, res)=> {

    // TODO: Fix the typings for match
    match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
        if (error) {
            res.status(500).send(error.message);
        } else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        } else if (renderProps) {
            res.status(200).send(renderToString(<RouterContext {...renderProps} />))
        } else {
            res.status(404).send('Not found');
        }
    });
});

app.listen(PORT, error => {
    if (error) {
        return console.error(error);
    }

    console.info(`App is running at http://localhost:${PORT}`);
});
