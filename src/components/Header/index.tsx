import * as React from 'react';
import * as classnames from 'classnames';
import {Link} from 'react-router';
import {t, tUrl} from '../../translate';

const style = require('./style.less');
const hamburgerMenuImage = require('./images/hamburger.svg');

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
                        <img src={hamburgerMenuImage} alt={t('menu')} />
                    </div>
                    <Link to='/'>
                        <div className={style.logo} alt={t('title')}></div>
                    </Link>
                </div>
                <nav>
                    <ul className={classnames(style.menuItems, this.state.hamburgerMenuIsOpen ? style.menuItemsOpen : null)}>
                        <li>
                            <Link to={tUrl('everything at a glance')}>
                                {t('everything at a glance')}
                            </Link>
                        </li>
                        <li>
                            <Link to={tUrl('infectious diseases')}>
                                {t('infectious diseases')}
                            </Link>
                        </li>
                        <li>
                            <Link to={tUrl('events')}>
                                {t('events')}
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
}
