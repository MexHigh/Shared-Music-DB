import { useState } from "react";
import CardWrapper from "./CardWrapper";

export default function Auth({ who, setWho, users }) {

    const [ username, setUsername ] = useState("Leon")

    const handleChange = (event) => {
        setUsername(event.target.value)
    }

    return (
        <CardWrapper title="Who are you?">
            <div className="w-48">
                { who ?
                    // if logged in
                    <div>
                        <h1>Hi, <span className="font-bold">{who}</span>!</h1>
                        <h2 className="mt-2">Your login cookie is valid.</h2>
                        <input
                            type="submit"
                            value="Logout"
                            onClick={() => setWho(null)}
                            className="w-2/3 mt-8 rounded"
                        />
                    </div>
                    :
                    // if not logged in
                    <div>
                        <form
                            onSubmit={() => setWho(username)}
                            className="relative"
                        >
                            <select
                                value={username}
                                onChange={handleChange}
                                className="w-full"
                            >
                                {
                                    users.map(user => 
                                        <option value={user}>
                                            {user}
                                        </option>
                                    )
                                }
                            </select>
                            <input 
                                type="submit" 
                                value="Login"
                                className="w-2/3 rounded mt-8"
                            />
                        </form>
                    </div>
                }
            </div>
        </CardWrapper>
    )
}