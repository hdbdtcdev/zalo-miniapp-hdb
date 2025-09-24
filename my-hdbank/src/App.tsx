import React, { useEffect, useState } from "react";
import zmp from "zmp-sdk";
import AppRoutes from "./presentation/routes";

const App: React.FC = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const handleReady = () => {
      console.log("ZMP SDK sẵn sàng");
      setReady(true);
    };
    const handleError = (err: any) => {
      console.error("ZMP SDK error:", err);
    };

    zmp.events.on("ready", handleReady);
    zmp.events.on("error", handleError);

    // 👉 Patch cho môi trường dev (không có SDK thật)
    if (import.meta.env.DEV) {
      console.log("Dev mode: giả lập ZMP SDK ready");
      setTimeout(handleReady, 300); // mock "ready" sau 300ms
    }

    return () => {
      zmp.events.off("ready", handleReady);
      zmp.events.off("error", handleError);
    };
  }, []);

  if (!ready) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Đang khởi động ứng dụng...
      </div>
    );
  }

  return <AppRoutes />
};

export default App;
