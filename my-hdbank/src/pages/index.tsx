import { AppProvider } from "@/lib/redux/provider";
import CreditCardIssueScreen from "./trang-chu/trang-chu-dop";
import { DOPIntroScreen } from "@/pages/dop-intro";


function HomePage() {
  return (
    <AppProvider>
      <DOPIntroScreen />
    </AppProvider>
  );
}

export default HomePage;
