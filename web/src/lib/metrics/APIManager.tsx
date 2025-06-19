import { Metric, MetricConfig, MetricType } from "../types/types";

export interface DataSource {
    getSupportedMetricTypes(): MetricType[];
    fetchData(metricType: MetricType): Promise<any>;
}

export class APIManager {
    private metricToDataSourceMap: Map<MetricType, DataSource>;

    constructor() {
        this.metricToDataSourceMap = new Map();
    }

    public registerDataSource(dataSource: DataSource): void {
        dataSource.getSupportedMetricTypes().forEach((type) => {
            this.metricToDataSourceMap.set(type, dataSource);
        });
    }

    public async fetchMetricData(metricType: MetricType, projectId: string, config?: MetricConfig): Promise<Metric[]> {
        const dataSource = this.metricToDataSourceMap.get(metricType);
        if (!dataSource) {
            throw new Error(`No data source registered for metric type: ${metricType}`);
        }
        return dataSource.fetchData(metricType);
    }
}
