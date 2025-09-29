// src/routes/index.tsx
import React from "react";

import { App as ZMPApp, ZMPRouter, Route, AnimationRoutes } from "zmp-ui";

import { AppProvider } from "@/lib/redux/provider";
import HomePage from "@/presentation/pages/HomePage";
import CreditCardPreview from "@/presentation/pages/card/CreditCardPreview";
import { DOPIntroScreen } from "../pages/dop-intro/DOPIntroScreen";
import { CustomerInfoPage } from "../pages/kiem-tra-thong-tin/kiem-tra-thong-tin";
import { CreatePasswordPage } from "../pages/tao-mat-khau/tao-mat-khau";
import { CreatePinPage } from "../pages/tao-ma-pin/tao-ma-pin";
import { AddInfoCustomerPage } from "../pages/them-thong-tin/them-thong-tin";
import { CardAddressReceiverPage } from "../pages/dia-chi-nhan-the/dia-chi-nhan-the";
import { ResultPage } from "../pages/ket-qua/ket-qua";

const AppRoutes: React.FC = () => (
  <AppProvider>
    <ZMPApp>
      <ZMPRouter>
        <AnimationRoutes>
          <Route path="/" Component={HomePage} />
          <Route path="/CreditCardPreview" Component={CreditCardPreview} />
          <Route path="/dop-intro" Component={DOPIntroScreen} />
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
        </AnimationRoutes>
      </ZMPRouter>
    </ZMPApp>
  </AppProvider>
);

export default AppRoutes;
