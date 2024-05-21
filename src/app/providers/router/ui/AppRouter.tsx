import { Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import { AppRoutesProps } from '../routeConfig/types';

const AppRouter = (config: Record<any, AppRoutesProps>) => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        {Object.values(config).map(({ element, path, authOnly }) => (
          <Route
            key={path}
            path={path}
            element={element}
          />
        ))}
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
