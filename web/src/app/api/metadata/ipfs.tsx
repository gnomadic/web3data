import { NextResponse } from "next/server";
import { PinataSDK } from "pinata"

const pinata = new PinataSDK({
  pinataJwt: `${process.env.PINATA_JWT}`,
  pinataGateway: `${process.env.NEXT_PUBLIC_GATEWAY_URL}`
})

export async function uploadMetadataToIPFS(request: Request) {
    try {
        const input = await request.json()

        const payload = {
            name: input.name,
            description: input.description,
            signature: input.signature,
        };

        const { cid } = await pinata.upload.public.json(payload);
        const url = await pinata.gateways.public.convert(cid);

        return NextResponse.json(url, { status: 200 });


        // const data = await request.formData();
        // const file: File | null = data.get("file") as unknown as File;
        // const { cid } = await pinata.upload.public.file(file)
        // const url = await pinata.gateways.public.convert(cid);
        // return NextResponse.json(url, { status: 200 });
    } catch (e) {
        console.log(e);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}