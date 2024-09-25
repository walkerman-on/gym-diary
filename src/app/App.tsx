import "./styles/index.scss";
import AppRouter from './providers/router/ui/AppRouter';
import { routeConfig } from './providers/router/config/RouterConfig';
import { DekstopSupportPage } from 'pages/dekstop-support';
import { useDeviceSupport } from 'shared/lib/hooks';
import { useInstallApp } from 'shared/lib/hooks';
import { Message } from 'shared/ui/message';
import classNames from "classnames";
import { useTheme } from 'app/providers/theme-provider';
import { useAuth } from "features/auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getDate, getLogin } from "./providers/router";
import dayjs from "dayjs";

const App = () => {
  const { isMobile } = useDeviceSupport();
  const { installMessage } = useInstallApp();

  const { isAuth } = useAuth()

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
