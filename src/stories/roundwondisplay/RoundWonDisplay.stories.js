import Headline from './RoundWonDisplay.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
  title: 'Round Won Display',
  component: Headline,
  tags: ['autodocs'],
  argTypes: {},
}

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary = {
  args: {
    player: {
      id: 1,
      icon: '&#127876;',
      name: 'X-Mas Tree',
    },
  },
}
