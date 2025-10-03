import { FC } from "react";
import { Box, Checkbox } from "zmp-ui";

const TermAndCondition: FC<{
  title?: string;
  pdfUrl?: string;
  isChecked: boolean;
  setIsChecked: (v: boolean) => void;
  onOpen?: () => void;
}> = ({ title, pdfUrl, isChecked, setIsChecked, onOpen }) => (
  <Box className="mt-4 mb-4">
    <Checkbox checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} value={""}>
      <span style={{ fontSize: 12, lineHeight: 1.35 }}>
        Tôi đã đọc, hiểu rõ và đồng ý toàn bộ nội dung{" "}
        <a
          href={pdfUrl || "#"}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => {
            if (!pdfUrl) e.preventDefault();
            onOpen?.();
          }}
          style={{ color: "#ffd166", textDecoration: "underline" }}
        >
          {title || "Chính sách bảo vệ, xử lý dữ liệu cá nhân"}
        </a>{" "}
        của HDBank.
      </span>
    </Checkbox>
  </Box>
);

export default TermAndCondition;