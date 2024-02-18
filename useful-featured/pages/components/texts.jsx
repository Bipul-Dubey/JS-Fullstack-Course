import styled from "styled-components";

export const Title = styled("div")(
  ({
    type = "title",
    color = "white",
    bold,
    capitalize,
    center,
    link,
    dotted,
    uppercase,
    end,
  }) => ({
    color: color,
    fontSize:
      type === "title"
        ? 32
        : type === "h1"
        ? 28
        : type === "h2"
        ? 24
        : type === "h3"
        ? 20
        : type === "h4"
        ? 16
        : type === "h5"
        ? 14
        : type === "h6"
        ? 12
        : 14,
    lineHeight:
      type === "title"
        ? "40px"
        : type === "h1"
        ? "36px"
        : type === "h2"
        ? "32px"
        : type === "h3"
        ? "28px"
        : type === "h4"
        ? "24px"
        : type === "h5"
        ? "20px"
        : type === "h6"
        ? "16px"
        : "22px",
    fontWeight: bold || link ? "bold" : "normal",
    textTransform: capitalize ? "capitalize" : uppercase ? "uppercase" : "none",
    textAlign: center ? "center" : end ? "right" : "left",
    textDecoration: link ? "underline" : "none",
    textDecorationStyle: dotted ? "dotted" : "none",
    cursor: link ? "pointer" : "default",
  })
);
