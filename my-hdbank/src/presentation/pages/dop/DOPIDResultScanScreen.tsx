import React, { useEffect } from "react";
import { MoveLeft } from "lucide-react";
import { useNavigate, Page, Header, Text, Box } from "zmp-ui";
import { scannerIllustratorImg } from "@/asset";

interface IProps {}

export const DOPIDResultScanScreen: React.FC<IProps> = ({}) => {
  const navigate = useNavigate();
  const nextScreen = () => {
    navigate("/dop-live-face-pre-scan");
  };

  useEffect(() => {
    setTimeout(() => {
      nextScreen();
    }, 1000);
  }, []);

  // Main Screen
  return (
    <Page className="bg-white flex">
      <Header
        backIcon={<MoveLeft color="#fff" />}
        title="Phát hành thẻ tín dụng"
        className="transparent-header"
        style={{
          background: "linear-gradient(to right, red, yellow)",
          boxShadow: "none",
          borderBottom: "none",
          color: "#fff",
        }}
      />

      <Box className="p-4 mt-16">
        {/* Content */}
        <Text className="text-[#333333] text-2xl font-semibold inline-block">
          Tuyệt! Thông tin
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EA1D25] to-[#FACB0D] text-2xl font-bold">
            {" "}
            Căn cước{" "}
          </span>
          của bạn đang được lưu
        </Text>
        <Text className="text-[#333333] text-sm inline-block">
          Cảm ơn bạn! Bạn vui lòng đợi trong giây lát nhé.
        </Text>
        <Box className="p-6 space-y-6">
          <Box>
            <div style={{ flex: 1 }}>
              <img
                src={scannerIllustratorImg}
                style={{
                  alignSelf: "center",
                  width: "100%",
                  objectFit: "contain",
                  backgroundColor: "transparent",
                }}
              />
            </div>
          </Box>
        </Box>

        {/* Action Button */}
        <Box className="fixed bottom-0 left-0 right-0 p-6 bg-white hidden">
          <button
            onClick={nextScreen}
            className="w-full py-4 bg-gradient-to-r from-red-500 to-yellow-500 text-white rounded-full font-medium text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
          >
            Tiếp tục
          </button>
        </Box>
      </Box>
    </Page>
  );
};
