const problems = [
  { title: "চায়না থেকে সরাসরি অ্যাক্সেস নেই", desc: "আপনি ছোট পরিমাণে আমদানি করতে পারবেন না — মধ্যস্বত্বভোগীরা অতিরিক্ত চার্জ নেয়।" },
  { title: "ট্রেন্ডি প্রোডাক্ট মিস করেন", desc: "চায়নায় নতুন ডিজাইন ক্রমাগত লঞ্চ হয় এবং আপনি দেরিতে জানতে পারেন।" },
  { title: "ডেলিভারি বিলম্ব", desc: "অপ্রত্যাশিত সময়সীমা আপনার ইনভেন্টরি পরিকল্পনা এবং বিক্রয় ব্যাহত করে।" },
  { title: "আমদানির কাগজপত্র", desc: "কাস্টমস, ডক্স এবং ঝামেলা অনেক ছোট ব্যবসাকে চায়না থেকে সোর্সিং থেকে বিরত রাখে।" },
]

export default function ProblemSection() {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-red-500 font-semibold text-sm uppercase tracking-wider">সমস্যা</span>
          <h2 className="text-3xl md:text-5xl font-extrabold mt-3 text-gray-900">
            আপনার দোকানের জন্য ব্যাগ সোর্স করতে কষ্ট হচ্ছে?
          </h2>
          <p className="text-gray-500 mt-4 text-lg">আপনি একা নন — এগুলো ছোট ব্যবসায়ীদের সামনে সবচেয়ে বড় চ্যালেঞ্জ।</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {problems.map((p, i) => (
            <div key={i} className="bg-white rounded-2xl p-7 shadow-sm border-l-4 border-red-400 hover:shadow-md transition-shadow">
              <div className="text-2xl mb-3 text-red-500">✕</div>
              <h3 className="font-bold text-xl mb-2">{p.title}</h3>
              <p className="text-gray-600 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}