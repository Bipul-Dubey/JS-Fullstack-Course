import { SearchOutlined } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import styled from "styled-components";

export const StyledTextField = styled(TextField)(
  ({
    bg = "white",
    padding = "10px",
    borderRadius = "27px",
    center,
    end,
    margin = "",
  }) => ({
    alignSelf: end ? "end" : center ? "center" : "start",
    backgroundColor: bg,
    "& .MuiInputBase-input": {
      padding: padding,
    },
    borderRadius: borderRadius,
    "& .MuiInputLabel-root": {
      transform: "translate(14px, 10px) scale(1)",
    },
    "& .MuiInputLabel-shrink": {
      transform: "translate(14px, -6px) scale(0.75)",
    },
    "& .MuiInputBase-root": {
      borderRadius: "inherit",
    },
    margin: margin,
  })
);

export const SearchBox = ({
  center = false,
  end = false,
  onSearchClick = () => {},
  onChange = () => {},
  label = "Search",
  borderRadius = "27px",
  margin = "",
}) => {
  return (
    <StyledTextField
      margin={margin}
      borderRadius={borderRadius}
      label={label}
      center={center}
      end={end}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton>
              <SearchOutlined
                style={{ color: "black" }}
                onClick={onSearchClick}
              />
            </IconButton>
          </InputAdornment>
        ),
      }}
      onChange={onChange}
    />
  );
};
