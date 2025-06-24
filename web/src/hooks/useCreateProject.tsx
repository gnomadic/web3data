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
        chainId: 84532, //TODO pass this in so not hardcoded to base sepolia
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
