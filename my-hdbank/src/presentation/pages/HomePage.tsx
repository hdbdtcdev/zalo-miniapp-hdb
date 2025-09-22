import { FC, useEffect, useState } from "react";
import { Page, Header, Box, Swiper, useNavigate, Button } from "zmp-ui";
import { MoveLeft } from "lucide-react";
import { useDispatch } from "@/lib/redux";
import '@/presentation/styles/swiper.css';

// mock data sản phẩm
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

// hook gọi API
function useCardListAvailable() {
  const dispatch = useDispatch();

  useEffect(() => { }, [dispatch]);
}

// Component hiển thị 1 card
function CardProduct({ product }: { product: (typeof products)[number] }) {
  return (
    <div className="w-full max-w-xl mx-auto relative pt-24">
      {/* Ảnh nổi */}
      <div className="absolute inset-x-[5%] top-0 h-40 rounded-xl shadow-lg z-20 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500">
        <div className="w-[90%] h-[75%] mx-auto mt-5 rounded-lg bg-black/85 text-white p-3 flex flex-col justify-between text-xs">
          <div className="flex justify-between opacity-90">
            <strong>HDBank</strong>
            <strong>Vietjet Air</strong>
          </div>
          <div className="text-right opacity-80">VISA Platinum</div>
        </div>
      </div>

      {/* Card trắng */}
      <div className="relative bg-white rounded-2xl shadow-md p-4 pt-28 z-10">
        <div className="text-red-700 font-extrabold text-lg mb-4">
          {product.name}
        </div>
        <div className="grid gap-7">
          {product.perks.map((perk, i) => (
            <div key={i} className="flex gap-5">
              <div className="w-7 h-7 rounded-full flex-shrink-0 bg-gradient-to-r from-red-500 to-yellow-400" />
              <div>
                <div className="font-semibold text-sm">{perk.title}</div>
                <div className="text-gray-500 text-xs">{perk.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const HomePage: FC = () => {
  useCardListAvailable();

  const navigate = useNavigate();
  const [active, setActive] = useState(0);

  const handleSelect = () => {
    const selected = products[active];
    console.log("Chọn sản phẩm:", selected.id);
    navigate("/CreditCardPreview");
  };

  return (
    <Page className="bg-transparent">
      <Header
        backIcon={<MoveLeft color="#fff" />}
        title="Phát hành thẻ tín dụng"
        className="transparent-header"
        style={{
          background: "transparent",
          boxShadow: "none",
          borderBottom: "none",
          color: "#fff",
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
          justifyContent: 'space-between'
        }}
      />

      <div className="pt-[calc(env(safe-area-inset-top,0px)+56px)]">
        <Box className="p-4 mt-4">
          <div className="font-semibold text-2xl leading-snug mb-6 text-gray-900">
            Vui lòng chọn thẻ tín dụng HDBank phù hợp với nhu cầu của Quý khách
          </div>
        </Box>

        <Box
          className="m-6"
          style={{
            position: "relative",
            paddingBottom: 40,
          }}
        >
          <Swiper
            dots
            autoplay={false}
            loop={false}
            style={{
              paddingBottom: 40,
            }}
          >
            {products.map((card) => (
              <Swiper.Slide key={card.id} style={{ padding: "0 12px" }}>
                <CardProduct product={card} />
              </Swiper.Slide>
            ))}
          </Swiper>

          {/* Button */}
          <Box className="fixed bottom-0 left-0 right-0 p-6">
            <Button
              fullWidth
              style={{
                background: "linear-gradient(90deg, #e02424 0%, #ff6a00 50%, #ffd166 100%)",
                color: "#fff",
                fontWeight: 600,
                borderRadius: 999,
                height: 52,
              }}
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

export default HomePage;
