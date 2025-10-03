import React, { useEffect } from "react";
import { MoveLeft } from "lucide-react";
import { icNfcIllustration, icPlayCircle } from "@/assets";
import useNavigate from "zmp-ui/useNavigate";
import { Page, Header, Box, Text } from "zmp-ui";
import { StepLineView } from "@/presentation/components";
import { scanNFC } from "zmp-sdk/apis";
import { useDispatch, useSelector } from "@/lib/redux";
import {
  logNFCThunk,
  selectAuth,
  selectError,
  selectFront,
  selectLiveFace,
  selectNFC,
} from "./redux";

interface IProps {}

export const DOPNFCScanScreen: React.FC<IProps> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dopAuth = useSelector(selectAuth);
  const front = useSelector(selectFront);
  const liveFace = useSelector(selectLiveFace);
  const nfc = useSelector(selectNFC);

  const reduxError = useSelector(selectError);

  useEffect(() => {
    if (reduxError) {
      alert(reduxError);
    }
  }, [reduxError]);

  useEffect(() => {
    if (nfc) {
      navigate("/CustomerInfo");
    }
  }, [nfc]);

  /*const [scanInfoVisible, setScanInfoVisible] = React.useState(false);
  const [scanStep, setScanStep] = React.useState(1);*/

  const startScan = () => {
    /*setScanInfoVisible(true);
    setScanStep(1);
    var ret = await scanDeviceNFC("MRZ_SAMPLE_1234567890");
    alert("Kết quả quét NFC: " + JSON.stringify(ret));
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setScanStep(2);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setScanStep(3);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setScanInfoVisible(false);*/
    scanNFC({
      data: {
        mrz: "MRZ_SAMPLE_1234567890",
      },
      type: "cccd",
      success: (data) => {
        dispatch(
          logNFCThunk({
            token: dopAuth?.access_token,
            img_face: front?.meta?.object.hash,
            img_back: liveFace?.meta?.object.hash,
            mrz: [""],
          })
        );
      },
      fail: (err) => {
        console.log(err);
        alert("Lỗi quét NFC: " + JSON.stringify(err));
      },
    });
  };

  /*const getStepTile = (step: number) => {
    switch (step) {
      case 1:
        return "Sẵn sàng quét";
      case 2:
        return "Sẵn sàng quét";
      default:
        return "Đang xử lý....";
    }
  };*/

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
            Xác thực
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EA1D25] to-[#FACB0D] text-2xl font-bold">
              {" "}
              Sinh trắc học
            </span>
          </Text>
          <Text className="text-[#333333] text-2xl font-semibold">
            với CCCD gắn chip
          </Text>
        </Box>
        <Text className="text-[#333333] text-sm inline-block mt-1">
          Để tăng cường bảo mật, bạn cần xác thực CCCD với NFC (theo quy định
          của Ngân hàng Nhà nước).
        </Text>
        {/* Content */}
        <Box className="p-6 space-y-6">
          <Box>
            {/* Card Placeholder */}
            {/* <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="w-full h-48 bg-yellow-100 rounded-lg border-2 border-blue-300 border-dashed flex items-center justify-center">
              <div className="w-32 h-32 bg-yellow-200 rounded-full opacity-60"></div>
            </div>
          </div> */}
            <Box style={{ flex: 1 }}>
              <img
                src={icNfcIllustration}
                style={{
                  alignSelf: "center",
                  width: "100%",
                  objectFit: "contain",
                  backgroundColor: "transparent",
                }}
              />
            </Box>
          </Box>

          <Box className="flex justify-center">
            <Box className="flex flex-row items-center">
              <img
                src={icPlayCircle}
                style={{
                  width: 24,
                  height: 24,
                  marginRight: 4,
                }}
              />
              <Text className="text-[#DA2128] text-sm font-semibold underline">
                Xem video hướng dẫn
              </Text>
            </Box>
          </Box>

          {/* Instructions */}
          <Box>
            <Box className="flex items-start space-x-3">
              <Box className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Text style={{ color: "white", alignSelf: "center" }}>1</Text>
              </Box>
              <Box className="text-[#0C0C0E] text-sm leading-relaxed">
                Chạm con chip trên Căn cước vào vị trí khung đỏ được minh hoạ
                trên điện thoại.
              </Box>
            </Box>

            <StepLineView />

            <Box className="flex items-start space-x-3">
              <Box className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Text style={{ color: "white", alignSelf: "center" }}>2</Text>
              </Box>
              <Text className="text-[#0C0C0E] text-sm leading-relaxed">
                Giữ cố định để hoàn tất quét thông tin.
              </Text>
            </Box>
          </Box>
        </Box>

        {/* Action Button */}
        <Box className="fixed bottom-0 left-0 right-0 p-6 bg-white">
          <button
            onClick={startScan}
            className="w-full h-14 rounded-full text-white font-bold text-base shadow-md bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400"
          >
            Bắt đầu chụp
          </button>
        </Box>
      </Box>
      {/* <Sheet
        title={getStepTile(scanStep)}
        visible={scanInfoVisible}
        onClose={() => {
          setScanInfoVisible(false);
        }}
      >
        <Box className="custom-bottom-sheet" flex flexDirection="column">
          {scanStep === 1 && (
            <>
              <Box className="flex items-center justify-center mt-4">
                <StepperLoadingView />
              </Box>
              <Box className="flex items-center justify-center h-40 mt-8">
                <img alt="" src={icScanPhone} className="h-32" />
              </Box>
              <Box className="items-center justify-center flex mt-8">
                <Text
                  className="text-[#DA2128] font-semibold text-base"
                  onClick={() => {
                    setScanInfoVisible(false);
                  }}
                >
                  Dừng quét
                </Text>
              </Box>
            </>
          )}
          {scanStep === 2 && (
            <>
              <Box className="flex items-center justify-center h-40 mt-8">
                <img alt="" src={icScanReady} className="h-32" />
              </Box>
              <Box className="items-center justify-center flex mt-8">
                <Text className="text-[#333333] font-normal text-sm">
                  Quét thông tin thành công!
                </Text>
              </Box>
            </>
          )}
          {scanStep === 3 && (
            <>
              <Box className="flex items-center justify-center h-40 mt-8">
                <img alt="" src={icScanLoading} />
              </Box>
              <Box className="items-center justify-center flex flex-col mt-8">
                <Text className="text-[#333333] font-normal text-sm">
                  Hệ thống đang giải mã thông tin,
                </Text>
                <Text className="text-[#333333] font-normal text-sm">
                  vui lòng chờ trong giây lát
                </Text>
              </Box>
            </>
          )}
        </Box>
      </Sheet> */}
    </Page>
  );
};
