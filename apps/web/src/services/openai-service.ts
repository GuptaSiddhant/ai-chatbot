import OpenAI from 'openai'

const apiKey = process.env.OPENAI_API_KEY
const openai = new OpenAI({ apiKey })

export async function getOpenAIResponse(input: string): Promise<string> {
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    max_tokens: 100,
    messages: [{ role: 'user', content: input }],
  })

  return (
    response.choices[0]?.message.content?.trim() ||
    "Sorry, I don't understand that."
  )
}
