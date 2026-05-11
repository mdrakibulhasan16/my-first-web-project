import { FaWhatsapp } from 'react-icons/fa'
import { FaPaperPlane } from 'react-icons/fa6'

interface FormData {
  name: string
  phone: string
  whatsapp: string
}

interface Props {
  submitted: boolean
  formData: FormData
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
  handleSubmit: (e: React.FormEvent) => void
  whatsappLink: string
}

export default function ContactForm({ submitted, formData, setFormData, handleSubmit, whatsappLink }: Props) {
  return (
    <section id="contact" className="py-20 px-4 bg-blue-50">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">যোগাযোগ করুন</span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-3 text-gray-900">
            আপনার তথ্য দিন
          </h2>
          <p className="text-gray-500 mt-2">হোয়াটসঅ্যাপে ক্যাটালগ এবং প্রাইস সহ আমরা আপনার সাথে যোগাযোগ করব।</p>
        </div>

        {submitted ? (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
            <div className="text-5xl mb-4">👋</div>
            <h3 className="text-2xl font-bold text-green-700 mb-2">আপনাকে স্বাগতম!</h3>
            <p className="text-green-600 mb-2">ধন্যবাদ আপনার আগ্রহের জন্য। আমরা আপনার সোর্সিং এবং অর্ডার সম্পর্কিত যেকোনো প্রশ্নে সাহায্য করতে প্রস্তুত।</p>
            <p className="text-green-700 font-medium mb-6">অনুগ্রহ করে নিচের বাটনে ক্লিক করে আপনার প্রয়োজনীয়তা জানান — আমরা দ্রুত উত্তর দিব।</p>
            <a href={whatsappLink} className="mt-4 inline-block cta-btn text-white font-bold py-3 px-8 rounded-xl">
              <FaWhatsapp className="inline-block mr-2" /> হোয়াটসঅ্যাপে যোগাযোগ করুন
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-lg space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">আপনার নাম (ঐচ্ছিক)</label>
              <input
                type="text"
                placeholder="যেমন: রহিম আহমেদ"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">ফোন নম্বর *</label>
              <input
                type="tel"
                placeholder="০১XXXXXXXXX"
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">হোয়াটসঅ্যাপ নম্বর *</label>
              <input
                type="tel"
                placeholder="০১XXXXXXXXX"
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                value={formData.whatsapp}
                onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
              />
            </div>
            <button
              type="submit"
              className="w-full cta-btn text-white font-bold py-4 rounded-xl text-lg hover:opacity-90 transition"
            >
              <FaPaperPlane className="inline-block mr-2" /> জমা দিন
            </button>
            <p className="text-center text-xs text-gray-400">আপনার গোপনীয়তা রক্ষা করা হয়। কোনো স্প্যাম কল নেই।</p>
          </form>
        )}
      </div>
    </section>
  )
}