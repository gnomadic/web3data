import { supabase } from '@/lib/SupabaseClient'; 
import { fetchFlipsideMetrics } from '@/lib/metrics/providers/FlipsideProvider';
import { subDays, parseISO } from 'date-fns';
import dotenv from 'dotenv';
dotenv.config();

const STALE_DAYS = 7;

// import { fetchCsvMetrics } from "./providers/GoogleSheetsProvider";



export async function getMetricsForContract(contractAddress: string, chainId = 84532) {
  const lowerContract = contractAddress.toLowerCase();
  const project = lowerContract; // or use a slug mapping system

  console.log("supabase client: ", supabase.getChannels);

  // Step 1: Try to get latest data from Supabase
  const { data, error } = await supabase
    .from('project_metrics')
    .select('*')
    .eq('contract', lowerContract)
    .eq('chain_id', chainId)
    .eq('project', project)
    .order('date', { ascending: false })
    .limit(1);

  if (error) {
    console.warn('Error fetching from Supabase:', error.message);
  }

  const isStale = (dateString: string) =>
    parseISO(dateString) < subDays(new Date(), STALE_DAYS);

  const recentRow = data?.[0];

  if (recentRow && !isStale(recentRow.date)) {
    return [
      {
        id: 'transactions-180',
        label: 'Transactions (180d)',
        value: Object.entries(recentRow.metrics).map(([k, v]) => [k, v]),
      },
    ];
  }

  // Step 2: Fallback to Flipside
  const freshMetrics = await fetchFlipsideMetrics(lowerContract);

  if (freshMetrics.length === 0) return [];

  // Step 3: Store back in Supabase
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const insert = await supabase.from('project_metrics').upsert({
    project,
    contract: lowerContract,
    chain_id: chainId,
    date: today,
    metrics: Object.fromEntries(freshMetrics[0].value),
    source: 'flipside',
  });

  if (insert.error) {
    console.warn('Error inserting metrics into Supabase:', insert.error.message);
  }

  return freshMetrics;
}


// export async function getMetricsForContract(contractAddress: string) {

//   // const metrics = await fetchFlipsideMetrics(contractAddress);
//   const metrics = await fetchCsvMetrics(contractAddress);
//   return metrics;
// }
