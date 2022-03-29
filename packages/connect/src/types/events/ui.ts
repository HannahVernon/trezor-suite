/*
 * messages to UI emitted as UI_EVENT
 */

import type { Messages } from '@trezor/transport';
import { UI, IFRAME, POPUP } from '../../constants';
import type { ConnectSettings } from '../settings';
import type { Device } from '../device';
import type { DiscoveryAccountType, DiscoveryAccount, SelectFeeLevel } from '../account';
import type { CoinInfo, BitcoinNetworkInfo } from '../coinInfo';
import type { TransportInfo } from './transport';

export interface MessageWithoutPayload {
    type:
        | typeof UI.REQUEST_UI_WINDOW
        | typeof POPUP.CANCEL_POPUP_REQUEST
        | typeof POPUP.LOADED
        | typeof UI.TRANSPORT
        | typeof UI.CHANGE_ACCOUNT
        | typeof UI.INSUFFICIENT_FUNDS
        | typeof UI.CLOSE_UI_WINDOW
        | typeof UI.LOGIN_CHALLENGE_REQUEST;
    payload?: typeof undefined;
}

export type DeviceMessage =
    | {
          type: typeof UI.REQUEST_PIN;
          payload: {
              device: Device;
              type: Messages.PinMatrixRequestType;
          };
      }
    | {
          type: typeof UI.REQUEST_WORD;
          payload: {
              device: Device;
              type: Messages.WordRequestType;
          };
      }
    | {
          type:
              | typeof UI.INVALID_PIN
              | typeof UI.REQUEST_PASSPHRASE_ON_DEVICE
              | typeof UI.REQUEST_PASSPHRASE
              | typeof UI.INVALID_PASSPHRASE;
          payload: {
              device: Device;
              type?: typeof undefined;
          };
      };

export interface ButtonRequestData {
    type: 'address';
    serializedPath: string;
    address: string;
}

// ButtonRequest_FirmwareUpdate is a artificial button request thrown by "uploadFirmware" method
// at the beginning of the uploading process
export interface ButtonRequestMessage {
    type: typeof UI.REQUEST_BUTTON;
    payload: Omit<Messages.ButtonRequest, 'code'> & {
        code?: Messages.ButtonRequest['code'] | 'ButtonRequest_FirmwareUpdate';
        device: Device;
        data?: ButtonRequestData;
    };
}

export interface AddressValidationMessage {
    type: typeof UI.ADDRESS_VALIDATION;
    payload?: ButtonRequestData;
}

export interface IFrameError {
    type: typeof IFRAME.ERROR;
    payload: {
        error: string;
        code?: string;
    };
}

export type IFrameLoaded = {
    type: typeof IFRAME.LOADED;
    payload: {
        useBroadcastChannel: boolean;
    };
};

export interface PopupInit {
    type: typeof POPUP.INIT;
    payload: {
        settings: ConnectSettings; // those are settings from window.opener
        useBroadcastChannel: boolean;
    };
}

export interface PopupError {
    type: typeof POPUP.ERROR;
    payload: {
        error: string;
    };
}

export interface PopupHandshake {
    type: typeof POPUP.HANDSHAKE;
    payload?: {
        settings: ConnectSettings; // those are settings from the iframe, they could be different from window.opener settings
        method?: string;
        transport?: TransportInfo;
    };
}

export interface RequestPermission {
    type: typeof UI.REQUEST_PERMISSION;
    payload: {
        permissions: string[];
        device: Device;
    };
}

export interface RequestConfirmation {
    type: typeof UI.REQUEST_CONFIRMATION;
    payload: {
        view: string;
        label?: string;
        customConfirmButton?: {
            className: string;
            label: string;
        };
        customCancelButton?: {
            className: string;
            label: string;
        };
    };
}

export interface SelectDevice {
    type: typeof UI.SELECT_DEVICE;
    payload: {
        devices: Device[];
        webusb: boolean;
    };
}

export interface UnexpectedDeviceMode {
    type:
        | typeof UI.BOOTLOADER
        | typeof UI.NOT_IN_BOOTLOADER
        | typeof UI.INITIALIZE
        | typeof UI.SEEDLESS
        | typeof UI.DEVICE_NEEDS_BACKUP;
    payload: Device;
}

export interface FirmwareException {
    type:
        | typeof UI.FIRMWARE_OLD
        | typeof UI.FIRMWARE_OUTDATED
        | typeof UI.FIRMWARE_NOT_SUPPORTED
        | typeof UI.FIRMWARE_NOT_COMPATIBLE
        | typeof UI.FIRMWARE_NOT_INSTALLED;
    payload: Device;
}

export interface SelectAccount {
    type: typeof UI.SELECT_ACCOUNT;
    payload: {
        type: 'start' | 'progress' | 'end';
        coinInfo: CoinInfo;
        accountTypes?: DiscoveryAccountType[];
        defaultAccountType?: DiscoveryAccountType;
        accounts?: DiscoveryAccount[];
        preventEmpty?: boolean;
    };
}

export interface SelectFee {
    type: typeof UI.SELECT_FEE;
    payload: {
        coinInfo: BitcoinNetworkInfo;
        feeLevels: SelectFeeLevel[];
    };
}

export interface UpdateCustomFee {
    type: typeof UI.UPDATE_CUSTOM_FEE;
    payload: {
        coinInfo: BitcoinNetworkInfo;
        feeLevels: SelectFeeLevel[];
    };
}

export interface BundleProgress<R> {
    type: typeof UI.BUNDLE_PROGRESS;
    payload: {
        progress: number;
        response: R;
        error?: string;
    };
}

export interface FirmwareProgress {
    type: typeof UI.FIRMWARE_PROGRESS;
    payload: {
        device: Device;
        progress: number;
    };
}

/*
 * Callback message for CustomMessage method used as sent and received message
 */
export interface CustomMessageRequest {
    type: typeof UI.CUSTOM_MESSAGE_REQUEST;
    payload: {
        type: string;
        message: object;
    };
}

export type UiEvent =
    | MessageWithoutPayload
    | DeviceMessage
    | ButtonRequestMessage
    | PopupHandshake
    | RequestPermission
    | RequestConfirmation
    | SelectDevice
    | UnexpectedDeviceMode
    | SelectAccount
    | SelectFee
    | UpdateCustomFee
    | BundleProgress<any>
    | FirmwareProgress
    | CustomMessageRequest;
