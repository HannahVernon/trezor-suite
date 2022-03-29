import { DEVICE } from '../../constants';
import { Device } from '../device';

export interface DeviceEvent {
    type:
        | typeof DEVICE.CONNECT
        | typeof DEVICE.CONNECT_UNACQUIRED
        | typeof DEVICE.CHANGED
        | typeof DEVICE.DISCONNECT;
    payload: Device;
}
