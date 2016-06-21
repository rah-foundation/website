import * as React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import FAQ from './components/FAQ';

export const routes = [
    <Route path='/' component={App} >
        <IndexRoute component={Home} />
        <Route path='FAQ' component={FAQ} />
    </Route>
];