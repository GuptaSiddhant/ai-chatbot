import { Meta, StoryObj } from '@storybook/react'
import { TextInput } from './TextInput'

const meta: Meta<typeof TextInput> = {
  title: 'Common/TextInput',
  component: TextInput,
}

type TextInputStory = StoryObj<typeof TextInput>

export const Default: TextInputStory = {
  args: {
    label: 'Label',
    placeholder: 'This can be edited',
  },
}

export default meta
