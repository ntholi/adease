'use client';
import { CloseButton, TextInput, TextInputProps } from '@mantine/core';
import { Search } from 'lucide-react';
import React from 'react';

export interface SearchFieldProps extends TextInputProps {
  navigate: (params: string) => void;
}

export function SearchField({ navigate, ...props }: SearchFieldProps) {
  const [value, setValue] = React.useState('');

  function handleSearch(value: string) {
    setValue(value);
    navigate(`search=${value}`);
  }

  const leftSection = value ? (
    <CloseButton
      onClick={() => {
        setValue('');
        navigate('');
      }}
    />
  ) : (
    <Search size={20} />
  );

  return (
    <TextInput
      placeholder='Search'
      value={value}
      onChange={(event) => {
        handleSearch(event.target.value);
      }}
      rightSection={leftSection}
      {...props}
    />
  );
}
