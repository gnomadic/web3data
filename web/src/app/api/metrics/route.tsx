import { NextRequest, NextResponse } from 'next/server';
import { getMetricsForContract } from '@/lib/metrics/DataService';

export async function GET(request: NextRequest) {


      const address = request.nextUrl.searchParams.get('address');

        console.log('Metrics request for address:', address);


    if (!address) {
        return NextResponse.json({ error: 'Address parameter is required' }, { status: 400 });
    }
    // console.log('Metrics request for address:', address);


    try {
        const metrics = await getMetricsForContract(address);
        return NextResponse.json({ metrics });
    } catch (error) {
        console.error('Metrics error:', error);
        return NextResponse.json({ error: 'Failed to load metrics' }, { status: 500 });
    }
}
