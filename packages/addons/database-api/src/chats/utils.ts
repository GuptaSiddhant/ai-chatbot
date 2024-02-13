import type { ICreateChatPayload } from './types'

export function transformCreateChatPayloadToRequestBody(
  payload: ICreateChatPayload,
): string {
  return JSON.stringify({ ...payload, created: new Date().toISOString() })
}
