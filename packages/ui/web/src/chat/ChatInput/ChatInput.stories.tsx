import { Meta, StoryObj } from '@storybook/react'
import { ChatInput } from './ChatInput'

const meta: Meta<typeof ChatInput> = {
  title: 'Common/ChatInput',
  component: ChatInput,
}

type ChatInputStory = StoryObj<typeof ChatInput>

export const Default: ChatInputStory = {
  args: {
    onSubmit: (e) => {
      e.preventDefault()
      alert('onSubmit')
    },
    cancel: () => alert('cancel'),
    isLoading: false,
    isPending: false,
  },
}

export const Pending: ChatInputStory = {
  args: {
    onSubmit: (e) => {
      e.preventDefault()
      alert('onSubmit')
    },
    cancel: () => alert('cancel'),
    isLoading: false,
    isPending: true,
  },
}

export default meta
