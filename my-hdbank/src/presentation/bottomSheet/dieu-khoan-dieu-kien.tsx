import { Box, Button, Sheet, Text } from "zmp-ui";
import ic_done from "@/asset/icon-done-yellow.svg";

type BottomSheetTncProps = {
  visible: boolean;
  onClick: () => void;
  isNTB: boolean;
  onClose?: () => void;
};
type TncModel = {
  content: string;
  link1?: HrefModel;
  link2?: HrefModel;
};
type HrefModel = {
  href: string;
  title: string;
};
export const BottomSheetTnc = (prop: BottomSheetTncProps) => {
  const tncNTB: TncModel[] = [
    {
      content: "link1 và link2",
      link1: {
        href: "",
        title: "Thỏa thuận mở, sử dụng TKTT/SP-DV",
      },
      link2: {
        href: "",
        title: "Văn bản Uỷ Quyền.",
      },
    },
    {
      content:
        "Tôi là chủ sở hữu hưởng lợi cuối cùng và duy nhất đối với tài khoản.",
    },
    {
      content:
        "Các hành vi không được phép: Không được cho thuê, cho mượn TKTT/Thẻ của mình; không được sử dụng TKTT/Thẻ để thực hiện cho các giao dịch nhằm mục đích rửa tiền, tài trợ khủng bố, lừa đảo, gian lận hoặc các hành vi vi phạm pháp luật khác và tuân thủ các nội dung trong link1 mở, sử dụng TKTT, SP/DV HDBank và link2 khi phát hành, sử dụng thẻ Tín dụng HDBank.",
      link1: {
        href: "",
        title: "Điều khoản và điều kiện",
      },
      link2: {
        href: "",
        title: "Điều khoản và điều kiện",
      },
    },
    {
      content:
        "Không có link1; là người có quốc tịch Việt Nam và cư trú tại Việt Nam và link2",
      link1: {
        href: "",
        title: "Dấu hiệu Hoa Kỳ",
      },
      link2: {
        href: "",
        title: "Không liên quan đến cá nhân có ảnh hưởng chính trị.",
      },
    },
    {
      content: "Đồng ý kích hoạt thẻ ảo.",
    },
  ];
  const tncETB: TncModel[] = [
    {
      content: "link1 và link2",
      link1: {
        href: "",
        title: "Thỏa thuận mở, sử dụng TKTT/SP-DV",
      },
      link2: {
        href: "",
        title: "Văn bản Uỷ Quyền.",
      },
    },
    {
      content:
        "Các hành vi không được phép: Không được cho thuê, cho mượn Thẻ của mình; không được sử dụng Thẻ để thực hiện cho các giao dịch nhằm mục đích rửa tiền, tài trợ khủng bố, lừa đảo, gian lận hoặc các hành vi vi phạm pháp luật khác và tuân thủ các nội dung trong link1 khi phát hành, sử dụng thẻ Tín dụng HDBank.",
      link1: {
        href: "",
        title: "Điều khoản và điều kiện",
      },
    },
    {
      content:
        "Không có link1; là người có quốc tịch Việt Nam và cư trú tại Việt Nam và link2",
      link1: {
        href: "",
        title: "Dấu hiệu Hoa Kỳ",
      },
      link2: {
        href: "",
        title: "Không liên quan đến cá nhân có ảnh hưởng chính trị.",
      },
    },
    {
      content: "link1 tự động kích hoạt thẻ ảo.",
      link1: {
        href: "",
        title: "Điều khoản",
      },
    },
  ];
  const renderContent = (item: TncModel) => {
    let text = item.content;
    const elements: (string | JSX.Element)[] = [];

    const regex = /(link1|link2)/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        elements.push(text.slice(lastIndex, match.index));
      }

      if (match[0] === "link1" && item.link1) {
        elements.push(
          <Text
            key="link1"
            onClick={
              () => {}
              //   zmp.openWebview({
              //     url: item.link1!.href,
              //   })
            }
            style={{
              color: "#DA2128",
              textDecoration: "underline",
              cursor: "pointer",
              display: "inline",
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            {item.link1!.title}
          </Text>
        );
      }
      if (match[0] === "link2" && item.link2) {
        elements.push(
          <Text
            key="link2"
            onClick={
              () => {}
              //   zmp.openWebview({
              //     url: item.link2!.href,
              //   })
            }
            style={{
              color: "#DA2128",
              textDecoration: "underline",
              cursor: "pointer",
              display: "inline",
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            {item.link2!.title}
          </Text>
        );
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      elements.push(text.slice(lastIndex));
    }

    return (
      <Text
        style={{
          fontSize: 14,
          fontWeight: 400,
          marginLeft: 8,
        }}
      >
        {elements}
      </Text>
    );
  };
  return (
    <Sheet visible={prop.visible} maskClosable onClose={prop.onClose}>
      <Box flex flexDirection="column">
        <Box pl={4} pr={4}>
          <Text style={{ fontSize: 20, fontWeight: 600 }}>
            Vui lòng đọc và xác nhận đồng ý
          </Text>
          <Box p={4}>
            {(prop.isNTB ? tncNTB : tncETB).map((item) => (
              <Box flex flexDirection="row" style={{ marginBottom: 8 }}>
                <img
                  src={ic_done}
                  style={{
                    width: 14,
                    height: 14,
                    marginTop: 4,
                  }}
                />
                {renderContent(item)}
              </Box>
            ))}
          </Box>
        </Box>
        <Box height={1} style={{ background: "#E5E7EB" }}></Box>
        <Box pl={4} pr={4} pt={4} pb={8}>
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
            onClick={prop.onClick}
          >
            Tôi đồng ý
          </button>
        </Box>
      </Box>
    </Sheet>
  );
};
