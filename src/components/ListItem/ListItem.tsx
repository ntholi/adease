import { MantineProvider, NavLink, NavLinkProps } from '@mantine/core';
import { useEffect, useState } from 'react';
import { ElementType } from 'react';

export interface ListItemProps extends Omit<NavLinkProps, 'component'> {
  path: string;
  id: string | number;
  as?: ElementType;
}

export function ListItem({ path, id, as, ...props }: ListItemProps) {
  const [pathname, setPathname] = useState('');
  const [searchParams, setSearchParams] = useState('');

  useEffect(() => {
    setPathname(window.location.pathname);
    setSearchParams(window.location.search.slice(1));

    const handleUrlChange = () => {
      setPathname(window.location.pathname);
      setSearchParams(window.location.search.slice(1));
    };

    window.addEventListener('popstate', handleUrlChange);

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, []);

  return (
    <MantineProvider>
      <NavLink
        href={`${path}/${id}${searchParams ? `?${searchParams}` : ''}`}
        active={pathname === `${path}/${id}`}
        component={as as any}
        {...props}
      />
    </MantineProvider>
  );
}
