"use client";

import { addUser } from "@/redux/slices/slice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const AddUser = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const userDispatch = () => {
    dispatch(addUser({ name }));
  };

  return (
    <div className="h-60 p-2 border-solid border-cyan-600 flex flex-col w-full space-y-5">
      <h3 className="font-bold">Add User</h3>
      <div className="flex space-x-3">
        <input
          onChange={(e) => {
            setName(e.target.value);
          }}
          type="text"
          placeholder="Enter your name"
          className="w-56 p-2 bg-slate-800"
        />
        <button
          className="bg-violet-700 p-3 w-20 rounded-lg"
          onClick={userDispatch}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddUser;
