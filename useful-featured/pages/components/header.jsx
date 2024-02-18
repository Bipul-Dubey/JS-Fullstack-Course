import React from "react";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  return (
    <AppBar position="static" b>
      <Toolbar variant="dense">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        ></IconButton>
        <Typography
          style={{ cursor: "pointer" }}
          variant="h6"
          color="inherit"
          component="div"
          onClick={() => {
            router.push("/");
          }}
        >
          Features
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
