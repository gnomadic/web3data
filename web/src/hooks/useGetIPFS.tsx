import { useQuery } from '@tanstack/react-query';

async function fetchIPFSData<T>(cid: string): Promise<T> {
    console.log("getting ipfs");
    const response = await fetch(`https://ipfs.io/ipfs/${cid}`);
    console.log("got ipfs");
    if (!response.ok) {
        throw new Error('Error fetching IPFS data');
    }
    return response.json() as Promise<T>;
}

export default function useGetIPFS<T = any>(cid: string | undefined) {
    if (!cid) {
        console.log("no cid provided, returning empty query");
        return useQuery<T, Error>({
            queryKey: ['Activities_undefined'],
            queryFn: () => Promise.resolve('' as unknown as T),
            // staleTime: process.env.CACHE_TTL ? Number(process.env.CACHE_TTL) : 1000 * 60 * 60 * 24,
        });
    }

    return useQuery<T, Error>({ 
        queryKey: ['Activities_' + cid], 
        queryFn: () => fetchIPFSData<T>(cid),
        // staleTime: process.env.CACHE_TTL ? Number(process.env.CACHE_TTL) : 1000 * 60 * 60 * 24,
    });
}
