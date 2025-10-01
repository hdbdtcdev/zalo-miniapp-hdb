import { Button } from "zmp-ui";
import zm from "zmp-sdk";

export default function ShareButton() {
  const handleShare = () => {
    zm.openShareSheet({
      type: "link",
      data: {
        link: "https://your-landing-page.com",
      },
      success: () => {
        console.log("Share thành công");
      },
      fail: (err) => {
        console.error("Share thất bại:", err);
      },
    });
  };

  return (
    <Button fullWidth onClick={handleShare}>
      Chia sẻ
    </Button>
  );
}
