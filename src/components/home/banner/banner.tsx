import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import {
  Carousel,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";

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
      <div className="px-7 pt-3">
        <div className="relative rounded-2xl">
          {bannersData.length > 0 && (
            <Carousel
              transition={{ type: "tween", duration: 1 }}
              className="rounded-2xl"
              // autoplay
              loop
              slideRef={() => {}}
              placeholder={"blank"}
              prevArrow={({ handlePrev }) => (
                <IconButton
                  placeholder={"blank"}
                  variant="text"
                  color="white"
                  size="lg"
                  onClick={handlePrev}
                  className="!absolute top-2/4 left-4 -translate-y-2/4 hidden">
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
                  className="!absolute top-2/4 !right-4 -translate-y-2/4 hidden">
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
                <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
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
                  <Typography
                    placeholder={"blank"}
                    variant="h1"
                    color="white"
                    className="absolute top-1/4 left-1/4 -translate-x-48 -translate-y-2/4">
                    {banner.name}
                  </Typography>
                  <Typography
                    placeholder={"blank"}
                    variant="h2"
                    className="absolute top-2/4 left-1/4 -translate-x-48 -translate-y-20 text-white">
                    Testing
                  </Typography>
                  <Image
                    width={2000}
                    height={200}
                    priority
                    draggable={false}
                    src={banner.imageUrl}
                    alt={`image ${index + 1}`}
                    className="h-[90vh] w-full object-cover rounded-2xl"
                  />
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
