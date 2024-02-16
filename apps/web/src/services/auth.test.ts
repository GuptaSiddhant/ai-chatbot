/* eslint-env jest */
/**
 * @jest-environment node
 */

import {
  checkUserAuthenticated,
  registerUser,
  loginUser,
  logoutUser,
} from './auth'

describe('checkUserAuthenticated', () => {
  test('should return undefined if request is not a Request or does not have cookies', () => {
    // @ts-expect-error
    expect(checkUserAuthenticated()).toBeUndefined()
    expect(checkUserAuthenticated({ cookies: {} })).toBeUndefined()
  })

  test('should return the value of the auth cookie from request', () => {
    const request = new Request('https://example.com', {
      headers: { Cookie: 'ddp-user=1234' },
    })
    expect(checkUserAuthenticated(request)).toBe('1234')
  })

  test('should return the value of the auth cookie from request-like', () => {
    const request = { cookies: { 'ddp-user': '1234' } }

    expect(checkUserAuthenticated(request)).toBe('1234')
  })
})

describe('loginUser', () => {
  test('should return a error is username not found', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({}),
      } as Response),
    )
    const request = new Request('https://example.com/login')
    const response = await loginUser(request, 'username')
    expect(response.status).toBe(404)
  })

  test('should return a response with a cookie', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ id: '1234' }]),
      } as Response),
    )
    const request = new Request('https://example.com/login')
    const response = await loginUser(request, 'username')
    expect(response.status).toBe(307)
    const cookie = response.headers.get('Set-Cookie')
    expect(cookie).toMatch(/ddp-user=1234/)
  })
})

describe('logoutUser', () => {
  test('should return a response with a cookie', async () => {
    const request = new Request('https://example.com/logout')
    const response = await logoutUser(request)
    expect(response.status).toBe(307)
    const cookie = response.headers.get('Set-Cookie')
    expect(cookie).toMatch(/ddp-user=/)
  })
})

describe('registerUser', () => {
  test('should return error is username is already taken', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ username: 'username' }]),
      } as Response),
    )

    const request = new Request('https://example.com/login')
    const response = await registerUser(request, 'username', 'name')

    expect(response.status).toBe(400)
    expect(await response.json()).toEqual({
      error: 'Username is already taken',
    })
  })

  test('should return error is username is not taken', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => {
      return Promise.resolve({
        ok: false,
        json: () => Promise.resolve([]),
      } as Response)
    })

    const request = new Request('https://example.com/register')
    const response = await registerUser(request, 'username', 'name')
    expect(response.status).toBe(500)
  })
})
