import { useState } from "react";

// Sesuaikan struktur respons dengan API Anda
interface CreateDataResponse {
  banner: any;
}

const useCreate = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<CreateDataResponse | null>(null);

  const createData = async (endpoint: string, newData: any) => {
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

      const response = await fetch(`${apiUrl}/${endpoint}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(newData),
      });

      console.log("Request Data:", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(newData),
      });

      console.log("Response Status:", response.status);
      console.log("Response Headers:", response.headers);

      if (!response.ok) {
        const responseBody = await response.json();
        console.error("Error Data:", responseBody.errors[0]?.message);
        console.log("Error Data:", responseBody.errors);
        throw new Error(`Failed to create resource.`);
      }

      const result: CreateDataResponse = await response.json();
      console.log("Success Data:", result);
      console.log("Banner creation response:", result?.banner);
      setData(result);
    } catch (error: any) {
      console.error("Caught an error:", error);
      setError(
        error.message || "Something went wrong while creating the resource."
      );
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, data, createData };
};

export default useCreate;
