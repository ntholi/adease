import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import React from 'react';

export default function AdeaseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MantineProvider>
      <ModalsProvider>
        <NuqsAdapter>
          <Notifications />
          {children}
        </NuqsAdapter>
      </ModalsProvider>
    </MantineProvider>
  );
}
