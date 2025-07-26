const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/User');

//auth

exports.auth = async (req,res, next) => {
   

    try {
        
        const token = req.body.token || req.cookies.token || req.get("Authorization")?.replace("Bearer ", "");
        
        if(!token) {
            return res.status(401).json({
                success:false,
                message:'TOken is missing',
            });
        }
        try {
            const payload = jwt.verify(token,process.env.JWT_SECRET);
            req.user = payload;
            console.log("token is verified");
        } catch (error) {
            console.log("token error",error);
            return res.status(401).json({
                success:false,
                message:"Invaild token."
            })
        } 
        next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            success:false,
            message:"Error in validating token"
        })
    }
}


exports.isStudent = async (req, res, next) => {
   
    try {

        if(req.user.accountType !== 'Student') {
            return res.status(401).json({
                success: false,
                message: 'This Is A Protectd Route For Students'
            })
        }
        next();

    } catch(error) {
        return res.status(500).json({
            success: false,
            message: 'User Role Cannot Be Verified, Please Try Again'
        })
    }
}


exports.isInstructor = async (req, res, next) => {
    try {

        if(req.user.accountType !== 'Instructor') {
            return res.status(401).json({
                success: false,
                message: 'This Is A Protectd Route For Instructor'
            });
        }
        next();

    } catch(error) {
        return res.status(500).json({
            success: false,
            message: 'User Role Cannot Be Verified, Please Try Again'
        })
    }
}



exports.isAdmin = async (req, res, next) => {
    try {

        if(req.user.accountType !== 'Admin') {
            return res.status(401).json({
                success: false,
                message: 'This Is A Protectd Route For Admin'
            })
        }
        next();
        
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: 'User role Cannot Be Verified, Please Try Again'
        })
    }
}
