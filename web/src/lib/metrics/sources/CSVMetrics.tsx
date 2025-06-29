import { DataSource } from "../APIManager";
import { MetricType } from "../../types/types";

export class CSVMetrics implements DataSource {
    
    getSupportedMetricTypes(): MetricType[] {
        // Add any MetricTypes you want this class to handle
        return [MetricType.GITHUB_STARS, MetricType.GITHUB_FORKS];
    }

    async fetchData(metricType: MetricType): Promise<any> {
        // Return some mock data here
        return [{
            metricType,
            value: Math.floor(Math.random() * 1000) // Random value for simulation
        }];
    }
}
