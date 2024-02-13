import type { ICreateConversationPayload } from './types'

export function transformCreateConversationPayloadToRequestBody(
  payload: ICreateConversationPayload,
): string {
  return JSON.stringify({ ...payload, created: new Date().toISOString() })
}
