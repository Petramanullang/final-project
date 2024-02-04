"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { Chip } from "@material-tailwind/react";
import { Arrow } from "@/components/Fragments/Global/Arrow";
import { useRouter } from "next/router";

export const ChipCustom = ({ text }: any) => {
  return (
    <Chip
      variant="ghost"
      value={
        <p className="text-sm text-gray-700 font-OpenSans font-thin normal-case">
          {text}
        </p>
      }
      className="rounded-xl"
    />
  );
};

const apiUrl = process.env.NEXT_PUBLIC_API as string;
const apiKey = process.env.NEXT_PUBLIC_API_TOKEN as string;

const Category = () => {
  const [categoryData, setCategoryData] = useState([]);
  const router = useRouter();

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
          <div id="category" className="py-14">
            <div className="mx-auto container">
              <div
                tabIndex={0}
                aria-label="Group of cards"
                className="focus:outline-none mt-10">
                <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8">
                  <ul>
                    {categoryData.slice(0, 1).map((category: any) => (
                      <li key={category.id}>
                        <div className="focus:outline-none h-[695px] shadow-md border-gray-100 border-2 rounded-xl pb-3 mt-5">
                          <img
                            alt="code editor"
                            width={500}
                            height={500}
                            className="focus:outline-none w-full h-4/5 object-cover rounded-2xl"
                            src={category.imageUrl}
                          />
                          <div className="px-2 pt-3">
                            <h1 className="focus:outline-none text-4xl font-OpenSans text-gray-900 font-extrabold  tracking-wider">
                              Travel to {category.name}
                            </h1>
                            <div className="flex gap-3 normal-case translate-y-4">
                              <ChipCustom text="Tours" />
                              <ChipCustom text={category.name} />
                              <ChipCustom text="Travels" />
                              <Arrow
                                onClick={() =>
                                  router.push(`/category/${category.id}`)
                                }
                              />
                            </div>
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
                              <img
                                width={500}
                                height={500}
                                className="focus:outline-none h-56 object-cover w-full rounded-xl"
                                src={category.imageUrl}
                                alt="games"
                              />
                              <div className="bg-white px-3 py-4 rounded-bl-3xl rounded-br-3xl">
                                <h1
                                  tabIndex={0}
                                  className="focus:outline-none text-2xl text-gray-900 font-OpenSans font-extrabold tracking-wider">
                                  Travel to {category.name}
                                </h1>
                                <div className="flex gap-3 normal-case translate-y-3 my-1">
                                  <ChipCustom text="Tours" />
                                  <ChipCustom text={category.name} />
                                  <ChipCustom text="Travels" />
                                  <Arrow
                                    onClick={() =>
                                      router.push(`/category/${category.id}`)
                                    }
                                  />
                                </div>
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
