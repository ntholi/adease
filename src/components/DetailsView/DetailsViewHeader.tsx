import {
  ActionIcon,
  Divider,
  Flex,
  MantineProvider,
  Title,
} from '@mantine/core';
import { EditIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface DetailsViewHeaderProps {
  title: string;
}

export function DetailsViewHeader({ title }: DetailsViewHeaderProps) {
  const pathname = usePathname();
  return (
    <MantineProvider>
      <Flex justify={'space-between'} align={'center'}>
        <Title order={3} fw={100}>
          {title}
        </Title>
        <ActionIcon
          component={Link}
          size={'lg'}
          href={`${pathname}/edit`}
          variant='default'
        >
          <EditIcon size={'1.1rem'} />
        </ActionIcon>
      </Flex>
      <Divider my={15} />
    </MantineProvider>
  );
}
