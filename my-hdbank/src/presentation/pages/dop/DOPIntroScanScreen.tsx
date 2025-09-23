import React from "react";
import { MoveLeft } from "lucide-react";
import { scannerIllustratorImg } from "@/asset";
import useNavigate from "zmp-ui/useNavigate";
import { Page, Header, Box, Text } from "zmp-ui";

interface IProps {}

const StepLineView = () => {
  return (
    <Box
      style={{
        width: 2,
        height: 16,
        marginLeft: 11,
        background:
          "linear-gradient(180deg, #FFCA7F 0%, #F2C482 47.92%, #FFCA7F 100%)",
      }}
    ></Box>
  );
};

export const DOPIntroScanScreen: React.FC<IProps> = () => {
  const navigate = useNavigate();
  const startCapture = () => {
    navigate("/dop-id-front-scan");
  };

  // Main Screen
  return (
    <Page className="bg-transparent" style={{ background: "white", flex: 1 }}>
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
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Hướng dẫn chụp mặt trước, mặt sau CCCD gắn chip
        </h2>
        {/* Content */}
        <Box className="p-6 space-y-6">
          <Box>
            {/* Card Placeholder */}
            {/* <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="w-full h-48 bg-yellow-100 rounded-lg border-2 border-blue-300 border-dashed flex items-center justify-center">
              <div className="w-32 h-32 bg-yellow-200 rounded-full opacity-60"></div>
            </div>
          </div> */}
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

          {/* Instructions */}
          <Box>
            <Box className="flex items-start space-x-3">
              <Box className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Text style={{ color: "white", alignSelf: "center" }}>1</Text>
              </Box>
              <Box className="text-gray-700 text-sm leading-relaxed">
                Chụp mặt trước, mặt sau của CCCD gắn chip
              </Box>
            </Box>

            <StepLineView />

            <Box className="flex items-start space-x-3">
              <Box className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Text style={{ color: "white", alignSelf: "center" }}>2</Text>
              </Box>
              <Text className="text-gray-700 text-sm leading-relaxed">
                Chụp ảnh chân dung xác minh danh tính
              </Text>
            </Box>

            <StepLineView />

            <Box className="flex items-start space-x-3">
              <Box className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Text style={{ color: "white", alignSelf: "center" }}>3</Text>
              </Box>
              <Text className="text-gray-700 text-sm leading-relaxed">
                Xác thực CCCD với giao thức NFC
              </Text>
            </Box>
          </Box>
        </Box>

        {/* Action Button */}
        <Box className="fixed bottom-0 left-0 right-0 p-6 bg-white">
          <button
            onClick={startCapture}
            className="w-full py-4 bg-gradient-to-r from-red-500 to-yellow-500 text-white rounded-full font-medium text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
          >
            Bắt đầu chụp
          </button>
        </Box>
      </Box>
    </Page>
  );
};
