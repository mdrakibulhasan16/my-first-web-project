import { FaWhatsapp } from 'react-icons/fa'

interface Props {
  whatsappLink: string
}

export default function CustomOrders({ whatsappLink }: Props) {
  return (
    <section className="py-16 px-4 bg-white border-t border-gray-100">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold mb-4">চায়না থেকে নির্দিষ্ট ডিজাইন চান?</h2>
        <p className="text-gray-600 text-lg mb-6">
          আমাদের ক্যাটালগে না থাকলেও যেকোনো প্রোডাক্ট সোর্স করতে পারি — চায়না থেকে আপনার অনুরোধে।
          <br /><span className="font-semibold text-gray-800">কাস্টম অর্ডারের জন্য বেশি পরিমাণ প্রয়োজন।</span>
        </p>
        <a href={whatsappLink} className="cta-btn inline-block text-white font-bold py-4 px-10 rounded-xl text-lg">
          <FaWhatsapp className="inline-block mr-2" /> হোয়াটসঅ্যাপে কাস্টম অর্ডার আলোচনা করুন
        </a>
      </div>
    </section>
  )
}