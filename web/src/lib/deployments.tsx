import { Address, http } from 'viem';
import { baseSepolia, localhost, sepolia } from 'viem/chains';
import { Deployment } from './types/types';

export const Deployments: { [key: string]: Deployment } = {
    basesepolia: {
        Web3ProjectFactory: '0x083d7D24fE043fdd63227Ac1f2ED9c58f1cF3eC4',
        scan: "https://sepolia.basescan.org/address/",
        viemChain: baseSepolia,
        viemTransport: http(`https://base-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`),
        chainId: 84532
    },
    web3data: {
        Web3ProjectFactory: '0x0',
        viemChain: localhost,
        viemTransport: http(),
        chainId: 0
    },
};

export function findByChainId(chainId: number): Deployment {
    const found =  Object.values(Deployments).find(deployment => deployment.chainId === chainId);

    return found || Deployments.web3data;
}
