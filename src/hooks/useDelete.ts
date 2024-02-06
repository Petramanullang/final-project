// useDelete.ts

import { useState } from "react";

const useDelete = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any | null>(null);

  const deleteData = async (endpoint: string, resourceId: string) => {
    setLoading(true);

    try {
      // Mengambil token dari localStorage dengan nama accessToken
      const localStorageToken = localStorage.getItem("accessToken");

      // Periksa apakah token tersedia
      if (!localStorageToken) {
        throw new Error("Access token not available in localStorage.");
      }

      const apiUrl = process.env.NEXT_PUBLIC_API as string;

      const headers = {
        apiKey: process.env.NEXT_PUBLIC_API_TOKEN as string,
        Authorization: `Bearer ${localStorageToken}`,
        "Content-Type": "application/json", // Tambahkan Content-Type sebagai header
      };

      console.log(headers);

      const response = await fetch(`${apiUrl}/${endpoint}/${resourceId}`, {
        method: "DELETE",
        headers: headers,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to delete resource: ${errorData.message}`);
      }

      const result = await response.json();
      setData(result);
      window.location.reload();
    } catch (error: any) {
      setError(
        error.message || "Something went wrong while deleting the resource."
      );
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, data, deleteData };
};

export default useDelete;
