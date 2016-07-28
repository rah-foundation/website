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
        expect(logs).to.be.empty;
    });
});
