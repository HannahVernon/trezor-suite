import { TRANSPORT } from '../../constants';

export interface BridgeInfo {
    version: number[];
    directory: string;
    packages: Array<{
        name: string;
        platform: string[];
        url: string;
        signature?: string;
        preferred?: boolean;
    }>;
    changelog: string;
}

export interface UdevInfo {
    directory: string;
    packages: Array<{
        name: string;
        platform: string[];
        url: string;
        signature?: string;
        preferred?: boolean;
    }>;
}

export interface TransportInfo {
    type: string;
    version: string;
    outdated: boolean;
    bridge?: BridgeInfo;
    udev?: UdevInfo;
}

export type TransportEvent =
    | {
          type: typeof TRANSPORT.START;
          payload: TransportInfo;
      }
    | {
          type: typeof TRANSPORT.ERROR;
          payload: {
              error: string;
              bridge?: BridgeInfo;
              udev?: UdevInfo;
          };
      };
