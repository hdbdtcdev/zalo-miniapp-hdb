// src/routes/index.tsx
import React from "react";

import { App as ZMPApp, ZMPRouter, Route, AnimationRoutes } from "zmp-ui";

import { AppProvider } from "@/lib/redux/provider";
import HomePage from "@/presentation/pages/HomePage";
import CreditCardPreview from "@/presentation/pages/card/CreditCardPreview";
import { DOPIntroScanScreen } from "../pages/dop/DOPIntroScanScreen";
import { DOPIDFrontScanScreen } from "../pages/dop/DOPIDFrontScanScreen";
import { DOPIDRearScanScreen } from "../pages/dop/DOPIDRearScanScreen";
import { DOPIDResultScanScreen } from "../pages/dop/DOPIDResultScanScreen";
import { DOPLiveFacePreScanScreen } from "../pages/dop/DOPLiveFacePreScanScreen";
import { DOPLiveFaceScanScreen } from "../pages/dop/DOPLiveFaceScanScreen";
import { DOPNFCScanScreen } from "../pages/dop/DOPNFCScanScreen";

const AppRoutes: React.FC = () => (
  <AppProvider>
    <ZMPApp>
      <ZMPRouter>
        <AnimationRoutes>
          <Route path="/" Component={HomePage} />
          <Route path="/CreditCardPreview" Component={CreditCardPreview} />
          <Route path="/dop-intro" Component={DOPIntroScanScreen} />
          <Route path="/dop-id-front-scan" Component={DOPIDFrontScanScreen} />
          <Route path="/dop-id-rear-scan" Component={DOPIDRearScanScreen} />
          <Route path="/dop-id-result-scan" Component={DOPIDResultScanScreen} />
          <Route
            path="/dop-live-face-pre-scan"
            Component={DOPLiveFacePreScanScreen}
          />
          <Route path="/dop-live-face-scan" Component={DOPLiveFaceScanScreen} />
          <Route path="/dop-nfc-scan" Component={DOPNFCScanScreen} />
        </AnimationRoutes>
      </ZMPRouter>
    </ZMPApp>
  </AppProvider>
);

export default AppRoutes;
