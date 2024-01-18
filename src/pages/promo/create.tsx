"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const createPromo = process.env.NEXT_PUBLIC_API_CREATE_PROMO as string;
const apiKey = process.env.NEXT_PUBLIC_API_TOKEN as string;

// export async function getServerSideProps() {
//   try {
//     const res = await axios.get(createPromo, {
//       headers: {
//         apiKey: `${apiKey}`,
//         "Content-Type": "application/json",
//       },
//     });
//     const createData = res.data.data;

//     return {
//       props: {
//         createData,
//       },
//     };
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return {
//       props: {
//         userData: [],
//       },
//     };
//   }
// }

const create = ({ createData }: any) => {
  const sendAccessToken = async () => {
    try {
      // Make a request to get the data including the access token
      const res = await axios.get(createPromo, {
        headers: {
          apiKey: `${apiKey}`,
          "Content-Type": "application/json",
        },
      });

      // Extract the access token from the response (modify this based on your API response structure)
      const accessToken = res.data.accessToken;

      // Check if accessToken is available
      if (accessToken) {
        // Store the access token in local storage
        localStorage.setItem("accessToken", accessToken);

        // Log success or perform additional actions
        console.log("Access token stored successfully:", accessToken);
      } else {
        console.error("Access token not found in the response.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error as needed
    }
  };

  // Call the function to send access token when the component mounts
  useEffect(() => {
    sendAccessToken();
  }, []);
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
