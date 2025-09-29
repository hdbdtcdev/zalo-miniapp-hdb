import { ReactNode, useState, CSSProperties } from "react";
import { Box, Input, Sheet, Text } from "zmp-ui";
import ic_clear from "@/asset/icon-clear-text.svg";

type BottomSheetInputProps = {
  visible: boolean;
  // text
  title?: string;
  content?: string;
  label?: string;

  // value & events
  value: string;
  validate?: boolean;
  isShowClearText?: boolean;
  onClick?: (value: string) => void;

  // custom styles
  titleStyle?: CSSProperties;
  contentStyle?: CSSProperties;
  labelStyle?: CSSProperties;
  inputStyle?: CSSProperties;
  inputClassName?: string;
  dividerStyle?: CSSProperties;
  buttonStyle?: CSSProperties;
  buttonClassName?: string;
  buttonText?: string;
  maskClosable?: boolean;
  onClose?: () => void;
};

export const BottomSheetInput = (props: BottomSheetInputProps) => {
  const [valueInput, setValueInput] = useState(props.value);

  const onChangeValue = (text: string) => {
    setValueInput(text);
  };

  return (
    <Sheet
      visible={props.visible}
      maskClosable={props.maskClosable}
      onClose={props.onClose}
    >
      <Box flex flexDirection="column">
        <Box pl={4} pr={4}>
          {props.title && (
            <Text
              style={{
                fontSize: 20,
                fontWeight: 600,
                ...props.titleStyle,
              }}
            >
              {props.title}
            </Text>
          )}

          {props.content && (
            <Text
              style={{
                fontSize: 14,
                fontWeight: 400,
                color: "#6C737F",
                marginTop: 4,
                ...props.contentStyle,
              }}
            >
              {props.content}
            </Text>
          )}
          <Box
            flex
            flexDirection="row"
            style={{ marginTop: 36 }}
            alignItems="center"
          >
            <Box style={{ flexGrow: 1, marginRight: 8 }}>
              {props.label && valueInput && (
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: 400,
                    color: "#9DA4AE",
                    marginTop: 8,
                    ...props.labelStyle,
                  }}
                >
                  {props.label}
                </Text>
              )}

              <Input
                placeholder={!valueInput ? props.label : ""}
                className={props.inputClassName}
                style={{
                  border: 0,
                  fontSize: 16,
                  fontWeight: 400,
                  marginTop: 14,
                  marginBottom: 14,
                  height: 21,
                  paddingLeft: 0,
                  ...props.inputStyle,
                }}
                value={valueInput}
                onChange={(text) => onChangeValue(text.target.value)}
              />
            </Box>
            {props.isShowClearText && valueInput && (
              <img
                src={ic_clear}
                style={{ width: 20, height: 20 }}
                onClick={() => {
                  setValueInput("");
                }}
              ></img>
            )}
          </Box>
          <Box
            style={{
              height: 1,
              width: "100%",
              background: "#E5E7EB",
              ...props.dividerStyle,
            }}
          />

          <Box pt={4} pb={8}>
            <button
              className={props.buttonClassName}
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
                ...props.buttonStyle,
              }}
              onClick={() => props.onClick && props.onClick(valueInput)}
            >
              {props.buttonText || "Lưu"}
            </button>
          </Box>
        </Box>
      </Box>
    </Sheet>
  );
};
