import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getBodyParts, getExercises } from "../apis/exercises";
import HorizontalScrollBar from "./HorizontalScrollBar";

function SearchExercises({
  exercises = [],
  setExercises = () => {},
  bodyParts = [],
  setBodyParts = () => {},
  bodyPart = "",
  setBodyPart = () => {},
}) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    (async () => {
      const body_parts = await getBodyParts();
      setBodyParts(["All", ...body_parts]);
    })();
  }, []);

  const handleGetExercises = async () => {
    if (!search) return;
    setExercises([]);
    const exercises_data = await getExercises();
    const searchedData = exercises_data?.filter(
      (exercise) =>
        exercise.name.toLowerCase().includes(search.toLowerCase()) ||
        exercise.target.toLowerCase().includes(search.toLowerCase()) ||
        exercise.equipment.toLowerCase().includes(search.toLowerCase()) ||
        exercise.bodyPart.toLowerCase().includes(search.toLowerCase())
    );

    setExercises(searchedData);
    setSearch("");
  };

  return (
    <Stack
      alignContent={"center"}
      mt={"37px"}
      justifyContent={"center"}
      p={"20px"}
    >
      <Typography
        fontWeight={700}
        sx={{
          fontSize: { lg: "44px", xs: "30px" },
        }}
        mb={"50px"}
        textAlign={"center"}
      >
        Awesome Exercises You <br /> Should know
      </Typography>
      <Box position={"relative"} mb={"72px"} display={"flex"} gap={1}>
        <TextField
          sx={{
            width: "100%",
            input: {
              fontWeight: 700,
              border: "none",
              borderRadius: "4px",
            },
            backgroundColor: "#fff",
            borderRadius: "40px",
          }}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="Search Exercise"
          type="text"
        />
        <Button
          className="search-btn"
          sx={{
            bgcolor: "#ff2625",
            color: "#fff",
            textTransform: "none",
            padding: "7px 30px",
          }}
          size="large"
          onClick={handleGetExercises}
        >
          Search
        </Button>
      </Box>
      <Box sx={{ position: "relative", width: "100%", p: "20px" }}>
        <HorizontalScrollBar
          bodyParts={bodyParts}
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}
        ></HorizontalScrollBar>
      </Box>
    </Stack>
  );
}

export default SearchExercises;
