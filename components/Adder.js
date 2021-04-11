import { useState } from "react"

export default function Adder() {
    const [formValues, setFormValues] = useState({
        url: "",
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

    return (
        <div className="m-auto border rounded-xl shadow-lg px-10 py-6">
            <h1 className="font-bold mb-6 text-center text-lg">Share a track</h1>
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
                    name="share_with"
                    value="not implemented"
                    className="mb-4 border rounded p-1"
                />
                <input type="submit" value="Submit" className="w-1/3 mx-auto mt-4 rounded"/>
            </form>
        </div>
    )
}