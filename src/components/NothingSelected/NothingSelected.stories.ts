import type { Meta, StoryObj } from '@storybook/react';
import { NothingSelected } from './NothingSelected';

const meta: Meta<typeof NothingSelected> = {
  title: 'NothingSelected',
  component: NothingSelected,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Nothing Selected',
  },
};
