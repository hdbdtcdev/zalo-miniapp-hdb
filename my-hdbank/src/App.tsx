import { Device } from "./utils";
import React, { useEffect } from "react";
import { ZMPRouter, Route, AnimationRoutes } from "zmp-ui";
import { DOPIntroScreen } from "@/presentation/pages/dop-intro/DOPIntroScreen";
import CardAvailableList from "@/presentation/pages/card-available-list/CardAvailableList";
import CardAvaialbleDetail from "@/presentation/pages/card-available-detail/CardAvailableDetail";

const App: React.FC = () => {

  useEffect(() => {
    Device.init();
  }, []);

  return (
    <ZMPRouter>
      <AnimationRoutes>
        <Route path="/" Component={CardAvailableList} />
        <Route path="/card-available-detail" Component={CardAvaialbleDetail} />
        <Route path="/dop-intro" Component={DOPIntroScreen} />
      </AnimationRoutes>
    </ZMPRouter>
  )
};

export default App;
