

export function getThumbnailId(videoLink: string) {
    let videoId = null;
    const regExp = /(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/|)([\w-]{11})(?:\S+)?/i;
    const match = videoLink.match(regExp);
    if (match && match[1]) {
        videoId = match[1]
    }
    return videoId
}