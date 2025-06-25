import { fetchFlipsideMetrics } from '@/lib/metrics/providers/FlipsideProvider';

export async function getMetricsForContract(contractAddress: string) {
  const metrics = await fetchFlipsideMetrics(contractAddress);
  return metrics;
}
