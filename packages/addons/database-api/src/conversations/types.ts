import type { IConversation } from '@ddp-bot/types'

export type ICreateConversationPayload = Pick<
  IConversation,
  'botMessage' | 'userMessage' | 'chatId'
>
