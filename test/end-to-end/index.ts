import {expect} from 'chai';
import {t} from '../../src/translate';
import {LogEntry} from 'webdriverio';

describe('webdriver.io page', () => {
    it('should have the right title', () => {
        browser.url('/');
        const title = browser.getTitle();
        expect(title).to.equal(t('title'));
    });

    it('should not have any browser errors', () => {
        const allLogs = (browser.log('browser').value as any) as LogEntry[];

        // filter out info logs
        const logs = allLogs.filter(log => log.level.toUpperCase() !== 'INFO');

        // Log errors for debugging
        logs.forEach(log => {
            console.log('');
            console.log('══════════════════════════════════════════════════════════════════════════════');
            console.log(`Log level: ${log.level}`);
            console.log('');
            console.log(log.message);
            console.log('══════════════════════════════════════════════════════════════════════════════');
            console.log('');
        });

        expect(logs).to.be.empty;
    });
});
