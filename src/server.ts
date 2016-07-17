/// <reference path="../typings/index.d.ts" />

import {match} from 'react-router';
import * as Express from 'express';

import {routes} from './routes';
import renderIndex from './index';

const app = Express();
app.use(Express.static('dist'));
app.get('*', handleGet);

const PORT = process.env.PORT || 8088;
app.listen(PORT, (error: Error) => {
    if (error) {
        return console.error(error);
    }

    console.info(`App is running at http://localhost:${PORT}`);
});

// Exporting this function to be used in dev server
export function handleGet (req: Express.Request, res: Express.Response) {
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
}
