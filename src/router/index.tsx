import { RouteObject } from 'react-router';

import Authenticated from 'src/components/Authenticated';

import ExtendedSidebarLayout from 'src/layouts/ExtendedSidebarLayout';

import baseRoutes from './base';
import homeRoutes from './home';
import managementRoutes from './management';
import dashboardRoutes from './dashboard';

const router: RouteObject[] = [
  {
    path: '/',
    element: (
      <Authenticated>
        <ExtendedSidebarLayout />
      </Authenticated>
    ),
    children: [
      ...baseRoutes,
      {
        path: 'home',
        children: homeRoutes,
      },
      {
        path: 'management',
        children: managementRoutes,
      },
      {
        path: 'dashboard',
        children: dashboardRoutes,
      },
    ],
  },
];

export default router;
