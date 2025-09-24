import express from "express";
import fetch from "node-fetch"; // Nếu dùng Node <18 thì cài: npm install node-fetch
import cors from "cors";

const app = express();
const PORT = 4000;

// ✅ Cấu hình CORS
app.use(cors({
  origin: "*", // hoặc chỉ định domain FE của bạn: ["http://localhost:5173", "https://myapp.com"]
}));
app.use(express.json());

// server.js

// API proxy đến dop-cảd-lít-available
app.post("/api/sdk/v1/dop-card-list-available", async (req, res) => {
  try {
    const url = "https://di-bank-uat.hdbank.com.vn/api/sdk/v1/dop-card-list-available";

    const body = {
      requestId: "6e0f454c-9b11-4d8f-b174-6344b30a4ade",
      channel: "mfe-loan",
      ipRequest: "",
      language: "vi",
      deviceInfo: {
        deviceId: "616504a09857c20c",
        deviceName: "google",
        os: "Android",
        osVersion: "16",
      },
      data: {},
      screenName: "MFE-DOP-HomeScreen",
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json, text/plain, */*",
        "content-type": "application/json",
        "gtw-authorization": "",
        "obd-authorization": "",
        "x-request-id": "6e0f454c-9b11-4d8f-b174-6344b30a4ade",
        "x-open-id": "",
        "x-client-ip": "10.0.2.16",
        "x-platform": "android",
        "device-id": "616504a09857c20c",
        "device-version": "16",
        "device-manufacturer": "Google",
        "device-model": "sdk_gphone64_arm64",
        "app-version": "1.0.0 (1)",
        "x-app-route-config": "",
        "x-session-id": "",
        "x-amz-request-id": "",
        "cache-control": "no-store",
        "x-device-id": "616504a09857c20c",
        "x-channel": "mfe-dop-mobile",
        "x-app-version": "0.0.1",
        "x-device-os": "Android",
        "x-device-os-version": "16",
        "x-device-name": "google",
        "pre-token": "Bearer",
        "x-api-key": "c2RrbW9iaWxlYnVzc2luZXNzOkFxc3dkZTEyM0BA",
        language: "vi",
        "sentry-trace": "42bf5897e3f643ecbc7997cde8025c33-9fa55a1d98501fc1",
        baggage:
          "sentry-environment=development,sentry-public_key=40b09055db7880a96c671af5ec47cc67,sentry-trace_id=42bf5897e3f643ecbc7997cde8025c33",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error calling HDBank API:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API proxy đến cvp-commons
app.get("/api/strapi-cms/v1/cvp-commons", async (req, res) => {
  try {
    // Lấy locale từ query param, default = "vi"
    const locale = req.query.locale || "vi";
    const populate = req.query.populate || "deep,5";

    const url =
      `https://di-bank-uat.hdbank.com.vn/api/strapi-cms/v1/cvp-commons` +
      `?locale=${locale}&populate=${[populate]}` +
      `&filters[domain_code][$eq]=DOP` +
      `&filters[cvp_title][$eq]=dopvj` +
      `&filters[is_active][$eq]=true`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json, text/plain, */*",
        authorization:
          "Bearer 248bf28182acc4edcb11edbe956c457edc20cc6803b78d075b51fca232f65640dd4388f5edfdfbd7934249885a51cf2098d291a8696f465d70f156f873fa6aa7084dacd180d4d3e94b863474e038b408eded6b0492a901d7974daec23413a067d52c0f83923b72f72ea5f36b600ee45a7c9ce601b6f0347c66d803eb0e9ad509",
        language: "vi",
        "sentry-trace":
          "1bd8387895dd41b2aa0f12ebc7908044-bc010608f40d4683",
        baggage:
          "sentry-environment=development,sentry-public_key=40b09055db7880a96c671af5ec47cc67,sentry-trace_id=1bd8387895dd41b2aa0f12ebc7908044",
      },
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error calling HDBank API:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API proxy đến dop-request-telco-otp
app.post("/api/sdk/v1/dop-request-telco-otp", async (req, res) => {
  try {
    const url =
      "https://di-bank-uat.hdbank.com.vn/api/sdk/v1/dop-request-telco-otp";

    // Body từ client gửi lên -> forward sang HDBank
    const body = req.body;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json, text/plain, */*",
        "content-type": "application/json",
        "gtw-authorization": "",
        "obd-authorization": "",
        "x-request-id": body.requestId || "",
        "x-open-id": "",
        "x-client-ip": "10.0.2.16",
        "x-platform": "android",
        "device-id": "616504a09857c20c",
        "device-version": "16",
        "device-manufacturer": "Google",
        "device-model": "sdk_gphone64_arm64",
        "app-version": "1.0.0 (1)",
        "x-app-route-config": "",
        "x-session-id": "",
        "x-amz-request-id": "",
        "cache-control": "no-store",
        "x-device-id": "616504a09857c20c",
        "x-channel": "mfe-dop-mobile",
        "x-app-version": "0.0.1",
        "x-device-os": "Android",
        "x-device-os-version": "16",
        "x-device-name": "google",
        "pre-token":
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJsZWFkSWRcIjpcIjFkNDc5ZjhkMjQwOTIwMjVcIixcInBob25lTnVtYmVyXCI6XCIwOTM1MDc0OTQ2XCIsXCJvbmJvYXJkaW5nSWRcIjpcImJhZDBkOGIzLWU0YTItNGVlNy05NmYwLWY3Mjc5OWExODIzMFwifSIsImV4cCI6MTc1ODc4MTM3OCwiaWF0IjoxNzU4Njk0OTc4fQ.YrOW8APtPNpLlyR0rtXv8NRPVOwCUXN_iCAXcH9V-vs",
        "x-api-key": "c2RrbW9iaWxlYnVzc2luZXNzOkFxc3dkZTEyM0BA",
        language: "vi",
        "sentry-trace":
          "1bd8387895dd41b2aa0f12ebc7908044-bc010608f40d4683",
        baggage:
          "sentry-environment=development,sentry-public_key=40b09055db7880a96c671af5ec47cc67,sentry-trace_id=1bd8387895dd41b2aa0f12ebc7908044",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error calling dop-request-telco-otp:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * Endpoint: POST /verify-telco-otp
 * Proxy tới HDBank API dop-verify-telco-otp
 */
app.post("/api/sdk/v1/dop-verify-telco-otp", async (req, res) => {
  try {
    const url =
      "https://di-bank-uat.hdbank.com.vn/api/sdk/v1/dop-verify-telco-otp";

    const body = req.body;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json, text/plain, */*",
        "content-type": "application/json",
        "gtw-authorization": "",
        "obd-authorization": "",
        "x-request-id": body.requestId || "",
        "x-open-id": "",
        "x-client-ip": "10.0.2.16",
        "x-platform": "android",
        "device-id": "616504a09857c20c",
        "device-version": "16",
        "device-manufacturer": "Google",
        "device-model": "sdk_gphone64_arm64",
        "app-version": "1.0.0 (1)",
        "x-app-route-config": "",
        "x-session-id": "",
        "x-amz-request-id": "",
        "cache-control": "no-store",
        "x-device-id": "616504a09857c20c",
        "x-channel": "mfe-dop-mobile",
        "x-app-version": "0.0.1",
        "x-device-os": "Android",
        "x-device-os-version": "16",
        "x-device-name": "google",
        "pre-token":
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJsZWFkSWRcIjpcIjFkNDc5ZjhkMjQwOTIwMjVcIixcInBob25lTnVtYmVyXCI6XCIwOTM1MDc0OTQ2XCIsXCJvbmJvYXJkaW5nSWRcIjpcIjkyYjE0ODE5LWFkZTEtNDA3MC05MjYxLTgzMzg4YTJlZmNjMlwifSIsImV4cCI6MTc1ODc4MTgzMywiaWF0IjoxNzU4Njk1NDMzfQ.WJM_xrDwIi8er6Q107NmxlGOej299NeuBFqh_rgIpd4",
        "x-api-key": "c2RrbW9iaWxlYnVzc2luZXNzOkFxc3dkZTEyM0BA",
        language: "vi",
        "sentry-trace":
          "1bd8387895dd41b2aa0f12ebc7908044-bc010608f40d4683",
        baggage:
          "sentry-environment=development,sentry-public_key=40b09055db7880a96c671af5ec47cc67,sentry-trace_id=1bd8387895dd41b2aa0f12ebc7908044",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error calling dop-verify-telco-otp:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// SERVER RUN
app.listen(PORT, () => {
  console.log(`🚀 BFF running at http://localhost:${PORT}`);
});