import { useState, useEffect } from "react";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API as string;
const apiKey = process.env.NEXT_PUBLIC_API_TOKEN as string;

interface FetchProps {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
  needAuth?: boolean;
}

interface UseFetchProps extends FetchProps {
  url: string;
}

const useFetch =
  async (
    endpoint: any,
    { url, method, headers, body, needAuth }: UseFetchProps
  ) =>
  ({
    url,
    method = "GET",
    headers = {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      apiKey: `${apiKey}`,
      "Content-Type": "application/json",
    },
    body = "",
  }: UseFetchProps) => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
      const fetchData = async () => {
        const option: any = {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            "Content-Type": "application/json",
          },
        };
        if (needAuth) {
          option.headers.Authorization = `Bearer ${localStorage.getItem(
            "accessToken"
          )}`;
        }
        try {
          const response = await axios.get(
            `https://travel-journal-api-bootcamp.do.dibimbing.id/${endpoint}`,
            option
          );
          setData(response.data);
        } catch (error: any) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, [url, method, headers, body]);

    return { data, error, loading };
  };

export default useFetch;
