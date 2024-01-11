import express from "express"; //express server, απλοποιει την επικοινωνια μεταξυ api και web browser
import * as dotenv from "dotenv";
// import {Configuration, OpenAIApi} from "openai";
import OpenAI from "openai";

dotenv.config(); //χρησιμοποιειται για να φορτωσει μεταβλητες απο .env (process.env)

// New routes
const router = express.Router(); //new router object

// const config = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

const config = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is also the default, can be omitted
});

router.route("/").get((req, res) => {
  res.status(200).json({message: "Hello from Dalle.route.js"});
});

// Route that will pass the prompt from frontend to server
// route('/') καθοριζει την διαδρομη για το HTTP POST method
router.route("/").post(async (req, res) => {
  try {
    // Generates image from the API
    const {prompt} = req.body;
    const response = await config.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });
    // n: number of images

    // ΑΝ το αιτημα ειναι επιτυχες κανει extract την φωτογραφια απο το base64_encoded_image
    // b64 η μορφη που επιστρεφεται τα δεδομενα εικονας
    const image = response.data.data[0].b64_json;

    // Pass it to frontend
    // 200 ειναι HTTP code = ΟΚ
    // 500 = Error
    // 400 = Not Found

    // αν ειναι OK τοτε παιρνα την φωτο, σαν if statement
    res.status(200).json({photo: image});
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Something went wrong"});
  }
});

export default router;
// must be  connected to index.jsnpm exec openai migrate
