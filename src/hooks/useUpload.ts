// useUpload.ts
import { useState } from "react";

type UploadSource = File | any;

const useUpload = () => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploadComplete, setUploadComplete] = useState<boolean>(false);

  const uploadImage = async (source: UploadSource) => {
    setUploading(true);

    try {
      if (typeof source === "string") {
        // Jika sumber adalah URL, set langsung sebagai URL gambar
        setImageUrl(source);
        return source;
      }

      const localStorageToken = localStorage.getItem("accessToken");

      if (!localStorageToken) {
        throw new Error("Access token not available in localStorage.");
      }

      const apiUrl = process.env.NEXT_PUBLIC_API as string;

      const headers = {
        apiKey: process.env.NEXT_PUBLIC_API_TOKEN as string,
        Authorization: `Bearer ${localStorageToken}`,
      };

      const formData = new FormData();
      formData.append("image", source);

      const response = await fetch(`${apiUrl}/api/v1/upload-image`, {
        method: "POST",
        headers: headers,
        body: formData,
      });

      console.log("Response Status:", response.status);
      console.log("Response Headers:", response.headers);

      if (!response.ok) {
        const responseBody = await response.json();
        console.error("Error Data:", responseBody);
        throw new Error(`Failed to upload image.`);
      }

      // Periksa apakah Content-Type adalah application/json
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const result = await response.json();
        setImageUrl(result.url); // Ubah menjadi result.url sesuai dengan struktur respons
        return result.url;
      } else {
        // Tidak ada response JSON, tetapi kita anggap berhasil
        return source;
      }
    } catch (error: any) {
      console.error("Caught an error during image upload:", error);
      setUploadError(
        error.message || "Something went wrong while uploading the image."
      );
      throw error; // Rethrow error agar dapat ditangkap oleh pemanggil
    } finally {
      setUploading(false);
      setUploadComplete(true); // Pastikan untuk mengatur uploadComplete ke true saat selesai
    }
  };

  return { uploading, uploadError, imageUrl, uploadImage, uploadComplete };
};

export default useUpload;
