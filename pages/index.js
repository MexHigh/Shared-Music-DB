import Adder from "../components/Adder";
import Track from "../components/Track";

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

export default function Index({ tracks }) {
    return (
        <>
            <h1 className="m-4 text-xl font-bold">Shared Music DB</h1>
            <div className="w-2/3 max-w-xl my-10 mx-auto">
                <Adder />
            </div>
            <div>
                {
                    Object.entries(tracks).map(([vId, v]) =>
                        <Track 
                            key={vId}
                            url={v.url}
                            shared_by={v.shared_by}
                            shared_with={v.shared_with}
                            thumbnail={v.thumbnail}
                            title={v.title}
                            artist={v.channelTitle}
                        />
                    )
                }
            </div>
        </>
    )
    
}
