import { Address } from 'viem';

export function useCreateProject() {

  async function createProject(address: Address, name: string, description: string) {
    // if (!address || !walletClient) throw new Error('Wallet not connected');



    const metadata = { name, description };
    const response = await fetch('/api/createProject', {
      method: 'POST',
      body: JSON.stringify({
        metadata,
        owner: address,
        chainId: 84532, // Default to Base Sepolia
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { metadataCID, signature, timestamp, input, digest, value } = await response.json();

    return { metadataCID, signature, timestamp, input, digest, value };
  }

  return { createProject };
}
