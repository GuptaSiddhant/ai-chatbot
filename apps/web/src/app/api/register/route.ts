import { NextRequest, NextResponse } from 'next/server'
import { registerUser } from 'services/auth'

export async function POST(request: NextRequest) {
  const formData = await request.formData()

  const username = formData.get('username')?.toString()
  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 })
  }

  const name = formData.get('name')?.toString()
  if (!name) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 })
  }

  return await registerUser(request, username, name)
}
