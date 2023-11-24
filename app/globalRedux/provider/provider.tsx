"use client";
import { Provider } from "react-redux";
import {  ReactNode } from "react";
import { store } from "../store/store";
import React, { ReactElement } from "react";

interface ProvidersProps {
  children: ReactNode; // ReactNode is a type that can hold any JSX content
}

const Providers: React.FC<ProvidersProps> = ({ children }: ProvidersProps): ReactElement => {
  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
