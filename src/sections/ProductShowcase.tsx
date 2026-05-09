import { useState } from 'react'
import { FaWhatsapp, FaTimes } from 'react-icons/fa'

const products = [
  { name: "মহিলাদের হ্যান্ডব্যাগ", img: "/photos/WhatsApp Image 2026-05-07 at 8.37.49 PM.jpeg", desc: "প্রতি সিজনে আপডেট হওয়া ট্রেন্ডি, সুন্দর ডিজাইন" },
  { name: "স্কুল ব্যাকপ্যাক", img: "/photos/WhatsApp Image 2026-05-07 at 8.37.48 PM.jpeg", desc: "ছাত্রদের জন্য টেকসই, হালকা ব্যাকপ্যাক" },
  { name: "ব্র্যান্ড-ইন্সপায়ার্ড ব্যাগ", img: "/photos/WhatsApp Image 2026-05-07 at 8.37.47 PM (4).jpeg", desc: "শীর্ষ গ্লোবাল ব্র্যান্ড থেকে অনুপ্রাণিত চায়না ডিজাইন" },
  { name: "আরো কালেকশন", img: "/photos/WhatsApp Image 2026-05-07 at 8.37.48 PM (1).jpeg", desc: "এক্সক্লুসিভ ডিজাইন, সেরা মানের সামগ্রী" },
]

interface Props {
  whatsappLink: string
}

export default function ProductShowcase({ whatsappLink }: Props) {
  const [selectedImg, setSelectedImg] = useState<string | null>(null)

  return (
    <section className="py-20 px-4 bg-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">প্রোডাক্ট ক্যাটাগরি</span>
          <h2 className="text-3xl md:text-5xl font-extrabold mt-3 text-gray-900">
            আমরা আপনার জন্য কী সোর্স করি
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4" style={{ gridAutoRows: '200px' }}>
          {products.map((p, i) => (
            <div key={i} onClick={() => setSelectedImg(p.img)} className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer">
              <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h3 className="font-extrabold text-lg text-white">{p.name}</h3>
                <p className="text-white/80 text-sm">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <a href={whatsappLink} className="cta-btn text-white font-bold py-3 px-8 rounded-xl text-lg">
            <FaWhatsapp className="inline-block mr-2" /> উপলব্ধতা জিজ্ঞাসা করুন
          </a>
        </div>
      </div>
      {selectedImg && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImg(null)}>
          <button className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300" onClick={() => setSelectedImg(null)}><FaTimes /></button>
          <img src={selectedImg} alt="" className="max-w-full max-h-full object-contain rounded-lg" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </section>
  )
}