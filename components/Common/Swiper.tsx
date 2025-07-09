import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image from "next/image";
import { useAppSelector } from "@/redux/hook";
import { LoadingIcon } from "./Icons";
import { useEffect, useState } from "react";
interface LinkType {
  link_type?: string;
  url?: string;
}

interface TypeBanner {
  imgUrlMobile: string;
  imgUrlDesktop: string;
  showBannerTime: string;
  expireBannerTime: string;
  web_link_url: LinkType;
}

const SimpleSwiperWithParams = () => {
  const { profile } = useAppSelector((state) => state.authReducer);
  const accessToken = profile?.accessToken;
  const {
    listBanner,
    loadingGetBanner,
  } = useAppSelector((state) => state.authReducer);
  const [bannerList, setBannerList] = useState<TypeBanner[]>([]);

  useEffect(() => {
    if (listBanner) {
      if (!accessToken) {
        const list = listBanner.find(
          (item) => item.groupName === "Not logged in"
        );
        setBannerList(list?.bannerList);
      } else {
        const list = listBanner.find((item) => item.groupName === "NORMAL");
        setBannerList(list?.bannerList);
      }
    }
  }, [listBanner, accessToken]);

  const handleRedirect = (item: LinkType) => {
    if (item.url) window.open(item.url, "_blank");
  };

  return (
    <>
      {loadingGetBanner ? (
        <div className=" h-[130px] flex justify-center items-center w-full">
          <LoadingIcon className="fill-normal-100 !w-10 !h-10" />
        </div>
      ) : (
        <Swiper
          id="banner"
          modules={[Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => {}}
          onSlideChange={() => {}}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
        >
          {bannerList &&
            bannerList.length > 0 &&
            bannerList.map((item, ind) => {
              return (
                <SwiperSlide key={ind}>
                  <Image
                    src={item.imgUrlDesktop}
                    alt="banner"
                    width={1130}
                    height={140}
                    className="w-full h-auto hidden md:block cursor-pointer"
                    onClick={() => handleRedirect(item.web_link_url)}
                  />
                  <Image
                    src={item.imgUrlMobile}
                    alt="banner"
                    width={1242}
                    height={410}
                    className="w-full h-auto block md:hidden cursor-pointer"
                    onClick={() => handleRedirect(item.web_link_url)}
                  />
                </SwiperSlide>
              );
            })}
        </Swiper>
      )}
    </>
  );
};

export default SimpleSwiperWithParams;
