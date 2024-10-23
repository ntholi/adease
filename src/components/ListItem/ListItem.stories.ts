import type { Meta, StoryObj } from '@storybook/react';
import { ListItem } from './ListItem';

const meta: Meta<typeof ListItem> = {
  title: 'ListItem',
  component: ListItem,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    path: '/',
    id: 1,
    label: 'Hello',
    description: 'Hello World',
  },
};
