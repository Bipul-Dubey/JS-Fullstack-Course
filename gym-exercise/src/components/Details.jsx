import { Button, Stack, Typography } from "@mui/material";
import React from "react";

import BodyPartImage from "../assets/icons/body-part.png";
import TargetImage from "../assets/icons/target.png";
import EquipmentImage from "../assets/icons/equipment.png";

function Details({ exerciseDetails = {} }) {
  const { bodyPart, gifUrl, name, target, equipment } = exerciseDetails;
  const extraDetails = [
    {
      icon: BodyPartImage,
      name: bodyPart,
    },
    {
      icon: TargetImage,
      name: target,
    },
    {
      icon: EquipmentImage,
      name: equipment,
    },
  ];

  return (
    <Stack
      gap={"60px"}
      sx={{ flexDirection: { lg: "row" }, p: "20px", alignItems: "center" }}
    >
      <img src={gifUrl} className="details-image" loading="lazy" alt={name} />
      <Stack sx={{ gap: { lg: "35px", xs: "20px" } }}>
        <Typography variant="h3">{name}</Typography>
        <Typography variant="h6">
          Exercises keep you strong. {name} is one of the best to target your{" "}
          {target}. It will help you improve your mood and gain energy
        </Typography>
        {extraDetails.map((detail, index) => (
          <Stack
            key={detail.name}
            direction={"row"}
            gap="24px"
            alignItems={"center"}
          >
            <Button
              sx={{
                background: "#fff2db",
                borderRadius: "50%",
                width: "100px",
                height: "100px",
              }}
            >
              <img
                style={{ width: "50px", height: "50px" }}
                src={detail.icon}
                alt={detail.name}
                loading="lazy"
              />
            </Button>
            <Typography textTransform={"capitalize"} variant="h5">
              {detail.name}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}

export default Details;
