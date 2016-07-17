import * as React from 'react';
import {Link} from 'react-router';
import {t} from '../../translate';
import * as style from './style.less';

const s = style as any;

export default class FAQ extends React.Component<{}, {}> {
    render() {
        return (
            <div className={s.locals.faq}>
                <h1>{t('faq')}</h1>
            </div>
        );
    }
}
