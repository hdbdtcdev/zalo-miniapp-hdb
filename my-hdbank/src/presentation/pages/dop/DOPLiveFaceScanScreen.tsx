import React, { useState, useRef, useEffect } from "react";
import { MoveLeft, RotateCcw } from "lucide-react";
import { Header, Page, useNavigate } from "zmp-ui";
import { icCaptureButton } from "@/assets";
import { useDispatch, useSelector } from "@/lib/redux";
import {
  scanLiveFaceThunk,
  selectAuth,
  selectError,
  selectFront,
  selectLiveFace,
} from "./redux";

interface IProps {}

type FacingMode = "user" | "environment";

export const DOPLiveFaceScanScreen: React.FC<IProps> = ({}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const dopAuth = useSelector(selectAuth);
  const front = useSelector(selectFront);
  const liveFace = useSelector(selectLiveFace);
  const reduxError = useSelector(selectError);

  const onPhotoCapture = (imageDataUrl: string) => {
    console.log("Photo captured:", imageDataUrl);
  };

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<FacingMode>("user"); // Default to front camera for selfie

  useEffect(() => {
    if (reduxError) {
      if (capturedImage) {
        retakePhoto();
      }
      alert(reduxError);
    }
  }, [reduxError]);

  useEffect(() => {
    if (error) {
      startCamera();
    }
  }, [error]);

  useEffect(() => {
    if (liveFace) {
      navigate("/dop-nfc-scan");
    }
  }, [liveFace]);

  useEffect(() => {
    handleUsePhoto();
  }, [capturedImage]);

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

      // Set canvas to square dimensions for portrait
      const size = Math.min(video.videoWidth, video.videoHeight);
      canvas.width = size;
      canvas.height = size;

      // Calculate crop position (center crop)
      const cropX = (video.videoWidth - size) / 2;
      const cropY = (video.videoHeight - size) / 2;

      // Draw video frame to canvas (cropped to square)
      context.drawImage(video, cropX, cropY, size, size, 0, 0, size, size);

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
      console.log("Navigate back");
    }
  };*/

  const handleUsePhoto = (): void => {
    if (capturedImage) {
      console.log("Use photo:", capturedImage);
      // Process the captured image here
      dispatch(
        scanLiveFaceThunk({
          file: capturedImage,
          token: dopAuth?.access_token,
          clientSession: dopAuth?.transaction_id,
          imgFront: front?.meta?.object.hash,
        })
      );
    }
  };

  return (
    <Page className="min-h-screen bg-white flex flex-col">
      {/* Status Bar */}
      <Header
        backIcon={<MoveLeft color="black" />}
        className="transparent-header"
      />

      {/* Title */}
      <div className="px-4 py-6 text-center pt-[calc(env(safe-area-inset-top,0px)+60px)]">
        <h1 className="text-xl font-bold text-black">
          Giữ mặt ở giữa khung hình
        </h1>
      </div>

      {/* Circular Camera Preview */}
      <div className="flex-1 flex items-center justify-center px-8">
        <div className="relative">
          {/* Main circular frame */}
          <div className="w-80 h-80 rounded-full border-4 border-red-500 overflow-hidden bg-black">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-3"></div>
                  <p className="text-sm">Đang tải camera...</p>
                </div>
              </div>
            )}

            {error && (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white text-sm text-center px-6">{error}</p>
              </div>
            )}

            {capturedImage ? (
              <img
                src={capturedImage}
                alt="Captured Portrait"
                className="w-full h-full object-cover"
              />
            ) : (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover scale-110" // Scale up slightly to fill circle better
                style={
                  {
                    /*transform:
                    facingMode === "user"
                      ? "scaleX(-1) scale(1.1)"
                      : "scale(1.1)", // Mirror front camera*/
                  }
                }
              />
            )}

            {/* Camera switch button */}
            {!capturedImage && !isLoading && !error && (
              <button
                onClick={switchCamera}
                className="hidden absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity"
              >
                <RotateCcw size={20} />
              </button>
            )}
          </div>

          {/* Guide overlay for face positioning */}
          {/* {!capturedImage && (
            <div className="absolute inset-0 pointer-events-none">
              Face guide outline
              <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-40 h-48 border-2 border-white border-opacity-40 rounded-full"></div>

              Eye guides
              <div className="absolute top-24 left-1/2 transform -translate-x-1/2 flex justify-between w-20">
                <div className="w-2 h-2 border border-white border-opacity-60 rounded-full"></div>
                <div className="w-2 h-2 border border-white border-opacity-60 rounded-full"></div>
              </div>

              Mouth guide
              <div className="absolute top-36 left-1/2 transform -translate-x-1/2 w-8 h-1 border-b border-white border-opacity-60 rounded-full"></div>
            </div>
          )} */}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex justify-center pb-12">
        <button
          onClick={capturePhoto}
          disabled={!!capturedImage || isLoading || !!error}
          className="w-86 h-86"
        >
          <img src={icCaptureButton} />
        </button>
      </div>

      {/* Hidden canvas for photo capture */}
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </Page>
  );
};
