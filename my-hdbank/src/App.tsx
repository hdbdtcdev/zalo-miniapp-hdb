import React from "react";

import { ZMPRouter, Route, AnimationRoutes } from "zmp-ui";

import HomePage from "@/presentation/pages/HomePage";
import CreditCardPreview from "@/presentation/pages/card/CreditCardPreview";
import { DOPIntroScreen } from "@/presentation/pages/dop-intro/DOPIntroScreen";

const App: React.FC = () => (
  <ZMPRouter>
    <AnimationRoutes>
      <Route path="/" Component={HomePage} />
      <Route path="/CreditCardPreview" Component={CreditCardPreview} />
      <Route path="/dop-intro" Component={DOPIntroScreen} />
    </AnimationRoutes>
  </ZMPRouter>
);

export default App;
