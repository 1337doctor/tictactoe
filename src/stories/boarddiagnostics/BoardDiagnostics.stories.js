import BoardDiagnostics from './BoardDiagnostics.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
    title: 'Board Diagnostics',
    component: BoardDiagnostics,
    tags: ['autodocs'],
    argTypes: {
    },
}

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const primary = {
    args: {
        diagnosticData: {movesLeft: 1, winConditionCount: 1, draw: true}
    },
}