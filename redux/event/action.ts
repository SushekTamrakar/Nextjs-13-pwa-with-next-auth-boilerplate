import { createAsyncThunk } from "@reduxjs/toolkit";
import EventDataService from "../../axios/services/event.service";

export const fetchEvents = createAsyncThunk("apiEvents", async () => {
  const result = await EventDataService.getAll();
  return result.data;
});
