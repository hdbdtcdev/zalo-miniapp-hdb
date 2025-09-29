import { IMAGE_PNG } from "@/asset/png";
import { BottomSheetInput } from "@/presentation/bottomSheet/BottomSheetInput";
import { BottomSheetList } from "@/presentation/bottomSheet/BottomSheetList";
import { BottomSheetEditAddress } from "@/presentation/bottomSheet/dia-chi";
import { MoveLeft } from "lucide-react";
import { useState } from "react";
import { Box, Header, Page, Text, useNavigate } from "zmp-ui";

type InfoRowProps = {
  label: string;
  value: string;
  withArrow?: boolean;
  onClick?: () => void;
};
const InfoRow = ({ label, value, withArrow, onClick }: InfoRowProps) => (
  <Box
    flex
    flexDirection="row"
    alignItems="center"
    style={{ marginTop: 8 }}
    onClick={() => {
      withArrow && onClick && onClick();
    }}
  >
    <Text
      style={{ fontWeight: 400, fontSize: 14, color: "#6C737F", width: "50%" }}
    >
      {label}
    </Text>
    <Text
      style={{
        fontWeight: 600,
        fontSize: 14,
        textAlign: "right",
        flexGrow: 1,
        marginRight: 8,
      }}
    >
      {value}
    </Text>
    {withArrow && (
      <img
        src="https://static-cdn.hdbank.com.vn/dibank/loan/assets/images/icons/right_arrow.png"
        style={{ width: 8, height: 11 }}
      />
    )}
  </Box>
);

