import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import React, { useState } from "react";
import useCreate from "@/hooks/useCreate";
import useUpload from "@/hooks/useUpload";

interface CreateBannerModalProps {
  open: boolean;
  handleOpen: () => void;
  handleConfirm: () => void;
  handleCancel: () => void;
  onNameChange: (value: string) => void;
  onFileChange: (file: File) => void;
  previewImageUrl?: string | null | undefined;
  setPreviewImageUrl: (base64Url: string) => void;
  handleClose: () => void;
}

const CreateBannerModal: React.FC<CreateBannerModalProps> = ({
  open,
  handleOpen,
  handleConfirm,
  handleCancel,
  previewImageUrl,
  setPreviewImageUrl,
  handleClose,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [resetPreviewImage, setResetPreviewImage] = useState(false);
  const { createData } = useCreate();
  const { uploading, imageUrl, uploadImage } = useUpload();
  const [bannerName, setBannerName] = useState("");

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
      const uploadedImageUrl = await uploadImage(file);
      console.log("Uploaded Image URL:", uploadedImageUrl);

      setPreviewImageUrl(uploadedImageUrl || "");
      setResetPreviewImage(false);
    } catch (error) {
      console.error("Error handling file change:", error);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBannerName(e.target.value);
  };

  // Function yang menghandle pembuatan banner berdasarkan data yang diberikan dari API
  const createBanner = async (newData: any) => {
    try {
      console.log("Creating banner...");

      if (!previewImageUrl) {
        console.error("Image URL is required");
        return;
      }

      // Pemanggilan API untuk membuat banner
      const response = await createData("api/v1/create-banner", {
        imageUrl: previewImageUrl,
        name: newData.name,
      });

      console.log("Banner creation response:", response);
    } catch (error) {
      console.error("Error creating banner:", error);
    }
  };

  const handleConfirmCreate = async (): Promise<void> => {
    try {
      if (uploading) {
        console.log("Still uploading, please wait...");
        return;
      }

      while (!imageUrl) {
        await new Promise((resolve) => setTimeout(resolve, 100)); // Tunggu 100ms sebelum memeriksa lagi
      }

      const newData = {
        imageUrl: imageUrl,
        name: bannerName,
      };

      await createBanner(newData);
      handleConfirm();
      handleClose();
      setResetPreviewImage(true);
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
      <DialogHeader placeholder="">Create New Banner</DialogHeader>
      <DialogBody placeholder="">
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
            value={bannerName}
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

export default CreateBannerModal;
