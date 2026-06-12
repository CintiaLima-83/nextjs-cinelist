"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Image from "next/image";
import Link from "next/link";

interface PosterCarouselProps {
  filmes?: {
    id: number;
    title: string;
    poster_path: string | null;
  }[];
}

export default function PosterCarousel({ filmes }: PosterCarouselProps) {
  if (!filmes || filmes.length === 0) {
    return <p className="text-center text-gray-500">Nenhum filme para mostrar.</p>;
  }

  return (
    <div className="w-full h-auto transition-transform duration-300 hover:scale-105">
      <Swiper
        spaceBetween={20}
        loop
        autoplay={{ delay: 3000 }}
        modules={[Autoplay]}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
      >
        {filmes
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <SwiperSlide key={movie.id}>
              <Link href={`/filmes/${movie.id}`} className="block">
                <div className="relative rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    width={300}
                    height={450}
                    className="w-full h-auto"
                  />
                  <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h3 className="text-white font-bold text-lg">{movie.title}</h3>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
