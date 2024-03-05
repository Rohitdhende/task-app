import * as React from "react";
import Modal from "@mui/material/Modal";
import TodoWrapper from "../wrappers/TodoWrapper";
import { Box } from "@mui/material";

type ModalProps = {
  open: boolean;
  handleClose: () => void;
};

export default function BasicModal({ open, handleClose }: ModalProps) {
  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box>
        <TodoWrapper handleClose={handleClose} />
      </Box>
    </Modal>
  );
}
