import { Meta, StoryObj } from '@storybook/react'
import { ConversationBubbles } from './ConversationBubbles'

const meta: Meta<typeof ConversationBubbles> = {
  title: 'Common/ConversationBubbles',
  component: ConversationBubbles,
}

type ConversationBubblesStory = StoryObj<typeof ConversationBubbles>

export const Default: ConversationBubblesStory = {
  args: {
    conversation: {
      id: '66d2',
      chatId: 'c43a',
      botMessage:
        'There are several ways to reduce carbon emissions:\n\n1. Use renewable energy sources: Transitioning to renewable sources of energy such as solar, wind, hydro, and geothermal power can significantly reduce carbon emissions.\n\n2. Increase energy efficiency: Improve the energy efficiency of buildings, vehicles, and industrial processes through better insulation, LED lighting, energy-efficient appliances, and advanced technology.\n\n3. Adopt sustainable transportation methods: Encourage the use of public transportation, carpooling, cycling, or walking instead of relying',
      userMessage: 'how to reduce carbon emission?',
      created: '2024-02-15T11:28:59.322Z',
    },
  },
}

export default meta
