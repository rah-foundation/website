/// <reference path="typings/index.d.ts" />

import * as React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';
import App from './components/App';

import {routes} from './routes';

const root = document.getElementById('root');

render(<Router history={browserHistory} routes={routes}></Router>, root);