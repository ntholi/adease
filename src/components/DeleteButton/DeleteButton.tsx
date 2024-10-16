'use client';
import {
  ActionIcon,
  ActionIconProps,
  MantineProvider,
  Text,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { TrashIcon } from 'lucide-react';
import { useState } from 'react';

export interface DeleteButtonProps extends ActionIconProps {
  action: (id: string | number) => Promise<void>;
  id: number | string;
}

export function DeleteButton({ action, id, ...props }: DeleteButtonProps) {
  const [loading, setLoading] = useState(false);

  const openModal = () =>
    modals.openConfirmModal({
      title: 'Confirm Delete',
      children: <Text size='sm'>Are you sure you want to delete this</Text>,
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => handleDelete(),
    });

  function handleDelete() {
    setLoading(true);
    action(id).finally(() => setLoading(false));
  }
  return (
    <MantineProvider>
      <ActionIcon color='red' loading={loading} onClick={openModal} {...props}>
        <TrashIcon size={'1rem'} />
      </ActionIcon>
    </MantineProvider>
  );
}
