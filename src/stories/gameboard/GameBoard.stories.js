import GameBoard from './GameBoard.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
  title: 'GameBoard',
  component: GameBoard,
  tags: ['autodocs'],
  argTypes: {
    onChangePlayer: { action: 'changePlayer' },
    onRoundWon: { action: 'roundWon' }
  },
}

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary = {
  args: {
    currentPlayer: {
      id: 1,
      icon: '&#127876;',
      name: 'X-Mas Tree',
    },
    playerData: [
      {
        id: 1,
        icon: '&#127876;',
        name: 'X-Mas Tree',
      },
      {
        id: 2,
        icon: '&#127877;',
        name: 'Santa',
      },
    ],
  },
}
