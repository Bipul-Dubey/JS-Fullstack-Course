import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import HorizontalScrollBar from "./HorizontalScrollBar";
import Loader from "./Loader";

function SimilarExercises({
  targetExerciseDetails = [],
  equipmentExerciseDetails = [],
}) {
  return (
    <Box sx={{ mt: { lg: "100px", xs: "0" } }}>
      <Typography variant="h3" mb={5}>
        Exercises that target the same muscle group
      </Typography>
      <Stack
        direction={"row"}
        sx={{ p: "2", position: "relative", justifyContent: "center" }}
      >
        {targetExerciseDetails?.length > 0 ? (
          <HorizontalScrollBar
            isBodyPart={false}
            bodyParts={targetExerciseDetails}
          />
        ) : (
          <Loader />
        )}
      </Stack>
      <Typography variant="h3" mb={5}>
        Exercises that use the same equipment
      </Typography>
      <Stack
        direction={"row"}
        sx={{ p: "2", position: "relative", justifyContent: "center" }}
      >
        {equipmentExerciseDetails?.length > 0 ? (
          <HorizontalScrollBar
            isBodyPart={false}
            bodyParts={equipmentExerciseDetails}
          />
        ) : (
          <Loader />
        )}
      </Stack>
    </Box>
  );
}

export default SimilarExercises;
