import { CSSProperties, ReactNode } from "react";
import { Sheet, Box, Text } from "zmp-ui";

type BottomSheetBaseProps = {
  visible: boolean;
  title?: string;
  content?: string;
  styleTitle?: CSSProperties;
  styleContent?: CSSProperties;
  children?: ReactNode;
  onClose?: () => void;
  maskClosable?: boolean;
};
export const BottomSheetBase = (prop: BottomSheetBaseProps) => {
  const {
    visible,
    title,
    content,
    styleTitle,
    styleContent,
    children,
    onClose,
    maskClosable,
  } = prop;
  return (
    <Sheet visible={visible} maskClosable={maskClosable} onClose={onClose}>
      <Box flex flexDirection="column">
        <Box pl={4} pr={4}>
          <Text style={{ fontSize: 20, fontWeight: 600, ...styleTitle }}>
            {title}
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 400,
              color: "#6C737F",
              marginTop: 4,
              ...styleContent,
            }}
          >
            {content}
          </Text>
        </Box>
        {children}
      </Box>
    </Sheet>
  );
};
