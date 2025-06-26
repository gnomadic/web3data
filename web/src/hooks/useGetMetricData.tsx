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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useGetMetricData<T = any>(contract: string | undefined) {
    return useQuery<T, Error>({
        queryKey: ['metrics_' + contract],
        queryFn: () => (contract && contract.length > 0 ? fetchData<T>(contract) : Promise.resolve('' as unknown as T)),
        staleTime: 1000 * 60 * 60 * 24, //TODO staletime
        enabled: !!contract

    });
}
