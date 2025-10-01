import { FC, useState } from "react";
import { Page, Header, Box, Swiper, useNavigate } from "zmp-ui";
import { MoveLeft } from "lucide-react";
import { useSelector } from "@/lib/redux";
import { selectCardList } from "./redux";
import { useTranslation } from "react-i18next";

import "@/presentation/styles/home.css";
import "@/presentation/styles/swiper.css";
import { useCardAvailableList } from "@/hooks";
import CardProduct from "@/presentation/components/CardProduct";
import Logo from '@/asset/HDBank.svg';
import { CardAvailableListDataRes } from "@/domain/entities/card/cardAvailableList";

const CardAvailableList: FC = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const { t } = useTranslation(["ns"]);

  const cardList = useSelector(selectCardList);
  const { cardListStatus } = useCardAvailableList();

  const handleSelect = (product: CardAvailableListDataRes) => {
    console.log(`GOGO: ${JSON.stringify(product)}`);
    navigate("/card-available-detail");
  };

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
              src={Logo}
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
              {cardList.map((card) => (
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
    </Page>

  );
};

export default CardAvailableList;
