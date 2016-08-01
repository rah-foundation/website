import * as React from 'react';

export default class Home extends React.Component<{}, {}> {
    render() {
        return (
            <ul>
                <h1>نمونه عکس</h1>
                <img width='400px' src={require('./hero.jpg')} alt="Hero"/>
            </ul>
        );
    }
}
