import { json } from "express";
import Apart from "../models/apartment";
  import Facture from "../models/facture";
import { Types } from "mongoose";
export const apartController = {
  getAparts: async (req, res) => {
    try {
        const apartments = await Apart.find();
        const apartsID =  apartments.map((apart) => apart._id);
        const result = await Facture.aggregate([
        {
          $match: {
            apartment: { $in: apartsID },
          },
        },
        {
          $group: {
            _id: "$apartment",
          },
        },
      ]);
  
      const payedAparts = result.map((entry) => entry._id);
      console.log(payedAparts);
      
      const aparts = apartments.map((apart) => ({
        ...apart.toObject(),
        isPaid: payedAparts.some((id) => id.equals(apart._id)),
      }));
  
      res.status(200).json( aparts );
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  

  createApart: async (req, res) => {
    try {

      const { firstNameOwner, lastNameOwner, phone ,cin , numberApart , floor } = req.body;

      if (!(firstNameOwner && lastNameOwner && phone && cin && numberApart && floor)) {
        return res
          .status(400)
          .json({ error: "Please provide all required fields" });
      }
      const newApart = new Apart({
        firstNameOwner,
        lastNameOwner, 
        phone ,
        cin , 
        numberApart , 
        floor 
      });
      const savedApart = await newApart.save();

      res.status(201).json({
        message: "Apartment created successfully",
        apartment: savedApart,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  updateApart: async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    if (!Types.ObjectId.isValid(id)) {
      return res.status(404).send("No Apartment with that id");
    }
    const updatedApart = await Apart.findByIdAndUpdate(id, body, { new: true });
    res.json(updatedApart);
  },

  deleteApart: async (req, res) => {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      return res.status(404).send("No apartment with that id");
    }

    try {
      await Apart.findByIdAndDelete(id);
      res.json({ message: "apartment deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error deleting the apartment", error: error.message });
    }
  },
  updatePaymentStatus: async (req, res) => {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) {
      return res.status(404).send("No Apartment with that id");
    }
  
    try {
      
      const savedFacture = await Facture.create({
        apartment: id,
      });

  
      res.json({
        message: "Payment status updated successfully",
        facture: savedFacture,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error updating payment status",
        error: error.message,
      });
    }
  },
};
