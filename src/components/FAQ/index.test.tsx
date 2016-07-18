import * as React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';

import FAQ from './';

describe('FAQ', () => {
    it('renders and H1 tag', () => {
        const wrapper = shallow(<FAQ />);
        expect(wrapper.find('h1')).to.have.length(1);
    });
});
