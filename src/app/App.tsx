import "./styles/index.scss";
import AppRouter from './providers/router/ui/AppRouter';
import { routeConfig } from './providers/router/config/RouterConfig';
import { DekstopSupportPage } from 'pages/dekstop-support';
import { useDeviceSupport } from 'shared/lib/hooks';
import { useInstallApp } from 'shared/lib/hooks';
import { Message } from 'shared/ui/message';

const App = () => {
  const { isMobile } = useDeviceSupport();
  const { installMessage } = useInstallApp()

  if (!isMobile) {
    return <DekstopSupportPage />;
  }

  // if (installMessage) {
  //   return <Message />;
  // }

  return (
    <>
      {AppRouter(routeConfig)}
    </>
  );
};

export default App;
