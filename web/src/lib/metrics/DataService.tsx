// import { fetchFlipsideMetrics } from '@/lib/metrics/providers/FlipsideProvider';

import { fetchCsvMetrics } from "./providers/GoogleSheetsProvider";

export async function getMetricsForContract(contractAddress: string) {

  // const metrics = await fetchFlipsideMetrics(contractAddress);
  const metrics = await fetchCsvMetrics(contractAddress);
  return metrics;
}
