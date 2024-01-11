import React from "react";
import state from "../store"; //το state περιεχει το color του button
import {useSnapshot} from "valtio";
import {getContrastingColor} from "../config/helpers";

const CustomButton = ({title, type, customStyles, handleClick}) => {
  const snap = useSnapshot(state); //για να παρουμε το color

  const generateStyle = (type) => {
    if (type === "filled") {
      return {
        backgroundColor: snap.color,
        color: getContrastingColor(snap.color), //αλλαζει το χρωμα γραμματων απο το buttton go back, αναλογα με το χρωμα που εχουμε επιλεξει
      };
    } else if (type === "outline") {
      return {
        borderWidth: "1px",
        borderColor: snap.color,
        color: snap.color,
      };
    }
  };

  return (
    <button
      className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`}
      style={generateStyle(type)}
      onClick={handleClick} //κανοντας κλικ θα φυγει απο το intro , γιατι με κλικ state.intro = false
    >
      {title}
    </button>
  );
};

export default CustomButton;
