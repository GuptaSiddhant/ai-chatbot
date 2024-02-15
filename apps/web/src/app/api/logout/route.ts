import type { NextRequest } from 'next/server'
import { logoutUser } from 'services/auth'

export async function GET(request: NextRequest) {
  return await logoutUser(request)
}
