import { NuqsAdapter } from 'nuqs/adapters/next/app';
import React from 'react';

export default function AdeaseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <NuqsAdapter>{children}</NuqsAdapter>;
}
