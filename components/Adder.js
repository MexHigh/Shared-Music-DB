import { useState } from "react"
import CardWrapper from "./CardWrapper"

export default function Adder({ who, users }) {

    const [ formValues, setFormValues ] = useState({
        url: "",
        shared_with: "User 2"
    })

    const [ response, setResponse ] = useState()

    const handleSubmit = async (event) => {
        event.preventDefault()

        let v = { ...formValues }
        v.shared_by = who

        alert(`Committing track:\n${JSON.stringify(v, null, 4)}`)
        let r = await fetch("/api/track/add", {
            method: "POST",
            body: JSON.stringify(v)
        })
            .then(r => r.json())
            .then(r => setResponse(r))
            .catch(e => console.log(e))
    }

    const handleChange = (event) => {
        let v = { ...formValues } // shallow copy formValues
        v[event.target.name] = event.target.value // change the field
        setFormValues(v) // set it to state
    }

    return (
        <CardWrapper title="Share a track">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col"
            >
                <lable>URL <span className="text-gray-500 italic">(only Youtube and Youtube Music links are supported)</span></lable>
                <input
                    type="text"
                    name="url"
                    value={formValues.url}
                    onChange={handleChange}
                    className="mb-4 border rounded p-1"
                />
                <lable>Share with</lable>
                <input
                    type="text"
                    name="shared_with"
                    value="not implemented"
                    className="mb-4 border rounded p-1"
                />
                <div className="mt-4 flex justify-between">
                    <input type="submit" value="Submit" className="w-28 rounded"/>
                    { response &&
                        <p className="w-2/3 px-10 truncate">
                            {
                                response.error ? 
                                    <span className="text-red-500">{response.error}</span> : 
                                    <span className="text-green-500">Successfully shared</span>
                            }
                        </p>
                    }
                </div>
            </form>
        </CardWrapper>
    )
}