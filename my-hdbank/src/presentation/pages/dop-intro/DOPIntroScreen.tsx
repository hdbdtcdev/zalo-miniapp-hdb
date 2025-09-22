import React, { useState, useRef, useEffect, useCallback } from "react";
import { Camera, MoveLeft } from "lucide-react";
import scannerIllustratorImg from "@/asset/scanner_illustrator.gif";
import useNavigate from "zmp-ui/useNavigate";
import { Page, Header, Box } from "zmp-ui";

interface CreditCardScannerProps {}

const StepLineView = () => {
  return (
    <div
      style={{
        width: 2,
        height: 16,
        marginLeft: 11,
        background:
          "linear-gradient(180deg, #FFCA7F 0%, #F2C482 47.92%, #FFCA7F 100%)",
      }}
    ></div>
  );
};

export const DOPIntroScreen: React.FC<CreditCardScannerProps> = () => {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  useEffect(() => {
    if (isScanning) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isScanning]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert(
        "Không thể truy cập camera. Vui lòng cho phép quyền truy cập camera."
      );
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext("2d");

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      if (context) {
        context.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL("image/jpeg");
        setCapturedImage(imageData);
        setIsScanning(false);
      }
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const startCapture = () => {
    setIsScanning(true);
    setCapturedImage(null);
  };

  const selectFromGallery = () => {
    fileInputRef.current?.click();
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    setIsScanning(true);
  };

  if (isScanning) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden">
        {/* Header */}
        <Header
          backIcon={<MoveLeft color="#fff" />}
          title="Chụp mặt trước"
          className="transparent-header"
          onBackClick={() => setIsScanning(false)}
          style={{
            boxShadow: "none",
            borderBottom: "none",
            background: "transparent",
            color: "#fff",
          }}
        />

        {/* Camera View */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <video ref={videoRef} autoPlay playsInline muted />
        </div>

        {/* Card Frame Overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="relative">
            <div className="w-80 h-52 border-2 border-white rounded-xl bg-transparent">
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-white rounded-tl-lg"></div>
              <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-white rounded-tr-lg"></div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-white rounded-bl-lg"></div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-white rounded-br-lg"></div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-white rounded-br-lg"></div>
            </div>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/50 to-transparent pb-8">
          <p className="text-white text-center mt-4 text-sm">
            Đặt thẻ tín dụng vào trong khung
          </p>
          <div className="flex items-center justify-center space-x-12 p-6">
            <button
              onClick={selectFromGallery}
              className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <div className="w-6 h-6 bg-white/60 rounded"></div>
            </button>

            <button
              onClick={capturePhoto}
              className="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors shadow-lg"
            >
              <div className="w-12 h-12 bg-white border-4 border-gray-300 rounded-full"></div>
            </button>

            <button className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
              <Camera size={20} className="text-white" />
            </button>
          </div>
        </div>

        <canvas ref={canvasRef} className="hidden" />
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    );
  }

  if (capturedImage) {
    return (
      <Page className="bg-transparent" style={{ background: "white" }}>
        <Header
          backIcon={<MoveLeft color="#fff" />}
          title="Phát hành thẻ tín dụng"
          className="transparent-header"
          onBackClick={() => setCapturedImage(null)}
          style={{
            boxShadow: "none",
            borderBottom: "none",
            background: "linear-gradient(to right, red, yellow)",
            color: "#fff",
          }}
        />
        {/* Content */}
        <div className="p-6 space-y-6" style={{ marginTop: 48 }}>
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Hướng dẫn chụp mặt trước, mặt sau CCCD gắn chip
            </h2>

            {/* Captured Image Display */}
            <div className="bg-white rounded-lg p-4 shadow-sm border mb-6">
              <img
                src={capturedImage}
                alt="Captured card"
                className="w-full h-48 object-cover rounded-lg border-2 border-blue-200"
              />
            </div>
          </div>

          {/* Instructions */}
          <div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <div style={{ color: "white", alignSelf: "center" }}>1</div>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                Chụp mặt trước, mặt sau của CCCD gắn chip
              </p>
            </div>

            <StepLineView />

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <div style={{ color: "white", alignSelf: "center" }}>2</div>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                Chụp rõ nét chụp đúng các mộnh đành tính
              </p>
            </div>

            <StepLineView />

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <div style={{ color: "white", alignSelf: "center" }}>3</div>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                Xác thực CCCD với góp thức NFC
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t">
          <div className="space-y-3">
            <button
              onClick={retakePhoto}
              className="w-full py-4 bg-gradient-to-r from-red-500 to-yellow-500 text-white rounded-full font-medium text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
            >
              Bắt đầu chụp
            </button>
          </div>
        </div>
      </Page>
    );
  }

  // Main Screen
  return (
    <Page className="bg-transparent" style={{ background: "white" }}>
      <Header
        backIcon={<MoveLeft color="#fff" />}
        title="Phát hành thẻ tín dụng"
        // className="transparent-header"
        style={{
          background: "linear-gradient(to right, red, yellow)",
          boxShadow: "none",
          borderBottom: "none",
          color: "#fff",
        }}
      />

      <Box className="p-4 mt-4" style={{ marginTop: 40 }}>
        {/* Content */}
        <div className="p-6 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Hướng dẫn chụp mặt trước, mặt sau CCCD gắn chip
            </h2>

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
          </div>

          {/* Instructions */}
          <div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <div style={{ color: "white", alignSelf: "center" }}>1</div>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                Chụp mặt trước, mặt sau của CCCD gắn chip
              </p>
            </div>

            <StepLineView />

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <div style={{ color: "white", alignSelf: "center" }}>2</div>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                Chụp ảnh chân dung xác minh danh tính
              </p>
            </div>

            <StepLineView />

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <div style={{ color: "white", alignSelf: "center" }}>3</div>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                Xác thực CCCD với giao thức NFC
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-white">
          <button
            onClick={startCapture}
            className="w-full py-4 bg-gradient-to-r from-red-500 to-yellow-500 text-white rounded-full font-medium text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
          >
            Bắt đầu chụp
          </button>
        </div>
      </Box>
    </Page>
  );
};
