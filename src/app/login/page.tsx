'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Login() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (username === 'admin' && password === 'admin123') {
      document.cookie = 'admin_auth=true; path=/; max-age=86400'
      router.push('/admin')
    } else {
      setError('ব্যবহারকারীর নাম বা পাসওয়ার্ড ভুল হয়েছে')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">অ্যাডমিন প্যানেল</h1>
          <p className="text-gray-500 mt-2">আপনার অ্যাকাউন্টে লগইন করুন</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ব্যবহারকারীর নাম</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ব্যবহারকারীর নাম লিখুন"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">পাসওয়ার্ড</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="পাসওয়ার্ড লিখুন"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition disabled:opacity-50"
          >
            {loading ? 'অপেক্ষা করুন...' : 'লগইন করুন'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>ডেমো ক্রেডেনশিয়ালস:</p>
          <p className="font-medium">ব্যবহারকারী: <span className="text-blue-600">admin</span></p>
          <p className="font-medium">পাসওয়ার্ড: <span className="text-blue-600">admin123</span></p>
        </div>
      </div>
    </div>
  )
}