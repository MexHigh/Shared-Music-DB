export default class Tracks {

    constructor() {
        this._t = null // list of tracks
    }

    async load() {
        let r = await MDB.get("tracks")
        this._t = JSON.parse(r)
    }

    async add(track) {

    }

    async remove(track) {

    }

    async list() {
        return this._t
    }

}