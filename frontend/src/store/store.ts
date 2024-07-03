import { configureStore } from "@reduxjs/toolkit";
import { erpAPISlice } from "../api/apiSlice";
import authReducers from '../api/auth'


const store = configureStore({
    reducer: {
        [erpAPISlice.reducerPath]: erpAPISlice.reducer,
        auth: authReducers
    },

    // The default Middleware configured
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat([erpAPISlice.middleware]),
  // devTools: process.env.NODE_ENV !== 'production',
  devTools: true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store;