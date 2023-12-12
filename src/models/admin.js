import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    fullName : {type : String , min : 3 , required : true},
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required:'Email address is required',
    },
    role: {
        type: String,
        enum: ['admin', 'superAdmin'],
        default: 'admin',
    },
    password : {type : String , min : 6 , required : true},
    createdAt : {
        type : Date,
        default : new Date(),
    }
})

const admin = mongoose.model('Admin', adminSchema);
export default admin 