import React, { useEffect, useState } from 'react';
import "./styles/index.scss"
import { routeConfig } from './providers/router/config/RouterConfig';
import AppRouter from './providers/router/ui/AppRouter';
import { useTheme } from 'app/providers/theme-provider';
import { DekstopSupportPage } from 'pages/dekstop-support';
import { useDeviceSupport } from 'shared/lib/hooks/useDeviceSupport/useDeviceSupport';

const App = () => {
  const { isMobile } = useDeviceSupport()

  if (!isMobile) {
    return <DekstopSupportPage />
  }

  return (
    <>
      {AppRouter(routeConfig)}
    </>
  );
};

export default App;