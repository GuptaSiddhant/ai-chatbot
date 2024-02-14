import type { AppProps } from 'next/app'
import Head from 'next/head'
import 'tailwindcss/tailwind.css'
import { wrapper, Provider } from '@ddp-bot/store'
import { PageLayout } from '@ddp-bot/web-ui'

if (process.env.NEXT_PUBLIC_API_MOCKING_ENABLED === '1') {
  require('@ddp-bot/api-mocks')
}

const DPCNextRtkQStartPage = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest)

  return (
    <>
      <Head>
        <title>DDP Chatbot</title>
      </Head>
      <Provider store={store}>
        <PageLayout>
          <Component {...props.pageProps} />
        </PageLayout>
      </Provider>
    </>
  )
}

export default DPCNextRtkQStartPage
