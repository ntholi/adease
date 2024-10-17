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

export type ListLayoutProps<T> = {
  getItems: (
    page: number,
    search: string
  ) => Promise<{ items: T[]; pages: number }>;
  path: string;
  renderItem: (item: T, path: string) => React.ReactNode;
  actionIcons?: React.ReactNode[];
  children: React.ReactNode;
  currentPage: number;
  currentSearch: string;
  onNavigate: (path: string) => void;
};

export function ListLayout<T>({
  getItems,
  path,
  renderItem,
  actionIcons,
  children,
  currentPage,
  currentSearch,
  onNavigate,
}: ListLayoutProps<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [pages, setPages] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      const result = await getItems(currentPage, currentSearch).finally(() => {
        setLoading(false);
      });
      setItems(result.items);
      setPages(result.pages);
    };

    fetchItems();
  }, [getItems, currentPage, currentSearch]);

  const handleNavigate = (newPath: string) => {
    onNavigate(newPath);
  };

  return (
    <Grid columns={14} gutter={'xl'}>
      <GridCol span={4} pr={7}>
        <Paper withBorder h={'88vh'}>
          <Flex direction='column' h='100%'>
            <Flex p={'md'} justify='space-between' align={'center'} gap={'xs'}>
              <Group style={{ width: '100%', flex: 1 }}>
                <SearchField
                  navigate={handleNavigate}
                  style={{ width: '100%' }}
                />
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
                      {renderItem(item, path)}
                    </React.Fragment>
                  ))}
                </>
              )}
            </ScrollArea>

            <Divider />
            <Pagination total={pages} navigate={handleNavigate} />
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
