import { Flipside } from '@flipsidecrypto/sdk';
import dotenv from 'dotenv';
dotenv.config();

const FLIPSIDE_API_KEY = process.env.FLIPSIDE_API_KEY;

if (!FLIPSIDE_API_KEY) {
  throw new Error('FLIPSIDE_API_KEY is not defined in the environment variables');
}

const flipside = new Flipside(FLIPSIDE_API_KEY);

export async function fetchFlipsideMetrics(contract: string) {

  const USE_FLIPSIDE = process.env.USE_FLIPSIDE;

  if (!USE_FLIPSIDE || USE_FLIPSIDE.toLowerCase() !== 'true') {
    console.warn('Flipside metrics are disabled. Set USE_FLIPSIDE to "true" to enable.');
    return [{
      id: 'transactions-180',
      label: 'Transactions (180d)',
      value: [
        ['2025-05-16T15:31:49.000Z', 2],
        ['2025-05-16T15:46:03.000Z', 3],
        ['2025-05-16T18:23:19.000Z', 4],
        ['2025-05-16T15:49:13.000Z', 6],
        ['2025-05-16T15:30:55.000Z', 7],
        ['2025-05-16T18:24:25.000Z', 9],
        ['2025-05-16T18:05:37.000Z', 11],
        ['2025-05-16T18:19:57.000Z', 12],
        ['2025-05-16T15:47:37.000Z', 13],
        ['2025-05-16T18:19:49.000Z', 16],
        ['2025-05-16T18:19:33.000Z', 17],
        ['2025-05-16T18:03:27.000Z', 18],
        ['2025-05-17T16:49:51.000Z', 0],
        ['2025-05-17T16:49:01.000Z', 1],
        ['2025-05-17T16:49:57.000Z', 5],
        ['2025-05-17T16:49:29.000Z', 8],
        ['2025-05-17T16:50:03.000Z', 10],
        ['2025-05-17T16:49:37.000Z', 15],
        ['2025-05-18T07:12:53.000Z', 14],
      ]
    }];


  }

  const query = `
    SELECT BLOCK_TIMESTAMP as tx_over_180d
    FROM base.core.fact_transactions
    WHERE TO_ADDRESS = LOWER('${contract}')
    AND block_timestamp >= DATEADD('DAY', -180, CURRENT_DATE);
  `;

  const result = await flipside.query.run({ sql: query });

  if (!result || !result.rows || result.rows.length === 0) return [];
  // console.log('Flipside result:', result.rows);

  return [
    {
      id: 'transactions-180',
      label: 'Transactions (180d)',
      value: result.rows,
    },
  ];
}
