import React, { useState } from "react";
import styled from "styled-components";
import { SearchBox } from "../components/textField";
import { Card, List, ListItem, ListItemText } from "@mui/material";
import { featuresWithPath } from "@/contants";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useRouter } from "next/router";
import { StyledCard, StyledContainer } from "../components/containers";

const FeaturesPage = () => {
  const router = useRouter();

  const [searchText, setSearchText] = useState("");
  return (
    <StyledContainer>
      <SearchBox
        borderRadius="12px"
        end
        margin="10px"
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
      />
      <StyledCard>
        <List>
          {featuresWithPath
            ?.filter((val) => {
              const lowerCaseSearchText = searchText?.toLowerCase();
              if (lowerCaseSearchText === "") return true;
              else {
                const lowerCaseDescription = val?.description?.toLowerCase();
                const lowerCaseFeatureName = val?.featureName?.toLowerCase();

                return (
                  lowerCaseDescription.includes(lowerCaseSearchText) ||
                  lowerCaseFeatureName.includes(lowerCaseSearchText)
                );
              }
            })
            ?.map((feature, index) => (
              <>
                <ListItem
                  key={feature.path}
                  secondaryAction={
                    <ArrowForwardIcon
                      style={{
                        cursor: "pointer",
                        color: "#236de5",
                        fontWeight: "bold",
                        fontSize: "26px",
                      }}
                      onClick={() => {
                        router.push(feature.path);
                      }}
                    />
                  }
                >
                  <ListItemText
                    primary={feature?.featureName}
                    secondary={feature?.description}
                  />
                </ListItem>
                {featuresWithPath?.length - 1 == index ? null : <hr />}
              </>
            ))}
        </List>
      </StyledCard>
    </StyledContainer>
  );
};

export default FeaturesPage;
