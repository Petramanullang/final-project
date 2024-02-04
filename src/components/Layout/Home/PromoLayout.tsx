"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import { Arrow } from "@/components/Fragments/Global/Arrow";
import { Button } from "@material-tailwind/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { StarIcon } from "@heroicons/react/24/solid";

const apiUrl = process.env.NEXT_PUBLIC_API as string;
const apiKey = process.env.NEXT_PUBLIC_API_TOKEN as string;

const Promo = () => {
  const [promoData, setPromoData] = useState([]);
  const router = useRouter();

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
    <div className="pt-10">
      <h1 className="text-left text-5xl mt-10 font-bold">Choose your tour</h1>
      <ul className="pt-10 flex justify-center">
        <Marquee play={true} speed={20} className="rounded-md pt-5 pb-3 px-2">
          {promoData.slice(0, 5).map((promo: any) => (
            <li key={promo.id} className="shadow-sm rounded-xl border-2 ml-10">
              <div className="absolute translate-x-52 translate-y-2 bg-gray-400 rounded-full px-2 py-1">
                <div className="flex gap-1">
                  <p className="text-white">5.0</p>
                  <StarIcon className="text-white h-5 " />
                </div>
              </div>
              <img
                alt={promo.title}
                src={promo.imageUrl}
                width={500}
                height={500}
                className="w-72 h-72 object-cover mx-auto rounded-xl"
              />
              <div className="flex px-3 pt-5 pb-3">
                <div className="flex-col">
                  <p className="text-left text-base">
                    {promo.title.split(" ").slice(0, 2).join(" ")}
                  </p>
                  <p className="text-left mt-3">
                    <span className="font-bold">
                      Rp.
                      {promo.promo_discount_price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    </span>
                    /person
                  </p>
                </div>
                <Arrow
                  customStyle="translate-y-2"
                  onClick={() => router.push(`/promos/${promo.id}`)}
                />
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
