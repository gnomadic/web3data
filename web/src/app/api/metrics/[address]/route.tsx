// app/api/metrics/[address]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getMetricsForContract } from '@/lib/metrics/DataService';

export async function GET(
  request: NextRequest,
  { params }: { params: { address: string } }
) {
  const address = params.address.toLowerCase();

  try {
    const metrics = await getMetricsForContract(address);
    return NextResponse.json({ metrics });
  } catch (error) {
    console.error('Metrics error:', error);
    return NextResponse.json({ error: 'Failed to load metrics' }, { status: 500 });
  }
}
