import AddUser from "@/components/user/add-user";
import DisplayUser from "@/components/user/display-user";
import React from "react";

const Page = () => {
  return (
    <div className="m-2">
      <AddUser />
      <DisplayUser />
    </div>
  );
};

export default Page;
