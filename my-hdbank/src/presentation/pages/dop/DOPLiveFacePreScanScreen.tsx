import React from "react";
import { MoveLeft } from "lucide-react";
import { useNavigate, Page, Header, Text, Box } from "zmp-ui";
import {
  icLiveFaceIllustration1,
  icLiveFaceIllustration2,
  icLiveFaceIllustration3,
} from "@/asset";
import { Icon } from "zmp-ui";

interface IProps {}

export const DOPLiveFacePreScanScreen: React.FC<IProps> = ({}) => {
  const navigate = useNavigate();
  const nextScreen = () => {
    navigate("/dop-live-face-scan");
  };

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
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EA1D25] to-[#FACB0D] text-2xl font-bold">
            Chụp ảnh{" "}
          </span>
          xác minh danh tính
        </Text>
        <Text className="text-[#333333] text-sm inline-block">
          Chụp ảnh theo hướng dẫn dưới đây.
        </Text>
        <Box className="mt-6">
          <Box className="p-4 space-y-4">
            <Box className="flex flex-row">
              <img src={icLiveFaceIllustration1} alt="" className="w-90 h-90" />
              <Text className="text-[#333333] text-base font-medium ml-4 self-center">
                Đảm bảo ánh sáng tốt.
              </Text>
            </Box>
          </Box>
          <Box className="p-4 space-y-4 mt-8">
            <Box className="flex flex-row">
              <img src={icLiveFaceIllustration2} alt="" className="w-90 h-90" />
              <Text className="text-[#333333] text-base font-medium ml-4 self-center">
                Không đội mũ, đeo kính hoặc khẩu trang.
              </Text>
            </Box>
          </Box>
          <Box className="p-4 space-y-4 mt-8">
            <Box className="flex flex-row">
              <img src={icLiveFaceIllustration3} alt="" className="w-90 h-90" />
              <Text className="text-[#333333] text-base font-medium ml-4 self-center">
                Đảm bảo bạn là người duy nhất trong khung hình.
              </Text>
            </Box>
          </Box>
        </Box>

        <Box className="bg-[#FFF6E5] mt-6 rounded-2xl">
          <Box className="flex flex-row py-3 px-4">
            <Icon icon="zi-warning-circle-solid" className="text-[#FAA61A]" />
            <Text className="text-[#333333] text-xs font-medium ml-4 self-center">
              Không đội mũ, đeo kính hoặc khẩu trang.
            </Text>
          </Box>
        </Box>

        {/* Action Button */}
        <Box className="fixed bottom-0 left-0 right-0 p-6 bg-white">
          <button
            onClick={nextScreen}
            className="w-full py-4 bg-gradient-to-r from-red-500 to-yellow-500 text-white rounded-full font-medium text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
          >
            Bắt đầu chụp
          </button>
        </Box>
      </Box>
    </Page>
  );
};
