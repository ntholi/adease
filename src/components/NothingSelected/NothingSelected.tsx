import { Stack, Title, Text, StackProps, MantineProvider } from '@mantine/core';

export interface NothingSelectedProps extends StackProps {
  title: string;
}

export function NothingSelected({ title, ...props }: NothingSelectedProps) {
  return (
    <MantineProvider>
      <Stack align='center' justify='center' mt='30vh' {...props}>
        <div>
          <Title fw={400} c='gray'>
            {title}
          </Title>
          <Text pl={3} c='gray' size='xs' ta='start'>
            Nothing Selected
          </Text>
        </div>
      </Stack>
    </MantineProvider>
  );
}
