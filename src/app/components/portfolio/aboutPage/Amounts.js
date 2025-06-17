export default function Amounts ({ amounts }) {
    return (
        <section className="mt-10">
            <div className="grid grid-cols-2 gap-6">
                {amounts.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center justify-center bg-white rounded-xl shadow-md p-4 border border-gray-100"
                    >
                        <span className="text-2xl font-extrabold text-gray-900">{item?.value}</span>
                        <span className="text-sm text-gray-500 mt-1 text-center">{item?.title}</span>
                    </div>
                ))}
            </div>
      </section>
    )
}