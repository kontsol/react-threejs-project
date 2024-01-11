import express from "express"; //express server
import * as dotenv from "dotenv";
import cors from "cors"; //cross origin requests

import dalleRoutes from "./routes/dalle.routes.js"; //app.use για να τα χρησιμοποιησουμε

// setup enviromental variables
dotenv.config();

// setup express application
const app = express();
app.use(cors());

// Specify the weight that we gonna use
app.use(express.json({limig: "50mb"}));
app.use("/api/v1/dalle", dalleRoutes);

// route
app.get("/", (req, res) => {
  res.status(200).json({message: "Hello World"});
});

// Μετα παει στο terminal και κανει npm start

// Listen on specific port
app.listen(8080, () => {
  console.log("Server has started on port 8080");
});

// Aυτο τωρα λειτουργει στο localhost:8080
