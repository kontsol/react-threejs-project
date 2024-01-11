import {motion, AnimatePresence} from "framer-motion"; //animation library of react
import {useSnapshot} from "valtio";
import state from "../store";
import CustomButton from "../component/CustomButton";

import {
  headContentAnimation,
  headContainerAnimation,
  headTextAnimation,
  slideAnimation,
} from "../config/motion";

const Home = () => {
  const snap = useSnapshot(state);
  // Για να χρησιμοποιηθει το usesnapshot θα πρεπει το αντικειμενο (state) να βρισκεται μεσα σε proxy
  // Χρησιμοποιειται απλα για να κρατησει το data απο το proxy state και για να μην μπορει να τροποποιηθει εκτος proxy

  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section
          className="home"
          // spread operator για να επιστρεψει ολες τις τιμες μαζι με το left
          {...slideAnimation("left")} //οταν θα ειναι left θα επιστρεψει καποιες τιμες που βρισκονται μεσα στο motion.js
          // Το Icon με το slideAnimation("left") κινειται απο αριστερο προς τα δεξια
        >
          <motion.header {...slideAnimation("down")}>
            {/* Απο πανω αριστερα το icon θα μεταφερθει προς τα κατω δεξια*/}
            <img
              src="./threejs.png"
              alt="logo"
              className="w-8 h-8 object-contain" //κλασεις απο tailwind
            />
          </motion.header>

          <motion.div className="home-content" {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              <h1 className="head-text">
                LET'S <br className="xl:block hidden" /> DO IT
              </h1>
            </motion.div>
            <motion.div
              {...headContentAnimation}
              className="flex flex-col gap-5"
            >
              <p className="max-w-md font-normal text-gray-600 text-base">
                Create your unique and exclusive shirt with our brand-new 3D
                customization tool. <strong>Unleash your imagination</strong>{" "}
                {""} and define your own style.
              </p>

              <CustomButton
                type="filled" //θα οριζει το χρωμα του button
                title="Customize It"
                handleClick={() => (state.intro = false)} //update the valtio state
                customStyles="w-fit px-4 py-2.5 font-bold text-sm"
              />
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
  // AnimatePresence: για την κινηση των στοιχειων που εισερχονται ή εξερχονται απο το DOM(html)
  // motion.section ειναι ενα div που θα εχει animations εξαιτιας του motion
};

export default Home;
