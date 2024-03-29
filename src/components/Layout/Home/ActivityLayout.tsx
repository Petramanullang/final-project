"use client";
import axios from "axios";
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
      <div className="mt-10 lg:mt-20 px-4 lg:px-16 pt-0">
        <ul>
          {activityData.slice(0, 1).map((activity: any) => (
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
                      className="rounded-3xl mx-auto object-cover w-full h-[600px]"
                    />
                  ))
                ) : (
                  <p>No Images Available</p>
                )}
              </li>
            </Link>
          ))}
        </ul>
        <p></p>
      </div>
    </>
  );
};

export default Activity;
