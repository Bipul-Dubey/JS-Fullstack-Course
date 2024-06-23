import { Box, Button, Typography } from "@mui/material";
import React from "react";

import HeroBannerImage from "../assets/images/banner.webp";

function HeroBanner() {
  return (
    <Box
      sx={{
        mt: { lg: "200px", xs: "70px" },
        ml: { sm: "50px" },
      }}
      position="relative"
      p={"20px"}
    >
      <Typography color={"#ff2625"} fontWeight={"600"} fontSize={"26px"}>
        Fitness Club
      </Typography>
      <Typography
        fontWeight={700}
        sx={{ fontSize: { lg: "44px", xs: "40px" } }}
        mb={"23px"}
        mt={"30px"}
      >
        Sweat, Smile <br /> and Repeat
      </Typography>
      <Typography fontSize={"22px"} lineHeight={"35px"} mb={4}>
        Check out the most effective exercises.
      </Typography>
      <Button
        variant="contained"
        color="error"
        onClick={() => {
          document
            .querySelector("#exercises")
            .scrollIntoView({ behavior: "smooth" });
        }}
      >
        Explore Exercises
      </Button>
      <Typography
        fontWeight={600}
        color={"#ff2625"}
        sx={{
          opacity: 0.1,
          display: { lg: "block", xs: "none" },
        }}
        fontSize={"220px"}
      >
        Exercise
      </Typography>
      <img
        src={HeroBannerImage}
        alt="banner"
        className="hero-banner-img"
        style={{ borderRadius: "35px", objectFit: "fill" }}
      />
    </Box>
  );
}

export default HeroBanner;
