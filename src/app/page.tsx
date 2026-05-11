'use client'

import { useState, useEffect } from 'react'
import { FaGlobeAsia, FaWhatsapp, FaEnvelopeOpen, FaCoins, FaChevronDown, FaChevronUp, FaStore, FaExchangeAlt, FaTruck, FaPaperPlane, FaPhoneAlt } from 'react-icons/fa'
import { FaCoins as FaCoinsAlt } from 'react-icons/fa6'
import { addOrder } from '@/lib/storage'

const whatsappLink = 'https://wa.me/8801XXXXXXXXX?text=' + encodeURIComponent(
  'হ্যালো, আপনাকে স্বাগতম! 🙏\n\nআমি আপনার পাইকারি ব্যাগ কালেকশনে আগ্রহী।\n\nআপনার সোর্সিং এবং অর্ডার সম্পর্কে আরও জানতে চাই:\n- কী ধরনের ব্যাগ দরকার?\n- কত পিস প্রয়োজন?\n- কোনো নির্দিষ্ট ডিজাইন আছে?\n\nঅনুগ্রহ করে আপনার প্রয়োজনীয়তা জানান।'
)

const products = [
  { name: "মহিলাদের হ্যান্ডব্যাগ", img: "/photos/WhatsApp Image 2026-05-07 at 8.37.49 PM.jpeg", desc: "প্রতি সিজনে আপডেট হওয়া ট্রেন্ডি, সুন্দর ডিজাইন" },
  { name: "স্কুল ব্যাকপ্যাক", img: "/photos/WhatsApp Image 2026-05-07 at 8.37.48 PM.jpeg", desc: "ছাত্রদের জন্য টেকসই, হালকা ব্যাকপ্যাক" },
  { name: "ব্র্যান্ড-ইন্সপায়ার্ড ব্যাগ", img: "/photos/WhatsApp Image 2026-05-07 at 8.37.47 PM (4).jpeg", desc: "শীর্ষ গ্লোবাল ব্র্যান্ড থেকে অনুপ্রাণিত চায়না ডিজাইন" },
  { name: "আরো কালেকশন", img: "/photos/WhatsApp Image 2026-05-07 at 8.37.48 PM (1).jpeg", desc: "এক্সক্লুসিভ ডিজাইন, সেরা মানের সামগ্রী" },
]

const policies = [
  { label: "সর্বনিম্ন অর্ডার", value: "২০ পিস" },
  { label: "দামের পরিসর", value: "৯০০–২,৫০০ টাকা" },
  { label: "স্টক ডেলিভারি", value: "৩ দিনের মধ্যে" },
  { label: "চায়না আমদানি", value: "১৫–২০ দিন" },
  { label: "ক্ষতিগ্রস্ত প্রোডাক্ট", value: "ফ্রি রিটার্ন" },
  { label: "সারাদেশে", value: "ডেলিভারি সুবিধা" },
]

const faqs = [
  { q: "কমপক্ষে কত পিস অর্ডার করতে হবে?", a: "প্রতি ডিজাইনে কমপক্ষে ২০ পিস অর্ডার করতে হবে।" },
  { q: "দাম কত?", a: "প্রতি পিস ৯০০ থেকে ২,৫০০ টাকা। পরিমাণ বেশি হলে দাম কমে।" },
  { q: "ডেলিভারি কতদিনে পাবো?", a: "স্টক প্রোডাক্ট: ৩ দিনে। চায়না থেকে আমদানি: ১৫–২০ দিন।" },
  { q: "ডেলিভারি চার্জ কে দেয়?", a: "ক্রেতা। বাংলাদেশের যেকোনো জায়গায় ডেলিভারি দেওয়া হয়।" },
  { q: "প্রোডাক্ট ক্ষতিগ্রস্ত এলে কি করবো?", a: "ভিডিও দিয়ে জানান। কোনো শর্ত ছাড়াই ফেরত নেওয়া হবে।" },
  { q: "চায়না থেকে নিজের পছন্দের ডিজাইন আনতে পারি?", a: "হ্যাঁ। ছবি বা রেফারেন্স দিন, বাকি আমরা দেখব।" },
  { q: "প্রোডাক্ট দেখে অর্ডার করতে পারি?", a: "অবশ্যই। আমাদের অফিস ও গুদাম দেখতে আসতে পারেন।" },
  { q: "দাম কমানো সম্ভব?", a: "হ্যাঁ। পরিমাণ বেশি হলে ছাড় পাবেন।" },
]

