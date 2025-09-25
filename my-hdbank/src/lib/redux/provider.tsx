import React from 'react';
import { store } from './store';
import { Provider } from 'react-redux';
import { App, useTheme } from 'zmp-ui';
import bg from '@/asset/app-background.svg'

export const AppProvider = ({ children }: React.PropsWithChildren) => {
  const [theme] = useTheme();

  return (
    <Provider store={store}>
      <App theme={theme}>
        <div
          style={{
            minHeight: "100vh",
            backgroundImage: `url(${bg})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          {children}
        </div>
      </App>
    </Provider>
  );
}
