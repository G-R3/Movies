/* eslint-disable import/no-unresolved */
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { Box, Heading } from "@chakra-ui/react";
import Card from "./Card";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

export default function Carousel({ data, heading }: any): JSX.Element {
    return (
        <Box>
            <Heading
                as="h2"
                mb={4}
                fontSize={{
                    base: "xl",
                    md: "2xl",
                    lg: "3xl",
                }}
            >
                {heading}
            </Heading>
            <Swiper
                slidesPerView={3}
                spaceBetween={20}
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
        </Box>
    );
}
