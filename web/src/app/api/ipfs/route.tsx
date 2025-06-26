import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {

    const IPFS_URL = "https://ipfs.io/ipfs/";

    const cids = request.nextUrl.searchParams.get('cids');

    if (!cids || cids.length === 0 ) {
        return NextResponse.json({ error: 'CIDs parameter is required' }, { status: 400 });
    }

    console.log('IPFS request for CIDs:', cids);

    const content = await Promise.all(
        cids.split(',').map(async (cid) => {
            const url = `${IPFS_URL}${cid}`;
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
                }
                const data = await response.json();
                return { cid, data };
            } catch (error) {
                console.error(`Error fetching ${url}:`, error);
                return { cid, error: JSON.stringify(error) };
            }
        })
    );

    const simpleContent = content.map(item => {
        if (!item.error){
            return item.data
        }
});


    console.log('IPFS content fetched:', content);


    return NextResponse.json({
        content: simpleContent,
        cids: cids.split(','),
    }); 


}