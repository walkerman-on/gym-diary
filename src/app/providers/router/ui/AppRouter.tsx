import { Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import { AppRoutesProps } from '../config/types';

const AppRouter = (config: Record<any, AppRoutesProps>) => {
  return (
    <Suspense fallback={<p style={{ color: "red", fontSize: "30px" }}>Loading...</p>}>
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
