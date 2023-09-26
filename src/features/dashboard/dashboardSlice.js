import { createSlice } from "@reduxjs/toolkit";

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    dashboardType: "create-account",
    adminDashboardType: "users",
  },
  reducers: {
    setDashboardType: (state, action) => {
      state.dashboardType = action.payload;
    },
    setAdminDashboardType: (state, action) => {
      state.adminDashboardType = action.payload;
    },
  },
});

export const { setDashboardType, setAdminDashboardType } =
  dashboardSlice.actions;

export default dashboardSlice.reducer;
