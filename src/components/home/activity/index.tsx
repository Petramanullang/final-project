"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API as string;
const apiKey = process.env.NEXT_PUBLIC_API_TOKEN as string;

const Activity = () => {
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
      <div>
        <h1 className="text-center text-3xl mt-10 font-bold">Top value for you</h1>
        <ul className="grid grid-cols-3 place-items-center pt-10">
          {activityData.map((activity: any) => (
            <li key={activity.id}>
              <h3 className="text-center">{activity.title}</h3>
              {activity.imageUrls && activity.imageUrls.length > 0 ? (
                activity.imageUrls.slice(0, 1).map((imageUrl: string, index: number) => (
                  <Image
                    key={index}
                    src={imageUrl}
                    alt={`${activity.title} Image ${index + 1}`}
                    width={200}
                    height={200}
                    style={{ width: "auto", height: "auto" }}
                  />
                ))
              ) : (
                <p>No Images Available</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Activity;
