import { useState } from "react";

const useUpdate = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any | null>(null);

  const updateData = async (
    endpoint: string,
    resourceId: string,
    updatedData: any
  ) => {
    setLoading(true);

    try {
      const localStorageToken = localStorage.getItem("accessToken");

      if (!localStorageToken) {
        throw new Error("Access token not available in localStorage.");
      }

      const apiUrl = process.env.NEXT_PUBLIC_API as string;

      const headers = {
        apiKey: process.env.NEXT_PUBLIC_API_TOKEN as string,
        Authorization: `Bearer ${localStorageToken}`,
        "Content-Type": "application/json",
      };

      const response = await fetch(`${apiUrl}/${endpoint}/${resourceId}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to update resource: ${errorData.message}`);
      }

      const result = await response.json();
      setData(result);
      // Anda mungkin menangani logika navigasi atau pembaruan UI di sini daripada me-reload seluruh halaman
      // Misalnya, Anda dapat memperbarui state untuk me-render komponen tertentu
    } catch (error: any) {
      setError(
        error.message || "Something went wrong while updating the resource."
      );
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, data, updateData };
};

export default useUpdate;
