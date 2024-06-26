import { Box, Typography } from "@mui/material";
import React, { useContext } from "react";
import BodyPart from "./BodyPart";
import ExerciseCard from "./ExerciseCard";

import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import RightArrowIcon from "../assets/icons/right-arrow.png";
import LeftArrowIcon from "../assets/icons/left-arrow.png";

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);

  return (
    <Typography
      onClick={() => {
        scrollPrev();
      }}
      className="right-arrow"
    >
      <img src={LeftArrowIcon} alt="left-arrow" />
    </Typography>
  );
};

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <Typography onClick={() => scrollNext()} className="left-arrow">
      <img src={RightArrowIcon} alt="right-arrow" />
    </Typography>
  );
};

function HorizontalScrollBar({
  bodyParts = [],
  bodyPart = "",
  setBodyPart = () => {},
  isBodyPart = true,
}) {
  return (
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
      {bodyParts.map((item, index) => (
        <Box key={item.id || item} itemId={item.id || item} m={"0 40px"}>
          {isBodyPart ? (
            <BodyPart
              bodyPart={bodyPart}
              setBodyPart={setBodyPart}
              item={item}
            />
          ) : (
            <ExerciseCard exercise={item} />
          )}
        </Box>
      ))}
    </ScrollMenu>
  );
}

export default HorizontalScrollBar;
