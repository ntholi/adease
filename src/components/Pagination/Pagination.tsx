import {
  Box,
  MantineProvider,
  Pagination as MPagination,
  PaginationProps as MPaginationProps,
} from '@mantine/core';
import { useEffect, useState } from 'react';

export interface PaginationProps extends MPaginationProps {
  total: number;
  navigate: (params: string) => void;
}

export function Pagination({ total, navigate, ...props }: PaginationProps) {
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useState(new URLSearchParams());

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const currentPage = Number(params.get('page')) || 1;
    setPage(currentPage);
    setSearchParams(params);
  }, []);

  const handleChange = (newPage: number) => {
    setPage(newPage);
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    navigate(params.toString());
  };

  return (
    <MantineProvider>
      <Box p={'sm'}>
        <MPagination
          size={'xs'}
          total={total}
          value={page}
          onChange={handleChange}
          {...props}
        />
      </Box>
    </MantineProvider>
  );
}
