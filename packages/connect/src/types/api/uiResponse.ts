import * as UI from '../../constants/ui';
import type { Device } from '../device';
import type { CustomMessageRequest } from '../events/ui';

export interface ReceivePermission {
    type: typeof UI.RECEIVE_PERMISSION;
    payload: {
        granted: boolean;
        remember: boolean;
    };
}

export interface ReceiveConfirmation {
    type: typeof UI.RECEIVE_CONFIRMATION;
    payload: boolean;
}

export interface ReceiveDevice {
    type: typeof UI.RECEIVE_DEVICE;
    payload: {
        device: Device;
        remember: boolean;
    };
}

export interface ReceivePin {
    type: typeof UI.RECEIVE_PIN;
    payload: string;
}

export interface ReceiveWord {
    type: typeof UI.RECEIVE_WORD;
    payload: string;
}

export interface ReceivePassphrase {
    type: typeof UI.RECEIVE_PASSPHRASE;
    payload: {
        save: boolean;
        value: string;
        passphraseOnDevice?: boolean;
    };
}

export interface ReceivePassphraseAction {
    type: typeof UI.INVALID_PASSPHRASE_ACTION;
    payload: boolean;
}

export interface ReceiveAccount {
    type: typeof UI.RECEIVE_ACCOUNT;
    payload?: number;
}

export interface ReceiveFee {
    type: typeof UI.RECEIVE_FEE;
    payload:
        | {
              type: 'compose-custom';
              value: number;
          }
        | {
              type: 'change-account';
          }
        | {
              type: 'send';
              value: string;
          };
}

export type UiResponse =
    | ReceivePermission
    | ReceiveConfirmation
    | ReceiveDevice
    | ReceivePin
    | ReceiveWord
    | ReceivePassphrase
    | ReceivePassphraseAction
    | ReceiveAccount
    | ReceiveFee
    | CustomMessageRequest;

export declare function uiResponse(response: UiResponse): void;
