import type { Params, BundledParams, Response, BundledResponse } from '../params';

export interface EthereumGetAddress {
    path: string | number[];
    address?: string;
    showOnTrezor?: boolean;
}

export interface EthereumAddress {
    address: string;
    path: number[];
    serializedPath: string;
}

export declare function ethereumGetAddress(
    params: Params<EthereumGetAddress>,
): Response<EthereumAddress>;
export declare function ethereumGetAddress(
    params: BundledParams<EthereumGetAddress>,
): BundledResponse<EthereumAddress>;
