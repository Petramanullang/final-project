import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { Carousel, IconButton } from "@material-tailwind/react";

const apiUrl = process.env.NEXT_PUBLIC_API as string;
const apiKey = process.env.NEXT_PUBLIC_API_TOKEN as string;

const Banner = () => {
  const [bannersData, setBannersData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loginApiUrl = `${apiUrl}/api/v1/banners`;
        const res = await axios.get(loginApiUrl, {
          headers: {
            apiKey: `${apiKey}`,
            "Content-Type": "application/json",
          },
        });
        const data = res.data.data;
        setBannersData(data);
      } catch (error: any) {
        console.error(
          "Error fetching data:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="px-3 lg:px-7 pt-3 mt-16">
        <div className="relative rounded-full">
          {bannersData.length > 0 && (
            <Carousel
              transition={{ type: "tween", duration: 1 }}
              // autoplay
              // autoplayDelay={5000}
              loop
              className="rounded-2xl"
              slideRef={() => {}}
              placeholder={"blank"}
              prevArrow={({ handlePrev }) => (
                <IconButton
                  placeholder={"blank"}
                  variant="text"
                  color="white"
                  size="lg"
                  onClick={handlePrev}
                  className="!absolute bottom-14 lg:top-3/4 left-2 translate-y-10 lg:translate-x-28 border rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-6 w-6">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                    />
                  </svg>
                </IconButton>
              )}
              nextArrow={({ handleNext }) => (
                <IconButton
                  placeholder={"blank"}
                  variant="text"
                  color="white"
                  size="lg"
                  onClick={handleNext}
                  className="!absolute bottom-14 lg:op-3/4 left-2 translate-y-10 translate-x-20 lg:translate-x-48 border rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-6 w-6">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </IconButton>
              )}
              navigation={({ setActiveIndex, activeIndex, length }) => (
                <div className="absolute bottom-4 left-2/4 z-50 hidden -translate-x-2/4 gap-2 ">
                  {new Array(length).fill("").map((_, i) => (
                    <span
                      key={i}
                      className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                        activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                      }`}
                      onClick={() => setActiveIndex(i)}
                    />
                  ))}
                </div>
              )}>
              {bannersData.map((banner: any, index) => (
                <div key={banner.id} className="rounded-2xl relative">
                  <img
                    width={2000}
                    height={200}
                    draggable={false}
                    src={banner.imageUrl}
                    alt={`image ${index + 1}`}
                    className="h-[90vh] w-full object-cover brightness-75"
                  />
                  <div>
                    <p className="absolute font-thin lg:font-semibold text-4xl lg:text-7xl lg:w-[50vw] top-10 lg:top-1/4 left-5 lg:left-1/4 lg:-translate-x-64 lg:-translate-y-2/4 text-white">
                      Explore the sights
                    </p>
                    <p className="absolute font-thin lg:font-semibold text-4xl lg:text-7xl lg:w-[50vw] top-10 lg:top-1/4 left-5 lg:left-1/4 lg:-translate-x-64 translate-y-[44px] lg:translate-y-14 text-white ">
                      of the {banner.name}
                    </p>
                    <p className="absolute font-extralight lg:font-medium w-56 lg:w-full top-44 lg:top-2/4 left-5 lg:left-1/4 lg:-translate-x-60 lg:translate-y-5 text-white text-xl">
                      A place where nature and adventure unite
                    </p>
                    <Link
                      href={""}
                      className="absolute top-64 lg:top-3/4 left-5 lg:left-2 lg:translate-x-28 translate-y-2 lg:-translate-y-16 py-3 px-10 bg-white text-black normal-case rounded-2xl font-semibold">
                      Book now
                    </Link>
                  </div>
                </div>
              ))}
            </Carousel>
          )}
        </div>
      </div>
    </>
  );
};

export default Banner;
