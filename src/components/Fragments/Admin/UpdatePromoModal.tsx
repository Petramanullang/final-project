import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import useUpdate from "@/hooks/useUpdate";
import useUpload from "@/hooks/useUpload";

interface UpdatePromoModalProps {
  open: boolean;
  handleOpen: () => void;
  handleConfirm: () => void;
  handleCancel: () => void;
  promoData: {
    id: any;
    title: string;
    imageUrl: string;
    promo_code: string;
    promo_discount_price: number;
    minimum_claim_price: number;
    description: string;
    terms_condition: string;
  };
}

const UpdatePromoModal: React.FC<UpdatePromoModalProps> = ({
  open,
  handleOpen,
  handleConfirm,
  handleCancel,
  promoData,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(promoData.title);
  const [updatedPromoCode, setUpdatedPromoCode] = useState(promoData.promo_code);
  const [updatedPromoDiscountPrice, setUpdatedPromoDiscountPrice] = useState(
    promoData.promo_discount_price
  );
  const [updatedMinimumClaimPrice, setUpdatedMinimumClaimPrice] = useState(
    promoData.minimum_claim_price
  );
  const [updatedDescription, setUpdatedDescription] = useState(
    promoData.description
  );
  const [updatedTermsCondition, setUpdatedTermsCondition] = useState(
    promoData.terms_condition
  );
  const [updatedImageUrl, setUpdatedImageUrl] = useState(promoData.imageUrl);
  const [resetPreviewImage, setResetPreviewImage] = useState(false);
  const { updateData } = useUpdate();
  const { uploading, imageUrl, uploadImage, uploadComplete } = useUpload();
  const [uploadStarted, setUploadStarted] = useState(false);

  const handleInternalOpen = () => setInternalOpen(!internalOpen);

  const isValidUrl = (url: any) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    try {
      setUploadStarted(true);

      const uploadedImageUrl = await uploadImage(file);
      console.log("Uploaded Image URL:", uploadedImageUrl);

      setUpdatedImageUrl(uploadedImageUrl || "");
      setResetPreviewImage(false);
    } catch (error) {
      console.error("Error handling image change:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    switch (name) {
      case "title":
        setUpdatedTitle(value);
        break;
      case "promoCode":
        setUpdatedPromoCode(value);
        break;
      case "discountPrice":
        setUpdatedPromoDiscountPrice(parseFloat(value));
        break;
      case "minimumClaimPrice":
        setUpdatedMinimumClaimPrice(parseFloat(value));
        break;
      case "description":
        setUpdatedDescription(value);
        break;
      case "termsCondition":
        setUpdatedTermsCondition(value);
        break;
      default:
        break;
    }

    setUploadStarted(true);
  };

  const updatePromo = async (): Promise<void> => {
    try {
      console.log("Updating promo...");

      if (!updatedImageUrl) {
        console.error("Image URL is required");
        return;
      }

      const response = await updateData("api/v1/update-promo", promoData.id, {
        imageUrl: updatedImageUrl,
        title: updatedTitle,
        promo_code: updatedPromoCode,
        promo_discount_price: updatedPromoDiscountPrice,
        minimumClaimPrice: updatedMinimumClaimPrice,
        description: updatedDescription,
        termsCondition: updatedTermsCondition,
      });

      console.log("Promo update response:", response);
    } catch (error) {
      console.error("Error updating promo:", error);
    }
  };

  const handleConfirmUpdate = async (): Promise<void> => {
    try {
      if (uploading) {
        console.log("Still uploading, please wait...");
        return;
      }

      if (!uploadStarted) {
        console.log("Upload not started. Please upload an image...");
        return;
      }

      if (!uploadComplete) {
        console.log("Waiting for upload to complete...");
        return;
      }

      console.log("Upload complete!");

      if (
        updatedTitle === promoData.title &&
        updatedPromoCode === promoData.promo_code &&
        updatedPromoDiscountPrice === promoData.promo_discount_price &&
        updatedMinimumClaimPrice === promoData.minimum_claim_price &&
        updatedDescription === promoData.description &&
        updatedTermsCondition === promoData.terms_condition &&
        updatedImageUrl === promoData.imageUrl
      ) {
        console.log("No changes detected. Skipping update.");
        handleCancel();
        return;
      }

      await updatePromo();

      console.log("Promo updated successfully!");

      handleConfirm();
      handleCancel();
      window.location.reload();
    } catch (error) {
      console.error("Error in handleConfirmUpdate:", error);
    }
  };

  const resetImage = () => {
    setUpdatedImageUrl(promoData.imageUrl);
    setResetPreviewImage(true);
    handleCancel();
  };

  return (
    <Dialog
      placeholder=""
      open={open}
      handler={handleOpen}
      className="max-h-full">
      <DialogHeader placeholder="">Update Promo</DialogHeader>
      <DialogBody
        placeholder=""
        style={{ maxHeight: "400px", overflowY: "auto" }}>
        <div className="mb-4">
          <label
            htmlFor="promoTitle"
            className="text-sm font-medium text-gray-600">
            Promo Title
          </label>
          <input
            type="text"
            id="promoTitle"
            name="title"
            className="mt-1 p-2 w-full border rounded-md"
            onChange={handleInputChange}
            value={updatedTitle}
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
            name="promoCode"
            className="mt-1 p-2 w-full border rounded-md"
            onChange={handleInputChange}
            value={updatedPromoCode}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="discountPrice"
            className="text-sm font-medium text-gray-600">
            Promo Discount Price
          </label>
          <input
            type="number"
            id="discountPrice"
            name="discountPrice"
            className="mt-1 p-2 w-full border rounded-md"
            onChange={handleInputChange}
            value={updatedPromoDiscountPrice}
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
            name="minimumClaimPrice"
            className="mt-1 p-2 w-full border rounded-md"
            onChange={handleInputChange}
            value={updatedMinimumClaimPrice}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="text-sm font-medium text-gray-600">
            Promo Description
          </label>
          <textarea
            id="description"
            name="description"
            className="mt-1 p-2 w-full border rounded-md"
            onChange={handleInputChange}
            value={updatedDescription}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="termsCondition"
            className="text-sm font-medium text-gray-600">
            Terms and Conditions
          </label>
          <textarea
            id="termsCondition"
            name="termsCondition"
            className="mt-1 p-2 w-full border rounded-md"
            onChange={handleInputChange}
            value={updatedTermsCondition}
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
            name="imageUrl"
            className="mt-1 p-2 w-full border rounded-md"
            onChange={handleImageChange}
          />
        </div>
        {isValidUrl(updatedImageUrl) && (
          <img
            src={resetPreviewImage ? "" : updatedImageUrl}
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
          onClick={handleConfirmUpdate}
          className="ml-1">
          Confirm
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default UpdatePromoModal;
