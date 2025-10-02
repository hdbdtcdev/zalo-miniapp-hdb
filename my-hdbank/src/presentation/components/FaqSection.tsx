// FaqSection.tsx  (zmp-ui)
import { CvpFaqItem } from "@/domain/entities/cvp_common/cvpCommon";
import { FC, useMemo } from "react";
import { Box, Text, Icon } from "zmp-ui";

type Props = {
  title: string;
  items: CvpFaqItem[];
  onPressQuestionItem: (item: CvpFaqItem) => void;
};

const FaqSection: FC<Props> = ({ title, items, onPressQuestionItem }) => {
  const data = useMemo(() => {
    return (items || [])
      .filter((it) => !!it?.is_active)
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

      <Box role="list">
        {data.map((item, idx) => {
          const isLast = idx === data.length - 1;
          return (
            <Box key={item.id} role="listitem">
              <Box
                role="button"
                aria-label={item.title}
                onClick={() => onPressQuestionItem(item)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  width: "100%",
                  padding: "12px 0",
                  cursor: "pointer",
                }}
              >
                {/* icon trái */}
                {item.icon_url ? (
                  <img
                    src={item.icon_url}
                    alt=""
                    width={28}
                    height={28}
                    style={{ flex: "0 0 28px", objectFit: "contain" }}
                    loading="lazy"
                  />
                ) : (
                  <Icon icon="zi-chevron-right" />
                )}

                {/* câu hỏi */}
                <Text
                  style={{
                    flex: 1,
                    fontSize: 14,
                    color: "#111827",
                    fontWeight: 400,
                  }}
                >
                  {item.title}
                </Text>

                {/* chevron phải */}
                <Icon icon="zi-chevron-right" />
              </Box>

              {/* separator */}
              {!isLast && (
                <Box
                  style={{
                    height: 1,
                    width: "100%",
                    background: "#E5E7EB", // Neutral 400
                  }}
                />
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default FaqSection;
