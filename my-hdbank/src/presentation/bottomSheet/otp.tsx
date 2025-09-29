import { useRef, useState } from "react";
import { Box, Sheet, Text } from "zmp-ui";
type BottomSheetOtpProps = {
  visible: boolean;
  onClose: (otp: string) => void;
  resendOtp?: () => void;
  closeBs?: () => void;
};
export const BottomSheetOtp = (prop: BottomSheetOtpProps) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const length = 6;
  const [otp, setOtp] = useState(Array(length).fill(""));
  const handleChange = (value: string, index: number) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (newOtp.join("").length === 6) {
        prop.onClose(newOtp.join(""));
      }
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

  return (
    <Sheet visible={prop.visible} maskClosable onClose={prop.closeBs}>
      <Box flex flexDirection="column">
        <Box pl={4} pr={4}>
          <Text style={{ fontSize: 20, fontWeight: 600 }}>Xác nhận OTP</Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 400,
              color: "#6C737F",
              marginTop: 4,
            }}
          >
            Vui lòng nhập mã OTP đã được gửi đến số điện thoại <b>*727.</b>
          </Text>
          <Box flex justifyContent="center" className="mt-6 gap-3">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (inputRefs.current[i] = el)}
                type="number"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                className="text-center border-b-2 border-gray-300 focus:border-orange-500 focus:outline-none"
                style={{
                  fontSize: 22,
                  width: 40,
                  height: 48,
                  fontWeight: 600,
                  background: "transparent",
                  caretColor: "#FF6600",
                  textAlign: "center",
                }}
              />
            ))}
          </Box>
          <Text
            style={{
              textAlign: "center",
              marginTop: 42,
              marginBottom: 34,
              fontSize: 14,
              fontWeight: 600,
              color: "#DA2128",
            }}
            onClick={() => {
              prop.resendOtp && prop.resendOtp();
            }}
          >
            Gửi lại mã
          </Text>
        </Box>
      </Box>
    </Sheet>
  );
};
