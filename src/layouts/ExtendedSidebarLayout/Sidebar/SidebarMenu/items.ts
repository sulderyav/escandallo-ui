import type { ReactNode } from 'react';
import KitchenIcon from '@mui/icons-material/Kitchen';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';

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
    heading: 'Administración',
    items: [
      {
        name: 'Ingredientes',
        icon: KitchenIcon,
        link: '/management/ingredients',
      },
      {
        name: 'Recetas',
        icon: SoupKitchenIcon,
        link: '/management/recipes',
      },
    ],
  },
];

export default menuItems;
