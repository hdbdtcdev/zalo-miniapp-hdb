import { IMAGE_PNG } from "@/assets/images/png";
import { ExtractAddressResponse } from "@/domain/entities/address";
import { GetJobResponse } from "@/domain/entities/job";
import { useDispatch } from "@/lib/redux";
import { BottomSheetInput } from "@/presentation/bottomSheet/BottomSheetInput";
import {
  BottomSheetList,
  ItemModel,
} from "@/presentation/bottomSheet/BottomSheetList";
import { BottomSheetEditAddress } from "@/presentation/bottomSheet/dia-chi";
import { MoveLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Header, Page, Text, useNavigate } from "zmp-ui";
import { selectCustomerInfo, selectJobData } from "./selector";
import {
  updateAddrContact,
  updateAddrPermanet,
  updateCustomerInfo,
} from "./slice";
import { extractAddressThunk, getJobThunk } from "./thunk";

type InfoRowProps = {
  label: string;
  value: string;
  withArrow?: boolean;
  onClick?: () => void;
  isHide?: boolean;
};
const InfoRow = ({
  label,
  value,
  withArrow,
  onClick,
  isHide,
}: InfoRowProps) => (
  <Box
    flex
    flexDirection="row"
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
    <Box flex flexDirection="row" alignItems="center" style={{ flexGrow: 1 }}>
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
      {rows
        .filter((item) => !item.isHide)
        .map((row, idx) => (
          <InfoRow key={idx} {...row} />
        ))}
    </Box>
  </Box>
);

