import { getVideoID } from "../../../src/utils"

export default async function Add(event) {
    
    if (event.request.method !== "POST") {
        return new Response(null, {status: 405})
    }

    let b = await event.request.json()
    if (!b) {
        return new Response(JSON.stringify({
            error: "no body supplied"
        }), {status: 400})
    }

    let { url, shared_by, shared_with } = b
    if (!url || !shared_by || !shared_with) {
        return new Response(JSON.stringify({
            error: `missing fields in body (want 'url', 'shared_by' and 'shared_with')`
        }), {status: 400})
    }

    let old = JSON.parse(
        await MDB.get("tracks")
    )

    let vId = getVideoID(url)
    if (old.hasOwnProperty(vId)) {
        return new Response(JSON.stringify({
            error: "track already submitted"
        }), {status: 409})
    }

    console.log(vId)

    old[vId] = {
        url: url,
        shared_by: shared_by,
        shared_with: shared_with
    }
    await MDB.put("tracks", JSON.stringify(old))
    return new Response(JSON.stringify({
        created: old[vId]
    }), {status: 201})

}