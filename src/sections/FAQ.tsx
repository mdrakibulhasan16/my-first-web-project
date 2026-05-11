import { useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

const faqs = [
  {
    q: "কমপক্ষে কত পিস অর্ডার করতে হবে?",
    a: "প্রতি ডিজাইনে কমপক্ষে ২০ পিস অর্ডার করতে হবে।"
  },
  {
    q: "দাম কত?",
    a: "প্রতি পিস ৯০০ থেকে ২,৫০০ টাকা। পরিমাণ বেশি হলে দাম কমে।"
  },
  {
    q: "ডেলিভারি কতদিনে পাবো?",
    a: "স্টক প্রোডাক্ট: ৩ দিনে। চায়না থেকে আমদানি: ১৫–২০ দিন।"
  },
  {
    q: "ডেলিভারি চার্জ কে দেয়?",
    a: "ক্রেতা। বাংলাদেশের যেকোনো জায়গায় ডেলিভারি দেওয়া হয়।"
  },
  {
    q: "প্রোডাক্ট ক্ষতিগ্রস্ত এলে কি করবো?",
    a: "ভিডিও দিয়ে জানান। কোনো শর্ত ছাড়াই ফেরত নেওয়া হবে।"
  },
  {
    q: "চায়না থেকে নিজের পছন্দের ডিজাইন আনতে পারি?",
    a: "হ্যাঁ। ছবি বা রেফারেন্স দিন, বাকি আমরা দেখব।"
  },
  {
    q: "প্রোডাক্ট দেখে অর্ডার করতে পারি?",
    a: "অবশ্যই। আমাদের অফিস ও গুদাম দেখতে আসতে পারেন।"
  },
  {
    q: "দাম কমানো সম্ভব?",
    a: "হ্যাঁ। পরিমাণ বেশি হলে ছাড় পাবেন।"
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center mb-10">সচরাচর জিজ্ঞাসা</h2>
        <div className="space-y-3">
          {faqs.map((item, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 pr-4">{item.q}</span>
                <span className="text-gray-400">
                  {openIndex === i ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </button>
              {openIndex === i && (
                <div className="px-5 pb-5 text-gray-600 border-t border-gray-100 pt-4">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}