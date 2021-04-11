export function objectResponse(obj, statusCode = 200) {
    return new Response(
        JSON.stringify(obj, null, 4),
        { status: statusCode }
    )
}

export function errorResponse(msg, statusCode = 400) {
    return new Response(
        JSON.stringify({ error: msg }, null, 4),
        { status: statusCode }
    )
}

export function emptyResponse(statusCode = 204) {
    return new Response(
        null,
        { status: statusCode }
    )
}