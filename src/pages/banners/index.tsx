"use client";
import axios from "axios";
import Image from "next/image";

const apiBanner = process.env.NEXT_PUBLIC_API_BANNER as string;
const apiKey = process.env.NEXT_PUBLIC_API_TOKEN as string;

export async function getServerSideProps() {
  try {
    const res = await axios.get(apiBanner, {
      headers: {
        apiKey: `${apiKey}`,
        "Content-Type": "application/json",
      },
    });
    const bannersData = res.data.data;

    return {
      props: {
        bannersData,
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

const Banners = ({ bannersData }: any) => {
  return (
    <>
      <div>
        <ul>
          {bannersData.map((banner: any) => (
            <li key={banner.id}>
              <Image
                alt={banner.name}
                priority
                src={banner.imageUrl}
                width={200}
                height={200}
                className="w-auto"
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Banners;
