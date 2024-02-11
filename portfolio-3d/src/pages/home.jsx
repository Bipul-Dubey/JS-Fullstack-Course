import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import Loader from "../components/loader";
import { Island } from "../models/island";
import Sky from "../models/sky";
import Plane from "../models/plane";
import Bird from "../models/bird";
import HomeInfo from "../components/homeInfo";
import onePieceSound from "../assets/one_piece_gear_5.mp3";
import { soundoff, soundon } from "../assets/icons";

const Home = () => {
  // audio setup
  const audioRef = useRef(new Audio(onePieceSound));
  audioRef.current.volume = 0.4;
  audioRef.current.loop = true;
  const [isPlayingMusic, setIsPlayingMusic] = useState(true);

  useEffect(() => {
    if (!isPlayingMusic) {
      audioRef.current.play();
      return;
    } else {
      audioRef.current.pause();
    }
  }, [isPlayingMusic]);

  // states
  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);

  const adjustIslandForScreenSize = () => {
    let screenScale = null;
    let screenPostion = [0, -6.5, -43];
    let rotationPosition = [0.1, 4.7, 0];
    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
    } else {
      screenScale = [1, 1, 1];
    }

    return [screenScale, screenPostion, rotationPosition];
  };

  const [islandScale, islandPosition, islandRotation] =
    adjustIslandForScreenSize();

  // adjust plane positions
  const ajustPlaneForScreenSize = () => {
    let screenScale, screenPosition;
    // screenScale = [x, y, z];
    // screenPosition = [z, y, z];

    if (window.innerHeight < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, -4];
    }
    return [screenScale, screenPosition];
  };

  const [planeScale, planePosition] = ajustPlaneForScreenSize();

  return (
    <section className="w-full h-screen relative">
      <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
        {currentStage && <HomeInfo currentStage={currentStage} />}
      </div>
      <Canvas
        className={`w-full h-screen bg-transparent ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          {/* refer to light comes from sun */}
          <directionalLight position={[1, 1, 1]} intensity={2} />
          {/* light on each object equal without casting shadow */}
          <ambientLight intensity={0.5} />
          {/* emit light from all direction to a single point */}
          {/* <pointLight /> */}
          {/* colors of areas */}
          <hemisphereLight groundColor="#000000" />
          <Sky isRotating={isRotating} />
          <Bird />
          <Island
            position={islandPosition}
            scale={islandScale}
            rotation={islandRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
            currentFocusPoint={[]}
          />
          <Plane
            isRotating={isRotating}
            scale={planeScale}
            position={planePosition}
            rotation={[0, 20, 0]}
          />
        </Suspense>
      </Canvas>
      <div className="absolute bottom-2 left-2">
        <img
          src={!isPlayingMusic ? soundoff : soundon}
          alt="sound-button"
          className="w-10 h-10 cursor-pointer object-contain"
          onClick={() => {
            setIsPlayingMusic(!isPlayingMusic);
          }}
        />
      </div>
    </section>
  );
};

export default Home;
