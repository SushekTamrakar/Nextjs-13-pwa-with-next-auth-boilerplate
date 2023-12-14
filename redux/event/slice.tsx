import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { fetchEvents } from "./action";
import { IEventState } from "@/lib/types/event.types";

const initialState: IEventState = {
  loading: false,
  events: undefined,
  error: undefined,
};

const Slice = createSlice({
  name: "eventSlice",
  initialState,
  reducers: {
    // addEvents: (state, action: PayloadAction<Event>) => {
    //   const data: Event = {
    //     id: nanoid(),
    //     name: action.payload.name,
    //   };
    //   state.events = [...state.events, data];
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEvents.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      fetchEvents.fulfilled,
      (state, action: PayloadAction<any>) => {
        (state.loading = false), (state.events = action.payload);
      }
    );
    builder.addCase(fetchEvents.rejected, (state, action) => {
      state.loading = false;
      state.events = undefined;
      state.error = action.error.message;
    });
  },
});

// export const { addEvents } = Slice.actions;
export const eventSelector = (state: RootState) => state.eventData;
export default Slice.reducer;
