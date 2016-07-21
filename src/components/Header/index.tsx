import * as React from 'react';
import * as classnames from 'classnames';
import {Link} from 'react-router';
import {t, tUrl} from '../../translate';

const style = require('./style.less');

interface HeaderState {
    hamburgerMenuIsOpen: boolean;
}

export default class Header extends React.Component<{}, HeaderState> {

    constructor() {
        super();
        this.state = {
            hamburgerMenuIsOpen: false
        };
    }

    onHamburgerMenuClicked() {
        this.setState({
            hamburgerMenuIsOpen: !this.state.hamburgerMenuIsOpen
        });
    }

    render() {
        return (
            <header className={style.header}>
                <div className={style.top}>
                    <div className={style.hamburger}
                        onClick={this.onHamburgerMenuClicked.bind(this)}>
                        <svg width="100%" height="100%">
                            <path
                                fill="white"
                                xmlns="http://www.w3.org/2000/svg"
                                d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"
                            />
                        </svg>
                    </div>
                    <div className={style.logo} alt={t('title')}></div>
                </div>
                <nav>
                    <ul className={classnames(style.menuItems, this.state.hamburgerMenuIsOpen ? style.menuItemsOpen : null)}>
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

                </nav>
            </header>
        );
    }
}
