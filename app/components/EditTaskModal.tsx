import * as React from "react";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import CloseIcon from "@mui/icons-material/Close";
import TodoList from "./TodoList";
import { NotesState } from "../globalRedux/reducers/reducer";
import { addData } from "../commonFunctions";
import { Dayjs } from "dayjs";

type ModalProps = {
  open: boolean;
  handleClose: () => void;
  handleSave: (notes: string[]) => void;
  data: any;
  date: Dayjs | null;
};

export default function EditTaskModal({
  open,
  handleClose,
  handleSave,
  data,
  date,
}: ModalProps) {
  const dispatch = useDispatch();
  const notes = useSelector<NotesState, NotesState["notes"]>((state) => {
    return state.notes;
  });
  // const allValuesExist = data?.tasks?.every((value: string) =>
  //   notes?.includes(value)
  // );

  // if (!allValuesExist) {

  //   data?.tasks.forEach((note: string) => {
  //     if (!notes.includes(note)) {
  //       dispatch({ type: "ADD_NOTE", payload: note });
  //     }
  //   });
  // }
  const deleteNote = (note: string) => {
    dispatch({ type: "DELETE_NOTE", payload: note });
  };

  const updateNote = (selectedNote: string, updatedNote: string) => {
    dispatch({ type: "UPDATE_NOTE", payload: { selectedNote, updatedNote } });
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <Box
        sx={{
          background: "white",
          marginTop: "1rem",
          padding: "1rem",
          borderRadius: "0.5rem",
        }}
      >
        <Box
          sx={{
            width: "100%",
            position: "relative",
          }}
        >
          Edit Task
          <IconButton
            sx={{ position: "absolute", zIndex: 111, top: 0, right: 0 }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* <List dense={true} sx={{ width: "100%" }}>
          {data?.tasks?.map((task: string, index: number) => (
            <ListItem key={index} sx={{ height: "100%", display: "flex" }}>
              <ListItemIcon sx={{ minWidth: "fit-content", mr: "0.5rem" }}>
                <RadioButtonCheckedIcon fontSize="inherit" />
              </ListItemIcon>
              <ListItemText primary={task} />
            </ListItem>
          ))}
        </List> */}
        <Box marginTop="1rem">
          <TodoList
            deleteNote={deleteNote}
            updateNote={updateNote}
            data={data}
          />
        </Box>
        <Box display="flex" gap={1} mt={1}>
          <Button
            variant="contained"
            onClick={() => handleSave(notes)}
            sx={{
              backgroundColor: "white",
              color: "black",
              "&:hover": {
                backgroundColor: "green",
                color: "white",
              },
            }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
