import { DEFAULT_LANGUAGE, LANGUAGE_PREFERENCE_KEY } from "@/constants";
import { WebStorage } from "@/services/storage";
import { getDeviceIdAsync, getSystemInfo, getAppInfo } from "zmp-sdk";

const APP_VERSION_REGEX = /.*([0-9]+\.[0-9]+\.[0-9]+).*/;

class Device {
  ID: string = "";
  APP_VERSION: string = "";
  APP_BUNDLE_ID: string = "";

  INFO: Record<string, string | boolean> = {};

  init = async () => {
    try {
      const deviceId = await getDeviceIdAsync();
      const systemInformation = getSystemInfo();
      const appInfo = await getAppInfo();

      console.log(`SYSTEM INFO: ${JSON.stringify(systemInformation)}`);

      await WebStorage.setItem(LANGUAGE_PREFERENCE_KEY, systemInformation?.zaloLanguage ?? DEFAULT_LANGUAGE);

      // App version
      const versionMatches = appInfo.version.match(APP_VERSION_REGEX);
      this.APP_VERSION =
        versionMatches && versionMatches.length > 1
          ? versionMatches[1] ?? ""
          : appInfo.version;

      // this.APP_BUNDLE_ID = appInfo.appId;

      this.ID = deviceId;

      this.INFO = {
        deviceId: deviceId,
        brand: "", // ❌
        model: "", // ❌
        isTablet: false, // ❌
        systemName: systemInformation.platform, // "ios" | "android"
        localTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        localLanguage: systemInformation.language,
        // screenResolution: `${systemInformation.screenWidth}x${systemInformation.screenHeight}`,
        systemVersion: systemInformation.version,
        buildId: "", // ❌
        serialNumber: "", // ❌
        isEmulator: false, // ❌
        manufacturer: "", // ❌
        isCameraPresent: false, // ❌
        buildNumber: "", // ❌
        ipAddress: "", // ❌
        platform: systemInformation.platform
      };

      console.log("✅ Device INFO:", this.INFO);
    } catch (error) {
      console.error("❌ Device init error:", error);
    }
  };
}

const instance = new Device();
export { instance as Device };
