
"use client"
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { getThumbnailId } from "@/lib/getThumbnailId";
import { toast } from "sonner";
import ThumbnailViewer from "./ThumbnailViewer";

export default function DashboardComp() {
    const [videoLink, setVideoLink] = useState('')
    const [loading, setLoading] = useState(false)
    const [thumbnail, setThumbnail] = useState('')

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

    return (
        <div className="w-full p-3 font-brcolage-grotesque">
            <div className="w-full text-center">
                <h1 className="text-2xl font-bold md:text-4xl">Paste Your Youtube Video Link</h1>
                <div className="w-full flex items-center justify-center gap-2">
                    <form onSubmit={handleSubmit} className="w-full md:w-[50%] flex items-center justify-center gap-2">
                        <Input value={videoLink} onChange={(e) => setVideoLink(e.target.value)} type="text" placeholder="Paste Your Youtube Video Link" className="w-full mt-2 p-2 border border-gray-300 rounded-md" />
                        <Button className="mt-2 p-2 bg-black text-white rounded-md">Get Thumbnail</Button>
                    </form>
                </div>
                {loading && <p className="mt-2 text-center animate-pulse text-green-500">Loading...</p>}
                {thumbnail && (
                    <div className="w-full flex items-center justify-center">
                        <ThumbnailViewer thumbnail={thumbnail} />
                    </div>
                )}
            </div>
        </div>
    )
}