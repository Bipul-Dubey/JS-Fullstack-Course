import React, { useEffect, useState } from "react";
import styled from "styled-components";
import moment from "moment";

const Phone = styled.div`
  width: 280px;
  height: 600px;
  background-color: #f1ede5;
  border-radius: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const TopBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: #018069;
`;

const TopBar = styled.div`
  background-color: #018069;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 15px 4px 15px;
  border-bottom: 1px solid #e0e0e0;
`;

const Notch = styled.div`
  height: 24px;
  background-color: #000;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  width: 40%;
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Messages = styled.div`
  padding: 20px 15px;
  overflow-y: auto;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Message = styled.div`
  max-width: 80%;
  word-wrap: break-word;
  padding: 10px 15px;
  border-radius: 7px;
  font-size: 14px;
  line-height: 1.4;
  background-color: ${({ sent }) => (sent ? "#dedede" : "#fff")};
  color: ${({ sent }) => (sent ? "#ffffff" : "#000000")};
  align-self: ${({ sent }) => (sent ? "flex-end" : "flex-start")};
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    ${({ sent }) =>
      sent
        ? `
      right: -7px;
      border-left: 13px solid #dedede;

    `
        : `
      left: -6px;
      border-right: 10px solid #fff;
    `}
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
  }
`;

const CameraLens = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(0, 0, 0, 1) 0%,
    #555454 40%,
    rgba(0, 0, 0, 1) 100%
  );
  box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(0, 0, 0, 0.5);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InnerLens = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(30, 30, 30, 1) 0%,
    #0f1c28 60%,
    rgba(0, 0, 0, 1) 100%
  );
  box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.7);
`;

const CameraComponent = () => {
  return (
    <CameraLens>
      <InnerLens />
    </CameraLens>
  );
};

const Speaker = styled.div`
  width: 50px;
  padding: 2px;
  margin-right: 5px;
  border-radius: 27px;
  background-color: #131313;
`;

const SideButton = styled.div`
  width: 5px;
  height: 30px;
  background-color: #000;
  border-radius: 3px;
  position: absolute;
`;

const VolumeButton = styled(SideButton)`
  left: -8px;
  top: 100px;
`;

const PowerButton = styled(SideButton)`
  right: -8px;
  top: 180px;
  height: 50px; /* Power button is usually longer */
`;

const MuteButton = styled(SideButton)`
  left: -8px;
  top: 70px;
  height: 15px; /* Mute button is usually smaller */
`;

export const WhatsAppChat = ({ messageList = [] }) => {
  const [currentTime, setCurrentTime] = useState(moment().format("HH:mm"));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(moment().format("HH:mm"));
    }, 30000); // update every 30 seconds

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "grey",
      }}
    >
      <div
        style={{
          padding: "2.5px",
          backgroundColor: "#A9A9AA",
          borderRadius: "30px",
        }}
      >
        <div
          style={{
            padding: "5px",
            backgroundColor: "#000",
            borderRadius: "30px",
          }}
        >
          <Phone>
            <VolumeButton />
            <MuteButton />
            <PowerButton />
            <TopBarContainer>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  gap: "1px",
                  paddingLeft: "10px",
                }}
              >
                <div style={{ color: "#fff" }}>{currentTime}</div>
                <Notch>
                  <Speaker />
                  <CameraComponent />
                </Notch>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "0.3px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "15px",
                      color: "#fff",
                    }}
                  >
                    📶
                  </div>
                  <div
                    style={{
                      fontSize: "15px",
                      color: "#fff",
                    }}
                  >
                    📶
                  </div>
                  <div
                    style={{
                      fontSize: "15px",
                      color: "#fff",
                      transform: "rotate(90deg)",
                    }}
                  >
                    🔋
                  </div>
                </div>
              </div>
              <TopBar>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1px",
                  }}
                >
                  <div style={{ color: "#fff" }}>⬅️</div>
                  <TitleContainer>
                    <img
                      src="/profileIMG.svg"
                      alt="Profile"
                      style={{ width: "40px", height: "40px" }}
                    />
                    <div style={{ color: "#fff" }}>TYP</div>
                  </TitleContainer>
                </div>
                <div style={{ color: "#fff" }}>⋮</div>
              </TopBar>
            </TopBarContainer>
            <Messages>
              {messageList?.map((msg, index) => (
                <Message key={index} sent={msg?.sent}>
                  {msg?.message}
                </Message>
              ))}
            </Messages>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 15px",
                width: "100%",
                flexDirection: "row",
              }}
            >
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  backgroundColor: "#fff",
                  borderRadius: "24.1px",
                  alignItems: "center",
                  padding: "5px",
                }}
              >
                <div style={{ marginLeft: "5px" }}>😊</div>
                <input
                  type="text"
                  style={{
                    border: "none",
                    flex: 1,
                    marginLeft: "10px",
                    outline: "none",
                  }}
                  disabled
                />
                <div style={{ marginRight: "5px" }}>📎</div>
                <div style={{ marginRight: "5px" }}>📷</div>
              </div>
              <div
                style={{
                  backgroundColor: "#018069",
                  padding: "0.7px",
                  borderRadius: "24.1px",
                  marginLeft: "5px",
                  color: "#fff",
                }}
              >
                🎤
              </div>
            </div>
          </Phone>
        </div>
      </div>
    </div>
  );
};
