import dotenv from "dotenv";
dotenv.config();

const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 4000,
  api: {
    baseUrl: process.env.API_BASE_URL,
    authToken: process.env.API_AUTH_TOKEN,
    apiKey: process.env.API_KEY,
    defaultLanguage: process.env.DEFAULT_LANGUAGE || "vi",
    defaultChannel: process.env.DEFAULT_CHANNEL || "mfe-dop-mobile",
  },
};

export default config;
