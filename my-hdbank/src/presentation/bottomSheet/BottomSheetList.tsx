import { ReactNode } from "react";
import { BottomSheetBase } from "./BottomSheetBase";
import { Box } from "zmp-ui";

export interface ItemModel {
  code: string;
  value: string;
}
type BottomSheetListProps = {
  visible: boolean;
  listItem?: ItemModel[] | [];
  itemView?: (item: ItemModel, index: number) => ReactNode;
  title?: string;
  content?: string;
  textButton?: string;
  onClick?: () => void;
  maskCloseable?: boolean;
  onClose?: () => void;
};
export const BottomSheetList = (props: BottomSheetListProps) => {
  const {
    visible,
    listItem,
    itemView,
    title,
    content,
    textButton,
    onClick,
    maskCloseable,
    onClose,
  } = props;
  return (
    <BottomSheetBase
      visible={visible}
      title={title}
      content={content}
      maskClosable={maskCloseable}
      onClose={onClose}
    >
      {listItem?.map((item, index) =>
        itemView ? itemView(item, index) : <></>
      )}
      {textButton && (
        <Box pt={4} pb={8} pl={4} pr={4}>
          <button
            style={{
              width: "100%",
              height: 56,
              borderRadius: 999,
              border: "none",
              background:
                "linear-gradient(90deg, #e02424 0%, #ff6a00 50%, #ffd166 100%)",
              color: "#fff",
              fontWeight: 700,
              marginTop: 8,
              fontSize: 16,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
            onClick={() => onClick && onClick()}
          >
            Xác nhận
          </button>
        </Box>
      )}
    </BottomSheetBase>
  );
};
