"use client";
import axios from "axios";
import Image from "next/image";

const apiPromos = process.env.NEXT_PUBLIC_API_PROMO as string;
const apiKey = process.env.NEXT_PUBLIC_API_TOKEN as string;

export async function getServerSideProps() {
  try {
    const res = await axios.get(apiPromos, {
      headers: {
        apiKey: `${apiKey}`,
        "Content-Type": "application/json",
      },
    });
    const promoData = res.data.data;

    return {
      props: {
        promoData,
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

const Promo = ({ promoData }: any) => {
  return (
    <div>
      <ul>
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Promo;
