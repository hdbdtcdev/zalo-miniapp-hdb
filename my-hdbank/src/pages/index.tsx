import { AppProvider } from "@/lib/redux/provider";
import CreditCardIssueScreen from "./trang-chu/trang-chu-dop";


function HomePage() {
  return (
    <AppProvider>
      <CreditCardIssueScreen />
    </AppProvider>
  );
}

export default HomePage;
