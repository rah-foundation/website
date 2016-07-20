import * as React from 'react';
import {Link} from 'react-router';
import {t} from '../../translate';

const style = require('./style.less');

export default class FAQ extends React.Component<{}, {}> {
    render() {
        return (
            <div className={style.faq}>
                <h1>{t('faq')}</h1>
            </div>
        );
    }
}
