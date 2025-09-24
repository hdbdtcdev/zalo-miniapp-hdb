import { MoveLeft } from "lucide-react";
import { useState } from "react";
import { Box, Checkbox, Header, Input, Page, Radio, Text } from "zmp-ui";

export const CreatePasswordPage = () => {
  const [disabledButton, setDisableButton] = useState(false);
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

            <Input
              type="password"
              placeholder="Nhập mật khẩu"
              clearable
              required
              style={{ border: 0 }}
            />
            <Box style={{ background: "#E5E7EB", height: 1 }}></Box>
            <Input
              type="password"
              placeholder=" Xác nhận mật khẩu"
              clearable
              required
              style={{ border: 0, marginTop: 16 }}
            />
            <Box style={{ background: "#E5E7EB", height: 1 }}></Box>
            <Box style={{ marginTop: 16 }}>
              <Text style={{ fontWeight: 500, fontSize: 14, marginBottom: 16 }}>
                Mật khẩu hợp lệ cần có:
              </Text>
              <Box flex flexDirection="column">
                <Radio value="1" disabled>
                  Độ dài tối thiểu 8 ký tự
                </Radio>
                <Radio value="2" disabled style={{ marginTop: 8 }}>
                  Có chữ hoa
                </Radio>
                <Radio value="3" disabled style={{ marginTop: 8 }}>
                  Có chữ số
                </Radio>
                <Radio value="4" disabled style={{ marginTop: 8 }}>
                  Có ký tự đặc biệt
                </Radio>
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
                onClick={() => {}}
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