export const CustomerInfoPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [bsVisibleReferralCode, setBsVisibleReferralCode] = useState(false);
  const [bsVisibleCMND, setBsVisibleCMND] = useState(false);
  const [bsVisibleAddrPermanent, setBsVisibleAddrPermanent] = useState(false);
  const [bsVisibleAddrContact, setBsVisibleAddrContact] = useState(false);
  const [bsVisibleJob, setBsVisibleJob] = useState(false);
  const [bsVisiblePositionJob, setBsVisiblePositionJob] = useState(false);
  const customerInfo = useSelector(selectCustomerInfo);
  const { addrContact, addrPermanent, referralCode, cmnd } = customerInfo;
  const [loading, setLoading] = useState(false);
  const [listCareer, setListCareer] = useState<ItemModel[]>();
  const [listPosition, setListPosition] = useState<ItemModel[]>();
  const { careers, positions } = useSelector(selectJobData);
  useEffect(() => {
    setLoading(true);
    Promise.all([
      dispatch(
        extractAddressThunk({
          address: "thôn Khe Qué, xã Viễn Sơn, Văn Yên, Yên Bái",
          contactAddr: "thôn Khe Qué, xã Viễn Sơn, Văn Yên, Yên Bái",
          channel: "MB",
        })
      ).then((res) => {
        const response = res.payload as ExtractAddressResponse;
        if (response.resultCode !== "00") {
          console.log("BINHPV LOG APIS", JSON.stringify(res, null, 2));
          return;
        }
        dispatch(
          updateAddrContact({
            addressDetail: response.data.contactDetail,
            province: {
              id: response.data.contactProvinceId,
              value: response.data.contactProvinceName,
            },
            ward: {
              id: response.data.contactWardId,
              value: response.data.contactWardName,
            },
          })
        );
        dispatch(
          updateAddrPermanet({
            addressDetail: response.data.addrDetail,
            province: {
              id: response.data.addrProvinceId,
              value: response.data.addrProvinceName,
            },
            ward: {
              id: response.data.addrWardId,
              value: response.data.addrWardName,
            },
          })
        );
      }),
      dispatch(getJobThunk()).then((res) => {
        const response = res.payload as GetJobResponse;
        if (response.resultCode !== "00") return;
        setListCareer(
          response.data.careers.map((item) => ({
            id: item.careerId,
            value: item.careerName,
          }))
        );
      }),
    ]).finally(() => {
      setLoading(false);
    });
  }, []);

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
                  value: cmnd ?? "",
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
                  value: `${addrPermanent?.addressDetail}, ${addrPermanent?.ward?.value}, ${addrPermanent?.province?.value}`,
                  withArrow: true,
                  onClick: () => {
                    setBsVisibleAddrPermanent(true);
                  },
                },
                {
                  label: "Nơi ở hiện tại",
                  value: `${addrContact?.addressDetail}, ${addrContact?.ward?.value}, ${addrContact?.province?.value}`,
                  withArrow: true,
                  onClick: () => {
                    setBsVisibleAddrContact(true);
                  },
                },
                {
                  label: "Công việc",
                  value: customerInfo.career?.careerName ?? "Nhập",
                  withArrow: true,
                  onClick: () => {
                    setBsVisibleJob(true);
                  },
                },
                {
                  label: "Vị trí công việc",
                  value: customerInfo.position?.positionName ?? "",
                  withArrow: true,
                  onClick: () => {
                    setBsVisiblePositionJob(true);
                  },
                  isHide: !customerInfo.career,
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
              {!referralCode ? (
                <Box flex flexDirection="row" style={{ width: "100%" }}>
                  <Text style={{ flexGrow: 1 }}>Bạn có mã giới thiệu?</Text>
                  <Box flex justifyContent="center" alignItems="center">
                    <img
                      src="https://static-cdn.hdbank.com.vn/dibank/loan/assets/images/icons/right_arrow.png"
                      style={{ width: 8, height: 11 }}
                    />
                  </Box>
                </Box>
              ) : (
                <Text
                  style={{
                    textAlign: "end",
                    color: "black",
                    fontWeight: 700,
                    marginTop: 4,
                    width: "100%",
                  }}
                >
                  {referralCode}
                </Text>
              )}
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
        value={referralCode ?? ""}
        title="Mã giới thiệu"
        label="Nhập mã giới thiệu"
        isShowClearText={true}
        onConfirm={(text) => {
          dispatch(updateCustomerInfo({ referralCode: text }));
          setBsVisibleReferralCode(false);
        }}
        maskClosable={true}
        onClose={() => setBsVisibleReferralCode(false)}
        inputProps={{
          type: "number",
          inputMode: "numeric",
          pattern: "[0-9]*",
          maxLength: 10,
        }}
      />
      <BottomSheetInput
        visible={bsVisibleCMND}
        value={""}
        title="Số CMND cũ"
        label="Nhập số CMND cũ"
        isShowClearText={true}
        onConfirm={(text) => {
          dispatch(updateCustomerInfo({ cmnd: text }));
          setBsVisibleCMND(false);
        }}
        maskClosable={true}
        onClose={() => setBsVisibleCMND(false)}
        inputProps={{
          type: "number",
          inputMode: "numeric",
          pattern: "[0-9]*",
          maxLength: 10,
        }}
      />
      <BottomSheetEditAddress
        visible={bsVisibleAddrPermanent}
        fullAddress={addrPermanent}
        onClick={(addr) => {
          dispatch(updateAddrPermanet(addr));
          setBsVisibleAddrPermanent(false);
        }}
        maskCloseable={true}
        onClose={() => {
          setBsVisibleAddrPermanent(false);
        }}
      />
      <BottomSheetEditAddress
        visible={bsVisibleAddrContact}
        fullAddress={addrContact}
        onClick={(addr) => {
          dispatch(updateAddrContact(addr));
          setBsVisibleAddrContact(false);
        }}
        maskCloseable={true}
        onClose={() => {
          setBsVisibleAddrContact(false);
        }}
      />
      <BottomSheetList
        visible={bsVisibleJob}
        title="Công việc"
        content="Vui lòng chọn công việc hiện tại"
        listItem={listCareer ?? []}
        itemView={(item, index) => {
          return (
            <Box
              pr={4}
              pl={4}
              onClick={() => {
                if (careers && positions) {
                  const careerItem = careers.find(
                    (itemCareer) => itemCareer.careerId === item.id
                  );
                  setListPosition(
                    positions
                      .filter((position) => position.careerId === item.id)
                      .map((itemPosition) => ({
                        id: itemPosition.positionId,
                        value: itemPosition.positionName,
                      }))
                  );
                  dispatch(updateCustomerInfo({ career: careerItem }));
                }
                setBsVisibleJob(false);
                setBsVisiblePositionJob(true);
              }}
            >
              <Text
                style={{
                  marginTop: 15,
                  marginBottom: 15,
                }}
              >
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
        listItem={listPosition ?? []}
        itemView={(item, index) => {
          return (
            <Box
              pr={4}
              pl={4}
              onClick={() => {
                if (positions) {
                  const positionItem = positions.find(
                    (itemCareer) => itemCareer.positionId === item.id
                  );
                  dispatch(updateCustomerInfo({ position: positionItem }));
                }
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
