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

export interface UpdateCategoriesModalProps {
  open: boolean;
  handleOpen: () => void;
  handleConfirm: () => void;
  handleCancel: () => void;
  categoryData: {
    id: any;
    name: string;
    imageUrl: string;
  };
}

const UpdateCategoriesModal: React.FC<UpdateCategoriesModalProps> = ({
  open,
  handleOpen,
  handleConfirm,
  handleCancel,
  categoryData,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [updatedCategoryName, setUpdatedCategoryName] = useState(
    categoryData.name
  );
  const [updatedCategoryImageUrl, setUpdatedCategoryImageUrl] = useState(
    categoryData.imageUrl
  );
  const [resetPreviewImage, setResetPreviewImage] = useState(false);
  const { updateData } = useUpdate();
  const { uploading, imageUrl, uploadImage, uploadComplete } = useUpload();
  const [uploadStarted, setUploadStarted] = useState(false);
  const [originalCategoryName, setOriginalCategoryName] = useState(
    categoryData.name
  );
  const [originalCategoryImageUrl, setOriginalCategoryImageUrl] = useState(
    categoryData.imageUrl
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
      setUploadStarted(true);

      const uploadedImageUrl = await uploadImage(file);
      console.log("Uploaded Image URL:", uploadedImageUrl);

      setUpdatedCategoryImageUrl(uploadedImageUrl || "");
      setResetPreviewImage(false);
    } catch (error) {
      console.error("Error handling file change:", error);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedCategoryName(e.target.value);
    setUploadStarted(true);
  };

  const updateCategory = async (): Promise<void> => {
    try {
      console.log("Updating category...");

      if (!updatedCategoryImageUrl) {
        console.error("Image URL is required");
        return;
      }

      if (updatedCategoryName !== categoryData.name) {
        const response = await updateData(
          "api/v1/update-category",
          categoryData.id,
          {
            imageUrl: updatedCategoryImageUrl,
            name: updatedCategoryName,
          }
        );

        console.log("Category update response:", response);
      } else {
        console.log("No changes in category name. Skipping update.");
      }
    } catch (error) {
      console.error("Error updating category:", error);
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
        updatedCategoryName === originalCategoryName &&
        updatedCategoryImageUrl === originalCategoryImageUrl
      ) {
        console.log("No changes detected. Skipping update.");
        handleCancel();
        return;
      }

      await updateCategory();

      console.log("Category updated successfully!");

      handleConfirm();
      handleCancel();
      window.location.reload();
    } catch (error) {
      console.error("Error in handleConfirmUpdate:", error);
    }
  };

  const resetImage = () => {
    setUpdatedCategoryImageUrl(categoryData.imageUrl);
    setResetPreviewImage(true);
    handleCancel();
  };

  return (
    <Dialog
      placeholder=""
      open={open}
      handler={handleOpen}
      className="max-h-full">
      <DialogHeader placeholder="">Update Category</DialogHeader>
      <DialogBody
        placeholder=""
        style={{ maxHeight: "400px", overflowY: "auto" }}>
        <div className="mb-4">
          <label
            htmlFor="categoryName"
            className="text-sm font-medium text-gray-600">
            Category Name
          </label>
          <input
            type="text"
            id="categoryName"
            className="mt-1 p-2 w-full border rounded-md"
            onChange={handleNameChange}
            value={updatedCategoryName}
          />
        </div>
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-600">
            Category Image
          </label>
          <input
            type="file"
            id="categoryImage"
            className="mt-1 p-2 w-full border rounded-md"
            onChange={handleFileChange}
          />
        </div>
        {isValidUrl(updatedCategoryImageUrl) && (
          <img
            src={resetPreviewImage ? "" : updatedCategoryImageUrl}
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

export default UpdateCategoriesModal;
