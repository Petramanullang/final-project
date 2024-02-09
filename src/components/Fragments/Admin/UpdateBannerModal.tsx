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

interface UpdateBannerModalProps {
  open: boolean;
  handleOpen: () => void;
  handleConfirm: () => void;
  handleCancel: () => void;
  bannerData: {
    id: any;
    name: string;
    imageUrl: string;
  };
}

const UpdateBannerModal: React.FC<UpdateBannerModalProps> = ({
  open,
  handleOpen,
  handleConfirm,
  handleCancel,
  bannerData,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [updatedBannerName, setUpdatedBannerName] = useState(bannerData.name);
  const [updatedBannerImageUrl, setUpdatedBannerImageUrl] = useState(
    bannerData.imageUrl
  );
  const [resetPreviewImage, setResetPreviewImage] = useState(false);
  const { updateData } = useUpdate();
  const { uploading, imageUrl, uploadImage, uploadComplete } = useUpload();
  const [uploadStarted, setUploadStarted] = useState(false);
  const [originalBannerName, setOriginalBannerName] = useState(bannerData.name);
  const [originalBannerImageUrl, setOriginalBannerImageUrl] = useState(
    bannerData.imageUrl
  );

  const handleInternalOpen = () => setInternalOpen(!internalOpen);

  const isValidUrl = (url: any) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    try {
      setUploadStarted(true); // Ini sudah ditambahkan

      // Call the uploadImage function from useUpload
      const uploadedImageUrl = await uploadImage(file);
      console.log("Uploaded Image URL:", uploadedImageUrl);

      setUpdatedBannerImageUrl(uploadedImageUrl || "");
      setResetPreviewImage(false);
    } catch (error) {
      console.error("Error handling file change:", error);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedBannerName(e.target.value);
    setUploadStarted(true); // Tambahkan ini untuk menandai bahwa upload sudah dimulai
  };

  const updateBanner = async (): Promise<void> => {
    try {
      console.log("Updating banner...");

      if (!updatedBannerImageUrl) {
        console.error("Image URL is required");
        return;
      }

      // Pastikan bahwa updateData dipanggil hanya jika ada perubahan pada nama banner
      if (updatedBannerName !== bannerData.name) {
        const response = await updateData(
          "api/v1/update-banner",
          bannerData.id,
          {
            imageUrl: updatedBannerImageUrl,
            name: updatedBannerName,
          }
        );

        console.log("Banner update response:", response);
      } else {
        console.log("No changes in banner name. Skipping update.");
      }
    } catch (error) {
      console.error("Error updating banner:", error);
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

      // Check for changes before calling updateBanner
      if (
        updatedBannerName === originalBannerName &&
        updatedBannerImageUrl === originalBannerImageUrl
      ) {
        console.log("No changes detected. Skipping update.");
        handleCancel();
        return;
      }

      // Assuming updateBanner is an asynchronous function
      await updateBanner();

      console.log("Banner updated successfully!");

      handleConfirm();
      handleCancel();
      window.location.reload();
    } catch (error) {
      console.error("Error in handleConfirmUpdate:", error);
    }
  };

  const resetImage = () => {
    setUpdatedBannerImageUrl(bannerData.imageUrl);
    setResetPreviewImage(true);
    handleCancel();
  };

  return (
    <Dialog
      placeholder=""
      open={open}
      handler={handleOpen}
      className="max-h-full">
      <DialogHeader placeholder="">Update Banner</DialogHeader>
      <DialogBody
        placeholder=""
        style={{ maxHeight: "400px", overflowY: "auto" }}>
        <div className="mb-4">
          <label
            htmlFor="bannerName"
            className="text-sm font-medium text-gray-600">
            Banner Name
          </label>
          <input
            type="text"
            id="bannerName"
            className="mt-1 p-2 w-full border rounded-md"
            onChange={handleNameChange}
            value={updatedBannerName}
          />
        </div>
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-600">
            Banner Image
          </label>
          <input
            type="file"
            id="bannerImage"
            className="mt-1 p-2 w-full border rounded-md"
            onChange={handleFileChange}
          />
        </div>
        {isValidUrl(updatedBannerImageUrl) && (
          <img
            src={resetPreviewImage ? "" : updatedBannerImageUrl}
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

export default UpdateBannerModal;
