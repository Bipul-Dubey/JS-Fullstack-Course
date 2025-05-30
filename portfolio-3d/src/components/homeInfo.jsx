import React from "react";
import { Link } from "react-router-dom";
import { arrow } from "../assets/icons/index";

const InfoBox = ({ text, link, btnText }) => (
  <div className="info-box">
    <p>{text}</p>
    <Link to={link} className="neo-brutalism-white neo-btn">
      {btnText}
      <img src={arrow} className="w-4 h-4 object-contain" />
    </Link>
  </div>
);

const renderContent = {
  1: (
    <h1
      className="sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8
    text-white mx-5"
    >
      Hi, I am <span className="font-semibold">Bipul</span>👋
      <br />
      Associate Software Engineer
    </h1>
  ),
  2: (
    <InfoBox
      text="Working with a startup as Associate Software Engineer at position of UI engineer."
      link="/about"
      btnText="Know more about me..."
    />
  ),
  3: (
    <InfoBox
      text="Done multiple projects to succes over the years. Curious to know about impact?"
      link="/projects"
      btnText="Visit my portfolio..."
    />
  ),
  4: (
    <InfoBox
      text="Need a project done or looking for a dev? I'm just a few keystrokes away"
      link="/about"
      btnText="Let's talk..."
    />
  ),
};

const HomeInfo = ({ currentStage }) => {
  return renderContent[currentStage] || null;
};

export default HomeInfo;
