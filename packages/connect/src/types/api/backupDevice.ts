/**
 * Asks device to initiate seed backup procedure
 */
import type { Messages } from '@trezor/transport';
import type { Params, Response } from '../params';

export declare function backupDevice(params?: Params<any>): Response<Messages.Success>;
