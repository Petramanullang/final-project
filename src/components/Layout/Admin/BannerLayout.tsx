import Sidebar from "@/components/Fragments/Admin/Navigation";
import React, { useState, useEffect } from "react";
import axios from "axios";
import useDelete from "@/hooks/useDelete";
import Modal, { ModalProps } from "@/components/Fragments/Admin/Modal";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";

interface BannerData {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

const apiUrl = process.env.NEXT_PUBLIC_API as string;
const apiKey = process.env.NEXT_PUBLIC_API_TOKEN as string;

const BannerLayout = () => {
  const [bannersData, setBannersData] = useState([]);
  const { loading, error, data, deleteData } = useDelete();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResourceId, setSelectedResourceId] = useState(null);

  const handleDelete = (resourceId: any) => {
    // Show the modal to confirm deletion
    setIsModalOpen(true);
    setSelectedResourceId(resourceId);
  };

  const handleConfirmDelete = () => {
    // Perform the actual deletion
    if (selectedResourceId) {
      deleteData("api/v1/delete-banner", selectedResourceId);
    }

    // Close the modal after deletion
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loginApiUrl = `${apiUrl}/api/v1/banners`;
        const res = await axios.get(loginApiUrl, {
          headers: {
            apiKey: `${apiKey}`,
            "Content-Type": "application/json",
          },
        });
        const data = res.data.data;
        setBannersData(data);
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
        <h1 className="text-3xl font-bold mx-44 text-black my-4">Banner</h1>
        <div className="relative w-3/4 mx-auto bg-gray-500 p-5 pt-16 rounded-xl">
          <button className="bg-gray-700 text-white normal-case absolute right-3 top-3 p-2 px-5 rounded-lg hover:bg-gray-600">
            Add Item
          </button>
          <ul className="flex justify-between px-2 text-white bg-gray-600 rounded-md pr-48">
            <li>Name</li>
            <li className="ml-28">Created At</li>
            <li>Updated At</li>
          </ul>
          <ul className="divide-y">
            {bannersData.length > 0 ? (
              bannersData.map((data: BannerData, index: number) => (
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
                          className="flex rounded-none hover:rounded-md">
                          <EyeIcon className="w-4 h-4 mr-2" /> Preview
                        </MenuItem>
                        <MenuItem
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
      </div>
    </div>
  );
};

export default BannerLayout;
