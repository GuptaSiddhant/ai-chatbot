import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Colors } from '.'
/* @ts-ignore */
import { colorsList } from '../design-tokens'

export default {
  title: 'Design System/Colors',
  component: Colors,
} as ComponentMeta<typeof Colors>

const Template: ComponentStory<typeof Colors> = (args) => <Colors {...args} />

export const Colors_ = Template.bind({})
Colors_.args = {
  colors: colorsList,
}
