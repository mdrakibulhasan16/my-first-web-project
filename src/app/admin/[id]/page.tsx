'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { FaArrowLeft, FaWhatsapp, FaPhone, FaClock, FaCheck, FaHistory } from 'react-icons/fa'

interface Order {
  id: number
  name: string
  phone: string
  whatsapp: string
  message: string
  status: string
  created_at: string
}

export default function OrderDetail() {
  const params = useParams()
  const id = params.id as string
  const router = useRouter()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    fetch(`/api/orders/${id}`)
      .then(res => res.json())
      .then(data => setOrder(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [id])

  const updateStatus = async (status: string) => {
    try {
      await fetch(`/api/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      setOrder({ ...order!, status })
    } catch (error) {
      console.error('Failed to update:', error)
    }
  }

  const deleteOrder = async () => {
    if (!confirm('আপনি কি এই অর্ডার মুছতে চান?')) return
    try {
      await fetch(`/api/orders/${id}`, { method: 'DELETE' })
      router.push('/admin')
    } catch (error) {
      console.error('Failed to delete:', error)
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('bn-BD', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'contacted': return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'completed': return 'bg-green-100 text-green-800 border-green-300'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'অপেক্ষমাণ'
      case 'contacted': return 'যোগাযোগ করা হয়েছে'
      case 'completed': return 'সম্পন্ন'
      default: return status
    }
  }

  const whatsappLink = order ? `https://wa.me/${order.whatsapp.replace(/\D/g, '')}` : '#'

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-500">লোড হচ্ছে...</p>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-4">❌</p>
          <p className="text-xl font-medium text-gray-700">অর্ডার পাওয়া যায়নি</p>
          <button onClick={() => router.push('/admin')} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            ফিরে যান
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-700 to-blue-900 text-white px-6 py-5">
        <div className="max-w-4xl mx-auto">
          <button onClick={() => router.push('/admin')} className="flex items-center gap-2 hover:underline mb-4">
            <FaArrowLeft /> অ্যাডমিন প্যানেলে ফিরে যান
          </button>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">অর্ডার বিস্তারিত</h1>
              <p className="text-blue-200 text-sm mt-1">অর্ডার আইডি: #{order.id}</p>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
              {getStatusLabel(order.status)}
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="bg-gray-50 px-6 py-4 border-b">
            <h2 className="font-bold text-gray-900">যোগাযোগ তথ্য</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-gray-500">নাম</label>
                <p className="font-medium text-lg">{order.name || 'প্রদান করা হয়নি'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">ফোন নম্বর</label>
                <p className="font-medium text-lg flex items-center gap-2">
                  <FaPhone className="text-gray-400" /> {order.phone}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-500">হোয়াটসঅ্যাপ</label>
                <p className="font-medium text-lg flex items-center gap-2">
                  <FaWhatsapp className="text-green-500" /> {order.whatsapp}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-500">অর্ডার তারিখ ও সময়</label>
                <p className="font-medium flex items-center gap-2">
                  <FaClock className="text-gray-400" /> {formatDate(order.created_at)}
                </p>
              </div>
            </div>
            {order.message && (
              <div className="mt-6">
                <label className="text-sm text-gray-500">মেসেজ</label>
                <p className="mt-1 p-4 bg-gray-50 rounded-lg text-gray-700">{order.message}</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="bg-gray-50 px-6 py-4 border-b">
            <h2 className="font-bold text-gray-900">স্ট্যাটাস পরিবর্তন</h2>
          </div>
          <div className="p-6">
            <div className="flex flex-wrap gap-3">
              {[
                { status: 'pending', label: 'অপেক্ষমাণ', icon: FaClock, color: 'bg-yellow-500 hover:bg-yellow-600' },
                { status: 'contacted', label: 'যোগাযোগ করা হয়েছে', icon: FaWhatsapp, color: 'bg-blue-500 hover:bg-blue-600' },
                { status: 'completed', label: 'সম্পন্ন', icon: FaCheck, color: 'bg-green-500 hover:bg-green-600' },
              ].map(s => (
                <button
                  key={s.status}
                  onClick={() => updateStatus(s.status)}
                  className={`${s.color} text-white px-6 py-3 rounded-xl flex items-center gap-2 font-medium transition ${
                    order.status === s.status ? 'ring-4 ring-offset-2 ring-gray-400' : ''
                  }`}
                >
                  <s.icon /> {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="bg-gray-50 px-6 py-4 border-b">
            <h2 className="font-bold text-gray-900">দ্রুত যোগাযোগ</h2>
          </div>
          <div className="p-6 flex flex-wrap gap-4">
            <a
              href={`https://wa.me/${order.whatsapp.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl flex items-center gap-3 font-bold text-lg transition"
            >
              <FaWhatsapp className="text-2xl" /> হোয়াটসঅ্যাপে মেসেজ করুন
            </a>
            <a
              href={`tel:${order.phone}`}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl flex items-center gap-3 font-bold text-lg transition"
            >
              <FaPhone className="text-2xl" /> কল করুন
            </a>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={() => router.push('/admin/history')}
            className="flex items-center gap-2 text-blue-600 hover:underline font-medium"
          >
            <FaHistory /> অর্ডার ইতিহাস দেখুন
          </button>
          <button
            onClick={deleteOrder}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-medium transition"
          >
            এই অর্ডার মুছে ফেলুন
          </button>
        </div>
      </main>
    </div>
  )
}