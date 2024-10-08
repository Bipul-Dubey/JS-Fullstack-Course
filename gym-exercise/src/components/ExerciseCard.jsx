import { Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function ExerciseCard({ exercise = {} }) {
  return (
    <Link className="exercise-card" to={`/exercise/${exercise?.id}`}>
      <img src={exercise?.gifUrl} alt={exercise?.name} loading="lazy" />
      <Stack direction={"row"}>
        <Button
          sx={{
            ml: "21px",
            color: "#fff",
            backgroundColor: "#ffa9a9",
            textTransform: "capitalize",
            fontSize: "14px",
            borderRadius: "20px",
          }}
        >
          {exercise?.bodyPart}
        </Button>
        <Button
          sx={{
            ml: "21px",
            color: "#fff",
            backgroundColor: "#ffa9a9",
            textTransform: "capitalize",
            fontSize: "14px",
            borderRadius: "20px",
          }}
        >
          {exercise?.target}
        </Button>
      </Stack>
      <Typography
        ml={"21px"}
        color={"#000"}
        textTransform={"capitalize"}
        fontWeight={"bold"}
        mt={"11px"}
        pb={"10px"}
        fontSize={"24px"}
      >
        {exercise?.name}
      </Typography>
    </Link>
  );
}

export default ExerciseCard;
