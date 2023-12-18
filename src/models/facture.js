import mongoose, { Schema } from "mongoose";

const factureSchema = new mongoose.Schema({
    apartment: {
        type: Schema.Types.ObjectId,
        ref: "apartment", 
      },
      paymentFacture: {
        type:[Date],
        default: []
      },
    createdAt : {
        type : Date,
        default : new Date(),
    }
})

const facture = mongoose.model('facture', factureSchema);
export default facture 