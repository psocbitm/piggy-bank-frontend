// features/dashboard/dashboardSlice.js
import { createSlice } from '@reduxjs/toolkit'

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    dashboardType: 'create-account'
  },
  reducers: {
    setDashboardType: (state, action) => {
      state.dashboardType = action.payload
    },
  },
})

export const { setDashboardType } = dashboardSlice.actions

export default dashboardSlice.reducer
