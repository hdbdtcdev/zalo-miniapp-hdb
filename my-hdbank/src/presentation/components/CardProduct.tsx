import { FC } from "react";
import { Box } from "zmp-ui";
import { CardAvailableListDataRes } from "@/domain/entities/card/cardAvailableList";

type CardProductProps = {
  product: CardAvailableListDataRes;
  goToDetail: (product: CardAvailableListDataRes) => void;
};

const CardProduct: FC<CardProductProps> = ({ product, goToDetail }) => {
  return (
    <Box
      key={product.productCode}
      className="bg-white rounded-2xl overflow-hidden shadow-lg mx-2 flex flex-col"
      style={{
        boxShadow: "2 8px 12px rgba(0,0,0,0.1)", // shadow mềm hơn
      }}
    >
      {/* Card Header - gradient background */}
      <Box className="relative bg-gradient-to-r from-orange-500 to-yellow-300 h-20 flex items-start px-4">
        <img
          src={product.image}
          alt={product.productName}
          className="w-[110px] h-[75px] object-contain relative top-10"
        />
      </Box>
      {/* Product Name bên ngoài gradient, ngay trên promo list */}
      <Box className="px-4 mt-12">
        <p className="text-red-600 font-bold text-base leading-6 break-words">
          {product.productName}
        </p>
      </Box>

      {/* Promo List */}
      <Box className="px-5 py-4 flex-1">
        {Array.isArray(product.promoList) &&
          product.promoList.map((pro, i) => (
            <Box
              key={`promo-${i}`}
              className="flex items-start py-2 border-b last:border-0 border-gray-100"
            >
              <img
                src={pro.icon}
                alt={pro.title}
                className="w-6 h-6 mr-3 shrink-0"
              />
              <Box className="flex-1">
                <p className="text-sm font-semibold text-gray-800">
                  {pro.title}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{pro.detail}</p>
              </Box>
            </Box>
          ))}
      </Box>

      {/* Action Button */}
      <Box className="px-5 pb-5">
        <button
          className="w-full py-3 rounded-xl text-white font-semibold shadow-md transition-all duration-200"
          style={{
            background: "linear-gradient(90deg, #FF6600 0%, #FFCC00 100%)",
          }}
          onClick={() => goToDetail(product)}
        >
          Mở thẻ ngay
        </button>
      </Box>
    </Box>
  );
};

export default CardProduct;
