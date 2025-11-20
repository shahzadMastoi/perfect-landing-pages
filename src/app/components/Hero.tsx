"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function Hero() {
    return (
        <section className="relative flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-20 bg-gradient-to-br from-indigo-900 via-indigo-800 to-teal-500 text-white">
            {/* Left Text */}
            <div className="max-w-lg z-10">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
                    Landing Pages <br /> Creative Design
                </h1>
                <p className="text-lg mb-6 opacity-80">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div className="space-x-4">
                    <button className="px-6 py-3 bg-white text-indigo-800 font-semibold rounded-lg shadow hover:bg-gray-200 transition">
                        Try Now
                    </button>
                    <button className="px-6 py-3 border border-white rounded-lg hover:bg-white hover:text-indigo-800 transition">
                        Contact Us
                    </button>
                </div>
            </div>

            {/* Right: Swiper Showcase */}
            <div className="mt-10 md:mt-0 relative w-full md:w-1/2 h-72">
                <Swiper
                    modules={[Pagination, Autoplay]}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3000 }}
                    loop={true}
                    className="h-full rounded-lg shadow-lg"
                >
                    <SwiperSlide>
                        <div className="w-full h-72 bg-indigo-700 rounded-lg overflow-hidden">
                            <img
                                src="/images/landing1.jpg"
                                alt="Showcase 1"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className="w-full h-72 bg-indigo-700 rounded-lg overflow-hidden">
                            <img
                                src="/images/landing2.jpg"
                                alt="Showcase 2"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className="w-full h-72 bg-indigo-700 rounded-lg overflow-hidden">
                            <img
                                src="/images/landing3.jpg"
                                alt="Showcase 3"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>

        </section>
    );
}
