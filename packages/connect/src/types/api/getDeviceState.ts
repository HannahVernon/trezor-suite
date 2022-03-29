/**
 * Retrieves device state associated with passphrase.
 */

import type { Params, Response } from '../params';

export interface DeviceStateResponse {
    state: string;
}

export declare function getDeviceState(params?: Params<any>): Response<DeviceStateResponse>;
