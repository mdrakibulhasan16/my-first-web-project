const faqs = [
  { q: "সর্বনিম্ন অর্ডার পরিমাণ কত?", a: "MOQ হল প্রতি ডিজাইনে ২০ পিস।" },
  { q: "ডেলিভারিতে কত সময় লাগে?", a: "স্টক প্রোডাক্ট: ৩ দিনের মধ্যে। চায়না আমদানি: ১৫–২০ দিন।" },
  { q: "আমি কি চায়না থেকে নিজের ডিজাইন আনতে পারি?", a: "হ্যাঁ, আপনার অনুরোধে যেকোনো ডিজাইন চায়না থেকে সোর্স করতে পারি।" },
  { q: "কোনো প্রোডাক্ট ক্ষতিগ্রস্ত এলে কী হবে?", a: "কোনো শর্ত ছাড়াই আমরা ফেরত নিই।" },
  { q: "আমি কি প্রোডাক্ট দেখতে আসতে পারি?", a: "অবশ্যই — কেনার আগে আমাদের অফিস ও গুদাম পরিদর্শন করতে পারেন।" },
  { q: "দাম নিয়ে আলোচনা সম্ভব?", a: "হ্যাঁ, পরিমাণের উপর ভিত্তি করে দাম নিয়োজ্য।" },
]

export default function FAQ() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center mb-10">সচরাচর জিজ্ঞাসা</h2>
        {faqs.map((item, i) => (
          <div key={i} className="border-b border-gray-200 py-5">
            <h3 className="font-bold text-gray-900 mb-2">{item.q}</h3>
            <p className="text-gray-600">{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  )
}