import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import App from 'zmp-ui/app';
import bg from '@/asset/app-background.svg'

export const AppProvider = ({ children }: React.PropsWithChildren) => (
  <Provider store={store}>
    <App theme="light">

      <div
        style={{
          minHeight: "100vh",
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >{children}</div>

    </App>
  </Provider>
);
