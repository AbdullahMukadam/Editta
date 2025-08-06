import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";



export async function POST(request: NextRequest) {
    try {
        const { thumbnailUrl } = await request.json();

        if (!thumbnailUrl) {
            return NextResponse.json({
                success: false,
                message: "No Thumbnail Url Found"
            })
        }

        const image = await fetch(thumbnailUrl);
        const imageBuffer = await image.arrayBuffer();

        const extractColors = await extractDominateColors(Buffer.from(imageBuffer))

        return NextResponse.json({
            colors: extractColors,
            success: true
        });
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false
        });
    }


}

const extractDominateColors = async (imageBuffer: Buffer): Promise<string[]> => {
    const image = sharp(imageBuffer).resize(100, 100);
    const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });

    const colorMap = new Map<string, number>();
    const { width, height, channels } = info;

    for (let i = 0; i < data.length; i += channels * 4) {
        if (i + 2 < data.length) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            // Group similar colors together (reduces noise)
            const groupedR = Math.round(r / 32) * 32;
            const groupedG = Math.round(g / 32) * 32;
            const groupedB = Math.round(b / 32) * 32;

            const color = `rgb(${groupedR},${groupedG},${groupedB})`;
            colorMap.set(color, (colorMap.get(color) || 0) + 1);
        }
    }

    // Get top 8 colors
    const sortedColors = Array.from(colorMap.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .map(([color]) => color);

    return sortedColors;
}