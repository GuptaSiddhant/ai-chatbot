import { Story, Canvas } from '@storybook/addon-docs'
import { Text, TextTypes, TextType } from './Text'
import { Primary } from '../Button/Button.stories'
import { StoryObj, Meta } from '@storybook/react'
import { Component } from 'react'

const meta: Meta<typeof Text> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Common/Text',
  component: Text,
}

export default meta

type TextStory = StoryObj<typeof Text>

export const AllText: TextStory = {
  render: (args) => (
    <>
      {Object.keys(TextTypes)
        .filter((t) => isNaN(Number(t)))
        .map((type) => (
          <Text key={type} type={type as TextType} text={type} />
        ))}
    </>
  ),
}
