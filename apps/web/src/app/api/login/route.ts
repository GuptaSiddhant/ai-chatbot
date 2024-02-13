import type { IUser } from '@ddp-bot/types'
import { NextRequest, NextResponse } from 'next/server'

const baseAuthUrl = 'http://localhost:4000/users/'

export async function POST(request: NextRequest) {
  const formData = await request.formData()

  const username = formData.get('username')?.toString()
  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 })
  }

  const newUser = await checkIsUsernameExist(username)

  if (!newUser) {
    return NextResponse.json(
      { error: 'Username is not found' },
      { status: 404 },
    )
  }

  const redirectUrl = new URL('/', request.url)
  return NextResponse.redirect(redirectUrl, {
    status: 301,
    headers: {
      'Set-Cookie': `ddp-user=${newUser.id}; Path=/; httpOnly:true; SameSite=Lax`,
    },
  })
}

async function checkIsUsernameExist(username: string): Promise<IUser> {
  const response = await fetch(`${baseAuthUrl}?username=${username}`)
  const data = await response.json()
  return data[0]
}
