import Headline from './Headline.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
  title: 'Headline',
  component: Headline,
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
export const headline1 = {
  args: {
    size: 'h1',
    label: 'H1 headline representation'
  },
}

export const headline2 = {
  args: {
    size: 'h2',
    label: 'H2 headline representation'
  },
}

export const headline3 = {
  args: {
    size: 'h3',
    label: 'H3 headline representation'
  },
}

export const headline4 = {
  args: {
    size: 'h4',
    label: 'H4 headline representation'
  },
}

export const headline5 = {
  args: {
    size: 'h5',
    label: 'H5 headline representation'
  },
}

export const headline6 = {
  args: {
    size: 'h6',
    label: 'H6 headline representation'
  },
}
