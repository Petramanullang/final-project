import React, { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import useCreate from "@/hooks/useCreate";
import useUpload from "@/hooks/useUpload";

interface CreatePromoModalProps {
  open: boolean;
  handleOpen: () => void;
  handleConfirm: () => void;
  handleCancel: () => void;
  onTitleChange: (value: string) => void;
  onPromoCodeChange: (value: string) => void;
  onDiscountPriceChange: (value: number) => void;
  onMinimumClaimPriceChange: (value: number) => void;
  onDescriptionChange: (value: string) => void;
  onTermConditionChange: (value: string) => void;
  onImageChange: (file: File) => void;
  previewImageUrl?: string | null | undefined;
  setPreviewImageUrl: (base64Url: string) => void;
}

const CreatePromoModal: React.FC<CreatePromoModalProps> = ({
  open,
  handleOpen,
  handleConfirm,
  handleCancel,
  onImageChange,
  previewImageUrl,
  setPreviewImageUrl,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [resetPreviewImage, setResetPreviewImage] = useState(false);
  const { createData } = useCreate();
  const { uploading, imageUrl, uploadImage } = useUpload();
  const [termsCondition, setTermsCondition] = useState("");
  const [promoData, setPromoData] = useState({
    imageUrl: "",
    title: "",
    promoCode: "",
    discountPrice: 0,
    minimumClaimPrice: 0,
    description: "",
    termsCondition: "",
  });

  const onTitleChange = (value: string) => {
    setPromoData({ ...promoData, title: value });
  };

  const onPromoCodeChange = (value: string) => {
    setPromoData({ ...promoData, promoCode: value });
  };

  const onDiscountPriceChange = (value: number) => {
    setPromoData({ ...promoData, discountPrice: value });
  };

  const onMinimumClaimPriceChange = (value: number) => {
    setPromoData({ ...promoData, minimumClaimPrice: value });
  };

  const onDescriptionChange = (value: string) => {
    setPromoData({ ...promoData, description: value });
  };

  const onTermsConditionChange = (value: string) => {
    setTermsCondition(value);
  };

  const handleInternalOpen = () => setInternalOpen(!internalOpen);

  const isValidUrl = (url: any) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const getTermsConditionValue = () => {
    return termsCondition;
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    try {
      const uploadedImageUrl = await uploadImage(file);
      setPreviewImageUrl(uploadedImageUrl || "");
      setResetPreviewImage(false);
    } catch (error) {
      console.error("Error handling image change:", error);
    }
  };

  const handleConfirmCreate = async (): Promise<void> => {
    try {
      if (uploading) {
        console.log("Still uploading, please wait...");
        return;
      }

      // Menunggu sampai imageUrl tersedia
      while (!imageUrl) {
        await new Promise((resolve) => setTimeout(resolve, 100)); // Tunggu 100ms sebelum memeriksa lagi
      }

      const newData = {
        title: promoData.title,
        description: promoData.description,
        imageUrl: imageUrl,
        terms_condition: termsCondition,
        promo_code: promoData.promoCode,
        promo_discount_price: promoData.discountPrice,
        minimum_claim_price: promoData.minimumClaimPrice,
      };

      console.log("termsCondition:", termsCondition);

      await createData("api/v1/create-promo", newData);
      handleConfirm();
      handleCancel();
      window.location.reload();
    } catch (error) {
      console.error("Error in handleConfirmCreate:", error);
    }
  };

  const resetImage = () => {
    setPreviewImageUrl("");
    setResetPreviewImage(true);
    handleCancel();
  };

  return (
    <Dialog
      placeholder=""
      open={open}
      handler={handleOpen}
      className="overflow-y-auto max-h-full">
      <DialogHeader placeholder="">Create New Promo</DialogHeader>
      <DialogBody placeholder="">
        <div className="mb-4">
          <label htmlFor="title" className="text-sm font-medium text-gray-600">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="mt-1 p-2 w-full border rounded-md"
            onChange={(e) => onTitleChange(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="promoCode"
            className="text-sm font-medium text-gray-600">
            Promo Code
          </label>
          <input
            type="text"
            id="promoCode"
            className="mt-1 p-2 w-full border rounded-md"
            onChange={(e) => onPromoCodeChange(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="discountPrice"
            className="text-sm font-medium text-gray-600">
            Discount Price
          </label>
          <input
            type="number"
            id="discountPrice"
            className="mt-1 p-2 w-full border rounded-md"
            onChange={(e) => onDiscountPriceChange(parseFloat(e.target.value))}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="minimumClaimPrice"
            className="text-sm font-medium text-gray-600">
            Minimum Claim Price
          </label>
          <input
            type="number"
            id="minimumClaimPrice"
            className="mt-1 p-2 w-full border rounded-md"
            onChange={(e) =>
              onMinimumClaimPriceChange(parseFloat(e.target.value))
            }
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="text-sm font-medium text-gray-600">
            Description
          </label>
          <input
            type="text"
            id="description"
            className="mt-1 p-2 w-full border rounded-md"
            onChange={(e) => onDescriptionChange(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="termCondition"
            className="text-sm font-medium text-gray-600">
            Term Condition
          </label>
          <textarea
            id="termCondition"
            className="mt-1 p-2 w-full border rounded-md"
            onChange={(e) => onTermsConditionChange(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="promoImage"
            className="text-sm font-medium text-gray-600">
            Promo Image
          </label>
          <input
            type="file"
            id="promoImage"
            className="mt-1 p-2 w-full border rounded-md"
            onChange={handleImageChange}
          />
        </div>
        {previewImageUrl && isValidUrl(previewImageUrl) && (
          <img
            src={resetPreviewImage ? "" : previewImageUrl}
            alt="Preview"
            className="max-w-full h-auto mb-4 rounded-md cursor-pointer"
            onClick={handleInternalOpen}
          />
        )}
      </DialogBody>
      <DialogFooter placeholder="">
        <Button
          placeholder=""
          variant="text"
          color="red"
          onClick={resetImage}
          className="mr-1">
          Cancel
        </Button>
        <Button
          placeholder=""
          variant="gradient"
          color="green"
          onClick={handleConfirmCreate}
          className="ml-1">
          Confirm
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default CreatePromoModal;
