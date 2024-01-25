"use client";
import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API as string;
const apiKey = process.env.NEXT_PUBLIC_API_TOKEN as string;

const Promo = () => {
  const [promoData, setPromoData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loginApiUrl = `${apiUrl}/api/v1/promos`;
        const res = await axios.get(loginApiUrl, {
          headers: {
            apiKey: `${apiKey}`,
            "Content-Type": "application/json",
          },
        });
        const data = res.data.data;
        setPromoData(data);
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
    <div>
      <h1 className="text-center text-3xl mt-10 font-bold">Promo</h1>
      <ul className="grid grid-cols-3 place-items-center pt-10">
        {promoData.map((promo: any) => (
          <li key={promo.id}>
            <Image
              alt={promo.title}
              priority
              src={promo.imageUrl}
              width={200}
              height={200}
              className="w-auto"
            />
            <p>{promo.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Promo;
