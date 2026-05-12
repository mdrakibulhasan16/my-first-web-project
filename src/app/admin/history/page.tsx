'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FaArrowLeft, FaWhatsapp, FaPhone, FaClock, FaSearch } from 'react-icons/fa'

interface Order {
  id: string
  name: string
  phone: string
  whatsapp: string
  message: string
  status: 'pending' | 'contacted' | 'completed'
  created_at: string
}

export default function OrderHistory() {
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [search, setSearch] = useState('')
  const [dateRange, setDateRange] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders')
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      if (Array.isArray(data)) {
        setOrders(data)
      } else {
        setOrders([])
      }
    } catch (err) {
      console.error('Failed to fetch orders:', err)
      setError('অর্ডার লোড করতে সমস্যা হয়েছে')
      setOrders([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const safeOrders = Array.isArray(orders) ? orders : []

  const filteredOrders = safeOrders.filter(o => {
    if (!o) return false
    const matchesSearch =
      o.name?.toLowerCase().includes(search.toLowerCase()) ||
      o.phone.includes(search) ||
      o.whatsapp.includes(search)

    let matchesDate = true
    if (dateRange !== 'all' && o.created_at) {
      const orderDate = new Date(o.created_at)
      const now = new Date()
      if (dateRange === 'today') {
        matchesDate = orderDate.toDateString() === now.toDateString()
      } else if (dateRange === 'week') {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        matchesDate = orderDate >= weekAgo
      } else if (dateRange === 'month') {
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        matchesDate = orderDate >= monthAgo
      }
    }

    return matchesSearch && matchesDate
  })

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'অপেক্ষমাণ'
      case 'contacted': return 'যোগাযোগ করা হয়েছে'
      case 'completed': return 'সম্পন্ন'
      default: return status
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'contacted': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateStr: string) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    return date.toLocaleDateString('bn-BD', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const stats = {
    total: safeOrders.length,
    pending: safeOrders.filter(o => o.status === 'pending').length,
    contacted: safeOrders.filter(o => o.status === 'contacted').length,
    completed: safeOrders.filter(o => o.status === 'completed').length,
    completionRate: safeOrders.length > 0 ? Math.round((safeOrders.filter(o => o.status === 'completed').length / safeOrders.length) * 100) : 0
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-700 to-blue-900 text-white px-6 py-5">
        <div className="max-w-7xl mx-auto">
          <button onClick={() => router.push('/admin')} className="flex items-center gap-2 hover:underline mb-4">
            <FaArrowLeft /> অ্যাডমিন প্যানেলে ফিরে যান
          </button>
          <h1 className="text-2xl font-bold">অর্ডার ইতিহাস</h1>
          <p className="text-blue-200 text-sm mt-1">সকল অতীত অর্ডার ও ট্র্যাকিং</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-center">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <p className="text-sm text-gray-500">মোট অর্ডার</p>
            <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <p className="text-sm text-gray-500">সম্পন্ন</p>
            <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <p className="text-sm text-gray-500">সম্পন্নতার হার</p>
            <p className="text-3xl font-bold text-blue-600">{stats.completionRate}%</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <p className="text-sm text-gray-500">অপেক্ষমাণ</p>
            <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="নাম, ফোন বা হোয়াটসঅ্যাপ দিয়ে খুজুন..."
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <select
              value={dateRange}
              onChange={e => setDateRange(e.target.value)}
              className="px-5 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">সকল সময়</option>
              <option value="today">আজ</option>
              <option value="week">গত ৭ দিন</option>
              <option value="month">গত ৩০ দিন</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-500">লোড হচ্ছে...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl">
            <p className="text-4xl mb-4">📋</p>
            <p className="text-xl font-medium text-gray-700">কোনো অর্ডার পাওয়া যায়নি</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-4 px-6 font-bold text-gray-700">আইডি</th>
                  <th className="text-left py-4 px-6 font-bold text-gray-700">তারিখ</th>
                  <th className="text-left py-4 px-6 font-bold text-gray-700">নাম</th>
                  <th className="text-left py-4 px-6 font-bold text-gray-700">যোগাযোগ</th>
                  <th className="text-left py-4 px-6 font-bold text-gray-700">স্ট্যাটাস</th>
                  <th className="text-left py-4 px-6 font-bold text-gray-700">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => (
                  <tr key={order.id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6 font-medium text-gray-500">#{order.id}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <FaClock className="text-gray-400" />
                        {formatDate(order.created_at)}
                      </div>
                    </td>
                    <td className="py-4 px-6 font-medium">{order.name || '-'}</td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col gap-1 text-sm">
                        <span className="flex items-center gap-1"><FaPhone className="text-gray-400" /> {order.phone}</span>
                        <span className="flex items-center gap-1"><FaWhatsapp className="text-green-500" /> {order.whatsapp}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusLabel(order.status)}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <button
                          onClick={() => router.push(`/admin/${order.id}`)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
                        >
                          বিস্তারিত
                        </button>
                        <a
                          href={`https://wa.me/${order.whatsapp.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center gap-1"
                        >
                          <FaWhatsapp /> মেসেজ
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}