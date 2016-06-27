import * as React from 'react';
import {Link} from 'react-router';

import * as style from './style.css';

export default class FAQ extends React.Component<{}, {}> {
    render() {
        return (
            <div className={style.faq}>
                <h1>FAQ</h1>
            </div>
        );
    }
}
