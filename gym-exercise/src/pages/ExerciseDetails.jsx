import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import Details from "../components/Details";
import ExerciseVideo from "../components/ExerciseVideo";
import SimilarExercises from "../components/SimilarExercises";
import { useEffect, useState } from "react";
import {
  getExerciseById,
  getExerciseByTargetMuscle,
  getExercisesByEquipment,
  getYoutubeRelatedVideo,
} from "../apis/exercises";

function ExerciseDetails() {
  const { id } = useParams();
  const [exerciseDetails, setExerciseDetails] = useState({});
  const [youtubeVideoData, setYoutubeVideoData] = useState({});
  const [targetExerciseDetails, setTargetExerciseDetails] = useState([]);
  const [equipmentExerciseDetails, setEquipmentExerciseDetails] = useState([]);

  useEffect(() => {
    setExerciseDetails({});
    setYoutubeVideoData({});
    setTargetExerciseDetails([]);
    setEquipmentExerciseDetails([]);
    (async () => {
      const exercise_details = await getExerciseById(id);
      if (Object.keys(exercise_details).length > 0) {
        setExerciseDetails(exercise_details);
        // fetch data from youtube
        const youtube_video_data = await getYoutubeRelatedVideo(
          exercise_details?.name
        );
        if (Object.keys(youtube_video_data).length > 0) {
          setYoutubeVideoData(youtube_video_data);
        } else {
          setYoutubeVideoData({});
        }

        // fetch data for similar exercises by target and equipment
        const target_exercise_details = await getExerciseByTargetMuscle(
          exercise_details?.target
        );

        if (Array.isArray(target_exercise_details)) {
          setTargetExerciseDetails(target_exercise_details);
        } else {
          setEquipmentExerciseDetails([]);
        }

        const exercise_by_equpiment = await getExercisesByEquipment(
          exercise_details?.equipment
        );

        if (Array.isArray(exercise_by_equpiment)) {
          setEquipmentExerciseDetails(exercise_by_equpiment);
        } else {
          setEquipmentExerciseDetails([]);
        }
      } else {
        setExerciseDetails({});
      }
    })();
  }, [id]);

  return (
    <Box>
      <Details exerciseDetails={exerciseDetails} />
      <ExerciseVideo
        youtubeVideoData={youtubeVideoData}
        exerciseName={exerciseDetails?.name}
      />
      <SimilarExercises
        targetExerciseDetails={targetExerciseDetails}
        equipmentExerciseDetails={equipmentExerciseDetails}
      />
    </Box>
  );
}

export default ExerciseDetails;
