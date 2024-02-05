"use client";
import { Button } from "@material-tailwind/react";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API as string;
const apiKey = process.env.NEXT_PUBLIC_API_TOKEN as string;

const Booking = () => {
  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loginApiUrl = `${apiUrl}/api/v1/activities`;
        const res = await axios.get(loginApiUrl, {
          headers: {
            apiKey: `${apiKey}`,
            "Content-Type": "application/json",
          },
        });
        const data = res.data.data;
        setActivityData(data);
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
      <div className="mb-10">
        <ul className="flex flex-col justify-center items-center">
          <Button
            placeholder={""}
            className="flex justify-center items-center w-fit normal-case lg:hidden mb-10">
            Read all article
          </Button>
          {activityData.slice(1, 2).map((activity: any) => (
            <Link href={`/activity/${activity.id}`} key={activity.id}>
              <li key={activity.id}>
                {activity.imageUrls && activity.imageUrls.length > 0 ? (
                  activity.imageUrls.map((imageUrl: string, index: number) => (
                    <img
                      key={index}
                      src={imageUrl}
                      alt={`${activity.title} Image ${index + 1}`}
                      width={1000}
                      height={1000}
                      className="rounded-3xl mx-auto object-cover lg:w-[1330px] h-[280px] lg:h-[500px] brightness-75"
                    />
                  ))
                ) : (
                  <p>No Images Available</p>
                )}
              </li>
              <div className="absolute translate-x-3 lg:translate-x-72 -translate-y-64 lg:-translate-y-96 flex flex-col justify-center items-center">
                <p className="px-2 py-1 text-white text-center text-[40px] lg:text-8xl font-[500]">
                  Let&apos;s get to know <br /> the world
                </p>
                <Button
                  placeholder={""}
                  className="w-full py-4 lg:py-0 lg:w-1/4 mt-12 lg:mt-10 bg-white  text-black text-lg normal-case lg:object-fit rounded-3xl">
                  Book now
                </Button>
              </div>
            </Link>
          ))}
        </ul>
        <p></p>
      </div>
    </>
  );
};

export default Booking;
