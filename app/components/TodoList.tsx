import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { NotesState } from "../globalRedux/reducers/reducer";
import "../css/TodoList.css";
import { capitalizeFirstLetter } from "../customHooks/StringCapitalize";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import {
  Delete as DeleteIcon,
  StrikethroughS as StrikethroughSIcon,
} from "@mui/icons-material";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  Container,
  Card,
  CardActions,
  CardContent,
  Typography,
  Grow,
  TextField,
} from "@mui/material";

interface NewNoteProps {
  updateNote(note: string, updatedNote: string): void;
  deleteNote: Function;
}

const TodoList = ({ deleteNote, updateNote }: NewNoteProps) => {
  const notes = useSelector<NotesState, NotesState["notes"]>((state) => {
    return state.notes;
  });

  const [strikedNotes, setStrikedNotes] = useState<string[]>([]);

  const onDeleteNote = (note: string) => {
    if (notes.includes(note)) {
      deleteNote(note);
    } else {
      alert("The entered note doesn't exist to delete");
    }
  };
  const onStrikeNode = (note: string) => {
    if (strikedNotes.length >= 0) {
      if (!strikedNotes.includes(capitalizeFirstLetter(note))) {
        setStrikedNotes([...strikedNotes, note]);
      } else {
        if (notes.includes(capitalizeFirstLetter(note))) {
          setStrikedNotes((notes) =>
            notes.filter((noteData) => {
              return noteData !== note;
            })
          );
        }
      }
    }
  };

  const [selectedNote, setSelectedNote] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [openCard, setOpenCard] = useState<boolean>(false);
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const [editNote, setEditNote] = useState(selectedNote);
  useEffect(() => {
    setEditNote(selectedNote);
  }, [selectedNote]);
  const handleClickOpen = (note: string) => {
    setOpen(true);
    setSelectedNote(note);
  };

  const handleAgree = () => {
    onDeleteNote(selectedNote);
    handleClose();
  };
  const handleCardCloseModal = () => {
    setOpenCard(false);
    setEditMode(false);
    setEditNote(selectedNote);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleCard = (note: string) => {
    setOpenCard(true);
    setSelectedNote(note);
  };
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);

  const onUpdateNote = useCallback(() => {
    const handleCardCloseModal = () => {
      setOpenCard(false);
      setEditMode(false);
      setEditNote(selectedNote);
    };
    if (editNote === "") {
      setError(true);
      setErrorMessage("Please enter some note");
    } else if (editNote === selectedNote) {
      handleCardCloseModal();
    } else if (notes.includes(capitalizeFirstLetter(editNote))) {
      setErrorMessage("This note alread exist in the list");
      setError(true);
    } else {
      setError(false);
      updateNote(selectedNote, editNote);
      handleCardCloseModal();
      setErrorMessage("");
    }
  }, [editNote, selectedNote, notes, updateNote]);

  return (
    <div className="todo-list-parent">
      <Dialog
        fullWidth
        open={openCard}
        keepMounted
        onClose={handleCardCloseModal}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          {!isEditMode && (
            <DialogContentText id="alert-dialog-slide-description">
              {selectedNote}
            </DialogContentText>
          )}
          {isEditMode && (
            <TextField
              error={error}
              autoFocus
              value={editNote}
              margin="dense"
              fullWidth
              helperText={error ? errorMessage : ""}
              variant="standard"
              onChange={(event) => {
                setEditNote(capitalizeFirstLetter(event.target.value));
              }}
              onBlur={(e) => {
                if (e.target.value === "" || e.target.value) {
                  setError(false);
                }
              }}
              onKeyPress={(e) => e.key === "Enter" && onUpdateNote()}
            />
          )}
        </DialogContent>
        <DialogActions>
          {isEditMode ? (
            <Button onClick={onUpdateNote}>Save</Button>
          ) : (
            <Button
              onClick={() => {
                setEditMode(true);
              }}
            >
              Edit <EditIcon sx={{ fontSize: "1rem", paddingLeft: "0.5rem" }} />
            </Button>
          )}
          <Button onClick={handleCardCloseModal}>
            {" "}
            {isEditMode ? "Cancel" : "Close"}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText>
            {"Are you sure you want to delete this note"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleAgree} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Container sx={{overflowY:'auto',maxHeight:'60vh'}}>
        {notes?.map((note, index) => {
          return (
            <Grow
              key={index}
              in
              style={{ transformOrigin: "0 0 0" }}
              {...{ timeout: 500 }}
              
            >
              <Card
                className="note-parent"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  cursor:'pointer',
                  backgroundColor: `${
                    strikedNotes.includes(note) ? "#f5f5f5" : ""
                  }`,
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                    
                  },
                }}
              >
                <CardContent
                  sx={{ width: "100%" }}
                  onClick={() => {
                    !strikedNotes.includes(note) && handleCard(note);
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 14,
                      cursor: strikedNotes.includes(note)
                        ? "normal"
                        : "pointer",
                      width: {
                        lg: "300px",
                        md: "300px",
                        sm: "300px",
                        xs: "180px",
                      },
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    className={`${strikedNotes.includes(note) ? "strike" : ""}`}
                  >
                    {note}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Tooltip title="Delete">
                    <DeleteIcon
                      onClick={() => {
                        handleClickOpen(note);
                      }}
                      sx={{
                        cursor: "pointer",
                        color: "#313639",
                        "&:hover": {
                          color: "red",
                        },
                      }}
                    />
                  </Tooltip>
                  <Tooltip title="Strike Note">
                    <StrikethroughSIcon
                      sx={{
                        color: strikedNotes.includes(note) ? "pink" : "#313639",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        onStrikeNode(note);
                      }}
                    />
                  </Tooltip>
                </CardActions>
              </Card>
            </Grow>
          );
        })}
      </Container>
    </div>
  );
};

export default TodoList;
