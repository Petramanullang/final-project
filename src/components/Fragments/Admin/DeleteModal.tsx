import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export interface ModalProps {
  open: boolean;
  handleOpen: () => void;
  handleConfirm: () => void;
}

const DeleteModal: React.FC<ModalProps> = ({ open, handleOpen, handleConfirm }) => {
  const [internalOpen, setInternalOpen] = useState(false);

  const handleInternalOpen = () => setInternalOpen(!internalOpen);

  const handleCancel = () => {
    setInternalOpen(false);
    handleOpen();
  };

  return (
    <>
      <Dialog placeholder={""} open={open} handler={handleOpen}>
        <DialogHeader placeholder={""}>Confirm Delete</DialogHeader>
        <DialogBody placeholder={""}>
        Are you sure you want to delete this item?
        </DialogBody>
        <DialogFooter placeholder={""}>
          <Button
            placeholder={""}
            variant="text"
            color="red"
            onClick={handleCancel}
            className="mr-1">
            <span>Cancel</span>
          </Button>
          <Button
            placeholder={""}
            variant="gradient"
            color="green"
            onClick={handleConfirm}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default DeleteModal;
