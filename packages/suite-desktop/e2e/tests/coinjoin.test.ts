/* eslint-disable no-await-in-loop */

import { Page, test as testPlaywright } from '@playwright/test';

import { TrezorUserEnvLink } from '@trezor/trezor-user-env-link';

import { patchBinaries, launchSuite } from '../support/common';
import { sendToAddress, generateBlock, waitForCoinjoinBackend } from '../support/regtest';

const enableCoinjoinInSettings = async (window: Page) => {
    await window.click('[data-test="@suite/menu/settings"]');

    // enable debug
    for (let i = 0; i < 5; i++) {
        await window.click('[data-test="@settings/menu/title"]');
    }

    // go to debug menu
    await window.click('[data-test="@settings/menu/debug"]');

    // change regtest server source to localhost
    await window.click('[data-test="@settings/coinjoin-server-select/input"]', { trial: true });
    await window.click('[data-test="@settings/coinjoin-server-select/input"]');
    await window.click('[data-test="@settings/coinjoin-server-select/option/localhost"]');
    await window.click('[data-test="@settings/debug/coinjoin-allow-no-tor"] >> role=button');

    // go to coins menu
    await window.click('[data-test="@settings/menu/wallet"]');
    await window.click('[data-test="@settings/wallet/network/btc"]'); // disable btc
    await window.click('[data-test="@settings/wallet/network/regtest"]'); // enable regtest

    // open advance settings for regtest
    await window.click('[data-test="@settings/wallet/network/regtest/advance"]');
    await window.click('[data-test="@settings/advance/button/save"]');
};

const startCoinjoin = async (window: Page) => {
    await window.click('role=button[name="Anonymize"]');
    await window.click('[data-test="@coinjoin/checkbox-2"] div >> nth=0');
    await window.click('[data-test="@coinjoin/checkbox-1"]');
    await window.click('role=button[name="Anonymize"]');
    await window.waitForSelector('[data-test="@prompts/confirm-on-device"]');
    await TrezorUserEnvLink.api.pressYes();
    await window.waitForSelector('[data-test="@prompts/confirm-on-device"]');
    await TrezorUserEnvLink.api.pressYes();
    await window.waitForSelector('[data-test="@prompts/confirm-on-device"]');
    await TrezorUserEnvLink.api.pressYes();
};

const addCoinjoinAccount = async (window: Page) => {
    await window.click('[data-test="@suite/menu/wallet-index"]');
    await window.click('[data-test="@account-menu/add-account"]');
    await window.click('[data-test="@settings/wallet/network/regtest"]');
    await window.click('[data-test="@add-account-type/select/input"]', { trial: true });
    await window.click('[data-test="@add-account-type/select/input"]');
    await window.click('[data-test="@add-account-type/select/option/Bitcoin Regtest (PEA)"]');
    await window.click('[data-test="@add-account"]');

    await window.click('[data-test="@request-enable-tor-modal/skip-button"]');

    await window.waitForSelector('[data-test="@prompts/confirm-on-device"]', {
        timeout: 60 * 1000,
    });

    await TrezorUserEnvLink.api.pressYes();
};

testPlaywright.describe('Coinjoin', () => {
    testPlaywright.beforeAll(async () => {
        testPlaywright.setTimeout(1000 * 60);

        // todo: some problems with path in dev and production and tests. tldr tests are expecting
        // binaries somewhere where they are not, so I copy them to that place. Maybe I find a
        // better solution later
        await patchBinaries();

        await TrezorUserEnvLink.api.trezorUserEnvConnect();
        await waitForCoinjoinBackend();
        await TrezorUserEnvLink.api.stopBridge();
        await TrezorUserEnvLink.api.startEmu({ version: '2-master' });
        await TrezorUserEnvLink.api.setupEmu({
            needs_backup: false,
            mnemonic: 'all all all all all all all all all all all all',
        });
    });

    testPlaywright('Prepare prerequisites for coinjoining', async () => {
        testPlaywright.setTimeout(1000 * 60 * 10);

        for (let i = 0; i < 1; i++) {
            // standart wallet
            await sendToAddress({
                amount: '10',
                address: 'bcrt1pl3y9gf7xk2ryvmav5ar66ra0d2hk7lhh9mmusx3qvn0n09kmaghq6gq9fy',
            });
            // passphrase 'a'
            await sendToAddress({
                amount: '10',
                address: 'bcrt1p5jmepqf3mfakvlyxs07nc95qd0gd4uqtxy9hksd9s426xf202z5qpfz8dg',
            });
            await generateBlock();
        }

        const suite = await launchSuite();

        await suite.window.click('[data-test="@onboarding/continue-button"]');
        await suite.window.click('[data-test="@onboarding/exit-app-button"]');

        await suite.window.waitForSelector('[data-test="@dashboard/graph"]');

        await enableCoinjoinInSettings(suite.window);

        // add coinjoin account
        await addCoinjoinAccount(suite.window);

        // start coinjoin
        await startCoinjoin(suite.window);

        // todo: next passphrase

        // await suite.window.click('[data-test="@menu/switch-device"]');
        // await suite.window.click('[data-test="@switch-device/add-hidden-wallet-button"]');
        // await suite.window.waitForSelector('[data-test="@prompts/confirm-on-device"]');
        // await TrezorUserEnvLink.api.pressYes();
        // await suite.window.locator('[data-test="@passphrase/input"]').type('a');
        // await suite.window.click('[data-test="@passphrase/hidden/submit-button"]');
        // await suite.window.waitForSelector('[data-test="@prompts/confirm-on-device"]');
        // await TrezorUserEnvLink.api.pressYes();
        // await suite.window.waitForSelector('[data-test="@prompts/confirm-on-device"]');
        // await TrezorUserEnvLink.api.pressYes();

        // await suite.window.locator('[data-test="@passphrase/input"]').type('a');
        // await suite.window.click('[data-test="@passphrase/confirm-checkbox"] div >> nth=0');
        // await suite.window.click('[data-test="@passphrase/hidden/submit-button"]');
        // await suite.window.waitForSelector('[data-test="@prompts/confirm-on-device"]');
        // await TrezorUserEnvLink.api.pressYes();
        // await suite.window.waitForSelector('[data-test="@prompts/confirm-on-device"]');
        // await TrezorUserEnvLink.api.pressYes();

        // // add coinjoin account
        // await addCoinjoinAccount(suite.window);

        // // start coinjoin
        // await startCoinjoin(suite.window);

        await suite.window.waitForSelector('[data-test="@modal"] >> text=Registering outputs');
        await suite.window.waitForSelector('[data-test="@modal"] >> text=Signing transactions');
    });
});
