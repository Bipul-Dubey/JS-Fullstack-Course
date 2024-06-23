import { Stack } from "@mui/material";
import React from "react";
import { InfinitySpin } from "react-loader-spinner";
function Loader() {
  return (
    <Stack direction={"row"} justifyContent={"center"} alignItems={"center"}>
      <InfinitySpin />
    </Stack>
  );
}

export default Loader;
