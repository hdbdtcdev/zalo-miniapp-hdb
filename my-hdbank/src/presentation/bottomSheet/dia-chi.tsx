import { Box, Input, Text } from "zmp-ui";
import { BottomSheetBase } from "./BottomSheetBase";
import { useEffect, useState } from "react";
import { BottomSheetProvinceWard, FullAddress } from "./tinh-thanh-phuong-xa";

type BottomSheetEditAddressProps = {
  visible: boolean;
  onClick?: (FullAddress) => void;
  fullAddress?: FullAddress;
  maskCloseable?: boolean;
  onClose?: () => void;
};
export const BottomSheetEditAddress = (props: BottomSheetEditAddressProps) => {
  const { visible, onClick, fullAddress, maskCloseable, onClose } = props;
  const [bsProvinceWard, setBsProvinceWard] = useState(false);
  const { addressDetail, province, ward } = fullAddress ?? ({} as FullAddress);
  const [detailAddr, setDetailAddr] = useState(addressDetail);
  const [fullAddr, setFullAddr] = useState(fullAddress);
  return (
    <>
      <BottomSheetBase
        visible={visible}
        title="Địa chỉ "
        maskClosable={maskCloseable}
        onClose={onClose}
      >
        <Box pr={4} pl={4} style={{ marginTop: 36 }}>
          <Box style={{ flexGrow: 1, marginRight: 8 }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 400,
                color: "#9DA4AE",
                marginTop: 8,
              }}
            >
              Số nhà, tên đường
            </Text>

            <input
              placeholder={"Số nhà, tên đường"}
              style={{
                border: 0,
                fontSize: 16,
                fontWeight: 400,
                marginTop: 14,
                marginBottom: 14,
                height: 21,
                outline: "none",
                boxShadow: "none",
                paddingLeft: 0,
              }}
              value={detailAddr}
              onChange={(text) => {
                setDetailAddr(text.target.value);
              }}
            />
          </Box>
          <Box
            style={{
              height: 1,
              width: "100%",
              background: "#E5E7EB",
            }}
          />
          <Box flex flexDirection="row" alignItems="center">
            <Box
              style={{ flexGrow: 1, marginRight: 8 }}
              onClick={() => {
                setBsProvinceWard(true);
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 400,
                  color: "#9DA4AE",
                  marginTop: 12,
                }}
              >
                Phường/Xã, Tỉnh/Thành phố
              </Text>

              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 400,
                  marginTop: 8,
                  marginBottom: 4,
                  height: 21,
                }}
              >
                {fullAddr &&
                  `${fullAddr?.ward?.value}, ${fullAddr?.province?.value}`}
              </Text>
            </Box>
            <img
              src="https://static-cdn.hdbank.com.vn/dibank/loan/assets/images/icons/right_arrow.png"
              style={{ width: 8, height: 11 }}
            />
          </Box>
          <Box
            style={{
              height: 1,
              width: "100%",
              background: "#E5E7EB",
            }}
          />
          <Box pt={4} pb={8}>
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
                marginTop: 8,
                fontSize: 16,
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              }}
              onClick={() => {
                props.onClick &&
                  props.onClick({
                    ...fullAddr,
                    addressDetail: detailAddr,
                  });
              }}
            >
              Xác nhận
            </button>
          </Box>
        </Box>
      </BottomSheetBase>
      <BottomSheetProvinceWard
        visible={bsProvinceWard}
        fullAddr={fullAddress}
        confirmAddr={(fullAddr) => {
          setFullAddr(fullAddr);
          setBsProvinceWard(false);
        }}
        maskCloseable={true}
        onClose={() => {
          setBsProvinceWard(false);
        }}
      />
    </>
  );
};
