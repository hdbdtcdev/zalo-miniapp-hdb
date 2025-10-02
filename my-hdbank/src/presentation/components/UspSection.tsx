import { CvpUspItem } from "@/domain/entities/cvp_common/cvpCommon";
import { FC } from "react";
import { Box, Cluster, Text } from "zmp-ui";

const UspSection: FC<{
  items?: CvpUspItem[];
  backgroundColor?: string;
  isActive?: boolean;
  onPressUspItem?: (it: CvpUspItem) => void;
}> = ({ items, backgroundColor, isActive, onPressUspItem }) => {
  if (!isActive || !items?.length) return null;

  return (
    <Box
      style={{
        background: backgroundColor || "rgba(255,255,255,0.92)",
        borderRadius: 16,
        padding: 12,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Cluster
        align="center"
        justify="center"
        space="1rem"
      >
        {items.map((it, i) => (
          <Box
            key={i}
            style={{
              textAlign: "center",
              minWidth: 72,
              display: "flex",
              flexDirection: 'column',
              alignItems: "center",
              justifyContent: "center",
              width: 100,
              height: 100,
            }}
            onClick={() => onPressUspItem}
          >
            <Box
              style={{
                width: 72,
                height: 72,
                backgroundImage: `url(${it.icon_url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <Text
              size="small"
              style={{
                whiteSpace: "pre-line",
                textAlign: 'center',
                lineHeight: '130%',
                fontSize: 14,
                letterSpacing: '-0.3px'
              }}
            >
              {it.label}
            </Text>
          </Box>
        ))}
      </Cluster>
    </Box>
  );
};

export default UspSection;