import * as BLOCKCHAIN from './blockchain';
import * as DEVICE from './device';
import * as ERRORS from './errors';
import * as IFRAME from './iframe';
import * as NETWORK from './network';
import * as POPUP from './popup';
import * as TRANSPORT from './transport';
import * as UI from './ui';
import * as CARDANO from './cardano';

export const CORE_EVENT = '@trezor/connect/CORE_EVENT';
export const UI_EVENT = '@trezor/connect/UI_EVENT';
export const DEVICE_EVENT = '@trezor/connect/DEVICE_EVENT';
export const TRANSPORT_EVENT = '@trezor/connect/TRANSPORT_EVENT';
export const RESPONSE_EVENT = '@trezor/connect/RESPONSE_EVENT';
export const BLOCKCHAIN_EVENT = '@trezor/connect/BLOCKCHAIN_EVENT';

export { BLOCKCHAIN, DEVICE, ERRORS, IFRAME, NETWORK, POPUP, TRANSPORT, UI, CARDANO };
