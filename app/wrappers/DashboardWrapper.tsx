import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FetchTask from "../components/FetchTask";
import dayjs, { Dayjs } from "dayjs";
import { getData } from "../commonFunctions";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface TaskProps {
  tasks: string[];
  // Other properties...
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function DashboardPanel() {
  const [value, setValue] = React.useState(0);

  // React.useEffect(() => {
  //   uploadLog();
  // }, []);
  const [date, setDate] = React.useState<Dayjs | null>(dayjs());
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState<TaskProps>({ tasks: [] });

  const formattedData = date?.format("DD-MM-YYYY");

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        let result = await getData(formattedData);
        setData((result as TaskProps) || { tasks: [] });
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [date]);

  console.log("dddd", formattedData);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Tasks By Date" {...a11yProps(0)} />
          <Tab label="Tasks By Date Range" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <FetchTask
          isLoading={isLoading}
          date={date}
          setDate={setDate}
          data={data}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Tasks By Date Range
      </CustomTabPanel>
    </Box>
  );
}
