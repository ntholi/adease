import '@mantine/core/styles.css';
import { Box, BoxProps, Divider, MantineProvider, Text } from '@mantine/core';
import React from 'react';

export type FieldViewProps = {
  label: string;
  children: React.ReactNode;
} & BoxProps;

export function FieldView({ label, children, ...props }: FieldViewProps) {
  return (
    <MantineProvider>
      <Box {...props}>
        {children ? (
          <>
            {React.isValidElement(children) ? (
              children
            ) : (
              <Text size='sm' fw={500}>
                {children}
              </Text>
            )}
          </>
        ) : (
          <Text size='sm'>Empty</Text>
        )}
        <Text size='sm' c='dimmed'>
          {label}
        </Text>
        <Divider />
      </Box>
    </MantineProvider>
  );
}
