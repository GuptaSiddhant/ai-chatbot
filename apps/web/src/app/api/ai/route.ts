import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getOpenAIResponse } from 'services/openai-service'

export async function POST(request: NextRequest) {
  const userId = cookies().get('ddp-user')?.value
  if (!userId) {
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
