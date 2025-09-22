// src/routes/index.tsx
import React from 'react';

import { App as ZMPApp, ZMPRouter, Route, AnimationRoutes } from "zmp-ui";

import { AppProvider } from '@/lib/redux/provider';
import HomePage from '@/presentation/pages/HomePage';
import CreditCardPreview from '@/presentation/pages/card/CreditCardPreview';

const AppRoutes: React.FC = () => (
  <AppProvider>
    <ZMPApp>
      <ZMPRouter>
        <AnimationRoutes>
          <Route path="/" Component={HomePage} />
          <Route path='/CreditCardPreview' Component={CreditCardPreview} />
        </AnimationRoutes>
      </ZMPRouter>
    </ZMPApp>
  </AppProvider>
);

export default AppRoutes;
