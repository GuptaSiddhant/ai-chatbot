import type { ICreateUserPayload } from './types'

export function transformCreateUserPayloadToRequestBody(
  payload: ICreateUserPayload,
): string {
  return JSON.stringify({ ...payload, created: new Date().toISOString() })
}
