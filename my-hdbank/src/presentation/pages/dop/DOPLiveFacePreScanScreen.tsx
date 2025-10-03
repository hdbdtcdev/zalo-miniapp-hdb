import React from "react";
import { MoveLeft } from "lucide-react";
import { useNavigate, Page, Header, Text, Box } from "zmp-ui";
import {
  icLiveFaceIllustration1,
  icLiveFaceIllustration2,
  icLiveFaceIllustration3,
} from "@/assets";
import { Icon } from "zmp-ui";

interface IProps {}

export const DOPLiveFacePreScanScreen: React.FC<IProps> = ({}) => {
  const navigate = useNavigate();
  const nextScreen = () => {
    navigate("/dop-live-face-scan");
  };

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
              Quý khách vui lòng mặc trang phục lịch sự khi chụp ảnh nhé.
            </Text>
          </Box>
        </Box>

        {/* Action Button */}
        <Box className="fixed bottom-0 left-0 right-0 p-6 bg-white">
          <button
            onClick={nextScreen}
            className="w-full h-14 rounded-full text-white font-bold text-base shadow-md bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400"
          >
            Bắt đầu chụp
          </button>
        </Box>
      </Box>
    </Page>
  );
};
