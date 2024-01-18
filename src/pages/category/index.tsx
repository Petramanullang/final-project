"use client";
import axios from "axios";
import Image from "next/image";

const apiCategory = process.env.NEXT_PUBLIC_API_CATEGORY as string;
const apiKey = process.env.NEXT_PUBLIC_API_TOKEN as string;

export async function getServerSideProps() {
  try {
    const res = await axios.get(apiCategory, {
      headers: {
        apiKey: `${apiKey}`,
        "Content-Type": "application/json",
      },
    });
    const categoryData = res.data.data;

    return {
      props: {
        categoryData,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        bannersData: [],
      },
    };
  }
}

const Category = ({ categoryData }: any) => {
  return (
    <>
      <div>
        <ul>
          {categoryData.map((category: any) => (
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
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Category;