type InfoCardProps = {
  icon: string;
  title: string;
  subtitle: string;
  rows: InfoRowProps[];
};
const InfoCard = ({ icon, title, subtitle, rows }: InfoCardProps) => (
  <Box style={{ backgroundColor: "white", borderRadius: 16, marginTop: 16 }}>
    <Box
      style={{
        width: "100%",
        height: 80,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        overflow: "hidden",
        backgroundImage: `url(${IMAGE_PNG.BG_CARD_HEADER})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      flex
    >
      <Box flex flexDirection="row" alignItems="center" style={{ flexGrow: 1 }}>
        <img src={icon} style={{ width: 48, height: 48, marginLeft: 16 }} />
        <Box flex flexDirection="column" style={{ marginLeft: 12 }}>
          <Text style={{ color: "black" }}>{title}</Text>
          <Text style={{ color: "black", fontWeight: 700, marginTop: 4 }}>
            {subtitle}
          </Text>
        </Box>
      </Box>
    </Box>
    <Box style={{ padding: 16 }}>
      {rows.map((row, idx) => (
        <InfoRow key={idx} {...row} />
      ))}
    </Box>
  </Box>
);

export const CustomerInfoPage = () => {
  const navigate = useNavigate();
  const [bsVisibleReferralCode, setBsVisibleReferralCode] = useState(false);
  const [bsVisibleCMND, setBsVisibleCMND] = useState(false);
  const [bsVisibleAddrPermanent, setBsVisibleAddrPermanent] = useState(false);
  const [bsVisibleJob, setBsVisibleJob] = useState(false);
  const [bsVisiblePositionJob, setBsVisiblePositionJob] = useState(false);

  return (
    <>
      <Page>
        <Box
          style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 56px)" }}
        >
          <Header
            backIcon={<MoveLeft color="#fff" />}
            title="Phát hành thẻ tín dụng"
            className="transparent-header"
            style={{
              background: "transparent",
              boxShadow: "none",
              borderBottom: "none",
              color: "#fff",
            }}
          />
          <Box style={{ marginLeft: 16, marginRight: 16 }}>
            <Text
              style={{
                marginTop: 24,
                fontSize: 24,
                fontWeight: 600,
              }}
            >
              Kiểm tra lại thông tin
            </Text>
            <Text
              style={{
                marginTop: 8,
                fontSize: 14,
                fontWeight: 400,
              }}
            >
              Vui lòng kiểm tra thông tin trước khi tiếp tục
            </Text>

            <InfoCard
              icon="https://static-cdn.hdbank.com.vn/dibank/loan/assets/images/icons/icon_id.png"
              title="Số CCCD"
              subtitle="015092000982"
              rows={[
                { label: "Nơi cấp", value: "Cục CS ĐKQL cư trú-DLQG dân cư" },
                { label: "Ngày cấp", value: "01/01/2020" },
                { label: "Ngày hết hạn", value: "31/12/2030" },
                {
                  label: "Số CMND cũ",
                  value: "001304027098",
                  withArrow: true,
                  onClick: () => {
                    setBsVisibleCMND(true);
                  },
                },
              ]}
            />

            <InfoCard
              icon="https://static-cdn.hdbank.com.vn/dibank/loan/assets/images/icons/default_avatar.png"
              title="Họ và tên"
              subtitle="DANG TIEN ANH"
              rows={[
                { label: "Ngày sinh", value: "01/01/2020" },
                { label: "Giới tính", value: "Nam" },
                {
                  label: "Nơi thường trú",
                  value: "7 Thai Ha Street, An Khanh Ward, Vung Tau City, BRVT",
                  withArrow: true,
                  onClick: () => {
                    setBsVisibleAddrPermanent(true);
                  },
                },
                {
                  label: "Nơi ở hiện tại",
                  value: "7 Thai Ha Street, An Khanh Ward, Vung Tau City, BRVT",
                  withArrow: true,
                },
                {
                  label: "Công việc",
                  value: "Nhân viên văn phòng",
                  withArrow: true,
                  onClick: () => {
                    setBsVisibleJob(true);
                  },
                },
                {
                  label: "Vị trí công việc",
                  value: "Nhân viên",
                  withArrow: true,
                  onClick: () => {
                    setBsVisiblePositionJob(true);
                  },
                },
              ]}
            />

            <Box
              style={{
                borderRadius: 16,
                padding: 16,
                background: "white",
                marginTop: 16,
                marginBottom: 80,
              }}
              flex
              flexDirection="row"
              onClick={() => {
                setBsVisibleReferralCode(true);
              }}
            >
              <Text style={{ flexGrow: 1 }}>Bạn có mã giới thiệu?</Text>
              <Box flex justifyContent="center" alignItems="center">
                <img
                  src="https://static-cdn.hdbank.com.vn/dibank/loan/assets/images/icons/right_arrow.png"
                  style={{ width: 8, height: 11 }}
                />
              </Box>
            </Box>

            <Box
              style={{
                position: "sticky",
                bottom: 32,
                width: "100%",
              }}
            >
              <button
                style={{
                  width: "100%",
                  height: 56,
                  borderRadius: 999,
                  border: "none",
                  background:
                    "linear-gradient(90deg, #e02424 0%, #ff6a00 50%, #ffd166 100%)",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 16,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                }}
                onClick={() => {
                  navigate("/CreatePassword");
                }}
              >
                Chọn sản phẩm này
              </button>
            </Box>
          </Box>
        </Box>
      </Page>
      <BottomSheetInput
        visible={bsVisibleReferralCode}
        value={""}
        title="Mã giới thiệu"
        label="Nhập mã giới thiệu"
        isShowClearText={true}
        onClick={(_text) => {
          setBsVisibleReferralCode(false);
        }}
        maskClosable={true}
        onClose={() => setBsVisibleReferralCode(false)}
      />
      <BottomSheetInput
        visible={bsVisibleCMND}
        value={""}
        title="Số CMND cũ"
        label="Nhập số CMND cũ"
        isShowClearText={true}
        onClick={(_text) => {
          setBsVisibleCMND(false);
        }}
        maskClosable={true}
        onClose={() => setBsVisibleCMND(false)}
      />
      <BottomSheetEditAddress
        visible={bsVisibleAddrPermanent}
        onClick={() => {
          setBsVisibleAddrPermanent(false);
        }}
        maskCloseable={true}
        onClose={() => {
          setBsVisibleAddrPermanent(false);
        }}
      />
      <BottomSheetList
        visible={bsVisibleJob}
        title="Công việc"
        content="Vui lòng chọn công việc hiện tại"
        listItem={[
          { code: "01", value: "Nội trợ" },
          { code: "02", value: "Kinh doanh" },
          { code: "03", value: "Thông tin và truyền thông" },
          { code: "04", value: "Giáo dục - Đào tạo" },
          { code: "05", value: "Y tế" },
          { code: "00", value: "Khác" },
        ]}
        itemView={(item, index) => {
          return (
            <Box
              pr={4}
              pl={4}
              onClick={() => {
                setBsVisibleJob(false);
              }}
            >
              <Text style={{ marginTop: 15, marginBottom: 15 }}>
                {item.value}
              </Text>
              {index != 5 && (
                <Box height={1} style={{ background: "#E5E7EB" }} />
              )}
            </Box>
          );
        }}
        onClose={() => setBsVisibleJob(false)}
      />
      <BottomSheetList
        visible={bsVisiblePositionJob}
        title="Vị trí công việc"
        content="Vui lòng chọn vị trí công việc của bạn"
        listItem={[
          { code: "01", value: "Nhân viên" },
          { code: "02", value: "Kế toán" },
          { code: "03", value: "Trưởng phòng" },
          { code: "04", value: "Quản lý" },
          { code: "05", value: "Thu Ngân " },
          { code: "00", value: "Giao hàng" },
        ]}
        itemView={(item, index) => {
          return (
            <Box
              pr={4}
              pl={4}
              onClick={() => {
                setBsVisiblePositionJob(false);
              }}
            >
              <Text style={{ marginTop: 15, marginBottom: 15 }}>
                {item.value}
              </Text>
              {index != 5 && (
                <Box height={1} style={{ background: "#E5E7EB" }} />
              )}
            </Box>
          );
        }}
        onClose={() => setBsVisiblePositionJob(false)}
      />
    </>
  );
};
