import type { Meta, StoryObj } from '@storybook/react';
import { FieldView } from './FieldView';

const meta: Meta<typeof FieldView> = {
  title: 'FieldView',
  component: FieldView,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Name',
    children: 'Thabo Lebese',
  },
};
