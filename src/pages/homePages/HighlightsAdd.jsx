import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/axios/useAxiosSecure";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HighlightsAdd = () => {
  const axiosSecure = useAxiosSecure();

  const { data: ads = [], isLoading } = useQuery({
    queryKey: ["home-ads"],
    queryFn: async () => {
      const res = await axiosSecure.get("/advertisements/status");
      return res.data;
    },
  });

  if (isLoading || ads.length === 0) return null;

  return (
    <div className="bg-bgSecondary mt-28 p-4 rounded-xl shadow w-11/12 mx-auto">
      <h2 className="text-3xl font-bold text-textPrimary mb-5"> Promotions & Highlights</h2>
      <div className="block space-y-5 md:space-y-0 md:flex gap-5 items-center">
        <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        navigation
        loop
        className="rounded-xl overflow-hidden flex-1"
      >
        {ads.map((ad) => (
          <SwiperSlide key={ad._id}>
            <div className="relative w-full h-72 md:h-96">
              <img
                src={ad.image}
                alt={ad.title}
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute bottom-0 left-0 bg-accent bg-opacity-60 text-white p-4 w-full rounded-b-xl">
                <h3 className="text-lg font-semibold">{ad.title}</h3>
                <p className="text-sm">{ad.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        navigation
        loop
        className="rounded-xl overflow-hidden flex-1"
      >
        {ads.map((ad) => (
          <SwiperSlide key={ad._id}>
            <div className="relative w-full h-72 md:h-96">
              <img
                src={ad.image}
                alt={ad.title}
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute bottom-0 left-0 bg-accent bg-opacity-60 text-white p-4 w-full rounded-b-xl">
                <h3 className="text-lg font-semibold">{ad.title}</h3>
                <p className="text-sm">{ad.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      </div>
    </div>
  );
};

export default HighlightsAdd;
