import { NextResponse, type NextRequest } from "next/server";


export async function POST(request: NextRequest) {
    try {


    } catch (e) {
        console.log(e);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

