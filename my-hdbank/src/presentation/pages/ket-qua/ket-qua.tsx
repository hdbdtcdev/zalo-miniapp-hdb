import { MoveLeft } from "lucide-react";
import { Box, Header, Page, Text } from "zmp-ui";
import gif_success from "@/asset/gifs/success.gif";
import ic_info from "@/asset/icon-info-yellow.svg";

export const ResultPage = () => {
  return (
    <Page>
      <Box
        flex
        style={{
          paddingTop: "calc(env(safe-area-inset-top, 0px) + 56px)",
          height: "100%",
        }}
      >
        <Header
          backIcon={<MoveLeft color="#fff" />}
          title="Phát hành thẻ tín dụng"
          className="transparent-header"
          style={{
            background: "transparent",
            boxShadow: "none",
            borderBottom: "none",
            color: "#fff",
          }}
        />
        <Box
          style={{
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            background: "white",
            marginTop: 32,
            flexGrow: 1,
            padding: 16,
            paddingTop: 24,
            paddingBottom: 24,
          }}
        >
          <img src={gif_success} style={{ width: 100, height: 100 }}></img>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 600,
              lineHeight: "31px",
              marginTop: 8,
            }}
          >
            Bạn đã đăng ký thành công thẻ HDBank Vietjet Platinum!
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: 400,
              color: "#1D1D1F99",
            }}
          >
            12:42 08/08/2021
          </Text>
          <Box
            flex
            style={{
              borderRadius: 16,
              padding: 16,
              paddingTop: 12,
              paddingBottom: 12,
              background: "#FFF6E5",
              marginTop: 16,
            }}
            flexDirection="row"
          >
            <img src={ic_info} style={{ width: 24, height: 24 }}></img>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 400,
                marginLeft: 8,
              }}
            >
              Thẻ phi vật lý (thẻ ảo) sẽ tự động phát hành và kích hoạt khi hồ
              sơ được phê duyệt. <br />
              Trong một số trường hợp, Quý khách cần thực hiện ký hợp đồng điện
              tử theo thông báo đính kèm.
            </Text>
          </Box>
          <Box
            style={{
              borderRadius: 16,
              padding: 16,
              paddingTop: 8,
              paddingBottom: 8,
              marginTop: 16,
              borderWidth: 1,
              borderColor: "#D2D6DB",
            }}
          >
            <Box
              flex
              flexDirection="row"
              style={{ paddingTop: 8, paddingBottom: 8 }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: "#6C737F",
                  width: "50%",
                }}
              >
                Loại thẻ
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  marginLeft: 8,
                  width: "50%",
                  textAlign: "end",
                }}
              >
                Thẻ ảo
              </Text>
            </Box>
            <Box
              flex
              flexDirection="row"
              style={{ paddingTop: 8, paddingBottom: 8 }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: "#6C737F",
                  width: "50%",
                }}
              >
                Phí phát hành
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  marginLeft: 8,
                  width: "50%",
                  textAlign: "end",
                }}
              >
                Miễn phí năm đầu
              </Text>
            </Box>
            <Box
              flex
              flexDirection="row"
              style={{ paddingTop: 8, paddingBottom: 8 }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: "#6C737F",
                  width: "50%",
                }}
              >
                Phí thường niên
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  marginLeft: 8,
                  width: "50%",
                  textAlign: "end",
                }}
              >
                250,000 VND
              </Text>
            </Box>
          </Box>
        </Box>
        <Box
          style={{
            position: "fixed",
            bottom: 32,
            left: 16,
            right: 16,
            zIndex: 10,
          }}
        >
          <button
            style={{
              width: "100%",
              height: 56,
              borderRadius: 999,
              border: "none",
              backgroundColor: "#F3F4F6",
              fontWeight: 700,
              fontSize: 16,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
            disabled
          >
            Xem tiến trình thẻ
          </button>
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
            onClick={() => {}}
          >
            Trở về Zalo
          </button>
        </Box>
      </Box>
    </Page>
  );
};
