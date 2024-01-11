import {proxy} from "valtio";
// Valtio ειναι global state

const state = proxy({
  //data
  // proxy ειναι ενα αντικειμενο που εχει μεσα state αντικειμενα (data)
  // χρησιμοποιειται σαν γεφυρα μεταξυ state και component
  // το proxy παρακολουθει τα αντικειμενα του object αν θα αλλαξει οι τιμη τους
  //οταν ενα component θελει να διαβασει ή να τροποποιηση το state επικοινωνει με το proxy

  // Παραδειγμα ενα ToDo App
  // Το state ταξινομει τα tasks
  // proxy ειναι υπευθυνο για την διαχειρηση του state
  // τα component χρησιμοποιουν τα tasks απο το state και προσθετουν ή αφαιρουν και νεα tasks

  intro: true, //check if we are in home page or not
  color: "#EFBD48",
  isLogoTexture: true, //are we currently displaying the logo on our shirt
  isFullTexture: false,
  logoDecal: "./threejs.png",
  fullDecal: "./threejs.png", //βρισκεται μεσα στο φακελο public
});

export default state;
