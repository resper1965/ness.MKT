import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firestore-admin'
import * as admin from 'firebase-admin'

export const dynamic = 'force-dynamic'

// GET - Get signature by slug and increment views
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    if (!db) {
      return NextResponse.json({ error: 'Database not initialized' }, { status: 503 })
    }
    const snapshot = await db.collection('signatures')
      .where('slug', '==', slug)
      .limit(1)
      .get()

    if (snapshot.empty) {
      return NextResponse.json({ error: 'Signature not found' }, { status: 404 })
    }

    const doc = snapshot.docs[0]
    const signature = { id: doc.id, ...doc.data() }

    // Increment view count
    await doc.ref.update({
      views: admin.firestore.FieldValue.increment(1)
    })

    return NextResponse.json({ signature })
  } catch (error) {
    console.error('Error fetching signature:', error)
    return NextResponse.json({ error: 'Failed to fetch signature' }, { status: 500 })
  }
}

// DELETE - Delete signature
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    if (!db) {
      return NextResponse.json({ error: 'Database not initialized' }, { status: 503 })
    }
    const snapshot = await db.collection('signatures')
      .where('slug', '==', slug)
      .limit(1)
      .get()

    if (snapshot.empty) {
      return NextResponse.json({ error: 'Signature not found' }, { status: 404 })
    }

    await snapshot.docs[0].ref.delete()

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting signature:', error)
    return NextResponse.json({ error: 'Failed to delete signature' }, { status: 500 })
  }
}
