import { configureStore } from "@reduxjs/toolkit";
import { noteReducers } from "../reducers/reducer";

export const store = configureStore({ reducer: noteReducers });
