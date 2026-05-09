import { FaBuilding } from 'react-icons/fa'
import { FaExchangeAlt } from 'react-icons/fa'
import { FaTruck } from 'react-icons/fa6'

export default function TrustBadges() {
  return (
    <section className="py-16 px-4 bg-gray-900 text-white">
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">
        <div>
          <div className="text-4xl mb-4"><FaBuilding /></div>
          <h3 className="font-bold text-xl mb-2">আমাদের গুদাম দেখুন</h3>
          <p className="text-gray-400">অর্ডার করার আগে সরাসরি প্রোডাক্ট পরীক্ষা করুন। কোনো অন্ধকারে কেনাকাটা নয়।</p>
        </div>
        <div>
          <div className="text-4xl mb-4"><FaExchangeAlt /></div>
          <h3 className="font-bold text-xl mb-2">ক্ষতিগ্রস্ত? ফ্রি রিটার্ন</h3>
          <p className="text-gray-400">কোনো প্রোডাক্ট ক্ষতিগ্রস্ত অবস্থায় এলে আমরা ফেরত নিই — কোনো প্রশ্ন ছাড়াই।</p>
        </div>
        <div>
          <div className="text-4xl mb-4"><FaTruck /></div>
          <h3 className="font-bold text-xl mb-2">সারাদেশে ডেলিভারি</h3>
          <p className="text-gray-400">বাংলাদেশের যেকোনো জায়গায় ডেলিভারি দিই। ডেলিভারি চার্জ ক্রেতার বহন করতে হবে।</p>
        </div>
      </div>
    </section>
  )
}