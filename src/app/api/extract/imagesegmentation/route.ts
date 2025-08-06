import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { thumbnailUrl } = await request.json();

    if (!thumbnailUrl) {
        return NextResponse.json({
            success: false,
            message: "Cound find the thumbnail url"
        })
    }

    const image = await fetch(thumbnailUrl);
    const imageBuffer = await image.arrayBuffer();

    const response = await fetch(
        "https://router.huggingface.co/hf-inference/models/facebook/detr-resnet-50-panoptic",
        {
            headers: {
                Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                "Content-Type": 'application/octet-stream',
            },
            method: "POST",
            body: imageBuffer,
        }
    );

    if (!response.ok) {
        console.log(response)
        throw new Error("Unable to perform Image Segmentation")
    }

    const result = await response.json()

    return NextResponse.json({
        success: true,
        imageSegmentedData: result
    })


}