import { Meta, StoryObj } from '@storybook/react'
import { TextButton } from './TextButton'

const meta: Meta<typeof TextButton> = {
  title: 'Common/TextButton',
  component: TextButton,
}

type TextButtonStory = StoryObj<typeof TextButton>

export const Default: TextButtonStory = {
  args: {
    children: 'This can be clicked',
    onClick: () => alert('clicked!'),
  },
}

export default meta
