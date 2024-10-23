'use client';

import {
  ActionIcon,
  Divider,
  Flex,
  Group,
  MantineProvider,
  Title,
} from '@mantine/core';
import { EditIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DeleteButton } from '../DeleteButton';

export interface DetailsViewHeaderProps {
  title: string;
  id: string | number;
  handleDelete?: (id: string | number) => Promise<void>;
}

export function DetailsViewHeader({
  title,
  id,
  handleDelete,
}: DetailsViewHeaderProps) {
  const pathname = usePathname();

  return (
    <MantineProvider>
      <Flex justify={'space-between'} align={'center'}>
        <Title order={3} fw={100}>
          {title}
        </Title>
        <Group>
          {handleDelete && <DeleteButton action={handleDelete} id={id} />}
          <ActionIcon
            component={Link}
            href={`${pathname}/edit`}
            variant='default'
          >
            <EditIcon size={'1rem'} />
          </ActionIcon>
        </Group>
      </Flex>
      <Divider my={15} />
    </MantineProvider>
  );
}
