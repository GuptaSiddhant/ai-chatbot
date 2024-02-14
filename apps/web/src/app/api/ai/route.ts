import { NextRequest, NextResponse } from 'next/server'
import { getOpenAIResponse } from 'services/openai-service'
import { checkUserAuthenticated } from 'services/auth'

export async function POST(request: NextRequest) {
  if (!checkUserAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })
  }

  const formData = await request.formData()
  const userMessage = formData.get('message')?.toString()
  if (!userMessage) {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 })
  }

  try {
    const botMessage = await getOpenAIResponse(userMessage)

    return NextResponse.json({ botMessage, userMessage }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
