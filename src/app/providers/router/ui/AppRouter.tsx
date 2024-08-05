import { Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import { AppRoutesProps } from '../config/types';
import { PageLoader } from 'shared/ui/page-loader';

const AppRouter = (config: Record<any, AppRoutesProps>) => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {Object.values(config).map(({ element, path, children }) => (
          <Route key={path} path={path} element={element}>
            {children && children.map(({ element: childElement, path: childPath }) => (
              <Route key={childPath} path={childPath} element={childElement} />
            ))}
          </Route>
        ))}
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
