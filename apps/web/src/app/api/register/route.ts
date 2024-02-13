import type { IUser } from '@ddp-bot/types'
import { NextRequest, NextResponse } from 'next/server'

const baseAuthUrl = 'http://localhost:4000/users/'

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

  const isUsernameTaken = await checkIsUsernameTaken(username)
  if (isUsernameTaken) {
    return NextResponse.json(
      { error: 'Username is already taken' },
      { status: 400 },
    )
  }

  const user = await createUser(username, name)

  const redirectUrl = new URL('/', request.url)
  return NextResponse.redirect(redirectUrl, {
    status: 301,
    headers: {
      'Set-Cookie': `ddp-user=${user.id}; Path=/; httpOnly:true; SameSite=Lax`,
    },
  })
}

async function checkIsUsernameTaken(username: string): Promise<boolean> {
  const response = await fetch(`${baseAuthUrl}?username=${username}`)
  const data = await response.json()
  return Boolean(data[0])
}

async function createUser(username: string, name: string): Promise<IUser> {
  const response = await fetch(baseAuthUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, name, created: new Date().toISOString() }),
  })
  return await response.json()
}
