/// <reference path="../typings/index.d.ts" />

import * as Express from 'express';
import {get as handleGet} from './controller';

const PORT = process.env.PORT || 8088;
export const app = Express();

app.use(Express.static('dist'));
app.get('*', handleGet);

if (require.main === module) {
    app.listen(PORT, (error: Error) => {
        if (error) {
            return console.error(error);
        }

        console.info(`App is running at http://localhost:${PORT}`);
    });
}
