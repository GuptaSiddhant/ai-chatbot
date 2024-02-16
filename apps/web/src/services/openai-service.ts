import type { IConversation } from '@ddp-bot/types'
import OpenAI from 'openai'

const apiKey = process.env.OPENAI_API_KEY
const openai = new OpenAI({ apiKey })

export async function getOpenAIResponse(
  input: string,
  userId: string,
  conversations: IConversation[] = [],
): Promise<string> {
  const previousMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] =
    conversations
      .map((c) => [
        { role: 'user', content: c.userMessage } as const,
        { role: 'assistant', content: c.botMessage } as const,
      ])
      .flat()

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    max_tokens: 100,
    messages: [...previousMessages, { role: 'user', content: input }],
    user: userId,
  })

  const message = response.choices[0]?.message.content?.trim()
  return message || "Sorry, I don't understand that."
}
