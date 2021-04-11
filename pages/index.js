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
            <Adder />
            <div className="border border-red-500">
                {
                    Object.entries(tracks).map(([vId, v]) =>
                        <Track 
                            key={vId}
                            url={v.url}  
                        />
                    )
                }
            </div>
        </>
    )
    
}
