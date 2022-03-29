// API params
export type Params<T> = {
    device?: {
        path: string;
        state?: string;
        instance?: number;
    };
    useEmptyPassphrase?: boolean;
    allowSeedlessDevice?: boolean;
    keepSession?: boolean;
    skipFinalReload?: boolean;
    useCardanoDerivation?: boolean;
} & T;

interface Bundle<T> {
    bundle: T[];
}

export type BundledParams<T> = Params<Bundle<T>>;

export type BlockchainParams<T> = {
    coin: string;
} & T;

export interface Unsuccessful {
    success: false;
    payload: { error: string; code?: string };
}

export interface Success<T> {
    success: true;
    id: number;
    payload: T;
}

export type Response<T> = Promise<Success<T> | Unsuccessful>;
export type BundledResponse<T> = Promise<Success<T[]> | Unsuccessful>;

// Common fields for all *.getAddress methods
export interface GetAddress {
    path: string | number[];
    address?: string;
    showOnTrezor?: boolean;
}

export interface Address {
    address: string;
    path: number[];
    serializedPath: string;
}

// Common fields for all *.getPublicKey methods
export interface GetPublicKey {
    path: string | number[];
    showOnTrezor?: boolean;
}

export interface PublicKey {
    publicKey: string;
    path: number[];
    serializedPath: string;
}
