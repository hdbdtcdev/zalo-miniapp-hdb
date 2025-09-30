import React, { useEffect } from "react";
import { MoveLeft } from "lucide-react";
import { useNavigate, Page, Header, Text, Box } from "zmp-ui";
import { animateCaptureId } from "@/asset";
import Lottie from "lottie-react-web";

interface IProps {}

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animateCaptureId,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export const DOPIDResultScanScreen: React.FC<IProps> = ({}) => {
  const navigate = useNavigate();
  const nextScreen = () => {
    navigate("/dop-live-face-pre-scan");
  };

  useEffect(() => {
    let task = setTimeout(() => {
      nextScreen();
    }, 1000);
    return () => clearTimeout(task);
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
              <Lottie options={defaultOptions} width={"100%"} />
            </div>
          </Box>
        </Box>

        {/* Action Button */}
        <Box className="fixed bottom-0 left-0 right-0 p-6 bg-white hidden">
          <button
            onClick={nextScreen}
            className="w-full h-14 rounded-full text-white font-bold text-base shadow-md bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400"
          >
            Tiếp tục
          </button>
        </Box>
      </Box>
    </Page>
  );
};
