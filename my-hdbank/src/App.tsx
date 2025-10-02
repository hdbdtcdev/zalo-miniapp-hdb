import { Device } from "./utils";
import React, { useEffect } from "react";
import { ZMPRouter, Route, AnimationRoutes } from "zmp-ui";
import CardAvailableList from "@/presentation/pages/card-available-list/CardAvailableList";
import CardAvaialbleDetail from "@/presentation/pages/card-available-detail/CardAvailableDetail";
import { DOPIDFrontScanScreen } from "./presentation/pages/dop/DOPIDFrontScanScreen";
import { DOPIDRearScanScreen } from "./presentation/pages/dop/DOPIDRearScanScreen";
import { DOPIDResultScanScreen } from "./presentation/pages/dop/DOPIDResultScanScreen";
import { DOPIntroScanScreen } from "./presentation/pages/dop/DOPIntroScanScreen";
import { DOPLiveFacePreScanScreen } from "./presentation/pages/dop/DOPLiveFacePreScanScreen";
import { DOPLiveFaceScanScreen } from "./presentation/pages/dop/DOPLiveFaceScanScreen";
import { DOPNFCScanScreen } from "./presentation/pages/dop/DOPNFCScanScreen";

const App: React.FC = () => {
  useEffect(() => {
    Device.init();
  }, []);

  return (
    <ZMPRouter>
      <AnimationRoutes>
        <Route path="/" Component={CardAvailableList} />
        <Route path="/card-available-detail/:productCode" Component={CardAvaialbleDetail} />
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
};

export default App;
