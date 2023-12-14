import { PayloadAction, createSlice, current, nanoid } from "@reduxjs/toolkit";

export type UserT = {
  id?: string;
  name: string;
};
export interface UserInitialState {
  users: UserT[];
}

const initialState: UserInitialState = {
  // users: [],
  users: [],
};

const userSlice = createSlice({
  name: "addUserSlice",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserT>) => {
      const data: UserT = {
        id: nanoid(),
        name: action.payload.name,
      };
      state.users = [...state.users, data];
      // localStorage.setItem("users", JSON.stringify(current(state.users)));
      // state.users.push(data);
    },
    removeUser: (state, action: PayloadAction<string>) => {
      const updatedData = state.users.filter((item) => {
        return item.id !== action.payload;
      });
      state.users = updatedData;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
