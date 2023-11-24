"use client";
import { useDispatch } from "react-redux";
import Todo from "./Todo";
import TodoList from "./TodoList";
import "../css/TodoWrapper.css";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { addData, getData, isDocExist } from "../commonFunctions";
import { useSelector } from "react-redux";
import { NotesState } from "../globalRedux/reducers/reducer";
import { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";

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

  const handleSave = () => {
    if (notes.length > 0) {
      addData(date, notes);
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  const [isDocumentExist, setTaskExist] = useState(false);

  useEffect(() => {
    async function docExist() {
      setIsLoading(true);
      let response = await isDocExist(date);
      let getD = await getData(date);
      setTaskExist(response);
      setIsLoading(false);
      console.log("rr", getD);
    }

    docExist();
  }, [date]);

  return (
    <Box className="todo-wrapper-parent">
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
