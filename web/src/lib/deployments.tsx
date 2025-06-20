import { Address, http } from 'viem';
import { baseSepolia, localhost, sepolia } from 'viem/chains';
import { Deployment } from './types/types';

export const Deployments: { [key: string]: Deployment } = {
    basesepolia: {
        Web3ProjectFactory: '0x32b60a177838c7c5FEDd5b633890e61c7A731953',
        scan: "https://sepolia.basescan.org/address/",
        viemChain: baseSepolia,
        viemTransport: http(`https://base-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`),
    },
    sepolia: {
        Web3ProjectFactory: '0x0',
        viemChain: sepolia,
        viemTransport: http(`https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`)
    },
    anvil: {
        Web3ProjectFactory: '0x7FA9385bE102ac3EAc297483Dd6233D62b3e1496',
        viemChain: localhost,
        viemTransport: http()
    },
    web3data: {
        Web3ProjectFactory: '0x0',
        viemChain: localhost,
        viemTransport: http()
    },
};
