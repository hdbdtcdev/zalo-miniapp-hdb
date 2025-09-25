import config from "./config.js";

export const defaultHeaders = {
  accept: "application/json, text/plain, */*",
  "content-type": "application/json",
  "x-channel": config.api.defaultChannel,
  "x-api-key": config.api.apiKey,
  language: config.api.defaultLanguage,
};
