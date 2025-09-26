import React from "react";

import { ZMPRouter, Route, AnimationRoutes } from "zmp-ui";

import HomePage from "@/presentation/pages/HomePage";
import CreditCardPreview from "@/presentation/pages/card/CreditCardPreview";
import { DOPIDFrontScanScreen } from "./presentation/pages/dop/DOPIDFrontScanScreen";
import { DOPIDRearScanScreen } from "./presentation/pages/dop/DOPIDRearScanScreen";
import { DOPIDResultScanScreen } from "./presentation/pages/dop/DOPIDResultScanScreen";
import { DOPIntroScanScreen } from "./presentation/pages/dop/DOPIntroScanScreen";
import { DOPLiveFacePreScanScreen } from "./presentation/pages/dop/DOPLiveFacePreScanScreen";
import { DOPLiveFaceScanScreen } from "./presentation/pages/dop/DOPLiveFaceScanScreen";
import { DOPNFCScanScreen } from "./presentation/pages/dop/DOPNFCScanScreen";

const App: React.FC = () => (
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
);

export default App;
