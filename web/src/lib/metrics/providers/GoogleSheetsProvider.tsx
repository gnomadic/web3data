import { Address } from 'viem';

import csv from 'csvtojson';


const dataSource = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQRdPEntFTHb_DoS8vfyALQetgCoQruHjnHrZHAaZigDDKFs9qp_QvSlKByjdLWWDeZjbvt9BmIqkTr/pub?output=csv"


type CSV_SNAPSHOT = {
    contract_address: Address,
    date: string,
    transactions: number,
    unique_wallets: number,
    TVL_USD: number,
    revenue_USD: number,
    token_transfers: number,
    new_wallets: number,
    returning_users: number,
    github_commits: number,
    governance_votes: number,
}

export async function fetchCsvMetrics(contract: string) {
    try {


        const rawData = await fetch(dataSource);
        if (!rawData.ok) {
            throw new Error(`Failed to fetch CSV data: ${rawData.statusText}`);
        }
        const csvText = await rawData.text();
        const jsonArray = await csv().fromString(csvText);

        // const jsonArray: CSV_SNAPSHOT[] = await csv().fromStream(await fetch(dataSource));


        console.log("CSV data loaded:", jsonArray);


        // const filePath = path.join(process.cwd(), 'public', 'mock_web3_project_metrics.csv');
        // const fileContent = await fs.readFile(filePath, 'utf-8');


        // const contractFiltered = jsonArray.filter((item: any) => item['contract_address'] == contract);

        // const records = parse(fileContent, {
        //   columns: true,
        //   skip_empty_lines: true,
        // });

        // // Filter rows for this contract address (case-insensitive)
        const filtered : CSV_SNAPSHOT[] = jsonArray.filter(
            (row: CSV_SNAPSHOT) => row.contract_address.toLowerCase() === contract.toLowerCase()
        );

        if (!filtered.length) return [];

        // Group and format into metric objects
        const metrics: (keyof CSV_SNAPSHOT)[] = [
            'transactions',
            'unique_wallets',
            'TVL_USD',
            'revenue_USD',
            'token_transfers',
            'new_wallets',
            'returning_users',
            'github_commits',
            'governance_votes',
        ]

        const grouped: Record<string, (string | number)[][]> = {};
        for (const metric of metrics) {
            grouped[metric] = filtered.map((row) => [
                row.date,
                Number((row as CSV_SNAPSHOT)[metric]),
            ]);
        }

        const allKeys: (keyof CSV_SNAPSHOT)[] = [
            'transactions',
            'unique_wallets',
            'TVL_USD',
            'revenue_USD',
            'token_transfers',
            'new_wallets',
            'returning_users',
            'github_commits',
            'governance_votes',
        ];

        const jsonMetrics: Record<string, { date: string; value: ( string | number ) }[]> = {};

        for (const key of allKeys) {
            jsonMetrics[key] = filtered.map((row) => ({
                date: row.date,
                value: row[key],
            }));
        }

        console.log("JSON Metrics:", jsonMetrics);

        return ({
            id: `metric-csv`,
            label: `alldata`,
            value: jsonMetrics,
        })
    } catch (err) {
        console.error('Failed to load CSV metrics:', err);
        return [];
    }
}
