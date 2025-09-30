import { FC, useState } from "react";
import { Page, Header, Box, Swiper, useNavigate, Button } from "zmp-ui";
import { MoveLeft } from "lucide-react";
import { useSelector } from "@/lib/redux";

import { selectCardList } from "./redux";
import { useTranslation } from "react-i18next";

import "@/presentation/styles/home.css";
import "@/presentation/styles/swiper.css";
import { useCardAvailableList } from "@/hooks";

const products = [
  {
    id: "vietjet-platinum",
    name: "HDBank Vietjet Platinum",
    perks: [
      {
        title: "0 phí thường niên trọn đời",
        desc: "Không kèm bất kỳ điều kiện nào.",
      },
      {
        title: "Miễn lãi đến 45 ngày",
        desc: "Hạn mức sẵn sàng. Mua trước, trả sau.",
      },
      {
        title: "Cần là có, đăng ký siêu dễ!",
        desc: "Mở thẻ online, không cần chứng minh thu nhập.",
      },
    ],
  },
  {
    id: "classic",
    name: "HDBank Classic",
    perks: [
      {
        title: "Hoàn tiền theo chi tiêu",
        desc: "Ưu đãi theo từng hạng mục chi tiêu.",
      },
      { title: "Ân hạn lãi 45 ngày", desc: "Quản lý dòng tiền linh hoạt." },
      {
        title: "Đăng ký online nhanh",
        desc: "Xét duyệt tự động trong vài phút.",
      },
    ],
  },
];


const CardAvailableList: FC = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const { t } = useTranslation(["ns"]);

  const cardList = useSelector(selectCardList);
  const { cardListStatus } = useCardAvailableList();

  const CardProduct = ({ product }: { product: (typeof products)[number] }) => {
    return (
      <div className="card-wrapper">
        {/* Ảnh nổi */}
        <div className="card-banner">
          <div className="card-visual">
            <div className="flex justify-between opacity-90">
              <strong>HDBank</strong>
              <strong>Vietjet Air</strong>
            </div>
            <div className="text-right opacity-80">VISA Platinum</div>
          </div>
        </div>

        {/* Card trắng */}
        <div className="card-body">
          <div className="card-title">{product.name}</div>
          <div className="grid gap-7">
            {product.perks.map((perk, i) => (
              <div key={i} className="flex gap-5">
                <div className="perk-dot" />
                <div>
                  <div className="perk-title">{perk.title}</div>
                  <div className="perk-desc">{perk.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const handleSelect = () => {
    const selected = products[active];
    console.log("Chọn sản phẩm:", selected.id);
    navigate("/card-available-detail");
  };

  return (
    <Page className="bg-transparent">
      <Header
        backIcon={<MoveLeft color="#fff" />}
        title="Phát hành thẻ tín dụng"
        className="transparent-header"
      />

      <div className="pt-header">
        <Box className="p-4 mt-4">
          <div className="intro-text">
            Vui lòng chọn thẻ tín dụng HDBank phù hợp với nhu cầu của Quý khách
          </div>
        </Box>

        <Box className="swiper-wrapper">
          <Swiper dots autoplay={false} loop={false}>
            {products.map((card) => (
              <Swiper.Slide key={card.id} style={{ padding: "0 12px" }}>
                <CardProduct product={card} />
              </Swiper.Slide>
            ))}
          </Swiper>

          {/* Button */}
          <Box className="btn-wrapper">
            <Button
              fullWidth
              className="btn-select"
              onClick={handleSelect}
            >
              Chọn sản phẩm này
            </Button>
          </Box>
        </Box>
      </div>
    </Page>
  );
};

export default CardAvailableList;
