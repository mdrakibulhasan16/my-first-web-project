'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FaWhatsapp, FaSearch, FaFilter, FaChevronRight, FaClock, FaCheck, FaUser, FaPhone } from 'react-icons/fa'

interface Order {
  id: number
  name: string
  phone: string
  whatsapp: string
  message: string
  status: string
  created_at: string
}

export default function AdminPanel() {
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
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

  const updateStatus = async (id: number, status: string) => {
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (res.ok) {
        fetchOrders()
      }
    } catch (err) {
      console.error('Failed to update:', err)
    }
  }

  const deleteOrder = async (id: number) => {
    if (!confirm('আপনি কি এই অর্ডার মুছতে চান?')) return
    try {
      const res = await fetch(`/api/orders/${id}`, { method: 'DELETE' })
      if (res.ok) {
        fetchOrders()
      }
    } catch (err) {
      console.error('Failed to delete:', err)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/login')
      router.refresh()
    } catch (err) {
      console.error('Logout failed:', err)
    }
  }

  const safeOrders = Array.isArray(orders) ? orders : []

  const filteredOrders = safeOrders.filter(o => {
    if (!o) return false
    const matchesSearch =
      o.name?.toLowerCase().includes(search.toLowerCase()) ||
      o.phone.includes(search) ||
      o.whatsapp.includes(search)
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const statusCounts = {
    all: safeOrders.length,
    pending: safeOrders.filter(o => o.status === 'pending').length,
    contacted: safeOrders.filter(o => o.status === 'contacted').length,
    completed: safeOrders.filter(o => o.status === 'completed').length,
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

  const formatDate = (dateStr: string) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    return date.toLocaleDateString('bn-BD', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-700 to-blue-900 text-white px-6 py-5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">অর্ডার অ্যাডমিন প্যানেল</h1>
            <p className="text-blue-200 text-sm mt-1">ব্যাগ পাইকারি অর্ডার ম্যানেজমেন্ট সিস্টেম</p>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" className="bg-white text-blue-700 px-5 py-2 rounded-lg font-medium hover:bg-blue-50 transition flex items-center gap-2">
              <FaWhatsapp /> ল্যান্ডিং পেজ
            </a>
            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-medium transition">
              লগআউট
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-center">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { key: 'all', label: 'সকল অর্ডার', color: 'from-gray-500 to-gray-600', icon: FaSearch },
            { key: 'pending', label: 'অপেক্ষমাণ', color: 'from-yellow-500 to-yellow-600', icon: FaClock },
            { key: 'contacted', label: 'যোগাযোগ করা হয়েছে', color: 'from-blue-500 to-blue-600', icon: FaWhatsapp },
            { key: 'completed', label: 'সম্পন্ন', color: 'from-green-500 to-green-600', icon: FaCheck },
          ].map(stat => (
            <button
              key={stat.key}
              onClick={() => setStatusFilter(stat.key)}
              className={`bg-gradient-to-br ${stat.color} text-white rounded-xl p-5 shadow-md hover:shadow-lg transition text-left ${
                statusFilter === stat.key ? 'ring-4 ring-white ring-opacity-50' : ''
              }`}
            >
              <stat.icon className="text-2xl mb-2 opacity-80" />
              <p className="text-3xl font-bold">{statusCounts[stat.key as keyof typeof statusCounts]}</p>
              <p className="text-sm opacity-90">{stat.label}</p>
            </button>
          ))}
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
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-5 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition"
            >
              <FaFilter /> ফিল্টার
            </button>
          </div>
          {showFilters && (
            <div className="mt-4 pt-4 border-t flex gap-3 flex-wrap">
              <span className="text-gray-500 py-2">স্ট্যাটাস:</span>
              {['all', 'pending', 'contacted', 'completed'].map(s => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    statusFilter === s
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {s === 'all' ? 'সকল' : getStatusLabel(s)}
                </button>
              ))}
            </div>
          )}
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-500">লোড হচ্ছে...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl">
            <p className="text-4xl mb-4">📦</p>
            <p className="text-xl font-medium text-gray-700">কোনো অর্ডার পাওয়া যায়নি</p>
            <p className="text-gray-500 mt-2">নতুন অর্ডার আসলে এখানে দেখা যাবে</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map(order => (
              <div key={order.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
                <div className="p-5">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">#{order.id}</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                          {getStatusLabel(order.status)}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <FaUser className="text-gray-400" />
                          <span>{order.name || 'নেই'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <FaPhone className="text-gray-400" />
                          <span>{order.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <FaWhatsapp className="text-gray-400" />
                          <span>{order.whatsapp}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 text-xs">
                          <FaClock className="text-gray-400" />
                          <span>{formatDate(order.created_at)}</span>
                        </div>
                      </div>
                      {order.message && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
                          <strong>মেসেজ:</strong> {order.message}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-2 lg:w-48">
                      <select
                        value={order.status}
                        onChange={e => updateStatus(order.id, e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      >
                        <option value="pending">অপেক্ষমাণ</option>
                        <option value="contacted">যোগাযোগ করা হয়েছে</option>
                        <option value="completed">সম্পন্ন</option>
                      </select>
                      <button
                        onClick={() => router.push(`/admin/${order.id}`)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition"
                      >
                        বিস্তারিত দেখুন <FaChevronRight />
                      </button>
                      <button
                        onClick={() => deleteOrder(order.id)}
                        className="w-full border border-red-300 text-red-600 hover:bg-red-50 py-2 rounded-lg text-sm font-medium transition"
                      >
                        মুছে ফেলুন
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}