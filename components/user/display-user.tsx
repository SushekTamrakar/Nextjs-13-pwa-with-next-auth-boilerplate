"use client";

import { UserT, removeUser } from "@/redux/slices/slice";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const DisplayUser = () => {
  const userData: UserT[] = useSelector((data) => data.userData.users);
  const dispatch = useDispatch();

  return (
    <>
      <div className="border border-violet-700 h-60 p-5 overflow-auto">
        <h3 className="font-bold">User List</h3>
        {userData.map((user, index) => (
          <div
            key={index}
            className="flex space-x-5 bg-slate-500 w-44 p-3 justify-between mb-5 mt-5"
          >
            <p>{user.name}</p>
            <span onClick={() => dispatch(removeUser(user.id as string))}>
              x
            </span>
          </div>
        ))}
      </div>
      <Link href="/events">Go to events</Link>
    </>
  );
};

export default DisplayUser;
