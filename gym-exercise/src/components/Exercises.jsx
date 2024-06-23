import { Box, Pagination, Stack, Typography } from "@mui/material";
import ExerciseCard from "./ExerciseCard";
import { useEffect, useState } from "react";
import { getExercises, getExercisesByBodyPart } from "../apis/exercises";
import Loader from "./Loader";

function Exercises({ exercises = [], setExercises = () => {}, bodyPart = "" }) {
  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPerPage = 9;
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exercises?.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );

  useEffect(() => {
    setExercises([]);
    (async () => {
      if (bodyPart?.toLowerCase() === "all") {
        const exercises_data = await getExercises();
        setExercises(exercises_data);
      } else {
        const exercises_data = await getExercisesByBodyPart(bodyPart);
        setExercises(exercises_data);
      }
    })();
  }, [bodyPart]);

  return (
    <Box
      id="exercises"
      sx={{
        mt: { lg: "110px" },
      }}
      mt={"50px"}
      p="20px"
    >
      <Typography variant="h3" mb={"46px"}>
        Showing Results
      </Typography>
      <Stack
        direction={"row"}
        sx={{ gap: { lg: "110px", xs: "50px" } }}
        flexWrap={"wrap"}
        justifyContent={"center"}
      >
        {exercises.length > 0 ? (
          currentExercises?.map((exercise, index) => (
            <ExerciseCard exercise={exercise} key={"exercise" + index} />
          ))
        ) : (
          <Loader />
        )}
      </Stack>
      <Stack mt={"100px"} alignItems={"center"}>
        {exercises?.length > 9 ? (
          <Pagination
            color="standard"
            shape="rounded"
            count={Math.ceil(Math.ceil(exercises.length) / exercisesPerPage)}
            page={currentPage}
            onChange={(e, page) => {
              setCurrentPage(page);
              window.scrollTo({
                top: 1800,
                behavior: "smooth",
              });
            }}
          />
        ) : null}
      </Stack>
    </Box>
  );
}

export default Exercises;
