import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

export default function NetworkButtons({ data }) {
    return (
        <section className="mt-10">
            <div className="flex justify-center gap-6">
                {data?.facebook && <a href={data?.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition duration-300">
                    <FaFacebook size={28} />
                </a>}
                {data?.twitter && <a href={data?.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600 transition duration-300">
                    <FaTwitter size={28} />
                </a>}
                {data?.instagram && <a href={data?.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-700 transition duration-300">
                    <FaInstagram size={28} />
                </a>}
                {data?.linkedin && <a href={data?.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 transition duration-300">
                    <FaLinkedin size={28} />
                </a>}
            </div>
        </section>
    )
}