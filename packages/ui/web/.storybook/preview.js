import * as NextImage from 'next/image'
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

/**
 * Fix for using NextImage in Storybook (https://storybook.js.org/blog/get-started-with-storybook-and-next-js/)
 */
const OriginalNextImage = NextImage.default
Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
})

import 'tailwindcss/tailwind.css'