const solutions = [
  { problem: "চায়না থেকে কেনাকাটা কঠিন", solution: "২০ পিস থেকেই অর্ডার করুন" },
  { problem: "ট্রেন্ডি প্রোডাক্ট পাওয়া যায় না", solution: "নিয়মিত নতুন প্রোডাক্ট আপডেট দিই" },
  { problem: "দাম বেশি", solution: "সরাসরি উৎপাদক থেকে সোর্সিং করি" },
  { problem: "কাগজপত্র নিয়ে ঝামেলা", solution: "কোনো কাগজপত্র লাগবে না" },
]

export default function Home() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [formData, setFormData] = useState({ name: '', phone: '', whatsapp: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.phone && !formData.whatsapp) return
    try {
      addOrder({
        name: formData.name,
        phone: formData.phone,
        whatsapp: formData.whatsapp,
        message: '',
        status: 'pending',
      })
      setSubmitted(true)
    } catch (error) {
      console.error('Failed to submit:', error)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="px-4 pt-20 pb-16 text-center max-w-5xl mx-auto">
        <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-1 rounded-full mb-6">
          <FaGlobeAsia className="inline-block mr-1" /> চায়না থেকে সরাসরি বাংলাদেশে
        </span>
        <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6 text-gray-900">
          ঝামেলা ছাড়াই<br />
          <span className="text-blue-600">ট্রেন্ডি ব্যাগ সোর্স করুন</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-4 max-w-2xl mx-auto">
          কোনো কাগজপত্র নেই। ছোট পরিমাণে অর্ডার নেওয়া হয়। চায়না থেকে সরাসরি সোর্সিং —
          <strong> ভালো দাম</strong> এবং <strong>নিশ্চিত মানের</strong> জন্য।
        </p>
        <p className="text-base text-gray-500 mb-10">বাংলাদেশের ছোট ব্যবসায়ীদের জন্য আদর্শ</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href={whatsappLink} className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-10 rounded-xl text-lg shadow-lg transition-all">
            <FaWhatsapp className="inline-block mr-2" /> এখনই অর্ডার করুন
          </a>
          <a href="#contact" className="bg-white border-2 border-blue-600 text-blue-600 font-bold py-4 px-10 rounded-xl text-lg hover:bg-blue-50 transition-all">
            <FaEnvelopeOpen className="inline-block mr-2" /> প্রাইস লিস্ট পান
          </a>
        </div>
      </section>

      <section className="py-20 px-4 bg-blue-50">
        <div className="max-w-5xl mx-auto text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">সামাজিক প্রমাণ</h2>
          <p className="text-gray-600">আমাদের সন্তুষ্ট ক্রেতাদের মতামত</p>
        </div>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { name: "রাকিব হাসান", business: "ফ্যাশন রিটেইল", text: "চায়না থেকে সরাসরি অর্ডার করার সুযোগ পেয়ে আমার ব্যবসায় লাভ বেড়েছে ৪০%।" },
            { name: "সাবিনা আক্তার", business: "অনলাইন শপ", text: "MOQ কম হওয়ায় বিভিন্ন ডিজাইন ট্রায়াল করতে পারছি। বিক্রয় বেড়েছে।" },
            { name: "জাহিদ হাসান", business: "হোলসেল ব্যবসা", text: "এখন আর চায়না যেতে হয় না। ঝামেলা ছাড়াই ট্রেন্ডি ব্যাগ পাচ্ছি।" },
          ].map((review, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">{review.name[0]}</div>
                <div>
                  <h4 className="font-bold text-gray-900">{review.name}</h4>
                  <p className="text-sm text-gray-500">{review.business}</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"{review.text}"</p>
              <p className="mt-3 text-yellow-500">★★★★★</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">আমাদের সেবাসমূহ</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl shadow-md overflow-hidden">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left py-4 px-6 font-bold text-gray-700">আগে (সমস্যা)</th>
                  <th className="text-left py-4 px-6 font-bold text-gray-700">এখন (সমাধান)</th>
                </tr>
              </thead>
              <tbody>
                {solutions.map((row, i) => (
                  <tr key={i} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6 text-red-600">✕ {row.problem}</td>
                    <td className="py-4 px-6 text-green-600">✓ {row.solution}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">প্রোডাক্ট ক্যাটাগরি</span>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-3 text-gray-900">আমরা আপনার জন্য কী সোর্স করি</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.map((p, i) => (
              <div key={i} onClick={() => setSelectedImg(p.img)} className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer" style={{ height: '200px' }}>
                <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h3 className="font-extrabold text-lg text-white">{p.name}</h3>
                  <p className="text-white/80 text-sm">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a href={whatsappLink} className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-xl text-lg inline-block">
              <FaWhatsapp className="inline-block mr-2" /> বিস্তারিত জানতে যোগাযোগ করুন
            </a>
          </div>
        </div>
        {selectedImg && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImg(null)}>
            <button className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300">✕</button>
            <img src={selectedImg} alt="" className="max-w-full max-h-full object-contain rounded-lg" onClick={(e) => e.stopPropagation()} />
          </div>
        )}
      </section>

      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">প্রাইসিং ও শর্তাবলী</span>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-3 text-gray-900">পাইকারি শর্তাবলী</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {policies.map((p, i) => (
              <div key={i} className="bg-white rounded-xl p-6 text-center border border-gray-200 hover:border-blue-400 transition-colors">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{p.label}</div>
                <div className="font-bold text-xl text-gray-900">{p.value}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <p className="text-sm text-yellow-800 font-medium text-center">
              <FaCoinsAlt className="inline-block mr-2 text-yellow-600" /> <strong>দামের পরিসর:</strong> প্রতি পিস ৯০০–২,৫০০ টাকা (পরিমাণের উপর ভিত্তি করে দাম নিয়োজ্য)
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-900 text-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center gap-2">
            <div className="text-4xl"><FaStore /></div>
            <div className="text-center">
              <h3 className="font-bold text-xl">আমাদের গুদাম দেখুন</h3>
              <p className="text-gray-400">অর্ডার করার আগে সরাসরি প্রোডাক্ট পরীক্ষা করুন। কোনো অন্ধকারে কেনাকাটা নয়।</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="text-4xl"><FaExchangeAlt /></div>
            <div className="text-center">
              <h3 className="font-bold text-xl">ক্ষতিগ্রস্ত? ফ্রি রিটার্ন</h3>
              <p className="text-gray-400">কোনো প্রোডাক্ট ক্ষতিগ্রস্ত অবস্থায় এলে আমরা ফেরত নিই — কোনো প্রশ্ন ছাড়াই।</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="text-4xl"><FaTruck /></div>
            <div className="text-center">
              <h3 className="font-bold text-xl">সারাদেশে ডেলিভারি</h3>
              <p className="text-gray-400">বাংলাদেশের যেকোনো জায়গায় ডেলিভারি দিই। ডেলিভারি চার্জ ক্রেতার বহন করতে হবে।</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold mb-4">চায়না থেকে নির্দিষ্ট ডিজাইন চান?</h2>
          <p className="text-gray-600 text-lg mb-6">
            আমাদের ক্যাটালগে না থাকলেও যেকোনো প্রোডাক্ট সোর্স করতে পারি — চায়না থেকে আপনার অনুরোধে।<br />
            <span className="font-semibold text-gray-800">কাস্টম অর্ডারের জন্য বেশি পরিমাণ প্রয়োজন।</span>
          </p>
          <a href={whatsappLink} className="bg-green-500 hover:bg-green-600 inline-block text-white font-bold py-4 px-10 rounded-xl text-lg">
            <FaWhatsapp className="inline-block mr-2" /> এখনই অর্ডার করুন
          </a>
        </div>
      </section>

      <section id="contact" className="py-20 px-4 bg-blue-50">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">যোগাযোগ করুন</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-3 text-gray-900">আপনার তথ্য দিন</h2>
            <p className="text-gray-500 mt-2">হোয়াটসঅ্যাপে ক্যাটালগ এবং প্রাইস সহ আমরা আপনার সাথে যোগাযোগ করব।</p>
          </div>
          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
              <div className="text-5xl mb-4">👋</div>
              <h3 className="text-2xl font-bold text-green-700 mb-2">আপনাকে স্বাগতম!</h3>
              <p className="text-green-600 mb-2">ধন্যবাদ আপনার আগ্রহের জন্য। আমরা আপনার সোর্সিং এবং অর্ডার সম্পর্কে যেকোনো প্রশ্নে সাহায্য করতে প্রস্তুত।</p>
              <p className="text-green-700 font-medium mb-6">অনুগ্রহ করে নিচের বাটনে ক্লিক করে আপনার প্রয়োজনীয়তা জানান — আমরা দ্রুত উত্তর দিব।</p>
              <a href={whatsappLink} className="mt-4 inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-xl">
                <FaWhatsapp className="inline-block mr-2" /> হোয়াটসঅ্যাপে যোগাযোগ করুন
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-lg space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">আপনার নাম (ঐচ্ছিক)</label>
                <input type="text" placeholder="যেমন: রহিম আহমেদ" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">ফোন নম্বর *</label>
                <input type="tel" placeholder="০১XXXXXXXXX" required className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">হোয়াটসঅ্যাপ নম্বর *</label>
                <input type="tel" placeholder="০১XXXXXXXXX" required className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" value={formData.whatsapp} onChange={e => setFormData({ ...formData, whatsapp: e.target.value })} />
              </div>
              <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl text-lg transition">
                <FaPaperPlane className="inline-block mr-2" /> জমা দিন
              </button>
              <p className="text-center text-xs text-gray-400">আপনার গোপনীয়তা রক্ষা করা হয়। কোনো স্প্যাম কল নেই।</p>
            </form>
          )}
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center mb-10">সচরাচর জিজ্ঞাসা</h2>
          <div className="space-y-3">
            {faqs.map((item, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors">
                  <span className="font-semibold text-gray-900 pr-4">{item.q}</span>
                  <span className="text-gray-400">{openFaq === i ? <FaChevronUp /> : <FaChevronDown />}</span>
                </button>
                {openFaq === i && <div className="px-5 pb-5 text-gray-600 border-t border-gray-100 pt-4">{item.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-blue-700 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">ঝামেলা ছাড়াই ব্যাগ সোর্স করতে প্রস্তুত?</h2>
          <p className="text-blue-100 text-lg mb-8">২০ পিস দিয়ে শুরু করুন। কোনো কাগজপত্র নেই। চায়না থেকে সরাসরি।</p>
          <a href={whatsappLink} className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-12 rounded-xl text-xl transition-all shadow-lg">
            <FaWhatsapp className="inline-block mr-2" /> এখনই অর্ডার করুন
          </a>
          <p className="mt-4 text-blue-200 text-sm">অফিস টাইমে আমরা কয়েক মিনিটের মধ্যে উত্তর দিই।</p>
        </div>
      </section>

      <footer className="py-10 px-4 bg-gray-900 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-xl font-bold mb-2">চায়না ব্যাগ পাইকারি</h3>
          <p className="mt-1">চায়না ব্যাগ পাইকারি — বাংলাদেশি ব্যবসায়ীদের জন্য চায়না থেকে ট্রেন্ডি ব্যাগ সোর্সিং।</p>
          <p className="mt-1"><FaPhoneAlt className="inline-block mr-1" /> শুধু হোয়াটসঅ্যাপে যোগাযোগ করুন</p>
          <p className="mt-4 text-gray-500 text-sm">© ২০২৫ চায়না ব্যাগ পাইকারি। সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </footer>

      <a href={whatsappLink} className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all z-50">
        <FaWhatsapp className="text-2xl" />
      </a>
    </div>
  )
}