import * as React from 'react';
import {Link} from 'react-router';
import {t} from 'i18next';

export default class Footer extends React.Component<{}, {}> {
    render() {
        return (
            <footer>
                <ul>
                    <li>
                        <Link to='/'>{t('mainPage')}</Link>
                    </li>
                    <li>
                        <Link to='/faq'>{t('faq')}</Link>
                    </li>
                </ul>
            </footer>
        );
    }
}
