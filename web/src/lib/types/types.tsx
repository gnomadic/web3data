import { Address, Chain, Transport } from "viem";
import { DAOIP5ProjectMetadata } from "./daoipTypes";
import { z } from 'zod';

export type Web3Project = {
    projectAddress: Address;
    metadata?: DAOIP5ProjectMetadata | undefined;
    timestamp: bigint;
    metadataCID: string;
    contracts?: Address[] | undefined;
    // ownerAddress: Address;
    // name: string;
}

export type CreateProjectResponse = {
    metadataCID: string;
    signature: string;
    timestamp: number;
    payload: {
        verifiableData: string;
        owner: Address;
        timestamp: number;
    };
}



export type Deployment = {
    Web3ProjectFactory: Address;
    scan?: string | undefined;
    viemChain: Chain;
    viemTransport: Transport;
    chainId: number;
}

// export type ProjectMetadata = {
//     name: string;
//     description: string;
//     contracts: Address[];
// }

export type MetadataRawPayload = {
    metadata: string;
    owner: Address;
    timestamp: bigint;
    contracts: Address[];
}

export type BatchIPFSResponse = {
    content: MetadataRawPayload[],
    cids: string[]
}

export type MetricPoint = { date: string; value: string | number };



export interface Metric {
    metricType: MetricType;
    value: number;
}

export interface MetricSet {
    metrics: Metric[];
    config?: MetricConfig | undefined;
}

export interface MetricConfig {
    timeframe?: "7d" | "30d" | "90d" | "1y" | "all";
}

// export interface DataSource {

// }

export enum MetricType {
    USERS = 'USERS',
    TRANSACTIONS = 'TRANSACTIONS',
    TVL = 'TVL',
    GITHUB_STARS = 'GITHUB_STARS',
    GITHUB_FORKS = 'GITHUB_FORKS',
}


export const MetricInputSchema = z.object({
  project: z.string(),
  contract: z.string().toLowerCase(),
  chain_id: z.number(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  metrics: z.record(z.union([z.number(), z.string()])),
  source: z.string().optional(),
});
