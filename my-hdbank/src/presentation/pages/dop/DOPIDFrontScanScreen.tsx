import React, { useState, useRef, useEffect } from "react";
import { MoveLeft, RotateCcw } from "lucide-react";
import { Header, Page, Text, Box, useNavigate } from "zmp-ui";
import { icCaptureButton } from "@/asset";
import { useDispatch, useSelector } from "@/lib/redux";
import { scanFrontThunk, selectAuth, selectError, selectFront } from "./redux";

interface IProps {}

type FacingMode = "user" | "environment";

export const DOPIDFrontScanScreen: React.FC<IProps> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dopAuth = useSelector(selectAuth);
  const front = useSelector(selectFront);
  const reduxError = useSelector(selectError);

  const onPhotoCapture = (imageDataUrl: string) => {
    if (!imageDataUrl) return;
    console.log("Photo captured:", imageDataUrl);
  };

  useEffect(() => {
    if (reduxError) {
      alert(reduxError);
    }
  }, [reduxError]);

  useEffect(() => {
    if (front) {
      navigate("/dop-id-rear-scan");
    }
  }, [front]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<FacingMode>("environment");

  useEffect(() => {
    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [facingMode]);

  const startCamera = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      // Stop existing stream
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }

      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      };

      const newStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(newStream);

      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }

      setIsLoading(false);
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError("Không thể truy cập camera. Vui lòng cho phép quyền camera.");
      setIsLoading(false);
    }
  };

  const capturePhoto = (): void => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (!context) {
        console.error("Cannot get canvas context");
        return;
      }

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw video frame to canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Get image data URL
      const imageDataUrl = canvas.toDataURL("image/jpeg", 0.8);
      setCapturedImage(imageDataUrl);

      // Stop camera stream
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }

      // Call callback if provided
      if (onPhotoCapture) {
        onPhotoCapture(imageDataUrl);
      }
    }
  };

  const retakePhoto = (): void => {
    setCapturedImage(null);
    startCamera();
  };

  const switchCamera = (): void => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  };

  /*const handleGoBack = (): void => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }

    if (onBack) {
      onBack();
    } else {
      // Default behavior
      console.log("Navigate back");
    }
  };*/

  const handleUsePhoto = (): void => {
    if (capturedImage) {
      console.log("Use photo:", capturedImage);
      dispatch(
        scanFrontThunk({
          file: capturedImage,
          token: dopAuth?.access_token,
          clientSession: dopAuth?.transaction_id,
        })
      );
    }
  };

  return (
    <Page className="min-h-screen bg-white flex flex-col">
      {/* Status Bar */}
      <Header
        backIcon={<MoveLeft className="text-black" />}
        className="shadow-none border-b-0 transparent-header text-white"
      />

      {/* Title */}
      <Box className="px-4 py-4 pt-[calc(env(safe-area-inset-top,0px)+60px)]">
        <h1 className="text-xl font-bold text-black mb-2">
          Chụp mặt trước của CCCD gắn chip
        </h1>
        <Text className="text-sm text-gray-600 leading-relaxed mt-6">
          Di chuyển tới nơi có ánh sáng tốt để hình ảnh và thông tin được chụp
          rõ nét nhất.
        </Text>
      </Box>

      {/* Camera Preview Area */}
      <Box className="flex-1 px-4 mb-6">
        <div className="relative w-full h-64 bg-black rounded-lg overflow-hidden">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full mx-auto mb-2"></div>
                <p className="text-sm">Đang tải camera...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-white text-sm text-center px-4">{error}</p>
            </div>
          )}

          {capturedImage ? (
            <img
              src={capturedImage}
              alt="Captured"
              className="w-full h-full object-cover"
            />
          ) : (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          )}

          {/* Camera controls overlay */}
          {!capturedImage && !isLoading && !error && (
            <div className="absolute top-4 right-4">
              <button
                onClick={switchCamera}
                className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity"
              >
                <RotateCcw size={20} />
              </button>
            </div>
          )}

          {/* Corner guides for ID card positioning */}
          {!capturedImage && (
            <>
              <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-white opacity-70"></div>
              <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-white opacity-70"></div>
              <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-white opacity-70"></div>
              <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-white opacity-70"></div>
            </>
          )}
        </div>
      </Box>

      {/* Bottom Action Button */}
      <div className="flex justify-center pb-8">
        {capturedImage ? (
          <div className="flex space-x-4">
            <button
              onClick={retakePhoto}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-full font-medium hover:bg-gray-300 transition-colors"
            >
              Chụp lại
            </button>
            <button
              onClick={handleUsePhoto}
              className="px-6 py-3 bg-red-500 text-white rounded-full font-medium hover:bg-red-600 transition-colors"
            >
              Sử dụng
            </button>
          </div>
        ) : (
          <button
            onClick={capturePhoto}
            disabled={isLoading || !!error}
            className="w-86 h-86"
          >
            <img src={icCaptureButton} />
          </button>
        )}
      </div>

      {/* Hidden canvas for photo capture */}
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </Page>
  );
};
