import * as React from 'react';
import {Link} from 'react-router';
import {t} from '../../translate';
import * as style from './style.less';

export default class FAQ extends React.Component<{}, {}> {
    render() {
        return (
            <div className={style.faq}>
                <h1>{t('faq')}</h1>
                <p>BYYYYYYi!!!!!!</p>
            </div>
        );
    }
}
