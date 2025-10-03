import { useCallback, useState } from "react";
import { getPhoneNumber } from "zmp-sdk/apis";

interface UseZaloPhoneResult {
  loading: boolean;
  error: Error | null;
  token: string | null;
  phoneNumber: string | null;
  requestPhone: () => Promise<void>;
}

/**
 * Hook lấy số điện thoại người dùng qua Zalo Mini App.
 * Lưu ý: token trả về từ getPhoneNumber chỉ được dùng 1 lần và có hiệu lực 2 phút. :contentReference[oaicite:1]{index=1}
 */
export function useZaloGetPhone(): UseZaloPhoneResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);

  const requestPhone = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getPhoneNumber();
      console.log("BINHPV ZALO Token", JSON.stringify(res, null, 2));

      if (res && typeof res.token === "string") {
        setToken(res.token);
        const resp = await fetch("/api/zalo/resolvePhone", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: res.token,
          }),
        });
        if (!resp.ok) {
          throw new Error(`Server error ${resp.status}`);
        }
        const data = await resp.json();
        // Giả sử backend trả { data: { number: string }, error: 0 }
        if (data.error === 0 && data.data && data.data.number) {
          setPhoneNumber(data.data.number);
        } else {
          throw new Error(
            `Server returned error: ${data.message || "unknown"}`
          );
        }
      } else {
        throw new Error("Invalid response from getPhoneNumber");
      }
    } catch (err: any) {
      console.error("useZaloGetPhone error:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, token, phoneNumber, requestPhone };
}
