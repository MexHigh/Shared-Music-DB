import Track from "../components/Track"

export async function getEdgeProps() {
    let tracks = JSON.parse(
        await MDB.get("tracks").catch(e => console.log(e))
    )
    return {
        props: {
            tracks: tracks
        },
        revalidate: 10
    }
}

export default function Timeline({ tracks }) {
    console.log("geth")
    return (
        <div>
            {
                Object.entries(tracks).reverse().map(([vId, v]) =>
                    <Track 
                        key={vId}
                        url={v.url}
                        shared_by={v.shared_by}
                        shared_with={v.shared_with}
                        shared_at={v.shared_at}
                        thumbnail={v.thumbnail}
                        title={v.title}
                        artist={v.channelTitle}
                    />
                )
            }
        </div>
    )
}