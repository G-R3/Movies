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
                slidesPerView={1}
                spaceBetween={20}
                navigation
                freeMode
                modules={[Navigation]}
                wrapperTag="ul"
                breakpoints={{
                    375: {
                        slidesPerView: 2,
                    },
                    480: {
                        slidesPerView: 3,
                    },
                    768: {
                        slidesPerView: 4,
                    },

                    980: {
                        slidesPerView: 6,
                    },
                    1200: {
                        slidesPerView: 8,
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
