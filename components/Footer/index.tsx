import * as React from 'react';
import {Link} from 'react-router';

export default class Footer extends React.Component<{}, {}> {
    render() {
        return (
            <footer>
                <ul>
                    <li>
                        <Link to='/'>{'Home'}</Link>
                    </li>
                    <li>
                        <Link to='/faq'>{'FAQ'}</Link>
                    </li>
                </ul>
            </footer>
        );
    }
}
