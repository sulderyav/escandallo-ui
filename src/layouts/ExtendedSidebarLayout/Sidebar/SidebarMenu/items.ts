import type { ReactNode } from 'react';
import KitchenIcon from '@mui/icons-material/Kitchen';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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
      {
        name: 'Niveles',
        icon: AltRouteIcon,
        link: '/management/levels/list',
      },
      {
        name: 'Materias',
        link: '/management/subjects/list',
        icon: CoPresentIcon,
      },
      {
        name: 'Usuarios',
        icon: AccountCircleIcon,
        link: '/management/users/list',
      },
    ],
  },
  {
    heading: 'Dashboard',
    items: [
      {
        name: 'Escandallo',
        link: '/dashboard/cost-evaluation',
        icon: PointOfSaleIcon,
      },
    ],
  },
];

export default menuItems;
