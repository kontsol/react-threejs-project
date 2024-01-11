import React, {useState, useEffect} from "react";
import {motion, AnimatePresence} from "framer-motion"; //animation library of react
import {useSnapshot} from "valtio";

import config from "../config/config";
import state from "../store"; //επειδη ειναι μονος φακελος μπαινει ετσι αντι /store/index.js
import {download} from "../assets";
import {downloadCanvasToImage, reader} from "../config/helpers";
import {EditorTabs, FilterTabs, DecalTypes} from "../config/constants";
import {fadeAnimation, slideAnimation} from "../config/motion";

import {
  CustomButton,
  AIPicker,
  FilePicker,
  Tab,
  ColorPicker,
} from "../component";

// Main Part of Application
const Customizer = () => {
  const snap = useSnapshot(state);

  const [file, setFile] = useState("");
  const [prompt, setPrompt] = useState("");
  const [generatingImg, setGeneratingImg] = useState(false);

  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });

  //Show tab content depending on the activeTab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />;
      case "filepicker":
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />;
      case "aipicker":
        return (
          <AIPicker
            prompt={prompt}
            setPrompt={setPrompt}
            generatingImg={generatingImg}
            handleSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  const handleSubmit = async (type) => {
    if (!prompt) {
      return alert("Please enter a prompt: ");
    }
    try {
      // Call our backend to generate an ai image
      setGeneratingImg(true);
      const response = await fetch("http://localhost:8080/api/v1/dalle", {
        method: "POST",
        // passing prompt
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({prompt}),
      });

      const data = await response.json();
      // handleDecals(type, `data:image/png;base64,${data.photo}`); //thats how image render
      if (data && data.photo) {
        handleDecals(type, `data:image/png;base64,${data.photo}`);
      } else {
        console.error("Error: Photo data is missing or undefined");
        console.log("Data object:", data);

        // Handle the error condition, display an error message to the user
      }
    } catch {
      alert(error);
    } finally {
      setGeneratingImg(false);
      setActiveEditorTab("");
    }
  };

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];
    // κανουμε update logoDecal, FullDecal απο το state
    state[decalType.stateProperty] = result;

    // if decal is currently active
    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isFullTexture = true;
        state.isLogoTexture = false;
    }

    // After setting the state, activeFilterTab is updated
    setActiveFilterTab((prevState) => {
      return {
        ...prevState, //Aντιγραφη ολου του προηγουμενου state
        [tabName]: !prevState[tabName],
        // toggle it on and off
      };
    });
  };

  const readFile = (type) => {
    // διαβασε αρχειο -> αποτελεσμα του αρχειου -> προωθησει του αρχειου στο decals του shirt αναλογα του τυπου του αρχειου
    reader(file).then((result) => {
      handleDecals(type, result);
      setActiveEditorTab("");
    });
  };

  return (
    <AnimatePresence>
      {/* true by default, πατωντας το button στο home γινεται false, !false */}
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation("left")}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {/* Το αριστερο κομματι του tab */}
                {EditorTabs.map((tab) => (
                  //το editortabs περιεχει 3 αντικεμενα που εχουν name,icon
                  // θα εμφανισει 3 φορες το περιεχομενο του Tab
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))}

                {generateTabContent()}
              </div>
            </div>
          </motion.div>
          <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <CustomButton
              type="filled"
              title="Go Back"
              handleClick={() => {
                state.intro = true;
              }}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>

          <motion.div
            className="filtertabs-container"
            {...slideAnimation("up")}
          >
            {/* χειριζεται το on,off κατω icon, θα προσθετο-αφαιρει τα icon πανω στην μπλουζα */}
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => {
                  handleActiveFilterTab(tab.name);
                }}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
