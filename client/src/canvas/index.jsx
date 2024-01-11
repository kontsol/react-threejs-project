import {Canvas} from "@react-three/fiber";
import {Environment, Center} from "@react-three/drei";
// Βιβλιοθήκες που χρησιμοποιουνται για 3D γραφικα και animations
// Canvas ειναι το main container for 3D scene
// Enviroment  used for setting up realistic lighting and background
// Center χρησιμοποειται για Positioning

import Shirt from "./Shirt";
import CameraRig from "./CameraRig";
import Backdrop from "./Backdrop";

const CanvasModel = () => {
  return (
    <Canvas
      shadows
      camera={{position: [0, 0, 0], fov: 25}} //το μεγεθος της μπλουζας
      gl={{preserveDrawingBuffer: true}}
      className="w-full max-w-full h-full transition-all ease-in"
    >
      <ambientLight intensity={0.5} />
      <Environment preset="city" />
      {/*  Προσθετει το effect σε ολο το screen*/}
      <CameraRig>
        <Backdrop /> {/* υπευθυνο για τα χρωματα στο shirt */}
        <Center>
          <Shirt />
        </Center>
      </CameraRig>
    </Canvas>
  );
};

export default CanvasModel;
