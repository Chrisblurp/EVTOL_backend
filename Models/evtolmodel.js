import mongoose from "mongoose";

const evtolSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true,"name is required"],
    },

    serialNumber:{
        type:String,Number,
        required:[true,"serial number is required"],
    },

    model:{
        type:String,Number,
        required:[true, "model is required"],
        enum: ["Lightweight", "Middleweight", "Cruiserweight", "Heavyweight"],
    },


    weightLimit:{
        type:Number,
        required:[true, "weight is required"],
        maxLength: 500,
    },

    batteryCapacity:{
        type: Number,
        required:true,
    },
    state:{
        type:String,
        enum: ['idle', 'loading', 'loaded', 'delivering', 'delivered', 'returning'],
    },

    medicationLoad: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"evtol"
        }
    ]
},
{
    timestamps: true,
    toJSON: {virtuals: true}
 
});

const EVTOL = mongoose.model("EVTOL",evtolSchema);

export default EVTOL;