import "reflect-metadata";

// ZaUI stylesheet
import "zmp-ui/zaui.css";
// Tailwind stylesheet
import "@/css/tailwind.scss";
// Your stylesheet
import "@/css/app.scss";

// React core
import React from "react";
import { createRoot } from "react-dom/client";

// Expose app configuration
import appConfig from "../app-config.json";

import App from "./App";
import '@/services/i18n';
import { store } from "./lib/redux";
import { Provider as ReduxProvider } from 'react-redux';

import en from '@/locales/en.json';
import vi from '@/locales/vi.json';
import { initializeI18nFromStorage } from "./services/i18n/initializeI18n";
import { LanguageProvider } from "@/services/i18n";

if (!window.APP_CONFIG) {
  window.APP_CONFIG = appConfig as any;
}

const resources = {
  en: {
    ...en,
  },
  vi: {
    ...vi,
  },
};

initializeI18nFromStorage({ resources });

// Mount app vào div#app (index.html phải có <div id="app"></div>)
const root = createRoot(document.getElementById("app")!);
root.render(
  <React.StrictMode>
    <LanguageProvider initOptions={{ resources }}>
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    </LanguageProvider>
  </React.StrictMode>
);
