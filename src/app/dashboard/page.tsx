'use client'

import { useState, useEffect } from 'react'
import { FaWhatsapp, FaCheck, FaClock, FaTrash, FaSearch } from 'react-icons/fa'

interface Order {
  id: number
  name: string
  phone: string
  whatsapp: string
  message: string
  status: string
  created_at: string
}

export default function Dashboard() {
  const [orders, setOrders] = useState<Order[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders')
      const data = await res.json()
      setOrders(data)
    } catch (error) {
      console.error('Failed to fetch orders:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const updateStatus = async (id: number, status: string) => {
    try {
      await fetch(`/api/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      fetchOrders()
    } catch (error) {
      console.error('Failed to update:', error)
    }
  }

  const deleteOrder = async (id: number) => {
    if (!confirm('আপনি কি এই অর্ডার মুছতে চান?')) return
    try {
      await fetch(`/api/orders/${id}`, { method: 'DELETE' })
      fetchOrders()
    } catch (error) {
      console.error('Failed to delete:', error)
    }
  }

  const filteredOrders = orders.filter(o =>
    o.name?.toLowerCase().includes(search.toLowerCase()) ||
    o.phone.includes(search) ||
    o.whatsapp.includes(search)
  )

  const statusCounts = {
    pending: orders.filter(o => o.status === 'pending').length,
    contacted: orders.filter(o => o.status === 'contacted').length,
    completed: orders.filter(o => o.status === 'completed').length,
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">অর্ডার ড্যাশবোর্ড</h1>
          <a href="/" className="text-blue-600 hover:underline flex items-center gap-2">
            <FaWhatsapp /> ল্যান্ডিং পেজে যান
          </a>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-yellow-500">
            <div className="flex items-center gap-3">
              <FaClock className="text-yellow-500 text-2xl" />
              <div>
                <p className="text-sm text-gray-500">অপেক্ষমাণ</p>
                <p className="text-3xl font-bold">{statusCounts.pending}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-blue-500">
            <div className="flex items-center gap-3">
              <FaWhatsapp className="text-blue-500 text-2xl" />
              <div>
                <p className="text-sm text-gray-500">যোগাযোগ করা হয়েছে</p>
                <p className="text-3xl font-bold">{statusCounts.contacted}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-green-500">
            <div className="flex items-center gap-3">
              <FaCheck className="text-green-500 text-2xl" />
              <div>
                <p className="text-sm text-gray-500">সম্পন্ন</p>
                <p className="text-3xl font-bold">{statusCounts.completed}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex gap-4 items-center">
            <FaSearch className="text-gray-400" />
            <input
              type="text"
              placeholder="নাম, ফোন বা হোয়াটসঅ্যাপ দিয়ে খুজুন..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-10 text-gray-500">লোড হচ্ছে...</div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-10 text-gray-500">কোনো অর্ডার নেই</div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-4 px-6 font-bold text-gray-700">আইডি</th>
                  <th className="text-left py-4 px-6 font-bold text-gray-700">নাম</th>
                  <th className="text-left py-4 px-6 font-bold text-gray-700">ফোন</th>
                  <th className="text-left py-4 px-6 font-bold text-gray-700">হোয়াটসঅ্যাপ</th>
                  <th className="text-left py-4 px-6 font-bold text-gray-700">মেসেজ</th>
                  <th className="text-left py-4 px-6 font-bold text-gray-700">স্ট্যাটাস</th>
                  <th className="text-left py-4 px-6 font-bold text-gray-700">তারিখ</th>
                  <th className="text-left py-4 px-6 font-bold text-gray-700">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => (
                  <tr key={order.id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6 text-gray-500">#{order.id}</td>
                    <td className="py-4 px-6 font-medium">{order.name || '-'}</td>
                    <td className="py-4 px-6">{order.phone}</td>
                    <td className="py-4 px-6">{order.whatsapp}</td>
                    <td className="py-4 px-6 text-sm text-gray-600 max-w-xs truncate">{order.message || '-'}</td>
                    <td className="py-4 px-6">
                      <select
                        value={order.status}
                        onChange={e => updateStatus(order.id, e.target.value)}
                        className={`text-sm font-medium px-3 py-1 rounded-full border-0 ${
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          order.status === 'contacted' ? 'bg-blue-100 text-blue-700' :
                          'bg-green-100 text-green-700'
                        }`}
                      >
                        <option value="pending">অপেক্ষমাণ</option>
                        <option value="contacted">যোগাযোগ করা হয়েছে</option>
                        <option value="completed">সম্পন্ন</option>
                      </select>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500">
                      {new Date(order.created_at).toLocaleDateString('bn-BD')}
                    </td>
                    <td className="py-4 px-6">
                      <button onClick={() => deleteOrder(order.id)} className="text-red-500 hover:text-red-700 p-2">
                        <FaTrash />
                      </button>
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