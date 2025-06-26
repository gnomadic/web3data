import { PinataSDK } from "pinata"

const pinata = new PinataSDK({
  pinataJwt: `${process.env.PINATA_JWT}`,
  pinataGateway: `${process.env.NEXT_PUBLIC_GATEWAY_URL}`
})

type IPFSPayload = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata: any;
  signature: string;
  timestamp: number;
};

export async function uploadWeb3ProjectToIPFS(payload: IPFSPayload) {
        const { cid } = await pinata.upload.public
        .json(payload)
        .name(`web3-project-${payload.metadata.name}`)
        .group("ace05dd8-34c2-46e6-a6bc-fbc4d7179797");

        return cid; 
}
