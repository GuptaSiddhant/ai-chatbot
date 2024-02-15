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
import { checkUserAuthenticated } from 'services/auth'

type extractGeneric<Type> = Type extends GetServerSidePropsCallback<
  infer X,
  any
>
  ? X
  : never

type AuthGetServerSideCallback<Props extends object> = (
  store: extractGeneric<Parameters<(typeof wrapper)['getServerSideProps']>[0]>,
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
  authUserId: string,
) => Promise<GetServerSidePropsResult<Props>>

export function generateAuthGetServerSideProps<Props extends object>(
  callback: AuthGetServerSideCallback<Props> | undefined,
  successRedirect?: string,
) {
  return wrapper.getServerSideProps<Props>((store) => async (context) => {
    const authUserId = checkUserAuthenticated(context.req)
    if (!authUserId) {
      return { redirect: { destination: '/login', statusCode: 302 } } as const
    }
    if (successRedirect) {
      return {
        redirect: { destination: successRedirect, statusCode: 302 },
      } as const
    }

    store.dispatch(getUser.initiate(authUserId))
    store.dispatch(getChats.initiate(authUserId))
    const result = await callback?.(store, context, authUserId)

    await Promise.all(store.dispatch(getDatabaseQueriesThunk()))

    return result || { props: { userId: authUserId } as Props }
  })
}

export function generateUnAuthGetServerSideProps(
  successRedirect: string = '/',
) {
  return wrapper.getServerSideProps<{}>(() => async (context) => {
    const authUserId = checkUserAuthenticated(context.req)
    if (authUserId) {
      return {
        redirect: { destination: successRedirect, statusCode: 302 },
      } as const
    }

    return { props: {} }
  })
}
