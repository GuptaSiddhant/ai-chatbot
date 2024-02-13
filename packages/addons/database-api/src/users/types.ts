import type { IUser } from '@ddp-bot/types'

export type ICreateUserPayload = Pick<IUser, 'name' | 'username'>
