import { FC, useCallback } from "react";
import { Page, Box, Swiper, useNavigate, Text, Grid } from "zmp-ui";
import { MoveLeft } from "lucide-react";
import { useDispatch } from "@/lib/redux";

import "@/presentation/styles/home.css";
import "@/presentation/styles/swiper.css";
import CardProduct from "@/presentation/components/CardProduct";
import { CardAvailableListDataRes } from "@/domain/entities/card/cardAvailableList";
import CardAvaialbleListMock from '@/mock/card_available_list.json';
import { LogoHDBank } from "@/assets";
import { useCardAvailableList } from "@/hooks";
import BannerCarousel from "@/presentation/components/BannerCarousel";

const CardAvailableList: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSelect = useCallback((product: CardAvailableListDataRes) => {
    const { productCode } = product;
    if (!productCode) return;
    navigate(`/card-available-detail/${productCode}`);
  }, [dispatch, navigate]);

  // const { cardListData, cardListStatus } = useCardAvailableList();

  return (
    <Page className="bg-transparent">
      <Box>
        {/* Đặt header như 1 Box trong nội dung */}
        <Box className="px-6 pt-4">
          <Box className="pt-4 flex items-center">
            <MoveLeft color="#fff" onClick={() => navigate(-1)} />
            <img
              src={LogoHDBank}
              alt="Logo"
              className="ml-4 h-8 w-auto"
            />
          </Box>
        </Box>

        {/* Body scroll */}
        <Box
          className="bg-white rounded-t-3xl pt-6 mt-2"
          style={{
            minHeight: "100vh", // body dài để scroll
          }}
        >
          {/* Banner carousel */}
          <BannerCarousel />

          {/* Card */}
          <Box className="px-4">
            <Text
              className="text-lg font-semibold text-black"
              style={{
                fontSize: 20,
                marginBottom: 12
              }}
            >
              Thẻ tín dụng
            </Text>

            <Box className="swiper-wrapper">
              <Swiper
                dots
                autoplay={false}
                loop={false}
                style={{ width: "100%" }} // cho swiper rộng hơn
              >
                {CardAvaialbleListMock.map((card) => (
                  <Swiper.Slide
                    key={card.productCode}
                    style={{}}
                  >
                    <CardProduct product={card} goToDetail={handleSelect} />
                  </Swiper.Slide>
                ))}
              </Swiper>
            </Box>
          </Box>

          {/* Ưu đãi nổi bật */}
          <Text className="px-4 mt-4 mb-2 font-semibold text-[20px] text-[#101828]">
            Ưu đãi nổi bật
          </Text>
          <Box className="px-4">
            <Grid columnCount={2} columnSpace='1rem'>
              <PromoCard
                title="Hoàn tiền đến 1.000.000 VNĐ"
                subtitle="HSD: 12/04/2025"
              />
              <PromoCard
                title="Check-in ưu tiên, hoàn 6 triệu"
                subtitle="HSD: 12/04/2025"
              />
            </Grid>
          </Box>

          {/* Cẩm nang thẻ */}
          <Text className="px-4 mt-4 mb-2 font-semibold text-[20px] text-[#101828]">
            Cẩm nang thẻ
          </Text>
          <Box className="px-4 pb-6">
            <PromoCard title="Ưu đãi Đà Lạt dành cho khách..." subtitle="Xem thêm" />
          </Box>
        </Box>
      </Box>
    </Page>
  );
};

function PromoCard({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <Box className="border border-[#EEF2F6] rounded-xl overflow-hidden">
      <img
        src="https://picsum.photos/seed/promo/600/360"
        className="w-full h-[86px] object-cover"
      />
      <Box className="p-2.5">
        <Text className="text-[13px] font-semibold text-[#0F172A]">
          {title}
        </Text>
        <Text className="text-[12px] text-[#667085] mt-1">{subtitle}</Text>
      </Box>
    </Box>
  );
}

export default CardAvailableList;
