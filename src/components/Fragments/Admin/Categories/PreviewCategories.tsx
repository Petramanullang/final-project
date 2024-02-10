import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

interface ModalProps {
  open: boolean;
  handleOpen: () => void;
  handleConfirm: () => void;
}

interface CategoryData {
  name: string;
  imageUrl: string;
  createdAt: any;
  updatedAt: string;
  id: string;
}

const PreviewCategories: React.FC<
  ModalProps & { categoryData: CategoryData }
> = ({ open, handleOpen, handleConfirm, categoryData }) => {
  const [apiData, setApiData] = useState<CategoryData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API as string;
        const apiKey = process.env.NEXT_PUBLIC_API_TOKEN as string;
        const res = await axios.get(
          `${apiUrl}/api/v1/category/${categoryData.id}`,
          {
            headers: {
              apiKey,
              "Content-Type": "application/json",
            },
          }
        );
        const data = res.data.data;
        setApiData(data);
      } catch (error: any) {
        console.error(
          "Error fetching data:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchData();
  }, [categoryData.id]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  };

  return (
    <Dialog placeholder={""} open={open} handler={handleOpen}>
      <DialogHeader placeholder={""}>Details</DialogHeader>
      <DialogBody
        placeholder={""}
        style={{ maxHeight: "400px", overflowY: "auto" }}>
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-600">Name:</label>
          <p className="mt-1 p-2 w-full border rounded-md">{apiData?.name}</p>
        </div>
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-600">Image:</label>
          <img
            src={apiData?.imageUrl}
            alt="Category"
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-600">
            Created At:
          </label>
          <p className="mt-1 p-2 w-full border rounded-md">
            {formatDate(apiData?.createdAt)}
          </p>
        </div>
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-600">
            Updated At:
          </label>
          <p className="mt-1 p-2 w-full border rounded-md">
            {apiData?.updatedAt
              ? formatDate(apiData?.updatedAt)
              : "No date available"}
          </p>
        </div>
      </DialogBody>
      <DialogFooter placeholder={""}>
        <Button
          placeholder={""}
          variant="gradient"
          color="green"
          onClick={handleConfirm}>
          Confirm
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default PreviewCategories;
