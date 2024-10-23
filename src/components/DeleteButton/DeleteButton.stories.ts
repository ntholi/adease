import type { Meta, StoryObj } from '@storybook/react';
import { DeleteButton } from './DeleteButton';

const meta: Meta<typeof DeleteButton> = {
  title: 'DeleteButton',
  component: DeleteButton,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    handleDelete: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return Promise.resolve();
    },
    id: 1,
  },
};

export const WithMessage: Story = {
  args: {
    ...Default.args,
    message: 'Look at this custom delete message',
  },
};

export const WithSuccess: Story = {
  args: {
    ...Default.args,
    onSuccess: () => {
      alert('Success');
    },
  },
};

export const WithError: Story = {
  args: {
    ...Default.args,
    handleDelete: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return Promise.reject(new Error('Something went wrong'));
    },
    onError: (error) => {
      alert(`Error: ${error.message}`);
    },
  },
};
