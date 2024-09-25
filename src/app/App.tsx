import "./styles/index.scss";
import AppRouter from './providers/router/ui/AppRouter';
import { routeConfig } from './providers/router/config/RouterConfig';
import { DekstopSupportPage } from 'pages/dekstop-support';
import { useDeviceSupport } from 'shared/lib/hooks';
import { useInstallApp } from 'shared/lib/hooks';
import { Message } from 'shared/ui/message';
import classNames from "classnames";
import { useTheme } from 'app/providers/theme-provider';

const App = () => {
  const { isMobile } = useDeviceSupport();
  const { installMessage } = useInstallApp();

  if (!isMobile) {
    return <DekstopSupportPage />;
  }

  const { theme } = useTheme();

  // Uncomment if you want to show the install message
  // if (installMessage) {
  //   return <Message />;
  // }


  return (
    <div className={classNames("app", {}, [theme])}>
      {AppRouter(routeConfig)}
    </div>
  );
};

export default App;
