import { useState, ChangeEvent , useEffect} from "react";
import "../css/Todo.css";
import { useSelector } from "react-redux";
import { NotesState } from "../globalRedux/reducers/reducer";
import { capitalizeFirstLetter } from "../customHooks/StringCapitalize";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import BasicDatePicker from "./DatePick";
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Dayjs } from "dayjs";
import { getData, isDocExist } from "../commonFunctions";


interface NewNoteProps {
  addNote(note: string): void;
  handleClose: () => void;
  date: Dayjs | null;
  setDate(date: Dayjs | null): void;
  isLoading:boolean;
  isDocumentExist:boolean
}

const Todo = ({ addNote, handleClose, date, setDate,isLoading,isDocumentExist }: NewNoteProps) => {
  const [note, setNote] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);

  const notes = useSelector<NotesState, NotesState["notes"]>((state) => {
    return state.notes;
  });

  const updateNote = (event: ChangeEvent<HTMLInputElement>) => {
    setNote(capitalizeFirstLetter(event.target.value));
  };

  const onAddNoteClick = () => {
    if (note === "") {
      setError(true);
      setErrorMessage("Please enter some note");
    } else if (notes.includes(capitalizeFirstLetter(note))) {
      setErrorMessage("This note alread exist in the list");
      setError(true);
    } else {
      setError(false);
      addNote(capitalizeFirstLetter(note));
      setNote("");
    }
  };


  console.log("isDocumentExist",isLoading)

  return (
    <Container
      sx={{
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        width: {
          xl: "500px",
          lg: "500px",
          md: "500px",
          sm: "500px",
          xs: "100%",
        },
        display: "flex",
        padding: "1rem",
        gap: 1,
        background: "white",
        boxShadow: "0 5px 4px -6px black",
        borderRadius: "0 0 1rem 1rem",
        zIndex: 2,
        position: "relative",
      }}
    >
      <IconButton
        sx={{ position: "absolute", zIndex: 111, top: 0, right: 0 }}
        onClick={handleClose}
      >
        <CloseIcon />
      </IconButton>
      Add Task
      <BasicDatePicker
        date={date}
        setDate={(newValue: Dayjs | null) => setDate(newValue)}
      />
      {isLoading ? <CircularProgress color="inherit" /> : isDocumentExist && <Typography>Task for this date is already exist, please search with the date and edit it!</Typography>}

    {!isDocumentExist && !isLoading  && <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
      >
        <TextField
          error={error}
          sx={{
            width: {
              xl: "300px",
              lg: "300px",
              md: "300px",
              sm: "300px",
              xs: "100%",
            },
          }}
          id="standard-input-note"
          label="Add Note"
          variant="standard"
          name={note}
          value={note}
          helperText={error ? errorMessage : ""}
          onChange={updateNote}
          onBlur={(e) => {
            if (e.target.value === "" || e.target.value) {
              setError(false);
            }
          }}
          color="success"
          onKeyPress={(e) => e.key === "Enter" && onAddNoteClick()}
        />
        <AddCircleIcon
          color="success"
          sx={{ fontSize: "1.5rem", cursor: "pointer" }}
          onClick={onAddNoteClick}
        />
      </Box>}
    </Container>
  );
};

export default Todo;
