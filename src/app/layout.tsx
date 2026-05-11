import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'চায়না থেকে পাইকারি ব্যাগ সোর্সিং',
  description: 'বাংলাদেশি ব্যবসায়ীদের জন্য চায়না থেকে ট্রেন্ডি ব্যাগ সোর্সিং',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn">
      <body>{children}</body>
    </html>
  )
}