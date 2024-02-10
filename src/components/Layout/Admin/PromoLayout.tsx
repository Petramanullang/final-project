import React, { useState, useEffect } from "react";
import axios from "axios";
import useDelete from "@/hooks/useDelete";
import Modal from "@/components/Fragments/Admin/DeleteModal";
import CreatePromoModal from "@/components/Fragments/Admin/Promo/CreatePromo";
import UpdatePromoModal from "@/components/Fragments/Admin/Promo/UpdatePromoModal";
import PreviewPromo from "@/components/Fragments/Admin/Promo/PreviewPromo";
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

interface PromoData {
  id: any;
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

const apiUrl = process.env.NEXT_PUBLIC_API as string;
const apiKey = process.env.NEXT_PUBLIC_API_TOKEN as string;

const PromoLayout = () => {
  const router = useRouter();
  const [promosData, setPromosData] = useState<PromoData[]>([]);
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
  const [promoDataForEdit, setPromoDataForEdit] = useState<PromoData | null>(
    null
  );
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [selectedPromoForPreview, setSelectedPromoForPreview] =
    useState<PromoData | null>(null);
  const [termConditionValue, setTermConditionValue] = useState<string>("");

  const handleOpenPreviewModal = (promoData: PromoData) => {
    setSelectedPromoForPreview(promoData);
    setIsPreviewModalOpen(true);
  };

  const handleClosePreviewModal = () => {
    setSelectedPromoForPreview(null);
    setIsPreviewModalOpen(false);
  };

  const handleConfirmEdit = () => {
    handleCloseEditModal();
  };

  const handleOpenEditModal = (promoData: PromoData | null) => {
    if (promoData !== null) {
      setPromoDataForEdit(promoData);
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
    // Implementasi fungsi handleFileChange
    // Pastikan file adalah instance dari objek File sebelum melakukan operasi apapun
  };
  const handleTermConditionChange = (value: string) => {
    // Implementasi fungsi handleTermConditionChange
    // Pastikan value adalah string sebelum melakukan operasi apapun
    setTermConditionValue(value);
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
      deleteData("api/v1/delete-promo", selectedResourceId.toString());
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

        const promoApiUrl = `${apiUrl}/api/v1/promos`;
        const res = await axios.get(promoApiUrl, {
          headers: {
            apiKey: `${apiKey}`,
            "Content-Type": "application/json",
          },
        });
        const data = res.data.data;
        setPromosData(data);
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
        <h1 className="text-3xl font-bold mx-44 text-black my-4">Promo</h1>
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
            {promosData.length > 0 ? (
              promosData.map((data: PromoData, index: number) => (
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
          <CreatePromoModal
            open={isCreateModalOpen}
            handleOpen={handleOpenCreateModal}
            handleConfirm={handleConfirmCreate}
            handleCancel={handleCloseCreateModal}
            onTitleChange={handleNameChange}
            onPromoCodeChange={(value) => {
              /* handle Promo Code change */
            }}
            onDiscountPriceChange={(value) => {
              /* handle Discount Price change */
            }}
            onMinimumClaimPriceChange={(value) => {
              /* handle Minimum Claim Price change */
            }}
            onDescriptionChange={(value) => {
              /* handle Description change */
            }}
            onTermConditionChange={handleTermConditionChange}
            onImageChange={handleFileChange}
            previewImageUrl={currentPreviewImageUrl}
            setPreviewImageUrl={setCurrentPreviewImageUrl}
          />
        )}

        {isEditModalOpen && promoDataForEdit && (
          <UpdatePromoModal
            open={isEditModalOpen}
            handleOpen={() => handleOpenEditModal(promoDataForEdit)}
            handleConfirm={handleConfirmEdit}
            handleCancel={handleCloseEditModal}
            promoData={promoDataForEdit}
          />
        )}
        {isPreviewModalOpen && selectedPromoForPreview && (
          <PreviewPromo
            open={isPreviewModalOpen}
            handleOpen={handleClosePreviewModal}
            handleConfirm={handleClosePreviewModal}
            promoData={selectedPromoForPreview}
          />
        )}
      </div>
    </div>
  );
};

export default PromoLayout;
