'use client';

import {
  CloseButton,
  MantineProvider,
  TextInput,
  TextInputProps,
} from '@mantine/core';
import { Search } from 'lucide-react';
import { useQueryState } from 'nuqs';
import { NuqsAdapter } from 'nuqs/adapters/next';

export function SearchField(props: TextInputProps) {
  const [value, setValue] = useQueryState('search');

  const leftSection = value ? (
    <CloseButton
      onClick={() => {
        setValue(null);
      }}
    />
  ) : (
    <Search size={20} />
  );

  return (
    <MantineProvider>
      <NuqsAdapter>
        <TextInput
          placeholder='Search'
          value={value || ''}
          onChange={(event) => {
            setValue(event.target.value);
          }}
          rightSection={leftSection}
          {...props}
        />
      </NuqsAdapter>
    </MantineProvider>
  );
}
