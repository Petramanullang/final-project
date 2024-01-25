"use client";
import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";

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
        <h1 className="text-center text-3xl mt-10 font-bold">Category</h1>
        <ul className="grid grid-cols-3 place-items-center pt-10">
          {categoryData.slice(0, 3).map((category: any) => (
            <li key={category.id}>
              <Image
                alt={category.name}
                priority
                src={category.imageUrl}
                width={200}
                height={200}
                // style={{ width: "auto", height: "auto" }}
                className="w-auto"
              />
              <p>{category.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Category;
