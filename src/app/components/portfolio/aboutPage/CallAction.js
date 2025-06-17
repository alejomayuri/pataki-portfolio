export default function CallAction ({ callActions }) {
    return (
        <section className="mt-10">
                {callActions?.map((item, index) => (
                    <div key={index} className="mb-6">
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={item.url}
                            className="inline-flex items-center gap-2 bg-gray-900 text-white px-5 py-3 rounded-xl text-sm font-semibold shadow-md hover:bg-gray-700 transition"
                        >
                            {item.title}
                        </a>
                    </div>
                ))}
        </section>
    )
}