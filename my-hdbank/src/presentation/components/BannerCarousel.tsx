import { FC } from "react";
import {
  Box,
  Swiper,
} from "zmp-ui";

const BannerCarousel: FC = () => {

  return (
    <Box className="px-6">
      <Swiper
        dots
        autoplay={true}
        loop={false}
        style={{ width: "100%" }} // cho swiper rộng hơn
      >
        <Swiper.Slide>
          <img
            src="https://picsum.photos/seed/hdb-1/920/360"
            className="w-full h-[120px] object-cover rounded-xl"
          />
        </Swiper.Slide>
        <Swiper.Slide>
          <img
            src="https://picsum.photos/seed/hdb-2/920/360"
            className="w-full h-[120px] object-cover rounded-xl"
          />
        </Swiper.Slide>
        <Swiper.Slide>
          <img
            src="https://picsum.photos/seed/hdb-3/920/360"
            className="w-full h-[120px] object-cover rounded-xl"
          />
        </Swiper.Slide>
      </Swiper>
    </Box>
  )
}

export default BannerCarousel;