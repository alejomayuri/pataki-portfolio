export default function Link({ data, children, className = "" }) {
    // console.log("Link data:", data);
    return (
        <div>
            <a
                href={data.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white block text-center py-5 px-12 relative bg-gradient-to-r from-violet-600 to-indigo-600 text-gray-800 rounded shadow-md hover:bg-gray-200 transition duration-300"
            >
                {(data.icon || data.image) && (
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <div className="w-11 h-11">
                            <img
                                src={data.image}
                                alt={`${data.title} icon`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                )}
                {data.title}
            </a>
        </div>
    )
}
