import { json } from "express";
import Apart from "../models/apartment";
import Facture from "../models/facture";
import { Types } from "mongoose";
import errorHandler from "../utils/errorHandler"  



const Joi = require('joi');

const registrationSchema = Joi.object({

  firstNameOwner: Joi.string().required(),
  lastNameOwner: Joi.string().required(),
  phone: Joi.number().min(9).max(13).required(),
  cin: Joi.string().min(3).max(10).required(),
  numberApart: Joi.number().min(1).max(3).required(),
  floor: Joi.number().min(1).max(2).required(),

   
});



export const apartController = {
  getAparts: async (req, res,next) => {
    try {

      const factures = await Facture.find();
      const apartments = await Apart.find();
      const aparts = apartments.map((apart) => {
        const facture = factures.find(
          (facture) => facture.apartment.toString() === apart._id.toString()
        );
        const isPaid =
        facture?.paymentFacture
          ?.map((date) =>
            new Date(date).toLocaleDateString("fr-MA", {
              year: "2-digit",
              month: "2-digit",
            })
          )
          ?.includes(
            new Date().toLocaleDateString("fr-MA", {
              year: "2-digit",
              month: "2-digit",
            })
          ) ?? false;
        return { ...apart.toObject(), isPaid };
      });
     

      res.status(200).json(aparts);
    } catch (error) {
      next(new errorHandler( error.message , 500))
    }
  },

 getPaymentFacture : async (req,res,next) => {
  const { id } = req.params;

    try {
      const facture = await Facture.findOne({ apartment: id });
      if (!facture) {
        // return res.status(404).json({ error: "No facture found" }); 
        next(new errorHandler( error.message , 404));

      }
      return res.json( facture.paymentFacture);
    } catch (error) {
      next(new errorHandler( error.message , 500));
    }
  },



  createApart: async (req, res,next) => {
    try {

      const { error } = registrationSchema.validate(req.body);
      if (error) {
      return res.status(400).json({ error: error.details[0].message });
      }

      const { firstNameOwner, lastNameOwner, phone, cin, numberApart, floor } =
        req.body;

      if (
        !(
          firstNameOwner &&
          lastNameOwner &&
          phone &&
          cin &&
          numberApart &&
          floor
        )
      ) {
        return res
          .status(400)
          .json({ error: "Please provide all required fields" });
      }
      const newApart = new Apart({
        firstNameOwner,
        lastNameOwner,
        phone,
        cin,
        numberApart,
        floor,
      });
      const savedApart = await newApart.save();
      const idApart = savedApart._id;
      const savedFacture = await Facture.create({
        apartment: idApart,
      });

      res.status(201).json({
        message: "Apartment created successfully",
        apartment: savedApart,
        facture: savedFacture,
      });
    } catch (error) {
     
      next(new errorHandler( error.message , 500))

    }
  },

  updateApart: async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    if (!Types.ObjectId.isValid(id)) {
      return res.status(404).send("No Apartment with that id");
    }
    const updatedApart = await Apart.findByIdAndUpdate(id, body, { new: true });
    // res.json(updatedApart);
    res.status(201).json({
      message: "Apartment updated successfully",
      apartment: updatedApart,
    });
  },

  deleteApart: async (req, res) => {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      return res.status(404).send("No apartment with that id");
    }

    try {
      await Facture.findOneAndDelete({ apartment: id });
      await Apart.findByIdAndDelete(id);

      res.json({ message: "apartment deleted successfully" });
    } catch (error) {
        next(new errorHandler( error.message , 500))

    }
  },
  updatePaymentStatus: async (req, res) => {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      return res.status(404).send("No Apartment with that id");
    }

    try {
      // Find the Facture document associated with the provided apartment id
      const facture = await Facture.findOne({ apartment: id });

      if (!facture) {
        return res.status(404).json({ error: "No facture found" });
      }

      // Get the current paymentFacture array
      const paymentFacture = facture.paymentFacture;

      // Check if the current date (MM/YY format) is already in the array
      const currentDate = new Date().toLocaleDateString("fr-MA", {
        year: "2-digit",
        month: "2-digit",
      });

      // Convert dates in the paymentFacture array to MM/YY format
      const formattedPaymentFacture = paymentFacture.map((date) =>
        new Date(date).toLocaleDateString("fr-MA", {
          year: "2-digit",
          month: "2-digit",
        })
      );

      if (!formattedPaymentFacture.includes(currentDate)) {
        paymentFacture.push(new Date());

        facture.paymentFacture = paymentFacture;

        await facture.save();
      }

      res.status(201).json({
        message: "Payment status updated successfully",
        facture: paymentFacture,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error updating payment status",
        error: error.message,
      });
    }
  },
};
