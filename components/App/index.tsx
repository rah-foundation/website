import * as React from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default class App extends React.Component<{}, {}> {
    render() {
        return (
            <div className='app'>
                <Header />
                <main>
                    {this.props.children}
                </main>
                <Footer />
            </div>
        );
    }
}
