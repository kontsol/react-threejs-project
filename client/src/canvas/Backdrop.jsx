import React, {useRef} from "react";
import {easing} from "maath";
import {useFrame} from "@react-three/fiber";
import {AccumulativeShadows, RandomizedLight} from "@react-three/drei";

// Το backdrop θα ειναι το χρωμα πανω στο μπλουζακι
const Backdrop = () => {
  const shadows = useRef();

  return (
    //temporal για smooth ακρες του shadow
    <AccumulativeShadows
      ref={shadows}
      frames={60}
      temporal
      alphaTest={0.4}
      scale={10}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -0.14]}
    >
      <RandomizedLight
        amount={3}
        radius={9}
        intensity={0.75}
        ambient={0.55}
        position={[5, 5, -10]}
      />
      <RandomizedLight
        amount={4}
        radius={5}
        intensity={0.55}
        ambient={0.55}
        position={[-5, 5, -9]}
      />
    </AccumulativeShadows>
  );
};

export default Backdrop;
