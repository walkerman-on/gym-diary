import "./styles/index.scss";
import AppRouter from './providers/router/ui/AppRouter';
import { routeConfig } from './providers/router/config/RouterConfig';
import { DekstopSupportPage } from 'pages/dekstop-support';
import { useDeviceSupport } from 'shared/lib/hooks';
import { useInstallApp } from 'shared/lib/hooks';
import { Message } from 'shared/ui/message';
import classNames from "classnames";
import { useTheme } from 'app/providers/theme-provider';
import dayjs from 'dayjs';

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


  // Динамическое обновление start_url в манифесте
  window.addEventListener('load', () => {
    const manifestLink = document.querySelector('link[rel="manifest"]') as HTMLLinkElement;

    if (manifestLink) {
      fetch(manifestLink.href)
        .then(response => response.json())
        .then(manifest => {
          const today = dayjs();
          const dynamicStartUrl = `/workout/${today.format('YYYY-MM-DD')}`;
          manifest.start_url = dynamicStartUrl;

          // Создаем новый blob с обновленным манифестом
          const blob = new Blob([JSON.stringify(manifest)], { type: 'application/json' });
          const newManifestURL = URL.createObjectURL(blob);
          manifestLink.href = newManifestURL;
        })
        .catch(err => {
          console.error('Failed to update manifest:', err);
        });
    }
  });

  return (
    <div className={classNames("app", {}, [theme])}>
      {AppRouter(routeConfig)}
    </div>
  );
};

export default App;
