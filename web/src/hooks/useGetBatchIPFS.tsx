import { useQuery } from '@tanstack/react-query';

async function fetchIPFSBatchData<T>(cids: string): Promise<T> {
    if (!cids || cids.length === 0) {
        console.log("no cids provided, returning empty query");
        return '' as unknown as T;
    }
    console.log("getting ipfs batch");
    const response = await fetch(`/api/ipfs?cids=${cids}`);
    console.log("got ipfs batch");


    
    if (!response.ok) {
        throw new Error('Error fetching IPFS data');
    }
    const result = await response.json();
    return result as T;
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useGetBatchIPFS<T = any>(cid: string[] | undefined) {
    const cids = Array.isArray(cid) ? cid.join(',') : cid;

    return useQuery<T, Error>({ 
        queryKey: ['Activities', cids], 
        queryFn: () => (cids && cids.length > 0 ? fetchIPFSBatchData<T>(cids) : Promise.resolve('' as unknown as T)),
        staleTime: 1000 * 60 * 60 * 24, //TODO staletime
        enabled: !!cids
    });
}
