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

interface CreateActivitiesModalProps {
  open: boolean;
  handleOpen: () => void;
  handleConfirm: () => void;
  handleCancel: () => void;
  onTitleChange: (value: string) => void;
  onPriceChange: (value: number) => void;
  onPriceDiscountChange: (value: number) => void;
  onRatingChange: (value: number) => void;
  onTotalReviewsChange: (value: number) => void;
  onDescriptionChange: any;
  onProvinceChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onAddressChange: (value: string) => void;
  onLocationMapChange: (value: string) => void;
  onImageChange: (file: File) => void;
  previewImageUrl?: string | null | undefined;
  setPreviewImageUrl: (base64Url: string) => void;
}

const CreateActivitiesModal: React.FC<CreateActivitiesModalProps> = ({
  open,
  handleOpen,
  handleConfirm,
  handleCancel,
  onTitleChange,
  onPriceChange,
  onPriceDiscountChange,
  onRatingChange,
  onTotalReviewsChange,
  onDescriptionChange,
  onProvinceChange,
  onCityChange,
  onAddressChange,
  onLocationMapChange,
  onImageChange,
  previewImageUrl,
  setPreviewImageUrl,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [resetPreviewImage, setResetPreviewImage] = useState(false);
  const { createData } = useCreate();
  const { uploading, imageUrl, uploadImage } = useUpload();

  const [activityData, setActivityData] = useState({
    imageUrl: "",
    title: "",
    price: 0,
    priceDiscount: 0,
    rating: 0,
    totalReviews: 0,
    description: "",
    province: "",
    city: "",
    address: "",
    locationMap: "",
  });

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

      while (!imageUrl) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      const newData = {
        title: activityData.title,
        price: activityData.price,
        priceDiscount: activityData.priceDiscount,
        rating: activityData.rating,
        totalReviews: activityData.totalReviews,
        description: activityData.description,
        province: activityData.province,
        city: activityData.city,
        address: activityData.address,
        locationMap: activityData.locationMap,
        imageUrl: imageUrl,
      };

      await createData("api/v1/create-activity", newData);
      handleConfirm();
      handleCancel();
      //   window.location.reload();
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
      placeholder={""}
      open={open}
      handler={handleOpen}
      className="overflow-y-auto max-h-full">
      <DialogHeader placeholder={""}>Create New Activity</DialogHeader>
      <DialogBody placeholder={""}>
        <div className="mb-4">
          <label
            htmlFor="activityTitle"
            className="text-sm font-medium text-gray-600">
            Title
          </label>
          <input
            type="text"
            id="activityTitle"
            className="mt-1 p-2 w-full border rounded-md"
            onChange={(e) => onTitleChange(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-600">Price</label>
          <input
            type="number"
            id="activityPrice"
            className="mt-1 p-2 w-full border rounded-md"
            onChange={(e) => onPriceChange(parseFloat(e.target.value))}
          />
        </div>
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-600">
            Price Discount
          </label>
          <input
            type="number"
            id="activityPriceDiscount"
            className="mt-1 p-2 w-full border rounded-md"
            onChange={(e) => onPriceDiscountChange(parseFloat(e.target.value))}
          />
        </div>
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-600">Rating</label>
          <input
            type="number"
            id="activityRating"
            className="mt-1 p-2 w-full border rounded-md"
            onChange={(e) => onRatingChange(parseFloat(e.target.value))}
          />
        </div>
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-600">
            Total Reviews
          </label>
          <input
            type="number"
            id="activityTotalReviews"
            className="mt-1 p-2 w-full border rounded-md"
            onChange={(e) => onTotalReviewsChange(parseFloat(e.target.value))}
          />
        </div>
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-600">
            Description
          </label>
          <textarea
            id="activityDescription"
            className="mt-1 p-2 w-full border rounded-md"
            onChange={(e) => onDescriptionChange(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-600">Province</label>
          <input
            type="text"
            id="activityProvince"
            className="mt-1 p-2 w-full border rounded-md"
            onChange={(e) => onProvinceChange(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-600">City</label>
          <input
            type="text"
            id="activityCity"
            className="mt-1 p-2 w-full border rounded-md"
            onChange={(e) => onCityChange(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-600">Address</label>
          <input
            type="text"
            id="activityAddress"
            className="mt-1 p-2 w-full border rounded-md"
            onChange={(e) => onAddressChange(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-600">
            Location Map (iframe)
          </label>
          <textarea
            id="activityLocationMap"
            className="mt-1 p-2 w-full border rounded-md"
            onChange={(e) => onLocationMapChange(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-600">
            Activity Image
          </label>
          <input
            type="file"
            id="activityImage"
            className="mt-1 p-2 w-full border rounded-md"
            onChange={handleImageChange}
          />
        </div>
        {previewImageUrl && (
          <img
            src={resetPreviewImage ? "" : previewImageUrl}
            alt="Preview"
            className="max-w-full h-auto mb-4 rounded-md cursor-pointer"
            onClick={handleInternalOpen}
          />
        )}
      </DialogBody>
      <DialogFooter placeholder={""}>
        <Button
          placeholder={""}
          variant="text"
          color="red"
          onClick={resetImage}
          className="mr-1">
          Cancel
        </Button>
        <Button
          placeholder={""}
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

export default CreateActivitiesModal;
