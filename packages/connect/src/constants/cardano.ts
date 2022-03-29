export {
    CardanoAddressType,
    CardanoCertificateType,
    CardanoNativeScriptHashDisplayFormat,
    CardanoNativeScriptType,
    CardanoPoolRelayType,
    CardanoTxSigningMode,
} from '@trezor/transport/lib/types/messages';

export enum CardanoProtocolMagics {
    mainnet = 764824073,
    testnet = 42,
}

export enum CardanoNetworkIds {
    mainnet = 1,
    testnet = 0,
}
