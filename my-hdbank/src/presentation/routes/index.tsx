// src/routes/index.tsx
import React from "react";

import { App as ZMPApp, ZMPRouter, Route, AnimationRoutes } from "zmp-ui";

import { AppProvider } from "@/lib/redux/provider";
import { CustomerInfoPage } from "../pages/kiem-tra-thong-tin/kiem-tra-thong-tin";
import { CreatePasswordPage } from "../pages/tao-mat-khau/tao-mat-khau";
import { CreatePinPage } from "../pages/tao-ma-pin/tao-ma-pin";
import { AddInfoCustomerPage } from "../pages/them-thong-tin/them-thong-tin";
import { CardAddressReceiverPage } from "../pages/dia-chi-nhan-the/dia-chi-nhan-the";
import { ResultPage } from "../pages/ket-qua/ket-qua";
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
          <Route path="/CustomerInfo" Component={CustomerInfoPage} />
          <Route path="/CreatePassword" Component={CreatePasswordPage} />
          <Route path="/CreatePin" Component={CreatePinPage} />
          <Route path="/ConfirmPin" Component={CreatePinPage} />
          <Route path="/AddInfoCustomer" Component={AddInfoCustomerPage} />
          <Route
            path="/CardAddressReceiver"
            Component={CardAddressReceiverPage}
          />
          <Route path="/Result" Component={ResultPage} />
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
