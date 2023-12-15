"use client";

import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { fetchEvents } from "@/redux/event/action";
import { eventSelector } from "@/redux/event/slice";
import React, { useEffect } from "react";

const Page = () => {
  const dispatch = useAppDispatch();
  const { error, events, loading } = useAppSelector(eventSelector);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);
  return (
    <div>
      {loading && <p>Fetching data please wait...</p>}
      {events
        ? events.data.map((each, index) => <p key={index}>{each.name}</p>)
        : ""}
    </div>
  );
};

export default Page;
