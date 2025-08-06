
"use client"
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { getThumbnailId } from "@/lib/getThumbnailId";
import { toast } from "sonner";
import ThumbnailViewer from "./ThumbnailViewer";
import { generateuniqueId } from "@/utils/generateUniqueId";
import { useRouter } from "next/navigation";


export default function DashboardComp() {
    const [videoLink, setVideoLink] = useState('')
    const [loading, setLoading] = useState(false)
    const [thumbnail, setThumbnail] = useState('')
    const router = useRouter();
    const [extractedDataLoadingState, setextractedDataLoadingState] = useState({
        startLoading: false,
        extractedText: false,
        imageSegmentation: false,
        extractingLayers: false,
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (videoLink) {
            const videoId = getThumbnailId(videoLink)
            if (!videoId) {
                toast.error("Invalid Video Link")
                return
            }
            setLoading(true)
            getThumbnail(videoId)
        }
    }

    const ExtractData = async () => {
        try {
            setextractedDataLoadingState({
                startLoading: true,
                extractedText: true,
                imageSegmentation: false,
                extractingLayers: false,
            })

            const extractText = await fetch("/api/extract/textextract", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    thumbnailUrl: thumbnail
                })
            })
            const textresponse = await extractText.json()
            if (textresponse.success) {
                console.log(textresponse.textData)
                setextractedDataLoadingState({
                    startLoading: true,
                    extractedText: false,
                    imageSegmentation: true,
                    extractingLayers: false,
                })

                const imageSegmentation = await fetch("/api/extract/imagesegmentation", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        thumbnailUrl: thumbnail
                    })
                })

                const imageSegmentationData = await imageSegmentation.json();

                if (imageSegmentationData.success) {
                    console.log(imageSegmentationData)

                    setextractedDataLoadingState({
                        startLoading: true,
                        extractedText: false,
                        imageSegmentation: false,
                        extractingLayers: true,
                    })

                    const extractedColors = await fetch("/api/extract/extractcolors", {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            thumbnailUrl: thumbnail
                        })
                    })
                    const extractedColorsData = await extractedColors.json()
                    if (extractedColorsData.success) {
                        console.log(extractedColorsData)

                        const uniqueId = generateuniqueId()
                        router.push(`/dashboard/edit/${uniqueId}`)
                    }

                }

            }
        } catch (error) {
            setextractedDataLoadingState({
                startLoading: false,
                extractedText: false,
                imageSegmentation: false,
                extractingLayers: false,
            })
            console.log(error)
            toast.error("Unable to perform your task, Dont worry your credits are not used.")
        }
    }

    function getThumbnail(videoId: string) {
        const maxResImage = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        const img = new Image()
        img.src = maxResImage
        img.crossOrigin = "anonymous"
        img.onload = () => {
            setLoading(false)
            setThumbnail(maxResImage)
            toast.success("Max Resolution Thumbnail Generated Successfully")

        }
        img.onerror = () => {
            const hqImage = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
            const img = new Image()
            img.src = hqImage
            img.crossOrigin = "anonymous"
            img.onload = () => {
                setLoading(false)
                setThumbnail(hqImage)
                toast.success("HQ Thumbnail Generated Successfully")
            }
            img.onerror = () => {
                setLoading(false)
                toast.error("Invalid Video Link")
            }
        }

    }

    function getLoadingState() {
        if (extractedDataLoadingState.startLoading && extractedDataLoadingState.extractedText) {
            return "Extracting text"
        } else if (extractedDataLoadingState.startLoading && extractedDataLoadingState.extractingLayers) {
            return "Extracting Layers"
        } else if (extractedDataLoadingState.startLoading && extractedDataLoadingState.imageSegmentation) {
            return "Image segmentation started"
        } else {
            return "Loading"
        }

    }

    return (
        <div className="w-full p-3 font-brcolage-grotesque relative">

            {extractedDataLoadingState.startLoading && <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-black/70 backdrop-blur-sm z-50">
                <div className="w-[300px] p-6 bg-zinc-900 rounded-2xl flex flex-col items-center justify-center space-y-4 shadow-2xl border border-zinc-700">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-white border-t-transparent"></div>
                    <h1 className="text-white text-lg font-semibold">{getLoadingState()}</h1>
                    <p className="text-zinc-300 text-sm text-center leading-relaxed">Please wait while we complete the operation.</p>
                </div>
            </div>}
            <div className="w-full text-center">
                <h1 className="text-2xl font-bold md:text-4xl">Paste Your Youtube Video Link</h1>
                <div className="w-full flex flex-col items-center justify-center gap-2">
                    <form onSubmit={handleSubmit} className="w-full md:w-[50%] flex items-center justify-center gap-2">
                        <Input value={videoLink} onChange={(e) => setVideoLink(e.target.value)} type="text" placeholder="Paste Your Youtube Video Link" className="w-full mt-2 p-2 border border-gray-300 rounded-md" />
                        <Button className="mt-2 p-2 bg-black text-white rounded-md">Get Thumbnail</Button>

                    </form>
                    {thumbnail && <Button className="bg-blue-400" onClick={ExtractData}>Start Editing</Button>}
                </div>
                {loading && <p className="mt-2 text-center animate-pulse text-black">Loading...</p>}
                {thumbnail && (
                    <div className="w-full flex items-center justify-center">
                        <ThumbnailViewer thumbnail={thumbnail} />
                    </div>
                )}
            </div>
        </div>
    )
}