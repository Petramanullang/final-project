"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

const apiActivity = process.env.NEXT_PUBLIC_API_ACTIVITY as string;
const apiKey = process.env.NEXT_PUBLIC_API_TOKEN as string;

export async function getServerSideProps() {
  try {
    const res = await axios.get(apiActivity, {
      headers: {
        apiKey: `${apiKey}`,
        "Content-Type": "application/json",
      },
    });
    const activityData = res.data.data;

    return {
      props: {
        activityData,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        userData: [],
      },
    };
  }
}

const Activity = ({ activityData }: any) => {
  console.log(activityData);
  return (
    <div>
      <ul>
        {activityData.map((activity: any) => (
          <li key={activity.id}>
            <Image
              alt={activity.title}
              priority
              src={activity.category.imageUrl}
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

export default Activity;
