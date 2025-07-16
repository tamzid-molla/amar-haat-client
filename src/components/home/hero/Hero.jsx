import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import image1 from '../../../assets/banner/image1.jpg'
import image2 from '../../../assets/banner/image2.jpg'
import image3 from '../../../assets/banner/image3.jpg'

const slides = [
  {
    id: 1,
    title: "Fresh From Local Markets",
    subtitle: "Get farm-fresh vegetables and fruits at your doorstep.",
    image: image1
  },
  {
    id: 2,
    title: "Support Local Farmers",
    subtitle: "We connect you directly with trusted sellers.",
    image: image2
  },
  {
    id: 3,
    title: "Daily Updated Prices",
    subtitle: "Track & compare vegetable prices across markets.",
    image: image3
  },
];

const Hero = () => {
  return (
    <div className="w-11/12 mx-auto overflow-hidden rounded-2xl mt-10 p-2 h-[400px] md:h-[500px]">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} >
            <div className="relative w-full h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70"></div>
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
                <h2 className="text-3xl md:text-5xl font-bold mb-2">{slide.title}</h2>
                <p className="text-sm md:text-lg mb-4">{slide.subtitle}</p>
                <Link to="/allProducts">
                <button className="bg-accent px-5 py-2 rounded-xl hover:bg-accent/90 transition font-medium">
                  Shop Now
                </button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
