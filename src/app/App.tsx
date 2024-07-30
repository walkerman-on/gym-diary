import React from 'react';
import "./styles/index.scss"
import { routeConfig } from './providers/router/config/RouterConfig';
import AppRouter from './providers/router/ui/AppRouter';

const App = () => {
  return (
    <>
      {AppRouter(routeConfig)}
    </>
  );
};

export default App;