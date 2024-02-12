"use client";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
const page = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default page;
