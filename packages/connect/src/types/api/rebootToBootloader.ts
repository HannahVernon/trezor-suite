/**
 * Reboots device (currently only T1 with fw >= 1.10.0) in bootloader mode
 */

import type { Messages } from '@trezor/transport';
import type { Params, Response } from '../params';

export declare function rebootToBootloader(params?: Params<any>): Response<Messages.Success>;
