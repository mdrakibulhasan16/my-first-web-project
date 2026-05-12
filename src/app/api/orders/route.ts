import { NextRequest, NextResponse } from 'next/server'
import { getOrders, addOrder } from '@/lib/storage'

export async function GET() {
  try {
    const orders = await getOrders()
    return NextResponse.json(orders)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, whatsapp, message } = body

    if (!phone || !whatsapp) {
      return NextResponse.json({ error: 'Phone and WhatsApp are required' }, { status: 400 })
    }

    const newOrder = await addOrder({
      name: name || '',
      phone,
      whatsapp,
      message: message || '',
      status: 'pending',
    })

    return NextResponse.json(newOrder, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save order' }, { status: 500 })
  }
}