import React from "react";
import {easing} from "maath";
// ελεγχει την τιμη του animation που θα αλλαζει
import {useSnapshot} from "valtio";
// για το state
import {useFrame} from "@react-three/fiber";
import {Decal, useGLTF, useTexture} from "@react-three/drei";
// Decal: adding some kind of texture (3D Object)
// useGLTF: to be able to use the 3d model
// useTexture: to be able to apply and load the 3D texture

import state from "../store";

const Shirt = () => {
  const snap = useSnapshot(state);
  // Import 3D model
  const {nodes, materials} = useGLTF("/shirt_baked.glb"); //path του 3d model

  // Create two textures that will apply to that shirt
  const logoTexture = useTexture(snap.logoDecal); //απο state
  const fullTexture = useTexture(snap.fullDecal);

  //Για την ενημερωση χρωματος του αντικειμενου με την παροδο του χρονου
  //useFrame για τον χειρισμο ενημερωσεων ανα καρε σε μια 3d σκηνη
  useFrame((state, delta) =>
    easing.dampC(materials.lambert1.color, snap.color, 0.25, delta)
  );

  const stateString = JSON.stringify(state); //μετατρεπει την τιμη σε συμβολοσειρα JSON, αυτο γινεται γιατι καποιες φορες δεν γινονταν update στο shirt

  return (
    // μεσα στο group θα εμφανιστει το tshirt
    <group key={stateString}>
      {/* group container της three.js που χρησιμοποιειται για 3d models */}
      <mesh
        // mesh χρησιμοποιειται για να παρουσιασει τα 3d model
        castShadow //θα βαζει shadow στο tshirt, και τα υπολοιπα αντικειμενα απο πισω θα ειναι με σκια
        geometry={nodes.T_Shirt_male.geometry} //εφαρμοζει την γεωμετρια του mesh
        material={materials.lambert1} //πως η επιφανεια του mesh θα εμφανιζεται στο φως
        material-roughness={1} //ποσο γυαλιστερη θα φαινεται η επιφανεια
        dispose={null} //καμια δραση οταν το αντικειμενο πχ μπορει να αφαιρεθει απο τη σκηνη
      >
        {snap.isFullTexture && ( //ειναι ενα icon που βρισκεται πανω στο shirt και πιανει ολο το shirt
          // Το decal ειναι τα icon που θα βρισκονται πανω στο shirt
          <Decal
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
          />
        )}

        {snap.isLogoTexture && (
          <Decal
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture} //by default ειναι true και εμφανιζει ενα icon στο shirt
            // map-anisotropy={16}
            depthTest={false}
            depthWrite={true}
          />
        )}
      </mesh>
    </group>
  );
};

export default Shirt;
