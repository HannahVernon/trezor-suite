import { BLOCKCHAIN } from '../../constants';
import type {
    ServerInfo,
    BlockEvent,
    FiatRatesEvent,
    NotificationEvent,
} from '@trezor/blockchain-link';
import type { CoinInfo } from '../coinInfo';

export interface BlockchainInfo extends ServerInfo {
    coin: CoinInfo;
    cleanUrl?: string;
    misc?: {
        reserve?: string;
    };
}

export interface BlockchainError {
    coin: CoinInfo;
    error: string;
    code?: string;
}

export type BlockchainBlock = BlockEvent['payload'] & {
    coin: CoinInfo;
};

export interface BlockchainNotification {
    coin: CoinInfo;
    notification: NotificationEvent['payload'];
}

export interface BlockchainFiatRatesUpdate {
    coin: CoinInfo;
    rates: FiatRatesEvent['payload'];
}

export type BlockchainEvent =
    | {
          type: typeof BLOCKCHAIN.CONNECT;
          payload: BlockchainInfo;
      }
    | {
          type: typeof BLOCKCHAIN.ERROR;
          payload: BlockchainError;
      }
    | {
          type: typeof BLOCKCHAIN.BLOCK;
          payload: BlockchainBlock;
      }
    | {
          type: typeof BLOCKCHAIN.NOTIFICATION;
          payload: BlockchainNotification;
      }
    | {
          type: typeof BLOCKCHAIN.FIAT_RATES_UPDATE;
          payload: BlockchainFiatRatesUpdate;
      };
