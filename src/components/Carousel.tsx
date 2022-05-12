/* eslint-disable import/no-unresolved */
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import Card from "./Card";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

export default function Carousel({ data }: any): JSX.Element {
    return (
        <Swiper
            slidesPerView={3}
            spaceBetween={10}
            navigation
            freeMode
            modules={[Navigation]}
            wrapperTag="ul"
            breakpoints={{
                320: {
                    slidesPerView: 1,
                },
                480: {
                    slidesPerView: 3,
                },
            }}
        >
            {data.map((movie: any) => (
                <SwiperSlide
                    key={movie.id}
                    tag="li"
                    style={{ listStyle: "none" }}
                >
                    <Card movie={movie} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
