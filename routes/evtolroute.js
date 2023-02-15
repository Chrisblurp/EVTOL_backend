import express from "express";
import { allEvtol, auditTask, availableEvtol, getBatteryPerc, getLoadedMed, loading,  registerController, registerMedications } from "../controllers/evtolcontroller.js";

const evtolRoute = express.Router();

evtolRoute.post("/reg-evtol", registerController);

evtolRoute.post("/load/:id", loading);

evtolRoute.get("/battery",getBatteryPerc);

evtolRoute.post("/reg-med",registerMedications);

evtolRoute.get("/check-med",getLoadedMed);

evtolRoute.get("/loading-evtol", availableEvtol);

evtolRoute.get("/task",auditTask);

evtolRoute.get("/all", allEvtol);

export default evtolRoute 