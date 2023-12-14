import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/slice";
import todoReducer from "./slices/todo-slice";
import eventReducer from "./event/slice";

export const store = configureStore({
  reducer: {
    userData: userReducer,
    todoData: todoReducer,
    eventData: eventReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
