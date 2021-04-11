import { emptyResponse, errorResponse, objectResponse } from "../../../utils/responses"
import { extractVideoId, getVideoInfosById } from "../../../utils/video"

export default async function Add(event) {
    
    if (event.request.method !== "POST") {
        return emptyResponse(405) // method not allowed
    }

    // parse request body
    let jsonBody = await event.request.json().catch(e => console.log(e))
    if (!jsonBody) {
        return errorResponse("no body supplied")
    }

    // check for JSON fields
    let { url, shared_by, shared_with } = jsonBody
    if (!url || !shared_by || !shared_with) {
        return new errorResponse(`missing fields in body (want "url", "shared_by" and "shared_with")`)
    }

    // get old tracks object
    let old = JSON.parse(
        await MDB.get("tracks")
    )

    // check if video ID was already submitted
    let vId
    try {
        vId = extractVideoId(url)
    } catch (e) {
        return errorResponse("not a video URL")
    }
    if (old.hasOwnProperty(vId)) {
        return errorResponse("track already submitted", 409)
    }

    // get video infos from youtube API
    let apiKey = await MDB.get("ytApiKey")
    let vInfos = await getVideoInfosById(vId, apiKey).catch(e => console.log(e))

    // add video ID
    old[vId] = {
        url: url,
        shared_by: shared_by,
        shared_with: shared_with,
        shared_at: Date.now(),
        ...vInfos
    }

    // submit new tracks object to KV store
    await MDB.put("tracks", JSON.stringify(old, null, 4))
    return objectResponse({ created: old[vId] }, 201)

}