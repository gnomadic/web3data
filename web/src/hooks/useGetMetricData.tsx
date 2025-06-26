import { useQuery } from '@tanstack/react-query';

async function fetchData<T>(contract: string): Promise<T> {
    console.log("getting metrics for contract:", contract);
    const response = await fetch(`/api/metrics?address=${contract}`);

    const data = await response.json();

    console.log(data.metrics);
    console.log("got metrics");

    if (!response.ok) {
        throw new Error('Error fetching metric data');
    }
    return data as T;
}

export default function useGetMetricData<T = any>(contract: string | undefined) {
    if (!contract) {
        console.log("no contract provided, returning empty query");
        return Promise.resolve('' as unknown as T)
    }

    return useQuery<T, Error>({
        queryKey: ['metrics_' + contract],
        queryFn: () => fetchData<T>(contract),
        staleTime: 1000 * 60 * 60 * 24, //TODO staletime
    });
}
