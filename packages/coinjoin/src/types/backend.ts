import type { Network } from '@trezor/utxo-lib';
import type {
    Address,
    Utxo,
    Transaction,
    AccountAddresses,
    AccountInfo as AccountInfoBase,
    EnhancedVinVout,
} from '@trezor/blockchain-link/lib/types';
import type {
    Transaction as BlockbookTransaction,
    VinVout,
} from '@trezor/blockchain-link/lib/types/blockbook';

import type { CoinjoinBackendClient } from '../backend/CoinjoinBackendClient';
import type { MempoolController } from '../backend/CoinjoinMempoolController';

export type { BlockbookTransaction, VinVout, EnhancedVinVout };
export type { Address, Utxo, Transaction, AccountAddresses };

export type BlockbookBlock = {
    height: number;
    txs: BlockbookTransaction[];
};

export type BlockFilter = {
    blockHeight: number;
    blockHash: string;
    filter: string;
    prevHash: string;
    blockTime: number;
};

export type BlockFilterResponse = {
    bestHeight: number;
    filters: BlockFilter[];
};

type MethodContext = {
    client: CoinjoinBackendClient;
    network: Network;
    abortSignal?: AbortSignal;
};

type ScanContext<T> = MethodContext & {
    filters: FilterController;
    mempool: MempoolController;
    onProgress: (progress: T) => void;
};

export type ScanAddressContext = ScanContext<ScanAddressProgress>;

export type ScanAccountContext = ScanContext<ScanAccountProgress>;

export type ScanAddressCheckpoint = {
    blockHash: string;
    blockHeight: number;
};

export type ScanAccountCheckpoint = ScanAddressCheckpoint & {
    receiveCount: number;
    changeCount: number;
};

export type ScanProgressInfo = {
    progress?: number;
    message?: string;
};

type ScanProgress<T> = {
    checkpoint: T;
    transactions: Transaction[];
    info?: ScanProgressInfo;
};

export type ScanAddressProgress = ScanProgress<ScanAddressCheckpoint>;

export type ScanAccountProgress = ScanProgress<ScanAccountCheckpoint>;

export type ScanAccountParams = {
    descriptor: string;
    checkpoint?: ScanAccountCheckpoint;
    cache?: AccountCache;
};

export type ScanAddressParams = {
    descriptor: string;
    checkpoint?: ScanAddressCheckpoint;
};

export type ScanAccountResult = {
    pending: Transaction[];
    checkpoint: ScanAccountCheckpoint;
    cache?: AccountCache;
};

export type ScanAddressResult = {
    pending: Transaction[];
    checkpoint: ScanAddressCheckpoint;
};

export type FilterControllerParams = {
    fromHash?: string;
    batchSize?: number;
};

export type FilterControllerContext = {
    abortSignal?: AbortSignal;
};

type IteratedBlockFilter = BlockFilter & {
    progress?: number;
};

export interface FilterController {
    getFilterIterator(
        params?: FilterControllerParams,
        context?: FilterControllerContext,
    ): AsyncGenerator<IteratedBlockFilter>;
}

export type FilterClient = Pick<CoinjoinBackendClient, 'fetchFilters'>;

export type MempoolClient = Pick<CoinjoinBackendClient, 'fetchMempoolTxids' | 'fetchTransaction'>;

export type AccountInfo = AccountInfoBase & {
    utxo: Utxo[];
};

export type PrederivedAddress = Pick<Address, 'address' | 'path'>;

export type AccountAddress = PrederivedAddress & {
    script: Buffer;
};

export type AccountCache = {
    receivePrederived?: PrederivedAddress[];
    changePrederived?: PrederivedAddress[];
};
