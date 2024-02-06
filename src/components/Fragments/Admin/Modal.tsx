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

const Modal: React.FC<ModalProps> = ({ open, handleOpen, handleConfirm }) => {
  const [internalOpen, setInternalOpen] = useState(false);

  const handleInternalOpen = () => setInternalOpen(!internalOpen);

  const handleCancel = () => {
    // Set internalOpen to false to close the modal
    setInternalOpen(false);
    // Call the external handleOpen to ensure consistent state management
    handleOpen();
  };

  return (
    <>
      <Dialog placeholder={""} open={open} handler={handleOpen}>
        <DialogHeader placeholder={""}>Its a simple dialog.</DialogHeader>
        <DialogBody placeholder={""}>
          The key to more success is to have a lot of pillows. Put it this way,
          it took me twenty-five years to get these plants, twenty-five years of
          blood, sweat, and tears, and I&apos;m never giving up. I&apos;m just
          getting started. I&apos;m up to something. Fan luv.
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

export default Modal;
