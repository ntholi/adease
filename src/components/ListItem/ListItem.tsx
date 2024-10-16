import { MantineProvider, NavLink, NavLinkProps } from '@mantine/core';
import { useEffect, useState } from 'react';

export interface ListItemProps extends NavLinkProps {
  path: string;
  id: string | number;
}

export function ListItem({ path, id, ...props }: ListItemProps) {
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
        {...props}
        active={pathname === `${path}/${id}`}
      />
    </MantineProvider>
  );
}
