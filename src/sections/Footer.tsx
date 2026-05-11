import { FaPhoneAlt } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8 px-4 text-center text-sm">
      <p>চায়না ব্যাগ পাইকারি — বাংলাদেশি ব্যবসায়ীদের জন্য চায়না থেকে ট্রেন্ডি ব্যাগ সোর্সিং।</p>
      <p className="mt-1"><FaPhoneAlt className="inline-block mr-1" /> শুধু হোয়াটসঅ্যাপে যোগাযোগ করুন</p>
    </footer>
  )
}