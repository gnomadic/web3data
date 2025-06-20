import { http, createConfig } from 'wagmi'
import { goChain, localhost, mainnet, sepolia, anvil } from 'wagmi/chains'

export const config = createConfig({
  chains: [mainnet, sepolia, anvil],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [anvil.id]: http(),
  },
})