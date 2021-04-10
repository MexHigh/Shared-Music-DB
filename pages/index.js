import { useRouter } from "flareact/router"

export async function getEdgeProps() {

    const tracks = await MDB.get("test")

    return {
        props: {
            apfel: tracks
        },
        revalidate: 30
    }

}

export default function Index({ apfel }) {

    const handleSubmit = (event) => {

    }

    const handleChange = (event) => {

    }

    return (
        <>
            <h1>Shared Music DB</h1>
            <div>
                <form
                    onSubmit={handleSubmit}
                >
                    <lable>URL (only Youtube and Youtube Music links are supported)</lable>
                    <input
                        type="text"
                        name="url"
                        onChange={handleChange}
                    />
                    <lable>Share with</lable>
                    <input
                        type="text"
                        name="share_with"
                        onChange={handleChange}
                    />
                    <input type="submit" />
                </form>
            </div>
        </>
    )
    
}
