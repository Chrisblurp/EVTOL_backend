import express from "express";
import dotenv from "dotenv"
import cors from "cors";
import dbConnect from "./config/dbconnect.js";
import evtolRoute from "./routes/evtolroute.js";

dbConnect();
dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/evtol", evtolRoute);



const PORT = process.env.port || 2000
app.listen(PORT, console.log(`app is running at server ${PORT}`));