const solutions = [
  { title: "ছোট পরিমাণে কিনুন", desc: "MOQ শুরু হয় মাত্র ২০ পিস থেকে — ছোট ব্যবসায়ীদের জন্য আদর্শ।" },
  { title: "কোনো কাগজপত্র নেই", desc: "আমরা সোর্সিং এবং আমদানি সামলাই। আপনি শুধু সিলেক্ট করে অর্ডার দিন।" },
  { title: "চায়না থেকে সরাসরি", desc: "সরাসরি উৎপাদক থেকে সোর্সিং করে ভালো দাম এবং যাচাই করা মান।" },
  { title: "এগিয়ে থাকুন", desc: "চায়নায় নতুন ট্রেন্ডি প্রোডাক্ট সম্পর্কে নিয়মিত আপডেট পাঠাই।" },
]

export default function SolutionSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">আমাদের সমাধান</span>
          <h2 className="text-3xl md:text-5xl font-extrabold mt-3 text-gray-900">
            চায়না সোর্সিং <span className="text-green-600">সহজ</span> করে দিছি
          </h2>
          <p className="text-gray-500 mt-4 text-lg">কোনো ঝামেলা নেই। ছোট পরিমাণ। সরাসরি উৎপাদক থেকে।</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {solutions.map((s, i) => (
            <div key={i} className="bg-white rounded-2xl p-7 shadow-sm border-l-4 border-green-500 hover:shadow-md transition-shadow">
              <div className="text-2xl mb-3 text-green-500">✓</div>
              <h3 className="font-bold text-xl mb-2">{s.title}</h3>
              <p className="text-gray-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}