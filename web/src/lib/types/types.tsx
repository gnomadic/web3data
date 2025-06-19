export interface Metric {
    metricType: MetricType;
    value: number;
}

export interface MetricSet {
    metrics: Metric[];
    config?: MetricConfig | undefined;
}

export interface MetricConfig {
    timeframe? : string | undefined;
}

// export interface DataSource {

// }

export enum MetricType {
    USERS = 'USERS',
    TRANSACTIONS = 'TRANSACTIONS',
    TVL = 'TVL',
    GITHUB_STARS = 'GITHUB_STARS',
    GITHUB_FORKS = 'GITHUB_FORKS',
}
