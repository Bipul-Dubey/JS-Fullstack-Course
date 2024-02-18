import { Card } from "@mui/material";
import styled from "styled-components";

export const StyledContainer = styled("div")(({ mainContainer }) => ({
  width: "100%",
  height: "93.4vh",
  backgroundColor: mainContainer ? "#e3fbb2" : "#fff",
  display: "flex",
  flexDirection: "column",
}));

export const StyledCard = styled(Card)(
  ({ width = "", height = "80vh", center, end, overflowY }) => ({
    width: "75%",
    height: height,
    alignSelf: center ? (end ? "flex-end" : "center") : "",
    padding: "7px",
    display: "flex",
    flexDirection: "column",
    overflowY: overflowY ? "auto" : "",
    wordBreak: "break-word",
  })
);
