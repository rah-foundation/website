import * as React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import FAQ from './components/FAQ';
import {t} from './translate';

export const routes = [
    <Route path='/' component={App} >
        <IndexRoute component={Home} />
        <Route path={t('faq')} component={FAQ} />
    </Route>
];

