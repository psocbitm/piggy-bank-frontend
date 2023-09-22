// app/store.js
import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'
import dashboardReducer from '../features/user/dashboard/dashboardSlice'
export default configureStore({
  reducer: {
    user: userReducer,
    dashboard: dashboardReducer,
  },
})
