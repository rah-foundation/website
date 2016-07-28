import {expect} from 'chai';
import {t} from '../../src/translate';

describe('webdriver.io page', () => {
    it('should have the right title', () => {
        browser.url('/');
        const title = browser.getTitle();
        expect(title).to.equal(t('title'));
    });

    it('should not have any browser errors', () => {
        const logs = browser.log('browser').value;

        // comparing strings for a more verbose output
        expect(JSON.stringify(logs, null, 4)).to.equal('[]');
    });
});
