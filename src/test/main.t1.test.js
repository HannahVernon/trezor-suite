import { getLatestSafeFw } from 'main';

import T1MOCK from 'test/mocks/T1.json';

describe('Get latest safe firmware', () => {
    // no firmware at all
    it('NO firmware in bootloader [1, 6, 0]', () => {
        const TEST_MOCK = T1MOCK;
        const result = getLatestSafeFw({
            releasesList: TEST_MOCK,
            isInBootloader: true,
            firmwareVersion: null,
            bootloaderVersion: [1, 6, 0],
        });

        expect(result.version).toEqual([1, 7, 1]);
    });

    it('NO firmware in bootloader [1, 5, 1]', () => {
        const TEST_MOCK = T1MOCK;
        const result = getLatestSafeFw({
            releasesList: TEST_MOCK,
            isInBootloader: true,
            firmwareVersion: null,
            bootloaderVersion: [1, 5, 1],
        });

        expect(result.version).toEqual([1, 7, 1]);
    });

    it('NO firmware in bootloader [1, 4, 0]', () => {
        const TEST_MOCK = T1MOCK;
        const result = getLatestSafeFw({
            releasesList: TEST_MOCK,
            isInBootloader: true,
            firmwareVersion: null,
            bootloaderVersion: [1, 4, 0],
        });

        expect(result.version).toEqual([1, 6, 3]);
    });

    it('NO firmware in bootloader [1, 7, 2]', () => {
        const TEST_MOCK = T1MOCK;
        const result = getLatestSafeFw({
            releasesList: TEST_MOCK,
            isInBootloader: true,
            firmwareVersion: null,
            bootloaderVersion: [1, 7, 2],
        });

        expect(result.version).toEqual([1, 6, 3]);
    });


    // bootloader mode

    // it('bump firmware version from 1.3.6 to 1.4.0', () => {
    //     const TEST_MOCK = T1MOCK;
    //     const result = getLatestSafeFw({
    //         releasesList: TEST_MOCK,
    //         isInBootloader: true,
    //         firmwareVersion: null,
    //         bootloaderVersion: [1, 0, 0],
    //         score: null,
    //     });

    //     expect(result.version).toEqual([1, 4, 0]);
    // });


    // // NOT bootloader mode

    // it('bump firmware version from 1.6.3 to 1.7.1', () => {
    //     const TEST_MOCK = T1MOCK;
    //     const result = getLatestSafeFw({
    //         releasesList: TEST_MOCK,
    //         isBootloader: false,
    //         firmwareVersion: [1, 6, 3],
    //         bootloaderVersion: null,
    //         score: null,
    //     });

    //     expect(result.version).toEqual([1, 7, 1]);
    // });
});
