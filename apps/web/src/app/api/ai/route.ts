import { NextRequest, NextResponse } from 'next/server'
import { getOpenAIResponse } from 'services/openai-service'
import { checkUserAuthenticated } from 'services/auth'
import { IConversation } from '@ddp-bot/types'

export async function POST(request: NextRequest) {
  const userId = checkUserAuthenticated(request)
  if (!userId) {
    return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })
  }

  const formData = await request.formData()
  const userMessage = formData.get('message')?.toString()
  if (!userMessage) {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 })
  }
  const chatId = formData.get('chatId')?.toString()
  if (!userMessage) {
    return NextResponse.json({ error: 'Chat ID is required' }, { status: 400 })
  }

  const recentConversations: IConversation[] = await fetch(
    `http://localhost:4000/conversations?chatId=${chatId}&_per_page=3&_page=1&_sort=-created`,
  )
    .then((res) => res.json())
    .then((res) => res.data.reverse())

  try {
    const botMessage = await getOpenAIResponse(
      userMessage,
      userId,
      recentConversations,
    )

    return NextResponse.json({ botMessage, userMessage }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
