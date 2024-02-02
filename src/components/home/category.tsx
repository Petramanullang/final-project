"use client";
import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";

export const Arrow = () => {
  return (
    <div className="w-full flex justify-end">
      <button className="focus:outline-none focus:ring-2 ring-offset-2 focus:ring-gray-600 hover:opacity-75 justify-end flex items-center cursor-pointer rounded-full bg-black p-3">
        <svg
          className=" text-white"
          xmlns="http://www.w3.org/2000/svg"
          width={15}
          height={15}
          viewBox="0 0 20 18"
          fill="none">
          <path
            d="M11.7998 1L18.9998 8.53662L11.7998 16.0732"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1 8.53662H19"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

const apiUrl = process.env.NEXT_PUBLIC_API as string;
const apiKey = process.env.NEXT_PUBLIC_API_TOKEN as string;

const Category = () => {
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loginApiUrl = `${apiUrl}/api/v1/categories`;
        const res = await axios.get(loginApiUrl, {
          headers: {
            apiKey: `${apiKey}`,
            "Content-Type": "application/json",
          },
        });
        const data = res.data.data;
        setCategoryData(data);
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
        <div>
          <div id="blog" className=" px-4 xl:px-4 py-14">
            <div className="mx-auto container">
              <div
                tabIndex={0}
                aria-label="Group of cards"
                className="focus:outline-none mt-10">
                <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8">
                  <ul>
                    {categoryData.slice(0, 1).map((category: any) => (
                      <li key={category.id}>
                        <div className="focus:outline-none h-[675px] shadow-md border-gray-100 border-2 rounded-xl pb-3 mt-5">
                          <Image
                            alt="code editor"
                            width={500}
                            height={500}
                            className="focus:outline-none w-full h-4/5 object-cover rounded-2xl"
                            src={category.imageUrl}
                          />
                          <div className="px-2 pt-3">
                            <h1 className="focus:outline-none text-4xl text-gray-900 font-semibold tracking-wider">
                              Travel to {category.name}
                            </h1>
                            <Arrow />
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div>
                    <div>
                      <ul>
                        {categoryData.slice(1, 3).map((category: any) => (
                          <li key={category.id}>
                            <div
                              className="focus:outline-none shadow-md border-gray-100 border-2 rounded-xl mt-5"
                              aria-label="card 2">
                              <Image
                                width={500}
                                height={500}
                                className="focus:outline-none h-56 object-cover w-full rounded-xl"
                                src={category.imageUrl}
                                alt="games"
                              />
                              <div className="bg-white px-3 lg:px-6 py-4 rounded-bl-3xl rounded-br-3xl">
                                <h1
                                  tabIndex={0}
                                  className="focus:outline-none text-lg text-gray-900 font-semibold tracking-wider">
                                  Travel to {category.name}
                                </h1>
                                <Arrow />
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
