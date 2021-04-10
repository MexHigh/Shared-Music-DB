function getVideoID(url) {
    let splat = url.split("v=")[1].split("&")[0]
    return splat
}