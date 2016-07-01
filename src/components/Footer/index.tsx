import * as React from 'react';
import {Link} from 'react-router';
import {t} from '../../translate';

export default class Footer extends React.Component<{}, {}> {
    render() {
        return (
            <footer>
                <ul>
                    <li>
                        <Link to='/'>{t('homePage')}</Link>
                    </li>
                    <li>
                        <Link to={encodeURIComponent(t('faq'))}>{t('faq')}</Link>
                    </li>
                </ul>
            </footer>
        );
    }
}
