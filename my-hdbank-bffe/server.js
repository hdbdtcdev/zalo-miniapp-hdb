import express from "express";
import fetch from "node-fetch"; // Node <18 mới cần npm install node-fetch
import cors from "cors";
import config from "./config.js";
import { defaultHeaders } from "./headers.js";
import httpProxy from "http-proxy";

const app = express();

//#region Cấu hình proxy để xử lý CORS cho các yêu cầu đến https://biometric-uat.hdbank.com.vn
const proxy = httpProxy.createProxyServer({ selfHandleResponse: true });

proxy.on("proxyRes", (proxyRes, req, res) => {
  let body = [];
  proxyRes.on("data", (chunk) => body.push(chunk));
  proxyRes.on("end", () => {
    const responseBody = Buffer.concat(body);
    res.writeHead(proxyRes.statusCode || 200, {
      ...proxyRes.headers,
      "access-control-allow-origin": req.headers.origin || "*",
      "access-control-allow-methods": "GET,POST,PUT,DELETE,OPTIONS",
      "access-control-allow-headers": "*",
    });
    res.end(responseBody);
  });
});

app.use("/dop-proxy", (req, res) => {
  proxy.web(req, res, {
    target: "https://biometric-uat.hdbank.com.vn",
    changeOrigin: true,
    secure: false,
  });
});
//#endregion

// ✅ Cấu hình middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

/**
 * Proxy: dop-card-list-available
 */
app.post("/api/sdk/v1/dop-card-list-available", async (req, res) => {
  try {
    const url = `${config.api.baseUrl}/sdk/v1/dop-card-list-available`;

    const body = {
      requestId: req.body.requestId || "auto-gen-request-id",
      channel: config.api.defaultChannel,
      ipRequest: "",
      language: config.api.defaultLanguage,
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
        ...defaultHeaders,
        "x-request-id": body.requestId,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error dop-card-list-available:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * Proxy: cvp-commons
 */
app.get("/api/strapi-cms/v1/cvp-commons", async (req, res) => {
  try {
    const locale = req.query.locale || config.api.defaultLanguage;
    const populate = req.query.populate || "deep,5";
    const domainCode = req.query.domainCode || "DOP";
    const cvpTitle = req.query.cvpTitle || "dopvj";
    const isActive = req.query.isActive || true;

    const url =
      `${config.api.baseUrl}/strapi-cms/v1/cvp-commons` +
      `?locale=${locale}&populate=${[populate]}` +
      `&filters[domain_code][$eq]=${domainCode}` +
      `&filters[cvp_title][$eq]=${cvpTitle}` +
      `&filters[is_active][$eq]=${isActive}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        ...defaultHeaders,
        authorization: config.api.authToken,
      },
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error cvp-commons:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * Proxy: dop-request-telco-otp
 */
app.post("/api/sdk/v1/dop-request-telco-otp", async (req, res) => {
  try {
    const url = `${config.api.baseUrl}/sdk/v1/dop-request-telco-otp`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        ...defaultHeaders,
        "x-request-id": req.body.requestId || "",
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error dop-request-telco-otp:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * Proxy: dop-verify-telco-otp
 */
app.post("/api/sdk/v1/dop-verify-telco-otp", async (req, res) => {
  try {
    const url = `${config.api.baseUrl}/sdk/v1/dop-verify-telco-otp`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        ...defaultHeaders,
        "x-request-id": req.body.requestId || "",
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error dop-verify-telco-otp:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 🚀 Start server
app.listen(config.port, () => {
  console.log(`🚀 BFF running at http://localhost:${config.port}`);
});
