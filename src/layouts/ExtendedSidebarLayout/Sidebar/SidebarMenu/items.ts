import type { ReactNode } from 'react';
import { Dashboard as DashboardIcon } from '@mui/icons-material';
import { RoleNames } from 'src/utils/types';

export interface MenuItem {
  link?: string;
  icon?: ReactNode;
  badge?: string;
  badgeTooltip?: string;

  items?: MenuItem[];
  name: string;
  roles?: RoleNames[];
}

export interface MenuItems {
  items: MenuItem[];
  heading: string;
  roles?: RoleNames[];
}

const menuItems: MenuItems[] = [
  {
    heading: 'Inicio',
    items: [
      {
        name: 'Tablero',
        icon: DashboardIcon,
        link: '/home/user-dashboard',
      },
    ],
  },
];

export default menuItems;
