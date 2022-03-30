import { configureStore } from "@reduxjs/toolkit";
import { iconsApi } from "./api/icons.api";

export const store = configureStore({
  reducer: {
    [iconsApi.reducerPath]: iconsApi.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
