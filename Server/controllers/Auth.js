const User = require('../models/User');
const OTP = require('../models/OTP');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const otpGenerator = require('otp-generator');
const mailSender = require('../utils/mailSender');
const { passwordUpdated } = require('../mail/templates/passwordUpdate');
const Profile = require('../models/Profile');
require('dotenv').config();

// Send OTP for email verification
exports.sendOTP = async (req, res) => {
    try {

        //fetch email from request body
        const {email} = req.body;

        //check if user already exists
        const checkUserPresent = await User.findOne({email});
    
        //if user already exists, then return a response
        if(checkUserPresent) {
            //Return 401 Unauthorized status code with error message
            return res.status(401).json({
                success: false,
                message: `User is Already Registered`,
            });
        }
    
        //generate OTP -> not practical code for industry ->  use a lib. to generate a guranteed unique otp
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        //check unique otp or not
        const result = await OTP.findOne({otp: otp});
        console.log('OTP Generated : ', otp);
        console.log('Result : ', result);
        //if not unique
        while(result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlpahbets: false,
            });
            result = await OTP.findOne({otp: otp});
        }

        const otpPayload = {email, otp};
        //create an entry for OTP 
        const otpBody  = await OTP.create(otpPayload);
        console.log('OTP Body', otpBody);

        //return response successfully
        res.status(200).json({
            success: true,
            message: `OTP Sent Successfully`,
            otp,
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//Signup controller for registering users

exports.signUp = async (req, res) => {
    try {
        const {
            firstName, 
            lastName, 
            email,
            password,
            confirmPassword,
            accountType, 
            contactNumber,
            otp,
        } = req.body;
      


        if (
            !firstName || 
            !lastName || 
            !email || 
            !password || 
            !confirmPassword || 
            !otp
        ) {
            return res.status(403).json({
                success: false,
                firstName:firstName,
                lastName:lastName,
                email:email,
                password:password,
                confirmPassword:confirmPassword,
                otp:otp,

                message: 'All Fields are required',
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Password and Confirm Password do not match. Please try again',
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists. Please Sign in to continue.',
            });
        }

        const response = await OTP.find({email}).sort({createdAt: -1}).limit(1);

        if (response.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'The OTP is not found',
            });
        } else if (String(otp) !== String(response[0].otp)) {
            return res.status(400).json({
                success: false,
                message: 'The OTP is not valid',
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let approved = '';
        approved === 'Instructor' ? (approved = false)  : (approved = true);

        const profileDetails = await Profile.create({
            gender : null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        });

        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password: hashedPassword,
            accountType: accountType,
            approved: approved,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        });

        return res.status(200).json({
            success: true,
            user,
            message: 'User Registered Successfully',
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'User Cannot be Registered, Please Try Again.'
        });
    }
};

//login
exports.login = async (req, res) => {
    try {
        //get data from req body
        const {email, password} = req.body;
        //validation of data
        if(!email || !password) {
            //Return 400 Bad Request status code with error message
            return res.status(400).json({
                success: false,
                message: `Please Fill up All the Required Fields`,
            });
        }
        //check user exists or not
        const user = await User.findOne({email}).populate('additionalDetails');
      
        if(!user) {
            return res.status(401).json({
             
                success: false,
                message: `User is not registered with Us, Please signup to Continue`,
                
            });
        }
        //Generate JWT, after password match
        if(await bcrypt.compare(password, user.password)) {
            const payLoad = {
                email: user.email,
                id: user._id,
                accountType: user.accountType,
            }
            const token = jwt.sign(payLoad, process.env.JWT_SECRET, {
                expiresIn: '5h',
            });

            //save token to user document in database
            user.token = token;
            user.password = undefined;
        
            //create cookie and send response
            const options = {
                expiresIn: new Date(Date.now() + 3*24*60*60*1000),
              
                httpOnly: true,
            }

            res.cookie('token', token, options).status(200).json({
                success: true,
                token,
                user,
                message: `User Login Success`,
            });
            
        } else {
            return res.status(401).json({
                success: false,
                message: `Password Is Incorrect`,
            });
        }


    } catch (error) {
        console.log( "login error is",error);
       
        return res.status(500).json({
            success: false,
            message: `Login Failure Please Try Again`,
        });
    }
};


//changePassword
exports.changePassword = async (req, res) => {
    try {
        //Get user data from req.user
        const userDetails = await User.findById(req.user.id);
        
        //get oldPassword, newPassword
        const {oldPassword, newPassword} = req.body;

        //Validate old password
        const isPasswordMatch = await bcrypt.compare(
            oldPassword, 
            userDetails.password
        );

        if(!isPasswordMatch) {
            //if old password does not match, return a 401 (unauthorized) error
            return res
                .status(401)
                .json({
                success: false,
                message: 'The Password is Incorrect',
            })
        }

        //update password
        const encryptedPassword = await bcrypt.hash(newPassword, 10);
        const updatedUserDetails = await User.findByIdAndUpdate(
            req.user.id,
            { password: encryptedPassword },
            { new: true }
        );

        //send notification email
        try {
            const emailResponse = await mailSender(
                updatedUserDetails.email,
                `Password Updated Successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`,
                passwordUpdated(
                    updatedUserDetails.email,
                    updatedUserDetails.firstName,
                )
            )
            console.log('Email sent successfully', emailResponse);
        } catch (error) {
            //if there's an error sending the email, log the error and return a 500 (Internal Server Error) error
            console.log('Error Occurred While Sending Email: ', error);
            return res.status(500).json({
                success: false,
                message: 'Error Occurred While Sending Email',
                error: error.message,
            });
        }

        //Return success response
        return res
            .status(200)
            .json({ success: true, message: 'Password Updated Successfully' });

    } catch (error) {
        //if there's an error updating the password, log the error and return 500 (Internal Server Error) error
        console.error('Error Occurred While Updating Password', error);
        return res.status(500).json({
            success: false,
            message: 'Error Occurred While Updating Password',
            error: error.message,
        });
    }
};