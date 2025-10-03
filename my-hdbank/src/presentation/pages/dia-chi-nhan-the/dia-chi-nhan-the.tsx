import ic_chevron_down from "@/assets/images/ic-chevron-down.svg";
import { useSelector } from "@/lib/redux";
import { MoveLeft } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Box, Header, Input, Page, Text, useNavigate } from "zmp-ui";
import {
  selectAddressType,
  selectAddressTypeList,
} from "../them-thong-tin/redux/cardSelector";
import { setAddressType } from "../them-thong-tin/redux/cardSlice";
import { BottomSheetTnc } from "@/presentation/bottomSheet/dieu-khoan-dieu-kien";
import { BottomSheetOtp } from "@/presentation/bottomSheet/otp";

export const CardAddressReceiverPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const addrTypeList = useSelector(selectAddressTypeList);
  const addrType = useSelector(selectAddressType);
  const [bsTnc, setVisibleBsTnc] = useState(false);
  const [bsOtp, setVisibleBsOtp] = useState(false);

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
          <Box style={{ paddingLeft: 16, paddingRight: 16 }}>
            <Box
              style={{
                borderRadius: 16,
                background: "white",
                marginTop: 25,
                padding: 16,
              }}
            >
              <Text style={{ fontSize: 24, fontWeight: 600 }}>
                Sắp xong rồi
              </Text>
              <Text style={{ fontSize: 14, fontWeight: 400, marginTop: 8 }}>
                chỉ cần xác nhận địa chỉ nhận thẻ nữa thôi!
              </Text>
              <Text style={{ fontSize: 12, fontWeight: 400, color: "#9DA4AE" }}>
                Loại địa chỉ
              </Text>
              <Box
                className="flex gap-3 overflow-x-auto p-2 hide-scrollbar"
                style={{
                  WebkitOverflowScrolling: "touch",
                  whiteSpace: "nowrap",
                }}
              >
                {addrTypeList.map((item) => (
                  <Box
                    key={item.type}
                    style={{
                      borderWidth: 1,
                      minWidth: 118,
                      flexShrink: 0,
                      display: "inline-block", // để scroll ngang đúng
                      alignContent: "center",
                      borderRadius: 16,
                      padding: "8px 16px",
                      borderColor:
                        addrType.type === item.type ? "#DA2128" : "#E5E7EB",
                    }}
                    onClick={() => {
                      dispatch(setAddressType(item));
                    }}
                  >
                    <Text
                      className="inline-block"
                      style={{
                        textAlign: "center",
                        fontSize: 14,
                        fontWeight: 500,
                        color:
                          addrType.type === item.type ? "#DA2128" : "black",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.name}
                    </Text>
                  </Box>
                ))}
              </Box>
              <Box>
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
                <Input
                  placeholder={"Số nhà, tên đường"}
                  style={{
                    border: 0,
                    fontSize: 16,
                    fontWeight: 400,
                    marginTop: 14,
                    marginBottom: 14,
                    height: 21,
                    paddingLeft: 0,
                  }}
                  type="text"
                  onChange={(text) => {}}
                  disabled={addrType.type !== "03"}
                />
                <Box
                  style={{
                    height: 1,
                    width: "100%",
                    background: "#E5E7EB",
                  }}
                ></Box>
              </Box>
              <Box>
                <Box flex flexDirection="row">
                  <Box style={{ flexGrow: 1 }}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: 400,
                        color: "#9DA4AE",
                        marginTop: 8,
                      }}
                    >
                      Phường/Xã, Tỉnh/Thành phố
                    </Text>
                    <Text
                      style={{
                        border: 0,
                        fontSize: 16,
                        fontWeight: 400,
                        marginTop: 14,
                        marginBottom: 14,
                        height: 21,
                        paddingLeft: 0,
                      }}
                      type="text"
                      onChange={(text) => {}}
                      disabled={addrType.type !== "03"}
                    >
                      P. Đakao, TP Hồ Chí Minh
                    </Text>
                  </Box>
                  <img src={ic_chevron_down} />
                </Box>
                <Box
                  style={{
                    height: 1,
                    width: "100%",
                    background: "#E5E7EB",
                  }}
                ></Box>
              </Box>
            </Box>
            <Box
              style={{
                position: "fixed",
                bottom: 32,
                left: 16,
                right: 16,
                zIndex: 10,
              }}
            >
              <button
                style={{
                  width: "100%",
                  height: 56,
                  borderRadius: 999,
                  border: "none",
                  backgroundColor: "#F3F4F6",
                  fontWeight: 700,
                  fontSize: 16,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                }}
                onClick={() => {
                  setVisibleBsTnc(true);
                }}
              >
                Tôi chỉ muốn sử dụng thẻ ảo
              </button>
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
                  setVisibleBsTnc(true);
                }}
              >
                Tiếp tục
              </button>
            </Box>
          </Box>
        </Box>
      </Page>
      <BottomSheetTnc
        visible={bsTnc}
        onClick={() => {
          setVisibleBsOtp(true);
        }}
        isNTB={true}
        onClose={() => {
          setVisibleBsTnc(false);
        }}
      />
      <BottomSheetOtp
        visible={bsOtp}
        onClose={() => {
          setVisibleBsOtp(false);
          setVisibleBsTnc(false);
          navigate("/Result");
        }}
        closeBs={() => setVisibleBsOtp(false)}
      />
    </>
  );
};
