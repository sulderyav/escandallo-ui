import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';

import SuspenseLoader from 'src/components/SuspenseLoader';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Management components
const Ingredients = Loader(
  lazy(() => import('src/content/Management/Ingredients'))
);
const CreateIngredient = Loader(
  lazy(() => import('src/content/Management/Ingredients/Create'))
);

const homeRoutes = [
  {
    path: 'ingredients',
    element: <Ingredients />,
  },
  {
    path: 'ingredients/create',
    element: <CreateIngredient />,
  },
  {
    path: 'ingredients/:id',
    element: <Navigate to="/ingredients" />,
  },
];

export default homeRoutes;
