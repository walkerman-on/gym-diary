import React from 'react';
import "./styles/index.scss"
import { routeConfig } from './providers/router/routeConfig/appRouterConfig';
import AppRouter from './providers/router/ui/AppRouter';

const App = () => {
  return (
    <>
      {AppRouter(routeConfig)}
    </>
  );
};

export default App;