import { json } from "express";
import Apart from "../models/apartment";
import { Types } from "mongoose";
export const apartController = {
  getAparts: async (req, res) => {
    try {
      const aparts = await Apart.find()
      res.status(200).json(aparts);
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
  // payApart: async (req, res) => {
  //   try {
  //     const { id } = req.params;

  //     if (!Types.ObjectId.isValid(id)) {
  //       return res.status(404).send("No Apartment with that id");
  //     }

  //     const PaydApartment = await Apartment.findById(id);

  //     const isPayd = PaydApartment.Pays.includes(adminId);

  //     if (isPayd) {
  //       PaydApartment.Pays = PaydApartment.Pays.filter(
  //         (PayadminId) => PayadminId !== adminId
  //       );
  //     } else {
  //       PaydApartment.Pays.push(adminId);
  //     }

  //     const updatedApartment = await PaydApartment.save();

  //     res.json({ Pays: updatedApartment.Pays });
  //   } catch (error) {
  //     console.error(`Error liking Apartment with id ${id}:`, error);
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
  // },
};
