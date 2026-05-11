import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'

export async function GET() {
  try {
    const db = getDb()
    const orders = db.prepare('SELECT * FROM orders ORDER BY created_at DESC').all()
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

    const db = getDb()
    const result = db.prepare(
      'INSERT INTO orders (name, phone, whatsapp, message) VALUES (?, ?, ?, ?)'
    ).run(name || '', phone, whatsapp, message || '')

    return NextResponse.json({ id: result.lastInsertRowid, message: 'Order saved' }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save order' }, { status: 500 })
  }
}