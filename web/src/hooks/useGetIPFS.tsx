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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useGetIPFS<T = any>(cid: string | undefined) {
    return useQuery<T, Error>({
        queryKey: ['Activities_' + cid],
        queryFn: () => (cid ? fetchIPFSData<T>(cid) : Promise.resolve('' as unknown as T)),
        staleTime: 1000 * 60 * 60 * 24,  //TODO staletime
        enabled: !!cid
    });
}
