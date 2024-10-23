'use client';
import {
  Box,
  MantineProvider,
  Pagination as MPagination,
  PaginationProps as MPaginationProps,
} from '@mantine/core';
import { parseAsInteger, useQueryState } from 'nuqs';
import { NuqsAdapter } from 'nuqs/adapters/next';

export interface PaginationProps extends MPaginationProps {
  total: number;
}

export function Pagination({ total, ...props }: PaginationProps) {
  const [page, setPage] = useQueryState('page', parseAsInteger);

  return (
    <MantineProvider>
      <NuqsAdapter>
        <Box p={'sm'}>
          <MPagination
            size={'xs'}
            total={total}
            value={page || undefined}
            onChange={(newPage) => setPage(newPage)}
            {...props}
          />
        </Box>
      </NuqsAdapter>
    </MantineProvider>
  );
}
