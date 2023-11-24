import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import BasicDatePicker from "./DatePick";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import dayjs, { Dayjs } from "dayjs";
import { getData, isDocExist } from "../commonFunctions";

interface Props {}

interface TaskProps {
  tasks: string[];
  // Other properties...
}

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  minWidth: 240,
}));

const Chart: React.FC<Props> = () => {
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [isLoading, setIsLoading] = useState(false);
  const [isDocumentExist, setTaskExist] = useState(false);
  const [data, setData] = useState<TaskProps>({ tasks: [] });

  useEffect(() => {
    async function docExist() {
      setIsLoading(true);
      let response = await isDocExist(date);
      let getD = await getData(date);
      setTaskExist(response);
      setData((getD as TaskProps) || { tasks: [] });
      setIsLoading(false);
    }

    docExist();
  }, [date]);

  console.log("dddd", data);

  return (
    <Box display="flex" flexWrap="wrap">
      <Box flex="1" display="flex" flexDirection="column">
        <Typography variant="subtitle1">Select Date</Typography>
        <BasicDatePicker date={date} setDate={setDate} />
      </Box>
      <Box sx={{ borderLeft: "1px dashed grey", ml: "1rem" }}></Box>
      <Box flex="3" display="flex" flexDirection="column">
        <Typography variant="subtitle1" ml="1rem">
          Task Details
        </Typography>
        {isLoading ? (
          <CircularProgress />
        ) : data?.tasks.length === 0 ? <Typography>Oops No data found!</Typography> :(
          <Demo>
            <List dense={true}>
              {data?.tasks?.map((task, index) => (
                <ListItem key={index}>
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

export default Chart;
