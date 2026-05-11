import { useState } from 'react'
import Hero from './sections/Hero'
import SocialProof from './sections/SocialProof'
import ProductShowcase from './sections/ProductShowcase'
import PricingPolicies from './sections/PricingPolicies'
import TrustBadges from './sections/TrustBadges'
import CustomOrders from './sections/CustomOrders'
import ContactForm from './sections/ContactForm'
import FAQ from './sections/FAQ'
import FinalCTA from './sections/FinalCTA'
import Footer from './sections/Footer'
import FloatingWhatsApp from './components/FloatingWhatsApp'

interface FormData {
  name: string
  phone: string
  whatsapp: string
}

export default function App() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState<FormData>({ name: '', phone: '', whatsapp: '' })

  const whatsappLink = 'https://wa.me/8801XXXXXXXXX?text=' + encodeURIComponent(
    'হ্যালো, আপনাকে স্বাগতম! 🙏\n\nআমি আপনার পাইকারি ব্যাগ কালেকশনে আগ্রহী।\n\nআপনার সোর্সিং এবং অর্ডার সম্পর্কে আরও জানতে চাই:\n- কী ধরনের ব্যাগ দরকার?\n- কত পিস প্রয়োজন?\n- কোনো নির্দিষ্ট ডিজাইন আছে?\n\nঅনুগ্রহ করে আপনার প্রয়োজনীয়তা জানান।'
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.phone && !formData.whatsapp) return
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen wave-bg">
      <Hero whatsappLink={whatsappLink} />
      <SocialProof />
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
                {[
                  { problem: "চায়না থেকে কেনাকাটা কঠিন", solution: "২০ পিস থেকেই অর্ডার করুন" },
                  { problem: "ট্রেন্ডি প্রোডাক্ট পাওয়া যায় না", solution: "নিয়মিত নতুন প্রোডাক্ট আপডেট দিই" },
                  { problem: "দাম বেশি", solution: "সরাসরি উৎপাদক থেকে সোর্সিং করি" },
                  { problem: "কাগজপত্র নিয়ে ঝামেলা", solution: "কোনো কাগজপত্র লাগবে না" },
                ].map((row, i) => (
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
      <ProductShowcase whatsappLink={whatsappLink} />
      <PricingPolicies />
      <TrustBadges />
      <CustomOrders whatsappLink={whatsappLink} />
      <ContactForm
        submitted={submitted}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        whatsappLink={whatsappLink}
      />
      <FAQ />
      <FinalCTA whatsappLink={whatsappLink} />
      <Footer />
      <FloatingWhatsApp whatsappLink={whatsappLink} />
    </div>
  )
}