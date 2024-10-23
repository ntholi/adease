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
  message?: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function DeleteButton({
  action,
  id,
  message,
  onSuccess,
  onError,
  ...props
}: DeleteButtonProps) {
  const [loading, setLoading] = useState(false);

  const openModal = () =>
    modals.openConfirmModal({
      title: 'Confirm Delete',
      children: (
        <Text size='sm'>
          {message || 'Are you sure you want to delete this'}
        </Text>
      ),
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => handleDelete(),
    });

  async function handleDelete() {
    setLoading(true);
    try {
      await action(id);
      onSuccess?.();
    } catch (error) {
      if (error instanceof Error) {
        onError?.(error);
      } else {
        onError?.(new Error('An unknown error occurred'));
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <MantineProvider>
      <ActionIcon color='red' loading={loading} onClick={openModal} {...props}>
        <TrashIcon size={'1rem'} />
      </ActionIcon>
    </MantineProvider>
  );
}
