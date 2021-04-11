import { extractVideoId, getVideoInfosById } from "../../../utils/video"

export default async function Add(event) {
    
    if (event.request.method !== "POST") {
        return new Response(null, {status: 405}) // method not allowed
    }

    // parse request body
    let jsonBody = await event.request.json().catch(e => console.log(e))
    if (!jsonBody) {
        return new Response(JSON.stringify({
            error: "no body supplied"
        }), {status: 400})
    }

    // check for JSON fields
    let { url, shared_by, shared_with } = jsonBody
    if (!url || !shared_by || !shared_with) {
        return new Response(JSON.stringify({
            error: `missing fields in body (want "url", "shared_by" and "shared_with")`
        }), {status: 400})
    }

    // get old tracks object
    let old = JSON.parse(
        await MDB.get("tracks")
    )

    // check if video ID was already submitted
    let vId = extractVideoId(url)
    if (old.hasOwnProperty(vId)) {
        return new Response(JSON.stringify({
            error: "track already submitted"
        }), {status: 409})
    }

    // get video infos from youtube API
    let apiKey = await MDB.get("ytApiKey")
    let vInfos = await getVideoInfosById(vId, apiKey).catch(e => console.log(e))

    // add video ID
    old[vId] = {
        url: url,
        shared_by: shared_by,
        shared_with: shared_with,
        ...vInfos
    }

    // submit new tracks object to KV store
    await MDB.put("tracks", JSON.stringify(old, null, 4))
    return new Response(JSON.stringify({
        created: old[vId]
    }, null, 4), {status: 201})

}