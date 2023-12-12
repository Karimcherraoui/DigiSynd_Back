import Admin from "../models/admin"
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const adminController = {

       getAdmin : async (req,res)=>{
        try{
            const admin = await Admin.findOne()
            return res.status(201).json(admin)

        }catch(error){
            res.status(500).json({ message: error.message });
        }
       },

       getAllAdmins : async (req,res)=>{
        try {
            const admins = await Admin.find();
            res.status(200).json(admins);
          } catch (error) {
            res.status(500).json({ message: error.message });
          }
       }
        
    }
