import Link from "../linksPage/Link"

export default function CallAction ({ callActions }) {
    return (
        <section className="mt-10">
                {callActions?.map((item, index) => (
                    <div className="space-y-4" key={index}>
                        <div className="mb-8">
                            <div className="flex flex-col gap-4">
                                <Link data={item} />
                            </div>
                        </div>
                    </div>
                ))}
        </section>
    )
}