import * as React from 'react';

const style = require('./style.less');

export default class Header extends React.Component<{}, {}> {
    render() {
        return (
            <header className={style.header}>
                <p>HEADER</p>
            </header>
        );
    }
}
