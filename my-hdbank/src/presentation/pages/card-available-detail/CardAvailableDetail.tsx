import { useCardAvailableDetail, useCvpCommon } from "@/hooks";
import { useSelector } from "@/lib/redux";
import { MoveLeft } from "lucide-react";
import { FC, useCallback, useState } from "react";
import {
  Page,
  Header,
  Box,
  Button,
  Icon,
  Text,
  Checkbox,
  Cluster,
  useNavigate,
} from "zmp-ui";
import { selectCard } from "./redux";
import { selectData } from "@/presentation/cms/cvp_common";

const CardAvaialbleDetail: FC = () => {
  const navigate = useNavigate();
  const [muted, setMuted] = useState(false);

  const card = useSelector(selectCard);
  // const { status } = useCardAvailableDetail();

  const cvpCommon = useSelector(selectData);
  const { cvpCommonStatus } = useCvpCommon({
    locale: 'vi',
    populate: 'deep,5',
    domainCode: 'DOP',
    cvpTitle: 'dopvj',
    isActive: true,
  });

  const handleSelect = useCallback(() => {
    navigate("/dop-intro");
  }, [navigate]);

  const handleShare = async () => {
    try {
      await navigator.share({
        title: "Phát hành thẻ tín dụng HDBank",
        text: "Khám phá ưu đãi thẻ tín dụng",
        url: window.location.href,
      });
    } catch (err) {
      console.warn("Web share không hỗ trợ", err);
    }
    // }
  };

  const toggleMute = () => {
    setMuted((prev) => !prev);
    // TODO: nếu bạn có audio/video, điều khiển mute/unmute ở đây
  };

  console.log(`KhanhNHB card detail ===> ${JSON.stringify(cvpCommon)}`);

  return (
    <Page
      className="bg-transparent"
      style={{
        alignItems: "center",
        alignContent: 'center',
        justifyContent: 'center'
      }}
    >
      <Header
        backIcon={<MoveLeft color="#fff" />}
        title="Phát hành thẻ tín dụng"
        className="transparent-header flex items-center justify-between"
        style={{
          background: "transparent",
          boxShadow: "none",
          borderBottom: "none",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          justifyContent: "space-between",
        }}
      />

      {/* Floating Buttons */}
      <Box
        style={{
          position: "absolute",
          top: "30%",
          right: 16,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <Button
          icon={<Icon icon="zi-share" />}
          variant="secondary"
          size="small"
          onClick={handleShare}
          style={{
            background: "#fff",
            borderRadius: "50%",
            width: 40,
            height: 40,
            minWidth: 40,
            padding: 0,
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          }}
        />
        <Button
          icon={<Icon icon="zi-share" />}
          variant="secondary"
          size="small"
          onClick={toggleMute}
          style={{
            background: "#fff",
            borderRadius: "50%",
            width: 40,
            height: 40,
            minWidth: 40,
            padding: 0,
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          }}
        />
      </Box>

      {/* Box lợi ích */}
      <Box
        className="p-4"
        style={{
          background: "#fff",
          opacity: 0.8,
          borderRadius: 16,
          boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
          marginLeft: 16,
          marginRight: 16
        }}
      >
        <Cluster
          justify={"space-around"}
          align="center"
          space="1rem"
        >
          <Box style={{ textAlign: "center" }}>
            <Icon icon="zi-home" size={32} style={{ color: "#e02424" }} />
            <Text size="small">Siêu ưu đãi, ngàn tiện ích</Text>
          </Box>
          <Box style={{ textAlign: "center" }}>
            <Icon icon="zi-home" size={32} style={{ color: "#f59e0b" }} />
            <Text size="small">Tài khoản số đẹp như mơ</Text>
          </Box>
          <Box style={{ textAlign: "center" }}>
            <Icon icon="zi-share" size={32} style={{ color: "#3b82f6" }} />
            <Text size="small">Tích điểm đổi quà sang</Text>
          </Box>
        </Cluster>
      </Box>

      <Box className="p-4">
        {/* Button CTA */}
        <Box className="fixed bottom-0 left-0 right-0 p-6">
          {/* Checkbox & Chính sách */}
          <Box className="mt-4 mb-4">
            <Checkbox value="">
              <span style={{ fontSize: 12 }}>
                Tôi đã đọc, hiểu rõ và đồng ý toàn bộ nội dung{" "}
                <a
                  style={{ color: "#e02424", textDecoration: "underline" }}
                >
                  Chính sách bảo vệ, xử lý dữ liệu cá nhân
                </a>{" "}
                của HDBank.
              </span>
            </Checkbox>
          </Box>
          <Button
            fullWidth
            style={{
              background:
                "linear-gradient(90deg, #e02424 0%, #ff6a00 50%, #ffd166 100%)",
              color: "#fff",
              fontWeight: 600,
              borderRadius: 999,
              height: 52,
            }}
            onClick={handleSelect}
          >
            Mở thẻ ngay
          </Button>
        </Box>
      </Box>
    </Page>
  );
}

export default CardAvaialbleDetail;