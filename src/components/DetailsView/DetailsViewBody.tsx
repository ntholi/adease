import React from 'react';
import { MantineProvider, Stack, type StackProps } from '@mantine/core';

export interface DetailsViewBodyProps extends StackProps {
  children: React.ReactNode;
}
export function DetailsViewBody({ children, ...props }: DetailsViewBodyProps) {
  return (
    <MantineProvider>
      <Stack p='xl' {...props}>
        {children}
      </Stack>
    </MantineProvider>
  );
}
