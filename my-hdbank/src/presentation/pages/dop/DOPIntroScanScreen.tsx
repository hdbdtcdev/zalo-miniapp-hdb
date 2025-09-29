import React, { useEffect } from "react";
import { MoveLeft } from "lucide-react";
import { animateCaptureId } from "@/asset";
import useNavigate from "zmp-ui/useNavigate";
import { Page, Header, Box, Text } from "zmp-ui";
import Lottie from "lottie-react-web";
import { StepLineView } from "@/presentation/components";
import { getDOPAuthThunk } from "./redux";
import { useDispatch } from "@/lib/redux";

interface IProps {}

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animateCaptureId,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export const DOPIntroScanScreen: React.FC<IProps> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const startCapture = () => {
    navigate("/dop-id-front-scan");
    // navigate("/dop-nfc-scan");
  };

  useEffect(() => {
    dispatch(getDOPAuthThunk());
  }, []);

  // Main Screen
  return (
    <Page className="bg-transparent flex flex-1">
      <Header
        backIcon={<MoveLeft color="#fff" />}
        title="Phát hành thẻ tín dụng"
        className="transparent-header border-none shadow-none text-[#fff]"
      />

      <Box className="flex-1 p-4 mt-[calc(env(safe-area-inset-top,0px)+68px)] bg-white rounded-tl-2xl rounded-tr-2xl">
        <Box>
          <Text className="text-[#333333] text-2xl font-semibold">
            Hướng dẫn chụp
          </Text>
          <Text className="text-transparent bg-clip-text bg-gradient-to-r from-[#EA1D25] to-[#FACB0D] text-2xl font-bold">
            mặt trước, mặt sau
          </Text>
          <Text className="text-[#333333] text-2xl font-semibold">
            CCCD gắn chip
          </Text>
        </Box>
        {/* Content */}
        <Box className="p-4 space-y-6">
          <Box>
            {/* Card Placeholder */}
            {/* <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="w-full h-48 bg-yellow-100 rounded-lg border-2 border-blue-300 border-dashed flex items-center justify-center">
              <div className="w-32 h-32 bg-yellow-200 rounded-full opacity-60"></div>
            </div>
          </div> */}
            <div style={{ flex: 1 }}>
              <Lottie options={defaultOptions} width={"100%"} />
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
            className="w-full h-14 rounded-full text-white font-bold text-base shadow-md bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400"
          >
            Bắt đầu chụp
          </button>
        </Box>
      </Box>
    </Page>
  );
};
