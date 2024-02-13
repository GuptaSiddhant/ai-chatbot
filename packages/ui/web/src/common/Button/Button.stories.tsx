import { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Common/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as Meta<typeof Button>

type ButtonStory = StoryObj<typeof Button>

export const Primary: ButtonStory = {
  args: {
    primary: true,
    children: 'Button',
  },
}

export const Secondary: ButtonStory = {
  args: {
    children: 'Secondary',
  },
}

export const Disabled: ButtonStory = {
  args: {
    disabled: true,
    children: <>Disabled...</>,
  },
}

export const Large: ButtonStory = {
  args: {
    size: 'large',

    children: 'Large',
  },
}

export const Small: ButtonStory = {
  args: {
    size: 'small',
    children: 'Small',
  },
}
