import { useState } from 'react';
import { Address } from 'viem';

export function useCreateProject() {
const [returnValue, setReturnValue] = useState(null);

  async function createProject(owner: Address, chainId: number, payload: string) {
    const res = await fetch('/api/createProject', {
      method: 'POST',
      body: JSON.stringify({
        metadata: payload,
        owner,
        chainId: chainId, //TODO pass this in so not hardcoded to base sepolia
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
