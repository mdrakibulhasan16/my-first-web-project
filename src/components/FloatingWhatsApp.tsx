import { FaWhatsapp } from 'react-icons/fa'

interface Props {
  whatsappLink: string
}

export default function FloatingWhatsApp({ whatsappLink }: Props) {
  return (
    <a
      href={whatsappLink}
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-full shadow-2xl flex items-center gap-2 z-50 transition-all text-lg"
    >
      <FaWhatsapp className="text-xl" />
    </a>
  )
}