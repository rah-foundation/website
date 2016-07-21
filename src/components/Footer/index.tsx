import * as React from 'react';
import {Link} from 'react-router';
import {t, tUrl} from '../../translate';

const style = require('./style');

export default class Footer extends React.Component<{}, {}> {
    render() {
        return (
            <footer className={style.footer}>
                <div className={style.columns}>
                    <div className={style.column}>
                        <h3>صفحات دیگر</h3>
                        <ul>
                            <li>
                                <Link to='/'>{t('homePage')}</Link>
                            </li>
                            <li>
                                <Link to={tUrl('faq')}>{t('faq')}</Link>
                            </li>
                        </ul>
                    </div>
                    <div className={style.column}>
                        <h3>درباره ما</h3>
                        <ul>
                            <li>
                                <a href={null}>همکاری با ما </a>
                            </li>
                        </ul>
                    </div>
                    <div className={style.column}>
                        <h3>منابع</h3>
                    </div>
                </div>
            </footer>
        );
    }
}
