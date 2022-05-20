/* eslint-disable import/no-unresolved */
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { Box, Heading, Image, Text, Skeleton } from "@chakra-ui/react";
import { useState } from "react";

import "swiper/css";
import "swiper/css/navigation";

export default function Cast({ cast }: any) {
    const [imageLoaded, setImageLoaded] = useState(false);

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
                Cast
            </Heading>
            <Swiper
                slidesPerView={2}
                spaceBetween={10}
                navigation
                freeMode
                modules={[Navigation]}
                wrapperTag="ul"
                breakpoints={{
                    320: {
                        slidesPerView: 3,
                    },
                    640: {
                        slidesPerView: 5,
                    },
                    768: {
                        slidesPerView: 6,
                    },
                    1024: {
                        slidesPerView: 10,
                    },
                }}
            >
                {cast.map((member: any) => (
                    <SwiperSlide
                        key={member.id}
                        tag="li"
                        style={{ listStyle: "none" }}
                    >
                        <Skeleton isLoaded={imageLoaded}>
                            <Image
                                borderRadius="md"
                                src={`https://image.tmdb.org/t/p/original${member.profile_path}`}
                                alt={member.name}
                                onLoad={() => setImageLoaded(true)}
                            />
                        </Skeleton>
                        <Skeleton isLoaded={imageLoaded}>
                            <Text fontSize="xs" mt={2}>
                                {member.name}
                            </Text>
                        </Skeleton>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    );
}
