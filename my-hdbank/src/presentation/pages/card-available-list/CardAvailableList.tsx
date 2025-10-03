import { FC, useCallback } from "react";
import { Page, Box, Swiper, useNavigate } from "zmp-ui";
import { MoveLeft } from "lucide-react";
import { useDispatch } from "@/lib/redux";

import "@/presentation/styles/home.css";
import "@/presentation/styles/swiper.css";
import CardProduct from "@/presentation/components/CardProduct";
import { CardAvailableListDataRes } from "@/domain/entities/card/cardAvailableList";
import CardAvaialbleListMock from '@/mock/card_available_list.json';
import { LogoHDBank } from "@/assets";

const CardAvailableList: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSelect = useCallback((product: CardAvailableListDataRes) => {
    const { productCode } = product;
    if (!productCode) return;
    navigate(`/card-available-detail/${productCode}`);
  }, [dispatch, navigate]);

  return (
    <Page className="bg-transparent">
      <Box>
        {/* Đặt header như 1 Box trong nội dung */}
        <Box className="px-6 pt-4">
          <Box className="pt-4 flex items-center">
            <MoveLeft color="#fff" onClick={() => navigate(-1)} />
            {/* <span className="ml-4 text-lg font-semibold text-black">
              Phát hành thẻ tín dụng
            </span> */}
            <img
              src={LogoHDBank}
              alt="Logo"
              className="ml-4 h-8 w-auto"
            />
          </Box>
        </Box>

        {/* Body scroll */}
        <Box
          className="bg-white rounded-t-3xl pt-6 px-6 mt-2"
          style={{
            minHeight: "100vh", // body dài để scroll
          }}
        >
          <Box>
            <div className="intro-text text-lg font-semibold text-black mb-4">
              Thẻ tín dụng
            </div>

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
        </Box>
      </Box>
    </Page>

  );
};

export default CardAvailableList;
