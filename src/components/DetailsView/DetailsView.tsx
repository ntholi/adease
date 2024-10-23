import { Box, MantineProvider, type BoxProps } from '@mantine/core';

export interface DetailsViewProps extends BoxProps {
  children: React.ReactNode;
}

export function DetailsView({ children, ...props }: DetailsViewProps) {
  return (
    <MantineProvider>
      <Box p={'xl'} {...props}>
        {children}
      </Box>
    </MantineProvider>
  );
}
