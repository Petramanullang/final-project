"use client";
import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import { Arrow } from "./category";
import { Button } from "@material-tailwind/react";
import Link from "next/link";

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
    <div className="px-16 pt-10">
      <h1 className="text-left text-5xl mt-10 font-bold">Choose your tour</h1>
      <ul className="pt-10 flex justify-center">
        <Marquee speed={30} className="rounded-md pt-5 pb-3 px-2">
          {promoData.slice(0, 5).map((promo: any) => (
            <li key={promo.id} className="shadow-sm rounded-xl border-2 ml-10">
              <Image
                alt={promo.title}
                priority
                src={promo.imageUrl}
                width={200}
                height={200}
                className="w-64 h-72 object-cover mx-auto rounded-xl"
              />
              <div className="px-3 pt-5 pb-3">
                <p className="text-left">{promo.title}</p>
                <p className="text-left mt-3">
                  <span className="font-bold">
                    Rp.{promo.promo_discount_price}
                  </span>
                  /person
                </p>
                <Arrow />
              </div>
            </li>
          ))}
        </Marquee>
      </ul>
      <Link href={`/promo`} className="grid place-items-center mt-5">
        <Button
          placeholder={""}
          className="normal-case tracking-widest bg-white text-black px-10 rounded-2xl border-black border shadow-none">
          See all
        </Button>
      </Link>
    </div>
  );
};

export default Promo;
