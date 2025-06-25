import { useQuery } from '@tanstack/react-query';

async function fetchData<T>(contract: string): Promise<T> {
    console.log("getting metrics");
    // const response = await fetch(`https://ipfs.io/ipfs/${cid}`);

    const response = await fetch('/api/metrics/0x1234...');
    const data = await response.json();
    console.log(data.metrics);

    console.log("got metrics");
    if (!response.ok) {
        throw new Error('Error fetching metric data');
    }
    return response.json() as Promise<T>;
}

export default function useGetMetricData<T = any>(contract: string | undefined) {
    if (!contract) {
        console.log("no contract provided, returning empty query");
        return useQuery<T, Error>({
            queryKey: ['Metrics_undefined'],
            queryFn: () => Promise.resolve('' as unknown as T),
            // staleTime: process.env.CACHE_TTL ? Number(process.env.CACHE_TTL) : 1000 * 60 * 60 * 24, 
            //TODO stale time
        });
    }

    return useQuery<T, Error>({
        queryKey: ['metrics_' + contract],
        queryFn: () => fetchData<T>(contract),
        // staleTime: process.env.CACHE_TTL ? Number(process.env.CACHE_TTL) : 1000 * 60 * 60 * 24,
    });
}
