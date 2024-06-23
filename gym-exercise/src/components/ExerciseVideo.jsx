import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import ScrollBar from "./scrollBar";
import Loader from "./Loader";

function ExerciseVideo({ youtubeVideoData = {}, exerciseName }) {
  const exerciseVideos = youtubeVideoData?.contents?.flatMap(
    (video) => video?.video
  );

  return (
    <Box>
      <Typography variant="h4" mb={"33px"}>
        Watch{" "}
        <span style={{ color: "#ff2625", textTransform: "capitalize" }}>
          {exerciseName}
        </span>{" "}
        exercise videos.
      </Typography>
      <Stack>
        {exerciseVideos?.length > 0 ? (
          <ScrollBar>
            {exerciseVideos?.map((video, index) => (
              <a
                style={{
                  margin: "0 40px",
                  backgroundColor: "#eadada",
                  padding: "7px",
                  borderRadius: "10px",
                  maxHeight: "fit-content",
                }}
                key={index}
                className="exercise-video"
                target="_blank"
                rel="noreferrer"
                href={`https://www.youtube.com/watch?v=${video?.videoId}`}
                itemId={video?.videoId}
              >
                <img src={video?.thumbnails?.at(0)?.url} alt={video?.title} />
                <Box>
                  <Typography variant="h6" color={"#000"}>
                    {video?.title}
                  </Typography>
                  <Typography variant="p" color={"#7b7a7a"}>
                    {video?.channelName}
                  </Typography>
                </Box>
              </a>
            ))}
          </ScrollBar>
        ) : (
          <Loader />
        )}
      </Stack>
    </Box>
  );
}

export default ExerciseVideo;
