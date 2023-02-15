import mongoose from "mongoose";

const medicationSchema = new mongoose.Schema({
    name:{
        type:String,Number,
        required:[true, "code is required"],
    },

    weight:{
        type:Number,
        required:[true, "code is required"],
    },

    code:{
        type:String,Number,
        uppercase: true,
        required:[true, "code is required"],
    },

    image:{
        type:String,
    },
},
{
    timestamps: true,
    toJSON: {virtuals: true}
});

const Medication = mongoose.model("Medication", medicationSchema);

export default Medication;