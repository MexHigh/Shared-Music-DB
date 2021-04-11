export default function CardWrapper({ title, children }) {
    return (
        <div className="h-80 border rounded-xl shadow-lg px-10 py-6 mx-4 max-w-lg">
            <h1 className="font-bold mb-6 text-lg">{title}</h1>
            { children }
        </div>
    )
}