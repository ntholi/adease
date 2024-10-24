import { Box, Grid, NumberInput, TextInput } from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react';
import { Form } from './Form';

const meta: Meta<typeof Form> = {
  title: 'Form',
  component: Form,
};

export default meta;
type Form = StoryObj<typeof meta>;

export const Default: Form = {
  args: {
    action: async (values) => {
      console.log(values);
      return values;
    },
    title: 'Student',
    children: (
      <Box>
        <NumberInput label='Student Number' name='studentNumber' />
        <Grid>
          <Grid.Col span={6}>
            <TextInput label='First Name' name='firstName' />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput label='Last Name' name='lastName' />
          </Grid.Col>
        </Grid>
      </Box>
    ),
  },
};
