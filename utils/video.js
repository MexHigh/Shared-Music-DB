export function extractVideoId(url) {
    try {
        let splat = url.split("v=")[1].split("&")[0]
        return splat
    } catch (e) {
        console.log(e.toString())
        return null
    }
}

// this can be spreaded right inside the KV database
export async function getVideoInfosById(id, apiKey) {
    let vInfo = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${apiKey}`, {
        method: "GET"
    })
        .then(r => r.json())
        .catch(e => console.log(e))

    let { title, channelId, channelTitle, publishedAt, thumbnails } = vInfo.items[0].snippet
    let thumbnail = thumbnails.standard.url
    
    return {
        title,
        channelId,
        channelTitle,
        publishedAt,
        thumbnail
    }
}