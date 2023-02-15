import EVTOL from "../Models/evtolmodel.js";
import Medication from "../Models/medicationmodel.js";
import cron from "node-cron";
import AuditLog from "../Models/auditlog.js";

// register EVTOL 
export const registerController = async (req, res) =>{
    try{
        const {name,serialNumber,model,weightLimit,state,batteryCapacity} = req.body
 const foundEvtol = await EVTOL.findOne({serialNumber});
 if (foundEvtol){
    return res.status(400).json({status:"EVTOL already registered"})
 }

const evtol = await EVTOL.create({
    name,
    serialNumber,
    model,
    weightLimit,
    batteryCapacity,
    state: "idle"

 });

 res.json({
    status: "EVTOL Registered Succesfully",
    data:evtol

 })
    }catch(error){
        res.json(error.message);
    }
}

// register medications for loading 

export const registerMedications = async (req, res) => {
     const {name, weight,code} = req.body
    try{
   
    const foundMedication = await Medication.findOne({code})
if(foundMedication){
    return res.status(400).json({status:"Medication already registered with the platform"})
}
const medication = await Medication.create({
    name,
    weight,
    code,
});
res.json({
    status: "Medications Registered Succesfully",
    data:medication
});
}catch(error){
return res.json(error.message);
    }
}


// Loading Logic
export const loading = async (req, res) => {
    const {serialNumber} = req.body
    try{
        
        const foundEvtol = await EVTOL.findOne({serialNumber});
        const foundMedication = await Medication.findById(req.params.id)
       
    if(foundEvtol && foundMedication){
    const isMedicationAlreadyLoaded = foundEvtol.medicationLoad.find(med=>med.toString()===foundMedication._id.toString());
    // check if medication is already loaded
    if (isMedicationAlreadyLoaded){
        console.log(foundMedication._id);
        return res.status(400).json({
            error: 'This medication is already loaded in the EVTOL'
          });
        }
    // check if battery percentage is lower than 25 percent
    else if(foundEvtol.batteryCapacity < 25){
        return res.status(400).json({
            error: 'Cannot load medication, battery level is below 25%'
          });
    }
    // check if weight limit is exceeded
   else if (foundEvtol.weightLimit < foundMedication.weight){
        return res.status(400).json({
            error: 'Cannot load medication, medication weight is more than the EVTOL weight limit'
          });
    }
    }
    foundEvtol.medicationLoad.push(foundMedication._id);
        // Update the state of the eVTOL to LOADING
         foundEvtol.state = "loading";
        await foundEvtol.save();
    res.json({
        status: "Medication loaded succesfully"
    });

    }catch(error){
        return res.json(error.message)
    }
}

// get battery percentage
export const getBatteryPerc = async (req, res) => {
    try{
        const {serialNumber} = req.body
        const foundEvtol = await EVTOL.findOne({serialNumber})
        if(!foundEvtol){
            return res.status(400).json({ error: 'eVTOL not found' });
        }
        return res.json({ batteryLevel: foundEvtol.batteryCapacity });
    }catch(error){
        res.json(error.message);
    }
   
};

// check all loaded medications in the EVTOL
export const getLoadedMed = async (req, res) => {

    try{
        
        const {serialNumber} = req.body
        const foundEvtol = await EVTOL.findOne({serialNumber});
        if(!foundEvtol){
            return res.status(400).json({ error: 'eVTOL not found' });
        }

        return res.json({loadedMedications: foundEvtol.medicationLoad.toString()});

    }catch(error){
        return res.json(error.message)
    }
};

// check available EVTOL for loading

export const availableEvtol = async (req, res) => {
    try{
const foundEvtol = await EVTOL.find({state: "loading"});
return res.json({foundEvtol});

    }catch(error){
        return res.json()
    }
}

// audit task log
export const auditTask = async (req, res) => {
    try{
        const {serialNumber} = req.body
const foundEvtol = await EVTOL.findOne({serialNumber});

    const auditLog = new AuditLog({
        serialNumber: foundEvtol.serialNumber,
        batteryLevel: foundEvtol.batteryCapacity,
        timestamp: Date.now(),
        message: `checked EVTOL battery level, the battery level is ${foundEvtol.batteryCapacity}`
    });
    await auditLog.save();

    res.status(200).json({
        status: "sucess",
        data:{auditLog}
    });
    }catch(error){
    res.json(error.message)
    }
};

setInterval(auditTask, 60 * 60 * 1000);

// check all EVTOL 

export const allEvtol = async (req, res) => {
    try{
const foundEvtol = await EVTOL.find({});
return res.json({foundEvtol});

    }catch(error){
        return res.json()
    }
}