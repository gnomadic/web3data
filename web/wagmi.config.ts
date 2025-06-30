import { defineConfig } from '@wagmi/cli';
import { foundry } from '@wagmi/cli/plugins'
import { react } from '@wagmi/cli/plugins'
import { actions } from '@wagmi/cli/plugins'

/** @type {import('@wagmi/cli').Config} */

export default defineConfig({
  out: 'src/generated.ts',
  contracts: [

  ],

  plugins: [
    foundry({
      project: '../chain',
      include: [
        'IWeb3Project.sol/**',
        'Web3Project.sol/**',
        'IWeb3ProjectFactory.sol/**',
        'Web3ProjectFactory.sol/**',
      ],
    }),
    react(),
    actions()
  ],
});
