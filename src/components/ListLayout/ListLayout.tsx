'use client';

import React, { useEffect, useState } from 'react';
import {
  Divider,
  Flex,
  Grid,
  GridCol,
  Group,
  Paper,
  ScrollArea,
  Skeleton,
} from '@mantine/core';
import { SearchField } from '../SearchField';
import { Pagination } from '../Pagination';
import { parseAsInteger, useQueryState } from 'nuqs';

export type ListLayoutProps<T> = {
  getItems: (
    page: number,
    search: string
  ) => Promise<{ items: T[]; pages: number }>;
  renderItem: (item: T) => React.ReactNode;
  actionIcons?: React.ReactNode[];
  children: React.ReactNode;
};

export function ListLayout<T>({
  getItems,
  renderItem,
  actionIcons,
  children,
}: ListLayoutProps<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [pages, setPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page] = useQueryState('page', parseAsInteger);
  const [searchKey] = useQueryState('search');

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      const result = await getItems(page || 0, searchKey || '').finally(() => {
        setLoading(false);
      });
      setItems(result.items);
      setPages(result.pages);
    };

    fetchItems();
  }, [getItems, page, searchKey]);

  return (
    <Grid columns={14} gutter={'xl'}>
      <GridCol span={4} pr={7}>
        <Paper withBorder h={'88vh'}>
          <Flex direction='column' h='100%'>
            <Flex p={'md'} justify='space-between' align={'center'} gap={'xs'}>
              <Group style={{ width: '100%', flex: 1 }}>
                <SearchField style={{ width: '100%' }} />
              </Group>
              {actionIcons?.map((component, index) => (
                <React.Fragment key={index}>{component}</React.Fragment>
              ))}
            </Flex>
            <Divider />
            <ScrollArea type='always' style={{ flex: 1 }} p={'sm'}>
              {loading ? (
                <Loader />
              ) : (
                <>
                  {items.map((item: T, index: number) => (
                    <React.Fragment key={index}>
                      {renderItem(item)}
                    </React.Fragment>
                  ))}
                </>
              )}
            </ScrollArea>

            <Divider />
            <Pagination total={pages} />
          </Flex>
        </Paper>
      </GridCol>

      <GridCol span={10}>
        <Paper withBorder>
          <ScrollArea h='88vh' type='always'>
            {children}
          </ScrollArea>
        </Paper>
      </GridCol>
    </Grid>
  );
}

function Loader() {
  return Array.from({ length: 10 }).map((_, index) => (
    <Skeleton key={index} h={40} w={'90%'} mt={'xs'} mx={'xs'} />
  ));
}
