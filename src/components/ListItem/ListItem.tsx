import { NavLink, NavLinkProps } from '@mantine/core';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export interface ListItemProps extends Omit<NavLinkProps, 'component'> {
  id: string | number;
}

export function ListItem({ id, ...props }: ListItemProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return (
    <NavLink
      href={`${pathname}/${id}?${searchParams}`}
      active={pathname === `${pathname}/${id}`}
      component={Link}
      {...props}
    />
  );
}
