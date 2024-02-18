import { useState } from "react";
import { StyledCard, StyledContainer } from "../components/containers";
import { Title } from "../components/texts";
import styled from "styled-components";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import Image from "next/image";
import ClearIcon from "@mui/icons-material/Clear";

const StyledFileUpload = styled("label")(({}) => ({
  border: "2px dashed",
  width: "275px",
  height: "45px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  alignSelf: "center",
}));

const ImageToBase64 = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectImageSrc, setSelectedImageSrc] = useState(null);
  const [base64Image, setBase64Image] = useState(null);

  const handleFileChangeEvent = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setSelectedImageSrc(URL.createObjectURL(file));
    handleConvertImageToBase64(e);
  };

  const handleConvertImageToBase64 = (event) => {
    const input = event.target;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = function (event) {
        const base64 = event.target.result;
        setBase64Image(base64);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <StyledContainer mainContainer>
      <Title center color="#000">
        Convert Image To Base64
      </Title>
      <StyledCard center>
        <div>
          {selectedImage ? (
            <StyledContainer
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  opacity: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image width="250" height="250" src={selectImageSrc} />
              </div>
              <ClearIcon
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setSelectedImageSrc(null);
                  setSelectedImage(null);
                }}
              />
              <StyledCard overflowY height="70vh">
                {base64Image ? base64Image : ""}
              </StyledCard>
            </StyledContainer>
          ) : (
            <StyledFileUpload>
              <input
                accept=".jpg, .jpeg, .png"
                type="file"
                style={{ display: "none" }}
                onChange={handleFileChangeEvent}
              />
              <DriveFolderUploadIcon style={{ color: "#240a24" }} />
              Upload File
            </StyledFileUpload>
          )}
        </div>
      </StyledCard>
    </StyledContainer>
  );
};

export default ImageToBase64;
