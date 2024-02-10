import React, { useState, useEffect } from "react";
import axios from "axios";
import useDelete from "@/hooks/useDelete";
import Modal from "@/components/Fragments/Admin/DeleteModal";
import CreateCategoryModal from "@/components/Fragments/Admin/CreateCategories";
import UpdateCategoryModal from "@/components/Fragments/Admin/UpdateCategories";
import PreviewCategory from "@/components/Fragments/Admin/PreviewCategories";
import Sidebar from "@/components/Fragments/Admin/Navigation";
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

interface CategoryData {
  id: any;
  name: string;
  createdAt: string;
  updatedAt: string;
  imageUrl: any;
}

const apiUrl = process.env.NEXT_PUBLIC_API as string;
const apiKey = process.env.NEXT_PUBLIC_API_TOKEN as string;

const CategoriesLayout = () => {
  const [categoriesData, setCategoriesData] = useState<CategoryData[]>([]);
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

  const [categoryDataForEdit, setCategoryDataForEdit] =
    useState<CategoryData | null>(null);
    
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  
  const [selectedCategoryForPreview, setSelectedCategoryForPreview] =
    useState<CategoryData | null>(null);

  const handleOpenPreviewModal = (categoryData: CategoryData) => {
    setSelectedCategoryForPreview(categoryData);
    setIsPreviewModalOpen(true);
  };

  const handleClosePreviewModal = () => {
    setSelectedCategoryForPreview(null);
    setIsPreviewModalOpen(false);
  };

  const handleConfirmEdit = () => {
    handleCloseEditModal();
  };

  const handleOpenEditModal = (categoryData: CategoryData | null) => {
    if (categoryData !== null) {
      setCategoryDataForEdit(categoryData);
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
      deleteData("api/v1/delete-category", selectedResourceId.toString());
    }
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesApiUrl = `${apiUrl}/api/v1/categories`;
        const res = await axios.get(categoriesApiUrl, {
          headers: {
            apiKey: `${apiKey}`,
            "Content-Type": "application/json",
          },
        });
        const data = res.data.data;
        setCategoriesData(data);
      } catch (error: any) {
        console.error(
          "Error fetching data:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchData();
  }, []);

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
        <h1 className="text-3xl font-bold mx-44 text-black my-4">Categories</h1>
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
            {categoriesData.length > 0 ? (
              categoriesData.map((data: CategoryData, index: number) => (
                <li key={index}>
                  <div className="flex justify-between p-2">
                    <h1 className="text-xl w-1/4 text-white">{data.name}</h1>
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
          <CreateCategoryModal
            open={isCreateModalOpen}
            handleOpen={handleOpenCreateModal}
            handleConfirm={handleConfirmCreate}
            handleCancel={handleCloseCreateModal}
            onNameChange={handleNameChange}
            onFileChange={handleFileChange}
            previewImageUrl={currentPreviewImageUrl}
            setPreviewImageUrl={setCurrentPreviewImageUrl}
            handleClose={handleCloseCreateModal}
          />
        )}
        {isEditModalOpen && categoryDataForEdit && (
          <UpdateCategoryModal
            open={isEditModalOpen}
            handleOpen={() => handleOpenEditModal(categoryDataForEdit)}
            handleConfirm={handleConfirmEdit}
            handleCancel={handleCloseEditModal}
            categoryData={categoryDataForEdit}
          />
        )}
        {isPreviewModalOpen && selectedCategoryForPreview && (
          <PreviewCategory
            open={isPreviewModalOpen}
            handleOpen={handleClosePreviewModal}
            handleConfirm={handleClosePreviewModal}
            categoryData={selectedCategoryForPreview}
          />
        )}
      </div>
    </div>
  );
};

export default CategoriesLayout;
