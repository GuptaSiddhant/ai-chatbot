import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const redirectUrl = new URL('/login', request.url)

  return NextResponse.redirect(redirectUrl, {
    status: 301,
    headers: {
      'Set-Cookie': `ddp-user=; Path=/; httpOnly:true; Max-Age=0; SameSite=Lax`,
    },
  })
}
