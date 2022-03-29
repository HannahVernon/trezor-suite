/**
 * Resets device to factory defaults and removes all private data.
 */

import type { Messages } from '@trezor/transport';
import type { Params, Response } from '../params';

export declare function wipeDevice(params?: Params<any>): Response<Messages.Success>;
