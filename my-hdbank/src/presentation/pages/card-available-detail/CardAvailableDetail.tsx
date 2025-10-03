import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Page, Header, Box, Button, Icon, Text, useNavigate } from "zmp-ui";
import { MoveLeft } from "lucide-react";
import {
  CvpFaqItem,
  CvpPromotionCard,
  CvpUspItem,
  TncCommonAttributes,
} from "@/domain/entities/cvp_common/cvpCommon";
import CvpCommonMock from "@/mock/cvp_common.json";
import UspSection from "@/presentation/components/UspSection";
import PromotionSection from "@/presentation/components/PromotionSection";
import { v4 as uuidv4 } from "uuid";
import FaqSection from "@/presentation/components/FaqSection";
import {
  ICvpShare,
  ICvpVolumeDown,
  ICvpVolumeUp,
  IScrollDown,
} from "@/assets/icons";

type Props = {};

const Z = {
  VIDEO: 0,
  HEADER: 10,
  USP: 20,
  PILL: 30, // pill cao hơn USP
  FAB: 40,
  CTA: 50,
} as const;

const CardAvailableDetail: FC<Props> = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [muted, setMuted] = useState(true);
  const [isChecked, setIsChecked] = useState(true);

  // ===== Gọi API 1 lần khi vào màn hình =====
  // const { cvpCommonData, cvpCommmonStatus, cvpCommonError } = useCvpCommon({
  //   locale: "vi",
  //   populate: "deep,5",
  //   domainCode: "DOP",
  //   cvpTitle: "dopvj",
  //   isActive: true,
  // });

  const cvpCommmonStatus = "succeeded";

  // ===== Extract data gọn gàng =====
  const {
    cvp_background_video: mediaUrl,
    cvp_deeplink: shareDeepLinkUrl,
    cvp_cta_button: bottomButton,
    tnc_common,
    cvp_usp,
    cvp_promotion,
    cvp_faq,
  } = CvpCommonMock.data[0].attributes || {};

  const tncAttr: TncCommonAttributes = tnc_common?.data?.attributes || {};
  const uspAttr = cvp_usp?.data?.attributes || null;
  const cvpPromotionAttr = cvp_promotion?.data?.attributes || null;

  // ===== Handlers =====
  const onShare = () => {};
  const onSubmit = () => {
    navigate("/dop-intro");
  };

  const toggleMute = useCallback(() => {
    setMuted((m) => !m);
    if (videoRef.current) videoRef.current.muted = !videoRef.current.muted;
  }, []);

  const handleShare = useCallback(async () => {
    if (shareDeepLinkUrl) {
      try {
        if (navigator.share) {
          await navigator.share({
            title: "Phát hành thẻ tín dụng HDBank",
            text: "Khám phá ưu đãi thẻ tín dụng",
            url: shareDeepLinkUrl,
          });
        } else {
          await navigator.clipboard.writeText(shareDeepLinkUrl);
        }
        onShare?.();
      } catch (e) {
        console.warn(e);
      }
    } else {
      onShare?.();
    }
  }, [shareDeepLinkUrl, onShare]);

  const scrollToMore = useCallback(() => {
    document.getElementById("more-section")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  const uspItems = useMemo<CvpUspItem[]>(() => {
    const items = uspAttr?.cvp_usp_item;

    if (Array.isArray(items) && items.length > 0) {
      return items;
    }
    return [];
  }, [uspAttr?.cvp_usp_item]);

  // const promotionItems = useMemo<CvpPromotionCard[]>(() => {
  //   const items = cvpPromotionAttr?.cvp_promotion_card;

  //   if (Array.isArray(items) && items.length > 0) {
  //     return items;
  //   }
  //   return [];
  // }, [cvpPromotionAttr?.cvp_promotion_card]);

  const onPressUspItem = (item: CvpUspItem) => {
    // switch (item.navigation_type) {
    //   case NavigationType.WEB:
    //     if (item.destination) {
    //       setSelectedUrlLink(item.destination);
    //     }
    //     return;
    //   case NavigationType.MINI_APP:
    //     navigateByCode(item.destination ?? '');
    //     break;
    //   case NavigationType.ACTION:
    //     break;
    //   default:
    //     break;
    // }
  };

  const onPressPromotionItem = (item: CvpPromotionCard) => {};
  const onPressQuestionItem = (item: CvpFaqItem) => {};

  // ===== Render chính =====
  return (
    <Page
      className="bg-transparent"
      style={{
        height: "100dvh",
        width: "100%",
        color: "#fff",
      }}
    >
      {/* HEADER */}
      <Header
        backIcon={<MoveLeft color="#fff" />}
        title="Phát hành thẻ tín dụng"
        className="transparent-header"
        style={{
          background: "linear-gradient(180deg, rgba(0,0,0,.35), rgba(0,0,0,0))",
          boxShadow: "none",
          borderBottom: "none",
          color: "#fff",
        }}
        onBackClick={() => navigate(-1 as any)}
      />

      {/* {cvpCommmonStatus === "loading" && (
        <Box p={4}><Text>Đang tải dữ liệu...</Text></Box>
      )}
      {cvpCommmonStatus === "failed" && (
        <Box p={4}><Text>Lỗi tải dữ liệu: {cvpCommonError}</Text></Box>
      )} */}
      {cvpCommmonStatus === "succeeded" && (
        <>
          <Box
            style={{
              position: "relative",
              height: "100vh",
              width: "100%",
              overflow: "hidden",
            }}
          >
            {/* BACKGROUND */}
            {mediaUrl ? (
              <video
                ref={videoRef}
                src={mediaUrl}
                muted={muted}
                autoPlay
                loop
                playsInline
                style={{
                  // position: "absolute",
                  // inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  zIndex: Z.VIDEO, // <-- quan trọng
                }}
              />
            ) : (
              <Box
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage:
                    "url(https://placehold.co/800x1600/jpg?text=Credit+Card+BG)",
                  backgroundPosition: "cover",
                  backgroundSize: "cover",
                }}
              />
            )}

            {/* ===== Scroll pill (Chi tiết lợi ích) — ABSOLUTE CENTER ===== */}
            <Box
              onClick={scrollToMore}
              style={{
                position: "absolute",
                top: "40%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: Z.PILL,
                userSelect: "none",
                cursor: "pointer",
                pointerEvents: "auto",
              }}
            >
              <Box
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    opacity: 0.8,
                    fontWeight: 700,
                    fontSize: 14,
                  }}
                >
                  Chi tiết lợi ích
                </Text>
                <img
                  src={IScrollDown}
                  alt="cvp-volume"
                  style={{
                    objectFit: "cover",
                    width: 12,
                    height: 12,
                  }}
                  onClick={toggleMute}
                />
              </Box>
            </Box>

            {/* USP CARD nổi phía dưới (giống mock) */}
            <Box
              style={{
                position: "absolute",
                left: 16,
                right: 16,
                top: "45%",
                zIndex: Z.USP,
                background: "rgba(255,255,255,0.95)",
                color: "#111827",
                borderRadius: 16,
                boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
                padding: 12,
              }}
            >
              <UspSection
                items={uspItems}
                backgroundColor="transparent"
                isActive
                onPressUspItem={onPressUspItem}
              />
            </Box>
          </Box>

          {/* FLOATING ACTIONS */}
          <Box
            style={{
              position: "absolute",
              top: "25%",
              right: 16,
              display: "flex",
              flexDirection: "column",
              gap: 12,
              zIndex: Z.FAB,
            }}
          >
            {shareDeepLinkUrl && (
              <img
                src={ICvpShare}
                alt="cvp-share"
                // className="ml-4 h-8 w-auto"
                style={{
                  objectFit: "cover",
                }}
                onClick={handleShare}
              />
            )}
            {mediaUrl && (
              <img
                src={muted ? ICvpVolumeDown : ICvpVolumeUp}
                alt="cvp-volume"
                // className="ml-4 h-8 w-auto"
                style={{
                  objectFit: "cover",
                }}
                onClick={toggleMute}
              />
            )}
          </Box>

          {/* PROMOTION */}
          <Box
            id="more-section"
            className="px-6 pt-6"
            style={{
              background: "#FFF9E5FF",
              width: "100%",
              paddingBottom: 70,
            }}
          >
            {/* <PromotionSection/> */}
            <PromotionSection
              title={cvp_promotion.data.attributes.title}
              items={
                (cvp_promotion.data.attributes
                  .cvp_promotion_card as unknown as CvpPromotionCard[]) ?? []
              }
              onPressPromotionItem={onPressPromotionItem}
              key={uuidv4()}
            />

            <FaqSection
              title={cvp_faq.data.attributes.title}
              items={
                (cvp_faq.data.attributes
                  .cvp_faq_item as unknown as CvpFaqItem[]) ?? []
              }
              onPressQuestionItem={onPressQuestionItem}
              key={uuidv4()}
            />
          </Box>

          {/* BOTTOM CTA */}
          <Box
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 4,
              padding: 16,
              // backdropFilter: "blur(8px)",
              // background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.45) 30%, rgba(0,0,0,.65) 100%)",
            }}
          >
            {/* {tncAttr?.is_active && (
              <TermAndCondition
                title={tncAttr.title}
                pdfUrl={tncAttr.pdf_url}
                isChecked={isChecked}
                setIsChecked={setIsChecked}
              />
            )} 
            bottomButton.label || 
            */}

            {bottomButton?.is_active && (
              <Button
                fullWidth
                disabled={false}
                onClick={onSubmit}
                style={{
                  background:
                    "linear-gradient(90deg, #e02424 0%, #ff6a00 55%, #ffd166 100%)",
                  color: "#fff",
                  fontWeight: 700,
                  borderRadius: 999,
                  height: 52,
                  boxShadow: "0 10px 24px rgba(224,36,36,.35)",
                }}
              >
                {"Tiếp tục"}
              </Button>
            )}
          </Box>
        </>
      )}
    </Page>
  );
};

const fabStyle: React.CSSProperties = {
  background: "#fff",
  borderRadius: "50%",
  width: 40,
  height: 40,
  minWidth: 40,
  padding: 0,
  boxShadow: "0 4px 10px rgba(0,0,0,0.18)",
};

export default CardAvailableDetail;
