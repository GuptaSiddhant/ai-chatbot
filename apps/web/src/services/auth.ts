import type { IUser } from '@ddp-bot/types'
import type { NextApiRequestCookies } from 'next/dist/server/api-utils'
import { NextResponse } from 'next/server'

const AUTH_COOKIE_NAME = 'ddp-user'
const baseAuthUrl = 'http://localhost:4000/users/'

export async function loginUser(request: Request, username: string) {
  const user = await checkIsUsernameExist(username)

  if (!user) {
    return NextResponse.json(
      { error: 'Username is not found' },
      { status: 404 },
    )
  }

  const redirectUrl = new URL('/', request.url).toString()
  return NextResponse.redirect(redirectUrl, {
    status: 307,
    headers: {
      'Set-Cookie': `${AUTH_COOKIE_NAME}=${user.id}; Path=/; httpOnly=true; SameSite=Lax`,
    },
  })
}

export async function logoutUser(request: Request) {
  const redirectUrl = new URL('/login', request.url).toString()

  return NextResponse.redirect(redirectUrl, {
    status: 307,
    headers: {
      'Set-Cookie': `${AUTH_COOKIE_NAME}=; Path=/; httpOnly=true; Max-Age=0; SameSite=Lax`,
    },
  })
}

export async function registerUser(
  request: Request,
  username: string,
  name: string,
) {
  const isUsernameTaken = Boolean(await checkIsUsernameExist(username))
  if (isUsernameTaken) {
    return NextResponse.json(
      { error: 'Username is already taken' },
      { status: 400 },
    )
  }

  try {
    const user = await createUser(username, name)

    return loginUser(request, user.username)
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong when registering' },
      { status: 500 },
    )
  }
}

export function checkUserAuthenticated(
  request: Request | { cookies: NextApiRequestCookies },
): string | undefined {
  if (request instanceof Request) {
    const cookie = request.headers.get('cookie')
    if (!cookie) return undefined

    const parsedCookie = parseCookie(cookie)
    return parsedCookie[AUTH_COOKIE_NAME]
  }

  if ('cookies' in request) {
    return request.cookies[AUTH_COOKIE_NAME]
  }

  return undefined
}

async function checkIsUsernameExist(
  username: string,
): Promise<IUser | undefined> {
  const response = await fetch(`${baseAuthUrl}?username=${username}`)
  if (!response.ok) return undefined
  const data = await response.json()
  return data[0]
}

async function createUser(username: string, name: string): Promise<IUser> {
  const response = await fetch(baseAuthUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, name, created: new Date().toISOString() }),
  })
  return await response.json()
}

function parseCookie(cookie: string) {
  return cookie
    .split(';')
    .map((v) => v.split('='))
    .reduce((acc, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim())
      return acc
    }, {})
}
