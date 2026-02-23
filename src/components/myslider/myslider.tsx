'use client'

import React from 'react'
import Image, { StaticImageData } from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'

// مهم جداً
import 'swiper/css'

type MySliderProps = {
  imgList: (string | StaticImageData)[]
  slidesPerView?: number
}

export default function MySlider({ imgList, slidesPerView = 1 }: MySliderProps) {
  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={slidesPerView}
      modules={[Autoplay]}
      autoplay={{ delay: 2000 }}
      loop={true}
    >
      {imgList.map((img, index) => (
        <SwiperSlide key={index}>
          <Image
            src={img}
            width={800}
            height={400}
            className="w-full h-[200px] md:h-[300px] object-cover"
            alt={`image-${index}`}
            priority={index === 0}
          />
          
        </SwiperSlide>
      ))}
    </Swiper>
  )
}