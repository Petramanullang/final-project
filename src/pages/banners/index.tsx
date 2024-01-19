"use client";
import axios from "axios";
import Image from "next/image";

const apiUrl = process.env.NEXT_PUBLIC_API as string;
const apiKey = process.env.NEXT_PUBLIC_API_TOKEN as string;

export async function getServerSideProps() {
  try {
    const loginApiUrl = `${apiUrl}/api/v1/banners`;
    const res = await axios.get(loginApiUrl, {
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
  } catch (error: any) {
    console.error(
      "Error fetching data:",
      error.response ? error.response.data : error.message
    );
    return {
      props: {
        bannersData: [],
        error: "Failed to fetch data",
      },
    };
  }
}

const Banners = ({ bannersData }: any) => {
  if (!bannersData) {
    return <div>No data available.</div>;
  }

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
