import mongoose, { Schema } from "mongoose";

const factureSchema = new mongoose.Schema({
    apartment: {
        type: Schema.Types.ObjectId,
        ref: "apartment", 
      },
    createdAt : {
        type : Date,
        default : new Date(),
    }
})

const facture = mongoose.model('Facture', factureSchema);
export default facture 