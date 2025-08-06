import { NextRequest, NextResponse } from "next/server";
import { createWorker } from 'tesseract.js';

export async function POST(request: NextRequest) {

    const { thumbnailUrl } = await request.json()

    if (!thumbnailUrl) {
        return NextResponse.json({
            message: "Please send the thumbnail url"
        })
    }

    const response = await fetch(thumbnailUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch thumbnail');
    }

    const imageBuffer = await response.arrayBuffer()
    const createworker = await createWorker("eng")
    const { data } = await createworker.recognize(Buffer.from(imageBuffer))
    const { text} = data;
    console.log(data)
    await createworker.terminate();

    return NextResponse.json({
        success: true,
        textData: text
    })

}