import { Stack, Typography } from "@mui/material";
import Dumbbell from "../assets/icons/gym.png";

function BodyPart({ bodyPart = "", setBodyPart = () => {}, item = "" }) {
  return (
    <Stack
      type="button"
      alignItems={"center"}
      justifyContent={"center"}
      className="bodyPart-card"
      sx={{
        borderTop:
          bodyPart?.toLowerCase() == item?.toLowerCase()
            ? "2px solid #ff2625"
            : "",
        backgroundColor: "#fff",
        borderBottomLeftRadius: "20px",
        width: "270px",
        height: "280px",
        cursor: "pointer",
        gap: "47px",
      }}
      onClick={() => {
        setBodyPart(item);
        window.scrollTo({
          top: 1800,
          left: 100,
          behavior: "smooth",
        });
      }}
    >
      <img
        src={Dumbbell}
        alt="dumbbell"
        style={{
          width: "40px",
          height: "40px",
        }}
      />
      <Typography
        fontSize={"24px"}
        textTransform={"capitalize"}
        fontWeight={"bold"}
        color={"#3a1212"}
      >
        {item}
      </Typography>
    </Stack>
  );
}

export default BodyPart;
