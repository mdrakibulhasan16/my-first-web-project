import { FaGlobeAsia } from 'react-icons/fa'
import { FaWhatsapp } from 'react-icons/fa'
import { FaEnvelopeOpen } from 'react-icons/fa6'

interface Props {
  whatsappLink: string
}

export default function Hero({ whatsappLink }: Props) {
  return (
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
      <p className="text-base text-gray-500 mb-10">
        বাংলাদেশের ছোট ব্যবসায়ীদের জন্য আদর্শ
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a href={whatsappLink} className="cta-btn text-white font-bold py-4 px-10 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all">
          <FaWhatsapp className="inline-block mr-2" /> হোয়াটসঅ্যাপে অর্ডার করুন
        </a>
        <a href="#contact" className="bg-white border-2 border-blue-600 text-blue-600 font-bold py-4 px-10 rounded-xl text-lg hover:bg-blue-50 transition-all">
          <FaEnvelopeOpen className="inline-block mr-2" /> প্রাইস লিস্ট পান
        </a>
      </div>
    </section>
  )
}