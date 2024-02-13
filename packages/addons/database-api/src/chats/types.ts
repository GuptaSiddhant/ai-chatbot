import type { IChat } from '@ddp-bot/types'

export type ICreateChatPayload = Pick<IChat, 'title' | 'userId'>
