import { CvpPromotionCard } from "@/domain/entities/cvp_common/cvpCommon";
import { FC, useMemo } from "react";
import { Box, Text } from "zmp-ui";

type Props = {
  title: string;
  items?: CvpPromotionCard[] | [];
  onPressPromotionItem: (item: CvpPromotionCard) => void;
};

// Parse background_color = "['#e02424','#ff6a00']" -> css linear-gradient(...)
const toGradient = (backgroundColor?: string): string => {
  try {
    if (!backgroundColor) throw new Error("no-color");
    // server hay trả chuỗi dùng dấu nháy đơn → normalize
    const arr = JSON.parse(backgroundColor.replace(/'/g, '"')) as string[];
    if (!Array.isArray(arr) || arr.length === 0) throw new Error("bad-array");
    const stops = arr.join(", ");
    return `linear-gradient(90deg, ${stops})`;
  } catch {
    // mặc định giống app
    return "linear-gradient(90deg, #e02424 0%, #ff6a00 60%, #ffd166 100%)";
  }
};

const PromotionSection: FC<Props> = ({ title, items, onPressPromotionItem }) => {
  // filter + sort giống RN
  const data = useMemo(() => {
    const now = new Date().getTime();
    return (items || [])
      .filter((it) => {
        if (!it?.is_active) return false;
        const start = new Date(it.banner_start_date ?? Date()).getTime();
        const end = new Date(it.banner_end_date ?? Date()).getTime();
        return now >= start && now <= end;
      })
      .sort((a, b) => (a?.order ?? 0) - (b?.order ?? 0));
  }, [items]);

  if (!data.length) return null;

  return (
    <Box>
      <Text
        style={{
          fontWeight: 600,
          fontSize: 20,
          color: "#0b0b0b",
          marginBottom: 12,
        }}
      >
        {title}
      </Text>

      {/* Carousel ngang, không cần lib ngoài */}
      <Box
        style={{
          display: "flex",
          gap: 12,
          overflowX: "auto",
          padding: "0 8px",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {data.map((item) => {
          const cardWidth = "calc(100vw - 48px)"; // ~ màn hình trừ lề
          const imageHeight = 220; // bạn có thể chỉnh theo thiết kế
          const descHeight = 72;

          return (
            <Box
              key={item.id}
              role="button"
              // aria-label={item.description}
              onClick={() => onPressPromotionItem(item)}
              style={{
                minWidth: cardWidth,
                maxWidth: cardWidth,
                scrollSnapAlign: "start",
                borderRadius: 16,
                boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
                background: "#fff",
              }}
            >
              {/* Banner image */}
              <img
                src={item.banner_image_url}
                alt={item.description || "promotion"}
                style={{
                  width: "100%",
                  height: imageHeight,
                  objectFit: "cover",
                  display: "block",
                }}
                loading="lazy"
              />

              {/* Gradient label area */}
              <Box
                style={{
                  height: descHeight,
                  background: toGradient(item.background_color),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0 12px",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: 600,
                    fontSize: 14,
                    color: item.label_color || "#fff",
                    // nếu có custom font từ BE, bạn có thể map ở đây:
                    fontFamily: item.label_font || undefined,
                  }}
                >
                  {item.description}
                </Text>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default PromotionSection;
