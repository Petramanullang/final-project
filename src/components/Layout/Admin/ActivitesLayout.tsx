import React, { useState, useEffect } from "react";
import axios from "axios";
import useDelete from "@/hooks/useDelete";
import Modal from "@/components/Fragments/Admin/DeleteModal";
import CreateActivities from "@/components/Fragments/Admin/Activities/CreateActivities";
// import UpdateActivityModal from "@/components/Fragments/Admin/UpdateActivityModal";
// import PreviewActivity from "@/components/Fragments/Admin/PreviewActivity";
import Sidebar from "@/components/Fragments/Admin/Navigation";
import { useRouter } from "next/router";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";

interface ActivityData {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  imageUrl: string;
}

const apiUrl = process.env.NEXT_PUBLIC_API as string;
const apiKey = process.env.NEXT_PUBLIC_API_TOKEN as string;

const ActivitiesLayout = () => {
  const router = useRouter();
  const [activitiesData, setActivitiesData] = useState<ActivityData[]>([]);
  const { loading, error, data, deleteData } = useDelete();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedResourceId, setSelectedResourceId] = useState<number | null>(
    null
  );
  const [currentPreviewImageUrl, setCurrentPreviewImageUrl] = useState<
    string | null
  >(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activityDataForEdit, setActivityDataForEdit] =
    useState<ActivityData | null>(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [selectedActivityForPreview, setSelectedActivityForPreview] =
    useState<ActivityData | null>(null);
  const [title, setTitle] = useState("");

  const handleTitleChange = (value: string) => {
    setTitle(value);
  };
  const handlePriceChange = (value: number) => {
    // Implementasi perubahan harga
  };

  const handleRatingChange = (value: number) => {};
  const handleTotalReviewsChange = (value: number) => {};
  const handleDescriptionChange = (value: number) => {};

  const handleProvinceChange = (value: string) => {};

  const handleAddressChange = (value: string) => {};

  const handleCityChange = (value: string) => {};

  const handlePriceDiscountChange = (value: number) => {
    // Implementasi perubahan harga diskon
  };

  // Implementasikan fungsi pengontrol lainnya untuk setiap perubahan data

  const handleLocationMapChange = (mapUrl: string) => {
    // Implementasi perubahan peta lokasi
  };

  const handleOpenPreviewModal = (activityData: ActivityData) => {
    setSelectedActivityForPreview(activityData);
    setIsPreviewModalOpen(true);
  };

  const handleClosePreviewModal = () => {
    setSelectedActivityForPreview(null);
    setIsPreviewModalOpen(false);
  };

  const handleConfirmEdit = () => {
    handleCloseEditModal();
  };

  const handleOpenEditModal = (activityData: ActivityData | null) => {
    if (activityData !== null) {
      setActivityDataForEdit(activityData);
      setIsEditModalOpen(true);
    }
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleConfirmCreate = () => {
    handleCloseCreateModal();
  };

  const handleNameChange = (value: string) => {
    // Implementasi fungsi handleNameChange
    // Pastikan value adalah string sebelum melakukan operasi apapun
  };

  const handleFileChange = (file: File) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          const base64Url = event.target.result.toString();
          setCurrentPreviewImageUrl(base64Url);
        }
      };

      if (reader.readAsDataURL) {
        reader.readAsDataURL(file);
      }
    }
  };

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleDelete = (resourceId: number) => {
    setIsModalOpen(true);
    setSelectedResourceId(resourceId);
  };

  const handleConfirmDelete = () => {
    if (selectedResourceId) {
      deleteData("api/v1/delete-activity", selectedResourceId.toString());
    }
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        if (!token) {
          router.push("/login");
          return;
        }

        const activitiesApiUrl = `${apiUrl}/api/v1/activities`;
        const res = await axios.get(activitiesApiUrl, {
          headers: {
            apiKey: `${apiKey}`,
            "Content-Type": "application/json",
          },
        });
        const data = res.data.data;
        setActivitiesData(data);
      } catch (error: any) {
        console.error(
          "Error fetching data:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchData();
  }, [router]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div>
      <Sidebar />
      <div>
        <h1 className="text-3xl font-bold mx-44 text-black my-4">Activities</h1>
        <div className="relative w-3/4 mx-auto bg-gray-500 p-5 pt-16 rounded-xl">
          <button
            onClick={handleOpenCreateModal}
            className="bg-gray-700 text-white normal-case absolute right-3 top-3 p-2 px-5 rounded-lg hover:bg-gray-600">
            Add Item
          </button>
          <ul className="flex justify-between px-2 text-white bg-gray-600 rounded-md pr-48">
            <li>Name</li>
            <li className="ml-28">Created At</li>
            <li>Updated At</li>
          </ul>
          <ul className="divide-y">
            {activitiesData.length > 0 ? (
              activitiesData.map((data: ActivityData, index: number) => (
                <li key={index}>
                  <div className="flex justify-between p-2">
                    <h1 className="text-xl w-1/4 text-white">{data.title}</h1>
                    <p className="text-center w-1/4">
                      {formatDate(data.createdAt)}
                    </p>
                    <p className="text-center w-1/4">
                      {formatDate(data.updatedAt)}
                    </p>
                    <Menu placement="left">
                      <MenuHandler>
                        <Button
                          placeholder={""}
                          className="normal-case bg-transparent shadow-none p-2 hover:shadow-sm hover:bg-gray-700">
                          <AdjustmentsHorizontalIcon className="w-6 h-6" />
                        </Button>
                      </MenuHandler>
                      <MenuList placeholder={""} className="divide-y py-3">
                        <MenuItem
                          placeholder={""}
                          className="flex rounded-none hover:rounded-md"
                          onClick={() => handleOpenPreviewModal(data)}>
                          <EyeIcon className="w-4 h-4 mr-2" /> Preview
                        </MenuItem>
                        <MenuItem
                          onClick={() => handleOpenEditModal(data)}
                          placeholder={""}
                          className="flex rounded-none hover:rounded-md">
                          <PencilSquareIcon className="w-4 h-4 mr-2" /> Edit
                        </MenuItem>
                        <MenuItem
                          onClick={() => handleDelete(data.id)}
                          placeholder={""}
                          className="flex rounded-none hover:rounded-md">
                          <TrashIcon className="w-4 h-4 mr-2" /> Delete
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </div>
                </li>
              ))
            ) : (
              <li>No data available</li>
            )}
          </ul>
        </div>
        {isModalOpen && (
          <Modal
            open={isModalOpen}
            handleOpen={() => setIsModalOpen(false)}
            handleConfirm={handleConfirmDelete}
          />
        )}
        {isCreateModalOpen && (
          <CreateActivities
            open={isCreateModalOpen}
            handleOpen={handleOpenCreateModal}
            handleConfirm={handleConfirmCreate}
            handleCancel={handleCloseCreateModal}
            onTitleChange={handleTitleChange}
            onPriceChange={handlePriceChange}
            onPriceDiscountChange={handlePriceDiscountChange}
            onRatingChange={handleRatingChange}
            onTotalReviewsChange={handleTotalReviewsChange}
            onDescriptionChange={handleDescriptionChange}
            onProvinceChange={handleProvinceChange}
            onCityChange={handleCityChange}
            onAddressChange={handleAddressChange}
            onLocationMapChange={handleLocationMapChange}
            previewImageUrl={currentPreviewImageUrl}
            setPreviewImageUrl={setCurrentPreviewImageUrl}
            onImageChange={handleFileChange}
          />
        )}
        {/* {isEditModalOpen && activityDataForEdit && (
          <UpdateActivityModal
            open={isEditModalOpen}
            handleOpen={() => handleOpenEditModal(activityDataForEdit)}
            handleConfirm={handleConfirmEdit}
            handleCancel={handleCloseEditModal}
            activityData={activityDataForEdit}
          />
        )}
        {isPreviewModalOpen && selectedActivityForPreview && (
          <PreviewActivity
            open={isPreviewModalOpen}
            handleOpen={handleClosePreviewModal}
            handleConfirm={handleClosePreviewModal}
            activityData={selectedActivityForPreview}
          />
        )} */}
      </div>
    </div>
  );
};

export default ActivitiesLayout;
