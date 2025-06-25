import { Flipside } from '@flipsidecrypto/sdk';
import dotenv from 'dotenv';
dotenv.config();

const FLIPSIDE_API_KEY = process.env.FLIPSIDE_API_KEY;

if (!FLIPSIDE_API_KEY) {
  throw new Error('FLIPSIDE_API_KEY is not defined in the environment variables');
}

const flipside = new Flipside(FLIPSIDE_API_KEY);

export async function fetchFlipsideMetrics(contract: string) {

    // SELECT COUNT(DISTINCT tx_from) as active_users_last_7d
    // FROM base.core.ez_eth_transactions
    // WHERE contract_address = LOWER('${contract}')
    //   AND block_timestamp >= DATEADD('DAY', -7, CURRENT_DATE);




  const query = `
    SELECT BLOCK_TIMESTAMP as tx_over_180d
    FROM base.core.fact_transactions
    WHERE TO_ADDRESS = LOWER('${contract}')
    AND block_timestamp >= DATEADD('DAY', -180, CURRENT_DATE);
  `;

  const result = await flipside.query.run({ sql: query });

  if (!result || !result.rows || result.rows.length === 0) return [];

  return [
    {
      id: 'active-users-7d',
      label: 'Active Users (7d)',
      value: result.rows[0][0],
    },
  ];
}
