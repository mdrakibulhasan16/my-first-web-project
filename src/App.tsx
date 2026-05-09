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
    'হ্যালো, আমি আপনার হোলসেল ব্যাগ কালেকশনে আগ্রহী। অনুগ্রহ করে ক্যাটালগ পাঠান।'
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
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">আমরা কীভাবে সমাধান করি</h2>
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
                  { problem: "চায়না থেকে সরাসরি অ্যাক্সেস নেই", solution: "ছোট পরিমাণে কিনুন — MOQ শুরু মাত্র ২০ পিস থেকে" },
                  { problem: "ট্রেন্ডি প্রোডাক্ট মিস করেন", solution: "চায়নায় নতুন ট্রেন্ডি প্রোডাক্ট সম্পর্কে নিয়মিত আপডেট পাঠাই" },
                  { problem: "ডেলিভারি বিলম্ব", solution: "সরাসরি উৎপাদক থেকে সোর্সিং করে ভালো দাম এবং যাচাই করা মান" },
                  { problem: "আমদানির কাগজপত্র", solution: "কোনো কাগজপত্র নেই — আমরা সোর্সিং এবং আমদানি সামলাই" },
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