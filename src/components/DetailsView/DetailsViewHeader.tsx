'use client';

import { ActionIcon, Divider, Flex, Group, Title } from '@mantine/core';
import { EditIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DeleteButton } from '../DeleteButton';

export interface DetailsViewHeaderProps<T> {
  title: string;
  id: T;
  handleDelete?: (id: T) => Promise<void>;
}

export function DetailsViewHeader<T>({
  title,
  id,
  handleDelete,
}: DetailsViewHeaderProps<T>) {
  const pathname = usePathname();

  return (
    <>
      <Flex justify={'space-between'} align={'center'}>
        <Title order={3} fw={100}>
          {title}
        </Title>
        <Group>
          {handleDelete && <DeleteButton handleDelete={handleDelete} id={id} />}
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
    </>
  );
}
