// import { Address } from 'viem';

// export function useCreateProject() {

//   async function createProject(address: Address, name: string, description: string) {
//     // if (!address || !walletClient) throw new Error('Wallet not connected');



//     const metadata = { name, description };
//     const response = await fetch('/api/createProject', {
//       method: 'POST',
//       body: JSON.stringify({
//         metadata,
//         owner: address,
//         chainId: 84532, // Default to Base Sepolia
//       }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     const { metadataCID, signature, timestamp, input, digest, value } = await response.json();

//     return { metadataCID, signature, timestamp, input, digest, value };
//   }

//   return { createProject };
// }


// {metadataCID: 'bafkreig3fsmyzfs3ft2oa2isb6xn6dnfwm7a4xgi4xflnmtwzgpmkayfcm', signature: '0x2fa2b8d443752f869e1a5f2238bc98a136790bd53c9f8757…21ab4cae8b5448cac5409f0eddef3e6b2a41cbfc56a3b9b1b', timestamp: 1750699058, payload: '{"name":"My Project","description":"An amazing thing onchain"}'}
// metadataCID
// : 
// "bafkreig3fsmyzfs3ft2oa2isb6xn6dnfwm7a4xgi4xflnmtwzgpmkayfcm"
// payload
// : 
// "{\"name\":\"My Project\",\"description\":\"An amazing thing onchain\"}"
// signature
// : 
// "0x2fa2b8d443752f869e1a5f2238bc98a136790bd53c9f8757c6b7b735eedf41da7df2570c4f21ed87b21ab4cae8b5448cac5409f0eddef3e6b2a41cbfc56a3b9b1b"
// timestamp
// : 
// 1750699058


import { useState } from 'react';
import { Address } from 'viem';

export function useCreateProject() {
const [returnValue, setReturnValue] = useState<any>(null);

  async function createProject(owner: Address, name: string, description: string) {
    const res = await fetch('/api/createProject', {
      method: 'POST',
      body: JSON.stringify({
        metadata: { name, description },
        owner,
        chainId: 84532, // Base Sepolia
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) throw new Error('Failed to create project');
    const data = await res.json();
    console.log('Project created!', data);
    setReturnValue(data);
    return data;
  }

  return { createProject, returnValue};
}
