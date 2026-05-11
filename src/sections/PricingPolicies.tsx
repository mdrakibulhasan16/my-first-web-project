import { FaCoins } from 'react-icons/fa6'

const policies = [
  { label: "সর্বনিম্ন অর্ডার", value: "২০ পিস" },
  { label: "দামের পরিসর", value: "৯০০–২,৫০০ টাকা" },
  { label: "স্টক ডেলিভারি", value: "৩ দিনের মধ্যে" },
  { label: "চায়না আমদানি", value: "১৫–২০ দিন" },
  { label: "ক্ষতিগ্রস্ত প্রোডাক্ট", value: "ফ্রি রিটার্ন" },
  { label: "সারাদেশে", value: "ডেলিভারি সুবিধা" },
]

export default function PricingPolicies() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">প্রাইসিং ও শর্তাবলী</span>
          <h2 className="text-3xl md:text-5xl font-extrabold mt-3 text-gray-900">
            পাইকারি শর্তাবলী
          </h2>
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
            <FaCoins className="inline-block mr-2 text-yellow-600" /> <strong>দামের পরিসর:</strong> প্রতি পিস ৯০০–২,৫০০ টাকা (পরিমাণের উপর ভিত্তি করে দাম নিয়োজ্য)
          </p>
        </div>
      </div>
    </section>
  )
}