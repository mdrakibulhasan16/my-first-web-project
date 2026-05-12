import { MongoClient, Db, Document, ObjectId } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017'
const MONGODB_DB = process.env.MONGODB_DB || 'bag_orders'

let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

export interface Order {
  id?: string
  _id?: string
  name: string
  phone: string
  whatsapp: string
  message: string
  status: 'pending' | 'contacted' | 'completed'
  created_at: string
}

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  const client = new MongoClient(MONGODB_URI)
  await client.connect()
  const db = client.db(MONGODB_DB)

  cachedClient = client
  cachedDb = db

  return { client, db }
}

function toObjectId(id: string): ObjectId {
  return new ObjectId(id)
}

export async function getOrders(): Promise<Order[]> {
  try {
    const { db } = await connectToDatabase()
    const orders = await db.collection('orders').find({}).sort({ created_at: -1 }).toArray()
    return orders.map((order: Document) => ({
      name: order.name as string || '',
      phone: order.phone as string || '',
      whatsapp: order.whatsapp as string || '',
      message: order.message as string || '',
      status: (order.status as 'pending' | 'contacted' | 'completed') || 'pending',
      created_at: order.created_at as string || new Date().toISOString(),
      id: order._id?.toString(),
    }))
  } catch (error) {
    console.error('Error fetching orders:', error)
    return []
  }
}

export async function addOrder(order: Omit<Order, 'id' | '_id' | 'created_at'>): Promise<Order> {
  const { db } = await connectToDatabase()
  const created_at = new Date().toISOString()
  const result = await db.collection('orders').insertOne({
    ...order,
    created_at,
  })
  return {
    ...order,
    id: result.insertedId.toString(),
    created_at,
  }
}

export async function updateOrder(id: string, updates: Partial<Order>): Promise<Order | null> {
  try {
    const { db } = await connectToDatabase()
    const result = await db.collection('orders').findOneAndUpdate(
      { _id: toObjectId(id) },
      { $set: updates },
      { returnDocument: 'after' }
    )
    if (!result) return null
    return {
      name: result.name as string || '',
      phone: result.phone as string || '',
      whatsapp: result.whatsapp as string || '',
      message: result.message as string || '',
      status: (result.status as 'pending' | 'contacted' | 'completed') || 'pending',
      created_at: result.created_at as string || new Date().toISOString(),
      id: result._id?.toString(),
    }
  } catch (error) {
    console.error('Error updating order:', error)
    return null
  }
}

export async function deleteOrder(id: string): Promise<boolean> {
  try {
    const { db } = await connectToDatabase()
    const result = await db.collection('orders').deleteOne({ _id: toObjectId(id) })
    return result.deletedCount > 0
  } catch (error) {
    console.error('Error deleting order:', error)
    return false
  }
}

export async function getOrderById(id: string): Promise<Order | null> {
  try {
    const { db } = await connectToDatabase()
    const order = await db.collection('orders').findOne({ _id: toObjectId(id) })
    if (!order) return null
    return {
      name: order.name as string || '',
      phone: order.phone as string || '',
      whatsapp: order.whatsapp as string || '',
      message: order.message as string || '',
      status: (order.status as 'pending' | 'contacted' | 'completed') || 'pending',
      created_at: order.created_at as string || new Date().toISOString(),
      id: order._id?.toString(),
    }
  } catch (error) {
    console.error('Error fetching order:', error)
    return null
  }
}