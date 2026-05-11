export interface Order {
  id: string
  name: string
  phone: string
  whatsapp: string
  message: string
  status: 'pending' | 'contacted' | 'completed'
  created_at: string
}

const STORAGE_KEY = 'bag_orders'

export function getOrders(): Order[] {
  if (typeof window === 'undefined') return []
  const data = localStorage.getItem(STORAGE_KEY)
  if (!data) return []
  try {
    return JSON.parse(data)
  } catch {
    return []
  }
}

export function saveOrders(orders: Order[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders))
}

export function addOrder(order: Omit<Order, 'id' | 'created_at'>): Order {
  const orders = getOrders()
  const newOrder: Order = {
    ...order,
    id: Date.now().toString(),
    created_at: new Date().toISOString(),
  }
  orders.unshift(newOrder)
  saveOrders(orders)
  return newOrder
}

export function updateOrder(id: string, updates: Partial<Order>): Order | null {
  const orders = getOrders()
  const index = orders.findIndex(o => o.id === id)
  if (index === -1) return null
  orders[index] = { ...orders[index], ...updates }
  saveOrders(orders)
  return orders[index]
}

export function deleteOrder(id: string): boolean {
  const orders = getOrders()
  const filtered = orders.filter(o => o.id !== id)
  if (filtered.length === orders.length) return false
  saveOrders(filtered)
  return true
}

export function getOrderById(id: string): Order | null {
  const orders = getOrders()
  return orders.find(o => o.id === id) || null
}