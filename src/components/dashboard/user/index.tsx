"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Skeleton } from "@/components/element/skeleton/skeleton";

const apiUrl = process.env.NEXT_PUBLIC_API as string;
const apiKey = process.env.NEXT_PUBLIC_API_TOKEN as string;

const User = ({ imageUrl }: any) => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const token = localStorage.getItem("accessToken");

        if (!token) return router.push("/login");

        const apiUrl = process.env.NEXT_PUBLIC_API as string;
        const res = await axios.get(`${apiUrl}/api/v1/all-user`, {
          headers: {
            apiKey: `${apiKey}`,
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const fecthuserData = res.data.data;
        setUserData(fecthuserData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, [router]);

  // const handleLogout = () => {
  //   localStorage.removeItem("accessToken");
  //   router.push("/login");
  // }

  const modifyImageUrl = (url: string | null) => {
    if (!url || url.trim() === "") {
      return "https://imgs.search.brave.com/gV6Xy99WsNTWpgT2KUNxopKhP45u8QMrrL2DGi5HYxg/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzE1Lzg0LzQz/LzM2MF9GXzIxNTg0/NDMyNV90dFg5WWlJ/SXllYVI3TmU2RWFM/TGpNQW15NEd2UEM2/OS5qcGc";
    }
    switch (true) {
      case url.startsWith("https://twitter.com"):
        return "https://imgs.search.brave.com/jMnZlwLG1Ug5Jm5NyXA6AIxCL2Y_LrFWMNU67vuIOpM/rs:fit:500:0:0/g:ce/aHR0cHM6Ly8xMDAw/bG9nb3MubmV0L3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDE3LzA2/L1R3aXR0ZXItc3lt/Ym9sLTUwMHg0MDgu/anBn";
      case !url.startsWith("https://"):
        return "https://imgs.search.brave.com/gV6Xy99WsNTWpgT2KUNxopKhP45u8QMrrL2DGi5HYxg/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzE1Lzg0LzQz/LzM2MF9GXzIxNTg0/NDMyNV90dFg5WWlJ/SXllYVI3TmU2RWFM/TGpNQW15NEd2UEM2/OS5qcGc";
      default:
        return url;
    }
  };

  return (
    <>
      <div>
        {loading && (
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        )}
        {!loading && (
          <ul className="grid grid-cols-3 gap-4">
            {userData.map((user: any) => (
              <li key={user.id}>
                <img
                  alt={user.name}
                  src={modifyImageUrl(user.profilePictureUrl)}
                  className="w-56 h-56 border"
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default User;
