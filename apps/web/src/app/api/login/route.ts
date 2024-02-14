import { NextRequest, NextResponse } from 'next/server'
import { loginUser } from 'services/auth'

export async function POST(request: NextRequest) {
  const formData = await request.formData()

  const username = formData.get('username')?.toString()
  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 })
  }

  return loginUser(request, username)
}
