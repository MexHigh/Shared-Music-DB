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
                    value="not implemented"
                    className="mb-4 border rounded"
                />
                <input type="submit" value="Submit" className="w-2/3 m-auto"/>
            </form>
        </div>
    )
}