import * as React from 'react';
import {Link} from 'react-router';
import {t, tUrl} from '../../translate';

const style = require('./style');

export default class Footer extends React.Component<{}, {}> {
    render() {
        return (
            <footer className={style.footer}>
                <ul>
                    <li>
                        <Link to='/'>{t('homePage')}</Link>
                    </li>
                    <li>
                        <Link to={tUrl('faq')}>{t('faq')}</Link>
                    </li>
                </ul>
            </footer>
        );
    }
}
