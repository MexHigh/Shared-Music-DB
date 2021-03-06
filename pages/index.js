import Adder from "../components/Adder"
import Track from "../components/Track"
import Auth from "../components/Auth"
import { useState } from "react"

export async function getEdgeProps() {
    let tracks = JSON.parse(
        await MDB.get("tracks").catch(e => console.log(e))
    )

    let users = JSON.parse(
        await MDB.get("users").catch(e => console.log(e))
    )
    
    return {
        props: {
            tracks: tracks,
            users: users
        },
        revalidate: 10
    }
}

export default function Index({ tracks, users }) {

    const [ who, setWho ] = useState(null)

    return (
        <>
            <h1 className="m-4 text-xl font-bold">Shared Music DB</h1>
            <div className="w-2/3 my-10 mx-auto flex justify-center">
                <Auth 
                    who={who} 
                    setWho={setWho} 
                    users={users}
                />
                <Adder 
                    who={who}
                    users={users}
                />
            </div>
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
        </>
    )
}
