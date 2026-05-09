import { FaCheck } from 'react-icons/fa'

export default function SocialProof() {
  return (
    <div className="bg-blue-700 text-white py-4 px-4">
      <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-8 text-center text-sm font-medium">
        <span><FaCheck className="inline-block mr-1" /> ৫০০+ ডিজাইন সোর্স করা হয়েছে</span>
        <span><FaCheck className="inline-block mr-1" /> ৫০+ সন্তুষ্ট রিসেলার</span>
        <span><FaCheck className="inline-block mr-1" /> ৩ দিনে দ্রুত ডেলিভারি</span>
        <span><FaCheck className="inline-block mr-1" /> ছোট ব্যবসায়ীদের বিশ্বাসযোগ্য</span>
      </div>
    </div>
  )
}