import * as React from 'react';
import {Link} from 'react-router';
import {t, tUrl} from '../../translate';

const style = require('./style.less');

export default class Header extends React.Component<{}, {}> {
    render() {
        return (
            <header className={style.header}>
                <div className={style.logo} alt={t('title')}></div>
                <ul className={style.menuItems}>
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
