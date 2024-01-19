"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API as string;
const apiKey = process.env.NEXT_PUBLIC_API_TOKEN as string;

const create = ({ createData }: any) => {
  const sendAccessToken = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/v1/create-promo`, {
        headers: {
          apiKey: `${apiKey}`,
          "Content-Type": "application/json",
        },
      });

      const accessToken = res.data.accessToken;

      if (accessToken) {

        localStorage.setItem("accessToken", accessToken);

        console.log("Access token stored successfully:", accessToken);
      } else {
        console.error("Access token not found in the response.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  
  return (
    <>
      <div>
        {/* <ul>
          {createData.map((create: any) => (
            <li key={create.id}>
              <Image
                alt={create.title}
                priority
                src={create.imageUrl}
                width={200}
                height={200}
                className="w-auto"
              />
            </li>
          ))}
        </ul> */}
      </div>
    </>
  );
};

export default create;
