import CircularProgress from "@mui/material/CircularProgress";

import React from "react";

const CircularLoading = ({ size }: { size: number }) => {
  return <CircularProgress size={size} color="inherit" />;
};

export default CircularLoading;
