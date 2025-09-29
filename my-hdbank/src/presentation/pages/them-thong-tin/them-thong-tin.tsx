import { validator } from "@/utils/validator";
import { MoveLeft } from "lucide-react";
import { useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Header, Input, Page, Text, useNavigate } from "zmp-ui";
import { selectDataPayload } from "./redux/cardSelector";
import { setDataPayload } from "./redux/cardSlice";
import {
  BottomSheetList,
  ItemModel,
} from "@/presentation/bottomSheet/BottomSheetList";
import ic_check from "@/asset/icon-check-box.svg";
import ic_uncheck from "@/asset/icon-uncheck-box.svg";

export const AddInfoCustomerPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectAmountEpass, setSelectAmountEpass] = useState<ItemModel>();
  const [bsEpassAmount, setBsEpassAmount] = useState(false);
  const [disabledButton, setDisableButton] = useState(false);
  const [listErrorMessage, setListErrorMessage] = useReducer(
    (
      prev: Record<string, string | undefined | null>,
      next: Record<string, string | undefined | null>
    ) => ({ ...prev, ...next }),
    {}
  );
  const dataPayload = useSelector(selectDataPayload);

  const inputList: Record<string, any>[] = [
    {
      key: "email",
      value: "",
      label: "Email của bạn",
      fn: (text: string) => handleChangeDataPayload("email", text),
      require: true,
      validator: (text: string) => validator.validateEmail(text),
      keyboardType: "text",
      isHide: false,
    },
    {
      key: "income",
      value: "",
      label: "Thu nhập hàng tháng",
      fn: (text: string) => {
        const removeFormatValue = text.replace(/\D/g, "");
        handleChangeDataPayload("income", removeFormatValue);
      },
      require: true,
      keyboardType: "number",
      isHide: false,
    },
    {
      key: "ref1MobilePhone",
      value: "",
      label: "Số điện thoại người thân 1",
      fn: (text: string) => {
        const numericValue = text.replace(/\D/g, ""); // Lọc bỏ ký tự không phải số
        handleChangeDataPayload("ref1MobilePhone", numericValue?.trim() || "");
      },
      require: true,
      validator: (text: string) => validator.validatePhoneNumber(text),
      keyboardType: "number",
      maxLength: 10,
      isHide: false,
    },
    {
      key: "ref2MobilePhone",
      value: "",
      label: "Số điện thoại người thân 2",
      fn: (text: string) => {
        const numericValue = text.replace(/\D/g, "");
        handleChangeDataPayload("ref2MobilePhone", numericValue?.trim() || "");
      },
      require: true,
      validator: (text: string) => {
        validator.validatePhoneNumber(text);
      },
      keyboardType: "number",
      maxLength: 10,
      isHide: false,
    },
    {
      key: "companyName",
      value: "",
      label: "Tên công ty làm việc (Nếu có)",
      fn: (text: string) => handleChangeDataPayload("companyName", text),
      require: false,
      keyboardType: "text",
      maxLength: 50,
      isHide: false,
    },
    {
      key: "companyAddress",
      value: "",
      label: "Địa chỉ công ty (Nếu có)",
      fn: () => {},
      require: false,
      keyboardType: "text",
      maxLength: 100,
      isHide: false,
    },
    {
      key: "question",
      value: "",
      label: "Câu hỏi bảo mật: Tên trường tiểu học của bạn là gì?",
      fn: (text) => handleChangeDataPayload("question", text),
      require: false,
      keyboardType: "text",
      maxLength: 100,
      isHide: false,
    },
    {
      key: "averageAmountEpass",
      value: "",
      label: "Số tiền GD thực tế qua ePass trung bình/tháng",
      fn: () => {},
      require: false,
      keyboardType: "text",
      isHide: false,
    },
    {
      key: "licensePlate",
      value: "",
      label: "Biển số xe (VD: 30A99999)",
      fn: (text: string) => handleChangeDataPayload("licensePlate", text),
      require: false,
      keyboardType: "text",
      maxLength: 100,
      isHide: false,
    },
    {
      key: "ePassReferralCode",
      value: "",
      label: "Mã nhân viên hỗ trợ",
      fn: (text: string) => handleChangeDataPayload("ePassReferralCode", text),
      require: false,
      keyboardType: "number",
      maxLength: 100,
      isHide: false,
    },
  ];
  const handleChangeDataPayload = (key: string, value: string) => {
    dispatch(setDataPayload({ [key]: value }));
    if (listErrorMessage[key]) {
      setListErrorMessage({ [key]: "" });
      //   dispatch(setDataPayload({ [key]: value }));
    }
  };
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
          <Box style={{ padding: 16, backgroundColor: "transparent" }}>
            <Text style={{ fontWeight: 600, fontSize: 24, marginTop: 16 }}>
              Hãy cung cấp thông tin
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 400,
                marginTop: 8,
              }}
            >
              Để nhận ngay thẻ <b>HDBank Vietjet Platinum</b> nhé!
            </Text>
            <Box
              flex
              flexDirection="column"
              style={{
                borderRadius: 16,
                background: "white",
                padding: 16,
                marginTop: 16,
                marginBottom: 66,
              }}
            >
              <img
                src="https://d24fd5v098kxjg.cloudfront.net/6_HD_Bank_Visa_Classic_0ab7667d83.png"
                style={{ width: 94, height: 60 }}
              ></img>
              <Box>
                {inputList.map((item, index) =>
                  !item.isHide ? (
                    <Box>
                      {!item.isHide && item.key === "averageAmountEpass" && (
                        <Text
                          style={{
                            marginTop: 16,
                            fontSize: 14,
                            fontWeight: 600,
                          }}
                        >
                          Thông tin ePass
                        </Text>
                      )}
                      <Box
                        style={{ marginTop: 8 }}
                        onClick={() => {
                          if (item.key === "averageAmountEpass")
                            setBsEpassAmount(true);
                        }}
                      >
                        {dataPayload[item.key] && (
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: 400,
                              color: "#9DA4AE",
                              marginTop: 8,
                            }}
                          >
                            {item.label}
                          </Text>
                        )}
                        <Input
                          placeholder={!item.value ? item.label : ""}
                          style={{
                            border: 0,
                            fontSize: 16,
                            fontWeight: 400,
                            marginTop: 14,
                            marginBottom: 14,
                            height: 21,
                            paddingLeft: 0,
                          }}
                          type={item.keyboardType}
                          onChange={(text) => item.fn(text.target.value)}
                        />
                        <Box
                          style={{
                            height: 1,
                            width: "100%",
                            background: "#E5E7EB",
                          }}
                        ></Box>
                      </Box>
                    </Box>
                  ) : (
                    <></>
                  )
                )}
              </Box>
            </Box>
            <Box
              style={{
                position: "sticky",
                bottom: 32,
                width: "100%",
              }}
            >
              {disabledButton ? (
                <button
                  style={{
                    width: "100%",
                    height: 56,
                    borderRadius: 999,
                    border: "none",
                    backgroundColor: "#ccc",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 16,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  }}
                  disabled
                >
                  Tiếp tục
                </button>
              ) : (
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
                    navigate("/CardAddressReceiver");
                  }}
                >
                  Tiếp tục
                </button>
              )}
            </Box>
          </Box>
        </Box>
      </Page>
      <BottomSheetList
        visible={bsEpassAmount}
        title="Số tiền GD thực tế qua ePass trung bình/tháng trong 6 tháng gần nhất"
        listItem={[
          { code: "01", value: "Từ 200,000 - 300,000 VND" },
          { code: "02", value: "Từ 300,000 - 500,000 VND" },
          { code: "03", value: "Từ 500,000 - 700,000 VND" },
          { code: "04", value: "Từ 700,000 - 1,000,000 VND" },
          { code: "05", value: "Từ 1,000,000 - 1,500,000 VND" },
          { code: "06", value: "Từ 1,500,000 VND" },
        ]}
        itemView={(item, index) => {
          return (
            <Box pr={4} pl={4}>
              <Box flex flexDirection="row" alignItems="center" pt={2} pb={2}>
                <Text style={{ flexGrow: 1 }}>{item.value}</Text>
                <img
                  src={
                    selectAmountEpass?.code === item.code
                      ? ic_check
                      : ic_uncheck
                  }
                  onClick={() => {
                    setSelectAmountEpass(item);
                  }}
                ></img>
              </Box>
              {index !== 5 && (
                <Box height={1} style={{ background: "#E5E7EB" }} />
              )}
            </Box>
          );
        }}
        textButton="Xác nhận"
        onClick={() => {
          setBsEpassAmount(false);
        }}
        maskCloseable
        onClose={() => {
          setBsEpassAmount(false);
        }}
      />
    </>
  );
};
