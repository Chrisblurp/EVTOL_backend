import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema({
    serialNumber:{
        type:String,Number,
        required:true,
    },
    
    batteryLevel:{
        type:Number,
        required:true,
    },
    
    timeStamp:{
        type:Date,
        default: Date.now()
    },

    message:{
        type:String,
        required:true,
    }
},
{
    timestamps: true,
    toJSON: {virtuals: true}
 
});

const AuditLog = mongoose.model("AuditLog",auditLogSchema);

export default AuditLog;
