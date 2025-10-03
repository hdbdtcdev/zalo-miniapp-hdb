import { MoveLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Box, Header, Input, Page, Radio, Text, useNavigate } from "zmp-ui";
import ic_uncheck from "@/assets/images/icon-uncheck-box.svg";
import ic_done from "@/assets/images/icon-done-green.svg";
interface IPasswordRequirements {
  id: string;
  label: string;
  pattern?: RegExp;
}
export const CreatePasswordPage = () => {
  const [disabledButton, setDisableButton] = useState(false);
  const navigate = useNavigate();
  const { Password } = Input;
  const [password, setPassWord] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errConfirm, setErrConfirm] = useState(false);
  const vietnameseCharRegex =
    /[ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỳỵỷỹ]/;
  const upperLowerCaseRegex = /(?=.*[a-z])(?=.*[A-Z])/;
  const numberRegex = /(?=.*[0-9])/;
  const specialCharRegex = /(?=.*[!@#$%^&*])/;
  const hasVietnameseCharacter = vietnameseCharRegex.test(password);
  const passwordRequirements = [
    {
      id: "length",
      pattern: undefined,
      label: "Tối thiểu 8 kí tự.",
    },
    {
      id: "lowerUpperCase",
      pattern: upperLowerCaseRegex,
      label: "Bao gồm ký tự VIẾT HOA và viết thường.",
    },
    {
      id: "number",
      pattern: numberRegex,
      label: "Bao gồm ký tự là số từ 0-9.",
    },
    {
      id: "specialCharacter",
      pattern: specialCharRegex,
      label: "Bao gồm ký tự đặc biệt.",
    },
  ];

  useEffect(() => {
    const arr = new Array(4).fill(false);
    console.log(
      `BINHPV Password:${password}--------------------Confirm:${confirmPassword}`
    );

    passwordRequirements.forEach((item, index) => {
      arr[index] = getChecked(item);
    });
    const isValid =
      arr[0] && arr[1] && arr[2] && arr[3] && password === confirmPassword;
    setDisableButton(!isValid);
  }, [password, confirmPassword]);

  const getChecked = (item: IPasswordRequirements) => {
    switch (item.id) {
      case "length":
        return password?.length >= 8;
      case "lowerUpperCase":
      case "number":
      case "specialCharacter":
        return password ? item.pattern?.test?.(password) : false;
      default:
        return false;
    }
  };
  const onConfirm = () => {
    if (password !== confirmPassword) {
      setErrConfirm(password !== confirmPassword);
      return;
    }
  };
  return (
    <Page>
      <Box style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 56px)" }}>
        {/* Header */}
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
            Tạo mật khẩu mới của bạn
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 400,
              marginTop: 8,
            }}
          >
            Vui lòng đảm bảo mật khẩu mới khó đoán và mật khẩu gần nhất bạn đã
            sử dụng.
          </Text>

          <Box
            style={{
              backgroundColor: "white",
              borderRadius: 16,
              padding: 24,
              paddingLeft: 16,
              paddingRight: 16,
              marginTop: 24,
            }}
          >
            <Box style={{ marginBottom: 16 }}>
              <Text
                style={{
                  fontSize: 14,
                  marginBottom: 4,
                  fontWeight: 500,
                  color: "#6C737F",
                }}
              >
                Tên đăng nhập
              </Text>
              <Text style={{ fontSize: 16, fontWeight: 600 }}>0977189456</Text>
            </Box>

            <Password
              type="password"
              placeholder="Nhập mật khẩu"
              status={hasVietnameseCharacter ? "error" : "default"}
              clearable
              errorText="Vui lòng không sử dụng kí tự có dấu. Bạn có thể sử dụng các kí tự như ! % @ . "
              onChange={(text) => {
                setPassWord(text.target.value);
              }}
              className="border-0 outline-none shadow-none focus:ring-0"
            />
            <Box style={{ background: "#E5E7EB", height: 1 }}></Box>
            <Password
              type="password"
              placeholder=" Xác nhận mật khẩu"
              clearable
              onChange={(text) => {
                setConfirmPassword(text.target.value);
              }}
              status={errConfirm ? "error" : "default"}
              errorText="Vui lòng đảm bảo 2 mật khẩu đều trùng khớp."
              className="border-0 outline-none shadow-none focus:ring-0 mt-4"
            />
            <Box style={{ background: "#E5E7EB", height: 1 }}></Box>
            <Box style={{ marginTop: 16 }}>
              <Text style={{ fontWeight: 500, fontSize: 14, marginBottom: 16 }}>
                Mật khẩu hợp lệ cần có:
              </Text>
              <Box flex flexDirection="column">
                {passwordRequirements.map((item) => {
                  return (
                    <Box
                      flex
                      flexDirection="row"
                      alignItems="center"
                      style={{ marginBottom: 8 }}
                    >
                      <img
                        src={(getChecked(item) ?? false) ? ic_done : ic_uncheck}
                        style={{ width: 14, height: 14, marginRight: 8 }}
                      />
                      <Text
                        style={{ flexGrow: 1, fontSize: 14, fontWeight: 400 }}
                      >
                        {item.label}
                      </Text>
                    </Box>
                  );
                })}
              </Box>
            </Box>
            <Text
              style={{
                marginTop: 34,
                fontSize: 14,
                color: "#DA2128",
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              Quy định đặt mật khẩu
            </Text>
          </Box>

          <Box style={{ marginTop: 32, marginBottom: 32 }}>
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
                Xác nhận
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
                  navigate("/CreatePin");
                }}
              >
                Chọn sản phẩm này
              </button>
            )}
          </Box>
        </Box>
      </Box>
    </Page>
  );
};
