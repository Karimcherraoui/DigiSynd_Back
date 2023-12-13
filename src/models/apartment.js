import mongoose, { Schema } from "mongoose";

const apartSchema = new mongoose.Schema({

  firstNameOwner: { type: String, required: true },
  lastNameOwner: { type: String, required: true },
  phone: { type: Number, required: true , unique: true},
  cin: { type: String, required: true , unique: true },
  numberApart: { type: Number, required: true , unique: true , min: 1},
  floor: { type: Number, required: true },
 
  createdAt: {
    type: Date,
    default: new Date(),
  },  

});

const apartment = mongoose.model('Apartement', apartSchema);
export default apartment;
