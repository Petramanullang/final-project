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

interface PromoData {
  id: string;
  title: string;
  imageUrl: string;
  promo_code: string;
  promo_discount_price: number;
  minimum_claim_price: number;
  description: string;
  terms_condition: string;
  createdAt: any;
  updatedAt: any;
}

const PreviewPromo: React.FC<ModalProps & { promoData: PromoData }> = ({
  open,
  handleOpen,
  handleConfirm,
  promoData,
}) => {
  const [apiData, setApiData] = useState<PromoData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API as string;
        const apiKey = process.env.NEXT_PUBLIC_API_TOKEN as string;
        const res = await axios.get(`${apiUrl}/api/v1/promo/${promoData.id}`, {
          headers: {
            apiKey,
            "Content-Type": "application/json",
          },
        });
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
  }, [promoData.id]);

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
          <label className="text-sm font-medium text-gray-600">Title:</label>
          <p className="mt-1 p-2 w-full border rounded-md">{apiData?.title}</p>
        </div>
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-600">Image:</label>
          <img
            src={apiData?.imageUrl}
            alt="Promo"
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-600">
            Promo Code:
          </label>
          <p className="mt-1 p-2 w-full border rounded-md">
            {apiData?.promo_code}
          </p>
        </div>
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-600">
            Discount Price:
          </label>
          <p className="mt-1 p-2 w-full border rounded-md">
            {apiData?.promo_discount_price}
          </p>
        </div>
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-600">
            Minimum Claim Price:
          </label>
          <p className="mt-1 p-2 w-full border rounded-md">
            {apiData?.minimum_claim_price}
          </p>
        </div>
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-600">
            Description:
          </label>
          <p className="mt-1 p-2 w-full border rounded-md">
            {apiData?.description}
          </p>
        </div>
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-600">
            Term Condition:
          </label>
          <p className="mt-1 p-2 w-full border rounded-md">
            {apiData?.terms_condition}
          </p>
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

export default PreviewPromo;
