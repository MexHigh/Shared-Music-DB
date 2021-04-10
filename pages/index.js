import Adder from "../components/Adder";

export async function getEdgeProps() {
    return {
        props: {
            test: "senf"
        }
    }
}

export default function Index({ test }) {

    return (
        <>
            <h1 className="m-4 text-xl font-bold">Shared Music DB</h1>
            <Adder />
        </>
    )
    
}
