import {
  getChats,
  getDatabaseQueriesThunk,
  getUser,
} from '@ddp-bot/database-api'
import { wrapper, GetServerSidePropsCallback } from '@ddp-bot/store'
import type {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  PreviewData,
} from 'next'
import type { ParsedUrlQuery } from 'querystring'

type extractGeneric<Type> = Type extends GetServerSidePropsCallback<
  infer X,
  any
>
  ? X
  : never

export type AuthGetServerSideCallback<Props extends object> = (
  store: extractGeneric<Parameters<(typeof wrapper)['getServerSideProps']>[0]>,
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
  authUserId: string,
) => Promise<GetServerSidePropsResult<Props>>

export function generateAuthGetServerSideProps<Props extends object>(
  callback: AuthGetServerSideCallback<Props>,
) {
  return wrapper.getServerSideProps<Props>((store) => async (context) => {
    const authUserId = context.req.cookies['ddp-user']
    if (!authUserId) {
      return { redirect: { destination: '/login', statusCode: 301 } } as const
    }

    store.dispatch(getUser.initiate(authUserId))
    store.dispatch(getChats.initiate(authUserId))
    const result = await callback(store, context, authUserId)

    await Promise.all(store.dispatch(getDatabaseQueriesThunk()))

    return result
  })
}
