
import Admin from "../models/admin"
import jwt from 'jsonwebtoken';
import argon from "argon2"
import errorHandler from "../utils/errorHandler";


const Joi = require('joi');

const registrationSchema = Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
    role: Joi.string().valid('admin', 'superAdmin').default('admin'),

});

export const AuthController = {


    
login : async(req,res,next)=>{
    try{
        const email = req.body.email
        const password = req.body.password

        const admin = await Admin.findOne({ email: email});


        if (admin && (await argon.verify(admin.password, password))) {
            const token = jwt.sign({ adminId: admin._id , email : admin.email ,fullName: admin.fullName , role: admin.role}, process.env.SECRET_KEY, { expiresIn: '5h' });
            const { password: _, ...adminWithoutPassword } = admin.toObject();
            return res.status(201).json({ token , admin: adminWithoutPassword });
        } else {
            return res.status(401).json({ error: 'Email or Password incorrect' });
        }
    }catch (error) {
        next(new errorHandler( error.message , 500))

    }
    },


    register : async (req,res,next) =>{
            try {
                const { error } = registrationSchema.validate(req.body);
                if (error) {
                return res.status(400).json({ error: error.details[0].message });
                }
            
                const { fullName, email, password , role } = req.body;

                const hashedPass = await argon.hash(password)


                const newAdmin = new Admin({fullName , email ,role , password:hashedPass})
                const savedAdmin = await newAdmin.save();
                const { password: _, ...adminWithoutPassword } = savedAdmin.toObject();

            res.status(201).json({
                message: 'Admin created successfully',
                admin: adminWithoutPassword,
            });

            }catch (error) {
                next(new errorHandler( error.message , 500))

            }
        },
};