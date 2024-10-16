import type { Meta, StoryObj } from '@storybook/react';
import { SearchField } from './SearchField';

const meta: Meta<typeof SearchField> = {
  title: 'SearchField',
  component: SearchField,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithParamsDisplay: Story = {
  args: {
    ...Default.args,
    navigate(params) {
      alert(params);
    },
  },
};
