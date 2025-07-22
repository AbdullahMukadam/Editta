
export default function ThumbnailViewer({ thumbnail }: { thumbnail: string }) {
    return (
        <div className="md:w-[80%] w-full flex items-center justify-center mt-2 border-2">
            <img src={thumbnail} alt="Thumbnail" className="w-full" />
        </div>
    )
}