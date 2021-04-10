import { useState } from "react"

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

    const [formValues, setFormValues] = useState({
        url: apfel,
        share_with: ""
    })

    const handleSubmit = (event) => {
        event.preventDefault()
    }

    const handleChange = (event) => {
        let v = { ...formValues } // shallow copy formValues
        v[event.target.name] = event.target.value // change the field
        setFormValues(v) // set it to state
    }

    console.log(formValues)

    return (
        <>
            <h1 className="m-4 text-xl font-bold">Shared Music DB</h1>
            <div>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col w-2/3 m-auto mt-16"
                >
                    <lable>URL <span className="text-gray-500 italic">(only Youtube and Youtube Music links are supported)</span></lable>
                    <input
                        type="text"
                        name="url"
                        value={formValues.url}
                        onChange={handleChange}
                        className="mb-4 border rounded"
                    />
                    <lable>Share with</lable>
                    <input
                        type="text"
                        name="share_with"
                        value={formValues.share_with}
                        onChange={handleChange}
                        className="mb-4 border rounded"
                    />
                    <input type="submit" value="Submit" className="w-2/3 m-auto"/>
                </form>
            </div>
        </>
    )
    
}
