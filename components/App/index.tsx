import * as React from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default class App extends React.Component<{}, {}> {
    render() {
        return (
            <html doctype='html'>
                <head>
                    <title>Ctrl+S</title>
                </head>
                <body>
                    <Header />
                    <Footer />
                </body>
            </html>
        );
    }
}
