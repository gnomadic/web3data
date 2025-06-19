import { Metric, MetricConfig, MetricSet, MetricType } from "../types/types";

export class MetricsService {

    private cache: Map<string, { data: Metric; timestamp: number }> = new Map()
    private readonly CACHE_TTL = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

    getMetricForProject(metricType: MetricType, projectId: string, config?: MetricConfig): Metric {
        const cacheKey = `${metricType}-${projectId}`;
        const cachedData = this.cache.get(cacheKey);

        if (cachedData && (Date.now() - cachedData.timestamp) < this.CACHE_TTL) {
            return cachedData.data;
        }

        const metrics = this.fetchMetricsFromAPI(metricType, projectId, config);

        for (const metric of metrics) {
            this.cache.set(cacheKey, { data: metric, timestamp: Date.now() });
        }

        const foundMetric = metrics.find(metric => metric.metricType === metricType);
        if (!foundMetric) {
            throw new Error(`Metric of type ${metricType} for project ${projectId} was not found.`);
        }
        return foundMetric;
    }

    getMetricSetForProject(metricSet: MetricSet, projectId: string): MetricSet {
        const metrics: Metric[] = [];
        const config = metricSet.config;
        metricSet.metrics.forEach((metric) => {
            const metricData = this.getMetricForProject(metric.metricType, projectId, config);
            metrics.push(metricData);
        });
        return { metrics, config };
    }

    private fetchMetricsFromAPI(metricType: MetricType, projectId: string, config?: MetricConfig): Metric[] {
        console.log(`Fetching ${metricType} for project ${projectId}`);
        return [{
            metricType,
            value: Math.floor(Math.random() * 1000) // Random value for simulation
        }];
    }
}
