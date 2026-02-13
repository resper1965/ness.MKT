import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firestore-admin'
import { nanoid } from 'nanoid'

export const dynamic = 'force-dynamic'

// GET - List all signatures
export async function GET() {
  try {
    if (!db) {
      return NextResponse.json({ error: 'Database not initialized' }, { status: 503 })
    }
    const snapshot = await db.collection('signatures')
      .orderBy('createdAt', 'desc')
      .limit(100)
      .get()

    const signatures = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    return NextResponse.json({ signatures })
  } catch (error) {
    console.error('Error fetching signatures:', error)
    return NextResponse.json({ error: 'Failed to fetch signatures' }, { status: 500 })
  }
}

// POST - Create a new signature
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nome, sobrenome, area, email, telefone, linkedin, whatsapp, template, theme } = body

    if (!nome || !sobrenome || !area || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (!email.endsWith('@ness.com.br')) {
      return NextResponse.json({ error: 'Acesso restrito a usuários @ness.com.br' }, { status: 403 })
    }

    const slug = nanoid(8)
    const now = new Date()

    const signatureData = {
      nome,
      sobrenome,
      area,
      email,
      telefone: telefone || null,
      linkedin: linkedin || null,
      whatsapp: whatsapp || null,
      template: template || 'classic',
      theme: theme || 'branco',
      slug,
      views: 0,
      createdAt: now,
      updatedAt: now,
    }

    if (!db) {
      return NextResponse.json({ error: 'Database not initialized' }, { status: 503 })
    }
    const docRef = await db.collection('signatures').add(signatureData)
    
    return NextResponse.json({ 
      signature: { id: docRef.id, ...signatureData }, 
      shareUrl: `/s/${slug}` 
    })
  } catch (error) {
    console.error('Error creating signature:', error)
    return NextResponse.json({ error: 'Failed to create signature' }, { status: 500 })
  }
}
