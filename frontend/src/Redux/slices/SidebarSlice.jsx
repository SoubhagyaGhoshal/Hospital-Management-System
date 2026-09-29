import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: { page: "", menu: true, updateId: 0 },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setMenu: (state, action) => {
      state.menu = action.payload;
    },
    setUpdateId: (state, action) => {
      state.updateId = action.payload;
    },
  },
});

export const { setPage, setMenu, setUpdateId } = sidebarSlice.actions;
export default sidebarSlice.reducer;
