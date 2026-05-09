import { FaWhatsapp } from 'react-icons/fa'

interface Props {
  whatsappLink: string
}

export default function FinalCTA({ whatsappLink }: Props) {
  return (
    <section className="py-16 px-4 bg-blue-700 text-white text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          ঝামেলা ছাড়াই ব্যাগ সোর্স করতে প্রস্তুত?
        </h2>
        <p className="text-blue-100 text-lg mb-8">২০ পিস দিয়ে শুরু করুন। কোনো কাগজপত্র নেই। চায়না থেকে সরাসরি।</p>
        <a href={whatsappLink} className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-12 rounded-xl text-xl transition-all shadow-lg">
          <FaWhatsapp className="inline-block mr-2" /> এখনই হোয়াটসঅ্যাপে চ্যাট করুন
        </a>
        <p className="mt-4 text-blue-200 text-sm">অফিস টাইমে আমরা কয়েক মিনিটের মধ্যে উত্তর দিই।</p>
      </div>
    </section>
  )
}