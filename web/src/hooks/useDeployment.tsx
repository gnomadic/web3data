'use client';

import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { Deployments } from '@/lib/deployments';
import { Deployment } from '@/lib/types/types';


const defaultChain = 'anvil';

export const useDeployment = () => {
  const { chain } = useAccount();
  const [deploy, setDeploy] = useState<Deployment>(Deployments[defaultChain]);

  useEffect(() => {
    const chainName = chain?.name.toLowerCase().replaceAll(' ', '') ?? defaultChain;
    console.log('Network Change detected to: ' + chainName);
    const validChain = Deployments.hasOwnProperty(chainName) ? Deployments[chainName] : Deployments[defaultChain] ;
    setDeploy(validChain)
  }, [chain, deploy?.Web3ProjectFactory]);

  // console.log("returning deployment: ", deploy.chain)
  return { deploy };
};
