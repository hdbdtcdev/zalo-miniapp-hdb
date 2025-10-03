import { useRef, useState } from "react";
import { ArrowRight, MoveLeft } from "lucide-react";
import {
  Button,
  Text,
  Page,
  Header,
  Box,
  Switch,
  useNavigate,
  useLocation,
} from "zmp-ui";
import ic_notice from "@/assets/images/icon-notice.svg";
import ic_scan_face from "@/assets/images/icon-face-scan.svg";

export const CreatePinPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { type?: string; pin?: string };
  const type = state?.type || "CREATE_PIN";
  const pin = state?.pin || "";
  const length = 6;
  const [enabled, setEnabled] = useState(true);
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    if (type === "CONFIRM_PIN") {
      navigate("/AddInfoCustomer");
      return;
    }
    navigate("/CreatePin", { state: { type: "CONFIRM_PIN", pin: otp.join() } });
    if (otp.length === 6) {
      console.log("PIN:", otp.join());
    }
  };

  return (
    <Page>
      <Box
        flex
        style={{
          paddingTop: "calc(env(safe-area-inset-top, 0px) + 56px)",
          height: "100%",
        }}
        flexDirection="column"
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
        <Box
          style={{
            flexGrow: 1,
            marginTop: 33,
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: 600 }}>
            Tạo mã PIN đăng nhập nhanh
          </Text>
          <Text style={{ fontSize: 14, fontWeight: 400, marginTop: 4 }}>
            Mã PIN đăng nhập có hiệu lực 12 tháng.
          </Text>

          <Box
            flex
            style={{
              borderRadius: 16,
              background: "white",
              padding: 12,
              paddingLeft: 16,
              paddingRight: 16,
              marginTop: 24,
            }}
            flexDirection="row"
          >
            <img src={ic_notice} alt="logo" className="w-6 h-6" />
            <Box>
              <Box style={{ marginLeft: 8 }}>
                <Text style={{ fontSize: 12, fontWeight: 400 }}>
                  • Mã PIN phải có 6 chữ số khác nhau và không tăng dần hoặc
                  giảm dần (không được đặt 123456, 98765…)
                </Text>
                <Text style={{ fontSize: 12, fontWeight: 400 }}>
                  • Mã PIN không được trùng với mã PIN hiện tại
                </Text>
                <Text style={{ fontSize: 12, fontWeight: 400 }}>
                  • Mã PIN không được trùng với mã PIN HDBank OTP
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          style={{
            background: "#fff",
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            padding: 16,
            paddingBottom: 24,
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          <Box
            flex
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
          >
            <Box flex style={{ flexGrow: 1 }} alignItems="flex-start">
              <div className="flex gap-3 justify-center">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => (inputRefs.current[i] = el)}
                    type="password"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, i)}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                    className="text-center border-b-2 border-gray-400 focus:outline-none focus:border-orange-500 "
                    style={{
                      fontSize: 14,
                      width: 18,
                      height: 38,
                      fontWeight: 600,
                      caretColor: "#FF6600",
                      lineHeight: "normal",
                    }}
                  />
                ))}
              </div>
            </Box>

            <Button
              onClick={handleSubmit}
              className="w-14 h-14 rounded-full bg-gradient-to-r from-red-500 to-orange-400 flex items-center justify-center shadow-md flex-shrink-0"
              style={{
                marginLeft: 12,
                width: 56,
                height: 56,
                minWidth: 0,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #FF0000, #FF9900)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 0,
              }}
            >
              <ArrowRight size={20} color="#fff" />
            </Button>
          </Box>
          {type === "CONFIRM_PIN" && (
            <Box
              flex
              flexDirection="row"
              alignContent="center"
              style={{
                borderRadius: 16,
                borderWidth: 1,
                padding: 10,
                paddingLeft: 16,
                paddingRight: 16,
                borderColor: "#D2D6DB",
                marginTop: 16,
              }}
            >
              <img src={ic_scan_face} alt="logo" className="w-7 h-7" />
              <Text style={{ flexGrow: 1, marginLeft: 16 }}>
                Đăng nhập với Face ID
              </Text>
              <Switch
                checked={enabled}
                onChange={(value) => setEnabled(value.target.checked)}
              />
            </Box>
          )}
        </Box>
      </Box>
    </Page>
  );
};
