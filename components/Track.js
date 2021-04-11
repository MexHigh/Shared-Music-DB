export default function Track({ url, shared_by, shared_with, shared_at, thumbnail, title, artist }) {

    try {
        artist = artist.replace(" - Topic", "")
    } catch(e) {
        console.log(`artist not found for ${url}`)
    }

    return (
        <a 
            href={url} 
            target="_blank"
            rel="noopener"
        >
            <div className="flex flex-row py-8 px-14 m-4 border rounded-xl shadow-lg">
                {/* left */}
                <div>
                    <img 
                        src={thumbnail}
                        alt="Thumbnail"
                        width="160"
                        height="120"
                        className="rounded border"
                    />
                </div>
                {/* right */}
                <div className="ml-8 mt-2">
                    <h1 className="text-xl font-bold">{title}</h1>
                    <h2>{artist}</h2>
                    <p className="mt-4">
                        <span className="capitalize">{shared_by}</span>
                        <span className="text-gray-500"> shared with </span>
                        <span className="capitalize">{shared_with}</span>
                        <span className="text-gray-500"> at </span>
                        <span className="capitalize">{new Date(shared_at).toLocaleString()}</span>
                    </p>
                </div>
            </div>
        </a>
    )
}