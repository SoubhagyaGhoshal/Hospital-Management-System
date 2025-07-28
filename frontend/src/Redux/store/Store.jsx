import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "../slices/sidebarSlice"; // Ensure correct import

const store = configureStore({
  reducer: {
    sidebar: sidebarReducer, // Renamed from "page" to "sidebar"
  },
});

export default store;
