import { BlockchainAccountBalanceHistory } from '@trezor/connect';
import { NetworkSymbol } from '@suite-common/wallet-config';
import { FiatRates } from '@trezor/blockchain-link';

export interface AccountHistoryWithBalance extends BlockchainAccountBalanceHistory {
    balance: string;
}

export type GraphRange =
    | {
          label: 'day' | 'week' | 'month' | 'year' | 'range';
          startDate: Date;
          endDate: Date;
          groupBy: 'month' | 'day';
      }
    | {
          label: 'all';
          startDate: null;
          endDate: null;
          groupBy: 'month' | 'day';
      };

export type GraphTicksInterval = 'month' | 'day' | '2-day';
export interface CommonAggregatedHistory {
    time: number;
    txs: number;
    sent: string | undefined;
    received: string | undefined;
    balance: string | undefined;
    balanceFiat: { [k: string]: string | undefined };
    sentFiat: { [k: string]: string | undefined };
    receivedFiat: { [k: string]: string | undefined };
}
// export interface AggregatedAccountHistory extends CommonAggregatedHistory {
//     sent: string;
//     received: string;
// }
// export interface AggregatedDashboardHistory extends CommonAggregatedHistory {
//     sent?: never;
//     received?: never;
// }
export interface AggregatedAccountHistory extends CommonAggregatedHistory {
    balance: string;
    sent: string;
    received: string;
}
export type AggregatedDashboardHistory = CommonAggregatedHistory;

export type GraphScale = 'linear' | 'log';

export interface AccountIdentifier {
    descriptor: string;
    deviceState: string;
    symbol: NetworkSymbol;
}

export interface GraphData {
    account: AccountIdentifier;
    error: boolean;
    isLoading: boolean;
    data: AccountHistoryWithBalance[];
}

export interface LineGraphPoint {
    value: number;
    date: Date;
}

// graph does not show when dates do not follow each other from the unix epoch
// so this will workaround showing actual dates
export type ExtendedGraphPoint = {
    originalDate: Date;
} & LineGraphPoint;

export type LineGraphTimeFrameValues = 'hour' | 'day' | 'week' | 'month' | 'year' | 'all';

export type LineGraphTimeFrameConfiguration = {
    shortcut: string;
    value: LineGraphTimeFrameValues;
    stepInMinutes?: number;
    valueBackInMinutes?: number;
};

export type LineGraphTimeFrameItems = Record<
    LineGraphTimeFrameValues,
    LineGraphTimeFrameConfiguration
>;

export interface LineGraphTimeFrameItemAccountBalance {
    time: number;
    rates: FiatRates;
    balance?: string;
    fiatCurrencyRate?: number;
    source?:
        | 'FiatRatesForTimeFrame'
        | 'BalanceHistoryInRange'
        | 'BalanceAtStartOfRange'
        | 'GeneratedTimeFrame';
    descriptor?: string;
}

export type LineGraphTimeFrameIntervalPoint = Omit<
    LineGraphTimeFrameItemAccountBalance,
    'rates' | 'descriptor'
>;

export type GraphDataSource = 'dashboard' | 'account';
