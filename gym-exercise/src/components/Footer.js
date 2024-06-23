import React from "react";
import Box from "@mui/material/Box";
import { Stack, Typography } from "@mui/material";

function Footer() {
  return (
    <Box mt={"80px"} bgcolor={"#fff3f4"}>
      <Stack gap={"40px"} alignItems={"center"} px={"40px"} p={"24px"}>
        <Typography variant="subtitle1">Powered by Bipul Dubey❤️</Typography>
      </Stack>
    </Box>
  );
}

export default Footer;
