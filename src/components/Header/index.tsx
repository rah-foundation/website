import * as React from 'react';
import {Link} from 'react-router';
import {t, tUrl} from '../../translate';

const logoImage = require('./images/logo.png');
import * as style from './style.less';

export default class Header extends React.Component<{}, {}> {
    render() {
        return (
            <header className={style.header}>
                <div className="logo">
                    <img src={logoImage} alt={t('title')}/>
                </div>
                <ul className="menu-items">
                    <li>
                        <a href={tUrl('everything at a glance')}>
                            {t('everything at a glance')}
                        </a>
                    </li>
                    <li>
                        <a href={tUrl('infectious diseases')}>
                            {t('infectious diseases')}
                        </a>
                    </li>
                    <li>
                        <a href={tUrl('events')}>
                            {t('events')}
                        </a>
                    </li>
                </ul>
            </header>
        );
    }
}
