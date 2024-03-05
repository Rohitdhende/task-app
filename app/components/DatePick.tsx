import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker as MuiDatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import  dayjs, { Dayjs } from 'dayjs';

export interface DateProps {
  date: Dayjs | null;
  setDate(date: Dayjs | null): void;
}

export default function BasicDatePicker({ date, setDate }: DateProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <MuiDatePicker
          label="Select Date"
          value={date}
          onChange={(newValue: Dayjs | null) => setDate(newValue)}
          maxDate = {dayjs()}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
