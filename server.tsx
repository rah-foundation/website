/// <reference path="typings/index.d.ts" />

import * as React from 'react';
import { renderToString } from 'react-dom/server'
import {Route} from 'react-router';
import * as webpack from 'webpack';
import * as Express from 'express';

import App from './components/App';

const PORT = process.env.PORT || 8088;

const app = Express();

app.get('*', (req, res)=> {
    res.send(renderToString(<App />));
});

app.listen(PORT, error => {
    if (error) {
        return console.error(error);
    }

    console.info(`App is running at http://localhost:${PORT}`);
});
