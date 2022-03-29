import * as CONSTANTS from '../../constants';

import * as Blockchain from '../events/blockchain';
import * as Device from '../events/device';
import * as Events from '../events/ui';
import * as Transport from '../events/transport';

export declare function on(
    type: typeof CONSTANTS.DEVICE_EVENT,
    cb: (event: Device.DeviceEvent & { event: typeof CONSTANTS.DEVICE_EVENT }) => void,
): void;
export declare function on(
    type: typeof CONSTANTS.TRANSPORT_EVENT,
    cb: (event: Transport.TransportEvent & { event: typeof CONSTANTS.TRANSPORT_EVENT }) => void,
): void;
export declare function on(
    type: typeof CONSTANTS.UI_EVENT,
    cb: (event: Events.UiEvent & { event: typeof CONSTANTS.UI_EVENT }) => void,
): void;
export declare function on(
    type: typeof CONSTANTS.BLOCKCHAIN_EVENT,
    cb: (event: Blockchain.BlockchainEvent & { event: typeof CONSTANTS.BLOCKCHAIN_EVENT }) => void,
): void;
export declare function on(type: Events.MessageWithoutPayload['type'], cb: () => void): void;
export declare function on(
    type: Events.DeviceMessage['type'],
    cb: (event: Events.DeviceMessage['payload']) => void,
): void;
export declare function on(
    type: Events.ButtonRequestMessage['type'],
    cb: (event: Events.ButtonRequestMessage['payload']) => void,
): void;
export declare function on(
    type: Events.AddressValidationMessage['type'],
    cb: (event: Events.AddressValidationMessage['payload']) => void,
): void;
export declare function on(
    type: Events.RequestPermission['type'],
    cb: (event: Events.RequestPermission['payload']) => void,
): void;
export declare function on(
    type: Events.RequestConfirmation['type'],
    cb: (event: Events.RequestConfirmation['payload']) => void,
): void;
export declare function on(
    type: Events.UnexpectedDeviceMode['type'],
    cb: (event: Events.UnexpectedDeviceMode['payload']) => void,
): void;
export declare function on(
    type: Events.FirmwareException['type'],
    cb: (event: Events.FirmwareException['payload']) => void,
): void;
export declare function on<R>(
    type: typeof CONSTANTS.UI.BUNDLE_PROGRESS,
    cb: (event: Events.BundleProgress<R>['payload']) => void,
): void;
export declare function on(
    type: Events.FirmwareProgress['type'],
    cb: (event: Events.FirmwareProgress['payload']) => void,
): void;
export declare function on(
    type: Events.CustomMessageRequest['type'],
    cb: (event: Events.CustomMessageRequest['payload']) => void,
): void;
