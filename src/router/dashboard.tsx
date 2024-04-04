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
const CostEvaluation = Loader(
  lazy(() => import('src/content/Dashboard/CostEvaluation'))
);

const dashboardRoutes = [
  {
    path: 'cost-evaluation',
    element: <CostEvaluation />,
  },
];

export default dashboardRoutes;
