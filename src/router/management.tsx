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
const Recipes = Loader(lazy(() => import('src/content/Management/Recipes')));
const CreateRecipe = Loader(
  lazy(() => import('src/content/Management/Recipes/Create'))
);
const Subjects = Loader(lazy(() => import('src/content/Management/Subjects')));
const Levels = Loader(lazy(() => import('src/content/Management/Levels')));
const Users = Loader(lazy(() => import('src/content/Management/Users')));

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
  {
    path: 'recipes',
    element: <Recipes />,
  },
  {
    path: 'recipes/create',
    element: <CreateRecipe />,
  },
  {
    path: 'recipes/:id',
    element: <Navigate to="/recipes" />,
  },
  {
    path: 'subjects/*',
    element: <Subjects />,
  },
  {
    path: 'levels/*',
    element: <Levels />,
  },
  {
    path: 'users/*',
    element: <Users />,
  },
];

export default homeRoutes;
