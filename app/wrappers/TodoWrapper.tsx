"use client";
import { useDispatch } from "react-redux";
import Todo from "../components/Todo";
import TodoList from "../components/TodoList";
import "../css/TodoWrapper.css";
import { Alert, Box, Button, IconButton, Snackbar, Typography } from "@mui/material";
import { addData, getData, isDocExist } from "../commonFunctions";
import { useSelector } from "react-redux";
import { NotesState } from "../globalRedux/reducers/reducer";
import React, { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import CustomSnackbar from "../components/CustomSnackbar";

type TodoWrapperProps = {
  handleClose: () => void;
};

const TodoWrapper = ({ handleClose }: TodoWrapperProps) => {
  const dispatch = useDispatch();

  const notes = useSelector<NotesState, NotesState["notes"]>((state) => {
    return state.notes;
  });

  console.log("notes", notes);

  const addNote = (note: string) => {
    dispatch({ type: "ADD_NOTE", payload: note });
  };

  const resetNote = () => {
    dispatch({ type: "RESET_NOTE" });
  };
  const deleteNote = (note: string) => {
    dispatch({ type: "DELETE_NOTE", payload: note });
  };

  const updateNote = (selectedNote: string, updatedNote: string) => {
    dispatch({ type: "UPDATE_NOTE", payload: { selectedNote, updatedNote } });
  };

  const [date, setDate] = useState<Dayjs | null>(dayjs());

  const formattedDate = date?.format("DD-MM-YYYY");

const [snackbarMessage,setSnackbarMessage] = useState('')
const [isSnackbarOpen,setSnackbarOpen] = useState(false)

  const handleSave = async() => {
    if (notes.length > 0) {
      const res = await addData(formattedDate, notes);
      setSnackbarMessage(res?.message)
      setSnackbarOpen(true)
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  const [isDocumentExist, setTaskExist] = useState(false);

  useEffect(() => {
    async function docExist() {
      setIsLoading(true);
      let response = await isDocExist(formattedDate);
      let getD = await getData(formattedDate);
      setTaskExist(response);
      setIsLoading(false);
      console.log("rr", getD);
    }

    docExist();
  }, [formattedDate]);

  return (
    <Box className="todo-wrapper-parent">
      {isSnackbarOpen && <CustomSnackbar isOpen={isSnackbarOpen} message={snackbarMessage} handleSnackbarClose={()=>setSnackbarOpen(false)}/>}
      <Todo
        addNote={addNote}
        handleClose={handleClose}
        date={date}
        setDate={(newValue: Dayjs | null) => setDate(newValue)}
        isLoading={isLoading}
        isDocumentExist={isDocumentExist}
      />

      <TodoList deleteNote={deleteNote} updateNote={updateNote} />
      {!isDocumentExist && !isLoading && (
        <Box display="flex" gap={1} mt={1}>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              backgroundColor: "white",
              color: "black",
              "&:hover": {
                backgroundColor: "green",
                color: "white",
              },
            }}
            disabled={isDocumentExist}
          >
            Save
          </Button>
          <Button
            variant="contained"
            onClick={resetNote}
            sx={{
              backgroundColor: "white",
              color: "black",
              "&:hover": {
                backgroundColor: "grey",
                color: "white",
              },
            }}
            disabled={isDocumentExist}
          >
            Reset
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default TodoWrapper;
