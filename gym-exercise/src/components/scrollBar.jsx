import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import RightArrowIcon from "../assets/icons/right-arrow.png";
import LeftArrowIcon from "../assets/icons/left-arrow.png";
import { Stack, Typography } from "@mui/material";
import { useContext } from "react";

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

function ScrollBar({ children }) {
  return (
    <Stack direction={"row"} sx={{ p: "2", position: "relative" }}>
      <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
        {children}
      </ScrollMenu>
    </Stack>
  );
}

export default ScrollBar;
