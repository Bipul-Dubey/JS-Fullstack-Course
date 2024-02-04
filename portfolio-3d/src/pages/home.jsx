import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import Loader from "../components/loader";
import { Island } from "../models/island";
import Sky from "../models/sky";
import Plane from "../models/plane";
import Bird from "../models/bird";
import HomeInfo from "../components/homeInfo";

const Home = () => {
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
    if (window.innerHeight < 768) {
      screenScale = [-1, 1, 1];
      screenPosition = [1, 2.2, 0];
    } else {
      screenScale = [-2, 2, 2];
      screenPosition = [2, 4, 0];
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
            rotation={[0, 200, 0]}
          />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default Home;
