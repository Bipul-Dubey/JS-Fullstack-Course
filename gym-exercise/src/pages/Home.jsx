import { Box } from "@mui/material";
import HeroBanner from "../components/HeroBanner";
import SearchExercises from "../components/SearchExercises";
import Exercises from "../components/Exercises";
import { useState } from "react";

const Home = () => {
  const [exercises, setExercises] = useState([]);
  const [bodyParts, setBodyParts] = useState(["All"]);
  const [bodyPart, setBodyPart] = useState("All");

  return (
    <Box>
      <HeroBanner />
      <SearchExercises
        exercises={exercises}
        setExercises={setExercises}
        bodyParts={bodyParts}
        setBodyParts={setBodyParts}
        bodyPart={bodyPart}
        setBodyPart={setBodyPart}
      />
      <Exercises
        exercises={exercises}
        setExercises={setExercises}
        bodyParts={bodyParts}
        setBodyParts={setBodyParts}
        bodyPart={bodyPart}
        setBodyPart={setBodyPart}
      />
    </Box>
  );
};

export default Home;
