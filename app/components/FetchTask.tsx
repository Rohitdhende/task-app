import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import React, { useState, useEffect, useMemo } from "react";
import BasicDatePicker from "./DatePick";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import dayjs, { Dayjs } from "dayjs";
import EditIcon from "@mui/icons-material/Edit";
import EditTaskModal from "./EditTaskModal";
import { useDispatch } from "react-redux";
import CustomSnackbar from "./CustomSnackbar";
import { addData } from "../commonFunctions";

interface Props {
  date: Dayjs | null;
  setDate(date: Dayjs | null): void;
  isLoading: boolean;
  data: any;
}

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  minWidth: 240,
}));

const FetchTask: React.FC<Props> = ({ date, setDate, isLoading, data }) => {
  const dispatch = useDispatch();
  const [isEditModal, setEditModal] = useState(false);
  const resetNote = () => {
    dispatch({ type: "RESET_NOTE" });
  };

  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [isSnackbarOpen, setSnackbarOpen] = React.useState(false);

  const formattedDate = date?.format("DD-MM-YYYY");

  const handleSave = async (notes: string[]) => {
    if (notes.length > 0) {
      const res = await addData(formattedDate, notes);
      setSnackbarMessage(res?.message);
      setSnackbarOpen(true);
      setEditModal(false);
    }
  };

  return (
    <Box display="flex" flexWrap="wrap">
      {isEditModal && (
        <EditTaskModal
          data={data}
          date={date}
          open={isEditModal}
          handleClose={() => {
            resetNote();
            setEditModal(false);
          }}
          handleSave={(notes: string[]) => handleSave(notes)}
        />
      )}
      {isSnackbarOpen && (
        <CustomSnackbar
          isOpen={isSnackbarOpen}
          message={snackbarMessage}
          handleSnackbarClose={() => setSnackbarOpen(false)}
        />
      )}
      <Box flex="1" display="flex" flexDirection="column">
        <Typography variant="subtitle1">Select Date</Typography>
        <BasicDatePicker date={date} setDate={setDate} />
      </Box>
      <Box sx={{ borderLeft: "1px dashed grey", ml: "1rem" }}></Box>
      <Box flex="3" display="flex" flexDirection="column">
        <Box display="flex" alignItems="center">
          <Typography variant="subtitle1" ml="1rem">
            Task Details
          </Typography>
          <IconButton
            onClick={() => setEditModal(true)}
            disabled={data?.tasks.length === 0}
          >
            <EditIcon sx={{ fontSize: "1rem" }} />
          </IconButton>
        </Box>

        {isLoading ? (
          <CircularProgress
            color="success"
            sx={{
              ml: "1rem",
              height: "100%",
              display: "flex",
              alignItems: "center",
            }}
          />
        ) : data?.tasks.length === 0 ? (
          <Typography
            sx={{
              ml: "1rem",
              height: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            Oops No data found!
          </Typography>
        ) : (
          <Demo>
            <List dense={true}>
              {data?.tasks?.map((task: string, index: number) => (
                <ListItem
                  key={index}
                  sx={{ height: "100%", display: "flex", alignItems: "center" }}
                >
                  <ListItemIcon sx={{ minWidth: "fit-content", mr: "0.5rem" }}>
                    <RadioButtonCheckedIcon fontSize="inherit" />
                  </ListItemIcon>
                  <ListItemText primary={task} />
                </ListItem>
              ))}
            </List>
          </Demo>
        )}
      </Box>
    </Box>
  );
};

export default FetchTask;
