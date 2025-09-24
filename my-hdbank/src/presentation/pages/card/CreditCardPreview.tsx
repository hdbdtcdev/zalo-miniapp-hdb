import { MoveLeft } from "lucide-react";
import { useCallback } from "react";
import { Page, Header, Box, Button, Icon, Text, Checkbox, Cluster, useNavigate } from "zmp-ui";

export default function CreditCardPreview() {
  const navigate = useNavigate();

  const handleSelect = useCallback(() => {
    navigate("/dop-intro");
  }, [useNavigate])

  return (
    <Page className="bg-transparent">
      <Header
        backIcon={<MoveLeft color="#fff" />}
        title="Phát hành thẻ tín dụng"
        className="transparent-header flex items-center justify-between"
        style={{
          background: "transparent",
          boxShadow: "none",
          borderBottom: "none",
          color: "#fff",
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
          justifyContent: 'space-between'
        }}
      />

      {/* Background Image */}
      <div
        style={{
          position: "relative",
          height: "60vh",
          backgroundImage: "url('/card-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <Box className="p-4 mt-4">
        {/* Box lợi ích */}
        <Box
          style={{
            marginTop: -40,
            background: "#fff",
            borderRadius: 16,
            padding: 16,
            boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
          }}
        >
          <Cluster justify={"space-around"}>
            <Box style={{ textAlign: "center" }}>
              <Icon icon="zi-home" size={32} style={{ color: '#e02424' }} />
              <Text size="small">Siêu ưu đãi, ngàn tiện ích</Text>
            </Box>
            <Box style={{ textAlign: "center" }}>
              <Icon icon="zi-home" size={32} style={{ color: '#f59e0b' }} />
              <Text size="small">Tài khoản số đẹp như mơ</Text>
            </Box>
            <Box style={{ textAlign: "center" }}>
              <Icon icon="zi-home" size={32} style={{ color: '#3b82f6' }} />
              <Text size="small">Tích điểm đổi quà sang</Text>
            </Box>
          </Cluster>
        </Box>

        {/* Button CTA */}
        <Box className="fixed bottom-0 left-0 right-0 p-6">
          {/* Checkbox & Chính sách */}
          <Box className="mt-4 mb-4">
            <Checkbox value=''>
              <span style={{ fontSize: 12 }}>
                Tôi đã đọc, hiểu rõ và đồng ý toàn bộ nội dung{" "}
                <a style={{ color: "#e02424", textDecoration: "underline" }}>
                  Chính sách bảo vệ, xử lý dữ liệu cá nhân
                </a>{" "}
                của HDBank.
              </span>
            </Checkbox>
          </Box>
          <Button
            fullWidth
            style={{
              background: "linear-gradient(90deg, #e02424 0%, #ff6a00 50%, #ffd166 100%)",
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
