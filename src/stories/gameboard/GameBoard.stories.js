import GameBoard from './GameBoard.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
  title: 'GameBoard',
  component: GameBoard,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: {
        type: 'select',
      },
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
  },
}

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const board = {
  args: {
    gameBoard: [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ],
  },
}
