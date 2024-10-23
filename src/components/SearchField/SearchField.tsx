'use client';

import {
  CloseButton,
  MantineProvider,
  TextInput,
  TextInputProps,
} from '@mantine/core';
import { Search } from 'lucide-react';
import { useQueryState } from 'nuqs';

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
      <TextInput
        placeholder='Search'
        value={value || ''}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        rightSection={leftSection}
        {...props}
      />
    </MantineProvider>
  );
}
