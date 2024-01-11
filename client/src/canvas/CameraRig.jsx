import React, {useRef} from "react";
import {useFrame} from "@react-three/fiber";
import {easing} from "maath";
import {useSnapshot} from "valtio";

import state from "../store";

// Το CameraRig χρησιμοποιειται για την κινηση με το ποντικι της μπλουζας

// Positioning of the camera
// children components ειναι οτι βρισκεται μεσα (backdrop, children)
const CameraRig = ({children}) => {
  // move camera closer
  const group = useRef();
  const snap = useSnapshot(state);

  useFrame((state, delta) => {
    // useFrame χρησιμοποιειται για την αποδοση του frame σε μια 3d σκηνη
    const isBreakpoint = window.innerWidth <= 1260; //εαν πλατος παραθυρου ειναι μικροτερο του 1260
    const isMobile = window.innerWidth <= 600;

    // Set the initial position of the
    let targetPosition = [-0.4, 0, 2]; //προεπιλεγμενη θεση 3d
    // οι τιμες μεσα στον πινακα ειναι για x,y,z, αν θελαμε να ηταν στο κεντρο θα ηταν [0,0,0], αν το χ ειναι αρνητικο θα μπει στο προς τα κατω του αξονα x
    if (snap.intro) {
      //το intro που ειναι το homepage
      if (isBreakpoint) targetPosition = [0, 0, 2];
      if (isMobile) targetPosition = [0, 0.2, 2.5];
    } else {
      if (isMobile) targetPosition = [0, 0, 2.5];
      else targetPosition = [0, 0, 2];
    }

    // Oι damp χρησιμοποιουνται συνηθως για animations και smooth

    // Set model camera position
    easing.damp3(state.camera.position, targetPosition, 0.25, delta);
    // 0.25 smooth time

    // Set the model rotation smoothly
    easing.dampE(
      group.current.rotation, //αναφέρεται στην ιδιότητα περιστροφής ενός τρισδιάστατου αντικειμένου
      // group.current αντιπροσωπεύει την τρέχουσα κατάσταση ενός τρισδιάστατου αντικειμένου

      [state.pointer.y / 10, -state.pointer.x / 5, 0],
      0.25,
      delta
    );
  });

  return <group ref={group}>{children}</group>;
};

export default CameraRig;
