import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";

export type Todo = {
  id?: string;
  name: string;
};

export interface ITodo {
  todos: Todo[];
}

const initialState: ITodo = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todoSlice",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      const data: Todo = {
        id: nanoid(),
        name: action.payload.name,
      };
      state.todos = [...state.todos, data];
    },
  },
});

export const { addTodo } = todoSlice.actions;
export default todoSlice.reducer;
